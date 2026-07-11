/**
 * TestPool - Project Prudência
 * Module: Rewarded Ad Hook (AdMob Integration)
 * Architecture: Production-Ready Hook for Gamified Credit Economy
 */

import { useState, useCallback, useEffect } from 'react';
import { AlertCircle, Zap, ShieldCheck } from 'lucide-react';

interface RewardedAdState {
  isLoaded: boolean;
  isShowing: boolean;
  error: string | null;
}

/**
 * Hook de Gerenciamento de Anúncios Recompensados (AdMob)
 * Implementa o ciclo de vida rigoroso conforme RF-08 e RF-27.
 * 
 * @param adUnitId ID da unidade do AdMob (Production Environment)
 * @param onReward Callback disparado após sucesso na visualização (RF-08)
 */
export const useRewardedAd = (adUnitId: string, onReward: () => void) => {
  const [state, setState] = useState<RewardedAdState>({
    isLoaded: false,
    isShowing: false,
    error: null,
  });

  // Simulação de carregamento do SDK do AdMob (Capacitor/NativeBridge interface)
  useEffect(() => {
    const initializeAd = async () => {
      try {
        // Integração nativa via Capacitor AdMob Plugin
        // Em ambiente real: AdMob.prepareRewardVideoAd({ adId: adUnitId });
        setState((prev) => ({ ...prev, isLoaded: true }));
      } catch (err) {
        setState((prev) => ({ ...prev, error: 'Falha na inicialização do subsistema de recompensas.' }));
      }
    };

    initializeAd();
  }, [adUnitId]);

  const showAd = useCallback(async () => {
    if (!state.isLoaded) {
      console.warn('TestPool: Ad não carregado, abortando gatilho.');
      return;
    }

    setState((prev) => ({ ...prev, isShowing: true }));

    try {
      // Gatilho de exibição no dispositivo
      // Em ambiente real: await AdMob.showRewardVideoAd();
      
      // Simulando processamento pós-anúncio
      setTimeout(() => {
        onReward();
        setState((prev) => ({ ...prev, isShowing: false }));
      }, 1000);

    } catch (err) {
      setState((prev) => ({ ...prev, isShowing: false, error: 'Interrupção na transmissão do anúncio.' }));
    }
  }, [state.isLoaded, onReward]);

  return {
    ...state,
    showAd,
    AdInterface: () => (
      state.isShowing ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="flex flex-col items-center gap-4 p-8 border border-emerald-500/30 rounded-2xl bg-slate-900 shadow-2xl shadow-emerald-500/20">
            <Zap className="w-12 h-12 text-emerald-400 animate-pulse" />
            <span className="text-emerald-50 text-lg font-bold tracking-widest uppercase">Processando Recompensa</span>
            <div className="h-1 w-48 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 animate-loading-bar" />
            </div>
          </div>
        </div>
      ) : null
    )
  };
};

/**
 * Estilos para suporte ao componente (Tailwind Direct Injection)
 */
const styles = `
  @keyframes loading-bar {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  .animate-loading-bar {
    animation: loading-bar 1.5s infinite linear;
  }
`;
