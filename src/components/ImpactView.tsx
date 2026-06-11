import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
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
    setTarget('کەمکردنەوەی بێکاری یان گەشەدانی تواناکان');
    setPreProjectResult('هیچ هاوکارییەک یان ئاشنایەک نەبوو');
    setPostProjectResult('دابینکردنی توانست و داهات بە ڕێژەی سەرنجڕاکێش');
    setPercentageChange(50);
    setImpactScore(8);
    setNotes('ئەم نمرەیە لەسەر بنەمای زانیاری گوزەرانی مەیدانی نووسراوە.');
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
      setErrorMsg('تکایە هەموو خانە سورەکان یان پێویستەکان بە کوردی پڕبکەرەوە.');
      return;
    }

    if (impactScore < 1 || impactScore > 10) {
      setErrorMsg('نمرەی کاریگەری دەبێت لە نێوان ١ تا ١٠ بێت.');
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
        setErrorMsg('هەڵە لە نوێکردنەوەی لۆگی کاریگەری.');
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
        setErrorMsg('هەڵە لە زیادکردنی لۆگی کاریگەری.');
      }
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('ئایا دڵنیایت لە ڕەشکردنەوەی یەکجاری ئەم فۆڕمەی کاریگەری؟')) {
      deleteImpactLog(id);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Intro section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-extrabold text-slate-800 text-lg">پێوانەکردنی کاریگەری پڕۆژە نیشتمانییەکان</h3>
          <p className="text-xs text-slate-500 mt-1">تۆمار، گۆڕانکاری، نۆتی شیکاری و نمرەی گشتگیری کاریگەری رێکخراوەیی</p>
        </div>
        {canWrite() && (
          <button
            id="btn-add-impact"
            onClick={openAddModal}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-4 py-2.5 rounded-xl transition-all shadow-md shadow-indigo-600/10 cursor-pointer"
          >
            <Plus size={16} />
            <span>زیادکردنی تۆماری نوێی کاریگەری</span>
          </button>
        )}
      </div>

      {/* Statistics and impact indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Metric card */}
        <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white p-6 rounded-2xl shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-20 h-20 bg-indigo-500/10 rounded-full blur-xl"></div>
          <span className="text-indigo-300 font-bold text-[10px] uppercase tracking-wider block">تێکڕای فەرمی</span>
          <h4 className="text-3xl font-black mt-2 text-indigo-100">{averageImpactScore} <span className="text-xs text-indigo-400">/ ١٠</span></h4>
          <p className="text-xs text-slate-350 mt-2">نمرەی دڵنیایی پێوەرەکان لە ژێر گۆڕانکاری باشی کۆمەڵایەتیدا.</p>
        </div>

        {/* High impact category counter */}
        <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 block">پڕۆژەکانی خاوەن بەرزترین گۆڕانکاری</span>
            <span className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
              <CheckCircle size={14} />
            </span>
          </div>
          <div className="mt-3">
            <h4 className="text-2xl font-extrabold text-slate-800">{highImpactCount} پڕۆژە</h4>
            <p className="text-[10px] text-slate-400 mt-1">ئەوانەی نمرەی کاریگەرییان زیاترە لە ٨.٥ لەسەر دە کلوتی پێوانە.</p>
          </div>
        </div>

        {/* Suggestion & recommendations counts info */}
        <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 block">پێشنیارە بەردەستەکان بۆ چاکسازی</span>
            <span className="p-2 bg-amber-50 rounded-lg text-amber-600">
              <Lightbulb size={14} />
            </span>
          </div>
          <div className="mt-3 font-medium">
            <h4 className="text-xs font-bold text-slate-800">چاودێری بەردەوام</h4>
            <p className="text-[10px] text-slate-400 mt-1">
              ژمارەی زانیاری لۆگ زیاترە بۆ باشترکردنی ئاستی چاکسازی و بژێوی خێزانەکان.
            </p>
          </div>
        </div>

      </div>

      {/* Logs interactive display system */}
      <div className="space-y-4">
        <h4 className="font-bold text-slate-800 text-sm px-1">تۆمارە فەرمییەکانی کاریگەری و شیبونەوەی چاڵاکی</h4>
        
        {impactLogs.length === 0 ? (
          <div className="p-12 text-center bg-white border border-slate-200/80 rounded-2xl text-slate-400 text-xs">
            هیچ لۆگێکی فەرمی لێرەدا تۆمار نەکراوە بۆ پیشاندان.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {impactLogs.map((log) => {
              const proj = projects.find(p => p.id === log.projectId);
              return (
                <div key={log.id} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all space-y-4">
                  {/* Title and control */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-xs font-extrabold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                        {proj?.name || 'پڕۆژەی نەناسراو'}
                      </span>
                      <h4 className="font-bold text-slate-800 text-sm mt-2">{log.target}</h4>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Rating visual circle */}
                      <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 py-1 px-2.5 rounded-lg text-xs font-bold text-slate-700">
                        <span>نمرەی کاریگەری:</span>
                        <span className="text-indigo-600">{log.impactScore} / ١٠</span>
                      </div>

                      {canWrite() && (
                        <button
                          onClick={() => openEditModal(log)}
                          className="p-1.5 text-slate-500 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Edit3 size={14} />
                        </button>
                      )}
                      {canDelete() && (
                        <button
                          onClick={() => handleDelete(log.id)}
                          className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Comparisons: Pre vs Post */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    <div className="p-4 bg-slate-50 rounded-xl space-y-1">
                      <span className="text-[10px] text-slate-400 font-bold block">ئەنجامی پێش پڕۆژە (داتا یان بارودۆخ):</span>
                      <p className="text-xs text-slate-700 font-medium leading-relaxed">{log.preProjectResult}</p>
                    </div>

                    <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-xl space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-emerald-600 font-bold block">ئەنجامی دوای پڕۆژە (بە فەرمی جێبەجێکراو):</span>
                        {log.percentageChange > 0 && (
                          <span className="text-[10px] font-extrabold text-emerald-600">+{log.percentageChange}% گۆڕانکاری</span>
                        )}
                      </div>
                      <p className="text-xs text-slate-700 font-bold leading-relaxed">{log.postProjectResult}</p>
                    </div>

                  </div>

                  {/* Operational Notes / Suggestions */}
                  <div className="p-4 bg-amber-50/50 border border-amber-100 rounded-xl flex items-start gap-2.5">
                    <Lightbulb size={16} className="text-amber-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-amber-800 block">پێشنیار و نۆتی هەڵسەنگاندن لە گۆڕەپان:</span>
                      <p className="text-xs text-slate-650 leading-relaxed font-semibold">{log.notes}</p>
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
              <div>
                <h4 className="font-bold text-base">{isEditing ? 'دەستکاری لۆگی پێوەر و گۆڕانکاری' : 'دروستکردنی تۆمارێکی نوێی کاریگەری'}</h4>
                <p className="text-[11px] text-slate-300 mt-1">تکایە بەراوردکارییەکی دروست لێرەدا نیشان بدە</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-200 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-4">
              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 text-xs rounded-xl font-semibold">
                  {errorMsg}
                </div>
              )}

              {/* Connected Project */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 block">بەستنەوە بە پڕۆژەی جێبەجێکراو <span className="text-rose-500">*</span></label>
                <select
                  required
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-indigo-500 transition-colors font-medium"
                >
                  <option value="" disabled>پڕۆژە دیاری بکە</option>
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.location})</option>
                  ))}
                </select>
              </div>

              {/* Target Area of Impact */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 block">نیشاندەر / ئامانجی پێوانەکراو <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="بۆ نموونە: کەمکردنەوەی پاشماوەی خۆراک لە هەولێر..."
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-indigo-500 transition-colors font-medium"
                />
              </div>

              {/* Grid pre vs post */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Pre result */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 block">دۆخی سەرەتایی (پێش دەستپێکردن) <span className="text-rose-500">*</span></label>
                  <textarea
                    required
                    rows={3}
                    placeholder="نموونە: دابەشکردنی خۆراکی مانگانە بێڕێژە فڕێدەدرا..."
                    value={preProjectResult}
                    onChange={(e) => setPreProjectResult(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-indigo-500 transition-colors font-medium"
                  />
                </div>

                {/* Post result */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 block">ئەنجامی فەرمی گۆڕاو (دوای پڕۆژە) <span className="text-rose-500">*</span></label>
                  <textarea
                    required
                    rows={3}
                    placeholder="نموونە: توانرا مانگانە ٧٥٠ تەن ئامادەکرێت..."
                    value={postProjectResult}
                    onChange={(e) => setPostProjectResult(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-indigo-500 transition-colors font-medium"
                  />
                </div>

              </div>

              {/* Percentage Change & Impact rating */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Percentage */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 block">ڕێژەی ڕاپێچراوی گۆڕانکاری (%)</label>
                  <input
                    type="number"
                    min={0}
                    value={percentageChange}
                    onChange={(e) => setPercentageChange(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-indigo-500 transition-colors font-medium"
                  />
                </div>

                {/* Score */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 block">نمرەی کاریگەری گشتی (١ تا ١٠)</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    step={0.5}
                    value={impactScore}
                    onChange={(e) => setImpactScore(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-indigo-500 transition-colors font-medium"
                  />
                </div>

              </div>

              {/* Assessment field Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 block">پێشنیارەکان و وەسفی چاڵاکی مەیدانی <span className="text-rose-500">*</span></label>
                <textarea
                  required
                  rows={2}
                  placeholder="نۆتی چاکسازی..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-indigo-500 transition-colors font-medium"
                />
              </div>

              {/* Submit Buttons */}
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
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors shadow-md shadow-indigo-600/10 cursor-pointer"
                >
                  {isEditing ? 'نوێکردنەوەی لۆگ' : 'پاشەکەوتکردن بە کوردی'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
