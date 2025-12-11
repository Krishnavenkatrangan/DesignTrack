import { Designer, DesignRequest, JobStatus, JobPriority, Shift } from './types';
import { addDays, format, subDays } from 'date-fns';

export const MOCK_DESIGNERS: Designer[] = [
  { id: 'd1', name: 'Alice Chen', role: 'Senior UI Designer', avatar: 'https://picsum.photos/32/32?random=1', skills: ['Web', 'Mobile', 'Figma'], capacityHours: 40, assignedHours: 25 },
  { id: 'd2', name: 'Bob Smith', role: 'Graphic Designer', avatar: 'https://picsum.photos/32/32?random=2', skills: ['Print', 'Branding', 'Illustrator'], capacityHours: 40, assignedHours: 38 },
  { id: 'd3', name: 'Charlie Kim', role: 'Motion Designer', avatar: 'https://picsum.photos/32/32?random=3', skills: ['Motion', 'Video', 'After Effects'], capacityHours: 35, assignedHours: 10 },
  { id: 'd4', name: 'Diana Prince', role: 'UX Researcher', avatar: 'https://picsum.photos/32/32?random=4', skills: ['Research', 'Testing', 'Wireframing'], capacityHours: 40, assignedHours: 30 },
];

const today = new Date();

export const MOCK_REQUESTS: DesignRequest[] = [
  {
    id: 'r1',
    title: 'Q4 Marketing Campaign Assets',
    client: 'Marketing Team',
    requestor: 'Sarah Connor',
    description: 'Need social media banners and email headers for Q4.',
    type: 'Social Media',
    businessFunction: 'Marketing',
    status: JobStatus.IN_PROGRESS,
    priority: JobPriority.HIGH,
    assignedTo: 'd1',
    dueDate: format(addDays(today, 5), 'yyyy-MM-dd'),
    estimatedHours: 12,
    startDate: format(subDays(today, 1), 'yyyy-MM-dd'),
    feedback: [
      { id: 'f1', author: 'Sarah Connor', role: 'Client', content: 'Can we make the blue a bit more vibrant?', date: format(subDays(today, 1), 'yyyy-MM-dd HH:mm'), type: 'Change Request' },
      { id: 'f2', author: 'Alice Chen', role: 'Designer', content: 'Sure, I updated the palette. How does this look?', date: format(today, 'yyyy-MM-dd HH:mm'), type: 'General' }
    ]
  },
  {
    id: 'r2',
    title: 'Annual Report Layout',
    client: 'Executive Board',
    requestor: 'John Doe',
    description: 'Layout and design for the 2024 annual report PDF.',
    type: 'Print',
    businessFunction: 'Corporate',
    status: JobStatus.IN_PROGRESS,
    priority: JobPriority.URGENT,
    assignedTo: 'd2',
    dueDate: format(addDays(today, 10), 'yyyy-MM-dd'),
    estimatedHours: 40,
    startDate: format(today, 'yyyy-MM-dd'),
    feedback: []
  },
  {
    id: 'r3',
    title: 'Product Demo Video',
    client: 'Product Team',
    requestor: 'Mike Ross',
    description: '30s animated explainer video for the new feature.',
    type: 'Video',
    businessFunction: 'Product',
    status: JobStatus.PENDING,
    priority: JobPriority.MEDIUM,
    dueDate: format(addDays(today, 14), 'yyyy-MM-dd'),
    estimatedHours: 20,
    feedback: []
  },
  {
    id: 'r4',
    title: 'Sales Deck Refresh',
    client: 'Sales Team',
    requestor: 'Jessica Pearson',
    description: 'Update the master sales deck with new branding.',
    type: 'Presentation',
    businessFunction: 'Sales',
    status: JobStatus.COMPLETED,
    priority: JobPriority.LOW,
    assignedTo: 'd1',
    dueDate: format(subDays(today, 2), 'yyyy-MM-dd'),
    estimatedHours: 5,
    startDate: format(subDays(today, 5), 'yyyy-MM-dd'),
    feedback: [
      { id: 'f3', author: 'Jessica Pearson', role: 'Client', content: 'Looks perfect, approved!', date: format(subDays(today, 2), 'yyyy-MM-dd HH:mm'), type: 'Approval' }
    ]
  },
  {
    id: 'r5',
    title: 'Website Hero Refresh',
    client: 'Web Team',
    requestor: 'Louis Litt',
    description: 'New hero images for homepage.',
    type: 'Web Design',
    businessFunction: 'Marketing',
    status: JobStatus.PENDING,
    priority: JobPriority.HIGH,
    dueDate: format(addDays(today, 3), 'yyyy-MM-dd'),
    estimatedHours: 8,
    feedback: []
  },
  {
    id: 'r6',
    title: 'Internal Newsletter Template',
    client: 'HR',
    requestor: 'Donna Paulsen',
    description: 'HTML template for monthly HR updates.',
    type: 'Email',
    businessFunction: 'HR',
    status: JobStatus.PENDING,
    priority: JobPriority.LOW,
    dueDate: format(addDays(today, 7), 'yyyy-MM-dd'),
    estimatedHours: 4,
    feedback: []
  }
];

export const MOCK_SHIFTS: Shift[] = [];
// Generate some shift data
for (let i = 0; i < 7; i++) {
  const dateStr = format(addDays(today, i), 'yyyy-MM-dd');
  MOCK_DESIGNERS.forEach(d => {
    MOCK_SHIFTS.push({
      id: `${d.id}-${dateStr}`,
      designerId: d.id,
      date: dateStr,
      type: (i > 4) ? 'Off' : 'Morning' // Weekends off logic roughly
    });
  });
}