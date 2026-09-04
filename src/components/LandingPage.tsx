import React from 'react';
import { UserRole } from '../types';
import { 
  Activity, 
  RefreshCw, 
  CheckCircle2, 
  ArrowRight, 
  HelpCircle, 
  Award, 
  ShieldCheck, 
  Clock, 
  Footprints, 
  Zap, 
  Brain, 
  Heart,
  Users,
  Compass,
  FileSpreadsheet
} from 'lucide-react';

interface LandingPageProps {
  onStartDemo: (role: UserRole, targetTab: string) => void;
  onOpenGlossary: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartDemo, onOpenGlossary }) => {
  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 lg:pt-16 lg:pb-20">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Ilmiy-pedagogik raqamli metodik tizim</span>
              </div>
              
              <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
                Raqamli faollik muhiti: <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 bg-clip-text text-transparent">
                  Pedagog talabalar faolligini rivojlantirish platformasi
                </span>
              </h1>

              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                Ushbu platforma shunchaki fitness-treker emas, balki bo'lajak pedagoglarning o'quv va turmush jarayoniga singdirilgan yopiq halqali ilmiy-pedagogik monitoring va refleksiya tizimidir.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onStartDemo('talaba', 'diary')}
                  className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition shadow-lg shadow-emerald-600/30 flex items-center gap-2 group"
                >
                  <span>Talaba demo-rejimini sinab ko'rish</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onStartDemo('oqituvchi', 'teacher')}
                  className="px-5 py-3.5 rounded-xl bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700 font-medium text-sm transition flex items-center gap-2"
                >
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span>O'qituvchi va Tyutor paneli</span>
                </button>
              </div>

              {/* WHO Norm Highlights */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-gray-200/80 dark:border-slate-800">
                <div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-1">
                    <Footprints className="w-4 h-4 text-emerald-500" /> 8 000+
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Kunlik qadamlar</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-1">
                    <Clock className="w-4 h-4 text-teal-500" /> 150-300
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Daq/hafta faol daqiqa</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-1">
                    <Zap className="w-4 h-4 text-amber-500" /> &lt; 60 daq
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Uzluksiz o'tirish me'yori</div>
                </div>
              </div>

            </div>

            {/* Closed Loop Visualization Hero Card */}
            <div className="lg:col-span-5">
              <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 dark:border-slate-700 relative">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100 dark:border-slate-700">
                  <span className="text-xs uppercase font-bold text-emerald-600 dark:text-emerald-400 tracking-wider flex items-center gap-1.5">
                    <RefreshCw className="w-4 h-4 animate-spin text-emerald-500" /> Platformaning Yopiq Halqasi
                  </span>
                  <span className="text-xs text-gray-400">5 ta uzviy bo'g'in</span>
                </div>

                {/* 5-Step Closed Loop Items */}
                <div className="space-y-3">
                  {[
                    { step: '1. MONITORING', text: 'Kunlik qadamlar, faol daqiqalar va o\'tirish davomiyligini tezkor qayd etish.', color: 'bg-blue-500' },
                    { step: '2. TESKARI ALOQA', text: 'Visual grafiklar, rangli indikatorlar va me\'yoriy foizlar qaytariladi.', color: 'bg-emerald-500' },
                    { step: '3. MIKROFAOLLIK', text: 'Darsdagi 2-5 daqiqalik harakat pauzalari bilan tanqislik to\'ldiriladi.', color: 'bg-amber-500' },
                    { step: '4. RAG\'BAT', text: 'Guruh chellenjlari, nishonlar va ijtimoiy e\'tirof taqdim etiladi.', color: 'bg-purple-500' },
                    { step: '5. REFLEKSIYA', text: 'Hafta yakunida profil tahlil qilinadi va +10–15% li yangi maqsad qo\'yiladi.', color: 'bg-rose-500' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                      <div className={`w-2.5 h-2.5 rounded-full ${item.color} mt-1.5 shrink-0`} />
                      <div>
                        <div className="text-xs font-bold text-gray-800 dark:text-gray-200">{item.step}</div>
                        <div className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">{item.text}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-slate-700 text-center">
                  <button
                    onClick={onOpenGlossary}
                    className="text-xs font-medium text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 hover:underline flex items-center justify-center gap-1 mx-auto"
                  >
                    <span>Glossariyni ko'rish</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Crucial Scientific Block: "Why 1-hour evening workout doesn't offset 8 hours sitting" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent rounded-3xl p-6 sm:p-10 border border-amber-200/60 dark:border-amber-900/40">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-500 text-white rounded-2xl shrink-0 shadow-lg shadow-amber-500/20">
              <HelpCircle className="w-7 h-7" />
            </div>
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                Nima uchun kechqurungi bir soatlik mashg'ulot kunlik sakkiz soatlik o'tirishni qoplamaydi?
              </h2>
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                Tadqiqotlar shuni ko'rsatadiki, <strong>uzluksiz o'tirish (sedentary behavior)</strong> va <strong>jismoniy mashg'ulot yetishmasligi</strong> — bu ikki turli mustaqil fiziologik omildir. Kun bo'yi stulda 60 daqiqadan ortiq harakatsiz o'tirish fermentlar (masalan, lipoproteinlinepaza) faolligini to'xtatadi. Kechqurun 1 soat sport zaliga borish ham kun davomida to'plangan tomirlar spazmi va metabolik sekinlashuv asoratini to'liq bartaraf etolmaydi.
              </p>
              <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-amber-300/40 dark:border-amber-800/40 text-xs sm:text-sm font-medium text-amber-900 dark:text-amber-200 flex items-center gap-3">
                <Zap className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>
                  <strong>Yechim:</strong> Har 45–60 daqiqada o'quv mashg'ulotiga va turmush tarziga mikrofaollik pauzalarini singdirish orqali metabolik "uzilish"larni bartaraf etish!
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Activity Levels Model */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            Talaba faolligining to'rt sathi modeli
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Platformada ma'lumotlar yaxlit pedagogik va fiziologik yondashuv asosida ushbu 4 sath kesimida tahlil qilinadi:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "1. O'quv-jarayoniy mikrofaollik",
              desc: "Auditoriya mashg'uloti ichidagi 2-5 daqiqalik gigiyenik, kognitiv va kasbiy harakat pauzalari.",
              icon: Brain,
              color: "text-emerald-500",
              bg: "bg-emerald-50 dark:bg-emerald-950/40"
            },
            {
              title: "2. Mustaqil ta'lim faolligi",
              desc: "Kutubxona, uyda o'qish paytidagi '45+5' rejimi va harakatli tanaffuslar.",
              icon: Zap,
              color: "text-teal-500",
              bg: "bg-teal-50 dark:bg-teal-950/40"
            },
            {
              title: "3. Kampus va transport",
              desc: "OTM bino va auditoriyalari orasida piyoda yurish, liftdan voz kechib zinapoyadan foydalanish.",
              icon: Footprints,
              color: "text-blue-500",
              bg: "bg-blue-50 dark:bg-blue-950/40"
            },
            {
              title: "4. Tiklanish faolligi",
              desc: "7-9 soatlik me'yoriy uyqu, ekran vaqtini nazorat qilish va ruhiy-emotsional tinchlanish.",
              icon: Heart,
              color: "text-rose-500",
              bg: "bg-rose-50 dark:bg-rose-950/40"
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-200"
              >
                <div className={`p-3 rounded-xl w-fit ${item.bg} mb-4`}>
                  <Icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-base mb-2">{item.title}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Project Authors & Scientific Context */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Ilmiy loyiha haqida</span>
              <h3 className="text-2xl font-bold">Pedagogik metodikaning raqamli ta'minoti</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Tadqiqot maqsadi: Bo'lajak pedagoglarda jismoniy faollik madaniyatini shakllantirish, o'tirg'ich xulq-atvor asoratlarini kamaytirish hamda o'quv mashg'ulotlariga mikrofaollik texnologiyalarini didaktik integratsiya qilish.
              </p>
              <div className="pt-2 text-xs text-slate-400 space-y-1">
                <div>• Muassasa: Nizamiy nomidagi TDPU</div>
                <div>• Yo'nalish: Pedagogika ta'lim sohasi</div>
              </div>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-4">
              <h4 className="font-bold text-sm text-emerald-400">Platformadagi Rolga Asoslangan Kirish (RBAC):</h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/50">
                  <span className="font-semibold text-slate-200">Talaba</span>
                  <span className="text-slate-400">Kundalik, haftalik profil, kartochkalar, LMS, esse</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/50">
                  <span className="font-semibold text-slate-200">Fan O'qituvchisi</span>
                  <span className="text-slate-400">Jadval, pauza biriktirish, kuzatuv kartasi</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/50">
                  <span className="font-semibold text-slate-200">Tyutor</span>
                  <span className="text-slate-400">Anonim guruh hisoboti, individual suhbat</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/50">
                  <span className="font-semibold text-slate-200">Kafedra / Admin</span>
                  <span className="text-slate-400">Styudent t-testi, χ² statistikasi, PDF/Excel</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
