import React from 'react';
import { BookOpen, X, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../i18n/translations';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const glossaryByLang: Record<Language, { term: string; definition: string }[]> = {
  uz: [
    {
      term: "Jismoniy faollik",
      definition: "Skelet mushaklari qisqarishi natijasida yuzaga keladigan va tinch holatga nisbatan energiya sarfini oshiradigan har qanday tana harakati."
    },
    {
      term: "O'tirg'ich xulq-atvor",
      definition: "Uyg'oq holatda energiya sarfi 1,5 metabolik ekvivalentdan (MET) oshmaydigan xulq-atvor (masalan, o'tirish, yotish, ekranga qarash)."
    },
    {
      term: "Faol daqiqalar",
      definition: "O'rtacha yoki yuqori jadallikdagi harakat bilan o'tgan vaqt (daqiqa)."
    },
    {
      term: "Mikrofaollik texnologiyasi",
      definition: "Mashg'ulot tuzilmasiga singdirilgan, qisqa muddatli (2-5 daq.) va aniq didaktik/gigiyenik vazifaga ega harakat pauzalari majmui."
    },
    {
      term: "Faollik uzilishi",
      definition: "Uzluksiz o'tirish davomiyligi 60 daqiqadan oshadigan vaqt oralig'i (qizil zona)."
    },
    {
      term: "Raqamli-jismoniy faollik muhiti",
      definition: "O'quv jarayoni tartibi, jismoniy makon va raqamli xizmatlarning talaba harakat faolligini o'lchash, anglatish, rag'batlantirish va o'quv faoliyatiga singdirishni ta'minlovchi uyg'un holati."
    },
    {
      term: "Yopiq halqa",
      definition: "MONITORING → TESKARI ALOQA → MIKROFAOLLIK → RAG'BAT → REFLEKSIYA bo'g'inlarining uzluksiz takrorlanuvchi pedagogik tizimi."
    }
  ],
  ru: [
    {
      term: "Физическая активность",
      definition: "Любое движение тела, производимое скелетными мышцами, требующее расхода энергии выше уровня покоя."
    },
    {
      term: "Сидячий образ жизни (Sedentary Behavior)",
      definition: "Поведение в бодрствующем состоянии, при котором энергозатраты не превышают 1,5 метаболических эквивалентов (МЕТ)."
    },
    {
      term: "Активные минуты",
      definition: "Время (в минутах), проведенное в движении умеренной или высокой интенсивности."
    },
    {
      term: "Технология микроактивности",
      definition: "Комплекс кратковременных (2-5 мин) двигательных пауз, интегрированных в структуру занятия."
    },
    {
      term: "Разрыв активности (Activity Gap)",
      definition: "Интервал времени, в котором непрерывное сидение превышает 60 минут (красная зона)."
    },
    {
      term: "Цифровая двигательная среда",
      definition: "Гармоничное сочетание учебного процесса, физического пространства и цифровых сервисов для измерения и развития активности."
    },
    {
      term: "Замкнутый цикл",
      definition: "Непрерывная педагогическая система звеньев: МОНИТОРИНГ → ОБРАТНАЯ СВЯЗЬ → МИКРОАКТИВНОСТЬ → СТИМУЛИРОВАНИЕ → РЕФЛЕКСИЯ."
    }
  ],
  en: [
    {
      term: "Physical Activity",
      definition: "Any bodily movement produced by skeletal muscles that requires energy expenditure above resting level."
    },
    {
      term: "Sedentary Behavior",
      definition: "Waking behavior characterized by an energy expenditure <= 1.5 metabolic equivalents (METs) while sitting, reclining, or lying."
    },
    {
      term: "Active Minutes",
      definition: "Time (in minutes) spent engaging in moderate-to-vigorous physical activity."
    },
    {
      term: "Microactivity Technology",
      definition: "A set of short-duration (2-5 min) movement breaks integrated directly into the educational lesson structure."
    },
    {
      term: "Activity Gap",
      definition: "A time interval where continuous sitting exceeds 60 minutes (highlighted red zone)."
    },
    {
      term: "Digital Physical Activity Environment",
      definition: "A harmonious synthesis of educational routines, physical spaces, and digital services designed to measure and promote activity."
    },
    {
      term: "Closed Loop",
      definition: "A continuous pedagogical loop: MONITORING → FEEDBACK → MICROACTIVITY → INCENTIVES → REFLECTION."
    }
  ]
};

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose }) => {
  const { lang, t } = useLanguage();
  if (!isOpen) return null;

  const items = glossaryByLang[lang] || glossaryByLang.uz;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-gray-100 dark:border-slate-700 max-h-[90vh] flex flex-col animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('glossary')}</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Scientific & Pedagogical Glossary ({lang.toUpperCase()})</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-2">
          {items.map((item, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800 hover:border-emerald-500/50 transition"
            >
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <h3 className="font-semibold text-emerald-700 dark:text-emerald-400 text-sm">{item.term}</h3>
              </div>
              <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-300 pl-6">
                {item.definition}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-gray-100 dark:border-slate-700 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium text-sm transition shadow-lg shadow-emerald-600/20"
          >
            OK
          </button>
        </div>

      </div>
    </div>
  );
};
