import React, { useState } from 'react';
import { LayoutDashboard, FilePlus, Calendar, ListTodo, BarChart3, Settings, Users, Menu, X } from 'lucide-react';
import { MOCK_DESIGNERS, MOCK_REQUESTS, MOCK_SHIFTS } from './constants';
import { DesignRequest, JobStatus, Designer, Feedback } from './types';
import IntakeForm from './components/IntakeForm';
import QueueManager from './components/QueueManager';
import TimelineView from './components/TimelineView';
import Reports from './components/Reports';
import AdminCenter from './components/AdminCenter';
import TaskDetails from './components/TaskDetails';

// Simple Router Type
type View = 'dashboard' | 'intake' | 'queue' | 'timeline' | 'reports' | 'admin' | 'details';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [designers, setDesigners] = useState<Designer[]>(MOCK_DESIGNERS);
  const [requests, setRequests] = useState<DesignRequest[]>(MOCK_REQUESTS);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);

  const handleNewRequest = (req: DesignRequest) => {
    // Initialize feedback array
    const reqWithFeedback = { ...req, feedback: [] };
    setRequests(prev => [reqWithFeedback, ...prev]);
    setCurrentView('queue'); // Redirect to queue after submission
  };

  const handleAssign = (requestId: string, designerId: string) => {
    setRequests(prev => prev.map(r => 
      r.id === requestId ? { ...r, status: JobStatus.IN_PROGRESS, assignedTo: designerId, startDate: new Date().toISOString().split('T')[0] } : r
    ));
    // Update designer load mock
    setDesigners(prev => prev.map(d => {
       if (d.id === designerId) {
          // Simple mock update
          return { ...d, assignedHours: d.assignedHours + 5 }; 
       }
       return d;
    }));
  };

  const handleViewDetails = (requestId: string) => {
    setSelectedRequestId(requestId);
    setCurrentView('details');
  };

  const handleAddFeedback = (requestId: string, feedback: Feedback) => {
    setRequests(prev => prev.map(r => 
      r.id === requestId ? { ...r, feedback: [...r.feedback, feedback] } : r
    ));
  };

  const handleStatusChange = (requestId: string, status: JobStatus) => {
    setRequests(prev => prev.map(r => 
      r.id === requestId ? { ...r, status } : r
    ));
  };

  const NavItem = ({ view, icon: Icon, label }: { view: View, icon: any, label: string }) => (
    <button
      onClick={() => { setCurrentView(view); setMobileMenuOpen(false); }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
        currentView === view && view !== 'details' // Don't highlight menu items if in details view
          ? 'bg-blue-600 text-white shadow-md' 
          : 'text-slate-500 hover:bg-white hover:text-blue-600 hover:shadow-sm'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </button>
  );

  const selectedRequest = requests.find(r => r.id === selectedRequestId);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-100 border-r border-slate-200 transform transition-transform duration-200 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
             <LayoutDashboard className="text-white w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">DesignFlow</h1>
        </div>
        
        <nav className="px-4 space-y-1 mt-4">
          <NavItem view="dashboard" icon={LayoutDashboard} label="Dashboard" />
          <NavItem view="intake" icon={FilePlus} label="New Request" />
          <NavItem view="queue" icon={ListTodo} label="Queue & Assign" />
          <NavItem view="timeline" icon={Calendar} label="Timeline" />
          <NavItem view="reports" icon={BarChart3} label="Reports" />
          <div className="pt-8 pb-2 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Admin
          </div>
          <NavItem view="admin" icon={Settings} label="Admin Center" />
        </nav>

        {/* User Profile Mini */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 bg-slate-100">
           <div className="flex items-center gap-3">
              <img src="https://picsum.photos/32/32?random=99" className="w-9 h-9 rounded-full border border-slate-300" alt="Admin" />
              <div>
                 <div className="text-sm font-semibold text-slate-700">Admin User</div>
                 <div className="text-xs text-slate-500">Manager</div>
              </div>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto h-screen relative">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200 sticky top-0 z-40">
           <div className="font-bold text-slate-800">DesignFlow</div>
           <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-600">
             {mobileMenuOpen ? <X /> : <Menu />}
           </button>
        </div>

        <div className="p-6 max-w-7xl mx-auto space-y-6 pb-20">
          
          {currentView === 'dashboard' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                   <div className="text-slate-500 text-sm font-medium mb-1">Total Requests</div>
                   <div className="text-3xl font-bold text-slate-800">{requests.length}</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                   <div className="text-slate-500 text-sm font-medium mb-1">Pending</div>
                   <div className="text-3xl font-bold text-orange-600">{requests.filter(r => r.status === JobStatus.PENDING).length}</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                   <div className="text-slate-500 text-sm font-medium mb-1">In Progress</div>
                   <div className="text-3xl font-bold text-blue-600">{requests.filter(r => r.status === JobStatus.IN_PROGRESS).length}</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                   <div className="text-slate-500 text-sm font-medium mb-1">Designers Active</div>
                   <div className="text-3xl font-bold text-emerald-600">{designers.length}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Activity</h3>
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 divide-y divide-slate-100">
                       {requests.slice(0, 5).map(r => (
                         <div key={r.id} className="p-4 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors" onClick={() => handleViewDetails(r.id)}>
                            <div>
                               <div className="font-medium text-slate-800">{r.title}</div>
                               <div className="text-xs text-slate-500">Updated {r.dueDate}</div>
                            </div>
                            <span className={`px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-600`}>{r.status}</span>
                         </div>
                       ))}
                    </div>
                 </div>
                 <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-4">Team Availability</h3>
                    <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 space-y-4">
                       {designers.map(d => (
                         <div key={d.id} className="flex items-center gap-4">
                            <img src={d.avatar} className="w-8 h-8 rounded-full" />
                            <div className="flex-1">
                               <div className="flex justify-between text-sm mb-1">
                                 <span className="font-medium text-slate-700">{d.name}</span>
                                 <span className="text-slate-500">{d.assignedHours} / {d.capacityHours} hrs</span>
                               </div>
                               <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full rounded-full ${d.assignedHours > 35 ? 'bg-red-500' : 'bg-blue-500'}`} 
                                    style={{ width: `${Math.min((d.assignedHours / d.capacityHours) * 100, 100)}%` }}
                                  ></div>
                               </div>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
            </div>
          )}

          {currentView === 'intake' && <IntakeForm onSubmit={handleNewRequest} onCancel={() => setCurrentView('dashboard')} />}
          
          {currentView === 'queue' && <QueueManager requests={requests} designers={designers} onAssign={handleAssign} onViewDetails={handleViewDetails} />}
          
          {currentView === 'timeline' && <TimelineView designers={designers} requests={requests} onViewDetails={handleViewDetails} />}
          
          {currentView === 'reports' && <Reports requests={requests} designers={designers} />}
          
          {currentView === 'admin' && <AdminCenter designers={designers} />}

          {currentView === 'details' && selectedRequest && (
            <TaskDetails 
              request={selectedRequest} 
              onBack={() => setCurrentView('dashboard')} 
              onAddFeedback={handleAddFeedback}
              onStatusChange={handleStatusChange}
            />
          )}

        </div>
      </main>
    </div>
  );
};

export default App;