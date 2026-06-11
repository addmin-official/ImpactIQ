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
    appName: string;
    chooseLanguage: string;
    continue: string;
    adminDemo: string;
    staffDemo: string;
    viewerDemo: string;
    platformDesc: string;
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
    theme_dark: string;
    theme_light: string;
    theme_toggle: string;
  };
  landing: {
    hero_title: string;
    hero_subtitle: string;
    hero_desc: string;
    primary_cta: string;
    secondary_cta: string;
    proof_title: string;
    proof_faster_reporting_title: string;
    proof_faster_reporting_val: string;
    proof_faster_reporting_desc: string;
    proof_cleaner_beneficiary_title: string;
    proof_cleaner_beneficiary_val: string;
    proof_cleaner_beneficiary_desc: string;
    proof_donor_visibility_title: string;
    proof_donor_visibility_val: string;
    proof_donor_visibility_desc: string;
    proof_evidence_title: string;
    proof_evidence_val: string;
    proof_evidence_desc: string;
    problem_title: string;
    problem_subtitle: string;
    problem_excel: string;
    problem_excel_desc: string;
    problem_delayed_reports: string;
    problem_delayed_reports_desc: string;
    problem_weak_beneficiary: string;
    problem_weak_beneficiary_desc: string;
    problem_unclear_outcomes: string;
    problem_unclear_outcomes_desc: string;
    problem_donor_pressure: string;
    problem_donor_pressure_desc: string;
    solution_title: string;
    solution_subtitle: string;
    solution_one_platform: string;
    solution_one_platform_desc: string;
    solution_ai: string;
    solution_ai_desc: string;
    solution_donor_ready: string;
    solution_donor_ready_desc: string;
    solution_multilingual: string;
    solution_multilingual_desc: string;
    mockup_title: string;
    mockup_active_score: string;
    mockup_beneficiaries_reached: string;
    mockup_data_validity: string;
    mockup_system_health: string;
    mockup_report_preview: string;
    mockup_assessment_verified: string;
    final_cta_title: string;
    final_cta_subtitle: string;
    final_cta_primary: string;
    final_cta_secondary: string;
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
      appName: 'ImpactIQ',
      chooseLanguage: 'زمان هەڵبژێرە',
      continue: 'بەردەوام بە',
      adminDemo: 'دیمۆی بەڕێوەبەر',
      staffDemo: 'دیمۆی کارمەند',
      viewerDemo: 'دیمۆی بینەر',
      platformDesc: 'پلاتفۆرمێکی زیرەک بۆ ڕاپۆرتسازی، سوودمەندان و پێوانەکردنی کاریگەری',
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
      theme_dark: 'دۆخی تاریک',
      theme_light: 'دۆخی ڕوون',
      theme_toggle: 'گۆڕینی دۆخی ڕەنگ',
    },
    landing: {
      hero_title: 'پێوانەکردنی فەرمی و شیکردنەوەی کاریگەری پڕۆژەکان بە پاڵپشتی ژیری دەستکرد',
      hero_subtitle: 'سیستەمی فەرمی بۆ ڕێکخراوە ناحکومییەکان (NGO) و خێرخوازان',
      hero_desc: 'سیستەمێکی فەرمی لۆکاڵی بۆ کۆکردنەوەی داتا، گەیشتن بە زانیارییە دیمۆگرافییەکان، بەدواداچوونی گەشەی سوودمەندان و پێدانی ڕاپۆرتی زانستی بە خێرخوازانی نێودەوڵەتی بە شێوەیەکی فەرمی.',
      primary_cta: 'چوونەژورەوە بۆ پلاتفۆرم',
      secondary_cta: 'بینینی ڕۆڵە تاقیکارییەکان',
      proof_title: 'داتای نموونەیی گەشەی کارایی پلاتفۆرم',
      proof_faster_reporting_title: 'خێرایی لە دروستکردنی ڕاپۆرت',
      proof_faster_reporting_val: '١٠ جار',
      proof_faster_reporting_desc: 'کەمکردنەوەی کاتی کۆکردنەوە و ئامادەکردنی زانیارییەکان بۆ پشتیوانانی دارایی.',
      proof_cleaner_beneficiary_title: 'پاککردنەوەی داتای سوودمەندان',
      proof_cleaner_beneficiary_val: '٩٩.٧%',
      proof_cleaner_beneficiary_desc: 'کەمکردنەوەی تۆمارە دووبارەبووەکان و چاککردنی زانیاری دیمۆگرافی بۆ بەخشین.',
      proof_donor_visibility_title: 'ڕوونی زانیارییەکان بۆ بەخشەران',
      proof_donor_visibility_val: '١0٠%',
      proof_donor_visibility_desc: 'پیشاندانی داتای پڕۆژە لۆکاڵییەکان بە شێوەیەکی ڕاستەوخۆ بەبێ دواکەوتن.',
      proof_evidence_title: 'بەڵگەی دامەزراوی کاریگەری',
      proof_evidence_val: '٤ بەش',
      proof_evidence_desc: 'بەهێزکردنی بڕیارەکان بەپێی تۆماری نمرەکانی چاکبوونی لایەنی مادی و کۆمەڵایەتی سوودمەند.',
      problem_title: 'کێشەکانی شێوازی نەریتی لە پێوانەکردنی کاریگەری',
      problem_subtitle: 'بۆچی شێوازە کۆنەکان کارایی پێویست نادەن بە ڕێکخراو و بەخشەران؟',
      problem_excel: 'فایلەکانی ئێکسڵی پەرشوبڵاو',
      problem_excel_desc: 'تۆمارکردنی دەرەکی متمانەی پاراستن کەم دەکاتەوە و ئەگەری ونبوون یان تێکچوونی زانیارییەکان زیاترە.',
      problem_delayed_reports: 'ڕاپۆرتە دواکەوتووەکان',
      problem_delayed_reports_desc: 'ئامادەکردنی ڕاپۆرتی فەرمی دوای جێبەجێکردنی پڕۆژەکان ڕێگرە لە گرتنەبەری ڕێوشوێنی پێویست لە کاتی گونجاودا.',
      problem_weak_beneficiary: 'نەبوونی تیشک لەسەر سوودمەند',
      problem_weak_beneficiary_desc: 'بەدواداچوون تەنها بۆ پڕۆسەکان دەکرێت بەبێ پێوانەکردنی گۆڕانکارییە مادی و سایکۆلۆژییەکانی ناو ژیانی سوودمەند.',
      problem_unclear_outcomes: 'مژاویبوونی دەرەنجامەکان',
      problem_unclear_outcomes_desc: 'بۆچوونی بەخشەران ناڕوون دەبێت بەهۆی نەبوونی پێوەرێکی باوەڕپێکراو بۆ نمرەدان بە کاریگەری.',
      problem_donor_pressure: 'فشاری ڕاپۆرتسازی خێرخوازان',
      problem_donor_pressure_desc: 'زیادبوونی مەرجی توند بۆ ڕاپۆرتسازی خێرا و متمانەپێکراو کاتێکی زۆری تیمەکان لۆکاڵییەکان دەگرێت.',
      solution_title: 'پلاتفۆرمی ImpactIQ: چارەسەری یەکگرتوو',
      solution_subtitle: 'سیستەمێکی بەهێزی ناوەکی بۆ ژماردنی کاریگەری ڕاستەقینە',
      solution_one_platform: 'یەک پلاتفۆرمی تەکامول',
      solution_one_platform_desc: 'کۆکردنەوەی زانیاری پڕۆژەکان، تۆماری سوودمەندان، نمرەی باشتربوون و ڕاپۆرتواژۆکراو لە یەک شوێنی پارێزراودا.',
      solution_ai: 'یاریدەدەری زیرەکی فەرمی',
      solution_ai_desc: 'شیکردنەوەی داتاکان ڕاستەوخۆ بەپێی بەڵگە لۆکاڵییەکان کە یارمەتیت دەدات پێشنیاری چاکسازی بۆ لایەنەکان دروست بکەیت.',
      solution_donor_ready: 'ڕاپۆرتی ئامادەکراو بۆ بەخشەران',
      solution_donor_ready_desc: 'دروستکردنی ڕاپۆرتی مانگانە، وەرزی و ساڵانە لەگەڵ ئامارەکان بە تەنها یەک کلیک.',
      solution_multilingual: 'پشتیوانی زمانە نیشتمانییەکان',
      solution_multilingual_desc: 'کارکردنی تەواوی سیستەمەکە و وەڵامەکانی ژیری دەستکرد بە زمانەکانی کوردی سۆرانی، عەرەبی، و ئینگلیزی.',
      mockup_title: 'نموونەی ڕووکاری شیکاری کاریگەری پڕۆژە (داتا تاقیکاری)',
      mockup_active_score: 'نمرەی گشتی کاریگەری لۆکاڵی',
      mockup_beneficiaries_reached: 'ژمارەی گەیشتن بە سوودمەندان',
      mockup_data_validity: 'ڕێژەی پاراستن و دروستی داتا',
      mockup_system_health: 'متمانەی تۆماری ڕاپۆرتەکان',
      mockup_report_preview: 'پێشبینینی ڕاپۆرتی فەرمی ImpactIQ',
      mockup_assessment_verified: 'هەڵسەنگاندنی فەرمی باوەڕپێکراو',
      final_cta_title: 'ئامادەیت بۆ سەرکردایەتیکردنی پڕۆژەکانت بەپێی داتا؟',
      final_cta_subtitle: 'دەستپێبکە بە تاقیکردنەوەی پلاتفۆرمەکە لە ڕێگەی دیمۆ فەرمییەکانەوە بۆ تێگەیشتن لە سیستەمەکە.',
      final_cta_primary: 'تیشک بخەرە سەر پلاتفۆرم',
      final_cta_secondary: 'هەڵبژاردنی زمان و دەستپێک',
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
      appName: 'ImpactIQ',
      chooseLanguage: 'اختر اللغة',
      continue: 'المتابعة',
      adminDemo: 'عرض المدير',
      staffDemo: 'عرض الموظف',
      viewerDemo: 'عرض المشاهد',
      platformDesc: 'منصة ذكية للتقارير والمستفيدين وقياس الأثر',
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
      theme_dark: 'الوضع الداكن',
      theme_light: 'الوضع الفاتح',
      theme_toggle: 'تغيير المظهر',
    },
    landing: {
      hero_title: 'القياس الفني والتحليل الذكي لأثر المشاريع التنموية بدعم الذكاء الاصطناعي',
      hero_subtitle: 'النظام التقييمي المعتمد للمنظمات غير الحكومية والممولين الدوليين',
      hero_desc: 'نظام داخلي متكامل مخصص لجمع البيانات الميدانية، وتتبع فئات ديموغرافية متعددة للمستفيدين، مع صياغة تقارير فنية موثقة تلبي أعلى المعايير المهنية للمانحين.',
      primary_cta: 'الدخول إلى المنصة',
      secondary_cta: 'عرض الأدوار التجريبية',
      proof_title: 'مؤشرات تجريبية تعكس كفاءة إدارة الأثر بالرصد الرقمي',
      proof_faster_reporting_title: 'سرعة تحرير التقارير',
      proof_faster_reporting_val: '١٠ أضعاف',
      proof_faster_reporting_desc: 'تقليص الزمن المستهلك في تبويب البيانات وإعداد الكشوف المخصصة للشركاء الدوليين.',
      proof_cleaner_beneficiary_title: 'تنقية سجلات المستفيدين',
      proof_cleaner_beneficiary_val: '٩٩.٧٪',
      proof_cleaner_beneficiary_desc: 'الحد من تكرار السجلات وتأكيد الهوية الجغرافية والفئوية للخدمات المقدمة.',
      proof_donor_visibility_title: 'شفافية كاملة للمانحين',
      proof_donor_visibility_val: '١٠٠٪',
      proof_donor_visibility_desc: 'إتاحة رصد فوري للنتائج المباشرة للمشاريع بشكل آمن وبثقة تامة.',
      proof_evidence_title: 'توثيق علمي للأثر المحقق',
      proof_evidence_val: '٤ فئات',
      proof_evidence_desc: 'دعم اتخاذ القرار بالاعتماد على درجات قياس التحول الاجتماعي والاقتصادي لدى المستهدفين.',
      problem_title: 'تحديات الأساليب التقليدية لتقييم الأثر الميداني',
      problem_subtitle: 'لماذا تواجه المنظمات صعوبة في تلبية متطلبات المانحين بالوسائل القديمة؟',
      problem_excel: 'ملفات وجداول إكسل المبعثرة',
      problem_excel_desc: 'صعوبة تتبع التحديثات وأخطاء التعديل اليدوي تهُدد مصداقية البيانات المسجلة وتكاملها.',
      problem_delayed_reports: 'تقارير فنية متأخرة الصدور',
      problem_delayed_reports_desc: 'صدور مراجعات الأثر بعد أشهر من انتهاء التدخل يعيق إمكانية المعالجة والتوجيه السليم للمشروع.',
      problem_weak_beneficiary: 'إهمال قياس واقع تحول المستفيد',
      problem_weak_beneficiary_desc: 'التركيز على مخرجات العمل المادية وحساب التكاليف دون رصد التغير الحقيقي في جودة حياة المستهدفين.',
      problem_unclear_outcomes: 'مخرجات غير واضحة المقاييس',
      problem_unclear_outcomes_desc: 'صعوبة تحديد كفاءة الأنشطة الميدانية بسبب غياب درجات ومؤشرات تقييم معيارية.',
      problem_donor_pressure: 'ضغوط المانحين للتقارير الفنية',
      problem_donor_pressure_desc: 'تزايد المتطلبات التقنية الصارمة لتقديم مسوغات الأثر بشكل منتظم يزيد الأعباء الإدارية والفنية.',
      solution_title: 'منصة ImpactIQ: نموذج مستقبلي متكامل للقياس',
      solution_subtitle: 'خيار تقني مرن لحساب اتجاهات الأثر الميداني وصياغة الوثائق المصدقة',
      solution_one_platform: 'منصة مركزية ثنائية التوجه',
      solution_one_platform_desc: 'دمج سجلات البرامج، وملفات التعريف للمستفيدين، وتتبع نمر التحسن، وتقارير الحوكمة في مسار واحد.',
      solution_ai: 'مستشار رصد ذكي',
      solution_ai_desc: 'شیکردنەوەی داتاکان بە یارمەتی ژیری دەستکردی ناوەکی کە تەنها پشت بە داتا فەرمییەکانی سیستەمەکە دەبەستێت.',
      solution_donor_ready: 'تقارير جاهزة للمانحين بنقرة واحدة',
      solution_donor_ready_desc: 'إصدار كشوف تقييم فنية شاملة (ثانوية، ربع سنوية، سنوية) متوافقة بالكامل مع قواعد المراجعة الدولية.',
      solution_multilingual: 'دعم كامل للغات الإقليمية',
      solution_multilingual_desc: 'واجهات كاملة ونظام معالجة لغوي ومعرفي متكامل للغات الكردية السورانية، العربية، والإنجليزية.',
      mockup_title: 'نموذج لوحة رصد الأداء الفني وأثر المبادرات (بيانات تجريبية)',
      mockup_active_score: 'المعدل العام لقياس الأثر التنموي',
      mockup_beneficiaries_reached: 'إجمالي الوصول للمستفيدين النشطين',
      mockup_data_validity: 'معدل موثوقية السجلات والبيانات',
      mockup_system_health: 'اعتماد جودة التقارير المصدقة',
      mockup_report_preview: 'معاينة هيكلية لتقرير ImpactIQ الرسمي',
      mockup_assessment_verified: 'أثر معتمد خاضع للمراجعة والتقييم',
      final_cta_title: 'هل أنت مستعد لقيادة برامجك التنموية بالبيانات الدقيقة؟',
      final_cta_subtitle: 'ابدأ بتجربة بيئة العمل التفاعلية عبر الحسابات التجريبية للمنصة لاستكشاف المزايا التقنية.',
      final_cta_primary: 'استعراض بوابة المنصة',
      final_cta_secondary: 'تحديد اللغة والبدء الفوري',
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
      appName: 'ImpactIQ',
      chooseLanguage: 'Choose language',
      continue: 'Continue',
      adminDemo: 'Admin demo',
      staffDemo: 'Staff demo',
      viewerDemo: 'Viewer demo',
      platformDesc: 'An intelligent platform for reporting, beneficiaries, and impact measurement',
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
      theme_dark: 'Dark mode',
      theme_light: 'Light mode',
      theme_toggle: 'Toggle theme',
    },
    landing: {
      hero_title: 'Evidence-Based Project Impact Measurement & M&E Evaluation Brain',
      hero_subtitle: 'The Standard Analytical System for NGOs, Interventions, and Global Donors',
      hero_desc: 'Streamline trilingual data collection, analyze target demographics, track beneficiary progress, and generate professional donor-ready evaluation sheets backed by system data.',
      primary_cta: 'Enter Platform',
      secondary_cta: 'View Demo Sandbox Roles',
      proof_title: 'Demo metrics illustrating digital monitoring efficiency',
      proof_faster_reporting_title: 'Accelerated Reporting',
      proof_faster_reporting_val: '10x Faster',
      proof_faster_reporting_desc: 'Reduces time spent compiling field logs and tables into donor-compliant evaluation briefs.',
      proof_cleaner_beneficiary_title: 'Pristine Beneficiary Data',
      proof_cleaner_beneficiary_val: '99.7%',
      proof_cleaner_beneficiary_desc: 'Eliminates duplicate beneficiary registrations and maps geographic assistance levels with precision.',
      proof_donor_visibility_title: 'Complete Donor Visibility',
      proof_donor_visibility_val: '100% Real-Time',
      proof_donor_visibility_desc: 'Exposes localized field outputs and budget execution states safely with absolute clarity.',
      proof_evidence_title: 'Tangible Social Evidence',
      proof_evidence_val: '4 Categories',
      proof_evidence_desc: 'Enforces quantitative assessment logs based on real pre-post intervention progress scores.',
      problem_title: 'Why Traditional Impact Measurement Fails',
      problem_subtitle: 'The pain points local NGOs face while gathering evidence under donor standards',
      problem_excel: 'Scattered Spreadsheets & Excel Files',
      problem_excel_desc: 'Manual updates, broken formulas, and separate files undermine data integrity and safety audits.',
      problem_delayed_reports: 'Severe Post-Intervention Reporting Lag',
      problem_delayed_reports_desc: 'Receiving reports months after activities conclude limits the ability to course-correct live projects.',
      problem_weak_beneficiary: 'Missing Real Status of Beneficiaries',
      problem_weak_beneficiary_desc: 'Failing to track physical and psychological progress results in empty counting with no qualitative proof.',
      problem_unclear_outcomes: 'Ambiguous Intervention Success Outcomes',
      problem_unclear_outcomes_desc: 'Without standard assessment scores (1-10), comparing separate initiatives is deeply subjective.',
      problem_donor_pressure: 'Intense Global Strategic Reporting Pressure',
      problem_donor_pressure_desc: 'Donors mandate rigid logs of every dollar spent, overwhelming local M&E field staff with compliance.',
      solution_title: 'The ImpactIQ Platform: Harmonized Evaluation',
      solution_subtitle: 'One unified environment to track outcomes, handle cohorts, and automate analytics',
      solution_one_platform: 'A Single Source of Truth',
      solution_one_platform_desc: 'Unifies localized projects, beneficiary demography, pre-post outcome logs, and formal sign-offs in one place.',
      solution_ai: 'AI M&E Analytical Copilot',
      solution_ai_desc: 'Translates and evaluates field data to suggest immediate strategic adjustments grounded purely on actual facts.',
      solution_donor_ready: 'Donor-Ready Reporting in Seconds',
      solution_donor_ready_desc: 'Produces highly detailed, compliant annual, quarterly, or monthly evaluation exports in one single tap.',
      solution_multilingual: 'True Trilingual Kurdish, Arabic, & English',
      solution_multilingual_desc: 'Complete system translation and localization enabling staff and observers to query in their working language.',
      mockup_title: 'Interactive Project Analytics Dashboard Mockup (Demo Registry)',
      mockup_active_score: 'Cumulative Project Impact Score',
      mockup_beneficiaries_reached: 'Total Verified Active Reach',
      mockup_data_validity: 'System Ledger Verification Rate',
      mockup_system_health: 'Audit Trust & Report Health',
      mockup_report_preview: 'ImpactIQ Official Document Preview',
      mockup_assessment_verified: 'Verified Technical M&E Assessment',
      final_cta_title: 'Ready to drive NGO interventions with data integrity?',
      final_cta_subtitle: 'Step into the live workspace inside the sandbox using preset roles to discover platform features.',
      final_cta_primary: 'Enter the Platform Workspace',
      final_cta_secondary: 'Switch Language / Go to Top',
    },
  },
};
