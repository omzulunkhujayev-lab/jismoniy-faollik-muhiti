import React from 'react';
import { UserRole } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { 
  Activity, 
  RefreshCw, 
  ArrowRight, 
  HelpCircle, 
  ShieldCheck, 
  Clock, 
  Footprints, 
  Zap, 
  Brain, 
  Heart,
  Users,
  GraduationCap
} from 'lucide-react';

interface LandingPageProps {
  onStartDemo: (role: UserRole, targetTab: string) => void;
  onOpenGlossary: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartDemo, onOpenGlossary }) => {
  const { t, lang } = useLanguage();

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
                <span>{t('heroBadge')}</span>
              </div>
              
              <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
                {t('heroTitle')} <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 bg-clip-text text-transparent">
                  {t('heroSubtitle')}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                {t('heroDesc')}
              </p>

              {/* Author Dissertation Card - Enhanced Academic Showcase */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50/90 via-teal-50/80 to-indigo-50/90 dark:from-slate-800 dark:via-slate-800 dark:to-indigo-950/40 border-2 border-emerald-500/40 dark:border-emerald-500/30 flex items-start gap-4 max-w-2xl text-xs sm:text-sm shadow-md">
                <div className="p-3 rounded-2xl bg-emerald-600 text-white shrink-0 shadow-lg shadow-emerald-600/30">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-extrabold text-[11px] uppercase tracking-wider">
                    {t('authorTitle')}
                  </div>
                  <div className="text-slate-900 dark:text-white font-bold leading-snug text-sm sm:text-base">
                    {t('authorNotice')}
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-300 font-medium">
                    {lang === 'ru' 
                      ? 'Научно-педагогическая цифровая среда мониторинга и формирования двигательной активности будущих педагогов.' 
                      : lang === 'en' 
                      ? 'Scientific-pedagogical digital environment for monitoring and developing physical activity of future educators.' 
                      : 'Bo\'lajak pedagoglarning jismoniy faolligini monitoring qilish va rivojlantirishning ilmiy-pedagogik raqamli muhiti.'}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onStartDemo('talaba', 'diary')}
                  className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition shadow-lg shadow-emerald-600/30 flex items-center gap-2 group"
                >
                  <span>{t('btnDemoStudent')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onStartDemo('oqituvchi', 'teacher')}
                  className="px-5 py-3.5 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 border-2 border-slate-200 dark:border-slate-700 font-bold text-sm transition flex items-center gap-2 shadow-sm"
                >
                  <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{t('btnTeacherPanel')}</span>
                </button>
              </div>

              {/* WHO Norm Highlights */}
              <div className="pt-4 grid grid-cols-3 gap-3 sm:gap-4 border-t border-slate-200 dark:border-slate-800">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
                  <div className="text-base sm:text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Footprints className="w-4 h-4 text-emerald-500" /> 8 000+
                  </div>
                  <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 mt-0.5">{t('normSteps')}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
                  <div className="text-base sm:text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-teal-500" /> 150-300
                  </div>
                  <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 mt-0.5">{t('normActiveMins')}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
                  <div className="text-base sm:text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-amber-500" /> &lt; 60 daq
                  </div>
                  <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 mt-0.5">{t('normSitting')}</div>
                </div>
              </div>

            </div>

            {/* Closed Loop Visualization Hero Card */}
            <div className="lg:col-span-5">
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-slate-200/80 dark:border-slate-700 relative">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-slate-700">
                  <span className="text-xs uppercase font-extrabold text-emerald-600 dark:text-emerald-400 tracking-wider flex items-center gap-1.5">
                    <RefreshCw className="w-4 h-4 animate-spin text-emerald-500" /> {t('closedLoopTitle')}
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">{t('closedLoopDesc')}</span>
                </div>

                {/* 5-Step Closed Loop Items */}
                <div className="space-y-3">
                  {[
                    { step: t('step1Title'), text: t('step1Desc'), color: 'bg-blue-600 text-blue-600' },
                    { step: t('step2Title'), text: t('step2Desc'), color: 'bg-emerald-600 text-emerald-600' },
                    { step: t('step3Title'), text: t('step3Desc'), color: 'bg-amber-600 text-amber-600' },
                    { step: t('step4Title'), text: t('step4Desc'), color: 'bg-purple-600 text-purple-600' },
                    { step: t('step5Title'), text: t('step5Desc'), color: 'bg-rose-600 text-rose-600' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 transition hover:bg-slate-100 dark:hover:bg-slate-900">
                      <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-center text-xs font-extrabold shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <div>
                        <div className="text-xs font-extrabold text-slate-900 dark:text-white">{item.step}</div>
                        <div className="text-xs text-slate-600 dark:text-slate-300 leading-snug mt-0.5 font-medium">{item.text}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 text-center">
                  <button
                    onClick={onOpenGlossary}
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 hover:underline flex items-center justify-center gap-1.5 mx-auto"
                  >
                    <span>{t('glossary')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4 Activity Levels Model */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {lang === 'ru' ? '4 ключевых направления двигательной активности' : lang === 'en' ? '4 Core Pillars of Physical Activity' : 'Jismoniy faollikning 4 ta asosiy yo\'nalishi'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
            {lang === 'ru' ? 'Комплексная модель интеграции активности в учебный процесс и образ жизни студента' : lang === 'en' ? 'Integrated model incorporating activity into student study process and lifestyle' : 'Talabaning o\'quv jarayoni va turmush tarziga faollikni singdirishning kompleks modeli'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: lang === 'ru' ? "1. Учебно-процессная микроактивность" : lang === 'en' ? "1. Academic-Process Microactivity" : "1. O'quv-jarayoniy mikrofaollik",
              desc: lang === 'ru' ? "2-5 минутные восстановительные, когнитивные и методические паузы прямо во время пар." : lang === 'en' ? "2-5 minute restorative, cognitive, and methodic pauses right inside the classroom." : "Auditoriya mashg'uloti ichidagi 2-5 daqiqalik gigiyenik, kognitiv va kasbiy harakat pauzalari.",
              icon: Brain,
              color: "text-emerald-600 dark:text-emerald-400",
              bg: "bg-emerald-100 dark:bg-emerald-950/60"
            },
            {
              title: lang === 'ru' ? "2. Активность при самостоятельной работе" : lang === 'en' ? "2. Independent Study Activity" : "2. Mustaqil ta'lim faolligi",
              desc: lang === 'ru' ? "Режим «45+5» при занятиях в библиотеке, дома и активные перерывы между заданиями." : lang === 'en' ? "'45+5' study routine in libraries, at home, and active breaks between assignments." : "Kutubxona, uyda o'qish paytidagi '45+5' rejimi va harakatli tanaffuslar.",
              icon: Zap,
              color: "text-teal-600 dark:text-teal-400",
              bg: "bg-teal-100 dark:bg-teal-950/60"
            },
            {
              title: lang === 'ru' ? "3. Кампусная и транспортная активность" : lang === 'en' ? "3. Campus and Transit Activity" : "3. Kampus va transport",
              desc: lang === 'ru' ? "Пешие переходы между корпусами, отказ от лифта в пользу лестниц и пешие прогулки." : lang === 'en' ? "Walking between university buildings, using stairs instead of elevators, and campus walking." : "OTM bino va auditoriyalari orasida piyoda yurish, liftdan voz kechib zinapoyadan foydalanish.",
              icon: Footprints,
              color: "text-blue-600 dark:text-blue-400",
              bg: "bg-blue-100 dark:bg-blue-950/60"
            },
            {
              title: lang === 'ru' ? "4. Восстановительная активность" : lang === 'en' ? "4. Restorative Activity" : "4. Tiklanish faolligi",
              desc: lang === 'ru' ? "7-9 часов полноценного сна, контроль экранного времени и психологическая релаксация." : lang === 'en' ? "7-9 hours of healthy sleep, screen-time regulation, and emotional decompression." : "7-9 soatlik me'yoriy uyqu, ekran vaqtini nazorat qilish va ruhiy-emotsional tinchlanish.",
              icon: Heart,
              color: "text-rose-600 dark:text-rose-400",
              bg: "bg-rose-100 dark:bg-rose-950/60"
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-3xl bg-white dark:bg-slate-800 border-2 border-slate-200/80 dark:border-slate-700 shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className={`p-3.5 rounded-2xl w-fit ${item.bg} mb-4`}>
                    <Icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
