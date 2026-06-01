import { useState } from 'react';
import { Users, TrendingUp, Briefcase, DollarSign, PieChart, Building } from 'lucide-react';

export default function CompanyDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Firma Merkezi</h1>
          <p className="text-slate-500">Mega İnşaat A.Ş. Yönetim Paneli</p>
        </div>
        <button className="glass-button text-sm py-2">Yeni İlan Çık</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass p-5 rounded-2xl">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg"><Briefcase size={20} /></div>
            <span className="text-xs font-bold text-green-500 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">+12%</span>
          </div>
          <h3 className="text-2xl font-bold">14</h3>
          <p className="text-sm text-slate-500">Aktif Proje</p>
        </div>
        <div className="glass p-5 rounded-2xl">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg"><Users size={20} /></div>
          </div>
          <h3 className="text-2xl font-bold">45</h3>
          <p className="text-sm text-slate-500">Çalışan Usta</p>
        </div>
        <div className="glass p-5 rounded-2xl">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg"><DollarSign size={20} /></div>
          </div>
          <h3 className="text-2xl font-bold">₺1.2M</h3>
          <p className="text-sm text-slate-500">Aylık Harcama</p>
        </div>
        <div className="glass p-5 rounded-2xl">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-lg"><TrendingUp size={20} /></div>
          </div>
          <h3 className="text-2xl font-bold">4.8</h3>
          <p className="text-sm text-slate-500">Firma Puanı</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 glass p-6 rounded-3xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg flex items-center gap-2"><Building size={20} /> Departmanlar</h3>
            <button className="text-sm text-blue-600 font-medium">Tümünü Gör</button>
          </div>
          <div className="space-y-4">
            {['Elektrik', 'Sıhhi Tesisat', 'İnce İşler', 'Kaba İnşaat'].map((dep, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div>
                  <h4 className="font-bold">{dep} Departmanı</h4>
                  <p className="text-xs text-slate-500 mt-1">{10 - i} Aktif Usta • {3 - (i%2)} Devam Eden Proje</p>
                </div>
                <button className="text-sm px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg font-medium">Yönet</button>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6 rounded-3xl flex flex-col">
          <h3 className="font-bold text-lg flex items-center gap-2 mb-6"><PieChart size={20} /> Raporlar</h3>
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl">
            <PieChart size={48} className="text-slate-300 mb-4" />
            <h4 className="font-medium mb-1">Detaylı Analiz</h4>
            <p className="text-xs text-slate-500 mb-4">Maliyet ve performans raporlarınızı buradan indirebilirsiniz.</p>
            <button className="glass-button text-xs py-2 px-4">Rapor Oluştur</button>
          </div>
        </div>
      </div>
    </div>
  );
}