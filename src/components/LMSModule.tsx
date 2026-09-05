import React, { useState } from 'react';
import { CourseTopic } from '../types';
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
  Sparkles,
  Plus,
  Edit,
  Trash2,
  Image as ImageIcon,
  Download,
  Upload,
  UserCheck
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
  const [selectedTopicId, setSelectedTopicId] = useState<string>(topics[0]?.id || 'topic_1');
  const [activeSubTab, setActiveSubTab] = useState<'maruza' | 'taqdimot' | 'galereya' | 'test' | 'topshiriq' | 'forum'>('maruza');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [topicToEdit, setTopicToEdit] = useState<CourseTopic | null>(null);

  // Interactive Quiz state
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  // Student Course Progress Rating (40 + 30 + 30)
  const joriyScore = 36; // out of 40
  const oraliqScore = 27; // out of 30
  const yakuniyScore = 28; // out of 30
  const totalRating = joriyScore + oraliqScore + yakuniyScore;

  const currentTopic = topics.find(t => t.id === selectedTopicId) || topics[0];

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
      
      {/* Top Course Header & Credit Info */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-6 border border-indigo-800/40">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-b border-indigo-800/60 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold">
              <GraduationCap className="w-4 h-4 text-blue-400" /> Rasmiy LMS O'quv Moduli
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              «Raqamli faollik madaniyati» moduli
            </h1>
            <p className="text-indigo-200 text-xs sm:text-sm max-w-3xl">
              2 kredit (60 soat: 16 soat ma'ruza + 24 soat amaliy + 20 soat mustaqil ta'lim). O'qituvchilar va adminlar tomonidan boshqariladigan jonli o'quv kursi.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
            {canManageContent && (
              <button
                onClick={handleOpenAddModal}
                className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Yangi Ma'ruza va Media Yuklash</span>
              </button>
            )}

            {/* Rating Progress Widget */}
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-1 text-right shrink-0">
              <div className="text-[10px] uppercase font-bold text-indigo-300 tracking-wider flex items-center gap-1 justify-end">
                <Award className="w-3.5 h-3.5 text-amber-400" /> O'zlashtirish Reytingi
              </div>
              <div className="text-2xl font-extrabold text-white">
                {totalRating} <span className="text-xs text-indigo-300 font-normal">/ 100 ball</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hours distribution pills */}
        <div className="grid grid-cols-3 gap-3 text-center text-xs font-semibold">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <div className="text-slate-400 text-[10px]">Ma'ruza soatlari</div>
            <div className="text-white font-bold">16 soat</div>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <div className="text-slate-400 text-[10px]">Amaliy soatlar</div>
            <div className="text-white font-bold">24 soat</div>
          </div>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <div className="text-slate-400 text-[10px]">Mustaqil ta'lim</div>
            <div className="text-white font-bold">20 soat</div>
          </div>
        </div>
      </div>

      {/* Main Course Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Sidebar: Topics List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex justify-between items-center px-1">
            <h3 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider">
              Mavzular ro'yxati ({topics.length} ta):
            </h3>
            {canManageContent && (
              <button
                onClick={handleOpenAddModal}
                className="text-xs text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Qo'shish
              </button>
            )}
          </div>

          <div className="space-y-2">
            {topics.map((topic) => {
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
                      <div className={`text-[10px] ${isSelected ? 'text-emerald-100' : 'text-gray-400'}`}>
                        {topic.maruza_soat}m / {topic.amaliy_soat}a / {topic.mustaqil_soat}m.t
                      </div>
                    </div>
                  </div>

                  {canManageContent && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenEditModal(topic);
                      }}
                      className={`p-1.5 rounded-lg transition shrink-0 ${
                        isSelected ? 'hover:bg-white/20 text-white' : 'hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-400'
                      }`}
                      title="Mavzuni tahrirlash / fayl yuklash"
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
              
              {/* Topic Header & Admin/Teacher controls */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                      Mavzu № {currentTopic.tartib}
                    </span>
                    {currentTopic.muallif && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                        Yukladi: {currentTopic.muallif}
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white mt-1">
                    {currentTopic.nomi}
                  </h2>
                </div>

                {canManageContent && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEditModal(currentTopic)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-emerald-50 text-emerald-700 dark:text-emerald-300 font-bold text-xs transition flex items-center gap-1"
                    >
                      <Edit className="w-3.5 h-3.5" /> Tahrirlash / Media Yuklash
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`'${currentTopic.nomi}' mavzusini o'chirishga ishonchingiz komilmi?`)) {
                          onDeleteTopic(currentTopic.id);
                        }
                      }}
                      className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition"
                      title="O'chirish"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Sub Navigation */}
              <div className="flex items-center gap-1 border-b border-gray-100 dark:border-slate-700 pb-3 overflow-x-auto">
                {[
                  { id: 'maruza', label: 'Video-Ma\'ruza', icon: Video },
                  { id: 'taqdimot', label: 'Taqdimot', icon: FileText },
                  { id: 'galereya', label: 'Rasmlar & Media', icon: ImageIcon },
                  { id: 'test', label: 'O\'z-o\'zini tekshirish testi', icon: CheckSquare },
                  { id: 'topshiriq', label: 'Amaliy topshiriq', icon: BookOpen },
                  { id: 'forum', label: 'Muhokama forumi', icon: MessageSquare },
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
                    <div className="aspect-video w-full rounded-2xl bg-slate-900 flex items-center justify-center relative overflow-hidden group shadow-inner">
                      <div className="text-center space-y-3 p-6">
                        <PlayCircle className="w-16 h-16 text-emerald-400 mx-auto group-hover:scale-110 transition duration-300 cursor-pointer" />
                        <div className="text-white font-bold text-sm">
                          {currentTopic.nomi} — Video-ma'ruzasi
                        </div>
                        <p className="text-slate-400 text-xs max-w-md mx-auto">
                          O'qituvchi tomonidan yuklangan rasmiy didaktik video ma'ruza.
                        </p>
                      </div>
                    </div>
                  )}

                  {canManageContent && (
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs flex justify-between items-center">
                      <span className="text-gray-500 font-medium">Video havolasini o'zgartirish yoki yangi fayl yuklash:</span>
                      <button
                        onClick={() => handleOpenEditModal(currentTopic)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs"
                      >
                        Video yuklash / o'zgartirish
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: Presentation */}
              {activeSubTab === 'taqdimot' && (
                <div className="space-y-4">
                  <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
                    <h3 className="font-bold text-base text-gray-900 dark:text-white">
                      Taqdimot tezislari va didaktik materiallar
                    </h3>
                    <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                      {currentTopic.taqdimot_matn}
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 3: Images & Media Attachments */}
              {activeSubTab === 'galereya' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-amber-500" /> Rasmlar va Yuklangan Fayllar Kutubxonasi
                    </h3>
                    {canManageContent && (
                      <button
                        onClick={() => handleOpenEditModal(currentTopic)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1"
                      >
                        <Upload className="w-3.5 h-3.5" /> Rasm / Fayl yuklash
                      </button>
                    )}
                  </div>

                  {/* Image Grid */}
                  {currentTopic.image_urls && currentTopic.image_urls.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-xs font-bold uppercase text-gray-400">Ko'rgazmali rasmlar va slaydlar:</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {currentTopic.image_urls.map((url, idx) => (
                          <div key={idx} className="rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-700 shadow-md group relative">
                            <img
                              src={url}
                              alt={`Slayd ${idx + 1}`}
                              className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                            />
                            <div className="p-2 bg-slate-900/80 text-white text-[11px] font-bold text-center">
                              Rasm #{idx + 1}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* File Attachments List */}
                  {currentTopic.file_attachments && currentTopic.file_attachments.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <span className="text-xs font-bold uppercase text-gray-400">Yuklab olish uchun fayllar (PDF / PPTX):</span>
                      <div className="space-y-2">
                        {currentTopic.file_attachments.map((file) => (
                          <div key={file.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <FileText className="w-5 h-5 text-blue-500" />
                              <div>
                                <h4 className="font-bold text-xs text-gray-900 dark:text-white">{file.nomi}</h4>
                                <span className="text-[10px] text-gray-400">Yukladi: {file.yuklagan_shaxs} ({file.sana})</span>
                              </div>
                            </div>
                            <a
                              href={file.url}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-1.5 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center gap-1 hover:bg-blue-200 transition"
                            >
                              <Download className="w-3.5 h-3.5" /> Yuklab olish
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 4: Quiz */}
              {activeSubTab === 'test' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base text-gray-900 dark:text-white">
                      Mavzu bo'yicha o'z-o'zini tekshirish testi
                    </h3>
                    {quizSubmitted && (
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                        Natija: {score} / {currentTopic.test_savollari.length} to'g'ri
                      </span>
                    )}
                  </div>

                  <div className="space-y-6">
                    {currentTopic.test_savollari.map((q, qIdx) => (
                      <div key={qIdx} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
                        <h4 className="font-bold text-sm text-gray-900 dark:text-white">
                          {qIdx + 1}. {q.savol}
                        </h4>
                        <div className="space-y-2">
                          {q.variantlar.map((opt, optIdx) => {
                            const isSelected = userAnswers[qIdx] === optIdx;
                            const isCorrect = optIdx === q.togri_indeks;

                            let bgClass = "bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700";
                            if (quizSubmitted) {
                              if (isCorrect) bgClass = "bg-emerald-100 dark:bg-emerald-950 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold";
                              else if (isSelected && !isCorrect) bgClass = "bg-rose-100 dark:bg-rose-950 border-rose-500 text-rose-900 dark:text-rose-200";
                            } else if (isSelected) {
                              bgClass = "bg-emerald-50 dark:bg-emerald-950 border-emerald-500 font-bold";
                            }

                            return (
                              <div
                                key={optIdx}
                                onClick={() => !quizSubmitted && setUserAnswers(prev => ({ ...prev, [qIdx]: optIdx }))}
                                className={`p-3 rounded-xl border text-xs cursor-pointer transition flex items-center justify-between ${bgClass}`}
                              >
                                <span>{opt}</span>
                                {quizSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}

                    {!quizSubmitted && (
                      <button
                        onClick={handleQuizSubmit}
                        className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-lg shadow-emerald-600/30"
                      >
                        Test javoblarini tekshirish
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 5: Assignment */}
              {activeSubTab === 'topshiriq' && (
                <div className="space-y-4">
                  <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
                    <h3 className="font-bold text-base text-gray-900 dark:text-white">
                      Amaliy topshiriq sharti:
                    </h3>
                    <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                      {currentTopic.amaliy_topshiriq}
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 6: Forum */}
              {activeSubTab === 'forum' && (
                <div className="space-y-4">
                  <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
                    <h3 className="font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-blue-500" /> {currentTopic.forum_mavzusi}
                    </h3>
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

      </div>

      {/* Content Management Modal */}
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
