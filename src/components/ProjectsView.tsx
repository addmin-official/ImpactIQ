import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
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

  const { language, t, direction } = useLanguage();

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
      setErrorMsg(
        language === 'en' ? 'Please fill out all required fields.' :
        language === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة.' :
        'تکایە هەموو خانە پێویستەکان پڕبکەرەوە.'
      );
      return;
    }

    if (progress < 0 || progress > 100) {
      setErrorMsg(
        language === 'en' ? 'Progress rate must be between 0 and 100.' :
        language === 'ar' ? 'يجب أن تكون نسبة الإنجاز بين 0 و 100.' :
        'ڕێژەی ڕاپەڕاندن دەبێت لە نێوان ٠ تا ١٠٠ بێت.'
      );
      return;
    }

    if (budget < 0) {
      setErrorMsg(
        language === 'en' ? 'Budget cannot be less than zero.' :
        language === 'ar' ? 'لا يمكن أن تكون الميزانية أقل من صفر.' :
        'بودجە نابێت لە سفر کەمتر بێت.'
      );
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
        setErrorMsg(t('common.error_occurred'));
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
        setErrorMsg(t('common.error_occurred'));
      }
    }
  };

  const handleDelete = (id: string) => {
    const confirmMsg = language === 'en' 
      ? 'Are you sure you want to permanently delete this project? All associated registers will be removed.'
      : language === 'ar'
      ? 'هل أنت متأكد من حذف هذا المشروع نهائياً؟ سيتم مسح بياناته بالكامل.'
      : 'ئایا دڵنیایت کە دەتەوێت ئەم پڕۆژەیە بە یەکجاری بسڕیتەوە؟ زانیارییەکانی دەسڕێنەوە.';
    
    if (confirm(confirmMsg)) {
      deleteProject(id);
    }
  };

  const getSubtitle = () => {
    if (language === 'en') return 'Track register, budgets, progress, and warning parameters of humanitarian projects.';
    if (language === 'ar') return 'سجل بمحافظ المشاريع الإنسانية والوطنية لمتابعة التراخيص والموازنات ونسب التقدم.';
    return 'تۆمار، جێبەجێکردن، بودجە و مەترسی پڕۆژە مرۆییەکان لێرەوە چاودێری بکە';
  };

  const getSearchPlaceholder = () => {
    if (language === 'en') return 'Search projects, locations, or descriptions...';
    if (language === 'ar') return 'ابحث هنا عن اسم المشروع، الموقع، أو التفاصيل...';
    return 'لێرە بگەڕێ بۆ پڕۆژە، شوێن، یان وەسف...';
  };

  const getFilterStatusLabel = () => {
    if (language === 'en') return 'Status Filter:';
    if (language === 'ar') return 'تصفية حسب الحالة:';
    return 'جۆری دۆخ:';
  };

  const getTableHeadProject = () => {
    if (language === 'en') return 'Project Name';
    if (language === 'ar') return 'اسم المشروع';
    return 'ناوی پڕۆژە';
  };

  const getTableHeadLocation = () => language === 'en' ? 'Location' : language === 'ar' ? 'الموقع' : 'شوێن';
  const getTableHeadStatus = () => t('projects.status');
  const getTableHeadRisk = () => t('projects.risk');
  const getTableHeadBudget = () => language === 'en' ? 'Allocated Budget' : language === 'ar' ? 'الميزانية المرصودة' : 'بودجەی تەرخانکراو';
  const getTableHeadBeneficiaries = () => language === 'en' ? 'Beneficiaries Target' : language === 'ar' ? 'المستهدفين' : 'ژمارەی سوودمەند';
  const getTableHeadProgress = () => t('projects.progress');
  const getTableHeadActions = () => language === 'en' ? 'Actions' : language === 'ar' ? 'إجراءات' : 'کردارەکان';

  const getStatusLabelText = (status: string) => {
    switch (status) {
      case 'active': return t('projects.active');
      case 'planning': return t('projects.planning');
      case 'completed': return t('projects.completed');
      default: return t('projects.on_hold');
    }
  };

  const getRiskLabelText = (risk: string) => {
    switch (risk) {
      case 'high': return t('dashboard.risk_high');
      case 'medium': return t('dashboard.risk_medium');
      default: return t('dashboard.risk_low');
    }
  };

  const getReadOnlyLabel = () => {
    if (language === 'en') return 'Read Only';
    if (language === 'ar') return 'عرض فقط';
    return 'تەنها خوێندنەوە';
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Header and Add button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-right rtl:text-right ltr:text-left">
          <h3 className="font-extrabold text-slate-800 text-lg">{t('projects.title')}</h3>
          <p className="text-xs text-slate-500 mt-1">{getSubtitle()}</p>
        </div>
        
        {canWrite() && (
          <button
            id="btn-add-project"
            onClick={openAddModal}
            className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm px-4 py-2.5 rounded-xl transition-all shadow-md shadow-sky-600/10 cursor-pointer"
          >
            <Plus size={16} />
            <span>{t('projects.add')}</span>
          </button>
        )}
      </div>

      {/* Control Box: Search & filters */}
      <div className="bg-white border border-slate-200/80 p-4 rounded-2xl flex flex-col sm:flex-row items-center gap-4 shadow-sm">
        <div className="relative w-full sm:flex-1">
          <Search size={18} className={`absolute ${direction === 'rtl' ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 text-slate-400`} />
          <input
            id="project-search"
            type="text"
            placeholder={getSearchPlaceholder()}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full ${direction === 'rtl' ? 'pl-4 pr-10' : 'pl-10 pr-4'} py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm outline-none focus:bg-white focus:border-sky-500 transition-all font-medium`}
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">{getFilterStatusLabel()}</span>
          <select
            id="filter-project-status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-44 bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-medium outline-none focus:bg-white focus:border-sky-500 transition-all cursor-pointer text-slate-700"
          >
            <option value="all">{language === 'en' ? 'All Projects' : language === 'ar' ? 'جميع المشاريع' : 'هەموو پڕۆژەکان'}</option>
            <option value="planning">{t('projects.planning')}</option>
            <option value="active">{t('projects.active')}</option>
            <option value="completed">{t('projects.completed')}</option>
            <option value="on_hold">{t('projects.on_hold')}</option>
          </select>
        </div>
      </div>

      {/* Projects Table & Card layout */}
      <div className="table-responsive-wrapper shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-right rtl:text-right ltr:text-left text-xs min-w-[800px] sm:min-w-0">
            <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-150">
              <tr>
                <th className="px-6 py-4">{getTableHeadProject()}</th>
                <th className="px-6 py-4">{getTableHeadLocation()}</th>
                <th className="px-6 py-4">{getTableHeadStatus()}</th>
                <th className="px-6 py-4">{getTableHeadRisk()}</th>
                <th className="px-6 py-4">{getTableHeadBudget()}</th>
                <th className="px-6 py-4">{getTableHeadBeneficiaries()}</th>
                <th className="px-6 py-4">{getTableHeadProgress()}</th>
                <th className="px-6 py-4 text-center">{getTableHeadActions()}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-slate-400">
                    {t('projects.empty_state')}
                  </td>
                </tr>
              ) : (
                filteredProjects.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/55 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        {/* Predefined project names translated inline for absolute quality */}
                        <span className="font-bold text-slate-800 text-sm block">
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
                        <span className="text-[11px] text-slate-400 mt-0.5 line-clamp-1 max-w-xs">{p.description}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1">
                        <MapPin size={12} className="text-slate-400" />
                        <span>
                          {p.location === 'هەولێر' && language === 'en' ? 'Erbil' :
                           p.location === 'هەولێر' && language === 'ar' ? 'أربيل' :
                           p.location === 'سلێمانی' && language === 'en' ? 'Sulaymaniyah' :
                           p.location === 'سلێمانی' && language === 'ar' ? 'السليمانية' :
                           p.location === 'دهۆک' && language === 'en' ? 'Duhok' :
                           p.location === 'دهۆک' && language === 'ar' ? 'دهوك' : p.location}
                        </span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        p.status === 'planning' ? 'bg-sky-50 text-sky-600 border border-sky-100' :
                        p.status === 'active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                        p.status === 'completed' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' :
                        'bg-rose-50 text-rose-600 border border-rose-100'
                      }`}>
                        {getStatusLabelText(p.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-bold ${
                        p.risk === 'low' ? 'text-emerald-600' :
                        p.risk === 'medium' ? 'text-amber-600' : 'text-rose-600'
                      }`}>
                        <AlertOctagon size={12} />
                        <span>{getRiskLabelText(p.risk)}</span>
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
                            title={language === 'en' ? 'Edit' : language === 'ar' ? 'تعديل' : 'دەستکاریکردن'}
                          >
                            <Edit3 size={15} />
                          </button>
                        )}
                        {canDelete() && (
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title={language === 'en' ? 'Delete' : language === 'ar' ? 'حذف' : 'سڕینەوە'}
                          >
                            <Trash2 size={15} />
                          </button>
                        )}
                        {!canWrite() && (
                          <span className="text-[10px] text-slate-400">{getReadOnlyLabel()}</span>
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
              <div className="text-right rtl:text-right ltr:text-left">
                <h4 className="font-bold text-base">{isEditing ? t('projects.edit') : t('projects.add')}</h4>
                <p className="text-[11px] text-slate-300 mt-1">
                  {language === 'en' ? 'Please supply valid metrics for monitoring execution correctness.' :
                   language === 'ar' ? 'يرجى تعبئة الحقول المطلوبة لضمان جودة الأثر المعروض.' :
                   'تکایە خانە دیاریکراوەکان بە جوانی بە زمانی کوردی پڕ بکەرەوە'}
                </p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-200 hover:text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-4 text-right rtl:text-right ltr:text-left">
              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 text-xs rounded-xl font-semibold">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 block">{t('projects.name')} <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder={language === 'en' ? 'Task Name' : language === 'ar' ? 'اسم المشروع المستهدَف' : 'نموونە: کەمکردنەوەی پاشماوەی خۆراک'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-sky-500 transition-colors font-medium text-slate-800"
                  />
                </div>

                {/* Location */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 block">{t('projects.location')} <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="Erbil, Sulaymaniyah, Duhok..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-sky-500 transition-colors font-medium text-slate-800"
                  />
                </div>

                {/* Status */}
                <div className="space-y-1.5 font-sans">
                  <label className="text-xs font-bold text-slate-600 block">{t('projects.status')}</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ProjectStatus)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-sky-500 transition-colors font-medium text-slate-800 cursor-pointer"
                  >
                    <option value="planning">{t('projects.planning')}</option>
                    <option value="active">{t('projects.active')}</option>
                    <option value="completed">{t('projects.completed')}</option>
                    <option value="on_hold">{t('projects.on_hold')}</option>
                  </select>
                </div>

                {/* Progress */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 block">{t('projects.progress')} (%)</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={progress}
                    onChange={(e) => setProgress(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-sky-500 transition-colors font-medium text-slate-800"
                  />
                </div>

                {/* Budget */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 block">{language === 'en' ? 'Allocated Budget (USD)' : language === 'ar' ? 'الميزانية المخصصة (دولار)' : 'بودجەی تەرخانکراو (USD)'}</label>
                  <input
                    type="number"
                    min={0}
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-sky-500 transition-colors font-medium text-slate-800"
                  />
                </div>

                {/* Beneficiaries Target */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 block">{language === 'en' ? 'Initial Beneficiary Count' : language === 'ar' ? 'العدد المبدأي للمستفيدين' : 'کاتیێكی سەرەتایی بۆ مەزەندەی سوودمەندان'}</label>
                  <input
                    type="number"
                    min={0}
                    value={beneficiariesCount}
                    onChange={(e) => setBeneficiariesCount(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-sky-500 transition-colors font-medium text-slate-800"
                  />
                </div>

                {/* Start Date */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 block">{t('projects.start_date')}</label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-sky-500 transition-colors font-medium text-slate-800"
                  />
                </div>

                {/* End Date */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 block">{t('projects.end_date')}</label>
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-sky-500 transition-colors font-medium text-slate-800"
                  />
                </div>

                {/* Risk */}
                <div className="space-y-1.5 col-span-1 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-600 block">{t('projects.risk')}</label>
                  <select
                    value={risk}
                    onChange={(e) => setRisk(e.target.value as RiskLevel)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-sky-500 transition-colors font-medium text-slate-800 cursor-pointer"
                  >
                    <option value="low">{language === 'en' ? 'Low — Conditions fully stable' : language === 'ar' ? 'منخفض — بيئة العمل مستقرة جداً' : 'نزم — بارودۆخ زۆر سەقامگیرە'}</option>
                    <option value="medium">{language === 'en' ? 'Medium — Additional verification needed' : language === 'ar' ? 'متوسط — يحتاج إلى رصد وتدقيق دوري' : 'مامناوەند — چاودێری سوودمەندان پێویستە'}</option>
                    <option value="high">{language === 'en' ? 'High — Critical barriers/budget alert' : language === 'ar' ? 'مرتفع — معوقات وصعوبات في الإنجاز المالي' : 'بەرز — مەترسی لەسەر جێبەجێکردنی بودجە هەیە'}</option>
                  </select>
                </div>

              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 block">{t('projects.description')} <span className="text-rose-500">*</span></label>
                <textarea
                  required
                  rows={2}
                  placeholder={language === 'en' ? 'Brief summary of goals and objectives...' : language === 'ar' ? 'ملخص بسيط لفكرة وأهداف المشروع...' : 'وەسفێکی کورت لەسەر کارەکە بنووسە...'}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-sky-500 transition-colors font-medium text-slate-800"
                />
              </div>

              {/* Key output / result */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 block">{t('projects.key_result')} <span className="text-rose-500">*</span></label>
                <textarea
                  required
                  rows={2}
                  placeholder={language === 'en' ? 'Key delivery targets...' : language === 'ar' ? 'النتائج الأساسية والمخرجات المتوقعة...' : 'بۆ نموونە: دابینکردنی ٢٥،٠٠ کیلۆ کەرەستە بە خێزانە بێ دەرامەتەکان...'}
                  value={keyResult}
                  onChange={(e) => setKeyResult(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-sky-500 transition-colors font-medium text-slate-800"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  {t('common.cancel')}
                </button>
                <button
                  type="submit"
                  className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors shadow-md shadow-sky-600/10 cursor-pointer"
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
