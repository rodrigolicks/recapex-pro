import React from 'react';
import { Repeat, Layers, DollarSign, Award, AlertTriangle, Trash2, Check } from 'lucide-react';
import { FormDataState } from '../../types';
import { RETREAD_BRANDS, TREAD_PATTERNS, DISPOSAL_REASONS } from '../../data/constants';

interface Step4Props {
  formData: FormDataState;
  onChange: (updates: Partial<FormDataState>) => void;
}

export const Step4RetreadMarket: React.FC<Step4Props> = ({ formData, onChange }) => {
  const toggleTreadPattern = (pattern: string) => {
    const current = formData.mostUsedTreadPatterns || [];
    if (current.includes(pattern)) {
      onChange({ mostUsedTreadPatterns: current.filter(p => p !== pattern) });
    } else {
      onChange({ mostUsedTreadPatterns: [...current, pattern] });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-700/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-500/10 text-purple-400 rounded-xl border border-purple-500/20">
            <Repeat className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">4. Reforma de Pneus & Mercado Atual</h2>
            <p className="text-sm text-slate-400">Marca atual de recapagem, desenhos utilizados, valores e percepção sobre reforma.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Marca de Reforma com Maior Participação */}
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <label htmlFor="currentRetreadBrand" className="block text-sm font-semibold text-slate-200 mb-1.5">
            Qual a Marca de Reforma com Maior Participação? <span className="text-amber-400">*</span>
          </label>
          <div className="relative">
            <Award className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <select
              id="currentRetreadBrand"
              value={formData.currentRetreadBrand}
              onChange={(e) => onChange({ currentRetreadBrand: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 text-sm font-medium"
            >
              {RETREAD_BRANDS.map((brand) => (
                <option key={brand} value={brand} className="bg-slate-900 text-slate-100">
                  {brand}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Qual Valor Aproximado? (R$ por reforma) */}
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <label htmlFor="averageRetreadPrice" className="block text-sm font-semibold text-slate-200 mb-1.5">
            Qual o Valor Médio Pago por Reforma? (R$) <span className="text-amber-400">*</span>
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="number"
              id="averageRetreadPrice"
              min="300"
              max="3500"
              placeholder="Ex: 850"
              value={formData.averageRetreadPrice === '' ? '' : formData.averageRetreadPrice}
              onChange={(e) => {
                if (e.target.value === '') {
                  onChange({ averageRetreadPrice: '' });
                } else {
                  const parsed = parseFloat(e.target.value);
                  onChange({ averageRetreadPrice: isNaN(parsed) ? '' : parsed });
                }
              }}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-11 pr-16 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 text-lg font-bold"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-purple-400 uppercase">
              R$ / Pneu
            </span>
          </div>
          <div className="flex gap-2 mt-2">
            {[750, 820, 890, 950].map((val) => (
              <button
                type="button"
                key={val}
                onClick={() => onChange({ averageRetreadPrice: val })}
                className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-purple-300 border border-slate-700"
              >
                R$ {val}
              </button>
            ))}
          </div>
        </div>

        {/* Quais os Desenhos Mais Utilizados? */}
        <div className="md:col-span-2 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <label className="block text-sm font-semibold text-slate-200 mb-1">
            Quais os Desenhos / Bandas Mais Utilizados na Frota? <span className="text-amber-400">*</span>
          </label>
          <p className="text-xs text-slate-400 mb-3">Selecione os perfis de banda de rodagem mais consumidos:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {TREAD_PATTERNS.map((pattern) => {
              const isSelected = formData.mostUsedTreadPatterns?.includes(pattern);
              return (
                <button
                  type="button"
                  key={pattern}
                  id={`tread-${pattern.replace(/\s+/g, '-').toLowerCase()}`}
                  onClick={() => toggleTreadPattern(pattern)}
                  className={`p-3 rounded-lg border text-left flex items-start justify-between text-xs sm:text-sm font-medium transition-all ${
                    isSelected
                      ? 'bg-purple-950/60 border-purple-500 text-purple-200 ring-1 ring-purple-500/50'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-start gap-2 pr-2">
                    <Layers className={`w-4 h-4 shrink-0 mt-0.5 ${isSelected ? 'text-purple-400' : 'text-slate-500'}`} />
                    <span>{pattern}</span>
                  </div>
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected ? 'bg-purple-500 text-slate-950' : 'border border-slate-700 bg-slate-800'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Conceito do Cliente sobre Reforma */}
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <label className="block text-sm font-semibold text-slate-200 mb-2">
            Qual o Conceito do Cliente Sobre Reforma? <span className="text-amber-400">*</span>
          </label>
          <div className="space-y-2">
            {[
              { id: 'excelente_confianca', label: 'Excelente / Confiança Total', desc: 'Reforma 2 a 4 vezes cada carcaça de qualidade' },
              { id: 'bom_indispensavel', label: 'Bom / Indispensável para o Custo da Frota', desc: 'Utiliza em eixos de tração e carretas' },
              { id: 'regular_desconfiado', label: 'Regular / Desconfiado com Garantia', desc: 'Já teve problemas de soltura de banda ou carcaça' },
              { id: 'negativo_apenas_novos', label: 'Crítico / Prefere Pneus Novos ou Chineses', desc: 'Acredita que reforma não compensa o risco' },
            ].map((concept) => {
              const isSelected = formData.clientConceptOnRetread === concept.id;
              return (
                <label
                  key={concept.id}
                  className={`flex items-start gap-3 p-2.5 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-purple-500/10 border-purple-500/80 text-purple-200'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/40'
                  }`}
                >
                  <input
                    type="radio"
                    name="clientConceptOnRetread"
                    checked={isSelected}
                    onChange={() => onChange({ clientConceptOnRetread: concept.id as FormDataState['clientConceptOnRetread'] })}
                    className="mt-1 text-purple-500 focus:ring-purple-500"
                  />
                  <div>
                    <div className="text-sm font-medium">{concept.label}</div>
                    <div className="text-xs text-slate-400">{concept.desc}</div>
                  </div>
                </label>
              );
            })}
          </div>
          <input
            type="text"
            placeholder="Observação sobre a opinião do cliente em relação a reformas..."
            value={formData.clientConceptOnRetreadNotes || ''}
            onChange={(e) => onChange({ clientConceptOnRetreadNotes: e.target.value })}
            className="mt-3 w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200"
          />
        </div>

        {/* Conceito do Cliente sobre Pneus Chineses / Importados */}
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <label className="block text-sm font-semibold text-slate-200 mb-2">
            Qual o Conceito do Cliente Sobre Pneus Chineses? <span className="text-amber-400">*</span>
          </label>
          <div className="space-y-2">
            {[
              { id: 'positivo_custo', label: 'Positivo pelo Custo de Aquisição Imediato', desc: 'Compreende como alternativa barata de entrada' },
              { id: 'usa_apenas_terceiro_eixo', label: 'Usa Apenas em Eixos de Carreta / Terceiro Eixo', desc: 'Não coloca em eixos dianteiros ou tração severa' },
              { id: 'baixa_durabilidade_rejeita', label: 'Rejeita / Carcaça Não Aguenta Reforma', desc: 'Sabe que o custo por quilômetro (CPK) final é pior' },
              { id: 'nao_utiliza', label: 'Não Utiliza / Frota 100% Marcas Tradicionais', desc: 'Política estrita de pneus de primeira linha' },
            ].map((chinese) => {
              const isSelected = formData.clientConceptOnChineseTires === chinese.id;
              return (
                <label
                  key={chinese.id}
                  className={`flex items-start gap-3 p-2.5 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-purple-500/10 border-purple-500/80 text-purple-200'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/40'
                  }`}
                >
                  <input
                    type="radio"
                    name="clientConceptOnChineseTires"
                    checked={isSelected}
                    onChange={() => onChange({ clientConceptOnChineseTires: chinese.id as FormDataState['clientConceptOnChineseTires'] })}
                    className="mt-1 text-purple-500 focus:ring-purple-500"
                  />
                  <div>
                    <div className="text-sm font-medium">{chinese.label}</div>
                    <div className="text-xs text-slate-400">{chinese.desc}</div>
                  </div>
                </label>
              );
            })}
          </div>
          <input
            type="text"
            placeholder="Observações sobre testes prévios com importados..."
            value={formData.clientConceptOnChineseTiresNotes || ''}
            onChange={(e) => onChange({ clientConceptOnChineseTiresNotes: e.target.value })}
            className="mt-3 w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200"
          />
        </div>

        {/* Motivo Principal de Descarte de Pneus */}
        <div className="md:col-span-2 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <label htmlFor="mainTireDisposalReason" className="block text-sm font-semibold text-slate-200 mb-1.5">
            Qual o Motivo Principal de Descarte / Sucateamento de Pneus? <span className="text-amber-400">*</span>
          </label>
          <div className="relative">
            <Trash2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-rose-400" />
            <select
              id="mainTireDisposalReason"
              value={formData.mainTireDisposalReason}
              onChange={(e) => onChange({ mainTireDisposalReason: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 text-sm font-medium"
            >
              {DISPOSAL_REASONS.map((reason) => (
                <option key={reason} value={reason} className="bg-slate-900 text-slate-100">
                  {reason}
                </option>
              ))}
            </select>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Identificar o motivo de descarte permite que a recapadora recomende ações preventivas de raspagem, calibração e aumento da recapabilidade.
          </p>
        </div>
      </div>
    </div>
  );
};
