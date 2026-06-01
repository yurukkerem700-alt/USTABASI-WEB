import { useState } from 'react';
import { Hash, MessageSquare, Globe, Users, Mic, MicOff, Headphones, VolumeX, User as UserIcon } from 'lucide-react';

export default function Community() {
  const [activeChannel, setActiveChannel] = useState('genel');
  const [inVoiceRoom, setInVoiceRoom] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isDeafened, setIsDeafened] = useState(false);

  const channels = [
    { id: 'genel', name: 'genel-sohbet', type: 'text', category: 'global' },
    { id: 'yardim', name: 'soru-cevap', type: 'text', category: 'global' },
    { id: 'kahvehane', name: 'Kahvehane', type: 'voice', category: 'sesli', activeUsers: 12 },
    { id: 'elektrik-oda', name: 'Elektrikçiler Odası', type: 'voice', category: 'sesli', activeUsers: 4 },
    { id: 'elektrik', name: 'elektrik-ustalari', type: 'text', category: 'meslek' },
    { id: 'istanbul', name: 'istanbul-bolge', type: 'text', category: 'bolge' },
  ];

  return (
    <div className="h-[calc(100vh-8rem)] md:h-[calc(100vh-6rem)] glass rounded-3xl overflow-hidden flex shadow-xl">
      {/* Sidebar */}
      <div className="w-64 border-r border-slate-200 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-900/20 hidden md:flex flex-col">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700/50">
          <h2 className="font-bold text-lg flex items-center gap-2"><Globe className="text-blue-500" /> Topluluk</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 space-y-6">
          <div>
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 px-2">Sesli Odalar</h3>
            <div className="space-y-1">
              {channels.filter(c => c.type === 'voice').map(c => (
                <div key={c.id} className="space-y-1">
                  <button onClick={() => setInVoiceRoom(c.id === activeChannel ? false : true)} className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-sm font-medium transition-colors hover:bg-slate-200 dark:hover:bg-slate-800 ${inVoiceRoom && activeChannel === c.id ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-400' : 'text-slate-700 dark:text-slate-300'}`}>
                    <div className="flex items-center gap-2">
                      <VolumeX size={16} className={inVoiceRoom && activeChannel === c.id ? 'text-green-500' : ''} /> {c.name}
                    </div>
                    <span className="text-xs bg-slate-200 dark:bg-slate-700 px-1.5 rounded">{c.activeUsers}</span>
                  </button>
                  
                  {/* Active Voice Users Demo */}
                  {inVoiceRoom && activeChannel === c.id && (
                    <div className="pl-6 pr-2 py-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <img src="https://ui-avatars.com/api/?name=Sen&background=random" className="w-6 h-6 rounded-full border-2 border-green-500" />
                          {isMuted && <div className="absolute -bottom-1 -right-1 bg-red-500 rounded-full p-0.5"><MicOff size={8} className="text-white" /></div>}
                        </div>
                        <span className="text-xs font-medium text-green-600">Sen</span>
                      </div>
                      <div className="flex items-center gap-2 opacity-70">
                        <img src="https://ui-avatars.com/api/?name=Ali&background=random" className="w-6 h-6 rounded-full" />
                        <span className="text-xs font-medium">Ali Usta</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 px-2">Metin Kanalları</h3>
            <div className="space-y-1">
              {channels.filter(c => c.type === 'text').map(c => (
                <button key={c.id} onClick={() => setActiveChannel(c.id)} className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm font-medium transition-colors ${activeChannel === c.id && !inVoiceRoom ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'}`}>
                  <Hash size={16} /> {c.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Voice Controls */}
        {inVoiceRoom && (
          <div className="p-3 bg-green-50 dark:bg-green-900/20 border-t border-green-200 dark:border-green-800/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-green-600">Sese Bağlı</span>
              <button onClick={() => setInVoiceRoom(false)} className="text-xs text-red-500 hover:underline">Ayrıl</button>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setIsMuted(!isMuted)} className={`flex-1 flex justify-center py-1.5 rounded-lg ${isMuted ? 'bg-red-100 text-red-600' : 'bg-white dark:bg-slate-800 hover:bg-slate-100'}`}>
                {isMuted ? <MicOff size={16} /> : <Mic size={16} />}
              </button>
              <button onClick={() => setIsDeafened(!isDeafened)} className={`flex-1 flex justify-center py-1.5 rounded-lg ${isDeafened ? 'bg-red-100 text-red-600' : 'bg-white dark:bg-slate-800 hover:bg-slate-100'}`}>
                {isDeafened ? <VolumeX size={16} /> : <Headphones size={16} />}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white/30 dark:bg-slate-900/30">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700/50 flex items-center justify-between bg-white/50 dark:bg-slate-900/50 backdrop-blur-md z-10">
          <div className="flex items-center gap-2">
            <Hash className="text-slate-400" size={24} />
            <h3 className="font-bold text-lg">{channels.find(c => c.id === activeChannel)?.name || 'genel-sohbet'}</h3>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Users size={16} /> 1.2k Çevrimiçi
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div className="flex gap-4">
            <img src="https://ui-avatars.com/api/?name=Veli&background=random" className="w-10 h-10 rounded-full shrink-0" />
            <div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-bold text-sm">Veli Usta</span>
                <span className="text-xs text-slate-500">Bugün 14:23</span>
              </div>
              <p className="text-sm bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none shadow-sm inline-block">
                Arkadaşlar İstanbul Avrupa yakasında kaba inşaat için taşeron ekip arayan var mı?
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-slate-700/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
          <div className="relative">
            <input 
              type="text" 
              placeholder={`#${channels.find(c => c.id === activeChannel)?.name || 'genel-sohbet'} kanalına mesaj gönder...`}
              className="w-full glass-input pr-12 bg-white/80 dark:bg-slate-800/80"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
              <MessageSquare size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}