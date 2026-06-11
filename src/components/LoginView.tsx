import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { 
  Mail, 
  Lock, 
  LogIn, 
  Loader2, 
  Globe, 
  ShieldCheck, 
  Sun, 
  Moon,
  TrendingUp,
  Users,
  AlertTriangle,
  Cpu,
  CheckCircle2,
  FileText,
  ArrowLeft,
  ArrowRight,
  Check,
  Award,
  Sparkles,
  FileSpreadsheet
} from 'lucide-react';

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

  const scrollToGateway = () => {
    const element = document.getElementById('gateway-portal-anchor');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // Automatically turn on login form to let users type or see easily
    setShowLoginForm(true);
  };

  const isRtl = direction === 'rtl';
  const inputPaddingClass = isRtl ? 'pl-4 pr-10' : 'pl-10 pr-4';
  const togglePlacementClass = isRtl ? 'left-4 sm:left-6' : 'right-4 sm:right-6';

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
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col items-center font-sans relative overflow-x-hidden transition-colors duration-250 ${isRtl ? 'text-right' : 'text-left'}`} style={{ direction: direction }}>
      
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

      {/* Decorative Orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-sky-500/5 dark:bg-sky-500/10 rounded-full blur-3xl -translate-x-24 -translate-y-24 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-amber-500/5 dark:bg-amber-500/5 rounded-full blur-3xl translate-x-32 pointer-events-none" />

      {/* ================= SECTION 1: HEADER & LANGUAGE GATEWAY ================= */}
      <header id="gateway-portal-anchor" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-16 flex flex-col items-center">
        
        {/* Brand visual header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles size={14} className="animate-spin" style={{ animationDuration: '3s' }} />
            <span>NGO IMPACT SECTOR STANDARD</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 tracking-tight">
            ImpactIQ
          </h1>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 px-2 leading-snug">
            {t('login.title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-350 max-w-2xl mx-auto font-medium leading-relaxed">
            {t('login.platformDesc')} ({t('login.sub_title')})
          </p>
        </div>

        {/* Wikipedia-inspired Centered Orb Layout */}
        <div className="w-full relative py-2 max-w-4xl mx-auto">
          
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
                  className={`p-4 bg-white dark:bg-slate-950 border rounded-2xl transition-all duration-300 cursor-pointer select-none outline-none group flex flex-col ${langObj.alignmentClass} ${langObj.posClass} ${
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
                        ? 'border-amber-500 shadow-md shadow-amber-500/10 bg-slate-50 dark:bg-slate-905 ring-2 ring-amber-500/35 text-slate-900 dark:text-slate-100'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="text-right flex-1 pr-3 pl-3">
                      <h4 className={`text-xs font-bold ${isActive ? 'text-amber-600 dark:text-amber-400 font-extrabold' : 'text-slate-800 dark:text-slate-100'}`}>{langObj.label}</h4>
                      <p className={`text-[10px] mt-0.5 ${isActive ? 'text-slate-705 dark:text-slate-300 font-medium' : 'text-slate-505 dark:text-slate-400'}`}>{langObj.desc}</p>
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
        <div className="w-full max-w-xl mx-auto space-y-4 mt-6">
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-stretch overflow-hidden shadow-xl p-1.5 focus-within:border-amber-500/40 focus-within:ring-1 focus-within:ring-amber-500/10 transition-all">
            
            {/* Globe Indicator with dropdown fallback */}
            <div className="flex items-center gap-2 px-3.5 border-r border-slate-200 dark:border-slate-850 text-slate-705 dark:text-slate-200 shrink-0">
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
            <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-2xl space-y-4 text-slate-805 dark:text-slate-100 text-right w-full transition-all">
              
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
                      className={`w-full bg-slate-50 dark:bg-slate-900 border border-slate-205 dark:border-slate-800 focus:border-amber-500 rounded-xl py-3 ${inputPaddingClass} text-xs font-semibold text-slate-850 dark:text-slate-105 outline-none transition-colors text-right`}
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
                      className={`w-full bg-slate-50 dark:bg-slate-900 border border-slate-205 dark:border-slate-800 focus:border-amber-500 rounded-xl py-3 ${inputPaddingClass} text-xs font-semibold text-slate-850 dark:text-slate-105 outline-none transition-colors text-right`}
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
          <div className="pt-6 border-t border-slate-200 dark:border-slate-900 space-y-4 w-full">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-400 text-center flex items-center justify-center gap-2">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span>{t('login.demo_roles')}</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Admin Sandbox Button */}
              <button
                id="preset-login-admin"
                type="button"
                disabled={isAuthLoading}
                onClick={() => handlePresetLogin('user-admin')}
                className="p-4 bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-rose-500/40 text-right rounded-2xl transition-all flex flex-col justify-between min-h-[140px] cursor-pointer group shadow-sm text-right leading-relaxed"
              >
                <div className="flex items-center gap-1.5 flex-row-reverse w-full justify-between">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50 animate-pulse"></span>
                  <span className="font-extrabold text-rose-600 dark:text-rose-400 text-[11px] sm:text-[12px]">{t('login.adminDemo')}</span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-350 leading-relaxed mt-2 text-right font-medium">
                  {language === 'ckb' ? 'دەسەڵاتی تەواوی بەڕێوەبردن، دەستکاریکردن و سڕینەوەی پڕۆژە نیشتمانییەکان، بەشداران، و نمرەی پێوراو.' :
                   language === 'ar' ? 'صلاحيات رئيسية متكاملة لتهيئة وتوثيق كشف المشاريع وتحرير سجلات الأثر.' :
                   'Full administrative control to record, modify, or erase targets, reports, and observers.'}
                </p>
                <span className="text-[10px] text-rose-500 dark:text-rose-400 group-hover:text-rose-700 dark:group-hover:text-rose-350 mt-3 self-end font-extrabold transition-colors flex items-center gap-1">
                  <span>{language === 'en' ? 'Launch Workspace' : 'چوونەژوورەوە و دەستپێک'}</span>
                  {isRtl ? <ArrowLeft size={11} /> : <ArrowRight size={11} />}
                </span>
              </button>

              {/* Staff Sandbox Button */}
              <button
                id="preset-login-staff"
                type="button"
                disabled={isAuthLoading}
                onClick={() => handlePresetLogin('user-staff')}
                className="p-4 bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900/90 border border-slate-205 dark:border-slate-800 hover:border-amber-500/40 text-right rounded-2xl transition-all flex flex-col justify-between min-h-[140px] cursor-pointer group shadow-sm text-right leading-relaxed"
              >
                <div className="flex items-center gap-1.5 flex-row-reverse w-full justify-between">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50 animate-pulse"></span>
                  <span className="font-extrabold text-amber-600 dark:text-amber-500 text-[11px] sm:text-[12px]">{t('login.staffDemo')}</span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-350 leading-relaxed mt-2 text-right font-medium">
                  {language === 'ckb' ? 'تۆمارکردنی داتا و بەڕێوەبردنی بەشداران و پێوانەکردنی بەر لە پڕۆژە و دوای پڕۆژە.' :
                   language === 'ar' ? 'صلاحيات إدخال السجلات الميدانية للمستفيدين ومراجعة اتجاه درجات التقييم.' :
                   'Standard staff operational permissions to log new beneficiary actions and input pre-post scores.'}
                </p>
                <span className="text-[10px] text-amber-600 dark:text-amber-400 group-hover:text-amber-700 dark:group-hover:text-amber-350 mt-3 self-end font-extrabold transition-colors flex items-center gap-1">
                  <span>{language === 'en' ? 'Launch Workspace' : 'چوونەژوورەوە و دەستپێک'}</span>
                  {isRtl ? <ArrowLeft size={11} /> : <ArrowRight size={11} />}
                </span>
              </button>

              {/* Viewer Sandbox Button */}
              <button
                id="preset-login-viewer"
                type="button"
                disabled={isAuthLoading}
                onClick={() => handlePresetLogin('user-viewer')}
                className="p-4 bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900/90 border border-slate-205 dark:border-slate-800 hover:border-slate-400 text-right rounded-2xl transition-all flex flex-col justify-between min-h-[140px] cursor-pointer group shadow-sm text-right leading-relaxed"
              >
                <div className="flex items-center gap-1.5 flex-row-reverse w-full justify-between">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-sm shadow-indigo-500/50"></span>
                  <span className="font-extrabold text-indigo-600 dark:text-indigo-400 text-[11px] sm:text-[12px]">{t('login.viewerDemo')}</span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-350 leading-relaxed mt-2 text-right font-medium">
                  {language === 'ckb' ? 'بینینی کارتە شیکارییەکانی پەڕەی سەرەکی، ڕاپۆرتە مۆڵەتپێدراوەکان و گفتوگۆکردنی ژیری دەستکرد.' :
                   language === 'ar' ? 'صلاحيات الاستعراض الفني للوحات الرصد وإجراء التحليل الشامل عبر المساعد الذكي.' :
                   'Read-only strategic access for auditors, global donors, and evaluation observers.'}
                </p>
                <span className="text-[10px] text-indigo-550 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-350 mt-3 self-end font-extrabold transition-colors flex items-center gap-1">
                  <span>{language === 'en' ? 'Launch Workspace' : 'چوونەژوورەوە و دەستپێک'}</span>
                  {isRtl ? <ArrowLeft size={11} /> : <ArrowRight size={11} />}
                </span>
              </button>
            </div>
          </div>

        </div>

      </header>

      {/* ================= SECTION 2: HERO VALUE & MOCKUP GRID ================= */}
      <section className="w-full bg-white dark:bg-slate-900 border-y border-slate-200/60 dark:border-slate-850/60 py-16 sm:py-24 transition-colors">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Visual SaaS Mockup */}
            <div className="order-2 lg:order-1 flex justify-center">
              <div className="w-full max-w-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden text-right">
                {/* Visual Accent glow */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-sky-500/10 rounded-full blur-xl pointer-events-none" />

                {/* Card header */}
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-6 flex-row-reverse">
                  <div className="flex items-center gap-2.5 flex-row-reverse">
                    <div className="p-2 bg-amber-500/10 text-amber-500 rounded-xl border border-amber-500/20">
                      <Award size={18} />
                    </div>
                    <div className="text-right">
                      <span className="block text-[10px] text-slate-400 dark:text-slate-500 uppercase font-mono tracking-widest leading-none">PROJECT ID: 01</span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-850 dark:text-slate-100 mt-1">
                        {language === 'ckb' ? 'کەمکردنەوەی پاشماوەی خۆراک' :
                         language === 'ar' ? 'الحد من هدر الغذاء ومساعدة العوائل' :
                         'Food Waste Reduction Initiative'}
                      </h4>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-403 dark:bg-emerald-500/20 border border-emerald-500/30 font-black px-2.5 py-1 rounded-full uppercase">
                    ACTIVE M&E
                  </span>
                </div>

                {/* Dashboard mockup core stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {/* Score */}
                  <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-850/80 rounded-2xl flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] sm:text-[11px] font-black text-slate-400 dark:text-slate-400 mb-1">
                      {t('landing.mockup_active_score')}
                    </span>
                    <div className="text-xl sm:text-2xl font-black text-amber-500">
                      8.7 <span className="text-xs text-slate-400 dark:text-slate-500">/ 10</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-850 h-1.5 rounded-full mt-2.5 overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: '87%' }}></div>
                    </div>
                  </div>

                  {/* Reach */}
                  <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-850/80 rounded-2xl flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] sm:text-[11px] font-black text-slate-400 dark:text-slate-400 mb-1">
                      {t('landing.mockup_beneficiaries_reached')}
                    </span>
                    <div className="text-xl sm:text-2xl font-black text-sky-500">
                      1,420
                    </div>
                    <span className="text-[9px] text-emerald-500 font-extrabold mt-1 block px-1.5 py-0.5 rounded-full bg-emerald-500/10 w-fit">
                      +12% {language === 'en' ? 'this month' : 'لەم مانگەدا'}
                    </span>
                  </div>
                </div>

                {/* HTML/CSS Bar chart representation */}
                <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-850/80 rounded-2xl mb-6">
                  <div className="flex items-center justify-between pb-3 flex-row-reverse">
                    <span className="text-[11px] font-extrabold text-slate-705 dark:text-slate-205">
                      {language === 'ckb' ? 'گەشەی نمرەکانی کاریگەری (تێکڕا)' :
                       language === 'ar' ? 'مؤشر تطور الأثر التراكمي' :
                       'Monthly Social Drift Index'}
                    </span>
                    <TrendingUp size={14} className="text-sky-505" />
                  </div>
                  <div className="h-20 flex items-end justify-center gap-3.5 pt-2">
                    <div className="w-full flex flex-col items-center justify-end h-full">
                      <div className="bg-slate-200 dark:bg-slate-800 w-full rounded-t-md hover:bg-slate-300 dark:hover:bg-slate-700 transition-all cursor-pointer" style={{ height: '35%' }} title="Baseline: 3.5" />
                      <span className="text-[8px] font-mono text-slate-405 mt-1 block">M1</span>
                    </div>
                    <div className="w-full flex flex-col items-center justify-end h-full">
                      <div className="bg-sky-500/50 w-full rounded-t-md hover:bg-sky-500/70 transition-all cursor-pointer" style={{ height: '58%' }} title="Midterm: 5.8" />
                      <span className="text-[8px] font-mono text-slate-405 mt-1 block">M2</span>
                    </div>
                    <div className="w-full flex flex-col items-center justify-end h-full">
                      <div className="bg-sky-500 w-full rounded-t-md hover:bg-sky-600 transition-all cursor-pointer" style={{ height: '72%' }} title="Post Result: 7.2" />
                      <span className="text-[8px] font-mono text-slate-405 mt-1 block">M3</span>
                    </div>
                    <div className="w-full flex flex-col items-center justify-end h-full">
                      <div className="bg-amber-500 w-full rounded-t-md hover:bg-amber-600 transition-all cursor-pointer animate-pulse" style={{ height: '87%' }} title="Target Achieved: 8.7" />
                      <span className="text-[8px] font-mono text-slate-405 mt-1 block font-bold text-amber-500">M4</span>
                    </div>
                  </div>
                </div>

                {/* Small report output visual */}
                <div className="p-3.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-right">
                  <div className="flex items-center gap-2 flex-row-reverse mb-1.5">
                    <FileSpreadsheet size={13} className="text-amber-500" />
                    <span className="text-[10px] font-black text-slate-705 dark:text-slate-205">{t('landing.mockup_report_preview')}</span>
                  </div>
                  <div className="space-y-1.5 text-right font-mono">
                    <div className="h-2 bg-slate-300 dark:bg-slate-800 rounded w-11/12 ml-auto" />
                    <div className="h-2 bg-slate-300 dark:bg-slate-800 rounded w-4/5 ml-auto" />
                    <div className="h-2 bg-slate-200 dark:bg-slate-800/80 rounded w-2/3 ml-auto" />
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-[9px] text-slate-400 dark:text-slate-500 flex-row-reverse font-medium">
                    <span>STATUS: SIGNED</span>
                    <span className="text-amber-500 font-bold">✓ {t('landing.mockup_assessment_verified')}</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Headline and Narrative */}
            <div className="space-y-6 lg:max-w-xl text-right ltr:text-left rtl:text-right">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 text-sky-700 dark:text-sky-300 text-xs font-bold font-mono">
                <span>01 // IMPACT DISCIPLINE</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 leading-tight">
                {t('landing.hero_title')}
              </h3>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
                {t('landing.hero_desc')}
              </p>
              
              <div className="pt-4 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                <button
                  id="hero-cta-primary"
                  onClick={scrollToGateway}
                  className="bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-black text-sm px-8 py-4 rounded-2xl transition-all shadow-lg shadow-amber-500/15 cursor-pointer text-center"
                >
                  {t('landing.primary_cta')}
                </button>
                <button
                  id="hero-cta-secondary"
                  onClick={scrollToGateway}
                  className="bg-slate-105 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-705 text-slate-800 dark:text-slate-200 border border-slate-205 dark:border-slate-700 font-bold text-sm px-6 py-4 rounded-2xl transition-all cursor-pointer text-center"
                >
                  {t('landing.secondary_cta')}
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= SECTION 3: TRUST & PROOF STRIP ================= */}
      <section className="w-full bg-slate-50 dark:bg-slate-950 py-16 transition-colors border-b border-slate-200/50 dark:border-slate-900/50">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-2 mb-12">
            <h3 className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-amber-605 dark:text-amber-500 font-mono">
              {t('landing.proof_title')}
            </h3>
            <div className="h-0.5 w-16 bg-amber-500 mx-auto rounded-full mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Proof Card 1: Faster Reporting */}
            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850/60 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <span className="text-3xl sm:text-4xl font-black text-amber-500 font-serif block mb-2 leading-none">
                {t('landing.proof_faster_reporting_val')}
              </span>
              <h4 className="font-extrabold text-sm text-slate-850 dark:text-slate-100 mb-2">
                {t('landing.proof_faster_reporting_title')}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-350 leading-relaxed font-semibold">
                {t('landing.proof_faster_reporting_desc')}
              </p>
            </div>

            {/* Proof Card 2: Pristine Beneficiary Data */}
            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850/60 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <span className="text-3xl sm:text-4xl font-black text-sky-505 font-serif block mb-2 leading-none">
                {t('landing.proof_cleaner_beneficiary_val')}
              </span>
              <h4 className="font-extrabold text-sm text-slate-850 dark:text-slate-100 mb-2">
                {t('landing.proof_cleaner_beneficiary_title')}
              </h4>
              <p className="text-xs text-slate-505 dark:text-slate-350 leading-relaxed font-semibold">
                {t('landing.proof_cleaner_beneficiary_desc')}
              </p>
            </div>

            {/* Proof Card 3: Complete Donor Visibility */}
            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850/60 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <span className="text-3xl sm:text-4xl font-black text-emerald-505 font-serif block mb-2 leading-none">
                {t('landing.proof_donor_visibility_val')}
              </span>
              <h4 className="font-extrabold text-sm text-slate-850 dark:text-slate-100 mb-2">
                {t('landing.proof_donor_visibility_title')}
              </h4>
              <p className="text-xs text-slate-505 dark:text-slate-350 leading-relaxed font-semibold">
                {t('landing.proof_donor_visibility_desc')}
              </p>
            </div>

            {/* Proof Card 4: Tangible Social Evidence */}
            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850/60 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <span className="text-3xl sm:text-4xl font-black text-rose-505 font-serif block mb-2 leading-none">
                {t('landing.proof_evidence_val')}
              </span>
              <h4 className="font-extrabold text-sm text-slate-850 dark:text-slate-100 mb-2">
                {t('landing.proof_evidence_title')}
              </h4>
              <p className="text-xs text-slate-505 dark:text-slate-350 leading-relaxed font-semibold">
                {t('landing.proof_evidence_desc')}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= SECTION 4: PROBLEM STATEMENT ================= */}
      <section className="w-full bg-slate-50 dark:bg-slate-950 py-16 sm:py-24 transition-colors border-b border-slate-200/50 dark:border-slate-900/40">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-amber-500 font-extrabold text-xs uppercase tracking-widest block font-mono">
              [ THE CHALLENGE IN THE FIELD ]
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100">
              {t('landing.problem_title')}
            </h3>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-semibold max-w-2xl mx-auto leading-relaxed">
              {t('landing.problem_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Problem 1: Scattered files */}
            <div className="flex items-start gap-4 flex-row-reverse text-right ltr:text-left rtl:text-right ltr:flex-row">
              <div className="p-3 bg-rose-500/10 text-rose-500 rounded-xl shrink-0 border border-rose-500/20">
                <AlertTriangle size={20} />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-base text-slate-850 dark:text-slate-100">
                  {t('landing.problem_excel')}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 leading-relaxed font-medium">
                  {t('landing.problem_excel_desc')}
                </p>
              </div>
            </div>

            {/* Problem 2: Delayed reports */}
            <div className="flex items-start gap-4 flex-row-reverse text-right ltr:text-left rtl:text-right ltr:flex-row">
              <div className="p-3 bg-rose-500/10 text-rose-500 rounded-xl shrink-0 border border-rose-500/20">
                <AlertTriangle size={20} />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-base text-slate-850 dark:text-slate-100">
                  {t('landing.problem_delayed_reports')}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 leading-relaxed font-medium">
                  {t('landing.problem_delayed_reports_desc')}
                </p>
              </div>
            </div>

            {/* Problem 3: Weak beneficiary mapping */}
            <div className="flex items-start gap-4 flex-row-reverse text-right ltr:text-left rtl:text-right ltr:flex-row">
              <div className="p-3 bg-rose-500/10 text-rose-500 rounded-xl shrink-0 border border-rose-500/20">
                <Users size={20} />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-base text-slate-850 dark:text-slate-100">
                  {t('landing.problem_weak_beneficiary')}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 leading-relaxed font-medium">
                  {t('landing.problem_weak_beneficiary_desc')}
                </p>
              </div>
            </div>

            {/* Problem 4: Delayed outcomes */}
            <div className="flex items-start gap-4 flex-row-reverse text-right ltr:text-left rtl:text-right ltr:flex-row">
              <div className="p-3 bg-rose-500/10 text-rose-500 rounded-xl shrink-0 border border-rose-500/20">
                <TrendingUp size={20} />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-base text-slate-850 dark:text-slate-100">
                  {t('landing.problem_unclear_outcomes')}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 leading-relaxed font-medium">
                  {t('landing.problem_unclear_outcomes_desc')}
                </p>
              </div>
            </div>

            {/* Problem 5: Donor pressure */}
            <div className="flex items-start gap-4 flex-row-reverse text-right ltr:text-left rtl:text-right ltr:flex-row md:col-span-2 max-w-2xl mx-auto mt-2">
              <div className="p-3 bg-rose-500/10 text-rose-500 rounded-xl shrink-0 border border-rose-500/20">
                <FileText size={20} />
              </div>
              <div className="space-y-1">
                <h4 className="font-extrabold text-base text-slate-850 dark:text-slate-100">
                  {t('landing.problem_donor_pressure')}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 leading-relaxed font-medium">
                  {t('landing.problem_donor_pressure_desc')}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= SECTION 5: SOLUTION PLATFORM ================= */}
      <section className="w-full bg-white dark:bg-slate-900 py-16 sm:py-24 transition-colors">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-sky-505 dark:text-sky-400 font-extrabold text-xs uppercase tracking-widest block font-mono">
              [ ONE CENTRAL SYSTEM OF RECORD ]
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100">
              {t('landing.solution_title')}
            </h3>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-semibold max-w-2xl mx-auto leading-relaxed">
              {t('landing.solution_subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Sol 1: One platform */}
            <div className="p-6 bg-slate-55/40 dark:bg-slate-950 border border-slate-205 dark:border-slate-800 rounded-2xl hover:border-amber-500/40 transition-colors space-y-3 block text-right ltr:text-left rtl:text-right">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20">
                <CheckCircle2 size={18} />
              </div>
              <h4 className="font-extrabold text-base text-slate-850 dark:text-slate-100">
                {t('landing.solution_one_platform')}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 leading-relaxed font-medium">
                {t('landing.solution_one_platform_desc')}
              </p>
            </div>

            {/* Sol 2: AI assistant */}
            <div className="p-6 bg-slate-55/40 dark:bg-slate-950 border border-slate-205 dark:border-slate-800 rounded-2xl hover:border-amber-500/40 transition-colors space-y-3 block text-right ltr:text-left rtl:text-right">
              <div className="w-10 h-10 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center border border-sky-500/20">
                <Sparkles size={18} />
              </div>
              <h4 className="font-extrabold text-base text-slate-850 dark:text-slate-100">
                {t('landing.solution_ai')}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 leading-relaxed font-medium">
                {t('landing.solution_ai_desc')}
              </p>
            </div>

            {/* Sol 3: Donor ready reports */}
            <div className="p-6 bg-slate-55/40 dark:bg-slate-950 border border-slate-205 dark:border-slate-800 rounded-2xl hover:border-amber-500/40 transition-colors space-y-3 block text-right ltr:text-left rtl:text-right">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
                <FileSpreadsheet size={18} />
              </div>
              <h4 className="font-extrabold text-base text-slate-850 dark:text-slate-100">
                {t('landing.solution_donor_ready')}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 leading-relaxed font-medium">
                {t('landing.solution_donor_ready_desc')}
              </p>
            </div>

            {/* Sol 4: Trilingual */}
            <div className="p-6 bg-slate-55/40 dark:bg-slate-950 border border-slate-205 dark:border-slate-800 rounded-2xl hover:border-amber-500/40 transition-colors space-y-3 block text-right ltr:text-left rtl:text-right">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center border border-indigo-500/20">
                <Globe size={18} />
              </div>
              <h4 className="font-extrabold text-base text-slate-850 dark:text-slate-100">
                {t('landing.solution_multilingual')}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 leading-relaxed font-medium">
                {t('landing.solution_multilingual_desc')}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= SECTION 6: FINAL CALL TO ACTION ================= */}
      <section className="w-full bg-amber-500 text-slate-950 py-16 sm:py-20 transition-colors">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h3 className="text-3xl sm:text-5xl font-black tracking-tight leading-none">
            {t('landing.final_cta_title')}
          </h3>
          <p className="text-sm sm:text-base text-slate-900 font-bold max-w-2xl mx-auto leading-relaxed">
            {t('landing.final_cta_subtitle')}
          </p>
          
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              id="final-cta-primary"
              onClick={scrollToGateway}
              className="w-full sm:w-auto bg-slate-950 hover:bg-slate-900 text-white font-black text-sm px-10 py-5 rounded-2xl shadow-xl transition-all cursor-pointer select-none"
            >
              {t('landing.final_cta_primary')}
            </button>
            <button
              id="final-cta-secondary"
              onClick={scrollToGateway}
              className="w-full sm:w-auto bg-amber-600/20 hover:bg-amber-600/35 text-slate-950 border border-slate-950/20 font-black text-sm px-8 py-5 rounded-2xl transition-all cursor-pointer select-none"
            >
              {t('landing.final_cta_secondary')}
            </button>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="w-full text-center py-8 border-t border-slate-200 dark:border-slate-850/60 bg-white dark:bg-slate-955 text-slate-500 dark:text-slate-400 text-[11px] font-mono tracking-wider transition-colors uppercase">
        IMPACTIQ SYSTEM © 2026 • OFFICIAL TRILINGUAL MONITORING PLATFORM • ALL RIGHTS RESERVED
      </footer>

    </div>
  );
};
