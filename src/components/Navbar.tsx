import React, { useState } from 'react';
import { UserRole } from '../types';
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
  Home
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Tab definitions based on role RBAC
  const getTabs = () => {
    const commonTabs = [
      { id: 'landing', label: 'Bosh sahifa', icon: Home },
    ];

    if (currentRole === 'talaba') {
      return [
        ...commonTabs,
        { id: 'diary', label: 'Faollik kundaligi', icon: Calendar },
        { id: 'weekly', label: 'Haftalik profil', icon: TrendingUp },
        { id: 'gaps', label: 'Faollik uzilishlari', icon: Split },
        { id: 'cards', label: 'Kartochkalar banki', icon: BookMarked },
        { id: 'lms', label: 'O\'quv moduli (LMS)', icon: GraduationCap },
        { id: 'diagnostics', label: 'Diagnostika', icon: ClipboardCheck },
        { id: 'levels', label: 'Baholash va darajalar', icon: Award },
        { id: 'gamification', label: 'Gamifikatsiya', icon: Trophy }
      ];
    } else if (currentRole === 'oqituvchi') {
      return [
        ...commonTabs,
        { id: 'teacher', label: 'O\'qituvchi paneli', icon: UserCheck },
        { id: 'cards', label: 'Kartochkalar banki', icon: BookMarked },
        { id: 'gaps', label: 'Jadval va uzilishlar', icon: Split },
        { id: 'lms', label: 'LMS moduli', icon: GraduationCap },
        { id: 'diagnostics', label: 'Kuzatuv kartasi', icon: ClipboardCheck }
      ];
    } else if (currentRole === 'tyutor') {
      return [
        ...commonTabs,
        { id: 'tutor', label: 'Tyutor hisoboti', icon: BarChart3 },
        { id: 'gaps', label: 'Guruh uzilishlari', icon: Split },
        { id: 'levels', label: 'Talabalar darajasi', icon: Award },
        { id: 'diagnostics', label: 'Diagnostika', icon: ClipboardCheck }
      ];
    } else {
      // kafedra / admin
      return [
        ...commonTabs,
        { id: 'department', label: 'Kafedra statistikasi', icon: BarChart3 },
        { id: 'cards', label: 'Kartochkalar boshqaruvi', icon: BookMarked },
        { id: 'lms', label: 'LMS kontent', icon: GraduationCap },
        { id: 'diagnostics', label: 'Ekspert baholash', icon: ClipboardCheck },
        { id: 'levels', label: 'Integral baholash', icon: Award }
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
                Raqamli Faollik Muhiti
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-emerald-600 dark:text-emerald-400 block -mt-1">
                Pedagogik Platforma
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 overflow-x-auto max-w-2xl py-1">
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

          {/* Actions & Role Switcher */}
          <div className="hidden sm:flex items-center gap-2">
            
            {/* Glossary Button */}
            <button
              onClick={onOpenGlossary}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-700 hover:text-emerald-600 transition"
              title="Pedagogik Glossariy"
            >
              <BookOpen className="w-4 h-4 text-emerald-500" />
              <span>Glossariy</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 transition"
              title="Mavzuni o'zgartirish"
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
                <option value="talaba">Rol: Talaba</option>
                <option value="oqituvchi">Rol: O'qituvchi</option>
                <option value="tyutor">Rol: Tyutor</option>
                <option value="kafedra">Rol: Kafedra (Admin)</option>
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
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">Rolni tanlang (Demo):</span>
            <select
              value={currentRole}
              onChange={(e) => {
                onRoleChange(e.target.value as UserRole);
                setMobileMenuOpen(false);
              }}
              className="bg-gray-100 dark:bg-slate-800 text-xs font-bold text-gray-800 dark:text-gray-200 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-700"
            >
              <option value="talaba">Talaba</option>
              <option value="oqituvchi">Fan O'qituvchisi</option>
              <option value="tyutor">Tyutor</option>
              <option value="kafedra">Kafedra / Admin</option>
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
              <BookOpen className="w-4 h-4" /> Glossariy
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
