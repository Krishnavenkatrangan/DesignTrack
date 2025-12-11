import React, { useState } from 'react';
import { PlusCircle, Save } from 'lucide-react';
import { DesignRequest, JobPriority, JobStatus } from '../types';

interface IntakeFormProps {
  onSubmit: (request: DesignRequest) => void;
  onCancel: () => void;
}

const IntakeForm: React.FC<IntakeFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Partial<DesignRequest>>({
    title: '',
    type: 'Web Design',
    priority: JobPriority.MEDIUM,
    estimatedHours: 0,
    dueDate: '',
    description: '',
    client: '',
    requestor: '',
    businessFunction: 'Marketing'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRequest: DesignRequest = {
      ...formData as DesignRequest,
      id: `r${Date.now()}`,
      status: JobStatus.PENDING,
    };
    onSubmit(newRequest);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <PlusCircle className="w-6 h-6 text-blue-600" />
          New Design Request
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Project Name</label>
            <input required type="text" className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" 
              value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Requestor Name</label>
            <input required type="text" className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" 
              value={formData.requestor} onChange={e => setFormData({...formData, requestor: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Client / Department</label>
            <input required type="text" className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" 
              value={formData.client} onChange={e => setFormData({...formData, client: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Business Function</label>
            <select className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
               value={formData.businessFunction} onChange={e => setFormData({...formData, businessFunction: e.target.value})}>
              <option>Marketing</option>
              <option>Sales</option>
              <option>Product</option>
              <option>HR</option>
              <option>Corporate</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Project Type</label>
            <select className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
               value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
              <option>Web Design</option>
              <option>Social Media</option>
              <option>Print</option>
              <option>Video</option>
              <option>Presentation</option>
              <option>Email</option>
            </select>
          </div>
           <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
            <select className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
               value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value as JobPriority})}>
              {Object.values(JobPriority).map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Due Date</label>
            <input required type="date" className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" 
              value={formData.dueDate} onChange={e => setFormData({...formData, dueDate: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Estimated Hours</label>
            <input required type="number" min="0" className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" 
              value={formData.estimatedHours} onChange={e => setFormData({...formData, estimatedHours: Number(e.target.value)})} />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Description & Requirements</label>
          <textarea rows={4} className="w-full p-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none" 
            value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <button type="button" onClick={onCancel} className="px-4 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors">
            Cancel
          </button>
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow-sm flex items-center gap-2 transition-colors">
            <Save className="w-4 h-4" />
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default IntakeForm;