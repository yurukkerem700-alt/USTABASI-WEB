export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center">İletişim</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="glass p-8 rounded-3xl">
          <h2 className="text-xl font-bold mb-6">Bize Ulaşın</h2>
          <form className="space-y-4" onSubmit={e => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium mb-1">Adınız</label>
              <input type="text" className="glass-input" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">E-posta</label>
              <input type="email" className="glass-input" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mesajınız</label>
              <textarea rows={4} className="glass-input resize-none"></textarea>
            </div>
            <button className="glass-button w-full">Gönder</button>
          </form>
        </div>
        
        <div className="space-y-6">
          <div className="glass-panel p-6 flex flex-col items-center justify-center text-center h-full">
            <h3 className="font-bold text-lg mb-2">Müşteri Hizmetleri</h3>
            <p className="text-slate-500 mb-4">Sorularınız için bize her zaman ulaşabilirsiniz.</p>
            <a href="mailto:info@ustabasi.com" className="text-blue-600 font-medium text-lg">info@ustabasi.com</a>
            <p className="mt-4 text-sm text-slate-400">Pzt - Cuma: 09:00 - 18:00</p>
          </div>
        </div>
      </div>
    </div>
  );
}
