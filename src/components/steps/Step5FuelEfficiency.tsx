import React from 'react';
import { Fuel, TrendingDown, CheckCircle2, AlertCircle } from 'lucide-react';
import { FormDataState } from '../../types';

interface Step5Props {
  formData: FormDataState;
  onChange: (updates: Partial<FormDataState>) => void;
}

export const Step5FuelEfficiency: React.FC<Step5Props> = ({ formData, onChange }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-700/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl border border-amber-500/20">
            <Fuel className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">5. Combustível & Eficiência Energética</h2>
            <p className="text-sm text-slate-400">Controle de consumo de diesel e correlação técnica com a banda de rodagem.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Controle Eficiente de Combustível */}
        <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-2">
              Cliente Possui Controle Eficiente de Combustível? <span className="text-amber-400">*</span>
            </label>
            <p className="text-xs text-slate-400 mb-4">
              O combustível representa até 40% dos custos da frota. Clientes com controle rigoroso valorizam bandas de baixa resistência ao rolamento.
            </p>

            <div className="space-y-2.5">
              {[
                {
                  id: 'sim_rigoroso',
                  label: 'Sim, Média Rigorosa por Veículo e Motorista (Telemetria/Cartão)',
                  desc: 'Mapeia KM/Litro em tempo real por rota e motorista.'
                },
                {
                  id: 'sim_global',
                  label: 'Sim, Média Global da Frota (Planilha Mensal)',
                  desc: 'Controle de abastecimento na bomba própria ou postos conveniados.'
                },
                {
                  id: 'nao_possui',
                  label: 'Não Possui Controle Eficiente',
                  desc: 'Não faz cruzamento de telemetria ou média detalhada.'
                },
              ].map((fuel) => {
                const isSelected = formData.hasFuelControl === fuel.id;
                return (
                  <label
                    key={fuel.id}
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500/80 text-amber-200 font-medium'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="hasFuelControl"
                      checked={isSelected}
                      onChange={() => onChange({ hasFuelControl: fuel.id as FormDataState['hasFuelControl'] })}
                      className="mt-1 text-amber-500 focus:ring-amber-500"
                    />
                    <div>
                      <div className="text-sm">{fuel.label}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{fuel.desc}</div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="mt-4 p-3 bg-slate-950/70 rounded-lg border border-slate-800/80 text-xs text-slate-400 flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Pneus com pressão correta e banda adequada geram até 3 a 5% de economia direta no diesel.</span>
          </div>
        </div>

        {/* Relaciona Profundidade de Desenho ao Consumo */}
        <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-2">
              Cliente Relaciona Profundidade de Desenho ao Consumo de Combustível? <span className="text-amber-400">*</span>
            </label>
            <p className="text-xs text-slate-400 mb-4">
              Pneus com sulcos excessivamente altos (ex: borrachudos em rodovia plana) aumentam o arrasto e consumo de diesel.
            </p>

            <div className="space-y-2.5">
              {[
                {
                  id: 'sim_conhece',
                  label: 'Sim, Conhece o Impacto da Resistência ao Rolamento',
                  desc: 'Entende a relação entre profundidade de sulco (mm), histerese da borracha e consumo.'
                },
                {
                  id: 'parcialmente',
                  label: 'Parcialmente / Tem Dúvidas Técnicas',
                  desc: 'Sabe que pneu murcho gasta mais, mas não relaciona desenho ou espessura da borracha.'
                },
                {
                  id: 'desconhece',
                  label: 'Desconhece / Foca Apenas na Durabilidade da Borracha',
                  desc: 'Quer apenas a banda mais grossa possível sem ponderar consumo de diesel.'
                },
              ].map((rel) => {
                const isSelected = formData.relatesTreadDepthToFuel === rel.id;
                return (
                  <label
                    key={rel.id}
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500/80 text-amber-200 font-medium'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="relatesTreadDepthToFuel"
                      checked={isSelected}
                      onChange={() => onChange({ relatesTreadDepthToFuel: rel.id as FormDataState['relatesTreadDepthToFuel'] })}
                      className="mt-1 text-amber-500 focus:ring-amber-500"
                    />
                    <div>
                      <div className="text-sm">{rel.label}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{rel.desc}</div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="mt-4 p-3 bg-amber-950/30 rounded-lg border border-amber-900/40 text-xs text-amber-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Argumento de Venda: Demonstrar que a banda certa paga a recapagem na economia de combustível.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
