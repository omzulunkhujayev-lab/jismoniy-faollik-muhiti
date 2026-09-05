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
  const { t } = useLanguage();

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

              {/* Author Dissertation Card */}
              <div className="p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 flex items-start gap-3.5 max-w-2xl text-xs sm:text-sm">
                <div className="p-2.5 rounded-xl bg-indigo-600 text-white shrink-0 shadow-md">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <div className="font-bold text-indigo-900 dark:text-indigo-200">
                    {t('authorTitle')}
                  </div>
                  <div className="text-gray-700 dark:text-gray-300 leading-snug font-medium">
                    {t('authorNotice')}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onStartDemo('talaba', 'diary')}
                  className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition shadow-lg shadow-emerald-600/30 flex items-center gap-2 group"
                >
                  <span>{t('btnDemoStudent')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onStartDemo('oqituvchi', 'teacher')}
                  className="px-5 py-3.5 rounded-xl bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700 font-medium text-sm transition flex items-center gap-2"
                >
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span>{t('btnTeacherPanel')}</span>
                </button>
              </div>

              {/* WHO Norm Highlights */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-gray-200/80 dark:border-slate-800">
                <div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-1">
                    <Footprints className="w-4 h-4 text-emerald-500" /> 8 000+
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{t('normSteps')}</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-1">
                    <Clock className="w-4 h-4 text-teal-500" /> 150-300
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{t('normActiveMins')}</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-1">
                    <Zap className="w-4 h-4 text-amber-500" /> &lt; 60 daq
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{t('normSitting')}</div>
                </div>
              </div>

            </div>

            {/* Closed Loop Visualization Hero Card */}
            <div className="lg:col-span-5">
              <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 dark:border-slate-700 relative">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100 dark:border-slate-700">
                  <span className="text-xs uppercase font-bold text-emerald-600 dark:text-emerald-400 tracking-wider flex items-center gap-1.5">
                    <RefreshCw className="w-4 h-4 animate-spin text-emerald-500" /> {t('closedLoopTitle')}
                  </span>
                  <span className="text-xs text-gray-400">{t('closedLoopDesc')}</span>
                </div>

                {/* 5-Step Closed Loop Items */}
                <div className="space-y-3">
                  {[
                    { step: t('step1Title'), text: t('step1Desc'), color: 'bg-blue-500' },
                    { step: t('step2Title'), text: t('step2Desc'), color: 'bg-emerald-500' },
                    { step: t('step3Title'), text: t('step3Desc'), color: 'bg-amber-500' },
                    { step: t('step4Title'), text: t('step4Desc'), color: 'bg-purple-500' },
                    { step: t('step5Title'), text: t('step5Desc'), color: 'bg-rose-500' },
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
                    <span>{t('glossary')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4 Activity Levels Model */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
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

    </div>
  );
};
