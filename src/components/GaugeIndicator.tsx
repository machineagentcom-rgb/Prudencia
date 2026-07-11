import React, { useMemo } from 'react';
import { Gauge, Zap, Thermometer, ShieldCheck, AlertTriangle, Droplets, Sparkles } from 'lucide-react';

/**
 * Componente: GaugeIndicator (Projeto Prudência)
 * Descrição: Medidor industrial de pressão do tanque de spray (Vapor Pressure Gauge).
 * Gerencia visualmente o status de saúde e conformidade do testador através de estados dinâmicos
 * (HOT/COLD) e efeitos de limpeza (Glow/Blur).
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
      glow: 'shadow-[0_0_25px_rgba(34,211,238,0.4)]',
      bg: 'bg-cyan-950/30'
    };
    if (pressureLevel >= 51) return { 
      color: 'from-emerald-400 to-emerald-600', 
      label: 'LIMPO', 
      icon: ShieldCheck, 
      glow: 'shadow-[0_0_20px_rgba(52,211,153,0.3)]',
      bg: 'bg-emerald-950/30'
    };
    if (pressureLevel >= 26) return { 
      color: 'from-yellow-400 to-yellow-600', 
      label: 'MODERADO', 
      icon: Thermometer, 
      glow: 'shadow-[0_0_15px_rgba(250,204,21,0.2)]',
      bg: 'bg-yellow-950/30'
    };
    return { 
      color: 'from-red-500 to-red-700', 
      label: 'COLD (INFESTADO)', 
      icon: AlertTriangle, 
      glow: 'shadow-[0_0_20px_rgba(239,68,68,0.3)]',
      bg: 'bg-red-950/30'
    };
  }, [pressureLevel]);

  const StatusIcon = statusConfig.icon;

  return (
    <div className={`relative p-6 bg-slate-900 border border-slate-800 rounded-3xl flex flex-col items-center justify-center w-full max-w-[340px] transition-all duration-700 ease-in-out ${className}`}>
      
      {/* Header Industrial */}
      <div className="flex items-center justify-between w-full mb-8">
        <div className="flex items-center gap-2">
          <Gauge className="text-slate-500 w-5 h-5" />
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Tanque de Pressão</span>
        </div>
        <div className={`px-2 py-1 rounded-md border ${statusConfig.bg} border-slate-700`}>
          <Sparkles className={`w-3 h-3 ${pressureLevel >= 90 ? 'text-cyan-400' : 'text-slate-400'}`} />
        </div>
      </div>

      {/* Visor Circular Principal */}
      <div className="relative w-56 h-56 rounded-full border-[8px] border-slate-950 bg-slate-900 flex items-center justify-center overflow-hidden shadow-[inset_0_4px_12px_rgba(0,0,0,0.5)]">
        
        {/* Nível do Líquido com Gradiente Dinâmico */}
        <div 
          className={`absolute bottom-0 w-full transition-all duration-1000 ease-out bg-gradient-to-t ${statusConfig.color} opacity-90`}
          style={{ height: `${pressureLevel}%` }}
        />

        {/* Efeitos de Textura e Vidro */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 rounded-full" />
        <div className="absolute inset-0 border-t-4 border-white/5 rounded-full" />
        
        {/* Valor Central */}
        <div className="relative z-10 flex flex-col items-center">
          <span className="text-5xl font-black text-white font-mono tracking-tighter drop-shadow-lg">
            {pressureLevel}
            <span className="text-xl text-slate-500">%</span>
          </span>
          <span className={`text-[9px] uppercase font-bold tracking-widest px-3 py-1 rounded-full text-white/90 backdrop-blur-sm ${statusConfig.bg} border border-white/5`}>
            {statusConfig.label}
          </span>
        </div>

        {/* Indicador de Spray Ativo */}
        {pressureLevel > 0 && (
          <div className="absolute top-4 flex justify-center w-full">
            <Droplets className={`w-4 h-4 animate-bounce ${pressureLevel >= 90 ? 'text-cyan-400' : 'text-slate-600'}`} />
          </div>
        )}
      </div>

      {/* Painel Inferior de Métricas */}
      <div className={`mt-8 w-full flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800 ${statusConfig.glow}`}>
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 ${pressureLevel < 26 ? 'text-red-500' : 'text-emerald-400'}`}>
            <StatusIcon size={22} strokeWidth={2.5} />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-500 uppercase font-bold tracking-wider">Status do Sistema</span>
            <span className="text-xs font-bold text-slate-200">{statusConfig.label}</span>
          </div>
        </div>
        
        {/* Medidor de Barras de Intensidade */}
        <div className="flex gap-1.5 h-8 items-end">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className={`w-2 rounded-t-sm transition-all duration-500 ${i < Math.ceil(pressureLevel / 20) ? statusConfig.color.split(' ')[1] : 'bg-slate-800/50'}`}
              style={{ height: `${(i + 1) * 20}%` }}
            />
          ))}
        </div>
      </div>

      {/* Decorative Line */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full bg-slate-800" />
    </div>
  );
};

export default GaugeIndicator;
