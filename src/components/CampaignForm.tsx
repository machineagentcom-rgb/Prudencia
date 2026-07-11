import React, { useState } from 'react';
import { 
  Rocket, 
  Package, 
  Link as LinkIcon, 
  Languages, 
  Cpu, 
  AlertCircle, 
  ChevronRight,
  ShieldCheck,
  Info,
  Globe,
  Database
} from 'lucide-react';

/**
 * @file CampaignForm.tsx
 * @description Implementação de alta fidelidade para RF-01 (Cadastro de Aplicativo).
 * Interface com temática industrial "Squad Dedetizador" - Projeto Prudência.
 */

interface FormData {
  appName: string;
  packageName: string;
  testGroupLink: string;
  supportLink: string;
  versionCode: string;
  language: string;
  agreement: boolean;
}

const CampaignForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    appName: '',
    packageName: '',
    testGroupLink: '',
    supportLink: '',
    versionCode: '',
    language: 'pt-BR',
    agreement: false
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreement) {
      alert("É necessário aceitar os termos de conformidade regulatória para prosseguir com a ativação.");
      return;
    }
    
    setLoading(true);
    // Simulação de transação de conformidade
    setTimeout(() => {
      console.log('Payload de conformidade enviado ao Firestore:', formData);
      setLoading(false);
      alert("Campanha submetida com sucesso ao Protocolo Prudência.");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8 flex flex-col items-center font-sans selection:bg-emerald-500/30">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-[0_0_80px_-20px_rgba(16,185,129,0.15)] backdrop-blur-sm">
        
        {/* Header Temático */}
        <div className="mb-8 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 shadow-inner">
              <Rocket className="text-emerald-400 w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Iniciar Operação</h1>
              <p className="text-slate-400 text-sm italic">Configuração de diretrizes para o Google Play Console</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Sessão 1: Identificação */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-emerald-500 mb-2">
              <Database size={16} />
              <h2 className="text-sm font-bold uppercase tracking-widest">Identificação do Ativo</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Package size={14} /> Nome Comercial do Aplicativo
                </label>
                <input
                  type="text"
                  required
                  className="w-full h-14 bg-slate-950 border border-slate-700 rounded-xl px-4 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                  placeholder="Ex: Prudential Suite Core"
                  value={formData.appName}
                  onChange={(e) => setFormData({...formData, appName: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Cpu size={14} /> Package Name (ID Único)
                </label>
                <input
                  type="text"
                  required
                  className="w-full h-14 bg-slate-950 border border-slate-700 rounded-xl px-4 text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none font-mono text-sm"
                  placeholder="com.empresa.projeto.prudence"
                  value={formData.packageName}
                  onChange={(e) => setFormData({...formData, packageName: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Sessão 2: Parâmetros de Rede */}
          <div className="space-y-6 border-t border-slate-800 pt-8">
            <div className="flex items-center gap-2 text-emerald-500 mb-2">
              <Globe size={16} />
              <h2 className="text-sm font-bold uppercase tracking-widest">Parâmetros de Operação</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <LinkIcon size={14} /> Link Google Grupo
                </label>
                <input
                  type="url"
                  required
                  className="w-full h-14 bg-slate-950 border border-slate-700 rounded-xl px-4 text-white focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                  placeholder="https://groups.google.com/..."
                  value={formData.testGroupLink}
                  onChange={(e) => setFormData({...formData, testGroupLink: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <AlertCircle size={14} /> Current VersionCode
                </label>
                <input
                  type="number"
                  required
                  className="w-full h-14 bg-slate-950 border border-slate-700 rounded-xl px-4 text-white focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                  placeholder="Ex: 102"
                  value={formData.versionCode}
                  onChange={(e) => setFormData({...formData, versionCode: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Languages size={14} /> Idioma Nativo
                </label>
                <select 
                  className="w-full h-14 bg-slate-950 border border-slate-700 rounded-xl px-4 text-white focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer appearance-none"
                  value={formData.language}
                  onChange={(e) => setFormData({...formData, language: e.target.value})}
                >
                  <option value="pt-BR">Português (Brasil)</option>
                  <option value="en-US">English (US)</option>
                  <option value="es-ES">Español</option>
                  <option value="fr-FR">Français</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Info size={14} /> Canal de Suporte (URL)
                </label>
                <input
                  type="url"
                  required
                  className="w-full h-14 bg-slate-950 border border-slate-700 rounded-xl px-4 text-white focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                  placeholder="https://t.me/suporte"
                  value={formData.supportLink}
                  onChange={(e) => setFormData({...formData, supportLink: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Termos de conformidade */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 flex items-start gap-4">
            <input 
              type="checkbox" 
              className="mt-1 w-6 h-6 accent-emerald-500 rounded border-slate-700 cursor-pointer"
              checked={formData.agreement}
              onChange={(e) => setFormData({...formData, agreement: e.target.checked})}
            />
            <p className="text-slate-400 text-xs leading-relaxed">
              Ao ativar esta campanha, declaro estar ciente dos termos de reciprocidade do Protocolo Prudência. 
              Autorizo a telemetria de presença via SDK para garantir a conformidade dos 40 slots de testadores ativos 
              por 14 dias. A falha no cumprimento resultará em suspensão temporária.
            </p>
          </div>

          {/* Action Button */}
          <button 
            type="submit"
            disabled={loading}
            className={`w-full h-16 rounded-xl font-black text-lg uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${
              loading 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-slate-950 hover:shadow-[0_0_40px_rgba(16,185,129,0.3)]'
            }`}
          >
            {loading ? 'PROCESSANDO...' : 'ATIVAR CAMPANHA'}
            {!loading && <ChevronRight size={22} />}
          </button>
        </form>

        <div className="mt-8 flex items-center justify-center gap-2 text-emerald-900/60 text-[10px] uppercase tracking-widest font-bold">
          <ShieldCheck size={14} />
          <span>Protocolo Prudência v2.0 - Segurança de Hardware Ativa</span>
        </div>
      </div>
    </div>
  );
};

export default CampaignForm;


// Buffer reparado e saneado pelo Sub-Agente de Revisão Local.