import React, { useState, useEffect } from 'react';
import { UserRole, DailyEntry, WeeklyGoal, Card, CourseTopic, ObservationCard } from './types';
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
  mockObservationCards 
} from './data/mockData';

import { Navbar } from './components/Navbar';
import { GlossaryModal } from './components/GlossaryModal';
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

export const App: React.FC = () => {
  const { t, lang } = useLanguage();
  // Dark mode state with localStorage persistence
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('rfm_theme') === 'dark';
  });

  // User role state (RBAC)
  const [currentRole, setCurrentRole] = useState<UserRole>('talaba');

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

  // Handler for Demo start from Landing
  const handleStartDemo = (role: UserRole, targetTab: string) => {
    setCurrentRole(role);
    setActiveTab(targetTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
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
          />
        )}

        {(activeTab === 'tutor' || activeTab === 'department') && (
          <TutorDepartmentDashboard
            userRole={currentRole === 'kafedra' ? 'kafedra' : 'tyutor'}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 mt-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          <div>
            © 2026 <strong>{t('appName')}</strong>. {t('appSubtitle')}.
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

      {/* Glossary Modal */}
      <GlossaryModal
        isOpen={glossaryOpen}
        onClose={() => setGlossaryOpen(false)}
      />

    </div>
  );
};
