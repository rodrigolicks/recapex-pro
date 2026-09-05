import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function crc32(buf) {
  let table = [];
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcBuf = Buffer.alloc(4);
  const crcVal = crc32(Buffer.concat([typeBuf, data]));
  crcBuf.writeUInt32BE(crcVal, 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function createPng(width, height, drawFn) {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8); // 8 bits per channel
  ihdr.writeUInt8(6, 9); // RGBA
  ihdr.writeUInt8(0, 10); // deflate
  ihdr.writeUInt8(0, 11); // filter
  ihdr.writeUInt8(0, 12); // no interlace

  const rawRows = [];
  for (let y = 0; y < height; y++) {
    const row = Buffer.alloc(1 + width * 4);
    row.writeUInt8(0, 0); // Filter type 0 (None)
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = drawFn(x, y, width, height);
      const offset = 1 + x * 4;
      row.writeUInt8(r, offset);
      row.writeUInt8(g, offset + 1);
      row.writeUInt8(b, offset + 2);
      row.writeUInt8(a, offset + 3);
    }
    rawRows.push(row);
  }

  const rawData = Buffer.concat(rawRows);
  const compressedData = zlib.deflateSync(rawData);

  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', compressedData);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([sig, ihdrChunk, idatChunk, iendChunk]);
}

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Icon design: Dark background (#0f172a / #020617) with Amber tire/gear badge & "RD" monogram
function drawTireIcon(x, y, w, h, isMaskable = false) {
  const cx = w / 2;
  const cy = h / 2;
  const dx = x - cx;
  const dy = y - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);
  
  // Safe scale
  const radiusScale = isMaskable ? 0.38 : 0.44;
  const outerR = w * radiusScale;
  const innerR = outerR * 0.55;
  const hubR = outerR * 0.28;

  // Background
  let r = 15, g = 23, b = 42, a = 255; // slate-900

  // Corner rounding for non-maskable icons
  if (!isMaskable) {
    const cornerR = w * 0.2;
    const inBoxX = Math.abs(dx) > (w / 2 - cornerR);
    const inBoxY = Math.abs(dy) > (h / 2 - cornerR);
    if (inBoxX && inBoxY) {
      const cdx = Math.abs(dx) - (w / 2 - cornerR);
      const cdy = Math.abs(dy) - (h / 2 - cornerR);
      if (Math.sqrt(cdx * cdx + cdy * cdy) > cornerR) {
        return [0, 0, 0, 0]; // Transparent outside rounded corner
      }
    }
  }

  // Tire Outer Ring (Tread)
  if (dist <= outerR && dist >= innerR) {
    // Tire grooves (8 lugs)
    const angle = (Math.atan2(dy, dx) + Math.PI) / (Math.PI * 2);
    const groove = Math.sin(angle * Math.PI * 2 * 12);
    if (groove > 0.4 && dist >= innerR + (outerR - innerR) * 0.35) {
      r = 217; g = 119; b = 6; // amber-600 tread groove
    } else {
      r = 245; g = 158; b = 11; // amber-500
    }
    return [r, g, b, 255];
  }

  // Sidewall accent ring
  if (dist < innerR && dist >= innerR - 3) {
    return [253, 230, 138, 255]; // amber-200
  }

  // Hub wheel center
  if (dist < hubR) {
    return [251, 191, 36, 255]; // amber-400
  }

  // Rim hole
  if (dist < hubR * 0.45) {
    return [15, 23, 42, 255]; // slate-900 center
  }

  return [r, g, b, a];
}

console.log('Generating PWA icons...');

fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), createPng(192, 192, (x, y, w, h) => drawTireIcon(x, y, w, h, false)));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), createPng(512, 512, (x, y, w, h) => drawTireIcon(x, y, w, h, false)));
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), createPng(512, 512, (x, y, w, h) => drawTireIcon(x, y, w, h, true)));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), createPng(180, 180, (x, y, w, h) => drawTireIcon(x, y, w, h, false)));
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), createPng(64, 64, (x, y, w, h) => drawTireIcon(x, y, w, h, false)));

// Generate SVG icon
const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="none">
  <rect width="512" height="512" rx="100" fill="#0f172a"/>
  <circle cx="256" cy="256" r="180" stroke="#f59e0b" stroke-width="38" stroke-dasharray="32 16"/>
  <circle cx="256" cy="256" r="130" stroke="#fbbf24" stroke-width="8"/>
  <circle cx="256" cy="256" r="65" fill="#f59e0b"/>
  <circle cx="256" cy="256" r="28" fill="#0f172a"/>
  <!-- Recap indicator groove -->
  <path d="M190 256 H322" stroke="#0f172a" stroke-width="8" stroke-linecap="round"/>
</svg>`;
fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgIcon);

console.log('PWA icons created successfully in /public');
