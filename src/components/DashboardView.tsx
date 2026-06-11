import React from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  FolderGit2, 
  Users, 
  Award, 
  FileSpreadsheet, 
  AlertTriangle, 
  ArrowUpRight,
  TrendingUp,
  MapPin,
  Clock
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { projects, beneficiaries, impactLogs, reports, setActiveTab } = useApp();
  const { language, t } = useLanguage();

  // Calculations
  const totalProjects = projects.length;
  const totalBeneficiaries = beneficiaries.length;
  const totalReports = reports.length;
  
  // Calculate average impact score (scale of 1-10)
  const avgImpact = impactLogs.length > 0 
    ? (impactLogs.reduce((sum, log) => sum + log.impactScore, 0) / impactLogs.length).toFixed(1)
    : '0';

  // High risk projects
  const highRiskProjects = projects.filter(p => p.risk === 'high');
  const mediumRiskProjects = projects.filter(p => p.risk === 'medium');

  // Status breakdown
  const activeCount = projects.filter(p => p.status === 'active').length;
  const planningCount = projects.filter(p => p.status === 'planning').length;

  // Render variables depending on language
  const getWelcomeTag = () => {
    if (language === 'ar') return 'نظام العرض الرسمي — المرحلة الأولى';
    if (language === 'en') return 'Official Interactive Demo — Phase One';
    return 'سیستەمی فەرمی دیمو — قۆناغی یەکەم';
  };

  const getWelcomeDesc = () => {
    if (language === 'ar') return 'مرحباً بكم في المركز الموحد لمراقبة وتقييم الأثر للمشاريع الإنسانية والتنموية. هنا يمكنكم تتبع مشاريع تقليل هدر الطعام، وتمكين المرأة، وتعليم الشباب، ودعم الأسر الفقيرة، وحماية البيئة ببيانات دقيقة وتحليلات ذكية مستمرة.';
    if (language === 'en') return 'Welcome to the centralized monitoring hub for humanitarian and community impact. Plan and track food waste reduction, women empowerment, youth education, impoverished family support, and environmental conservation projects with real-time data and state-of-the-art AI evaluation.';
    return 'بەخێرهاتن بۆ ناوەندی چاودێری پڕۆژە نیشتمانی و مرۆییەکان. لێرەوە دەتوانن کەمکردنەوەی پاشماوەی خۆراک، بەهێزکردنی ئافرەتان، فێرکاری لاوان، پشتیوانی خێزانە هەژارەکان و پاراستنی ژینگە بە داتای ڕاستەقینە و شیکەرەوەی پێشکەوتووی ژیری دەستکردی گۆڕانکاری بسەلمێنن.';
  };

  const getVerificationText = () => {
    if (language === 'ar') return '١٠٠٪ مساعدة موثقة وموثوقة';
    if (language === 'en') return '100% Verified Assistance';
    return '%١٠٠ هاوکاری ڕێکەوتوو';
  };

  const getSubmittedText = () => {
    if (language === 'ar') return 'تم تقديمها للجهات المانحة والمشرفين';
    if (language === 'en') return 'Submitted to Donors & Board';
    return 'پێشەکەش کراو بە سەرپەرشتیار';
  };

  const getStatusLabelText = (status: string) => {
    switch (status) {
      case 'active':
        return language === 'en' ? 'Active' : language === 'ar' ? 'نشط' : 'چالاک';
      case 'planning':
        return language === 'en' ? 'Planning' : language === 'ar' ? 'تخطيط' : 'پلاندانان';
      case 'completed':
        return language === 'en' ? 'Completed' : language === 'ar' ? 'مكتمل' : 'تەواوکراو';
      default:
        return language === 'en' ? 'On Hold' : language === 'ar' ? 'متوقف مؤقتاً' : 'ڕاگیراو';
    }
  };

  const getRiskLabelText = (risk: string) => {
    switch (risk) {
      case 'high':
        return t('dashboard.risk_high');
      case 'medium':
        return t('dashboard.risk_medium');
      default:
        return t('dashboard.risk_low');
    }
  };

  const getRiskExplanation = () => {
    if (language === 'ar') return 'يتطلب اهتماماً مركزاً وإدارة مباشرة للحد من معوقات الإنجاز.';
    if (language === 'en') return 'Requires concentrated focal attention and direct oversight.';
    return 'پێویستی بە سەرنجی چڕ و بەڕێوەبردنی ڕاستەوخۆ هەیە بۆ کەمکردنەوەی بەربەستەکان.';
  };

  return (
    <div className="space-y-8 animate-fade-in font-sans">
      
      {/* Intro Welcome Banner */}
      <div className="bg-slate-900 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl shadow-slate-900/10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl -translate-x-12 -translate-y-12"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl translate-x-12 translate-y-12"></div>
        
        <div className="relative z-10 max-w-3xl text-right rtl:text-right ltr:text-left">
          <span className="bg-sky-500/20 text-sky-300 font-bold text-xs px-3 py-1 rounded-full border border-sky-400/20">
            {getWelcomeTag()}
          </span>
          <h1 className="text-xl sm:text-3xl font-extrabold mt-4 mb-2 tracking-tight leading-normal">
            {t('login.title')}
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            {getWelcomeDesc()}
          </p>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* KPI Card: Projects */}
        <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-500">{t('dashboard.stats_projects')}</span>
            <div className="p-3 bg-sky-50 rounded-xl text-sky-600">
              <FolderGit2 size={20} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-extrabold text-slate-800">{totalProjects}</h3>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500">
              <span className="text-emerald-600 font-semibold">{activeCount} {getStatusLabelText('active')}</span>
              <span>•</span>
              <span>{planningCount} {getStatusLabelText('planning')}</span>
            </div>
          </div>
        </div>

        {/* KPI Card: Beneficiaries */}
        <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-500">{t('dashboard.stats_beneficiaries')}</span>
            <div className="p-3 bg-teal-50 rounded-xl text-teal-600">
              <Users size={20} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-extrabold text-slate-800">
              {beneficiaries.reduce((sum, b) => sum + 1, 0) + projects.reduce((sum, p) => sum + p.beneficiariesCount, 0)}
            </h3>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500">
              <span className="text-teal-600 font-semibold">{getVerificationText()}</span>
            </div>
          </div>
        </div>

        {/* KPI Card: Average Impact */}
        <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-500">{t('dashboard.stats_impact')}</span>
            <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
              <Award size={20} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-extrabold text-slate-800">{avgImpact} <span className="text-xs text-slate-400">/ ١٠</span></h3>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500">
              <span className="text-indigo-600 font-bold">{language === 'en' ? 'Optimal' : language === 'ar' ? 'ممتاز جداً' : 'زۆر باش'}</span>
              <span>{language === 'en' ? 'M&E Measured' : language === 'ar' ? 'حسب القياسات' : 'لەسەر بنەمای پێشکەوتنەکان'}</span>
            </div>
          </div>
        </div>

        {/* KPI Card: Stakeholder Reports */}
        <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-500">{t('dashboard.stats_reports')}</span>
            <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
              <FileSpreadsheet size={20} />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-extrabold text-slate-800">{totalReports}</h3>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500">
              <span className="text-amber-600 font-semibold">{getSubmittedText()}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Row 2: Projects at Risk & Progress Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left / Middle: Projects List & Budget Tracker */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200/85 p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-800 text-base">{t('dashboard.progress_overview')}</h3>
                <p className="text-xs text-slate-500 mt-1">
                  {language === 'en' ? 'M&E implementation rates and estimated quarterly resource allocation' :
                   language === 'ar' ? 'معدلات التنفيذ الحالية للمشاريع والميزانية المرصودة' :
                   'ئاستی جێبەجێکردن و بودجە مەزەندەکراوەکانی قۆناغی نوێ'}
                </p>
              </div>
              <button 
                onClick={() => setActiveTab('projects')}
                className="text-xs text-sky-600 hover:text-sky-700 font-bold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>{language === 'en' ? 'View Directory' : language === 'ar' ? 'عرض الدليل' : 'بینینی هەموو پڕۆژەکان'}</span>
                <ArrowUpRight size={14} />
              </button>
            </div>

            <div className="mt-6 space-y-5">
              {projects.slice(0, 5).map((p) => (
                <div key={p.id} className="p-4 rounded-xl border border-slate-100 hover:bg-slate-50/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800 text-sm">
                        {p.name === 'کەمکردنەوەی پاشماوەی خۆراک' && language === 'en' ? 'Food Waste Reduction' : 
                         p.name === 'کەمکردنەوەی پاشماوەی خۆراک' && language === 'ar' ? 'تقليل هدر الطعام' :
                         p.name === 'توانابەخشینی ژنان' && language === 'en' ? 'Women Empowerment' :
                         p.name === 'توانابەخشینی ژنان' && language === 'ar' ? 'تمكين المرأة' :
                         p.name === 'فێرکردنی لاوان' && language === 'en' ? 'Youth Education' :
                         p.name === 'فێرکردنی لاوان' && language === 'ar' ? 'تعليم الشباب' :
                         p.name === 'پشتیوانی خێزانە هەژارەکان' && language === 'en' ? 'Impoverished Families Support' :
                         p.name === 'پشتیوانی خێزانە هەژارەکان' && language === 'ar' ? 'مساعدة الأسر المتعففة' :
                         p.name === 'پاراستنی ژینگە' && language === 'en' ? 'Environmental Conservation' :
                         p.name === 'پاراستنی ژینگە' && language === 'ar' ? 'حماية البيئة' : p.name}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                        p.status === 'active' ? 'bg-emerald-50 text-emerald-600' :
                        p.status === 'planning' ? 'bg-sky-50 text-sky-600' :
                        p.status === 'completed' ? 'bg-slate-100 text-slate-700' : 'bg-rose-50 text-rose-600'
                      }`}>
                        {getStatusLabelText(p.status)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        <span>{p.location === 'هەولێر' && language === 'en' ? 'Erbil' :
                              p.location === 'هەولێر' && language === 'ar' ? 'أربيل' :
                              p.location === 'سلێمانی' && language === 'en' ? 'Sulaymaniyah' :
                              p.location === 'سلێمانی' && language === 'ar' ? 'السليمانية' :
                              p.location === 'دهۆک' && language === 'en' ? 'Duhok' :
                              p.location === 'دهۆک' && language === 'ar' ? 'دهوك' : p.location}</span>
                      </span>
                      <span>•</span>
                      <span>{language === 'en' ? 'Budget' : language === 'ar' ? 'الميزانية' : 'بودجە'}: <strong className="text-slate-700">${p.budget.toLocaleString()}</strong></span>
                    </div>
                  </div>

                  <div className="w-full sm:w-48 space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-500">{t('dashboard.active_rate')}</span>
                      <span className="text-sky-600">{p.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          p.progress > 80 ? 'bg-emerald-500' :
                          p.progress > 50 ? 'bg-sky-500' :
                          p.progress > 20 ? 'bg-amber-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${p.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Pane: Risk Indicators and Quick actions */}
        <div className="space-y-6">
          
          {/* Risk alerts */}
          <div className="bg-white border border-slate-200/85 p-6 rounded-2xl shadow-sm">
            <h3 className="font-bold text-slate-800 text-base mb-4 flex items-center gap-2">
              <AlertTriangle className="text-rose-500" size={18} />
              <span>{t('dashboard.risk_stats')}</span>
            </h3>

            {highRiskProjects.length === 0 ? (
              <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 text-center">
                <p className="text-xs text-emerald-700 font-bold">
                  {language === 'en' ? 'All projects are within safe parameters!' :
                   language === 'ar' ? 'جميع المشاريع في نطاق الأمان!' :
                   'هیچ پڕۆژەیەک لە مەترسی بەرزدا نییە!'}
                </p>
                <p className="text-[10px] text-slate-400 mt-1">
                  {language === 'en' ? 'Continuous tracking systems are active in real-time.' :
                   language === 'ar' ? 'أنظمة الرصد والتقييم تعمل بكفاءة على مدار الساعة.' :
                   'ئیدارەدانی چاودێری سوودمەندان لە ترۆپکی سیستەم دایە.'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {highRiskProjects.map(p => (
                  <div key={p.id} className="p-3.5 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-3">
                    <div className="p-2 bg-rose-500 rounded-lg text-white mt-0.5">
                      <AlertTriangle size={14} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-rose-800">
                        {p.name === 'كەمكردنەوەی پاشماوەی خۆراك' || p.name === 'کەمکردنەوەی پاشماوەی خۆراک' ? 
                          (language === 'en' ? 'Food Waste Reduction' : language === 'ar' ? 'تقليل هدر الطعام' : p.name) : p.name}
                      </h4>
                      <p className="text-[10px] text-rose-600 mt-0.5">{getRiskExplanation()}</p>
                      <button 
                        onClick={() => setActiveTab('projects')}
                        className="text-[10px] text-rose-700 font-bold underline mt-1 block cursor-pointer"
                      >
                        {language === 'en' ? 'Review & Mitigate' : language === 'ar' ? 'مراجعة الموقف وحل المشكلة' : 'چارەسەری دۆخەکە بکە'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Medium risks list */}
            {mediumRiskProjects.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-[11px] font-bold text-slate-500 px-1">
                  {language === 'en' ? `Medium Risk Alerts (${mediumRiskProjects.length}):` :
                   language === 'ar' ? `المشاريع ذات الخطر المتوسط (${mediumRiskProjects.length}):` :
                   `پڕۆژەکان لە مەترسی مامناوەند (${mediumRiskProjects.length}):`}
                </p>
                {mediumRiskProjects.map(p => (
                  <div key={p.id} className="p-2.5 bg-amber-50/60 border border-amber-100 rounded-xl flex items-center justify-between text-xs">
                    <span className="font-semibold text-amber-800">
                      {p.name === 'کەمکردنەوەی پاشماوەی خۆراک' && language === 'en' ? 'Food Waste Reduction' : 
                       p.name === 'کەمکردنەوەی پاشماوەی خۆراک' && language === 'ar' ? 'تقليل هدر الطعام' :
                       p.name === 'توانابەخشینی ژنان' && language === 'en' ? 'Women Empowerment' :
                       p.name === 'توانابەخشینی ژنان' && language === 'ar' ? 'تمكين المرأة' :
                       p.name === 'فێرکردنی لاوان' && language === 'en' ? 'Youth Education' :
                       p.name === 'فێرکردنی لاوان' && language === 'ar' ? 'تعليم الشباب' : p.name}
                    </span>
                    <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-md font-bold">{getRiskLabelText('medium')}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick AI Assist Banner */}
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-6 rounded-2xl relative overflow-hidden shadow-md">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl"></div>
            <div className="relative z-10 text-right rtl:text-right ltr:text-left">
              <span className="bg-indigo-500/30 text-indigo-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-indigo-400/20">
                {language === 'en' ? 'AI Impact Brain' : language === 'ar' ? 'المستشار الذكي' : 'مێشکی پیشاندەر'}
              </span>
              <h4 className="font-bold text-sm mt-3">
                {language === 'en' ? 'Have questions about current project metrics?' :
                 language === 'ar' ? 'لديك استفسار حول جودة البيانات؟' :
                 'پرسیارت هەیە لە داتاکان؟'}
              </h4>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                {language === 'en' ? 'Consult our regional AI model to analyze social impact, summarize reports, or address critical risk factors instantly.' :
                 language === 'ar' ? 'استخدم المساعد الذكي لتوليد التقارير التنفيذية التلقائية وتدقيق مخاطر المحافظ الإنسانية بلغة عربية واضحة.' :
                 'بە یارمەتی یاریدەدەری زیرەکی کوردی, دەتوانیت مەترسیدارترین پڕۆژە، کاریگەری گشتی یان ڕاپۆرتی خێرا بە چرکەیەک دروست بکەیت.'}
              </p>
              <button 
                onClick={() => setActiveTab('assistant')}
                className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2 rounded-xl transition-all shadow-md shadow-indigo-800/50 flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>{language === 'en' ? 'Start Chat' : language === 'ar' ? 'اسأل المساعد' : 'بپرسە لە یاریدەدەر'}</span>
                <TrendingUp size={12} />
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Row 3: Latest Reports registered */}
      <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div>
            <h3 className="font-bold text-slate-800 text-base">{language === 'en' ? 'Latest Approved Reports' : language === 'ar' ? 'آخر التقارير الإستراتيجية الصادرة' : 'لیستی دوایین ڕاپۆرتە پەسەندکراوەکان'}</h3>
            <p className="text-xs text-slate-500 mt-1">
              {language === 'en' ? 'Official quarterly, annual, and midterm evaluation summaries ready for export' :
               language === 'ar' ? 'التقارير السنوية والربعية التي تم تدقيقها والمصادقة علیها رسمياً' :
               'ڕاپۆرتە فەرمییە وەرزی و ساڵانەکان کە ئامادەکراون بۆ کۆنترۆڵکردن'}
            </p>
          </div>
          <button 
            onClick={() => setActiveTab('reports')}
            className="text-xs text-sky-600 hover:text-sky-700 font-bold transition-colors cursor-pointer"
          >
            {language === 'en' ? 'View All Reports' : language === 'ar' ? 'عرض الكل' : 'نیشاندانی هەمووان'}
          </button>
        </div>

        {reports.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-6">{t('reports.empty_state')}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reports.map(r => {
              const connectedProj = projects.find(p => p.id === r.projectId);
              return (
                <div key={r.id} className="p-5 border border-slate-100 rounded-xl bg-slate-50/30 hover:bg-slate-50 transition-colors space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 text-sm block truncate max-w-[250px]">{r.title}</span>
                    <span className="text-[10px] uppercase bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded-md">
                      {r.reportType === 'monthly' ? t('reports.monthly') :
                       r.reportType === 'quarterly' ? t('reports.quarterly') :
                       r.reportType === 'annual' ? t('reports.annual') : t('reports.evaluation')}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed h-8">
                    {r.executiveSummary}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                    <span>{language === 'en' ? 'Project' : language === 'ar' ? 'المشروع' : 'پڕۆژە'}: <strong className="text-slate-600">
                      {connectedProj?.name === 'کەمکردنەوەی پاشماوەی خۆراک' && language === 'en' ? 'Food Waste Reduction' : 
                       connectedProj?.name === 'کەمکردنەوەی پاشماوەی خۆراک' && language === 'ar' ? 'تقليل هدر الطعام' :
                       connectedProj?.name === 'توانابەخشینی ژنان' && language === 'en' ? 'Women Empowerment' :
                       connectedProj?.name === 'توانابەخشینی ژنان' && language === 'ar' ? 'تمكين المرأة' :
                       connectedProj?.name === 'فێرکردنی لاوان' && language === 'en' ? 'Youth Education' :
                       connectedProj?.name === 'فێرکردنی لاوان' && language === 'ar' ? 'تعليم الشباب' : connectedProj?.name || 'M&E Project'}
                    </strong></span>
                    <span className="flex items-center gap-1">
                      <Clock size={11} />
                      <span>{r.createdAt}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
