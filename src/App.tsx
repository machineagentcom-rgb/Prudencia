import React, { useState } from 'react';
import { Layout, Play, Code, BookOpen, Layers, Terminal, ShieldCheck } from 'lucide-react';
import { GaugeIndicator } from './components/GaugeIndicator';
import { PatentBadge } from './components/PatentBadge';
import { CampaignForm } from './components/CampaignForm';
import { TelemetryGrid } from './components/TelemetryGrid';
import { BugJar } from './components/BugJar';
import { AdminDashboard } from './pages/AdminDashboard';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');

  // Simulated props/states for playgrounds
  const [gaugeValue, setGaugeValue] = useState(50);
  const [gaugeState, setGaugeState] = useState<'HOT' | 'WARM' | 'COLD'>('WARM');
  const [patentLevel, setPatentLevel] = useState('C');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-900">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/10">
              <Layers size={18} className="text-slate-950" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
                TestPool <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-mono font-medium">Prudência</span>
              </h1>
              <p className="text-[10px] text-slate-400">Ambiente de Testes do Machine Agent v2</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[10px] bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700/50 font-mono text-slate-300">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            VITE_DEV_SERVER_PORT_3001
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto p-6 gap-6">
        {/* Navigation Sidebar */}
        <aside className="w-64 shrink-0 flex flex-col gap-2">
          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest px-3 font-mono">Navegação Geral</span>
          
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg transition-all ${
              activeTab === 'overview'
                ? 'bg-slate-800 text-white border-l-2 border-emerald-500 pl-4'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <BookOpen size={14} />
            <span>Documentação & SRS</span>
          </button>

          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest px-3 font-mono mt-4">Componentes Entregues</span>
  
          <button
            onClick={() => setActiveTab('campaign')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg transition-all ${
              activeTab === 'campaign'
                ? 'bg-slate-800 text-white border-l-2 border-emerald-500 pl-4'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <Play size={14} />
            <span>Formulário Campanha</span>
          </button>
    
          <button
            onClick={() => setActiveTab('telemetry')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg transition-all ${
              activeTab === 'telemetry'
                ? 'bg-slate-800 text-white border-l-2 border-emerald-500 pl-4'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <Play size={14} />
            <span>Telemetria (40 Slots)</span>
          </button>
    
          <button
            onClick={() => setActiveTab('gamification')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg transition-all ${
              activeTab === 'gamification'
                ? 'bg-slate-800 text-white border-l-2 border-emerald-500 pl-4'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <Play size={14} />
            <span>Mecânicas Gamificação</span>
          </button>
    
          <button
            onClick={() => setActiveTab('bugjar')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg transition-all ${
              activeTab === 'bugjar'
                ? 'bg-slate-800 text-white border-l-2 border-emerald-500 pl-4'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <Play size={14} />
            <span>Pote de Bugs 🪲</span>
          </button>
    
          <button
            onClick={() => setActiveTab('admin')}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg transition-all ${
              activeTab === 'admin'
                ? 'bg-slate-800 text-white border-l-2 border-emerald-500 pl-4'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <Play size={14} />
            <span>Painel Secret Admin</span>
          </button>
    
          <div className="mt-auto bg-slate-900/50 border border-slate-800/80 p-4 rounded-xl flex flex-col gap-2">
            <span className="text-[10px] font-bold text-slate-400">Status Geral do Ciclo</span>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-mono font-bold text-slate-300">CÓDIGO CONSOLIDADO</span>
            </div>
            <p className="text-[9px] text-slate-500 leading-normal">Ambiente preparado e sincronizado com o DB.</p>
          </div>
        </aside>

        {/* Workspace Display */}
        <main className="flex-1 bg-slate-900 border border-slate-800/80 rounded-2xl p-6 overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="flex flex-col gap-6">
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-lg font-bold text-white mb-1">Documentação e Especificação Técnica</h2>
                <p className="text-xs text-slate-400">Entenda os requisitos consolidados e arquitetura técnica mapeada.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/50">
                  <h3 className="text-xs font-bold text-slate-300 mb-2 font-mono uppercase tracking-wider flex items-center gap-1.5">
                    <Layout size={14} className="text-emerald-500" />
                    Propósito do Sistema
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Este ecossistema elimina a burocracia do Google Play Console exigindo uma quantidade mínima de 12 testadores ativos por 14 dias consecutivos. O sistema gerencia reciprocidade e engajamento mútuo via créditos e patentes.
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/50">
                  <h3 className="text-xs font-bold text-slate-300 mb-2 font-mono uppercase tracking-wider flex items-center gap-1.5">
                    <Code size={14} className="text-emerald-500" />
                    Regra Dinâmica
                  </h3>
                  <ul className="text-xs text-slate-400 space-y-1">
                    <li>• Buffer dinâmico de segurança: 40 testadores simultâneos.</li>
                    <li>• Play Integrity & Firebase App Check para validação de emuladores.</li>
                    <li>• Dreno de liquidez e dilação: expiração de créditos inativos em 45 dias.</li>
                  </ul>
                </div>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800/50">
                <h3 className="text-xs font-bold text-slate-300 mb-3 font-mono uppercase tracking-wider flex items-center gap-1.5">
                  <Terminal size={14} className="text-emerald-500" />
                  Arquivos Físicos Modificados neste Ciclo
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
  
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-300 select-all">package.json</span>
                    <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded">Definição de Dependências</span>
                  </div>
      
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-300 select-all">src/config/firebase.ts</span>
                    <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded">Firebase Config & App Check</span>
                  </div>
      
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-300 select-all">src/types/firestore.d.ts</span>
                    <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded">Schemas TypeScript</span>
                  </div>
      
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-300 select-all">src/services/creditSystem.ts</span>
                    <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded">Serviço de Economia</span>
                  </div>
      
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-300 select-all">src/hooks/useRewardedAd.ts</span>
                    <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded">AdMob Reward Integration</span>
                  </div>
      
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-300 select-all">src/components/GaugeIndicator.tsx</span>
                    <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded">Vapor Pressure Gauge UI</span>
                  </div>
      
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-300 select-all">src/components/PatentBadge.tsx</span>
                    <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded">Patentes (E-Rank ao A-Rank)</span>
                  </div>
      
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-300 select-all">src/components/CampaignForm.tsx</span>
                    <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded">Cadastro de Campanha</span>
                  </div>
      
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-300 select-all">src/components/TelemetryGrid.tsx</span>
                    <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded">Mosaico de 40 Testadores</span>
                  </div>
      
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-300 select-all">src/components/BugJar.tsx</span>
                    <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded">Pote de Bugs (Taxonomia)</span>
                  </div>
      
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-300 select-all">src/pages/AdminDashboard.tsx</span>
                    <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded">Secret Admin Painel</span>
                  </div>
      
                </div>
              </div>
            </div>
          )}

          {activeTab === 'campaign' && (
            <div className="flex flex-col gap-6">
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-lg font-bold text-white mb-1">Formulário de Cadastro de Campanha (RF-01)</h2>
                <p className="text-xs text-slate-400">Adicione novos aplicativos de teste closed alpha.</p>
              </div>
              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800/80">
                {/* Dynamically render CampaignForm */}
                {/* @ts-ignore */}
                <CampaignForm onSubmit={(data) => alert('Campanha enviada com sucesso: ' + JSON.stringify(data))} />
              </div>
            </div>
          )}

          {activeTab === 'telemetry' && (
            <div className="flex flex-col gap-6">
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-lg font-bold text-white mb-1">Mosaico de Telemetria (RF-02)</h2>
                <p className="text-xs text-slate-400">Grade dinâmica de 40 slots monitorando a presença diária dos testadores.</p>
              </div>
              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800/80">
                {/* Dynamically render TelemetryGrid */}
                {/* @ts-ignore */}
                <TelemetryGrid />
              </div>
            </div>
          )}

          {activeTab === 'gamification' && (
            <div className="flex flex-col gap-6">
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-lg font-bold text-white mb-1">Mecânicas de Gamificação e Feedback Visual</h2>
                <p className="text-xs text-slate-400">Componentes de engajamento do usuário baseados em pressão de vapor e reputação.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-950 p-6 rounded-xl border border-slate-800/80 flex flex-col gap-4">
                  <h3 className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider">Vapor Pressure Gauge (RF-6.1)</h3>
                  
                  <div className="flex justify-center p-4 bg-slate-900 rounded-lg">
                    {/* Dynamically render GaugeIndicator if exists */}
                    {hasGauge ? (
                      /* @ts-ignore */
                      <GaugeIndicator value={gaugeValue} state={gaugeState} />
                    ) : (
                      <span className="text-xs text-slate-500 italic">Componente indisponível</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] text-slate-400 flex justify-between font-mono">
                      <span>Valor de Pressão: {gaugeValue} PSI</span>
                    </label>
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={gaugeValue} 
                      onChange={(e) => setGaugeValue(Number(e.target.value))}
                      className="w-full accent-emerald-500" 
                    />
                    <div className="flex gap-2 mt-2">
                      {(['HOT', 'WARM', 'COLD'] as const).map(st => (
                        <button
                          key={st}
                          onClick={() => setGaugeState(st)}
                          className={`flex-1 py-1 text-[10px] font-mono rounded font-bold ${
                            gaugeState === st ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950 p-6 rounded-xl border border-slate-800/80 flex flex-col gap-4">
                  <h3 className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider">Badge de Patente (RF-6.2)</h3>
                  
                  <div className="flex justify-center items-center p-8 bg-slate-900 rounded-lg flex-1">
                    {/* Dynamically render PatentBadge if exists */}
                    {hasPatent ? (
                      /* @ts-ignore */
                      <PatentBadge patent={patentLevel} />
                    ) : (
                      <span className="text-xs text-slate-500 italic">Componente indisponível</span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] text-slate-400 font-mono">Selecionar Reputação/Patente:</span>
                    <div className="flex gap-1">
                      {['A', 'B', 'C', 'D', 'E'].map(lvl => (
                        <button
                          key={lvl}
                          onClick={() => setPatentLevel(lvl)}
                          className={`flex-1 py-1 text-[10px] font-mono rounded font-bold ${
                            patentLevel === lvl ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {lvl}-Rank
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bugjar' && (
            <div className="flex flex-col gap-6">
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-lg font-bold text-white mb-1">Pote de Bugs (RF-12 e RF-13)</h2>
                <p className="text-xs text-slate-400">Classificação lúdica dos bugs e crash logs do sistema.</p>
              </div>
              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800/80">
                {/* Dynamically render BugJar */}
                {/* @ts-ignore */}
                <BugJar />
              </div>
            </div>
          )}

          {activeTab === 'admin' && (
            <div className="flex flex-col gap-6">
              <div className="border-b border-slate-800 pb-4">
                <h2 className="text-lg font-bold text-white mb-1">Painel Secret Admin (RF-26)</h2>
                <p className="text-xs text-slate-400">Métricas analíticas globais e controle econômico do sistema.</p>
              </div>
              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800/80">
                {/* Dynamically render AdminDashboard */}
                {/* @ts-ignore */}
                <AdminDashboard />
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 px-6 py-4 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[10px] font-mono">
          <span>© 2026 Machine Agent. Prudência Playground de Testes.</span>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 hover:text-slate-300 cursor-pointer">Termos de Reciprocidade</span>
            <span>•</span>
            <span className="text-slate-400 hover:text-slate-300 cursor-pointer">SLA de Testadores</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
  