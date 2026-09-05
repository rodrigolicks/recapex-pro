import React, { useState, useRef, useEffect } from 'react';
import { LogOut, UserCheck, ChevronDown, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

interface GoogleUserMenuProps {
  onFillConsultantName?: (name: string) => void;
}

export const GoogleUserMenu: React.FC<GoogleUserMenuProps> = ({ onFillConsultantName }) => {
  const { user, isLoggingIn, loginWithGoogle, logout, error, clearError } = useAuth();
  const { config, themeMode } = useTheme();
  const isDark = themeMode === 'dark';
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogin = async () => {
    clearError();
    await loginWithGoogle();
  };

  const handleUseMyName = () => {
    if (user?.displayName && onFillConsultantName) {
      onFillConsultantName(user.displayName);
    }
    setDropdownOpen(false);
  };

  return (
    <div className="relative shrink-0" ref={menuRef}>
      {user ? (
        /* Logged In State: User Avatar & Menu Trigger */
        <div>
          <button
            type="button"
            id="btn-google-user-profile"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={`flex items-center gap-1.5 sm:gap-2 px-1.5 sm:px-2.5 py-1 rounded-xl border transition-all hover:scale-102 active:scale-98 ${
              isDark 
                ? 'bg-slate-900 border-slate-700 hover:border-slate-600 text-slate-200' 
                : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 shadow-xs'
            }`}
            title={`Conectado como ${user.displayName || user.email}`}
          >
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || 'Usuário'}
                referrerPolicy="no-referrer"
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover border border-amber-400/50"
              />
            ) : (
              <div 
                className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-bold text-slate-950"
                style={{ backgroundColor: config.primaryHex }}
              >
                {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
              </div>
            )}

            <span className="text-xs font-semibold hidden md:inline-block max-w-[100px] truncate">
              {user.displayName?.split(' ')[0] || user.email?.split('@')[0]}
            </span>

            <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* User Profile Dropdown */}
          {dropdownOpen && (
            <div className={`absolute right-0 mt-2 w-72 rounded-2xl shadow-2xl border p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150 ${
              isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
            }`}>
              {/* Profile Card Header */}
              <div className="flex items-center gap-3 pb-3.5 border-b border-slate-700/50">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'Usuário'}
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-full object-cover border-2 shadow-md"
                    style={{ borderColor: config.primaryHex }}
                  />
                ) : (
                  <div 
                    className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-slate-950 shadow-md"
                    style={{ backgroundColor: config.primaryHex }}
                  >
                    {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold truncate">
                      {user.displayName || 'Consultor Técnico'}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-400 truncate">{user.email}</p>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Conta Google Ativa
                  </span>
                </div>
              </div>

              {/* Menu Actions */}
              <div className="py-2.5 space-y-1">
                {onFillConsultantName && user.displayName && (
                  <button
                    type="button"
                    onClick={handleUseMyName}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left ${
                      isDark ? 'hover:bg-slate-800 text-slate-200' : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <UserCheck className="w-4 h-4 text-amber-400" />
                    <span>Usar meu nome nas coletas</span>
                  </button>
                )}

                <button
                  type="button"
                  id="btn-google-logout"
                  onClick={() => {
                    setDropdownOpen(false);
                    logout();
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors text-left text-rose-400 ${
                    isDark ? 'hover:bg-rose-950/40' : 'hover:bg-rose-50 text-rose-600'
                  }`}
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sair da conta Google</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Not Logged In State: Sign In with Google Button */
        <button
          type="button"
          id="btn-google-login"
          onClick={handleLogin}
          disabled={isLoggingIn}
          className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs font-bold transition-all hover:scale-102 active:scale-98 disabled:opacity-50 shadow-xs ${
            isDark
              ? 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-100'
              : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
          }`}
          title="Fazer login com sua conta Google"
        >
          {isLoggingIn ? (
            <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
          ) : (
            /* Official Google G Logo SVG */
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
          )}
          <span className="hidden sm:inline">{isLoggingIn ? 'Entrando...' : 'Entrar com Google'}</span>
          <span className="sm:hidden">{isLoggingIn ? '...' : 'Entrar'}</span>
        </button>
      )}

      {/* Error alert if popup was blocked */}
      {error && (
        <div className="absolute right-0 top-12 w-72 p-3 bg-rose-950/95 border border-rose-800 text-rose-200 text-xs rounded-xl shadow-2xl z-50 backdrop-blur">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold">{error}</p>
              <button
                type="button"
                onClick={clearError}
                className="mt-2 text-[11px] underline text-rose-300 hover:text-white"
              >
                Fechar aviso
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
