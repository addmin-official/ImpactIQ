import { doc, getDocs, setDoc, deleteDoc, collection } from 'firebase/firestore';
import { db, auth, hasFirebaseConfig, handleFirestoreError, OperationType } from '../firebase';
import { Beneficiary, Gender, SupportStatus } from '../types';
import { INITIAL_BENEFICIARIES } from '../mockData';

const COLLECTION_NAME = 'beneficiaries';

export const beneficiaryService = {
  /**
   * Get all beneficiaries
   */
  async getBeneficiaries(): Promise<Beneficiary[]> {
    if (!db || (hasFirebaseConfig && !auth?.currentUser)) {
      const saved = localStorage.getItem('mne_beneficiaries');
      if (saved) return JSON.parse(saved);
      localStorage.setItem('mne_beneficiaries', JSON.stringify(INITIAL_BENEFICIARIES));
      return INITIAL_BENEFICIARIES;
    }

    try {
      const ref = collection(db, COLLECTION_NAME);
      const snapshot = await getDocs(ref);
      const list: Beneficiary[] = [];
      snapshot.forEach(docSnap => {
        const data = docSnap.data();
        list.push({
          id: docSnap.id,
          name: data.name || '',
          age: Number(data.age) || 0,
          gender: (data.gender as Gender) || 'female',
          location: data.location || '',
          beneficiaryType: data.beneficiaryType || '',
          projectId: data.projectId || '',
          supportStatus: (data.supportStatus as SupportStatus) || 'registered',
          registrationDate: data.registrationDate || '',
        });
      });
      return list;
    } catch (error) {
      return handleFirestoreError(error, OperationType.LIST, COLLECTION_NAME);
    }
  },

  /**
   * Add a beneficiary
   */
  async addBeneficiary(beneficiary: Omit<Beneficiary, 'id'>, id?: string): Promise<Beneficiary> {
    const newId = id || `beneficiary-${Date.now()}`;
    const newBen: Beneficiary = { id: newId, ...beneficiary };

    if (!db || (hasFirebaseConfig && !auth?.currentUser)) {
      const saved = localStorage.getItem('mne_beneficiaries');
      const list: Beneficiary[] = saved ? JSON.parse(saved) : [...INITIAL_BENEFICIARIES];
      const updated = [newBen, ...list];
      localStorage.setItem('mne_beneficiaries', JSON.stringify(updated));
      return newBen;
    }

    try {
      const docRef = doc(db, COLLECTION_NAME, newId);
      await setDoc(docRef, {
        name: beneficiary.name,
        age: Number(beneficiary.age),
        gender: beneficiary.gender,
        location: beneficiary.location,
        beneficiaryType: beneficiary.beneficiaryType,
        projectId: beneficiary.projectId,
        supportStatus: beneficiary.supportStatus,
        registrationDate: beneficiary.registrationDate,
      });
      return newBen;
    } catch (error) {
      return handleFirestoreError(error, OperationType.WRITE, `${COLLECTION_NAME}/${newId}`);
    }
  },

  /**
   * Update an existing beneficiary
   */
  async updateBeneficiary(beneficiary: Beneficiary): Promise<void> {
    if (!db || (hasFirebaseConfig && !auth?.currentUser)) {
      const saved = localStorage.getItem('mne_beneficiaries');
      const list: Beneficiary[] = saved ? JSON.parse(saved) : [...INITIAL_BENEFICIARIES];
      const updated = list.map(b => b.id === beneficiary.id ? beneficiary : b);
      localStorage.setItem('mne_beneficiaries', JSON.stringify(updated));
      return;
    }

    try {
      const docRef = doc(db, COLLECTION_NAME, beneficiary.id);
      await setDoc(docRef, {
        name: beneficiary.name,
        age: Number(beneficiary.age),
        gender: beneficiary.gender,
        location: beneficiary.location,
        beneficiaryType: beneficiary.beneficiaryType,
        projectId: beneficiary.projectId,
        supportStatus: beneficiary.supportStatus,
        registrationDate: beneficiary.registrationDate,
      });
    } catch (error) {
      return handleFirestoreError(error, OperationType.WRITE, `${COLLECTION_NAME}/${beneficiary.id}`);
    }
  },

  /**
   * Delete a beneficiary
   */
  async deleteBeneficiary(id: string): Promise<void> {
    if (!db || (hasFirebaseConfig && !auth?.currentUser)) {
      const saved = localStorage.getItem('mne_beneficiaries');
      const list: Beneficiary[] = saved ? JSON.parse(saved) : [...INITIAL_BENEFICIARIES];
      const updated = list.filter(b => b.id !== id);
      localStorage.setItem('mne_beneficiaries', JSON.stringify(updated));
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
