import React, { useState } from 'react';
import { DesignRequest, Designer, JobPriority, JobStatus } from '../types';
import { Clock, AlertCircle, CheckCircle, BrainCircuit, User, ArrowRight } from 'lucide-react';
import { getSmartAssignments } from '../services/geminiService';

interface QueueManagerProps {
  requests: DesignRequest[];
  designers: Designer[];
  onAssign: (requestId: string, designerId: string) => void;
  onViewDetails: (requestId: string) => void;
}

const QueueManager: React.FC<QueueManagerProps> = ({ requests, designers, onAssign, onViewDetails }) => {
  const pendingRequests = requests.filter(r => r.status === JobStatus.PENDING);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const handleSmartAssign = async () => {
    setIsAiLoading(true);
    const result = await getSmartAssignments(designers, pendingRequests);
    if (result) {
      setSuggestions(result);
    }
    setIsAiLoading(false);
  };

  const applySuggestion = (requestId: string, designerId: string) => {
    onAssign(requestId, designerId);
    setSuggestions(prev => prev.filter(s => s.requestId !== requestId));
  };

  const getPriorityColor = (p: JobPriority) => {
    switch (p) {
      case JobPriority.URGENT: return 'text-red-600 bg-red-50 border-red-200';
      case JobPriority.HIGH: return 'text-orange-600 bg-orange-50 border-orange-200';
      case JobPriority.MEDIUM: return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-slate-200">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Queue Management</h2>
          <p className="text-sm text-slate-500">{pendingRequests.length} unassigned tasks</p>
        </div>
        <button 
          onClick={handleSmartAssign}
          disabled={isAiLoading || pendingRequests.length === 0}
          className={`px-4 py-2 rounded-md flex items-center gap-2 text-white shadow-sm transition-all ${
            isAiLoading || pendingRequests.length === 0 ? 'bg-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
          }`}
        >
          <BrainCircuit className="w-4 h-4" />
          {isAiLoading ? 'Analyzing...' : 'Smart Assign (AI)'}
        </button>
      </div>

      {suggestions.length > 0 && (
        <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-lg animate-fade-in">
          <h3 className="text-indigo-900 font-semibold mb-3 flex items-center gap-2">
            <BrainCircuit className="w-5 h-5" /> AI Suggestions
          </h3>
          <div className="space-y-3">
            {suggestions.map((s, idx) => {
              const req = pendingRequests.find(r => r.id === s.requestId);
              const des = designers.find(d => d.id === s.designerId);
              if (!req || !des) return null;
              return (
                <div key={idx} className="bg-white p-3 rounded shadow-sm flex items-center justify-between">
                  <div>
                    <div className="font-medium text-slate-800">Assign "{req.title}" to <span className="text-indigo-700 font-bold">{des.name}</span></div>
                    <div className="text-xs text-slate-500 mt-1">{s.rationale}</div>
                  </div>
                  <button 
                    onClick={() => applySuggestion(s.requestId, s.designerId)}
                    className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 text-sm font-medium"
                  >
                    Accept
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {pendingRequests.map(req => (
          <div key={req.id} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1 cursor-pointer" onClick={() => onViewDetails(req.id)}>
                <div className="flex items-center gap-3 mb-1">
                  <span className={`px-2 py-0.5 text-xs font-semibold rounded border ${getPriorityColor(req.priority)}`}>
                    {req.priority}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {req.estimatedHours} hrs
                  </span>
                  <span className="text-xs text-slate-500">{req.type}</span>
                </div>
                <h3 className="font-semibold text-slate-800 hover:text-blue-600 transition-colors flex items-center gap-2">
                  {req.title} <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-sm text-slate-500 mt-1 line-clamp-1">{req.description}</p>
                <div className="mt-2 text-xs text-slate-400">Due: {req.dueDate} • Client: {req.client}</div>
              </div>
              
              <div className="flex items-center gap-2">
                <select 
                  className="p-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50"
                  onChange={(e) => {
                    if (e.target.value) onAssign(req.id, e.target.value);
                  }}
                  defaultValue=""
                >
                  <option value="" disabled>Assign to...</option>
                  {designers.map(d => (
                    <option key={d.id} value={d.id}>{d.name} ({d.assignedHours}/{d.capacityHours}h)</option>
                  ))}
                </select>
                <button 
                  onClick={() => onViewDetails(req.id)}
                  className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                  title="View Details"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {pendingRequests.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <CheckCircle className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p>No pending requests in the queue.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QueueManager;