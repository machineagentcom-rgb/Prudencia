import React from 'react';
import { Target, Shield, Zap, Flame, Trophy, Award, Lock } from 'lucide-react';

/**
 * PatentBadge.tsx - Projeto Prudência
 * Componente de visualização de patente do testador.
 * Implementação baseada na taxonomia de patentes do Squad Dedetizador.
 */

type PatentRank = 'E' | 'D' | 'C' | 'B' | 'A';

interface PatentProps {
  rank: PatentRank;
  score: number; // 0 a 100
  isLocked?: boolean;
}

const patentConfig = {
  E: { title: 'Recruta da Contenção', icon: Target, color: 'text-slate-400', border: 'border-slate-400', bg: 'bg-slate-900', slogan: 'Gatilho Rápido, Spray na Mão.' },
  D: { title: 'Operador de Vanguarda', icon: Shield, color: 'text-emerald-500', border: 'border-emerald-500', bg: 'bg-emerald-950/20', slogan: 'Perímetro Blindado, Praga Encurralada.' },
  C: { title: 'Especialista de Elite', icon: Zap, color: 'text-cyan-400', border: 'border-cyan-400', bg: 'bg-cyan-950/20', slogan: 'Visão Tecnológica Ativada.' },
  B: { title: 'Tático de Impacto', icon: Flame, color: 'text-orange-500', border: 'border-orange-500', bg: 'bg-orange-950/20', slogan: 'Ameaça Detectada, Infestação Aniquilada.' },
  A: { title: 'Comandante Supremo', icon: Trophy, color: 'text-yellow-400', border: 'border-yellow-400', bg: 'bg-yellow-950/20', slogan: 'Predador Alfa do Ecossistema.' },
};

export const PatentBadge: React.FC<PatentProps> = ({ rank, score, isLocked = false }) => {
  const config = patentConfig[rank];
  const Icon = config.icon;

  return (
    <div className={`relative flex flex-col items-center p-6 rounded-2xl border-2 ${config.border} ${config.bg} backdrop-blur-md shadow-2xl transition-all duration-500 hover:scale-[1.02] w-full max-w-sm mx-auto overflow-hidden`}>
      
      {/* Indicador de Status */}
      <div className="absolute top-4 right-4">
        {isLocked ? (
          <Lock className="w-5 h-5 text-red-500 animate-pulse" />
        ) : (
          <div className="flex items-center gap-1 text-xs font-mono uppercase tracking-widest text-slate-400">
            <span className={`w-2 h-2 rounded-full ${rank === 'A' ? 'bg-yellow-400 animate-ping' : 'bg-emerald-500'}`} />
            {rank}-Rank
          </div>
        )}
      </div>

      {/* Ícone de Patente */}
      <div className={`p-4 rounded-full bg-black/40 mb-4 border ${config.border} shadow-[0_0_20px_rgba(0,0,0,0.5)]`}>
        <Icon className={`w-12 h-12 ${config.color}`} strokeWidth={1.5} />
      </div>

      {/* Título e Slogan */}
      <h3 className="text-xl font-bold text-white mb-1 tracking-tight">{config.title}</h3>
      <p className="text-sm text-slate-400 italic mb-6 text-center font-mono">"{config.slogan}"</p>

      {/* Barra de Progresso de Prestígio */}
      <div className="w-full space-y-2">
        <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          <span>Progresso de Patente</span>
          <span>{score}%</span>
        </div>
        <div className="h-3 w-full bg-black/60 rounded-full border border-slate-800 overflow-hidden">
          <div 
            className={`h-full ${config.color.replace('text-', 'bg-')} transition-all duration-1000 ease-out`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      {/* Efeito Visual Neon Subjacente */}
      <div className={`absolute -bottom-10 -right-10 w-24 h-24 rounded-full blur-3xl opacity-20 ${config.color.replace('text-', 'bg-')}`} />
    </div>
  );
};

export default PatentBadge;
