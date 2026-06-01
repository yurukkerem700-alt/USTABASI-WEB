import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Briefcase, IndianRupee, Filter, Search, ChevronDown, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function Jobs() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const { user, profile } = useAuth();
  const { t } = useLanguage();

  // Filter states
  const [categoryFilter, setCategoryFilter] = useState('Tümü');
  const [locationFilter, setLocationFilter] = useState('');
  
  const categories = ['Tümü', 'Elektrik', 'Tesisat', 'Kaba İnşaat', 'Boya & Badana', 'Mobilya', 'İklimlendirme'];

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        const jobsArray = Array.isArray(data) ? data : [];
        setJobs(jobsArray);
        setFilteredJobs(jobsArray);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = jobs;
    if (categoryFilter !== 'Tümü') {
      result = result.filter(j => j.category === categoryFilter);
    }
    if (locationFilter.trim()) {
      result = result.filter(j => j.location.toLowerCase().includes(locationFilter.toLowerCase()));
    }
    setFilteredJobs(result);
  }, [categoryFilter, locationFilter, jobs]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">{t('İş İlanları')}</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">{t('Sana en uygun fırsatları keşfet')}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowFilters(!showFilters)} className="glass-panel text-sm py-2 px-4 flex items-center gap-2 md:hidden">
            <Filter size={16} /> {t('Filtrele')}
          </button>
          {profile?.role !== 'usta' && (
            <Link to="/create-job" className="glass-button text-sm py-2">{t('İlan Ver')}</Link>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Filters */}
        <AnimatePresence>
          {(showFilters || window.innerWidth >= 768) && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="w-full md:w-64 shrink-0 glass p-5 rounded-2xl h-fit space-y-6 md:block overflow-hidden"
            >
              <div className="flex justify-between items-center md:hidden mb-4">
                <h3 className="font-bold">{t('Filtreler')}</h3>
                <button onClick={() => setShowFilters(false)} className="p-1"><X size={18}/></button>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">{t('Kategori')}</label>
                <div className="space-y-1">
                  {categories.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${categoryFilter === cat ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 font-bold' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                    >
                      {t(cat)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">{t('Şehir / İlçe')}</label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    value={locationFilter}
                    onChange={e => setLocationFilter(e.target.value)}
                    placeholder={t("Konum ara...")}
                    className="glass-input pl-9 py-2 text-sm w-full"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">{t('Bütçe Aralığı')}</label>
                <input type="range" className="w-full accent-blue-600" />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>₺0</span>
                  <span>₺100.000+</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Jobs List */}
        <div className="flex-1">
          {loading ? (
            <div className="grid gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="glass p-6 rounded-2xl animate-pulse flex gap-4">
                  <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-20 glass-panel rounded-2xl">
              <Briefcase className="mx-auto h-12 w-12 text-slate-400 mb-4" />
              <h3 className="text-lg font-medium">{t('Kriterlere uygun ilan bulunamadı')}</h3>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredJobs.map((job, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={job.id} 
                  className="glass p-5 md:p-6 rounded-2xl flex flex-col md:flex-row gap-4 md:items-center hover:border-blue-300 dark:hover:border-blue-700 transition-colors cursor-pointer group"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center shrink-0 overflow-hidden">
                    {job.users?.avatar_url ? (
                      <img src={job.users.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-blue-600 font-bold text-xl">{job.title.charAt(0)}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{job.title}</h3>
                    <p className="text-slate-600 dark:text-slate-300 font-medium text-sm mt-1">{job.description ? job.description.substring(0, 100) : ''}...</p>
                    <div className="flex flex-wrap gap-3 mt-3 text-sm text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                      <span className="flex items-center gap-1"><Briefcase size={14} /> {job.category}</span>
                      <span className="flex items-center gap-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full font-medium">
                        <IndianRupee size={14} /> {t('Bütçe')}: {job.budget}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <button className="w-full md:w-auto px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white transition-colors font-medium text-sm">
                      {t('Teklif Ver')}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}