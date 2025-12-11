import React from 'react';
import { Designer, DesignRequest, JobStatus } from '../types';
import { format, addDays, startOfWeek, differenceInDays, parseISO, isSameDay } from 'date-fns';

interface TimelineViewProps {
  designers: Designer[];
  requests: DesignRequest[];
  onViewDetails: (requestId: string) => void;
}

const TimelineView: React.FC<TimelineViewProps> = ({ designers, requests, onViewDetails }) => {
  const today = new Date();
  const startDate = startOfWeek(today);
  const daysToShow = 14;
  const days = Array.from({ length: daysToShow }, (_, i) => addDays(startDate, i));

  const getJobStyle = (req: DesignRequest) => {
    if (!req.startDate || !req.dueDate) return {};
    const start = parseISO(req.startDate);
    const end = parseISO(req.dueDate);
    
    // Calculate position relative to timeline start
    let offsetDays = differenceInDays(start, startDate);
    let durationDays = differenceInDays(end, start) + 1;

    // Clipping if outside view
    if (offsetDays < 0) {
      durationDays += offsetDays;
      offsetDays = 0;
    }
    
    return {
      left: `${(offsetDays / daysToShow) * 100}%`,
      width: `${Math.max((durationDays / daysToShow) * 100, 2)}%`, // Min width for visibility
    };
  };

  const getStatusColor = (status: JobStatus) => {
    switch (status) {
      case JobStatus.COMPLETED: return 'bg-emerald-500';
      case JobStatus.IN_PROGRESS: return 'bg-blue-500';
      case JobStatus.REVIEW: return 'bg-amber-500';
      case JobStatus.PENDING: return 'bg-slate-400';
      default: return 'bg-slate-300';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-200">
        <h2 className="text-lg font-bold text-slate-800">Team Timeline (14 Days)</h2>
      </div>
      
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Header Row */}
          <div className="flex border-b border-slate-200">
            <div className="w-48 p-3 text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-50 shrink-0 sticky left-0 z-10 border-r border-slate-200">
              Designer
            </div>
            <div className="flex-1 flex">
              {days.map((day, i) => (
                <div key={i} className={`flex-1 p-2 text-center text-xs border-r border-slate-100 ${isSameDay(day, today) ? 'bg-blue-50 font-bold text-blue-600' : 'text-slate-600'}`}>
                  {format(day, 'EEE d')}
                </div>
              ))}
            </div>
          </div>

          {/* Designer Rows */}
          {designers.map(designer => {
            const designerTasks = requests.filter(r => r.assignedTo === designer.id && r.startDate);

            return (
              <div key={designer.id} className="flex border-b border-slate-100 group hover:bg-slate-50 transition-colors">
                <div className="w-48 p-3 shrink-0 sticky left-0 z-10 bg-white group-hover:bg-slate-50 border-r border-slate-200 flex items-center gap-3">
                  <img src={designer.avatar} alt={designer.name} className="w-8 h-8 rounded-full bg-slate-200" />
                  <div>
                    <div className="text-sm font-medium text-slate-800">{designer.name}</div>
                    <div className="text-xs text-slate-500">{designer.role}</div>
                  </div>
                </div>
                
                <div className="flex-1 relative h-14 bg-white group-hover:bg-slate-50">
                   {/* Grid Lines */}
                   <div className="absolute inset-0 flex pointer-events-none">
                      {days.map((_, i) => (
                        <div key={i} className="flex-1 border-r border-slate-100 h-full"></div>
                      ))}
                   </div>

                   {/* Tasks bars */}
                   {designerTasks.map(req => (
                     <div 
                        key={req.id}
                        onClick={() => onViewDetails(req.id)}
                        className={`absolute top-2 h-10 rounded shadow-sm text-xs text-white px-2 py-1 overflow-hidden whitespace-nowrap z-0 hover:z-20 hover:scale-105 transition-all cursor-pointer ${getStatusColor(req.status)}`}
                        style={getJobStyle(req)}
                        title={`${req.title} (${req.estimatedHours}h) - Click for details`}
                     >
                       <div className="font-semibold truncate">{req.title}</div>
                       <div className="opacity-90 text-[10px] truncate">{req.client}</div>
                     </div>
                   ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimelineView;