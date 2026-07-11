import React from 'react';
import { Target, Shield, Zap, Flame, Trophy, Lock, AlertTriangle, ChevronRight } from 'lucide-react';

/**
 * PatentBadge.tsx - Projeto Prudência
 * Componente de visualização de patente do testador com fidelidade visual ao ecossistema industrial.
 */

type PatentRank = 'E' | 'D' | 'C' | 'B' | 'A';

interface PatentProps {
  rank: PatentRank;
  score: number; // 0 a 100
  isLocked?: boolean;
  nextRank?: string;
  onViewDetails?: () => void;
}

const patentConfig = {
  E: { title: 'Recruta da Contenção', icon: Target, color: 'text-slate-400', border: 'border-slate-400', bg: 'bg-slate-900/50', slogan: 'Gatilho Rápido, Spray na Mão.', glow: 'shadow-[0_0_30px_rgba(148,163,184,0.15)]' },
  D: { title: 'Operador de Vanguarda', icon: Shield, color: 'text-emerald-500', border: 'border-emerald-500', bg: 'bg-emerald-950/20', slogan: 'Perímetro Blindado, Praga Encurralada.', glow: 'shadow-[0_0_30px_rgba(16,185,129,0.15)]' },
  C: { title: 'Especialista de Elite', icon: Zap, color: 'text-cyan-400', border: 'border-cyan-400', bg: 'bg-cyan-950/20', slogan: 'Visão Tecnológica Ativada.', glow: 'shadow-[0_0_30px_rgba(34,211,238,0.15)]' },
  B: { title: 'Tático de Impacto', icon: Flame, color: 'text-orange-500', border: 'border-orange-500', bg: 'bg-orange-950/20', slogan: 'Ameaça Detectada, Infestação Aniquilada.', glow: 'shadow-[0_0_30px_rgba(249,115,22,0.15)]' },
  A: { title: 'Comandante Supremo', icon: Trophy, color: 'text-yellow-400', border: 'border-yellow-400', bg: 'bg-yellow-950/20', slogan: 'Predador Alfa do Ecossistema.', glow: 'shadow-[0_0_30px_rgba(250,204,21,0.2)]' },
};

export const PatentBadge: React.FC<PatentProps> = ({ rank, score, isLocked = false, nextRank, onViewDetails }) => {
  const config = patentConfig[rank];
  const Icon = config.icon;

  return (
    <div className={`relative flex flex-col items-center p-6 rounded-3xl border ${config.border} ${config.bg} backdrop-blur-xl ${config.glow} transition-all duration-500 w-full max-w-sm mx-auto overflow-hidden group`}>
      
      {/* Decorative Header Lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current opacity-30" />

      {/* Header Status */}
      <div className="flex justify-between w-full mb-6">
        <div className="flex items-center gap-2">
          {isLocked ? (
            <span className="flex items-center gap-1.5 px-3 py-1 bg-red-950/50 border border-red-500/30 rounded-full text-[10px] font-bold text-red-400 uppercase tracking-widest">
              <AlertTriangle className="w-3 h-3" /> Bloqueado
            </span>
          ) : (
            <span className={`px-3 py-1 border rounded-full text-[10px] font-bold ${config.border} bg-black/20 ${config.color} uppercase tracking-widest`}>
              {rank}-Rank Active
            </span>
          )}
        </div>
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-black/40 border border-slate-800">
          <span className="text-[10px] font-mono font-bold text-slate-500">{rank}</span>
        </div>
      </div>

      {/* Main Icon container */}
      <div className={`relative p-5 rounded-2xl bg-black/60 mb-5 border ${config.border} transition-transform duration-300 group-hover:scale-105`}>
        <Icon className={`w-16 h-16 ${config.color}`} strokeWidth={1} />
        <div className={`absolute inset-0 rounded-2xl opacity-20 bg-gradient-to-br from-white to-transparent`} />
      </div>

      {/* Textual Identity */}
      <h3 className="text-2xl font-black text-white mb-1 tracking-tight uppercase">{config.title}</h3>
      <p className="text-xs text-slate-400 italic mb-8 font-mono max-w-[200px] text-center">"{config.slogan}"</p>

      {/* Progress Section */}
      <div className="w-full space-y-3 mb-6">
        <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          <span>Estabilidade de Sistema</span>
          <span className="text-white">{score}%</span>
        </div>
        <div className="h-2 w-full bg-black/80 rounded-full border border-slate-800 p-[1px]">
          <div 
            className={`h-full rounded-full ${config.color.replace('text-', 'bg-')} transition-all duration-1000 ease-out`}
            style={{ width: `${Math.min(score, 100)}%` }}
          />
        </div>
      </div>

      {/* Action Footer */}
      <button 
        onClick={onViewDetails}
        className="w-full py-3 flex items-center justify-center gap-2 text-xs font-bold text-white uppercase tracking-widest border border-slate-700 hover:bg-white/5 rounded-xl transition-all active:scale-95"
      >
        {nextRank ? `Progredir para ${nextRank}` : 'Ver Detalhes de Patente'}
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Ambient Glow */}
      <div className={`absolute -bottom-16 -right-16 w-40 h-40 rounded-full blur-[80px] opacity-10 ${config.color.replace('text-', 'bg-')}`} />
    </div>
  );
};
