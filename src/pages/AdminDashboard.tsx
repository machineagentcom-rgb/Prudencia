import React, { useState } from 'react';
import { 
  ShieldAlert, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Bug, 
  Settings, 
  RefreshCw, 
  Save, 
  Terminal,
  Activity
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('economy');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent flex items-center gap-3">
            <Terminal className="text-emerald-500" />
            ADMIN.PRUDENCIA_CORE
          </h1>
          <p className="text-slate-400 text-sm">Interface de Controle de Infraestrutura & Governança Econômica</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm transition-colors border border-slate-700">Logs de Auditoria</button>
          <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-sm font-bold transition-all shadow-lg shadow-emerald-900/20">Sincronizar Cluster</button>
        </div>
      </header>

      <nav className="flex gap-4 mb-8 overflow-x-auto pb-2">
        {['economy', 'analytics', 'governance'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-xl capitalize font-semibold transition-all ${
              activeTab === tab 
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/50' 
              : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>

      <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Painel Econômico */}
        <section className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <DollarSign className="text-emerald-400" /> Parâmetros de Liquidez
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Recompensa Diária (Créditos)', value: 2 },
                { label: 'Custo de Publicação', value: 14 },
                { label: 'Taxa Base de Testador', value: 1 },
                { label: 'Conversão Premium (Dias)', value: 7 }
              ].map((item, i) => (
                <div key={i} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <label className="text-xs text-slate-500 uppercase tracking-wider">{item.label}</label>
                  <input type="number" defaultValue={item.value} className="w-full bg-transparent text-xl font-mono mt-2 outline-none border-b border-slate-700 focus:border-emerald-500 py-1" />
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold flex items-center justify-center gap-2">
              <Save size={18} /> Aplicar Alterações de Mercado
            </button>
          </div>
        </section>

        {/* Estatísticas e Monitoramento */}
        <section className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-br from-emerald-900/20 to-cyan-900/20 border border-emerald-500/20 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Activity className="text-emerald-400" /> Saúde do Ecossistema
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">DAU (Usuários Ativos)</span>
                <span className="font-mono text-emerald-400">12,402</span>
              </div>
              <div className="h-2 bg-slate-950 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[78%]"></div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Taxa de Churn Global</span>
                <span className="font-mono text-rose-400">4.2%</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Bug className="text-amber-400" /> O Pote de Bugs (Global)
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-center">
                <p className="text-2xl font-bold text-amber-500">842</p>
                <p className="text-[10px] uppercase text-slate-500">Relatados (24h)</p>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-center">
                <p className="text-2xl font-bold text-emerald-500">112</p>
                <p className="text-[10px] uppercase text-slate-500">Resolvidos (24h)</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-12 pt-6 border-t border-slate-800 text-center text-slate-600 text-xs">
        PRUDÊNCIA SYSTEM | SECURE ACCESS | SESSION: {new Date().getTime().toString(16).toUpperCase()}
      </footer>
    </div>
  );
};

export default AdminDashboard;
