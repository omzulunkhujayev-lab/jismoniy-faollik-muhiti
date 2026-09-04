import React, { useState } from 'react';
import { Card, ScheduleItem, ObservationCard } from '../types';
import { 
  UserCheck, 
  PlusCircle, 
  CheckCircle2, 
  Calendar, 
  BookMarked, 
  Eye, 
  FileText,
  Clock,
  Sparkles
} from 'lucide-react';

interface TeacherDashboardProps {
  schedule: ScheduleItem[];
  cards: Card[];
  observationCards: ObservationCard[];
  onAddObservation: (card: Omit<ObservationCard, 'id'>) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  schedule,
  cards,
  observationCards,
  onAddObservation
}) => {
  const [selectedSubject, setSelectedSubject] = useState('Pedagogika nazariyasi');
  const [attachedCardId, setAttachedCardId] = useState('card_17');
  const [notice, setNotice] = useState<string | null>(null);

  // Observation form
  const [obsPauzaType, setObsPauzaType] = useState<'gigiyenik-tiklovchi' | 'kognitiv-faollashtiruvchi' | 'kasbiy-metodik'>('gigiyenik-tiklovchi');
  const [obsOtkazildi, setObsOtkazildi] = useState(true);
  const [obsIshtirok, setObsIshtirok] = useState<'yuqori' | 'orta' | 'pask'>('yuqori');
  const [obsIzoh, setObsIzoh] = useState("301-guruh talabalari mashg'ulotning 40-daqiqasida pozitsion pauzani bajardilar.");

  const handleAttachCard = () => {
    setNotice(`'Kartochka #${attachedCardId.replace('card_', '')}' ${selectedSubject} darsiga muvaffaqiyatli biriktirildi!`);
    setTimeout(() => setNotice(null), 3000);
  };

  const handleObservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddObservation({
      oqituvchi_id: 'usr_002',
      guruh_id: 'grp_301',
      mashgulot_nomi: selectedSubject,
      pauza_turi: obsPauzaType,
      otkazildi: obsOtkazildi,
      ishtirok_darajasi: obsIshtirok,
      izoh: obsIzoh,
      sana: new Date().toISOString().split('T')[0]
    });
    setNotice("Kuzatuv kartasi saqlandi!");
    setTimeout(() => setNotice(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-4 border border-teal-800/40">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-teal-800/40 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold mb-2">
              <UserCheck className="w-3.5 h-3.5" /> Fan O'qituvchisi Paneli
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Mashg'ulotlar Rejasi va Kuzatuv Kartalari
            </h1>
            <p className="text-teal-100 text-xs sm:text-sm mt-1 max-w-3xl">
              Auditoriya mashg'ulotlariga mikrofaollik pauzalarini biriktirish va darsdagi kuzatuvlarni rasmiylashtirish.
            </p>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md text-xs font-bold border border-white/20">
            Prof. Dilnoza Raximova
          </div>
        </div>
      </div>

      {notice && (
        <div className="p-4 rounded-2xl bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5" />
          <span>{notice}</span>
        </div>
      )}

      {/* Grid: 1. Schedule & Card attachment + 2. Observation card form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Schedule & Pause Attachment */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-slate-700 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-700 pb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-500" /> Dars jadvali va Pauzalar biriktiruvi
            </h2>
          </div>

          {/* Subject selection */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-800 dark:text-gray-200">Mashg'ulotni tanlang:</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-gray-800 dark:text-gray-200 outline-none"
            >
              <option value="Pedagogika nazariyasi">Pedagogika nazariyasi (1-juftlik, 08:30)</option>
              <option value="Psixologiya">Psixologiya (2-juftlik, 10:00)</option>
              <option value="Boshlang'ich ta'lim metodikasi">Boshlang'ich ta'lim metodikasi (3-juftlik, 11:30)</option>
            </select>

            <label className="text-xs font-bold text-gray-800 dark:text-gray-200 block pt-2">
              Mashg'ulotga biriktiriladigan faollik kartochkasi:
            </label>
            <div className="flex gap-2">
              <select
                value={attachedCardId}
                onChange={(e) => setAttachedCardId(e.target.value)}
                className="flex-1 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-gray-800 dark:text-gray-200 outline-none"
              >
                {cards.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nomi} ({c.davomiyligi})
                  </option>
                ))}
              </select>
              <button
                onClick={handleAttachCard}
                className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center gap-1 shadow-md"
              >
                <PlusCircle className="w-4 h-4" /> Biriktirish
              </button>
            </div>
          </div>

          {/* Methodological Guidance block */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <h4 className="font-bold text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> O'qituvchi uchun uslubiy tavsiya:
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
              Mikrofaollik pauzasini darsning 35–40-daqiqa oralig'ida (diqqat pasaygan pallada) o'tkazish tavsiya etiladi. Pauza davomiyligi 3–5 daqiqadan oshmasligi darkor.
            </p>
          </div>
        </div>

        {/* Right: Observation Card Filling */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-slate-700 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-700 pb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-teal-500" /> Darsdagi Kuzatuv Kartasini To'ldirish
            </h2>
          </div>

          <form onSubmit={handleObservationSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-800 dark:text-gray-200 block mb-1">Dars nomi:</label>
              <input
                type="text"
                disabled
                value={selectedSubject}
                className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-xs font-bold text-gray-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-gray-800 dark:text-gray-200 block mb-1">Pauza turi:</label>
                <select
                  value={obsPauzaType}
                  onChange={(e) => setObsPauzaType(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                >
                  <option value="gigiyenik-tiklovchi">Gigiyenik-tiklovchi</option>
                  <option value="kognitiv-faollashtiruvchi">Kognitiv-faollashtiruvchi</option>
                  <option value="kasbiy-metodik">Kasbiy-metodik</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-800 dark:text-gray-200 block mb-1">Ishtirok darajasi:</label>
                <select
                  value={obsIshtirok}
                  onChange={(e) => setObsIshtirok(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                >
                  <option value="yuqori">Yuqori (90%+)</option>
                  <option value="orta">O'rta (60-80%)</option>
                  <option value="pask">Past (&lt;50%)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-800 dark:text-gray-200 block mb-1">Pedagogik izoh:</label>
              <textarea
                rows={3}
                value={obsIzoh}
                onChange={(e) => setObsIzoh(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-lg shadow-emerald-600/20"
            >
              Kuzatuv kartasini saqlash
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
