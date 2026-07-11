import React, { useState } from 'react';
import { 
  Rocket, 
  Package, 
  Link as LinkIcon, 
  Languages, 
  Cpu, 
  AlertCircle, 
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Info
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreement) {
      alert("É necessário aceitar os termos de conformidade regulatória.");
      return;
    }
    console.log('Dados da Campanha validados:', formData);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8 flex flex-col items-center font-sans">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-[0_0_60px_-15px_rgba(16,185,129,0.2)]">
        
        {/* Header Temático */}
        <div className="mb-8 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
              <Rocket className="text-emerald-400 w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Iniciar Operação</h1>
              <p className="text-slate-400 text-sm">Configuração de diretrizes para o Google Play Console</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações Principais */}
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                <Package size={14} /> Nome do Aplicativo
              </label>
              <input
                type="text"
                required
                className="w-full h-14 bg-slate-950 border border-slate-700 rounded-xl px-4 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
                placeholder="Ex: Prudential Suite Core"
                value={formData.appName}
                onChange={(e) => setFormData({...formData, appName: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                <Cpu size={14} /> Package Name (ID)
              </label>
              <input
                type="text"
                required
                className="w-full h-14 bg-slate-950 border border-slate-700 rounded-xl px-4 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none font-mono"
                placeholder="com.example.application"
                value={formData.packageName}
                onChange={(e) => setFormData({...formData, packageName: e.target.value})}
              />
            </div>
          </div>

          {/* Links de Operação */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-2">
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
              <label className="text-xs font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                <AlertCircle size={14} /> Version Code
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
              <label className="text-xs font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                <Languages size={14} /> Idioma Nativo
              </label>
              <select 
                className="w-full h-14 bg-slate-950 border border-slate-700 rounded-xl px-4 text-white focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer"
                value={formData.language}
                onChange={(e) => setFormData({...formData, language: e.target.value})}
              >
                <option value="pt-BR">Português (Brasil)</option>
                <option value="en-US">English (US)</option>
                <option value="es-ES">Español</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-2">
                <Info size={14} /> Canal de Suporte
              </label>
              <input
                type="url"
                required
                className="w-full h-14 bg-slate-950 border border-slate-700 rounded-xl px-4 text-white focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                placeholder="https://t.me/suporte_dev"
                value={formData.supportLink}
                onChange={(e) => setFormData({...formData, supportLink: e.target.value})}
              />
            </div>
          </div>

          {/* Termos de conformidade */}
          <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 flex items-start gap-3 mt-4">
            <input 
              type="checkbox" 
              className="mt-1 w-5 h-5 accent-emerald-500 rounded border-slate-700"
              checked={formData.agreement}
              onChange={(e) => setFormData({...formData, agreement: e.target.checked})}
            />
            <span className="text-slate-400 text-xs leading-relaxed">
              Confirmo que este aplicativo está em conformidade com as diretrizes de closed testing. Autorizo o monitoramento de telemetria pela SDK TestPool para fins de auditoria de presença.
            </span>
          </div>

          {/* Action Button */}
          <button 
            type="submit"
            className="w-full h-16 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-slate-950 font-black text-lg uppercase tracking-widest rounded-xl flex items-center justify-center gap-3 transition-all hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] mt-8"
          >
            Ativar Campanha <ChevronRight size={22} />
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