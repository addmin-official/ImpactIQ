import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Project, ProjectStatus, RiskLevel } from '../types';
import { 
  Plus, 
  Search, 
  Trash2, 
  Edit3, 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  MapPin, 
  AlertOctagon,
  Settings,
  X,
  Target
} from 'lucide-react';

export const ProjectsView: React.FC = () => {
  const { 
    projects, 
    addProject, 
    updateProject, 
    deleteProject, 
    canWrite, 
    canDelete 
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Form Fields
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState<ProjectStatus>('active');
  const [progress, setProgress] = useState(0);
  const [budget, setBudget] = useState(0);
  const [beneficiariesCount, setBeneficiariesCount] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [risk, setRisk] = useState<RiskLevel>('low');
  const [keyResult, setKeyResult] = useState('');

  const [errorMsg, setErrorMsg] = useState('');

  // Search/Filter logic
  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openAddModal = () => {
    if (!canWrite()) return;
    setIsEditing(false);
    setErrorMsg('');
    setName('');
    setDescription('');
    setLocation('');
    setStatus('planning');
    setProgress(0);
    setBudget(0);
    setBeneficiariesCount(0);
    setStartDate('2026-06-11');
    setEndDate('2027-06-11');
    setRisk('low');
    setKeyResult('');
    setIsModalOpen(true);
  };

  const openEditModal = (p: Project) => {
    if (!canWrite()) return;
    setIsEditing(true);
    setErrorMsg('');
    setSelectedProject(p);
    setName(p.name);
    setDescription(p.description);
    setLocation(p.location);
    setStatus(p.status);
    setProgress(p.progress);
    setBudget(p.budget);
    setBeneficiariesCount(p.beneficiariesCount);
    setStartDate(p.startDate);
    setEndDate(p.endDate);
    setRisk(p.risk);
    setKeyResult(p.keyResult);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name || !location || !description || !keyResult) {
      setErrorMsg('تکایە هەموو خانە پێویستەکان پڕبکەرەوە.');
      return;
    }

    if (progress < 0 || progress > 100) {
      setErrorMsg('ڕێژەی ڕاپەڕاندن دەبێت لە نێوان ٠ تا ١٠٠ بێت.');
      return;
    }

    if (budget < 0) {
      setErrorMsg('بودجە نابێت لە سفر کەمتر بێت.');
      return;
    }

    if (isEditing && selectedProject) {
      const success = updateProject({
        id: selectedProject.id,
        name,
        description,
        location,
        status,
        progress: Number(progress),
        budget: Number(budget),
        beneficiariesCount: Number(beneficiariesCount),
        startDate,
        endDate,
        risk,
        keyResult
      });
      if (success) {
        setIsModalOpen(false);
      } else {
        setErrorMsg('هەڵە لە نوێکردنەوەی پڕۆژەکەدا.');
      }
    } else {
      const success = addProject({
        name,
        description,
        location,
        status,
        progress: Number(progress),
        budget: Number(budget),
        beneficiariesCount: Number(beneficiariesCount),
        startDate,
        endDate,
        risk,
        keyResult
      });
      if (success) {
        setIsModalOpen(false);
      } else {
        setErrorMsg('هەڵە لە زیادکردنی پڕۆژە نوێیەکەدا.');
      }
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('ئایا دڵنیایت کە دەتەوێت ئەم پڕۆژەیە بە یەکجاری بسڕیتەوە؟ زانیارییەکانی دەسڕێنەوە.')) {
      deleteProject(id);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Header and Add button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-extrabold text-slate-800 text-lg">بەڕێوەبردنی پڕۆژەکان</h3>
          <p className="text-xs text-slate-500 mt-1">تۆمار، جێبەجێکردن، بودجە و مەترسی پڕۆژە مرۆییەکان لێرەوە چاودێری بکە</p>
        </div>
        
        {canWrite() && (
          <button
            id="btn-add-project"
            onClick={openAddModal}
            className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm px-4 py-2.5 rounded-xl transition-all shadow-md shadow-sky-600/10 cursor-pointer"
          >
            <Plus size={16} />
            <span>پڕۆژەی نوێ زیاد بکە</span>
          </button>
        )}
      </div>

      {/* Control Box: Search & filters */}
      <div className="bg-white border border-slate-200/80 p-4 rounded-2xl flex flex-col sm:flex-row items-center gap-4 shadow-sm">
        <div className="relative w-full sm:flex-1">
          <Search size={18} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            id="project-search"
            type="text"
            placeholder="لێرە بگەڕێ بۆ پڕۆژە، شوێن، یان وەسف..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-10 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm outline-none focus:bg-white focus:border-sky-500 transition-all font-medium"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">جۆری دۆخ:</span>
          <select
            id="filter-project-status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-44 bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-medium outline-none focus:bg-white focus:border-sky-500 transition-all"
          >
            <option value="all">هەموو پڕۆژەکان</option>
            <option value="planning">پلاندانان</option>
            <option value="active">چالاک</option>
            <option value="completed">تەواوکراو</option>
            <option value="on_hold">ڕاگیراو</option>
          </select>
        </div>
      </div>

      {/* Projects Table & Card layout */}
      <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-150">
              <tr>
                <th className="px-6 py-4">ناوی پڕۆژە</th>
                <th className="px-6 py-4">شوێن</th>
                <th className="px-6 py-4">دۆخ</th>
                <th className="px-6 py-4">مەترسی</th>
                <th className="px-6 py-4">بودجەی تەرخانکراو</th>
                <th className="px-6 py-4">ژمارەی سوودمەند</th>
                <th className="px-6 py-4">ڕێژەی ڕاپەڕاندن</th>
                <th className="px-6 py-4 text-center">کردارەکان</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-slate-400">
                    هیچ پڕۆژەیەک نەدۆزرایەوە کە لەگەڵ گەڕان و پاڵاوتنەکە بگونجێت.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/55 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <span className="font-bold text-slate-800 text-sm block">{p.name}</span>
                        <span className="text-[11px] text-slate-400 mt-0.5 line-clamp-1 max-w-xs">{p.description}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1">
                        <MapPin size={12} className="text-slate-400" />
                        <span>{p.location}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        p.status === 'planning' ? 'bg-sky-50 text-sky-600 border border-sky-100' :
                        p.status === 'active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                        p.status === 'completed' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' :
                        'bg-rose-50 text-rose-600 border border-rose-100'
                      }`}>
                        {p.status === 'planning' ? 'پلاندانان' :
                         p.status === 'active' ? 'چالاک' :
                         p.status === 'completed' ? 'تەواوکراو' : 'ڕاگیراو'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-bold ${
                        p.risk === 'low' ? 'text-emerald-600' :
                        p.risk === 'medium' ? 'text-amber-600' : 'text-rose-600'
                      }`}>
                        <AlertOctagon size={12} />
                        <span>
                          {p.risk === 'low' ? 'نزم' :
                           p.risk === 'medium' ? 'مامناوەند' : 'بەرز'}
                        </span>
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-800 whitespace-nowrap">
                      ${p.budget.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-800 text-center whitespace-nowrap">
                      {p.beneficiariesCount}
                    </td>
                    <td className="px-6 py-4 w-44">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-bold text-slate-900">{p.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-sky-500 rounded-full" 
                          style={{ width: `${p.progress}%` }} 
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        {canWrite() && (
                          <button
                            onClick={() => openEditModal(p)}
                            className="p-1.5 text-slate-500 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors cursor-pointer"
                            title="دەستکاریکردن"
                          >
                            <Edit3 size={15} />
                          </button>
                        )}
                        {canDelete() && (
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="سڕینەوە"
                          >
                            <Trash2 size={15} />
                          </button>
                        )}
                        {!canWrite() && (
                          <span className="text-[10px] text-slate-400">تەنها خوێندنەوە</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CRUD Add/Edit Project Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-40">
          <div className="bg-white rounded-2xl w-full max-w-2xl border border-slate-200 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            
            {/* Modal Title */}
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h4 className="font-bold text-base">{isEditing ? 'دەستکاری پڕۆژە بکە' : 'تۆمارکردنی پڕۆژەی نوێ'}</h4>
                <p className="text-[11px] text-slate-300 mt-1">تکایە خانە دیاریکراوەکان بە جوانی بە زمانی کوردی پڕ بکەرەوە</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-200 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-4">
              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 text-xs rounded-xl font-semibold">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 block">ناوی پڕۆژە <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="نموونە: کەمکردنەوەی پاشماوەی خۆراک"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-sky-500 transition-colors font-medium"
                  />
                </div>

                {/* Location */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 block">شوێنی جێبەجێکردن <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="نموونە: هەولێر، سلێمانی، دهۆک..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-sky-500 transition-colors font-medium"
                  />
                </div>

                {/* Status */}
                <div className="space-y-1.5 font-sans">
                  <label className="text-xs font-bold text-slate-600 block">دۆخی چالاكی پڕۆژە</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ProjectStatus)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-sky-500 transition-colors font-medium"
                  >
                    <option value="planning">پلاندانان / ئامادەکاری</option>
                    <option value="active">چالاک / لەژێر کاردا</option>
                    <option value="completed">تەواوکراو بە فەرمی</option>
                    <option value="on_hold">ڕاگیراوە بەشێوەی کاتی</option>
                  </select>
                </div>

                {/* Progress */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 block">ڕێژەی ڕاپەڕاندن / ڕێژەی جێبەجێکردن (%)</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={progress}
                    onChange={(e) => setProgress(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-sky-500 transition-colors font-medium"
                  />
                </div>

                {/* Budget */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 block">بودجەی تەرخانکراو (USD)</label>
                  <input
                    type="number"
                    min={0}
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-sky-500 transition-colors font-medium"
                  />
                </div>

                {/* Beneficiaries Target */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 block">کاتێكی سەرەتایی بۆ مەزەندەی سوودمەندان</label>
                  <input
                    type="number"
                    min={0}
                    value={beneficiariesCount}
                    onChange={(e) => setBeneficiariesCount(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-sky-500 transition-colors font-medium"
                  />
                </div>

                {/* Start Date */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 block">بەرواری دەستپێکردن</label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-sky-500 transition-colors font-medium"
                  />
                </div>

                {/* End Date */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 block">بەرواری تەواوبوون</label>
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-sky-500 transition-colors font-medium"
                  />
                </div>

                {/* Risk */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 block">ئاستی مەترسی</label>
                  <select
                    value={risk}
                    onChange={(e) => setRisk(e.target.value as RiskLevel)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-sky-500 transition-colors font-medium"
                  >
                    <option value="low">نزم — بارودۆخ زۆر سەقامگیرە</option>
                    <option value="medium">مامناوەند — چاودێری سوودمەندان پێویستە</option>
                    <option value="high">بەرز — مەترسی لەسەر جێبەجێکردنی بودجە هەیە</option>
                  </select>
                </div>

              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 block">کورتەیەک لەسەر بیرۆکە و ئامانجی پڕۆژە دیمو <span className="text-rose-500">*</span></label>
                <textarea
                  required
                  rows={2}
                  placeholder="وەسفێکی کورت لەسەر کارەکە بنووسە..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-sky-500 transition-colors font-medium"
                />
              </div>

              {/* Key output / result */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 block">ئەنجامی سەرەکی و چاوەڕوانکراو <span className="text-rose-500">*</span></label>
                <textarea
                  required
                  rows={2}
                  placeholder="بۆ نموونە: دابینکردنی ٢٥،٠٠ کیلۆ کەرەستە بە خێزانە بێ دەرامەتەکان..."
                  value={keyResult}
                  onChange={(e) => setKeyResult(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-sky-500 transition-colors font-medium"
                />
              </div>

              {/* Action Buttons */}
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
                  className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors shadow-md shadow-sky-600/10 cursor-pointer"
                >
                  {isEditing ? 'پەسەندکردنی زانیاری دەستکاریکراو' : 'زیادکردنی داتای فەرمی'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
