import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, CloudRain, Clock, Target, CheckCircle, ChevronRight, Quote, Settings, Calendar, Briefcase, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import CountUp from '../components/CountUp';
import { Link } from 'react-router-dom';

import { useLanguage } from '../contexts/LanguageContext';

export default function Dashboard() {
  const { profile } = useAuth();
  const { t } = useLanguage();
  const [showPrayer, setShowPrayer] = useState(() => localStorage.getItem('ustabasi_prayer') === 'true');

  const togglePrayer = () => {
    const newVal = !showPrayer;
    setShowPrayer(newVal);
    localStorage.setItem('ustabasi_prayer', String(newVal));
  };

  const isUsta = profile?.role === 'usta';

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold">{t('Günaydın')}, {profile?.full_name?.split(' ')[0] || 'Kullanıcı'}! 👋</h1>
          <p className="text-slate-500 mt-1">{t('Bugün harika işler başarmak için yeni bir gün.')}</p>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{t('Bugünkü Kazanç')}</p>
            <p className="text-xl font-bold text-green-600">₺ <CountUp end={1250} /></p>
          </div>
          <div className="w-px bg-slate-200 dark:bg-slate-700"></div>
          <div className="text-right">
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{t('Aktif İşler')}</p>
            <p className="text-xl font-bold text-blue-600"><CountUp end={3} /></p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Column: Weather & Prayer */}
        <div className="space-y-6">
          {/* Weather Widget */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="glass-panel p-5 rounded-3xl relative overflow-hidden group"
          >
            <div className="absolute -right-6 -top-6 text-yellow-400 opacity-20 group-hover:scale-110 transition-transform duration-700">
              <Sun size={120} />
            </div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
                  <Sun size={16} className="text-yellow-500" /> İstanbul, TR
                </div>
                <span className="text-2xl font-bold">24°C</span>
              </div>
              <p className="font-medium text-slate-800 dark:text-slate-200">{t('Güneşli ve Açık')}</p>
              <p className="text-xs text-slate-500 mt-1">{t('Dış mekan işleri ve şantiye çalışmaları için mükemmel bir gün.')}</p>
            </div>
          </motion.div>

          {/* Prayer & Calendar Widget (Opt-in) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="glass-panel p-5 rounded-3xl relative"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold flex items-center gap-2"><Calendar size={18} className="text-blue-500" /> {t('Takvim & Vakitler')}</h3>
              <button onClick={togglePrayer} className="text-slate-400 hover:text-blue-500 transition-colors">
                <Settings size={16} />
              </button>
            </div>
            
            {showPrayer ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl">
                  <span className="text-slate-500">{t('Öğle Vaktine Kalan')}</span>
                  <span className="font-bold text-blue-600 font-mono">02:14:59</span>
                </div>
                <div className="grid grid-cols-5 gap-2 text-center text-xs">
                  <div><p className="text-slate-400 mb-1">{t('İmsak')}</p><p className="font-medium">05:32</p></div>
                  <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg py-1"><p className="text-blue-500 mb-1 font-bold">{t('Güneş')}</p><p className="font-bold text-blue-700 dark:text-blue-300">06:54</p></div>
                  <div><p className="text-slate-400 mb-1">{t('Öğle')}</p><p className="font-medium">13:12</p></div>
                  <div><p className="text-slate-400 mb-1">{t('İkindi')}</p><p className="font-medium">16:45</p></div>
                  <div><p className="text-slate-400 mb-1">{t('Akşam')}</p><p className="font-medium">19:20</p></div>
                </div>
                <div className="text-xs text-center text-slate-500 pt-2 border-t border-slate-200 dark:border-slate-700/50">
                  {t('Ramazan ayına 42 gün kaldı')}
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-sm text-slate-500 mb-3">{t('Namaz vakitleri ve dini gün hatırlatmalarını açmak ister misiniz?')}</p>
                <button onClick={togglePrayer} className="text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors">
                  {t('Aktifleştir')}
                </button>
              </div>
            )}
          </motion.div>
        </div>

        {/* Middle Column: Daily Goals & Live Stats & Job Report */}
        <div className="space-y-6">
          {/* Job Report Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="glass p-6 rounded-3xl border border-blue-100 dark:border-blue-900/30"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold flex items-center gap-2 text-slate-800 dark:text-white"><Briefcase size={18} className="text-blue-500" /> {t('İş Durum Raporum')}</h3>
              <Link to="/jobs" className="text-xs text-blue-600 font-medium hover:underline">{t('Tümünü Gör')}</Link>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-600 dark:text-slate-300">{t('Devam Eden')} (2)</span>
                  <span className="text-blue-600">%60</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-600 dark:text-slate-300">{t('Beklemede / Teklif')} (4)</span>
                  <span className="text-amber-500">%30</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-600 dark:text-slate-300">{t('Tamamlanan')} (12)</span>
                  <span className="text-green-500">%100</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700/50 flex items-start gap-2 bg-blue-50/50 dark:bg-blue-900/10 p-3 rounded-xl">
              <AlertCircle size={16} className="text-blue-500 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-600 dark:text-slate-300">{t("Şişli'deki elektrik tesisatı işi için müşteri sizden onay bekliyor.")}</p>
            </div>
          </motion.div>

          {/* Daily Goals */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="glass p-6 rounded-3xl"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold flex items-center gap-2"><Target size={18} className="text-red-500" /> {t('Günlük Hedefler')}</h3>
              <span className="text-xs font-bold bg-red-100 text-red-600 px-2 py-1 rounded-full">1/3 {t('Tamamlandı')}</span>
            </div>
            
            <div className="space-y-3">
              {[
                { text: isUsta ? t('Bugün 2 yeni ilana teklif ver') : t('Profil bilgilerini eksiksiz doldur'), done: true },
                { text: isUsta ? t('Portfolyona yeni bir fotoğraf ekle') : t('İlk iş ilanını oluştur'), done: false },
                { text: t('Akademi üzerinden 1 eğitim videosu izle'), done: false },
              ].map((goal, i) => (
                <div key={i} className={`flex items-start gap-3 p-3 rounded-xl border transition-colors ${goal.done ? 'bg-green-50/50 dark:bg-green-900/10 border-green-200 dark:border-green-900/30' : 'bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 hover:border-blue-300'}`}>
                  <button className={`mt-0.5 shrink-0 ${goal.done ? 'text-green-500' : 'text-slate-300 hover:text-blue-500 transition-colors'}`}>
                    <CheckCircle size={18} />
                  </button>
                  <span className={`text-sm font-medium ${goal.done ? 'text-slate-500 line-through' : 'text-slate-700 dark:text-slate-200'}`}>{goal.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Live Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="glass-panel p-4 rounded-2xl text-center hover:-translate-y-1 transition-transform duration-300">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mx-auto mb-2"></div>
              <p className="text-3xl font-bold text-slate-800 dark:text-white"><CountUp end={12547} /></p>
              <p className="text-xs text-slate-500 font-medium mt-1">{t('Çevrimiçi Usta')}</p>
            </div>
            <div className="glass-panel p-4 rounded-2xl text-center hover:-translate-y-1 transition-transform duration-300">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse mx-auto mb-2"></div>
              <p className="text-3xl font-bold text-slate-800 dark:text-white"><CountUp end={1243} /></p>
              <p className="text-xs text-slate-500 font-medium mt-1">{t('Aktif İş İlanı')}</p>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Motivation & Quick Actions */}
        <div className="space-y-6">
          {/* Motivation Stream */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="glass p-6 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl relative overflow-hidden"
          >
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <Quote size={100} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4 opacity-80">
                <Quote size={16} />
                <span className="text-xs font-bold uppercase tracking-wider">{t('Günün Motivasyonu')}</span>
              </div>
              <p className="text-lg font-medium leading-relaxed mb-4">
                {t('Ustalık, bir işi sadece bitirmek değil, o işe imzanı atmaktır. Her detayda kaliteni göster.')}
              </p>
              <div className="flex items-center gap-3">
                <img src="https://ui-avatars.com/api/?name=Mimar+Sinan&background=fff&color=000" className="w-8 h-8 rounded-full" />
                <div>
                  <p className="text-xs font-bold">Mimar Sinan</p>
                  <p className="text-[10px] opacity-70">{t('Tarihin En Büyük Ustası')}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="space-y-3"
          >
            <Link to="/jobs" className="flex items-center justify-between p-4 glass-panel rounded-2xl hover:border-blue-400 hover:shadow-md transition-all group">
              <div>
                <h4 className="font-bold text-sm group-hover:text-blue-600 transition-colors">{t('Sana Uygun İşler')}</h4>
                <p className="text-xs text-slate-500">{t('Bölgendeki 5 yeni ilanı incele')}</p>
              </div>
              <ChevronRight size={18} className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
            </Link>
            <Link to="/tv" className="flex items-center justify-between p-4 glass-panel rounded-2xl hover:border-purple-400 hover:shadow-md transition-all group">
              <div>
                <h4 className="font-bold text-sm group-hover:text-purple-600 transition-colors">{t('Ustabaşı TV')}</h4>
                <p className="text-xs text-slate-500">{t('Yeni eğitim videoları eklendi')}</p>
              </div>
              <ChevronRight size={18} className="text-slate-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}