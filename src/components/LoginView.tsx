import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { Mail, Lock, LogIn, Loader2, Globe, ShieldCheck, Sun, Moon } from 'lucide-react';

interface LoginViewProps {
  onLoginSuccess: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  const { switchUser, loginWithEmail, isAuthLoading } = useApp();
  const { language, setLanguage, direction, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false);

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

  const handleLangSelect = (code: 'ckb' | 'ar' | 'en') => {
    setLanguage(code);
  };

  const inputPaddingClass = direction === 'rtl' ? 'pl-4 pr-10' : 'pl-10 pr-4';
  const togglePlacementClass = direction === 'rtl' ? 'left-4 sm:left-6' : 'right-4 sm:right-6';

  const languagesConfig = [
    {
      code: 'ckb' as const,
      label: 'کوردی',
      nativeLabel: 'Sorani',
      desc: 'مێشکی زیرەکی پێوانەکردنی کاریگەری',
      posClass: 'md:absolute md:left-2 md:top-1/2 md:-translate-y-1/2 md:w-56',
      alignmentClass: 'text-right rtl:text-right ltr:text-left',
    },
    {
      code: 'ar' as const,
      label: 'العربية',
      nativeLabel: 'العربية',
      desc: 'منصة ذكية لقياس أثر المشاريع',
      posClass: 'md:absolute md:right-2 md:top-1/2 md:-translate-y-1/2 md:w-56',
      alignmentClass: 'text-right rtl:text-right ltr:text-left',
    },
    {
      code: 'en' as const,
      label: 'English',
      nativeLabel: 'English',
      desc: 'AI-powered project impact intelligence',
      posClass: 'md:absolute md:bottom-2 md:left-1/2 md:-translate-x-1/2 md:w-60',
      alignmentClass: 'text-left ltr:text-left rtl:text-right',
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col justify-between items-center p-4 sm:p-8 font-sans relative overflow-x-hidden text-right rtl:text-right ltr:text-left transition-colors duration-250">
      
      {/* Trilingual Accessible Theme Toggle button */}
      <div className={`absolute top-4 ${togglePlacementClass} z-25`}>
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? t('common.theme_light') : t('common.theme_dark')}
          className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100/50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-black transition-all shadow-md cursor-pointer select-none active:scale-95 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
        >
          {theme === 'dark' ? (
            <>
              <Sun size={13} className="text-amber-500 animate-spin" style={{ animationDuration: '10s' }} />
              <span>{t('common.theme_light')}</span>
            </>
          ) : (
            <>
              <Moon size={13} className="text-indigo-600" />
              <span>{t('common.theme_dark')}</span>
            </>
          )}
        </button>
      </div>

      {/* Background gradients */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl -translate-x-12 -translate-y-12"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl translate-x-12 translate-y-12"></div>

      {/* Empty Top Spacing to center content vertically */}
      <div className="hidden sm:block h-6"></div>

      {/* Main Container Wrapper */}
      <div className="w-full max-w-4xl z-10 my-auto flex flex-col items-center justify-center space-y-6">
        
        {/* Brand visual header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 tracking-tight">
            ImpactIQ
          </h1>
          <h2 className="text-sm sm:text-base font-semibold text-slate-850 dark:text-slate-100 px-2 leading-relaxed">
            {t('login.title')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 block px-2 leading-relaxed max-w-md mx-auto font-medium">
            {t('login.platformDesc')}
          </p>
        </div>

        {/* Wikipedia-inspired Centered Orb Layout */}
        <div className="w-full relative py-2">
          
          {/* DESKTOP VIEW: Orbit structure around central emblem */}
          <div className="relative w-full max-w-2xl h-80 hidden md:block mx-auto">
            
            {/* Center verification radar logo */}
            <div className="md:absolute md:inset-0 md:m-auto md:w-44 md:h-44 flex items-center justify-center z-10 select-none">
              <div className="absolute w-40 h-40 border-2 border-dashed border-amber-500/20 rounded-full animate-spin" style={{ animationDuration: '40s' }} />
              <div className="absolute w-32 h-32 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/95 rounded-full flex flex-col items-center justify-center p-3 shadow-2xl">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 flex items-center justify-center border border-amber-500/30 text-amber-500 shadow-inner">
                  <ShieldCheck size={26} className="text-amber-500 animate-pulse" />
                </div>
                <span className="text-[10px] mt-2 tracking-widest font-extrabold font-mono text-slate-500 dark:text-slate-400">IMPACT NETWORK</span>
              </div>
            </div>

            {/* Language Orbit Cards representing Kurdish, Arabic, and English */}
            {languagesConfig.map((langObj) => {
              const isActive = language === langObj.code;
              return (
                <button
                  type="button"
                  key={langObj.code}
                  onClick={() => handleLangSelect(langObj.code)}
                  className={`p-4 bg-white dark:bg-slate-950 border text-right rounded-2xl transition-all duration-300 cursor-pointer select-none outline-none group flex flex-col ${langObj.alignmentClass} ${langObj.posClass} ${
                    isActive
                      ? 'border-amber-500 shadow-xl shadow-amber-500/20 scale-102 bg-white dark:bg-slate-900 z-20 ring-2 ring-amber-500/35 text-slate-950 dark:text-slate-100'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-800 dark:hover:text-slate-100 z-10'
                  }`}
                >
                  <div className="flex items-center gap-2 flex-wrap justify-between w-full">
                    <span className={`text-[10px] sm:text-xs font-bold font-mono px-2 py-0.5 rounded ${
                      isActive ? 'bg-amber-500/10 dark:bg-amber-500/25 text-amber-600 dark:text-amber-300 border border-amber-500/30 dark:border-amber-500/40' : 'bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-405 group-hover:bg-slate-200/50 dark:group-hover:text-slate-205'
                    }`}>
                      {langObj.nativeLabel}
                    </span>
                    <span className={`text-sm font-black ${isActive ? 'text-amber-600 dark:text-amber-400' : 'text-slate-800 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-300'}`}>{langObj.label}</span>
                  </div>
                  <p className={`text-[11px] mt-2 leading-relaxed leading-snug w-full ${
                    isActive ? 'text-slate-800 dark:text-slate-100 font-semibold' : 'text-slate-500 dark:text-slate-300 group-hover:text-slate-700 dark:group-hover:text-slate-200'
                  }`}>
                    {langObj.desc}
                  </p>
                </button>
              );
            })}
          </div>

          {/* MOBILE VIEW: Stacked layout for responsive compatibility */}
          <div className="flex flex-col md:hidden w-full space-y-3 px-2 z-10">
            {/* Minimalist central emblem on mobile */}
            <div className="flex items-center justify-center py-2">
              <div className="w-20 h-20 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center bg-white dark:bg-slate-950 relative z-10 shadow-xl">
                <div className="absolute inset-0 border border-dashed border-amber-500/20 rounded-full animate-spin" style={{ animationDuration: '24s' }} />
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-full flex items-center justify-center text-amber-500">
                  <ShieldCheck size={20} className="animate-pulse" />
                </div>
              </div>
            </div>

            {/* List of 3 stacked selection cards */}
            <div className="grid grid-cols-1 gap-2">
              {languagesConfig.map((langObj) => {
                const isActive = language === langObj.code;
                return (
                  <button
                    type="button"
                    key={langObj.code}
                    onClick={() => handleLangSelect(langObj.code)}
                    className={`p-3.5 bg-white dark:bg-slate-950 border rounded-xl transition-all duration-150 cursor-pointer text-right group flex items-center justify-between w-full ${
                      isActive
                        ? 'border-amber-500 shadow-md shadow-amber-500/10 bg-slate-50 dark:bg-slate-900 ring-2 ring-amber-500/35 text-slate-900 dark:text-slate-100'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="text-right flex-1 pr-3 pl-3">
                      <h4 className={`text-xs font-bold ${isActive ? 'text-amber-600 dark:text-amber-400 font-extrabold' : 'text-slate-800 dark:text-slate-100'}`}>{langObj.label}</h4>
                      <p className={`text-[10px] mt-0.5 ${isActive ? 'text-slate-700 dark:text-slate-300 font-medium' : 'text-slate-500 dark:text-slate-400'}`}>{langObj.desc}</p>
                    </div>
                    <span className={`text-[10px] font-bold font-mono px-2 py-1 rounded shrink-0 ${
                      isActive ? 'bg-amber-500/10 dark:bg-amber-500/25 text-amber-600 dark:text-amber-300 border border-amber-500/35' : 'bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400'
                    }`}>
                      {langObj.nativeLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Wikipedia style Search/Action Gateway Bar */}
        <div className="w-full max-w-xl mx-auto space-y-4 animate-fade-in">
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-stretch overflow-hidden shadow-xl p-1.5 focus-within:border-amber-500/40 focus-within:ring-1 focus-within:ring-amber-500/10 transition-all">
            
            {/* Globe Indicator with dropdown fallback */}
            <div className="flex items-center gap-2 px-3.5 border-r border-slate-200 dark:border-slate-800 text-slate-705 dark:text-slate-200 shrink-0">
              <Globe size={14} className="text-amber-500 animate-spin" style={{ animationDuration: '10s' }} />
              <span className="text-[10.5px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-150 font-mono">{language.toUpperCase()}</span>
            </div>

            {/* Active Tagline representing language confirmation */}
            <div className="flex-1 flex items-center px-4 overflow-hidden">
              <span className="text-[11px] font-extrabold text-slate-705 dark:text-slate-150 truncate text-right w-full">
                {language === 'ckb' ? 'زمانی کار: زمانی کوردی' :
                 language === 'ar' ? 'لغة العمل: اللغة العربية' :
                 'Active focus: English Language'}
              </span>
            </div>

            {/* Wikipedia-style transition action button */}
            <button
              id="btn-gateway-continue"
              onClick={() => setShowLoginForm(!showLoginForm)}
              className="bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-black text-xs px-5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shrink-0 cursor-pointer shadow-md shadow-amber-500/15"
            >
              <span>{showLoginForm ? t('common.close') : t('login.continue')}</span>
              <LogIn size={13} />
            </button>
          </div>

          {/* Credentials Standard Custom Form (Collapsible slide-down panel) */}
          {showLoginForm && (
            <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-2xl space-y-4 text-slate-800 dark:text-slate-100 text-right animate-fade-in w-full transition-all">
              
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5 flex-row-reverse">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-850 dark:text-slate-100">
                  {language === 'ckb' ? 'گەیشتن بە ئیمەیڵ و وشەی نهێنی' :
                   language === 'ar' ? 'تسجيل دخول كلاسيكي مخصص' :
                   'Standard Core Authentication'}
                </h3>
                <span className="text-[9px] bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-305 border border-amber-500/20 dark:border-amber-500/30 font-extrabold px-2 py-0.5 rounded uppercase">
                  {language === 'en' ? 'NGO Portal' : 'پۆرتال'}
                </span>
              </div>

              {validationError && (
                <div className="p-3 bg-rose-500/10 dark:bg-rose-500/20 border border-rose-500/20 dark:border-rose-500/30 text-rose-700 dark:text-rose-200 text-[11px] rounded-xl font-bold text-center">
                  {validationError}
                </div>
              )}

              <form onSubmit={handleCustomLoginSubmit} className="space-y-4 text-right">
                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-750 dark:text-slate-200 block text-right">{t('login.email')}</label>
                  <div className="relative">
                    <input
                      id="login-email"
                      type="email"
                      placeholder="address@ngo.org"
                      value={email}
                      disabled={isAuthLoading}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-amber-500 rounded-xl py-3 ${inputPaddingClass} text-xs font-semibold text-slate-850 dark:text-slate-105 outline-none transition-colors text-right`}
                      required
                    />
                  </div>
                </div>

                {/* Password field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-750 dark:text-slate-200 block text-right">{t('login.password')}</label>
                  <div className="relative">
                    <input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      disabled={isAuthLoading}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-amber-500 rounded-xl py-3 ${inputPaddingClass} text-xs font-semibold text-slate-850 dark:text-slate-105 outline-none transition-colors text-right`}
                    />
                  </div>
                </div>

                <button
                  id="btn-login"
                  type="submit"
                  disabled={isAuthLoading}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl transition-all shadow-md shadow-amber-550/10 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
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
            </div>
          )}

          {/* Sandbox fast-connector buttons (Compact role-based access visual) */}
          <div className="pt-5 border-t border-slate-205 dark:border-slate-800 space-y-3.5 w-full">
            <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-350 text-center">
              {language === 'ckb' ? 'دەستپێکردنی خێرا لە ڕێگەی دیمۆکانەوە' :
               language === 'ar' ? 'الدخول التجريبي المباشر بالفئات' :
               'NGO DEMO SANDBOX PRESETS'}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Admin Sandbox Button */}
              <button
                id="preset-login-admin"
                type="button"
                disabled={isAuthLoading}
                onClick={() => handlePresetLogin('user-admin')}
                className="p-3.5 bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-rose-500/40 text-right rounded-2xl transition-all flex flex-col justify-between h-28 cursor-pointer group text-right shadow-md"
              >
                <div className="flex items-center gap-1.5 flex-row-reverse w-full justify-between">
                  <span className="w-2 h-2 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50 animate-pulse"></span>
                  <span className="font-extrabold text-rose-600 dark:text-rose-400 text-[10.5px] sm:text-[11.5px]">{t('login.adminDemo')}</span>
                </div>
                <p className="text-[10px] text-slate-600 dark:text-slate-200 leading-snug mt-1.5 text-right font-medium">
                  {language === 'ckb' ? 'دەسەڵاتی تەواوی بەڕێوەبردن، دەستکاریکردن و سڕینەوە' :
                   language === 'ar' ? 'صلاحيات رئيسية متكاملة للمشاريع والتحرير' :
                   'Full administration control over datasets'}
                </p>
                <span className="text-[10px] text-rose-500 dark:text-rose-400 group-hover:text-rose-700 dark:group-hover:text-rose-350 mt-2 self-end font-bold transition-colors">&larr; {language === 'en' ? 'Enter Admin' : 'چوونەژوورەوە'}</span>
              </button>

              {/* Staff Sandbox Button */}
              <button
                id="preset-login-staff"
                type="button"
                disabled={isAuthLoading}
                onClick={() => handlePresetLogin('user-staff')}
                className="p-3.5 bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-amber-500/40 text-right rounded-2xl transition-all flex flex-col justify-between h-28 cursor-pointer group text-right shadow-md"
              >
                <div className="flex items-center gap-1.5 flex-row-reverse w-full justify-between">
                  <span className="w-2 h-2 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50 animate-pulse"></span>
                  <span className="font-extrabold text-amber-600 dark:text-amber-500 text-[10.5px] sm:text-[11.5px]">{t('login.staffDemo')}</span>
                </div>
                <p className="text-[10px] text-slate-600 dark:text-slate-200 leading-snug mt-1.5 text-right font-medium">
                  {language === 'ckb' ? 'دەسەڵاتی مامناوەند بۆ زیادکردنی داتا و ڕاپۆرت' :
                   language === 'ar' ? 'إدخال وتحديث بيانات المؤشرات والمستفيدين' :
                   'Intermediate staff logs management'}
                </p>
                <span className="text-[10px] text-amber-600 dark:text-amber-400 group-hover:text-amber-700 dark:group-hover:text-amber-350 mt-2 self-end font-bold transition-colors">&larr; {language === 'en' ? 'Enter Staff' : 'چوونەژوورەوە'}</span>
              </button>

              {/* Viewer Sandbox Button */}
              <button
                id="preset-login-viewer"
                type="button"
                disabled={isAuthLoading}
                onClick={() => handlePresetLogin('user-viewer')}
                className="p-3.5 bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-slate-400 text-right rounded-2xl transition-all flex flex-col justify-between h-28 cursor-pointer group text-right shadow-md"
              >
                <div className="flex items-center gap-1.5 flex-row-reverse w-full justify-between">
                  <span className="w-2 h-2 rounded-full bg-slate-400 shadow-sm shadow-slate-400/50"></span>
                  <span className="font-extrabold text-slate-600 dark:text-slate-350 text-[10.5px] sm:text-[11.5px]">{t('login.viewerDemo')}</span>
                </div>
                <p className="text-[10px] text-slate-600 dark:text-slate-300 leading-snug mt-1.5 text-right font-medium">
                  {language === 'ckb' ? 'بینینی گشتی ڕاپۆرتەکان و کاریگەری بێ پێداچوونەوە' :
                   language === 'ar' ? 'متابعة وقراءة لوحات القياس واستخراج التقارير' :
                   'Read-only visualization of metrics'}
                </p>
                <span className="text-[10px] text-slate-500 dark:text-slate-200 group-hover:text-slate-700 dark:group-hover:text-amber-350 mt-2 self-end font-bold transition-colors">&larr; {language === 'en' ? 'Enter Observer' : 'چوونەژوورەوە'}</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Footer copyright */}
      <footer className="w-full text-center py-4 border-t border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-450 text-[10.5px] font-mono tracking-wider mt-12 z-10 uppercase">
        IMPACTIQ SYSTEM © 2026 • LANGUAGE VERIFIED SECURE GATEWAY
      </footer>

    </div>
  );
};
