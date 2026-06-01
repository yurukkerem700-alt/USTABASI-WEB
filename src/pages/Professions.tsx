import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Professions() {
  const [professions, setProfessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/professions')
      .then(res => res.json())
      .then(data => {
        setProfessions(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Meslekler</h1>
        <p className="text-slate-500 dark:text-slate-400">Platformumuzdaki tüm ustalık alanlarını keşfedin ve ihtiyacınıza uygun uzmanı bulun.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="glass-panel p-6 rounded-2xl animate-pulse flex flex-col items-center">
              <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-full mb-3"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-20 mb-2"></div>
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-12"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {professions.map((prof, i) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              key={prof.id} 
              className="glass p-6 rounded-2xl flex flex-col items-center text-center hover:-translate-y-2 transition-transform cursor-pointer group"
            >
              <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-2xl mb-4 group-hover:bg-blue-500 group-hover:text-white transition-colors shadow-sm">
                {prof.icon}
              </div>
              <h3 className="font-bold text-lg mb-1">{prof.name}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">{prof.count} Usta</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
