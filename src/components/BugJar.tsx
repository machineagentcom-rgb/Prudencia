import React, { useState } from 'react';
import { 
  Bug, 
  AlertTriangle, 
  Ghost, 
  Zap, 
  Cpu, 
  Wifi, 
  CheckCircle, 
  ShieldCheck, 
  ArrowRight,
  FlaskConical
} from 'lucide-react';

interface BugCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

const SkullIcon = () => <AlertTriangle className="w-5 h-5" />;

const BUG_CATEGORIES: BugCategory[] = [
  { id: 'fatal', name: 'Infestação Fatal', icon: <SkullIcon />, color: 'bg-red-600' },
  { id: 'uiux', name: 'Camuflagem Corrompida', icon: <Ghost />, color: 'bg-purple-600' },
  { id: 'logic', name: 'Falha de Barreira', icon: <ShieldCheck />, color: 'bg-amber-600' },
  { id: 'perf', name: 'Sobrecarga de Recursos', icon: <Cpu />, color: 'bg-emerald-600' },
  { id: 'network', name: 'Ruído de Frequência', icon: <Wifi />, color: 'bg-blue-600' },
];

export const BugJar: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [jarItems, setJarItems] = useState<number>(0);

  const handleBugReport = (catId: string) => {
    setSelectedCategory(catId);
    setJarItems((prev) => Math.min(prev + 1, 15));
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-gray-950 rounded-2xl border border-gray-800 shadow-2xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <FlaskConical className="text-emerald-400" />
          O Pote de Bugs
        </h2>
        <p className="text-gray-400 text-sm mt-1">Classifique a infestação do ecossistema.</p>
      </div>

      <div className="relative h-48 w-full bg-gray-900 rounded-b-3xl border-b-4 border-x-4 border-gray-800 flex items-end justify-center p-4 overflow-hidden mb-6">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500 to-transparent"></div>
        <div className="text-center z-10">
          <div className="text-4xl font-mono font-bold text-emerald-400">{jarItems}</div>
          <div className="text-xs text-gray-500 uppercase tracking-widest">Insetos Capturados</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {BUG_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleBugReport(cat.id)}
            className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${
              selectedCategory === cat.id 
                ? 'bg-gray-800 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
                : 'bg-gray-900 border-gray-800 hover:border-gray-600'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${cat.color} text-white`}>{cat.icon}</div>
              <span className="text-white font-medium">{cat.name}</span>
            </div>
            <ArrowRight className="text-gray-600 w-5 h-5" />
          </button>
        ))}
      </div>

      <div className="mt-8 pt-4 border-t border-gray-800">
        <button className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-900/20 transition-all flex items-center justify-center gap-2">
          <CheckCircle className="w-5 h-5" />
          Finalizar Dedetização
        </button>
        <p className="text-center text-[10px] text-gray-600 mt-4 uppercase tracking-widest">
          Sistema de Auditoria Prudência v2.0
        </p>
      </div>
    </div>
  );
};