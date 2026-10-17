import React, { useState } from 'react';
import { SupervisorAccount, UserRole } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { 
  ShieldCheck, 
  UserPlus, 
  Trash2, 
  Edit3, 
  Users, 
  Lock, 
  Key, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Filter, 
  Eye, 
  EyeOff, 
  GraduationCap, 
  UserCheck, 
  BarChart3, 
  Sparkles,
  X,
  ExternalLink
} from 'lucide-react';

interface AdminSupervisorManagementProps {
  supervisors: SupervisorAccount[];
  onAddSupervisor: (account: Omit<SupervisorAccount, 'id' | 'yaratilgan_sana'>) => void;
  onUpdateSupervisor: (account: SupervisorAccount) => void;
  onDeleteSupervisor: (id: string) => void;
  onNavigateTab: (tabId: string) => void;
}

export const AdminSupervisorManagement: React.FC<AdminSupervisorManagementProps> = ({
  supervisors,
  onAddSupervisor,
  onUpdateSupervisor,
  onDeleteSupervisor,
  onNavigateTab
}) => {
  const { lang, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSupervisor, setEditingSupervisor] = useState<SupervisorAccount | null>(null);
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});
  const [notice, setNotice] = useState<string | null>(null);

  // Form state for new supervisor
  const [fio, setFio] = useState('');
  const [role, setRole] = useState<UserRole>('oqituvchi');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [lavozim, setLavozim] = useState('');
  const [muassasa, setMuassasa] = useState('Toshkent Davlat Pedagogika Universiteti');
  const [guruhId, setGuruhId] = useState('301-Pedagogika (Tajriba)');

  const togglePasswordVisibility = (id: string) => {
    setVisiblePasswords(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fio.trim() || !login.trim() || !password.trim()) return;

    onAddSupervisor({
      fio: fio.trim(),
      role,
      login: login.trim().toLowerCase(),
      password: password.trim(),
      lavozim: lavozim.trim() || (role === 'oqituvchi' ? "Katta o'qituvchi" : role === 'tyutor' ? 'Guruh tyutori' : 'Kafedra mudiri'),
      muassasa: muassasa.trim(),
      guruh_id: guruhId.trim(),
      status: 'faol'
    });

    setShowAddModal(false);
    setFio('');
    setLogin('');
    setPassword('');
    setLavozim('');
    setNotice(lang === 'ru' ? 'Новый куратор успешно добавлен!' : lang === 'en' ? 'New supervisor added successfully!' : 'Yangi nazoratchi muvaffaqiyatli qo\'shildi!');
    setTimeout(() => setNotice(null), 3500);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSupervisor) return;
    onUpdateSupervisor(editingSupervisor);
    setEditingSupervisor(null);
    setNotice(lang === 'ru' ? 'Данные куратора обновлены!' : lang === 'en' ? 'Supervisor details updated!' : 'Nazoratchi ma\'lumotlari yangilandi!');
    setTimeout(() => setNotice(null), 3500);
  };

  const handleDelete = (sup: SupervisorAccount) => {
    if (sup.role === 'admin' || sup.id === 'sup_admin') {
      alert(lang === 'ru' ? 'Главного администратора удалить нельзя!' : lang === 'en' ? 'Super Admin cannot be deleted!' : 'Bosh administratorni o\'chirib bo\'lmaydi!');
      return;
    }
    const confirmed = window.confirm(
      lang === 'ru' 
        ? `Вы уверены, что хотите удалить куратора ${sup.fio}?` 
        : lang === 'en' 
        ? `Are you sure you want to delete supervisor ${sup.fio}?` 
        : `Haqiqatan ham ${sup.fio} nazoratchisini o'chirmoqchimisiz?`
    );
    if (confirmed) {
      onDeleteSupervisor(sup.id);
      setNotice(lang === 'ru' ? 'Куратор удален из системы!' : lang === 'en' ? 'Supervisor deleted from system!' : 'Nazoratchi tizimdan o\'chirildi!');
      setTimeout(() => setNotice(null), 3500);
    }
  };

  const filteredSupervisors = supervisors.filter(sup => {
    const matchesSearch = sup.fio.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          sup.login.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (sup.lavozim && sup.lavozim.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRole = roleFilter === 'all' || sup.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (r: UserRole) => {
    switch (r) {
      case 'admin':
        return <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-black">👑 Super Admin</span>;
      case 'oqituvchi':
        return <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black">👨‍🏫 O'qituvchi</span>;
      case 'tyutor':
        return <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-black">🧑‍💼 Tyutor</span>;
      case 'kafedra':
        return <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-black">🏛️ Kafedra Mudiri</span>;
      default:
        return <span className="px-3 py-1 rounded-full bg-slate-500/20 text-slate-300 text-xs font-black">Talaba</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      
      {/* Top Banner: Super Admin Brand */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border-2 border-amber-500/40 space-y-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-indigo-800/50 pb-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-black">
              <Sparkles className="w-3.5 h-3.5" />
              <span>👑 Super Administrator & Loyiha Muallifi</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Zulunxo'jayev Marufjon Ma'murjon o'g'li
            </h1>
            <p className="text-xs sm:text-sm text-indigo-200 font-medium max-w-2xl">
              PhD dissertatsiya ilmiy loyihasi doirasida barcha nazoratchilarni (O'qituvchilar, Tyutorlar, Kafedra) boshqarish, yangi hisoblarni qo'shish, o'chirish va barcha modullarni cheklovlarsiz nazorat qilish paneli.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-amber-500/20 transition flex items-center gap-2 shrink-0 cursor-pointer active:scale-95"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ Yangi nazoratchi qo'shish</span>
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-1">
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-slate-400 text-xs font-bold block">Jami nazoratchilar</span>
            <span className="text-2xl font-black text-white">{supervisors.length} ta</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-slate-400 text-xs font-bold block">O'qituvchilar</span>
            <span className="text-2xl font-black text-emerald-400">
              {supervisors.filter(s => s.role === 'oqituvchi').length} ta
            </span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-slate-400 text-xs font-bold block">Guruh Tyutorlari</span>
            <span className="text-2xl font-black text-purple-400">
              {supervisors.filter(s => s.role === 'tyutor').length} ta
            </span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-slate-400 text-xs font-bold block">Kafedra / Boshqaruv</span>
            <span className="text-2xl font-black text-cyan-400">
              {supervisors.filter(s => s.role === 'kafedra' || s.role === 'admin').length} ta
            </span>
          </div>
        </div>

        {/* Quick Module Navigation for Super Admin */}
        <div className="pt-2 border-t border-indigo-800/40">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-300 block mb-2">
            🚀 Super Admin Tezkor Nazorat O'tishlari:
          </span>
          <div className="flex flex-wrap gap-2 text-xs">
            {[
              { id: 'teacher', label: "O'qituvchi Paneli", icon: UserCheck, color: 'text-emerald-300' },
              { id: 'tutor', label: 'Tyutor Hisoboti', icon: BarChart3, color: 'text-purple-300' },
              { id: 'department', label: 'Kafedra Statistikasi', icon: BarChart3, color: 'text-cyan-300' },
              { id: 'cards', label: 'Kartochkalar Banki', icon: Sparkles, color: 'text-amber-300' },
              { id: 'lms', label: 'LMS Kurs Moduli', icon: GraduationCap, color: 'text-teal-300' },
              { id: 'diary', label: 'Talaba Faollik Kundaligi', icon: Users, color: 'text-rose-300' }
            ].map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigateTab(item.id)}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold transition flex items-center gap-1.5"
                >
                  <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                  <span>{item.label}</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {notice && (
        <div className="p-4 rounded-2xl bg-emerald-600 text-white font-black text-sm flex items-center gap-3 shadow-xl animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Ism, login yoki lavozim bo'yicha qidirish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-extrabold text-slate-800 dark:text-slate-200 outline-none cursor-pointer"
          >
            <option value="all">Barcha rollar</option>
            <option value="admin">Super Admin</option>
            <option value="oqituvchi">O'qituvchilar</option>
            <option value="tyutor">Tyutorlar</option>
            <option value="kafedra">Kafedra Mudirlari</option>
          </select>
        </div>
      </div>

      {/* Supervisors List Table & Cards */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden">
        <div className="p-5 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
          <div>
            <h3 className="font-black text-slate-900 dark:text-white text-base">
              Nazoratchilar Akkauntlari Ro'yxati
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Ushbu login va parollar orqali nazoratchilar tizimga kiradi va o'z vazifalarini bajaradi.
            </p>
          </div>
          <span className="text-xs font-extrabold px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
            {filteredSupervisors.length} ta hisob
          </span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-700/80">
          {filteredSupervisors.map((sup) => {
            const isPasswordVisible = !!visiblePasswords[sup.id];
            const isSuperAdmin = sup.role === 'admin' || sup.id === 'sup_admin';

            return (
              <div 
                key={sup.id} 
                className={`p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition hover:bg-slate-50/80 dark:hover:bg-slate-750 ${
                  isSuperAdmin ? 'bg-amber-500/5 dark:bg-amber-500/10' : ''
                }`}
              >
                {/* User Info */}
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-white shrink-0 shadow-md ${
                    sup.role === 'admin' ? 'bg-amber-500 shadow-amber-500/30' :
                    sup.role === 'oqituvchi' ? 'bg-emerald-600 shadow-emerald-600/30' :
                    sup.role === 'tyutor' ? 'bg-purple-600 shadow-purple-600/30' : 'bg-cyan-600 shadow-cyan-600/30'
                  }`}>
                    {sup.fio.charAt(0)}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-black text-sm text-slate-900 dark:text-white">
                        {sup.fio}
                      </span>
                      {getRoleBadge(sup.role)}
                      {sup.status === 'faol' ? (
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                          ● Faol
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                          Nofaol
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-slate-600 dark:text-slate-400 font-semibold flex flex-wrap items-center gap-3">
                      <span>🏛️ {sup.lavozim || 'Nazoratchi'}</span>
                      {sup.guruh_id && <span>👥 {sup.guruh_id}</span>}
                    </div>
                  </div>
                </div>

                {/* Login & Password info */}
                <div className="flex flex-wrap items-center gap-3 bg-slate-100 dark:bg-slate-900/90 p-3 rounded-2xl border border-slate-200 dark:border-slate-700/80">
                  <div className="text-xs">
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase block">Login</span>
                    <code className="font-mono font-bold text-slate-900 dark:text-white px-1.5 py-0.5 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
                      {sup.login}
                    </code>
                  </div>

                  <div className="text-xs">
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase block">Parol</span>
                    <div className="flex items-center gap-1.5 font-mono font-bold text-slate-900 dark:text-white px-1.5 py-0.5 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
                      <span>{isPasswordVisible ? sup.password : '••••••••'}</span>
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility(sup.id)}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-white ml-1 cursor-pointer"
                        title={isPasswordVisible ? 'Yashirish' : 'Ko\'rsatish'}
                      >
                        {isPasswordVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Actions: Edit & Delete */}
                  <div className="flex items-center gap-1 pl-2 border-l border-slate-200 dark:border-slate-700">
                    <button
                      type="button"
                      onClick={() => setEditingSupervisor(sup)}
                      className="p-2 rounded-xl text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 transition"
                      title="Tahrirlash"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    {!isSuperAdmin && (
                      <button
                        type="button"
                        onClick={() => handleDelete(sup)}
                        className="p-2 rounded-xl text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                        title="O'chirish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Modal 1: Add New Supervisor */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-2 border-slate-200 dark:border-slate-800 space-y-5 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-amber-500" />
                <span>Yangi Nazoratchi Qo'shish</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs font-bold">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-1">
                  F.I.O. (Ism, Familiya va Sharifi): <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Dotsent Alisher Qodirov"
                  value={fio}
                  onChange={(e) => setFio(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-sm font-extrabold text-slate-900 dark:text-white outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1">
                    Nazoratchi Roli: <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-xs font-extrabold text-slate-900 dark:text-white outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="oqituvchi">👨‍🏫 O'qituvchi</option>
                    <option value="tyutor">🧑‍💼 Guruh Tyutori</option>
                    <option value="kafedra">🏛️ Kafedra Mudiri</option>
                    <option value="admin">👑 Super Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1">
                    Lavozimi:
                  </label>
                  <input
                    type="text"
                    placeholder="Masalan: Katta o'qituvchi"
                    value={lavozim}
                    onChange={(e) => setLavozim(e.target.value)}
                    className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-xs font-extrabold text-slate-900 dark:text-white outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1">
                    Login (Tizimga kirish uchun): <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="alisher_oqituvchi"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-xs font-mono font-extrabold text-slate-900 dark:text-white outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1">
                    Parol: <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="alisher2026"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-xs font-mono font-extrabold text-slate-900 dark:text-white outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-1">
                  Biriktirilgan Guruh / Kafedra:
                </label>
                <input
                  type="text"
                  placeholder="301-Pedagogika (Tajriba)"
                  value={guruhId}
                  onChange={(e) => setGuruhId(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-xs font-extrabold text-slate-900 dark:text-white outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-extrabold"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black shadow-lg shadow-amber-500/20"
                >
                  Saqlash va Ruxsat Berish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Edit Supervisor */}
      {editingSupervisor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-2 border-slate-200 dark:border-slate-800 space-y-5 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-indigo-600" />
                <span>Nazoratchini Tahrirlash</span>
              </h3>
              <button
                type="button"
                onClick={() => setEditingSupervisor(null)}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4 text-xs font-bold">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-1">F.I.O.:</label>
                <input
                  type="text"
                  required
                  value={editingSupervisor.fio}
                  onChange={(e) => setEditingSupervisor({ ...editingSupervisor, fio: e.target.value })}
                  className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-sm font-extrabold text-slate-900 dark:text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1">Roli:</label>
                  <select
                    value={editingSupervisor.role}
                    onChange={(e) => setEditingSupervisor({ ...editingSupervisor, role: e.target.value as UserRole })}
                    className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-xs font-extrabold text-slate-900 dark:text-white outline-none cursor-pointer"
                  >
                    <option value="oqituvchi">👨‍🏫 O'qituvchi</option>
                    <option value="tyutor">🧑‍💼 Guruh Tyutori</option>
                    <option value="kafedra">🏛️ Kafedra Mudiri</option>
                    <option value="admin">👑 Super Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1">Holat:</label>
                  <select
                    value={editingSupervisor.status}
                    onChange={(e) => setEditingSupervisor({ ...editingSupervisor, status: e.target.value as 'faol' | 'nofaol' })}
                    className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-xs font-extrabold text-slate-900 dark:text-white outline-none cursor-pointer"
                  >
                    <option value="faol">● Faol (Kirish mumkin)</option>
                    <option value="nofaol">○ Nofaol (Bloklangan)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1">Login:</label>
                  <input
                    type="text"
                    required
                    value={editingSupervisor.login}
                    onChange={(e) => setEditingSupervisor({ ...editingSupervisor, login: e.target.value.toLowerCase() })}
                    className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-xs font-mono font-extrabold text-slate-900 dark:text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1">Parol:</label>
                  <input
                    type="text"
                    required
                    value={editingSupervisor.password}
                    onChange={(e) => setEditingSupervisor({ ...editingSupervisor, password: e.target.value })}
                    className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-xs font-mono font-extrabold text-slate-900 dark:text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-1">Guruh / Kafedra:</label>
                <input
                  type="text"
                  value={editingSupervisor.guruh_id || ''}
                  onChange={(e) => setEditingSupervisor({ ...editingSupervisor, guruh_id: e.target.value })}
                  className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-xs font-extrabold text-slate-900 dark:text-white outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingSupervisor(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-extrabold"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black shadow-lg shadow-indigo-600/30"
                >
                  O'zgarishlarni Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
