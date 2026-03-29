import React from 'react';
import { FileText } from 'lucide-react';
import JobItem from './JobItem';

export default function JobFeed({ jobs, onEdit, onDelete, onDownload, isDarkMode }) {
  if (jobs.length === 0) {
    return (
      <div className={`rounded-[2rem] border shadow-sm overflow-hidden min-h-[400px] transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className="py-32 flex flex-col items-center text-center px-6">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-8 ${isDarkMode ? 'bg-slate-800/40' : 'bg-slate-50'}`}>
            <FileText className={`w-10 h-10 ${isDarkMode ? 'text-slate-700' : 'text-slate-200'}`} />
          </div>
          <h3 className={`text-2xl font-black mb-3 tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Fără Rezultate</h3>
          <p className={`max-w-sm mx-auto font-medium leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Nu am găsit nicio aplicație în această categorie. Încearcă să schimbi filtrul sau adaugă una nouă pentru a o vedea în listă.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-[2rem] border shadow-sm p-4 min-h-[300px] transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
      <div className="space-y-6">
        {jobs.map(job => (
          <JobItem 
            key={job.id} 
            job={job} 
            onEdit={onEdit} 
            onDelete={onDelete}
            onDownload={onDownload}
            isDark={isDarkMode}
          />
        ))}
      </div>
    </div>
  );
}
