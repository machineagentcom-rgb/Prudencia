import React from 'react';
import { Target, Shield, Zap, Flame, Trophy, AlertTriangle, ChevronRight, Activity, Cpu, ShieldCheck } from 'lucide-react';

/**
 * PatentBadge.tsx - Projeto Prudência
 * Componente de visualização de patente do testador com fidelidade visual ao ecossistema industrial.
 * Implementação conforme RF-6.2 e 6.3 (Squad Dedetizador).
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
  E: { 
    title: 'Recruta da Contenção', 
    icon: Target, 
    color: 'text-slate-400', 
    border: 'border-slate-400/30', 
    bg: 'bg-slate-900/40', 
    slogan: 'Gatilho Rápido, Spray na Mão.', 
    glow: 'shadow-[0_0_30px_rgba(148,163,184,0.1)]' 
  },
  D: { 
    title: 'Operador de Vanguarda', 
    icon: Shield, 
    color: 'text-emerald-500', 
    border: 'border-emerald-500/30', 
    bg: 'bg-emerald-950/20', 
    slogan: 'Perímetro Blindado, Praga Encurralada.', 
    glow: 'shadow-[0_0_30px_rgba(16,185,129,0.1)]' 
  },
  C: { 
    title: 'Especialista de Elite', 
    icon: Zap, 
    color: 'text-cyan-400', 
    border: 'border-cyan-400/30', 
    bg: 'bg-cyan-950/20', 
    slogan: 'Visão Tecnológica Ativada.', 
    glow: 'shadow-[0_0_30px_rgba(34,211,238,0.1)]' 
  },
  B: { 
    title: 'Tático de Impacto', 
    icon: Flame, 
    color: 'text-orange-500', 
    border: 'border-orange-500/30', 
    bg: 'bg-orange-950/20', 
    slogan: 'Ameaça Detectada, Infestação Aniquilada.', 
    glow: 'shadow-[0_0_30px_rgba(249,115,22,0.1)]' 
  },
  A: { 
    title: 'Comandante Supremo', 
    icon: Trophy, 
    color: 'text-yellow-400', 
    border: 'border-yellow-400/30', 
    bg: 'bg-yellow-950/20', 
    slogan: 'Predador Alfa do Ecossistema.', 
    glow: 'shadow-[0_0_30px_rgba(250,204,21,0.15)]' 
  },
};

export const PatentBadge: React.FC<PatentProps> = ({ rank, score, isLocked = false, nextRank, onViewDetails }) => {
  const config = patentConfig[rank];
  const Icon = config.icon;

  return (
    <div className={`relative flex flex-col items-center p-6 rounded-3xl border ${config.border} ${config.bg} backdrop-blur-2xl ${config.glow} transition-all duration-700 w-full max-w-sm mx-auto overflow-hidden group`}>
      
      {/* Background Industrial Texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

      {/* Header Status */}
      <div className="flex justify-between w-full mb-6 z-10">
        <div className="flex items-center gap-2">
          {isLocked ? (
            <span className="flex items-center gap-2 px-4 py-1.5 bg-red-950/40 border border-red-500/30 rounded-full text-[10px] font-bold text-red-400 uppercase tracking-[0.2em]">
              <AlertTriangle className="w-3.5 h-3.5" /> Suspenso
            </span>
          ) : (
            <span className={`px-4 py-1.5 border rounded-full text-[10px] font-bold ${config.border} bg-black/20 ${config.color} uppercase tracking-[0.2em] flex items-center gap-2`}>
              <ShieldCheck className="w-3.5 h-3.5" /> {rank}-Rank Ativo
            </span>
          )}
        </div>
        <div className="w-10 h-10 flex items-center justify-center rounded-2xl bg-black/40 border border-white/5 shadow-inner">
          <span className="text-xs font-mono font-bold text-slate-500">{rank}</span>
        </div>
      </div>

      {/* Icon Graphic */}
      <div className={`relative p-8 rounded-3xl bg-black/60 mb-6 border ${config.border} shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]`}>
        <Icon className={`w-20 h-20 ${config.color}`} strokeWidth={1} />
        <div className="absolute top-2 right-2 flex gap-1">
          <div className={`w-2 h-2 rounded-full ${config.color.replace('text-', 'bg-')} animate-pulse`} />
        </div>
      </div>

      {/* Identity */}
      <h3 className="text-xl font-black text-white mb-2 tracking-wide uppercase">{config.title}</h3>
      <p className="text-[11px] text-slate-400 italic mb-8 font-mono opacity-80 text-center uppercase tracking-wider px-4">
        "{config.slogan}"
      </p>

      {/* Progress Data */}
      <div className="w-full space-y-3 mb-8">
        <div className="flex justify-between items-center px-1">
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <Cpu className="w-3.5 h-3.5" /> Estabilidade de Rede
          </div>
          <span className={`text-sm font-mono font-bold ${config.color}`}>{score}%</span>
        </div>
        <div className="h-2.5 w-full bg-black/80 rounded-full border border-white/5 p-[2px] shadow-inner">
          <div 
            className={`h-full rounded-full ${config.color.replace('text-', 'bg-')} transition-all duration-1000 ease-out`}
            style={{ width: `${Math.min(score, 100)}%`, boxShadow: `0 0 15px currentColor` }}
          />
        </div>
      </div>

      {/* Action Footer */}
      <button 
        onClick={onViewDetails}
        className="h-[52px] w-full flex items-center justify-center gap-3 text-xs font-bold text-white uppercase tracking-[0.15em] border border-white/10 hover:bg-white/5 rounded-2xl transition-all active:scale-[0.98] z-10"
      >
        <Activity className="w-4 h-4" />
        {nextRank ? `Progredir: ${nextRank}` : 'Relatório Completo'}
        <ChevronRight className="w-4 h-4 opacity-50" />
      </button>

      {/* Ambient Glow */}
      <div className={`absolute -bottom-24 -right-24 w-64 h-64 rounded-full blur-[100px] opacity-10 ${config.color.replace('text-', 'bg-')}`} />
    </div>
  );
};
