import React, { useState } from 'react';
import { ObservationCard } from '../types';
import { 
  ClipboardCheck, 
  CheckCircle2, 
  HelpCircle, 
  FileCheck2, 
  Eye, 
  Award, 
  PenTool, 
  Send,
  AlertCircle
} from 'lucide-react';

interface DiagnosticsModuleProps {
  userRole: string;
  observationCards: ObservationCard[];
  onAddObservation: (card: Omit<ObservationCard, 'id'>) => void;
}

export const DiagnosticsModule: React.FC<DiagnosticsModuleProps> = ({
  userRole,
  observationCards,
  onAddObservation
}) => {
  const [assessmentPoint, setAssessmentPoint] = useState<'kirish' | 'oraliq' | 'yakuniy'>('oraliq');
  const [activeDiagTab, setActiveDiagTab] = useState<'anketa' | 'test' | 'kuzatuv' | 'ekspert' | 'esse'>('test');

  // 4-Part Questionnaire State
  const [anketaData, setAnketaData] = useState({
    part1_sharoit: 'yotoqxona',
    part2_otirish_vaqti: '6-8 soat',
    part3_vosita: 'smartfon_treker',
    part4_tayyorgarlik: 'yuqori'
  });
  const [anketaSubmitted, setAnketaSubmitted] = useState(false);

  // 25-Item Knowledge Test State
  // 25 items generated programmatically
  const generate25TestQuestions = () => {
    return Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      question: `${i + 1}-topshiriq. ${
        i === 0 ? "O'tirg'ich xulq-atvorda energiya sarfi necha MET dan oshmaydi?" :
        i === 1 ? "JSST tavsiyasiga ko'ra haftalik o'rtacha jadallikdagi faollik me'yori qancha?" :
        i === 2 ? "Mikrofaollik pauzasining ruxsat etilgan maksimal davomiyligi qancha?" :
        i === 3 ? "Yopiq halqa tizimining nechanchi bo'g'inida grafikli teskari aloqa beriladi?" :
        i === 4 ? "Talaba kunlik uzluksiz o'tirish vaqti necha daqiqadan oshsa 'uzilish' belgilanadi?" :
        `Pedagogik faollik va o'tirg'ich xulq-atvorni baholash bo'yicha ${i + 1}-savol.`
      }`,
      options: ['1.0 MET', '1.5 MET', '2.0 MET', '3.0 MET'],
      correct: 1
    }));
  };

  const testQuestions = generate25TestQuestions();
  const [testAnswers, setTestAnswers] = useState<Record<number, number>>({});
  const [testScoreResult, setTestScoreResult] = useState<number | null>(null);

  const handleTestSubmit = () => {
    let score = 0;
    testQuestions.forEach(q => {
      if (testAnswers[q.id] === q.correct) {
        score += 4; // 25 questions * 4 points = 100 points
      }
    });
    setTestScoreResult(score);
  };

  // Reflective essay state
  const [essayText, setEssayText] = useState("Mening jismoniy faollik profilim semester davomida sezilarli darajada ijobiy tomonga o'zgardi...");
  const [essaySubmitted, setEssaySubmitted] = useState(false);

  // Teacher Observation Card State
  const [obsMashgulot, setObsMashgulot] = useState('Pedagogika nazariyasi');
  const [obsPauzaType, setObsPauzaType] = useState<'gigiyenik-tiklovchi' | 'kognitiv-faollashtiruvchi' | 'kasbiy-metodik'>('kognitiv-faollashtiruvchi');
  const [obsOtkazildi, setObsOtkazildi] = useState(true);
  const [obsIshtirok, setObsIshtirok] = useState<'yuqori' | 'orta' | 'pask'>('yuqori');
  const [obsIzoh, setObsIzoh] = useState("Talabalar darsning 35-daqiqasida krest-kross pauzasida 100% faol qatnashdilar.");
  const [obsSaved, setObsSaved] = useState(false);

  const handleAddObsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddObservation({
      oqituvchi_id: 'usr_002',
      guruh_id: 'grp_301',
      mashgulot_nomi: obsMashgulot,
      pauza_turi: obsPauzaType,
      otkazildi: obsOtkazildi,
      ishtirok_darajasi: obsIshtirok,
      izoh: obsIzoh,
      sana: new Date().toISOString().split('T')[0]
    });
    setObsSaved(true);
    setTimeout(() => setObsSaved(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-slate-700 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 dark:border-slate-700 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-2">
              <ClipboardCheck className="w-3.5 h-3.5" /> 3 nuqtali kompleks diagnostika
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              Diagnostika Moduli
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Kirish (Semestr boshi) → Oraliq (Semestr o'rtasi) → Yakuniy (Semestr oxiri) diagnostika instrumentlari
            </p>
          </div>

          {/* Assessment Point Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl border border-gray-200 dark:border-slate-700">
            {[
              { key: 'kirish', label: '1. Kirish' },
              { key: 'oraliq', label: '2. Oraliq' },
              { key: 'yakuniy', label: '3. Yakuniy' },
            ].map((pt) => (
              <button
                key={pt.key}
                onClick={() => setAssessmentPoint(pt.key as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  assessmentPoint === pt.key
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200'
                }`}
              >
                {pt.label}
              </button>
            ))}
          </div>
        </div>

        {/* 5 Instrument Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {[
            { id: 'test', label: '25-Topshiriqli Bilim Testi', icon: FileCheck2 },
            { id: 'anketa', label: 'Anonim Anketa (4 qism)', icon: HelpCircle },
            { id: 'kuzatuv', label: 'O\'qituvchi Kuzatuv Kartasi', icon: Eye },
            { id: 'ekspert', label: 'Ekspert Baholash Varag\'i', icon: Award },
            { id: 'esse', label: 'Refleksiv Esse', icon: PenTool },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeDiagTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveDiagTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition shrink-0 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                    : 'bg-slate-50 dark:bg-slate-900/60 text-gray-700 dark:text-gray-300 border border-slate-200 dark:border-slate-700 hover:bg-emerald-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* INSTRUMENT 1: 25-Item Knowledge Test */}
      {activeDiagTab === 'test' && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-slate-700 shadow-xl space-y-6">
          <div className="flex justify-between items-center border-b border-gray-100 dark:border-slate-700 pb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Kognitiv-metodik bilim testi (25 topshiriq)
              </h2>
              <p className="text-xs text-gray-500">Har bir to'g'ri javob: 4 ball. Maksimal ball: 100 ball.</p>
            </div>
            {testScoreResult !== null && (
              <div className="px-4 py-2 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-extrabold text-sm border border-emerald-300">
                Natija: {testScoreResult} / 100 ball ({testScoreResult >= 86 ? 'Yuqori' : testScoreResult >= 71 ? 'O\'rta' : 'Quyi'} daraja)
              </div>
            )}
          </div>

          <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
            {testQuestions.map((q) => (
              <div key={q.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="font-bold text-xs text-gray-900 dark:text-white">{q.question}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      type="button"
                      onClick={() => setTestAnswers(prev => ({ ...prev, [q.id]: oIdx }))}
                      className={`p-2.5 rounded-xl border text-xs text-left font-medium transition ${
                        testAnswers[q.id] === oIdx
                          ? 'bg-emerald-600 text-white border-emerald-600 font-bold'
                          : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-slate-700">
            <button
              onClick={handleTestSubmit}
              className="px-8 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs transition shadow-xl shadow-emerald-600/30"
            >
              Testni yakunlash va baholash
            </button>
          </div>
        </div>
      )}

      {/* INSTRUMENT 2: 4-Part Questionnaire */}
      {activeDiagTab === 'anketa' && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-slate-700 shadow-xl space-y-6">
          <div className="border-b border-gray-100 dark:border-slate-700 pb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Anketa «Talabaning jismoniy faolligi va harakat rejimi» (4 qism, Anonim)
            </h2>
            <p className="text-xs text-gray-500">Shaxssizlashtirilgan tadqiqot ma'lumotlari yig'ish</p>
          </div>

          {anketaSubmitted ? (
            <div className="p-4 rounded-2xl bg-emerald-500 text-white font-bold text-xs flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>Anketa javoblari shaxssizlashtirilgan holda bazaga saqlandi. Rahmat!</span>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Part 1 */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 space-y-2">
                <h4 className="font-bold text-xs text-emerald-600 dark:text-emerald-400">1-QISM: Umumiy va maishiy sharoitlar</h4>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block">Yashash sharoitingiz:</label>
                <select 
                  value={anketaData.part1_sharoit}
                  onChange={(e) => setAnketaData({...anketaData, part1_sharoit: e.target.value})}
                  className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-xs font-semibold"
                >
                  <option value="yotoqxona">Talabalar turar joyi (Yotoqxona)</option>
                  <option value="ijara">Ijara xonadoni</option>
                  <option value="oila_bilan">Ota-ona qaramog'ida / Oila bilan</option>
                </select>
              </div>

              {/* Part 2 */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 space-y-2">
                <h4 className="font-bold text-xs text-teal-600 dark:text-teal-400">2-QISM: Harakat rejimi va o'tirg'ich xulq-atvor</h4>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block">Kunlik o'rtacha stulda o'tirish davomiyligi:</label>
                <select 
                  value={anketaData.part2_otirish_vaqti}
                  onChange={(e) => setAnketaData({...anketaData, part2_otirish_vaqti: e.target.value})}
                  className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-xs font-semibold"
                >
                  <option value="4-6 soat">4 soatdan kam</option>
                  <option value="6-8 soat">6-8 soat oralig'ida</option>
                  <option value="8+ soat">8 soatdan ortiq (Yuqori sedentary xavf)</option>
                </select>
              </div>

              {/* Part 3 */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 space-y-2">
                <h4 className="font-bold text-xs text-blue-600 dark:text-blue-400">3-QISM: Raqamli vositalar va monitoringga munosabat</h4>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block">Faollik monitoringida qaysi qurilmadan foydalanasiz?</label>
                <select 
                  value={anketaData.part3_vosita}
                  onChange={(e) => setAnketaData({...anketaData, part3_vosita: e.target.value})}
                  className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-xs font-semibold"
                >
                  <option value="smartfon_treker">Smartfon (akselerometr sensor)</option>
                  <option value="fitness_braslet">Fitness-braslet / Smart-soat</option>
                  <option value="qolda_kundalik">Bosma / Qo'lda kundalik yuritish</option>
                </select>
              </div>

              {/* Part 4 */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 space-y-2">
                <h4 className="font-bold text-xs text-amber-600 dark:text-amber-400">4-QISM: Kasbiy tayyorgarlik va mikrofaollik metodikasi</h4>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block">Kelajakda maktab darslarida mikrofaollik pauzalarini o'tkazishga tayyorligingiz:</label>
                <select 
                  value={anketaData.part4_tayyorgarlik}
                  onChange={(e) => setAnketaData({...anketaData, part4_tayyorgarlik: e.target.value})}
                  className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-xs font-semibold"
                >
                  <option value="yuqori">To'liq tayyorman, metodikani egalladim</option>
                  <option value="orta">Qisman tayyorman, amaliyot kerak</option>
                  <option value="pask">Qiyinchilik sezayapman</option>
                </select>
              </div>

              <button
                onClick={() => setAnketaSubmitted(true)}
                className="px-6 py-3 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-lg"
              >
                Anketani saqlash
              </button>
            </div>
          )}
        </div>
      )}

      {/* INSTRUMENT 3: Teacher Observation Card */}
      {activeDiagTab === 'kuzatuv' && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-slate-700 shadow-xl space-y-6">
          <div className="border-b border-gray-100 dark:border-slate-700 pb-4 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Fan O'qituvchisining Kuzatuv Kartasi
              </h2>
              <p className="text-xs text-gray-500">Mashg'ulot davomida mikrofaollik pauzasi o'tkazilishini va talabalar faolligini qayd etish</p>
            </div>
          </div>

          {obsSaved && (
            <div className="p-4 rounded-2xl bg-emerald-500 text-white font-bold text-xs flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>Kuzatuv kartasi tizimga saqlandi!</span>
            </div>
          )}

          <form onSubmit={handleAddObsSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-800 dark:text-gray-200 block mb-1">Mashg'ulot nomi:</label>
                <input
                  type="text"
                  value={obsMashgulot}
                  onChange={(e) => setObsMashgulot(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-800 dark:text-gray-200 block mb-1">Pauza turi:</label>
                <select
                  value={obsPauzaType}
                  onChange={(e) => setObsPauzaType(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                >
                  <option value="gigiyenik-tiklovchi">Gigiyenik-tiklovchi (2-3 daq.)</option>
                  <option value="kognitiv-faollashtiruvchi">Kognitiv-faollashtiruvchi (3-5 daq.)</option>
                  <option value="kasbiy-metodik">Kasbiy-metodik (3-5 daq.)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="otkazildi_chk"
                  checked={obsOtkazildi}
                  onChange={(e) => setObsOtkazildi(e.target.checked)}
                  className="w-4 h-4 accent-emerald-600 rounded"
                />
                <label htmlFor="otkazildi_chk" className="text-xs font-bold text-gray-800 dark:text-gray-200">
                  Pauza reja bo'yicha o'tkazildi
                </label>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-800 dark:text-gray-200 block mb-1">Talabalar ishtirok darajasi:</label>
                <select
                  value={obsIshtirok}
                  onChange={(e) => setObsIshtirok(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                >
                  <option value="yuqori">Yuqori (90-100% talaba faol)</option>
                  <option value="orta">O'rta (60-80% talaba faol)</option>
                  <option value="pask">Past (&lt;50% talaba faol)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-800 dark:text-gray-200 block mb-1">O'qituvchi izohi va didaktik ta'sir:</label>
              <textarea
                rows={2}
                value={obsIzoh}
                onChange={(e) => setObsIzoh(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-md"
            >
              Kuzatuv kartasini saqlash
            </button>
          </form>

          {/* Table of past observations */}
          <div className="pt-4 border-t border-gray-100 dark:border-slate-700 space-y-3">
            <h4 className="font-bold text-xs uppercase text-gray-400">Saqlangan kuzatuvlar tarixi</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-slate-700 text-gray-400 font-bold">
                    <th className="py-2 px-2">Sana</th>
                    <th className="py-2 px-2">Mashg'ulot</th>
                    <th className="py-2 px-2">Pauza turi</th>
                    <th className="py-2 px-2">Ishtirok</th>
                    <th className="py-2 px-2">Izoh</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                  {observationCards.map((obs) => (
                    <tr key={obs.id}>
                      <td className="py-2 px-2 font-bold">{obs.sana}</td>
                      <td className="py-2 px-2">{obs.mashgulot_nomi}</td>
                      <td className="py-2 px-2 font-semibold text-emerald-600">{obs.pauza_turi}</td>
                      <td className="py-2 px-2 capitalize font-bold text-amber-500">{obs.ishtirok_darajasi}</td>
                      <td className="py-2 px-2 text-gray-500 truncate max-w-xs">{obs.izoh}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* INSTRUMENT 4: Expert Evaluation Sheet */}
      {activeDiagTab === 'ekspert' && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-slate-700 shadow-xl space-y-6">
          <div className="border-b border-gray-100 dark:border-slate-700 pb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Ekspert Baholash Varag'i (Pedagogik amaliyot rahbari uchun)
            </h2>
            <p className="text-xs text-gray-500">Talabaning amaliy dars berish paytidagi mikrofaollik ko'nikmalarini 100 ballik shkalada baholash</p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-900 dark:text-white">1. Pauzani dars tuzilmasiga didaktik o'rinli kiritish</span>
                <span className="font-extrabold text-emerald-600">25 / 25 ball</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-900 dark:text-white">2. Algoritm bosqichlarini aniq va tushunarli tushuntirish</span>
                <span className="font-extrabold text-emerald-600">23 / 25 ball</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-900 dark:text-white">3. O'quvchilar xavfsizligi va tibbiy moslashuvni e'tiborga olish</span>
                <span className="font-extrabold text-emerald-600">24 / 25 ball</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-900 dark:text-white">4. O'quvchilar diqqatini qayta jalb etish va motivatsiya berish</span>
                <span className="font-extrabold text-emerald-600">22 / 25 ball</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 font-extrabold text-sm flex justify-between">
              <span>Ekspert Baholash Summasi:</span>
              <span>94 / 100 ball (Yuqori daraja)</span>
            </div>
          </div>
        </div>
      )}

      {/* INSTRUMENT 5: Reflective Essay */}
      {activeDiagTab === 'esse' && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-slate-700 shadow-xl space-y-6">
          <div className="border-b border-gray-100 dark:border-slate-700 pb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Refleksiv Esse (Semestr yakuniy tahlil varag'i)
            </h2>
            <p className="text-xs text-gray-500">Talabaning o'z harakat dinamikasini va pedagogik tayyorgarligini baholovchi refleksiya</p>
          </div>

          {essaySubmitted && (
            <div className="p-4 rounded-2xl bg-emerald-500 text-white font-bold text-xs flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>Refleksiv esse yuborildi va baholash komissiyasiga topshirildi!</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-800 dark:text-gray-200 block mb-1">
                "Mening jismoniy faollik madaniyatim va bo'lajak pedagogik faoliyatim" mavzusidagi esse:
              </label>
              <textarea
                rows={8}
                value={essayText}
                onChange={(e) => setEssayText(e.target.value)}
                className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
              />
            </div>

            <button
              onClick={() => setEssaySubmitted(true)}
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-lg shadow-emerald-600/30 flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Esseni tekshiruvga topshirish</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
