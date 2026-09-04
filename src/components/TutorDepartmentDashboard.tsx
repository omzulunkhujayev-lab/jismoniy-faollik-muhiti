import React, { useState } from 'react';
import { mockDepartmentStats } from '../data/mockData';
import { 
  BarChart3, 
  ShieldCheck, 
  Download, 
  FileSpreadsheet, 
  FileCheck2, 
  Users, 
  TrendingUp, 
  Calculator, 
  CheckCircle2,
  Lock,
  MessageSquare
} from 'lucide-react';

interface TutorDepartmentDashboardProps {
  userRole: 'tyutor' | 'kafedra';
}

export const TutorDepartmentDashboard: React.FC<TutorDepartmentDashboardProps> = ({ userRole }) => {
  const [activeSubView, setActiveSubView] = useState<'tutor' | 'department'>(userRole === 'tyutor' ? 'tutor' : 'department');
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // Individual Talk Log state for Tutor
  const [talkLogs, setTalkLogs] = useState([
    { id: 1, studentId: 'Talaba #08 (Anonim)', date: '2026-09-01', topic: "O'tirish vaqtini kamaytirish bo'yicha tavsiya berildi." }
  ]);
  const [newTalkNote, setNewTalkNote] = useState('');

  const handleExportExcel = () => {
    setExportNotice("Kafedra statistik hisoboti (Excel formatda) yuklab olindi.");
    setTimeout(() => setExportNotice(null), 3500);
  };

  const handleExportPDF = () => {
    setExportNotice("Kafedra statistik hisoboti (PDF formatda) yuklab olindi.");
    setTimeout(() => setExportNotice(null), 3500);
  };

  const handleAddTalkLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTalkNote) return;
    setTalkLogs([
      ...talkLogs,
      { id: Date.now(), studentId: `Talaba #${Math.floor(Math.random() * 20) + 1} (Anonim)`, date: new Date().toISOString().split('T')[0], topic: newTalkNote }
    ]);
    setNewTalkNote('');
  };

  const stats = mockDepartmentStats;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-4 border border-indigo-800/40">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-indigo-800/40 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold mb-2">
              <BarChart3 className="w-3.5 h-3.5" /> 
              {activeSubView === 'tutor' ? "Tyutor Paneli — Anonim Guruh Hisoboti" : "Kafedra Paneli — Ilmiy-Statistik Tahlil"}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {activeSubView === 'tutor' ? "Guruh Bo'yicha Umumlashtirilgan Hisobot" : "Tajriba va Nazorat Guruhlari Statistikasi"}
            </h1>
            <p className="text-indigo-200 text-xs sm:text-sm mt-1 max-w-3xl">
              {activeSubView === 'tutor' 
                ? "Pedagogik maxfiylik: Tyutor faqat 3 ta umumiy ko'rsatkichni ko'radi. Talabalarning individual ko'rsatkichlari oshkor etilmaydi." 
                : "Styudent t-mezoni hamda Pirson χ²-mezoni bo'yicha matematik-statistik hisob-kitoblar."}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveSubView('tutor')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${activeSubView === 'tutor' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'}`}
            >
              Tyutor Ko'rinishi
            </button>
            <button
              onClick={() => setActiveSubView('department')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${activeSubView === 'department' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'}`}
            >
              Kafedra / Admin
            </button>
          </div>
        </div>
      </div>

      {exportNotice && (
        <div className="p-4 rounded-2xl bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5" />
          <span>{exportNotice}</span>
        </div>
      )}

      {/* VIEW 1: TUTOR REPORT (STRICTLY 3 ANONYMOUS METRICS) */}
      {activeSubView === 'tutor' && (
        <div className="space-y-8">
          
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-slate-700 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-gray-100 dark:border-slate-700 pb-4">
              <div>
                <span className="text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400">301-Pedagogika guruhi (28 talaba)</span>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-1">
                  Haftalik Guruh Hisoboti (3 ta shaxssizlashtirilgan ko'rsatkich)
                </h2>
              </div>
              <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 font-extrabold text-xs flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-emerald-500" /> Maxfiylik Himoyalangan
              </span>
            </div>

            {/* The 3 Mandatory Anonymous Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Metric 1 */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">1. Guruhning o'rtacha kunlik qadamlar soni:</span>
                <div className="text-3xl font-extrabold text-gray-900 dark:text-white">
                  8 750 <span className="text-xs text-gray-400 font-normal">qadam/kun</span>
                </div>
                <div className="text-[11px] text-emerald-600 font-bold">
                  ✓ Me'yoriy darajadan yuqori (8 000+)
                </div>
              </div>

              {/* Metric 2 */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">2. Haftalik faol daqiqalar me'yoriga erishganlar ulushi:</span>
                <div className="text-3xl font-extrabold text-teal-600 dark:text-teal-400">
                  82,1 %
                </div>
                <div className="text-[11px] text-teal-600 font-bold">
                  28 talabadan 23 nafari 150+ daqiqani bajardi
                </div>
              </div>

              {/* Metric 3 */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">3. Monitoringni muntazam yuritganlar ulushi:</span>
                <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                  92,8 %
                </div>
                <div className="text-[11px] text-emerald-600 font-bold">
                  Har kuni faoliyat yozuvini kiritish ko'rsatkichi
                </div>
              </div>

            </div>

            {/* Individual talk log section */}
            <div className="pt-4 border-t border-gray-100 dark:border-slate-700 space-y-4">
              <h3 className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-500" /> Individual Suhbat va Korreksiya Qaydlari
              </h3>

              <form onSubmit={handleAddTalkLog} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Korreksion suhbat mazmunini kiriting (shaxssiz holda)..."
                  value={newTalkNote}
                  onChange={(e) => setNewTalkNote(e.target.value)}
                  className="flex-1 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-md"
                >
                  Qayd etish
                </button>
              </form>

              <div className="space-y-2">
                {talkLogs.map((log) => (
                  <div key={log.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs flex justify-between items-center">
                    <div>
                      <span className="font-bold text-gray-800 dark:text-gray-200 mr-2">{log.studentId}:</span>
                      <span className="text-gray-600 dark:text-gray-400">{log.topic}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium">{log.date}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* VIEW 2: DEPARTMENT RESEARCH & MATHEMATICAL STATISTICAL ANALYSIS */}
      {activeSubView === 'department' && (
        <div className="space-y-8">
          
          {/* Export Controls Bar */}
          <div className="flex justify-end gap-3">
            <button
              onClick={handleExportExcel}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center gap-2 shadow-lg shadow-emerald-600/20"
            >
              <FileSpreadsheet className="w-4 h-4" /> Excel ga Eksport (.xlsx)
            </button>

            <button
              onClick={handleExportPDF}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition flex items-center gap-2 shadow-lg"
            >
              <Download className="w-4 h-4" /> PDF Hisobot (.pdf)
            </button>
          </div>

          {/* Group Comparison Table (Tajriba vs Nazorat) */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-slate-700 shadow-xl space-y-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-500" /> Tajriba va Nazorat Guruhlari Taqqoslama Ko'rsatkichlari
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-slate-700 uppercase text-gray-400 font-bold">
                    <th className="py-3 px-3">Guruh guruhi</th>
                    <th className="py-3 px-3">Pre-test (X̄ ± SD)</th>
                    <th className="py-3 px-3">Post-test (X̄ ± SD)</th>
                    <th className="py-3 px-3">O'rtacha Qadam</th>
                    <th className="py-3 px-3">O'tirish vaqti (daq)</th>
                    <th className="py-3 px-3">Yuqori / O'rta / Quyi (%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-slate-800 font-medium">
                  
                  {/* Experimental Group */}
                  <tr className="bg-emerald-50/50 dark:bg-emerald-950/20">
                    <td className="py-4 px-3 font-bold text-emerald-700 dark:text-emerald-400">
                      {stats.tajriba_guruh.nomi}
                    </td>
                    <td className="py-4 px-3">{stats.tajriba_guruh.pre_test_mean} ± {stats.tajriba_guruh.pre_test_sd}</td>
                    <td className="py-4 px-3 font-extrabold text-emerald-600 text-sm">
                      {stats.tajriba_guruh.post_test_mean} ± {stats.tajriba_guruh.post_test_sd}
                    </td>
                    <td className="py-4 px-3 font-bold">{stats.tajriba_guruh.qadam_mean.toLocaleString()}</td>
                    <td className="py-4 px-3 text-emerald-600 font-bold">{stats.tajriba_guruh.otirish_mean} daq (Xavfsiz)</td>
                    <td className="py-4 px-3 font-bold text-emerald-600">64% / 29% / 7%</td>
                  </tr>

                  {/* Control Group */}
                  <tr>
                    <td className="py-4 px-3 font-bold text-slate-600 dark:text-slate-400">
                      {stats.nazorat_guruh.nomi}
                    </td>
                    <td className="py-4 px-3">{stats.nazorat_guruh.pre_test_mean} ± {stats.nazorat_guruh.pre_test_sd}</td>
                    <td className="py-4 px-3 font-bold">{stats.nazorat_guruh.post_test_mean} ± {stats.nazorat_guruh.post_test_sd}</td>
                    <td className="py-4 px-3">{stats.nazorat_guruh.qadam_mean.toLocaleString()}</td>
                    <td className="py-4 px-3 text-rose-500 font-bold">{stats.nazorat_guruh.otirish_mean} daq (Yuqori)</td>
                    <td className="py-4 px-3 text-slate-500">15% / 46% / 39%</td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>

          {/* Mathematical Statistical Tests (Student's t-test & Pearson Chi-Square) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Student's t-test */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-slate-700 shadow-xl space-y-4">
              <div className="flex items-center gap-3 border-b border-gray-100 dark:border-slate-700 pb-3">
                <div className="p-2.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded-xl">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-gray-900 dark:text-white">
                    Styudent t-mezoni (Student's t-test)
                  </h3>
                  <p className="text-xs text-gray-400">O'rtacha qiymatlar farqining ishonchliligi</p>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900">
                  <span className="text-gray-500">t-statistika darajasi ($t$):</span>
                  <span className="font-extrabold text-emerald-600">{stats.t_test_results.t_statistic}</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900">
                  <span className="text-gray-500">Erkinlik darajasi ($df$):</span>
                  <span className="font-extrabold text-gray-800 dark:text-gray-200">{stats.t_test_results.df}</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900">
                  <span className="text-gray-500">Ishonchlilik ehtimoli ($p$-value):</span>
                  <span className="font-extrabold text-emerald-600">{stats.t_test_results.p_value}</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900">
                  <span className="text-gray-500">Katta effekt ko'rsatkichi (Cohen's $d$):</span>
                  <span className="font-extrabold text-emerald-600">{stats.t_test_results.effect_size_cohen_d} (Juda yuqori)</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-[11px] text-emerald-900 dark:text-emerald-200 font-semibold">
                ✓ Xulosa: Tajriba va nazorat guruhlari o'rtasidagi tafovut $p &lt; 0.001$ darajasida statistik jihatdan to'liq ishonchli ($H_1$ gipoteza tasdiqlandi).
              </div>
            </div>

            {/* Pearson Chi-Square test */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-slate-700 shadow-xl space-y-4">
              <div className="flex items-center gap-3 border-b border-gray-100 dark:border-slate-700 pb-3">
                <div className="p-2.5 bg-blue-100 dark:bg-blue-950 text-blue-600 rounded-xl">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-gray-900 dark:text-white">
                    Pirson $\chi^2$-mezoni (Chi-Square Test)
                  </h3>
                  <p className="text-xs text-gray-400">Sifat darajalari taqsimotining mutanosibligi</p>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900">
                  <span className="text-gray-500">$\chi^2$-statistika qiymati:</span>
                  <span className="font-extrabold text-blue-600">{stats.chi_square_results.chi_square_val}</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900">
                  <span className="text-gray-500">Erkinlik darajasi ($df$):</span>
                  <span className="font-extrabold text-gray-800 dark:text-gray-200">{stats.chi_square_results.df}</span>
                </div>
                <div className="flex justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900">
                  <span className="text-gray-500">Ahamiyatlilik darajasi ($p$-value):</span>
                  <span className="font-extrabold text-blue-600">{stats.chi_square_results.p_value}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-[11px] text-blue-900 dark:text-blue-200 font-semibold">
                ✓ Xulosa: Darajalar bo'yicha siljish (Yuqori va O'rta darajaning oshishi) tasodifiy emas va platforma metodikasining samaradorligini isbotlaydi.
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
