import { useState } from 'react';
import { Play, PlayCircle, Clock, Eye, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function UstabasiTV() {
  const categories = ['Tümü', 'Eğitimler', 'Başarı Hikayeleri', 'Firma Röportajları', 'Sektör Haberleri'];
  const [activeCat, setActiveCat] = useState('Tümü');

  const videos = [
    { id: 1, title: 'Akıllı Ev Sistemleri Kurulum Rehberi (Bölüm 1)', author: 'Ustabaşı Akademi', views: '12B', time: '2 gün önce', duration: '14:20', image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=600&q=80' },
    { id: 2, title: 'Mega İnşaat CEO\'su ile Sektörün Geleceği', author: 'Firma Röportajları', views: '8.5B', time: '1 hafta önce', duration: '45:00', image: 'https://images.unsplash.com/photo-1504307651254-35680f356f58?w=600&q=80' },
    { id: 3, title: 'Sıfırdan Zirveye: Ahmet Usta\'nın Hikayesi', author: 'Başarı Hikayeleri', views: '24B', time: '3 hafta önce', duration: '12:35', image: 'https://images.unsplash.com/photo-1622372738946-62e02505feb3?w=600&q=80' },
    { id: 4, title: 'Yeni Nesil Isı Pompaları Nasıl Çalışır?', author: 'Eğitimler', views: '5.2B', time: '1 ay önce', duration: '18:10', image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600&q=80' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <PlayCircle className="text-red-500" size={32} /> USTABAŞI TV
          </h1>
          <p className="text-slate-500 mt-2">Sektörün nabzını tutan videolar, eğitimler ve hikayeler.</p>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat, i) => (
          <button 
            key={i} 
            onClick={() => setActiveCat(cat)}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCat === cat ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md' : 'glass-panel hover:bg-slate-200 dark:hover:bg-slate-700'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Video */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl overflow-hidden relative group cursor-pointer"
      >
        <div className="aspect-video md:aspect-[21/9] w-full relative">
          <img src={videos[0].image} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-red-600/90 backdrop-blur-md flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-[0_0_30px_rgba(220,38,38,0.5)]">
              <Play fill="currentColor" size={36} className="ml-2" />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
            <div className="flex items-center gap-2 text-red-400 font-bold text-sm mb-3 uppercase tracking-wider">
              <TrendingUp size={16} /> Haftanın Öne Çıkanı
            </div>
            <h2 className="text-2xl md:text-4xl font-bold mb-3 max-w-3xl">{videos[0].title}</h2>
            <div className="flex items-center gap-4 text-sm text-slate-300">
              <span className="font-medium text-white">{videos[0].author}</span>
              <span className="flex items-center gap-1"><Eye size={14} /> {videos[0].views}</span>
              <span className="flex items-center gap-1"><Clock size={14} /> {videos[0].time}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Video Grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.slice(1).map((video, i) => (
          <motion.div 
            key={video.id}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            className="group cursor-pointer"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-3 bg-slate-100 dark:bg-slate-800">
              <img src={video.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded-md backdrop-blur-sm">
                {video.duration}
              </div>
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Play fill="currentColor" size={32} className="text-white" />
              </div>
            </div>
            <h3 className="font-bold text-base mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">{video.title}</h3>
            <p className="text-sm text-slate-500 mb-1">{video.author}</p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>{video.views} görüntülenme</span>
              <span>•</span>
              <span>{video.time}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}