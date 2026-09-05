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

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 overflow-x-auto max-w-xl py-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                    isActive 
                      ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-semibold shadow-sm'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'}`} />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Actions & Role / Language Switcher */}
          <div className="hidden sm:flex items-center gap-2">
            
            {/* Language Selector */}
            <div className="relative flex items-center bg-gray-100 dark:bg-slate-800 px-2 py-1 rounded-xl border border-gray-200 dark:border-slate-700">
              <Globe className="w-3.5 h-3.5 text-emerald-500 mr-1" />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as Language)}
                className="bg-transparent text-xs font-bold text-gray-800 dark:text-gray-200 outline-none cursor-pointer"
              >
                <option value="uz">🇺🇿 O'zb</option>
                <option value="ru">🇷🇺 Рус</option>
                <option value="en">🇬🇧 Eng</option>
              </select>
            </div>

            {/* Glossary Button */}
            <button
              onClick={onOpenGlossary}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-700 hover:text-emerald-600 transition"
              title={t('glossary')}
            >
              <BookOpen className="w-4 h-4 text-emerald-500" />
              <span>{t('glossary')}</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 transition"
              title="Theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Role Switcher */}
            <div className="relative flex items-center bg-gray-100 dark:bg-slate-800 p-1 rounded-xl border border-gray-200 dark:border-slate-700">
              <ShieldAlert className="w-3.5 h-3.5 text-emerald-500 ml-1.5 mr-1" />
              <select
                value={currentRole}
                onChange={(e) => onRoleChange(e.target.value as UserRole)}
                className="bg-transparent text-xs font-bold text-gray-800 dark:text-gray-200 outline-none cursor-pointer pr-1"
              >
                <option value="talaba">{t('roleLabel')}: {t('roleStudent')}</option>
                <option value="oqituvchi">{t('roleLabel')}: {t('roleTeacher')}</option>
                <option value="tyutor">{t('roleLabel')}: {t('roleTutor')}</option>
                <option value="kafedra">{t('roleLabel')}: {t('roleAdmin')}</option>
              </select>
            </div>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onToggleDarkMode}
              className="p-1.5 rounded-lg text-gray-500 dark:text-gray-400"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-4 space-y-3">
          
          <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-slate-800">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Til / Language:</span>
            <div className="flex gap-1">
              {(['uz', 'ru', 'en'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase ${
                    lang === l ? 'bg-emerald-600 text-white' : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-slate-800">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Rolni tanlang:</span>
            <select
              value={currentRole}
              onChange={(e) => {
                onRoleChange(e.target.value as UserRole);
                setMobileMenuOpen(false);
              }}
              className="bg-gray-100 dark:bg-slate-800 text-xs font-bold text-gray-800 dark:text-gray-200 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-700"
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
              className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300"
            >
              <BookOpen className="w-4 h-4" /> {t('glossary')}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-1.5 pt-1">
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
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-medium ${
                    isActive 
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold'
                      : 'text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
