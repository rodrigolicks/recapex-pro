import React from 'react';
import { Disc, LayoutDashboard, PlusCircle, CheckCircle2, Palette } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { PWAInstallButton } from './PWAInstallButton';

interface NavbarProps {
  currentView: 'form' | 'list';
  onSelectView: (view: 'form' | 'list') => void;
  savedCount: number;
  isDraftSaved: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onSelectView,
  savedCount,
  isDraftSaved
}) => {
  const { config, themeMode, openOptions } = useTheme();
  const isDark = themeMode === 'dark';

  return (
    <header className={`backdrop-blur border-b sticky top-0 z-40 w-full max-w-full overflow-hidden transition-colors ${
      isDark ? 'bg-slate-950/90 border-slate-800' : 'bg-white/95 border-slate-200 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 h-16 flex items-center justify-between gap-1.5 sm:gap-4 w-full">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2 sm:gap-3 cursor-pointer select-none shrink-0" onClick={() => onSelectView('list')}>
          <div 
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl p-0.5 shadow-lg shrink-0 flex items-center justify-center transition-all"
            style={{
              background: `linear-gradient(135deg, ${config.primaryHex}, ${config.secondaryHex})`,
              boxShadow: `0 8px 16px -4px ${config.primaryHex}40`
            }}
          >
            <div className={`w-full h-full rounded-[10px] flex items-center justify-center ${
              isDark ? 'bg-slate-950' : 'bg-white'
            }`}>
              <Disc 
                className="w-4 h-4 sm:w-6 sm:h-6 animate-[spin_10s_linear_infinite]" 
                style={{ color: config.primaryHex }}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className={`font-black text-base sm:text-xl tracking-tight ${
                isDark ? 'text-slate-100' : 'text-slate-900'
              }`}>
                Recap<span style={{ color: config.primaryHex }}>Data</span>
              </span>
              <span 
                className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border"
                style={{
                  backgroundColor: `${config.primaryHex}15`,
                  color: config.primaryHex,
                  borderColor: `${config.primaryHex}35`
                }}
              >
                Recapadora Pro
              </span>
            </div>
            <p className={`text-[11px] hidden sm:block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Coleta Técnica & Diagnóstico Comercial de Frotas
            </p>
          </div>
        </div>

        {/* View Switcher & Action Buttons */}
        <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
          {/* Draft indicator */}
          {currentView === 'form' && isDraftSaved && (
            <div className={`hidden lg:flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border ${
              isDark 
                ? 'text-emerald-400 bg-emerald-950/50 border-emerald-800/60' 
                : 'text-emerald-700 bg-emerald-50 border-emerald-200'
            }`}>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Salvo</span>
            </div>
          )}

          {/* PWA Install Button */}
          <PWAInstallButton />

          {/* Theme Options Menu Button */}
          <button
            type="button"
            id="btn-nav-theme-options"
            onClick={openOptions}
            className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all shrink-0 ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-slate-200 hover:bg-slate-800 hover:border-slate-700'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
            title="Menu de opções de cores e tema"
          >
            <div
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full shrink-0 shadow-sm"
              style={{ backgroundColor: config.primaryHex }}
            />
            <Palette className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Temas</span>
          </button>

          {/* Form vs List Toggle */}
          <div className={`flex items-center p-0.5 sm:p-1 rounded-xl border shrink-0 ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}>
            <button
              id="nav-btn-form"
              type="button"
              onClick={() => onSelectView('form')}
              className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentView === 'form'
                  ? 'text-slate-950 shadow-md font-bold'
                  : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
              }`}
              style={currentView === 'form' ? { backgroundColor: config.primaryHex } : {}}
              title="Formulário de Coleta"
            >
              <PlusCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Formulário</span>
              <span className="sm:hidden text-[11px]">Form</span>
            </button>

            <button
              id="nav-btn-list"
              type="button"
              onClick={() => onSelectView('list')}
              className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentView === 'list'
                  ? 'text-slate-950 shadow-md font-bold'
                  : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
              }`}
              style={currentView === 'list' ? { backgroundColor: config.primaryHex } : {}}
              title={`Histórico de Coletas (${savedCount})`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Histórico ({savedCount})</span>
              <span className="sm:hidden text-[11px]">({savedCount})</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
