import { Project, Beneficiary, ImpactLog, Report, UserProfile } from './types';

export const INITIAL_USERS: UserProfile[] = [
  {
    id: 'user-admin',
    email: 'admin.official.idg@gmail.com',
    role: 'admin',
    name: 'ئادمین فەرمی نێودەوڵەتی'
  },
  {
    id: 'user-staff',
    email: 'staff@mne.org',
    role: 'staff',
    name: 'کارۆ چاودێری و هەڵسەنگاندن'
  },
  {
    id: 'user-viewer',
    email: 'viewer@mne.org',
    role: 'viewer',
    name: 'دانا پاڵپشتیکاری نێودەوڵەتی'
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'project-food-waste',
    name: 'کەمکردنەوەی پاشماوەی خۆراک',
    description: 'کەمکردنەوەی فڕێدانی خۆراک و دابەشکردنی پارچە خۆراکی بەسوود بەسەر خەڵکانی پێویست لە پارێزگای هەولێر.',
    location: 'هەولێر',
    status: 'active',
    progress: 75,
    budget: 45000,
    beneficiariesCount: 1200,
    startDate: '2025-01-15',
    endDate: '2025-12-30',
    risk: 'low',
    keyResult: 'دابینکردنی ٢٥,٠٠ کیلۆگرام خۆراکی تەندروست بۆ خێزانە کەمدەرامەتەکان و پاراستنی ژینگە لە گازە ژەهراوییەکان.'
  },
  {
    id: 'project-women-emp',
    name: 'توانابەخشینی ژنان',
    description: 'خولی پیشەیی لە بوارەکانی تەکنەلۆژیا، خەیاتی و کارگێڕی بۆ بەهێزکردنی تواناکانی ئافرەتان لە سلێمانی و بەرزکردنەوەی ئاستی داهاتیان.',
    location: 'سلێمانی',
    status: 'active',
    progress: 89,
    budget: 60000,
    beneficiariesCount: 350,
    startDate: '2025-02-01',
    endDate: '2025-11-30',
    risk: 'low',
    keyResult: 'دامەزراندنی پڕۆژەی تایبەت بۆ ٧٥ ئافرەت کە بە داتای ڕاستەوخۆ سەرپەرشتی دەکرێن و بەرزبوونەوەی داهات بە ڕێژەی %٤٠.'
  },
  {
    id: 'project-youth-edu',
    name: 'فێرکردنی لاوان',
    description: 'پڕۆژەی پەرەپێدانی کارامەییە دیجیتاڵییەکان، کۆدنووسین و زمان بۆ ئامادەکردنی گەنجان بۆ بازاڕی کاری جیهانی لە دهۆک.',
    location: 'دهۆک',
    status: 'planning',
    progress: 15,
    budget: 35000,
    beneficiariesCount: 500,
    startDate: '2026-07-01',
    endDate: '2026-12-25',
    risk: 'medium',
    keyResult: 'فێرکردنی زمان و کۆدنووسی و کەمکردنەوەی بێکاری گەنجان بە ڕێژەی %١٥.'
  },
  {
    id: 'project-poor-families',
    name: 'پشتیوانی خێزانە هەژارەکان',
    description: 'پێشکەشکردنی هاوکاری دارایی و سەتڵە خۆراکی مانگانە بۆ خێزانە بێ دەرامەت و زیان لێکەوتووەکانی ناوچە گوندنشینەکانی کەرکووک.',
    location: 'کەرکووک',
    status: 'completed',
    progress: 100,
    budget: 80000,
    beneficiariesCount: 2500,
    startDate: '2024-05-01',
    endDate: '2025-05-01',
    risk: 'medium',
    keyResult: 'باشترکردنی باری گوزەرانی خێزانەکان لە ماوەی یەکساڵدا و پشکنینی پزیشکی بۆ زیاتر لە ١٥٠٠ نەخۆش.'
  },
  {
    id: 'project-eco',
    name: 'پاراستنی ژینگە',
    description: 'هەڵمەتی چاندنی یەک میلیۆن دار، پاککردنەوەی کانیاوە سروشتییەکان و بڵاوکردنەوەی ڕۆشنبیری ڕیسایکلین لە کوردستان.',
    location: 'هەڵەبجە',
    status: 'on_hold',
    progress: 40,
    budget: 50000,
    beneficiariesCount: 5000,
    startDate: '2025-03-10',
    endDate: '2026-10-15',
    risk: 'high',
    keyResult: 'کەمبوونەوەی ڕێژەی بیابانبوون و گونجاندنی ژینگەی پاک لەگەڵ دەسەڵاتی جێبەجێکردن.'
  }
];

