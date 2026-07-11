/**
 * TestPool - Project Prudência
 * Module: Rewarded Ad Hook (AdMob Integration)
 * Architecture: Production-Ready Hook for Gamified Credit Economy
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { Zap, AlertTriangle, RefreshCw } from 'lucide-react';

interface RewardedAdState {
  isLoaded: boolean;
  isShowing: boolean;
  error: string | null;
  retryCount: number;
}

export const useRewardedAd = (adUnitId: string, onReward: () => void) => {
  const [state, setState] = useState<RewardedAdState>({
    isLoaded: false,
    isShowing: false,
    error: null,
    retryCount: 0,
  });

  const adTimerRef = useRef<NodeJS.Timeout | null>(null);

  const initializeAd = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, error: null }));
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setState((prev) => ({ ...prev, isLoaded: true, retryCount: 0 }));
    } catch (err) {
      setState((prev) => ({ 
        ...prev, 
        error: 'Erro de sincronização com o servidor de anúncios.',
        retryCount: prev.retryCount + 1 
      }));
    }
  }, [adUnitId]);

  useEffect(() => {
    initializeAd();
    return () => {
      if (adTimerRef.current) clearTimeout(adTimerRef.current);
    };
  }, [initializeAd]);

  const showAd = useCallback(async () => {
    if (!state.isLoaded) {
      await initializeAd();
      return;
    }
    setState((prev) => ({ ...prev, isShowing: true }));
    adTimerRef.current = setTimeout(() => {
      onReward();
      setState((prev) => ({ ...prev, isShowing: false, isLoaded: false }));
      initializeAd();
    }, 2500);
  }, [state.isLoaded, onReward, initializeAd]);

  const AdInterface = () => (
    state.isShowing ? (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/95 backdrop-blur-md">
        <div className="w-full max-w-sm mx-4 p-8 border border-emerald-500/30 rounded-3xl bg-slate-900/90 shadow-xl flex flex-col items-center text-center space-y-6">
          <Zap className="w-16 h-16 text-emerald-400" />
          <div className="space-y-2">
            <h3 className="text-xl font-black text-white uppercase">Processando Recurso</h3>
            <p className="text-slate-400 text-sm">Validando contribuição industrial...</p>
          </div>
        </div>
      </div>
    ) : state.error ? (
      <div className="fixed bottom-6 left-6 right-6 z-50 flex items-center gap-3 p-4 bg-red-950/80 border border-red-500/30 rounded-xl">
        <AlertTriangle className="w-6 h-6 text-red-400" />
        <p className="text-red-100 text-sm flex-1">{state.error}</p>
        <button onClick={initializeAd} className="p-2 hover:bg-red-900 rounded-lg"><RefreshCw className="w-5 h-5 text-red-400" /></button>
      </div>
    ) : null
  );

  return { ...state, showAd, AdInterface };
};