import { useState } from 'react';
import { User, Bell, Lock, Globe, Moon, CreditCard, Shield, Palette } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

export default function Settings() {
  const { profile } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('account');

  const tabs = [
    { id: 'account', name: t('Hesap Bilgileri'), icon: User },
    { id: 'notifications', name: t('Bildirimler'), icon: Bell },
    { id: 'privacy', name: t('Gizlilik ve Güvenlik'), icon: Lock },
    { id: 'appearance', name: t('Görünüm ve Dil Ayarları'), icon: Moon },
    { id: 'billing', name: t('Ödeme ve Fatura'), icon: CreditCard },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-700">
      <h1 className="text-3xl font-bold">{t('Ayarlar')}</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-64 space-y-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-md' : 'glass-panel hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'}`}
            >
              <tab.icon size={18} /> {tab.name}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 glass p-6 md:p-8 rounded-3xl min-h-[500px]">
          {activeTab === 'account' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold mb-4 border-b border-slate-200 dark:border-slate-700/50 pb-2">{t('Hesap Bilgileri')}</h2>
              <div className="flex items-center gap-4 mb-6">
                <img src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${profile?.full_name}&background=random`} className="w-20 h-20 rounded-full object-cover border-2 border-slate-200 dark:border-slate-700" />
                <div>
                  <button className="glass-button text-sm py-2 px-4 mb-1">{t('Fotoğrafı Değiştir')}</button>
                  <p className="text-xs text-slate-500">{t('Maksimum 2MB, JPG veya PNG.')}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">{t('Ad Soyad')}</label>
                  <input type="text" defaultValue={profile?.full_name} className="glass-input" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{t('E-posta')}</label>
                  <input type="email" defaultValue={profile?.email} disabled className="glass-input opacity-50" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{t('Telefon')}</label>
                  <input type="text" defaultValue={profile?.phone} className="glass-input" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{t('Konum')}</label>
                  <input type="text" defaultValue={profile?.location} className="glass-input" />
                </div>
              </div>
              <button className="glass-button w-full sm:w-auto px-8 mt-4">{t('Değişiklikleri Kaydet')}</button>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold mb-4 border-b border-slate-200 dark:border-slate-700/50 pb-2">{t('Bildirim Tercihleri')}</h2>
              <div className="space-y-4">
                {[
                  { title: t('Yeni İş İlanları'), desc: t('Bölgemde ve yeteneklerime uygun yeni iş ilanları açıldığında.') },
                  { title: t('Mesaj ve Teklifler'), desc: t('Birisi bana mesaj gönderdiğinde veya teklifime yanıt verdiğinde.') },
                  { title: t('Pazarlama ve Kampanyalar'), desc: t('USTABAŞI indirimleri ve kampanya haberleri.') },
                  { title: t('Ezan ve Takvim Hatırlatmaları'), desc: t('Namaz vakitleri ve dini gün bildirimleri.') },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-700/50">
                    <div>
                      <p className="font-bold text-sm">{item.title}</p>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={i < 2} />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold mb-4 border-b border-slate-200 dark:border-slate-700/50 pb-2">{t('Görünüm ve Dil Ayarları')}</h2>
              
              <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-700/50">
                <div>
                  <p className="font-bold text-sm">{t('Uygulama Dili (Language)')}</p>
                  <p className="text-xs text-slate-500">{t('Platformun arayüz dilini değiştirin.')}</p>
                </div>
                <div className="flex gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                  <button onClick={() => setLang('tr')} className={`px-4 py-1.5 text-sm font-bold rounded-lg transition-colors ${lang === 'tr' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600' : 'text-slate-500'}`}>{t('Türkçe')}</button>
                  <button onClick={() => setLang('en')} className={`px-4 py-1.5 text-sm font-bold rounded-lg transition-colors ${lang === 'en' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600' : 'text-slate-500'}`}>{t('English')}</button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-700/50">
                <div>
                  <p className="font-bold text-sm">{t('Karanlık Mod (Dark Mode)')}</p>
                  <p className="text-xs text-slate-500">{t('Göz yorgunluğunu azaltmak için karanlık temayı kullanın.')}</p>
                </div>
                <button onClick={toggleTheme} className="glass-panel p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700">
                  {theme === 'dark' ? <Moon size={20} className="text-blue-500" /> : <Sun size={20} className="text-amber-500" />}
                </button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-700/50">
                <div>
                  <p className="font-bold text-sm">{t('Tema Vurgu Rengi')}</p>
                  <p className="text-xs text-slate-500">{t('Butonlar ve aktif öğeler için renk seçin.')}</p>
                </div>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-full bg-blue-600 ring-2 ring-offset-2 ring-blue-600 dark:ring-offset-slate-900"></button>
                  <button className="w-8 h-8 rounded-full bg-purple-600 opacity-50 hover:opacity-100 transition-opacity"></button>
                  <button className="w-8 h-8 rounded-full bg-green-600 opacity-50 hover:opacity-100 transition-opacity"></button>
                  <button className="w-8 h-8 rounded-full bg-orange-500 opacity-50 hover:opacity-100 transition-opacity"></button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold mb-4 border-b border-slate-200 dark:border-slate-700/50 pb-2">{t('Gizlilik ve Güvenlik')}</h2>
              <button className="flex items-center gap-3 w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-left">
                <Shield className="text-blue-500" size={24} />
                <div>
                  <p className="font-bold text-sm">{t('Şifre Değiştir')}</p>
                  <p className="text-xs text-slate-500">{t('Hesap güvenliğiniz için şifrenizi güncelleyin.')}</p>
                </div>
              </button>
              <button className="flex items-center gap-3 w-full p-4 rounded-xl border border-red-200 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors text-left">
                <Lock className="text-red-500" size={24} />
                <div>
                  <p className="font-bold text-sm text-red-600 dark:text-red-400">{t('Hesabı Sil')}</p>
                  <p className="text-xs text-red-500/70">{t('Bu işlem geri alınamaz. Tüm verileriniz kalıcı olarak silinir.')}</p>
                </div>
              </button>
            </div>
          )}
          
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold mb-4 border-b border-slate-200 dark:border-slate-700/50 pb-2">{t('Ödeme ve Fatura')}</h2>
              <div className="p-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl flex justify-between items-center">
                <div>
                  <p className="text-slate-400 text-sm mb-1">{t('Mevcut Plan')}</p>
                  <h3 className="text-2xl font-bold text-yellow-400">{t('Standart Üyelik')}</h3>
                </div>
                <button className="bg-yellow-500 text-slate-900 font-bold px-6 py-2 rounded-xl hover:bg-yellow-400 transition-colors">{t("Plus'a Yükselt")}</button>
              </div>
              <p className="text-sm text-slate-500 text-center mt-4">{t('Henüz kayıtlı bir ödeme yönteminiz bulunmuyor.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Needed icon import fallback
import { Sun } from 'lucide-react';