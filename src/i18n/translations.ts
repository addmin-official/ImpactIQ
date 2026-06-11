export type Language = 'ckb' | 'ar' | 'en';

export interface TranslationDictionary {
  nav: {
    dashboard: string;
    projects: string;
    beneficiaries: string;
    impact: string;
    reports: string;
    assistant: string;
    logout: string;
  };
  login: {
    title: string;
    sub_title: string;
    email: string;
    password: string;
    signIn: string;
    system_note: string;
    demo_roles: string;
    login_as: string;
    switch_to: string;
    error_invalid: string;
  };
  dashboard: {
    stats_projects: string;
    stats_beneficiaries: string;
    stats_impact: string;
    stats_reports: string;
    total_budget: string;
    risk_stats: string;
    active_rate: string;
    risk_low: string;
    risk_medium: string;
    risk_high: string;
    recent_activity: string;
    progress_overview: string;
    impact_trends: string;
    currency: string;
    people: string;
    avg_score: string;
    active_projects: string;
  };
  projects: {
    title: string;
    add: string;
    edit: string;
    name: string;
    location: string;
    budget: string;
    start_date: string;
    end_date: string;
    progress: string;
    risk: string;
    description: string;
    key_result: string;
    actions: string;
    delete_confirm: string;
    empty_state: string;
    status: string;
    planning: string;
    active: string;
    completed: string;
    on_hold: string;
    project_details: string;
  };
  beneficiaries: {
    title: string;
    add: string;
    edit: string;
    name: string;
    age: string;
    gender: string;
    location: string;
    type: string;
    select_project: string;
    status: string;
    registration: string;
    male: string;
    female: string;
    registered: string;
    receiving_support: string;
    completed_support: string;
    empty_state: string;
  };
  impact: {
    title: string;
    add: string;
    edit: string;
    target: string;
    pre_result: string;
    post_result: string;
    change: string;
    score: string;
    notes: string;
    actions: string;
    empty_state: string;
    select_project: string;
  };
  reports: {
    title: string;
    create: string;
    edit: string;
    type: string;
    summary: string;
    results: string;
    impact_desc: string;
    recommendations: string;
    created_at: string;
    annual: string;
    quarterly: string;
    monthly: string;
    evaluation: string;
    view_report: string;
    print: string;
    close: string;
    empty_state: string;
    select_project: string;
    report_details: string;
  };
  assistant: {
    title: string;
    placeholder: string;
    send: string;
    initial_msg: string;
    fallback_msg: string;
    q1: string;
    q2: string;
    q3: string;
    q4: string;
    q5: string;
    q6: string;
  };
  common: {
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    add: string;
    close: string;
    role_admin: string;
    role_staff: string;
    role_viewer: string;
    success_added: string;
    success_updated: string;
    success_deleted: string;
    error_permission: string;
    trust_warning: string;
    loading: string;
    search: string;
    no_results: string;
    filter: string;
    all: string;
    required_field: string;
    yes: string;
    no: string;
    confirm: string;
    error_occurred: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  ckb: {
    nav: {
      dashboard: 'پەڕەی سەرەکی',
      projects: 'پڕۆژەکان',
      beneficiaries: 'سوودمەندان',
      impact: 'پێوانەکردنی کاریگەری',
      reports: 'ڕاپۆرتەکان',
      assistant: 'یاریدەدەری زیرەک',
      logout: 'دەرچوون',
    },
    login: {
      title: 'مێشکی زیرەکی پێوانەکردن و هەڵسەنگاندنی کاریگەری پڕۆژەکان',
      sub_title: 'سامانی نیشتمانی بۆ ڕێکخراو و دامەزراوە مرۆییەکان بۆ بەڕێوەبردن و چاودێری پڕۆژەکان بە پاڵپشتی ژیری دەستکرد',
      email: 'ناونیشانی ئیمەیڵ',
      password: 'وشەی تێپەڕ',
      signIn: 'چوونەژوورەوە بۆ سیستەم',
      system_note: 'تێبینی: سیستەمەکە پارێزگاری لە داتا و گەیشتن دەکات تەنها بەپێی دەسەڵاتە فەرمییەکان.',
      demo_roles: 'ڕۆڵەکانی چوونەژوورەوەی تاقیکاری (خێرا)',
      login_as: 'چوونەژوورەوە وەک',
      switch_to: 'گۆڕین بۆ',
      error_invalid: 'ئیمەیڵ یان وشەی تێپەڕ هەڵەیە، تکایە دووبارە تاقیبکەرەوە.',
    },
    dashboard: {
      stats_projects: 'پڕۆژە دەستنیشانکراوەکان',
      stats_beneficiaries: 'سوودمەندانی چالاک',
      stats_impact: 'تێکڕای کاریگەری',
      stats_reports: 'ڕاپۆرتە ئامادەکراوەکان',
      total_budget: 'بودجەی گشتی پڕۆژەکان',
      risk_stats: 'ئاستی مەترسی گشتی',
      active_rate: 'ڕێژەی پێشکەوتن',
      risk_low: 'نزم',
      risk_medium: 'مامناوەند',
      risk_high: 'بەرز',
      recent_activity: 'دوایین گۆڕانکاری و تۆمارەکان',
      progress_overview: 'ڕێژەی پێشکەوتنی پڕۆژە نیشتمانییەکان',
      impact_trends: 'شیکردنەوەی ئاراستەی نمرەکانی کاریگەری',
      currency: 'دۆلار',
      people: 'سوودمەند',
      avg_score: 'نمرە',
      active_projects: 'پڕۆژەکان',
    },
    projects: {
      title: 'بەڕێوەبردنی پڕۆژەکان',
      add: 'زیادکردنی پڕۆژەی نوێ',
      edit: 'دەستکاریکردنی پڕۆژە',
      name: 'ناوی پڕۆژە',
      location: 'شوێنی جوگرافی',
      budget: 'بودجە (USD)',
      start_date: 'ڕێکەوتی دەستپێکردن',
      end_date: 'ڕێکەوتی کۆتایی',
      progress: 'ڕێژەی پێشکەوتن',
      risk: 'ئاستی مەترسی',
      description: 'کورتەی پڕۆژە',
      key_result: 'ئەنجامی سەرەکی چاوەڕوانکراو',
      actions: 'کردارەکان',
      delete_confirm: 'ئایا دڵنیایت لە سڕینەوەی ئەم پڕۆژەیە؟ ئەم کردارە ناگەڕێتەوە.',
      empty_state: 'هیچ پڕۆژەیەک تۆمار نەکراوە یان گەڕانەکەت هیچ ئەنجامێکی نەبوو.',
      status: 'دۆخی پڕۆژە',
      planning: 'پلاندانان',
      active: 'چالاک',
      completed: 'تەواوکراو',
      on_hold: 'ڕاگیراو',
      project_details: 'زانیاری وردی پڕۆژە',
    },
    beneficiaries: {
      title: 'بەڕێوەبردنی سوودمەندان',
      add: 'زیادکردنی سوودمەندی نوێ',
      edit: 'دەستکاریکردنی سوودمەند',
      name: 'ناوی تەواو',
      age: 'تەمەن',
      gender: 'ڕەگەز',
      location: 'شوێنی نیشتەجێبوون',
      type: 'جۆری یارمەتی / خزمەتگوزاری',
      select_project: 'پڕۆژەی پەیوەندیدار دیاری بکە',
      status: 'دۆخی پشتیوانی',
      registration: 'ڕێکەوتی تۆمارکردن',
      male: 'نێر',
      female: 'مێ',
      registered: 'تۆمارکراو',
      receiving_support: 'پاڵپشتی وەردەگرێت',
      completed_support: 'تەواوکراو',
      empty_state: 'هیچ سوودمەندێک تۆمار نەکراوە لەم بەشەدا.',
    },
    impact: {
      title: 'تۆمار و پێوانەکردنی کاریگەری فەرمی',
      add: 'تۆمارکردنی ئامانجی نوێی کاریگەری',
      edit: 'دەستکاریکردنی زانیاری کاریگەری',
      target: 'ئامانجی پێوانەکراو',
      pre_result: 'ڕەوشی بەر لە پڕۆژە',
      post_result: 'دەستکەوتی دوای پڕۆژە',
      change: 'ڕێژەی گۆڕانکاری (%)',
      score: 'نمرەی کاریگەری (١-١٠)',
      notes: 'تێبینی و چاودێری ورد',
      actions: 'کردارەکان',
      empty_state: 'هیچ تۆمارێکی کاریگەری بەردەست نییە بۆ نمایشکردن.',
      select_project: 'پڕۆژە دیاریبکە',
    },
    reports: {
      title: 'سیستەمی دروستکردنی ڕاپۆرتی فەرمی',
      create: 'دروستکردنی ڕاپۆرتی نوێ',
      edit: 'دەستکاریکردنی ڕاپۆرت',
      type: 'جۆری ڕاپۆرت',
      summary: 'پوختەی جێبەجێکردن',
      results: 'ئەنجامە فیزیکی و ژمارەییەکان',
      impact_desc: 'شیکردنەوەی کاریگەری کۆمەڵایەتی/مادی',
      recommendations: 'پێشنیار داهاتووییەکان بۆ گەشەپێدان',
      created_at: 'ڕێکەوتی واژۆکردن',
      annual: 'ساڵانە',
      quarterly: 'وەرزی',
      monthly: 'مانگانە',
      evaluation: 'هەڵسەنگاندنی کۆتایی',
      view_report: 'بینینی ڕاپۆرت و چاپکردن',
      print: 'چاپکردنی ڕاپۆرت',
      close: 'داخستن',
      empty_state: 'هیچ ڕاپۆرتێکی فەرمی ئامادە نەکراوە تا ئێستا.',
      select_project: 'پڕۆژەی فەرمی دیاریبکە',
      report_details: 'ڕاپۆرتی فەرمی هەڵسەنگاندنی پڕۆژە',
    },
    assistant: {
      title: 'مێشکی زیرەک - یاریدەدەری شیکاری پێشکەوتوو',
      placeholder: 'پرسیارێک ئاراستەی ژیری دەستکرد بکە سەبارەت بە پڕۆژەکان، بودجە یان کاریگەری...',
      send: 'ناردن',
      initial_msg: 'سڵاو. من یاریدەدەری زیرەکی سیستەمی پێوانەکردنی کاریگەری پڕۆژەکانم. کار دەکەم بە سەرنجدان تەنها لەسەر داتا تۆمارکراوەکان لە بنکەداتا بۆ وەڵامدانەوەی پرسیارەکانت بە شێوەیەکی فەرمی و زانستی بە زمانی کوردی.',
      fallback_msg: 'ئەم زانیارییە لە داتای ئێستادا بەردەست نییە.',
      q1: 'کام پڕۆژە زۆرترین مەترسی هەیە؟',
      q2: 'باشترین پڕۆژە لە ڕووی کاریگەرییەوە کامەیە؟',
      q3: 'ژمارەی گشتی سوودمەندان چەندە؟',
      q4: 'ڕاپۆرتی کورت بۆ پڕۆژەی کەمکردنەوەی پاشماوەی خۆراک دروست بکە.',
      q5: 'پێشنیاری چاکسازی بۆ پڕۆژەکان بدە.',
      q6: 'کام پڕۆژە پێویستی بە چاودێری زیاتر هەیە؟',
    },
    common: {
      save: 'پاشەکەوتکردن',
      cancel: 'پاشگەزبوونەوە',
      delete: 'سڕینەوە',
      edit: 'دەستکاریکردن',
      add: 'زیادکردن',
      close: 'داخستن',
      role_admin: 'بەڕێوەبەر',
      role_staff: 'کارمەند',
      role_viewer: 'بینەر',
      success_added: 'بە سەرکەوتوویی زیادکرا!',
      success_updated: 'زانیارییەکان نوێکرانەوە!',
      success_deleted: 'بە سەرکەوتوویی سڕایەوە!',
      error_permission: 'تۆ دەسەڵاتی پێویستت نییە بۆ مەبەستی ئەم کردارە.',
      trust_warning: 'بەرپرسیارێتی متمانە: هەر دەستکارییەک ڕاستەوخۆ پاشەکەوت دەبێت لە داتای دیمۆ.',
      loading: 'باردەکرێت...',
      search: 'گەڕان بەدوای...',
      no_results: 'هیچ ئەنجامێک نەدۆزرایەوە',
      filter: 'فلتەرکردن',
      all: 'هەموو',
      required_field: 'ئەم کێڵگەیە داواکراوە',
      yes: 'بەڵێ',
      no: 'نەخێر',
      confirm: 'تەئکیدکردنەوە',
      error_occurred: 'هەڵەیەک ڕوویدا لە کاتی پەیوەندی کردن بە سێرڤەر.',
    },
  },
  ar: {
    nav: {
      dashboard: 'لوحة التحكم',
      projects: 'المشاريع',
      beneficiaries: 'المستفيدون',
      impact: 'قياس الأثر',
      reports: 'التقارير',
      assistant: 'المساعد الذكي',
      logout: 'تسجيل الخروج',
    },
    login: {
      title: 'العقل الذكي لقياس وتقييم أثر المشاريع',
      sub_title: 'منصة وطنية للمنظمات والمؤسسات الإنسانية لإدارة ومراقبة المشاريع بدعم من الذكاء الاصطناعي',
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      signIn: 'تسجيل الدخول إلى النظام',
      system_note: 'ملاحظة: يحافظ النظام على أمان البيانات ويسمح بالوصول فقط وفق الصلاحيات الرسمية.',
      demo_roles: 'أدوار تسجيل الدخول التجريبي للحسابات (سريع)',
      login_as: 'تسجيل الدخول بصفة',
      switch_to: 'التبديل إلى',
      error_invalid: 'البريد الإلكتروني أو كلمة المرور غير صحيحة، يرجى المحاولة مرة أخرى.',
    },
    dashboard: {
      stats_projects: 'المشاريع المسجلة',
      stats_beneficiaries: 'المستفيدون النشطون',
      stats_impact: 'متوسط درجة الأثر',
      stats_reports: 'التقارير المنجزة',
      total_budget: 'الميزانية الإجمالية للمشاريع',
      risk_stats: 'مستوى المخاطر العام',
      active_rate: 'نسبة التقدم',
      risk_low: 'منخفض',
      risk_medium: 'متوسط',
      risk_high: 'مرتفع',
      recent_activity: 'آخر التغييرات والسجلات المحدثة',
      progress_overview: 'نسبة الإنجاز في المشاريع الوطنية',
      impact_trends: 'تحليل اتجاه درجات الأثر',
      currency: 'دولار',
      people: 'مستفيد',
      avg_score: 'درجة',
      active_projects: 'مشاريع',
    },
    projects: {
      title: 'إدارة المشاريع',
      add: 'إضافة مشروع جديد',
      edit: 'تعديل المشروع',
      name: 'اسم المشروع',
      location: 'الموقع الجغرافي',
      budget: 'الميزانية (USD)',
      start_date: 'تاريخ البدء',
      end_date: 'تاريخ الانتهاء',
      progress: 'نسبة التقدم',
      risk: 'مستوى المخاطر',
      description: 'وصف المشروع',
      key_result: 'النتيجة الرئيسية المتوقعة',
      actions: 'الإجراءات',
      delete_confirm: 'هل أنت متأكد من حذف هذا المشروع؟ هذا الإجراء لا يمكن التراجع عنه.',
      empty_state: 'لم يتم تسجيل أي مشروع حالياً، أو لم تسفر عملية البحث عن نتائج.',
      status: 'حالة المشروع',
      planning: 'قيد التخطيط',
      active: 'نشط',
      completed: 'مكتمل',
      on_hold: 'متوقف مؤقتاً',
      project_details: 'تفاصيل المشروع الرسمية',
    },
    beneficiaries: {
      title: 'إدارة المستفيدين',
      add: 'إضافة مستفيد جديد',
      edit: 'تعديل مستفيد',
      name: 'الاسم الكامل',
      age: 'العمر',
      gender: 'الجنس',
      location: 'محل الإقامة',
      type: 'نوع الخدمة / المساعدة للمستفيد',
      select_project: 'حدد المشروع المرتبط',
      status: 'حالة الدعم والاستفادة',
      registration: 'تاريخ التسجيل',
      male: 'ذكر',
      female: 'أنثى',
      registered: 'مسجل',
      receiving_support: 'يتلقى الدعم',
      completed_support: 'مكتمل الدعم',
      empty_state: 'لا يوجد أي مستفيدين مسجلين في هذا القسم حالياً.',
    },
    impact: {
      title: 'سجلات وقياس الأثر الرسمي',
      add: 'تسجيل هدف أثر جديد للمشروع',
      edit: 'تعديل بيانات الأثر',
      target: 'الهدف المقاس',
      pre_result: 'الوضع قبل المشروع',
      post_result: 'النتيجة بعد تنفيذ المشروع',
      change: 'نسبة التغيير المئوية (%)',
      score: 'درجة الأثر الكيانية (١-١٠)',
      notes: 'الملاحظات والرصد الدقيق',
      actions: 'الإجراءات والعمليات',
      empty_state: 'لا توجد سجلات قياس أثر متاحة للعرض.',
      select_project: 'اختر المشروع',
    },
    reports: {
      title: 'منظومة إعداد التقارير الرسمية',
      create: 'إعداد تقرير جديد',
      edit: 'تعديل التقرير',
      type: 'نوع التقرير',
      summary: 'الملخص التنفيذي للأعمال',
      results: 'النتائج الملموسة المحددة بمقاييس',
      impact_desc: 'تحليل الأثر الاجتماعي والمادي',
      recommendations: 'التوصيات والملاحظات المستقبلية للتطوير',
      created_at: 'تاريخ التوقيع والتحرير',
      annual: 'سنوي',
      quarterly: 'ربع سنوي',
      monthly: 'شهري',
      evaluation: 'تقييم نهائي',
      view_report: 'معاينة التقرير والطباعة',
      print: 'طباعة التقرير الفني',
      close: 'إغلاق المعاينة',
      empty_state: 'لم يتم إصدار أي كشوف تقارير رسمية للمشاريع بعد.',
      select_project: 'حدد المشروع الرسمي',
      report_details: 'تقرير التقييم الفني للمشاريع المنجزة',
    },
    assistant: {
      title: 'العقل الذكي - المساعد التحليلي المتقدم',
      placeholder: 'اسأل الذكاء الاصطناعي عن المشاريع والتقديرات المالية ودرجات الأثر والمخاطر...',
      send: 'إرسال',
      initial_msg: 'مرحباً بك. أنا المساعد الذكي لنظام قياس وتقييم أثر المشاريع. أعمل بالاعتماد حصرياً على البيانات المسجلة في قواعد البيانات للإجابة عن استفساراتك بشكل رسمي ودقيق باللغة العربية.',
      fallback_msg: 'هذه المعلومة غير متوفرة في البيانات الحالية.',
      q1: 'ما هي المشاريع الأكثر عرضة للمخاطر؟',
      q2: 'ما هو المشروع الأفضل من حيث الأثر؟',
      q3: 'ما هو العدد الإجمالي للمستفيدين؟',
      q4: 'قم بإنشاء تقرير ملخص لمشروع كمتناول لتقليل هدر الطعام.',
      q5: 'قدم توصيات لتحسين المشاريع الحالية.',
      q6: 'ما هو المشروع الذي يحتاج لمتابعة دقيقة؟',
    },
    common: {
      save: 'حفظ التغييرات',
      cancel: 'إلغاء الأمر',
      delete: 'حذف السجل',
      edit: 'تعديل',
      add: 'إضافة جديدة',
      close: 'إغلاق',
      role_admin: 'المدير',
      role_staff: 'מוظف (کارمەند)',
      role_viewer: 'مشاهد',
      success_added: 'تمت الإضافة بنجاح في النظام!',
      success_updated: 'تم تحديث البيانات بنجاح!',
      success_deleted: 'تم الحذف بنجاح من النظام!',
      error_permission: 'ليست لديك الصلاحيات الكافية لتنفيذ هذا الإجراء.',
      trust_warning: 'مسؤولية الثقة: أي تعديل تقوم به يتم حفظه مباشرة في بيانات العرض التوضيحي.',
      loading: 'جاري التحميل...',
      search: 'بحث عن موضع...',
      no_results: 'لم يتم العثور على نتائج مطابقة',
      filter: 'تصفية',
      all: 'الكل',
      required_field: 'هذا الحقل مطلوب تعبئته',
      yes: 'نعم',
      no: 'لا',
      confirm: 'تأكيد العملية',
      error_occurred: 'حدث خطأ أثناء محاولة الاتصال بالخادم.',
    },
  },
  en: {
    nav: {
      dashboard: 'Dashboard',
      projects: 'Projects',
      beneficiaries: 'Beneficiaries',
      impact: 'Impact Measurement',
      reports: 'Reports',
      assistant: 'AI Assistant',
      logout: 'Logout',
    },
    login: {
      title: 'ImpactIQ - Project Measurement & Evaluation Brain',
      sub_title: 'A national intelligence platform for NGOs and humanitarian institutions to manage and evaluate projects with advanced AI capabilities',
      email: 'Email Address',
      password: 'Password',
      signIn: 'Sign In to System',
      system_note: 'Note: The system preserves data integrity and enforces strict role-based access control.',
      demo_roles: 'Select Demo Sandbox Accounts (Fast Access)',
      login_as: 'Sign in as',
      switch_to: 'Switch to',
      error_invalid: 'Invalid email address or passcode. Please check and retry.',
    },
    dashboard: {
      stats_projects: 'Registered Projects',
      stats_beneficiaries: 'Active Beneficiaries',
      stats_impact: 'Average Impact Score',
      stats_reports: 'Formulated Reports',
      total_budget: 'Overall Cumulative Budget',
      risk_stats: 'Overall Cumulative Risk',
      active_rate: 'Implementation Progress',
      risk_low: 'Low',
      risk_medium: 'Medium',
      risk_high: 'High',
      recent_activity: 'Recent System Activities & Audits',
      progress_overview: 'National Project Progress Rates',
      impact_trends: 'Project Social Impact Trends',
      currency: 'USD',
      people: 'Beneficiaries',
      avg_score: 'Score',
      active_projects: 'Projects',
    },
    projects: {
      title: 'Project Management',
      add: 'Add Project',
      edit: 'Edit Project details',
      name: 'Project Name',
      location: 'Geographic Location',
      budget: 'Budget (USD)',
      start_date: 'Start Date',
      end_date: 'Target End Date',
      progress: 'Progress Rate',
      risk: 'Risk Level',
      description: 'Executive Summary',
      key_result: 'Core Anticipated KPI Result',
      actions: 'System Actions',
      delete_confirm: 'Are you absolutely verified to delete this project? This process is irreversible.',
      empty_state: 'No registered project datasets found, or search criteria cleared all arrays.',
      status: 'Project Status',
      planning: 'Planning',
      active: 'Active',
      completed: 'Completed',
      on_hold: 'On Hold',
      project_details: 'Standard Project Specifications',
    },
    beneficiaries: {
      title: 'Beneficiary Management',
      add: 'Add Beneficiary',
      edit: 'Edit Beneficiary details',
      name: 'Full Legal Name',
      age: 'Age',
      gender: 'Gender',
      location: 'Residential District',
      type: 'Supplied Support Type',
      select_project: 'Select Associated Project',
      status: 'Support Delivery Status',
      registration: 'Registration Date',
      male: 'Male',
      female: 'Female',
      registered: 'Registered',
      receiving_support: 'Receiving Support',
      completed_support: 'Service Concluded',
      empty_state: 'No registered beneficiaries found in this category at this moment.',
    },
    impact: {
      title: 'Impact Log & Assessment Metrics',
      add: 'Record Project Impact Objective',
      edit: 'Edit Impact Metrics',
      target: 'Measurable Focus Objective',
      pre_result: 'Baseline (Pre-Project State)',
      post_result: 'Outcome (Post-Project Result)',
      change: 'Relative Shift Rate (%)',
      score: 'Ascribed Impact Score (1-10)',
      notes: 'Descriptive Context & Field Logs',
      actions: 'System Action Operations',
      empty_state: 'No active impact logs have been catalogued yet.',
      select_project: 'Select Project',
    },
    reports: {
      title: 'Technical M&E Reporting System',
      create: 'Create Evaluation Report',
      edit: 'Edit Report Specifications',
      type: 'Reporting Standard Type',
      summary: 'Executive Abstract Summary',
      results: 'Quantifiable Quantative Outcomes',
      impact_desc: 'Synthesized Social/Environmental Impact',
      recommendations: 'Strategic Lessons & Next Interventions',
      created_at: 'Date of Completion',
      annual: 'Annual Report',
      quarterly: 'Quarterly Audit',
      monthly: 'Daily-Monthly Log',
      evaluation: 'End-Line Evaluation',
      view_report: 'Preview Document & Print Layout',
      print: 'Print Technical Report',
      close: 'Close Window',
      empty_state: 'No official report sheets are currently saved.',
      select_project: 'Select Official Project Link',
      report_details: 'Technical Assessment Project Report',
    },
    assistant: {
      title: 'AI M&E Intelligence Assistant',
      placeholder: 'Ask the smart system about project financials, risks, KPIs, or outcomes...',
      send: 'Transmit',
      initial_msg: 'Greetings. I am the intelligence assistant for the Project Impact Measurement and Evaluation platform. I reference only active system data to assist you scientifically in English.',
      fallback_msg: 'This information is not available in the current data.',
      q1: 'Which project carries the highest risk level?',
      q2: 'Which project scores highest in terms of social impact?',
      q3: 'What is the sum-total number of active beneficiaries?',
      q4: 'Synthesize a brief report for the Food Waste Reduction project.',
      q5: 'What are some reform suggestions for our active projects?',
      q6: 'Which projects require urgent monitoring intervention?',
    },
    common: {
      save: 'Save Changes',
      cancel: 'Abort',
      delete: 'Delete Record',
      edit: 'Edit',
      add: 'Add New',
      close: 'Hide',
      role_admin: 'Administrator',
      role_staff: 'Staff',
      role_viewer: 'Viewer',
      success_added: 'Succeeded in appending resource safely!',
      success_updated: 'Resource database values updated!',
      success_deleted: 'Resource successfully deleted from indexes!',
      error_permission: 'Your active system credential level denies this request.',
      trust_warning: 'Fiduciary Duty: Any modification you process saves immediately into the active demo registers.',
      loading: 'Synthesizing database buffers...',
      search: 'Search criteria...',
      no_results: 'No records match search',
      filter: 'Filter registers',
      all: 'All',
      required_field: 'This parameter is structurally required',
      yes: 'Yes',
      no: 'No',
      confirm: 'Assert Transaction',
      error_occurred: 'An error occurred establishing contact with the secure backend.',
    },
  },
};
