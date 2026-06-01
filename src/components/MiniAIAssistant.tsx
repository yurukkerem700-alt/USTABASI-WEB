import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Sparkles } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function MiniAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'ai', content: 'Selam! Ben Hasan Usta (AI). Platformda gezinirken sormak istediğin bir şey olursa buradayım.' }
  ]);
  const [input, setInput] = useState('');
  const location = useLocation();

  // Show a contextual hint when route changes
  useEffect(() => {
    if (location.pathname === '/jobs' && messages.length < 3) {
      setMessages(prev => [...prev, { type: 'ai', content: 'İlanlara bakıyorsun sanırım. İstersen aradığın işi bana yaz, senin için en uygun olanları filtreleyeyim.' }]);
    }
  }, [location.pathname]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { type: 'user', content: input }]);
    setInput('');

    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: 'ai', 
        content: 'Anladım. Bu konuda sana detaylı bilgi vermek isterdim ama şu an demo modundayım. Sol menüden ana "Yapay Zeka Asistanı" sayfasına giderek tam sürüme erişebilirsin.' 
      }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="w-[320px] h-[400px] mb-4 glass rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-purple-200 dark:border-purple-800/50"
          >
            {/* Header */}
            <div className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Hasan Usta (AI)</h3>
                  <span className="text-[10px] flex items-center gap-1 opacity-80"><Sparkles size={10} /> Ustabaşı Asistanı</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white/50 dark:bg-slate-900/50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                    msg.type === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-sm' 
                      : 'bg-white dark:bg-slate-800 shadow-sm rounded-bl-sm border border-slate-100 dark:border-slate-700'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 bg-white/80 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-700/50">
              <form onSubmit={handleSend} className="flex gap-2 relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Hasan Usta'ya sor..." 
                  className="flex-1 glass-input py-2 pr-10 text-sm"
                />
                <button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 p-1.5 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-lg transition-colors">
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 ${isOpen ? 'bg-slate-800 text-white' : 'bg-gradient-to-tr from-purple-600 to-blue-600 text-white animate-bounce-slow'}`}
      >
        {isOpen ? <X size={24} /> : <Bot size={28} />}
      </button>
    </div>
  );
}