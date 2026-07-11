import React, { useState } from 'react';
import { 
  Bug, 
  AlertTriangle, 
  Ghost, 
  Zap, 
  Cpu, 
  Wifi, 
  CheckCircle, 
  ArrowRight,
  FlaskConical,
  Skull,
  ShieldAlert,
  Thermometer,
  Activity
} from 'lucide-react';

interface BugCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  glow: string;
}

const BUG_CATEGORIES: BugCategory[] = [
  { id: 'fatal', name: 'Infestação Fatal', description: 'Crash, ANR ou Bloqueios', icon: <Skull className="w-6 h-6" />, color: 'bg-red-600', glow: 'shadow-red-500/20' },
  { id: 'uiux', name: 'Camuflagem Corrompida', description: 'UI, Layout e Animações', icon: <Ghost className="w-6 h-6" />, color: 'bg-purple-600', glow: 'shadow-purple-500/20' },
  { id: 'logic', name: 'Falha de Barreira', description: 'Cálculos e Lógica de Fluxo', icon: <ShieldAlert className="w-6 h-6" />, color: 'bg-amber-600', glow: 'shadow-amber-500/20' },
  { id: 'perf', name: 'Sobrecarga de Recursos', description: 'FPS, Memória e Térmico', icon: <Cpu className="w-6 h-6" />, color: 'bg-emerald-600', glow: 'shadow-emerald-500/20' },
  { id: 'network', name: 'Ruído de Frequência', icon: <Wifi className="w-6 h-6" />, description: 'Timeout e Sincronização', color: 'bg-blue-600', glow: 'shadow-blue-500/20' },
];

export const BugJar: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [jarItems, setJarItems] = useState<number>(0);

  const handleBugReport = (catId: string) => {
    setSelectedCategory(catId);
    setJarItems((prev) => Math.min(prev + 1, 15));
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-gray-950 rounded-3xl border border-gray-800 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden font-sans">
      {/* Header */}
      <div className="p-6 border-b border-gray-800 bg-gray-900/50">
        <h2 className="text-2xl font-black text-white flex items-center gap-3">
          <FlaskConical className="text-emerald-500" />
          O Pote de Bugs
        </h2>
        <p className="text-gray-400 text-sm mt-1">Taxonomia de dedetização de ecossistema</p>
      </div>

      {/* Visualizer */}
      <div className="relative h-56 w-full bg-gray-900 flex items-end justify-center p-6 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(16,185,129,0.05)_100%)]"></div>
        
        {/* Pote Glassmorphism */}
        <div className="w-40 h-48 bg-gray-800/40 backdrop-blur-md rounded-b-[40px] border-x-2 border-b-2 border-gray-700 flex flex-col items-center justify-end pb-8 shadow-inner relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 to-transparent"></div>
          <span className="text-5xl font-mono font-bold text-white z-10 drop-shadow-lg">{jarItems}</span>
          <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold z-10 mt-1">Infestados</span>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="p-4 space-y-2">
        {BUG_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleBugReport(cat.id)}
            className={`w-full flex items-center p-3 rounded-2xl border transition-all duration-300 active:scale-[0.98] ${
              selectedCategory === cat.id 
                ? `bg-gray-800 border-gray-600 ${cat.glow} ring-1 ring-white/10` 
                : 'bg-gray-900/50 border-transparent hover:bg-gray-800'
            }`}
          >
            <div className={`p-3 rounded-xl ${cat.color} text-white shadow-lg`}>{cat.icon}</div>
            <div className="ml-4 text-left flex-1">
              <div className="text-white font-bold text-sm">{cat.name}</div>
              <div className="text-gray-500 text-[11px] font-medium">{cat.description}</div>
            </div>
            <ArrowRight className={`w-5 h-5 ${selectedCategory === cat.id ? 'text-white' : 'text-gray-700'}`} />
          </button>
        ))}
      </div>

      {/* Footer Action */}
      <div className="p-6 bg-gray-900 border-t border-gray-800">
        <button 
          disabled={jarItems === 0}
          className="w-full h-14 bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-800 disabled:text-gray-600 text-white rounded-2xl font-black text-lg shadow-lg shadow-emerald-900/20 transition-all flex items-center justify-center gap-3"
        >
          <CheckCircle className="w-6 h-6" />
          Selo de Dedetização
        </button>
        <div className="flex justify-center mt-6 gap-6">
           <div className="flex items-center gap-2 text-gray-500">
             <Activity className="w-4 h-4" />
             <span className="text-[10px] uppercase font-bold tracking-widest">Audit v2.0</span>
           </div>
           <div className="flex items-center gap-2 text-gray-500">
             <Thermometer className="w-4 h-4" />
             <span className="text-[10px] uppercase font-bold tracking-widest">Estável</span>
           </div>
        </div>
      </div>
    </div>
  );
};
