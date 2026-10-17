import React, { useState, useEffect } from 'react';
import { UserRole, DailyEntry, WeeklyGoal, Card, CourseTopic, ObservationCard, AuthenticatedUser } from './types';
import { useLanguage } from './context/LanguageContext';
import { 
  mockCards, 
  initialDailyEntries, 
  initialWeeklyGoals, 
  mockCourseTopics, 
  mockSchedule, 
  mockActivityGaps, 
  mockBadges, 
  mockChallenge, 
  mockAssessments, 
  mockObservationCards,
  SUPERVISOR_CREDENTIALS
} from './data/mockData';

import { Navbar } from './components/Navbar';
import { GlossaryModal } from './components/GlossaryModal';
import { AuthModal } from './components/AuthModal';
import { LandingPage } from './components/LandingPage';
import { DailyDiary } from './components/DailyDiary';
import { WeeklyProfile } from './components/WeeklyProfile';
import { ActivityGapAnalysis } from './components/ActivityGapAnalysis';
import { CardsBank } from './components/CardsBank';
import { LMSModule } from './components/LMSModule';
import { DiagnosticsModule } from './components/DiagnosticsModule';
import { AssessmentLevels } from './components/AssessmentLevels';
import { GamificationModule } from './components/GamificationModule';
import { TeacherDashboard } from './components/TeacherDashboard';
import { TutorDepartmentDashboard } from './components/TutorDepartmentDashboard';
import { Wifi, WifiOff } from 'lucide-react';
import { initScreenTimeTracker } from './services/sensorService';

