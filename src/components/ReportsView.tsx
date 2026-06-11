import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { Report, ReportType } from '../types';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Printer, 
  FileSpreadsheet, 
  Download, 
  Settings, 
  X, 
  Award,
  Globe,
  Share2,
  FileSignature
} from 'lucide-react';

export const ReportsView: React.FC = () => {
  const { 
    reports, 
    projects, 
    addReport, 
    updateReport, 
    deleteReport, 
    canWrite, 
    canDelete 
  } = useApp();

  const { language, t, direction } = useLanguage();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [printTargetReport, setPrintTargetReport] = useState<Report | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [reportType, setReportType] = useState<ReportType>('evaluation');
  const [projectId, setProjectId] = useState('');
  const [executiveSummary, setExecutiveSummary] = useState('');
  const [results, setResults] = useState('');
  const [impactDescription, setImpactDescription] = useState('');
  const [recommendations, setRecommendations] = useState('');

  const [errorMsg, setErrorMsg] = useState('');

  const openAddModal = () => {
    if (!canWrite()) return;
    setIsEditing(false);
    setErrorMsg('');
    
    // Choose sensible default localized texts
    const defaultTitle = language === 'en' ? 'Comprehensive Impact Evaluation Report' : language === 'ar' ? 'التقرير الشامل لتقييم كفاءة الأثر الاجتماعي' : 'ڕاپۆرتی گشتگیری هەڵسەنگاندنی نوێ';
    const defaultSummary = language === 'en' ? 'Over the monitored framework, the intervention programs successfully optimized community safety and professional livelihood tracks...' : language === 'ar' ? 'التحليل التنموي أظهر نجاح برامج المساعدة في مسارات الدعم التمويني والتدريب المهني المشترك للأسر المتعففة...' : 'لەماوەی دیاریکراودا پڕۆژەکە خرایە ژێر ڕیزبەندی چاکسازی مەیدانی و دابینکردنی توانا...';
    const defaultResults = language === 'en' ? 'Sustained micro-ventures assets, vocational knowledge acquisition, and optimized household capital indexes.' : language === 'ar' ? 'تدشين مشاريع متناهية الصغر، تأهيل كفاءات، وتقليل مستويات الإنفاق الخارجي.' : 'دروستکردنی پیشەی نوێ بۆ ژماریەکی دیاریکراو لە ئافرەتان و کەمکردنەوەی جێگیری خەرجی خێزانەکان.';
    const defaultImpact = language === 'en' ? 'Promoted inclusive social empowerment, resilience metrics, and verified regional confidence profiles.' : language === 'ar' ? 'إيجاد قنوات ثقة متبادلة، رفع معايير الجدوى المعيشية، ونسب تملك المقومات المستدامة.' : 'بەدەستهێنانی متمانە و ڕاپەڕاندنی ژانی کارپێکردن بە شێوازی مۆدێرن و ڕێکوپێک.';
    const defaultRecommendations = language === 'en' ? 'We recommend allocating an additional 25% budget to technology and digital literacy programs for the next cycle.' : language === 'ar' ? 'نوصي بزيادة ميزانية التأهيل المهني والتحول الرقمي بنسبة 25٪ في الدورات المقبلة.' : 'پێشنیار دەکەین بۆ قۆناغی دووەم بودجەی تەکنەلۆژیا بە ڕێژەی %٢٥ بەرزبکرێتەوە.';

    setTitle(defaultTitle);
    setReportType('evaluation');
    setProjectId(projects[0]?.id || '');
    setExecutiveSummary(defaultSummary);
    setResults(defaultResults);
    setImpactDescription(defaultImpact);
    setRecommendations(defaultRecommendations);
    setIsModalOpen(true);
  };

  const openEditModal = (r: Report) => {
    if (!canWrite()) return;
    setIsEditing(true);
    setErrorMsg('');
    setSelectedReport(r);
    setTitle(r.title);
    setReportType(r.reportType);
    setProjectId(r.projectId);
    setExecutiveSummary(r.executiveSummary);
    setResults(r.results);
    setImpactDescription(r.impactDescription);
    setRecommendations(r.recommendations);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!title || !projectId || !executiveSummary || !results || !impactDescription || !recommendations) {
      setErrorMsg(
        language === 'en' ? 'Please fill out all required fields.' :
        language === 'ar' ? 'يرجى ملء جميع بنود التقرير بشكل متكامل للمراجعة.' :
        'تکایە سەرجەم بڕگە پێویستەکانی ڕاپۆرت بنووسە بە سووێنی پێویست.'
      );
      return;
    }

    if (isEditing && selectedReport) {
      const success = updateReport({
        id: selectedReport.id,
        title,
        reportType,
        projectId,
        executiveSummary,
        results,
        impactDescription,
        recommendations,
        createdAt: selectedReport.createdAt
      });
      if (success) {
        setIsModalOpen(false);
      } else {
        setErrorMsg(t('common.error_occurred'));
      }
    } else {
      const success = addReport({
        title,
        reportType,
        projectId,
        executiveSummary,
        results,
        impactDescription,
        recommendations,
        createdAt: new Date().toISOString().split('T')[0]
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
      ? 'Are you sure you want to permanently delete this report?'
      : language === 'ar'
      ? 'هل أنت متأكد من حذف هذا التقرير رسمياً؟'
      : 'ئایا دڵنیایت کە دەتەوێت ئەم ڕاپۆرتە بە فەرمی بسڕیتەوە؟';

    if (confirm(confirmMsg)) {
      deleteReport(id);
    }
  };

  // Plain-text downloader
  const downloadAsTextFile = (report: Report) => {
    const connectedProj = projects.find(p => p.id === report.projectId);
    const content = `
=============================================
${language === 'en' ? 'Official M&E Report - ImpactIQ Platform' : language === 'ar' ? 'التقرير التقييمي المعتمد - مێشکی زیرەک' : 'ڕاپۆرتی فەرمی هەڵسەنگاندن و پێوانەی کاریگەری پڕۆژە دیموکان'}
=============================================
${language === 'en' ? 'Report Title:' : language === 'ar' ? 'عنوان التقرير:' : 'ناونیشانی ڕاپۆرت:'} ${report.title}
${language === 'en' ? 'Report Type:' : language === 'ar' ? 'نوع التقرير:' : 'جۆری ڕاپۆرت:'} ${report.reportType}
${language === 'en' ? 'Associated Initiative:' : language === 'ar' ? 'المبادرة المرتبطة:' : 'پڕۆژەی بەستراو:'} ${connectedProj?.name || 'M&E Project'}
${language === 'en' ? 'Submission Date:' : language === 'ar' ? 'تاريخ التوثيق:' : 'بەرواری ڕاستکردنی ڕاپۆرت:'} ${report.createdAt}
---------------------------------------------
1. ${language === 'en' ? 'Executive Summary:' : language === 'ar' ? 'الملخص التنفيذي والسياق العام:' : 'کورتەی گشتی جێبەجێکردن:'}
${report.executiveSummary}

2. ${language === 'en' ? 'Direct Outcomes:' : language === 'ar' ? 'النتائج والمخرجات الملموسة:' : 'ئەنجامە ڕاستەوخۆکان:'}
${report.results}

3. ${language === 'en' ? 'Community Impact:' : language === 'ar' ? 'مستويات الأثر الاجتماعي والتمكين:' : 'کاریگەرییە گوزەراوەکان لەسەر کۆمەڵگا:'}
${report.impactDescription}

4. ${language === 'en' ? 'Sustained Recommendations:' : language === 'ar' ? 'التوصيات وإجراءات التحسين المقترحة:' : 'ڕاسپاردە و پێشنیاری بۆ نوێخوازی پڕۆژەی داهاتوو:'}
${report.recommendations}
---------------------------------------------
Generated by ImpactIQ Smart Platform.
    `;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${report.title.replace(/\s+/g, '_')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Localized texts
  const getSubHeaderDesc = () => {
    if (language === 'en') return 'Formulate, endorse, download, or compile certified impact evaluation reports.';
    if (language === 'ar') return 'تصنيف وصياغة التقارير التشغيلية المعتمدة لتقديمها مباشرة للشركاء والممولين.';
    return 'ئامادەکاری، پەسەندکردن، هەناردە یان چاپکردنی ڕاپۆرتە فەرمییەکان بە زمانی کوردی سۆرانی';
  };

  const getReportTypeLabel = (type: string) => {
    switch (type) {
      case 'monthly': return language === 'en' ? 'Monthly Progress' : language === 'ar' ? 'تقرير شهري' : 'ڕاپۆرتی مانگانە';
      case 'quarterly': return language === 'en' ? 'Quarterly Evaluation' : language === 'ar' ? 'تقرير ربع سنوي' : 'ڕاپۆرتی وەرزی';
      case 'annual': return language === 'en' ? 'Annual Strategy' : language === 'ar' ? 'التقرير السنوي الشامل' : 'ڕاپۆرتی ساڵانە';
      default: return language === 'en' ? 'Impact Evaluation' : language === 'ar' ? 'تقييم الأثر النهائي' : 'ڕاپۆرتی هەڵسەنگاندنی کاریگەری';
    }
  };

  const getConnectedProjText = () => language === 'en' ? 'Associated Initiative' : language === 'ar' ? 'المبادرة المرتبطة' : 'پڕۆژەی بەستراو';
  const getReadLabel = () => language === 'en' ? 'Created On:' : language === 'ar' ? 'تاريخ المراجعة:' : 'بەروار:';

  // Printable Area Localized Strings
  const getPrintHeading1 = () => language === 'en' ? 'National M&E Center for Social Development' : language === 'ar' ? 'المركز الوطني لرصد وتقييم الأثر التنموي' : 'مەڵبەندی نیشتمانی بۆ چاودێری و هەڵسەنگاندن';
  const getPrintHeading2 = () => {
    if (language === 'en') return 'State Commission for Quality and Project Impact Verification';
    if (language === 'ar') return 'ديوان الرقابة والتدقيق المستقل لأداء المشاريع الإنسانية والتمكين';
    return 'سازمان پێوانەکردنی کاریگەری پڕۆژە نیشتمانی و مرۆییەکان';
  };
  const getPrintSerialPrefix = () => language === 'en' ? 'Official Dossier Code: MNE-2026-0987' : language === 'ar' ? 'الرقم الإشاري المعتمد: MNE-2026-0987' : 'ژمارەی فەرمی: MNE-2026-0987';
  const getPrintDossierType = () => language === 'en' ? 'CERTIFIED EVALUATION DOSSIER - LEVEL A' : language === 'ar' ? 'وثيقة تقييم الجدوى والأثر الإنساني - مستوى أ' : 'بەڵگەنامەی فەرمی هەڵسەنگاندنی پێشکەوتن و کاریگەری';
  const getPrintDateLabel = () => language === 'en' ? 'Submission date:' : language === 'ar' ? 'تاريخ التحرير الموثق:' : 'بەرواری پێشکەشکردن:';
  
  const getPrintSealLabel = () => language === 'en' ? 'OFFICIAL SEAL' : language === 'ar' ? 'مهر الديوان المعتمد' : 'مۆری فەرمی';
  const getPrintSignatory1 = () => language === 'en' ? 'Lead M&E Field Inspector' : language === 'ar' ? 'مفتش قياس الأثر والرقابة الميداني' : 'کارمەندی باڵای چاودێری';
  const getPrintSealText = () => language === 'en' ? 'APPROVED SEAL' : language === 'ar' ? 'رسمي معتمد' : 'مۆر فەرمی';

  const getFieldConnected = () => language === 'en' ? 'Project connect' : language === 'ar' ? 'برمجة المشروع' : 'بۆ چ پڕۆژەیەک بڕواندرێت';
  const getFieldConnectedLabel = () => language === 'en' ? 'Report formulation type' : language === 'ar' ? 'تصنيف وثيقة التقرير' : 'جۆری زمان یان بەش';

  const getReadOnlyLabel = () => language === 'en' ? 'Viewer Mode' : language === 'ar' ? 'صلاحية مشاهدة' : 'بینەر';

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-right rtl:text-right ltr:text-left">
          <h3 className="font-extrabold text-slate-800 text-lg">{t('reports.title')}</h3>
          <p className="text-xs text-slate-500 mt-1">{getSubHeaderDesc()}</p>
        </div>
        {canWrite() && (
          <button
            id="btn-add-report"
            onClick={openAddModal}
            className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm px-4 py-2.5 rounded-xl transition-all shadow-md shadow-amber-600/10 cursor-pointer"
          >
            <Plus size={16} />
            <span>{t('reports.add')}</span>
          </button>
        )}
      </div>

      {/* Reports Listing cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-right rtl:text-right ltr:text-left">
        {reports.length === 0 ? (
          <div className="lg:col-span-2 p-12 text-center bg-white border border-slate-200/80 rounded-2xl text-slate-400 text-xs">
            {t('reports.empty_state')}
          </div>
        ) : (
          reports.map((report) => {
            const proj = projects.find(p => p.id === report.projectId);
            return (
              <div key={report.id} className="bg-white border border-slate-200/85 p-6 rounded-2xl shadow-xs space-y-4 hover:shadow-md transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  {/* Title and Badging */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-right rtl:text-right ltr:text-left">
                      <span className="text-[10px] bg-amber-50 text-amber-600 border border-amber-100 font-extrabold px-2 py-0.5 rounded-md leading-normal inline-block">
                        {getReportTypeLabel(report.reportType)}
                      </span>
                      <h4 className="font-bold text-slate-800 text-base mt-2 leading-snug">{report.title}</h4>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {canWrite() && (
                        <button
                          onClick={() => openEditModal(report)}
                          className="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors cursor-pointer"
                          title={language === 'en' ? 'Edit' : language === 'ar' ? 'تعديل التقرير' : 'دەستکاری'}
                        >
                          <Edit3 size={14} />
                        </button>
                      )}
                      {canDelete() && (
                        <button
                          onClick={() => handleDelete(report.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-55 rounded-lg transition-colors cursor-pointer"
                          title={language === 'en' ? 'Delete' : 'حذف'}
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Connected Details info */}
                  <p className="text-[11px] text-slate-400">
                    {getConnectedProjText()}: <strong className="text-slate-600 font-bold">
                      {proj ? 
                        (proj.name === 'کەمکردنەوەی پاشماوەی خۆراک' && language === 'en' ? 'Food Waste Reduction' : 
                         proj.name === 'کەمکردنەوەی پاشماوەی خۆراک' && language === 'ar' ? 'تقليل هدر الطعام' :
                         proj.name === 'توانابەخشینی ژنان' && language === 'en' ? 'Women Empowerment' :
                         proj.name === 'توانابەخشینی ژنان' && language === 'ar' ? 'تمكين المرأة' :
                         proj.name === 'فێرکردنی لاوان' && language === 'en' ? 'Youth Education' :
                         proj.name === 'فێرکردنی لاوان' && language === 'ar' ? 'تعليم الشباب' : proj.name)
                        : 'M&E Project'}
                    </strong>
                  </p>

                  {/* Summary Snippet */}
                  <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 block">{t('reports.executive_summary')}:</span>
                    <p className="text-xs text-slate-705 font-medium leading-relaxed line-clamp-2">{report.executiveSummary}</p>
                  </div>

                  {/* Detailed Accordion results previews */}
                  <div className="text-xs space-y-2 text-slate-700">
                    <div>
                      <strong className="text-slate-500 block text-[10px]">{t('reports.impact_description')}:</strong>
                      <p className="line-clamp-1">{report.impactDescription}</p>
                    </div>
                    <div className="pt-1">
                      <strong className="text-slate-500 block text-[10px]">{t('reports.recommendations')}:</strong>
                      <p className="line-clamp-1 font-semibold text-sky-700">{report.recommendations}</p>
                    </div>
                  </div>
                </div>

                {/* Print and Export Buttons footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span>{getReadLabel()} {report.createdAt}</span>
                  <div className="flex items-center gap-2">
                    
                    {/* Plain Text Download */}
                    <button
                      onClick={() => downloadAsTextFile(report)}
                      className="inline-flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1.5 rounded-lg font-bold transition-colors cursor-pointer"
                      title={language === 'en' ? 'Download report as text' : 'داگرتن'}
                    >
                      <Download size={13} />
                      <span>{t('reports.download')}</span>
                    </button>

                    {/* Official printable modal activation */}
                    <button
                      onClick={() => setPrintTargetReport(report)}
                      className="inline-flex items-center gap-1 bg-amber-600 hover:bg-amber-750 text-white px-2.5 py-1.5 rounded-lg font-bold transition-all shadow-sm cursor-pointer"
                    >
                      <Printer size={13} />
                      <span>{t('reports.print')}</span>
                    </button>

                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Printable Stylized Document Overlay (Official Print simulation) */}
      {printTargetReport && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-3xl border border-slate-350 overflow-hidden shadow-2xl flex flex-col my-8">
            
            {/* Overlay Header action bar */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between shrink-0 no-print">
              <div className="text-right rtl:text-right ltr:text-left">
                <span className="text-[10px] bg-sky-500/20 text-sky-300 font-bold px-2 py-0.5 rounded">
                  {language === 'en' ? 'Official Certified Print Layout' : language === 'ar' ? 'تنسيق الطباعة الرسمي المعتمد' : 'شیکردنەوەی چاپی ئامادەکراو'}
                </span>
                <h4 className="font-bold text-xs mt-1">{language === 'en' ? 'Platform Security Verification Assessment' : 'ڕاپۆرتی فەرمی متمانەپێکراو'}</h4>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer animate-pulse"
                >
                  <Printer size={14} />
                  <span>{language === 'en' ? 'Print Document' : language === 'ar' ? 'اطبع الآن' : 'چاپ بکە'}</span>
                </button>
                <button
                  onClick={() => setPrintTargetReport(null)}
                  className="p-1 px-2.5 bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                >
                  {language === 'en' ? 'Close' : 'داخستن'}
                </button>
              </div>
            </div>

            {/* Printable Area - styled explicitly with standard letterhead template */}
            <div id="printable-area" className="p-10 bg-white text-slate-900 font-sans space-y-6 flex-1 overflow-y-auto selection:bg-amber-200 text-right rtl:text-right ltr:text-left">
              
              {/* Official Document Letterhead */}
              <div className="border-b-4 border-double border-slate-800 pb-6 flex items-center justify-between flex-row-reverse">
                <div className="space-y-1 text-right">
                  <h1 className="text-lg font-black text-slate-900">{getPrintHeading1()}</h1>
                  <p className="text-xs text-slate-500 font-bold">{getPrintHeading2()}</p>
                  <p className="text-[10px] text-slate-400">{getPrintSerialPrefix()}</p>
                </div>
                <div className="text-left space-y-1 font-mono text-[10px]">
                  <p>{language === 'en' ? 'Regional Administration' : 'تۆماری فەرمی کوردستان'}</p>
                  <p>EVAL-PDF-SECURED</p>
                  <p>{getPrintDateLabel()} {printTargetReport.createdAt}</p>
                </div>
              </div>

              {/* Stamp and QR Code decorative */}
              <div className="text-center font-bold text-sm py-2.5 bg-slate-100 rounded-xl">
                <span>{getPrintDossierType()}</span>
              </div>

              {/* Title & Metadata fields */}
              <div className="space-y-2 border-r-4 border-indigo-500 pr-4 text-right">
                <h2 className="text-base font-black text-slate-800">{language === 'en' ? 'Report Title' : 'ناونیشانی ڕاپۆرت'}: {printTargetReport.title}</h2>
                <div className="grid grid-cols-2 gap-4 text-xs font-medium text-slate-600">
                  <p>{language === 'en' ? 'Type:' : 'جۆری بەڵگە:'} <strong className="font-black text-slate-800">{printTargetReport.reportType.toUpperCase()}</strong></p>
                  <p>{getConnectedProjText()}: <strong className="font-bold text-slate-800">
                    {projects.find(p => p.id === printTargetReport.projectId)?.name || 'M&E Project'}
                  </strong></p>
                </div>
              </div>

              {/* Main Content blocks */}
              <div className="space-y-5 text-xs leading-relaxed text-slate-800">
                
                {/* 1. Executive Summary */}
                <div className="space-y-1">
                  <h3 className="font-extrabold text-slate-900 text-sm border-b border-slate-200 pb-1">{t('reports.executive_summary')}:</h3>
                  <p className="text-justify font-medium">{printTargetReport.executiveSummary}</p>
                </div>

                {/* 2. Results */}
                <div className="space-y-1">
                  <h3 className="font-extrabold text-slate-900 text-sm border-b border-slate-200 pb-1">{t('reports.results')}:</h3>
                  <p className="text-justify font-medium">{printTargetReport.results}</p>
                </div>

                {/* 3. Impact */}
                <div className="space-y-1">
                  <h3 className="font-extrabold text-slate-900 text-sm border-b border-slate-200 pb-1">{t('reports.impact_description')}:</h3>
                  <p className="text-justify font-medium">{printTargetReport.impactDescription}</p>
                </div>

                {/* 4. Recommendations */}
                <div className="space-y-1">
                  <h3 className="font-extrabold text-slate-900 text-sm border-b border-slate-200 pb-1">{t('reports.recommendations')}:</h3>
                  <p className="text-justify font-extrabold text-indigo-900">{printTargetReport.recommendations}</p>
                </div>

              </div>

              {/* Signatures & Seal Section */}
              <div className="pt-8 flex items-center justify-between text-xs border-t border-slate-200/80 mt-10">
                <div className="text-center space-y-1">
                  <p className="font-bold text-slate-400">{getPrintSerialPrefix()}</p>
                  <p className="font-black text-slate-800">{getPrintSignatory1()}</p>
                  <div className="h-10 w-24 mx-auto border border-dashed border-slate-305 rounded-lg flex items-center justify-center text-[9px] text-slate-400 mt-2">
                    <FileSignature size={20} className="text-slate-400 opacity-60" />
                  </div>
                </div>

                <div className="text-center space-y-1">
                  <p className="font-bold text-slate-400">{getPrintSealLabel()}</p>
                  <p className="font-black text-slate-850">{language === 'en' ? 'Seal validation' : 'پەسەندکردنی کۆتایی'}</p>
                  <div className="h-12 w-14 mx-auto border-2 border-double border-indigo-400 rounded-full flex items-center justify-center text-[8px] font-black text-indigo-500 uppercase rotate-12 mt-2">
                    {getPrintSealText()}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* CRUD Form Modal draft */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-40">
          <div className="bg-white rounded-2xl w-full max-w-xl border border-slate-200 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between text-right">
              <div className="text-right rtl:text-right ltr:text-left">
                <h4 className="font-bold text-base">{isEditing ? t('reports.edit') : t('reports.add')}</h4>
                <p className="text-[11px] text-slate-300 mt-1">
                  {language === 'en' ? 'Ensure structural outcomes correspond with registered donor goals.' :
                   language === 'ar' ? 'يرجى تقديم بيانات متوزانة للمجلس لتدقيق الكفاءة والأداء التنموي.' :
                   'تکایە بەشەکانی ڕاپۆرتەکە بە کوردی متمانەپێکراو بنووسە'}
                </p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-200 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-4 text-right rtl:text-right ltr:text-left">
              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 text-xs rounded-xl font-semibold">
                  {errorMsg}
                </div>
              )}

              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 block">{language === 'en' ? 'Document title' : 'ناونیشانی فەرمی ڕاپۆرت'} <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder={language === 'en' ? 'e.g. Project Evaluation report' : 'بۆ نموونە: ڕاپۆرتی وەرزی یەکەمی ژینگە...'}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-amber-500 transition-colors font-medium text-slate-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Connected Project selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 block">{getFieldConnected()} <span className="text-rose-500">*</span></label>
                  <select
                    required
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-amber-500 transition-colors font-medium text-slate-800 cursor-pointer"
                  >
                    <option value="" disabled>{language === 'en' ? 'Choose project option' : 'پڕۆژەکە بەستنەوە بکە'}</option>
                    {projects.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name === 'کەمکردنەوەی پاشماوەی خۆراک' && language === 'en' ? 'Food Waste Reduction' : 
                         p.name === 'کەمکردنەوەی پاشماوەی خۆراک' && language === 'ar' ? 'تقليل هدر الطعام' :
                         p.name === 'توانابەخشینی ژنان' && language === 'en' ? 'Women Empowerment' :
                         p.name === 'توانابەخشینی ژنان' && language === 'ar' ? 'تمكين المرأة' :
                         p.name === 'فێرکردنی لاوان' && language === 'en' ? 'Youth Education' :
                         p.name === 'فێرکردنی لاوان' && language === 'ar' ? 'تعليم الشباب' : p.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Report Type */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 block">{getFieldConnectedLabel()}</label>
                  <select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value as ReportType)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-amber-500 transition-colors font-medium text-slate-800 cursor-pointer"
                  >
                    <option value="monthly">{language === 'en' ? 'Monthly Progress' : language === 'ar' ? 'تقرير فني شهري' : 'ڕاپۆرتی مانگانە'}</option>
                    <option value="quarterly">{language === 'en' ? 'Quarterly Evaluation' : language === 'ar' ? 'تقرير فني ربع سنوي' : 'ڕاپۆرتی وەرزی'}</option>
                    <option value="annual">{language === 'en' ? 'Annual Comprehensive' : language === 'ar' ? 'التقرير السنوي المتكامل' : 'ڕاپۆرتی ساڵانە'}</option>
                    <option value="evaluation">{t('reports.type')}</option>
                  </select>
                </div>

              </div>

              {/* Executive summary */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 block">{t('reports.executive_summary')} <span className="text-rose-500">*</span></label>
                <textarea
                  required
                  rows={2}
                  placeholder="..."
                  value={executiveSummary}
                  onChange={(e) => setExecutiveSummary(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-amber-500 transition-colors font-medium text-slate-800"
                />
              </div>

              {/* Results outputs */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 block">{t('reports.results')} <span className="text-rose-500">*</span></label>
                <textarea
                  required
                  rows={2}
                  placeholder="..."
                  value={results}
                  onChange={(e) => setResults(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-amber-500 transition-colors font-medium text-slate-800"
                />
              </div>

              {/* Impact analysis text */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 block">{t('reports.impact_description')} <span className="text-rose-500">*</span></label>
                <textarea
                  required
                  rows={2}
                  placeholder="..."
                  value={impactDescription}
                  onChange={(e) => setImpactDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-amber-500 transition-colors font-medium text-slate-800"
                />
              </div>

              {/* Recommendations */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 block">{t('reports.recommendations')} <span className="text-rose-500">*</span></label>
                <textarea
                  required
                  rows={2}
                  placeholder="..."
                  value={recommendations}
                  onChange={(e) => setRecommendations(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-amber-500 transition-colors font-medium text-slate-800"
                />
              </div>

              {/* Submit panel */}
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
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors shadow-md shadow-amber-600/10 cursor-pointer"
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
