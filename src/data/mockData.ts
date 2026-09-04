import { User, Group, DailyEntry, WeeklyGoal, Card, CourseTopic, ScheduleItem, ActivityGap, Badge, Challenge, Assessment, ObservationCard } from '../types';

export const mockUsers: Record<string, User> = {
  talaba: {
    id: 'usr_001',
    role: 'talaba',
    fio: 'Jasur Alimov',
    muassasa: 'Toshkent Davlat Pedagogika Universiteti',
    yonalish: "Boshlang'ich ta'lim va sport-tarbiyaviy ish",
    kurs: 3,
    guruh_id: 'grp_301',
    jins: 'erkak',
    yashash_sharoiti: 'ijara',
    tibbiy_guruh: 'asosiy'
  },
  oqituvchi: {
    id: 'usr_002',
    role: 'oqituvchi',
    fio: 'Prof. Dilnoza Raximova',
    muassasa: 'TDPU Pedagogika kafedrasi',
    yonalish: "Pedagogika va psixologiya",
    kurs: 0,
    guruh_id: 'grp_301',
    jins: 'ayol',
    yashash_sharoiti: 'oila_bilan',
    tibbiy_guruh: 'asosiy'
  },
  tyutor: {
    id: 'usr_003',
    role: 'tyutor',
    fio: 'Sardor Ergashev',
    muassasa: 'TDPU 3-bosqich tyutori',
    yonalish: "Pedagogika fakulteti",
    kurs: 3,
    guruh_id: 'grp_301',
    jins: 'erkak',
    yashash_sharoiti: 'oila_bilan',
    tibbiy_guruh: 'asosiy'
  },
  kafedra: {
    id: 'usr_004',
    role: 'kafedra',
    fio: 'Prof. Botir Nodirov',
    muassasa: "Pedagogika va jismoniy madaniyat kafedrasi mudiri",
    yonalish: "Ilmiy-pedagogik tadqiqotlar bo'limi",
    kurs: 0,
    guruh_id: 'grp_301',
    jins: 'erkak',
    yashash_sharoiti: 'oila_bilan',
    tibbiy_guruh: 'asosiy'
  }
};

export const mockGroups: Group[] = [
  {
    id: 'grp_301',
    nomi: '301-Pedagogika (Tajriba)',
    kurs: 3,
    tur: 'tajriba',
    tyutor_id: 'usr_003',
    talabalar_soni: 28
  },
  {
    id: 'grp_302',
    nomi: '302-Pedagogika (Nazorat)',
    kurs: 3,
    tur: 'nazorat',
    tyutor_id: 'usr_003',
    talabalar_soni: 26
  }
];

