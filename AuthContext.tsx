export default function FAQ() {
  const faqs = [
    { q: "USTABAŞI'na üye olmak ücretli mi?", a: "Hayır, platformumuza standart üyelik tamamen ücretsizdir." },
    { q: "Nasıl ilan verebilirim?", a: "İş veren hesabı oluşturduktan sonra 'İlan Ver' butonuna tıklayarak kolayca ilan oluşturabilirsiniz." },
    { q: "Ustaların güvenilirliğini nasıl anlarım?", a: "Ustaların profillerindeki puanları, tamamladıkları işleri ve önceki müşterilerin yorumlarını inceleyebilirsiniz." },
    { q: "Mobil uygulama ne zaman çıkacak?", a: "Şu anda web sürümümüz yayında, mobil uygulamalarımız çok yakında App Store ve Google Play'de yerini alacak." }
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center">Sıkça Sorulan Sorular</h1>
      
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="glass-panel p-6 rounded-2xl">
            <h3 className="font-bold text-lg mb-2">{faq.q}</h3>
            <p className="text-slate-600 dark:text-slate-300">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
