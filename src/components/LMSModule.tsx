import React, { useState } from 'react';
import { CourseTopic } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { 
  GraduationCap, 
  BookOpen, 
  Video, 
  FileText, 
  CheckSquare, 
  MessageSquare, 
  Award, 
  CheckCircle2, 
  PlayCircle,
  Plus,
  Edit,
  Trash2,
  Image as ImageIcon,
  Download,
  Upload
} from 'lucide-react';
import { ContentManagementModal } from './ContentManagementModal';

interface LMSModuleProps {
  topics: CourseTopic[];
  userRole: string;
  onSaveTopic: (topic: CourseTopic) => void;
  onDeleteTopic: (topicId: string) => void;
}

export const LMSModule: React.FC<LMSModuleProps> = ({
  topics,
  userRole,
  onSaveTopic,
  onDeleteTopic
}) => {
  const { lang, t } = useLanguage();
  const [selectedTopicId, setSelectedTopicId] = useState<string>(topics[0]?.id || 'topic_1');
  const [activeSubTab, setActiveSubTab] = useState<'maruza' | 'taqdimot' | 'galereya' | 'test' | 'topshiriq' | 'forum'>('maruza');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [topicToEdit, setTopicToEdit] = useState<CourseTopic | null>(null);

  // Helper function to translate topic titles based on active language
  const getTranslatedTopic = (topic: CourseTopic) => {
    if (lang === 'ru') {
      const ruTitles: Record<number, string> = {
        1: "Физическая активность: понятие, виды, нормы и влияние на здоровье",
        2: "Сидячий образ жизни и его проявления в образовательном процессе",
        3: "Суточный двигательный профиль студента: методы мониторинга",
        4: "Цифровые средства: возможности, ограничения и вопросы приватности",
        5: "Постановка целей, обратная связь и техники изменения поведения",
        6: "Технология микроактивности: типы пауз и методика проведения",
        7: "Методика организации двигательного режима учащихся в школе",
        8: "Активность, сон и экранное время: целостность суточного режима",
        9: "Проектирование индивидуального двигательного плана и рефлексия"
      };
      return {
        ...topic,
        nomi: ruTitles[topic.tartib] || topic.nomi
      };
    } else if (lang === 'en') {
      const enTitles: Record<number, string> = {
        1: "Physical activity: concept, types, norms and health impact",
        2: "Sedentary behavior and its manifestations in education",
        3: "Student daily movement profile: monitoring methods",
        4: "Digital tools: capabilities, limits and privacy issues",
        5: "Goal setting, feedback and behavior change techniques",
        6: "Microactivity technology: pause types and methodology",
        7: "Methodology of organizing pupil movement regime in school",
        8: "Activity, sleep and screen time: daily regime integrity",
        9: "Designing individual movement plan and reflection"
      };
      return {
        ...topic,
        nomi: enTitles[topic.tartib] || topic.nomi
      };
    }
    return topic;
  };

  // Interactive Quiz state
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const joriyScore = 36;
  const oraliqScore = 27;
  const yakuniyScore = 28;
  const totalRating = joriyScore + oraliqScore + yakuniyScore;

  const rawTopic = topics.find(t => t.id === selectedTopicId) || topics[0];
  const currentTopic = rawTopic ? getTranslatedTopic(rawTopic) : null;

  const canManageContent = userRole === 'oqituvchi' || userRole === 'kafedra';

  const handleQuizSubmit = () => {
    if (!currentTopic) return;
    let correctCount = 0;
    currentTopic.test_savollari.forEach((q, idx) => {
      if (userAnswers[idx] === q.togri_indeks) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setQuizSubmitted(true);
  };

  const handleOpenAddModal = () => {
    setTopicToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (topic: CourseTopic) => {
    setTopicToEdit(topic);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      
      {/* Top Course Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-6 border border-indigo-800/40">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-b border-indigo-800/60 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold">
              <GraduationCap className="w-4 h-4 text-blue-400" /> {lang === 'ru' ? 'Официальный модуль LMS' : lang === 'en' ? 'Official LMS Module' : 'Rasmiy LMS Moduli'}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {t('lmsTitle')}
            </h1>
            <p className="text-indigo-200 text-xs sm:text-sm max-w-3xl">
              {t('lmsHoursInfo')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            {canManageContent && (
              <button
                onClick={handleOpenAddModal}
                className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>{t('btnAddTopic')}</span>
              </button>
            )}

            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-1 text-right shrink-0">
              <div className="text-[10px] uppercase font-bold text-indigo-300 tracking-wider flex items-center gap-1 justify-end">
                <Award className="w-3.5 h-3.5 text-amber-400" /> {lang === 'ru' ? 'Рейтинг' : lang === 'en' ? 'Rating' : 'Reyting'}
              </div>
              <div className="text-2xl font-extrabold text-white">
                {totalRating} <span className="text-xs text-indigo-300 font-normal">/ 100</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Course Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Sidebar */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex justify-between items-center px-1">
            <h3 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider">
              {lang === 'ru' ? `Темы (${topics.length}):` : lang === 'en' ? `Topics (${topics.length}):` : `Mavzular (${topics.length}):`}
            </h3>
            {canManageContent && (
              <button
                onClick={handleOpenAddModal}
                className="text-xs text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> {lang === 'ru' ? 'Добавить' : lang === 'en' ? 'Add' : 'Qo\'shish'}
              </button>
            )}
          </div>

          <div className="space-y-2">
            {topics.map((rawT) => {
              const topic = getTranslatedTopic(rawT);
              const isSelected = topic.id === selectedTopicId;
              return (
                <div
                  key={topic.id}
                  onClick={() => {
                    setSelectedTopicId(topic.id);
                    setQuizSubmitted(false);
                    setUserAnswers({});
                  }}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-600/20'
                      : 'bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700/60'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-7 h-7 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}>
                      {topic.tartib}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold leading-snug">{topic.nomi}</h4>
                    </div>
                  </div>

                  {canManageContent && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenEditModal(rawT);
                      }}
                      className={`p-1.5 rounded-lg transition shrink-0 ${
                        isSelected ? 'hover:bg-white/20 text-white' : 'hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-400'
                      }`}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Content Area */}
        {currentTopic && (
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-slate-700 shadow-xl space-y-6">
              
              <div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                  Topic № {currentTopic.tartib}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white mt-1">
                  {currentTopic.nomi}
                </h2>
              </div>

              {/* Sub Navigation */}
              <div className="flex items-center gap-1 border-b border-gray-100 dark:border-slate-700 pb-3 overflow-x-auto">
                {[
                  { id: 'maruza', label: t('lmsTabLecture'), icon: Video },
                  { id: 'taqdimot', label: t('lmsTabPres'), icon: FileText },
                  { id: 'galereya', label: t('lmsTabGallery'), icon: ImageIcon },
                  { id: 'test', label: t('lmsTabTest'), icon: CheckSquare },
                  { id: 'topshiriq', label: t('lmsTabAssignment'), icon: BookOpen },
                  { id: 'forum', label: t('lmsTabForum'), icon: MessageSquare },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeSubTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveSubTab(tab.id as any)}
                      className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition shrink-0 ${
                        isActive
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* TAB 1: Video Lecture */}
              {activeSubTab === 'maruza' && (
                <div className="space-y-4">
                  {currentTopic.video_url && currentTopic.video_url.includes('embed') ? (
                    <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-slate-700">
                      <iframe
                        src={currentTopic.video_url}
                        title={currentTopic.nomi}
                        className="w-full h-full"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="aspect-video w-full rounded-2xl bg-slate-900 flex items-center justify-center relative overflow-hidden shadow-inner">
                      <div className="text-center space-y-3 p-6">
                        <PlayCircle className="w-16 h-16 text-emerald-400 mx-auto cursor-pointer" />
                        <div className="text-white font-bold text-sm">{currentTopic.nomi}</div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: Presentation */}
              {activeSubTab === 'taqdimot' && (
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
                  <h3 className="font-bold text-base text-gray-900 dark:text-white">{t('lmsTabPres')}</h3>
                  <p className="leading-relaxed text-gray-700 dark:text-gray-300">{currentTopic.taqdimot_matn}</p>
                </div>
              )}

            </div>
          </div>
        )}

      </div>

      <ContentManagementModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        topicToEdit={topicToEdit}
        onSaveTopic={onSaveTopic}
        onDeleteTopic={onDeleteTopic}
        userRole={userRole}
      />

    </div>
  );
};
