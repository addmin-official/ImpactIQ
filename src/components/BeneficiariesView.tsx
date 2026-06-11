import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { Beneficiary, Gender, SupportStatus } from '../types';
import { 
  Plus, 
  Search, 
  Trash2, 
  Edit3, 
  UserPlus, 
  Users, 
  MapPin, 
  UserCheck, 
  Settings,
  X,
  BadgePercent,
  TrendingUp,
  Tag
} from 'lucide-react';

export const BeneficiariesView: React.FC = () => {
  const { 
    beneficiaries, 
    projects, 
    addBeneficiary, 
    updateBeneficiary, 
    deleteBeneficiary, 
    canWrite, 
    canDelete 
  } = useApp();

  const { language, t, direction } = useLanguage();

  const [searchTerm, setSearchTerm] = useState('');
  const [projectFilter, setProjectFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedBen, setSelectedBen] = useState<Beneficiary | null>(null);

  // Form fields
  const [name, setName] = useState('');
  const [age, setAge] = useState(25);
  const [gender, setGender] = useState<Gender>('female');
  const [location, setLocation] = useState('');
  const [beneficiaryType, setBeneficiaryType] = useState('');
  const [projectId, setProjectId] = useState('');
  const [supportStatus, setSupportStatus] = useState<SupportStatus>('receiving_support');
  const [registrationDate, setRegistrationDate] = useState('2026-06-11');

  const [errorMsg, setErrorMsg] = useState('');

  // Collect unique locations to populate location Filter dropdown
  const uniqueLocations = Array.from(new Set(beneficiaries.map(b => b.location).filter(Boolean)));

  // Search & Filter
  const filteredBens = beneficiaries.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.beneficiaryType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProj = projectFilter === 'all' || b.projectId === projectFilter;
    const matchesLoc = locationFilter === 'all' || b.location === locationFilter;
    return matchesSearch && matchesProj && matchesLoc;
  });

  // Simple statistics
  const totalBensCount = filteredBens.length;
  const femaleCount = filteredBens.filter(b => b.gender === 'female').length;
  const maleCount = filteredBens.filter(b => b.gender === 'male').length;
  const femalePercentage = totalBensCount > 0 ? Math.round((femaleCount / totalBensCount) * 100) : 0;
  const malePercentage = totalBensCount > 0 ? Math.round((maleCount / totalBensCount) * 100) : 0;

  const receivingSupportCount = filteredBens.filter(b => b.supportStatus === 'receiving_support').length;
  const completedSupportCount = filteredBens.filter(b => b.supportStatus === 'completed').length;
  const registeredCount = filteredBens.filter(b => b.supportStatus === 'registered').length;

  const openAddModal = () => {
    if (!canWrite()) return;
    setIsEditing(false);
    setErrorMsg('');
    setName('');
    setAge(30);
    setGender('female');
    
    // Choose sensible default location and type
    const defaultLoc = language === 'en' ? 'Erbil' : language === 'ar' ? 'أربيل' : 'هەولێر';
    const defaultType = language === 'en' ? 'Food & Nutrition Support' : language === 'ar' ? 'الدعم الغذائي والتمويني' : 'هاوکاری خۆراکی / پاکوخاوێنی';
    
    setLocation(defaultLoc);
    setBeneficiaryType(defaultType);
    setProjectId(projects[0]?.id || '');
    setSupportStatus('receiving_support');
    setRegistrationDate('2026-06-11');
    setIsModalOpen(true);
  };

  const openEditModal = (b: Beneficiary) => {
    if (!canWrite()) return;
    setIsEditing(true);
    setErrorMsg('');
    setSelectedBen(b);
    setName(b.name);
    setAge(b.age);
    setGender(b.gender);
    setLocation(b.location);
    setBeneficiaryType(b.beneficiaryType);
    setProjectId(b.projectId);
    setSupportStatus(b.supportStatus);
    setRegistrationDate(b.registrationDate);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name || !location || !beneficiaryType || !projectId) {
      setErrorMsg(
        language === 'en' ? 'Please fill out all required fields.' :
        language === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة بشكل دقيق.' :
        'تکایە سەرجەم خانە پێویستەکان بە دروستی پڕبکەرەوە.'
      );
      return;
    }

    if (age <= 0 || age > 130) {
      setErrorMsg(
        language === 'en' ? 'Please enter a valid age parameter.' :
        language === 'ar' ? 'يرجى إدخال عمر صحيح عقلانياً.' :
        'تکایە تەمەنێکی گونجاو دیاری بکە.'
      );
      return;
    }

    if (isEditing && selectedBen) {
      const success = updateBeneficiary({
        id: selectedBen.id,
        name,
        age: Number(age),
        gender,
        location,
        beneficiaryType,
        projectId,
        supportStatus,
        registrationDate
      });
      if (success) {
        setIsModalOpen(false);
      } else {
        setErrorMsg(t('common.error_occurred'));
      }
    } else {
      const success = addBeneficiary({
        name,
        age: Number(age),
        gender,
        location,
        beneficiaryType,
        projectId,
        supportStatus,
        registrationDate
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
      ? 'Are you sure you want to permanently delete this beneficiary registration? This action is irreversible.'
      : language === 'ar'
      ? 'هل أنت متأكد من حذف هذا المستفيد رسمياً؟ لا يمكن التراجع عن هذا الإجراء.'
      : 'ئایا دڵنیایت کە دەتەوێت ئەم سوودمەندە بە فەرمی بسڕیتەوە لە خشتەکەدا؟';

    if (confirm(confirmMsg)) {
      deleteBeneficiary(id);
    }
  };

  // UI Strings
  const getSubtitle = () => {
    if (language === 'en') return 'Official registries and verified recipient dossiers of humanitarian projects.';
    if (language === 'ar') return 'سجل بمحافظ وبيانات المستفيدين والجهات الأكثر استحقاقاً للموارد الإنسانية.';
    return 'تۆماری فەرمی سوودمەندبووانی خاوەن ماف لە لایەن ڕێکخراوە مرۆییەکانەوە';
  };

  const getGenderChartTitle = () => {
    if (language === 'en') return 'Gender Distribution Ratio';
    if (language === 'ar') return 'توزيع النوع الاجتماعي (الجنس)';
    return 'ڕێژەی ڕەگەز (جێندەر)';
  };

  const getGenderSubNote = () => {
    if (language === 'en') return 'System promotes gender inclusion and equal access targets.';
    if (language === 'ar') return 'تعزيز مستمر للإدماج وتكافؤ فرص المساندة.';
    return 'پاڵپشتی و گەشەپێدان تەنیا بۆ بەرزکردنەوەی تواناکانە';
  };

  const getSupportChartTitle = () => {
    if (language === 'en') return 'Care & Support Status';
    if (language === 'ar') return 'الحالة الرعائية والمتابعة';
    return 'دۆخی چاودێری و پاڵپشتی';
  };

  const getAgeChartTitle = () => {
    if (language === 'en') return 'Average Recipient Age';
    if (language === 'ar') return 'متوسط عمر المستفيدين';
    return 'تێکڕای تەمەنی سوودمەندان';
  };

  const getAgeChartSub = () => {
    if (language === 'en') return 'Majority of course attendees are in active workforce age.';
    if (language === 'ar') return 'معظم المستفيدين والمتدربين في سن العطاء والعمل النشط.';
    return 'زۆربەی فێرخواز و وەرگرانی پڕۆژە لە تەمەنی چاڵاکی هێزی کاردان.';
  };

  const getSearchPlaceholder = () => {
    if (language === 'en') return 'Search recipient name or service...';
    if (language === 'ar') return 'ابحث هنا عن اسم مستفيد أو نوع الدعم...';
    return 'بگەڕێ بۆ ناوی سوودمەند یان جۆر...';
  };

  const getFilterLocationLabel = () => language === 'en' ? 'All Locations' : language === 'ar' ? 'جميع المواقع' : 'هەموو شوێنەکان';

  const getTableHeadAgeGender = () => language === 'en' ? 'Age / Gender' : language === 'ar' ? 'العمر / الجنس' : 'تەمەن / ڕەگەز';
  const getTableHeadProject = () => language === 'en' ? 'Associated Project' : language === 'ar' ? 'المشروع المرتبط' : 'پڕۆژەی پەیوەندیدار';

  const getGenderLabel = (g: string) => {
    if (g === 'female') return t('beneficiaries.female');
    return t('beneficiaries.male');
  };

  const getSupportStatusLabel = (status: string) => {
    switch (status) {
      case 'registered': return t('beneficiaries.registered');
      case 'receiving_support': return t('beneficiaries.receiving_support');
      default: return t('beneficiaries.completed_support');
    }
  };

  const getReadOnlyLabel = () => language === 'en' ? 'Read-Only' : language === 'ar' ? 'عرض فقط' : 'بینەر';

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Header and trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-right rtl:text-right ltr:text-left">
          <h3 className="font-extrabold text-slate-800 text-lg">{t('beneficiaries.title')}</h3>
          <p className="text-xs text-slate-500 mt-1">{getSubtitle()}</p>
        </div>
        {canWrite() && (
          <button
            id="btn-add-beneficiary"
            onClick={openAddModal}
            className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm px-4 py-2.5 rounded-xl transition-all shadow-md shadow-teal-600/10 cursor-pointer"
          >
            <UserPlus size={16} />
            <span>{t('beneficiaries.add')}</span>
          </button>
        )}
      </div>

      {/* Mini demographics widgets for visual analysis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Gender diversity */}
        <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-xs text-right rtl:text-right ltr:text-left">
          <h4 className="text-xs font-bold text-slate-500 mb-3 block">{getGenderChartTitle()}</h4>
          <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1.5 flex-row-reverse">
            <span>{language === 'en' ? 'Male' : language === 'ar' ? 'ذكور' : 'پیاو'}: {malePercentage}% ({maleCount})</span>
            <span>{language === 'en' ? 'Female' : language === 'ar' ? 'إناث' : 'ئافرەت'}: {femalePercentage}% ({femaleCount})</span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex font-mono text-[9px] text-white">
            <div className="bg-rose-400 h-full transition-all duration-300" style={{ width: `${femalePercentage}%` }} />
            <div className="bg-sky-500 h-full transition-all duration-300" style={{ width: `${malePercentage}%` }} />
          </div>
          <p className="text-[10px] text-slate-400 mt-2">{getGenderSubNote()}</p>
        </div>

        {/* Support status indicators */}
        <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-xs text-right rtl:text-right ltr:text-left">
          <h4 className="text-xs font-bold text-slate-500 mb-3 block">{getSupportChartTitle()}</h4>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-100/50">
              <span className="block text-xs font-extrabold text-emerald-700">{receivingSupportCount}</span>
              <span className="text-[9px] text-slate-400 font-bold block mt-0.5">
                {language === 'en' ? 'Active Care' : language === 'ar' ? 'رعاية نشطة' : 'پشتیوانی دەکرێت'}
              </span>
            </div>
            <div className="p-2 bg-indigo-50 rounded-xl border border-indigo-100/50">
              <span className="block text-xs font-extrabold text-indigo-700">{completedSupportCount}</span>
              <span className="text-[9px] text-slate-400 font-bold block mt-0.5">
                {language === 'en' ? 'Completed' : language === 'ar' ? 'مكتمل' : 'تەواوکراو'}
              </span>
            </div>
            <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
              <span className="block text-xs font-extrabold text-slate-700">{registeredCount}</span>
              <span className="text-[9px] text-slate-400 font-bold block mt-0.5">
                {language === 'en' ? 'Registered' : language === 'ar' ? 'مسجل مبدئياً' : 'تۆمارکراو'}
              </span>
            </div>
          </div>
        </div>

        {/* Demographic Age profile info */}
        <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-xs flex flex-col justify-between text-right rtl:text-right ltr:text-left">
          <div>
            <h4 className="text-xs font-bold text-slate-500 mb-2">{getAgeChartTitle()}</h4>
            <div className="flex items-baseline gap-1.5 mt-1 justify-end rtl:justify-end ltr:justify-start">
              <span className="text-2xl font-extrabold text-slate-800">
                {beneficiaries.length > 0 ? Math.round(beneficiaries.reduce((sum, b) => sum + b.age, 0) / beneficiaries.length) : 0}
              </span>
              <span className="text-xs text-slate-400 font-semibold">{language === 'en' ? 'years old' : language === 'ar' ? 'عاماً' : 'ساڵ'}</span>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 leading-relaxed border-t border-slate-100/80 pt-2 text-right">
            {getAgeChartSub()}
          </p>
        </div>

      </div>

      {/* Constraints search & multiple filter systems */}
      <div className="bg-white border border-slate-200/80 p-4 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-4 shadow-sm font-sans">
        
        {/* Search */}
        <div className="relative">
          <Search size={16} className={`absolute ${direction === 'rtl' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-slate-400`} />
          <input
            id="ben-search"
            type="text"
            placeholder={getSearchPlaceholder()}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full ${direction === 'rtl' ? 'pl-4 pr-9' : 'pl-9 pr-4'} py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-sky-500 transition-all font-medium text-slate-700`}
          />
        </div>

        {/* Project filtering option */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">{language === 'en' ? 'Project:' : language === 'ar' ? 'المشروع:' : 'پڕۆژە:'}</span>
          <select
            id="filter-project"
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs font-medium outline-none focus:bg-white focus:border-sky-500 transition-all cursor-pointer text-slate-700"
          >
            <option value="all">{language === 'en' ? 'All Projects' : language === 'ar' ? 'جميع المشاريع' : 'هەموو پڕۆژەکان'}</option>
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

        {/* Location filtering option */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">{language === 'en' ? 'Location:' : language === 'ar' ? 'الموقع:' : 'شوێن:'}</span>
          <select
            id="filter-location"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs font-medium outline-none focus:bg-white focus:border-sky-500 transition-all cursor-pointer text-slate-700"
          >
            <option value="all">{getFilterLocationLabel()}</option>
            {uniqueLocations.map(loc => (
              <option key={loc} value={loc}>
                {loc === 'هەولێر' && language === 'en' ? 'Erbil' :
                 loc === 'هەولێر' && language === 'ar' ? 'أربيل' :
                 loc === 'سلێمانی' && language === 'en' ? 'Sulaymaniyah' :
                 loc === 'سلێمانی' && language === 'ar' ? 'السليمانية' :
                 loc === 'دهۆک' && language === 'en' ? 'Duhok' :
                 loc === 'دهۆک' && language === 'ar' ? 'دهوك' : loc}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Main Beneficiaries Table */}
      <div className="table-responsive-wrapper shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-right rtl:text-right ltr:text-left text-xs min-w-[950px] sm:min-w-0">
            <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-150">
              <tr>
                <th className="px-6 py-4">{t('beneficiaries.name')}</th>
                <th className="px-6 py-4">{getTableHeadAgeGender()}</th>
                <th className="px-6 py-4">{t('beneficiaries.location')}</th>
                <th className="px-6 py-4">{t('beneficiaries.type')}</th>
                <th className="px-6 py-4">{getTableHeadProject()}</th>
                <th className="px-6 py-4">{t('beneficiaries.status')}</th>
                <th className="px-6 py-4">{t('beneficiaries.registration')}</th>
                <th className="px-6 py-4 text-center">{t('projects.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredBens.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-slate-400">
                    {t('beneficiaries.empty_state')}
                  </td>
                </tr>
              ) : (
                filteredBens.map((b) => {
                  const associatedP = projects.find(p => p.id === b.projectId);
                  return (
                    <tr key={b.id} className="hover:bg-slate-55/40 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-800 text-sm whitespace-nowrap">{b.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-slate-600 block">{b.age} {language === 'en' ? 'Y/O' : 'ساڵ'}</span>
                        <span className={`text-[10px] mt-0.5 block ${b.gender === 'female' ? 'text-rose-500' : 'text-sky-500'}`}>
                          {getGenderLabel(b.gender)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500 whitespace-nowrap font-medium">
                        <span className="inline-flex items-center gap-1">
                          <MapPin size={11} className="text-slate-400" />
                          <span>
                            {b.location === 'هەولێر' && language === 'en' ? 'Erbil' :
                             b.location === 'هەولێر' && language === 'ar' ? 'أربيل' :
                             b.location === 'سلێمانی' && language === 'en' ? 'Sulaymaniyah' :
                             b.location === 'سلێمانی' && language === 'ar' ? 'السليمانية' :
                             b.location === 'دهۆک' && language === 'en' ? 'Duhok' :
                             b.location === 'دهۆک' && language === 'ar' ? 'دهوك' : b.location}
                          </span>
                        </span>
                      </td>
                      <td className="px-6 py-4 max-w-xs truncate" title={b.beneficiaryType}>
                        {b.beneficiaryType === 'هاوکاری خۆراکی / پاکوخاوێنی' && language === 'en' ? 'Food & Hygiene Support' :
                         b.beneficiaryType === 'هاوکاری خۆراکی / پاکوخاوێنی' && language === 'ar' ? 'دعم سلات السلع الغذائية والنظافة' :
                         b.beneficiaryType === 'پەرەپێدانی تەکنیلی' && language === 'en' ? 'Technical Skill Development' :
                         b.beneficiaryType === 'پەرەپێدانی تەکنیلی' && language === 'ar' ? 'تطوير وتدريب مهني للمستفيدات' : b.beneficiaryType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-semibold text-slate-600 max-w-xs truncate">
                        {associatedP ? 
                          (associatedP.name === 'کەمکردنەوەی پاشماوەی خۆراک' && language === 'en' ? 'Food Waste Reduction' : 
                           associatedP.name === 'کەمکردنەوەی پاشماوەی خۆراک' && language === 'ar' ? 'تقليل هدر الطعام' :
                           associatedP.name === 'توانابەخشینی ژنان' && language === 'en' ? 'Women Empowerment' :
                           associatedP.name === 'توانابەخشینی ژنان' && language === 'ar' ? 'تمكين المرأة' :
                           associatedP.name === 'فێرکردنی لاوان' && language === 'en' ? 'Youth Education' :
                           associatedP.name === 'فێرکردنی لاوان' && language === 'ar' ? 'تعليم الشباب' : associatedP.name)
                          : 'M&E Project'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          b.supportStatus === 'registered' ? 'bg-slate-100 text-slate-600' :
                          b.supportStatus === 'receiving_support' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                          'bg-indigo-50 text-indigo-600 border border-indigo-100'
                        }`}>
                          {getSupportStatusLabel(b.supportStatus)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-400 whitespace-nowrap">{b.registrationDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-2">
                          {canWrite() && (
                            <button
                              onClick={() => openEditModal(b)}
                              className="p-1.5 text-slate-500 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors cursor-pointer"
                              title={language === 'en' ? 'Edit' : language === 'ar' ? 'تعديل' : 'دەستکاری'}
                            >
                              <Edit3 size={14} />
                            </button>
                          )}
                          {canDelete() && (
                            <button
                              onClick={() => handleDelete(b.id)}
                              className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-55 rounded-lg transition-colors cursor-pointer"
                              title={language === 'en' ? 'Delete' : language === 'ar' ? 'حذف المستفيد' : 'سڕینەوە'}
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                          {!canWrite() && <span className="text-[10px] text-slate-400">{getReadOnlyLabel()}</span>}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Beneficiary Modal Template */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-40">
          <div className="bg-white rounded-2xl w-full max-w-lg border border-slate-200 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div className="text-right rtl:text-right ltr:text-left">
                <h4 className="font-bold text-base">{isEditing ? t('beneficiaries.edit') : t('beneficiaries.add')}</h4>
                <p className="text-[11px] text-slate-300 mt-1">
                  {t('beneficiaries.prompt_help')}
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

              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 block">{t('beneficiaries.name')} <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder={t('beneficiaries.placeholder_name')}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-sky-500 transition-colors font-medium text-slate-800"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Age */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 block">{t('beneficiaries.age')} <span className="text-rose-500">*</span></label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={120}
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-sky-500 transition-colors font-medium text-slate-800"
                  />
                </div>

                {/* Gender */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 block">{t('beneficiaries.gender')}</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as Gender)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-sky-500 transition-colors font-medium text-slate-800 cursor-pointer"
                  >
                    <option value="female">{t('beneficiaries.female')}</option>
                    <option value="male">{t('beneficiaries.male')}</option>
                  </select>
                </div>

                {/* Location */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 block">{t('beneficiaries.location')} <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="Erbil, Sulaymaniyah, Duhok..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-sky-500 transition-colors font-medium text-slate-800"
                  />
                </div>

                {/* Support Status */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 block">{t('beneficiaries.status')}</label>
                  <select
                    value={supportStatus}
                    onChange={(e) => setSupportStatus(e.target.value as SupportStatus)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-sky-500 transition-colors font-medium text-slate-800 cursor-pointer"
                  >
                    <option value="registered">{t('beneficiaries.registered')}</option>
                    <option value="receiving_support">{t('beneficiaries.receiving_support')}</option>
                    <option value="completed">{t('beneficiaries.completed_support')}</option>
                  </select>
                </div>
              </div>

              {/* Project ID */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 block">{t('beneficiaries.select_project')} <span className="text-rose-500">*</span></label>
                <select
                  required
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-sky-500 transition-colors font-medium text-slate-800 cursor-pointer"
                >
                  <option value="" disabled>{t('beneficiaries.select_project_option')}</option>
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

              {/* Beneficiary Type */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 block">{t('beneficiaries.type')} <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder={t('beneficiaries.placeholder_type')}
                  value={beneficiaryType}
                  onChange={(e) => setBeneficiaryType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-sky-500 transition-colors font-medium text-slate-800"
                />
              </div>

              {/* Register Date */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 block">{t('beneficiaries.registration')}</label>
                <input
                  type="date"
                  required
                  value={registrationDate}
                  onChange={(e) => setRegistrationDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-sky-500 transition-colors font-medium text-slate-800"
                />
              </div>

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
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors shadow-md shadow-teal-600/10 cursor-pointer"
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
