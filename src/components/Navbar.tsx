import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { UserRole, AuthenticatedUser } from '../types';
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
  ShieldCheck,
  Home, 
  Globe,
  LogIn,
  LogOut,
  Lock,
  User as UserIcon,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  currentRole: UserRole;
  currentUser: AuthenticatedUser | null;
  onOpenAuth: (initialTab?: 'talaba' | 'nazoratchi') => void;
  onRoleChange: (role: UserRole) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenGlossary: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  currentUser,
  onOpenAuth,
  onRoleChange,
  activeTab,
  onTabChange,
  darkMode,
  onToggleDarkMode,
  onOpenGlossary,
  onLogout
}) => {
  const { lang, setLang, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Prevent background scrolling when mobile menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (tabId: string) => {
    const isSupervisorTab = tabId === 'teacher' || tabId === 'tutor' || tabId === 'department' || tabId === 'admin_panel';
    if (isSupervisorTab && currentUser?.role === 'talaba') {
      onOpenAuth('nazoratchi');
      return;
    }
    onTabChange(tabId);
    setMobileMenuOpen(false);
  };

  // Tab definitions based on role RBAC and active language
  const getTabs = () => {
    const commonTabs = [
      { id: 'landing', label: t('tabHome'), icon: Home },
    ];

    if (currentRole === 'admin') {
      return [
        ...commonTabs,
        { id: 'admin_panel', label: lang === 'ru' ? 'Управление кураторами' : lang === 'en' ? 'Supervisors Admin' : "Nazoratchilar boshqaruvi", icon: ShieldCheck },
        { id: 'diary', label: t('tabDiary'), icon: Calendar },
        { id: 'teacher', label: t('tabTeacher'), icon: UserCheck },
        { id: 'tutor', label: t('tabTutor'), icon: BarChart3 },
        { id: 'department', label: t('tabDepartment'), icon: BarChart3 },
        { id: 'weekly', label: t('tabWeekly'), icon: TrendingUp },
        { id: 'gaps', label: t('tabGaps'), icon: Split },
        { id: 'cards', label: t('tabCards'), icon: BookMarked },
        { id: 'lms', label: t('tabLms'), icon: GraduationCap },
        { id: 'diagnostics', label: t('tabDiagnostics'), icon: ClipboardCheck },
        { id: 'levels', label: t('tabLevels'), icon: Award },
        { id: 'gamification', label: t('tabGamification'), icon: Trophy }
      ];
    } else if (currentRole === 'talaba') {
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
    <>
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-gray-200/80 dark:border-slate-800 transition-colors">
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

            {/* Authenticated User Profile Pill & Quick Actions */}
            {currentUser?.isLoggedIn ? (
              <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/90 p-1 pl-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <button
                  type="button"
                  onClick={() => onOpenAuth(currentUser.role === 'talaba' ? 'talaba' : 'nazoratchi')}
                  className="flex items-center gap-2 hover:opacity-85 transition cursor-pointer text-left"
                  title={t('authSwitchUser')}
                >
                  <div className={`p-1.5 rounded-xl text-white font-extrabold ${
                    currentUser.role === 'admin' ? 'bg-amber-500 shadow-md shadow-amber-500/30' :
                    currentUser.role === 'talaba' ? 'bg-emerald-600' : 'bg-indigo-600'
                  }`}>
                    {currentUser.role === 'admin' ? (
                      <ShieldCheck className="w-3.5 h-3.5" />
                    ) : currentUser.role === 'talaba' ? (
                      <GraduationCap className="w-3.5 h-3.5" />
                    ) : (
                      <Lock className="w-3.5 h-3.5" />
                    )}
                  </div>
                  <div className="leading-tight pr-1">
                    <div className="text-xs font-black text-slate-900 dark:text-white max-w-[130px] sm:max-w-[170px] truncate">
                      {currentUser.fio}
                    </div>
                    <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                      {currentUser.role === 'admin'
                        ? '👑 Super Admin'
                        : currentUser.role === 'talaba' 
                        ? `${t('roleStudent')} (${currentUser.guruh_id?.split(' ')[0] || '301'})`
                        : currentUser.role === 'oqituvchi'
                        ? t('roleTeacher')
                        : currentUser.role === 'tyutor'
                        ? t('roleTutor')
                        : t('roleAdmin')
                      }
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 mr-1" />
                </button>

                <button
                  type="button"
                  onClick={onLogout}
                  title={t('authLogout')}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                  aria-label={t('authLogout')}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => onOpenAuth('talaba')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-600/30 transition cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>{t('authModalTitle')}</span>
              </button>
            )}
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
                  onClick={() => handleNavClick(tab.id)}
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
    </header>

    {/* Mobile Full-Screen Navigation Drawer via Portal (Attached directly to document.body) */}
    {mobileMenuOpen && typeof document !== 'undefined' && createPortal(
      <div className="fixed inset-0 z-[99999] lg:hidden flex flex-col bg-white dark:bg-slate-950 w-full h-[100dvh] overflow-hidden">
        
        {/* 1. Header (Fixed at top of drawer) */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-sm text-slate-900 dark:text-white tracking-tight block">
                {t('appName')}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-600 dark:text-emerald-400 block -mt-0.5">
                {lang === 'ru' ? 'Меню всех разделов' : lang === 'en' ? 'All Sections' : "Barcha bo'limlar"}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition font-bold text-xs cursor-pointer active:scale-95"
            aria-label="Yopish"
          >
            <span>{lang === 'ru' ? 'Закрыть' : lang === 'en' ? 'Close' : 'Yopish'}</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 2. Scrollable Body (100% visible, smoothly scrollable on mobile) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 overscroll-contain">
          
          {/* Language & Theme Controls */}
          <div className="grid grid-cols-2 gap-2">
            {/* Language Selector */}
            <div className="bg-slate-100 dark:bg-slate-900 p-1 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-1">
              {(['uz', 'ru', 'en'] as Language[]).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  className={`flex-1 py-1.5 rounded-xl text-[11px] font-extrabold uppercase transition-all ${
                    lang === l 
                      ? 'bg-emerald-600 text-white shadow-xs' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {l === 'uz' ? '🇺🇿 UZ' : l === 'ru' ? '🇷🇺 RU' : '🇬🇧 EN'}
                </button>
              ))}
            </div>

            {/* Dark mode & Glossary */}
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={onToggleDarkMode}
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold"
              >
                {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
                <span>{darkMode ? "Yorug'" : "Qorong'u"}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onOpenGlossary();
                  setMobileMenuOpen(false);
                }}
                className="p-2 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 shrink-0"
                title={t('glossary')}
              >
                <BookOpen className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active User Status Card */}
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className={`p-2 rounded-xl text-white font-extrabold shrink-0 ${
                currentUser?.role === 'admin' ? 'bg-amber-500 shadow-xs' :
                currentUser?.role === 'talaba' ? 'bg-emerald-600' : 'bg-indigo-600'
              }`}>
                {currentUser?.role === 'admin' ? (
                  <ShieldCheck className="w-4 h-4" />
                ) : currentUser?.role === 'talaba' ? (
                  <GraduationCap className="w-4 h-4" />
                ) : (
                  <Lock className="w-4 h-4" />
                )}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-black text-slate-900 dark:text-white truncate">
                  {currentUser?.isLoggedIn ? currentUser.fio : t('authModalTitle')}
                </div>
                <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                  {currentUser?.isLoggedIn ? (
                    currentUser.role === 'admin'
                      ? '👑 Super Admin (Loyiha Muallifi)'
                      : currentUser.role === 'talaba' 
                      ? `${t('roleStudent')} (${currentUser.guruh_id?.split(' ')[0] || '301'})`
                      : currentUser.role === 'oqituvchi'
                      ? t('roleTeacher')
                      : currentUser.role === 'tyutor'
                      ? t('roleTutor')
                      : t('roleAdmin')
                  ) : (
                    'Tizimga kirilmagan'
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => {
                  onOpenAuth(currentUser?.role === 'talaba' ? 'talaba' : 'nazoratchi');
                  setMobileMenuOpen(false);
                }}
                className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] font-black text-slate-800 dark:text-slate-200 hover:bg-slate-50"
              >
                {currentUser?.isLoggedIn ? t('authSwitchUser') : t('authEnterAsStudent')}
              </button>
              {currentUser?.isLoggedIn && (
                <button
                  type="button"
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="p-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/40"
                  title={t('authLogout')}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Platform Modules Heading */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
              {lang === 'ru' ? 'Все разделы платформы' : lang === 'en' ? 'All Platform Sections' : "Platforma bo'limlari"} ({tabs.length})
            </span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
              {lang === 'ru' ? 'Нажмите для перехода' : lang === 'en' ? 'Tap to switch' : "O'tish uchun bosing"}
            </span>
          </div>

          {/* Navigation Grid (2 columns on mobile, large touch targets) */}
          <div className="grid grid-cols-2 gap-2.5 pb-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleNavClick(tab.id)}
                  className={`flex flex-col items-start justify-between p-3 rounded-2xl text-xs font-bold transition-all text-left min-h-[76px] cursor-pointer active:scale-97 ${
                    isActive 
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-2 ring-emerald-500' 
                      : 'text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-900/90 hover:bg-emerald-50 dark:hover:bg-slate-800 border border-slate-200/90 dark:border-slate-800'
                  }`}
                >
                  <div className="w-full flex items-center justify-between">
                    <div className={`p-2 rounded-xl shrink-0 ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : tab.id === 'admin_panel'
                        ? 'bg-amber-100 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400'
                        : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    {isActive && (
                      <span className="px-1.5 py-0.5 rounded-full bg-white/25 text-[9px] font-black shrink-0">
                        ✓ {lang === 'ru' ? 'Активен' : lang === 'en' ? 'Active' : 'Faol'}
                      </span>
                    )}
                  </div>
                  <span className="mt-2 text-xs font-extrabold leading-tight line-clamp-2">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* PhD Research Project Banner inside menu */}
          <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-1">
            <div className="text-[11px] font-extrabold text-slate-800 dark:text-slate-200">
              {t('appName')} — PhD Dissertatsiyasi
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
              {t('authorNotice')}
            </div>
          </div>

        </div>

        {/* 3. Bottom Close Action Button */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition active:scale-98 shadow-md shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer"
          >
            <X className="w-4 h-4" />
            <span>{lang === 'ru' ? 'Закрыть меню' : lang === 'en' ? 'Close menu' : 'Menyuni yopish'}</span>
          </button>
        </div>

      </div>,
      document.body
    )}

    {/* Mobile Sticky Bottom Navigation for Rapid Field Access (outside <header>) */}
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 py-1 px-1 flex justify-around items-center shadow-[0_-4px_16px_rgba(0,0,0,0.08)] w-full max-w-full">
      {tabs.slice(0, 4).map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => handleNavClick(tab.id)}
            className={`flex-1 min-w-0 max-w-[72px] flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all cursor-pointer ${
              isActive 
                ? 'text-emerald-600 dark:text-emerald-400 font-bold scale-105' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className="text-[10px] mt-0.5 w-full text-center truncate">{tab.label}</span>
          </button>
        );
      })}
      
      {/* All Modules / Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className={`flex-1 min-w-0 max-w-[72px] flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all cursor-pointer ${
          mobileMenuOpen
            ? 'text-emerald-600 dark:text-emerald-400 font-bold scale-105'
            : 'text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400'
        }`}
      >
        {mobileMenuOpen ? <X className="w-5 h-5 stroke-[2.5]" /> : <Menu className="w-5 h-5 stroke-[1.8]" />}
        <span className="text-[10px] mt-0.5 w-full text-center truncate">{lang === 'ru' ? 'Разделы' : lang === 'en' ? 'Menu' : "Bo'limlar"}</span>
      </button>
    </div>
  </>
);
};
