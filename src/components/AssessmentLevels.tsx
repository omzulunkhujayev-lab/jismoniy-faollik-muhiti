import React, { useState } from 'react';
import { Assessment } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { 
  Award, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  Activity, 
  FileSpreadsheet, 
  HelpCircle,
  Sparkles
} from 'lucide-react';

interface AssessmentLevelsProps {
  assessments: Assessment[];
}

export const AssessmentLevels: React.FC<AssessmentLevelsProps> = ({ assessments }) => {
  const { t, lang } = useLanguage();
  const currentAss = assessments[assessments.length - 1] || assessments[0];

  // Triangulation Discrepancy Flag state
  const [showTriangulationDetails, setShowTriangulationDetails] = useState(false);
  const hasDiscrepancy = false; // Triangulation match simulation (e.g. Self entry matches Device & Teacher observation)

  const getLevelBadge = (daraja: string) => {
    switch (daraja) {
      case 'yuqori':
        return <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-extrabold text-xs border border-emerald-300">{t('levelHigh')} (86–100)</span>;
      case 'orta':
        return <span className="px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-extrabold text-xs border border-amber-300">{t('levelMedium')} (71–85)</span>;
      default:
        return <span className="px-3.5 py-1.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-extrabold text-xs border border-rose-300">{t('levelLow')} (≤70)</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-12">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-teal-950 rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-4 border border-emerald-800/40">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> {lang === 'ru' ? 'Требование научно-педагогической этики' : lang === 'en' ? 'Scientific-Pedagogical Ethics Requirement' : 'Ilmiy-pedagogik etika talabi'}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {t('assessTitle')}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-3xl">
              {t('assessSub')}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-right shrink-0">
            <div className="text-[10px] uppercase font-bold text-emerald-300">{lang === 'ru' ? 'Интегральная Оценка' : lang === 'en' ? 'Integral Score' : 'Integral Baho'}</div>
            <div className="text-2xl font-extrabold text-white">{currentAss.integral_ball} pts</div>
            <div className="mt-1">{getLevelBadge(currentAss.daraja)}</div>
          </div>
        </div>
      </div>

      {/* 2-Layer System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Layer 1: Objective Indicators (30% weight) */}
        <div className="md:col-span-4 bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-100 dark:border-slate-700 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-extrabold text-sm border-b border-gray-100 dark:border-slate-700 pb-3">
            <Layers className="w-5 h-5" />
            <span>{t('layer1Title')}</span>
          </div>

          <p className="text-xs text-gray-500 leading-relaxed">
            {lang === 'ru' ? 'Дисциплина и регулярность ведения мониторинга шагов, активных минут и сна.' : lang === 'en' ? 'Discipline and regularity of monitoring steps, active minutes, and sleep.' : 'Qadamlar, faol daqiqalar va uyqu vaqti bo\'yicha monitoring yuritish intizomi va muntazamligi.'}
          </p>

          <div className="space-y-3 pt-2">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex justify-between items-center text-xs">
              <span className="text-gray-600 dark:text-gray-400">{lang === 'ru' ? 'Регулярность мониторинга (30 дн):' : lang === 'en' ? 'Monitoring regularity (30d):' : 'Monitoring muntazamligi (30 kun):'}</span>
              <span className="font-extrabold text-emerald-600">92%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex justify-between items-center text-xs">
              <span className="text-gray-600 dark:text-gray-400">{lang === 'ru' ? 'Активность проведения пауз:' : lang === 'en' ? 'Pause activity:' : 'Pauza o\'tkazish faolligi:'}</span>
              <span className="font-extrabold text-emerald-600">4.2 / day</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex justify-between items-center text-xs">
              <span className="text-gray-600 dark:text-gray-400">{lang === 'ru' ? 'Балл объективного слоя:' : lang === 'en' ? 'Objective Layer Score:' : 'Obyektiv Qatlam Balli:'}</span>
              <span className="font-extrabold text-emerald-600">{currentAss.obyektiv_ball} / 100</span>
            </div>
          </div>
        </div>

        {/* Layer 2: 4 Pedagogical Criteria (70% weight) */}
        <div className="md:col-span-8 bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-100 dark:border-slate-700 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-700 pb-3">
            <h3 className="font-extrabold text-base text-gray-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-500" /> {t('layer2Title')}
            </h3>
            <span className="text-xs text-gray-400 font-medium">{lang === 'ru' ? 'Каждый критерий по 100-балльной шкале' : lang === 'en' ? 'Each criterion on a 100-point scale' : 'Har bir mezon 100 ballik shkalada'}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Criteria 1 */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-xs text-emerald-700 dark:text-emerald-400">{t('crit1Title')}</span>
                <span className="font-extrabold text-xs text-gray-900 dark:text-white">{currentAss.motivatsion_ball} pts</span>
              </div>
              <p className="text-[11px] text-gray-500 leading-tight">
                {t('crit1Desc')}
              </p>
            </div>

            {/* Criteria 2 */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-xs text-teal-700 dark:text-teal-400">{t('crit2Title')}</span>
                <span className="font-extrabold text-xs text-gray-900 dark:text-white">{currentAss.kognitiv_ball} pts</span>
              </div>
              <p className="text-[11px] text-gray-500 leading-tight">
                {t('crit2Desc')}
              </p>
            </div>

            {/* Criteria 3 */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-xs text-blue-700 dark:text-blue-400">{t('crit3Title')}</span>
                <span className="font-extrabold text-xs text-gray-900 dark:text-white">{currentAss.faoliyatli_ball} pts</span>
              </div>
              <p className="text-[11px] text-gray-500 leading-tight">
                {t('crit3Desc')}
              </p>
            </div>

            {/* Criteria 4 */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-xs text-purple-700 dark:text-purple-400">{t('crit4Title')}</span>
                <span className="font-extrabold text-xs text-gray-900 dark:text-white">{currentAss.refleksiv_ball} pts</span>
              </div>
              <p className="text-[11px] text-gray-500 leading-tight">
                {t('crit4Desc')}
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* Levels Qualitative Descriptions */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-slate-700 shadow-xl space-y-6">
        <h3 className="font-extrabold text-lg text-gray-900 dark:text-white">
          {lang === 'ru' ? 'Качественные характеристики уровней' : lang === 'en' ? 'Qualitative Descriptions of Levels' : 'Darajalar bo\'yicha sifat tavsiflari'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* High */}
          <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2">
            <span className="font-extrabold text-emerald-800 dark:text-emerald-300 text-sm block">
              {t('levelHigh')} (86–100)
            </span>
            <p className="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
              {lang === 'ru' 
                ? 'Студент полностью осознает нормы двигательной активности, непрерывно ведет ежедневный мониторинг. Способен самостоятельно и дидактически оправданно проводить микропаузы на занятиях. Глубокий рефлексивный анализ.'
                : lang === 'en' 
                ? 'The student fully understands physical activity norms and maintains daily monitoring continuously. Capable of independently and didactically conducting microactivity pauses in classes. Deep reflective analysis.'
                : 'Talaba harakat faolligi me\'yorlarini to\'liq anglaydi, kundalik monitoringni uzluksiz yuritadi. O\'quv darslarida va mustaqil ta\'limda mikrofaollik pauzalarini mustaqil va didaktik o\'rinli tashkil qila oladi. Refleksiv tahlil chuqur.'
              }
            </p>
          </div>

          {/* Medium */}
          <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-2">
            <span className="font-extrabold text-amber-800 dark:text-amber-300 text-sm block">
              {t('levelMedium')} (71–85)
            </span>
            <p className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
              {lang === 'ru' 
                ? 'Студент знает нормы и методику, но иногда допускает перерывы в мониторинге. Проводит паузы в основном по напоминанию преподавателя. Навык постановки целей формируется.'
                : lang === 'en' 
                ? 'The student knows norms and methods but occasionally has gaps in monitoring. Conducts pauses mostly when reminded by the teacher. Goal-setting skill is developing.'
                : 'Talaba me\'yorlar va metodikani biladi, lekin monitoring yuritishda ba\'zan uzilishlarga yo\'l qo\'yadi. Pauzalarni asosan o\'qituvchi eslatgandagina bajaradi. Maqsad qo\'yish ko\'nikmasi shakllanmoqda.'
              }
            </p>
          </div>

          {/* Low */}
          <div className="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 space-y-2">
            <span className="font-extrabold text-rose-800 dark:text-rose-300 text-sm block">
              {t('levelLow')} (≤70)
            </span>
            <p className="text-xs text-rose-900 dark:text-rose-200 leading-relaxed">
              {lang === 'ru' 
                ? 'Недостаточно осознает риски сидячего поведения. Мониторинг нерегулярен, непрерывное сидение часто превышает 60 минут. Требуется индивидуальная беседа с тьютором и коррекционная помощь.'
                : lang === 'en' 
                ? 'Does not sufficiently understand sedentary behavior risks. Irregular monitoring, continuous sitting frequently exceeds 60 mins. Requires individual talk with tutor and corrective support.'
                : 'O\'tirg\'ich xulq-atvor xavflarini yetarli anglamaydi. Monitoring tartibsiz, uzluksiz o\'tirish vaqti tez-tez 60 daqiqadan oshadi. Tyutor bilan individual suhbat va korreksion yordam talab etiladi.'
              }
            </p>
          </div>

        </div>
      </div>

      {/* Triangulation System & Tutor Signal */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">
                {lang === 'ru' ? 'Механизм Триангуляции и Сигнал Тьютора' : lang === 'en' ? 'Triangulation Mechanism & Tutor Signal' : 'Triangulyatsiya Mexanizmi va Tyutor Signali'}
              </h2>
              <p className="text-xs text-slate-400">
                {lang === 'ru' ? 'Записи студента + Данные устройства + Сравнение оценки наблюдения' : lang === 'en' ? 'Student log + Device data + Observation/Expert evaluation comparison' : 'Talaba yozuvlari + Qurilma ma\'lumoti + Kuzatuv/Ekspert bahosi taqqoslamasi'}
              </p>
            </div>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
            {lang === 'ru' ? '3-стороннее сравнение' : lang === 'en' ? '3-Way Comparison' : '3 Tomonlama Solishtirish'}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs leading-relaxed space-y-2">
          <p className="text-slate-300">
            {lang === 'ru'
              ? 'Система автоматически сравнивает данные из 3 источников. При выявлении расхождений (например: 15 000 шагов вручную vs 3 500 на трекере), система выдает флаг тьютору.'
              : lang === 'en'
              ? 'The system automatically compares data from 3 sources. If a discrepancy is detected (e.g. manual 15,000 steps vs 3,500 tracker steps), the system flags it for the tutor.'
              : 'Tizim avtomatik ravishda 3 manba ma\'lumotlarini taqqoslaydi. Nomuvofiqlik aniqlansa (masalan: talaba qo\'lda 15,000 qadam deb kiritsa, lekin fit-treker 3,500 qadam ko\'rsatsa), tizim tyutorga belgi (flag) beradi.'
            }
          </p>
          <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-200 font-semibold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              {lang === 'ru'
                ? 'Важно: Это не средство наказания, а сигнал для доверительной беседы и поддержки со стороны тьютора.'
                : lang === 'en'
                ? 'Important: This is not a punishment tool, but a signal for a constructive, supportive talk with the tutor.'
                : 'Muhim: Bu jazolash vositasi emas, balki tyutor bilan samimiy muhokama va rag\'batlantiruvchi suhbat uchun signaldir.'
              }
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};