export const INITIAL_BENEFICIARIES: Beneficiary[] = [
  {
    id: 'beneficiary-1',
    name: 'سازان مەحموود',
    age: 28,
    gender: 'female',
    location: 'سلێمانی',
    beneficiaryType: 'پڕۆژەی خەیاتی و بازاڕگەری دیجیتاڵی',
    projectId: 'project-women-emp',
    supportStatus: 'receiving_support',
    registrationDate: '2025-02-15'
  },
  {
    id: 'beneficiary-2',
    name: 'ئاراس ئەحمەد',
    age: 34,
    gender: 'male',
    location: 'هەولێر',
    beneficiaryType: 'دابەشکردنی خۆراکی مانگانە',
    projectId: 'project-food-waste',
    supportStatus: 'receiving_support',
    registrationDate: '2025-01-20'
  },
  {
    id: 'beneficiary-3',
    name: 'ژینۆ جەمال',
    age: 22,
    gender: 'female',
    location: 'دهۆک',
    beneficiaryType: 'خولی کۆدنووسین و پێشخستنی وێب',
    projectId: 'project-youth-edu',
    supportStatus: 'registered',
    registrationDate: '2026-06-01'
  },
  {
    id: 'beneficiary-4',
    name: 'محەممەد عەلی',
    age: 49,
    gender: 'male',
    location: 'کەرکووک',
    beneficiaryType: 'پاڵپشتی پێداویستی زستانە و خۆراک',
    projectId: 'project-poor-families',
    supportStatus: 'completed',
    registrationDate: '2024-05-10'
  },
  {
    id: 'beneficiary-5',
    name: 'شۆڕش حەسەن',
    age: 19,
    gender: 'male',
    location: 'هەڵەبجە',
    beneficiaryType: 'هۆشیاری ژینگە و چاندنی دار',
    projectId: 'project-eco',
    supportStatus: 'receiving_support',
    registrationDate: '2025-03-25'
  }
];

export const INITIAL_IMPACT_LOGS: ImpactLog[] = [
  {
    id: 'impact-1',
    projectId: 'project-food-waste',
    target: 'کەمکردنەوەی پاشماوەی خۆراک لە چێشتخانە گەورەکان و دابینکردنی ژەم بۆ هەژاران.',
    preProjectResult: 'سوتاندن یان فڕێدانی ڕۆژانە یەک تەن خۆراک.',
    postProjectResult: 'کۆکردنەوە و دابەشکردنی ٧٥٠ کگم خۆراکی تەندروست بە شێوەی ڕۆژانە.',
    percentageChange: 75,
    impactScore: 9,
    notes: 'پڕۆژەکە بە هاوکاری لەگەڵ ڕێکخراوی خۆراکی ناوخۆیی لە بەرزترین ئاستی کاریگەریدایە.'
  },
  {
    id: 'impact-2',
    projectId: 'project-women-emp',
    target: 'بەدەستهێنانی سەربەخۆیی دارایی بۆ ئافرەتانی بەشداربوو.',
    preProjectResult: 'زۆربەی بەشداربووان هیچ سەرچاوەیەکی داهاتی جێگیریان نەبوو (داهاتی مامناوەند سفر بوو).',
    postProjectResult: 'کارکردنی ٦٥% ی فێرخوازان بە شێوەی کار و داهاتی لانیکەم ٣٠٠ دۆلار مانگانە.',
    percentageChange: 150,
    impactScore: 9.5,
    notes: 'سەرکەوتنێکی بێوێنە لە بەدەستهێنانی داهاتی ناوخۆیی و پەرەپێدانی توانا کەسییەکان.'
  },
  {
    id: 'impact-3',
    projectId: 'project-poor-families',
    target: 'کەمکردنەوەی ئاستی هەژاری توند لە کەرکووک.',
    preProjectResult: 'زۆربەی گوندنشینەکان پێویستیان بە پارە و پێداویستی خۆراکی حەیاتی کتوپڕ هەبوو.',
    postProjectResult: 'گەیشتن بە ٢٥٠٠ خێزان لە ڕێگەی هاوکاری چڕەوە، و کەمبوونەوەی کەمی خۆراک بە ڕێژەی %٨٥.',
    percentageChange: 85,
    impactScore: 8.5,
    notes: 'پڕۆژەکە تەواوکەر بوو بۆ بەشداریکردنی بەردەوام و سەرپەرشتی ناوخۆیی باش دروستکرابوو.'
  },
  {
    id: 'impact-4',
    projectId: 'project-eco',
    target: 'چاندنی دار و پاکوخاوێنی لە سەرچاوە ئاوییەکان.',
    preProjectResult: 'بێدەربەستی بەرامبەر پارێزگاری ژینگە و نەبوونی سەوزایی.',
    postProjectResult: 'چاندنی ١٢٠,٠٠٠ نەمام و تەواوکردنی پاککردنەوەی چوار کەنداو.',
    percentageChange: 35,
    impactScore: 6.0,
    notes: 'هۆکاری ڕاگرتنی پڕۆژەکە پاڵپشتی دارایی بوو بەڵام لەگەڵ ئەوەشدا توانرا کاریگەرییەکی باش دروست بکرێت.'
  }
];

