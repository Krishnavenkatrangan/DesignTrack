export enum JobStatus {
  PENDING = 'Pending',
  IN_PROGRESS = 'In Progress',
  REVIEW = 'Review',
  COMPLETED = 'Completed',
  BLOCKED = 'Blocked'
}

export enum JobPriority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  URGENT = 'Urgent'
}

export interface Feedback {
  id: string;
  author: string;
  role: 'Client' | 'Designer' | 'Manager';
  content: string;
  date: string;
  type: 'General' | 'Approval' | 'Change Request';
}

export interface Designer {
  id: string;
  name: string;
  role: string;
  avatar: string;
  skills: string[];
  capacityHours: number;
  assignedHours: number;
}

export interface DesignRequest {
  id: string;
  title: string;
  client: string;
  requestor: string;
  description: string;
  type: string; // e.g., "Social Media", "Web Design", "Print"
  businessFunction: string; // e.g., "Marketing", "Sales", "HR"
  status: JobStatus;
  priority: JobPriority;
  assignedTo?: string; // Designer ID
  dueDate: string;
  estimatedHours: number;
  startDate?: string;
  feedback: Feedback[];
}

export interface Shift {
  id: string;
  designerId: string;
  date: string; // YYYY-MM-DD
  type: 'Morning' | 'Evening' | 'Full' | 'Off';
}

export interface MockDataState {
  designers: Designer[];
  requests: DesignRequest[];
  shifts: Shift[];
}