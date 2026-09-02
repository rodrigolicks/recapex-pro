import React from 'react';
import { Check, Building2, Truck, Disc, Repeat, Fuel, Target } from 'lucide-react';

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
  onSelectStep: (step: number) => void;
}

export const STEPS_CONFIG = [
  { step: 1, title: 'Transportadora', shortTitle: 'Cliente', icon: Building2 },
  { step: 2, title: 'Perfil da Frota', shortTitle: 'Frota', icon: Truck },
  { step: 3, title: 'Gestão de Pneus', shortTitle: 'Pneus', icon: Disc },
  { step: 4, title: 'Reforma & Mercado', shortTitle: 'Reforma', icon: Repeat },
  { step: 5, title: 'Combustível', shortTitle: 'Diesel', icon: Fuel },
  { step: 6, title: 'Estratégia Comercial', shortTitle: 'Comercial', icon: Target },
];

export const StepProgress: React.FC<StepProgressProps> = ({ currentStep, onSelectStep }) => {
  const currentStepConfig = STEPS_CONFIG.find(s => s.step === currentStep) || STEPS_CONFIG[0];
  const progressPercent = Math.round((currentStep / STEPS_CONFIG.length) * 100);

  return (
    <div className="w-full bg-slate-900/90 backdrop-blur border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl mb-6">
      {/* Current Step Status Header */}
      <div className="flex items-center justify-between gap-3 mb-3.5">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm shrink-0">
            {currentStep}
          </div>
          <div className="min-w-0">
            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
              Etapa {currentStep} de {STEPS_CONFIG.length}
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-100 truncate">
              {currentStepConfig.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-semibold text-slate-400">
            {progressPercent}% Concluído
          </span>
        </div>
      </div>

      {/* 6 Step Interactive Tabs Grid - Perfectly framed inside canvas */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 w-full">
        {STEPS_CONFIG.map((item) => {
          const isCompleted = currentStep > item.step;
          const isCurrent = currentStep === item.step;
          const Icon = item.icon;

          return (
            <button
              key={item.step}
              id={`step-tab-${item.step}`}
              type="button"
              onClick={() => onSelectStep(item.step)}
              className={`flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-xl border transition-all text-center w-full min-w-0 ${
                isCurrent
                  ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-md shadow-amber-500/20'
                  : isCompleted
                  ? 'bg-slate-800/80 text-emerald-400 hover:bg-slate-800 border-emerald-800/40 hover:border-emerald-700'
                  : 'bg-slate-950/60 text-slate-400 hover:bg-slate-850 hover:text-slate-300 border-slate-800/80'
              }`}
              title={`Etapa ${item.step}: ${item.title}`}
            >
              <div
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center mb-1 transition-colors ${
                  isCurrent
                    ? 'bg-slate-950 text-amber-400'
                    : isCompleted
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-slate-800/70 text-slate-400'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                ) : (
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                )}
              </div>

              <div className="w-full truncate">
                <span className="text-[10px] sm:text-xs font-semibold block truncate leading-tight">
                  <span className="hidden md:inline">{item.title}</span>
                  <span className="inline md:hidden">{item.shortTitle}</span>
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom Progress Bar */}
      <div className="mt-3.5 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-gradient-to-r from-amber-500 to-amber-300 h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${(currentStep / STEPS_CONFIG.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