export const INITIAL_REPORTS: Report[] = [
  {
    id: 'report-1',
    title: 'ڕاپۆرتی کۆتایی پڕۆژەی پشتیوانی خێزانە هەژارەکان',
    reportType: 'evaluation',
    projectId: 'project-poor-families',
    executiveSummary: 'پڕۆژەکە بە سەرکەوتوویی بە هەماهەنگی لەگەڵ لایەنە پەیوەندیدارەکان کۆتایی هات و لە ماوەی پڕۆژەکەدا توانرا هەموو هاوکاری و پێداویستییە سەرەکییەکان بەسەر خەڵکدا دابەش بکرێت.',
    results: 'دابەشکردنی خۆراکی مانگانە بۆ ٢٥٠٠ خێزان، یارمەتی بێوێنەی تەندروستی بۆ زیاتر لە ١٥٠٠ کەسی کەمدەرامەت.',
    impactDescription: 'نمرەی بژێوی ژیان لەم ناوچانە بەرزبووەتەوە و هۆشیاری هاوکاری کۆمەڵایەتی زیاتر بووە.',
    recommendations: 'پێشنیار دەکەین لە قۆناغی داهاتوودا هۆشیاری پیشەیی و خولی فێربوون بۆ ئەم خێزانانە دابین بکرێت بۆ ئەوەی ببنە خاوەنی داهاتی خۆیان نەک تەنها کۆمەک و هاوکاری وەربگرن.',
    createdAt: '2025-05-15'
  },
  {
    id: 'report-2',
    title: 'ڕاپۆرتی وەرزی یەکەمی پڕۆژەی توانابەخشینی ژنان',
    reportType: 'quarterly',
    projectId: 'project-women-emp',
    executiveSummary: 'لە ماوەی سێ مانگی ڕابردوودا توانیومانە هەموو کارمەند و کەرەستە پێویستەکان کۆبکەینەوە و خولەکان بۆ ٣٥٠ ژنان لە ماوەیەکی کەمدا دەست پێ بکەین.',
    results: 'سەرکەوتنی گەورە لە ئامادەسازی و دەستپێکردنی خولی خەیاتی و دیجیتاڵ لیتەرەسی، بە ڕێژەی ئامادەبوونی ٩٥% لە خولەکاندا.',
    impactDescription: 'ڕاپۆرتی سەرەتایی پشتبەستوو بە ڕەسەن پیشانی دەدات کە فێرخوازان هیوا و متمانەی زۆریان بە دوارۆژی خۆیان پەیدا کردووە.',
    recommendations: 'پێویستە کاتەکان کەمێک گونجاوتر بکرێن لەگەڵ بارودۆخی دایکایەتی فێرخوازەکان.',
    createdAt: '2025-04-10'
  }
];
