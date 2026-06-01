import { useState } from 'react';
import { Wallet as WalletIcon, ShieldCheck, ArrowRightLeft, FileText, CreditCard } from 'lucide-react';

export default function Wallet() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">Cüzdan & Ödemeler</h1>
          <p className="text-slate-500">Güvenli Escrow hesabı ve faturalandırma</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Balance Card */}
        <div className="md:col-span-1 glass p-6 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <WalletIcon size={100} />
          </div>
          <div className="relative z-10">
            <p className="text-blue-100 font-medium mb-1">Kullanılabilir Bakiye</p>
            <h2 className="text-4xl font-bold mb-6">₺ 12.450,00</h2>
            
            <p className="text-blue-100 font-medium mb-1 text-sm">Escrow'da Bekleyen (Güvende)</p>
            <h3 className="text-xl font-bold mb-8">₺ 8.500,00</h3>
            
            <div className="flex gap-2">
              <button className="flex-1 bg-white text-blue-600 py-2 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors">Para Yükle</button>
              <button className="flex-1 bg-blue-800 text-white py-2 rounded-xl font-bold text-sm hover:bg-blue-900 transition-colors">Çek</button>
            </div>
          </div>
        </div>

        {/* Escrow Contracts */}
        <div className="md:col-span-2 glass p-6 rounded-3xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg flex items-center gap-2"><ShieldCheck className="text-green-500" /> Aktif Güvenli İşlemler</h3>
            <button className="text-sm text-blue-600 font-medium">Tümünü Gör</button>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-bold">Ev Elektrik Tesisatı Yenileme</h4>
                  <p className="text-xs text-slate-500">Ahmet Yılmaz (Usta) ile</p>
                </div>
                <span className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 px-3 py-1 rounded-full text-xs font-bold">Devam Ediyor</span>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200 dark:border-slate-700/50">
                <div className="text-sm">
                  <span className="text-slate-500">Kilitli Tutar:</span> <span className="font-bold">₺ 8.500</span>
                </div>
                <button className="text-sm bg-green-600 text-white px-4 py-1.5 rounded-lg font-medium hover:bg-green-700 transition-colors">İşi Onayla & Öde</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass p-6 rounded-3xl">
          <h3 className="font-bold text-lg flex items-center gap-2 mb-4"><ArrowRightLeft /> Son İşlemler</h3>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex justify-between items-center p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${i===1 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                    <ArrowRightLeft size={16} />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{i===1 ? 'Hizmet Ödemesi' : 'Bakiye Yükleme'}</p>
                    <p className="text-xs text-slate-500">12 Ekim 2023</p>
                  </div>
                </div>
                <span className={`font-bold ${i===1 ? 'text-red-600' : 'text-green-600'}`}>{i===1 ? '-₺4.500' : '+₺10.000'}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6 rounded-3xl">
          <h3 className="font-bold text-lg flex items-center gap-2 mb-4"><FileText /> Dijital Faturalar</h3>
          <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl text-center p-4">
            <CreditCard size={40} className="text-slate-300 mb-3" />
            <p className="text-sm font-medium mb-1">E-Fatura Entegrasyonu Aktif</p>
            <p className="text-xs text-slate-500 mb-4">Tüm ödemeleriniz otomatik olarak faturalandırılır.</p>
            <button className="glass-button text-xs py-2 px-4">Faturaları İndir</button>
          </div>
        </div>
      </div>
    </div>
  );
}