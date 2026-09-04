import React, { useState } from 'react';
import { DailyEntry, WeeklyGoal } from '../types';
import { 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  Target, 
  Zap, 
  Award,
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
  // Calculated weekly summary metrics
  const totalSteps = entries.reduce((acc, curr) => acc + curr.qadam, 0);
  const avgSteps = Math.round(totalSteps / (entries.length || 1));
  
  const totalActiveMins = entries.reduce((acc, curr) => acc + curr.faol_daqiqa, 0);
  
  const maxSitting = Math.max(...entries.map(e => e.eng_uzun_otirish), 0);
  const avgSitting = Math.round(entries.reduce((acc, curr) => acc + curr.eng_uzun_otirish, 0) / (entries.length || 1));

  // Percentages relative to standards
  // Standard: 8000 steps/day, 150 active mins/week, <60 min sitting
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

    // Rule: System warns and discourages jump > 20%
    const ratio = customGoalInput / avgSteps;
    if (ratio > 1.20) {
      setGoalWarning(`⚠️ Ogohlantirish: ${avgSteps} dan ${customGoalInput} qadamga o'tish (${Math.round((ratio - 1) * 100)}% sakrash) tavsiya etilmaydi! Organizmning moslashuvi uchun ko'rsatkichni 10–15% (masalan, ${recommendedStepsGoal} qadam) ga oshirish maqsadga muvofiq.`);
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
              <TrendingUp className="w-4 h-4" /> Teskari aloqa va tahlil bo'g'ini
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mt-1">
              Haftalik Faollik Profili
            </h1>
          </div>
          <div className="px-4 py-2 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Hafta: 28-Avgust – 3-Sentabr 2026</span>
          </div>
        </div>

        {/* 3 Metric Cards with Percentage Norm Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          
          {/* Steps norm */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">O'rtacha kunlik qadam</div>
                <div className="text-2xl font-extrabold text-gray-900 dark:text-white">{avgSteps.toLocaleString()}</div>
              </div>
              <div className={`px-2.5 py-1 rounded-full text-xs font-bold ${stepsPercentage >= 100 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'}`}>
                {stepsPercentage}% me'yor
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2.5 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 rounded-full ${stepsPercentage >= 100 ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                style={{ width: `${stepsPercentage}%` }}
              />
            </div>
            <div className="text-[10px] text-gray-500 flex justify-between font-medium">
              <span>JSST Me'yori: 8 000 qadam</span>
              <span>{avgSteps >= 8000 ? '✓ Erishildi' : 'Tanqislik bor'}</span>
            </div>
          </div>

          {/* Active mins norm */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Haftalik faol daqiqalar</div>
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
            <div className="text-[10px] text-gray-500 flex justify-between font-medium">
              <span>Haftalik me'yor: 150+ daq</span>
              <span>{totalActiveMins >= 150 ? '✓ Bajarildi' : 'Tahlil talab etiladi'}</span>
            </div>
          </div>

          {/* Continuous Sitting norm */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Eng uzun uzluksiz o'tirish</div>
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
            <div className="text-[10px] text-gray-500 flex justify-between font-medium">
              <span>Maksimal ruxsat: 60 daq</span>
              <span>{maxSitting > 60 ? '⚠️ Uzilishlar bor' : '✓ A\'lo'}</span>
            </div>
          </div>

        </div>
      </div>

      {/* Visual Chart Section (Custom SVG Bar Chart) */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-slate-700 shadow-xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-emerald-500" /> Kunlar kesimida qadamlar va o'tirish dinamikasi
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Yashil ustun — Qadamlar soni; Qizil chiziq — O'tirish uzilishi (60 daqiqadan oshgan qism)</p>
          </div>
        </div>

        {/* Custom SVG Bar Chart */}
        <div className="h-64 w-full pt-4">
          <div className="h-full flex items-end justify-between gap-2 sm:gap-4 px-2 border-b border-gray-200 dark:border-slate-700 pb-2">
            {entries.map((entry, idx) => {
              const maxStepsVal = getMaxSteps();
              const heightPercent = Math.round((entry.qadam / maxStepsVal) * 100);
              const isOverSitting = entry.eng_uzun_otirish > 60;

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group relative">
                  
                  {/* Tooltip on hover */}
                  <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] p-2 rounded-lg pointer-events-none z-20 whitespace-nowrap shadow-lg">
                    <div>{entry.sana}</div>
                    <div className="font-bold text-emerald-400">{entry.qadam.toLocaleString()} qadam</div>
                    <div className={isOverSitting ? 'text-rose-400 font-bold' : 'text-slate-300'}>
                      O'tirish: {entry.eng_uzun_otirish} daq
                    </div>
                  </div>

                  {/* Sitting Indicator Dot */}
                  {isOverSitting && (
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping mb-1" title="Uzilish bor (>60 min)" />
                  )}

                  {/* Step Bar */}
                  <div 
                    className="w-full max-w-[48px] rounded-t-xl bg-gradient-to-t from-emerald-600 to-teal-400 group-hover:brightness-110 transition duration-300 relative overflow-hidden"
                    style={{ height: `${heightPercent}%` }}
                  >
                    <div className="text-[10px] font-bold text-white text-center pt-1.5 opacity-90 hidden sm:block">
                      {(entry.qadam / 1000).toFixed(1)}k
                    </div>
                  </div>

                  {/* Day Label */}
                  <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400 truncate">
                    {entry.sana.slice(8)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center gap-6 text-xs font-semibold text-gray-600 dark:text-gray-400 pt-2">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-emerald-500 inline-block" />
            <span>Kunlik qadamlar</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-rose-500 inline-block" />
            <span>Uzluksiz o'tirish uzilishi (&gt;60 daqiqa)</span>
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
              Hafta yakunidagi refleksiya savollari (Majburiy bo'g'in)
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Yopiq halqadagi o'z-o'zini anglash va tahlil qilish bosqichi
            </p>
          </div>
        </div>

        {reflectionSubmitted && (
          <div className="p-4 rounded-2xl bg-emerald-500 text-white font-medium text-xs sm:text-sm flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>Refleksiya tahlili saqlandi. Siz faollik darajangizni anglash va korreksiya qilishga muvaffaq bo'ldingiz!</span>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-800 dark:text-gray-200 block mb-1">
              1. Qaysi kun eng faol bo'ldi va nima uchun?
            </label>
            <textarea
              rows={2}
              value={activeDayReason}
              onChange={(e) => setActiveDayReason(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-800 dark:text-gray-200 block mb-1">
              2. Qaysi kun eng past ko'rsatkich qayd etildi, sababi nimada?
            </label>
            <textarea
              rows={2}
              value={lowDayReason}
              onChange={(e) => setLowDayReason(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-800 dark:text-gray-200 block mb-1">
              3. Qaysi vaqt oralig'ida uzluksiz o'tirish eng uzun bo'ldi?
            </label>
            <input
              type="text"
              value={longestSittingPeriod}
              onChange={(e) => setLongestSittingPeriod(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-800 dark:text-gray-200 block mb-1">
              4. Kelgusi haftaga qanday bitta aniq maqsad qo'yaman?
            </label>
            <input
              type="text"
              value={nextWeekOneGoal}
              onChange={(e) => setNextWeekOneGoal(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 font-semibold text-emerald-600 dark:text-emerald-400"
            />
          </div>

          <button
            onClick={() => {
              setReflectionSubmitted(true);
              setTimeout(() => setReflectionSubmitted(false), 3000);
            }}
            className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition shadow-md shadow-amber-600/20"
          >
            Refleksiyani tasdiqlash
          </button>
        </div>
      </div>

      {/* Smart Goal Setting Module (+10-15% increase rule) */}
      <div className="bg-gradient-to-br from-emerald-900 via-slate-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl border border-emerald-500/30">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Maqsad Qo'yish Moduli</h2>
              <p className="text-xs text-slate-300">Tizim joriy darajadan 10–15% ga oshirilgan maqsadni taklif qiladi</p>
            </div>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
            Avtomatik tavsiya
          </span>
        </div>

        {goalCreatedSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-500 text-white font-medium text-xs flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>Yangi haftalik maqsad o'rnatildi va profilga biriktirildi!</span>
          </div>
        )}

        <form onSubmit={handleGoalSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
              <div className="text-xs text-slate-400">Joriy o'rtacha ko'rsatkich:</div>
              <div className="text-2xl font-extrabold text-white">{avgSteps.toLocaleString()} qadam / kun</div>
              <div className="text-[11px] text-emerald-400 font-medium">
                Tizim taklifi (+12%): <strong>{recommendedStepsGoal.toLocaleString()} qadam</strong>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-200">
                Kelgusi hafta uchun maqsadli kunlik qadam:
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="4000"
                  max="25000"
                  step="100"
                  value={customGoalInput}
                  onChange={(e) => setCustomGoalInput(Number(e.target.value))}
                  className="flex-1 p-3 rounded-xl bg-slate-900 border border-slate-700 font-extrabold text-emerald-400 outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-lg shadow-emerald-600/30"
                >
                  O'rnatish
                </button>
              </div>
            </div>

          </div>

          {/* Warning Message if jump > 20% */}
          {goalWarning && (
            <div className="p-4 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs leading-relaxed flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>{goalWarning}</div>
            </div>
          )}

        </form>
      </div>

    </div>
  );
};
