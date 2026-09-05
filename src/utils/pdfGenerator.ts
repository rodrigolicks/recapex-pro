import { jsPDF } from 'jspdf';
import { FormDataState } from '../types';
import { calculateFleetMetrics } from './calculations';
import { formatCurrency, formatDate, formatNumber } from './formatters';
import { VEHICLE_CONFIGURATIONS } from '../data/constants';

// Helper to convert hex string to RGB numbers
function hexToRgb(hex: string): [number, number, number] {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) || 245;
  const g = parseInt(cleanHex.substring(2, 4), 16) || 158;
  const b = parseInt(cleanHex.substring(4, 6), 16) || 11;
  return [r, g, b];
}

export interface PDFGenerationOptions {
  themeColorHex?: string;
  autoDownload?: boolean;
}

export const generateSurveyPDF = (
  formData: FormDataState,
  options: PDFGenerationOptions = {}
): jsPDF => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const primaryHex = options.themeColorHex || '#f59e0b';
  const [pr, pg, pb] = hexToRgb(primaryHex);

  const metrics = calculateFleetMetrics(formData);
  const pageWidth = doc.internal.pageSize.getWidth(); // 210 mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 297 mm
  const margin = 14;
  const contentWidth = pageWidth - margin * 2; // 182 mm

  let y = margin;

  const vehicleLabels = (formData.vehicleTypes || [])
    .map(id => {
      const config = VEHICLE_CONFIGURATIONS.find(c => c.id === id);
      return config ? config.label : id;
    })
    .join(', ');

  // Helper to check page break
  const ensureSpace = (requiredHeight: number) => {
    if (y + requiredHeight > pageHeight - 16) {
      doc.addPage();
      y = margin + 4;
      drawMiniHeader();
    }
  };

  const drawMiniHeader = () => {
    doc.setFillColor(248, 250, 252);
    doc.rect(margin, y - 4, contentWidth, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(
      `RecapData • Laudo Técnico - ${formData.companyName || 'Transportadora'}`,
      margin + 2,
      y + 1
    );
    y += 8;
  };

  // ==========================================
  // PAGE 1: HEADER & IDENTITY
  // ==========================================

  // Top Accent Bar
  doc.setFillColor(pr, pg, pb);
  doc.rect(margin, y, contentWidth, 3, 'F');
  y += 5;

  // Header Box
  doc.setFillColor(15, 23, 42); // Dark slate header
  doc.roundedRect(margin, y, contentWidth, 28, 2, 2, 'F');

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('LAUDO TÉCNICO & DIAGNÓSTICO DE FROTA', margin + 6, y + 8);

  // Subtitle / Brand
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(pr, pg, pb);
  doc.text('RECAPDATA PRO • SISTEMA DE GESTÃO E REFORMA DE PNEUS', margin + 6, y + 14);

  // Company Name
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  const companyTitle = formData.companyName
    ? formData.companyName.toUpperCase()
    : 'TRANSPORTADORA SEM IDENTIFICAÇÃO';
  doc.text(companyTitle, margin + 6, y + 22);

  // Score Pill on Header (Right side)
  const scoreBoxX = margin + contentWidth - 44;
  doc.setFillColor(30, 41, 59);
  doc.roundedRect(scoreBoxX, y + 3, 40, 22, 2, 2, 'F');
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(148, 163, 184);
  doc.text('SCORE DE OPORTUNIDADE', scoreBoxX + 20, y + 8, { align: 'center' });

  doc.setFontSize(14);
  doc.setTextColor(pr, pg, pb);
  doc.text(`${metrics.opportunityScore}/100`, scoreBoxX + 20, y + 16, { align: 'center' });

  doc.setFontSize(7);
  doc.setTextColor(52, 211, 153);
  doc.text(metrics.maturityLevel, scoreBoxX + 20, y + 21, { align: 'center' });

  y += 31;

  // Meta info bar (Cidade, Data, Consultor)
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(margin, y, contentWidth, 8, 1.5, 1.5, 'F');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);

  const locText = `Local: ${formData.city || 'N/I'} - ${formData.state || 'UF'}`;
  const dateText = `Data Coleta: ${formatDate(formData.createdAt)}`;
  const consultText = `Consultor: ${formData.consultantName || 'Técnico Especialista'}`;

  doc.text(locText, margin + 4, y + 5.5);
  doc.text(dateText, margin + 64, y + 5.5);
  doc.text(consultText, margin + 120, y + 5.5);

  y += 11;

  // ==========================================
  // 4 KEY METRIC CARDS (2x2 or 1x4 Grid)
  // ==========================================
  const cardWidth = (contentWidth - 6) / 4;
  const cardHeight = 16;

  const metricCards = [
    { label: 'Caminhões Frota', val: `${formData.truckCount || 0} unid.`, color: [15, 23, 42] },
    { label: 'Pneus Mapeados', val: formatNumber(metrics.totalEstimatedTires), color: [15, 23, 42] },
    { label: 'Potencial Recape', val: `~${formatNumber(metrics.annualRetreadPotential)}/ano`, color: [3, 105, 161] },
    { label: 'Economia Est./Ano', val: formatCurrency(metrics.annualSavingsPotential), color: [16, 185, 129] },
  ];

  metricCards.forEach((c, idx) => {
    const cx = margin + idx * (cardWidth + 2);
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(cx, y, cardWidth, cardHeight, 1.5, 1.5, 'FD');

    doc.setFontSize(6.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(100, 116, 139);
    doc.text(c.label.toUpperCase(), cx + 3, y + 5);

    doc.setFontSize(9.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(c.color[0], c.color[1], c.color[2]);
    doc.text(c.val, cx + 3, y + 12);
  });

  y += cardHeight + 4;

  // Section drawing helper
  const drawSection = (
    title: string,
    num: string,
    rows: Array<{ label: string; value: string; fullWidth?: boolean }>
  ) => {
    ensureSpace(30);

    // Header strip
    doc.setFillColor(pr, pg, pb);
    doc.rect(margin, y, 2.5, 6, 'F');

    doc.setFillColor(241, 245, 249);
    doc.rect(margin + 2.5, y, contentWidth - 2.5, 6, 'F');

    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(`${num}. ${title.toUpperCase()}`, margin + 5, y + 4.2);

    y += 7.5;

    // Content table in 2 columns
    const col1X = margin + 3;
    const col2X = margin + contentWidth / 2 + 2;
    const maxValWidth = contentWidth / 2 - 28;

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      ensureSpace(6);

      if (row.fullWidth) {
        doc.setFontSize(7.5);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(71, 85, 105);
        doc.text(`${row.label}:`, col1X, y + 3.5);

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(15, 23, 42);
        const splitVal = doc.splitTextToSize(row.value || '-', contentWidth - 36);
        doc.text(splitVal, col1X + 30, y + 3.5);

        y += Math.max(splitVal.length * 3.8, 5.5);
      } else {
        // Pair with next item if possible
        const nextRow = rows[i + 1] && !rows[i + 1].fullWidth ? rows[i + 1] : null;

        // Left Column
        doc.setFontSize(7.5);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(71, 85, 105);
        doc.text(`${row.label}:`, col1X, y + 3.5);

        doc.setFont('helvetica', 'normal');
        doc.setTextColor(15, 23, 42);
        const splitVal1 = doc.splitTextToSize(row.value || '-', maxValWidth);
        doc.text(splitVal1, col1X + 28, y + 3.5);

        let rowHeight = Math.max(splitVal1.length * 3.8, 5);

        // Right Column if available
        if (nextRow) {
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(71, 85, 105);
          doc.text(`${nextRow.label}:`, col2X, y + 3.5);

          doc.setFont('helvetica', 'normal');
          doc.setTextColor(15, 23, 42);
          const splitVal2 = doc.splitTextToSize(nextRow.value || '-', maxValWidth);
          doc.text(splitVal2, col2X + 28, y + 3.5);

          rowHeight = Math.max(rowHeight, splitVal2.length * 3.8);
          i++; // consumed next item
        }

        y += rowHeight + 1;
      }
    }

    y += 2;
  };

  // 1. Contato & Perfil da Frota
  drawSection('Contato & Perfil da Frota', '1', [
    { label: 'Contato', value: formData.contactPerson || '-' },
    { label: 'Cargo', value: formData.contactRole || '-' },
    { label: 'WhatsApp', value: formData.whatsapp || '-' },
    { label: 'E-mail', value: formData.email || '-' },
    { label: 'Segmento', value: formData.transportSegment || '-', fullWidth: true },
    { label: 'Tipos Veículos', value: vehicleLabels || '-', fullWidth: true },
    { label: 'Marca Cavalo', value: formData.predominantTruckBrand || '-' },
    { label: 'Potência Média', value: formData.truckHorsepower || '-' },
    { label: 'Tipo Trajeto', value: formData.routeType || '-' },
    { label: 'Piso Paviment.', value: formData.pavedRoadOnly || '-' },
  ]);

  // 2. Gestão e Manutenção de Pneus
  drawSection('Gestão e Manutenção de Pneus', '2', [
    { label: 'Pneus em Uso', value: `${formData.tiresInUseCount || metrics.totalEstimatedTires} unid.` },
    { label: 'Pressão Padrão', value: `${formData.standardPressurePsi || '-'} PSI` },
    { label: 'Marcas Novos', value: (formData.predominantNewTireBrands || []).join(', ') || '-', fullWidth: true },
    { label: 'Modelo Preferido', value: formData.preferredBrandAndModel || '-', fullWidth: true },
    { label: 'Calibragem', value: formData.calibrationFrequency || '-' },
    { label: 'Borracharia', value: formData.hasOwnTireShop || '-' },
    { label: 'Controle Pressão', value: formData.pressureControl || '-' },
    { label: 'Controle KM/CPK', value: formData.hasTireYieldControl || '-' },
  ]);

  // 3. Reforma & Mercado Atual
  drawSection('Reforma & Mercado Atual', '3', [
    { label: 'Marca Reforma', value: `${formData.currentRetreadBrand || '-'} (Méd. R$ ${formData.averageRetreadPrice || '0'})` },
    { label: 'Motivo Descarte', value: formData.mainTireDisposalReason || '-' },
    { label: 'Desenhos Usados', value: (formData.mostUsedTreadPatterns || []).join(', ') || '-', fullWidth: true },
    { label: 'Conceito Reforma', value: `${formData.clientConceptOnRetread || '-'} ${formData.clientConceptOnRetreadNotes ? `(${formData.clientConceptOnRetreadNotes})` : ''}`, fullWidth: true },
    { label: 'Pneus Importados', value: `${formData.clientConceptOnChineseTires || '-'} ${formData.clientConceptOnChineseTiresNotes ? `(${formData.clientConceptOnChineseTiresNotes})` : ''}`, fullWidth: true },
  ]);

  // 4. Combustível & Estratégia Comercial
  drawSection('Combustível & Fatores Decisivos', '4', [
    { label: 'Controle Diesel', value: formData.hasFuelControl || '-' },
    { label: 'Sulco x Diesel', value: formData.relatesTreadDepthToFuel || '-' },
    { label: 'Fator Concorrente', value: (formData.currentSupplierDecisiveFactor || []).join(', ') || '-', fullWidth: true },
    { label: 'Ações p/ Fechar', value: (formData.actionToBecomeMainSupplier || []).join(', ') || '-', fullWidth: true },
  ]);

  // 5. Sugestão Comercial / Proposta
  ensureSpace(38);
  doc.setFillColor(pr, pg, pb);
  doc.rect(margin, y, 2.5, 6, 'F');

  doc.setFillColor(241, 245, 249);
  doc.rect(margin + 2.5, y, contentWidth - 2.5, 6, 'F');

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('5. SUGESTÃO COMERCIAL RECOMENDADA & PLANO DE AÇÃO', margin + 5, y + 4.2);

  y += 8;

  // Proposal Box
  doc.setFillColor(254, 252, 232); // subtle light yellow
  doc.setDrawColor(253, 224, 71);
  doc.roundedRect(margin, y, contentWidth, 24, 1.5, 1.5, 'FD');

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(30, 41, 59);

  const proposalText =
    formData.commercialProposalSuggestion ||
    'Proposta técnica orientada à comprovação de menor Custo por Quilômetro (CPK) através de carcaças selecionadas e garantia de rendimento por banda.';

  const splitProposal = doc.splitTextToSize(proposalText, contentWidth - 8);
  doc.text(splitProposal, margin + 4, y + 6);

  y += 28;

  // Signatures
  ensureSpace(28);
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.4);

  const sigColWidth = (contentWidth - 20) / 2;

  // Consultant signature line
  doc.line(margin + 4, y + 14, margin + 4 + sigColWidth, y + 14);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.text(
    formData.consultantName || 'Consultor Técnico da Recapadora',
    margin + 4 + sigColWidth / 2,
    y + 18,
    { align: 'center' }
  );
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);
  doc.text('Consultor Técnico Especialista', margin + 4 + sigColWidth / 2, y + 22, {
    align: 'center',
  });

  // Client signature line
  doc.line(margin + 16 + sigColWidth, y + 14, margin + 16 + sigColWidth * 2, y + 14);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.text(
    formData.contactPerson || 'Responsável da Transportadora',
    margin + 16 + sigColWidth + sigColWidth / 2,
    y + 18,
    { align: 'center' }
  );
  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184);
  doc.text('Gestor da Frota / Manutenção', margin + 16 + sigColWidth + sigColWidth / 2, y + 22, {
    align: 'center',
  });

  // Page numbers on all pages
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184);
    doc.text(
      `RecapData • Documento confidencial de diagnóstico de pneus • Página ${i} de ${totalPages}`,
      margin,
      pageHeight - 8
    );
    doc.text(
      `Emitido em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`,
      pageWidth - margin,
      pageHeight - 8,
      { align: 'right' }
    );
  }

  return doc;
};

export const getSurveyPDFFilename = (companyName?: string): string => {
  const cleanName = (companyName || 'Transportadora')
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .replace(/_+/g, '_');
  const dateStamp = new Date().toISOString().split('T')[0];
  return `Laudo_Tecnico_RecapData_${cleanName}_${dateStamp}.pdf`;
};

export const downloadSurveyPDF = (formData: FormDataState, themeHex?: string): void => {
  const doc = generateSurveyPDF(formData, { themeColorHex: themeHex });
  const filename = getSurveyPDFFilename(formData.companyName);
  doc.save(filename);
};

export const openSurveyPDFInNewTab = (formData: FormDataState, themeHex?: string): void => {
  const doc = generateSurveyPDF(formData, { themeColorHex: themeHex });
  const blob = doc.output('blob');
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');
};
