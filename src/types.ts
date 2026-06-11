export type ProjectStatus = 'planning' | 'active' | 'completed' | 'on_hold';
export type RiskLevel = 'low' | 'medium' | 'high';
export type Gender = 'male' | 'female';
export type SupportStatus = 'registered' | 'receiving_support' | 'completed';
export type ReportType = 'annual' | 'quarterly' | 'monthly' | 'evaluation';
export type UserRole = 'admin' | 'staff' | 'viewer';

export interface Project {
  id: string;
  name: string;
  description: string;
  location: string;
  status: ProjectStatus;
  progress: number; // 0 to 100
  budget: number;
  beneficiariesCount: number;
  startDate: string;
  endDate: string;
  risk: RiskLevel;
  keyResult: string;
}

export interface Beneficiary {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  location: string;
  beneficiaryType: string;
  projectId: string; // references Project
  supportStatus: SupportStatus;
  registrationDate: string;
}

export interface ImpactLog {
  id: string;
  projectId: string; // references Project
  target: string;
  preProjectResult: string;
  postProjectResult: string;
  percentageChange: number;
  impactScore: number; // 1 to 10
  notes: string;
}

export interface Report {
  id: string;
  title: string;
  reportType: ReportType;
  projectId: string; // references Project
  executiveSummary: string;
  results: string;
  impactDescription: string;
  recommendations: string;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
