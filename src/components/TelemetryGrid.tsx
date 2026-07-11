import React, { useState } from 'react';
import { ShieldCheck, User, AlertTriangle, Zap, Clock, Info, RefreshCw, Activity, ShieldAlert } from 'lucide-react';

/**
 * Componente: TelemetryGrid
 * Descrição: Grid de 40 slots para monitoramento de conformidade de testadores.
 * Estilo: Industrial / Cyberpunk - Projeto Prudência (Codinome TestPool)
 * RF-02: Visualização de 40 Slots de Telemetria
 */

type SlotStatus = 'ok' | 'execution' | 'failed' | 'idle';

interface TesterSlot {
  id: number;
  status: SlotStatus;
  testerName: string;
  lastPing: string;
}

const TelemetryGrid: React.FC = () => {
  // Simulação de dados: 40 slots representativos da rede de conformidade
  const [slots] = useState<TesterSlot[]>(
    Array.from({ length: 40 }, (_, i) => ({
      id: i + 1,
      status: i < 28 ? 'ok' : i < 32 ? 'execution' : i < 36 ? 'failed' : 'idle',
      testerName: i < 36 ? `Agent_${1000 + i}` : 'VAGA ABERTA',
      lastPing: '14:22 UTC'
    }))
  );

  const getStatusConfig = (status: SlotStatus) => {
    switch (status) {
      case 'ok': 
        return { 
          color: 'bg-emerald-500', 
          glow: 'shadow-[0_0_15px_rgba(16,185,129,0.3)]', 
          label: 'OK',
          text: 'text-emerald-400' 
        };
      case 'execution': 
        return { 
          color: 'bg-amber-400', 
          glow: 'shadow-[0_0_15px_rgba(251,191,36,0.3)]', 
          label: 'EXEC',
          text: 'text-amber-400' 
        };
      case 'failed': 
        return { 
          color: 'bg-rose-600', 
          glow: 'shadow-[0_0_15px_rgba(225,29,72,0.4)]', 
          label: 'FAIL',
          text: 'text-rose-400' 
        };
      case 'idle': 
        return { 
          color: 'bg-slate-700', 
          glow: 'shadow-none', 
          label: 'IDLE',
          text: 'text-slate-500' 
        };
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 bg-slate-950 border border-slate-800 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
      {/* Header do Painel Industrial */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 border-b border-slate-800 pb-8">
        <div className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3 tracking-tight">
            <ShieldCheck className="text-emerald-500 w-8 h-8" />
            Painel de Contenção Industrial
          </h2>
          <p className="text-slate-400 text-sm font-medium flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-500" />
            Buffer de Segurança: <span className="text-white">28/40</span> slots ocupados.
          </p>
        </div>
        
        <div className="flex items-center gap-4 bg-slate-900 p-2 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-2 px-4 py-2">
            <Clock className="w-5 h-5 text-slate-400" />
            <span className="text-xs font-mono font-bold text-emerald-400 tracking-wider">14 DIAS RESTANTES</span>
          </div>
          <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors">
            <RefreshCw className="w-4 h-4 text-slate-300" />
          </button>
        </div>
      </div>

      {/* Grid de Slots Adaptativo */}
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 gap-3 md:gap-4 mb-10">
        {slots.map((slot) => {
          const config = getStatusConfig(slot.status);
          return (
            <div
              key={slot.id}
              className={`group relative flex flex-col items-center justify-center h-20 md:h-24 rounded-2xl border transition-all duration-300 cursor-pointer ${
                slot.status !== 'idle' 
                  ? 'bg-slate-900 border-slate-700 hover:border-emerald-900/50 hover:bg-slate-800' 
                  : 'bg-slate-950 border-slate-900'
              }`}
            >
              <div className={`w-3 h-3 rounded-full mb-3 ${config.color} ${config.glow} transition-all`} />
              <span className={`text-[9px] font-mono font-bold uppercase tracking-widest ${config.text}`}>
                {config.label}
              </span>
              
              {/* Tooltip de Diagnóstico (Mobile-Friendly) */}
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-40 p-3 bg-black/90 backdrop-blur text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-slate-700 shadow-xl z-10 hidden md:block">
                <div className="font-bold border-b border-slate-700 pb-1 mb-1 text-slate-300">{slot.testerName}</div>
                <div className="flex justify-between">Status: <span className={config.text}>{config.label}</span></div>
                <div className="flex justify-between">Último Ping: <span className="text-slate-400">{slot.lastPing}</span></div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-t-8 border-t-black/90 border-l-8 border-l-transparent border-r-8 border-r-transparent" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Legenda de Auditoria */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-800">
        {[
          { label: 'OK', color: 'bg-emerald-500', desc: 'Conformidade' },
          { label: 'EXEC', color: 'bg-amber-400', desc: 'Em Andamento' },
          { label: 'FAIL', color: 'bg-rose-600', desc: 'Deserção' },
          { label: 'IDLE', color: 'bg-slate-700', desc: 'Vaga Aberta' }
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-3 px-3 py-2 bg-slate-900 rounded-xl">
            <div className={`w-3 h-3 rounded-full ${item.color}`} />
            <div>
              <div className="text-[10px] font-bold text-white uppercase">{item.label}</div>
              <div className="text-[9px] text-slate-500">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Alerta de Contenção (Bottom Bar) */}
      <div className="mt-8 flex items-center justify-between bg-rose-950/20 border border-rose-900/30 p-4 rounded-xl">
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 text-rose-500" />
          <span className="text-xs text-rose-200 font-medium">Sistema de monitoramento de churn ativo.</span>
        </div>
        <button className="px-4 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white rounded-lg transition-colors">
          VER RELATÓRIO
        </button>
      </div>
    </div>
  );
};

export default TelemetryGrid;
