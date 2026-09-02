import React from 'react';
import { Target, CheckSquare, Sparkles, TrendingUp, DollarSign, Lightbulb, FileText, Check } from 'lucide-react';
import { FormDataState } from '../../types';
import { SUPPLIER_DECISIVE_FACTORS, ACTIONS_TO_BECOME_MAIN_SUPPLIER } from '../../data/constants';
import { calculateFleetMetrics } from '../../utils/calculations';
import { formatCurrency, formatNumber } from '../../utils/formatters';

interface Step6Props {
  formData: FormDataState;
  onChange: (updates: Partial<FormDataState>) => void;
}

export const Step6CommercialStrategy: React.FC<Step6Props> = ({ formData, onChange }) => {
  const metrics = calculateFleetMetrics(formData);

  const toggleFactor = (factor: string) => {
    const current = formData.currentSupplierDecisiveFactor || [];
    if (current.includes(factor)) {
      onChange({ currentSupplierDecisiveFactor: current.filter(f => f !== factor) });
    } else {
      onChange({ currentSupplierDecisiveFactor: [...current, factor] });
    }
  };

  const toggleAction = (action: string) => {
    const current = formData.actionToBecomeMainSupplier || [];
    if (current.includes(action)) {
      onChange({ actionToBecomeMainSupplier: current.filter(a => a !== action) });
    } else {
      onChange({ actionToBecomeMainSupplier: [...current, action] });
    }
  };

  const applyTemplateProposal = (text: string) => {
    const current = formData.commercialProposalSuggestion || '';
    if (current.trim().length > 0) {
      onChange({ commercialProposalSuggestion: `${current}\n• ${text}` });
    } else {
      onChange({ commercialProposalSuggestion: `• ${text}` });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-700/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">6. Diagnóstico Comercial & Estratégia de Fechamento</h2>
            <p className="text-sm text-slate-400">Identificação de gaps do concorrente, plano de ação e proposta de valor da recapadora.</p>
          </div>
        </div>
      </div>

      {/* Fleet Potential & Opportunity Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-4 rounded-xl border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>Pneus Totais Estimados</span>
            <span className="p-1 rounded bg-slate-800 text-sky-400 font-mono">Frota</span>
          </div>
          <div className="text-2xl font-black text-slate-100 mt-2">
            {formatNumber(metrics.totalEstimatedTires)} <span className="text-xs font-normal text-slate-400">pneus</span>
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Potencial anual de ~{formatNumber(metrics.annualRetreadPotential)} reformas/ano
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-4 rounded-xl border border-emerald-900/40 shadow-sm">
          <div className="flex items-center justify-between text-xs text-emerald-400 font-medium">
            <span>Economia Anual com Reforma</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 mt-2">
            {formatCurrency(metrics.annualSavingsPotential)}
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Economia média calculada vs compra de pneus novos
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-4 rounded-xl border border-amber-900/40 shadow-sm">
          <div className="flex items-center justify-between text-xs text-amber-400 font-medium">
            <span>Índice de Oportunidade</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400 mt-2">
            {metrics.opportunityScore} <span className="text-sm font-normal text-slate-400">/ 100</span>
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Maturidade da Frota: <strong className="text-slate-200">{metrics.maturityLevel}</strong>
          </div>
        </div>
      </div>

      {/* Motivo Determinante Fornecedor Atual */}
      <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800">
        <label className="block text-sm font-semibold text-slate-200 mb-1">
          Motivo Determinante para o Cliente Utilizar o Fornecedor Atual? <span className="text-amber-400">*</span>
        </label>
        <p className="text-xs text-slate-400 mb-3">Selecione os principais fatores que prendem o cliente à recapadora concorrente:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {SUPPLIER_DECISIVE_FACTORS.map((factor) => {
            const isSelected = formData.currentSupplierDecisiveFactor?.includes(factor);
            return (
              <button
                type="button"
                key={factor}
                id={`factor-${factor.slice(0, 15).replace(/\s+/g, '-').toLowerCase()}`}
                onClick={() => toggleFactor(factor)}
                className={`p-3 rounded-xl border text-left flex items-center justify-between text-xs sm:text-sm font-medium transition-all ${
                  isSelected
                    ? 'bg-amber-950/50 border-amber-500 text-amber-200 ring-1 ring-amber-500/40'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/40'
                }`}
              >
                <span>{factor}</span>
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ml-2 ${
                    isSelected ? 'bg-amber-500 text-slate-950' : 'border border-slate-700 bg-slate-800'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* O que precisamos fazer para ser o fornecedor principal? */}
      <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800">
        <label className="block text-sm font-semibold text-slate-200 mb-1">
          O que Precisamos Fazer para Ser o Fornecedor Principal? <span className="text-amber-400">*</span>
        </label>
        <p className="text-xs text-slate-400 mb-3">Ações estratégicas necessárias para fechar a conta da transportadora:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {ACTIONS_TO_BECOME_MAIN_SUPPLIER.map((action) => {
            const isSelected = formData.actionToBecomeMainSupplier?.includes(action);
            return (
              <button
                type="button"
                key={action}
                id={`action-${action.slice(0, 15).replace(/\s+/g, '-').toLowerCase()}`}
                onClick={() => toggleAction(action)}
                className={`p-3 rounded-xl border text-left flex items-center justify-between text-xs sm:text-sm font-medium transition-all ${
                  isSelected
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500/40'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/40'
                }`}
              >
                <span>{action}</span>
                <div
                  className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ml-2 ${
                    isSelected ? 'bg-emerald-500 text-slate-950' : 'border border-slate-700 bg-slate-800'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sugestão Comercial para Ser Avaliada */}
      <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <div>
            <label htmlFor="commercialProposalSuggestion" className="block text-sm font-semibold text-slate-200">
              Sugestão Comercial para Ser Avaliada <span className="text-amber-400">*</span>
            </label>
            <p className="text-xs text-slate-400">
              Descreva a proposta de valor, condições negociadas, lotes de teste e diferenciais técnicos.
            </p>
          </div>
        </div>

        {/* Quick insertion chips */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          <span className="text-xs text-slate-400 flex items-center gap-1 mr-1">
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            Inserir bloco:
          </span>
          {[
            'Teste prático comparativo de CPK em 12 pneus no cavalo de tração.',
            'Tabela progressiva de desconto para remessa quinzenal acima de 20 carcaças.',
            'Prazo de entrega garantido de até 72h com coleta expressa na base.',
            'Implantar análise de sucata com laudo técnico e fotos para a diretoria.',
            'Apresentar banda de baixa resistência ao rolamento com redução comprovada de diesel.',
          ].map((snippet, idx) => (
            <button
              type="button"
              key={idx}
              onClick={() => applyTemplateProposal(snippet)}
              className="text-xs px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-300 border border-slate-700/80 transition-colors"
            >
              + {snippet.slice(0, 38)}...
            </button>
          ))}
        </div>

        <textarea
          id="commercialProposalSuggestion"
          rows={5}
          placeholder="Ex: Sugerimos iniciar com lote piloto de 10 carcaças reformadas com desenho Tração Rodoestrada de 19mm. Acompanhamento quinzenal do consultor técnico medindo sulco e pressão para comprovação de rendimento (CPK)..."
          value={formData.commercialProposalSuggestion}
          onChange={(e) => onChange({ commercialProposalSuggestion: e.target.value })}
          className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 text-sm font-normal leading-relaxed"
        />

        {/* Notas Adicionais / Observações Internas */}
        <div className="mt-4 pt-3 border-t border-slate-800">
          <label htmlFor="notes" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
            Notas Adicionais / Observações Internas da Visita
          </label>
          <input
            type="text"
            id="notes"
            placeholder="Ex: Melhor dia para visita é terça-feira pela manhã. Gestor de frota é muito técnico."
            value={formData.notes || ''}
            onChange={(e) => onChange({ notes: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 placeholder-slate-600 focus:border-slate-600"
          />
        </div>
      </div>
    </div>
  );
};
