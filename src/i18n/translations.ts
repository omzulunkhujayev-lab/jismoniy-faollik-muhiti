export type Language = 'uz' | 'ru' | 'en';

export const translations = {
  uz: {
    // Brand & Nav
    appName: "Raqamli Faollik Muhiti",
    appSubtitle: "Pedagogik Platforma",
    glossary: "Glossariy",
    roleLabel: "Rol",
    roleStudent: "Talaba",
    roleTeacher: "O'qituvchi",
    roleTutor: "Tyutor",
    roleAdmin: "Kafedra (Admin)",
    
    // Tabs
    tabHome: "Bosh sahifa",
    tabDiary: "Faollik kundaligi",
    tabWeekly: "Haftalik profil",
    tabGaps: "Faollik uzilishlari",
    tabCards: "Kartochkalar banki",
    tabLms: "O'quv moduli (LMS)",
    tabDiagnostics: "Diagnostika",
    tabLevels: "Baholash va darajalar",
    tabGamification: "Gamifikatsiya",
    tabTeacher: "O'qituvchi paneli",
    tabTutor: "Tyutor hisoboti",
    tabDepartment: "Kafedra statistikasi",

    // Landing Page
    heroBadge: "Ilmiy-pedagogik raqamli metodik tizim",
    heroTitle: "Raqamli faollik muhiti:",
    heroSubtitle: "Pedagog talabalar faolligini rivojlantirish platformasi",
    heroDesc: "Ushbu platforma shunchaki fitness-treker emas, balki bo'lajak pedagoglarning o'quv va turmush jarayoniga singdirilgan yopiq halqali ilmiy-pedagogik monitoring va refleksiya tizimidir.",
    btnDemoStudent: "Talaba demo-rejimini sinab ko'rish",
    btnTeacherPanel: "O'qituvchi va Tyutor paneli",
    normSteps: "Kunlik qadamlar",
    normActiveMins: "Daq/hafta faol daqiqa",
    normSitting: "Uzluksiz o'tirish me'yori",
    closedLoopTitle: "Platformaning Yopiq Halqasi",
    closedLoopDesc: "5 ta uzviy bo'g'in",
    
    // Closed Loop Steps
    step1Title: "1. MONITORING",
    step1Desc: "Kunlik qadamlar, faol daqiqalar va o'tirish davomiyligini tezkor qayd etish.",
    step2Title: "2. TESKARI ALOQA",
    step2Desc: "Visual grafiklar, rangli indikatorlar va me'yoriy foizlar qaytariladi.",
    step3Title: "3. MIKROFAOLLIK",
    step3Desc: "Darsdagi 2-5 daqiqalik harakat pauzalari bilan tanqislik to'ldiriladi.",
    step4Title: "4. RAG'BAT",
    step4Desc: "Guruh chellenjlari, nishonlar va ijtimoiy e'tirof taqdim etiladi.",
    step5Title: "5. REFLEKSIYA",
    step5Desc: "Hafta yakunida profil tahlil qilinadi va +10–15% li yangi maqsad qo'yiladi.",

    // Daily Diary
    diaryTitle: "Kunlik Faollik Kundaligi",
    diaryDesc: "Bugungi jismoniy faollik, uzluksiz o'tirish va tiklanish ko'rsatkichlaringizni qayd etish.",
    quickEntry: "Tezkor to'ldirish (1 daqiqadan kam)",
    fieldSteps: "Kunlik qadamlar soni",
    fieldActiveMins: "Faol daqiqalar (o'rtacha jadallik)",
    fieldMaxSitting: "Eng uzun uzluksiz o'tirish",
    fieldPauses: "Mikrofaollik pauzalari",
    fieldSleep: "Uyqu davomiyligi",
    fieldScreen: "Kunlik ekran vaqti",
    fieldMood: "Kayfiyat va ish qobiliyati (5 ballik shkala)",
    fieldReflection: "Kunlik refleksiya (1–2 jumla, ixtiyoriy)",
    btnSaveDiary: "Kundalikka saqlash (Yopiq halqaga kiritish)",
    historyTitle: "Oxirgi kiritilgan yozuvlar tarixi",

    // Weekly Profile
    weeklyTitle: "Haftalik Faollik Profili",
    weeklySubtitle: "Teskari aloqa va tahlil bo'g'ini",
    weeklyAvgSteps: "O'rtacha kunlik qadam",
    weeklyActiveMins: "Haftalik faol daqiqalar",
    weeklyLongestSitting: "Eng uzun uzluksiz o'tirish",
    reflectionSectionTitle: "Hafta yakunidagi refleksiya savollari (Majburiy bo'g'in)",
    goalSectionTitle: "Maqsad Qo'yish Moduli",

    // Activity Gap Analysis
    gapsTitle: "«Faollik uzilishlari» tahlili (Activity Gap Analysis)",
    gapsSubtitle: "Dars jadvali va monitoring ma'lumotlarini taqqoslab, 60+ daqiqalik uzluksiz o'tirishlarni aniqlash",
    gapSolutionTitle: "Aniqlangan har bir faollik uzilishi uchun to'ldirish variantini biriktiring:",

    // Cards Bank
    cardsTitle: "«Faollik kartochkalari» banki",
    cardsSubtitle: "Mashg'ulotlar va turmush tarziga moslashtirilgan mikrofaollik pauzalari katalogi",
    filterAllTypes: "Barcha pauza turlari",
    filterHygienic: "Gigiyenik-tiklovchi (2-3 daq.)",
    filterCognitive: "Kognitiv-faollashtiruvchi (3-5 daq.)",
    filterProfessional: "Kasbiy-metodik (3-5 daq.)",
    filterSeated: "O'rindan turmasdan",
    filterMoving: "Auditoriyada harakatlanib",

    // LMS
    lmsTitle: "«Raqamli faollik madaniyati» moduli",
    lmsHoursInfo: "2 kredit (60 soat: 16 soat ma'ruza + 24 soat amaliy + 20 soat mustaqil ta'lim)",
    btnAddTopic: "Yangi Ma'ruza va Media Yuklash",

    // Diagnostics
    diagTitle: "Diagnostika Moduli",
    diagSub: "3 nuqtali kompleks diagnostika (Kirish → Oraliq → Yakuniy)",
    tabTest: "25-Topshiriqli Bilim Testi",
    tabAnketa: "Anonim Anketa (4 qism)",
    tabKuzatuv: "O'qituvchi Kuzatuv Kartasi",
    tabEkspert: "Ekspert Baholash Varag'i",
    tabEsse: "Refleksiv Esse",

    // Assessment & Levels
    assessTitle: "Baholash va Darajalar Tizimi",
    assessSub: "Mutlaq jismoniy ko'rsatkichlar baholanmaydi! Baholanadigan narsa — monitoring muntazamligi, tahlil sifati va metodik ko'nikmalar.",
    layer1Title: "Birinchi Qatlam: Obyektiv ko'rsatkichlar (30% ulush)",
    layer2Title: "Ikkinchi Qatlam: 4 Pedagogik Mezon (70% ulush)",

    // Gamification
    gamTitle: "Ijtimoiy Rag'bat va Guruh Chellenjlari",
    gamSub: "Moddiy emas, faqat ijtimoiy e'tirof! Musobaqalar guruhiy formatda o'tkaziladi.",

    // Dashboards
    teacherDashTitle: "Mashg'ulotlar Rejasi va Kuzatuv Kartalari",
    tutorDashTitle: "Guruh Bo'yicha Umumlashtirilgan Hisobot",
    deptDashTitle: "Tajriba va Nazorat Guruhlari Statistikasi",

    // Common Buttons
    btnSave: "Saqlash",
    btnEdit: "Tahrirlash",
    btnDelete: "O'chirish",
    btnCancel: "Bekor qilish",
    btnExportExcel: "Excel ga Eksport (.xlsx)",
    btnExportPdf: "PDF Hisobot (.pdf)",
    btnPrint: "Chop etish (PDF)",
    btnAddLesson: "Darsga qo'shish",
    btnFavorite: "Sevimlilar",

    // Level Names
    levelHigh: "Yuqori daraja",
    levelMedium: "O'rta daraja",
    levelLow: "Quyi daraja"
  },
  ru: {
    // Brand & Nav
    appName: "Цифровая Двигательная Среда",
    appSubtitle: "Педагогическая Платформа",
    glossary: "Глоссарий",
    roleLabel: "Роль",
    roleStudent: "Студент",
    roleTeacher: "Преподаватель",
    roleTutor: "Тьютор",
    roleAdmin: "Кафедра (Админ)",

    // Tabs
    tabHome: "Главная",
    tabDiary: "Дневник активности",
    tabWeekly: "Недельный профиль",
    tabGaps: "Разрывы активности",
    tabCards: "Банк карточек",
    tabLms: "Учебный модуль (LMS)",
    tabDiagnostics: "Диагностика",
    tabLevels: "Оценивание и уровни",
    tabGamification: "Геймификация",
    tabTeacher: "Панель преподавателя",
    tabTutor: "Отчет тьютора",
    tabDepartment: "Статистика кафедры",

    // Landing Page
    heroBadge: "Научно-педагогическая цифровая методическая система",
    heroTitle: "Цифровая двигательная среда:",
    heroSubtitle: "Платформа развития активности студентов-педагогов",
    heroDesc: "Эта платформа — не просто фитнес-трекер, а замкнутая научно-педагогическая система мониторинга и рефлексии, интегрированная в учебный процесс будущих педагогов.",
    btnDemoStudent: "Демо-режим Студента",
    btnTeacherPanel: "Панель Преподавателя и Тьютора",
    normSteps: "Дневные шаги",
    normActiveMins: "Мин/нед активных минут",
    normSitting: "Норма непрерывного сидения",
    closedLoopTitle: "Замкнутый Цикл Платформы",
    closedLoopDesc: "5 взаимосвязанных звеньев",

    // Closed Loop Steps
    step1Title: "1. МОНИТОРИНГ",
    step1Desc: "Быстрая фиксация дневных шагов, активных минут и длительности сидения.",
    step2Title: "2. ОБРАТНАЯ СВЯЗЬ",
    step2Desc: "Возврат наглядных графиков, цветных индикаторов и нормативных процентов.",
    step3Title: "3. МИКРОАКТИВНОСТЬ",
    step3Desc: "Восполнение дефицита за счет 2-5 минутных физкультпауз на занятиях.",
    step4Title: "4. СТИМУЛИРОВАНИЕ",
    step4Desc: "Групповые челленджи, бейджи и социальное признание.",
    step5Title: "5. РЕФЛЕКСИЯ",
    step5Desc: "Анализ профиля в конце недели и постановка новой цели (+10–15%).",

    // Daily Diary
    diaryTitle: "Дневник Дневной Активности",
    diaryDesc: "Зафиксируйте показатели физической активности, непрерывного сидения и восстановления.",
    quickEntry: "Быстрый ввод (менее 1 минуты)",
    fieldSteps: "Количество шагов за день",
    fieldActiveMins: "Активные минуты (умеренная интенсивность)",
    fieldMaxSitting: "Самое длительное непрерывное сидение",
    fieldPauses: "Микропаузы активности",
    fieldSleep: "Продолжительность сна",
    fieldScreen: "Экранное время за день",
    fieldMood: "Настроение и работоспособность (5-балльная шкала)",
    fieldReflection: "Дневная рефлексия (1–2 предложения, опционально)",
    btnSaveDiary: "Сохранить в дневник (Внести в замкнутый цикл)",
    historyTitle: "История последних записей",

    // Weekly Profile
    weeklyTitle: "Недельный Профиль Активности",
    weeklySubtitle: "Звено обратной связи и анализа",
    weeklyAvgSteps: "Средние дневные шаги",
    weeklyActiveMins: "Активные минуты за неделю",
    weeklyLongestSitting: "Самое длительное сидение",
    reflectionSectionTitle: "Вопросы рефлексии в конце недели (Обязательное звено)",
    goalSectionTitle: "Модуль Постановки Цели",

    // Activity Gap Analysis
    gapsTitle: "Анализ разрывов активности (Activity Gap Analysis)",
    gapsSubtitle: "Сравнение расписания и мониторинга для выявления непрерывного сидения >60 мин",
    gapSolutionTitle: "Прикрепите вариант компенсации для каждого выявления:",

    // Cards Bank
    cardsTitle: "Банк карточек активности",
    cardsSubtitle: "Каталог микропауз активности, адаптированных к занятиям",
    filterAllTypes: "Все типы пауз",
    filterHygienic: "Гигиеническо-восстановительные (2-3 мин.)",
    filterCognitive: "Когнитивно-активизирующие (3-5 мин.)",
    filterProfessional: "Профессионально-методические (3-5 мин.)",
    filterSeated: "Не вставая с места",
    filterMoving: "С перемещением по аудитории",

    // LMS
    lmsTitle: "Модуль «Культура цифровой активности»",
    lmsHoursInfo: "2 кредита (60 часов: 16 ч лекции + 24 ч практика + 20 ч самост. работа)",
    btnAddTopic: "Загрузить новую лекцию и медиа",

    // Diagnostics
    diagTitle: "Модуль Диагностики",
    diagSub: "3-точечная комплексная диагностика (Входная → Промежуточная → Итоговая)",
    tabTest: "Тест знаний из 25 заданий",
    tabAnketa: "Анонимная анкета (4 части)",
    tabKuzatuv: "Карта наблюдения преподавателя",
    tabEkspert: "Лист экспертной оценки",
    tabEsse: "Рефлексивное эссе",

    // Assessment & Levels
    assessTitle: "Система Оценивания и Уровней",
    assessSub: "Абсолютные шаги не оцениваются! Оценивается регулярность мониторинга, качество анализа и методические навыки.",
    layer1Title: "Первый слой: Объективные показатели (30% доля)",
    layer2Title: "Второй слой: 4 педагогических критерия (70% доля)",

    // Gamification
    gamTitle: "Социальные Стимулы и Групповые Челленджи",
    gamSub: "Не материальное, а только социальное признание! Соревнования проводятся в групповом формате.",

    // Dashboards
    teacherDashTitle: "План Занятий и Карты Наблюдения",
    tutorDashTitle: "Обобщенный Отчет по Группе",
    deptDashTitle: "Статистика Экспериментальной и Контрольной Групп",

    // Common Buttons
    btnSave: "Сохранить",
    btnEdit: "Редактировать",
    btnDelete: "Удалить",
    btnCancel: "Отмена",
    btnExportExcel: "Экспорт в Excel (.xlsx)",
    btnExportPdf: "Отчет PDF (.pdf)",
    btnPrint: "Печать (PDF)",
    btnAddLesson: "Добавить к уроку",
    btnFavorite: "Избранное",

    // Level Names
    levelHigh: "Высокий уровень",
    levelMedium: "Средний уровень",
    levelLow: "Низкий уровень"
  },
  en: {
    // Brand & Nav
    appName: "Digital Physical Activity Environment",
    appSubtitle: "Pedagogical Platform",
    glossary: "Glossary",
    roleLabel: "Role",
    roleStudent: "Student",
    roleTeacher: "Teacher",
    roleTutor: "Tutor",
    roleAdmin: "Department (Admin)",

    // Tabs
    tabHome: "Home",
    tabDiary: "Activity Diary",
    tabWeekly: "Weekly Profile",
    tabGaps: "Activity Gaps",
    tabCards: "Cards Bank",
    tabLms: "LMS Module",
    tabDiagnostics: "Diagnostics",
    tabLevels: "Assessment & Levels",
    tabGamification: "Gamification",
    tabTeacher: "Teacher Panel",
    tabTutor: "Tutor Report",
    tabDepartment: "Department Statistics",

    // Landing Page
    heroBadge: "Scientific Pedagogical Digital System",
    heroTitle: "Digital Physical Activity Environment:",
    heroSubtitle: "Platform for developing student-teachers' activity",
    heroDesc: "This platform is not just a fitness tracker, but a closed-loop scientific-pedagogical monitoring and reflection system integrated into the educational process.",
    btnDemoStudent: "Try Student Demo Mode",
    btnTeacherPanel: "Teacher & Tutor Dashboard",
    normSteps: "Daily Steps",
    normActiveMins: "Mins/week Active Mins",
    normSitting: "Max Continuous Sitting",
    closedLoopTitle: "Platform Closed Loop",
    closedLoopDesc: "5 Interconnected Links",

    // Closed Loop Steps
    step1Title: "1. MONITORING",
    step1Desc: "Quick logging of daily steps, active minutes, and sitting duration.",
    step2Title: "2. FEEDBACK",
    step2Desc: "Visual charts, color indicators, and norm percentage feedback.",
    step3Title: "3. MICROACTIVITY",
    step3Desc: "Filling activity deficit with 2-5 min classroom movement pauses.",
    step4Title: "4. INCENTIVES",
    step4Desc: "Group challenges, badges, and social recognition.",
    step5Title: "5. REFLECTION",
    step5Desc: "End-of-week profile analysis and setting +10–15% new goal.",

    // Daily Diary
    diaryTitle: "Daily Activity Diary",
    diaryDesc: "Record your physical activity, continuous sitting, and recovery metrics.",
    quickEntry: "Quick Entry (<1 minute)",
    fieldSteps: "Daily Step Count",
    fieldActiveMins: "Active Minutes (Moderate Intensity)",
    fieldMaxSitting: "Longest Continuous Sitting Duration",
    fieldPauses: "Microactivity Pauses",
    fieldSleep: "Sleep Duration",
    fieldScreen: "Daily Screen Time",
    fieldMood: "Mood & Productivity (5-point scale)",
    fieldReflection: "Daily Reflection (1–2 sentences, optional)",
    btnSaveDiary: "Save to Diary (Enter Closed Loop)",
    historyTitle: "Recent Entry History",

    // Weekly Profile
    weeklyTitle: "Weekly Activity Profile",
    weeklySubtitle: "Feedback & Analysis Link",
    weeklyAvgSteps: "Average Daily Steps",
    weeklyActiveMins: "Weekly Active Minutes",
    weeklyLongestSitting: "Longest Sitting",
    reflectionSectionTitle: "End-of-Week Reflection Questions (Mandatory Link)",
    goalSectionTitle: "Goal Setting Module",

    // Activity Gap Analysis
    gapsTitle: "Activity Gap Analysis",
    gapsSubtitle: "Comparing schedule and monitoring data to detect continuous sitting >60 min",
    gapSolutionTitle: "Attach a solution option for each identified gap:",

    // Cards Bank
    cardsTitle: "Activity Cards Bank",
    cardsSubtitle: "Catalog of classroom-adapted microactivity movement pauses",
    filterAllTypes: "All Pause Types",
    filterHygienic: "Hygienic-Restorative (2-3 mins)",
    filterCognitive: "Cognitive-Activating (3-5 mins)",
    filterProfessional: "Professional-Methodological (3-5 mins)",
    filterSeated: "Without Leaving Seat",
    filterMoving: "Moving in Classroom",

    // LMS
    lmsTitle: "Digital Activity Culture Module",
    lmsHoursInfo: "2 credits (60 hours: 16h lecture + 24h practical + 20h self-study)",
    btnAddTopic: "Upload New Lecture & Media",

    // Diagnostics
    diagTitle: "Diagnostics Module",
    diagSub: "3-Point Comprehensive Diagnostics (Entry → Mid → Final)",
    tabTest: "25-Question Knowledge Test",
    tabAnketa: "Anonymous Questionnaire (4 Parts)",
    tabKuzatuv: "Teacher Observation Card",
    tabEkspert: "Expert Rubric Sheet",
    tabEsse: "Reflective Essay",

    // Assessment & Levels
    assessTitle: "Assessment & Level System",
    assessSub: "Absolute steps are not graded! Monitoring regularity, analysis quality, and methodological skills are evaluated.",
    layer1Title: "First Layer: Objective Indicators (30% weight)",
    layer2Title: "Second Layer: 4 Pedagogical Criteria (70% weight)",

    // Gamification
    gamTitle: "Social Incentives & Group Challenges",
    gamSub: "Not monetary, strictly social recognition! Competitions are conducted in a group format.",

    // Dashboards
    teacherDashTitle: "Lesson Plan & Observation Cards",
    tutorDashTitle: "Group Summary Report",
    deptDashTitle: "Experimental & Control Group Statistics",

    // Common Buttons
    btnSave: "Save",
    btnEdit: "Edit",
    btnDelete: "Delete",
    btnCancel: "Cancel",
    btnExportExcel: "Export to Excel (.xlsx)",
    btnExportPdf: "PDF Report (.pdf)",
    btnPrint: "Print (PDF)",
    btnAddLesson: "Add to Lesson",
    btnFavorite: "Favorites",

    // Level Names
    levelHigh: "High Level",
    levelMedium: "Medium Level",
    levelLow: "Low Level"
  }
};
