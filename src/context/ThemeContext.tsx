import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeColor = 'amber' | 'blue' | 'emerald' | 'orange' | 'purple' | 'rose';
export type ThemeMode = 'dark' | 'light';

export interface ThemeConfig {
  id: ThemeColor;
  name: string;
  description: string;
  primaryHex: string;
  secondaryHex: string;
  textClass: string;
  textMutedClass: string;
  bgClass: string;
  bgHoverClass: string;
  borderClass: string;
  badgeClass: string;
  gradientClass: string;
  glowClass: string;
  ringClass: string;
}

export const THEME_PRESETS: Record<ThemeColor, ThemeConfig> = {
  amber: {
    id: 'amber',
    name: 'Âmbar Recap (Padrão)',
    description: 'Estilo clássico da reforma e vulcanização de carcaças',
    primaryHex: '#f59e0b',
    secondaryHex: '#d97706',
    textClass: 'text-amber-400',
    textMutedClass: 'text-amber-500/80',
    bgClass: 'bg-amber-500',
    bgHoverClass: 'hover:bg-amber-400',
    borderClass: 'border-amber-500/30',
    badgeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    gradientClass: 'from-amber-500 to-amber-300',
    glowClass: 'shadow-amber-500/20',
    ringClass: 'focus:ring-amber-500',
  },
  blue: {
    id: 'blue',
    name: 'Azul Corporativo',
    description: 'Modernidade e confiança para logística e frotistas',
    primaryHex: '#3b82f6',
    secondaryHex: '#2563eb',
    textClass: 'text-blue-400',
    textMutedClass: 'text-blue-500/80',
    bgClass: 'bg-blue-600',
    bgHoverClass: 'hover:bg-blue-500',
    borderClass: 'border-blue-500/30',
    badgeClass: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    gradientClass: 'from-blue-600 to-sky-400',
    glowClass: 'shadow-blue-500/20',
    ringClass: 'focus:ring-blue-500',
  },
  emerald: {
    id: 'emerald',
    name: 'Verde Sustentável',
    description: 'Economia circular, reforma ecológica e ESG',
    primaryHex: '#10b981',
    secondaryHex: '#059669',
    textClass: 'text-emerald-400',
    textMutedClass: 'text-emerald-500/80',
    bgClass: 'bg-emerald-600',
    bgHoverClass: 'hover:bg-emerald-500',
    borderClass: 'border-emerald-500/30',
    badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    gradientClass: 'from-emerald-600 to-teal-400',
    glowClass: 'shadow-emerald-500/20',
    ringClass: 'focus:ring-emerald-500',
  },
  orange: {
    id: 'orange',
    name: 'Laranja Vulcanização',
    description: 'Alta visibilidade de oficina, pátio e operações severas',
    primaryHex: '#f97316',
    secondaryHex: '#ea580c',
    textClass: 'text-orange-400',
    textMutedClass: 'text-orange-500/80',
    bgClass: 'bg-orange-500',
    bgHoverClass: 'hover:bg-orange-400',
    borderClass: 'border-orange-500/30',
    badgeClass: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    gradientClass: 'from-orange-500 to-amber-400',
    glowClass: 'shadow-orange-500/20',
    ringClass: 'focus:ring-orange-500',
  },
  purple: {
    id: 'purple',
    name: 'Roxo Executivo',
    description: 'Inteligência analítica de custos e estratégia comercial',
    primaryHex: '#a855f7',
    secondaryHex: '#9333ea',
    textClass: 'text-purple-400',
    textMutedClass: 'text-purple-500/80',
    bgClass: 'bg-purple-600',
    bgHoverClass: 'hover:bg-purple-500',
    borderClass: 'border-purple-500/30',
    badgeClass: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    gradientClass: 'from-purple-600 to-indigo-400',
    glowClass: 'shadow-purple-500/20',
    ringClass: 'focus:ring-purple-500',
  },
  rose: {
    id: 'rose',
    name: 'Rubi Carga Pesada',
    description: 'Impacto visual decisivo e dinamismo para negociações',
    primaryHex: '#f43f5e',
    secondaryHex: '#e11d48',
    textClass: 'text-rose-400',
    textMutedClass: 'text-rose-500/80',
    bgClass: 'bg-rose-600',
    bgHoverClass: 'hover:bg-rose-500',
    borderClass: 'border-rose-500/30',
    badgeClass: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    gradientClass: 'from-rose-600 to-red-400',
    glowClass: 'shadow-rose-500/20',
    ringClass: 'focus:ring-rose-500',
  },
};

interface ThemeContextType {
  themeColor: ThemeColor;
  setThemeColor: (color: ThemeColor) => void;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  config: ThemeConfig;
  isOptionsOpen: boolean;
  openOptions: () => void;
  closeOptions: () => void;
}

const STORAGE_COLOR_KEY = 'recapdata_theme_color';
const STORAGE_MODE_KEY = 'recapdata_theme_mode';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeColor, setThemeColorState] = useState<ThemeColor>(() => {
    const saved = localStorage.getItem(STORAGE_COLOR_KEY);
    if (saved && Object.keys(THEME_PRESETS).includes(saved)) {
      return saved as ThemeColor;
    }
    return 'amber';
  });

  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem(STORAGE_MODE_KEY);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    return 'dark';
  });

  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const setThemeColor = (color: ThemeColor) => {
    setThemeColorState(color);
    localStorage.setItem(STORAGE_COLOR_KEY, color);
  };

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    localStorage.setItem(STORAGE_MODE_KEY, mode);
  };

  const config = THEME_PRESETS[themeColor] || THEME_PRESETS.amber;

  // Apply CSS variables dynamically to the document root
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', config.primaryHex);
    root.style.setProperty('--color-primary-hover', config.secondaryHex);
    root.style.setProperty('--color-primary-rgb', config.primaryHex);
    
    if (themeMode === 'light') {
      root.classList.add('theme-light');
      root.classList.remove('theme-dark');
      document.body.style.backgroundColor = '#f8fafc';
    } else {
      root.classList.add('theme-dark');
      root.classList.remove('theme-light');
      document.body.style.backgroundColor = '#020617';
    }
  }, [themeColor, themeMode, config]);

  return (
    <ThemeContext.Provider
      value={{
        themeColor,
        setThemeColor,
        themeMode,
        setThemeMode,
        config,
        isOptionsOpen,
        openOptions: () => setIsOptionsOpen(true),
        closeOptions: () => setIsOptionsOpen(false),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider');
  }
  return context;
};
