import React from 'react';
import { Filter, Search, X } from 'lucide-react';
import { STATUSES } from '../constants';

export default function JobFilters({ filter, setFilter, search, setSearch, isDarkMode }) {
  return (
    <div className={`p-2 rounded-[2rem] border shadow-sm flex flex-col md:flex-row items-stretch md:items-center gap-2 transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
      {/* Search Input */}
      <div className="relative flex-1 group">
        <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${isDarkMode ? 'text-slate-600 group-focus-within:text-indigo-400' : 'text-slate-400 group-focus-within:text-slate-900'}`} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Caută companie sau rol..."
          className={`w-full pl-11 pr-10 py-2.5 rounded-full text-sm outline-none transition-all ${isDarkMode ? 'bg-slate-800/40 border border-slate-800/50 text-white focus:bg-slate-800/60 focus:border-indigo-500/50' : 'bg-slate-50 border border-slate-100 text-slate-900 focus:bg-white focus:border-slate-300'}`}
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-3.5 h-3.5 text-slate-400" />
          </button>
        )}
      </div>

      <div className="h-8 w-px bg-slate-100 dark:bg-slate-800 hidden md:block mx-1"></div>

      {/* Filter Buttons - Horizontal scroll on mobile, flex-wrap on desktop */}
      <div className="flex overflow-x-auto md:flex-wrap items-center gap-2 p-1 px-1.5 scrollbar-hide w-full md:w-auto">
        <FilterButton active={filter === 'all'} onClick={() => setFilter('all')} isDarkMode={isDarkMode}>Toate</FilterButton>
        {Object.values(STATUSES).map(s => (
          <FilterButton 
            key={s.id} 
            active={filter === s.id} 
            onClick={() => setFilter(s.id)}
            isDarkMode={isDarkMode}
          >
            {s.label}
          </FilterButton>
        ))}
        {/* Extra spacer for end of scroll on mobile */}
        <div className="w-1 md:hidden shrink-0"></div>
      </div>
    </div>
  );
}

function FilterButton({ active, children, onClick, isDarkMode }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex-none ${active
          ? (isDarkMode ? 'bg-indigo-600 shadow-indigo-900/40 shadow-lg scale-105 text-white' : 'bg-slate-900 text-white shadow-lg scale-105')
          : (isDarkMode ? 'text-slate-400 hover:bg-slate-800 hover:text-white' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900')
        }`}
    >
      {children}
    </button>
  );
}
