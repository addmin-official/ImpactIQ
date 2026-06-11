/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { ProjectsView } from './components/ProjectsView';
import { BeneficiariesView } from './components/BeneficiariesView';
import { ImpactView } from './components/ImpactView';
import { ReportsView } from './components/ReportsView';
import { AssistantView } from './components/AssistantView';
import { LoginView } from './components/LoginView';

const MainLayout: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const { activeTab } = useApp();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'projects':
        return <ProjectsView />;
      case 'beneficiaries':
        return <BeneficiariesView />;
      case 'impact':
        return <ImpactView />;
      case 'reports':
        return <ReportsView />;
      case 'assistant':
        return <AssistantView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pr-0 lg:pr-80 flex flex-col font-sans selection:bg-sky-200">
      
      {/* Sidebar for Navigation on the right (RTL padding) */}
      <Sidebar />

      {/* Main Column */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header containing metadata dates and sandbox status */}
        <Header />

        {/* Dynamic content padding block */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl w-full mx-auto space-y-6">
          
          {/* Quick logout tab simulation */}
          <div className="flex items-center justify-between no-print bg-white px-5 py-3 rounded-xl border border-slate-200/60 mb-2">
            <span className="text-xs text-slate-400 font-bold">بەرپرسیارێتی متمانە: هەر دەستکارییەک ڕاستەوخۆ پاشەکەوت دەبێت لە داتای دیمۆ.</span>
            <button
              onClick={onLogout}
              className="text-xs text-rose-600 hover:text-rose-700 font-extrabold flex items-center gap-1 transition-all cursor-pointer"
            >
              <span>دەرچوون لە سیستەم (چوونەژوورە سەرەکی)</span>
            </button>
          </div>

          <div className="page-transition-enter page-transition-enter-active">
            {renderActiveView()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('mne_is_logged_in') === 'true';
  });

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem('mne_is_logged_in', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('mne_is_logged_in');
  };

  return (
    <AppProvider>
      {isLoggedIn ? (
        <MainLayout onLogout={handleLogout} />
      ) : (
        <LoginView onLoginSuccess={handleLoginSuccess} />
      )}
    </AppProvider>
  );
}
