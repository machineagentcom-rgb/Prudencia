import React, { useMemo } from 'react';
import { Gauge, Zap, Thermometer, ShieldCheck, AlertTriangle, Droplets, Sparkles, Activity, Cpu } from 'lucide-react';

/**
 * Componente: GaugeIndicator (Projeto Prudência - Codinome: Prudência)
 * Versão: 2.0.0 (Polimento Industrial)
 * 
 * Implementação do medidor de pressão do tanque de spray (Vapor Pressure Gauge).
 * Gerencia visualmente o estado de conformidade (Hot/Cold) com feedback tátil,
 * variações de opacidade, brilho neon dinâmico e animações de preenchimento.
 */

interface GaugeIndicatorProps {
  pressureLevel: number; // 0 a 100
  className?: string;
}

const GaugeIndicator: React.FC<GaugeIndicatorProps> = ({ pressureLevel, className = "" }) => {
  
  const statusConfig = useMemo(() => {
    if (pressureLevel >= 90) return { 
      color: 'from-cyan-400 to-blue-600', 
      label: 'HOT (ESTÉRIL)', 
      icon: Zap, 
      glow: 'shadow-[0_0_30px_rgba(34,211,238,0.25)]',
      bg: 'bg-cyan-950/40',
      ring: 'border-cyan-500/50'
    };
    if (pressureLevel >= 51) return { 
      color: 'from-emerald-400 to-emerald-600', 
      label: 'LIMPO', 
      icon: ShieldCheck, 
      glow: 'shadow-[0_0_25px_rgba(52,211,153,0.2)]',
      bg: 'bg-emerald-950/40',
      ring: 'border-emerald-500/50'
    };
    if (pressureLevel >= 26) return { 
      color: 'from-yellow-400 to-yellow-600', 
      label: 'MODERADO', 
      icon: Thermometer, 
      glow: 'shadow-[0_0_20px_rgba(250,204,21,0.15)]',
      bg: 'bg-yellow-950/40',
      ring: 'border-yellow-500/50'
    };
    return { 
      color: 'from-red-500 to-red-700', 
      label: 'COLD (INFESTADO)', 
      icon: AlertTriangle, 
      glow: 'shadow-[0_0_20px_rgba(239,68,68,0.2)]',
      bg: 'bg-red-950/40',
      ring: 'border-red-500/50'
    };
  }, [pressureLevel]);

  const StatusIcon = statusConfig.icon;

  return (
    <div className={`relative p-8 bg-slate-950 border border-slate-900 rounded-[2rem] flex flex-col items-center w-full max-w-[360px] overflow-hidden transition-all duration-700 ease-in-out ${className}`}>
      
      {/* Background Decorativo Industrial */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-900/50 via-slate-950 to-slate-950" />
      
      {/* Header Industrial */}
      <div className="relative z-10 flex items-center justify-between w-full mb-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
            <Activity className="text-slate-400 w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.25em]">Medidor de Vapor</span>
            <span className="text-[10px] text-slate-600 font-mono tracking-wider uppercase">Status Operacional</span>
          </div>
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border ${statusConfig.bg} border-white/5`}>
          <Sparkles className={`w-3 h-3 ${pressureLevel >= 90 ? 'text-cyan-400 animate-pulse' : 'text-slate-500'}`} />
          <span className="text-[9px] font-bold text-white uppercase tracking-widest">{pressureLevel}%</span>
        </div>
      </div>

      {/* Visor Circular */}
      <div className="relative z-10 w-60 h-60 rounded-full border-[12px] border-slate-900 bg-slate-950 flex items-center justify-center shadow-[inset_0_10px_30px_rgba(0,0,0,0.8),_0_0_40px_rgba(0,0,0,0.5)]">
        
        {/* Nível do Líquido com Gradiente */}
        <div 
          className={`absolute bottom-0 w-full transition-all duration-1000 ease-out bg-gradient-to-t ${statusConfig.color} opacity-90 rounded-b-full`}
          style={{ height: `${pressureLevel}%` }}
        />

        {/* Efeitos de Vidro e Brilho */}
        <div className="absolute inset-0 rounded-full border-[1px] border-white/10" />
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
        
        {/* Valor Central */}
        <div className="relative flex flex-col items-center">
          <span className="text-6xl font-black text-white font-mono tracking-tighter drop-shadow-2xl">
            {pressureLevel}
          </span>
          <span className="text-xs font-medium text-slate-400 uppercase tracking-widest opacity-80">Pressão PSI</span>
        </div>

        {/* Indicador de Pulso do Spray */}
        <div className="absolute top-6 flex justify-center w-full">
           <div className={`relative flex items-center justify-center w-8 h-8 rounded-full ${statusConfig.bg} border border-white/10`}>
              <Droplets className={`w-4 h-4 animate-bounce ${pressureLevel >= 90 ? 'text-cyan-400' : 'text-slate-500'}`} />
           </div>
        </div>
      </div>

      {/* Painel Inferior */}
      <div className={`relative z-10 mt-10 w-full flex items-center justify-between p-5 rounded-2xl bg-slate-900/50 border border-slate-800 ${statusConfig.glow}`}>
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl bg-slate-950 border border-white/5 ${pressureLevel < 26 ? 'text-red-500' : 'text-slate-200'}`}>
            <StatusIcon size={20} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Nível de Carga</span>
            <span className="text-sm font-bold text-white tracking-tight">{statusConfig.label}</span>
          </div>
        </div>
        
        {/* Barras de Intensidade */}
        <div className="flex gap-1.5 h-10 items-end">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className={`w-2.5 rounded-t-sm transition-all duration-500 ${i < Math.ceil(pressureLevel / 20) ? statusConfig.color.split(' ')[1] : 'bg-slate-800'}`}
              style={{ height: `${(i + 1) * 20}%` }}
            />
          ))}
        </div>
      </div>

      {/* Marca de Rodapé Industrial */}
      <div className="relative z-10 mt-6 flex items-center gap-2 text-[9px] font-bold text-slate-700 uppercase tracking-widest">
        <Cpu className="w-3 h-3" />
        SISTEMA PRUDÊNCIA v2.0
      </div>
    </div>
  );
};

export default GaugeIndicator;
