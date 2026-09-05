import React, { useState } from 'react';
import { mockDepartmentStats } from '../data/mockData';
import { useLanguage } from '../context/LanguageContext';
import { 
  BarChart3, 
  Download, 
  FileSpreadsheet, 
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
  const { t } = useLanguage();
  const [activeSubView, setActiveSubView] = useState<'tutor' | 'department'>(userRole === 'tyutor' ? 'tutor' : 'department');
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  // Individual Talk Log state for Tutor
  const [talkLogs, setTalkLogs] = useState([
    { id: 1, studentId: 'Talaba #08 (Anonim)', date: '2026-09-01', topic: "O'tirish vaqtini kamaytirish bo'yicha tavsiya berildi." }
  ]);
  const [newTalkNote, setNewTalkNote] = useState('');

  const handleExportExcel = () => {
    setExportNotice(t('btnExportExcel'));
    setTimeout(() => setExportNotice(null), 3500);
  };

  const handleExportPDF = () => {
    setExportNotice(t('btnExportPdf'));
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
              {activeSubView === 'tutor' ? t('tutorDashTitle') : t('deptDashTitle')}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {activeSubView === 'tutor' ? t('tutorDashTitle') : t('deptDashTitle')}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveSubView('tutor')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${activeSubView === 'tutor' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'}`}
            >
              {t('tabTutor')}
            </button>
            <button
              onClick={() => setActiveSubView('department')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${activeSubView === 'department' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'}`}
            >
              {t('tabDepartment')}
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

      {/* VIEW 1: TUTOR REPORT */}
      {activeSubView === 'tutor' && (
        <div className="space-y-8">
          
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-slate-700 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-gray-100 dark:border-slate-700 pb-4">
              <div>
                <span className="text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400">301-Pedagogika guruhi (28 talaba)</span>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-1">
                  Haftalik Guruh Hisoboti (3 ta ko'rsatkich)
                </h2>
              </div>
              <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 font-extrabold text-xs flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-emerald-500" /> Maxfiylik Himoyalangan
              </span>
            </div>

            {/* The 3 Anonymous Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">1. Guruh o'rtacha kunlik qadami:</span>
                <div className="text-3xl font-extrabold text-gray-900 dark:text-white">
                  8 750 <span className="text-xs text-gray-400 font-normal">qadam/kun</span>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">2. Faol daqiqalar me'yoriga erishganlar:</span>
                <div className="text-3xl font-extrabold text-teal-600 dark:text-teal-400">
                  82,1 %
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="text-xs text-gray-500 dark:text-gray-400">3. Monitoringni muntazam yuritganlar:</span>
                <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                  92,8 %
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* VIEW 2: DEPARTMENT RESEARCH */}
      {activeSubView === 'department' && (
        <div className="space-y-8">
          
          {/* Export Controls Bar */}
          <div className="flex justify-end gap-3">
            <button
              onClick={handleExportExcel}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center gap-2 shadow-lg shadow-emerald-600/20"
            >
              <FileSpreadsheet className="w-4 h-4" /> {t('btnExportExcel')}
            </button>

            <button
              onClick={handleExportPDF}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition flex items-center gap-2 shadow-lg"
            >
              <Download className="w-4 h-4" /> {t('btnExportPdf')}
            </button>
          </div>

          {/* Group Comparison Table */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-slate-700 shadow-xl space-y-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-500" /> Tajriba va Nazorat Guruhlari Taqqoslama Ko'rsatkichlari
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-slate-700 uppercase text-gray-400 font-bold">
                    <th className="py-3 px-3">Guruh</th>
                    <th className="py-3 px-3">Pre-test (X̄ ± SD)</th>
                    <th className="py-3 px-3">Post-test (X̄ ± SD)</th>
                    <th className="py-3 px-3">O'rtacha Qadam</th>
                    <th className="py-3 px-3">O'tirish (daq)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-slate-800 font-medium">
                  <tr className="bg-emerald-50/50 dark:bg-emerald-950/20">
                    <td className="py-4 px-3 font-bold text-emerald-700 dark:text-emerald-400">
                      {stats.tajriba_guruh.nomi}
                    </td>
                    <td className="py-4 px-3">{stats.tajriba_guruh.pre_test_mean} ± {stats.tajriba_guruh.pre_test_sd}</td>
                    <td className="py-4 px-3 font-extrabold text-emerald-600 text-sm">
                      {stats.tajriba_guruh.post_test_mean} ± {stats.tajriba_guruh.post_test_sd}
                    </td>
                    <td className="py-4 px-3 font-bold">{stats.tajriba_guruh.qadam_mean.toLocaleString()}</td>
                    <td className="py-4 px-3 text-emerald-600 font-bold">{stats.tajriba_guruh.otirish_mean} daq</td>
                  </tr>

                  <tr>
                    <td className="py-4 px-3 font-bold text-slate-600 dark:text-slate-400">
                      {stats.nazorat_guruh.nomi}
                    </td>
                    <td className="py-4 px-3">{stats.nazorat_guruh.pre_test_mean} ± {stats.nazorat_guruh.pre_test_sd}</td>
                    <td className="py-4 px-3 font-bold">{stats.nazorat_guruh.post_test_mean} ± {stats.nazorat_guruh.post_test_sd}</td>
                    <td className="py-4 px-3">{stats.nazorat_guruh.qadam_mean.toLocaleString()}</td>
                    <td className="py-4 px-3 text-rose-500 font-bold">{stats.nazorat_guruh.otirish_mean} daq</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
