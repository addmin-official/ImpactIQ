import { doc, getDocs, setDoc, deleteDoc, collection } from 'firebase/firestore';
import { db, auth, hasFirebaseConfig, handleFirestoreError, OperationType } from '../firebase';
import { Report, ReportType } from '../types';
import { INITIAL_REPORTS } from '../mockData';

const COLLECTION_NAME = 'reports';

export const reportService = {
  /**
   * Get all reports
   */
  async getReports(): Promise<Report[]> {
    if (!db || (hasFirebaseConfig && !auth?.currentUser)) {
      const saved = localStorage.getItem('mne_reports');
      if (saved) return JSON.parse(saved);
      localStorage.setItem('mne_reports', JSON.stringify(INITIAL_REPORTS));
      return INITIAL_REPORTS;
    }

    try {
      const ref = collection(db, COLLECTION_NAME);
      const snapshot = await getDocs(ref);
      const list: Report[] = [];
      snapshot.forEach(docSnap => {
        const data = docSnap.data();
        list.push({
          id: docSnap.id,
          title: data.title || '',
          reportType: (data.reportType as ReportType) || 'evaluation',
          projectId: data.projectId || '',
          executiveSummary: data.executiveSummary || '',
          results: data.results || '',
          impactDescription: data.impactDescription || '',
          recommendations: data.recommendations || '',
          createdAt: data.createdAt || '',
        });
      });
      return list;
    } catch (error) {
      return handleFirestoreError(error, OperationType.LIST, COLLECTION_NAME);
    }
  },

  /**
   * Add a report
   */
  async addReport(report: Omit<Report, 'id'>, id?: string): Promise<Report> {
    const newId = id || `report-${Date.now()}`;
    const newReport: Report = { id: newId, ...report };

    if (!db || (hasFirebaseConfig && !auth?.currentUser)) {
      const saved = localStorage.getItem('mne_reports');
      const list: Report[] = saved ? JSON.parse(saved) : [...INITIAL_REPORTS];
      const updated = [newReport, ...list];
      localStorage.setItem('mne_reports', JSON.stringify(updated));
      return newReport;
    }

    try {
      const docRef = doc(db, COLLECTION_NAME, newId);
      await setDoc(docRef, {
        title: report.title,
        reportType: report.reportType,
        projectId: report.projectId,
        executiveSummary: report.executiveSummary,
        results: report.results,
        impactDescription: report.impactDescription,
        recommendations: report.recommendations,
        createdAt: report.createdAt,
      });
      return newReport;
    } catch (error) {
      return handleFirestoreError(error, OperationType.WRITE, `${COLLECTION_NAME}/${newId}`);
    }
  },

  /**
   * Update an existing report
   */
  async updateReport(report: Report): Promise<void> {
    if (!db || (hasFirebaseConfig && !auth?.currentUser)) {
      const saved = localStorage.getItem('mne_reports');
      const list: Report[] = saved ? JSON.parse(saved) : [...INITIAL_REPORTS];
      const updated = list.map(r => r.id === report.id ? report : r);
      localStorage.setItem('mne_reports', JSON.stringify(updated));
      return;
    }

    try {
      const docRef = doc(db, COLLECTION_NAME, report.id);
      await setDoc(docRef, {
        title: report.title,
        reportType: report.reportType,
        projectId: report.projectId,
        executiveSummary: report.executiveSummary,
        results: report.results,
        impactDescription: report.impactDescription,
        recommendations: report.recommendations,
        createdAt: report.createdAt,
      });
    } catch (error) {
      return handleFirestoreError(error, OperationType.WRITE, `${COLLECTION_NAME}/${report.id}`);
    }
  },

  /**
   * Delete a report
   */
  async deleteReport(id: string): Promise<void> {
    if (!db || (hasFirebaseConfig && !auth?.currentUser)) {
      const saved = localStorage.getItem('mne_reports');
      const list: Report[] = saved ? JSON.parse(saved) : [...INITIAL_REPORTS];
      const updated = list.filter(r => r.id !== id);
      localStorage.setItem('mne_reports', JSON.stringify(updated));
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
