import { Clock, Briefcase, CheckCircle2, XCircle } from 'lucide-react';

export const STATUSES = {
  APPLIED: { 
    id: 'applied', 
    label: 'CV Trimis', 
    icon: Clock, 
    color: 'bg-blue-50 text-blue-700 border-blue-200/50',
    dotColor: 'bg-blue-500'
  },
  INTERVIEW: { 
    id: 'interview', 
    label: 'Interviu', 
    icon: Briefcase, 
    color: 'bg-purple-50 text-purple-700 border-purple-200/50',
    dotColor: 'bg-purple-500'
  },
  ACCEPTED: { 
    id: 'accepted', 
    label: 'Acceptat', 
    icon: CheckCircle2, 
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200/50',
    dotColor: 'bg-emerald-500'
  },
  REJECTED: { 
    id: 'rejected', 
    label: 'Refuzat', 
    icon: XCircle, 
    color: 'bg-rose-50 text-rose-700 border-rose-200/50',
    dotColor: 'bg-rose-500'
  },
};
