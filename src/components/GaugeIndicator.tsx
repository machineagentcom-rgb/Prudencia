import React, { useMemo } from 'react';
import { Gauge, Zap, Thermometer, ShieldCheck, AlertTriangle } from 'lucide-react';

/**
 * Componente: GaugeIndicator
 * Descrição: Medidor industrial de pressão (Tanque de Spray) para o ecossistema Prudência.
 * O componente reflete o status de engajamento do testador (0% a 100%).
 */

interface GaugeIndicatorProps {
  pressureLevel: number; // 0 a 100
  className?: string;
}

const GaugeIndicator: React.FC<GaugeIndicatorProps> = ({ pressureLevel, className = "" }) => {
  
  const statusConfig = useMemo(() => {
    if (pressureLevel >= 90) return { color: 'from-cyan-400 to-blue-600', label: 'HOT (ESTÉRIL)', icon: Zap, glow: 'shadow-[0_0_20px_rgba(34,211,238,0.5)]' };
    if (pressureLevel >= 51) return { color: 'from-emerald-400 to-emerald-600', label: 'LIMPO', icon: ShieldCheck, glow: 'shadow-[0_0_15px_rgba(52,211,153,0.3)]' };
    if (pressureLevel >= 26) return { color: 'from-yellow-400 to-yellow-600', label: 'MODERADO', icon: Thermometer, glow: 'shadow-[0_0_10px_rgba(250,204,21,0.2)]' };
    return { color: 'from-red-500 to-red-700', label: 'COLD (INFESTADO)', icon: AlertTriangle, glow: 'shadow-[0_0_15px_rgba(239,68,68,0.4)]' };
  }, [pressureLevel]);

  const StatusIcon = statusConfig.icon;

  return (
    <div className={`relative p-6 bg-slate-900 border border-slate-800 rounded-3xl flex flex-col items-center justify-center w-full max-w-[320px] transition-all duration-500 ${className}`}>
      
      {/* Header do Medidor */}
      <div className="flex items-center gap-2 mb-6">
        <Gauge className="text-slate-400 w-5 h-5" />
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tanque de Contenção</span>
      </div>

      {/* Visor Industrial do Medidor */}
      <div className="relative w-48 h-48 rounded-full border-4 border-slate-800 bg-slate-950 flex items-center justify-center overflow-hidden shadow-inner">
        
        {/* Nível do Líquido (Barra de Progresso Circular) */}
        <div 
          className={`absolute bottom-0 w-full transition-all duration-1000 ease-out bg-gradient-to-t ${statusConfig.color}`}
          style={{ height: `${pressureLevel}%` }}
        />

        {/* Efeito de Reflexo Glassmorphism */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px] rounded-full" />
        
        {/* Valor Percentual Central */}
        <div className="relative z-10 flex flex-col items-center">
          <span className="text-4xl font-black text-white font-mono">{pressureLevel}%</span>
          <span className="text-[10px] uppercase font-bold text-slate-300 bg-black/40 px-2 py-0.5 rounded-full">{statusConfig.label}</span>
        </div>
      </div>

      {/* Footer de Status */}
      <div className={`mt-6 w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 ${statusConfig.glow}`}>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-slate-900 ${pressureLevel < 26 ? 'text-red-500' : 'text-emerald-400'}`}>
            <StatusIcon size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase font-semibold">Estado Atual</span>
            <span className="text-sm font-bold text-white">{statusConfig.label}</span>
          </div>
        </div>
        
        {/* Indicador de Pressão de Spray */}
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className={`w-1.5 h-6 rounded-full ${i < Math.ceil(pressureLevel / 20) ? statusConfig.color.split(' ')[1] : 'bg-slate-800'}`} 
            />
          ))}
        </div>
      </div>

      {/* Decorativo de Borda */}
      <div className="absolute -top-2 left-6 right-6 h-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
    </div>
  );
};

export default GaugeIndicator;
