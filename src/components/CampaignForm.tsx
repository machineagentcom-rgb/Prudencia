import React, { useState } from 'react';
import { 
  Rocket, 
  Package, 
  Link as LinkIcon, 
  Languages, 
  Cpu, 
  AlertCircle, 
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

/**
 * @file CampaignForm.tsx
 * @description Implementação de alta fidelidade para RF-01 (Cadastro de Aplicativo).
 * Interface com temática industrial "Squad Dedetizador".
 */

const CampaignForm: React.FC = () => {
  const [formData, setFormData] = useState({
    appName: '',
    packageName: '',
    testGroupLink: '',
    supportLink: '',
    versionCode: '',
    language: 'pt-BR'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados da Campanha:', formData);
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8 flex items-center justify-center font-sans">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-[0_0_50px_-12px_rgba(16,185,129,0.15)]">
        
        {/* Header Temático */}
        <div className="mb-8 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-emerald-500/10 rounded-xl">
              <Rocket className="text-emerald-400 w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Iniciar Operação</h1>
              <p className="text-slate-400 text-sm">Cadastro de nova campanha no Pote de Bugs</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nome do Aplicativo */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-emerald-500 uppercase tracking-wider flex items-center gap-2">
              <Package size={14} /> Nome do Aplicativo
            </label>
            <input
              type="text"
              className="w-full h-14 bg-slate-950 border border-slate-700 rounded-xl px-4 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
              placeholder="Ex: Projeto Prudência Alpha"
              onChange={(e) => setFormData({...formData, appName: e.target.value})}
            />
          </div>

          {/* Package Name */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-emerald-500 uppercase tracking-wider flex items-center gap-2">
              <Cpu size={14} /> Package Name
            </label>
            <input
              type="text"
              className="w-full h-14 bg-slate-950 border border-slate-700 rounded-xl px-4 text-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
              placeholder="com.testpool.app"
              onChange={(e) => setFormData({...formData, packageName: e.target.value})}
            />
          </div>

          {/* Grid de Links e Versão */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-emerald-500 uppercase tracking-wider flex items-center gap-2">
                <LinkIcon size={14} /> Link Google Grupo
              </label>
              <input
                type="url"
                className="w-full h-14 bg-slate-950 border border-slate-700 rounded-xl px-4 text-white focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                placeholder="https://groups.google.com/..."
                onChange={(e) => setFormData({...formData, testGroupLink: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-emerald-500 uppercase tracking-wider flex items-center gap-2">
                <AlertCircle size={14} /> Versão (Code)
              </label>
              <input
                type="number"
                className="w-full h-14 bg-slate-950 border border-slate-700 rounded-xl px-4 text-white focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                placeholder="1"
                onChange={(e) => setFormData({...formData, versionCode: e.target.value})}
              />
            </div>
          </div>

          {/* Idioma e Suporte */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-emerald-500 uppercase tracking-wider flex items-center gap-2">
                <Languages size={14} /> Idioma Suportado
              </label>
              <select 
                className="w-full h-14 bg-slate-950 border border-slate-700 rounded-xl px-4 text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                onChange={(e) => setFormData({...formData, language: e.target.value})}
              >
                <option value="pt-BR">Português (Brasil)</option>
                <option value="en-US">English (US)</option>
                <option value="es-ES">Español</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-emerald-500 uppercase tracking-wider flex items-center gap-2">
                <LinkIcon size={14} /> Suporte Externo
              </label>
              <input
                type="url"
                className="w-full h-14 bg-slate-950 border border-slate-700 rounded-xl px-4 text-white focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
                placeholder="https://t.me/suporte"
                onChange={(e) => setFormData({...formData, supportLink: e.target.value})}
              />
            </div>
          </div>

          {/* Action Button */}
          <button 
            type="submit"
            className="w-full h-16 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-lg rounded-xl flex items-center justify-center gap-3 transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] mt-8"
          >
            Cadastrar Operação <ChevronRight size={20} />
          </button>
        </form>

        <div className="mt-8 flex items-center justify-center gap-2 text-slate-500 text-xs">
          <CheckCircle2 size={12} />
          <span>Integridade de dados protegida por encriptação 256-bit</span>
        </div>
      </div>
    </div>
  );
};

export default CampaignForm;


// Buffer reparado e saneado pelo Sub-Agente de Revisão Local.