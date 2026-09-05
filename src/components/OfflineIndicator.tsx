import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div 
      className="fixed top-18 sm:top-20 left-3 sm:left-auto right-3 sm:right-6 max-w-[calc(100vw-1.5rem)] sm:max-w-md z-40 flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-amber-500/95 text-slate-950 font-semibold text-xs shadow-xl backdrop-blur border border-amber-400/50 animate-pulse"
      role="status"
      aria-live="polite"
    >
      <WifiOff className="w-4 h-4 shrink-0 text-slate-950 stroke-[2.5]" />
      <span className="truncate">Modo Offline: Os dados continuam sendo salvos localmente.</span>
    </div>
  );
};
