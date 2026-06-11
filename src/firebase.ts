import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import appletConfig from '../firebase-applet-config.json';

const firebaseConfig = {
  apiKey: appletConfig.apiKey || (import.meta as any).env.VITE_FIREBASE_API_KEY,
  authDomain: appletConfig.authDomain || (import.meta as any).env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: appletConfig.projectId || (import.meta as any).env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: appletConfig.storageBucket || (import.meta as any).env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: appletConfig.messagingSenderId || (import.meta as any).env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: appletConfig.appId || (import.meta as any).env.VITE_FIREBASE_APP_ID,
};

export const hasFirebaseConfig = !!(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId
);

let app;
let db: Firestore | null = null;
let auth: Auth | null = null;

if (hasFirebaseConfig) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    const databaseId = appletConfig.firestoreDatabaseId || (import.meta as any).env.VITE_FIREBASE_FIRESTORE_DATABASE_ID || undefined;
    db = getFirestore(app, databaseId);
    auth = getAuth(app);
  } catch (error) {
    console.error("Firebase initialization failed:", error);
  }
}

export { db, auth };

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth?.currentUser?.uid || null,
      email: auth?.currentUser?.email || null,
      emailVerified: auth?.currentUser?.emailVerified || null,
      isAnonymous: auth?.currentUser?.isAnonymous || null,
      tenantId: auth?.currentUser?.tenantId || null,
      providerInfo: auth?.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}
