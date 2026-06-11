import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, 
  FolderGit2, 
  Users, 
  TrendingUp, 
  FileSpreadsheet, 
  Sparkles, 
  ShieldCheck,
  LogOut,
  X
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, currentUser, switchUser, availableUsers, isSidebarOpen, setIsSidebarOpen } = useApp();

  const menuItems = [
    { id: 'dashboard', name: 'پەڕەی سەرەکی', icon: LayoutDashboard },
    { id: 'projects', name: 'پڕۆژەکان', icon: FolderGit2 },
    { id: 'beneficiaries', name: 'سوودمەندان', icon: Users },
    { id: 'impact', name: 'پێوانەکردنی کاریگەری', icon: TrendingUp },
    { id: 'reports', name: 'ڕاپۆرتەکان', icon: FileSpreadsheet },
    { id: 'assistant', name: 'یاریدەدەری زیرەک', icon: Sparkles },
  ];

  return (
    <>
      {/* Background Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-slate-950/65 z-40 lg:hidden backdrop-blur-xs transition-opacity duration-300"
        />
      )}

      <aside className={`w-80 bg-slate-900 text-slate-100 flex flex-col h-screen fixed top-0 right-0 border-l border-slate-800 z-50 font-sans shadow-2xl transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Brand Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-sky-600 rounded-xl text-white shadow-lg shadow-sky-550/30">
              <TrendingUp size={22} className="animate-pulse" />
            </div>
            <div>
              <h1 className="font-bold text-sm text-slate-100 leading-tight">مێشکی زیرەکی پێوانەکردن</h1>
              <p className="text-xs text-sky-400 mt-0.5">سیستەمی هەڵسەنگاندنی کاریگەری</p>
            </div>
          </div>
          
          {/* Mobile close button */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

      {/* Role Switcher Sandbox Info */}
      <div className="p-4 mx-4 mt-4 bg-slate-800/60 rounded-xl border border-slate-700/50">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-2">
          <ShieldCheck size={14} className="text-sky-400" />
          <span>هەڵبژاردنی دەسەڵات بۆ دیمۆ:</span>
        </div>
        <select
          id="roleSelector"
          value={currentUser.id}
          onChange={(e) => switchUser(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg p-2.5 outline-none focus:border-sky-500 transition-colors"
        >
          {availableUsers.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name} ({u.role === 'admin' ? 'بەڕێوەبەر' : u.role === 'staff' ? 'کارمەند' : 'بینەر'})
            </option>
          ))}
        </select>
        <div className="mt-2 text-[10px] text-slate-400 p-1 rounded bg-slate-900/50">
          <span>ڕۆڵی ئێستا: </span>
          <span className="font-semibold text-sky-300">
            {currentUser.role === 'admin' ? 'بەڕێوەبەری سەرەکی (تەواوی دەسەڵاتەکان)' : 
             currentUser.role === 'staff' ? 'کارمەند (تۆمار و دەستکاری بەس)' : 'بینەر (تەنها خوێندنەوە)'}
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
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200 group text-sm ${
                isActive
                  ? 'bg-sky-600 text-white font-medium shadow-lg shadow-sky-600/10'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={18} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'} />
                <span>{item.name}</span>
              </div>
              {item.id === 'assistant' && (
                <span className="bg-gradient-to-r from-teal-400 to-sky-500 text-[10px] text-slate-950 px-2 py-0.5 rounded-full font-bold animate-bounce">
                  زیرەک
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer info (Professional details, no simulated terminal output) */}
      <div className="p-4 border-t border-slate-800 text-slate-500 text-xs text-center">
        <p className="font-medium text-slate-400 hover:text-slate-300 transition-colors">قۆناغی یەکەم — دیمۆی کارا</p>
        <p className="mt-1 text-[10px] text-slate-500">مۆدێلی ناوەکی: Gemini 3.5 Flash</p>
      </div>
    </aside>
    </>
  );
};
