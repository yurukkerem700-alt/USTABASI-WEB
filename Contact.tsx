import { useState, useEffect } from 'react';
import { User, Mail, MapPin, Star, Settings, Image as ImageIcon, Plus, Trophy, ShieldCheck, Award } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
  const { user, profile } = useAuth();
  const [activeTab, setActiveTab] = useState('portfolio');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    bio: profile?.bio || '',
    location: profile?.location || '',
    phone: profile?.phone || '',
  });

  const handleSave = async () => {
    await fetch('/api/users', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: user.id, ...formData })
    });
    setIsEditing(false);
    window.location.reload(); // Refresh to get updated profile context
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="glass p-6 md:p-8 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
        
        <div className="relative mt-12 flex flex-col md:flex-row items-center md:items-end gap-6">
          <div className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-800 bg-slate-200 overflow-hidden shrink-0 relative group">
            <img src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${profile?.full_name}&size=128&background=random`} alt="Profile" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center cursor-pointer transition-all">
              <span className="text-white text-xs font-medium">Değiştir</span>
            </div>
          </div>
          <div className="flex-1 text-center md:text-left mb-2">
            {isEditing ? (
              <input type="text" value={formData.full_name} onChange={e => setFormData({...formData, full_name: e.target.value})} className="glass-input text-xl font-bold mb-2 p-2" />
            ) : (
              <h1 className="text-2xl font-bold">{profile?.full_name}</h1>
            )}
            <p className="text-slate-500 dark:text-slate-400 font-medium capitalize">{profile?.role}</p>
            <div className="flex items-center justify-center md:justify-start gap-4 mt-2 text-sm text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1"><MapPin size={16} /> {profile?.location || 'Konum belirtilmemiş'}</span>
              <span className="flex items-center gap-1 text-amber-500"><Star size={16} fill="currentColor" /> {profile?.rating || '0.0'}</span>
            </div>
          </div>
          {isEditing ? (
            <div className="flex gap-2 mb-2">
              <button onClick={() => setIsEditing(false)} className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-sm font-medium">İptal</button>
              <button onClick={handleSave} className="glass-button py-2 px-4 text-sm">Kaydet</button>
            </div>
          ) : (
            <button onClick={() => setIsEditing(true)} className="glass-button flex items-center gap-2 text-sm py-2 px-4 mb-2">
              <Settings size={16} /> Profili Düzenle
            </button>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <div className="glass-panel p-6 rounded-2xl">
            <h3 className="font-bold mb-4">Hakkında</h3>
            {isEditing ? (
              <textarea value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} className="glass-input text-sm mb-4 resize-none" rows={4} placeholder="Kendinizden bahsedin..."></textarea>
            ) : (
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 whitespace-pre-wrap">
                {profile?.bio || 'Henüz bir açıklama eklenmemiş.'}
              </p>
            )}
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-slate-500"><Mail size={16} /> {profile?.email}</div>
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <User size={16} className="text-slate-500" />
                  <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="Telefon" className="glass-input p-1.5 text-xs" />
                </div>
              ) : (
                profile?.phone && <div className="flex items-center gap-2 text-slate-500"><User size={16} /> {profile.phone}</div>
              )}
            </div>
          </div>

          {/* Advanced Badge System */}
          <div className="glass-panel p-6 rounded-2xl">
            <h3 className="font-bold mb-4">Başarılar & Rozetler</h3>
            <div className="flex flex-wrap gap-3">
              <div className="flex flex-col items-center gap-1 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800/50" title="100 İş Tamamladı">
                <Trophy size={24} className="text-yellow-500" />
                <span className="text-[10px] font-bold text-yellow-700 dark:text-yellow-400">100+ İş</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800/50" title="30 Gün Aktif">
                <Star size={24} className="text-orange-500" fill="currentColor" />
                <span className="text-[10px] font-bold text-orange-700 dark:text-orange-400">30 Gün</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800/50" title="Akademi Mezunu">
                <Award size={24} className="text-blue-500" />
                <span className="text-[10px] font-bold text-blue-700 dark:text-blue-400">Akademi</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-2 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800/50" title="Premium Üye">
                <ShieldCheck size={24} className="text-purple-500" />
                <span className="text-[10px] font-bold text-purple-700 dark:text-purple-400">Premium</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2 space-y-6">
          <div className="flex gap-4 border-b border-slate-200 dark:border-slate-700/50 pb-2">
            <button onClick={() => setActiveTab('portfolio')} className={`pb-2 px-2 text-sm font-bold border-b-2 transition-colors ${activeTab === 'portfolio' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>Portfolyo</button>
            <button onClick={() => setActiveTab('reviews')} className={`pb-2 px-2 text-sm font-bold border-b-2 transition-colors ${activeTab === 'reviews' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}>Yorumlar</button>
          </div>

          {activeTab === 'portfolio' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-bold">Çalışmalarım</h3>
                <button className="flex items-center gap-1 text-sm text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 px-3 py-1.5 rounded-lg transition-colors">
                  <Plus size={16} /> Yeni Ekle
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {/* Placeholder portfolio items */}
                <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-xl flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-700">
                  <ImageIcon size={32} className="mb-2 opacity-50" />
                  <span className="text-xs font-medium">Görsel Yok</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="text-center py-10 glass-panel">
                <p className="text-slate-500">Henüz yorum yapılmamış.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}