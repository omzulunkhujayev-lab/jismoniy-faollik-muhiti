import React, { useState } from 'react';
import { ScheduleItem, ActivityGap } from '../types';
import { 
  Split, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Zap, 
  Footprints, 
  BookOpen, 
  ArrowRight,
  TrendingUp,
  Sliders,
  Sparkles
} from 'lucide-react';

interface ActivityGapAnalysisProps {
  schedule: ScheduleItem[];
  gaps: ActivityGap[];
}

export const ActivityGapAnalysis: React.FC<ActivityGapAnalysisProps> = ({ schedule, gaps }) => {
  const [selectedDay, setSelectedDay] = useState<'Dushanba' | 'Seshanba'>('Dushanba');
  const [showBeforeAfter, setShowBeforeAfter] = useState<boolean>(false);
  const [selectedSolutions, setSelectedSolutions] = useState<Record<string, string>>({});

  const daySchedule = schedule.find(s => s.kun === selectedDay) || schedule[0];
  const dayGaps = gaps.filter(g => g.kun === selectedDay);

  const handleSolutionSelect = (gapId: string, solutionKey: string) => {
    setSelectedSolutions(prev => ({
      ...prev,
      [gapId]: solutionKey
    }));
  };

  const solutionOptions = [
    {
      key: 'pauza',
      label: 'Mashg\'ulot ichidagi mikrofaollik pauzasi',
      desc: 'Darsning 40-daqiqasida 3-5 daqiqalik kognitiv yoki gigiyenik mashq bajarish.',
      icon: Zap,
      color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
    },
    {
      key: 'tanaffus_harakat',
      label: 'Tanaffusdagi faol harakat',
      desc: '10 daqiqalik tanaffusda auditoriyadan chiqib, ochiq havoda 300-500 qadam yurish.',
      icon: Clock,
      color: 'bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300'
    },
    {
      key: 'piyoda_yol',
      label: "Binolar orasidagi yo'lni piyoda o'tkazish",
      desc: 'Kafedra va fakultet binolari o\'rtasida liftsiz zinapoyadan harakatlanish.',
      icon: Footprints,
      color: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
    },
    {
      key: '45_plus_5',
      label: 'Mustaqil ish davridagi "45+5" rejimi',
      desc: 'Kutubxonada har 45 daqiqa o\'tirishdan so\'ng 5 daqiqa tik turib umurtqani yozish.',
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
              <Sparkles className="w-4 h-4 text-rose-400" /> Platformaning eng o'ziga xos moduli
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              «Faollik uzilishlari» tahlili (Activity Gap Analysis)
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Dars jadvali va monitoring ma'lumotlarini taqqoslab, 60+ daqiqalik uzluksiz o'tirish (qizil zona)larni aniqlash va neytrallash.
            </p>
          </div>

          <button
            onClick={() => setShowBeforeAfter(!showBeforeAfter)}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 transition flex items-center gap-2"
          >
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>{showBeforeAfter ? "Tahlil rejimiga qaytish" : "1-2 haftalik Samaradorlik (Oldin / Keyin)"}</span>
          </button>
        </div>

        {/* 5-Step Algorithm Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-2">
          {[
            { step: '1', title: 'Jadval tahlili' },
            { step: '2', title: 'Monitoring ma\'lumoti' },
            { step: '3', title: 'Uzilishni aniqlash' },
            { step: '4', title: 'Yechim biriktirish' },
            { step: '5', title: 'Samarani baholash' },
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
              <TrendingUp className="w-5 h-5 text-emerald-500" /> 1-2 haftalik Intervensiya samaradorligi taqqoslamasi
            </h2>
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
              Korreksion natija
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Before */}
            <div className="p-6 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 space-y-4">
              <div className="flex items-center justify-between font-bold text-rose-700 dark:text-rose-400 text-sm">
                <span>OLDINGI HOLAT (Aralashuvsiz)</span>
                <span className="px-2 py-0.5 rounded bg-rose-200 dark:bg-rose-900 text-xs">Hafta 1</span>
              </div>
              <ul className="space-y-2 text-xs text-rose-900 dark:text-rose-200">
                <li className="flex items-center justify-between">
                  <span>Haftalik qizil uzilishlar:</span>
                  <span className="font-extrabold text-rose-600">8 ta oraliq (&gt;60 min)</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Eng uzun o'tirish:</span>
                  <span className="font-extrabold text-rose-600">110 daqiqa (kutubxona)</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Kunlik o'rtacha pauzalar:</span>
                  <span className="font-extrabold">1,2 ta</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Charchoq darajasi:</span>
                  <span className="font-extrabold">Yuqori (3.2/5)</span>
                </li>
              </ul>
            </div>

            {/* After */}
            <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 space-y-4">
              <div className="flex items-center justify-between font-bold text-emerald-700 dark:text-emerald-400 text-sm">
                <span>HOZIRGI HOLAT (Mikrofaollikdan so'ng)</span>
                <span className="px-2 py-0.5 rounded bg-emerald-200 dark:bg-emerald-900 text-xs">Hafta 3</span>
              </div>
              <ul className="space-y-2 text-xs text-emerald-900 dark:text-emerald-200">
                <li className="flex items-center justify-between">
                  <span>Haftalik qizil uzilishlar:</span>
                  <span className="font-extrabold text-emerald-600">2 ta oraliq (-75% kamaydi)</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Eng uzun o'tirish:</span>
                  <span className="font-extrabold text-emerald-600">50 daqiqa (xavfsiz me'yor)</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Kunlik o'rtacha pauzalar:</span>
                  <span className="font-extrabold text-emerald-600">4,5 ta</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Charchoq darajasi:</span>
                  <span className="font-extrabold text-emerald-600">Past/Tetik (4.6/5)</span>
                </li>
              </ul>
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
            <span className="font-bold text-sm text-gray-900 dark:text-white">Kun bo'yicha jadvalni tanlang:</span>
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
                {day} jadvali
              </button>
            ))}
          </div>
        </div>

        {/* Visual Timeline Bar (8:00 to 15:00) */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-base text-gray-900 dark:text-white">
              {selectedDay} kunining uzluksiz vaqt shkalasi (Timeline)
            </h3>
            <span className="text-xs text-rose-500 font-bold flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block animate-pulse" />
              Qizil zonalar = Faollik uzilishi (&gt;60 min o'tirish)
            </span>
          </div>

          {/* Graphical Hours Bar */}
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex justify-between text-[10px] font-bold text-gray-400">
              <span>08:30 (1-juft)</span>
              <span>10:00 (2-juft)</span>
              <span>11:30 (3-juft)</span>
              <span>13:00 (Tanaffus)</span>
              <span>14:50 (Tugash)</span>
            </div>

            {/* Timeline track */}
            <div className="h-10 w-full rounded-xl bg-gray-200 dark:bg-slate-800 flex overflow-hidden p-1 gap-1">
              {daySchedule.mashgulot_soatlari.map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex-1 bg-rose-500/90 text-white rounded-lg flex items-center justify-center text-[10px] font-bold relative group cursor-pointer border border-rose-400/50"
                  title={`${item.fan_nomi} (${item.vaqt}) - 80 min uzluksiz o'tirish`}
                >
                  <span className="truncate px-1">{item.juftlik}-juft: {item.fan_nomi}</span>
                  {/* Red Gap Badge */}
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-600 rounded-full border border-white" />
                </div>
              ))}
            </div>

            <div className="text-[11px] text-gray-500 dark:text-gray-400 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
              <span>
                Tahlil natijasi: Bugun <strong>{daySchedule.mashgulot_soatlari.length} ta dars juftligida</strong> ketma-ket 80 daqiqalik o'tirish aniqlandi. Har biriga yechim biriktirish majburiy.
              </span>
            </div>
          </div>
        </div>

        {/* Detailed Gap Cards & Solution Selection */}
        <div className="space-y-6">
          <h3 className="font-bold text-base text-gray-900 dark:text-white">
            Aniqlangan har bir faollik uzilishi uchun to'ldirish variantini biriktiring:
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
                        UZILISH
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-gray-900 dark:text-white">
                          Vaqt oraliqlari: {gap.boshlanish} — {gap.tugash} ({gap.davomiylik_daq} daqiqa o'tirish)
                        </h4>
                        <p className="text-xs text-rose-600 dark:text-rose-400 font-medium">
                          Xavf darajasi: Yuqori (MET sarfi &lt; 1,5)
                        </p>
                      </div>
                    </div>
                    <div className="text-xs font-semibold px-3 py-1 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                      ⚠️ Neftralizatsiya talab etiladi
                    </div>
                  </div>

                  {/* 4 Solution Options Grid */}
                  <div className="space-y-2 pt-2">
                    <div className="text-xs font-bold text-gray-700 dark:text-gray-300">
                      Tizim taklif qilgan 4 xil to'ldirish varianti:
                    </div>

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
                      Biriktirilgan yechim: <strong>{solutionOptions.find(o => o.key === currentSolution)?.label}</strong>
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
