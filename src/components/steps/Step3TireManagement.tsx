import React from 'react';
import { Disc, Gauge, Wrench, Clock, Activity, Sparkles, Check } from 'lucide-react';
import { FormDataState } from '../../types';
import { NEW_TIRE_BRANDS, VEHICLE_CONFIGURATIONS } from '../../data/constants';

interface Step3Props {
  formData: FormDataState;
  onChange: (updates: Partial<FormDataState>) => void;
}

export const Step3TireManagement: React.FC<Step3Props> = ({ formData, onChange }) => {
  // Calculate suggested tire count based on trucks & configurations
  const truckCount = typeof formData.truckCount === 'number' ? formData.truckCount : 0;
  const suggestedTires = React.useMemo(() => {
    if (truckCount <= 0 || !formData.vehicleTypes || formData.vehicleTypes.length === 0) return 0;
    const avgTiresPerTruck = formData.vehicleTypes.reduce((acc, typeId) => {
      const config = VEHICLE_CONFIGURATIONS.find(c => c.id === typeId);
      return acc + (config ? config.defaultTires : 18);
    }, 0) / formData.vehicleTypes.length;
    return Math.round(truckCount * avgTiresPerTruck);
  }, [truckCount, formData.vehicleTypes]);

  const toggleNewTireBrand = (brand: string) => {
    const current = formData.predominantNewTireBrands || [];
    if (current.includes(brand)) {
      onChange({ predominantNewTireBrands: current.filter(b => b !== brand) });
    } else {
      onChange({ predominantNewTireBrands: [...current, brand] });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-700/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
            <Disc className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">3. Gestão e Uso de Pneus</h2>
            <p className="text-sm text-slate-400">Controle de calibragem, borracharia, marcas preferidas e rendimento.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Quantidade de Pneus em Uso */}
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="tiresInUseCount" className="block text-sm font-semibold text-slate-200">
              Quantidade de Pneus em Uso na Frota <span className="text-amber-400">*</span>
            </label>
            {suggestedTires > 0 && formData.tiresInUseCount === '' && (
              <button
                type="button"
                onClick={() => onChange({ tiresInUseCount: suggestedTires })}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800"
              >
                <Sparkles className="w-3 h-3" />
                Usar sugerido (~{suggestedTires})
              </button>
            )}
          </div>
          <div className="relative">
            <input
              type="number"
              id="tiresInUseCount"
              placeholder={suggestedTires > 0 ? `Ex: ~${suggestedTires} pneus` : 'Ex: 480'}
              value={formData.tiresInUseCount === '' ? '' : formData.tiresInUseCount}
              onChange={(e) => {
                const val = e.target.value === '' ? '' : parseInt(e.target.value, 10);
                onChange({ tiresInUseCount: isNaN(val as number) ? '' : val });
              }}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 text-lg font-bold"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 uppercase">
              Pneus Rodando
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Total de pneus instalados nos cavalos, carretas, semirreboques e estepes.
          </p>
        </div>

        {/* Marca e Modelo de Pneus de Preferência */}
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <label htmlFor="preferredBrandAndModel" className="block text-sm font-semibold text-slate-200 mb-1.5">
            Qual Marca e Modelo de Pneus de Sua Preferência? <span className="text-amber-400">*</span>
          </label>
          <input
            type="text"
            id="preferredBrandAndModel"
            placeholder="Ex: Michelin X Multiway 295/80R22.5, Bridgestone R268..."
            value={formData.preferredBrandAndModel}
            onChange={(e) => onChange({ preferredBrandAndModel: e.target.value })}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 text-sm font-medium"
          />
          <p className="text-xs text-slate-400 mt-2">
            Medida e modelo mais elogiados pelo gestor ou motoristas.
          </p>
        </div>

        {/* Marcas de Pneus Novos com Maior Participação */}
        <div className="md:col-span-2 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <label className="block text-sm font-semibold text-slate-200 mb-1">
            Quais as Marcas de Pneus Novos com Maior Participação? <span className="text-amber-400">*</span>
          </label>
          <p className="text-xs text-slate-400 mb-3">Selecione todas as marcas presentes na frota:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {NEW_TIRE_BRANDS.map((brand) => {
              const isSelected = formData.predominantNewTireBrands?.includes(brand);
              return (
                <button
                  type="button"
                  key={brand}
                  id={`brand-${brand.replace(/\s+/g, '-').toLowerCase()}`}
                  onClick={() => toggleNewTireBrand(brand)}
                  className={`p-2.5 rounded-lg border text-left flex items-center justify-between text-xs sm:text-sm font-medium transition-all ${
                    isSelected
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500/50'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/40'
                  }`}
                >
                  <span className="truncate">{brand}</span>
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ml-1.5 ${
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

        {/* Possui Controle de Pressão? */}
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <label className="block text-sm font-semibold text-slate-200 mb-2">
            Possui Controle de Pressão? <span className="text-amber-400">*</span>
          </label>
          <div className="space-y-2">
            {[
              { id: 'sim_sensores_tpms', label: 'Sim, Sensores Eletrônicos (TPMS / Telemetria)', desc: 'Monitoramento contínuo em tempo real' },
              { id: 'sim_manual_frequente', label: 'Sim, Medição Manual Frequente', desc: 'Calibrador de precisão no pátio da empresa' },
              { id: 'parcial', label: 'Parcial / Apenas quando motorista avisa', desc: 'Sem rotina preventiva rigorosa' },
              { id: 'nao_possui', label: 'Não Possui Controle de Pressão', desc: 'Calibra aleatoriamente em postos de combustível' },
            ].map((p) => {
              const isSelected = formData.pressureControl === p.id;
              return (
                <label
                  key={p.id}
                  className={`flex items-start gap-3 p-2.5 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-emerald-500/10 border-emerald-500/80 text-emerald-200'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/40'
                  }`}
                >
                  <input
                    type="radio"
                    name="pressureControl"
                    checked={isSelected}
                    onChange={() => onChange({ pressureControl: p.id as FormDataState['pressureControl'] })}
                    className="mt-1 text-emerald-500 focus:ring-emerald-500"
                  />
                  <div>
                    <div className="text-sm font-medium">{p.label}</div>
                    <div className="text-xs text-slate-400">{p.desc}</div>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* Tem Borracharia Própria? */}
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <label className="block text-sm font-semibold text-slate-200 mb-2">
            Tem Borracharia Própria? <span className="text-amber-400">*</span>
          </label>
          <div className="space-y-2">
            {[
              { id: 'sim_propria_equipe', label: 'Sim, Borracharia Própria com Equipe', desc: 'Borracheiro dedicado em tempo integral' },
              { id: 'sim_sem_equipe', label: 'Sim, Espaço Próprio sem Borracheiro Fixo', desc: 'Mecânicos da frota fazem a troca' },
              { id: 'terceirizada', label: 'Borracharia Terceirizada Conveniada', desc: 'Prestador de serviço dentro ou perto da garagem' },
              { id: 'nao_tem_posto', label: 'Não Tem (Utiliza Borracharias de Posto)', desc: 'Serviços avulsos na estrada' },
            ].map((b) => {
              const isSelected = formData.hasOwnTireShop === b.id;
              return (
                <label
                  key={b.id}
                  className={`flex items-start gap-3 p-2.5 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-emerald-500/10 border-emerald-500/80 text-emerald-200'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/40'
                  }`}
                >
                  <input
                    type="radio"
                    name="hasOwnTireShop"
                    checked={isSelected}
                    onChange={() => onChange({ hasOwnTireShop: b.id as FormDataState['hasOwnTireShop'] })}
                    className="mt-1 text-emerald-500 focus:ring-emerald-500"
                  />
                  <div>
                    <div className="text-sm font-medium">{b.label}</div>
                    <div className="text-xs text-slate-400">{b.desc}</div>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* Qual a Pressão Utilizada? (PSI) */}
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <label htmlFor="standardPressurePsi" className="block text-sm font-semibold text-slate-200 mb-1.5">
            Qual a Pressão Utilizada? (PSI / Libras) <span className="text-amber-400">*</span>
          </label>
          <div className="relative">
            <Gauge className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="number"
              id="standardPressurePsi"
              min="80"
              max="150"
              placeholder="Ex: 110 a 120 PSI"
              value={formData.standardPressurePsi === '' ? '' : formData.standardPressurePsi}
              onChange={(e) => {
                const val = e.target.value === '' ? '' : parseInt(e.target.value, 10);
                onChange({ standardPressurePsi: isNaN(val as number) ? '' : val });
              }}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-11 pr-16 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 text-base font-bold"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-emerald-400 uppercase">
              PSI / Lbs
            </span>
          </div>
          <div className="flex gap-2 mt-2">
            {[105, 110, 115, 120].map((psi) => (
              <button
                type="button"
                key={psi}
                onClick={() => onChange({ standardPressurePsi: psi })}
                className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-emerald-300 border border-slate-700"
              >
                {psi} PSI
              </button>
            ))}
          </div>
        </div>

        {/* Frequência de Calibração */}
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <label htmlFor="calibrationFrequency" className="block text-sm font-semibold text-slate-200 mb-1.5">
            Calibra os Pneus com que Frequência? <span className="text-amber-400">*</span>
          </label>
          <div className="relative">
            <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <select
              id="calibrationFrequency"
              value={formData.calibrationFrequency}
              onChange={(e) => onChange({ calibrationFrequency: e.target.value as FormDataState['calibrationFrequency'] })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 text-sm font-medium"
            >
              <option value="diaria">Diária (Antes de cada viagem/saída)</option>
              <option value="2_3_vezes_semana">2 a 3 vezes por semana</option>
              <option value="semanal">Semanalmente (Padrão ouro de frota)</option>
              <option value="quinzenal">Quinzenalmente</option>
              <option value="mensal">Mensalmente</option>
              <option value="apenas_preventiva">Apenas nas revisões preventivas</option>
            </select>
          </div>
        </div>

        {/* Possui Controle Eficiente de Rendimento dos Pneus? */}
        <div className="md:col-span-2 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <label className="block text-sm font-semibold text-slate-200 mb-1.5">
            Possui Controle Eficiente de Rendimento dos Pneus? (KM/mm ou CPK) <span className="text-amber-400">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { id: 'sim_software_gestao', label: 'Sim, Software de Gestão Especializado', desc: 'Totvs, Sofit, Prolog, etc.' },
              { id: 'sim_planilhas', label: 'Sim, Planilhas Internas (Excel/Drive)', desc: 'Controle de histórico e KM' },
              { id: 'sim_relatorios_terceiros', label: 'Sim, Relatórios do Fornecedor Atual', desc: 'Laudos fornecidos pela recapadora' },
              { id: 'nao_possui', label: 'Não Possui Controle Eficiente', desc: 'Oportunidade para implantação técnica' },
            ].map((item) => {
              const isSelected = formData.hasTireYieldControl === item.id;
              return (
                <button
                  type="button"
                  key={item.id}
                  id={`yield-${item.id}`}
                  onClick={() => onChange({ hasTireYieldControl: item.id as FormDataState['hasTireYieldControl'] })}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-emerald-950/70 border-emerald-400 text-emerald-200 ring-1 ring-emerald-400/40'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800/40'
                  }`}
                >
                  <Activity className={`w-4 h-4 mb-1.5 ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`} />
                  <div className="text-xs sm:text-sm font-semibold">{item.label}</div>
                  <div className="text-xs text-slate-400 mt-1">{item.desc}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
