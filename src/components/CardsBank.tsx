import React, { useState } from 'react';
import { Card, CardCategory } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { 
  BookMarked, 
  Search, 
  Star, 
  Printer, 
  PlusCircle, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  HeartHandshake, 
  X,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface CardsBankProps {
  cards: Card[];
  onToggleFavorite: (cardId: string) => void;
  onAddToLesson?: (card: Card) => void;
  onAddCard?: (newCard: Omit<Card, 'id' | 'isFavorite'>) => void;
  userRole: string;
}

export const CardsBank: React.FC<CardsBankProps> = ({
  cards,
  onToggleFavorite,
  onAddToLesson,
  onAddCard,
  userRole
}) => {
  const { lang, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedSpace, setSelectedSpace] = useState<string>('all');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [selectedCardForModal, setSelectedCardForModal] = useState<Card | null>(null);
  const [printCard, setPrintCard] = useState<Card | null>(null);
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  // New Card Form Modal for Teachers and Supervisors
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [newCardName, setNewCardName] = useState('');
  const [newCardCategory, setNewCardCategory] = useState<CardCategory>('gigiyenik-tiklovchi');
  const [newCardDuration, setNewCardDuration] = useState('2-3 daq.');
  const [newCardEquipment, setNewCardEquipment] = useState("O'rindiqda o'tirgan holda, maxsus jihoz shart emas");
  const [newCardSteps, setNewCardSteps] = useState('');
  const [newCardNote, setNewCardNote] = useState('');

  // Helper function to translate card details based on active language
  const getTranslatedCard = (card: Card) => {
    if (lang === 'ru') {
      return {
        ...card,
        nomi: card.nomi
          .replace("Pozitsiyalar va umurtqa yozilishi", "Позы и вытягивание позвоночника")
          .replace("Kognitiv ritm va krest-kross mashqi", "Когнитивный ритм и крест-кросс упражнение")
          .replace("Interaktiv pedagogik juftlik pauzasi", "Интерактивная педагогическая парная пауза")
          .replace("Ko'z mushaklari va bo'yin mikro-relaksatsiyasi", "Микро-релаксация глазных мышц и шеи")
          .replace("Neyro-didaktik reaksiya impulsi", "Нейро-дидактический импульс реакции")
          .replace("Kartochka №", "Карточка №"),
        davomiyligi: card.davomiyligi.replace('daq.', 'мин.'),
        joy_jihoz: card.joy_jihoz
          .replace("O'rindiqda o'tirgan holda, qo'shimcha jihoz shart emas", "Сидя на стуле, без дополнительного инвентаря")
          .replace("Auditoriya ichida tik turgan holda", "Стоя в аудитории")
          .replace("Stulda o'tirgan holda", "Сидя на стуле")
          .replace("Auditoriya o'rtasida", "В центре аудитории"),
      };
    } else if (lang === 'en') {
      return {
        ...card,
        nomi: card.nomi
          .replace("Pozitsiyalar va umurtqa yozilishi", "Postures and Spine Extension")
          .replace("Kognitiv ritm va krest-kross mashqi", "Cognitive Rhythm and Cross-Cross Exercise")
          .replace("Interaktiv pedagogik juftlik pauzasi", "Interactive Pedagogical Pair Break")
          .replace("Ko'z mushaklari va bo'yin mikro-relaksatsiyasi", "Eye Muscle and Neck Micro-Relaxation")
          .replace("Neyro-didaktik reaksiya impulsi", "Neuro-Didactic Reaction Impulse")
          .replace("Kartochka №", "Card No."),
        davomiyligi: card.davomiyligi.replace('daq.', 'mins'),
        joy_jihoz: card.joy_jihoz
          .replace("O'rindiqda o'tirgan holda, qo'shimcha jihoz shart emas", "Seated on a chair, no extra equipment needed")
          .replace("Auditoriya ichida tik turgan holda", "Standing inside classroom")
          .replace("Stulda o'tirgan holda", "Seated on chair")
          .replace("Auditoriya o'rtasida", "Middle of classroom"),
      };
    }
    return card;
  };

  const filteredCards = cards.filter(card => {
    const translated = getTranslatedCard(card);
    const matchesSearch = translated.nomi.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          translated.metodik_eslatma.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'all' || card.turi === selectedType;
    
    let matchesSpace = true;
    if (selectedSpace === 'seated') {
      matchesSpace = card.joy_jihoz.toLowerCase().includes('o\'tirgan') || card.joy_jihoz.toLowerCase().includes('stul');
    } else if (selectedSpace === 'moving') {
      matchesSpace = card.joy_jihoz.toLowerCase().includes('auditoriya');
    }

    const matchesFav = !onlyFavorites || card.isFavorite;

    return matchesSearch && matchesType && matchesSpace && matchesFav;
  });

  const handlePrint = (card: Card) => {
    setPrintCard(getTranslatedCard(card));
    setTimeout(() => {
      window.print();
    }, 200);
  };

  const getCategoryBadge = (turi: CardCategory) => {
    switch (turi) {
      case 'gigiyenik-tiklovchi':
        return <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">{t('filterHygienic')}</span>;
      case 'kognitiv-faollashtiruvchi':
        return <span className="px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[10px] font-bold">{t('filterCognitive')}</span>;
      case 'kasbiy-metodik':
        return <span className="px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 text-[10px] font-bold">{t('filterProfessional')}</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-slate-700 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 dark:border-slate-700 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-2">
              <BookMarked className="w-3.5 h-3.5" /> {t('cardsBadge')}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              {t('cardsTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              {t('cardsSubtitle')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {(userRole === 'oqituvchi' || userRole === 'kafedra') && (
              <button
                type="button"
                onClick={() => setShowAddCardModal(true)}
                className="px-4 py-2.5 rounded-xl text-xs font-black transition flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/30"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{lang === 'ru' ? '+ Добавить карточку' : lang === 'en' ? '+ Add Card' : '+ Yangi kartochka qo\'shish'}</span>
              </button>
            )}

            <button
              onClick={() => setOnlyFavorites(!onlyFavorites)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 border ${
                onlyFavorites
                  ? 'bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/20'
                  : 'bg-slate-50 dark:bg-slate-700 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-slate-600 hover:bg-amber-50'
              }`}
            >
              <Star className={`w-4 h-4 ${onlyFavorites ? 'fill-white' : 'text-amber-500'}`} />
              <span>{t('btnFavorite')} ({cards.filter(c => c.isFavorite).length})</span>
            </button>
          </div>
        </div>

      {/* Filter Controls Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2">
        
        {/* Search bar */}
        <div className="sm:col-span-5 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border-2 border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white outline-none focus:border-emerald-500"
          />
        </div>

        {/* Type Filter */}
        <div className="sm:col-span-4">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full py-2.5 px-3 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border-2 border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 outline-none cursor-pointer focus:border-emerald-500"
          >
            <option value="all">{t('filterAllTypes')}</option>
            <option value="gigiyenik-tiklovchi">{t('filterHygienic')}</option>
            <option value="kognitiv-faollashtiruvchi">{t('filterCognitive')}</option>
            <option value="kasbiy-metodik">{t('filterProfessional')}</option>
          </select>
        </div>

        {/* Space Filter */}
        <div className="sm:col-span-3">
          <select
            value={selectedSpace}
            onChange={(e) => setSelectedSpace(e.target.value)}
            className="w-full py-2.5 px-3 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border-2 border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 outline-none cursor-pointer focus:border-emerald-500"
          >
            <option value="all">{t('filterAllTypes')}</option>
            <option value="seated">{t('filterSeated')}</option>
            <option value="moving">{t('filterMoving')}</option>
          </select>
        </div>

      </div>
    </div>

    {addedNotice && (
      <div className="p-4 rounded-2xl bg-emerald-500 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-lg animate-in fade-in">
        <CheckCircle2 className="w-5 h-5 shrink-0" />
        <span>{addedNotice}</span>
      </div>
    )}

    {/* Cards Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredCards.map((rawCard) => {
        const card = getTranslatedCard(rawCard);
        return (
          <div
            key={card.id}
            className="bg-white dark:bg-slate-800 rounded-3xl p-6 border-2 border-slate-200/90 dark:border-slate-700 shadow-sm hover:shadow-xl hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between space-y-4 group relative"
          >
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                {getCategoryBadge(card.turi)}
                <button
                  onClick={() => onToggleFavorite(card.id)}
                  className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                  aria-label="Sevimlilar"
                >
                  <Star className={`w-4 h-4 ${card.isFavorite ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-600'}`} />
                </button>
              </div>

              <h3 
                onClick={() => setSelectedCardForModal(card)}
                className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 cursor-pointer transition line-clamp-2"
              >
                {card.nomi}
              </h3>

              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 font-medium">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{card.davomiyligi}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                  <span className="truncate">{card.joy_jihoz}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-700/80 flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedCardForModal(card)}
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{t('btnDetails')}</span>
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handlePrint(card)}
                  className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                  title={t('btnPrint')}
                >
                  <Printer className="w-4 h-4" />
                </button>

                {(userRole === 'oqituvchi' || userRole === 'kafedra') && (
                  <button
                    onClick={() => {
                      if (onAddToLesson) onAddToLesson(card);
                      setAddedNotice(lang === 'ru' ? `'${card.nomi}' прикреплена к занятию!` : lang === 'en' ? `'${card.nomi}' attached to lesson!` : `'${card.nomi}' darsga biriktirildi!`);
                      setTimeout(() => setAddedNotice(null), 3000);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs transition flex items-center gap-1 shadow-sm"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>{t('btnAddLesson')}</span>
                  </button>
                )}
              </div>
            </div>

          </div>
        );
      })}
    </div>

      {/* Detail Modal */}
      {selectedCardForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 dark:border-slate-700 max-h-[90vh] overflow-y-auto space-y-6 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-start border-b border-gray-100 dark:border-slate-700 pb-4">
              <div>
                <div className="mb-2">{getCategoryBadge(selectedCardForModal.turi)}</div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white">
                  {selectedCardForModal.nomi}
                </h2>
              </div>
              <button
                onClick={() => setSelectedCardForModal(null)}
                className="p-2 rounded-xl text-gray-400 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <span className="text-gray-400 font-bold uppercase block text-[10px]">{t('cardDurationLabel')}</span>
                <span className="font-extrabold text-gray-800 dark:text-gray-200">{selectedCardForModal.davomiyligi}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <span className="text-gray-400 font-bold uppercase block text-[10px]">{t('cardEquipmentLabel')}</span>
                <span className="font-extrabold text-gray-800 dark:text-gray-200">{selectedCardForModal.joy_jihoz}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-slate-700 flex justify-end">
              <button
                onClick={() => setSelectedCardForModal(null)}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Card Modal for Teachers / Supervisors */}
      {showAddCardModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 dark:border-slate-700 max-h-[90vh] overflow-y-auto space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-slate-700 pb-3">
              <h2 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-emerald-600" />
                <span>{lang === 'ru' ? 'Добавление новой карточки активности' : lang === 'en' ? 'Add New Physical Activity Card' : "Yangi faollik kartochkasi qo'shish"}</span>
              </h2>
              <button
                type="button"
                onClick={() => setShowAddCardModal(false)}
                className="p-2 rounded-xl text-gray-400 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newCardName.trim()) return;
                if (onAddCard) {
                  onAddCard({
                    raqam: cards.length + 1,
                    nomi: newCardName.trim(),
                    turi: newCardCategory,
                    davomiyligi: newCardDuration,
                    joy_jihoz: newCardEquipment,
                    algoritm: newCardSteps.split('\n').filter(s => s.trim().length > 0),
                    mos_fanlar: ['Barcha pedagogik fanlar'],
                    metodik_eslatma: newCardNote || "O'qituvchi tomonidan auditoriya sharoitiga moslashtirilgan mikrofaollik.",
                    moslashtirilgan_variant: "Sog'liq cheklovi bo'lgan talabalar uchun o'rindiqda yengil nafas mashqlari bilan bajariladi."
                  });
                }
                setShowAddCardModal(false);
                setNewCardName('');
                setNewCardSteps('');
                setNewCardNote('');
                setAddedNotice(lang === 'ru' ? 'Новая карточка успешно добавлена в каталог!' : lang === 'en' ? 'New card added to catalog successfully!' : 'Yangi kartochka katalogga muvaffaqiyatli qo\'shildi!');
                setTimeout(() => setAddedNotice(null), 3500);
              }}
              className="space-y-4 text-xs font-bold"
            >
              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-1">Kartochka nomi:</label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Ko'z va bo'yin mushaklari dinamik pauzasi"
                  value={newCardName}
                  onChange={(e) => setNewCardName(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-extrabold text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1">Pauza toifasi:</label>
                  <select
                    value={newCardCategory}
                    onChange={(e) => setNewCardCategory(e.target.value as CardCategory)}
                    className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-extrabold text-slate-900 dark:text-white"
                  >
                    <option value="gigiyenik-tiklovchi">Gigiyenik-tiklovchi</option>
                    <option value="kognitiv-faollashtiruvchi">Kognitiv-faollashtiruvchi</option>
                    <option value="kasbiy-metodik">Kasbiy-metodik</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1">Davomiyligi:</label>
                  <select
                    value={newCardDuration}
                    onChange={(e) => setNewCardDuration(e.target.value)}
                    className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-extrabold text-slate-900 dark:text-white"
                  >
                    <option value="2-3 daq.">2-3 daq.</option>
                    <option value="3-5 daq.">3-5 daq.</option>
                    <option value="1-2 daq.">1-2 daq.</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-1">Joy va zarur jihoz:</label>
                <input
                  type="text"
                  value={newCardEquipment}
                  onChange={(e) => setNewCardEquipment(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-extrabold text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-1">O'tkazish algoritmi (har bir qadam alohida qatorda):</label>
                <textarea
                  rows={3}
                  required
                  placeholder={"1. To'g'ri o'tirib chuqur nafas oling.\n2. Yelkalar bilan aylanma harakat qiling.\n3. Qo'llarni yuqoriga cho'zing."}
                  value={newCardSteps}
                  onChange={(e) => setNewCardSteps(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-medium text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-1">Metodik eslatma:</label>
                <input
                  type="text"
                  placeholder="Darsning 40-45 daqiqalarida o'tkazish tavsiya etiladi."
                  value={newCardNote}
                  onChange={(e) => setNewCardNote(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-medium text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-3 border-t border-gray-100 dark:border-slate-700 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddCardModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold"
                >
                  {t('btnCancel')}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold shadow-md shadow-emerald-600/30"
                >
                  {t('btnSave')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
