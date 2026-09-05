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
  userRole: string;
}

export const CardsBank: React.FC<CardsBankProps> = ({
  cards,
  onToggleFavorite,
  onAddToLesson,
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

          <div className="flex items-center gap-2">
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
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-xs text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Type Filter */}
          <div className="sm:col-span-4">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-gray-800 dark:text-gray-200 outline-none cursor-pointer"
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
              className="w-full py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-gray-800 dark:text-gray-200 outline-none cursor-pointer"
            >
              <option value="all">{t('filterAllTypes')}</option>
              <option value="seated">{t('filterSeated')}</option>
              <option value="moving">{t('filterMoving')}</option>
            </select>
          </div>

        </div>
      </div>

      {addedNotice && (
        <div className="p-4 rounded-2xl bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5" />
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
              className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-100 dark:border-slate-700 shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between space-y-4 group relative"
            >
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  {getCategoryBadge(card.turi)}
                  <button
                    onClick={() => onToggleFavorite(card.id)}
                    className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                  >
                    <Star className={`w-4 h-4 ${card.isFavorite ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                  </button>
                </div>

                <h3 
                  onClick={() => setSelectedCardForModal(card)}
                  className="font-extrabold text-base text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 cursor-pointer transition line-clamp-2"
                >
                  {card.nomi}
                </h3>

                <div className="space-y-1.5 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{card.davomiyligi}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-teal-500" />
                    <span className="truncate">{card.joy_jihoz}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 dark:border-slate-700 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedCardForModal(card)}
                  className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{t('btnDetails')}</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handlePrint(card)}
                    className="p-2 rounded-xl text-gray-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                    title={t('btnPrint')}
                  >
                    <Printer className="w-4 h-4" />
                  </button>

                  {(userRole === 'oqituvchi' || userRole === 'kafedra') && (
                    <button
                      onClick={() => {
                        if (onAddToLesson) onAddToLesson(card);
                        setAddedNotice(`'${card.nomi}' darsga biriktirildi!`);
                        setTimeout(() => setAddedNotice(null), 3000);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center gap-1"
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

    </div>
  );
};
