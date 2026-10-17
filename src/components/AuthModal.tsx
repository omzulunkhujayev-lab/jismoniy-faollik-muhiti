import React, { useState } from 'react';
import { UserRole, AuthenticatedUser } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { SUPERVISOR_CREDENTIALS } from '../data/mockData';
import { 
  X, 
  UserCheck, 
  Lock, 
  GraduationCap, 
  ShieldCheck, 
  LogOut, 
  AlertCircle, 
  Sparkles, 
  Eye, 
  EyeOff,
  CheckCircle2,
  Users,
  ChevronRight
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: AuthenticatedUser | null;
  onLoginStudent: (fullName: string, group: string) => void;
  onLoginSupervisor: (login: string, pass: string) => { success: boolean; error?: string };
  onLogout: () => void;
  initialTab?: 'talaba' | 'nazoratchi';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLoginStudent,
  onLoginSupervisor,
  onLogout,
  initialTab = 'talaba'
}) => {
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<'talaba' | 'nazoratchi'>(initialTab);

  // Student form state
  const [studentName, setStudentName] = useState(currentUser?.role === 'talaba' ? currentUser.fio : 'Jasur Alimov');
  const [studentGroup, setStudentGroup] = useState(currentUser?.guruh_id || '301-Pedagogika (Tajriba)');

  // Supervisor form state
  const [supLogin, setSupLogin] = useState('');
  const [supPassword, setSupPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [supError, setSupError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) return;
    onLoginStudent(studentName.trim(), studentGroup);
    onClose();
  };

  const handleSupervisorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSupError(null);
    const res = onLoginSupervisor(supLogin.trim(), supPassword.trim());
    if (res.success) {
      onClose();
    } else {
      setSupError(res.error || t('authInvalidCreds'));
    }
  };

  const handleQuickFillSupervisor = (cred: typeof SUPERVISOR_CREDENTIALS[0]) => {
    setSupLogin(cred.login);
    setSupPassword(cred.password);
    setSupError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-2 border-slate-200 dark:border-slate-800 space-y-6 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                {t('authModalTitle')}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                {lang === 'ru' 
                  ? 'Авторизация и разграничение прав доступа' 
                  : lang === 'en' 
                  ? 'Authorization and Role Access Management' 
                  : 'Foydalanuvchi roli va huquqlarini belgilash'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active User Profile Banner (if logged in) */}
        {currentUser?.isLoggedIn && (
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl text-white font-extrabold ${currentUser.role === 'talaba' ? 'bg-emerald-600' : 'bg-indigo-600'}`}>
                {currentUser.role === 'talaba' ? <GraduationCap className="w-5 h-5" /> : <UserCheck className="w-5 h-5" />}
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  {t('authLoggedInAs')}
                </span>
                <span className="text-sm font-black text-slate-900 dark:text-white">
                  {currentUser.fio}
                </span>
                <span className="text-xs text-slate-600 dark:text-slate-300 block font-semibold">
                  {currentUser.role === 'talaba' 
                    ? `🎓 ${t('roleStudent')} (${currentUser.guruh_id || '301-guruh'})`
                    : currentUser.role === 'oqituvchi'
                    ? `👨‍🏫 ${t('roleTeacher')}`
                    : currentUser.role === 'tyutor'
                    ? `🧑‍💼 ${t('roleTutor')}`
                    : `🏛️ ${t('roleAdmin')}`
                  }
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onLogout();
                setSupError(null);
              }}
              className="px-3.5 py-2 rounded-xl bg-rose-100 hover:bg-rose-200 dark:bg-rose-950/60 dark:hover:bg-rose-900 text-rose-700 dark:text-rose-300 font-extrabold text-xs transition flex items-center gap-1.5 shrink-0"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{t('authLogout')}</span>
            </button>
          </div>
        )}

        {/* Mode Selector Tabs (Talaba vs Nazoratchilar) */}
        <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 gap-1.5">
          <button
            type="button"
            onClick={() => {
              setActiveTab('talaba');
              setSupError(null);
            }}
            className={`py-2.5 px-3 rounded-xl font-black text-xs transition flex items-center justify-center gap-2 ${
              activeTab === 'talaba'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>{t('authStudentTab')}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('nazoratchi');
              setSupError(null);
            }}
            className={`py-2.5 px-3 rounded-xl font-black text-xs transition flex items-center justify-center gap-2 ${
              activeTab === 'nazoratchi'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>{t('authSupervisorTab')}</span>
          </button>
        </div>

        {/* 1. STUDENT ENTRY (Talaba ism-familiyasi orqali kirish) */}
        {activeTab === 'talaba' && (
          <form onSubmit={handleStudentSubmit} className="space-y-4 animate-in fade-in">
            <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs text-emerald-800 dark:text-emerald-200 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <p className="font-medium leading-relaxed">
                {t('authStudentDesc')}
              </p>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-800 dark:text-slate-200 mb-1.5">
                {t('authFullName')} <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder={t('authFullNamePlaceholder')}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/90 border-2 border-slate-200 dark:border-slate-700 focus:border-emerald-500 text-sm font-bold text-slate-900 dark:text-white outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-800 dark:text-slate-200 mb-1.5">
                {t('authGroupLabel')}
              </label>
              <select
                value={studentGroup}
                onChange={(e) => setStudentGroup(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/90 border-2 border-slate-200 dark:border-slate-700 focus:border-emerald-500 text-sm font-bold text-slate-900 dark:text-white outline-none transition cursor-pointer"
              >
                <option value="301-Pedagogika (Tajriba)">301-Pedagogika (Tajriba guruhi)</option>
                <option value="302-Pedagogika (Nazorat)">302-Pedagogika (Nazorat guruhi)</option>
                <option value="401-Boshlang'ich ta'lim">401-Boshlang'ich ta'lim</option>
                <option value="205-Sport va jismoniy tarbiya">205-Sport va jismoniy tarbiya</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm transition shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>{t('authEnterAsStudent')}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* 2. SUPERVISORS ENTRY (Login va Parol orqali kirish) */}
        {activeTab === 'nazoratchi' && (
          <form onSubmit={handleSupervisorSubmit} className="space-y-4 animate-in fade-in">
            <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 text-xs text-indigo-900 dark:text-indigo-200 flex items-start gap-2.5">
              <Lock className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
              <p className="font-medium leading-relaxed">
                {t('authSupervisorDesc')}
              </p>
            </div>

            {supError && (
              <div className="p-3.5 rounded-2xl bg-rose-500 text-white font-extrabold text-xs flex items-center gap-2.5 shadow-md animate-in shake">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{supError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-black text-slate-800 dark:text-slate-200 mb-1.5">
                {t('authLoginLabel')} <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={supLogin}
                onChange={(e) => setSupLogin(e.target.value)}
                placeholder={t('authLoginPlaceholder')}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/90 border-2 border-slate-200 dark:border-slate-700 focus:border-indigo-500 text-sm font-bold text-slate-900 dark:text-white outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-800 dark:text-slate-200 mb-1.5">
                {t('authPasswordLabel')} <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={supPassword}
                  onChange={(e) => setSupPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 rounded-2xl bg-slate-50 dark:bg-slate-800/90 border-2 border-slate-200 dark:border-slate-700 focus:border-indigo-500 text-sm font-bold text-slate-900 dark:text-white outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm transition shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <Lock className="w-4 h-4" />
              <span>{t('authEnterAsSupervisor')}</span>
            </button>

            {/* Quick-Fill Helper for Testing & Convenience */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                {t('authQuickCredentials')}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {SUPERVISOR_CREDENTIALS.map((cred) => (
                  <button
                    key={cred.role}
                    type="button"
                    onClick={() => handleQuickFillSupervisor(cred)}
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 hover:bg-indigo-50 dark:bg-slate-800/80 dark:hover:bg-indigo-950/60 text-left transition group"
                  >
                    <div className="text-xs font-black text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                      {cred.title}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                      {cred.login} / {cred.password}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
