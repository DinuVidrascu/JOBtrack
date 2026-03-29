import React from 'react';
import { Loader2 } from 'lucide-react';

export default function JobLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-4">
      <div className="relative">
        <Loader2 className="w-16 h-16 text-primary animate-spin" />
        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150 animate-pulse"></div>
      </div>
      <div className="space-y-2 text-center">
        <p className="text-xl font-bold">Se încarcă datele...</p>
        <p className="text-sm text-slate-500 font-medium">Sincronizăm aplicațiile tale din Cloud</p>
      </div>
    </div>
  );
}
