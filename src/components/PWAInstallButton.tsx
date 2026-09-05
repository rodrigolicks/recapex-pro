import React, { useState } from 'react';
import { Download, Smartphone, X, Check, Share, ArrowUpRight } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useTheme } from '../context/ThemeContext';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const { config, themeMode } = useTheme();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [installing, setInstalling] = useState(false);
  const isDark = themeMode === 'dark';

  // If already installed or running standalone in Capacitor / Android WebView
  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    setInstalling(true);
    try {
      await install();
    } finally {
      setInstalling(false);
    }
  };

  return (
    <>
      {/* Chromium / Android / Desktop Install Button */}
      {isInstallable && (
        <button
          type="button"
          id="btn-install-pwa"
          onClick={handleInstallClick}
          disabled={installing}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold shadow-md transition-all hover:scale-105 active:scale-95 disabled:opacity-50 shrink-0"
          style={{
            backgroundColor: config.primaryHex,
            color: '#020617',
          }}
          title="Instalar RecapData no seu celular ou computador"
        >
          <Smartphone className="w-3.5 h-3.5 stroke-[2.5]" />
          <span className="hidden sm:inline">{installing ? 'Instalando...' : 'Instalar App'}</span>
          <span className="sm:hidden">{installing ? '...' : 'Instalar'}</span>
        </button>
      )}

      {/* iOS Safari Guide Button */}
      {isIOS && !isInstallable && (
        <button
          type="button"
          id="btn-install-ios"
          onClick={() => setShowIOSGuide(true)}
          className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all hover:scale-105 active:scale-95 shrink-0 ${
            isDark 
              ? 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border-slate-700' 
              : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
          }`}
          title="Instalar no iPhone ou iPad"
        >
          <Smartphone className="w-3.5 h-3.5 text-sky-400" />
          <span className="hidden sm:inline">Instalar no iOS</span>
          <span className="sm:hidden">Instalar</span>
        </button>
      )}

      {/* iOS Guided Instructions Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className={`w-full max-w-sm rounded-2xl p-6 shadow-2xl border transition-all ${
            isDark ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/50">
              <div className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-950 font-black text-sm"
                  style={{ backgroundColor: config.primaryHex }}
                >
                  RD
                </div>
                <div>
                  <h3 className="font-bold text-sm">Instalar RecapData no iOS</h3>
                  <p className="text-[11px] text-slate-400">Funciona offline como app nativo</p>
                </div>
              </div>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="p-1 rounded-lg hover:bg-slate-800/50 text-slate-400 hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/50">
                <div className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-xs shrink-0">
                  1
                </div>
                <div>
                  <p className="font-semibold text-slate-200">Abra o menu de compartilhamento</p>
                  <p className="text-slate-400 mt-0.5 flex items-center gap-1">
                    Toque no ícone <Share className="w-3.5 h-3.5 text-sky-400 inline" /> na barra inferior do Safari.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/50">
                <div className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-xs shrink-0">
                  2
                </div>
                <div>
                  <p className="font-semibold text-slate-200">Adicionar à Tela de Início</p>
                  <p className="text-slate-400 mt-0.5">
                    Role a lista para baixo e toque em <strong>"Adicionar à Tela de Início"</strong>.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/50">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
                  3
                </div>
                <div>
                  <p className="font-semibold text-slate-200">Pronto!</p>
                  <p className="text-slate-400 mt-0.5">
                    O ícone do <strong>RecapData</strong> aparecerá na tela do seu iPhone com abertura em tela cheia e armazenamento offline.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowIOSGuide(false)}
              className="mt-5 w-full py-2.5 rounded-xl font-bold text-xs shadow transition-all hover:opacity-95"
              style={{
                backgroundColor: config.primaryHex,
                color: '#020617',
              }}
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </>
  );
};
