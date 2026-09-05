import React, { useState } from 'react';
import { ScheduleItem, ActivityGap } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Zap, 
  Footprints, 
  BookOpen, 
  TrendingUp,
  Sliders,
  Sparkles
} from 'lucide-react';

interface ActivityGapAnalysisProps {
  schedule: ScheduleItem[];
  gaps: ActivityGap[];
}

export const ActivityGapAnalysis: React.FC<ActivityGapAnalysisProps> = ({ schedule, gaps }) => {
  const { t, lang } = useLanguage();
  const [selectedDay, setSelectedDay] = useState<'Dushanba' | 'Seshanba'>('Dushanba');
  const [showBeforeAfter, setShowBeforeAfter] = useState<boolean>(false);
  const [selectedSolutions, setSelectedSolutions] = useState<Record<string, string>>({});

  const daySchedule = schedule.find(s => s.kun === selectedDay) || schedule[0];
  const dayGaps = gaps.filter(g => g.kun === selectedDay);

  const getDayDisplay = (day: string) => {
    if (lang === 'ru') return day === 'Dushanba' ? 'Понедельник' : 'Вторник';
    if (lang === 'en') return day === 'Dushanba' ? 'Monday' : 'Tuesday';
    return day;
  };

  const handleSolutionSelect = (gapId: string, solutionKey: string) => {
    setSelectedSolutions(prev => ({
      ...prev,
      [gapId]: solutionKey
    }));
  };

  const solutionOptions = [
    {
      key: 'pauza',
      label: t('solutionOption1Title'),
      desc: t('solutionOption1Desc'),
      icon: Zap,
      color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
    },
    {
      key: 'tanaffus_harakat',
      label: t('solutionOption2Title'),
      desc: t('solutionOption2Desc'),
      icon: Clock,
      color: 'bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300'
    },
    {
      key: 'piyoda_yol',
      label: t('solutionOption3Title'),
      desc: t('solutionOption3Desc'),
      icon: Footprints,
      color: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
    },
    {
      key: '45_plus_5',
      label: t('solutionOption4Title'),
      desc: t('solutionOption4Desc'),
      icon: BookOpen,
      color: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-12">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-rose-900 via-slate-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-4 border border-rose-800/40">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold mb-2">
              <Sparkles className="w-4 h-4 text-rose-400" /> {t('gapsBadge')}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {t('gapsTitle')}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              {t('gapsDesc')}
            </p>
          </div>

          <button
            onClick={() => setShowBeforeAfter(!showBeforeAfter)}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 transition flex items-center gap-2"
          >
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>{showBeforeAfter ? t('btnBackToAnalysis') : t('btnToggleBeforeAfter')}</span>
          </button>
        </div>

        {/* 5-Step Algorithm Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
          {[
            { step: '1', title: t('alg1') },
            { step: '2', title: t('alg2') },
            { step: '3', title: t('alg3') },
            { step: '4', title: t('alg4') },
            { step: '5', title: t('alg5') },
          ].map((alg, idx) => (
            <div key={idx} className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center">
              <div className="w-5 h-5 rounded-full bg-rose-500 text-white font-bold text-[10px] flex items-center justify-center mx-auto mb-1">
                {alg.step}
              </div>
              <div className="text-[11px] font-medium text-slate-300">{alg.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Before / After Comparison view */}
      {showBeforeAfter ? (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-slate-700 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-500" /> {t('btnToggleBeforeAfter')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 space-y-4">
              <div className="font-bold text-rose-700 dark:text-rose-400 text-sm">
                {lang === 'ru' ? 'ИСХОДНОЕ СОСТОЯНИЕ (ДО)' : lang === 'en' ? 'BEFORE INTERVENTION' : 'OLDINGI HOLAT'}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 space-y-4">
              <div className="font-bold text-emerald-700 dark:text-emerald-400 text-sm">
                {lang === 'ru' ? 'ТЕКУЩЕЕ СОСТОЯНИЕ (ПОСЛЕ)' : lang === 'en' ? 'AFTER INTERVENTION' : 'HOZIRGI HOLAT'}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Main Interactive Timeline Module */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-slate-700 shadow-xl space-y-8">
        
        {/* Day Switcher */}
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-gray-100 dark:border-slate-700 pb-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-rose-500" />
            <span className="font-bold text-sm text-gray-900 dark:text-white">{t('selectDayLabel')}</span>
          </div>
          <div className="flex gap-2">
            {['Dushanba', 'Seshanba'].map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day as 'Dushanba' | 'Seshanba')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  selectedDay === day 
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                    : 'bg-slate-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                }`}
              >
                {getDayDisplay(day)}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Timeline Bar */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-base text-gray-900 dark:text-white">
              {getDayDisplay(selectedDay)} {t('timelineTitle')}
            </h3>
            <span className="text-xs text-rose-500 font-bold flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block animate-pulse" />
              {t('redZoneLegend')}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex justify-between text-[10px] font-bold text-gray-400">
              <span>08:30 (1-{lang === 'ru' ? 'пара' : lang === 'en' ? 'pair' : 'juft'})</span>
              <span>10:00 (2-{lang === 'ru' ? 'пара' : lang === 'en' ? 'pair' : 'juft'})</span>
              <span>11:30 (3-{lang === 'ru' ? 'пара' : lang === 'en' ? 'pair' : 'juft'})</span>
              <span>13:00 ({lang === 'ru' ? 'Перемена' : lang === 'en' ? 'Break' : 'Tanaffus'})</span>
              <span>14:50 ({lang === 'ru' ? 'Конец' : lang === 'en' ? 'End' : 'Tugash'})</span>
            </div>

            <div className="h-10 w-full rounded-xl bg-gray-200 dark:bg-slate-800 flex overflow-hidden p-1 gap-1">
              {daySchedule.mashgulot_soatlari.map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex-1 bg-rose-500/90 text-white rounded-lg flex items-center justify-center text-[10px] font-bold relative group cursor-pointer border border-rose-400/50"
                  title={`${item.fan_nomi} (${item.vaqt})`}
                >
                  <span className="truncate px-1">{item.juftlik}-{lang === 'ru' ? 'пара' : lang === 'en' ? 'pair' : 'juft'}: {item.fan_nomi}</span>
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-600 rounded-full border border-white" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Gap Cards & Solution Selection */}
        <div className="space-y-6">
          <h3 className="font-bold text-base text-gray-900 dark:text-white">
            {t('gapsProposalTitle')}
          </h3>

          <div className="grid grid-cols-1 gap-6">
            {dayGaps.map((gap) => {
              const currentSolution = selectedSolutions[gap.id] || gap.taklif_etilgan_yechim;

              return (
                <div 
                  key={gap.id}
                  className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border-2 border-rose-200 dark:border-rose-900/50 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-rose-500 text-white rounded-xl font-extrabold text-xs">
                        {t('gapRiskTitle')}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-gray-900 dark:text-white">
                          {gap.boshlanish} — {gap.tugash} ({gap.davomiylik_daq} {lang === 'ru' ? 'минут' : lang === 'en' ? 'mins' : 'daqiqa'})
                        </h4>
                        <p className="text-xs text-rose-600 dark:text-rose-400 font-medium">
                          {t('gapRiskDesc')}
                        </p>
                      </div>
                    </div>
                    <div className="text-xs font-semibold px-3 py-1 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                      {t('neutralizationRequired')}
                    </div>
                  </div>

                  {/* 4 Solution Options Grid */}
                  <div className="space-y-2 pt-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {solutionOptions.map((opt) => {
                        const Icon = opt.icon;
                        const isSelected = currentSolution === opt.key;

                        return (
                          <div
                            key={opt.key}
                            onClick={() => handleSolutionSelect(gap.id, opt.key)}
                            className={`p-3.5 rounded-xl border cursor-pointer transition flex items-start gap-3 ${
                              isSelected
                                ? 'bg-white dark:bg-slate-800 border-emerald-500 ring-2 ring-emerald-500/50 shadow-md'
                                : 'bg-white/60 dark:bg-slate-800/60 border-gray-200 dark:border-slate-700 hover:border-emerald-400'
                            }`}
                          >
                            <div className={`p-2 rounded-lg ${opt.color} shrink-0`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="space-y-1">
                              <div className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                                <span>{opt.label}</span>
                                {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 inline" />}
                              </div>
                              <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">
                                {opt.desc}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs text-emerald-800 dark:text-emerald-300 font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>
                      {t('attachedSolutionLabel')} <strong>{solutionOptions.find(o => o.key === currentSolution)?.label}</strong>
                    </span>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
