import { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal, Video, Plus, Gift, X, Star, Zap, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Ustagram() {
  const [activeTab, setActiveTab] = useState('reels');
  const [isLiveViewOpen, setIsLiveViewOpen] = useState(false);
  const [showGiftPanel, setShowGiftPanel] = useState(false);

  // Dummy stories
  const stories = [
    { id: 1, user: 'Sen', avatar: 'https://ui-avatars.com/api/?name=Sen&background=3b82f6&color=fff', isAdd: true },
    { id: 2, user: 'Ahmet U.', avatar: 'https://ui-avatars.com/api/?name=Ahmet&background=random', isLive: true },
    { id: 3, user: 'Mehmet D.', avatar: 'https://ui-avatars.com/api/?name=Mehmet&background=random' },
    { id: 4, user: 'Ayşe K.', avatar: 'https://ui-avatars.com/api/?name=Ayse&background=random' },
    { id: 5, user: 'Ali V.', avatar: 'https://ui-avatars.com/api/?name=Ali&background=random' },
  ];

  return (
    <div className="max-w-md mx-auto h-[calc(100vh-8rem)] md:h-[calc(100vh-6rem)] flex flex-col bg-black rounded-3xl overflow-hidden relative shadow-2xl">
      
      {/* Top Header & Stories */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent pt-4 pb-6 px-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-white tracking-tight">Ustagram</h1>
          <div className="flex gap-4 text-white">
            <Video size={24} />
            <MessageCircle size={24} />
          </div>
        </div>

        {/* Stories Horizontal Scroll */}
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {stories.map(story => (
            <div key={story.id} onClick={() => story.isLive && setIsLiveViewOpen(true)} className="flex flex-col items-center gap-1 shrink-0 cursor-pointer">
              <div className={`relative w-16 h-16 rounded-full p-0.5 ${story.isLive ? 'bg-red-500 animate-pulse' : story.isAdd ? '' : 'bg-gradient-to-tr from-yellow-400 to-fuchsia-600'}`}>
                <div className="w-full h-full bg-black rounded-full p-0.5">
                  <img src={story.avatar} className="w-full h-full rounded-full object-cover" />
                </div>
                {story.isAdd && (
                  <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1 border-2 border-black text-white">
                    <Plus size={12} strokeWidth={4} />
                  </div>
                )}
                {story.isLive && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded border border-black uppercase">
                    Canlı
                  </div>
                )}
              </div>
              <span className="text-white text-xs font-medium">{story.user}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Video Feed (Reels Style) */}
      <div className="flex-1 relative bg-slate-900">
        <img src="https://images.unsplash.com/photo-1504307651254-35680f356f58?w=800&q=80" className="w-full h-full object-cover opacity-80" />
        
        {/* Play overlay for demo */}
        <div className="absolute inset-0 flex items-center justify-center">
           <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white opacity-50">
             <Play size={32} fill="currentColor" className="ml-1" />
           </div>
        </div>

        {/* Video Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 pt-20 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
          <div className="flex items-end justify-between">
            <div className="flex-1 text-white pr-4">
              <div className="flex items-center gap-2 mb-2">
                <img src="https://ui-avatars.com/api/?name=Ahmet+Y&background=random" className="w-10 h-10 rounded-full border border-white/20" />
                <span className="font-bold">ahmet_usta</span>
                <button className="px-3 py-1 border border-white/40 rounded-full text-xs font-bold backdrop-blur-sm">Takip Et</button>
              </div>
              <p className="text-sm mb-2">Şantiyede yeni gün! İleri seviye akıllı ev panosu kurulumu yapıyoruz. Sorularınızı yoruma bekliyorum. ⚡️🔌 #elektrik #şantiye #akıllıev</p>
              <div className="flex items-center gap-2 text-xs font-medium bg-white/20 w-max px-3 py-1.5 rounded-full backdrop-blur-md">
                <Music size={14} /> Orijinal Ses - ahmet_usta
              </div>
            </div>

            {/* Right Action Buttons */}
            <div className="flex flex-col items-center gap-6 text-white pb-4">
              <button className="flex flex-col items-center gap-1 group">
                <div className="p-3 bg-black/20 rounded-full backdrop-blur-sm group-hover:bg-black/40 transition-colors">
                  <Heart size={28} />
                </div>
                <span className="text-xs font-medium">12.4K</span>
              </button>
              <button className="flex flex-col items-center gap-1 group">
                <div className="p-3 bg-black/20 rounded-full backdrop-blur-sm group-hover:bg-black/40 transition-colors">
                  <MessageCircle size={28} />
                </div>
                <span className="text-xs font-medium">348</span>
              </button>
              <button className="flex flex-col items-center gap-1 group">
                <div className="p-3 bg-black/20 rounded-full backdrop-blur-sm group-hover:bg-black/40 transition-colors">
                  <Gift size={28} className="text-yellow-400" />
                </div>
                <span className="text-xs font-medium">Hediye</span>
              </button>
              <button className="flex flex-col items-center gap-1 group">
                <div className="p-3 bg-black/20 rounded-full backdrop-blur-sm group-hover:bg-black/40 transition-colors">
                  <Share2 size={28} />
                </div>
                <span className="text-xs font-medium">Paylaş</span>
              </button>
              <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden mt-2 animate-[spin_4s_linear_infinite]">
                <img src="https://ui-avatars.com/api/?name=Ahmet+Y&background=random" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live View Modal (TikTok Style) */}
      <AnimatePresence>
        {isLiveViewOpen && (
          <motion.div 
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-black flex justify-center"
          >
            <div className="w-full max-w-md h-full relative overflow-hidden">
              {/* Live Video Background */}
              <img src="https://images.unsplash.com/photo-1504307651254-35680f356f58?w=800&q=80" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none"></div>

              {/* Top Header */}
              <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-10 pt-safe">
                <div className="flex items-center gap-2 bg-black/40 rounded-full p-1 pr-4 backdrop-blur-md border border-white/10">
                  <img src="https://ui-avatars.com/api/?name=Ahmet+U&background=random" className="w-8 h-8 rounded-full" />
                  <div>
                    <h3 className="text-white text-xs font-bold">Ahmet Usta</h3>
                    <p className="text-white/70 text-[10px]">1.2K İzleyici</p>
                  </div>
                  <button className="ml-2 bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">Takip Et</button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-black/40 rounded-full px-3 py-1 backdrop-blur-md flex items-center gap-1 text-yellow-400 text-xs font-bold border border-white/10">
                    <Star size={12} fill="currentColor" /> 12K
                  </div>
                  <button onClick={() => setIsLiveViewOpen(false)} className="text-white p-2 bg-black/40 rounded-full backdrop-blur-md border border-white/10">
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Chat Overlay */}
              <div className="absolute bottom-20 left-4 right-20 h-48 overflow-y-auto flex flex-col justify-end space-y-2 z-10 mask-image-fade-top">
                {[
                  { user: 'Mehmet', text: 'Kolay gelsin usta', color: 'text-blue-400' },
                  { user: 'Ali', text: 'Hangi marka kablo kullanıyorsun?', color: 'text-green-400' },
                  { user: 'Ayşe', text: 'Çok temiz işçilik 👏👏', color: 'text-pink-400' },
                  { user: 'Veli', text: 'Usta fiyatlar ne durumda şu an?', color: 'text-yellow-400' },
                ].map((chat, i) => (
                  <div key={i} className="text-sm">
                    <span className={`font-bold ${chat.color} drop-shadow-md`}>{chat.user}: </span>
                    <span className="text-white drop-shadow-md">{chat.text}</span>
                  </div>
                ))}
              </div>

              {/* Bottom Actions */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 z-10">
                <div className="flex-1 bg-black/40 border border-white/20 rounded-full px-4 py-2.5 backdrop-blur-md text-white text-sm">
                  Yorum yap...
                </div>
                <button 
                  onClick={() => setShowGiftPanel(!showGiftPanel)}
                  className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-yellow-500 flex items-center justify-center text-white shadow-lg animate-pulse"
                >
                  <Gift size={20} />
                </button>
                <button className="w-10 h-10 rounded-full bg-black/40 border border-white/20 flex items-center justify-center text-white backdrop-blur-md">
                  <Share2 size={20} />
                </button>
              </div>

              {/* Gift Panel Modal */}
              <AnimatePresence>
                {showGiftPanel && (
                  <motion.div 
                    initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }}
                    className="absolute bottom-0 left-0 right-0 bg-slate-900 rounded-t-3xl z-20 p-4 pb-8"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-white font-bold">Hediye Gönder</h3>
                      <div className="flex items-center gap-1 text-yellow-400 font-bold bg-yellow-400/20 px-3 py-1 rounded-full">
                        <Star size={14} fill="currentColor" /> 500 Bakiye
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { name: 'Gül', icon: '🌹', price: 1 },
                        { name: 'Çay', icon: '☕', price: 5 },
                        { name: 'Alkış', icon: '👏', price: 10 },
                        { name: 'Nazar', icon: '🧿', price: 50 },
                        { name: 'Taç', icon: <Crown className="mx-auto text-yellow-400"/>, price: 100 },
                        { name: 'Roket', icon: '🚀', price: 500 },
                        { name: 'Aslan', icon: '🦁', price: 1000 },
                        { name: 'USTABAŞI', icon: <Zap className="mx-auto text-blue-400"/>, price: 5000 },
                      ].map((gift, i) => (
                        <button key={i} className="bg-slate-800 rounded-xl p-2 flex flex-col items-center justify-center hover:bg-slate-700 transition-colors border border-slate-700">
                          <div className="text-2xl mb-1">{gift.icon}</div>
                          <span className="text-[10px] text-slate-300 font-medium">{gift.name}</span>
                          <span className="text-[10px] text-yellow-400 font-bold flex items-center"><Star size={8} fill="currentColor" className="mr-0.5" /> {gift.price}</span>
                        </button>
                      ))}
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button className="flex-1 bg-blue-600 text-white font-bold py-2 rounded-xl text-sm">Bakiye Yükle</button>
                      <button onClick={() => setShowGiftPanel(false)} className="flex-1 bg-slate-800 text-white font-bold py-2 rounded-xl text-sm">Kapat</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Needed icons
import { Play, Music } from 'lucide-react';