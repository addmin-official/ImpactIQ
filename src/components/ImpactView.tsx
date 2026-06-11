import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { ImpactLog } from '../types';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  TrendingUp, 
  Settings, 
  X, 
  Award, 
  CheckCircle, 
  Activity,
  Lightbulb,
  FileSpreadsheet
} from 'lucide-react';

export const ImpactView: React.FC = () => {
  const { 
    impactLogs, 
    projects, 
    addImpactLog, 
    updateImpactLog, 
    deleteImpactLog, 
    canWrite, 
    canDelete 
  } = useApp();

  const { language, t, direction } = useLanguage();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedLog, setSelectedLog] = useState<ImpactLog | null>(null);

  // Form Fields
  const [projectId, setProjectId] = useState('');
  const [target, setTarget] = useState('');
  const [preProjectResult, setPreProjectResult] = useState('');
  const [postProjectResult, setPostProjectResult] = useState('');
  const [percentageChange, setPercentageChange] = useState(0);
  const [impactScore, setImpactScore] = useState(5);
  const [notes, setNotes] = useState('');

  const [errorMsg, setErrorMsg] = useState('');

  // Calculations for dashboard inside the page
  const averageImpactScore = impactLogs.length > 0 
    ? (impactLogs.reduce((sum, l) => sum + l.impactScore, 0) / impactLogs.length).toFixed(1)
    : '0';

  const highImpactCount = impactLogs.filter(l => l.impactScore >= 8.5).length;

  const openAddModal = () => {
    if (!canWrite()) return;
    setIsEditing(false);
    setErrorMsg('');
    setProjectId(projects[0]?.id || '');
    
    // Choose sensible default localized texts
    const defaultTarget = language === 'en' ? 'Employability Optimization Rate' : language === 'ar' ? 'مستويات تعزيز الاكتفاء الذاتي والتأهيل' : 'کەمکردنەوەی بێکاری یان گەشەدانی تواناکان';
    const defaultPre = language === 'en' ? 'No access to verified vocational instruction assets' : language === 'ar' ? 'انعدام مصادر تملك مهارات مهنية حقيقية مدرة للدخل' : 'هیچ هاوکارییەک یان ئاشنایەک نەبوو';
    const defaultPost = language === 'en' ? 'Secured verified jobs and sustainable micro-ventures' : language === 'ar' ? 'تسهيل الحصول على وظائف مستقرة ومشاريع ريادية صغيرة' : 'دابینکردنی توانست و داهات بە ڕێژەی سەرنجڕاکێش';
    const defaultNotes = language === 'en' ? 'Evaluation metrics compiled by regional field inspectors.' : language === 'ar' ? 'تم استخلاص المؤشرات بناءً على زيارات مسح المسكن الميدانية.' : 'ئەم نمرەیە لەسەر بنەمای زانیاری گوزەرانی مەیدانی نووسراوە.';

    setTarget(defaultTarget);
    setPreProjectResult(defaultPre);
    setPostProjectResult(defaultPost);
    setPercentageChange(50);
    setImpactScore(8);
    setNotes(defaultNotes);
    setIsModalOpen(true);
  };

  const openEditModal = (log: ImpactLog) => {
    if (!canWrite()) return;
    setIsEditing(true);
    setErrorMsg('');
    setSelectedLog(log);
    setProjectId(log.projectId);
    setTarget(log.target);
    setPreProjectResult(log.preProjectResult);
    setPostProjectResult(log.postProjectResult);
    setPercentageChange(log.percentageChange);
    setImpactScore(log.impactScore);
    setNotes(log.notes);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!projectId || !target || !preProjectResult || !postProjectResult || !notes) {
      setErrorMsg(
        language === 'en' ? 'Please fill out all required fields.' :
        language === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة لضمان احتساب الأثر.' :
        'تکایە هەموو خانە سورەکان یان پێویستەکان بە کوردی پڕبکەرەوە.'
      );
      return;
    }

    if (impactScore < 1 || impactScore > 10) {
      setErrorMsg(
        language === 'en' ? 'Impact score must be between 1 and 10.' :
        language === 'ar' ? 'يجب أن تكون علامة الأثر بحدود من 1 إلى 10 درجات.' :
        'نمرەی کاریگەری دەبێت لە نێوان ١ تا ١٠ بێت.'
      );
      return;
    }

    if (isEditing && selectedLog) {
      const success = updateImpactLog({
        id: selectedLog.id,
        projectId,
        target,
        preProjectResult,
        postProjectResult,
        percentageChange: Number(percentageChange),
        impactScore: Number(impactScore),
        notes
      });
      if (success) {
        setIsModalOpen(false);
      } else {
        setErrorMsg(t('common.error_occurred'));
      }
    } else {
      const success = addImpactLog({
        projectId,
        target,
        preProjectResult,
        postProjectResult,
        percentageChange: Number(percentageChange),
        impactScore: Number(impactScore),
        notes
      });
      if (success) {
        setIsModalOpen(false);
      } else {
        setErrorMsg(t('common.error_occurred'));
      }
    }
  };

  const handleDelete = (id: string) => {
    const confirmMsg = language === 'en'
      ? 'Are you sure you want to permanently delete this impact measurement log?'
      : language === 'ar'
      ? 'هل أنت متأكد من مسح مؤشر الأثر هذا نهائياً من السجلات؟'
      : 'ئایا دڵنیایت لە ڕەشکردنەوەی یەکجاری ئەم فۆڕمەی کاریگەری؟';

    if (confirm(confirmMsg)) {
      deleteImpactLog(id);
    }
  };

  // Localized texts
  const getSubtitle = () => {
    if (language === 'en') return 'Compare baseline situations, set targets, social progress rates, and impact scores.';
    if (language === 'ar') return 'رصد مقارنات الأثر، الأرقام الأساسية، نسب التحسين المستدام، ودرجة الفائدة العامة.';
    return 'تۆمار، گۆڕانکاری، نۆتی شیکاری و نمرەی گشتگیری کاریگەری رێکخراوەیی';
  };

  const getMetricTitle = () => language === 'en' ? 'Official General Score' : language === 'ar' ? 'المعدل العام للأثر' : 'تێکڕای فەرمی';
  const getMetricDesc = () => {
    if (language === 'en') return 'Overall confidence of monitored social change variables across the platform.';
    if (language === 'ar') return 'نسبة كفاءة برامج المساعدة في تلبية وتحسين جودة المعيشة.';
    return 'نمرەی دڵنیایی پێوەرەکان لە ژێر گۆڕانکاری باشی کۆمەڵایەتیدا.';
  };

  const getHighImpactTitle = () => {
    if (language === 'en') return 'High-Impact Initiatives';
    if (language === 'ar') return 'مبادرات فاعلة ذات أثر مرتفع';
    return 'پڕۆژەکانی خاوەن گۆڕانکاری بەرز';
  };

  const getHighImpactSub = () => {
    if (language === 'en') return 'Monitored projects scoring above 8.5/10 scale target.';
    if (language === 'ar') return 'تم تقييمها بأكثر من 8.5/10 درجات في الجدوى التنموية.';
    return 'ئەوانەی نمرەی کاریگەرییان زیاترە لە ٨.٥ لەسەر دە کلوتی پێوانە.';
  };

  const getSuggestionsTitle = () => {
    if (language === 'en') return 'Actionable Recommendations';
    if (language === 'ar') return 'المقترحات الميدانية المعتمدة';
    return 'پێشنیارە بەردەستەکان بۆ چاکسازی';
  };

  const getSuggestionsSub = () => {
    if (language === 'en') return 'Remarks and corrective directions verified by regional field supervisors.';
    if (language === 'ar') return 'سجل بمحاضر التحسينات المكتوبة للتعديل والتطوير في الدورات المقبلة.';
    return 'ژمارەی زانیاری لۆگ زیاترە بۆ باشترکردنی ئاستی چاکسازی و بژێوی خێزانەکان.';
  };

  const getLogSectionTitle = () => {
    if (language === 'en') return 'Verified Impact Indicators & Trajectory Log';
    if (language === 'ar') return 'سجل مؤشرات الأثر المخطط والمنجز للتنمية الإنسانية';
    return 'تۆمارە فەرمییەکانی کاریگەری و شیبونەوەی چاڵاکی';
  };

  const getLabelPre = () => {
    if (language === 'en') return 'Pre-Project Baseline Situation:';
    if (language === 'ar') return 'وضعية الفئة قبل البرنامج (خط الأساس):';
    return 'ئەنجامی پێش پڕۆژە (داتا یان بارودۆخ):';
  };

  const getLabelPost = () => {
    if (language === 'en') return 'Post-Project Verified Outcome:';
    if (language === 'ar') return 'مخرجات الأثر المرصودة والموثقة:';
    return 'ئەنجامی دوای پڕۆژە (بە فەرمی جێبەجێکراو):';
  };

  const getLabelRemarks = () => {
    if (language === 'en') return 'Field assessment & evaluation comments:';
    if (language === 'ar') return 'توصيات وملاحظات التقييم الميدانية:';
    return 'پێشنیار و نۆتی هەڵسەنگاندن لە گۆڕەپان:';
  };

  const getReadOnlyLabel = () => language === 'en' ? 'Viewer' : language === 'ar' ? 'عرض فقط' : 'بینەر';

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Intro section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-right rtl:text-right ltr:text-left">
          <h3 className="font-extrabold text-slate-800 text-lg">{t('impact.title')}</h3>
          <p className="text-xs text-slate-500 mt-1">{getSubtitle()}</p>
        </div>
        {canWrite() && (
          <button
            id="btn-add-impact"
            onClick={openAddModal}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-4 py-2.5 rounded-xl transition-all shadow-md shadow-indigo-600/10 cursor-pointer"
          >
            <Plus size={16} />
            <span>{t('impact.add')}</span>
          </button>
        )}
      </div>

      {/* Statistics and impact indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Metric card */}
        <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white p-6 rounded-2xl shadow-sm relative overflow-hidden text-right rtl:text-right ltr:text-left">
          <div className="absolute top-0 left-0 w-20 h-20 bg-indigo-500/10 rounded-full blur-xl"></div>
          <span className="text-indigo-300 font-bold text-[10px] uppercase tracking-wider block">{getMetricTitle()}</span>
          <h4 className="text-3xl font-black mt-2 text-indigo-100">{averageImpactScore} <span className="text-xs text-indigo-400">/ ١٠</span></h4>
          <p className="text-xs text-slate-300 mt-2">{getMetricDesc()}</p>
        </div>

        {/* High impact category counter */}
        <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm flex flex-col justify-between text-right rtl:text-right ltr:text-left">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 block">{getHighImpactTitle()}</span>
            <span className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
              <CheckCircle size={14} />
            </span>
          </div>
          <div className="mt-3">
            <h4 className="text-2xl font-extrabold text-slate-800">
              {highImpactCount} {language === 'en' ? 'Projects' : language === 'ar' ? 'مشاريع متميزة' : 'پڕۆژە'}
            </h4>
            <p className="text-[10px] text-slate-400 mt-1">{getHighImpactSub()}</p>
          </div>
        </div>

        {/* Suggestion & recommendations counts info */}
        <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm flex flex-col justify-between text-right rtl:text-right ltr:text-left">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 block">{getSuggestionsTitle()}</span>
            <span className="p-2 bg-amber-50 rounded-lg text-amber-600">
              <Lightbulb size={14} />
            </span>
          </div>
          <div className="mt-3 font-medium">
            <h4 className="text-xs font-bold text-slate-800">
              {language === 'en' ? 'Continuous Watch' : language === 'ar' ? 'إجراءات مستمرة' : 'چاودێری بەردەوام'}
            </h4>
            <p className="text-[10px] text-slate-400 mt-1">
              {getSuggestionsSub()}
            </p>
          </div>
        </div>

      </div>

      {/* Logs interactive display system */}
      <div className="space-y-4">
        <h4 className="font-bold text-slate-800 text-sm px-1 text-right rtl:text-right ltr:text-left">
          {getLogSectionTitle()}
        </h4>
        
        {impactLogs.length === 0 ? (
          <div className="p-12 text-center bg-white border border-slate-200/80 rounded-2xl text-slate-400 text-xs">
            {t('impact.empty_state')}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 text-right rtl:text-right ltr:text-left">
            {impactLogs.map((log) => {
              const proj = projects.find(p => p.id === log.projectId);
              return (
                <div key={log.id} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all space-y-4">
                  {/* Title and control */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-xs font-extrabold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full inline-block">
                        {proj ? 
                          (proj.name === 'کەمکردنەوەی پاشماوەی خۆراک' && language === 'en' ? 'Food Waste Reduction' : 
                           proj.name === 'کەمکردنەوەی پاشماوەی خۆراک' && language === 'ar' ? 'تقليل هدر الطعام' :
                           proj.name === 'توانابەخشینی ژنان' && language === 'en' ? 'Women Empowerment' :
                           proj.name === 'توانابەخشینی ژنان' && language === 'ar' ? 'تمكين المرأة' :
                           proj.name === 'فێرکردنی لاوان' && language === 'en' ? 'Youth Education' :
                           proj.name === 'فێرکردنی لاوان' && language === 'ar' ? 'تعليم الشباب' : proj.name)
                          : 'M&E Project'}
                      </span>
                      <h4 className="font-bold text-slate-800 text-sm mt-2">{log.target}</h4>
                    </div>

                    <div className="flex items-center gap-3 justify-end rtl:justify-end ltr:justify-start">
                      {/* Rating visual circle */}
                      <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 py-1 px-2.5 rounded-lg text-xs font-bold text-slate-700">
                        <span>{language === 'en' ? 'Impact Score:' : language === 'ar' ? 'علامة الأثر اجتماعی:' : 'نمرەی کاریگەری:'}</span>
                        <span className="text-indigo-600">{log.impactScore} / ١٠</span>
                      </div>

                      {canWrite() && (
                        <button
                          onClick={() => openEditModal(log)}
                          className="p-1.5 text-slate-500 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors cursor-pointer"
                          title={language === 'en' ? 'Edit' : language === 'ar' ? 'تعديل السجل' : 'دەستکاری'}
                        >
                          <Edit3 size={14} />
                        </button>
                      )}
                      {canDelete() && (
                        <button
                          onClick={() => handleDelete(log.id)}
                          className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title={language === 'en' ? 'Delete' : language === 'ar' ? 'حذف من السجل' : 'سڕینەوە'}
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Comparisons: Pre vs Post */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    <div className="p-4 bg-slate-50 rounded-xl space-y-1 text-right rtl:text-right ltr:text-left">
                      <span className="text-[10px] text-slate-400 font-bold block">{getLabelPre()}</span>
                      <p className="text-xs text-slate-700 font-medium leading-relaxed">
                        {log.preProjectResult === 'هیچ هاوکارییەک یان ئاشنایەک نەبوو' && language === 'en' ? 'No continuous access to nutritional support networks' :
                         log.preProjectResult === 'هیچ هاوکارییەک یان ئاشنایەک نەبوو' && language === 'ar' ? 'انعدام الدعم التمويني والتدريب المهني الملائم' : log.preProjectResult}
                      </p>
                    </div>

                    <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl space-y-1 text-right rtl:text-right ltr:text-left">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-emerald-600 font-bold block">{getLabelPost()}</span>
                        {log.percentageChange > 0 && (
                          <span className="text-[10px] font-extrabold text-emerald-600">+{log.percentageChange}% {language === 'en' ? 'Gain' : language === 'ar' ? 'نسبة نمو' : 'گۆڕانکاری'}</span>
                        )}
                      </div>
                      <p className="text-xs text-slate-700 font-bold leading-relaxed">
                        {log.postProjectResult === 'دابینکردنی توانست و داهات بە ڕێژەی سەرنجڕاکێش' && language === 'en' ? 'Acquired micro-ventures capital and sustained income assets' :
                         log.postProjectResult === 'دابینکردنی توانست و داهات بە ڕێژەی سەرنجڕاکێش' && language === 'ar' ? 'تدبير رواتب ومداخيل مستقرة لنحو 35 أسرة متعففة' : log.postProjectResult}
                      </p>
                    </div>

                  </div>

                  {/* Operational Notes / Suggestions */}
                  <div className="p-4 bg-amber-50/50 border border-amber-100 rounded-xl flex items-start gap-2.5">
                    <Lightbulb size={16} className="text-amber-600 shrink-0 mt-0.5" />
                    <div className="space-y-1 text-right rtl:text-right ltr:text-left">
                      <span className="text-[10px] font-bold text-amber-800 block">{getLabelRemarks()}</span>
                      <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                        {log.notes === 'ئەم نمرەیە لەسەر بنەمای زانیاری گوزەرانی مەیدانی نووسراوە.' && language === 'en' ? 'Verification verified under supervised field checks.' :
                         log.notes === 'ئەم نمرەیە لەسەر بنەمای زانیاری گوزەرانی مەیدانی نووسراوە.' && language === 'ar' ? 'تمت مطابقة نتائج الاستبيان مع السير الميداني للمشرف.' : log.notes}
                      </p>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* CRUD Impact Log Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-40">
          <div className="bg-white rounded-2xl w-full max-w-xl border border-slate-200 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div className="text-right rtl:text-right ltr:text-left">
                <h4 className="font-bold text-base">{isEditing ? t('impact.edit') : t('impact.add')}</h4>
                <p className="text-[11px] text-slate-300 mt-1">
                  {language === 'en' ? 'Please establish baseline metrics before formulating outcome results.' :
                   language === 'ar' ? 'يرجى تقديم بيانات تم مسحها لخط الأساس والخط البعدي للمشروع التنموي.' :
                   'تکایە بەراوردکارییەکی دروست لێرەدا نیشان بدە'}
                </p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-200 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-4 text-right rtl:text-right ltr:text-left">
              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 text-xs rounded-xl font-semibold">
                  {errorMsg}
                </div>
              )}

              {/* Connected Project */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 block">{language === 'en' ? 'Associated Project' : language === 'ar' ? 'ارتباط بالمشروع الإنساني المنسق' : 'بەستنەوە بە پڕۆژەی جێبەجێکراو'} <span className="text-rose-500">*</span></label>
                <select
                  required
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-indigo-500 transition-colors font-medium text-slate-800 cursor-pointer"
                >
                  <option value="" disabled>{t('impact.select_project')}</option>
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name === 'کەمکردنەوەی پاشماوەی خۆراک' && language === 'en' ? 'Food Waste Reduction' : 
                       p.name === 'کەمکردنەوەی پاشماوەی خۆراک' && language === 'ar' ? 'تقليل هدر الطعام' :
                       p.name === 'توانابەخشینی ژنان' && language === 'en' ? 'Women Empowerment' :
                       p.name === 'توانابەخشینی ژنان' && language === 'ar' ? 'تمكين المرأة' :
                       p.name === 'فێرکردنی لاوان' && language === 'en' ? 'Youth Education' :
                       p.name === 'فێرکردنی لاوان' && language === 'ar' ? 'تعليم الشباب' : p.name} ({p.location})
                    </option>
                  ))}
                </select>
              </div>

              {/* Target Area of Impact */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 block">{t('impact.target')} <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder={language === 'en' ? 'Measured Indicator' : language === 'ar' ? 'مؤشر الأثر المراد قياسه' : 'بۆ نموونە: کەمکردنەوەی پاشماوەی خۆراک لە هەولێر...'}
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-indigo-500 transition-colors font-medium text-slate-800"
                />
              </div>

              {/* Grid pre vs post */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-right rtl:text-right ltr:text-left">
                
                {/* Pre result */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 block">{t('impact.pre_result')} <span className="text-rose-500">*</span></label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Baseline indicators..."
                    value={preProjectResult}
                    onChange={(e) => setPreProjectResult(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-indigo-500 transition-colors font-medium text-slate-800"
                  />
                </div>

                {/* Post result */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 block">{t('impact.post_result')} <span className="text-rose-500">*</span></label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Post-Project outcome result metrics..."
                    value={postProjectResult}
                    onChange={(e) => setPostProjectResult(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-indigo-500 transition-colors font-medium text-slate-800"
                  />
                </div>

              </div>

              {/* Percentage Change & Impact rating */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Percentage */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 block">{t('impact.change')}</label>
                  <input
                    type="number"
                    min={0}
                    value={percentageChange}
                    onChange={(e) => setPercentageChange(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-indigo-500 transition-colors font-medium text-slate-800"
                  />
                </div>

                {/* Score */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 block">{t('impact.score')}</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    step={0.5}
                    value={impactScore}
                    onChange={(e) => setImpactScore(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-indigo-500 transition-colors font-medium text-slate-800"
                  />
                </div>

              </div>

              {/* Assessment field Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 block">{t('impact.notes')} <span className="text-rose-500">*</span></label>
                <textarea
                  required
                  rows={2}
                  placeholder="..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-indigo-500 transition-colors font-medium text-slate-800"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3 font-sans">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  {t('common.cancel')}
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors shadow-md shadow-indigo-600/10 cursor-pointer"
                >
                  {isEditing ? t('common.save') : t('common.add')}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
