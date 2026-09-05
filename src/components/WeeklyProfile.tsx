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
  const { t } = useLanguage();

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
  const [activeDayReason, setActiveDayReason] = useState("Seshanba va Payshanba – auditoriyalararo piyoda ko'chishlar ko'p bo'ldi.");
  const [lowDayReason, setLowDayReason] = useState("Chorshanba – kutubxonada uzluksiz o'tirib tayyorlandim.");
  const [longestSittingPeriod, setLongestSittingPeriod] = useState("11:30 - 14:00 (kutubxonadagi 2.5 soat)");
  const [nextWeekOneGoal, setNextWeekOneGoal] = useState("Dars tanaffusida 2 marta 'Kartochka № 17' gigiyenik pauzasini bajaramiz.");
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

  const getMaxSteps = () => Math.max(...entries.map(e => e.qadam), 10000);

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
            <span>28-Avgust – 3-Sentabr 2026</span>
          </div>
        </div>

        {/* 3 Metric Cards with Percentage Norm Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          
          {/* Steps norm */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{t('weeklyAvgSteps')}</div>
                <div className="text-2xl font-extrabold text-gray-900 dark:text-white">{avgSteps.toLocaleString()}</div>
              </div>
              <div className={`px-2.5 py-1 rounded-full text-xs font-bold ${stepsPercentage >= 100 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'}`}>
                {stepsPercentage}% me'yor
              </div>
            </div>

            <div className="w-full h-2.5 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 rounded-full ${stepsPercentage >= 100 ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                style={{ width: `${stepsPercentage}%` }}
              />
            </div>
          </div>

          {/* Active mins norm */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{t('weeklyActiveMins')}</div>
                <div className="text-2xl font-extrabold text-teal-600 dark:text-teal-400">{totalActiveMins} daqiqa</div>
              </div>
              <div className={`px-2.5 py-1 rounded-full text-xs font-bold ${activeMinsPercentage >= 100 ? 'bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'}`}>
                {activeMinsPercentage}% me'yor
              </div>
            </div>

            <div className="w-full h-2.5 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-teal-500 transition-all duration-500 rounded-full" 
                style={{ width: `${activeMinsPercentage}%` }}
              />
            </div>
          </div>

          {/* Continuous Sitting norm */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{t('weeklyLongestSitting')}</div>
                <div className={`text-2xl font-extrabold ${maxSitting > 60 ? 'text-rose-500' : 'text-emerald-600'}`}>
                  {maxSitting} daqiqa
                </div>
              </div>
              <div className={`px-2.5 py-1 rounded-full text-xs font-bold ${maxSitting <= 60 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'}`}>
                {maxSitting <= 60 ? 'Xavfsiz' : 'Qizil zona!'}
              </div>
            </div>

            <div className="w-full h-2.5 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 rounded-full ${maxSitting <= 60 ? 'bg-emerald-500' : 'bg-rose-500'}`} 
                style={{ width: `${sittingHealthScore}%` }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Mandatory Reflection Form */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-slate-700 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 rounded-2xl">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {t('reflectionSectionTitle')}
            </h2>
          </div>
        </div>

        {reflectionSubmitted && (
          <div className="p-4 rounded-2xl bg-emerald-500 text-white font-medium text-xs sm:text-sm flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>Refleksiya saqlandi.</span>
          </div>
        )}

        <div className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-gray-800 dark:text-gray-200 block mb-1">
              1. Qaysi kun eng faol bo'ldi va nima uchun?
            </label>
            <textarea
              rows={2}
              value={activeDayReason}
              onChange={(e) => setActiveDayReason(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="font-bold text-gray-800 dark:text-gray-200 block mb-1">
              2. Qaysi kun eng past ko'rsatkich qayd etildi, sababi nimada?
            </label>
            <textarea
              rows={2}
              value={lowDayReason}
              onChange={(e) => setLowDayReason(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button
            onClick={() => setReflectionSubmitted(true)}
            className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold transition shadow-md"
          >
            {t('btnSave')}
          </button>
        </div>
      </div>

      {/* Smart Goal Setting Module */}
      <div className="bg-gradient-to-br from-emerald-900 via-slate-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl border border-emerald-500/30">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{t('goalSectionTitle')}</h2>
            </div>
          </div>
        </div>

        <form onSubmit={handleGoalSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
              <div className="text-xs text-slate-400">Joriy o'rtacha ko'rsatkich:</div>
              <div className="text-2xl font-extrabold text-white">{avgSteps.toLocaleString()} qadam</div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-200">
                Kelgusi hafta uchun maqsad:
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="4000"
                  max="25000"
                  step="100"
                  value={customGoalInput}
                  onChange={(e) => setCustomGoalInput(Number(e.target.value))}
                  className="flex-1 p-3 rounded-xl bg-slate-900 border border-slate-700 font-extrabold text-emerald-400 outline-none"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                >
                  {t('btnSave')}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

    </div>
  );
};
