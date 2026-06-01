import { useState } from 'react';
import { Bot, Sparkles, Send, Calculator, Search, Briefcase, FileText, Image as ImageIcon, PenTool } from 'lucide-react';

export default function AIAssistant() {
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState([
    { type: 'ai', content: 'Merhaba! Ben Ustabaşı AI asistanınız. İhtiyacınız olan iş için fiyat tahmini yapabilir, portfolyonuzu analiz edebilir veya size teklif yazmanızda yardımcı olabilirim. Ne yapmak istersiniz?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { type: 'user', content: input }]);
    setInput('');

    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: 'ai', 
        content: 'Bu talebinizi aldım. Şu anda demo modunda çalışıyorum ancak yakında size tam detaylı bir analiz ve öneri sunacağım.' 
      }]);
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 text-white shadow-lg mb-2">
          <Bot size={32} />
        </div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Yapay Zeka Asistanı</h1>
        <p className="text-slate-500">Kariyeriniz ve işleriniz için akıllı asistanınız</p>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {[
          { id: 'chat', name: 'Genel Sohbet', icon: Bot },
          { id: 'career', name: 'Kariyer Danışmanı', icon: Briefcase },
          { id: 'project', name: 'Proje Oluşturucu', icon: FileText },
          { id: 'portfolio', name: 'Portfolyo Analizi', icon: ImageIcon },
          { id: 'bid', name: 'Teklif Yazıcısı', icon: PenTool },
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 whitespace-nowrap px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === tab.id ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400 shadow-sm' : 'glass-panel hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
          >
            <tab.icon size={16} /> {tab.name}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-4">
        <div className="md:col-span-2 glass rounded-3xl flex flex-col h-[500px] overflow-hidden shadow-xl">
          <div className="p-4 border-b border-slate-200 dark:border-slate-700/50 bg-white/40 dark:bg-slate-900/40 flex items-center gap-2">
            <Sparkles className="text-purple-500" size={20} />
            <span className="font-bold capitalize">{activeTab === 'chat' ? 'Sohbet' : activeTab} Asistanı</span>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                  msg.type === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-sm' 
                    : 'bg-white dark:bg-slate-800 shadow-md rounded-bl-sm border border-slate-100 dark:border-slate-700'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-white/40 dark:bg-slate-900/40 border-t border-slate-200 dark:border-slate-700/50">
            <form onSubmit={handleSend} className="flex gap-2 relative">
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={activeTab === 'bid' ? 'Hangi işe teklif vermek istiyorsunuz?' : 'Mesajınızı yazın...'} 
                className="flex-1 glass-input pr-12"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors">
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass p-6 rounded-3xl bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-100 dark:border-purple-800/30">
            <h3 className="font-bold mb-2 flex items-center gap-2 text-purple-700 dark:text-purple-400">
              <Sparkles size={18} /> AI İpuçları
            </h3>
            {activeTab === 'chat' && <p className="text-sm text-slate-600 dark:text-slate-300">İşinizin detaylarını yazarak ortalama piyasa fiyatlarını öğrenebilirsiniz.</p>}
            {activeTab === 'career' && <p className="text-sm text-slate-600 dark:text-slate-300">Yeteneklerinizi girin, size hangi eğitimleri almanız gerektiğini ve kariyer hedeflerinizi çıkaralım.</p>}
            {activeTab === 'project' && <p className="text-sm text-slate-600 dark:text-slate-300">Evinizde yapmak istediğiniz değişikliği anlatın, size malzeme listesi ve bütçe planı hazırlayalım.</p>}
            {activeTab === 'portfolio' && <p className="text-sm text-slate-600 dark:text-slate-300">Profil linkinizi veya fotoğraflarınızı paylaşın, müşterileri daha çok etkilemek için tavsiyeler verelim.</p>}
            {activeTab === 'bid' && <p className="text-sm text-slate-600 dark:text-slate-300">İlan detaylarını yapıştırın, size en profesyonel ve ikna edici teklif metnini saniyeler içinde yazalım.</p>}
          </div>

          <div className="glass-panel p-5 rounded-2xl hover:border-blue-500 transition-colors cursor-pointer group">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Search size={20} />
            </div>
            <h3 className="font-bold mb-1 text-sm">Akıllı Eşleştirme</h3>
            <p className="text-xs text-slate-500">Profilinize ve işinize en uygun bağlantıları bulun.</p>
          </div>
        </div>
      </div>
    </div>
  );
}