export const initialDailyEntries: DailyEntry[] = [
  {
    id: 'de_101',
    user_id: 'usr_001',
    sana: '2026-08-28',
    qadam: 8450,
    faol_daqiqa: 35,
    eng_uzun_otirish: 75,
    pauza_soni: 3,
    uyqu_soat: 7.5,
    ekran_soat: 4.2,
    kayfiyat_ball: 4,
    refleksiya_matn: "Bugun 2-juftlikda mikrofaollik pauzasi o'tkazdik, tetiklik oshdi."
  },
  {
    id: 'de_102',
    user_id: 'usr_001',
    sana: '2026-08-29',
    qadam: 9200,
    faol_daqiqa: 45,
    eng_uzun_otirish: 50,
    pauza_soni: 5,
    uyqu_soat: 8.0,
    ekran_soat: 3.5,
    kayfiyat_ball: 5,
    refleksiya_matn: "Ochiq havodagi tanaffusda 15 daqiqa piyoda yurdim."
  },
  {
    id: 'de_103',
    user_id: 'usr_001',
    sana: '2026-08-30',
    qadam: 6100,
    faol_daqiqa: 20,
    eng_uzun_otirish: 110,
    pauza_soni: 1,
    uyqu_soat: 6.0,
    ekran_soat: 6.0,
    kayfiyat_ball: 2,
    refleksiya_matn: "Kutubxonada uzluksiz o'tirib qoldim, belda charchoq bor."
  },
  {
    id: 'de_104',
    user_id: 'usr_001',
    sana: '2026-08-31',
    qadam: 8800,
    faol_daqiqa: 40,
    eng_uzun_otirish: 55,
    pauza_soni: 4,
    uyqu_soat: 7.0,
    ekran_soat: 4.0,
    kayfiyat_ball: 4,
    refleksiya_matn: "Auditoriyalar orasida zinapoyadan foydalandim."
  },
  {
    id: 'de_105',
    user_id: 'usr_001',
    sana: '2026-09-01',
    qadam: 10400,
    faol_daqiqa: 55,
    eng_uzun_otirish: 45,
    pauza_soni: 6,
    uyqu_soat: 8.5,
    ekran_soat: 3.0,
    kayfiyat_ball: 5,
    refleksiya_matn: "Guruh chellenji sababli kun davomida faol bo'ldim!"
  },
  {
    id: 'de_106',
    user_id: 'usr_001',
    sana: '2026-09-02',
    qadam: 7900,
    faol_daqiqa: 30,
    eng_uzun_otirish: 65,
    pauza_soni: 3,
    uyqu_soat: 7.0,
    ekran_soat: 4.5,
    kayfiyat_ball: 3,
    refleksiya_matn: "Mustaqil ta'lim paytida '45+5' rejimiga rioya qildim."
  },
  {
    id: 'de_107',
    user_id: 'usr_001',
    sana: '2026-09-03',
    qadam: 8650,
    faol_daqiqa: 38,
    eng_uzun_otirish: 50,
    pauza_soni: 4,
    uyqu_soat: 7.5,
    ekran_soat: 3.8,
    kayfiyat_ball: 4,
    refleksiya_matn: "Kunlik me'yorni bajardim, diqqatni jamlash osonlashdi."
  }
];

export const initialWeeklyGoals: WeeklyGoal[] = [
  {
    id: 'wg_01',
    user_id: 'usr_001',
    hafta: '2026-W35',
    maqsad_turi: 'qadam',
    joriy_qiymat: 8000,
    maqsad_qiymat: 9000,
    bajarildi: true
  },
  {
    id: 'wg_02',
    user_id: 'usr_001',
    hafta: '2026-W35',
    maqsad_turi: 'otirish_kamaytirish',
    joriy_qiymat: 75,
    maqsad_qiymat: 55,
    bajarildi: true
  }
];

