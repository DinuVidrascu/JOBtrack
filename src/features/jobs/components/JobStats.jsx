import React from 'react';
import { BarChart3, Briefcase, CheckCircle2, XCircle } from 'lucide-react';
import StatCard from '../../../components/ui/StatCard';

export default function JobStats({ stats, isDarkMode }) {
  return (
    <div className={`rounded-[2rem] p-1 sm:p-0 border sm:border-0 transition-all ${isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white/50 border-slate-200'}`}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-6">
        <StatCard title="Total" count={stats.total} icon={BarChart3} color={isDarkMode ? "bg-blue-500/20 text-blue-400" : "bg-blue-50 text-blue-600"} isCompact isDark={isDarkMode} />
        <StatCard title="Interviuri" count={stats.interviews} icon={Briefcase} color={isDarkMode ? "bg-purple-500/20 text-purple-400" : "bg-purple-50 text-purple-600"} isCompact isDark={isDarkMode} />
        <StatCard title="Acceptate" count={stats.accepted} icon={CheckCircle2} color={isDarkMode ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-50 text-emerald-600"} isCompact isDark={isDarkMode} />
        <StatCard title="Refuzate" count={stats.rejected} icon={XCircle} color={isDarkMode ? "bg-rose-500/20 text-rose-400" : "bg-rose-50 text-rose-600"} isCompact isDark={isDarkMode} />
      </div>
    </div>
  );
}
