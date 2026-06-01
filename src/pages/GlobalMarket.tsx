import { Globe, MapPin, DollarSign, Filter, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GlobalMarket() {
  const globalJobs = [
    { id: 1, title: 'Senior Electrician Needed for Hotel Project', company: 'Dubai Builders LLC', location: 'Dubai, BAE', price: '$4,500 / month', type: 'Tam Zamanlı', flag: '🇦🇪' },
    { id: 2, title: 'İnşaat Mühendisi ve Şantiye Şefi', company: 'EuroConstruct', location: 'Berlin, Almanya', price: '€5,200 / month', type: 'Sözleşmeli', flag: '🇩🇪' },
    { id: 3, title: 'Experienced Plumber for Residential Complex', company: 'UK Homes', location: 'Londra, İngiltere', price: '£3,800 / month', type: 'Tam Zamanlı', flag: '🇬🇧' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="glass p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10">
          <Globe size={200} />
        </div>
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl font-bold mb-4">Uluslararası İş Pazarı</h1>
          <p className="text-slate-300 text-lg mb-6">Yeteneklerinizi sınırların ötesine taşıyın. Yurtdışındaki projelere başvurun, farklı para birimleriyle kazanç sağlayın.</p>
          <div className="flex gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-colors">İş İlanlarını İncele</button>
            <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-bold transition-colors backdrop-blur-sm border border-white/20">Vize ve Denklik Desteği</button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="glass-panel p-2 flex items-center gap-2 rounded-xl flex-1">
          <div className="px-4 py-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm font-bold text-sm flex items-center gap-2 cursor-pointer">
            <Globe size={16} className="text-blue-500" /> Tüm Ülkeler <ChevronDown size={14} />
          </div>
          <div className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer transition-colors">Almanya</div>
          <div className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer transition-colors">BAE</div>
          <div className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer transition-colors">İngiltere</div>
        </div>
        <button className="glass-button flex items-center gap-2 text-sm px-6 py-2">
          <Filter size={16} /> Detaylı Filtre
        </button>
      </div>

      <div className="grid gap-4">
        {globalJobs.map((job, i) => (
          <motion.div 
            key={job.id}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className="glass p-6 rounded-2xl flex flex-col md:flex-row gap-6 md:items-center hover:shadow-xl transition-all group border border-slate-200 dark:border-slate-800"
          >
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-inner">
              {job.flag}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-0.5 rounded uppercase tracking-wider">{job.type}</span>
              </div>
              <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors">{job.title}</h3>
              <p className="text-slate-500 font-medium">{job.company}</p>
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1"><MapPin size={16} className="text-slate-400" /> {job.location}</span>
                <span className="flex items-center gap-1 font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-lg"><DollarSign size={16} /> {job.price}</span>
              </div>
            </div>
            <div>
              <button className="w-full md:w-auto bg-slate-900 hover:bg-black text-white dark:bg-white dark:hover:bg-slate-200 dark:text-slate-900 px-6 py-3 rounded-xl font-bold transition-colors">
                Apply Now
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}