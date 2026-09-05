import React, { useState } from 'react';
import { CourseTopic, MediaResource } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { 
  X, 
  Upload, 
  Video, 
  Image as ImageIcon, 
  FileText, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Sparkles, 
  Link as LinkIcon,
  HelpCircle
} from 'lucide-react';

interface ContentManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  topicToEdit?: CourseTopic | null;
  onSaveTopic: (topic: CourseTopic) => void;
  onDeleteTopic?: (topicId: string) => void;
  userRole: string;
}

export const ContentManagementModal: React.FC<ContentManagementModalProps> = ({
  isOpen,
  onClose,
  topicToEdit,
  onSaveTopic,
  onDeleteTopic,
  userRole
}) => {
  const { t, lang } = useLanguage();
  if (!isOpen) return null;

  const isEditing = !!topicToEdit;

  const [nomi, setNomi] = useState(topicToEdit?.nomi || '');
  const [maruzaSoat, setMaruzaSoat] = useState(topicToEdit?.maruza_soat || 2);
  const [amaliySoat, setAmaliySoat] = useState(topicToEdit?.amaliy_soat || 2);
  const [mustaqilSoat, setMustaqilSoat] = useState(topicToEdit?.mustaqil_soat || 2);
  const [videoUrl, setVideoUrl] = useState(topicToEdit?.video_url || '');
  const [taqdimotMatn, setTaqdimotMatn] = useState(topicToEdit?.taqdimot_matn || '');
  const [amaliyTopshiriq, setAmaliyTopshiriq] = useState(topicToEdit?.amaliy_topshiriq || '');
  const [forumMavzusi, setForumMavzusi] = useState(topicToEdit?.forum_mavzusi || '');
  
  // Media attachments state
  const [imageUrls, setImageUrls] = useState<string[]>(topicToEdit?.image_urls || [
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80'
  ]);
  const [newImageUrlInput, setNewImageUrlInput] = useState('');

  const [fileAttachments, setFileAttachments] = useState<MediaResource[]>(topicToEdit?.file_attachments || [
    {
      id: 'media_1',
      nomi: "Ma'ruza taqdimoti (PDF Slaydlar)",
      turi: 'hujjat',
      url: 'https://example.com/slides.pdf',
      yuklagan_shaxs: userRole === 'kafedra' ? 'Kafedra Admini' : "Fan O'qituvchisi",
      sana: new Date().toISOString().split('T')[0],
      fayl_hajmi: '4.2 MB'
    }
  ]);

  const [newFileTitle, setNewFileTitle] = useState('');
  const [newFileType, setNewFileType] = useState<'video' | 'rasm' | 'hujjat'>('rasm');
  const [newFileUrl, setNewFileUrl] = useState('');

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleAddImage = () => {
    if (!newImageUrlInput.trim()) return;
    setImageUrls([...imageUrls, newImageUrlInput.trim()]);
    setNewImageUrlInput('');
  };

  const handleRemoveImage = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const handleAddFileAttachment = () => {
    if (!newFileTitle.trim()) return;
    const newMedia: MediaResource = {
      id: `media_${Date.now()}`,
      nomi: newFileTitle.trim(),
      turi: newFileType,
      url: newFileUrl || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80',
      yuklagan_shaxs: userRole === 'kafedra' ? 'Kafedra Admini' : "Prof. Dilnoza Raximova",
      sana: new Date().toISOString().split('T')[0],
      fayl_hajmi: newFileType === 'video' ? '45.0 MB' : newFileType === 'rasm' ? '1.8 MB' : '3.5 MB'
    };
    setFileAttachments([...fileAttachments, newMedia]);
    setNewFileTitle('');
    setNewFileUrl('');
  };

  const handleRemoveFileAttachment = (id: string) => {
    setFileAttachments(fileAttachments.filter(f => f.id !== id));
  };

  // Mock File Drag and Drop / Direct Upload Handler
  const handleSimulatedFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const fakeUrl = URL.createObjectURL(file);
      const isImg = file.type.startsWith('image');
      const isVid = file.type.startsWith('video');

      const newMedia: MediaResource = {
        id: `media_${Date.now()}`,
        nomi: file.name,
        turi: isVid ? 'video' : isImg ? 'rasm' : 'hujjat',
        url: fakeUrl,
        yuklagan_shaxs: userRole === 'kafedra' ? 'Kafedra Admini' : "Fan O'qituvchisi",
        sana: new Date().toISOString().split('T')[0],
        fayl_hajmi: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      };

      setFileAttachments(prev => [...prev, newMedia]);
      if (isImg) {
        setImageUrls(prev => [...prev, fakeUrl]);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomi.trim()) return;

    const savedTopic: CourseTopic = {
      id: topicToEdit ? topicToEdit.id : `topic_${Date.now()}`,
      tartib: topicToEdit ? topicToEdit.tartib : 10,
      nomi,
      maruza_soat: Number(maruzaSoat),
      amaliy_soat: Number(amaliySoat),
      mustaqil_soat: Number(mustaqilSoat),
      video_url: videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      taqdimot_matn: taqdimotMatn || "Ushbu ma'ruza materiali o'qituvchi va admin tomonidan yangilandi va yuklandi.",
      image_urls: imageUrls,
      file_attachments: fileAttachments,
      kartochkalar_toplami: topicToEdit?.kartochkalar_toplami || ['card_1', 'card_2'],
      test_savollari: topicToEdit?.test_savollari || [
        {
          savol: "Yangi yuklangan ma'ruza materiali bo'yicha asosiy me'yor qaysi?",
          variantlar: ["8000+ qadam va <60 min o'tirish", "Kechqurun 2 soat sport", "Faqat uyqu", "Hech qanday"],
          togri_indeks: 0
        }
      ],
      amaliy_topshiriq: amaliyTopshiriq || "O'qituvchi yuklagan videomaterial va rasmlarni tahlil qilib, shaxsiy harakat rejangizga kiriting.",
      forum_mavzusi: forumMavzusi || "Yangi ma'ruza va media materiallar muhokamasi.",
      muallif: userRole === 'kafedra' ? 'Kafedra Admini' : "Prof. Dilnoza Raximova",
      yaratilgan_sana: new Date().toISOString().split('T')[0]
    };

    onSaveTopic(savedTopic);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md transition-opacity">
      <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 dark:border-slate-700 max-h-[90vh] overflow-y-auto space-y-6 animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-start border-b border-gray-100 dark:border-slate-700 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-2xl">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase font-extrabold text-emerald-600 dark:text-emerald-400">
                {userRole === 'kafedra' ? (lang === 'ru' ? 'Управление кафедры' : lang === 'en' ? 'Department Admin' : 'Kafedra / Admin Boshqaruvi') : (lang === 'ru' ? 'Панель преподавателя' : lang === 'en' ? 'Teacher Panel' : 'O\'qituvchi Paneli')}
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white">
                {isEditing 
                  ? (lang === 'ru' ? 'Редактировать лекцию и медиа' : lang === 'en' ? 'Edit Lecture & Media' : 'Ma\'ruza & Media Materialni Tahrirlash') 
                  : (lang === 'ru' ? 'Загрузить новую лекцию и медиа' : lang === 'en' ? 'Upload New Lecture & Media' : 'Yangi Ma\'ruza va Media Material Yuklash')
                }
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Topic title */}
          <div>
            <label className="text-xs font-bold text-gray-800 dark:text-gray-200 block mb-1">
              {lang === 'ru' ? 'Название темы:' : lang === 'en' ? 'Topic Title:' : 'Mavzu nomi:'}
            </label>
            <input
              type="text"
              required
              value={nomi}
              onChange={(e) => setNomi(e.target.value)}
              placeholder={lang === 'ru' ? 'Например: Методы оценки активности...' : lang === 'en' ? 'Example: Physical activity assessment methods...' : 'Masalan: Jismoniy faollik va o\'tirg\'ich xulq-atvorni baholash metodlari'}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Hours distribution */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-bold text-gray-700 dark:text-gray-300 block mb-1">{lang === 'ru' ? 'Лекция (часы):' : lang === 'en' ? 'Lecture (hours):' : 'Ma\'ruza soati:'}</label>
              <input
                type="number"
                min="0"
                max="20"
                value={maruzaSoat}
                onChange={(e) => setMaruzaSoat(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-gray-700 dark:text-gray-300 block mb-1">{lang === 'ru' ? 'Практика (часы):' : lang === 'en' ? 'Practical (hours):' : 'Amaliy soat:'}</label>
              <input
                type="number"
                min="0"
                max="20"
                value={amaliySoat}
                onChange={(e) => setAmaliySoat(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-gray-700 dark:text-gray-300 block mb-1">{lang === 'ru' ? 'Самост. (часы):' : lang === 'en' ? 'Self-study (h):' : 'Mustaqil soat:'}</label>
              <input
                type="number"
                min="0"
                max="20"
                value={mustaqilSoat}
                onChange={(e) => setMustaqilSoat(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold"
              />
            </div>
          </div>

          {/* Video Lecture URL */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
              <Video className="w-4 h-4 text-emerald-500" /> {lang === 'ru' ? 'Ссылка на видео-лекцию (YouTube / MP4 Embed URL):' : lang === 'en' ? 'Video Lecture URL (YouTube / MP4 Embed):' : 'Video-ma\'ruza havolasi (YouTube / MP4 Embed URL):'}
            </label>
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://www.youtube.com/embed/..."
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
            />
          </div>

          {/* Presentation text */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-blue-500" /> {lang === 'ru' ? 'Текст презентации и тезисы:' : lang === 'en' ? 'Presentation text & key thesis:' : 'Taqdimot ma\'ruzasi va didaktik tezislar:'}
            </label>
            <textarea
              rows={4}
              value={taqdimotMatn}
              onChange={(e) => setTaqdimotMatn(e.target.value)}
              placeholder={lang === 'ru' ? 'Введите текст лекции...' : lang === 'en' ? 'Enter lecture text and thesis...' : 'Ma\'ruza matni va asosiy ilmiy tezislarni kiriting...'}
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs outline-none focus:ring-2 focus:ring-emerald-500 leading-relaxed"
            />
          </div>

          {/* File & Image Upload Area */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs uppercase text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-amber-500" /> {lang === 'ru' ? 'Библиотека фото и файлов (Media Upload)' : lang === 'en' ? 'Pictures & Files Library (Media Upload)' : 'Rasmlar va Fayllar Kutubxonasi (Media Upload)'}
              </h3>
              
              <label className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer transition flex items-center gap-1">
                <Upload className="w-3.5 h-3.5" />
                <span>{lang === 'ru' ? 'Загрузить с ПК' : lang === 'en' ? 'Upload from PC' : 'Kompyuterdan yuklash'}</span>
                <input
                  type="file"
                  accept="image/*,video/*,.pdf,.pptx"
                  onChange={handleSimulatedFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* List of uploaded files */}
            <div className="space-y-2">
              {fileAttachments.map((f) => (
                <div key={f.id} className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    {f.turi === 'video' ? <Video className="w-4 h-4 text-emerald-500" /> : f.turi === 'rasm' ? <ImageIcon className="w-4 h-4 text-amber-500" /> : <FileText className="w-4 h-4 text-blue-500" />}
                    <div>
                      <div className="font-bold text-gray-900 dark:text-white">{f.nomi}</div>
                      <div className="text-[10px] text-gray-400">{lang === 'ru' ? 'Загрузил:' : lang === 'en' ? 'Uploaded by:' : 'Yukladi:'} {f.yuklagan_shaxs} | {f.sana} {f.fayl_hajmi ? `(${f.fayl_hajmi})` : ''}</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveFileAttachment(f.id)}
                    className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add external URL media */}
            <div className="flex gap-2 pt-2">
              <input
                type="text"
                placeholder={lang === 'ru' ? 'Название внешнего файла/картинки...' : lang === 'en' ? 'External file / picture title...' : 'External fayl / rasm nomi...'}
                value={newFileTitle}
                onChange={(e) => setNewFileTitle(e.target.value)}
                className="flex-1 p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
              />
              <select
                value={newFileType}
                onChange={(e) => setNewFileType(e.target.value as any)}
                className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold"
              >
                <option value="rasm">{lang === 'ru' ? 'Картинка' : lang === 'en' ? 'Picture' : 'Rasm'}</option>
                <option value="video">Video</option>
                <option value="hujjat">{lang === 'ru' ? 'Презентация/Документ' : lang === 'en' ? 'Presentation/Doc' : 'Taqdimot / Hujjat'}</option>
              </select>
              <button
                type="button"
                onClick={handleAddFileAttachment}
                className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
              >
                {lang === 'ru' ? 'Добавить' : lang === 'en' ? 'Add' : 'Qo\'shish'}
              </button>
            </div>

          </div>

          {/* Practical Assignment & Forum */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-800 dark:text-gray-200 block mb-1">{lang === 'ru' ? 'Практическое задание:' : lang === 'en' ? 'Practical Task:' : 'Amaliy topshiriq sharti:'}</label>
              <textarea
                rows={2}
                value={amaliyTopshiriq}
                onChange={(e) => setAmaliyTopshiriq(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-800 dark:text-gray-200 block mb-1">{lang === 'ru' ? 'Тема для обсуждения на форуме:' : lang === 'en' ? 'Forum Discussion Topic:' : 'Forum muhokama mavzusi:'}</label>
              <textarea
                rows={2}
                value={forumMavzusi}
                onChange={(e) => setForumMavzusi(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs outline-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-gray-100 dark:border-slate-700 flex items-center justify-between">
            {isEditing && onDeleteTopic && (
              <button
                type="button"
                onClick={() => {
                  if (confirm(lang === 'ru' ? 'Вы уверены, что хотите удалить эту лекцию?' : lang === 'en' ? 'Are you sure you want to delete this lecture?' : "Ushbu ma'ruza va barcha unga tegishli fayllarni o'chirishga ishonchingiz komilmi?")) {
                    onDeleteTopic(topicToEdit.id);
                    onClose();
                  }
                }}
                className="px-4 py-2.5 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-700 text-xs font-bold flex items-center gap-1.5 transition"
              >
                <Trash2 className="w-4 h-4" /> {t('btnDelete')}
              </button>
            )}

            <div className="flex gap-3 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 text-xs font-bold"
              >
                {t('btnCancel')}
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/30 flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" /> {t('btnSave')}
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
