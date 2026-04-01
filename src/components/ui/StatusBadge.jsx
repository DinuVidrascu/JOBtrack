import React from 'react';
import { STATUSES } from '../../features/jobs/constants';

const StatusBadge = React.memo(({ status }) => {
  const config = STATUSES[status.toUpperCase()] || STATUSES.APPLIED;
  
  return (
    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors flex items-center gap-1.5 whitespace-nowrap ${config.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ring-2 ring-current ring-opacity-20 ${config.dotColor || 'bg-current'}`}></span>
      {config.label}
    </span>
  );
});

export default StatusBadge;
