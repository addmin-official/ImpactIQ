import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
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
    setTitle('ڕاپۆرتی گشتگیری هەڵسەنگاندنی نوێ لە سلێمانی');
    setReportType('evaluation');
    setProjectId(projects[0]?.id || '');
    setExecutiveSummary('لەماوەی دیاریکراودا پڕۆژەکە خرایە ژێر ڕیزبەندی چاکسازی مەیدانی و دابینکردنی توانا...');
    setResults('دروستکردنی پیشەی نوێ بۆ ژماریەکی دیاریکراو لە ئافرەتان و کەمکردنەوەی جێگیری خەرجی خێزانەکان.');
    setImpactDescription('بەدەستهێنانی متمانە و ڕاپەڕاندنی ژانی کارپێکردن بە شێوازی مۆدێرن و ڕێکوپێک.');
    setRecommendations('پێشنیار دەکەین بۆ قۆناغی دووەم بودجەی تەکنەلۆژیا بە ڕێژەی %٢٥ بەرزبکرێتەوە.');
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
      setErrorMsg('تکایە سەرجەم بڕگە پێویستەکانی ڕاپۆرت بنووسە بە سووێنی پێویست.');
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
        setErrorMsg('هەڵە لە دەستکاریکردنی ڕاپۆرت.');
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
        setErrorMsg('هەڵە لە تۆمارکردنی ڕاپۆرتی نوێ.');
      }
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('ئایا دڵنیایت کە دەتەوێت ئەم ڕاپۆرتە بە فەرمی بسڕیتەوە؟')) {
      deleteReport(id);
    }
  };

  // Plain-text downloader
  const downloadAsTextFile = (report: Report) => {
    const connectedProj = projects.find(p => p.id === report.projectId);
    const content = `
=============================================
ڕاپۆرتی فەرمی هەڵسەنگاندن و پێوانەی کاریگەری پڕۆژە دیموکان
=============================================
ناونیشانی ڕاپۆرت: ${report.title}
جۆری ڕاپۆرت: ${report.reportType}
پڕۆژەی بەستراو: ${connectedProj?.name || 'ڕوون نییە'}
بەرواری ڕاستکردنی ڕاپۆرت: ${report.createdAt}
---------------------------------------------
١. کورتەی گشتی جێبەجێکردن:
${report.executiveSummary}

٢. ئەنجامە ڕاستەوخۆکان:
${report.results}

٣. کاریگەرییە گوزەراوەکان لەسەر کۆمەڵگا:
${report.impactDescription}

٤. ڕاسپاردە و پێشنیاری بۆ نوێخوازی پڕۆژەی داهاتوو:
${report.recommendations}
---------------------------------------------
مێشکی زیرەکی پێوانەکردن و هەڵسەنگاندنی کاریگەری
    `;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${report.title.replace(/\s+/g, '_')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-extrabold text-slate-800 text-lg">ڕاپۆرتسازی و پێشکەشکردن</h3>
          <p className="text-xs text-slate-500 mt-1">ئامادەکاری، پەسەندکردن، هەناردە یان چاپکردنی ڕاپۆرتە فەرمییەکان بە زمانی کوردی سۆرانی</p>
        </div>
        {canWrite() && (
          <button
            id="btn-add-report"
            onClick={openAddModal}
            className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-750 hover:bg-amber-700 text-white font-bold text-sm px-4 py-2.5 rounded-xl transition-all shadow-md shadow-amber-600/10 cursor-pointer"
          >
            <Plus size={16} />
            <span>داڕشتنی ڕاپۆرتی نوێ</span>
          </button>
        )}
      </div>

      {/* Reports Listing cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {reports.length === 0 ? (
          <div className="lg:col-span-2 p-12 text-center bg-white border border-slate-200/80 rounded-2xl text-slate-400 text-xs">
            هیچ ڕاپۆرتێکی فەرمی لێرەدا بەردەست نییە. بۆ دیمۆ یەک دانە دروست بکە!
          </div>
        ) : (
          reports.map((report) => {
            const proj = projects.find(p => p.id === report.projectId);
            return (
              <div key={report.id} className="bg-white border border-slate-200/85 p-6 rounded-2xl shadow-xs space-y-4 hover:shadow-md transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  {/* Title and Badging */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] bg-amber-50 text-amber-600 border border-amber-100 font-extrabold px-2 py-0.5 rounded-md leading-normal">
                        {report.reportType === 'evaluation' ? 'هەڵسەنگاندنی کۆتایی' : 
                         report.reportType === 'annual' ? 'ڕاپۆرتی ساڵانە' :
                         report.reportType === 'quarterly' ? 'ڕاپۆرتی وەرزی' : 'ڕاپۆرتی مانگانە'}
                      </span>
                      <h4 className="font-bold text-slate-800 text-base mt-2 leading-snug">{report.title}</h4>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {canWrite() && (
                        <button
                          onClick={() => openEditModal(report)}
                          className="p-1.5 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors cursor-pointer"
                          title="دەستکاری بکە"
                        >
                          <Edit3 size={14} />
                        </button>
                      )}
                      {canDelete() && (
                        <button
                          onClick={() => handleDelete(report.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="ڕەشکردنەوە"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Connected Details info */}
                  <p className="text-[11px] text-slate-400">
                    پڕۆژەی بەستراو: <strong className="text-slate-600 font-bold">{proj?.name || 'ڕوون نییە'}</strong>
                  </p>

                  {/* Summary Snippet */}
                  <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                    <span className="text-[10px] font-bold text-slate-550 block">کورتەی جێبەجێکردن:</span>
                    <p className="text-xs text-slate-655 font-medium leading-relaxed line-clamp-2">{report.executiveSummary}</p>
                  </div>

                  {/* Detailed Accordion results previews */}
                  <div className="text-xs space-y-1 text-slate-700">
                    <div>
                      <strong className="text-slate-500 block text-[10px]">کاریگەری پیشاندراو:</strong>
                      <p className="line-clamp-1">{report.impactDescription}</p>
                    </div>
                    <div className="pt-1.5">
                      <strong className="text-slate-500 block text-[10px]">گرنگترین ڕاسپاردەکان:</strong>
                      <p className="line-clamp-1 font-semibold text-sky-700">{report.recommendations}</p>
                    </div>
                  </div>
                </div>

                {/* Print and Export Buttons footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span>بەروار: {report.createdAt}</span>
                  <div className="flex items-center gap-2">
                    
                    {/* Plain Text Download */}
                    <button
                      onClick={() => downloadAsTextFile(report)}
                      className="inline-flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1.5 rounded-lg font-bold transition-colors cursor-pointer"
                      title="داگرتن بە فایلی نووسراو"
                    >
                      <Download size={13} />
                      <span>داگرتن</span>
                    </button>

                    {/* Official printable modal activation */}
                    <button
                      onClick={() => setPrintTargetReport(report)}
                      className="inline-flex items-center gap-1 bg-amber-600 hover:bg-amber-700 text-white px-2.5 py-1.5 rounded-lg font-bold transition-all shadow-sm cursor-pointer"
                    >
                      <Printer size={13} />
                      <span>چاپکردنی فەرمی</span>
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
              <div>
                <span className="text-[10px] bg-sky-500/20 text-sky-300 font-bold px-2 py-0.5 rounded">شیکردنەوەی چاپی ئامادەکراو</span>
                <h4 className="font-bold text-xs mt-1">ڕاپۆرتی فەرمی متمانەپێکراو</h4>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer size={14} />
                  <span>چاپ بکە</span>
                </button>
                <button
                  onClick={() => setPrintTargetReport(null)}
                  className="p-1 px-2.5 bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                >
                  داخستن
                </button>
              </div>
            </div>

            {/* Printable Area - styled explicitly with standard letterhead template */}
            <div id="printable-area" className="p-10 bg-white text-slate-900 font-sans space-y-6 flex-1 overflow-y-auto selection:bg-amber-200">
              
              {/* Official Document Letterhead */}
              <div className="border-b-4 border-double border-slate-800 pb-6 flex items-center justify-between">
                <div className="space-y-1">
                  <h1 className="text-xl font-black text-slate-900">مەڵبەندی نیشتمانی بۆ چاودێری و هەڵسەنگاندن</h1>
                  <p className="text-xs text-slate-500 font-bold">سازمانی هەڵسەنگاندنی کاریگەری پڕۆژە نیشتمانی و مرۆییەکان</p>
                  <p className="text-[10px] text-slate-400">ژمارەی فەرمی: MNE-2026-0987</p>
                </div>
                <div className="text-left space-y-1 font-mono text-[10px]">
                  <p>تۆماری فەرمی کوردستان</p>
                  <p>کۆدی بەڵگەنامە: EVAL-PDF</p>
                  <p>بەرواری پێشکەشکردن: {printTargetReport.createdAt}</p>
                </div>
              </div>

              {/* Stamp and QR Code decorative */}
              <div className="text-center font-bold text-base py-3 bg-slate-100 rounded-xl">
                <span>بەڵگەنامەی فەرمی هەڵسەنگاندنی پێشکەوتن و کاریگەری</span>
              </div>

              {/* Title & Metadata fields */}
              <div className="space-y-2 border-r-4 border-indigo-500 pr-4">
                <h2 className="text-base font-black text-slate-800">ناونیشانی ڕاپۆرت: {printTargetReport.title}</h2>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <p>جۆری بەڵگە: <strong className="font-black text-slate-800">{printTargetReport.reportType.toUpperCase()}</strong></p>
                  <p>پڕۆژەی گرێدراو: <strong className="font-bold text-slate-800">{projects.find(p => p.id === printTargetReport.projectId)?.name || 'نەزانراو'}</strong></p>
                  <p>شوێنی جێبەجێکردن: <strong className="font-bold text-slate-800">{projects.find(p => p.id === printTargetReport.projectId)?.location || 'کوردستان'}</strong></p>
                </div>
              </div>

              {/* Main Content blocks */}
              <div className="space-y-5 text-sm leading-relaxed text-slate-800">
                
                {/* 1. Executive Summary */}
                <div className="space-y-2">
                  <h3 className="font-extrabold text-slate-900 text-sm border-b border-slate-200 pb-1">١. کورتەی جێبەجێکردن و دۆخ:</h3>
                  <p className="text-xs text-justify font-medium">{printTargetReport.executiveSummary}</p>
                </div>

                {/* 2. Results */}
                <div className="space-y-2">
                  <h3 className="font-extrabold text-slate-900 text-sm border-b border-slate-200 pb-1">٢. ئەنجامە کۆنکرێتی و ڕاستەوخۆکان:</h3>
                  <p className="text-xs text-justify font-medium">{printTargetReport.results}</p>
                </div>

                {/* 3. Impact */}
                <div className="space-y-2">
                  <h3 className="font-extrabold text-slate-900 text-sm border-b border-slate-200 pb-1">٣. نمرە و هەڵسەنگاندنی کاریگەری لەسەر بژێوی سوودمەندان:</h3>
                  <p className="text-xs text-justify font-medium">{printTargetReport.impactDescription}</p>
                </div>

                {/* 4. Recommendations */}
                <div className="space-y-2">
                  <h3 className="font-extrabold text-slate-900 text-sm border-b border-slate-200 pb-1">٤. ڕاسپاردە و پێشنیارەکان بۆ قۆناغەکانی گەشەپێدان:</h3>
                  <p className="text-xs text-justify font-extrabold text-indigo-900">{printTargetReport.recommendations}</p>
                </div>

              </div>

              {/* Signatures & Seal Section */}
              <div className="pt-10 flex items-center justify-between text-xs border-t border-slate-200/80 mt-10">
                <div className="text-center space-y-1">
                  <p className="font-bold text-slate-500">مۆر و ناوی سەرپەرشتیاری دڵنیایی</p>
                  <p className="font-black text-slate-800">کارمەندی باڵای چاودێری</p>
                  <div className="h-10 w-24 mx-auto border border-dashed border-slate-350 rounded-lg flex items-center justify-center text-[9px] text-slate-400 mt-2">
                    <FileSignature size={20} className="text-slate-400 opacity-60" />
                  </div>
                </div>

                <div className="text-center space-y-1">
                  <p className="font-bold text-slate-500">سازمان و مۆری ڕێکخراوی نێودەوڵەتی</p>
                  <p className="font-black text-slate-850">پەسەندکردنی کۆتایی بریکار</p>
                  <div className="h-14 w-14 mx-auto border-2 border-double border-indigo-400 rounded-full flex items-center justify-center text-[10px] font-black text-indigo-500 uppercase rotate-12 mt-2">
                    MNE SEAL
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
            
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h4 className="font-bold text-base">{isEditing ? 'دەستکاریکردنی ڕاپۆرت' : 'داڕشتن و پێشکەشکردنی ڕاپۆرتی تازە'}</h4>
                <p className="text-[11px] text-slate-300 mt-1">تکایە بەشەکانی ڕاپۆرتەکە بە کوردی متمانەپێکراو بنووسە</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-200 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-4">
              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 text-xs rounded-xl font-semibold">
                  {errorMsg}
                </div>
              )}

              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 block">ناونیشانی فەرمی ڕاپۆرت <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="بۆ نموونە: ڕاپۆرتی وەرزی یەکەمی ژینگە..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-amber-500 transition-colors font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                
                {/* Connected Project selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 block">بۆ چ پڕۆژەیەک بڕواندرێت <span className="text-rose-500">*</span></label>
                  <select
                    required
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-amber-500 transition-colors font-medium"
                  >
                    <option value="" disabled>پڕۆژەکە بەستنەوە بکە</option>
                    {projects.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                {/* Report Type */}
                <div className="space-y-1.5 font-sans">
                  <label className="text-xs font-bold text-slate-600 block">جۆری زمان یان بەش</label>
                  <select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value as ReportType)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-amber-500 transition-colors font-medium"
                  >
                    <option value="monthly">ڕاپۆرتی مانگانە</option>
                    <option value="quarterly">ڕاپۆرتی وەرزی</option>
                    <option value="annual">ڕاپۆرتی گشتگیری ساڵانە</option>
                    <option value="evaluation">ڕاپۆرتی هەڵسەنگاندنی کاریگەری</option>
                  </select>
                </div>

              </div>

              {/* Executive summary */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 block">کوری کلاسیفیکاسیۆن یان کورتەی جێبەجێکردن <span className="text-rose-500">*</span></label>
                <textarea
                  required
                  rows={2}
                  placeholder="ڕوونکردنەوەی فاز و کۆنترۆڵی کارە گرنگەکان..."
                  value={executiveSummary}
                  onChange={(e) => setExecutiveSummary(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-amber-500 transition-colors font-medium"
                />
              </div>

              {/* Results outputs */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 block">ئەنجامە چۆنایەتی و چەندایەتییەکان <span className="text-rose-500">*</span></label>
                <textarea
                  required
                  rows={2}
                  placeholder="چی بەدەست هێنراوە لە گۆڕەپانی کرداریدا..."
                  value={results}
                  onChange={(e) => setResults(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-amber-500 transition-colors font-medium"
                />
              </div>

              {/* Impact analysis text */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 block">شیبونەوە و وەسفی کاریگەری گشتی <span className="text-rose-500">*</span></label>
                <textarea
                  required
                  rows={2}
                  placeholder="چۆن بووە هۆی کەمکردنەوەی ناڕەحەتی یان بڵاوکردنەوەی متمانە..."
                  value={impactDescription}
                  onChange={(e) => setImpactDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-amber-500 transition-colors font-medium"
                />
              </div>

              {/* Recommendations */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 block">ڕاسپاردەکان و پێشنیاری بۆ نوێخوازی پڕۆژەی داهاتوو <span className="text-rose-500">*</span></label>
                <textarea
                  required
                  rows={2}
                  placeholder="بۆ کەمکردنەوەی لادانەکان، چی تر پێویستە بکرێت..."
                  value={recommendations}
                  onChange={(e) => setRecommendations(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-amber-500 transition-colors font-medium"
                />
              </div>

              {/* Submit panel */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  پاشگەزبوونەوە
                </button>
                <button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors shadow-md shadow-amber-600/10 cursor-pointer"
                >
                  {isEditing ? 'نوێکردنەوەی ڕاپۆرت' : 'پاشەکەوتکردن بە فەرمی'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
