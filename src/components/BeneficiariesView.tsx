import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
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
    setLocation('هەولێر');
    setBeneficiaryType('هاوکاری خۆراکی / پاکوخاوێنی');
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
      setErrorMsg('تکایە سەرجەم خانە پێویستەکان بە دروستی پڕبکەرەوە.');
      return;
    }

    if (age <= 0 || age > 130) {
      setErrorMsg('تکایە تەمەنێکی گونجاو دیاری بکە.');
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
        setErrorMsg('هەڵە لە نوێکردنەوەی سوودمەندەکەدا.');
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
        setErrorMsg('هەڵە لە تۆمارکردنی سوودمەندەکەدا.');
      }
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('ئایا دڵنیایت کە دەتەوێت ئەم سوودمەندە بە فەرمی بسڕیتەوە لە خشتەکەدا؟')) {
      deleteBeneficiary(id);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Header and trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-extrabold text-slate-800 text-lg">بەڕێوەبردنی سوودمەندان</h3>
          <p className="text-xs text-slate-500 mt-1">تۆماری فەرمی سوودمەندبووانی خاوەن ماف لە لایەن ڕێکخراوە مرۆییەکانەوە</p>
        </div>
        {canWrite() && (
          <button
            id="btn-add-beneficiary"
            onClick={openAddModal}
            className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm px-4 py-2.5 rounded-xl transition-all shadow-md shadow-teal-600/10 cursor-pointer"
          >
            <UserPlus size={16} />
            <span>تۆمارکردنی سوودمەندی نوێ</span>
          </button>
        )}
      </div>

      {/* Mini demographics widgets for visual analysis (ئاماری دابەشبوون) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Gender diversity */}
        <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-xs">
          <h4 className="text-xs font-bold text-slate-500 mb-3 block">ڕێکەوتی جێندەری (ڕەگەز)</h4>
          <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1.5">
            <span className="text-slate-500">ئافرەت: {femalePercentage}% ({femaleCount})</span>
            <span className="text-slate-500">پیاو: {malePercentage}% ({maleCount})</span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex font-mono text-[9px] text-white">
            <div className="bg-rose-400 h-full transition-all duration-300" style={{ width: `${femalePercentage}%` }} />
            <div className="bg-sky-500 h-full transition-all duration-300" style={{ width: `${malePercentage}%` }} />
          </div>
          <p className="text-[10px] text-slate-400 mt-2 text-right">پاڵپشتی و گەشەپێدان تەنیا بۆ بەرزکردنەوەی تواناکانە</p>
        </div>

        {/* Support status indicators */}
        <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-xs">
          <h4 className="text-xs font-bold text-slate-500 mb-3 block">دۆخی چاودێری و پاڵپشتی</h4>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-100/50">
              <span className="block text-xs font-extrabold text-emerald-700">{receivingSupportCount}</span>
              <span className="text-[9px] text-slate-400 font-bold block mt-0.5">پشتیوانی دەکرێت</span>
            </div>
            <div className="p-2 bg-indigo-50 rounded-xl border border-indigo-100/50">
              <span className="block text-xs font-extrabold text-indigo-700">{completedSupportCount}</span>
              <span className="text-[9px] text-slate-400 font-bold block mt-0.5">تەواوکراو</span>
            </div>
            <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
              <span className="block text-xs font-extrabold text-slate-700">{registeredCount}</span>
              <span className="text-[9px] text-slate-400 font-bold block mt-0.5">تۆمارکراوی نوێ</span>
            </div>
          </div>
        </div>

        {/* Demographic Age profile info */}
        <div className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-xs flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-bold text-slate-500 mb-2">تێکڕای تەمەنی سوودمەندان</h4>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl font-extrabold text-slate-800">
                {beneficiaries.length > 0 ? Math.round(beneficiaries.reduce((sum, b) => sum + b.age, 0) / beneficiaries.length) : 0}
              </span>
              <span className="text-xs text-slate-400 font-semibold">ساڵ</span>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 leading-relaxed border-t border-slate-100/80 pt-2">
            زۆربەی فێرخواز و وەرگرانی پڕۆژە لە تەمەنی چاڵاکی هێزی کاردان.
          </p>
        </div>

      </div>

      {/* Constraints search & multiple filter systems */}
      <div className="bg-white border border-slate-200/80 p-4 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-4 shadow-sm font-sans">
        
        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            id="ben-search"
            type="text"
            placeholder="بگەڕێ بۆ ناوی سوودمەند یان جۆر..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:bg-white focus:border-sky-500 transition-all font-medium"
          />
        </div>

        {/* Project filtering option */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">پڕۆژە:</span>
          <select
            id="filter-project"
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs font-medium outline-none focus:bg-white focus:border-sky-500 transition-all"
          >
            <option value="all">هەموو پڕۆژەکان</option>
            {projects.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        {/* Location filtering option */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">شوێن:</span>
          <select
            id="filter-location"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs font-medium outline-none focus:bg-white focus:border-sky-500 transition-all"
          >
            <option value="all font-medium">هەموو شوێنەکان</option>
            {uniqueLocations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

      </div>

      {/* Main Beneficiaries Table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-150">
              <tr>
                <th className="px-6 py-4">ناوی سوودمەند</th>
                <th className="px-6 py-4">تەمەن / ڕەگەز</th>
                <th className="px-6 py-4">نشینگە (شار)</th>
                <th className="px-6 py-4">جۆری خزمەت یان سود</th>
                <th className="px-6 py-4">پڕۆژەی پەیوەندیدار</th>
                <th className="px-6 py-4">دۆخی پاڵپشتی</th>
                <th className="px-6 py-4">بەرواری تۆمارکردن</th>
                <th className="px-6 py-4 text-center">کردارەکان</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredBens.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-slate-400">
                    هیچ زانیاری سوودمەندێکی گواستراوە یان پڕکراوە بەردەست نییە.
                  </td>
                </tr>
              ) : (
                filteredBens.map((b) => {
                  const associatedP = projects.find(p => p.id === b.projectId);
                  return (
                    <tr key={b.id} className="hover:bg-slate-55/40 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-800 text-sm whitespace-nowrap">{b.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-slate-600 block">{b.age} ساڵ</span>
                        <span className={`text-[10px] mt-0.5 block ${b.gender === 'female' ? 'text-rose-500' : 'text-sky-500'}`}>
                          {b.gender === 'female' ? 'مێ' : 'نێر'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1">
                          <MapPin size={11} className="text-slate-400" />
                          <span>{b.location}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 max-w-xs truncate" title={b.beneficiaryType}>
                        {b.beneficiaryType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap font-semibold text-slate-600 max-w-xs truncate">
                        {associatedP?.name || 'نەزانراو'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          b.supportStatus === 'registered' ? 'bg-slate-100 text-slate-600' :
                          b.supportStatus === 'receiving_support' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                          'bg-indigo-50 text-indigo-600 border border-indigo-100'
                        }`}>
                          {b.supportStatus === 'registered' ? 'تۆمارکراو' :
                           b.supportStatus === 'receiving_support' ? 'وەرگری چاودێری' :
                           'تەواوبوو'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-400 whitespace-nowrap">{b.registrationDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-2">
                          {canWrite() && (
                            <button
                              onClick={() => openEditModal(b)}
                              className="p-1.5 text-slate-500 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors cursor-pointer"
                              title="دەستکاری بکە"
                            >
                              <Edit3 size={14} />
                            </button>
                          )}
                          {canDelete() && (
                            <button
                              onClick={() => handleDelete(b.id)}
                              className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-55 rounded-lg transition-colors cursor-pointer"
                              title="کاڵکردنەوە / سڕینەوە"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                          {!canWrite() && <span className="text-[10px] text-slate-400">بینەر</span>}
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
              <div>
                <h4 className="font-bold text-base">{isEditing ? 'تۆماری سوودمەندەکە نوێ بکەرەوە' : 'تۆماری فەرمی سوودمەندی نوێ'}</h4>
                <p className="text-[11px] text-slate-300 mt-1">تکایە داتاکان بە کوردی سۆرانی داواکراو بنووسە</p>
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

              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 block">ناوی سیانی <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="ناوی تەواوی بەڕێز بنووسە..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-sky-500 transition-colors font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Age */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 block">تەمەن <span className="text-rose-500">*</span></label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={120}
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-sky-500 transition-colors font-medium"
                  />
                </div>

                {/* Gender */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 block">جێندەر (ڕەگەز)</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as Gender)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-sky-500 transition-colors font-medium"
                  >
                    <option value="female">ئافرەت / مێ</option>
                    <option value="male">پیاو / نێر</option>
                  </select>
                </div>

                {/* Location */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 block">شوێنی نیشتەجێبوون <span className="text-rose-500">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="نموونە: سلێمانی، پێنجوێن"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-sky-500 transition-colors font-medium"
                  />
                </div>

                {/* Support Status */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 block">دۆخی سوودمەندی</label>
                  <select
                    value={supportStatus}
                    onChange={(e) => setSupportStatus(e.target.value as SupportStatus)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-sky-500 transition-colors font-medium"
                  >
                    <option value="registered">تۆمارکراوە بە تەنیا</option>
                    <option value="receiving_support">لە ژێر هاوکاری بەردەوام دایە</option>
                    <option value="completed">سەرکەوتووانە پڕۆژەکە بۆی کۆتایی هاتووە</option>
                  </select>
                </div>
              </div>

              {/* Project ID */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 block">بەستنەوە بە پڕۆژەی مرۆیی <span className="text-rose-500">*</span></label>
                <select
                  required
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-sky-500 transition-colors font-medium"
                >
                  <option value="" disabled>پڕۆژەیەک دەستنیشان بکە</option>
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.location})</option>
                  ))}
                </select>
              </div>

              {/* Beneficiary Type */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 block">بکۆشە یان جۆری سوودمەندی تەواو <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  required
                  placeholder="وەک: خولی خەیاتی، سەتڵە خۆراکی مانگانە، زمان..."
                  value={beneficiaryType}
                  onChange={(e) => setBeneficiaryType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-sky-500 transition-colors font-medium"
                />
              </div>

              {/* Register Date */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 block">بەرواری تۆمارکردن</label>
                <input
                  type="date"
                  required
                  value={registrationDate}
                  onChange={(e) => setRegistrationDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs outline-none focus:bg-white focus:border-sky-500 transition-colors font-medium"
                />
              </div>

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
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors shadow-md shadow-teal-600/10 cursor-pointer"
                >
                  {isEditing ? 'نوێکردنەوە' : 'تۆمارکردن لە داتابەیس دیمو'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
