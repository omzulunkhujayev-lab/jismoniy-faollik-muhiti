import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  Smartphone, 
  Monitor, 
  Sparkles, 
  Award, 
  Footprints, 
  Clock, 
  Moon, 
  AlertTriangle, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  ArrowLeft,
  GraduationCap,
  Activity,
  Zap,
  Layers,
  Heart,
  Video,
  Eye,
  BarChart3,
  Flame,
  Camera
} from 'lucide-react';

interface MotionVideoPlayerProps {
  onBack: () => void;
  onNavigateTab: (tabId: string) => void;
}

interface Scene {
  id: number;
  duration: number; // in seconds
  title: Record<string, string>;
  subtitle: Record<string, string>;
  narration: Record<string, string>;
  badge: Record<string, string>;
}

const SCENES: Scene[] = [
  {
    id: 1,
    duration: 18,
    title: {
      uz: "Gipodinamiya: Ta'lim Jarayonidagi Yashirin Xavf",
      ru: "Гиподинамия: Скрытая Угроза в Образовании",
      en: "Hypodynamia: Hidden Hazard in Higher Education"
    },
    subtitle: {
      uz: "Pedagogika talabalarining 72% dan ortig'i darslarda kuniga 140–180 daqiqa uzluksiz o'tirib qolmoqda.",
      ru: "Более 72% студентов-педагогов непрерывно сидят по 140–180 минут на занятиях.",
      en: "Over 72% of future educators sit continuously for 140–180 minutes during lectures."
    },
    narration: {
      uz: "Bugungi raqamli ta'lim davrida talabalarda uzoq muddat o'tirib qolish oqibatida gipodinamiya, aqliy toliqish va diqqatning keskin pasayishi kuzatilmoqda.",
      ru: "В современную цифровую эпоху длительное сидячее положение студентов приводит к гиподинамии, быстрой утомляемости и резкому спаду концентрации.",
      en: "In the digital education era, prolonged sedentary behavior among university students leads to physical fatigue and severe cognitive decline."
    },
    badge: {
      uz: "01. MUAMMO VA ILMIY ASOS",
      ru: "01. ПРОБЛЕМА И НАУЧНАЯ ОСНОВА",
      en: "01. PROBLEM & SCIENTIFIC BASE"
    }
  },
  {
    id: 2,
    duration: 20,
    title: {
      uz: "Raqamli Faollik Muhiti — Innovatsion Yechim",
      ru: "Цифровая Среда Активности — Инновационное Решение",
      en: "Digital Physical Activity Environment — Innovation"
    },
    subtitle: {
      uz: "Zulunxo'jayev Marufjon Ma'murjon o'g'lining PhD dissertatsiya tadqiqoti doirasida yaratilgan yopiq zanjirli tizim.",
      ru: "Замкнутая система, созданная в рамках докторской диссертации PhD Зулунходжаева Маруфжона Маъмуржон угли.",
      en: "Closed-loop system designed within the PhD dissertation research by Marufjon Zulunkhujayev."
    },
    narration: {
      uz: "Innovatsion yechim — bo'lajak pedagoglarning jismoniy faolligini rivojlantirishga qaratilgan Raqamli Faollik Muhiti platformasi bo'lib, u 3 tilda to'liq ishlaydi.",
      ru: "Инновационным решением стала платформа 'Цифровая среда активности', разработанная для развития двигательной культуры будущих педагогов.",
      en: "The innovative solution is the Digital Physical Activity Environment platform, designed to boost active behavior with full multilingual support."
    },
    badge: {
      uz: "02. ILMIY LOYIHA VA BREND",
      ru: "02. НАУЧНЫЙ ПРОЕКТ И БРЕНД",
      en: "02. SCIENTIFIC PROJECT & BRAND"
    }
  },
  {
    id: 3,
    duration: 25,
    title: {
      uz: "Talaba Kundaligi & Avtomatik Sensor Telemetriyasi",
      ru: "Дневник Студента и Автоматическая Сенсорная Телеметрия",
      en: "Student Diary & Autonomous Sensor Telemetry"
    },
    subtitle: {
      uz: "Qadamlar, faol daqiqalar, 20:00 dan keyingi ekran nofaolligi orqali hisoblangan uyqu va ekran vaqti monitoringi.",
      ru: "Шаги, активные минуты, расчет сна по неактивности экрана после 20:00 и время экрана.",
      en: "Steps, active minutes, sleep calculation from screen inactivity after 20:00, and screen time."
    },
    narration: {
      uz: "Talaba ilovaga o'z ismi bilan kiradi. Tizim qadamlar soni, kunduzgi nofaol vaqt, 20:00 dan keyingi ekran harakatsizligi orqali uyqu davomiyligi va ekran vaqtini avtomatik hisoblaydi.",
      ru: "Студент входит в систему без пароля по ФИО. Платформа собирает шаги, фиксирует дневную гиподинамию, время экрана и рассчитывает продолжительность сна.",
      en: "Students log in seamlessly by name. The platform autonomously tracks steps, daytime sedentary duration, sleep from post-20:00 inactivity, and screen time."
    },
    badge: {
      uz: "03. AVTOMATIK MONITORING",
      ru: "03. АВТОМАТИЧЕСКИЙ МОНИТОРИНГ",
      en: "03. AUTOMATIC TELEMETRY"
    }
  },
  {
    id: 4,
    duration: 25,
    title: {
      uz: "Mikrofaollik Texnologiyasi & Darsdagi Kuzatuv",
      ru: "Технология Микропауз и Наблюдение за Занятием",
      en: "Microactivity Breaks & Classroom Observation"
    },
    subtitle: {
      uz: "Darsning 35-daqiqasida 3-5 daqiqalik faollik pauzalarini kiritish va pedagogik kuzatuv kartasini to'ldirish.",
      ru: "Внедрение 3–5 минутных пауз на 35-й минуте пары и оформление карт наблюдения.",
      en: "Deploying 3-5 min micro-pauses at the 35th minute of lecture with teacher observation cards."
    },
    narration: {
      uz: "Professor-o'qituvchilar darsning diqqat pasaygan 35-daqiqasida gigiyenik, kognitiv va kasbiy mikrofaollik pauzalarini darsga biriktiradi hamda kuzatuv kartasini yuritadi.",
      ru: "Преподаватели привязывают восстановительные и когнитивные микропаузы к расписанию на 35-й минуте лекции и оформляют карту педагогического наблюдения.",
      en: "Faculty members attach hygienic, cognitive, and pedagogical breaks to the lesson schedule at the 35-minute mark and record qualitative observations."
    },
    badge: {
      uz: "04. PEDAGOGIK INTEGRATSIYA",
      ru: "04. ПЕДАГОГИЧЕСКАЯ ИНТЕГРАЦИЯ",
      en: "04. CLASSROOM INTEGRATION"
    }
  },
  {
    id: 5,
    duration: 24,
    title: {
      uz: "Super Admin, Tyutor & Kafedra Ilmiy Statistikasi",
      ru: "Супер Админ, Тьютор и Статистика Кафедры",
      en: "Super Admin, Tutor & Department Scientific Analytics"
    },
    subtitle: {
      uz: "Tajriba va nazorat guruhlarini qiyosiy tahlil qilish, Excel va PDF ilmiy hisobotlarini eksport qilish.",
      ru: "Сравнительный анализ экспериментальной и контрольной групп, экспорт отчетов в Excel и PDF.",
      en: "Comparative analysis of experimental vs control cohorts with Excel and PDF reporting."
    },
    narration: {
      uz: "Loyiha muallifi — Super Admin barcha nazoratchilarni boshqaradi. Kafedra esa tajriba guruhida o'tirish vaqti 45 daqiqagacha kamayganini va faollik 80 foizga oshganini ko'radi.",
      ru: "Супер Администратор проекта управляет кураторами, а кафедра видит снижение сидячего времени до 45 минут и рост двигательной нормы до 80%.",
      en: "The Super Admin manages all supervisor credentials, while the department tracks sitting time drop down to 45 min and activity compliance rising above 80%."
    },
    badge: {
      uz: "05. TAQQOSLAMA NATIJALAR",
      ru: "05. СРАВНИТЕЛЬНЫЕ РЕЗУЛЬТАТЫ",
      en: "05. COMPARATIVE ANALYTICS"
    }
  },
  {
    id: 6,
    duration: 20,
    title: {
      uz: "Barkamol va Faol Bo'lajak Pedagoglar",
      ru: "Здоровые и Активные Будущие Педагоги",
      en: "Healthy and Active Future Educators"
    },
    subtitle: {
      uz: "Zulunxo'jayev Marufjon Ma'murjon o'g'lining PhD dissertatsiyasi asosidagi raqamli faollik muhiti.",
      ru: "Цифровая среда двигательной активности на базе диссертации PhD Зулунходжаева Маруфжона.",
      en: "Digital activity ecosystem based on the PhD dissertation by Marufjon Zulunkhujayev."
    },
    narration: {
      uz: "Raqamli faollik muhiti — sog'lom, faol va barkamol pedagogik kadrlarni tarbiyalashning ilmiy kafolatidir!",
      ru: "Цифровая среда двигательной активности — научная гарантия воспитания здоровых и гармоничных педагогов!",
      en: "Digital Physical Activity Environment — the scientific foundation for nurturing vibrant, healthy, and competent future educators!"
    },
    badge: {
      uz: "06. ILMIY XULOSA VA AMALIYOT",
      ru: "06. ВЫВОД И ВНЕДРЕНИЕ",
      en: "06. CONCLUSION & IMPACT"
    }
  }
];

