/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
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
  const { direction, t } = useLanguage();

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

  const layoutSpacing = direction === 'rtl' ? 'pr-0 lg:pr-80 pl-0' : 'pl-0 lg:pl-80 pr-0';

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 ${layoutSpacing} flex flex-col font-sans selection:bg-sky-200 transition-colors duration-200`}>
      
      {/* Sidebar for Navigation on the right/left depending on RTL/LTR */}
      <Sidebar />

      {/* Main Column */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header containing metadata dates and sandbox status */}
        <Header />

        {/* Dynamic content padding block */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          
          {/* Quick logout tab simulation */}
          <div className="flex items-center justify-between no-print bg-white dark:bg-slate-900 px-5 py-3 rounded-xl border border-slate-200/60 dark:border-slate-800/80 mb-2">
            <span className="text-xs text-slate-400 dark:text-slate-500 font-bold">{t('common.trust_warning')}</span>
            <button
              onClick={onLogout}
              className="text-xs text-rose-600 hover:text-rose-700 font-extrabold flex items-center gap-1 transition-all cursor-pointer"
            >
              <span>{t('nav.logout')}</span>
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
    <LanguageProvider>
      <ThemeProvider>
        <AppProvider>
          {isLoggedIn ? (
            <MainLayout onLogout={handleLogout} />
          ) : (
            <LoginView onLoginSuccess={handleLoginSuccess} />
          )}
        </AppProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
