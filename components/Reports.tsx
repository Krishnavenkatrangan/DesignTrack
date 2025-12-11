import React, { useState } from 'react';
import { DesignRequest, Designer } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { generateReportInsights } from '../services/geminiService';
import { Sparkles } from 'lucide-react';

interface ReportsProps {
  requests: DesignRequest[];
  designers: Designer[];
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

const Reports: React.FC<ReportsProps> = ({ requests }) => {
  const [insight, setInsight] = useState<string>('');
  const [loading, setLoading] = useState(false);

  // 1. Work Volume by Type
  const volumeByType = requests.reduce((acc: any, req) => {
    acc[req.type] = (acc[req.type] || 0) + 1;
    return acc;
  }, {});
  const typeData = Object.keys(volumeByType).map(key => ({ name: key, value: volumeByType[key] }));

  // 2. Work Volume by Function
  const volumeByFunction = requests.reduce((acc: any, req) => {
    acc[req.businessFunction] = (acc[req.businessFunction] || 0) + 1;
    return acc;
  }, {});
  const functionData = Object.keys(volumeByFunction).map(key => ({ name: key, value: volumeByFunction[key] }));

  // 3. Weekly Hours (Simulated for this demo based on estHours)
  const hoursData = [
    { name: 'Week 1', hours: 120, overtime: 10 },
    { name: 'Week 2', hours: 145, overtime: 25 },
    { name: 'Week 3', hours: 110, overtime: 5 },
    { name: 'Week 4', hours: 160, overtime: 40 },
  ];

  const handleGenerateInsights = async () => {
    setLoading(true);
    const stats = { typeData, functionData, hoursData, totalRequests: requests.length };
    const result = await generateReportInsights('Monthly', stats);
    setInsight(result);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <h2 className="text-2xl font-bold text-slate-800">Analytics & Reporting</h2>
         <button 
           onClick={handleGenerateInsights}
           disabled={loading}
           className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg shadow hover:opacity-90 transition-all flex items-center gap-2"
         >
           <Sparkles className="w-4 h-4" />
           {loading ? 'Generating...' : 'AI Executive Summary'}
         </button>
      </div>

      {insight && (
        <div className="bg-purple-50 border border-purple-100 p-6 rounded-lg animate-fade-in shadow-sm">
          <h3 className="text-purple-900 font-bold mb-2 flex items-center gap-2">
            <Sparkles className="w-5 h-5" /> Executive Summary
          </h3>
          <div className="prose prose-purple text-slate-700 whitespace-pre-line">
            {insight}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Work Volume by Type */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Work Volume by Type</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={typeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {typeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Work Volume by Business Function */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Requests by Department</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={functionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#f1f5f9'}} />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Utilization & Overtime */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 md:col-span-2">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Weekly Hours & Overtime</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hoursData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip cursor={{fill: '#f1f5f9'}} />
                <Legend />
                <Bar dataKey="hours" name="Regular Hours" stackId="a" fill="#3b82f6" radius={[0, 0, 4, 4]} />
                <Bar dataKey="overtime" name="Overtime" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;