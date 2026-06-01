import { motion } from 'framer-motion';
import { ArrowRight, Search, Star, Users, Briefcase, MapPin, Zap, ShieldCheck, ChevronRight, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import Dashboard from './Dashboard';
import CountUp from '../components/CountUp';

export default function Home() {
  const { user } = useAuth();
  const { t } = useLanguage();

  // If user is logged in, show the personalized dashboard
  if (user) {
    return <Dashboard />;
  }

  const categories = [
    { name: t('Elektrik'), icon: '⚡️', count: `1.2k ${t('Usta')}` },
    { name: t('Tesisat'), icon: '🔧', count: `980 ${t('Usta')}` },
    { name: t('Boya & Badana'), icon: '🎨', count: `850 ${t('Usta')}` },
    { name: t('Kaba İnşaat'), icon: '🧱', count: `640 ${t('Usta')}` },
    { name: t('Mobilya'), icon: '🪵', count: `520 ${t('Usta')}` },
    { name: t('İklimlendirme'), icon: '❄️', count: `410 ${t('Usta')}` },
    { name: t('Otomotiv'), icon: '🚗', count: `380 ${t('Usta')}` },
    { name: t('Akıllı Ev'), icon: '🏠', count: `290 ${t('Usta')}` },
  ];

  const featuredJobs = [
    { id: 1, title: 'Komple Daire Elektrik Tesisatı', company: 'Ayşe K.', location: 'Kadıköy, İstanbul', price: '₺15.000', tags: [t('Acil'), t('Malzemeli')], type: t('Elektrik') },
    { id: 2, title: 'Banyo Fayans ve Tesisat Yenileme', company: 'Mega İnşaat', location: 'Şişli, İstanbul', price: '₺25.000', tags: [t('Proje'), t('Taşeron')], type: t('Tesisat') },
    { id: 3, title: 'Kombi Bakım ve Petek Temizliği', company: 'Mehmet B.', location: 'Nilüfer, Bursa', price: '₺1.500', tags: [t('Günlük'), t('Hızlı')], type: t('İklimlendirme') },
  ];

  const topMasters = [
    { name: 'Ahmet Yılmaz', role: 'Kıdemli Elektrik Ustası', rating: 4.9, reviews: 124, image: 'https://ui-avatars.com/api/?name=Ahmet+Yilmaz&background=random' },
    { name: 'Veli Demir', role: 'Sıhhi Tesisat Uzmanı', rating: 4.8, reviews: 89, image: 'https://ui-avatars.com/api/?name=Veli+Demir&background=random' },
    { name: 'Can İnşaat', role: 'Kurumsal Firma', rating: 5.0, reviews: 42, image: 'https://ui-avatars.com/api/?name=Can+Insaat&background=random' },
    { name: 'Kemal Usta', role: 'İç Mekan Boya', rating: 4.7, reviews: 156, image: 'https://ui-avatars.com/api/?name=Kemal+Usta&background=random' },
  ];

  return (
    <div className="space-y-24 relative pb-20">
      {/* Subtle background particles (CSS driven) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[10%] left-[10%] w-72 h-72 bg-blue-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-[20%] right-[10%] w-72 h-72 bg-purple-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[40%] left-[40%] w-72 h-72 bg-cyan-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-10 pb-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto space-y-8 flex flex-col items-center"
        >
          <img src="/uploads/upload_1.png" alt="Ustabaşı Logo" className="h-24 md:h-32 object-contain mb-2 drop-shadow-2xl rounded-2xl" onError={(e) => { e.currentTarget.style.display = 'none' }} />
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm font-medium text-blue-600 dark:text-blue-400 mb-4 hover:shadow-lg transition-shadow cursor-default">
            <Star size={16} className="animate-pulse" /> {t("Türkiye'nin En Büyük Ustalık Ekosistemi")}
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
            {t("İş Verenler ve Ustalar")} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500">{t("Aynı Platformda")}</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            {t("Aradığın yeteneği bul, işini büyüt veya ustalık becerilerini sergileyerek yeni fırsatlar yakala. Güvenli ödeme, yapay zeka desteği ve güçlü topluluk.")}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link to="/jobs" className="glass-button w-full sm:w-auto flex items-center justify-center gap-2 text-lg px-8 py-4">
              {t("İş İlanlarına Göz At")} <ArrowRight size={20} />
            </Link>
            <Link to="/register" className="w-full sm:w-auto px-8 py-4 rounded-xl glass-panel font-medium hover:bg-white/80 dark:hover:bg-slate-800/80 hover:shadow-lg transition-all text-lg border border-slate-200 dark:border-slate-700">
              {t("Usta Olarak Katıl")}
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Search Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
        className="max-w-4xl mx-auto glass rounded-2xl p-4 flex flex-col md:flex-row gap-4 shadow-xl hover:shadow-2xl transition-shadow duration-500 relative z-10"
      >
        <div className="flex-1 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-blue-500 transition-colors" size={20} />
          <input type="text" placeholder={t("Meslek, beceri veya usta ara...")} className="glass-input pl-12 border-none bg-transparent shadow-none" />
        </div>
        <div className="w-px bg-slate-200 dark:bg-slate-700 hidden md:block"></div>
        <div className="flex-1 relative group">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-blue-500 transition-colors" size={20} />
          <input type="text" placeholder={t("Şehir veya ilçe")} className="glass-input pl-12 border-none bg-transparent shadow-none" />
        </div>
        <button className="glass-button md:w-auto w-full px-8">{t("Ara")}</button>
      </motion.div>

      {/* Live Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {[
          { icon: Briefcase, label: t('Aktif İş İlanı'), value: 1243 },
          { icon: Users, label: t('Kayıtlı Usta'), value: 12547 },
          { icon: Star, label: t('Tamamlanan İş'), value: 45890 },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.1, duration: 0.5 }}
            className="glass-panel p-8 flex flex-col items-center justify-center text-center space-y-3 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group"
          >
            <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-2xl text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              <stat.icon size={32} />
            </div>
            <h3 className="text-4xl font-bold text-slate-800 dark:text-white">
              <CountUp end={stat.value} duration={2.5} suffix="+" />
            </h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium">{stat.label}</p>
          </motion.div>
        ))}
      </section>

      {/* Live Platform Report */}
      <section className="max-w-6xl mx-auto mt-12 mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass p-8 rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 text-white relative overflow-hidden shadow-2xl"
        >
          <div className="absolute right-0 top-0 opacity-10">
            <Activity size={200} />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="md:w-1/3">
              <h2 className="text-3xl font-bold mb-2 flex items-center gap-3"><Activity className="text-blue-400" /> {t("Canlı Platform Raporu")}</h2>
              <p className="text-slate-400 text-sm">{t("USTABAŞI ekosisteminde şu an neler oluyor? Veriler anlık olarak güncellenmektedir.")}</p>
            </div>
            
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">{t("Bugün Başlayan")}</p>
                <p className="text-3xl font-bold text-blue-400"><CountUp end={142} /></p>
              </div>
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">{t("Şu An Devam Eden")}</p>
                <p className="text-3xl font-bold text-amber-400"><CountUp end={856} /></p>
              </div>
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">{t("Bugün Tamamlanan")}</p>
                <p className="text-3xl font-bold text-green-400"><CountUp end={324} /></p>
              </div>
              <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">{t("Aktif Teklifler")}</p>
                <p className="text-3xl font-bold text-purple-400"><CountUp end={4590} /></p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Popular Categories */}
      <section className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">{t("Popüler Kategoriler")}</h2>
          <p className="text-slate-500">{t("İhtiyacınıza en uygun uzmanları kategorilere göre keşfedin.")}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
            >
              <Link to="/professions" className="glass-panel p-6 flex flex-col items-center justify-center text-center hover:-translate-y-1 hover:border-blue-400 transition-all group">
                <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">{cat.icon}</span>
                <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-1">{cat.name}</h3>
                <p className="text-xs text-slate-500">{cat.count}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="max-w-6xl mx-auto bg-slate-50 dark:bg-slate-900/30 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-800">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">{t("Öne Çıkan İlanlar")}</h2>
            <p className="text-slate-500">{t("Hemen teklif verebileceğiniz güncel fırsatlar.")}</p>
          </div>
          <Link to="/jobs" className="hidden md:flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors">
            {t("Tümünü Gör")} <ArrowRight size={16} />
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {featuredJobs.map((job, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass p-6 rounded-2xl hover:shadow-xl transition-shadow group flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1 rounded-full">{job.type}</span>
                <span className="text-lg font-bold text-green-600">{job.price}</span>
              </div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-blue-600 transition-colors">{job.title}</h3>
              <p className="text-sm text-slate-500 mb-4">{job.company}</p>
              
              <div className="space-y-2 mt-auto pt-4 border-t border-slate-200 dark:border-slate-700/50">
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <MapPin size={16} className="text-slate-400" /> {job.location}
                </div>
                <div className="flex gap-2">
                  {job.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-medium bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md text-slate-500">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <Link to="/jobs" className="md:hidden mt-6 flex items-center justify-center gap-2 text-blue-600 font-medium w-full glass-panel py-3 rounded-xl">
          {t("Tüm İlanları Gör")} <ArrowRight size={16} />
        </Link>
      </section>

      {/* How it Works */}
      <section className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t("Sistem Nasıl Çalışır?")}</h2>
          <p className="text-slate-500">{t("İster usta ol, ister müşteri; USTABAŞI'nda her şey çok kolay.")}</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-blue-200 dark:from-blue-900 dark:via-purple-900 dark:to-blue-900 z-0"></div>
          
          {[
            { icon: Search, title: t("İlan Ver veya Ara"), desc: t("İhtiyacın olan işi detaylarıyla yazarak ilan ver veya yeteneklerine uygun işleri filtrele.") },
            { icon: Zap, title: t("Teklifleş ve Anlaş"), desc: t("Ustalar ilanlara teklif versin, müşteri en uygun profili ve fiyatı seçerek onaylasın.") },
            { icon: ShieldCheck, title: t("Güvenle Tamamla"), desc: t("Escrow sistemiyle ödeme güvende kalır, iş başarıyla bitince ustaya aktarılır.") }
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center space-y-4"
            >
              <div className="w-24 h-24 rounded-full glass flex items-center justify-center shadow-lg border-4 border-white dark:border-slate-900">
                <step.icon size={32} className="text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold">{step.title}</h3>
              <p className="text-slate-500 max-w-[250px]">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Top Masters */}
      <section className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">{t("Haftanın En İyileri")}</h2>
            <p className="text-slate-500">{t("Müşteri yorumları ve başarı puanlarına göre öne çıkan ustalar.")}</p>
          </div>
          <Link to="/leaderboard" className="hidden md:flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors">
            {t("Liderlik Tablosu")} <ArrowRight size={16} />
          </Link>
        </div>
        
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {topMasters.map((master, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass-panel p-6 rounded-2xl flex flex-col items-center text-center hover:-translate-y-2 hover:shadow-xl transition-all group cursor-pointer"
            >
              <div className="relative mb-4">
                <img src={master.image} className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-md group-hover:scale-110 transition-transform" />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1 text-xs font-bold">
                  <Star size={12} className="text-amber-500" fill="currentColor" /> {master.rating}
                </div>
              </div>
              <h3 className="font-bold text-lg">{master.name}</h3>
              <p className="text-sm text-slate-500 mb-3">{master.role}</p>
              <span className="text-xs font-medium text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">{master.reviews} {t("Onaylı Yorum")}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer / CTA */}
      <section className="max-w-5xl mx-auto mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass p-10 md:p-16 rounded-[3rem] bg-gradient-to-br from-blue-600 to-indigo-700 text-white text-center relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Briefcase size={150} />
          </div>
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-4xl font-bold">{t("Hemen Ekosisteme Katıl")}</h2>
            <p className="text-blue-100 text-lg">{t("İster işini büyütmek isteyen bir usta ol, ister güvenilir hizmet arayan bir müşteri. USTABAŞI'nda yerin hazır.")}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Link to="/register" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg">
                {t("Ücretsiz Kayıt Ol")}
              </Link>
              <Link to="/about" className="px-8 py-4 rounded-xl font-bold text-lg border border-white/30 hover:bg-white/10 transition-colors">
                {t("Daha Fazla Bilgi")}
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
      
      {/* Remove Simple Footer as we now have Mega Footer in Layout */}
    </div>
  );
}