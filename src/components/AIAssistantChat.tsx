import React, { useState } from 'react';
import { Bot, Send, Loader2, ShieldCheck } from 'lucide-react';
import { consultAI } from '../services/aiAssistant';

export const AIAssistantChat: React.FC<{ appId: string, isPremium: boolean }> = ({ appId, isPremium }) => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleQuery = async () => {
    setLoading(true);
    const res = await consultAI("user_uid_placeholder", appId, input, isPremium);
    setResponse(res.data || res.message);
    setLoading(false);
  };

  return (
    <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-xl shadow-2xl shadow-emerald-500/10">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-emerald-500/20 rounded-lg">
          <Bot className="text-emerald-400 w-6 h-6" />
        </div>
        <div>
          <h2 className="text-white font-bold text-lg">Agente de IA Prudência</h2>
          <p className="text-slate-400 text-xs">Consultor de conformidade regulatória</p>
        </div>
        {isPremium && <ShieldCheck className="ml-auto text-yellow-500 w-6 h-6" />}
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 outline-none transition-all h-32 resize-none"
        placeholder="Descreva sua dúvida sobre o Google Play Console ou conformidade..."
      />

      <button
        onClick={handleQuery}
        disabled={loading || !input}
        className="mt-4 w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? <Loader2 className="animate-spin" /> : <Send size={18} />}
        {loading ? "Processando..." : "Consultar Consultor"}
      </button>

      {response && (
        <div className="mt-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700 text-slate-300 font-mono text-sm leading-relaxed whitespace-pre-wrap">
          {response}
        </div>
      )}
    </div>
  );
};