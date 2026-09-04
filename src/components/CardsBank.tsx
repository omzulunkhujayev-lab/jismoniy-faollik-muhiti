import React, { useState } from 'react';
import { Card, CardCategory } from '../types';
import { 
  BookMarked, 
  Search, 
  Filter, 
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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedSpace, setSelectedSpace] = useState<string>('all');
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [selectedCardForModal, setSelectedCardForModal] = useState<Card | null>(null);
  const [printCard, setPrintCard] = useState<Card | null>(null);
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  // Filtering logic
  const filteredCards = cards.filter(card => {
    const matchesSearch = card.nomi.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          card.metodik_eslatma.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          card.mos_fanlar.some(f => f.toLowerCase().includes(searchTerm.toLowerCase()));
    
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
    setPrintCard(card);
    setTimeout(() => {
      window.print();
    }, 200);
  };

  const getCategoryBadge = (turi: CardCategory) => {
    switch (turi) {
      case 'gigiyenik-tiklovchi':
        return <span className="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">Gigiyenik-tiklovchi (2–3 daq.)</span>;
      case 'kognitiv-faollashtiruvchi':
        return <span className="px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[10px] font-bold">Kognitiv-faollashtiruvchi (3–5 daq.)</span>;
      case 'kasbiy-metodik':
        return <span className="px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 text-[10px] font-bold">Kasbiy-metodik (3–5 daq.)</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-slate-700 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 dark:border-slate-700 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-2">
              <BookMarked className="w-3.5 h-3.5" /> 60+ Kartochkadan iborat katalog
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              «Faollik kartochkalari» banki
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Mashg'ulotlar va turmush tarziga moslashtirilgan mikrofaollik pauzalari katalogi
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
              <span>Sevimlilar ({cards.filter(c => c.isFavorite).length})</span>
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
              placeholder="Kartochka nomi, fan yoki metodik kalit so'z..."
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
              <option value="all">Barcha pauza turlari</option>
              <option value="gigiyenik-tiklovchi">Gigiyenik-tiklovchi (2-3 daq.)</option>
              <option value="kognitiv-faollashtiruvchi">Kognitiv-faollashtiruvchi (3-5 daq.)</option>
              <option value="kasbiy-metodik">Kasbiy-metodik (3-5 daq.)</option>
            </select>
          </div>

          {/* Space Filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedSpace}
              onChange={(e) => setSelectedSpace(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-gray-800 dark:text-gray-200 outline-none cursor-pointer"
            >
              <option value="all">Barcha joy/jihoz sharti</option>
              <option value="seated">O'rindan turmasdan</option>
              <option value="moving">Auditoriyada harakatlanib</option>
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

      {/* Printable hidden section */}
      {printCard && (
        <div id="printable-card-section" className="hidden print:block p-8 bg-white text-black space-y-6">
          <h1 className="text-2xl font-bold border-b pb-2">{printCard.nomi}</h1>
          <div className="text-sm"><strong>Turi:</strong> {printCard.turi} | <strong>Davomiyligi:</strong> {printCard.davomiyligi}</div>
          <div className="text-sm"><strong>Zarur joy va jihoz:</strong> {printCard.joy_jihoz}</div>
          <div className="space-y-2">
            <h3 className="font-bold">O'tkazish algoritmi:</h3>
            <ol className="list-decimal pl-5 space-y-1 text-sm">
              {printCard.algoritm.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
          <div className="text-xs bg-gray-100 p-3 rounded">
            <strong>Metodik eslatma:</strong> {printCard.metodik_eslatma}
          </div>
          <div className="text-xs text-gray-600">
            <strong>Tibbiy moslashuv:</strong> {printCard.moslashtirilgan_variant}
          </div>
        </div>
      )}

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCards.map((card) => (
          <div
            key={card.id}
            className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-100 dark:border-slate-700 shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between space-y-4 group relative"
          >
            
            <div className="space-y-3">
              {/* Category & Favorite Star */}
              <div className="flex items-center justify-between">
                {getCategoryBadge(card.turi)}
                <button
                  onClick={() => onToggleFavorite(card.id)}
                  className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                  title="Sevimlilarga qo'shish"
                >
                  <Star className={`w-4 h-4 ${card.isFavorite ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                </button>
              </div>

              {/* Title */}
              <h3 
                onClick={() => setSelectedCardForModal(card)}
                className="font-extrabold text-base text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 cursor-pointer transition line-clamp-2"
              >
                {card.nomi}
              </h3>

              {/* Meta information */}
              <div className="space-y-1.5 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Davomiyligi: <strong>{card.davomiyligi}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-teal-500" />
                  <span className="truncate">{card.joy_jihoz}</span>
                </div>
              </div>

              {/* Algorithm summary (first 2 steps) */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 space-y-1">
                <span className="text-[10px] font-bold uppercase text-gray-400">O'tkazish tartibi (qisqa):</span>
                <ol className="text-xs text-gray-700 dark:text-gray-300 list-decimal pl-4 space-y-0.5">
                  {card.algoritm.slice(0, 2).map((step, i) => (
                    <li key={i} className="line-clamp-1">{step}</li>
                  ))}
                </ol>
              </div>

              {/* Suitable subjects tags */}
              <div className="flex flex-wrap gap-1 pt-1">
                {card.mos_fanlar.map((subject, idx) => (
                  <span key={idx} className="text-[9px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                    {subject}
                  </span>
                ))}
              </div>
            </div>

            {/* Card Actions Footer */}
            <div className="pt-3 border-t border-gray-100 dark:border-slate-700 flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedCardForModal(card)}
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Batafsil kartochka</span>
              </button>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handlePrint(card)}
                  className="p-2 rounded-xl text-gray-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                  title="PDF / Chop etish"
                >
                  <Printer className="w-4 h-4" />
                </button>

                {(userRole === 'oqituvchi' || userRole === 'kafedra') && (
                  <button
                    onClick={() => {
                      if (onAddToLesson) onAddToLesson(card);
                      setAddedNotice(`'${card.nomi}' dars jadvaliga biriktirildi!`);
                      setTimeout(() => setAddedNotice(null), 3000);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center gap-1"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Darsga qo'shish</span>
                  </button>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Card Detail Modal */}
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
                <span className="text-gray-400 font-bold uppercase block text-[10px]">Davomiyligi</span>
                <span className="font-extrabold text-gray-800 dark:text-gray-200">{selectedCardForModal.davomiyligi}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <span className="text-gray-400 font-bold uppercase block text-[10px]">Joy va jihoz</span>
                <span className="font-extrabold text-gray-800 dark:text-gray-200">{selectedCardForModal.joy_jihoz}</span>
              </div>
            </div>

            {/* Full Algorithm */}
            <div className="space-y-3">
              <h3 className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-500" /> O'tkazish algoritmi (3–5 qadam)
              </h3>
              <ol className="space-y-2 text-xs text-gray-700 dark:text-gray-300 list-decimal pl-5">
                {selectedCardForModal.algoritm.map((step, idx) => (
                  <li key={idx} className="leading-relaxed font-medium">{step}</li>
                ))}
              </ol>
            </div>

            {/* Methodological note */}
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs space-y-1">
              <span className="font-bold text-emerald-700 dark:text-emerald-400">Metodik eslatma:</span>
              <p className="text-emerald-900 dark:text-emerald-200 leading-relaxed">
                {selectedCardForModal.metodik_eslatma}
              </p>
            </div>

            {/* Health adaptation */}
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs space-y-1">
              <span className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4" /> Sog'liq cheklovi bo'lganlar uchun moslashtirilgan variant:
              </span>
              <p className="text-amber-900 dark:text-amber-200 leading-relaxed">
                {selectedCardForModal.moslashtirilgan_variant}
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-slate-700 flex justify-between items-center">
              <button
                onClick={() => handlePrint(selectedCardForModal)}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 text-xs font-bold flex items-center gap-2"
              >
                <Printer className="w-4 h-4" /> Chop etish (PDF)
              </button>
              <button
                onClick={() => setSelectedCardForModal(null)}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
              >
                Yopish
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
