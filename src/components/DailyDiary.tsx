import React, { useState } from 'react';
import { DailyEntry, AuthenticatedUser } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { 
  Footprints, 
  Clock, 
  Zap, 
  Moon, 
  Smartphone, 
  Smile, 
  CheckCircle2, 
  Plus, 
  Minus, 
  Save, 
  Sparkles,
  AlertTriangle,
  RefreshCw,
  Settings2,
  GraduationCap
} from 'lucide-react';
import { 
  fetchDeviceTelemetry, 
  calculateSleepFromCustomTimes, 
  calculateSleepDuration, 
  getTodayScreenTime 
} from '../services/sensorService';

interface DailyDiaryProps {
  entries: DailyEntry[];
  onAddEntry: (entry: Omit<DailyEntry, 'id'>) => void;
  currentUser?: AuthenticatedUser;
}

export const DailyDiary: React.FC<DailyDiaryProps> = ({ entries, onAddEntry, currentUser }) => {
  const { t, lang } = useLanguage();
  const todayStr = new Date().toISOString().split('T')[0];

  const [sana, setSana] = useState(todayStr);
  const [qadam, setQadam] = useState<number>(8500);
  const [faolDaqiqa, setFaolDaqiqa] = useState<number>(35);
  const [engUzunOtirish, setEngUzunOtirish] = useState<number>(50);
  const [pauzaSoni, setPauzaSoni] = useState<number>(4);
  const [uyquSoat, setUyquSoat] = useState<number>(7.5);
  const [ekranSoat, setEkranSoat] = useState<number>(4.0);
  const [kayfiyatBall, setKayfiyatBall] = useState<number>(4);
  const [refleksiyaMatn, setRefleksiyaMatn] = useState<string>('');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  // Auto-sync & Sleep Calculation states
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncNotice, setSyncNotice] = useState<string | null>(null);
  const [sleepBedTime, setSleepBedTime] = useState<string>("23:15");
  const [sleepWakeTime, setSleepWakeTime] = useState<string>("06:45");
  const [showSleepAdjust, setShowSleepAdjust] = useState<boolean>(false);
  const [screenTimeDetailStr, setScreenTimeDetailStr] = useState<string>("4 soat 0 daqiqa");

  const handleAutoSync = async () => {
    setIsSyncing(true);
    try {
      const data = await fetchDeviceTelemetry();
      setQadam(data.qadam);
      setFaolDaqiqa(data.faolDaqiqa);
      setEngUzunOtirish(data.engUzunOtirish);
      setUyquSoat(data.uyquSoat);
      setEkranSoat(data.ekranSoat);
      setPauzaSoni(data.pauzaSoni);
      setSleepBedTime(data.sleepDetails.lockTime);
      setSleepWakeTime(data.sleepDetails.unlockTime);
      setScreenTimeDetailStr(data.screenTimeDetails.formatted);

      const sourceLabel = data.source === 'native_sensor' 
        ? 'Apple Health / Health Connect APK' 
        : 'HTML5 Pedometer & Sensor';

      setSyncNotice(
        lang === 'ru'
          ? `Синхронизировано (${sourceLabel}, ${data.syncTimestamp})!`
          : lang === 'en'
          ? `Synchronized (${sourceLabel}, ${data.syncTimestamp})!`
          : `Sensorlardan yuklandi (${sourceLabel}, ${data.syncTimestamp})!`
      );
      setTimeout(() => setSyncNotice(null), 4000);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleCustomSleepRecalc = (bed: string, wake: string) => {
    setSleepBedTime(bed);
    setSleepWakeTime(wake);
    const calculated = calculateSleepFromCustomTimes(bed, wake);
    setUyquSoat(calculated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddEntry({
      user_id: currentUser?.id || 'usr_001',
      sana,
      qadam,
      faol_daqiqa: faolDaqiqa,
      eng_uzun_otirish: engUzunOtirish,
      pauza_soni: pauzaSoni,
      uyqu_soat: uyquSoat,
      ekran_soat: ekranSoat,
      kayfiyat_ball: kayfiyatBall,
      refleksiya_matn: refleksiyaMatn
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const getEmoji = (score: number) => {
    switch (score) {
      case 1: return { char: '😫', label: 'Juda yomon' };
      case 2: return { char: '🙁', label: 'Charchagan' };
      case 3: return { char: '😐', label: 'O\'rtacha' };
      case 4: return { char: '🙂', label: 'Yaxshi' };
      case 5: return { char: '🌟', label: 'A\'lo / Tetik' };
      default: return { char: '🙂', label: '' };
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      
      {/* Header Info */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> {t('quickEntry')}
            {currentUser && (
              <span className="ml-2 pl-2 border-l border-white/30 font-black flex items-center gap-1 text-emerald-100">
                <GraduationCap className="w-3 h-3" /> {currentUser.fio} ({currentUser.guruh_id?.split(' ')[0] || '301-guruh'})
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">{t('diaryTitle')}</h1>
          <p className="text-emerald-100 text-xs sm:text-sm mt-1">
            {t('diaryDesc')}
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 text-right shrink-0">
          <div className="text-[10px] uppercase font-bold text-emerald-200">Sana</div>
          <input 
            type="date" 
            value={sana} 
            onChange={(e) => setSana(e.target.value)}
            className="bg-transparent text-sm font-bold outline-none text-white cursor-pointer"
          />
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500 text-white font-medium text-sm flex items-center gap-3 shadow-lg animate-in fade-in duration-300">
          <CheckCircle2 className="w-6 h-6 shrink-0" />
          <span>
            {lang === 'ru' 
              ? "Показатели успешно сохранены! Переход к следующему звену замкнутого цикла."
              : lang === 'en'
              ? "Daily metrics saved successfully! Moved to the next link of the closed loop."
              : "Kunlik ko'rsatkichlar muvaffaqiyatli saqlandi! Yopiq halqaning keyingi bo'g'iniga o'tildi."
            }
          </span>
        </div>
      )}

      {/* Main Entry Form */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-slate-700/80 space-y-8">
        
        {/* Device Sensors & Native Auto-Sync Banner */}
        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl border-2 border-emerald-400/40">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-extrabold text-sm sm:text-base">
              <Smartphone className="w-5 h-5 text-emerald-200 animate-pulse" />
              <span>{t('btnAutoSync')}</span>
            </div>
            <p className="text-xs text-emerald-100 max-w-xl font-medium">
              {lang === 'ru' 
                ? 'Авто-расчет: шаги и активность (акселерометр), сон (неактивность после 20:00), экранное время' 
                : lang === 'en' 
                ? 'Automatic telemetry: steps & activity (pedometer), sleep (post-20:00 screen lock), screen-on duration' 
                : 'Sensorlar telemetriyasi: qadam va faollik (akselerometr/Health), uyqu (20:00 dan keyingi ekran nofaolligi), ekran vaqti'}
            </p>
          </div>
          <button
            type="button"
            onClick={handleAutoSync}
            disabled={isSyncing}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-white text-emerald-900 font-extrabold text-xs sm:text-sm hover:bg-emerald-50 active:scale-95 transition shadow-lg flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 text-emerald-700 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? (lang === 'ru' ? 'Синхронизация...' : lang === 'en' ? 'Syncing...' : 'Yuklanmoqda...') : (lang === 'ru' ? 'Синхронизировать' : lang === 'en' ? 'Sync Telemetry' : 'Sinxronlash')}</span>
          </button>
        </div>

        {syncNotice && (
          <div className="p-4 rounded-2xl bg-cyan-600 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2.5 shadow-lg animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{syncNotice}</span>
          </div>
        )}

        {/* Grid for Sliders & Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* 1. Qadamlar soni - Dual input with quick preset buttons */}
          <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-900/70 border-2 border-slate-200/80 dark:border-slate-800 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <Footprints className="w-4 h-4 text-emerald-500" /> {t('fieldSteps')}
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max="40000"
                  value={qadam}
                  onChange={(e) => setQadam(Math.max(0, Number(e.target.value)))}
                  className="w-24 px-2 py-1 text-right text-sm font-extrabold rounded-xl bg-white dark:bg-slate-800 border-2 border-emerald-500/50 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <span className={`text-xs font-extrabold px-2.5 py-1 rounded-xl ${qadam >= 8000 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'}`}>
                  {Math.round((qadam / 8000) * 100)}%
                </span>
              </div>
            </div>

            <input
              type="range"
              min="1000"
              max="20000"
              step="100"
              value={Math.min(20000, qadam)}
              onChange={(e) => setQadam(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                { label: '+500', val: 500, type: 'add' },
                { label: '+1 000', val: 1000, type: 'add' },
                { label: '8 000 (Norma)', val: 8000, type: 'set' },
                { label: '10 000 (Faol)', val: 10000, type: 'set' }
              ].map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    if (preset.type === 'add') setQadam(prev => prev + preset.val);
                    else setQadam(preset.val);
                  }}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 text-slate-700 dark:text-slate-300 transition shadow-xs"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Faol daqiqalar - Dual input with quick buttons */}
          <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-900/70 border-2 border-slate-200/80 dark:border-slate-800 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-500" /> {t('fieldActiveMins')}
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max="300"
                  value={faolDaqiqa}
                  onChange={(e) => setFaolDaqiqa(Math.max(0, Number(e.target.value)))}
                  className="w-20 px-2 py-1 text-right text-sm font-extrabold rounded-xl bg-white dark:bg-slate-800 border-2 border-teal-500/50 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-teal-500"
                />
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                  {lang === 'ru' ? 'мин' : lang === 'en' ? 'min' : 'daq'}
                </span>
              </div>
            </div>

            <input
              type="range"
              min="0"
              max="120"
              step="5"
              value={Math.min(120, faolDaqiqa)}
              onChange={(e) => setFaolDaqiqa(Number(e.target.value))}
              className="w-full accent-teal-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                { label: '+10 daq', val: 10, type: 'add' },
                { label: '+20 daq', val: 20, type: 'add' },
                { label: '30 daq (Norma)', val: 30, type: 'set' },
                { label: '45 daq', val: 45, type: 'set' }
              ].map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    if (preset.type === 'add') setFaolDaqiqa(prev => prev + preset.val);
                    else setFaolDaqiqa(preset.val);
                  }}
                  className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-teal-500 hover:text-teal-600 dark:hover:text-teal-400 text-slate-700 dark:text-slate-300 transition shadow-xs"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Eng uzun uzluksiz o'tirish - Kunduzi harakatsiz nofaol vaqt */}
          <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-900/70 border-2 border-slate-200/80 dark:border-slate-800 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-extrabold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <AlertTriangle className={`w-4 h-4 ${engUzunOtirish > 60 ? 'text-rose-500' : 'text-emerald-500'}`} /> {t('fieldMaxSitting')}
                </span>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mt-0.5">
                  {t('autoDaytimeSedentary')} (08:00–20:00)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max="300"
                  value={engUzunOtirish}
                  onChange={(e) => setEngUzunOtirish(Math.max(0, Number(e.target.value)))}
                  className="w-20 px-2 py-1 text-right text-sm font-extrabold rounded-xl bg-white dark:bg-slate-800 border-2 border-rose-500/50 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-rose-500"
                />
                <span className={`text-xs font-extrabold px-2.5 py-1 rounded-xl ${engUzunOtirish <= 60 ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'}`}>
                  {engUzunOtirish <= 60 ? (lang === 'ru' ? 'Безопасно' : lang === 'en' ? 'Safe' : 'Xavfsiz') : (lang === 'ru' ? 'Разрыв!' : lang === 'en' ? 'Gap!' : 'Uzilish!')}
                </span>
              </div>
            </div>

            <input
              type="range"
              min="15"
              max="180"
              step="5"
              value={Math.min(180, engUzunOtirish)}
              onChange={(e) => setEngUzunOtirish(Number(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[30, 45, 60, 90].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => setEngUzunOtirish(mins)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition shadow-xs ${
                    engUzunOtirish === mins 
                      ? 'bg-rose-600 text-white font-extrabold' 
                      : 'bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-rose-400'
                  }`}
                >
                  {mins} {lang === 'ru' ? 'мин' : lang === 'en' ? 'min' : 'daq'}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Mikrofaollik pauzalari soni */}
          <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-900/70 border-2 border-slate-200/80 dark:border-slate-800 flex items-center justify-between shadow-sm">
            <div>
              <span className="font-extrabold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" /> {t('fieldPauses')}
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                {lang === 'ru' ? 'Рекомендовано: 3-5 пауз в день' : lang === 'en' ? 'Recommended: 3-5 pauses/day' : 'Tavsiya: kuniga 3-5 pauza'}
              </p>
            </div>

            <div className="flex items-center gap-3 bg-white dark:bg-slate-800 p-2 rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-sm">
              <button
                type="button"
                onClick={() => setPauzaSoni(Math.max(0, pauzaSoni - 1))}
                className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center font-extrabold hover:bg-slate-200 transition"
                aria-label="Kamaytirish"
              >
                <Minus className="w-4 h-4" />
              </button>

              <span className="w-8 text-center text-xl font-extrabold text-slate-900 dark:text-white">
                {pauzaSoni}
              </span>

              <button
                type="button"
                onClick={() => setPauzaSoni(pauzaSoni + 1)}
                className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-extrabold hover:bg-emerald-700 transition shadow-md shadow-emerald-600/30"
                aria-label="Oshirish"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 5. Uyqu davomiyligi - Kechasi 20:00 dan keyingi ekran nofaolligi orqali hisoblangan */}
          <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-900/70 border-2 border-slate-200/80 dark:border-slate-800 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-extrabold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <Moon className="w-4 h-4 text-indigo-500" /> {t('fieldSleep')}
                </span>
                <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 block mt-0.5">
                  🌙 {lang === 'ru' ? 'Неактивность экрана после 20:00' : lang === 'en' ? 'Screen inactivity after 20:00' : '20:00 dan keyingi ekran nofaolligi'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  max="24"
                  value={uyquSoat}
                  onChange={(e) => setUyquSoat(Number(e.target.value))}
                  className="w-20 px-2 py-1 text-right text-sm font-extrabold rounded-xl bg-white dark:bg-slate-800 border-2 border-indigo-500/50 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                  {lang === 'ru' ? 'ч' : lang === 'en' ? 'hrs' : 'soat'}
                </span>
              </div>
            </div>

            <input
              type="range"
              min="4"
              max="12"
              step="0.5"
              value={uyquSoat}
              onChange={(e) => setUyquSoat(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />

            {/* Sleep Calculation Details Box */}
            <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/60 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-indigo-900 dark:text-indigo-200">
                <span>{t('autoSleepNote')}</span>
                <button
                  type="button"
                  onClick={() => setShowSleepAdjust(!showSleepAdjust)}
                  className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-extrabold"
                >
                  <Settings2 className="w-3 h-3" />
                  <span>{showSleepAdjust ? (lang === 'ru' ? 'Скрыть' : lang === 'en' ? 'Close' : 'Yopish') : (lang === 'ru' ? 'Скорректировать' : lang === 'en' ? 'Adjust times' : 'Vaqtlarni tuzatish')}</span>
                </button>
              </div>

              <div className="text-xs text-slate-700 dark:text-slate-200 font-semibold flex items-center justify-between">
                <span>{lang === 'ru' ? 'Вечерняя блокировка:' : lang === 'en' ? 'Evening lock:' : "Kechki o'chish:"} <strong>{sleepBedTime}</strong></span>
                <span>➡️</span>
                <span>{lang === 'ru' ? 'Утреннее включение:' : lang === 'en' ? 'Morning unlock:' : "Ertalabki yoqilish:"} <strong>{sleepWakeTime}</strong></span>
                <span className="px-2 py-0.5 rounded-md bg-indigo-200 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 font-extrabold">
                  {uyquSoat} {lang === 'ru' ? 'ч' : lang === 'en' ? 'hrs' : 'soat'}
                </span>
              </div>

              {showSleepAdjust && (
                <div className="pt-2.5 border-t border-indigo-200 dark:border-indigo-800/60 grid grid-cols-2 gap-2.5 text-xs">
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-700 dark:text-slate-300 mb-1">
                      {lang === 'ru' ? 'Время вечерней блокировки:' : lang === 'en' ? 'Evening lock time:' : "Kechki o'chish vaqti:"}
                    </label>
                    <input
                      type="time"
                      value={sleepBedTime}
                      onChange={(e) => handleCustomSleepRecalc(e.target.value, sleepWakeTime)}
                      className="w-full p-2 rounded-xl bg-white dark:bg-slate-800 border-2 border-indigo-300 dark:border-indigo-700 font-extrabold text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold text-slate-700 dark:text-slate-300 mb-1">
                      {lang === 'ru' ? 'Время утреннего включения:' : lang === 'en' ? 'Morning unlock time:' : "Ertalabki yoqilish vaqti:"}
                    </label>
                    <input
                      type="time"
                      value={sleepWakeTime}
                      onChange={(e) => handleCustomSleepRecalc(sleepBedTime, e.target.value)}
                      className="w-full p-2 rounded-xl bg-white dark:bg-slate-800 border-2 border-indigo-300 dark:border-indigo-700 font-extrabold text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 6. Ekran vaqti - Kunlik ekrandan foydalangan vaqt */}
          <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-900/70 border-2 border-slate-200/80 dark:border-slate-800 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-extrabold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-purple-500" /> {t('fieldScreen')}
                </span>
                <span className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 block mt-0.5">
                  📱 {lang === 'ru' ? 'Дневное использование экрана' : lang === 'en' ? 'Daily screen-on usage time' : 'Kunlik ekrandan foydalanilgan vaqt'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  max="24"
                  value={ekranSoat}
                  onChange={(e) => setEkranSoat(Number(e.target.value))}
                  className="w-20 px-2 py-1 text-right text-sm font-extrabold rounded-xl bg-white dark:bg-slate-800 border-2 border-purple-500/50 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500"
                />
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                  {lang === 'ru' ? 'ч' : lang === 'en' ? 'hrs' : 'soat'}
                </span>
              </div>
            </div>

            <input
              type="range"
              min="1"
              max="12"
              step="0.5"
              value={ekranSoat}
              onChange={(e) => setEkranSoat(Number(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />

            {/* Screen Time Auto Breakdown */}
            <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800/60 space-y-1">
              <div className="text-xs font-bold text-purple-900 dark:text-purple-200 flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-purple-500" />
                <span>{t('autoScreenNote')}</span>
              </div>
              <div className="text-xs text-slate-700 dark:text-slate-200 font-semibold">
                📱 {lang === 'ru' ? 'Активное время включенного экрана (Screen-on):' : lang === 'en' ? 'Active screen-on time:' : 'Ekranning faol yoqiq turgan vaqti (Screen-on):'} <strong>{screenTimeDetailStr}</strong>
              </div>
            </div>
          </div>

        </div>

        {/* 7. Kayfiyat - Big touchable buttons with high contrast */}
        <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-900/70 border-2 border-slate-200/80 dark:border-slate-800 space-y-3 shadow-sm">
          <label className="font-extrabold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Smile className="w-4 h-4 text-amber-500" /> {t('fieldMood')}
          </label>
          
          <div className="grid grid-cols-5 gap-2 sm:gap-4">
            {[1, 2, 3, 4, 5].map((score) => {
              const emoji = getEmoji(score);
              const isSelected = kayfiyatBall === score;
              return (
                <button
                  key={score}
                  type="button"
                  onClick={() => setKayfiyatBall(score)}
                  className={`p-3 sm:p-4 rounded-2xl border-2 text-center transition-all flex flex-col items-center gap-1.5 ${
                    isSelected
                      ? 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-500 shadow-lg shadow-emerald-500/20 scale-105'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <span className="text-3xl">{emoji.char}</span>
                  <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200">{score}-ball</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 8. Refleksiya */}
        <div className="space-y-2">
          <label className="font-extrabold text-sm text-slate-800 dark:text-slate-100">
            {t('fieldReflection')}
          </label>
          <textarea
            rows={2}
            value={refleksiyaMatn}
            onChange={(e) => setRefleksiyaMatn(e.target.value)}
            placeholder={lang === 'ru' ? 'Кратко опишите как прошли паузы активности и самочувствие...' : lang === 'en' ? 'Briefly describe your activity breaks and how you felt today...' : 'Bugungi harakat pauzalari va o\'zingizni his qilishingiz haqida qisqacha...'}
            className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border-2 border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 transition font-medium"
          />
        </div>

        {/* Real-time Status Card & Submit Button */}
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-200 dark:border-emerald-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-xs font-extrabold uppercase text-emerald-800 dark:text-emerald-300">
              {lang === 'ru' ? 'Текущий расчет нормы за день:' : lang === 'en' ? 'Daily Norm Calculation:' : 'Kunlik me\'yor hisobi:'}
            </div>
            <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
              {qadam >= 8000 
                ? (lang === 'ru' ? '✅ Целевая норма шагов (8 000) успешно достигнута!' : lang === 'en' ? '✅ Target step norm (8,000) successfully reached!' : '✅ Maqsadli qadam me\'yoriga (8 000) erishildi!') 
                : (lang === 'ru' ? `🏃 До нормы осталось еще ${8000 - qadam} шагов.` : lang === 'en' ? `🏃 ${8000 - qadam} more steps to target norm.` : `🏃 Me'yorga erishish uchun yana ${8000 - qadam} qadam zarur.`)}
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm sm:text-base transition shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 shrink-0"
          >
            <Save className="w-5 h-5" />
            <span>{t('btnSaveDiary')}</span>
          </button>
        </div>

      </form>

      {/* Previous Entries History Table */}
      {entries.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl border-2 border-slate-200/80 dark:border-slate-700 space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Footprints className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>{lang === 'ru' ? 'История недавних записей' : lang === 'en' ? 'Recent Activity Logs' : 'So\'nggi yozuvlar tarixi'}</span>
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-left">
              <thead>
                <tr className="border-b-2 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                  <th className="py-2.5 px-3 font-extrabold">Sana</th>
                  <th className="py-2.5 px-3 font-extrabold">Qadamlar</th>
                  <th className="py-2.5 px-3 font-extrabold">Faol daqiqa</th>
                  <th className="py-2.5 px-3 font-extrabold">O'tirish</th>
                  <th className="py-2.5 px-3 font-extrabold">Pauzalar</th>
                  <th className="py-2.5 px-3 font-extrabold">Kayfiyat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {entries.slice(-5).reverse().map((entry, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition">
                    <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">{entry.sana}</td>
                    <td className="py-3 px-3 font-extrabold text-emerald-600 dark:text-emerald-400">{entry.qadam.toLocaleString()}</td>
                    <td className="py-3 px-3 font-semibold text-slate-700 dark:text-slate-300">{entry.faol_daqiqa} daq</td>
                    <td className="py-3 px-3 font-semibold text-slate-700 dark:text-slate-300">{entry.eng_uzun_otirish} daq</td>
                    <td className="py-3 px-3 font-bold text-amber-600 dark:text-amber-400">{entry.pauza_soni} ta</td>
                    <td className="py-3 px-3 text-lg">{getEmoji(entry.kayfiyat_ball).char}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
