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
