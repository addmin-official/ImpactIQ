import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, Beneficiary, ImpactLog, Report, UserProfile, UserRole, ChatMessage } from '../types';
import {
  INITIAL_PROJECTS,
  INITIAL_BENEFICIARIES,
  INITIAL_IMPACT_LOGS,
  INITIAL_REPORTS,
  INITIAL_USERS
} from '../mockData';

interface AppContextType {
  projects: Project[];
  beneficiaries: Beneficiary[];
  impactLogs: ImpactLog[];
  reports: Report[];
  currentUser: UserProfile;
  availableUsers: UserProfile[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  switchUser: (userId: string) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  
  // CRUD Projects
  addProject: (project: Omit<Project, 'id'>) => boolean;
  updateProject: (project: Project) => boolean;
  deleteProject: (id: string) => boolean;

  // CRUD Beneficiaries
  addBeneficiary: (beneficiary: Omit<Beneficiary, 'id'>) => boolean;
  updateBeneficiary: (beneficiary: Beneficiary) => boolean;
  deleteBeneficiary: (id: string) => boolean;

  // CRUD Impact logs
  addImpactLog: (log: Omit<ImpactLog, 'id'>) => boolean;
  updateImpactLog: (log: ImpactLog) => boolean;
  deleteImpactLog: (id: string) => boolean;

  // CRUD Reports
  addReport: (report: Omit<Report, 'id'>) => boolean;
  updateReport: (report: Report) => boolean;
  deleteReport: (id: string) => boolean;

  // Permissions utilities
  canWrite: () => boolean;
  canDelete: () => boolean;
  isAdmin: () => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [impactLogs, setImpactLogs] = useState<ImpactLog[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [currentUser, setCurrentUser] = useState<UserProfile>(INITIAL_USERS[0]); // default to Admin
  const [activeTab, setActiveTab2] = useState<string>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Trigger scroll to top on tab change for clean feel
  const setActiveTab = (tab: string) => {
    setActiveTab2(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsSidebarOpen(false);
  };

  // Load from local storage or set initial mock data
  useEffect(() => {
    const savedProjects = localStorage.getItem('mne_projects');
    const savedBeneficiaries = localStorage.getItem('mne_beneficiaries');
    const savedImpactLogs = localStorage.getItem('mne_impact_logs');
    const savedReports = localStorage.getItem('mne_reports');
    const savedUser = localStorage.getItem('mne_current_user');

    if (savedProjects) setProjects(JSON.parse(savedProjects));
    else {
      setProjects(INITIAL_PROJECTS);
      localStorage.setItem('mne_projects', JSON.stringify(INITIAL_PROJECTS));
    }

    if (savedBeneficiaries) setBeneficiaries(JSON.parse(savedBeneficiaries));
    else {
      setBeneficiaries(INITIAL_BENEFICIARIES);
      localStorage.setItem('mne_beneficiaries', JSON.stringify(INITIAL_BENEFICIARIES));
    }

    if (savedImpactLogs) setImpactLogs(JSON.parse(savedImpactLogs));
    else {
      setImpactLogs(INITIAL_IMPACT_LOGS);
      localStorage.setItem('mne_impact_logs', JSON.stringify(INITIAL_IMPACT_LOGS));
    }

    if (savedReports) setReports(JSON.parse(savedReports));
    else {
      setReports(INITIAL_REPORTS);
      localStorage.setItem('mne_reports', JSON.stringify(INITIAL_REPORTS));
    }

    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  // Sync to local storage on changes
  const saveProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    localStorage.setItem('mne_projects', JSON.stringify(newProjects));
  };

  const saveBeneficiaries = (newBens: Beneficiary[]) => {
    setBeneficiaries(newBens);
    localStorage.setItem('mne_beneficiaries', JSON.stringify(newBens));
  };

  const saveImpactLogs = (newLogs: ImpactLog[]) => {
    setImpactLogs(newLogs);
    localStorage.setItem('mne_impact_logs', JSON.stringify(newLogs));
  };

  const saveReports = (newReports: Report[]) => {
    setReports(newReports);
    localStorage.setItem('mne_reports', JSON.stringify(newReports));
  };

  const switchUser = (userId: string) => {
    const targetUser = INITIAL_USERS.find(u => u.id === userId);
    if (targetUser) {
      setCurrentUser(targetUser);
      localStorage.setItem('mne_current_user', JSON.stringify(targetUser));
    }
  };

  // Roles verification helpers
  const canWrite = () => {
    return currentUser.role === 'admin' || currentUser.role === 'staff';
  };

  const canDelete = () => {
    return currentUser.role === 'admin';
  };

  const isAdmin = () => {
    return currentUser.role === 'admin';
  };

  // ----- Projects Actions -----
  const addProject = (projectData: Omit<Project, 'id'>) => {
    if (!canWrite()) return false;
    const newProject: Project = {
      ...projectData,
      id: `project-${Date.now()}`
    };
    const updated = [newProject, ...projects];
    saveProjects(updated);
    return true;
  };

  const updateProject = (projectData: Project) => {
    if (!canWrite()) return false;
    const updated = projects.map(p => p.id === projectData.id ? projectData : p);
    saveProjects(updated);
    return true;
  };

  const deleteProject = (id: string) => {
    if (!canDelete()) return false;
    const updated = projects.filter(p => p.id !== id);
    saveProjects(updated);
    return true;
  };

  // ----- Beneficiaries Actions -----
  const addBeneficiary = (beneficiaryData: Omit<Beneficiary, 'id'>) => {
    if (!canWrite()) return false;
    const newBen: Beneficiary = {
      ...beneficiaryData,
      id: `beneficiary-${Date.now()}`
    };
    const updated = [newBen, ...beneficiaries];
    saveBeneficiaries(updated);
    
    // Auto-update beneficiaries count on associated project
    const associatedProj = projects.find(p => p.id === beneficiaryData.projectId);
    if (associatedProj) {
      updateProject({
        ...associatedProj,
        beneficiariesCount: associatedProj.beneficiariesCount + 1
      });
    }

    return true;
  };

  const updateBeneficiary = (beneficiaryData: Beneficiary) => {
    if (!canWrite()) return false;
    
    // Find old to handle counts correctly
    const oldBen = beneficiaries.find(b => b.id === beneficiaryData.id);
    const updated = beneficiaries.map(b => b.id === beneficiaryData.id ? beneficiaryData : b);
    saveBeneficiaries(updated);
    
    // Handle project id shifts
    if (oldBen && oldBen.projectId !== beneficiaryData.projectId) {
      // Decrease old count
      const oldProj = projects.find(p => p.id === oldBen.projectId);
      if (oldProj) {
        updateProject({
          ...oldProj,
          beneficiariesCount: Math.max(0, oldProj.beneficiariesCount - 1)
        });
      }
      // Increase new count
      const newProj = projects.find(p => p.id === beneficiaryData.projectId);
      if (newProj) {
        updateProject({
          ...newProj,
          beneficiariesCount: newProj.beneficiariesCount + 1
        });
      }
    }

    return true;
  };

  const deleteBeneficiary = (id: string) => {
    if (!canDelete()) return false;
    const oldBen = beneficiaries.find(b => b.id === id);
    const updated = beneficiaries.filter(b => b.id !== id);
    saveBeneficiaries(updated);

    if (oldBen) {
      const associatedProj = projects.find(p => p.id === oldBen.projectId);
      if (associatedProj) {
        updateProject({
          ...associatedProj,
          beneficiariesCount: Math.max(0, associatedProj.beneficiariesCount - 1)
        });
      }
    }
    return true;
  };

  // ----- Impact Logs Actions -----
  const addImpactLog = (logData: Omit<ImpactLog, 'id'>) => {
    if (!canWrite()) return false;
    const newLog: ImpactLog = {
      ...logData,
      id: `impact-${Date.now()}`
    };
    const updated = [newLog, ...impactLogs];
    saveImpactLogs(updated);
    return true;
  };

  const updateImpactLog = (logData: ImpactLog) => {
    if (!canWrite()) return false;
    const updated = impactLogs.map(l => l.id === logData.id ? logData : l);
    saveImpactLogs(updated);
    return true;
  };

  const deleteImpactLog = (id: string) => {
    if (!canDelete()) return false;
    const updated = impactLogs.filter(l => l.id !== id);
    saveImpactLogs(updated);
    return true;
  };

  // ----- Reports Actions -----
  const addReport = (reportData: Omit<Report, 'id'>) => {
    if (!canWrite()) return false;
    const newReport: Report = {
      ...reportData,
      id: `report-${Date.now()}`
    };
    const updated = [newReport, ...reports];
    saveReports(updated);
    return true;
  };

  const updateReport = (reportData: Report) => {
    if (!canWrite()) return false;
    const updated = reports.map(r => r.id === reportData.id ? reportData : r);
    saveReports(updated);
    return true;
  };

  const deleteReport = (id: string) => {
    if (!canDelete()) return false;
    const updated = reports.filter(r => r.id !== id);
    saveReports(updated);
    return true;
  };

  return (
    <AppContext.Provider
      value={{
        projects,
        beneficiaries,
        impactLogs,
        reports,
        currentUser,
        availableUsers: INITIAL_USERS,
        activeTab,
        setActiveTab,
        switchUser,
        isSidebarOpen,
        setIsSidebarOpen,
        addProject,
        updateProject,
        deleteProject,
        addBeneficiary,
        updateBeneficiary,
        deleteBeneficiary,
        addImpactLog,
        updateImpactLog,
        deleteImpactLog,
        addReport,
        updateReport,
        deleteReport,
        canWrite,
        canDelete,
        isAdmin
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used inside AppProvider');
  return context;
};
