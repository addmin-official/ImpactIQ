import React from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  User, 
  Database, 
  Calendar, 
  HelpCircle,
  TrendingUp,
  Sparkles,
  Menu,
  Globe
} from 'lucide-react';

export const Header: React.FC = () => {
  const { currentUser, activeTab, isSidebarOpen, setIsSidebarOpen } = useApp();
  const { language, setLanguage, direction, t } = useLanguage();

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
        return <span className="inline-flex items-center gap-1 bg-rose-500/10 text-rose-600 border border-rose-500/20 text-[9px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap shadow-sm">{t('common.role_admin')}</span>;
      case 'staff':
        return <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-600 border border-amber-500/20 text-[9px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap shadow-sm">{t('common.role_staff')}</span>;
      default:
        return <span className="inline-flex items-center gap-1 bg-slate-500/10 text-slate-600 border border-slate-500/20 text-[9px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap shadow-sm">{t('common.role_viewer')}</span>;
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
    <header className="h-20 bg-white border-b border-slate-200/80 sticky top-0 left-0 right-0 z-20 px-4 sm:px-8 flex items-center justify-between font-sans">
      <div className="flex items-center gap-3">
        {/* Hamburger Menu on mobile */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 border border-slate-200/70 rounded-xl cursor-pointer"
          title="Sidebar Menu"
        >
          <Menu size={18} />
        </button>
        <div>
          <h2 className="text-sm sm:text-xl font-bold text-slate-800 tracking-tight leading-none sm:leading-normal">{getTabTitle()}</h2>
          <p className="text-[10px] sm:text-xs text-slate-500 flex items-center gap-1.5 mt-1.5 sm:mt-1">
            <span>{getSubTitleString()}</span>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <span className="text-slate-400">{getPhaseString()}</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
        {/* Language switcher drop down */}
        <div className="flex items-center gap-1.5 border border-slate-200 hover:border-slate-300 transition-colors rounded-xl px-2.5 py-1.5 bg-slate-550/5 bg-slate-50">
          <Globe size={14} className="text-slate-500 shrink-0" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as any)}
            className="bg-transparent text-xs font-bold text-slate-700 focus:outline-none cursor-pointer pr-1"
          >
            <option value="ckb">کوردی</option>
            <option value="ar">العربية</option>
            <option value="en">English</option>
          </select>
        </div>

        {/* Connection status card */}
        <div className="hidden xl:flex items-center gap-3 bg-emerald-500/5 border border-emerald-500/15 py-1.5 px-3.5 rounded-xl">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700">
              <Database size={12} />
              <span>{getFirebaseReady()}</span>
            </div>
            <p className="text-[9px] text-slate-500">{getFirebaseDesc()}</p>
          </div>
        </div>

        {/* Date tracker */}
        <div className="hidden md:flex text-right text-xs text-slate-500 border-l border-slate-200 pl-4 h-9 flex-col justify-center">
          <div className="flex items-center gap-1.5 justify-end font-semibold text-slate-700">
            <Calendar size={13} className="text-slate-400" />
            <span>{getDateString()}</span>
          </div>
          <span className="text-[10px] text-slate-400 text-right">{getStatusString()}</span>
        </div>

        {/* Current profile status */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="hidden sm:block text-right">
            <p className="text-xs font-bold text-slate-800 leading-tight">{currentUser.name}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">{currentUser.email}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold relative shrink-0">
            <User size={20} className="text-slate-500" />
            <span className="absolute -bottom-1.5 -left-1.5 whitespace-nowrap z-10 flex">
              {getRoleBadge(currentUser.role)}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
