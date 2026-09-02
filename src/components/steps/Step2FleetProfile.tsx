import React from 'react';
import { Truck, Gauge, Compass, Mountain, ShieldCheck, Check } from 'lucide-react';
import { FormDataState, VehicleConfigurationType } from '../../types';
import { VEHICLE_CONFIGURATIONS, TRANSPORT_SEGMENTS, TRUCK_BRANDS, HORSEPOWER_RANGES } from '../../data/constants';
import { FleetSilhouette } from '../FleetSilhouettes';

interface Step2Props {
  formData: FormDataState;
  onChange: (updates: Partial<FormDataState>) => void;
}

export const Step2FleetProfile: React.FC<Step2Props> = ({ formData, onChange }) => {
  const toggleVehicleType = (typeId: VehicleConfigurationType) => {
    const current = formData.vehicleTypes || [];
    if (current.includes(typeId)) {
      // Keep at least one
      if (current.length > 1) {
        onChange({ vehicleTypes: current.filter(t => t !== typeId) });
      }
    } else {
      onChange({ vehicleTypes: [...current, typeId] });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-700/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-100">2. Configuração & Perfil da Frota</h2>
            <p className="text-sm text-slate-400">Composição dos veículos, rotas, potência e severidade de rodagem.</p>
          </div>
        </div>
      </div>

      {/* Visual Vehicle Type Selection */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-semibold text-slate-200">
            Configuração dos Veículos Predominantes <span className="text-amber-400">*</span>
          </label>
          <span className="text-xs text-slate-400">Selecione um ou mais modelos presentes na frota</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {VEHICLE_CONFIGURATIONS.map((config) => {
            const isSelected = formData.vehicleTypes?.includes(config.id);
            return (
              <div
                key={config.id}
                id={`vehicle-card-${config.id}`}
                onClick={() => toggleVehicleType(config.id)}
                className={`cursor-pointer rounded-xl p-3.5 border transition-all relative flex flex-col justify-between ${
                  isSelected
                    ? 'bg-sky-950/40 border-sky-500 shadow-md shadow-sky-950/50 ring-1 ring-sky-500/50'
                    : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                }`}
              >
                {/* Selection Check Badge */}
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-800 text-sky-400 border border-slate-700">
                      ~{config.defaultTires} pneus / conjunto
                    </span>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-sky-500 text-white' : 'border border-slate-600 bg-slate-800/60'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>

                {/* SVG Silhouette */}
                <div className="py-2 px-1 flex items-center justify-center my-1 bg-slate-950/60 rounded-lg border border-slate-800/80">
                  <FleetSilhouette type={config.id} selected={isSelected} className="w-full h-14 object-contain" />
                </div>

                <div className="mt-2">
                  <h4 className={`text-sm font-semibold ${isSelected ? 'text-sky-300' : 'text-slate-200'}`}>
                    {config.label}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{config.sublabel}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
        {/* Quantidade de Caminhões */}
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <label htmlFor="truckCount" className="block text-sm font-semibold text-slate-200 mb-1.5">
            Quantidade de Caminhões na Frota <span className="text-amber-400">*</span>
          </label>
          <div className="relative">
            <input
              type="number"
              id="truckCount"
              min="1"
              max="5000"
              placeholder="Ex: 35"
              value={formData.truckCount === '' ? '' : formData.truckCount}
              onChange={(e) => {
                const val = e.target.value === '' ? '' : parseInt(e.target.value, 10);
                onChange({ truckCount: isNaN(val as number) ? '' : val });
              }}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 text-lg font-bold"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 uppercase">
              Veículos
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Estimativa de rodagem base para dimensionamento do potencial de recapagem.
          </p>
        </div>

        {/* Segmento de Transporte */}
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <label htmlFor="transportSegment" className="block text-sm font-semibold text-slate-200 mb-1.5">
            Qual o Segmento de Transporte? (Grãos, Combustível, etc.) <span className="text-amber-400">*</span>
          </label>
          <select
            id="transportSegment"
            value={formData.transportSegment}
            onChange={(e) => onChange({ transportSegment: e.target.value })}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 text-sm font-medium"
          >
            {TRANSPORT_SEGMENTS.map((seg) => (
              <option key={seg} value={seg} className="bg-slate-900 text-slate-100">
                {seg}
              </option>
            ))}
          </select>
          {formData.transportSegment.includes('Outro') && (
            <input
              type="text"
              placeholder="Especifique o segmento"
              value={formData.customTransportSegment || ''}
              onChange={(e) => onChange({ customTransportSegment: e.target.value })}
              className="mt-2 w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200"
            />
          )}
        </div>

        {/* Marca de Caminhão com Maior Participação */}
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <label htmlFor="predominantTruckBrand" className="block text-sm font-semibold text-slate-200 mb-1.5">
            Marca de Caminhão com Maior Participação <span className="text-amber-400">*</span>
          </label>
          <select
            id="predominantTruckBrand"
            value={formData.predominantTruckBrand}
            onChange={(e) => onChange({ predominantTruckBrand: e.target.value })}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 text-sm font-medium"
          >
            {TRUCK_BRANDS.map((brand) => (
              <option key={brand} value={brand} className="bg-slate-900 text-slate-100">
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* Potência dos Caminhões */}
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <label htmlFor="truckHorsepower" className="block text-sm font-semibold text-slate-200 mb-1.5">
            Qual a Potência Média dos Caminhões? <span className="text-amber-400">*</span>
          </label>
          <div className="relative">
            <Gauge className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <select
              id="truckHorsepower"
              value={formData.truckHorsepower}
              onChange={(e) => onChange({ truckHorsepower: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 text-sm font-medium"
            >
              {HORSEPOWER_RANGES.map((hp) => (
                <option key={hp} value={hp} className="bg-slate-900 text-slate-100">
                  {hp}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Trajeto: Longa Distância ou Regional */}
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <label className="block text-sm font-semibold text-slate-200 mb-2">
            Qual o Trajeto Predominante? <span className="text-amber-400">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { id: 'longa_distancia', label: 'Longa Distância', desc: 'Rotas interestaduais / Rodoviário contínuo' },
              { id: 'regional', label: 'Regional / Intermunicipal', desc: 'Raio médio até 400 km' },
              { id: 'urbano', label: 'Urbano / Distribuição', desc: 'Para e anda frequente' },
              { id: 'misto', label: 'Misto / Fora de Estrada', desc: 'Transbordo, usina ou fazenda' },
            ].map((route) => {
              const isSelected = formData.routeType === route.id;
              return (
                <button
                  type="button"
                  key={route.id}
                  id={`route-${route.id}`}
                  onClick={() => onChange({ routeType: route.id as FormDataState['routeType'] })}
                  className={`p-3 rounded-xl text-left border transition-all ${
                    isSelected
                      ? 'bg-sky-500/20 border-sky-500 text-sky-200 font-semibold'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Compass className={`w-4 h-4 ${isSelected ? 'text-sky-400' : 'text-slate-500'}`} />
                    <span className="text-sm font-medium">{route.label}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{route.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Somente Piso Pavimentado? */}
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <label className="block text-sm font-semibold text-slate-200 mb-2">
            Somente Piso Pavimentado? <span className="text-amber-400">*</span>
          </label>
          <div className="space-y-2">
            {[
              { id: 'sim_100', label: 'Sim, 100% Asfalto / Pavimentado', desc: 'Exige bandas com foco em rendimento e baixo atrito' },
              { id: 'misto_asfalto_terra', label: 'Misto (Asfalto + Trechos de Terra/Cascalho)', desc: 'Exige banda com composto anti-picotamento' },
              { id: 'severo_offroad', label: 'Severo / Predomínio Fora-de-Estrada', desc: 'Canavieiro, florestal ou mineração' },
            ].map((pavement) => {
              const isSelected = formData.pavedRoadOnly === pavement.id;
              return (
                <label
                  key={pavement.id}
                  className={`flex items-start gap-3 p-2.5 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-sky-500/10 border-sky-500/80 text-sky-200'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800/40'
                  }`}
                >
                  <input
                    type="radio"
                    name="pavedRoadOnly"
                    checked={isSelected}
                    onChange={() => onChange({ pavedRoadOnly: pavement.id as FormDataState['pavedRoadOnly'] })}
                    className="mt-1 text-sky-500 focus:ring-sky-500"
                  />
                  <div>
                    <div className="text-sm font-medium">{pavement.label}</div>
                    <div className="text-xs text-slate-400">{pavement.desc}</div>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* Necessidade de Tração */}
        <div className="md:col-span-2 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <label className="block text-sm font-semibold text-slate-200 mb-1.5">
            Existe Grande Necessidade de Tração? <span className="text-amber-400">*</span>
          </label>
          <p className="text-xs text-slate-400 mb-3">
            Define se a transportadora requer bandas de bloco alto (borrachudo) ou desenhos de tração rodoestrada.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'baixa', label: 'Baixa / Rodoviário Plano', color: 'border-emerald-500/40 text-emerald-300' },
              { id: 'moderada', label: 'Moderada / Topografia Ondulada', color: 'border-blue-500/40 text-blue-300' },
              { id: 'alta', label: 'Alta / Serras e Carga Pesada', color: 'border-amber-500/40 text-amber-300' },
              { id: 'extrema', label: 'Extrema / Barro, Lavoura ou Rampa', color: 'border-rose-500/40 text-rose-300' },
            ].map((traction) => {
              const isSelected = formData.tractionNeed === traction.id;
              return (
                <button
                  type="button"
                  key={traction.id}
                  id={`traction-${traction.id}`}
                  onClick={() => onChange({ tractionNeed: traction.id as FormDataState['tractionNeed'] })}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    isSelected
                      ? 'bg-slate-800 border-sky-400 font-bold ring-2 ring-sky-500/30'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800/40'
                  }`}
                >
                  <Mountain className={`w-5 h-5 mx-auto mb-1.5 ${isSelected ? 'text-sky-400' : 'text-slate-500'}`} />
                  <span className="text-xs sm:text-sm font-medium">{traction.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
