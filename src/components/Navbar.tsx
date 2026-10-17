import React, { useState } from 'react';
import { UserRole } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../i18n/translations';
import { 
  Activity, 
  Calendar, 
  TrendingUp, 
  Split, 
  BookMarked, 
  GraduationCap, 
  ClipboardCheck, 
  Award, 
  Trophy, 
  UserCheck, 
  BarChart3, 
  BookOpen, 
  Sun, 
  Moon, 
  Menu, 
  X,
  ShieldAlert,
  Home,
  Globe
} from 'lucide-react';

interface NavbarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenGlossary: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleChange,
  activeTab,
  onTabChange,
  darkMode,
  onToggleDarkMode,
  onOpenGlossary
}) => {
  const { lang, setLang, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Tab definitions based on role RBAC and active language
  const getTabs = () => {
    const commonTabs = [
      { id: 'landing', label: t('tabHome'), icon: Home },
    ];

    if (currentRole === 'talaba') {
      return [
        ...commonTabs,
        { id: 'diary', label: t('tabDiary'), icon: Calendar },
        { id: 'weekly', label: t('tabWeekly'), icon: TrendingUp },
        { id: 'gaps', label: t('tabGaps'), icon: Split },
        { id: 'cards', label: t('tabCards'), icon: BookMarked },
        { id: 'lms', label: t('tabLms'), icon: GraduationCap },
        { id: 'diagnostics', label: t('tabDiagnostics'), icon: ClipboardCheck },
        { id: 'levels', label: t('tabLevels'), icon: Award },
        { id: 'gamification', label: t('tabGamification'), icon: Trophy }
      ];
    } else if (currentRole === 'oqituvchi') {
      return [
        ...commonTabs,
        { id: 'teacher', label: t('tabTeacher'), icon: UserCheck },
        { id: 'cards', label: t('tabCards'), icon: BookMarked },
        { id: 'gaps', label: t('tabGaps'), icon: Split },
        { id: 'lms', label: t('tabLms'), icon: GraduationCap },
        { id: 'diagnostics', label: t('tabDiagnostics'), icon: ClipboardCheck }
      ];
    } else if (currentRole === 'tyutor') {
      return [
        ...commonTabs,
        { id: 'tutor', label: t('tabTutor'), icon: BarChart3 },
        { id: 'gaps', label: t('tabGaps'), icon: Split },
        { id: 'levels', label: t('tabLevels'), icon: Award },
        { id: 'diagnostics', label: t('tabDiagnostics'), icon: ClipboardCheck }
      ];
    } else {
      return [
        ...commonTabs,
        { id: 'department', label: t('tabDepartment'), icon: BarChart3 },
        { id: 'cards', label: t('tabCards'), icon: BookMarked },
        { id: 'lms', label: t('tabLms'), icon: GraduationCap },
        { id: 'diagnostics', label: t('tabDiagnostics'), icon: ClipboardCheck },
        { id: 'levels', label: t('tabLevels'), icon: Award }
      ];
    }
  };

  const tabs = getTabs();

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-gray-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onTabChange('landing')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <Activity className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-gray-900 dark:text-white tracking-tight flex items-center gap-1.5">
                {t('appName')}
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-emerald-600 dark:text-emerald-400 block -mt-1">
                {t('appSubtitle')}
              </span>
            </div>
          </div>

          {/* Actions & Role / Language Switcher */}
          <div className="hidden sm:flex items-center gap-2">
            
            {/* Language Selector */}
            <div className="relative flex items-center bg-slate-100 dark:bg-slate-800/90 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 mr-1.5 shrink-0" />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as Language)}
                className="bg-transparent text-xs font-bold text-slate-800 dark:text-slate-100 outline-none cursor-pointer pr-1"
                aria-label="Til tanlash"
              >
                <option value="uz" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">🇺🇿 O'zbekcha</option>
                <option value="ru" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">🇷🇺 Русский</option>
                <option value="en" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">🇬🇧 English</option>
              </select>
            </div>

            {/* Glossary Button */}
            <button
              onClick={onOpenGlossary}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-700 hover:text-emerald-600 transition border border-slate-200/70 dark:border-slate-700 shadow-sm"
              title={t('glossary')}
            >
              <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden md:inline">{t('glossary')}</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition border border-slate-200/70 dark:border-slate-700 shadow-sm"
              title="Theme"
              aria-label="Rejimni almashtirish"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Role Switcher */}
            <div className="relative flex items-center bg-slate-100 dark:bg-slate-800/90 p-1 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <ShieldAlert className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 ml-1.5 mr-1" />
              <select
                value={currentRole}
                onChange={(e) => onRoleChange(e.target.value as UserRole)}
                className="bg-transparent text-xs font-bold text-slate-800 dark:text-slate-100 outline-none cursor-pointer pr-1"
                aria-label="Foydalanuvchi roli"
              >
                <option value="talaba" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{t('roleLabel')}: {t('roleStudent')}</option>
                <option value="oqituvchi" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{t('roleLabel')}: {t('roleTeacher')}</option>
                <option value="tyutor" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{t('roleLabel')}: {t('roleTutor')}</option>
                <option value="kafedra" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{t('roleLabel')}: {t('roleAdmin')}</option>
              </select>
            </div>
          </div>

          {/* Mobile Hamburger Toggle & Quick Theme */}
          <div className="flex lg:hidden items-center gap-1.5">
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Mavzu"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 dark:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Menyu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Secondary Dedicated Navigation Row (Bir qator pastda alohida bo'lim) */}
      <div className="hidden lg:block border-t border-slate-200/90 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900/90 backdrop-blur-md shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <nav className="flex items-center gap-2 overflow-x-auto py-0.5 scrollbar-none">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    isActive 
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 scale-[1.02]'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 border border-slate-200/90 dark:border-slate-700 hover:border-emerald-400 hover:bg-emerald-50/50 dark:hover:bg-slate-700'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-4 shadow-xl">
          
          <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Til / Language:</span>
            <div className="flex gap-1.5">
              {(['uz', 'ru', 'en'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1 rounded-lg text-xs font-extrabold uppercase transition-all ${
                    lang === l ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {l === 'uz' ? '🇺🇿 UZ' : l === 'ru' ? '🇷🇺 RU' : '🇬🇧 EN'}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Rol:</span>
            <select
              value={currentRole}
              onChange={(e) => {
                onRoleChange(e.target.value as UserRole);
                setMobileMenuOpen(false);
              }}
              className="bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-900 dark:text-white px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700"
            >
              <option value="talaba">{t('roleStudent')}</option>
              <option value="oqituvchi">{t('roleTeacher')}</option>
              <option value="tyutor">{t('roleTutor')}</option>
              <option value="kafedra">{t('roleAdmin')}</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                onOpenGlossary();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
            >
              <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> {t('glossary')}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    onTabChange(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2.5 p-3 rounded-xl text-xs font-semibold transition-all ${
                    isActive 
                      ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/30'
                      : 'text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'}`} />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Mobile Sticky Bottom Navigation for Rapid Field Access */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 py-1.5 px-2 flex justify-around items-center shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
        {tabs.slice(0, 4).map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all ${
                isActive 
                  ? 'text-emerald-600 dark:text-emerald-400 font-bold scale-105' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              <span className="text-[10px] mt-0.5 max-w-[64px] truncate">{tab.label}</span>
            </button>
          );
        })}
        
        {/* All Modules / Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400"
        >
          <Menu className="w-5 h-5 stroke-[1.8]" />
          <span className="text-[10px] mt-0.5">Bo'limlar</span>
        </button>
      </div>

    </header>
  );
};