// Generate 60 full cards representing the Cards Bank
export const generate60Cards = (): Card[] => {
  const categories: ('gigiyenik-tiklovchi' | 'kognitiv-faollashtiruvchi' | 'kasbiy-metodik')[] = [
    'gigiyenik-tiklovchi',
    'kognitiv-faollashtiruvchi',
    'kasbiy-metodik'
  ];
  
  const subjects = ['Pedagogika nazariyasi', 'Boshlang\'ich ta\'lim metodikasi', 'Psixologiya', 'O\'zbek tili va adabiyoti', 'Matematika o\'qitish metodikasi', 'Informatika'];
  
  const cardTemplates = [
    {
      nomi: 'Pozitsiyalar va umurtqa yozilishi',
      turi: 'gigiyenik-tiklovchi' as const,
      davomiyligi: '2–3 daq.',
      joy_jihoz: 'O\'rindiqda o\'tirgan holda, qo\'shimcha jihoz shart emas',
      algoritm: [
        'Tik o\'tiring va belingizni stul suyanchig\'iga tegizmang.',
        'Qo\'llaringizni yuqoriga uzatib, kaftlaringizni birlashtiring.',
        'Chuqur nafas olib, umurtqani yuqoriga torting (5 soniya).',
        'Nafas chiqarib, sekin yon tomonga va orqaga egiling (3 marta takrorlang).'
      ],
      metodik_eslatma: 'Gipoksiyani oldini oladi va miya qon aylanishini 15-20% ga yaxshilaydi.',
      moslashtirilgan_variant: 'Skolioz yoki bel og\'rig\'i borlar uchun harakat amplitudasi 50% ga kamaytiriladi.'
    },
    {
      nomi: 'Kognitiv ritm va krest-kross mashqi',
      turi: 'kognitiv-faollashtiruvchi' as const,
      davomiyligi: '3–5 daq.',
      joy_jihoz: 'Auditoriya ichida tik turgan holda',
      algoritm: [
        'Tik turing, o\'ng tirsagingiz bilan chap tizrangizga tegizing.',
        'Chap tirsak bilan o\'ng tizrangizga tegizing.',
        'Ritmik ravishda 20 soniya davomida takrorlang.',
        'So\'ngra teskari tartibda qo\'l va oyoqlarni orqadan tutashtiring.'
      ],
      metodik_eslatma: 'Miya yarim sharlari o\'rtasidagi neyron aloqalarini faollashtiradi va diqqatni jamlaydi.',
      moslashtirilgan_variant: 'Harakat cheklovi bor talabalar o\'tirgan holda qo\'llarni tizmaga tekkizish orqali bajaradi.'
    },
    {
      nomi: 'Interaktiv pedagogik juftlik pauzasi',
      turi: 'kasbiy-metodik' as const,
      davomiyligi: '3–5 daq.',
      joy_jihoz: 'Juftlikda, auditoriya yo mebel bilan',
      algoritm: [
        'Talabalar juft-juft bo\'lib qarama-qarshi turadilar.',
        'Birinchi talaba pedagogik tushunchani aytsa, ikkinchisi uning ta\'rifini aytib, sakrash yoki qarsak chaladi.',
        '30 soniyadan so\'ng rollar almashadi.'
      ],
      metodik_eslatma: 'Darsdagi didaktik materialni takrorlash va harakat faolligini birlashtiradi.',
      moslashtirilgan_variant: 'O\'tirgan holda kaftlar bilan stogga urish va tushunchalarni aytish.'
    },
    {
      nomi: 'Ko\'z mushaklari va bo\'yin mikro-relaksatsiyasi',
      turi: 'gigiyenik-tiklovchi' as const,
      davomiyligi: '2 daq.',
      joy_jihoz: 'Stulda o\'tirgan holda',
      algoritm: [
        'Boshni harakatsiz tutib, ko\'zlarni soat mili bo\'ylab 5 marta aylantiring.',
        'Uzoqdagi obyektga (derazaga) 10 soniya qarabsiz, so\'ng barmoq uchiga qarang.',
        'Bo\'yinni sekin o\'ngga va chapga 4 martadan burang.'
      ],
      metodik_eslatma: 'Ekran vaqtidan kelib chiqadigan vizual charchoq va bo\'yin mushaklari spazmini yengillashtiradi.',
      moslashtirilgan_variant: 'Barcha talabalar uchun bir xil mos keladi.'
    },
    {
      nomi: 'Neyro-didaktik reaksiya impulsi',
      turi: 'kognitiv-faollashtiruvchi' as const,
      davomiyligi: '3 daq.',
      joy_jihoz: 'Auditoriya o\'rtasida',
      algoritm: [
        'O\'qituvchi "Juft" deganda sakrash, "Toq" deganda bir oyog\'ida turish rejimini beradi.',
        'O\'qituvchi matematik misol aytadi (masalan: 12 + 5 = 17 -> toq).',
        'Talabalar javob turiga mos harakatni bajaradi.'
      ],
      metodik_eslatma: 'Kognitiv mantiq va motorika reaksiyasini sinxronlashtiradi.',
      moslashtirilgan_variant: 'Bir oyog\'ida turish o\'rniga qo\'l ko\'tarish ishlatiladi.'
    }
  ];

  const cards: Card[] = [];
  
  for (let i = 1; i <= 60; i++) {
    const templateIndex = (i - 1) % cardTemplates.length;
    const template = cardTemplates[templateIndex];
    const cat = categories[(i - 1) % 3];
    
    cards.push({
      id: `card_${i}`,
      raqam: i,
      nomi: `Kartochka № ${i}. ${template.nomi} ${i > 5 ? `(Variant ${Math.ceil(i/5)})` : ''}`,
      turi: cat,
      davomiyligi: i % 2 === 0 ? '2–3 daq.' : '3–5 daq.',
      joy_jihoz: template.joy_jihoz,
      algoritm: template.algoritm,
      metodik_eslatma: template.metodik_eslatma,
      mos_fanlar: [subjects[i % subjects.length], subjects[(i + 2) % subjects.length]],
      moslashtirilgan_variant: template.moslashtirilgan_variant,
      isFavorite: i === 17 || i === 2 || i === 5
    });
  }

  return cards;
};

export const mockCards: Card[] = generate60Cards();

// LMS 9 Topics (2 Credits, 60 Hours)
export const mockCourseTopics: CourseTopic[] = [
  {
    id: 'topic_1',
    tartib: 1,
    nomi: "Jismoniy faollik: tushuncha, turlari, me'yorlari va salomatlikka ta'siri",
    maruza_soat: 2,
    amaliy_soat: 2,
    mustaqil_soat: 2,
    video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // fallback embed
    taqdimot_matn: "Jismoniy faollik — skelet mushaklari qisqarishi natijasida yuzaga keladigan va tinch holatga nisbatan energiya sarfini oshiradigan har qanday tana harakati. JSST me'yori bo'yicha haftasiga 150-300 daqiqa o'rtacha jadallikdagi faollik talab etiladi.",
    kartochkalar_toplami: ['card_1', 'card_4'],
    test_savollari: [
      {
        savol: "JSST tavsiyasiga ko'ra kattalar uchun haftalik o'rtacha jadallikdagi faollik me'yori qancha?",
        variantlar: ["60–90 daqiqa", "150–300 daqiqa", "400–500 daqiqa", "Har kuni 2 soat"],
        togri_indeks: 1
      },
      {
        savol: "Skelet mushaklari qisqarishi natijasida energiya sarfi oshishi nima deyiladi?",
        variantlar: ["O'tirg'ich xulq-atvor", "Jismoniy faollik", "Gipodinamiya", "Metabolik sindrom"],
        togri_indeks: 1
      }
    ],
    amaliy_topshiriq: "O'zingizning 3 kunlik faollik ko'rsatkichlaringizni jadvalga kiriting va JSST me'yori bilan taqqoslang.",
    forum_mavzusi: "Zamonaviy talabaning kunlik faolligiga tosqinlik qiluvchi omillar va ularni yengish usullari."
  },
  {
    id: 'topic_2',
    tartib: 2,
    nomi: "O'tirg'ich xulq-atvor va uning ta'lim jarayonidagi ko'rinishlari",
    maruza_soat: 2,
    amaliy_soat: 2,
    mustaqil_soat: 2,
    taqdimot_matn: "O'tirg'ich xulq-atvor — uyg'oq holatda energiya sarfi 1,5 MET dan oshmaydigan harakat rejimi. Kuniga 8 soatdan ortiq o'tirish salomatlik uchun jiddiy xavf tug'diradi.",
    kartochkalar_toplami: ['card_2', 'card_5'],
    test_savollari: [
      {
        savol: "O'tirg'ich xulq-atvorda energiya sarfi qancha MET dan oshmaydi?",
        variantlar: ["1,0 MET", "1,5 MET", "3,0 MET", "5,0 MET"],
        togri_indeks: 1
      }
    ],
    amaliy_topshiriq: "Auditoriya dars jadvalidagi eng uzun uzluksiz o'tirish vaqtini aniqlang.",
    forum_mavzusi: "Nima uchun 1 soatlik kechqurungi mashg'ulot 8 soatlik o'tirish zararini to'liq qoplamaydi?"
  },
  {
    id: 'topic_3',
    tartib: 3,
    nomi: "Talabaning kundalik harakat profili: monitoring usullari",
    maruza_soat: 2,
    amaliy_soat: 3,
    mustaqil_soat: 2,
    taqdimot_matn: "Monitoring — talabaning kunlik qadamlari, faol daqiqalari va uzluksiz o'tirish davomiyligini raqamli vositalar orqali qayd etish.",
    kartochkalar_toplami: ['card_3'],
    test_savollari: [
      {
        savol: "Faollik monitoringida qaysi ko'rsatkich birinchi navbatda kuzatiladi?",
        variantlar: ["Vazn yo'qotish", "Kunlik qadamlar va uzluksiz o'tirish vaqti", "Kaloriya sarfi", "Mushak massasi"],
        togri_indeks: 1
      }
    ],
    amaliy_topshiriq: "Platformadagi 'Faollik kundaligi'ni 5 kun davomida to'ldiring.",
    forum_mavzusi: "Raqamli monitoring vositalarining aniqligi va qulayligi."
  },
  {
    id: 'topic_4',
    tartib: 4,
    nomi: "Raqamli vositalar: imkoniyatlari, cheklovlari va maxfiylik masalalari",
    maruza_soat: 1,
    amaliy_soat: 3,
    mustaqil_soat: 2,
    taqdimot_matn: "Fitness-trekerlar, fit-ilovalar va ta'limiy platformalarda shaxsiy ma'lumotlar maxfiyligini ta'minlash va pedagogik etika tamoyillari.",
    kartochkalar_toplami: ['card_6'],
    test_savollari: [
      {
        savol: "Pedagogik etika bo'yicha talabaning individual ko'rsatkichlari bahoga qanday ta'sir qilishi kerak?",
        variantlar: ["Qadam kam bo'lsa past baho qo'yiladi", "Mutlaq jismoniy ko'rsatkich baholanmaydi, faqat tahlil va monitoring baholanadi", "Faqat eng faol talabaga 100 ball beriladi", "Reytingda talabaning qadami e'lon qilinadi"],
        togri_indeks: 1
      }
    ],
    amaliy_topshiriq: "Maxfiylik va rozilik formasini tahlil qiling.",
    forum_mavzusi: "Raqamli charchoq (digital fatigue)ni oldini olish yo'llari."
  },
  {
    id: 'topic_5',
    tartib: 5,
    nomi: "Maqsad qo'yish, teskari aloqa va xulq-atvorni o'zgartirish texnikalari",
    maruza_soat: 2,
    amaliy_soat: 3,
    mustaqil_soat: 2,
    taqdimot_matn: "SMART tamoyili va sekin-asta 10-15% ga oshirish texnikasi. Keskin sakrashlarning moslashuv jarayoniga salbiy ta'siri.",
    kartochkalar_toplami: ['card_7'],
    test_savollari: [
      {
        savol: "Tizim haftalik maqsadni necha foizga oshirishni avtomatik taklif qiladi?",
        variantlar: ["50–100%", "10–15%", "200%", "Oshirish taklif qilinmaydi"],
        togri_indeks: 1
      }
    ],
    amaliy_topshiriq: "Kelgusi hafta uchun 1 ta real va bosqichma-bosqich maqsad shakllantiring.",
    forum_mavzusi: "O'z-o me'yorlashtirish va motivatsiyani saqlash."
  },
  {
    id: 'topic_6',
    tartib: 6,
    nomi: "Mikrofaollik texnologiyasi: pauzalar turlari va o'tkazish metodikasi",
    maruza_soat: 2,
    amaliy_soat: 4,
    mustaqil_soat: 3,
    taqdimot_matn: "Mikrofaollik pauzalari 3 turga bo'linadi: gigiyenik-tiklovchi (2-3 daq.), kognitiv-faollashtiruvchi (3-5 daq.) va kasbiy-metodik (3-5 daq.).",
    kartochkalar_toplami: ['card_1', 'card_2', 'card_3'],
    test_savollari: [
      {
        savol: "Mikrofaollik pauzasi necha daqiqadan oshmasligi kerak?",
        variantlar: ["15 daqiqa", "3-5 daqiqa", "30 daqiqa", "1 soat"],
        togri_indeks: 1
      }
    ],
    amaliy_topshiriq: "Kartochkalar bankidan o'z yo'nalishingizga mos 2 ta pauzani darsga biriktiring.",
    forum_mavzusi: "Auditoriyada talabalar e'tiborini pauzaga jalb qilish metodlari."
  },
  {
    id: 'topic_7',
    tartib: 7,
    nomi: "Maktabda o'quvchilar harakat rejimini tashkil etish metodikasi",
    maruza_soat: 2,
    amaliy_soat: 3,
    mustaqil_soat: 3,
    taqdimot_matn: "Bo'lajak pedagog sifatida boshlang'ich va o'rta maktab sinflarida harakatli tanaffuslar hamda jismoniy daqiqalarni didaktik integratsiya qilish.",
    kartochkalar_toplami: ['card_10', 'card_12'],
    test_savollari: [
      {
        savol: "Maktab o'quvchilari uchun harakat pauzasi qaysi dars daqiqasida o'tkazilishi eng samarali?",
        variantlar: ["Darsning 1-daqiqasida", "Darsning 20-25 daqiqalarida", "Dars tugaganidan so'ng", "Hech qachon"],
        togri_indeks: 1
      }
    ],
    amaliy_topshiriq: "Boshlang'ich sinf darsi uchun 1 ta mikrofaollik ssenariysini tuzing.",
    forum_mavzusi: "Maktab sharoitida gipodinamiyaga qarshi didaktik o'yinlar."
  },
  {
    id: 'topic_8',
    tartib: 8,
    nomi: "Faollik, uyqu va ekran vaqti: kundalik rejim yaxlitligi",
    maruza_soat: 1,
    amaliy_soat: 2,
    mustaqil_soat: 2,
    taqdimot_matn: "Uyqu (7-9 soat) va ekran vaqtini optimallashtirish. Yotishdan 1 soat oldin raqamli qurilmalarni o'chirishning sirkad ritmlarga ta'siri.",
    kartochkalar_toplami: ['card_4'],
    test_savollari: [
      {
        savol: "Talabaning me'yoriy tungi uyqu davomiyligi necha soat bo'lishi kerak?",
        variantlar: ["4–5 soat", "7–9 soat", "10–12 soat", "3 soat"],
        togri_indeks: 1
      }
    ],
    amaliy_topshiriq: "Bir haftalik uyqu va ekran vaqtingiz balansini tahlil qiling.",
    forum_mavzusi: "Tungi vaqtda smartfon ishlatishning uyqu sifatiga ta'siri."
  },
  {
    id: 'topic_9',
    tartib: 9,
    nomi: "Individual harakat rejasini loyihalash va refleksiya",
    maruza_soat: 2,
    amaliy_soat: 2,
    mustaqil_soat: 2,
    taqdimot_matn: "Yopiq halqaning yakuniy bo mezoniy bosqichi. Shaxsiy faollik profilini tahlil qilish, refleksiv esse yozish va kelajakdagi harakat rejasini tuzish.",
    kartochkalar_toplami: ['card_17'],
    test_savollari: [
      {
        savol: "Yopiq halqa tizimining so'nggi va takrorlanuvchi bo'g'ini qaysi?",
        variantlar: ["Jazo", "Refleksiya va monitoringga qaytish", "Diagnostika o'tkazmaslik", "Faqat guruh musobaqasi"],
        togri_indeks: 1
      }
    ],
    amaliy_topshiriq: "Semestr yakuni bo'yicha refleksiv esse tayyorlang.",
    forum_mavzusi: "Mening shaxsiy faollik va kasbiy salomatlik strategiyam."
  }
];

export const mockSchedule: ScheduleItem[] = [
  {
    id: 'sch_1',
    group_id: 'grp_301',
    kun: 'Dushanba',
    mashgulot_soatlari: [
      { juftlik: 1, vaqt: '08:30 - 09:50', fan_nomi: 'Pedagogika nazariyasi', auditoriya: '302-aud' },
      { juftlik: 2, vaqt: '10:00 - 11:20', fan_nomi: 'Psixologiya', auditoriya: '305-aud' },
      { juftlik: 3, vaqt: '11:30 - 12:50', fan_nomi: 'Boshlang\'ich ta\'lim metodikasi', auditoriya: '210-aud' }
    ],
    tanaffuslar: [
      { vaqt: '09:50 - 10:00', davomiylik_daq: 10 },
      { vaqt: '11:20 - 11:30', davomiylik_daq: 10 }
    ]
  },
  {
    id: 'sch_2',
    group_id: 'grp_301',
    kun: 'Seshanba',
    mashgulot_soatlari: [
      { juftlik: 1, vaqt: '08:30 - 09:50', fan_nomi: 'O\'zbek tili metodikasi', auditoriya: '401-aud' },
      { juftlik: 2, vaqt: '10:00 - 11:20', fan_nomi: 'Matematika o\'qitish', auditoriya: '404-aud' },
      { juftlik: 3, vaqt: '11:30 - 12:50', fan_nomi: 'Informatika va IT', auditoriya: '102-lab' },
      { juftlik: 4, vaqt: '13:30 - 14:50', fan_nomi: 'Mustaqil ta\'lim / Kutubxona', auditoriya: 'Kutubxona' }
    ],
    tanaffuslar: [
      { vaqt: '09:50 - 10:00', davomiylik_daq: 10 },
      { vaqt: '11:20 - 11:30', davomiylik_daq: 10 },
      { vaqt: '12:50 - 13:30', davomiylik_daq: 40 }
    ]
  }
];

export const mockActivityGaps: ActivityGap[] = [
  {
    id: 'gap_1',
    group_id: 'grp_301',
    kun: 'Dushanba',
    boshlanish: '08:30',
    tugash: '09:50',
    davomiylik_daq: 80,
    taklif_etilgan_yechim: 'pauza',
    yechim_tavsifi: "Darsning 40-daqiqasida 3 daqiqalik 'Kartochka № 17. Pozitsiyalar' gigiyenik pauzasini o'tkazish."
  },
  {
    id: 'gap_2',
    group_id: 'grp_301',
    kun: 'Dushanba',
    boshlanish: '10:00',
    tugash: '11:20',
    davomiylik_daq: 80,
    taklif_etilgan_yechim: 'pauza',
    yechim_tavsifi: "Kognitiv-faollashtiruvchi krest-kross pauzasini tadbiq etish."
  },
  {
    id: 'gap_3',
    group_id: 'grp_301',
    kun: 'Seshanba',
    boshlanish: '11:30',
    tugash: '14:50',
    davomiylik_daq: 120,
    taklif_etilgan_yechim: '45_plus_5',
    yechim_tavsifi: "Mustaqil ta'lim va kutubxonada o'tirish paytida har 45 daqiqada 5 daqiqa ochiq havoda yurish ('45+5' rejimi)."
  }
];

export const mockBadges: Badge[] = [
  {
    id: 'badge_1',
    nomi: 'Muntazam kuzatuvchi',
    shart: '4 hafta uzluksiz kunlik monitoring yuritish',
    ikonka: '📅',
    olindi: true,
    sana: '2026-08-25'
  },
  {
    id: 'badge_2',
    nomi: 'Zinapoya do\'sti',
    shart: 'Liftdan voz kechib, 10 kun zinapoyadan foydalanish',
    ikonka: '🪜',
    olindi: true,
    sana: '2026-08-30'
  },
  {
    id: 'badge_3',
    nomi: 'Faol tanaffus tashkilotchisi',
    shart: 'Guruh tanaffusida 5 marta harakatli o\'yin tashkil etish',
    ikonka: '⚡',
    olindi: false
  },
  {
    id: 'badge_4',
    nomi: 'Pauza ustasi',
    shart: 'Hafta davomida 20 dan ortiq mikrofaollik pauzasini bajarish',
    ikonka: '🏆',
    olindi: true,
    sana: '2026-09-01'
  }
];

export const mockChallenge: Challenge = {
  id: 'ch_1',
  nomi: 'Guruh qadami — Kuzgi faollik turniri',
  boshlanish: '2026-09-01',
  tugash: '2026-09-14',
  tur: 'guruh',
  qoidalar: [
    'Musobaqa 2 hafta davom etadi.',
    'Natijalar guruhning kunlik o\'rtacha qadami bo\'yicha baholanadi (kuchssiz ishtirokchini ajratmaslik uchun).',
    'Rag\'bat moddiy emas, kafedra e\'tirof taqdimnomasi shaklida.',
    'Chellenj tugagach, tizim avtomatik ravishda shaxsiy refleksiya rejimiga o\'tkazadi.'
  ],
  faol: true,
  guruh_natijasi: [
    { guruh_nomi: '301-Pedagogika (Tajriba)', ortacha_qadam: 8750 },
    { guruh_nomi: '302-Pedagogika (Nazorat)', ortacha_qadam: 6420 },
    { guruh_nomi: '303-Boshlang\'ich ta\'lim', ortacha_qadam: 7910 }
  ]
};

