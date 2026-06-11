import React from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  LayoutDashboard, 
  FolderGit2, 
  Users, 
  TrendingUp, 
  FileSpreadsheet, 
  Sparkles, 
  ShieldCheck,
  X
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, currentUser, switchUser, availableUsers, isSidebarOpen, setIsSidebarOpen } = useApp();
  const { direction, language, t } = useLanguage();

  const menuItems = [
    { id: 'dashboard', name: t('nav.dashboard'), icon: LayoutDashboard },
    { id: 'projects', name: t('nav.projects'), icon: FolderGit2 },
    { id: 'beneficiaries', name: t('nav.beneficiaries'), icon: Users },
    { id: 'impact', name: t('nav.impact'), icon: TrendingUp },
    { id: 'reports', name: t('nav.reports'), icon: FileSpreadsheet },
    { id: 'assistant', name: t('nav.assistant'), icon: Sparkles },
  ];

  const getSidebarTitle = () => {
    if (language === 'ar') return 'العقل الذكي للرصد';
    if (language === 'en') return 'ImpactIQ Brain';
    return 'مێشکی زیرەکی پێوانەکردن';
  };

  const getSidebarSubtitle = () => {
    if (language === 'ar') return 'نظام تقييم الأثر';
    if (language === 'en') return 'Impact Evaluation System';
    return 'سیستەمی هەڵسەنگاندنی کاریگەری';
  };

  const getDemoActiveRoleLabel = () => {
    if (currentUser.role === 'admin') {
      if (language === 'ar') return 'المدير العام (كامل الصلاحيات)';
      if (language === 'en') return 'General Administrator (Full Permissions)';
      return 'بەڕێوەبەری سەرەکی (تەواوی دەسەڵاتەکان)';
    } else if (currentUser.role === 'staff') {
      if (language === 'ar') return 'موظف (إدخال وتعديل البيانات)';
      if (language === 'en') return 'Staff Member (Entry & Edit Only)';
      return 'کارمەند (تۆمار و دەستکاری بەس)';
    } else {
      if (language === 'ar') return 'مشاهد (قراءة فقط)';
      if (language === 'en') return 'Viewer (Read-Only access)';
      return 'بینەر (تەنها خوێندنەوە)';
    }
  };

  const getRoleLabel = (roleStr: string) => {
    if (roleStr === 'admin') return t('common.role_admin');
    if (roleStr === 'staff') return t('common.role_staff');
    return t('common.role_viewer');
  };

  const positionClass = direction === 'rtl' ? 'right-0 border-l border-slate-200 dark:border-slate-800' : 'left-0 border-r border-slate-200 dark:border-slate-800';
  const transformClass = isSidebarOpen 
    ? 'translate-x-0' 
    : (direction === 'rtl' ? 'translate-x-full' : '-translate-x-full');

  return (
    <>
      {/* Background Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-slate-950/65 z-40 lg:hidden backdrop-blur-xs transition-opacity duration-300"
        />
      )}

      <aside className={`w-[min(20rem,88vw)] lg:w-80 bg-white dark:bg-[#0f172a] text-slate-800 dark:text-slate-100 flex flex-col h-screen fixed top-0 ${positionClass} z-50 font-sans shadow-2xl transition-transform duration-350 lg:translate-x-0 ${transformClass}`}>
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-sky-600 rounded-xl text-white shadow-lg shadow-sky-500/30 font-bold shrink-0">
              <TrendingUp size={22} className="animate-pulse" />
            </div>
            <div>
              <h1 className="font-bold text-sm text-slate-800 dark:text-slate-100 leading-tight">{getSidebarTitle()}</h1>
              <p className="text-xs text-sky-655 dark:text-sky-400 mt-0.5 font-semibold">{getSidebarSubtitle()}</p>
            </div>
          </div>
          
          {/* Mobile close button */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 text-slate-500 hover:text-slate-850 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Role Switcher Sandbox Info */}
        <div className="p-4 mx-4 mt-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800/80">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 mb-2">
            <ShieldCheck size={14} className="text-sky-500 dark:text-sky-450 animate-pulse" />
            <span>{language === 'ar' ? 'تبديل صلاحية العرض:' : language === 'en' ? 'Select Demo Credentials:' : 'هەڵبژاردنی دەسەڵات بۆ دیمۆ:'}</span>
          </div>
          <select
            id="roleSelector"
            value={currentUser.id}
            onChange={(e) => switchUser(e.target.value)}
            className="w-full bg-white dark:bg-slate-950 border border-slate-350 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs rounded-lg p-2.5 outline-none focus:border-sky-555 transition-colors cursor-pointer"
          >
            {availableUsers.map((u) => (
              <option key={u.id} value={u.id} className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200">
                {u.name} ({getRoleLabel(u.role)})
              </option>
            ))}
          </select>
          <div className="mt-2 text-[10px] text-slate-555 dark:text-slate-400 p-1.5 rounded bg-slate-100 dark:bg-slate-950/80 border border-slate-150 dark:border-slate-800/30">
            <span>{language === 'ar' ? 'الدور الحالي: ' : language === 'en' ? 'Current Role: ' : 'ڕۆڵی ئێستا: '}</span>
            <span className="font-extrabold text-sky-655 dark:text-sky-400">
              {getDemoActiveRoleLabel()}
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                id={`sidebar-tab-${item.id}`}
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 group text-sm cursor-pointer ${
                  isActive
                    ? 'bg-sky-600 text-white font-bold shadow-lg shadow-sky-600/10'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-855 hover:text-slate-900 dark:hover:text-slate-100 font-medium'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className={isActive ? 'text-white' : 'text-slate-500 dark:text-slate-455 group-hover:text-slate-800 dark:group-hover:text-slate-200'} />
                  <span>{item.name}</span>
                </div>
                {item.id === 'assistant' && (
                  <span className="bg-gradient-to-r from-teal-500 to-sky-600 text-[10px] text-white px-2 py-0.5 rounded-full font-bold animate-bounce whitespace-nowrap">
                    {language === 'ar' ? 'ذكي' : language === 'en' ? 'Smart' : 'زیرەک'}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer info (Professional details, no simulated terminal output) */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 text-slate-550 text-xs text-center">
          <p className="font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-250 transition-colors">
            {language === 'ar' ? 'المرحلة الأولى — عرض حي' : language === 'en' ? 'Phase 1 — Live Interactive Demo' : 'قۆناغی یەکەم — دیمۆی کارا'}
          </p>
          <p className="mt-1 text-[10px] text-slate-400 dark:text-slate-500">
            {language === 'ar' ? 'النموذج التحليلي: Gemini 3.5 Flash' : language === 'en' ? 'Core Model: Gemini 3.5 Flash' : 'مۆدێلی ناوەکی: Gemini 3.5 Flash'}
          </p>
        </div>
      </aside>
    </>
  );
};
