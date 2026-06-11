import { doc, getDocs, setDoc, deleteDoc, collection } from 'firebase/firestore';
import { db, auth, hasFirebaseConfig, handleFirestoreError, OperationType } from '../firebase';
import { Project } from '../types';
import { INITIAL_PROJECTS } from '../mockData';

const COLLECTION_NAME = 'projects';

export const projectService = {
  /**
   * Get all projects
   */
  async getProjects(): Promise<Project[]> {
    if (!db || (hasFirebaseConfig && !auth?.currentUser)) {
      const saved = localStorage.getItem('mne_projects');
      if (saved) return JSON.parse(saved);
      localStorage.setItem('mne_projects', JSON.stringify(INITIAL_PROJECTS));
      return INITIAL_PROJECTS;
    }

    try {
      const ref = collection(db, COLLECTION_NAME);
      const snapshot = await getDocs(ref);
      const list: Project[] = [];
      snapshot.forEach(docSnap => {
        const data = docSnap.data();
        list.push({
          id: docSnap.id,
          name: data.name || '',
          description: data.description || '',
          location: data.location || '',
          status: data.status || 'planning',
          progress: Number(data.progress) || 0,
          budget: Number(data.budget) || 0,
          beneficiariesCount: Number(data.beneficiariesCount) || 0,
          startDate: data.startDate || '',
          endDate: data.endDate || '',
          risk: data.risk || 'low',
          keyResult: data.keyResult || '',
        });
      });
      return list;
    } catch (error) {
      return handleFirestoreError(error, OperationType.LIST, COLLECTION_NAME);
    }
  },

  /**
   * Add a project
   */
  async addProject(project: Omit<Project, 'id'>, id?: string): Promise<Project> {
    const newId = id || `project-${Date.now()}`;
    const newProject: Project = { id: newId, ...project };

    if (!db || (hasFirebaseConfig && !auth?.currentUser)) {
      const saved = localStorage.getItem('mne_projects');
      const list: Project[] = saved ? JSON.parse(saved) : [...INITIAL_PROJECTS];
      const updated = [newProject, ...list];
      localStorage.setItem('mne_projects', JSON.stringify(updated));
      return newProject;
    }

    try {
      const docRef = doc(db, COLLECTION_NAME, newId);
      await setDoc(docRef, {
        name: project.name,
        description: project.description,
        location: project.location,
        status: project.status,
        progress: Number(project.progress),
        budget: Number(project.budget),
        beneficiariesCount: Number(project.beneficiariesCount),
        startDate: project.startDate,
        endDate: project.endDate,
        risk: project.risk,
        keyResult: project.keyResult,
      });
      return newProject;
    } catch (error) {
      return handleFirestoreError(error, OperationType.WRITE, `${COLLECTION_NAME}/${newId}`);
    }
  },

  /**
   * Update an existing project
   */
  async updateProject(project: Project): Promise<void> {
    if (!db || (hasFirebaseConfig && !auth?.currentUser)) {
      const saved = localStorage.getItem('mne_projects');
      const list: Project[] = saved ? JSON.parse(saved) : [...INITIAL_PROJECTS];
      const updated = list.map(p => p.id === project.id ? project : p);
      localStorage.setItem('mne_projects', JSON.stringify(updated));
      return;
    }

    try {
      const docRef = doc(db, COLLECTION_NAME, project.id);
      await setDoc(docRef, {
        name: project.name,
        description: project.description,
        location: project.location,
        status: project.status,
        progress: Number(project.progress),
        budget: Number(project.budget),
        beneficiariesCount: Number(project.beneficiariesCount),
        startDate: project.startDate,
        endDate: project.endDate,
        risk: project.risk,
        keyResult: project.keyResult,
      });
    } catch (error) {
      return handleFirestoreError(error, OperationType.WRITE, `${COLLECTION_NAME}/${project.id}`);
    }
  },

  /**
   * Delete a project
   */
  async deleteProject(id: string): Promise<void> {
    if (!db || (hasFirebaseConfig && !auth?.currentUser)) {
      const saved = localStorage.getItem('mne_projects');
      const list: Project[] = saved ? JSON.parse(saved) : [...INITIAL_PROJECTS];
      const updated = list.filter(p => p.id !== id);
      localStorage.setItem('mne_projects', JSON.stringify(updated));
      return;
    }

    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
    } catch (error) {
      return handleFirestoreError(error, OperationType.DELETE, `${COLLECTION_NAME}/${id}`);
    }
  }
};