export const MotionVideoPlayer: React.FC<MotionVideoPlayerProps> = ({ onBack, onNavigateTab }) => {
  const { lang } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [sceneProgress, setSceneProgress] = useState(0); // 0 to 100
  const [aspectRatio, setAspectRatio] = useState<'16-9' | '9-16'>('16-9');
  const [isMuted, setIsMuted] = useState(false);
  const [cleanRecordingMode, setCleanRecordingMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [counterValues, setCounterValues] = useState({ steps: 0, activeMins: 0, sitting: 160, sleep: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const currentScene = SCENES[currentSceneIdx];

  // Synth Audio Generator for Atmospheric Motion Soundtrack
  const playSoundEffect = (type: 'transition' | 'counter' | 'success') => {
    if (isMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioCtxRef.current) audioCtxRef.current = new AudioCtx();
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (type === 'transition') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.3);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (type === 'success') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
      }
    } catch (e) {}
  };

  // Text-To-Speech Narration (Web Speech API)
  const speakCurrentNarration = () => {
    if (isMuted || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const text = currentScene.narration[lang] || currentScene.narration['uz'];
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0 * speedMultiplier;
    utterance.pitch = 1.05;
    
    // Choose appropriate voice language if available
    const voices = window.speechSynthesis.getVoices();
    const matchVoice = voices.find(v => 
      lang === 'ru' ? v.lang.startsWith('ru') :
      lang === 'en' ? v.lang.startsWith('en') :
      v.lang.startsWith('uz') || v.lang.startsWith('tr')
    );
    if (matchVoice) utterance.voice = matchVoice;

    window.speechSynthesis.speak(utterance);
  };

  // Scene Progress Timer Effect
  useEffect(() => {
    if (!isPlaying) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      return;
    }

    speakCurrentNarration();
    playSoundEffect('transition');

    const durationMs = (currentScene.duration / speedMultiplier) * 1000;
    const intervalMs = 50;
    const stepIncrement = (intervalMs / durationMs) * 100;

    const timer = setInterval(() => {
      setSceneProgress(prev => {
        if (prev >= 100) {
          // Advance to next scene or loop
          if (currentSceneIdx < SCENES.length - 1) {
            setCurrentSceneIdx(curr => curr + 1);
            return 0;
          } else {
            setCurrentSceneIdx(0);
            return 0;
          }
        }
        return prev + stepIncrement;
      });
    }, intervalMs);

    return () => {
      clearInterval(timer);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isPlaying, currentSceneIdx, speedMultiplier, isMuted, lang]);

  // Dynamic Animated Counters inside scenes
  useEffect(() => {
    if (currentSceneIdx === 2) {
      // Animate steps, active minutes, sleep
      let start = 0;
      const targetSteps = 8500;
      const targetMins = 35;
      const targetSleep = 7.5;
      const counterTimer = setInterval(() => {
        start += 0.05;
        if (start >= 1) {
          setCounterValues({ steps: targetSteps, activeMins: targetMins, sitting: 45, sleep: targetSleep });
          clearInterval(counterTimer);
        } else {
          setCounterValues({
            steps: Math.round(targetSteps * start),
            activeMins: Math.round(targetMins * start),
            sitting: Math.round(160 - (115 * start)),
            sleep: +(targetSleep * start).toFixed(1)
          });
        }
      }, 50);
      return () => clearInterval(counterTimer);
    } else if (currentSceneIdx === 4) {
      // Comparison chart animation
      setCounterValues({ steps: 8950, activeMins: 42, sitting: 45, sleep: 7.8 });
    }
  }, [currentSceneIdx]);

  const handleNextScene = () => {
    if (currentSceneIdx < SCENES.length - 1) {
      setCurrentSceneIdx(prev => prev + 1);
      setSceneProgress(0);
    }
  };

  const handlePrevScene = () => {
    if (currentSceneIdx > 0) {
      setCurrentSceneIdx(prev => prev - 1);
      setSceneProgress(0);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-4 pb-16">
      
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition font-bold"
            title="Orqaga qaytish"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping inline-block" />
              <h1 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                🎬 Motion Video & 4K Taqdimot Studiyasi
              </h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Zulunxo'jayev Marufjon Ma'murjon o'g'lining PhD dissertatsiyasi roligi
            </p>
          </div>
        </div>

        {/* Aspect Ratio & Mode Switches */}
        <div className="flex items-center gap-2">
          {/* 16:9 vs 9:16 selector */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setAspectRatio('16-9')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                aspectRatio === '16-9' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>16:9 (YouTube/TV)</span>
            </button>
            <button
              type="button"
              onClick={() => setAspectRatio('9-16')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                aspectRatio === '9-16' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>9:16 (Reels/Shorts)</span>
            </button>
          </div>

          {/* Clean Recording Mode (Hides UI for Screen Recording) */}
          <button
            type="button"
            onClick={() => setCleanRecordingMode(!cleanRecordingMode)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-extrabold border transition ${
              cleanRecordingMode
                ? 'bg-rose-500 text-white border-rose-600 shadow-md shadow-rose-500/30'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
            }`}
            title="Ekranni video yozib olish (OBS / Win+G) uchun boshqaruv tugmalarini yashirish"
          >
            <Camera className="w-4 h-4" />
            <span className="hidden sm:inline">
              {cleanRecordingMode ? 'Toza Yozuv (Faol)' : 'Yozib Olish Rejimi'}
            </span>
          </button>
        </div>
      </div>

      {/* Cinematic Motion Video Stage */}
      <div 
        ref={containerRef}
        className={`relative mx-auto rounded-3xl overflow-hidden bg-slate-950 text-white shadow-2xl transition-all duration-300 border-4 border-slate-800 flex flex-col justify-between ${
          aspectRatio === '16-9' 
            ? 'w-full aspect-[16/9] min-h-[380px] sm:min-h-[540px]' 
            : 'w-full max-w-[420px] aspect-[9/16] min-h-[640px]'
        }`}
      >
        {/* Animated Background Motion Gradients & Stars */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-3xl" />
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:32px_32px]" />
        </div>

        {/* Top Watermark & Scene Badge */}
        <div className="relative z-10 p-4 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-white">
                Raqamli Faollik Muhiti
              </div>
              <div className="text-[10px] text-emerald-400 font-bold">
                PhD Dissertatsiyasi Loyihasi
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-extrabold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{currentScene.badge[lang] || currentScene.badge['uz']}</span>
          </div>
        </div>

        {/* Central Dynamic Stage based on Scene */}
        <div className="relative z-10 flex-1 px-4 sm:px-12 flex flex-col justify-center items-center text-center">
          
          {/* SCENE 1: Gipodinamiya Muammosi */}
          {currentScene.id === 1 && (
            <div className="space-y-6 max-w-2xl animate-in zoom-in-95 duration-500">
              <div className="inline-flex p-4 rounded-3xl bg-rose-500/20 border-2 border-rose-500/40 text-rose-400 animate-bounce">
                <AlertTriangle className="w-12 h-12" />
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                {currentScene.title[lang] || currentScene.title['uz']}
              </h2>
              <p className="text-xs sm:text-base text-slate-300 max-w-xl mx-auto font-medium leading-relaxed">
                {currentScene.subtitle[lang] || currentScene.subtitle['uz']}
              </p>

              {/* Animated Danger Meters */}
              <div className="grid grid-cols-3 gap-3 pt-4">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-rose-500/30 backdrop-blur-md">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Uzluksiz O'tirish</span>
                  <span className="text-xl sm:text-2xl font-black text-rose-400">180 daq.</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-amber-500/30 backdrop-blur-md">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Aqliy Toliqish</span>
                  <span className="text-xl sm:text-2xl font-black text-amber-400">82%</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-rose-500/30 backdrop-blur-md">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Darsdagi Pauzalar</span>
                  <span className="text-xl sm:text-2xl font-black text-rose-400">0 ta</span>
                </div>
              </div>
            </div>
          )}

          {/* SCENE 2: Raqamli Faollik Muhiti & PhD Loyihasi */}
          {currentScene.id === 2 && (
            <div className="space-y-6 max-w-2xl animate-in fade-in duration-500">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-2xl shadow-emerald-500/40 transform hover:rotate-6 transition">
                <GraduationCap className="w-10 h-10" />
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                {currentScene.title[lang] || currentScene.title['uz']}
              </h2>
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 max-w-lg mx-auto">
                <span className="text-xs sm:text-sm font-black text-emerald-400 block mb-1">
                  LOYIHA MUALLIFI & DISSERTATSIYA:
                </span>
                <span className="text-sm sm:text-base font-extrabold text-white">
                  Zulunxo'jayev Marufjon Ma'murjon o'g'li
                </span>
                <span className="text-xs text-slate-300 block mt-1">
                  Pedagogika fanlari bo'yicha falsafa doktori (PhD) dissertatsiyasi doirasida
                </span>
              </div>
            </div>
          )}

          {/* SCENE 3: Talaba Kundaligi & Avtomatik Sensor Telemetriyasi */}
          {currentScene.id === 3 && (
            <div className="space-y-6 max-w-3xl animate-in zoom-in-95 duration-500">
              <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight">
                {currentScene.title[lang] || currentScene.title['uz']}
              </h2>
              
              {/* Telemetry Dashboard Simulation */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
                <div className="p-4 rounded-2xl bg-white/5 border border-emerald-500/40 text-left">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold mb-1">
                    <Footprints className="w-4 h-4" /> 1. Kunlik Qadam
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white">
                    {counterValues.steps.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-emerald-400">Me'yor: 8 000+</span>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-teal-500/40 text-left">
                  <div className="flex items-center gap-1.5 text-xs text-teal-400 font-bold mb-1">
                    <Clock className="w-4 h-4" /> 2. Faollik Vaqti
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white">
                    {counterValues.activeMins} <span className="text-xs text-slate-400">daq.</span>
                  </div>
                  <span className="text-[10px] text-teal-400">Me'yor: 30+ daq.</span>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-indigo-500/40 text-left">
                  <div className="flex items-center gap-1.5 text-xs text-indigo-400 font-bold mb-1">
                    <Moon className="w-4 h-4" /> 3. Uyqu (20:00+)
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white">
                    {counterValues.sleep} <span className="text-xs text-slate-400">soat</span>
                  </div>
                  <span className="text-[10px] text-indigo-400">23:15 – 06:45</span>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-amber-500/40 text-left">
                  <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold mb-1">
                    <Smartphone className="w-4 h-4" /> 4. Ekran Vaqti
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white">
                    4.0 <span className="text-xs text-slate-400">soat</span>
                  </div>
                  <span className="text-[10px] text-amber-400">Screen-on time</span>
                </div>
              </div>
            </div>
          )}

          {/* SCENE 4: Mikrofaollik Texnologiyasi & O'qituvchi Nazorati */}
          {currentScene.id === 4 && (
            <div className="space-y-6 max-w-2xl animate-in fade-in duration-500">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                <Zap className="w-4 h-4" /> Darsning 35–40 daqiqasida pauza
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                {currentScene.title[lang] || currentScene.title['uz']}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-left space-y-1">
                  <span className="text-xs font-bold text-emerald-400">1. Gigiyenik-tiklovchi</span>
                  <p className="text-[11px] text-slate-300">Umurtqa va bo'yin mushaklari tarangligini yechish (2-3 daqiqa).</p>
                </div>
                <div className="p-4 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-left space-y-1">
                  <span className="text-xs font-bold text-teal-400">2. Kognitiv-faollashtiruvchi</span>
                  <p className="text-[11px] text-slate-300">Miya qon aylanishi va diqqatni jamlash ritmik mashqlari.</p>
                </div>
                <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-left space-y-1">
                  <span className="text-xs font-bold text-indigo-400">3. Kasbiy-metodik</span>
                  <p className="text-[11px] text-slate-300">Bo'lajak o'qituvchining maktabda dars o'tish pedagogik ko'nikmasi.</p>
                </div>
              </div>
            </div>
          )}

          {/* SCENE 5: Super Admin, Tyutor & Kafedra Ilmiy Statistikasi */}
          {currentScene.id === 5 && (
            <div className="space-y-6 max-w-2xl animate-in zoom-in-95 duration-500">
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                {currentScene.title[lang] || currentScene.title['uz']}
              </h2>

              {/* Experimental vs Control Bar Chart */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <div className="text-xs font-extrabold uppercase text-slate-400 tracking-wider text-left">
                  Pre-test vs Post-test Natijalari (301-Pedagogika Guruhi):
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>Uzluksiz O'tirish Vaqti:</span>
                      <span className="text-emerald-400 font-extrabold">160 daq. ➔ 45 daqiqa (-72%)</span>
                    </div>
                    <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex">
                      <div className="h-full bg-rose-500 w-[75%]" />
                      <div className="h-full bg-emerald-500 w-[25%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>Kunlik Me'yorga Erishish:</span>
                      <span className="text-emerald-400 font-extrabold">34% ➔ 82.1% (+48%)</span>
                    </div>
                    <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[82%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span>Kognitiv Diqqat Ko'rsatkichi:</span>
                      <span className="text-teal-400 font-extrabold">+34% Oshdi</span>
                    </div>
                    <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-500 w-[78%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SCENE 6: Ilmiy Xulosa va Kelajak Pedagoglari */}
          {currentScene.id === 6 && (
            <div className="space-y-6 max-w-xl animate-in zoom-in-95 duration-500">
              <div className="inline-flex p-4 rounded-3xl bg-amber-500/20 border-2 border-amber-500/40 text-amber-400 shadow-xl shadow-amber-500/20 animate-pulse">
                <Award className="w-12 h-12" />
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
                {currentScene.title[lang] || currentScene.title['uz']}
              </h2>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm text-slate-300 font-medium">
                "{currentScene.narration[lang] || currentScene.narration['uz']}"
              </div>
              <div className="text-xs font-black text-emerald-400 uppercase tracking-widest">
                Loyiha Muallifi: Zulunxo'jayev Marufjon Ma'murjon o'g'li (PhD)
              </div>
            </div>
          )}

        </div>

        {/* Subtitles & Narration Box (Cinema Style) */}
        <div className="relative z-10 px-4 sm:px-12 py-3 bg-slate-900/90 backdrop-blur-md border-t border-slate-800">
          <p className="text-xs sm:text-sm text-center text-emerald-300 font-bold max-w-3xl mx-auto leading-relaxed">
            "{currentScene.narration[lang] || currentScene.narration['uz']}"
          </p>
        </div>

        {/* Bottom Playback Controls Bar (Hidden in clean recording mode) */}
        {!cleanRecordingMode && (
          <div className="relative z-20 p-3 sm:p-4 bg-slate-900 border-t border-slate-800/80 flex flex-col gap-2">
            
            {/* Progress Track */}
            <div className="flex items-center gap-1.5 w-full">
              {SCENES.map((sc, idx) => {
                const isPassed = idx < currentSceneIdx;
                const isCurrent = idx === currentSceneIdx;
                return (
                  <button
                    key={sc.id}
                    type="button"
                    onClick={() => {
                      setCurrentSceneIdx(idx);
                      setSceneProgress(0);
                    }}
                    className="flex-1 h-2 rounded-full overflow-hidden bg-slate-800 transition hover:h-3"
                    title={`Scene ${sc.id}: ${sc.title['uz']}`}
                  >
                    <div 
                      className={`h-full transition-all duration-75 ${
                        isPassed ? 'bg-emerald-500 w-full' : isCurrent ? 'bg-emerald-400' : 'w-0'
                      }`}
                      style={{ width: isCurrent ? `${sceneProgress}%` : isPassed ? '100%' : '0%' }}
                    />
                  </button>
                );
              })}
            </div>

            {/* Play/Pause/Mute/Speed controls */}
            <div className="flex items-center justify-between text-xs pt-1">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition flex items-center gap-1.5 active:scale-95 cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isPlaying ? 'To\'xtatish' : 'Boshlash'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCurrentSceneIdx(0);
                    setSceneProgress(0);
                  }}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
                  title="Qaytadan boshlash"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1 text-slate-400 font-bold pl-2">
                  <button
                    type="button"
                    onClick={handlePrevScene}
                    disabled={currentSceneIdx === 0}
                    className="p-1.5 rounded-lg hover:bg-slate-800 disabled:opacity-30"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span>{currentSceneIdx + 1} / {SCENES.length}</span>
                  <button
                    type="button"
                    onClick={handleNextScene}
                    disabled={currentSceneIdx === SCENES.length - 1}
                    className="p-1.5 rounded-lg hover:bg-slate-800 disabled:opacity-30"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Voice / Audio mute toggle */}
                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-2 rounded-xl border transition flex items-center gap-1 font-bold ${
                    isMuted 
                      ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' 
                      : 'bg-slate-800 text-emerald-400 border-slate-700'
                  }`}
                  title={isMuted ? 'Ovozni yoqish' : 'Ovozni o\'chirish'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  <span className="hidden sm:inline">{isMuted ? 'Ovozsiz' : 'Ovozli Hikoya'}</span>
                </button>

                {/* Speed Multiplier */}
                <select
                  value={speedMultiplier}
                  onChange={(e) => setSpeedMultiplier(Number(e.target.value))}
                  className="px-2 py-1.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold outline-none cursor-pointer"
                >
                  <option value={1}>1.0x (Normal)</option>
                  <option value={1.25}>1.25x (Tezkor)</option>
                  <option value={1.5}>1.5x (Reels/Shorts)</option>
                </select>

                {/* Fullscreen Button */}
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                  title="Butun ekranga ochish"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Screen Recording Guide helper card */}
      <div className="p-5 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
        <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Camera className="w-4 h-4 text-emerald-500" />
          <span>Videoni 4K / HD sifatda yozib olish (Screen Record) bo'yicha ko'rsatma:</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600 dark:text-slate-300">
          <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <strong className="text-slate-900 dark:text-white block mb-1">💻 Windows kompyuterda:</strong>
            Klaviaturadan <code className="bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded font-mono font-bold">Win + Alt + R</code> yoki <code className="bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded font-mono font-bold">Win + G</code> (Xbox Game Bar) tugmalarini bosing.
          </div>
          <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <strong className="text-slate-900 dark:text-white block mb-1">📱 Smartfonlarda (Android / iPhone):</strong>
            Yuqori bildirishnomalar panelidan <strong>"Ekranni yozib olish" (Screen Recorder)</strong> tugmasini bosing va 9:16 rejimda yozib oling.
          </div>
          <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <strong className="text-slate-900 dark:text-white block mb-1">🎥 OBS Studio yoki CapCut:</strong>
            Brauzer oynasini Capture qilib, 1080p yoki 4K formatda toza rolik holatida eksport qiling.
          </div>
        </div>
      </div>

    </div>
  );
};
