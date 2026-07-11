import { useState, useCallback, useEffect } from 'react';
import { Zap } from 'lucide-react';

interface RewardedAdState {
  isLoaded: boolean;
  isShowing: boolean;
  error: string | null;
}

export const useRewardedAd = (adUnitId: string, onReward: () => void) => {
  const [state, setState] = useState<RewardedAdState>({
    isLoaded: false,
    isShowing: false,
    error: null,
  });

  useEffect(() => {
    const initializeAd = async () => {
      try {
        setState((prev) => ({ ...prev, isLoaded: true }));
      } catch (err) {
        setState((prev) => ({ ...prev, error: 'Falha na inicialização do subsistema de recompensas.' }));
      }
    };
    initializeAd();
  }, [adUnitId]);

  const showAd = useCallback(async () => {
    if (!state.isLoaded) return;
    setState((prev) => ({ ...prev, isShowing: true }));
    try {
      setTimeout(() => {
        onReward();
        setState((prev) => ({ ...prev, isShowing: false }));
      }, 1000);
    } catch (err) {
      setState((prev) => ({ ...prev, isShowing: false, error: 'Interrupção na transmissão.' }));
    }
  }, [state.isLoaded, onReward]);

  const AdInterface = () => (
    state.isShowing ? (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-4 p-8 border border-emerald-500/30 rounded-2xl bg-slate-900 shadow-2xl">
          <Zap className="w-12 h-12 text-emerald-400 animate-pulse" />
          <span className="text-emerald-50 text-lg font-bold uppercase">Processando Recompensa</span>
        </div>
      </div>
    ) : null
  );

  return { ...state, showAd, AdInterface };
};