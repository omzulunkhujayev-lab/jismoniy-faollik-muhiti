import React, { useState } from 'react';
import { DailyEntry, WeeklyGoal } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { 
  TrendingUp, 
  CheckCircle2, 
  HelpCircle, 
  Target, 
  BarChart2,
  Calendar,
  AlertTriangle
} from 'lucide-react';

interface WeeklyProfileProps {
  entries: DailyEntry[];
  goals: WeeklyGoal[];
  onAddGoal: (goal: Omit<WeeklyGoal, 'id'>) => void;
}

export const WeeklyProfile: React.FC<WeeklyProfileProps> = ({ entries, goals, onAddGoal }) => {
  const { t, lang } = useLanguage();

  // Calculated weekly summary metrics
  const totalSteps = entries.reduce((acc, curr) => acc + curr.qadam, 0);
  const avgSteps = Math.round(totalSteps / (entries.length || 1));
  
  const totalActiveMins = entries.reduce((acc, curr) => acc + curr.faol_daqiqa, 0);
  
  const maxSitting = Math.max(...entries.map(e => e.eng_uzun_otirish), 0);
  const avgSitting = Math.round(entries.reduce((acc, curr) => acc + curr.eng_uzun_otirish, 0) / (entries.length || 1));

  // Percentages relative to standards
  const stepsPercentage = Math.min(100, Math.round((avgSteps / 8000) * 100));
  const activeMinsPercentage = Math.min(100, Math.round((totalActiveMins / 150) * 100));
  const sittingHealthScore = Math.max(0, Math.min(100, Math.round(((60 / (avgSitting || 60)) * 100))));

  // Mandatory Reflection state
  const [activeDayReason, setActiveDayReason] = useState(
    lang === 'ru' 
      ? "Вторник и Четверг — было много пеших переходов между аудиториями."
      : lang === 'en'
      ? "Tuesday and Thursday — lots of walking between classrooms."
      : "Seshanba va Payshanba – auditoriyalararo piyoda ko'chishlar ko'p bo'ldi."
  );
  const [lowDayReason, setLowDayReason] = useState(
    lang === 'ru'
      ? "Среда — весь день готовился в библиотеке непрерывно сидя."
      : lang === 'en'
      ? "Wednesday — studied continuously sitting in the library."
      : "Chorshanba – kutubxonada uzluksiz o'tirib tayyorlandim."
  );
  const [reflectionSubmitted, setReflectionSubmitted] = useState(false);

  // Goal module state
  const recommendedStepsGoal = Math.round(avgSteps * 1.12); // 12% increase proposal
  const [customGoalInput, setCustomGoalInput] = useState<number>(recommendedStepsGoal);
  const [goalWarning, setGoalWarning] = useState<string | null>(null);
  const [goalCreatedSuccess, setGoalCreatedSuccess] = useState(false);

  const handleGoalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGoalWarning(null);

    const ratio = customGoalInput / avgSteps;
    if (ratio > 1.20) {
      setGoalWarning(`⚠️ ${avgSteps} -> ${customGoalInput} (${Math.round((ratio - 1) * 100)}%): +10–15% (${recommendedStepsGoal}) tavsiya etiladi.`);
      return;
    }

    onAddGoal({
      user_id: 'usr_001',
      hafta: '2026-W36',
      maqsad_turi: 'qadam',
      joriy_qiymat: avgSteps,
      maqsad_qiymat: customGoalInput,
      bajarildi: false
    });

    setGoalCreatedSuccess(true);
    setTimeout(() => setGoalCreatedSuccess(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-12">
      
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-slate-700 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-100 dark:border-slate-700">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" /> {t('weeklySubtitle')}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mt-1">
              {t('weeklyTitle')}
            </h1>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{lang === 'ru' ? '28 Августа – 3 Сентября 2026' : lang === 'en' ? 'Aug 28 – Sep 3, 2026' : '28-Avgust – 3-Sentabr 2026'}</span>
          </div>
        </div>

        {/* 3 Metric Cards with Percentage Norm Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          
          {/* Steps norm */}
          <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border-2 border-slate-200/80 dark:border-slate-800 space-y-3.5 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('weeklyAvgSteps')}</div>
                <div className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">{avgSteps.toLocaleString()}</div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-extrabold ${stepsPercentage >= 100 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'}`}>
                {stepsPercentage}% {lang === 'ru' ? 'нормы' : lang === 'en' ? 'norm' : 'me\'yor'}
              </div>
            </div>

            <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 rounded-full ${stepsPercentage >= 100 ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                style={{ width: `${stepsPercentage}%` }}
              />
            </div>
            <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              {stepsPercentage >= 100 ? '🟢 Tavsiya etilgan 8 000 qadam me\'yori bajarildi' : '🟡 8 000 qadam me\'yoriga erishish tavsiya etiladi'}
            </div>
          </div>

          {/* Active mins norm */}
          <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border-2 border-slate-200/80 dark:border-slate-800 space-y-3.5 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('weeklyActiveMins')}</div>
                <div className="text-3xl font-extrabold text-teal-600 dark:text-teal-400 mt-1">
                  {totalActiveMins} <span className="text-sm font-bold text-slate-500 dark:text-slate-400">{lang === 'ru' ? 'мин' : lang === 'en' ? 'mins' : 'daqiqa'}</span>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-extrabold ${activeMinsPercentage >= 100 ? 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'}`}>
                {activeMinsPercentage}% {lang === 'ru' ? 'нормы' : lang === 'en' ? 'norm' : 'me\'yor'}
              </div>
            </div>

            <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-teal-500 transition-all duration-500 rounded-full" 
                style={{ width: `${activeMinsPercentage}%` }}
              />
            </div>
            <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              {activeMinsPercentage >= 100 ? '🟢 JSST tavsiyasi (haftasiga 150 daqiqa) bajarildi' : '🟡 Haftasiga kamida 150 daqiqa faollik zarur'}
            </div>
          </div>

          {/* Continuous Sitting norm */}
          <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border-2 border-slate-200/80 dark:border-slate-800 space-y-3.5 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t('weeklyLongestSitting')}</div>
                <div className={`text-3xl font-extrabold mt-1 ${maxSitting > 60 ? 'text-rose-500' : 'text-emerald-600'}`}>
                  {maxSitting} <span className="text-sm font-bold text-slate-500 dark:text-slate-400">{lang === 'ru' ? 'мин' : lang === 'en' ? 'mins' : 'daqiqa'}</span>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-extrabold ${maxSitting <= 60 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'}`}>
                {maxSitting <= 60 
                  ? (lang === 'ru' ? 'Безопасно' : lang === 'en' ? 'Safe' : 'Xavfsiz') 
                  : (lang === 'ru' ? 'Красная зона!' : lang === 'en' ? 'Red zone!' : 'Qizil zona!')}
              </div>
            </div>

            <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 rounded-full ${maxSitting <= 60 ? 'bg-emerald-500' : 'bg-rose-500'}`} 
                style={{ width: `${sittingHealthScore}%` }}
              />
            </div>
            <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              {maxSitting <= 60 ? '🟢 60 daqiqadan oshmagan sog\'lom rejim' : '⚠️ 60 daqiqadan oshgan uzluksiz o\'tirish salbiy ta\'sir ko\'rsatadi'}
            </div>
          </div>

        </div>
      </div>

      {/* Mandatory Reflection Form */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border-2 border-slate-200/80 dark:border-slate-700 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 rounded-2xl border border-amber-300 dark:border-amber-800">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              {t('reflectionSectionTitle')}
            </h2>
          </div>
        </div>

        {reflectionSubmitted && (
          <div className="p-4 rounded-2xl bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center gap-3 shadow-lg">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{lang === 'ru' ? 'Рефлексия успешно сохранена!' : lang === 'en' ? 'Reflection saved successfully!' : 'Refleksiya muvaffaqiyatli saqlandi!'}</span>
          </div>
        )}

        <div className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="font-extrabold text-slate-800 dark:text-slate-200 block mb-1.5">
              {lang === 'ru' ? '1. Какой день был самым активным и почему?' : lang === 'en' ? '1. Which day was most active and why?' : '1. Qaysi kun eng faol bo\'ldi va nima uchun?'}
            </label>
            <textarea
              rows={2}
              value={activeDayReason}
              onChange={(e) => setActiveDayReason(e.target.value)}
              className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />
          </div>

          <div>
            <label className="font-extrabold text-slate-800 dark:text-slate-200 block mb-1.5">
              {lang === 'ru' ? '2. В какой день зафиксирован наименьший показатель и почему?' : lang === 'en' ? '2. Which day recorded the lowest metric and why?' : '2. Qaysi kun eng past ko\'rsatkich qayd etildi, sababi nimada?'}
            </label>
            <textarea
              rows={2}
              value={lowDayReason}
              onChange={(e) => setLowDayReason(e.target.value)}
              className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />
          </div>

          <button
            onClick={() => setReflectionSubmitted(true)}
            className="px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs sm:text-sm transition shadow-lg shadow-amber-600/30"
          >
            {t('btnSave')}
          </button>
        </div>
      </div>

      {/* Smart Goal Setting Module */}
      <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 border-2 border-emerald-800/40">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl border border-emerald-500/30">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold">{t('goalSectionTitle')}</h2>
              <p className="text-xs text-emerald-200/80 mt-0.5">
                {lang === 'ru' ? 'Педагогическая норма: постепенный рост на +10–15%' : lang === 'en' ? 'Pedagogical rule: gradual increase by +10–15%' : 'Pedagogik mezon: faollikni bosqichma-bosqich +10–15% ga oshirish'}
              </p>
            </div>
          </div>
        </div>

        {goalCreatedSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg">
            <CheckCircle2 className="w-5 h-5" />
            <span>{lang === 'ru' ? 'Новая цель недели успешно установлена!' : lang === 'en' ? 'Weekly goal set successfully!' : 'Haftalik yangi maqsad muvaffaqiyatli belgilandi!'}</span>
          </div>
        )}

        {goalWarning && (
          <div className="p-4 rounded-2xl bg-amber-500/20 text-amber-300 font-bold text-xs sm:text-sm flex items-center gap-2 border border-amber-500/40">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <span>{goalWarning}</span>
          </div>
        )}

        <form onSubmit={handleGoalSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 space-y-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{lang === 'ru' ? 'Текущий средний показатель:' : lang === 'en' ? 'Current average metric:' : 'Joriy o\'rtacha ko\'rsatkich:'}</div>
              <div className="text-3xl font-extrabold text-white">
                {avgSteps.toLocaleString()} <span className="text-sm font-normal text-slate-400">{lang === 'ru' ? 'шагов/день' : lang === 'en' ? 'steps/day' : 'qadam/kun'}</span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-extrabold text-slate-200 uppercase tracking-wider">
                {lang === 'ru' ? 'Цель на следующую неделю:' : lang === 'en' ? 'Goal for next week:' : 'Kelgusi hafta uchun maqsad:'}
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="4000"
                  max="25000"
                  step="100"
                  value={customGoalInput}
                  onChange={(e) => setCustomGoalInput(Number(e.target.value))}
                  className="flex-1 p-3.5 rounded-2xl bg-slate-900 border-2 border-slate-700 font-extrabold text-emerald-400 text-lg outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm transition shadow-lg shadow-emerald-600/30 shrink-0"
                >
                  {t('btnSave')}
                </button>
              </div>

              {/* Goal Presets */}
              <div className="flex gap-2">
                {[
                  { label: '+10%', mult: 1.10 },
                  { label: '+12% (Tavsiya)', mult: 1.12 },
                  { label: '+15%', mult: 1.15 }
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCustomGoalInput(Math.round(avgSteps * preset.mult))}
                    className="px-2.5 py-1 rounded-xl text-xs font-bold bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </form>
      </div>

    </div>
  );
};
