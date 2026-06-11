import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { INITIAL_USERS } from '../mockData';
import { ShieldCheck, Mail, Lock, LogIn, Loader2, Globe } from 'lucide-react';

interface LoginViewProps {
  onLoginSuccess: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  const { switchUser, loginWithEmail, isAuthLoading } = useApp();
  const { language, setLanguage, direction, t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleCustomLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isAuthLoading) return;
    setValidationError('');

    if (!email) {
      setValidationError(
        language === 'en' ? 'Please specify an email address.' :
        language === 'ar' ? 'يرجى كتابة البريد الإلكتروني الرسمي.' :
        'تکایە ئیمەیڵی فەرمی بنووسە.'
      );
      return;
    }

    try {
      const pass = password || 'Password123';
      const success = await loginWithEmail(email, pass);
      if (success) {
        onLoginSuccess();
      } else {
        setValidationError(
          language === 'en' ? 'This email address is not registered. Try the preset sandbox accounts.' :
          language === 'ar' ? 'هذا البريد الإلكتروني غير مسجل. يمكنك تسجيل الدخول باستخدام الحسابات الجاهزة.' :
          'ئەم ئیمەیڵە تۆمار نەکراوە. دەتوانیت لە ڕێگەی دوگمە ئامادەکانەوە تاقیکردنەوە بکەیت.'
        );
      }
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-email') {
        setValidationError(
          language === 'en' ? 'Invalid credentials. Please verify your entries.' :
          language === 'ar' ? 'المعلومات المدخلة غير صحيحة. تأكد منها وحاول مجدداً.' :
          'زانیارییەکانت هەڵەیە. دڵنیابە لە نووسینی زانیاری دروست.'
        );
      } else {
        setValidationError(
          language === 'en' ? 'Server communication failure. Please verify internet connectivity.' :
          language === 'ar' ? 'حدث خطأ في الاتصال بالخادم. تحقق من جودة الإنترنت.' :
          'هەڵەیەک ڕوویدا لە کاتی پەيوەستبوون بە سێرڤەر. دڵنیابەرەوە لە هێڵی ئینتەرنێتەکەت.'
        );
      }
    }
  };

  const handlePresetLogin = async (userId: string) => {
    if (isAuthLoading) return;
    try {
      await switchUser(userId);
      onLoginSuccess();
    } catch (err) {
      console.error(err);
    }
  };

  const iconPositionClass = direction === 'rtl' ? 'right-3' : 'left-3';
  const inputPaddingClass = direction === 'rtl' ? 'pl-4 pr-10' : 'pl-10 pr-4';

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-6 font-sans relative overflow-hidden">
      
      {/* Floating Language Switcher at Top Corner */}
      <div className={`absolute top-4 ${direction === 'rtl' ? 'left-4' : 'right-4'} z-20 flex items-center gap-1.5 border border-slate-700/60 rounded-xl px-2.5 py-1.5 bg-slate-950/85 text-white/95 box-shadow-xl`}>
        <Globe size={14} className="text-slate-400 shrink-0" />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as any)}
          className="bg-transparent text-xs font-bold text-slate-300 focus:outline-none cursor-pointer"
        >
          <option value="ckb" className="bg-slate-950 text-white">کوردی</option>
          <option value="ar" className="bg-slate-950 text-white">العربية</option>
          <option value="en" className="bg-slate-950 text-white">English</option>
        </select>
      </div>

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
            <h2 className="text-lg font-black tracking-tight text-slate-100">{t('login.title')}</h2>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{t('login.sub_title')}</p>
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
            <label className="text-xs font-bold text-slate-300 block">{t('login.email')}</label>
            <div className="relative">
              <Mail size={14} className={`absolute ${iconPositionClass} top-1/2 -translate-y-1/2 text-slate-500`} />
              <input
                id="login-email"
                type="email"
                placeholder="email@mne.org"
                value={email}
                disabled={isAuthLoading}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full bg-slate-900 border border-slate-800 focus:border-sky-500 rounded-xl py-3 ${inputPaddingClass} text-xs font-medium text-slate-200 outline-none transition-colors`}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300 block">{t('login.password')}</label>
            <div className="relative">
              <Lock size={14} className={`absolute ${iconPositionClass} top-1/2 -translate-y-1/2 text-slate-500`} />
              <input
                id="login-password"
                type="password"
                placeholder="••••••••"
                value={password}
                disabled={isAuthLoading}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full bg-slate-900 border border-slate-800 focus:border-sky-500 rounded-xl py-3 ${inputPaddingClass} text-xs font-medium text-slate-200 outline-none transition-colors`}
              />
            </div>
          </div>

          <button
            id="btn-login"
            type="submit"
            disabled={isAuthLoading}
            className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs rounded-xl transition-all shadow-md shadow-sky-600/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isAuthLoading ? (
              <>
                <span>{t('common.loading')}</span>
                <Loader2 size={14} className="animate-spin" />
              </>
            ) : (
              <>
                <span>{t('login.signIn')}</span>
                <LogIn size={14} />
              </>
            )}
          </button>

        </form>

        {/* Sandbox fast-connector buttons */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <p className="text-[10px] font-bold text-slate-400 text-center">{t('login.demo_roles')}</p>
          
          <div className="grid grid-cols-1 gap-2">
            {/* Admin preset */}
            <button
              id="preset-login-admin"
              type="button"
              disabled={isAuthLoading}
              onClick={() => handlePresetLogin('user-admin')}
              className="p-2.5 bg-slate-900 border border-slate-800 hover:border-rose-500/30 text-right rounded-xl text-xs text-slate-300 hover:text-white transition-all flex items-center justify-between group cursor-pointer disabled:opacity-50"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                <span>{t('common.role_admin')} (ئادمین فەرمی / المسؤول)</span>
              </div>
              <span className="text-[10px] text-slate-500 group-hover:text-rose-400 font-bold">&rarr;</span>
            </button>

            {/* Staff preset */}
            <button
              id="preset-login-staff"
              type="button"
              disabled={isAuthLoading}
              onClick={() => handlePresetLogin('user-staff')}
              className="p-2.5 bg-slate-900 border border-slate-800 hover:border-amber-500/30 text-right rounded-xl text-xs text-slate-300 hover:text-white transition-all flex items-center justify-between group cursor-pointer disabled:opacity-50"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                <span>{t('common.role_staff')} (کارمەند / مساعد)</span>
              </div>
              <span className="text-[10px] text-slate-500 group-hover:text-amber-400 font-bold">&rarr;</span>
            </button>

            {/* Viewer preset */}
            <button
              id="preset-login-viewer"
              type="button"
              disabled={isAuthLoading}
              onClick={() => handlePresetLogin('user-viewer')}
              className="p-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-right rounded-xl text-xs text-slate-300 hover:text-white transition-all flex items-center justify-between group cursor-pointer disabled:opacity-50"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-slate-500"></div>
                <span>{t('common.role_viewer')} (بینەر / زائر)</span>
              </div>
              <span className="text-[10px] text-slate-500 group-hover:text-slate-300 font-bold">&rarr;</span>
            </button>
          </div>

        </div>

      </div>

      <div className="mt-6 text-slate-500 text-[10px] font-semibold text-center z-10">
        ImpactIQ — {t('login.title')} © 2026
      </div>

    </div>
  );
};
