import React, { useMemo } from 'react';
import { Zap, Thermometer, ShieldCheck, AlertTriangle, Droplets, Sparkles, Activity, Cpu } from 'lucide-react';

interface GaugeIndicatorProps {
  pressureLevel: number;
  className?: string;
}

const GaugeIndicator: React.FC<GaugeIndicatorProps> = ({ pressureLevel, className = "" }) => {
  const statusConfig = useMemo(() => {
    if (pressureLevel >= 90) return { color: 'from-cyan-400 to-blue-600', label: 'HOT (ESTÉRIL)', icon: Zap, bg: 'bg-cyan-950/40' };
    if (pressureLevel >= 51) return { color: 'from-emerald-400 to-emerald-600', label: 'LIMPO', icon: ShieldCheck, bg: 'bg-emerald-950/40' };
    if (pressureLevel >= 26) return { color: 'from-yellow-400 to-yellow-600', label: 'MODERADO', icon: Thermometer, bg: 'bg-yellow-950/40' };
    return { color: 'from-red-500 to-red-700', label: 'COLD (INFESTADO)', icon: AlertTriangle, bg: 'bg-red-950/40' };
  }, [pressureLevel]);

  const StatusIcon = statusConfig.icon;

  return (
    <div className={`relative p-8 bg-slate-950 border border-slate-900 rounded-[2rem] ${className}`}>
      <div className="flex items-center justify-between w-full mb-10">
        <div className="flex items-center gap-3">
          <Activity className="text-slate-400 w-4 h-4" />
          <span className="text-[9px] font-black text-slate-500 uppercase">Medidor de Vapor</span>
        </div>
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border ${statusConfig.bg} border-white/5`}>
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <span className="text-[9px] font-bold text-white">{pressureLevel}%</span>
        </div>
      </div>
      <div className="relative z-10 w-60 h-60 rounded-full border-[12px] border-slate-900 bg-slate-950 flex items-center justify-center">
        <div className={`absolute bottom-0 w-full bg-gradient-to-t ${statusConfig.color} opacity-90 rounded-b-full`} style={{ height: `${pressureLevel}%` }} />
        <span className="text-6xl font-black text-white font-mono">{pressureLevel}</span>
      </div>
      <div className="mt-10 w-full flex items-center justify-between p-5 rounded-2xl bg-slate-900/50 border border-slate-800">
        <StatusIcon size={20} className="text-slate-200" />
        <span className="text-sm font-bold text-white">{statusConfig.label}</span>
      </div>
    </div>
  );
};
export default GaugeIndicator;