import React from 'react';
import { ShieldCheck, User, AlertTriangle, Zap, Clock, Info } from 'lucide-react';

/**
 * Componente: TelemetryGrid
 * Descrição: Grid de 40 slots para monitoramento de conformidade de testadores.
 * Estilo: Industrial / Cyberpunk - Projeto Prudência (Codinome TestPool)
 */

type SlotStatus = 'ok' | 'execution' | 'failed' | 'idle';

interface TesterSlot {
  id: number;
  status: SlotStatus;
  testerName: string;
}

const TelemetryGrid: React.FC = () => {
  // Simulando dados de 40 slots (4 colunas x 10 linhas)
  const slots: TesterSlot[] = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1,
    status: i < 28 ? 'ok' : i < 32 ? 'execution' : i < 36 ? 'failed' : 'idle',
    testerName: i < 36 ? `Agent_${100 + i}` : 'Disponível',
  }));

  const getStatusConfig = (status: SlotStatus) => {
    switch (status) {
      case 'ok': return { color: 'bg-emerald-500', glow: 'shadow-emerald-500/50', label: 'OK' };
      case 'execution': return { color: 'bg-amber-400', glow: 'shadow-amber-400/50', label: 'EXEC' };
      case 'failed': return { color: 'bg-rose-600', glow: 'shadow-rose-600/50', label: 'FAIL' };
      case 'idle': return { color: 'bg-slate-700', glow: 'shadow-slate-700/50', label: 'IDLE' };
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl">
      {/* Header do Painel */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-slate-800 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="text-emerald-400" />
            Painel de Contenção Industrial
          </h2>
          <p className="text-slate-400 text-sm mt-1">Status de Reciprocidade: 28/40 testadores ativos.</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 rounded-full border border-slate-700">
            <Clock className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-mono text-emerald-400">14 DIAS RESTANTES</span>
          </div>
        </div>
      </div>

      {/* Grid de Slots */}
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 gap-3">
        {slots.map((slot) => {
          const config = getStatusConfig(slot.status);
          return (
            <div
              key={slot.id}
              className={`group relative flex flex-col items-center justify-center h-20 rounded-xl border transition-all duration-300 ${
                slot.status !== 'idle' 
                  ? 'bg-slate-900 border-slate-700 hover:border-slate-500' 
                  : 'bg-slate-950 border-slate-800'
              }`}
            >
              <div className={`w-3 h-3 rounded-full mb-2 ${config.color} ${config.glow} shadow-lg`} />
              <span className="text-[10px] font-mono text-slate-500 uppercase">{config.label}</span>
              
              {/* Tooltip de Hover */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-slate-700 text-center">
                {slot.testerName}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-t-8 border-t-black border-l-8 border-l-transparent border-r-8 border-r-transparent" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer de Legenda */}
      <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap gap-6 justify-center text-[11px] font-bold tracking-wider">
        <div className="flex items-center gap-2 text-emerald-500"><div className="w-2 h-2 rounded-full bg-emerald-500" /> OK</div>
        <div className="flex items-center gap-2 text-amber-400"><div className="w-2 h-2 rounded-full bg-amber-400" /> EM EXECUÇÃO</div>
        <div className="flex items-center gap-2 text-rose-500"><div className="w-2 h-2 rounded-full bg-rose-500" /> FALHA/DESERÇÃO</div>
        <div className="flex items-center gap-2 text-slate-500"><div className="w-2 h-2 rounded-full bg-slate-700" /> OCIOSO</div>
      </div>
    </div>
  );
};

export default TelemetryGrid;
