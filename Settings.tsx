import { CheckCircle, Zap, Shield, Star, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PlusSubscription() {
  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-700 pb-10">
      <div className="text-center space-y-4 pt-8">
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-tr from-yellow-400 to-amber-600 text-white shadow-lg mb-2">
          <Crown size={32} />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          USTABAŞI <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">Plus</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
          Platformun tüm sınırlarını kaldırın. Düşük komisyon, sınırsız AI desteği ve aramalarda her zaman en üstte olma ayrıcalığı.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {/* Basic */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass p-8 rounded-3xl flex flex-col"
        >
          <h3 className="text-xl font-bold mb-2">Standart</h3>
          <p className="text-sm text-slate-500 mb-6">Platformu keşfetmek için</p>
          <div className="mb-6">
            <span className="text-4xl font-bold">Ücretsiz</span>
          </div>
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex gap-3 text-sm"><CheckCircle size={20} className="text-slate-300 shrink-0" /> Temel profil oluşturma</li>
            <li className="flex gap-3 text-sm"><CheckCircle size={20} className="text-slate-300 shrink-0" /> Ayda 5 teklif hakkı</li>
            <li className="flex gap-3 text-sm"><CheckCircle size={20} className="text-slate-300 shrink-0" /> %10 Escrow komisyonu</li>
          </ul>
          <button className="w-full py-3 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold text-slate-600 dark:text-slate-300">Mevcut Plan</button>
        </motion.div>

        {/* Plus (Highlighted) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="p-8 rounded-3xl flex flex-col bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-2xl relative transform md:-translate-y-4 border border-yellow-500/30"
        >
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-yellow-400 to-amber-600"></div>
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            En Çok Tercih Edilen
          </div>
          
          <h3 className="text-xl font-bold mb-2 text-yellow-400 flex items-center gap-2"><Crown size={20} /> Plus</h3>
          <p className="text-sm text-slate-400 mb-6">Profesyonel ustalar için</p>
          <div className="mb-6">
            <span className="text-4xl font-bold">₺299</span><span className="text-slate-400">/ay</span>
          </div>
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex gap-3 text-sm"><CheckCircle size={20} className="text-yellow-400 shrink-0" /> Sınırsız teklif hakkı</li>
            <li className="flex gap-3 text-sm"><CheckCircle size={20} className="text-yellow-400 shrink-0" /> Sadece %3 Escrow komisyonu</li>
            <li className="flex gap-3 text-sm"><CheckCircle size={20} className="text-yellow-400 shrink-0" /> Aramalarda üst sıralarda çıkma</li>
            <li className="flex gap-3 text-sm"><CheckCircle size={20} className="text-yellow-400 shrink-0" /> Plus üye rozeti (Güven verir)</li>
            <li className="flex gap-3 text-sm"><CheckCircle size={20} className="text-yellow-400 shrink-0" /> Sınırsız AI Asistan kullanımı</li>
          </ul>
          <button className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-600 font-bold text-white shadow-lg hover:shadow-yellow-500/25 transition-shadow">Plus'a Geç</button>
        </motion.div>

        {/* Kurumsal */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="glass p-8 rounded-3xl flex flex-col"
        >
          <h3 className="text-xl font-bold mb-2">Kurumsal</h3>
          <p className="text-sm text-slate-500 mb-6">Büyük firmalar ve ekipler için</p>
          <div className="mb-6">
            <span className="text-4xl font-bold">₺999</span><span className="text-slate-500">/ay</span>
          </div>
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex gap-3 text-sm"><CheckCircle size={20} className="text-blue-500 shrink-0" /> Plus'taki her şey</li>
            <li className="flex gap-3 text-sm"><CheckCircle size={20} className="text-blue-500 shrink-0" /> 10 Alt çalışan hesabı (Departmanlar)</li>
            <li className="flex gap-3 text-sm"><CheckCircle size={20} className="text-blue-500 shrink-0" /> Toplu faturalandırma ve API desteği</li>
            <li className="flex gap-3 text-sm"><CheckCircle size={20} className="text-blue-500 shrink-0" /> Özel müşteri temsilcisi</li>
          </ul>
          <button className="w-full py-3 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors">İletişime Geç</button>
        </motion.div>
      </div>
    </div>
  );
}