export const mockAssessments: Assessment[] = [
  {
    id: 'ass_1',
    user_id: 'usr_001',
    nuqta: 'kirish',
    motivatsion_ball: 65,
    kognitiv_ball: 60,
    faoliyatli_ball: 58,
    refleksiv_ball: 55,
    obyektiv_ball: 62,
    integral_ball: 59.6,
    daraja: 'quyi'
  },
  {
    id: 'ass_2',
    user_id: 'usr_001',
    nuqta: 'oraliq',
    motivatsion_ball: 82,
    kognitiv_ball: 78,
    faoliyatli_ball: 80,
    refleksiv_ball: 75,
    obyektiv_ball: 79,
    integral_ball: 78.5,
    daraja: 'orta'
  },
  {
    id: 'ass_3',
    user_id: 'usr_001',
    nuqta: 'yakuniy',
    motivatsion_ball: 92,
    kognitiv_ball: 90,
    faoliyatli_ball: 88,
    refleksiv_ball: 91,
    obyektiv_ball: 89,
    integral_ball: 89.9,
    daraja: 'yuqori'
  }
];

export const mockObservationCards: ObservationCard[] = [
  {
    id: 'obs_1',
    oqituvchi_id: 'usr_002',
    guruh_id: 'grp_301',
    mashgulot_nomi: 'Pedagogika nazariyasi',
    pauza_turi: 'gigiyenik-tiklovchi',
    otkazildi: true,
    ishtirok_darajasi: 'yuqori',
    izoh: "Talabalar 35-daqiqada pauzani ishtiyoq bilan bajardilar. Diqqat tiklandi.",
    sana: '2026-09-02'
  },
  {
    id: 'obs_2',
    oqituvchi_id: 'usr_002',
    guruh_id: 'grp_301',
    mashgulot_nomi: 'Psixologiya',
    pauza_turi: 'kognitiv-faollashtiruvchi',
    otkazildi: true,
    ishtirok_darajasi: 'yuqori',
    izoh: "Krest-kross mashqi kognitiv faollikni oshirdi.",
    sana: '2026-09-03'
  }
];

// Department research statistical sample datasets (Experimental vs Control group t-test & Chi-Square data)
export const mockDepartmentStats = {
  tajriba_guruh: {
    nomi: '301-Tajriba guruhi (N=28)',
    pre_test_mean: 62.4,
    pre_test_sd: 8.2,
    post_test_mean: 88.7,
    post_test_sd: 6.5,
    qadam_mean: 8850,
    otirish_mean: 52, // minutes
    daraja_taqsimoti: { yuqori: 18, orta: 8, quyi: 2 }
  },
  nazorat_guruh: {
    nomi: '302-Nazorat guruhi (N=26)',
    pre_test_mean: 61.8,
    pre_test_sd: 7.9,
    post_test_mean: 67.2,
    post_test_sd: 8.1,
    qadam_mean: 6300,
    otirish_mean: 95, // minutes
    daraja_taqsimoti: { yuqori: 4, orta: 12, quyi: 10 }
  },
  t_test_results: {
    t_statistic: 10.42,
    df: 52,
    p_value: '< 0.001',
    is_significant: true,
    effect_size_cohen_d: 2.85
  },
  chi_square_results: {
    chi_square_val: 16.78,
    df: 2,
    p_value: '< 0.001',
    is_significant: true
  }
};
