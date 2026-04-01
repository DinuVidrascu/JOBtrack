import React from 'react';

const StatCard = React.memo(({ title, count, icon: Icon, color, className = "", isCompact = false, isDark = false }) => {
  return (
    <div className={`
      ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} 
      sm:border 
      ${isCompact ? 'p-3 sm:p-4' : 'p-5'} 
      rounded-[2rem] 
      transition-all duration-300 flex flex-col group ${className}
    `}>
      <div className={`
        ${isCompact ? 'w-8 h-8 sm:w-11 sm:h-11 mb-2 sm:mb-4' : 'w-12 h-12 mb-4'} 
        rounded-2xl flex items-center justify-center 
        transition-transform group-hover:scale-110 ${color}
      `}>
        <Icon className={isCompact ? 'w-4 h-4 sm:w-5 sm:h-5' : 'w-6 h-6'} />
      </div>
      <div>
        <p className={`font-medium tracking-tight mb-0.5 ${isCompact ? 'text-[10px] sm:text-xs' : 'text-sm'} ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          {title}
        </p>
        <p className={`font-bold tabular-nums ${isCompact ? 'text-lg sm:text-2xl' : 'text-3xl'} ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {count}
        </p>
      </div>
      
      {/* Indicator bar visible only on desktop or when not compact */}
      {!isCompact && (
        <div className="mt-4 h-1 w-full bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden">
          <div className={`h-full opacity-60 rounded-full ${color.split(' ')[0]}`} style={{ width: count > 0 ? '100%' : '0%' }}></div>
        </div>
      )}
    </div>
  );
});

export default StatCard;
