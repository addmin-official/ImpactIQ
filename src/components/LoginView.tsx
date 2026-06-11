import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_USERS } from '../mockData';
import { ShieldCheck, Mail, Lock, LogIn, Award, Eye } from 'lucide-react';

interface LoginViewProps {
  onLoginSuccess: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  const { switchUser } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleCustomLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (!email) {
      setValidationError('تکایە ئیمەیڵی فەرمی بنووسە.');
      return;
    }

    // Lookup user in mock profiles
    const matched = INITIAL_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (matched) {
      switchUser(matched.id);
      onLoginSuccess();
    } else {
      setValidationError('ئەم ئیمەیڵە تۆمار نەکراوە. دەتوانیت لە ڕێگەی دوگمە ئامادەکانەوە تاقیکردنەوە بکەیت.');
    }
  };

  const handlePresetLogin = (userId: string) => {
    switchUser(userId);
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-6 font-sans relative overflow-hidden">
      
      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl -translate-x-12 -translate-y-12"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl translate-x-12 translate-y-12"></div>

      <div className="z-10 w-full max-w-md bg-slate-950 border border-slate-800 p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl space-y-6 text-white">
        
        {/* Brand visual header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 bg-sky-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-sky-600/20 text-white font-bold animate-pulse">
            <ShieldCheck size={28} />
          </div>
          <div>
            <h2 className="text-lg font-black tracking-tight text-slate-100">مێشکی زیرەکی پێوانەکردن</h2>
            <p className="text-xs text-slate-400 mt-1">تکایە بچۆ ژوورەوە بۆ بینینی داتا و تۆمارەکانی کاریگەری</p>
          </div>
        </div>

        {validationError && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl font-bold text-center">
            {validationError}
          </div>
        )}

        {/* Input login forms for arbitrary tests */}
        <form onSubmit={handleCustomLoginSubmit} className="space-y-4">
          
          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 block">ناونیشانی ئیمەیڵی فەرمی</label>
            <div className="relative">
              <Mail size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                id="login-email"
                type="email"
                placeholder="email@mne.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 focus:border-sky-500 rounded-xl py-3 pl-4 pr-10 text-xs font-medium text-slate-200 outline-none transition-colors"
                required
              />
            </div>
          </div>

          {/* Password (simulation) */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 block">وینەی تێپەڕەوشە (نهێنی)</label>
            <div className="relative">
              <Lock size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                id="login-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 focus:border-sky-500 rounded-xl py-3 pl-4 pr-10 text-xs font-medium text-slate-200 outline-none transition-colors"
              />
            </div>
          </div>

          <button
            id="btn-login"
            type="submit"
            className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs rounded-xl transition-all shadow-md shadow-sky-600/10 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>چوونەژوورەوە</span>
            <LogIn size={14} />
          </button>

        </form>

        {/* Sandbox fast-connector buttons (essential for testing multiple security role behaviors) */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <p className="text-[10px] font-bold text-slate-400 text-center">تاقیکردنەوەی خێرا بە ڕۆڵە جیاوازەکان (تەنیا بە یەک لێدان):</p>
          
          <div className="grid grid-cols-1 gap-2">
            {/* Admin preset */}
            <button
              id="preset-login-admin"
              type="button"
              onClick={() => handlePresetLogin('user-admin')}
              className="p-2.5 bg-slate-900 border border-slate-800 hover:border-rose-500/30 text-right rounded-xl text-xs text-slate-300 hover:text-white transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                <span>ڕۆڵی بەڕێوەبەر (ئادمین فەرمی)</span>
              </div>
              <span className="text-[10px] text-slate-500 group-hover:text-rose-400 font-bold">دەسەڵاتی تەواو &rarr;</span>
            </button>

            {/* Staff preset */}
            <button
              id="preset-login-staff"
              type="button"
              onClick={() => handlePresetLogin('user-staff')}
              className="p-2.5 bg-slate-900 border border-slate-800 hover:border-amber-500/30 text-right rounded-xl text-xs text-slate-300 hover:text-white transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                <span>ڕۆڵی کارمەند (وردبینیکەر)</span>
              </div>
              <span className="text-[10px] text-slate-500 group-hover:text-amber-400 font-bold">تەنها تۆمارکردن &rarr;</span>
            </button>

            {/* Viewer preset */}
            <button
              id="preset-login-viewer"
              type="button"
              onClick={() => handlePresetLogin('user-viewer')}
              className="p-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-right rounded-xl text-xs text-slate-300 hover:text-white transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-slate-550"></div>
                <span>ڕۆڵی بینەر (پاڵپشتیکاری دەرەکی)</span>
              </div>
              <span className="text-[10px] text-slate-500 group-hover:text-slate-300 font-bold">تەنها بینینی زانیاری &rarr;</span>
            </button>
          </div>

        </div>

      </div>

      <div className="mt-6 text-slate-550 text-[10px] font-semibold text-center z-10">
        مێشکی زیرەکی پێوانەکردنی کاریگەری پڕۆژە نیشتمانییەکان © ٢٠٢٦
      </div>

    </div>
  );
};
