import React, { useState } from 'react';
import { ShieldCheck, Clock, RefreshCw, Activity, ShieldAlert } from 'lucide-react';

type SlotStatus = 'ok' | 'execution' | 'failed' | 'idle';

interface TesterSlot { id: number; status: SlotStatus; testerName: string; lastPing: string; }

const TelemetryGrid: React.FC = () => {
  const [slots] = useState<TesterSlot[]>(Array.from({ length: 40 }, (_, i) => ({ id: i + 1, status: i < 28 ? 'ok' : 'idle', testerName: `Agent_${1000 + i}`, lastPing: '14:22 UTC' })));
  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-slate-950 border border-slate-800 rounded-3xl">
      <div className="grid grid-cols-8 gap-4">
        {slots.map((slot) => (
          <div key={slot.id} className="h-20 rounded-2xl border border-slate-700 bg-slate-900 flex flex-col items-center justify-center">
            <div className={`w-3 h-3 rounded-full ${slot.status === 'ok' ? 'bg-emerald-500' : 'bg-slate-700'}`} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default TelemetryGrid;