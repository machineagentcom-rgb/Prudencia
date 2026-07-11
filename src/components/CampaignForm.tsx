import React, { useState } from 'react';
import { Rocket, Package, Link as LinkIcon, Languages, Cpu, ChevronRight, ShieldCheck, Info, Globe, Database, Terminal, Layers, CheckCircle2 } from 'lucide-react';

interface FormData {
  appName: string;
  packageName: string;
  testGroupLink: string;
  supportLink: string;
  versionCode: string;
  language: string;
  agreement: boolean;
  notes: string;
}

const CampaignForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    appName: '', packageName: '', testGroupLink: '', supportLink: '', versionCode: '', language: 'pt-BR', agreement: false, notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreement) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setStatus('success'); }, 2200);
  };

  if (status === 'success') return <div className="min-h-screen bg-slate-950 p-6 flex flex-col items-center justify-center"><div className="max-w-md w-full bg-slate-900 border border-emerald-500/30 rounded-3xl p-8 text-center space-y-6"><div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20"><CheckCircle2 className="text-emerald-400 w-12 h-12" /></div><h2 className="text-2xl font-black text-white">PROTOCOLO ATIVO</h2><button onClick={() => window.location.reload()} className="w-full h-14 bg-emerald-600 text-slate-950 rounded-xl font-black">RETORNAR AO DASHBOARD</button></div></div>;

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8 flex flex-col items-center font-sans">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <input type="text" className="w-full h-14 bg-slate-950 border border-slate-700 rounded-xl px-4 text-white" placeholder="Nome" value={formData.appName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, appName: e.target.value})} />
          <input type="text" className="w-full h-14 bg-slate-950 border border-slate-700 rounded-xl px-4 text-white" placeholder="Package" value={formData.packageName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, packageName: e.target.value})} />
          <input type="url" className="w-full h-14 bg-slate-950 border border-slate-700 rounded-xl px-4 text-white" placeholder="Link" value={formData.testGroupLink} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, testGroupLink: e.target.value})} />
          <input type="number" className="w-full h-14 bg-slate-950 border border-slate-700 rounded-xl px-4 text-white" placeholder="Version" value={formData.versionCode} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, versionCode: e.target.value})} />
          <select className="w-full h-14 bg-slate-950 border border-slate-700 rounded-xl px-4 text-white" value={formData.language} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({...formData, language: e.target.value})}>
            <option value="pt-BR">Português</option>
            <option value="en-US">English</option>
          </select>
          <input type="url" className="w-full h-14 bg-slate-950 border border-slate-700 rounded-xl px-4 text-white" placeholder="Suporte" value={formData.supportLink} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, supportLink: e.target.value})} />
          <textarea className="w-full h-24 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white" placeholder="Notas" value={formData.notes} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, notes: e.target.value})} />
          <input type="checkbox" className="mt-1 w-6 h-6 accent-emerald-500" checked={formData.agreement} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, agreement: e.target.checked})} />
          <button type="submit" disabled={loading || !formData.agreement} className="w-full h-16 rounded-xl bg-emerald-600 text-slate-950 font-black">{loading ? 'PROCESSANDO...' : 'ATIVAR CAMPANHA'}</button>
        </form>
      </div>
    </div>
  );
};
export default CampaignForm;