export const App: React.FC = () => {
  const { t, lang } = useLanguage();
  // Dark mode state with localStorage persistence
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('rfm_theme') === 'dark';
  });

  // Authenticated user state (Talaba vs Nazoratchilar)
  const [currentUser, setCurrentUser] = useState<AuthenticatedUser>(() => {
    const saved = localStorage.getItem('rfm_auth_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.fio) return parsed;
      } catch (e) {}
    }
    return {
      id: 'usr_001',
      role: 'talaba',
      fio: 'Jasur Alimov',
      guruh_id: '301-Pedagogika (Tajriba)',
      kurs: 3,
      muassasa: 'Toshkent Davlat Pedagogika Universiteti',
      isLoggedIn: true
    };
  });

  // User role state (RBAC) synced with authenticated user
  const [currentRole, setCurrentRole] = useState<UserRole>(() => currentUser.role || 'talaba');

  // Auth Modal state
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authInitialTab, setAuthInitialTab] = useState<'talaba' | 'nazoratchi'>('talaba');

  // Active tab state
  const [activeTab, setActiveTab] = useState<string>('landing');

  // Glossary modal state
  const [glossaryOpen, setGlossaryOpen] = useState<boolean>(false);

  // Dynamic Data States with localStorage fallback
  const [entries, setEntries] = useState<DailyEntry[]>(() => {
    const saved = localStorage.getItem('rfm_entries');
    return saved ? JSON.parse(saved) : initialDailyEntries;
  });

  const [goals, setGoals] = useState<WeeklyGoal[]>(() => {
    const saved = localStorage.getItem('rfm_goals');
    return saved ? JSON.parse(saved) : initialWeeklyGoals;
  });

  const [cards, setCards] = useState<Card[]>(() => {
    const saved = localStorage.getItem('rfm_cards');
    return saved ? JSON.parse(saved) : mockCards;
  });

  const [topics, setTopics] = useState<CourseTopic[]>(() => {
    const saved = localStorage.getItem('rfm_topics');
    return saved ? JSON.parse(saved) : mockCourseTopics;
  });

  const [observationCards, setObservationCards] = useState<ObservationCard[]>(() => {
    const saved = localStorage.getItem('rfm_observations');
    return saved ? JSON.parse(saved) : mockObservationCards;
  });

  // Online / Offline PWA indicator
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Initialize screen time and night inactivity tracking
  useEffect(() => {
    initScreenTimeTracker();
  }, []);

  // Sync dark mode class with DOM
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('rfm_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('rfm_theme', 'light');
    }
  }, [darkMode]);

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('rfm_entries', JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    localStorage.setItem('rfm_cards', JSON.stringify(cards));
  }, [cards]);

  useEffect(() => {
    localStorage.setItem('rfm_topics', JSON.stringify(topics));
  }, [topics]);

  useEffect(() => {
    localStorage.setItem('rfm_observations', JSON.stringify(observationCards));
  }, [observationCards]);

  // Authentication Handlers
  const handleLoginStudent = (fullName: string, group: string) => {
    const user: AuthenticatedUser = {
      id: `usr_student_${Date.now()}`,
      role: 'talaba',
      fio: fullName,
      guruh_id: group,
      kurs: 3,
      muassasa: 'Toshkent Davlat Pedagogika Universiteti',
      isLoggedIn: true,
      loginTime: new Date().toISOString()
    };
    setCurrentUser(user);
    setCurrentRole('talaba');
    localStorage.setItem('rfm_auth_user', JSON.stringify(user));
    setActiveTab('diary');
  };

  const handleLoginSupervisor = (login: string, pass: string): { success: boolean; error?: string } => {
    const trimmedLogin = login.toLowerCase();
    const trimmedPass = pass.trim();

    const match = SUPERVISOR_CREDENTIALS.find(c => 
      (c.login.toLowerCase() === trimmedLogin || c.altLogin.toLowerCase() === trimmedLogin) &&
      (c.password === trimmedPass || c.altPassword === trimmedPass)
    );

    if (match) {
      const user: AuthenticatedUser = {
        id: match.user.id,
        role: match.role,
        fio: match.user.fio,
        muassasa: match.user.muassasa,
        yonalish: match.user.yonalish,
        kurs: match.user.kurs,
        guruh_id: match.user.guruh_id,
        isLoggedIn: true,
        loginTime: new Date().toISOString()
      };
      setCurrentUser(user);
      setCurrentRole(match.role);
      localStorage.setItem('rfm_auth_user', JSON.stringify(user));

      if (match.role === 'oqituvchi') setActiveTab('teacher');
      else if (match.role === 'tyutor') setActiveTab('tutor');
      else setActiveTab('department');
      return { success: true };
    }

    return { 
      success: false, 
      error: t('authInvalidCreds')
    };
  };

  const handleLogout = () => {
    localStorage.removeItem('rfm_auth_user');
    const guestUser: AuthenticatedUser = {
      id: 'guest',
      role: 'talaba',
      fio: 'Mehmon talaba',
      isLoggedIn: false
    };
    setCurrentUser(guestUser);
    setCurrentRole('talaba');
    setActiveTab('landing');
    setAuthInitialTab('talaba');
    setAuthModalOpen(true);
  };

  const handleOpenAuth = (initialTab: 'talaba' | 'nazoratchi' = 'talaba') => {
    setAuthInitialTab(initialTab);
    setAuthModalOpen(true);
  };

  // Handler for Demo start from Landing
  const handleStartDemo = (role: UserRole, targetTab: string) => {
    if (role === 'talaba') {
      if (!currentUser.isLoggedIn) {
        setAuthInitialTab('talaba');
        setAuthModalOpen(true);
      } else {
        setCurrentRole('talaba');
        setActiveTab('diary');
      }
    } else {
      // Supervisor requested: require credentials
      if (!currentUser.isLoggedIn || currentUser.role === 'talaba') {
        setAuthInitialTab('nazoratchi');
        setAuthModalOpen(true);
      } else {
        setCurrentRole(role);
        setActiveTab(targetTab);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler for adding card to catalog (for teachers/supervisors)
  const handleAddCard = (newCard: Omit<Card, 'id' | 'isFavorite'>) => {
    const cardWithId: Card = {
      ...newCard,
      id: `card_${Date.now()}`,
      isFavorite: false
    };
    setCards(prev => [cardWithId, ...prev]);
  };

  // Handler for adding daily diary entry
  const handleAddEntry = (entry: Omit<DailyEntry, 'id'>) => {
    const newEntry: DailyEntry = {
      ...entry,
      id: `de_${Date.now()}`
    };
    setEntries(prev => [newEntry, ...prev.filter(e => e.sana !== entry.sana)]);
  };

  // Handler for adding weekly goal
  const handleAddGoal = (goal: Omit<WeeklyGoal, 'id'>) => {
    const newGoal: WeeklyGoal = {
      ...goal,
      id: `wg_${Date.now()}`
    };
    setGoals(prev => [newGoal, ...prev]);
  };

  // Handler for card favorite toggle
  const handleToggleFavorite = (cardId: string) => {
    setCards(prev => prev.map(c => c.id === cardId ? { ...c, isFavorite: !c.isFavorite } : c));
  };

  // Handlers for course topics CRUD
  const handleSaveTopic = (savedTopic: CourseTopic) => {
    setTopics(prev => {
      const exists = prev.some(t => t.id === savedTopic.id);
      if (exists) {
        return prev.map(t => t.id === savedTopic.id ? savedTopic : t);
      } else {
        return [...prev, savedTopic];
      }
    });
  };

  const handleDeleteTopic = (topicId: string) => {
    setTopics(prev => prev.filter(t => t.id !== topicId));
  };

  // Handler for adding observation card
  const handleAddObservation = (obs: Omit<ObservationCard, 'id'>) => {
    const newObs: ObservationCard = {
      ...obs,
      id: `obs_${Date.now()}`
    };
    setObservationCards(prev => [newObs, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100 flex flex-col transition-colors duration-300">
      
      {/* Navigation Header */}
      <Navbar
        currentRole={currentRole}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        onRoleChange={(role) => {
          setCurrentRole(role);
          if (role === 'oqituvchi') setActiveTab('teacher');
          else if (role === 'tyutor') setActiveTab('tutor');
          else if (role === 'kafedra') setActiveTab('department');
          else setActiveTab('diary');
        }}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onOpenGlossary={() => setGlossaryOpen(true)}
      />

      {/* Main Content Render */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24 lg:pb-8">
        
        {activeTab === 'landing' && (
          <LandingPage
            onStartDemo={handleStartDemo}
            onOpenGlossary={() => setGlossaryOpen(true)}
          />
        )}

        {activeTab === 'diary' && (
          <DailyDiary
            entries={entries}
            onAddEntry={handleAddEntry}
            currentUser={currentUser}
          />
        )}

        {activeTab === 'weekly' && (
          <WeeklyProfile
            entries={entries}
            goals={goals}
            onAddGoal={handleAddGoal}
          />
        )}

        {activeTab === 'gaps' && (
          <ActivityGapAnalysis
            schedule={mockSchedule}
            gaps={mockActivityGaps}
          />
        )}

        {activeTab === 'cards' && (
          <CardsBank
            cards={cards}
            onToggleFavorite={handleToggleFavorite}
            onAddToLesson={() => {}}
            onAddCard={handleAddCard}
            userRole={currentRole}
          />
        )}

        {activeTab === 'lms' && (
          <LMSModule
            topics={topics}
            userRole={currentRole}
            onSaveTopic={handleSaveTopic}
            onDeleteTopic={handleDeleteTopic}
          />
        )}

        {activeTab === 'diagnostics' && (
          <DiagnosticsModule
            userRole={currentRole}
            observationCards={observationCards}
            onAddObservation={handleAddObservation}
          />
        )}

        {activeTab === 'levels' && (
          <AssessmentLevels
            assessments={mockAssessments}
          />
        )}

        {activeTab === 'gamification' && (
          <GamificationModule
            badges={mockBadges}
            challenge={mockChallenge}
          />
        )}

        {activeTab === 'teacher' && (
          <TeacherDashboard
            schedule={mockSchedule}
            cards={cards}
            observationCards={observationCards}
            onAddObservation={handleAddObservation}
            currentUser={currentUser}
          />
        )}

        {(activeTab === 'tutor' || activeTab === 'department') && (
          <TutorDepartmentDashboard
            userRole={currentRole === 'kafedra' ? 'kafedra' : 'tyutor'}
            currentUser={currentUser}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 mt-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          <div className="space-y-1">
            <div>
              © 2026 <strong>{t('appName')}</strong> — <span className="font-semibold text-emerald-600 dark:text-emerald-400">{t('appSubtitle')}</span>.
            </div>
            <div className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
              {t('authorNotice')}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setGlossaryOpen(true)} className="hover:underline">{t('glossary')}</button>
            <span>|</span>
            <span className="flex items-center gap-1 font-semibold">
              {isOnline ? (
                <span className="text-emerald-500 flex items-center gap-1">
                  <Wifi className="w-3.5 h-3.5" /> PWA Online
                </span>
              ) : (
                <span className="text-amber-500 flex items-center gap-1">
                  <WifiOff className="w-3.5 h-3.5" /> {lang === 'ru' ? 'PWA Офлайн (Автономный ввод)' : lang === 'en' ? 'PWA Offline (Autonomous input)' : 'PWA Offline (Avtonom kiritish)'}
                </span>
              )}
            </span>
          </div>
        </div>
      </footer>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        currentUser={currentUser}
        onLoginStudent={handleLoginStudent}
        onLoginSupervisor={handleLoginSupervisor}
        onLogout={handleLogout}
        initialTab={authInitialTab}
      />

      {/* Glossary Modal */}
      <GlossaryModal
        isOpen={glossaryOpen}
        onClose={() => setGlossaryOpen(false)}
      />

    </div>
  );
};
