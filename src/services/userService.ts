import { doc, getDoc, setDoc, updateDoc, collection, getDocs } from 'firebase/firestore';
import { db, auth, hasFirebaseConfig, handleFirestoreError, OperationType } from '../firebase';
import { UserProfile, UserRole } from '../types';
import { INITIAL_USERS } from '../mockData';

const COLLECTION_NAME = 'users';

export const userService = {
  /**
   * Fetch a user profile by Firebase Auth UID.
   */
  async getUserProfile(uid: string): Promise<UserProfile | null> {
    if (!db) {
      // Local fallback
      const saved = localStorage.getItem('mne_users');
      const users: UserProfile[] = saved ? JSON.parse(saved) : INITIAL_USERS;
      const matched = users.find(u => u.id === uid);
      return matched || null;
    }

    try {
      const docRef = doc(db, COLLECTION_NAME, uid);
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        const data = snapshot.data();
        return {
          id: uid,
          email: data.email || '',
          role: (data.role as UserRole) || 'viewer',
          name: data.name || '',
        };
      }
      return null;
    } catch (error) {
      return handleFirestoreError(error, OperationType.GET, `${COLLECTION_NAME}/${uid}`);
    }
  },

  /**
   * Create or save a user profile document associated with Auth UID.
   */
  async saveUserProfile(uid: string, profile: Omit<UserProfile, 'id'>): Promise<void> {
    if (!db) {
      // Local fallback
      const saved = localStorage.getItem('mne_users');
      const users: UserProfile[] = saved ? JSON.parse(saved) : [...INITIAL_USERS];
      const existingIdx = users.findIndex(u => u.id === uid);
      const updatedProfile = { id: uid, ...profile };
      if (existingIdx !== -1) {
        users[existingIdx] = updatedProfile;
      } else {
        users.push(updatedProfile);
      }
      localStorage.setItem('mne_users', JSON.stringify(users));
      return;
    }

    try {
      const docRef = doc(db, COLLECTION_NAME, uid);
      await setDoc(docRef, {
        email: profile.email,
        role: profile.role,
        name: profile.name,
        active: true,
      });
    } catch (error) {
      return handleFirestoreError(error, OperationType.WRITE, `${COLLECTION_NAME}/${uid}`);
    }
  },

  /**
   * Get all user profiles for role-management/switching.
   */
  async getAllUserProfiles(): Promise<UserProfile[]> {
    if (!db || (hasFirebaseConfig && !auth?.currentUser)) {
      const saved = localStorage.getItem('mne_users');
      return saved ? JSON.parse(saved) : INITIAL_USERS;
    }

    try {
      const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
      const list: UserProfile[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        list.push({
          id: docSnap.id,
          email: data.email || '',
          role: (data.role as UserRole) || 'viewer',
          name: data.name || '',
        });
      });
      return list;
    } catch (error) {
      return handleFirestoreError(error, OperationType.LIST, COLLECTION_NAME);
    }
  }
};
