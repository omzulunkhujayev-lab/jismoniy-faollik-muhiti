import React, { useState } from 'react';
import { Assessment } from '../types';
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
  const currentAss = assessments[assessments.length - 1] || assessments[0];

  // Triangulation Discrepancy Flag state
  const [showTriangulationDetails, setShowTriangulationDetails] = useState(false);
  const hasDiscrepancy = false; // Triangulation match simulation (e.g. Self entry matches Device & Teacher observation)

  const getLevelBadge = (daraja: string) => {
    switch (daraja) {
      case 'yuqori':
        return <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-extrabold text-xs border border-emerald-300">Yuqori daraja (86–100 ball)</span>;
      case 'orta':
        return <span className="px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-extrabold text-xs border border-amber-300">O'rta daraja (71–85 ball)</span>;
      default:
        return <span className="px-3.5 py-1.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-extrabold text-xs border border-rose-300">Quyi daraja (70 va undan past)</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-12">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-teal-950 rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-4 border border-emerald-800/40">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Ilmiy-pedagogik etika talabi
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Baholash va Darajalar Tizimi
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-3xl">
              Mutlaq jismoniy ko'rsatkichlar (qadamlar soni) hech qachon to'g'ridan-to'g'ri bahoga aylanmaydi! Baholanadigan narsa — monitoring muntazamligi, tahlil sifati va metodik ko'nikmalardir.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-right shrink-0">
            <div className="text-[10px] uppercase font-bold text-emerald-300">Integral Baho</div>
            <div className="text-2xl font-extrabold text-white">{currentAss.integral_ball} ball</div>
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
            <span>Birinchi Qatlam: Obyektiv ko'rsatkichlar (30% ulush)</span>
          </div>

          <p className="text-xs text-gray-500 leading-relaxed">
            Qadamlar, faol daqiqalar va uyqu vaqti bo'yicha monitoring yuritish intizomi va muntazamligi.
          </p>

          <div className="space-y-3 pt-2">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex justify-between items-center text-xs">
              <span className="text-gray-600 dark:text-gray-400">Monitoring muntazamligi (30 kun):</span>
              <span className="font-extrabold text-emerald-600">92%</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex justify-between items-center text-xs">
              <span className="text-gray-600 dark:text-gray-400">Pauza o'tkazish faolligi:</span>
              <span className="font-extrabold text-emerald-600">4,2 pauza / kun</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex justify-between items-center text-xs">
              <span className="text-gray-600 dark:text-gray-400">Obyektiv Qatlam Balli:</span>
              <span className="font-extrabold text-emerald-600">{currentAss.obyektiv_ball} / 100 ball</span>
            </div>
          </div>
        </div>

        {/* Layer 2: 4 Pedagogical Criteria (70% weight) */}
        <div className="md:col-span-8 bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-100 dark:border-slate-700 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-700 pb-3">
            <h3 className="font-extrabold text-base text-gray-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-500" /> Ikkinchi Qatlam: 4 Pedagogik Mezon (70% ulush)
            </h3>
            <span className="text-xs text-gray-400 font-medium">Har bir mezon 100 ballik shkalada</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Criteria 1 */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-xs text-emerald-700 dark:text-emerald-400">1. Motivatsion-qadriyatli</span>
                <span className="font-extrabold text-xs text-gray-900 dark:text-white">{currentAss.motivatsion_ball} ball</span>
              </div>
              <p className="text-[11px] text-gray-500 leading-tight">
                Barqaror ehtiyoj, kasbiy mas'uliyatni anglash. (Vositasi: Anketa, suhbat)
              </p>
            </div>

            {/* Criteria 2 */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-xs text-teal-700 dark:text-teal-400">2. Kognitiv-metodik</span>
                <span className="font-extrabold text-xs text-gray-900 dark:text-white">{currentAss.kognitiv_ball} ball</span>
              </div>
              <p className="text-[11px] text-gray-500 leading-tight">
                Me'yorlar, o'tirg'ich xulq-atvor, pauzalar metodikasi bo'yicha bilim. (Vositasi: Test, keys)
              </p>
            </div>

            {/* Criteria 3 */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-xs text-blue-700 dark:text-blue-400">3. Faoliyatli-monitoring</span>
                <span className="font-extrabold text-xs text-gray-900 dark:text-white">{currentAss.faoliyatli_ball} ball</span>
              </div>
              <p className="text-[11px] text-gray-500 leading-tight">
                Monitoring muntazamligi, pauza o'tkaza olish, rejani bajarish. (Vositasi: Kundalik, kuzatuv)
              </p>
            </div>

            {/* Criteria 4 */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-xs text-purple-700 dark:text-purple-400">4. Refleksiv-korreksion</span>
                <span className="font-extrabold text-xs text-gray-900 dark:text-white">{currentAss.refleksiv_ball} ball</span>
              </div>
              <p className="text-[11px] text-gray-500 leading-tight">
                Profilni tahlil qilish, sabab aniqlash, maqsad qo'yish. (Vositasi: Esse, shaxsiy reja)
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* Levels Qualitative Descriptions */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-slate-700 shadow-xl space-y-6">
        <h3 className="font-extrabold text-lg text-gray-900 dark:text-white">
          Darajalar bo'yicha sifat tavsiflari
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* High */}
          <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2">
            <span className="font-extrabold text-emerald-800 dark:text-emerald-300 text-sm block">
              Yuqori daraja (86–100 ball)
            </span>
            <p className="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
              Talaba harakat faolligi me'yorlarini to'liq anglaydi, kundalik monitoringni uzluksiz yuritadi. O'quv darslarida va mustaqil ta'limda mikrofaollik pauzalarini mustaqil va didaktik o'rinli tashkil qila oladi. Refleksiv tahlil chuqur.
            </p>
          </div>

          {/* Medium */}
          <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-2">
            <span className="font-extrabold text-amber-800 dark:text-amber-300 text-sm block">
              O'rta daraja (71–85 ball)
            </span>
            <p className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
              Talaba me'yorlar va metodikani biladi, lekin monitoring yuritishda ba'zan uzilishlarga yo'l qo'yadi. Pauzalarni asosan o'qituvchi eslatgandagina bajaradi. Maqsad qo'yish ko'nikmasi shakllanmoqda.
            </p>
          </div>

          {/* Low */}
          <div className="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 space-y-2">
            <span className="font-extrabold text-rose-800 dark:text-rose-300 text-sm block">
              Quyi daraja (70 va undan past)
            </span>
            <p className="text-xs text-rose-900 dark:text-rose-200 leading-relaxed">
              O'tirg'ich xulq-atvor xavflarini yetarli anglamaydi. Monitoring tartibsiz, uzluksiz o'tirish vaqti tez-tez 60 daqiqadan oshadi. Tyutor bilan individual suhbat va korreksion yordam talab etiladi.
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
              <h2 className="text-xl font-bold">Triangulyatsiya Mexanizmi va Tyutor Signali</h2>
              <p className="text-xs text-slate-400">Talaba yozuvlari + Qurilma ma'lumoti + Kuzatuv/Ekspert bahosi taqqoslamasi</p>
            </div>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
            3 Tomonlama Solishtirish
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs leading-relaxed space-y-2">
          <p className="text-slate-300">
            Tizim avtomatik ravishda 3 manba ma'lumotlarini taqqoslaydi. Nomuvofiqlik aniqlansa (masalan: talaba qo'lda 15,000 qadam deb kiritsa, lekin fit-treker 3,500 qadam ko'rsatsa), tizim <strong>tyutorga belgi (flag) beradi</strong>.
          </p>
          <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-200 font-semibold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Muhim: Bu jazolash vositasi emas, balki tyutor bilan samimiy muhokama va rag'batlantiruvchi suhbat uchun signaldir.</span>
          </div>
        </div>
      </div>

    </div>
  );
};
