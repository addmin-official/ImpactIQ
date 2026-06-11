import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, Beneficiary, ImpactLog, Report, UserProfile, UserRole } from '../types';
import {
  INITIAL_PROJECTS,
  INITIAL_BENEFICIARIES,
  INITIAL_IMPACT_LOGS,
  INITIAL_REPORTS,
  INITIAL_USERS
} from '../mockData';

// Services
import { projectService } from '../services/projectService';
import { beneficiaryService } from '../services/beneficiaryService';
import { impactService } from '../services/impactService';
import { reportService } from '../services/reportService';
import { userService } from '../services/userService';

// Firebase core & auth
import { auth, hasFirebaseConfig } from '../firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';

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

  // Firebase auth & config attributes
  hasFirebase: boolean;
  loginWithEmail: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[]>([]);
  const [impactLogs, setImpactLogs] = useState<ImpactLog[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [currentUser, setCurrentUser] = useState<UserProfile>(INITIAL_USERS[0]); // Default to Admin
  const [activeTab, setActiveTab2] = useState<string>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(false);
  const [availableUsers, setAvailableUsers] = useState<UserProfile[]>(INITIAL_USERS);

  // Trigger scroll to top on tab change for clean feel
  const setActiveTab = (tab: string) => {
    setActiveTab2(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsSidebarOpen(false);
  };

  // 1. Setup Auth state listeners (if Firebase is enabled)
  useEffect(() => {
    if (hasFirebaseConfig && auth) {
      setIsAuthLoading(true);
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        try {
          if (user) {
            // Attempt to load profile from firestore
            const profile = await userService.getUserProfile(user.uid);
            if (profile) {
              setCurrentUser(profile);
            } else {
              // Missing profile is a security boundary; sign out instantly!
              await signOut(auth);
              setCurrentUser(INITIAL_USERS[0]);
            }
          } else {
            // Local fallback if logged out
            const savedUser = localStorage.getItem('mne_current_user');
            if (savedUser) {
              setCurrentUser(JSON.parse(savedUser));
            } else {
              setCurrentUser(INITIAL_USERS[0]);
            }
          }
        } catch (err) {
          console.error("Auth state listener profile resolution error:", err);
        } finally {
          setIsAuthLoading(false);
        }
      });
      return unsubscribe;
    }
  }, [auth]);

  // 2. Fetch dataset on mount or auth load state changes
  useEffect(() => {
    async function fetchDashboardCollection() {
      try {
        const projs = await projectService.getProjects();
        setProjects(projs);
        const bens = await beneficiaryService.getBeneficiaries();
        setBeneficiaries(bens);
        const logs = await impactService.getImpactLogs();
        setImpactLogs(logs);
        const reps = await reportService.getReports();
        setReports(reps);

        // Fetch official users from database if available
        const users = await userService.getAllUserProfiles();
        if (users && users.length > 0) {
          setAvailableUsers(users);
        }
      } catch (err) {
        console.error("Error loading M&E collections from service layer:", err);
      }
    }
    fetchDashboardCollection();
  }, [currentUser]);

  // Firebase Email/Password SignIn Action
  const loginWithEmail = async (emailStr: string, passwordStr: string): Promise<boolean> => {
    if (hasFirebaseConfig && auth) {
      try {
        setIsAuthLoading(true);
        const response = await signInWithEmailAndPassword(auth, emailStr, passwordStr);
        const uid = response.user.uid;
        
        const profile = await userService.getUserProfile(uid);
        if (!profile) {
          // No user profile exists inside database; sign out immediately and fail!
          await signOut(auth);
          throw new Error('NO_PROFILE');
        }
        setCurrentUser(profile);
        return true;
      } catch (error) {
        console.error("Firebase Login Error:", error);
        throw error;
      } finally {
        setIsAuthLoading(false);
      }
    } else {
      // Local check
      const matched = INITIAL_USERS.find(u => u.email.toLowerCase() === emailStr.toLowerCase());
      if (matched) {
        setCurrentUser(matched);
        localStorage.setItem('mne_current_user', JSON.stringify(matched));
        return true;
      }
      return false;
    }
  };

  // Logout Action
  const logout = async () => {
    if (hasFirebaseConfig && auth) {
      await signOut(auth);
    }
    setCurrentUser(INITIAL_USERS[0]);
    localStorage.removeItem('mne_current_user');
  };

  // Switch profiles (essential for sandbox demo sandbox role tests)
  const switchUser = async (userId: string) => {
    const targetUser = INITIAL_USERS.find(u => u.id === userId) || availableUsers.find(u => u.id === userId);
    if (!targetUser) return;

    if (hasFirebaseConfig && auth) {
      try {
        setIsAuthLoading(true);
        const email = targetUser.email;
        const password = "Password123";

        // Attempt sign in for existing sandbox account only, no auto-creation
        await signInWithEmailAndPassword(auth, email, password);
      } catch (err) {
        console.error("Firebase quick profile switch simulation error (account must be pre-created by admin):", err);
      } finally {
        setIsAuthLoading(false);
      }
    } else {
      // Local simple offline fallback
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
    const newId = `project-${Date.now()}`;
    const newDoc: Project = { id: newId, ...projectData };
    
    // Optimistic Local State Update
    setProjects(prev => [newDoc, ...prev]);
    
    // Background Service Async Sync
    projectService.addProject(projectData, newId).catch(err => {
      console.error("Async project creation error:", err);
    });
    return true;
  };

  const updateProject = (projectData: Project) => {
    if (!canWrite()) return false;
    
    // Optimistic Update
    setProjects(prev => prev.map(p => p.id === projectData.id ? projectData : p));
    
    // Background execution
    projectService.updateProject(projectData).catch(err => {
      console.error("Async project update validation error:", err);
    });
    return true;
  };

  const deleteProject = (id: string) => {
    if (!canDelete()) return false;
    
    // Optimistic Update
    setProjects(prev => prev.filter(p => p.id !== id));
    
    // Background sync
    projectService.deleteProject(id).catch(err => {
      console.error("Async project deletion error:", err);
    });
    return true;
  };

  // ----- Beneficiaries Actions -----
  const addBeneficiary = (beneficiaryData: Omit<Beneficiary, 'id'>) => {
    if (!canWrite()) return false;
    const newId = `beneficiary-${Date.now()}`;
    const newDoc: Beneficiary = { id: newId, ...beneficiaryData };

    setBeneficiaries(prev => [newDoc, ...prev]);

    // Async service sync
    beneficiaryService.addBeneficiary(beneficiaryData, newId).catch(err => {
      console.error("Async beneficiary creation error:", err);
    });

    // Auto-update stats count on associated project in background
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
    
    const oldBen = beneficiaries.find(b => b.id === beneficiaryData.id);
    setBeneficiaries(prev => prev.map(b => b.id === beneficiaryData.id ? beneficiaryData : b));
    
    beneficiaryService.updateBeneficiary(beneficiaryData).catch(err => {
      console.error("Async beneficiary update error:", err);
    });

    // Handle project count shifts
    if (oldBen && oldBen.projectId !== beneficiaryData.projectId) {
      const oldProj = projects.find(p => p.id === oldBen.projectId);
      if (oldProj) {
        updateProject({
          ...oldProj,
          beneficiariesCount: Math.max(0, oldProj.beneficiariesCount - 1)
        });
      }
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
    setBeneficiaries(prev => prev.filter(b => b.id !== id));

    beneficiaryService.deleteBeneficiary(id).catch(err => {
      console.error("Async beneficiary deletion error:", err);
    });

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
    const newId = `impact-${Date.now()}`;
    const newDoc: ImpactLog = { id: newId, ...logData };

    setImpactLogs(prev => [newDoc, ...prev]);

    impactService.addImpactLog(logData, newId).catch(err => {
      console.error("Async impact log creation error:", err);
    });
    return true;
  };

  const updateImpactLog = (logData: ImpactLog) => {
    if (!canWrite()) return false;
    
    setImpactLogs(prev => prev.map(l => l.id === logData.id ? logData : l));

    impactService.updateImpactLog(logData).catch(err => {
      console.error("Async impact log update error:", err);
    });
    return true;
  };

  const deleteImpactLog = (id: string) => {
    if (!canDelete()) return false;
    
    setImpactLogs(prev => prev.filter(l => l.id !== id));

    impactService.deleteImpactLog(id).catch(err => {
      console.error("Async impact log deletion error:", err);
    });
    return true;
  };

  // ----- Reports Actions -----
  const addReport = (reportData: Omit<Report, 'id'>) => {
    if (!canWrite()) return false;
    const newId = `report-${Date.now()}`;
    const newDoc: Report = { id: newId, ...reportData };

    setReports(prev => [newDoc, ...prev]);

    reportService.addReport(reportData, newId).catch(err => {
      console.error("Async report creation error:", err);
    });
    return true;
  };

  const updateReport = (reportData: Report) => {
    if (!canWrite()) return false;
    
    setReports(prev => prev.map(r => r.id === reportData.id ? reportData : r));

    reportService.updateReport(reportData).catch(err => {
      console.error("Async report update error:", err);
    });
    return true;
  };

  const deleteReport = (id: string) => {
    if (!canDelete()) return false;
    
    setReports(prev => prev.filter(r => r.id !== id));

    reportService.deleteReport(id).catch(err => {
      console.error("Async report deletion error:", err);
    });
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
        availableUsers,
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
        isAdmin,
        hasFirebase: hasFirebaseConfig,
        loginWithEmail,
        logout,
        isAuthLoading
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
