import React, { useState } from 'react';
import { DailyEntry } from '../types';
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
  AlertTriangle
} from 'lucide-react';

interface DailyDiaryProps {
  entries: DailyEntry[];
  onAddEntry: (entry: Omit<DailyEntry, 'id'>) => void;
}

export const DailyDiary: React.FC<DailyDiaryProps> = ({ entries, onAddEntry }) => {
  const { t } = useLanguage();
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddEntry({
      user_id: 'usr_001',
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
          <span>Kunlik ko'rsatkichlar muvaffaqiyatli saqlandi! Yopiq halqaning keyingi bo'g'iniga o'tildi.</span>
        </div>
      )}

      {/* Main Entry Form */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-slate-700/80 space-y-8">
        
        {/* Grid for Sliders & Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* 1. Qadamlar soni */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <Footprints className="w-4 h-4 text-emerald-500" /> {t('fieldSteps')}
              </span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${qadam >= 8000 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'}`}>
                {qadam.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="1000"
              max="20000"
              step="250"
              value={qadam}
              onChange={(e) => setQadam(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          {/* 2. Faol daqiqalar */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-500" /> {t('fieldActiveMins')}
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300">
                {faolDaqiqa} daqiqa
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="120"
              step="5"
              value={faolDaqiqa}
              onChange={(e) => setFaolDaqiqa(Number(e.target.value))}
              className="w-full accent-teal-600 cursor-pointer"
            />
          </div>

          {/* 3. Eng uzun uzluksiz o'tirish */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <AlertTriangle className={`w-4 h-4 ${engUzunOtirish > 60 ? 'text-rose-500' : 'text-emerald-500'}`} /> {t('fieldMaxSitting')}
              </span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${engUzunOtirish < 60 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'}`}>
                {engUzunOtirish} daqiqa
              </span>
            </div>
            <input
              type="range"
              min="15"
              max="180"
              step="5"
              value={engUzunOtirish}
              onChange={(e) => setEngUzunOtirish(Number(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer"
            />
          </div>

          {/* 4. Mikrofaollik pauzalari soni */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
            <div>
              <span className="font-bold text-sm text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" /> {t('fieldPauses')}
              </span>
            </div>

            <div className="flex items-center gap-3 bg-white dark:bg-slate-800 p-1.5 rounded-2xl border border-gray-200 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setPauzaSoni(Math.max(0, pauzaSoni - 1))}
                className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 flex items-center justify-center font-bold hover:bg-gray-200 transition"
              >
                <Minus className="w-4 h-4" />
              </button>

              <span className="w-8 text-center text-lg font-extrabold text-gray-900 dark:text-white">
                {pauzaSoni}
              </span>

              <button
                type="button"
                onClick={() => setPauzaSoni(pauzaSoni + 1)}
                className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold hover:bg-emerald-700 transition"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 5. Uyqu davomiyligi */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <Moon className="w-4 h-4 text-indigo-500" /> {t('fieldSleep')}
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                {uyquSoat} soat
              </span>
            </div>
            <input
              type="range"
              min="4"
              max="12"
              step="0.5"
              value={uyquSoat}
              onChange={(e) => setUyquSoat(Number(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
          </div>

          {/* 6. Ekran vaqti */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-purple-500" /> {t('fieldScreen')}
              </span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                {ekranSoat} soat
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="12"
              step="0.5"
              value={ekranSoat}
              onChange={(e) => setEkranSoat(Number(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />
          </div>

        </div>

        {/* 7. Kayfiyat */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-3">
          <label className="font-bold text-sm text-gray-800 dark:text-gray-200 flex items-center gap-2">
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
                  className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1 ${
                    isSelected
                      ? 'bg-emerald-100 dark:bg-emerald-950 border-emerald-500 shadow-md ring-2 ring-emerald-500/50'
                      : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-700'
                  }`}
                >
                  <span className="text-2xl">{emoji.char}</span>
                  <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300">{score}-ball</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 8. Refleksiya */}
        <div className="space-y-2">
          <label className="font-bold text-sm text-gray-800 dark:text-gray-200">
            {t('fieldReflection')}
          </label>
          <textarea
            rows={2}
            value={refleksiyaMatn}
            onChange={(e) => setRefleksiyaMatn(e.target.value)}
            placeholder="..."
            className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 transition"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base transition shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" />
            <span>{t('btnSaveDiary')}</span>
          </button>
        </div>

      </form>

    </div>
  );
};
