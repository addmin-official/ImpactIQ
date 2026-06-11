import { doc, getDocs, setDoc, deleteDoc, collection } from 'firebase/firestore';
import { db, auth, hasFirebaseConfig, handleFirestoreError, OperationType } from '../firebase';
import { ImpactLog } from '../types';
import { INITIAL_IMPACT_LOGS } from '../mockData';

const COLLECTION_NAME = 'impactRecords';

export const impactService = {
  /**
   * Get all impact logs
   */
  async getImpactLogs(): Promise<ImpactLog[]> {
    if (!db || (hasFirebaseConfig && !auth?.currentUser)) {
      const saved = localStorage.getItem('mne_impactRecords');
      if (saved) return JSON.parse(saved);
      localStorage.setItem('mne_impactRecords', JSON.stringify(INITIAL_IMPACT_LOGS));
      return INITIAL_IMPACT_LOGS;
    }

    try {
      const ref = collection(db, COLLECTION_NAME);
      const snapshot = await getDocs(ref);
      const list: ImpactLog[] = [];
      snapshot.forEach(docSnap => {
        const data = docSnap.data();
        list.push({
          id: docSnap.id,
          projectId: data.projectId || '',
          target: data.target || '',
          preProjectResult: data.preProjectResult || '',
          postProjectResult: data.postProjectResult || '',
          percentageChange: Number(data.percentageChange) || 0,
          impactScore: Number(data.impactScore) || 0,
          notes: data.notes || '',
        });
      });
      return list;
    } catch (error) {
      return handleFirestoreError(error, OperationType.LIST, COLLECTION_NAME);
    }
  },

  /**
   * Add an impact log
   */
  async addImpactLog(log: Omit<ImpactLog, 'id'>, id?: string): Promise<ImpactLog> {
    const newId = id || `impact-${Date.now()}`;
    const newLog: ImpactLog = { id: newId, ...log };

    if (!db || (hasFirebaseConfig && !auth?.currentUser)) {
      const saved = localStorage.getItem('mne_impactRecords');
      const list: ImpactLog[] = saved ? JSON.parse(saved) : [...INITIAL_IMPACT_LOGS];
      const updated = [newLog, ...list];
      localStorage.setItem('mne_impactRecords', JSON.stringify(updated));
      return newLog;
    }

    try {
      const docRef = doc(db, COLLECTION_NAME, newId);
      await setDoc(docRef, {
        projectId: log.projectId,
        target: log.target,
        preProjectResult: log.preProjectResult,
        postProjectResult: log.postProjectResult,
        percentageChange: Number(log.percentageChange),
        impactScore: Number(log.impactScore),
        notes: log.notes,
      });
      return newLog;
    } catch (error) {
      return handleFirestoreError(error, OperationType.WRITE, `${COLLECTION_NAME}/${newId}`);
    }
  },

  /**
   * Update an existing impact log
   */
  async updateImpactLog(log: ImpactLog): Promise<void> {
    if (!db || (hasFirebaseConfig && !auth?.currentUser)) {
      const saved = localStorage.getItem('mne_impactRecords');
      const list: ImpactLog[] = saved ? JSON.parse(saved) : [...INITIAL_IMPACT_LOGS];
      const updated = list.map(l => l.id === log.id ? log : l);
      localStorage.setItem('mne_impactRecords', JSON.stringify(updated));
      return;
    }

    try {
      const docRef = doc(db, COLLECTION_NAME, log.id);
      await setDoc(docRef, {
        projectId: log.projectId,
        target: log.target,
        preProjectResult: log.preProjectResult,
        postProjectResult: log.postProjectResult,
        percentageChange: Number(log.percentageChange),
        impactScore: Number(log.impactScore),
        notes: log.notes,
      });
    } catch (error) {
      return handleFirestoreError(error, OperationType.WRITE, `${COLLECTION_NAME}/${log.id}`);
    }
  },

  /**
   * Delete an impact log
   */
  async deleteImpactLog(id: string): Promise<void> {
    if (!db || (hasFirebaseConfig && !auth?.currentUser)) {
      const saved = localStorage.getItem('mne_impactRecords');
      const list: ImpactLog[] = saved ? JSON.parse(saved) : [...INITIAL_IMPACT_LOGS];
      const updated = list.filter(l => l.id !== id);
      localStorage.setItem('mne_impactRecords', JSON.stringify(updated));
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
