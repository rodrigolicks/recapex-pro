import React, { useState } from 'react';
import { X, Printer, Share2, Copy, Check, Building2, Truck, Disc, Repeat, Fuel, Target, Phone, Mail, MapPin, Calendar, Award, ShieldCheck, DollarSign } from 'lucide-react';
import { FormDataState } from '../types';
import { calculateFleetMetrics } from '../utils/calculations';
import { formatCurrency, formatDate, formatNumber } from '../utils/formatters';
import { VEHICLE_CONFIGURATIONS } from '../data/constants';

interface SurveyReportModalProps {
  formData: FormDataState;
  onClose: () => void;
}

export const SurveyReportModal: React.FC<SurveyReportModalProps> = ({ formData, onClose }) => {
  const [copied, setCopied] = useState(false);
  const metrics = calculateFleetMetrics(formData);

  const vehicleLabels = (formData.vehicleTypes || []).map(id => {
    const config = VEHICLE_CONFIGURATIONS.find(c => c.id === id);
    return config ? config.label : id;
  }).join(', ');

  const generateWhatsAppMessage = () => {
    const msg = `*📋 DIAGNÓSTICO TÉCNICO & COLETA DE PNEUS - RECAPADORA*
----------------------------------------
🏢 *Transportadora:* ${formData.companyName || 'Não informada'}
👤 *Contato:* ${formData.contactPerson || '-'} (${formData.contactRole || 'Gestor'})
📱 *WhatsApp:* ${formData.whatsapp || '-'}
📍 *Local:* ${formData.city || '-'}/${formData.state || '-'}
👨‍💼 *Consultor Recapadora:* ${formData.consultantName || '-'}

🚛 *PERFIL DA FROTA:*
• Veículos: ${vehicleLabels || 'Caminhões'}
• Qtd Caminhões: ${formData.truckCount || 0} veículos
• Segmento: ${formData.transportSegment || '-'}
• Marca Principal: ${formData.predominantTruckBrand || '-'}
• Potência: ${formData.truckHorsepower || '-'}
• Trajeto: ${formData.routeType === 'longa_distancia' ? 'Longa Distância' : formData.routeType === 'regional' ? 'Regional' : 'Misto'}
• Piso: ${formData.pavedRoadOnly === 'sim_100' ? '100% Pavimentado' : 'Misto Asfalto/Terra'}

🔘 *GESTÃO & USO DE PNEUS:*
• Pneus em uso: ~${formData.tiresInUseCount || metrics.totalEstimatedTires} pneus
• Marcas novos: ${(formData.predominantNewTireBrands || []).join(', ') || '-'}
• Marca/Modelo preferido: ${formData.preferredBrandAndModel || '-'}
• Pressão utilizada: ${formData.standardPressurePsi || '-'} PSI
• Frequência calibração: ${formData.calibrationFrequency || '-'}
• Borracharia: ${formData.hasOwnTireShop?.includes('propria') ? 'Própria' : 'Terceirizada/Posto'}
• Controle de rendimento: ${formData.hasTireYieldControl?.includes('software') ? 'Software especializado' : formData.hasTireYieldControl?.includes('planilhas') ? 'Planilhas' : 'Sem controle'}

🔄 *REFORMA & MERCADO ATUAL:*
• Marca atual de recapagem: ${formData.currentRetreadBrand || '-'}
• Desenhos mais usados: ${(formData.mostUsedTreadPatterns || []).join(', ') || '-'}
• Preço médio reforma: R$ ${formData.averageRetreadPrice || '-'}
• Conceito sobre reforma: ${formData.clientConceptOnRetread || '-'}
• Conceito sobre pneus chineses: ${formData.clientConceptOnChineseTires || '-'}
• Motivo principal de descarte: ${formData.mainTireDisposalReason || '-'}

⛽ *COMBUSTÍVEL:*
• Controle de consumo: ${formData.hasFuelControl?.includes('rigoroso') ? 'Rigoroso por veículo/motorista' : 'Global/Sem controle'}
• Relaciona profundidade ao consumo: ${formData.relatesTreadDepthToFuel?.includes('sim') ? 'Sim, consciente' : 'Parcial ou Desconhece'}

💡 *DIAGNÓSTICO & PROPOSTA COMERCIAL:*
• Gaps / Fornecedor atual: ${(formData.currentSupplierDecisiveFactor || []).join('; ') || '-'}
• Ações para fechar: ${(formData.actionToBecomeMainSupplier || []).join('; ') || '-'}
• *Sugestão Comercial:* ${formData.commercialProposalSuggestion || '-'}

📊 *INDICADORES ESTIMADOS:*
• Potencial de reformas: ~${formatNumber(metrics.annualRetreadPotential)} pneus/ano
• Economia estimada vs novo: ${formatCurrency(metrics.annualSavingsPotential)} /ano
• Índice de Oportunidade: ${metrics.opportunityScore}/100 (${metrics.maturityLevel})
----------------------------------------
_Coleta realizada via App de Diagnóstico Técnico de Frotas_`;

    return encodeURIComponent(msg);
  };

  const handleCopyText = () => {
    const rawMsg = decodeURIComponent(generateWhatsAppMessage());
    navigator.clipboard.writeText(rawMsg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${generateWhatsAppMessage()}`;
    window.open(url, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto print:p-0 print:bg-white">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh] print:max-h-none print:border-none print:shadow-none print:bg-white print:text-black">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between gap-3 sticky top-0 z-10 print:hidden">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100">Ficha Técnica & Diagnóstico Comercial</h3>
              <p className="text-xs text-slate-400">Resumo completo da coleta de dados de pneus da frota</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
              title="Copiar texto formatado"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? 'Copiado!' : 'Copiar Texto'}</span>
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md shadow-emerald-950/40 transition-colors"
              title="Enviar para WhatsApp"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-md shadow-sky-950/40 transition-colors"
              title="Imprimir ou Salvar em PDF"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Imprimir / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl transition-colors"
              title="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Printable Content */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 text-slate-200 print:text-slate-900 print:p-0 print:overflow-visible">
          {/* Printable Report Header */}
          <div className="border-b-2 border-amber-500 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider font-bold text-amber-500 print:text-amber-700">
                Laudo Técnico de Oportunidade & Reforma
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-100 print:text-slate-900 mt-1">
                {formData.companyName || 'Transportadora Sem Nome'}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 print:text-slate-600 mt-2">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 print:text-amber-700" />
                  {formData.city || 'Cidade'}, {formData.state || 'UF'}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-400 print:text-amber-700" />
                  {formatDate(formData.createdAt)}
                </span>
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400 print:text-amber-700" />
                  Consultor: {formData.consultantName || 'Não especificado'}
                </span>
              </div>
            </div>

            {/* Score Pill */}
            <div className="bg-slate-950/80 print:bg-slate-100 border border-slate-800 print:border-slate-300 p-3.5 rounded-xl text-center shrink-0 min-w-[140px]">
              <div className="text-[10px] uppercase font-bold text-slate-400 print:text-slate-600">Score de Oportunidade</div>
              <div className="text-2xl font-black text-amber-400 print:text-amber-600">{metrics.opportunityScore}/100</div>
              <div className="text-xs font-semibold text-emerald-400 print:text-emerald-700">{metrics.maturityLevel}</div>
            </div>
          </div>

          {/* Key Metrics Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-950/60 print:bg-slate-50 p-3 rounded-xl border border-slate-800 print:border-slate-200">
              <span className="text-xs text-slate-400 print:text-slate-500">Caminhões</span>
              <div className="text-lg font-bold text-slate-100 print:text-slate-900">{formData.truckCount || 0} unid.</div>
            </div>
            <div className="bg-slate-950/60 print:bg-slate-50 p-3 rounded-xl border border-slate-800 print:border-slate-200">
              <span className="text-xs text-slate-400 print:text-slate-500">Pneus Mapeados</span>
              <div className="text-lg font-bold text-slate-100 print:text-slate-900">{formatNumber(metrics.totalEstimatedTires)}</div>
            </div>
            <div className="bg-slate-950/60 print:bg-slate-50 p-3 rounded-xl border border-slate-800 print:border-slate-200">
              <span className="text-xs text-slate-400 print:text-slate-500">Potencial Reformas/Ano</span>
              <div className="text-lg font-bold text-sky-400 print:text-sky-700">~{formatNumber(metrics.annualRetreadPotential)}</div>
            </div>
            <div className="bg-slate-950/60 print:bg-slate-50 p-3 rounded-xl border border-slate-800 print:border-slate-200">
              <span className="text-xs text-slate-400 print:text-slate-500">Economia Anual Est.</span>
              <div className="text-lg font-bold text-emerald-400 print:text-emerald-700">{formatCurrency(metrics.annualSavingsPotential)}</div>
            </div>
          </div>

          {/* Detailed Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs sm:text-sm">
            {/* 1. Contato & Frota */}
            <div className="bg-slate-950/40 print:bg-white p-4 rounded-xl border border-slate-800 print:border-slate-300 space-y-2.5">
              <h4 className="font-bold text-amber-400 print:text-amber-800 flex items-center gap-2 border-b border-slate-800 print:border-slate-200 pb-1.5">
                <Truck className="w-4 h-4" /> 1. Contato & Perfil da Frota
              </h4>
              <div className="grid grid-cols-2 gap-2 text-slate-300 print:text-slate-800">
                <div><strong className="text-slate-400 print:text-slate-600">Contato:</strong> {formData.contactPerson || '-'}</div>
                <div><strong className="text-slate-400 print:text-slate-600">Cargo:</strong> {formData.contactRole || '-'}</div>
                <div><strong className="text-slate-400 print:text-slate-600">WhatsApp:</strong> {formData.whatsapp || '-'}</div>
                <div><strong className="text-slate-400 print:text-slate-600">E-mail:</strong> {formData.email || '-'}</div>
                <div className="col-span-2"><strong className="text-slate-400 print:text-slate-600">Segmento:</strong> {formData.transportSegment}</div>
                <div className="col-span-2"><strong className="text-slate-400 print:text-slate-600">Veículos:</strong> {vehicleLabels}</div>
                <div><strong className="text-slate-400 print:text-slate-600">Marca Caminhão:</strong> {formData.predominantTruckBrand}</div>
                <div><strong className="text-slate-400 print:text-slate-600">Potência:</strong> {formData.truckHorsepower}</div>
                <div><strong className="text-slate-400 print:text-slate-600">Trajeto:</strong> {formData.routeType}</div>
                <div><strong className="text-slate-400 print:text-slate-600">Piso Pavimentado:</strong> {formData.pavedRoadOnly}</div>
              </div>
            </div>

            {/* 2. Gestão de Pneus & Manutenção */}
            <div className="bg-slate-950/40 print:bg-white p-4 rounded-xl border border-slate-800 print:border-slate-300 space-y-2.5">
              <h4 className="font-bold text-sky-400 print:text-sky-800 flex items-center gap-2 border-b border-slate-800 print:border-slate-200 pb-1.5">
                <Disc className="w-4 h-4" /> 2. Gestão e Manutenção de Pneus
              </h4>
              <div className="grid grid-cols-2 gap-2 text-slate-300 print:text-slate-800">
                <div><strong className="text-slate-400 print:text-slate-600">Pneus Rodando:</strong> {formData.tiresInUseCount || metrics.totalEstimatedTires}</div>
                <div><strong className="text-slate-400 print:text-slate-600">Pressão Padrão:</strong> {formData.standardPressurePsi} PSI</div>
                <div className="col-span-2"><strong className="text-slate-400 print:text-slate-600">Marcas Novos:</strong> {(formData.predominantNewTireBrands || []).join(', ')}</div>
                <div className="col-span-2"><strong className="text-slate-400 print:text-slate-600">Modelo Preferido:</strong> {formData.preferredBrandAndModel || '-'}</div>
                <div><strong className="text-slate-400 print:text-slate-600">Calibragem:</strong> {formData.calibrationFrequency}</div>
                <div><strong className="text-slate-400 print:text-slate-600">Borracharia:</strong> {formData.hasOwnTireShop}</div>
                <div className="col-span-2"><strong className="text-slate-400 print:text-slate-600">Controle Pressão:</strong> {formData.pressureControl}</div>
                <div className="col-span-2"><strong className="text-slate-400 print:text-slate-600">Controle de KM/CPK:</strong> {formData.hasTireYieldControl}</div>
              </div>
            </div>

            {/* 3. Reforma & Mercado Atual */}
            <div className="bg-slate-950/40 print:bg-white p-4 rounded-xl border border-slate-800 print:border-slate-300 space-y-2.5">
              <h4 className="font-bold text-purple-400 print:text-purple-800 flex items-center gap-2 border-b border-slate-800 print:border-slate-200 pb-1.5">
                <Repeat className="w-4 h-4" /> 3. Reforma Atual & Conceito do Cliente
              </h4>
              <div className="space-y-1.5 text-slate-300 print:text-slate-800">
                <div><strong className="text-slate-400 print:text-slate-600">Marca Reforma Atual:</strong> {formData.currentRetreadBrand} (Méd. R$ {formData.averageRetreadPrice})</div>
                <div><strong className="text-slate-400 print:text-slate-600">Desenhos mais usados:</strong> {(formData.mostUsedTreadPatterns || []).join('; ')}</div>
                <div><strong className="text-slate-400 print:text-slate-600">Conceito Reforma:</strong> {formData.clientConceptOnRetread} {formData.clientConceptOnRetreadNotes ? `(${formData.clientConceptOnRetreadNotes})` : ''}</div>
                <div><strong className="text-slate-400 print:text-slate-600">Conceito Pneus Chineses:</strong> {formData.clientConceptOnChineseTires} {formData.clientConceptOnChineseTiresNotes ? `(${formData.clientConceptOnChineseTiresNotes})` : ''}</div>
                <div><strong className="text-slate-400 print:text-slate-600">Motivo Descarte/Sucata:</strong> {formData.mainTireDisposalReason}</div>
              </div>
            </div>

            {/* 4. Combustível & Estratégia */}
            <div className="bg-slate-950/40 print:bg-white p-4 rounded-xl border border-slate-800 print:border-slate-300 space-y-2.5">
              <h4 className="font-bold text-emerald-400 print:text-emerald-800 flex items-center gap-2 border-b border-slate-800 print:border-slate-200 pb-1.5">
                <Fuel className="w-4 h-4" /> 4. Combustível & Fatores Decisivos
              </h4>
              <div className="space-y-1.5 text-slate-300 print:text-slate-800">
                <div><strong className="text-slate-400 print:text-slate-600">Controle Diesel:</strong> {formData.hasFuelControl}</div>
                <div><strong className="text-slate-400 print:text-slate-600">Relaciona Sulco x Diesel:</strong> {formData.relatesTreadDepthToFuel}</div>
                <div><strong className="text-slate-400 print:text-slate-600">Fator Concorrente:</strong> {(formData.currentSupplierDecisiveFactor || []).join(', ')}</div>
                <div><strong className="text-slate-400 print:text-slate-600">Ações Chave:</strong> {(formData.actionToBecomeMainSupplier || []).join(', ')}</div>
              </div>
            </div>
          </div>

          {/* Sugestão Comercial / Proposta de Valor */}
          <div className="bg-slate-950/60 print:bg-slate-50 p-5 rounded-xl border border-amber-500/40 print:border-slate-300">
            <h4 className="font-bold text-amber-400 print:text-amber-800 flex items-center gap-2 mb-2">
              <Target className="w-4 h-4" /> Sugestão Comercial Recomendada & Próximos Passos:
            </h4>
            <p className="text-slate-200 print:text-slate-900 whitespace-pre-line text-sm leading-relaxed">
              {formData.commercialProposalSuggestion || 'Nenhuma proposta comercial redigida ainda.'}
            </p>

            {formData.notes && (
              <div className="mt-3 pt-3 border-t border-slate-800 print:border-slate-200 text-xs text-slate-400 print:text-slate-600">
                <strong>Notas Internas:</strong> {formData.notes}
              </div>
            )}
          </div>

          {/* Signatures for Print */}
          <div className="hidden print:grid grid-cols-2 gap-10 pt-10 mt-8 border-t border-slate-300 text-xs text-slate-700 text-center">
            <div>
              <div className="border-b border-slate-400 pb-1 mb-1 font-semibold">{formData.consultantName || 'Consultor Técnico da Recapadora'}</div>
              <div>Consultor Técnico Comercial</div>
            </div>
            <div>
              <div className="border-b border-slate-400 pb-1 mb-1 font-semibold">{formData.contactPerson || 'Responsável da Transportadora'}</div>
              <div>Gestor da Frota / Manutenção</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
