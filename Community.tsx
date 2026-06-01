export default function About() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center">Hakkımızda</h1>
      <div className="glass p-8 rounded-3xl space-y-6">
        <p className="text-lg">
          <strong>USTABAŞI</strong>, usta iş verenleri ve ustaları dijital dünyada buluşturan yenilikçi bir platformdur.
        </p>
        <p className="text-slate-600 dark:text-slate-300">
          Amacımız, geleneksel iş bulma ve usta arama süreçlerini dijitalleştirerek, güvenilir, hızlı ve şeffaf bir ekosistem yaratmaktır. İster evinizdeki bir arıza için güvenilir bir usta arıyor olun, ister büyük bir proje için taşeron ekiplere ihtiyacınız olsun; USTABAŞI size en uygun çözümleri sunar.
        </p>
        <div className="grid sm:grid-cols-2 gap-6 mt-8">
          <div className="glass-panel p-6">
            <h3 className="font-bold text-lg mb-2">Vizyonumuz</h3>
            <p className="text-sm text-slate-500">Sektördeki tüm profesyonelleri tek bir çatı altında toplayarak Türkiye'nin en büyük dijital istihdam platformu olmak.</p>
          </div>
          <div className="glass-panel p-6">
            <h3 className="font-bold text-lg mb-2">Misyonumuz</h3>
            <p className="text-sm text-slate-500">Hem iş verenlere hem de ustalara zaman ve maliyet tasarrufu sağlayan, güven odaklı bir pazar yeri sunmak.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
