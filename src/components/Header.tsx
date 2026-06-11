import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, 
  Database, 
  Calendar, 
  HelpCircle,
  TrendingUp,
  Sparkles,
  Menu
} from 'lucide-react';

export const Header: React.FC = () => {
  const { currentUser, activeTab, isSidebarOpen, setIsSidebarOpen } = useApp();

  const getTabTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'پەڕەی سەرەکی و ئامارەکان';
      case 'projects': return 'بەڕێوەبردنی پڕۆژە نیشتمانییەکان';
      case 'beneficiaries': return 'تۆماری گشتی سوودمەندان';
      case 'impact': return 'پێوانەکردنی کاریگەری و گوڕانکاری';
      case 'reports': return 'داڕشتن و پێشکەشکردنی ڕاپۆرتەکان';
      case 'assistant': return 'یاریدەدەری زیرەکی M&E (مێشکی پیشاندەر)';
      default: return 'سیستەمی هەڵسەنگاندن';
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <span className="inline-flex items-center gap-1 bg-rose-500/10 text-rose-600 bg-rose-500/10 text-rose-500 border border-rose-500/20 text-xs px-2.5 py-0.5 rounded-full font-bold">بەڕێوەبەر</span>;
      case 'staff':
        return <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-600 bg-amber-500/10 text-amber-500 border border-amber-500/20 text-xs px-2.5 py-0.5 rounded-full font-bold">کارمەندی چاودێری</span>;
      default:
        return <span className="inline-flex items-center gap-1 bg-slate-500/10 text-slate-600 bg-slate-500/10 text-slate-500 border border-slate-500/20 text-xs px-2.5 py-0.5 rounded-full font-bold">بینەری فەرمی</span>;
    }
  };

  return (
    <header className="h-20 bg-white border-b border-slate-200/80 sticky top-0 left-0 right-0 z-20 px-4 sm:px-8 flex items-center justify-between font-sans">
      <div className="flex items-center gap-3">
        {/* Hamburger Menu on mobile */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden p-2 text-slate-600 hover:bg-slate-550/10 hover:bg-slate-100 border border-slate-200/70 rounded-xl cursor-pointer"
          title="تەواوی بەشەکان"
        >
          <Menu size={18} />
        </button>
        <div>
          <h2 className="text-sm sm:text-xl font-bold text-slate-800 tracking-tight leading-none sm:leading-normal">{getTabTitle()}</h2>
          <p className="text-[10px] sm:text-xs text-slate-500 flex items-center gap-1.5 mt-1.5 sm:mt-1">
            <span>ڕێکخراوە ناحکومییەکان</span>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <span className="text-slate-400">قۆناغی یەکەم</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Connection status card */}
        <div className="hidden lg:flex items-center gap-3 bg-emerald-500/5 border border-emerald-500/15 py-1.5 px-3.5 rounded-xl">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700">
              <Database size={12} />
              <span>فایەربەیس ئامادەیە</span>
            </div>
            <p className="text-[9px] text-slate-500">بەستراوە بە لۆکاڵ ساندباکسی دۆخ</p>
          </div>
        </div>

        {/* Date tracker */}
        <div className="text-right text-xs text-slate-500 border-l border-slate-200 pl-4 h-9 flex flex-col justify-center">
          <div className="flex items-center gap-1.5 justify-end font-semibold text-slate-700">
            <Calendar size={13} className="text-slate-400" />
            <span>١١ی حوزەیرانی ٢٠٢٦</span>
          </div>
          <span className="text-[10px] text-slate-400 text-right">چاودێری و شیکردنەوە بەردەوامە</span>
        </div>

        {/* Current profile status */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs font-bold text-slate-800 leading-tight">{currentUser.name}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">{currentUser.email}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold relative">
            <User size={20} className="text-slate-500" />
            <span className="absolute -bottom-1 -left-1">
              {getRoleBadge(currentUser.role)}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
