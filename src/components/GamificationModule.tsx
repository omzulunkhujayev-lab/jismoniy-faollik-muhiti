import React, { useState } from 'react';
import { Badge, Challenge } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { 
  Trophy, 
  Award, 
  Users, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Footprints, 
  Zap, 
  Moon,
  Flame,
  ArrowRight
} from 'lucide-react';

interface GamificationModuleProps {
  badges: Badge[];
  challenge: Challenge;
}

export const GamificationModule: React.FC<GamificationModuleProps> = ({ badges, challenge }) => {
  const { t, lang } = useLanguage();
  const [activeGamTab, setActiveGamTab] = useState<'challenge' | 'rules' | 'badges'>('challenge');

  // 5 Rules checklist state
  const [rulesCheck, setRulesCheck] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: false,
    5: true
  });

  const toggleRule = (id: number) => {
    setRulesCheck(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const activeRulesCount = Object.values(rulesCheck).filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-4 border border-amber-500/40">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-amber-500/40 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold mb-2">
              <Trophy className="w-3.5 h-3.5 text-amber-300" /> {t('tabGamification')}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {t('gamTitle')}
            </h1>
            <p className="text-amber-100 text-xs sm:text-sm mt-1 max-w-3xl">
              {t('gamSub')}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md text-right border border-white/20">
              <div className="text-[10px] uppercase font-bold text-amber-200">{lang === 'ru' ? 'Активные бейджи' : lang === 'en' ? 'Active Badges' : 'Faol Nishonlar'}</div>
              <div className="text-lg font-extrabold text-white">
                {badges.filter(b => b.olindi).length} / {badges.length}
              </div>
            </div>
          </div>
        </div>

        {/* Gamification Sub-Nav */}
        <div className="flex items-center gap-2 pt-2">
          {[
            { id: 'challenge', label: t('gamTab1'), icon: Users },
            { id: 'rules', label: t('gamTab2'), icon: Flame },
            { id: 'badges', label: t('gamTab3'), icon: Award },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeGamTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveGamTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                  isActive
                    ? 'bg-white text-amber-900 shadow-lg font-extrabold'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* SECTION 1: «Guruh qadami» Challenge */}
      {activeGamTab === 'challenge' && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-slate-700 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 dark:border-slate-700 pb-4">
            <div>
              <span className="text-xs uppercase font-extrabold text-amber-600 dark:text-amber-400">
                {lang === 'ru' ? '2-Недельный групповой челлендж' : lang === 'en' ? '2-Week Group Challenge' : '2-Haftalik guruhiy chellenj'}
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white mt-1">
                {lang === 'ru' ? 'Шаг группы — Осенний турнир активности' : lang === 'en' ? 'Group Step — Autumn Activity Tournament' : challenge.nomi}
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-bold text-xs">
              ⚡ {lang === 'ru' ? 'В процессе (Активен)' : lang === 'en' ? 'In Progress (Active)' : 'Jarayonda (Aktiv)'}
            </span>
          </div>

          {/* Rules info alert */}
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs space-y-2">
            <span className="font-extrabold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              {lang === 'ru' ? 'Строгие педагогические правила геймификации:' : lang === 'en' ? 'Strict pedagogical rules of gamification:' : 'Gamifikatsiyaning qat\'iy pedagogik qoidalari:'}
            </span>
            <ul className="list-disc pl-5 text-amber-950 dark:text-amber-300 space-y-1">
              {challenge.qoidalar.map((rule, idx) => {
                let ruleText = rule;
                if (lang === 'ru') {
                  if (idx === 0) ruleText = "Соревнование длится 2 недели.";
                  if (idx === 1) ruleText = "Результаты оцениваются по средним дневным шагам группы (чтобы не выделять слабых участников).";
                  if (idx === 2) ruleText = "Поощрение не материальное, а в форме грамоты признания кафедры.";
                  if (idx === 3) ruleText = "По завершении челленджа система автоматически переводит в режим личной рефлексии.";
                } else if (lang === 'en') {
                  if (idx === 0) ruleText = "Competition lasts for 2 weeks.";
                  if (idx === 1) ruleText = "Results are evaluated by daily group average steps (to prevent singling out weaker participants).";
                  if (idx === 2) ruleText = "Incentive is strictly non-monetary, in the form of a department recognition award.";
                  if (idx === 3) ruleText = "Upon challenge completion, the system automatically transitions to personal reflection mode.";
                }
                return <li key={idx}>{ruleText}</li>;
              })}
            </ul>
          </div>

          {/* Group Standings Leaderboard */}
          <div className="space-y-4">
            <h3 className="font-bold text-base text-gray-900 dark:text-white">
              {lang === 'ru' 
                ? 'Рейтинг групп по средним дневным шагам (Групповой формат):' 
                : lang === 'en' 
                ? 'Group daily average step standings (Group format):' 
                : 'Guruhlar bo\'yicha kunlik o\'rtacha qadamlar reytingi (Guruhiy format):'}
            </h3>

            <div className="space-y-3">
              {challenge.guruh_natijasi?.map((item, idx) => {
                let gName = item.guruh_nomi;
                if (lang === 'ru') {
                  gName = gName.replace('(Tajriba)', '(Экспериментальная)').replace('(Nazorat)', '(Контрольная)');
                } else if (lang === 'en') {
                  gName = gName.replace('(Tajriba)', '(Experimental)').replace('(Nazorat)', '(Control)');
                }

                return (
                  <div 
                    key={idx}
                    className={`p-4 rounded-2xl border flex items-center justify-between transition ${
                      idx === 0
                        ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 shadow-md'
                        : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-xl font-extrabold text-sm flex items-center justify-center ${
                        idx === 0 ? 'bg-amber-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}>
                        #{idx + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-gray-900 dark:text-white">{gName}</h4>
                        <span className="text-[11px] text-gray-500">
                          {lang === 'ru' ? 'Групповая средняя активность' : lang === 'en' ? 'Group average activity' : 'Guruhiy o\'rtacha faollik'}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-extrabold text-amber-600 dark:text-amber-400">
                        {item.ortacha_qadam.toLocaleString()} {lang === 'ru' ? 'шагов' : lang === 'en' ? 'steps' : 'qadam'}
                      </div>
                      <span className="text-[10px] text-gray-400 font-medium">
                        {lang === 'ru' ? 'среднесуточный' : lang === 'en' ? 'daily average' : 'kunlik o\'rtacha'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: «Faol hafta» 5 rules */}
      {activeGamTab === 'rules' && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-slate-700 shadow-xl space-y-6">
          <div className="flex justify-between items-center border-b border-gray-100 dark:border-slate-700 pb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {lang === 'ru' ? '5 простых правил «Активной недели»' : lang === 'en' ? '5 Simple Rules of "Active Week"' : '«Faol hafta» 5 oddiy qoidasi'}
              </h2>
              <p className="text-xs text-gray-500">
                {lang === 'ru' ? 'Чек-лист формирования ежедневных привычек движения' : lang === 'en' ? 'Daily movement habit formation checklist' : 'Kunlik harakat odatlarini shakllantirish chek-listi'}
              </p>
            </div>
            <div className="px-4 py-2 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-extrabold text-xs">
              {activeRulesCount} / 5 {lang === 'ru' ? 'выполнено' : lang === 'en' ? 'completed' : 'qoida bajarildi'}
            </div>
          </div>

          <div className="space-y-3">
            {[
              { 
                id: 1, 
                text: lang === 'ru' ? 'Проходить 6 000+ шагов в день' : lang === 'en' ? 'Walk 6,000+ steps per day' : 'Kuniga 6 000+ qadam bosish', 
                icon: Footprints 
              },
              { 
                id: 2, 
                text: lang === 'ru' ? 'Выполнять микропаузу активности каждые 45 минут' : lang === 'en' ? 'Perform 1 microactivity pause every 45 minutes' : 'Har 45 daqiqada 1 marta mikrofaollik pauzasini bajarish', 
                icon: Zap 
              },
              { 
                id: 3, 
                text: lang === 'ru' ? 'Пользоваться лестницей вместо лифта в здании ВУЗа' : lang === 'en' ? 'Use stairs instead of elevator in university building' : 'OTM binosida liftdan voz kechib zinapoyadan foydalanish', 
                icon: Trophy 
              },
              { 
                id: 4, 
                text: lang === 'ru' ? 'Гулять на свежем воздухе не менее 30 минут в день' : lang === 'en' ? 'Walk outdoors for at least 30 minutes daily' : 'Kuniga kamida 30 daqiqa ochiq havoda piyoda yurish', 
                icon: Clock 
              },
              { 
                id: 5, 
                text: lang === 'ru' ? 'Отключать экран и смартфон за 1 час до сна' : lang === 'en' ? 'Turn off screens and smartphone 1 hour before sleep' : 'Yotishdan 1 soat oldin ekran va smartfonni o\'chirish', 
                icon: Moon 
              },
            ].map((rule) => {
              const Icon = rule.icon;
              const isChecked = rulesCheck[rule.id];

              return (
                <div
                  key={rule.id}
                  onClick={() => toggleRule(rule.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                    isChecked
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${isChecked ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-xs font-bold ${isChecked ? 'text-emerald-900 dark:text-emerald-200' : 'text-gray-700 dark:text-gray-300'}`}>
                      {rule.id}. {rule.text}
                    </span>
                  </div>

                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                    isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-gray-300'
                  }`}>
                    {isChecked && <CheckCircle2 className="w-4 h-4" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 3: Badges */}
      {activeGamTab === 'badges' && (
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-slate-700 shadow-xl space-y-6">
          <div className="border-b border-gray-100 dark:border-slate-700 pb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {lang === 'ru' ? 'Педагогические бейджи и социальное признание' : lang === 'en' ? 'Pedagogical Badges & Social Recognition' : 'Pedagogik Nishonlar (Badges) va E\'tirof'}
            </h2>
            <p className="text-xs text-gray-500">
              {lang === 'ru' ? 'Коллекция бейджей социального признания' : lang === 'en' ? 'Collection of social recognition badges' : 'Ijtimoiy e\'tirof nishonlari to\'plami'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {badges.map((badge) => {
              let bName = badge.nomi;
              let bDesc = badge.shart;

              if (lang === 'ru') {
                if (badge.id === 'badge_1') { bName = "Первопроходец активности"; bDesc = "Выполнение первых 7 дней мониторинга"; }
                if (badge.id === 'badge_2') { bName = "Нейтрализатор разрывов"; bDesc = "Нейтрализация 5 красных зон за неделю"; }
                if (badge.id === 'badge_3') { bName = "Мастер методики"; bDesc = "Проведение 10 физкультпауз на занятиях"; }
                if (badge.id === 'badge_4') { bName = "Опора группы"; bDesc = "100% регулярность в групповом челлендже"; }
              } else if (lang === 'en') {
                if (badge.id === 'badge_1') { bName = "Activity Pioneer"; bDesc = "Completing the first 7 days of monitoring"; }
                if (badge.id === 'badge_2') { bName = "Gap Neutralizer"; bDesc = "Neutralizing 5 red zones in a week"; }
                if (badge.id === 'badge_3') { bName = "Methodological Master"; bDesc = "Conducting 10 classroom microactivity pauses"; }
                if (badge.id === 'badge_4') { bName = "Group Pillar"; bDesc = "100% regularity in group challenge"; }
              }

              return (
                <div
                  key={badge.id}
                  className={`p-6 rounded-3xl border text-center space-y-3 transition ${
                    badge.olindi
                      ? 'bg-gradient-to-b from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-900 border-amber-300 dark:border-amber-700/80 shadow-lg'
                      : 'bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-60 grayscale'
                  }`}
                >
                  <div className="text-4xl">{badge.ikonka}</div>
                  <h4 className="font-extrabold text-sm text-gray-900 dark:text-white">{bName}</h4>
                  <p className="text-[11px] text-gray-500 leading-tight">{bDesc}</p>
                  {badge.olindi ? (
                    <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-[10px]">
                      ✓ {lang === 'ru' ? 'Получен' : lang === 'en' ? 'Earned' : 'Olindi'} ({badge.sana})
                    </span>
                  ) : (
                    <span className="inline-block px-2.5 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 text-[10px]">
                      {lang === 'ru' ? 'Заблокирован' : lang === 'en' ? 'Locked' : 'Qulflangan'}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
