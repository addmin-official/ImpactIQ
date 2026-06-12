import React from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { 
  User, 
  Database, 
  Calendar, 
  HelpCircle,
  TrendingUp,
  Sparkles,
  Menu,
  Globe,
  Sun,
  Moon
} from 'lucide-react';

export const Header: React.FC = () => {
  const { currentUser, activeTab, isSidebarOpen, setIsSidebarOpen } = useApp();
  const { language, setLanguage, direction, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const getTabTitle = () => {
    switch (activeTab) {
      case 'dashboard': return t('nav.dashboard');
      case 'projects': return t('projects.title');
      case 'beneficiaries': return t('beneficiaries.title');
      case 'impact': return t('impact.title');
      case 'reports': return t('reports.title');
      case 'assistant': return t('assistant.title');
      default: return t('nav.dashboard');
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <span className="inline-flex items-center gap-1 bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-450 border border-rose-500/20 text-[9px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap shadow-sm">{t('common.role_admin')}</span>;
      case 'staff':
        return <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-450 border border-amber-500/20 text-[9px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap shadow-sm">{t('common.role_staff')}</span>;
      default:
        return <span className="inline-flex items-center gap-1 bg-slate-500/10 text-slate-600 dark:bg-slate-550/20 dark:text-slate-400 border border-slate-500/20 text-[9px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap shadow-sm">{t('common.role_viewer')}</span>;
    }
  };

  const getSubTitleString = () => {
    if (language === 'ar') return 'المنظمات غير الحكومية';
    if (language === 'en') return 'Non-Governmental Organizations';
    return 'ڕێکخراوە ناحکومییەکان';
  };

  const getPhaseString = () => {
    if (language === 'ar') return 'المرحلة الأولى';
    if (language === 'en') return 'Phase One';
    return 'قۆناغی یەکەم';
  };

  const getFirebaseReady = () => {
    if (language === 'ar') return 'قاعدة البيانات جاهزة';
    if (language === 'en') return 'Firebase Connected';
    return 'فایەربەیس ئامادەیە';
  };

  const getFirebaseDesc = () => {
    if (language === 'ar') return 'متصل بقاعدة البيانات الآمنة';
    if (language === 'en') return 'Linked with Secure Firestore';
    return 'بەستراوە بە لۆکاڵ ساندباکسی دۆخ';
  };

  const getDateString = () => {
    if (language === 'ar') return '١١ حزيران ٢٠٢٦';
    if (language === 'en') return 'June 11, 2026';
    return '١١ی حوزەیرانی ٢٠٢٦';
  };

  const getStatusString = () => {
    if (language === 'ar') return 'مراقبة وتقييم مستمر';
    if (language === 'en') return 'Continuous M&E';
    return 'چاودێری و شیکردنەوە بەردەوامە';
  };

  return (
    <header className="h-20 bg-white dark:bg-[#0f172a] border-b border-slate-200/80 dark:border-slate-800 sticky top-0 left-0 right-0 z-20 px-4 sm:px-8 flex items-center justify-between font-sans transition-colors duration-200">
      <div className="flex items-center gap-3">
        {/* Hamburger Menu on mobile */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden p-2 text-slate-605 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/70 dark:border-slate-800 rounded-xl cursor-pointer"
          title="Sidebar Menu"
        >
          <Menu size={18} />
        </button>
        <div>
          <h2 className="text-sm sm:text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-none sm:leading-normal">{getTabTitle()}</h2>
          <p className="text-[10px] sm:text-xs text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mt-1.5 sm:mt-1 font-semibold">
            <span>{getSubTitleString()}</span>
            <span className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-600"></span>
            <span className="text-slate-600 dark:text-slate-400 font-bold">{getPhaseString()}</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
        
        {/* Modern Interactive Theme Switcher toggle button */}
        <button
          id="btn-header-theme-toggle"
          type="button"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? t('common.theme_light') : t('common.theme_dark')}
          className="p-2 sm:px-3 sm:py-1.5 flex items-center justify-center gap-1.5 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-705 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl cursor-pointer active:scale-95 transition-all text-xs font-black shadow-sm"
          title={theme === 'dark' ? t('common.theme_light') : t('common.theme_dark')}
        >
          {theme === 'dark' ? (
            <>
              <Sun size={14} className="text-amber-500 animate-spin" style={{ animationDuration: '10s' }} />
              <span className="hidden md:inline">{t('common.theme_light')}</span>
            </>
          ) : (
            <>
              <Moon size={14} className="text-indigo-650" />
              <span className="hidden md:inline">{t('common.theme_dark')}</span>
            </>
          )}
        </button>

        {/* Language switcher drop down */}
        <div className="flex items-center gap-1.5 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-705 transition-colors rounded-xl px-2.5 py-1.5 bg-slate-50 dark:bg-slate-950">
          <Globe size={14} className="text-slate-500 dark:text-slate-400 shrink-0" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as any)}
            className="bg-transparent text-xs font-bold text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer pr-1"
          >
            <option value="ckb" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">کوردی</option>
            <option value="ar" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">العربية</option>
            <option value="en" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">English</option>
          </select>
        </div>

        {/* Connection status card */}
        <div className="hidden xl:flex items-center gap-3 bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/15 dark:border-emerald-500/30 py-1.5 px-3.5 rounded-xl">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
          <div className={`text-right ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
              <Database size={12} />
              <span>{getFirebaseReady()}</span>
            </div>
            <p className="text-[9px] text-slate-500 dark:text-slate-400">{getFirebaseDesc()}</p>
          </div>
        </div>

        {/* Date tracker */}
        <div className={`hidden md:flex text-xs text-slate-700 dark:text-slate-300 h-9 flex-col justify-center ${direction === 'rtl' ? 'border-l border-slate-200 dark:border-slate-805 pl-4 text-right' : 'border-r border-slate-200 dark:border-slate-805 pr-4 text-left'}`}>
          <div className={`flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200 ${direction === 'rtl' ? 'justify-end' : 'justify-start'}`}>
            <Calendar size={13} className="text-slate-500 dark:text-slate-400" />
            <span>{getDateString()}</span>
          </div>
          <span className={`text-[10px] text-slate-505 dark:text-slate-400 ${direction === 'rtl' ? 'text-right' : 'text-left'} font-semibold`}>{getStatusString()}</span>
        </div>

        {/* Current profile status */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className={`hidden sm:block ${direction === 'rtl' ? 'text-right' : 'text-left'}`}>
            <p className="text-xs font-bold text-slate-900 dark:text-slate-50 leading-tight">{currentUser.name}</p>
            <p className="text-[10px] text-slate-600 dark:text-slate-350 mt-0.5 font-bold">{currentUser.email}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold relative shrink-0">
            <User size={20} className="text-slate-500 dark:text-slate-400" />
            <span className={`absolute -bottom-1.5 whitespace-nowrap z-10 flex ${direction === 'rtl' ? '-left-1.5' : '-right-1.5'}`}>
              {getRoleBadge(currentUser.role)}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
