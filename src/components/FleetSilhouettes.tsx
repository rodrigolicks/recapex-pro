import React from 'react';
import { VehicleConfigurationType } from '../types';

interface SilhouetteProps {
  type: VehicleConfigurationType;
  className?: string;
  selected?: boolean;
}

export const FleetSilhouette: React.FC<SilhouetteProps> = ({ type, className = 'w-full h-16', selected }) => {
  const strokeColor = selected ? '#0284c7' : '#475569';
  const fillColor = selected ? '#e0f2fe' : '#f8fafc';
  const wheelColor = selected ? '#0369a1' : '#334155';

  switch (type) {
    case 'cavalo_carreta_3e':
      return (
        <svg viewBox="0 0 380 90" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Cabin */}
          <path d="M15 65 L15 35 L40 20 L65 20 L65 65 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" strokeLinejoin="round" />
          {/* Cabin Window */}
          <path d="M38 25 L58 25 L58 42 L25 42 Z" fill={selected ? '#bae6fd' : '#cbd5e1'} stroke={strokeColor} strokeWidth="1.5" />
          {/* Cabin Grille */}
          <line x1="18" y1="48" x2="18" y2="60" stroke={strokeColor} strokeWidth="2" />
          <line x1="24" y1="48" x2="24" y2="60" stroke={strokeColor} strokeWidth="2" />
          {/* Chassis connection */}
          <rect x="65" y="52" width="28" height="13" fill="#64748b" stroke={strokeColor} strokeWidth="2" />
          {/* Trailer Body */}
          <rect x="90" y="20" width="270" height="45" rx="3" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
          {/* Trailer ribs */}
          <line x1="150" y1="22" x2="150" y2="63" stroke={strokeColor} strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
          <line x1="210" y1="22" x2="210" y2="63" stroke={strokeColor} strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
          <line x1="270" y1="22" x2="270" y2="63" stroke={strokeColor} strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
          {/* Wheels Cabin */}
          <circle cx="35" cy="67" r="11" fill={wheelColor} />
          <circle cx="35" cy="67" r="4.5" fill="#f8fafc" />
          <circle cx="75" cy="67" r="11" fill={wheelColor} />
          <circle cx="75" cy="67" r="4.5" fill="#f8fafc" />
          {/* Wheels Trailer (3 axles) */}
          <circle cx="285" cy="67" r="11" fill={wheelColor} />
          <circle cx="285" cy="67" r="4.5" fill="#f8fafc" />
          <circle cx="315" cy="67" r="11" fill={wheelColor} />
          <circle cx="315" cy="67" r="4.5" fill="#f8fafc" />
          <circle cx="345" cy="67" r="11" fill={wheelColor} />
          <circle cx="345" cy="67" r="4.5" fill="#f8fafc" />
        </svg>
      );

    case 'bitrem_7e':
      return (
        <svg viewBox="0 0 460 90" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Cabin */}
          <path d="M12 65 L12 35 L35 20 L58 20 L58 65 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M32 25 L52 25 L52 42 L22 42 Z" fill={selected ? '#bae6fd' : '#cbd5e1'} stroke={strokeColor} strokeWidth="1.5" />
          {/* Semi 1 */}
          <rect x="75" y="22" width="160" height="43" rx="2" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
          {/* Semi 1 connection coupling */}
          <rect x="235" y="52" width="22" height="13" fill="#64748b" stroke={strokeColor} strokeWidth="1.5" />
          {/* Semi 2 */}
          <rect x="257" y="22" width="185" height="43" rx="2" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
          {/* Wheels */}
          <circle cx="30" cy="67" r="10.5" fill={wheelColor} />
          <circle cx="30" cy="67" r="4" fill="#f8fafc" />
          <circle cx="68" cy="67" r="10.5" fill={wheelColor} />
          <circle cx="68" cy="67" r="4" fill="#f8fafc" />
          {/* Axles semi 1 (2 axles) */}
          <circle cx="195" cy="67" r="10.5" fill={wheelColor} />
          <circle cx="195" cy="67" r="4" fill="#f8fafc" />
          <circle cx="222" cy="67" r="10.5" fill={wheelColor} />
          <circle cx="222" cy="67" r="4" fill="#f8fafc" />
          {/* Axles semi 2 (2 axles) */}
          <circle cx="395" cy="67" r="10.5" fill={wheelColor} />
          <circle cx="395" cy="67" r="4" fill="#f8fafc" />
          <circle cx="422" cy="67" r="10.5" fill={wheelColor} />
          <circle cx="422" cy="67" r="4" fill="#f8fafc" />
        </svg>
      );

    case 'rodotrem_9e':
      return (
        <svg viewBox="0 0 540 90" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Cabin */}
          <path d="M10 65 L10 35 L30 20 L50 20 L50 65 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M28 25 L45 25 L45 42 L20 42 Z" fill={selected ? '#bae6fd' : '#cbd5e1'} stroke={strokeColor} strokeWidth="1.2" />
          {/* Semi 1 */}
          <rect x="68" y="24" width="180" height="41" rx="2" fill={fillColor} stroke={strokeColor} strokeWidth="2.2" />
          {/* Dolly */}
          <rect x="250" y="55" width="28" height="10" fill="#64748b" stroke={strokeColor} strokeWidth="1.5" />
          {/* Semi 2 */}
          <rect x="282" y="24" width="235" height="41" rx="2" fill={fillColor} stroke={strokeColor} strokeWidth="2.2" />
          {/* Wheels */}
          <circle cx="26" cy="67" r="9.5" fill={wheelColor} />
          <circle cx="26" cy="67" r="3.5" fill="#f8fafc" />
          <circle cx="58" cy="67" r="9.5" fill={wheelColor} />
          <circle cx="58" cy="67" r="3.5" fill="#f8fafc" />
          {/* Semi 1 axles */}
          <circle cx="205" cy="67" r="9.5" fill={wheelColor} />
          <circle cx="205" cy="67" r="3.5" fill="#f8fafc" />
          <circle cx="230" cy="67" r="9.5" fill={wheelColor} />
          <circle cx="230" cy="67" r="3.5" fill="#f8fafc" />
          {/* Dolly axle */}
          <circle cx="264" cy="67" r="9.5" fill={wheelColor} />
          <circle cx="264" cy="67" r="3.5" fill="#f8fafc" />
          {/* Semi 2 axles (2 axles) */}
          <circle cx="470" cy="67" r="9.5" fill={wheelColor} />
          <circle cx="470" cy="67" r="3.5" fill="#f8fafc" />
          <circle cx="495" cy="67" r="9.5" fill={wheelColor} />
          <circle cx="495" cy="67" r="3.5" fill="#f8fafc" />
        </svg>
      );

    case 'truck_6x2':
      return (
        <svg viewBox="0 0 300 90" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Cabin */}
          <path d="M15 65 L15 35 L40 20 L70 20 L70 65 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M40 25 L64 25 L64 42 L26 42 Z" fill={selected ? '#bae6fd' : '#cbd5e1'} stroke={strokeColor} strokeWidth="1.5" />
          {/* Cargo Body (Rigid) */}
          <rect x="75" y="20" width="200" height="45" rx="3" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
          {/* Wheels */}
          <circle cx="40" cy="67" r="11" fill={wheelColor} />
          <circle cx="40" cy="67" r="4.5" fill="#f8fafc" />
          <circle cx="215" cy="67" r="11" fill={wheelColor} />
          <circle cx="215" cy="67" r="4.5" fill="#f8fafc" />
          <circle cx="245" cy="67" r="11" fill={wheelColor} />
          <circle cx="245" cy="67" r="4.5" fill="#f8fafc" />
        </svg>
      );

    case 'toco_3_4':
      return (
        <svg viewBox="0 0 240 90" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Cabin */}
          <path d="M15 65 L15 38 L38 24 L65 24 L65 65 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M36 28 L58 28 L58 42 L25 42 Z" fill={selected ? '#bae6fd' : '#cbd5e1'} stroke={strokeColor} strokeWidth="1.5" />
          {/* Cargo Body */}
          <rect x="70" y="24" width="150" height="41" rx="3" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
          {/* Wheels (2 axles) */}
          <circle cx="40" cy="67" r="11" fill={wheelColor} />
          <circle cx="40" cy="67" r="4.5" fill="#f8fafc" />
          <circle cx="185" cy="67" r="11" fill={wheelColor} />
          <circle cx="185" cy="67" r="4.5" fill="#f8fafc" />
        </svg>
      );

    default: // vanderleia or other
      return (
        <svg viewBox="0 0 380 90" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 65 L15 35 L40 20 L65 20 L65 65 Z" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M38 25 L58 25 L58 42 L25 42 Z" fill={selected ? '#bae6fd' : '#cbd5e1'} stroke={strokeColor} strokeWidth="1.5" />
          <rect x="90" y="20" width="270" height="45" rx="3" fill={fillColor} stroke={strokeColor} strokeWidth="2.5" />
          <circle cx="35" cy="67" r="11" fill={wheelColor} />
          <circle cx="35" cy="67" r="4.5" fill="#f8fafc" />
          <circle cx="75" cy="67" r="11" fill={wheelColor} />
          <circle cx="75" cy="67" r="4.5" fill="#f8fafc" />
          {/* Vanderleia spaced axles */}
          <circle cx="260" cy="67" r="11" fill={wheelColor} />
          <circle cx="260" cy="67" r="4.5" fill="#f8fafc" />
          <circle cx="305" cy="67" r="11" fill={wheelColor} />
          <circle cx="305" cy="67" r="4.5" fill="#f8fafc" />
          <circle cx="350" cy="67" r="11" fill={wheelColor} />
          <circle cx="350" cy="67" r="4.5" fill="#f8fafc" />
        </svg>
      );
  }
};
