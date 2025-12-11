import React from 'react';
import { Designer } from '../types';
import { UserPlus, Trash2, Edit } from 'lucide-react';

interface AdminCenterProps {
  designers: Designer[];
}

const AdminCenter: React.FC<AdminCenterProps> = ({ designers }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Admin Center</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
          <UserPlus className="w-4 h-4" /> Add Designer
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 text-xs font-semibold text-slate-500 uppercase">Designer</th>
              <th className="p-4 text-xs font-semibold text-slate-500 uppercase">Role</th>
              <th className="p-4 text-xs font-semibold text-slate-500 uppercase">Capacity (Weekly)</th>
              <th className="p-4 text-xs font-semibold text-slate-500 uppercase">Skills</th>
              <th className="p-4 text-xs font-semibold text-slate-500 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {designers.map(d => (
              <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 flex items-center gap-3">
                  <img src={d.avatar} alt={d.name} className="w-8 h-8 rounded-full bg-slate-200" />
                  <span className="font-medium text-slate-800">{d.name}</span>
                </td>
                <td className="p-4 text-slate-600">{d.role}</td>
                <td className="p-4 text-slate-600">{d.capacityHours} Hours</td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {d.skills.map(s => (
                      <span key={s} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs rounded border border-blue-100">{s}</span>
                    ))}
                  </div>
                </td>
                <td className="p-4 text-right">
                  <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors"><Edit className="w-4 h-4" /></button>
                  <button className="p-2 text-slate-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

       <div className="bg-slate-100 p-6 rounded-lg text-center text-slate-500">
          <p>Shift Management and User Role configuration would go here in a production build.</p>
       </div>
    </div>
  );
};

export default AdminCenter;