import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Events() {
  const events = [
    { id: 1, title: 'Uluslararası İnşaat ve Yapı Fuarı 2024', date: '15-18 Mayıs 2024', location: 'TÜYAP Fuar ve Kongre Merkezi, İstanbul', type: 'Fuar', attendees: 1250, image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80' },
    { id: 2, title: 'Geleceğin Akıllı Ev Teknolojileri Semineri', date: '22 Haziran 2024', location: 'Online (Canlı Yayın)', type: 'Seminer', attendees: 840, image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=800&q=80' },
    { id: 3, title: 'İş Güvenliği ve Şantiye Yönetimi Eğitimi', date: '05 Temmuz 2024', location: 'Ankara Ticaret Odası', type: 'Eğitim', attendees: 320, image: 'https://images.unsplash.com/photo-1504307651254-35680f356f58?w=800&q=80' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="text-center space-y-3 mb-10">
        <h1 className="text-4xl font-bold">Etkinlik Merkezi</h1>
        <p className="text-slate-500 text-lg">Sektördeki en önemli fuarlar, seminerler ve eğitimleri kaçırmayın.</p>
      </div>

      <div className="grid gap-6">
        {events.map((event, i) => (
          <motion.div 
            key={event.id}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="glass rounded-3xl overflow-hidden flex flex-col md:flex-row group hover:shadow-xl transition-shadow duration-300"
          >
            <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden">
              <img src={event.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg">
                {event.type}
              </div>
            </div>
            
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-4 group-hover:text-blue-600 transition-colors">{event.title}</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-blue-500"><Calendar size={18} /></div>
                  <span className="font-medium">{event.date}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-red-500"><MapPin size={18} /></div>
                  <span className="font-medium">{event.location}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-green-500"><Users size={18} /></div>
                  <span className="font-medium">{event.attendees} Kişi Katılıyor</span>
                </div>
              </div>
              
              <div className="mt-auto flex justify-end">
                <button className="glass-button flex items-center gap-2 px-6">
                  Kayıt Ol <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}