import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import supabase from '../lib/supabase';
import { Send, User as UserIcon, ArrowLeft, MessageCircle } from 'lucide-react';

export default function Messages() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [contacts, setContacts] = useState<any[]>([]);
  const [activeContact, setActiveContact] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch users as mock contacts for MVP (ideally fetch from existing conversations)
  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        // Exclude self
        setContacts(data.filter((u: any) => u.id !== user.id));
      });
  }, [user.id]);

  useEffect(() => {
    if (!activeContact) return;

    // Fetch message history
    fetch(`/api/messages?user1=${user.id}&user2=${activeContact.id}`)
      .then(res => res.json())
      .then(data => setMessages(data));

    // Subscribe to realtime messages
    const channel = supabase
      .channel('messages_channel')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
      }, (payload) => {
        const msg = payload.new;
        if (
          (msg.sender_id === user.id && msg.receiver_id === activeContact.id) ||
          (msg.sender_id === activeContact.id && msg.receiver_id === user.id)
        ) {
          setMessages(prev => [...prev, msg]);
        }
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [activeContact, user.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeContact) return;

    const msgContent = newMessage;
    setNewMessage('');

    await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender_id: user.id,
        receiver_id: activeContact.id,
        content: msgContent
      })
    });
  };

  return (
    <div className="h-[calc(100vh-8rem)] md:h-[calc(100vh-6rem)] glass rounded-3xl overflow-hidden flex shadow-xl">
      {/* Contacts List */}
      <div className={`w-full md:w-80 border-r border-slate-200 dark:border-slate-700/50 flex flex-col ${activeContact ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 border-b border-slate-200 dark:border-slate-700/50">
          <h2 className="font-bold text-lg">Mesajlar</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {contacts.map(contact => (
            <button 
              key={contact.id} 
              onClick={() => setActiveContact(contact)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-left ${activeContact?.id === contact.id ? 'bg-blue-50 dark:bg-blue-900/30' : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
            >
              <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden shrink-0">
                {contact.avatar_url ? <img src={contact.avatar_url} className="w-full h-full object-cover" /> : <UserIcon size={20} className="text-slate-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm truncate">{contact.full_name}</h4>
                <p className="text-xs text-slate-500 truncate capitalize">{contact.role}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`flex-1 flex flex-col bg-white/30 dark:bg-slate-900/30 ${!activeContact ? 'hidden md:flex' : 'flex'}`}>
        {activeContact ? (
          <>
            <div className="p-4 border-b border-slate-200 dark:border-slate-700/50 flex items-center gap-3 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md z-10">
              <button className="md:hidden p-2 -ml-2" onClick={() => setActiveContact(null)}>
                <ArrowLeft size={20} />
              </button>
              <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden shrink-0">
                {activeContact.avatar_url ? <img src={activeContact.avatar_url} className="w-full h-full object-cover" /> : <UserIcon size={20} className="text-slate-400" />}
              </div>
              <h3 className="font-bold">{activeContact.full_name}</h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => {
                const isMe = msg.sender_id === user.id;
                return (
                  <div key={i} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${isMe ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white dark:bg-slate-800 shadow-sm rounded-bl-sm'}`}>
                      {msg.content}
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-slate-200 dark:border-slate-700/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
              <form onSubmit={sendMessage} className="flex gap-2">
                <input 
                  type="text" 
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  placeholder="Bir mesaj yazın..." 
                  className="flex-1 glass-input py-2.5"
                />
                <button type="submit" disabled={!newMessage.trim()} className="glass-button px-4 py-2.5 flex items-center justify-center disabled:opacity-50">
                  <Send size={18} />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-500">
            <MessageCircle size={48} className="mb-4 opacity-20" />
            <p>Mesajlaşmaya başlamak için bir kişi seçin</p>
          </div>
        )}
      </div>
    </div>
  );
}

