import React from 'react';
import { X, Check, Palette, Moon, Sun, RotateCcw, FileText, Sparkles } from 'lucide-react';
import { useTheme, THEME_PRESETS, ThemeColor, ThemeMode } from '../context/ThemeContext';

export const ThemeOptionsMenu: React.FC = () => {
  const {
    themeColor,
    setThemeColor,
    themeMode,
    setThemeMode,
    config,
    isOptionsOpen,
    closeOptions,
  } = useTheme();

  if (!isOptionsOpen) return null;

  const handleReset = () => {
    setThemeColor('amber');
    setThemeMode('dark');
  };

  const isDark = themeMode === 'dark';

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto overflow-x-hidden w-full max-w-full"
      onClick={closeOptions}
    >
      <div
        className={`w-full max-w-xl rounded-2xl shadow-2xl border overflow-hidden my-auto transition-all ${
          isDark
            ? 'bg-slate-900 border-slate-700 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900 shadow-2xl'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className={`p-4 sm:p-5 border-b flex items-center justify-between gap-3 ${
            isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`p-2.5 rounded-xl border ${config.badgeClass}`}
              style={{ borderColor: `${config.primaryHex}40` }}
            >
              <Palette className="w-5 h-5" style={{ color: config.primaryHex }} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold">Personalizar Tema & Cores</h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Ajuste a identidade visual da plataforma e dos relatórios técnicos
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeOptions}
            className={`p-2 rounded-xl transition-colors ${
              isDark
                ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            }`}
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Section: Base Mode (Dark vs Light) */}
          <div>
            <label className={`text-xs font-bold uppercase tracking-wider block mb-2.5 ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Modo de Exibição
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setThemeMode('dark')}
                className={`flex items-center justify-center gap-2.5 p-3.5 rounded-xl border font-semibold text-sm transition-all ${
                  isDark
                    ? 'border-2 shadow-md bg-slate-950 text-slate-100'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
                style={isDark ? { borderColor: config.primaryHex } : {}}
              >
                <Moon className={`w-4 h-4 ${isDark ? 'text-amber-400' : 'text-slate-500'}`} />
                <span>Escuro (Pátio & Noturno)</span>
                {isDark && <Check className="w-4 h-4 ml-auto" style={{ color: config.primaryHex }} />}
              </button>

              <button
                type="button"
                onClick={() => setThemeMode('light')}
                className={`flex items-center justify-center gap-2.5 p-3.5 rounded-xl border font-semibold text-sm transition-all ${
                  !isDark
                    ? 'border-2 shadow-md bg-white text-slate-900'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:bg-slate-800'
                }`}
                style={!isDark ? { borderColor: config.primaryHex } : {}}
              >
                <Sun className={`w-4 h-4 ${!isDark ? 'text-amber-500' : 'text-slate-400'}`} />
                <span>Claro (Escritório & Diurno)</span>
                {!isDark && <Check className="w-4 h-4 ml-auto" style={{ color: config.primaryHex }} />}
              </button>
            </div>
          </div>

          {/* Section: Accent Color Presets */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className={`text-xs font-bold uppercase tracking-wider ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Cor de Destaque da Plataforma
              </label>
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: `${config.primaryHex}20`,
                  color: config.primaryHex,
                }}
              >
                {config.name}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {(Object.keys(THEME_PRESETS) as ThemeColor[]).map((key) => {
                const item = THEME_PRESETS[key];
                const isSelected = themeColor === key;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setThemeColor(key)}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? isDark
                          ? 'bg-slate-950 shadow-md border-2'
                          : 'bg-slate-50 shadow-md border-2'
                        : isDark
                        ? 'bg-slate-900/70 border-slate-800 hover:bg-slate-800/80'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                    style={isSelected ? { borderColor: item.primaryHex } : {}}
                  >
                    {/* Color Swatch Circle */}
                    <div
                      className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center shadow-sm"
                      style={{ backgroundColor: item.primaryHex }}
                    >
                      {isSelected && <Check className="w-4 h-4 text-white" />}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-bold truncate flex items-center gap-1.5">
                        <span className={isSelected ? 'text-white' : ''}>{item.name}</span>
                      </div>
                      <p className={`text-[11px] truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {item.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live Preview Card */}
          <div>
            <label className={`text-xs font-bold uppercase tracking-wider block mb-2 ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Pré-visualização dos Elementos
            </label>
            <div
              className={`p-4 rounded-xl border space-y-3 ${
                isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="px-2.5 py-1 rounded-full text-xs font-bold border"
                  style={{
                    backgroundColor: `${config.primaryHex}15`,
                    borderColor: `${config.primaryHex}40`,
                    color: config.primaryHex,
                  }}
                >
                  Score: 88/100 • Alto Potencial
                </span>

                <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Economia est.: <strong style={{ color: config.primaryHex }}>R$ 142.500/ano</strong>
                </span>
              </div>

              {/* Mock Action Button */}
              <div className="flex items-center gap-2">
                <div
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-950 flex items-center gap-1.5 shadow-sm"
                  style={{ backgroundColor: config.primaryHex }}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Baixar Laudo Técnico PDF</span>
                </div>

                <div
                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1"
                  style={{
                    borderColor: `${config.primaryHex}50`,
                    color: config.primaryHex,
                  }}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Destaque Ativo</span>
                </div>
              </div>

              <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                ✓ Os laudos técnicos gerados em PDF adotarão automaticamente as cores do tema selecionado no cabeçalho e nos indicadores.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`p-4 border-t flex items-center justify-between gap-3 ${
            isDark ? 'bg-slate-950/90 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <button
            type="button"
            onClick={handleReset}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
              isDark
                ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar Padrão</span>
          </button>

          <button
            type="button"
            onClick={closeOptions}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 shadow-md transition-opacity hover:opacity-90"
            style={{ backgroundColor: config.primaryHex }}
          >
            Aplicar & Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
