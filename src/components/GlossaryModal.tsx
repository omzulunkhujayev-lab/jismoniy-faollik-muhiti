import React from 'react';
import { BookOpen, X, CheckCircle2 } from 'lucide-react';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const glossaryItems = [
  {
    term: "Jismoniy faollik",
    definition: "Skelet mushaklari qisqarishi natijasida yuzaga keladigan va tinch holatga nisbatan energiya sarfini oshiradigan har qanday tana harakati."
  },
  {
    term: "O'tirg'ich xulq-atvor",
    definition: "Uyg'oq holatda energiya sarfi 1,5 metabolik ekvivalentdan (MET) oshmaydigan xulq-atvor (masalan, o'tirish, yotish, ekranga qarash)."
  },
  {
    term: "Faol daqiqalar",
    definition: "O'rtacha yoki yuqori jadallikdagi harakat bilan o'tgan vaqt (daqiqa)."
  },
  {
    term: "Mikrofaollik texnologiyasi",
    definition: "Mashg'ulot tuzilmasiga singdirilgan, qisqa muddatli (2-5 daq.) va aniq didaktik/gigiyenik vazifaga ega harakat pauzalari majmui."
  },
  {
    term: "Faollik uzilishi",
    definition: "Uzluksiz o'tirish davomiyligi 60 daqiqadan oshadigan vaqt oralig'i (qizil zona)."
  },
  {
    term: "Raqamli-jismoniy faollik muhiti",
    definition: "O'quv jarayoni tartibi, jismoniy makon va raqamli xizmatlarning talaba harakat faolligini o'lchash, anglatish, rag'batlantirish va o'quv faoliyatiga singdirishni ta'minlovchi uyg'un holati."
  },
  {
    term: "Yopiq halqa",
    definition: "MONITORING → TESKARI ALOQA → MIKROFAOLLIK → RAG'BAT → REFLEKSIYA bo'g'inlarining uzluksiz takrorlanuvchi pedagogik tizimi."
  }
];

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-gray-100 dark:border-slate-700 max-h-[90vh] flex flex-col animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100 dark:bg-emerald-950/60 rounded-xl text-emerald-600 dark:text-emerald-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Pedagogik Glossariy</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Ilmiy-metodik rasmiy atamalar lug'ati</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-2">
          {glossaryItems.map((item, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800 hover:border-emerald-500/50 transition"
            >
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <h3 className="font-semibold text-emerald-700 dark:text-emerald-400 text-sm">{item.term}</h3>
              </div>
              <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-300 pl-6">
                {item.definition}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-gray-100 dark:border-slate-700 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium text-sm transition shadow-lg shadow-emerald-600/20"
          >
            Tushundim
          </button>
        </div>

      </div>
    </div>
  );
};
