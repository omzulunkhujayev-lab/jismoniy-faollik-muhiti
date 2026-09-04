export type UserRole = 'talaba' | 'oqituvchi' | 'tyutor' | 'kafedra';

export interface User {
  id: string;
  role: UserRole;
  fio: string;
  muassasa: string;
  yonalish: string;
  kurs: number;
  guruh_id: string;
  jins: 'erkak' | 'ayol';
  yashash_sharoiti: 'yotoqxona' | 'ijara' | 'oila_bilan';
  tibbiy_guruh: 'asosiy' | 'tayyorgarlik' | 'maxsus';
}

export interface Group {
  id: string;
  nomi: string;
  kurs: number;
  tur: 'tajriba' | 'nazorat';
  tyutor_id: string;
  talabalar_soni: number;
}

export interface DailyEntry {
  id: string;
  user_id: string;
  sana: string; // YYYY-MM-DD
  qadam: number;
  faol_daqiqa: number;
  eng_uzun_otirish: number; // minutes
  pauza_soni: number;
  uyqu_soat: number;
  ekran_soat: number;
  kayfiyat_ball: number; // 1 to 5
  refleksiya_matn: string;
}

export interface WeeklyGoal {
  id: string;
  user_id: string;
  hafta: string; // e.g. "2026-W35"
  maqsad_turi: 'qadam' | 'faol_daqiqa' | 'pauza' | 'otirish_kamaytirish';
  joriy_qiymat: number;
  maqsad_qiymat: number;
  bajarildi: boolean;
}

export interface ScheduleItem {
  id: string;
  group_id: string;
  kun: 'Dushanba' | 'Seshanba' | 'Chorshanba' | 'Payshanba' | 'Juma' | 'Shanba';
  mashgulot_soatlari: {
    juftlik: number;
    vaqt: string;
    fan_nomi: string;
    auditoriya: string;
  }[];
  tanaffuslar: {
    vaqt: string;
    davomiylik_daq: number;
  }[];
}

export interface ActivityGap {
  id: string;
  group_id: string;
  kun: string;
  boshlanish: string;
  tugash: string;
  davomiylik_daq: number;
  taklif_etilgan_yechim: 'pauza' | 'tanaffus_harakat' | 'piyoda_yol' | '45_plus_5';
  yechim_tavsifi: string;
}

export type CardCategory = 'gigiyenik-tiklovchi' | 'kognitiv-faollashtiruvchi' | 'kasbiy-metodik';

export interface Card {
  id: string;
  raqam: number;
  nomi: string;
  turi: CardCategory;
  davomiyligi: string; // e.g. "2-3 daq."
  joy_jihoz: string;
  algoritm: string[];
  metodik_eslatma: string;
  mos_fanlar: string[];
  moslashtirilgan_variant: string; // for special medical group
  isFavorite?: boolean;
}

export interface CourseTopic {
  id: string;
  tartib: number;
  nomi: string;
  maruza_soat: number;
  amaliy_soat: number;
  mustaqil_soat: number;
  video_url?: string;
  taqdimot_matn: string;
  kartochkalar_toplami: string[];
  test_savollari: {
    savol: string;
    variantlar: string[];
    togri_indeks: number;
  }[];
  amaliy_topshiriq: string;
  forum_mavzusi: string;
}

export interface Assessment {
  id: string;
  user_id: string;
  nuqta: 'kirish' | 'oraliq' | 'yakuniy';
  motivatsion_ball: number; // 0-100
  kognitiv_ball: number;    // 0-100
  faoliyatli_ball: number;   // 0-100
  refleksiv_ball: number;   // 0-100
  obyektiv_ball: number;    // 0-100 (30% weight)
  integral_ball: number;   // 0-100
  daraja: 'yuqori' | 'orta' | 'quyi';
}

export interface ObservationCard {
  id: string;
  oqituvchi_id: string;
  guruh_id: string;
  mashgulot_nomi: string;
  pauza_turi: CardCategory;
  otkazildi: boolean;
  ishtirok_darajasi: 'yuqori' | 'orta' | 'pask';
  izoh: string;
  sana: string;
}

export interface Badge {
  id: string;
  nomi: string;
  shart: string;
  ikonka: string;
  olindi: boolean;
  sana?: string;
}

export interface Challenge {
  id: string;
  nomi: string;
  boshlanish: string;
  tugash: string;
  tur: 'guruh' | 'shaxsiy';
  qoidalar: string[];
  faol: boolean;
  guruh_natijasi?: {
    guruh_nomi: string;
    ortacha_qadam: number;
  }[];
}
