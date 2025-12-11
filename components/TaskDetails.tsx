import React, { useState } from 'react';
import { DesignRequest, Feedback, JobStatus, JobPriority } from '../types';
import { ArrowLeft, Send, CheckCircle, XCircle, User, MessageSquare, Clock, Calendar, Briefcase } from 'lucide-react';
import { format } from 'date-fns';

interface TaskDetailsProps {
  request: DesignRequest;
  onBack: () => void;
  onAddFeedback: (requestId: string, feedback: Feedback) => void;
  onStatusChange: (requestId: string, status: JobStatus) => void;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ request, onBack, onAddFeedback, onStatusChange }) => {
  const [comment, setComment] = useState('');

  const handleSubmitFeedback = (type: 'General' | 'Approval' | 'Change Request') => {
    if (!comment && type !== 'Approval') return; // Comment required for changes or general feedback

    const newFeedback: Feedback = {
      id: `f${Date.now()}`,
      author: 'Current User (Client)', // Simulating client interaction
      role: 'Client',
      content: comment || (type === 'Approval' ? 'Design Approved.' : 'Changes requested.'),
      date: format(new Date(), 'yyyy-MM-dd HH:mm'),
      type
    };

    onAddFeedback(request.id, newFeedback);
    setComment('');

    if (type === 'Approval') {
      onStatusChange(request.id, JobStatus.COMPLETED);
    } else if (type === 'Change Request') {
      onStatusChange(request.id, JobStatus.IN_PROGRESS);
    }
  };

  const getStatusColor = (status: JobStatus) => {
    switch (status) {
      case JobStatus.COMPLETED: return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case JobStatus.IN_PROGRESS: return 'bg-blue-100 text-blue-700 border-blue-200';
      case JobStatus.REVIEW: return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
        {/* Left Column: Task Info */}
        <div className="lg:col-span-2 space-y-6 overflow-y-auto pr-2">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                 <h1 className="text-2xl font-bold text-slate-800 mb-2">{request.title}</h1>
                 <div className="flex gap-2">
                   <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(request.status)}`}>
                     {request.status}
                   </span>
                   <span className="px-3 py-1 rounded-full text-sm font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                     {request.priority} Priority
                   </span>
                 </div>
              </div>
              <div className="text-right text-slate-500 text-sm">
                 <div className="mb-1">ID: #{request.id}</div>
              </div>
            </div>

            <div className="prose text-slate-600 mb-8">
               <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-2">Description</h3>
               <p>{request.description}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-100">
               <div>
                 <div className="text-xs text-slate-500 mb-1 flex items-center gap-1"><User className="w-3 h-3"/> Requestor</div>
                 <div className="font-medium text-slate-800">{request.requestor}</div>
               </div>
               <div>
                 <div className="text-xs text-slate-500 mb-1 flex items-center gap-1"><Briefcase className="w-3 h-3"/> Client</div>
                 <div className="font-medium text-slate-800">{request.client}</div>
               </div>
               <div>
                 <div className="text-xs text-slate-500 mb-1 flex items-center gap-1"><Calendar className="w-3 h-3"/> Due Date</div>
                 <div className="font-medium text-slate-800">{request.dueDate}</div>
               </div>
               <div>
                 <div className="text-xs text-slate-500 mb-1 flex items-center gap-1"><Clock className="w-3 h-3"/> Est. Hours</div>
                 <div className="font-medium text-slate-800">{request.estimatedHours}h</div>
               </div>
            </div>
          </div>
        </div>

        {/* Right Column: Feedback Stream */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border border-slate-200 flex flex-col h-full">
          <div className="p-4 border-b border-slate-200 bg-slate-50 rounded-t-lg">
            <h2 className="font-bold text-slate-800 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" /> Client Feedback
            </h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {request.feedback.length === 0 ? (
              <div className="text-center text-slate-400 py-8 text-sm">
                No feedback yet.
              </div>
            ) : (
              request.feedback.map((f) => (
                <div key={f.id} className={`flex flex-col ${f.role === 'Client' ? 'items-end' : 'items-start'}`}>
                   <div className={`max-w-[90%] rounded-lg p-3 shadow-sm ${
                     f.type === 'Approval' ? 'bg-emerald-50 border border-emerald-100' :
                     f.type === 'Change Request' ? 'bg-orange-50 border border-orange-100' :
                     f.role === 'Client' ? 'bg-blue-50 border border-blue-100' : 'bg-white border border-slate-200'
                   }`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-bold ${f.role === 'Client' ? 'text-blue-700' : 'text-slate-700'}`}>{f.author}</span>
                        <span className="text-[10px] text-slate-400">{f.date}</span>
                      </div>
                      
                      {f.type === 'Approval' && (
                        <div className="flex items-center gap-1 text-emerald-600 font-bold text-xs mb-1">
                          <CheckCircle className="w-3 h-3" /> APPROVED
                        </div>
                      )}
                      {f.type === 'Change Request' && (
                        <div className="flex items-center gap-1 text-orange-600 font-bold text-xs mb-1">
                          <XCircle className="w-3 h-3" /> CHANGES REQUESTED
                        </div>
                      )}

                      <p className="text-sm text-slate-700">{f.content}</p>
                   </div>
                </div>
              ))
            )}
          </div>

          <div className="p-4 border-t border-slate-200 bg-white rounded-b-lg space-y-3">
             <div className="text-xs font-semibold text-slate-500 uppercase">Review Controls</div>
             <textarea 
               className="w-full p-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
               rows={3}
               placeholder="Enter feedback or comments..."
               value={comment}
               onChange={(e) => setComment(e.target.value)}
             />
             <div className="flex gap-2 justify-end">
                <button 
                  onClick={() => handleSubmitFeedback('Change Request')}
                  className="px-3 py-1.5 bg-white border border-orange-200 text-orange-600 hover:bg-orange-50 rounded-md text-sm font-medium transition-colors flex items-center gap-1"
                >
                   Request Changes
                </button>
                <button 
                  onClick={() => handleSubmitFeedback('Approval')}
                  className="px-3 py-1.5 bg-emerald-600 text-white hover:bg-emerald-700 rounded-md text-sm font-medium transition-colors flex items-center gap-1"
                >
                   <CheckCircle className="w-3 h-3" /> Approve
                </button>
                <button 
                  onClick={() => handleSubmitFeedback('General')}
                  className="px-3 py-1.5 bg-blue-600 text-white hover:bg-blue-700 rounded-md text-sm font-medium transition-colors"
                  disabled={!comment}
                >
                   <Send className="w-3 h-3" />
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;