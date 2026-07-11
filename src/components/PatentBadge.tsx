import React from 'react';
import { Target, Shield, Zap, Flame, Trophy, ShieldCheck, Activity, Cpu } from 'lucide-react';

type PatentRank = 'E' | 'D' | 'C' | 'B' | 'A';

interface PatentProps {
  rank: PatentRank;
  score: number;
  isLocked?: boolean;
  nextRank?: string;
  onViewDetails?: () => void;
}

const patentConfig: Record<PatentRank, any> = {
  E: { title: 'Recruta', icon: Target, color: 'text-slate-400' },
  D: { title: 'Operador', icon: Shield, color: 'text-emerald-500' },
  C: { title: 'Especialista', icon: Zap, color: 'text-cyan-400' },
  B: { title: 'Tático', icon: Flame, color: 'text-orange-500' },
  A: { title: 'Comandante', icon: Trophy, color: 'text-yellow-400' },
};

export const PatentBadge: React.FC<PatentProps> = ({ rank, score, isLocked = false, nextRank, onViewDetails }) => {
  const config = patentConfig[rank];
  const Icon = config.icon;
  return (
    <div className="p-6 rounded-3xl border border-slate-800 bg-slate-900 w-full max-w-sm">
      <div className="flex justify-between mb-6">
        <span className={`px-4 py-1.5 border rounded-full text-[10px] font-bold ${config.color} uppercase`}>{rank}-Rank Ativo</span>
      </div>
      <Icon className={`w-20 h-20 ${config.color}`} />
      <h3 className="text-xl font-black text-white mb-2">{config.title}</h3>
      <div className="w-full h-2.5 bg-black rounded-full mb-8">
        <div className={`h-full rounded-full ${config.color.replace('text-', 'bg-')}`} style={{ width: `${score}%` }} />
      </div>
      <button onClick={onViewDetails} className="h-[52px] w-full flex items-center justify-center gap-3 text-xs font-bold text-white border border-white/10 rounded-2xl">
        <Activity className="w-4 h-4" /> {nextRank ? `Progredir: ${nextRank}` : 'Relatório'}
      </button>
    </div>
  );
};