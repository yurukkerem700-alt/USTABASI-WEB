import { createContext, useContext, useState, useEffect } from 'react';

type Language = 'tr' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const enTranslations: Record<string, string> = {
  'nav.home': 'Home',
  'nav.explore': 'Explore',
  'nav.jobs': 'Jobs',
  'nav.map': 'Map',
  'nav.ustagram': 'Ustagram',
  'nav.profile': 'Profile',
  'nav.wallet': 'Wallet',
  'nav.ai': 'AI Assistant',
  'nav.settings': 'Settings',
  'nav.logout': 'Log Out',
  'nav.login': 'Log In',
  'nav.register': 'Sign Up',
  'footer.about': 'About Us',
  'footer.support': 'Support',
  'footer.legal': 'Legal',
  'footer.contact': 'Contact',
  'footer.desc': "Turkey's largest mastery and service ecosystem. Find jobs safely, showcase your skills.",
  
  // Home
  "Türkiye'nin En Büyük Ustalık Ekosistemi": "Turkey's Largest Mastery Ecosystem",
  "İş Verenler ve Ustalar": "Employers and Masters",
  "Aynı Platformda": "On the Same Platform",
  "Aradığın yeteneği bul, işini büyüt veya ustalık becerilerini sergileyerek yeni fırsatlar yakala. Güvenli ödeme, yapay zeka desteği ve güçlü topluluk.": "Find the talent you need, grow your business, or showcase your mastery skills to catch new opportunities. Secure payment, AI support, and a strong community.",
  "İş İlanlarına Göz At": "Browse Jobs",
  "Usta Olarak Katıl": "Join as a Master",
  "Meslek, beceri veya usta ara...": "Search profession, skill or master...",
  "Şehir veya ilçe": "City or district",
  "Ara": "Search",
  "Aktif İş İlanı": "Active Jobs",
  "Kayıtlı Usta": "Registered Masters",
  "Tamamlanan İş": "Completed Jobs",
  "Popüler Kategoriler": "Popular Categories",
  "İhtiyacınıza en uygun uzmanları kategorilere göre keşfedin.": "Discover the most suitable experts for your needs by category.",
  "Öne Çıkan İlanlar": "Featured Jobs",
  "Hemen teklif verebileceğiniz güncel fırsatlar.": "Current opportunities you can bid on immediately.",
  "Tümünü Gör": "See All",
  "Tüm İlanları Gör": "See All Jobs",
  "Sistem Nasıl Çalışır?": "How the System Works?",
  "İster usta ol, ister müşteri; USTABAŞI'nda her şey çok kolay.": "Whether you are a master or a customer; everything is very easy on USTABAŞI.",
  "İlan Ver veya Ara": "Post an Ad or Search",
  "İhtiyacın olan işi detaylarıyla yazarak ilan ver veya yeteneklerine uygun işleri filtrele.": "Post an ad describing the job you need in detail or filter jobs suitable for your skills.",
  "Teklifleş ve Anlaş": "Negotiate and Agree",
  "Ustalar ilanlara teklif versin, müşteri en uygun profili ve fiyatı seçerek onaylasın.": "Masters submit bids for ads, the customer selects the most suitable profile and price and approves.",
  "Güvenle Tamamla": "Complete Safely",
  "Escrow sistemiyle ödeme güvende kalır, iş başarıyla bitince ustaya aktarılır.": "Payment remains safe with the Escrow system, transferred to the master when the job is successfully completed.",
  "Haftanın En İyileri": "Best of the Week",
  "Müşteri yorumları ve başarı puanlarına göre öne çıkan ustalar.": "Prominent masters based on customer reviews and success scores.",
  "Liderlik Tablosu": "Leaderboard",
  "Onaylı Yorum": "Verified Reviews",
  "Hemen Ekosisteme Katıl": "Join the Ecosystem Now",
  "İster işini büyütmek isteyen bir usta ol, ister güvenilir hizmet arayan bir müşteri. USTABAŞI'nda yerin hazır.": "Whether you are a master who wants to grow your business or a customer looking for reliable service. Your place is ready in USTABAŞI.",
  "Ücretsiz Kayıt Ol": "Sign Up for Free",
  "Daha Fazla Bilgi": "More Information",
  "Canlı Platform Raporu": "Live Platform Report",
  "USTABAŞI ekosisteminde şu an neler oluyor? Veriler anlık olarak güncellenmektedir.": "What is happening in the USTABAŞI ecosystem right now? Data is updated instantly.",
  "Bugün Başlayan": "Started Today",
  "Şu An Devam Eden": "Currently Ongoing",
  "Bugün Tamamlanan": "Completed Today",
  "Aktif Teklifler": "Active Bids",

  // Dashboard
  "Günaydın": "Good Morning",
  "Bugün harika işler başarmak için yeni bir gün.": "Today is a new day to achieve great things.",
  "Bugünkü Kazanç": "Today's Earnings",
  "Aktif İşler": "Active Jobs",
  "Güneşli ve Açık": "Sunny and Clear",
  "Dış mekan işleri ve şantiye çalışmaları için mükemmel bir gün.": "A perfect day for outdoor jobs and construction work.",
  "Takvim & Vakitler": "Calendar & Prayer Times",
  "Öğle Vaktine Kalan": "Time Remaining for Dhuhr",
  "İmsak": "Fajr",
  "Güneş": "Sunrise",
  "Öğle": "Dhuhr",
  "İkindi": "Asr",
  "Akşam": "Maghrib",
  "Ramazan ayına 42 gün kaldı": "42 days left until Ramadan",
  "Namaz vakitleri ve dini gün hatırlatmalarını açmak ister misiniz?": "Would you like to turn on prayer times and religious day reminders?",
  "Aktifleştir": "Activate",
  "Günlük Hedefler": "Daily Goals",
  "Tamamlandı": "Completed",
  "Bugün 2 yeni ilana teklif ver": "Bid on 2 new jobs today",
  "Profil bilgilerini eksiksiz doldur": "Fill out your profile information completely",
  "Portfolyona yeni bir fotoğraf ekle": "Add a new photo to your portfolio",
  "İlk iş ilanını oluştur": "Create your first job posting",
  "Akademi üzerinden 1 eğitim videosu izle": "Watch 1 training video on the Academy",
  "Çevrimiçi Usta": "Online Masters",
  "İş Durum Raporum": "My Job Status Report",
  "Devam Eden": "Ongoing",
  "Beklemede / Teklif": "Pending / Bid",
  "Şişli'deki elektrik tesisatı işi için müşteri sizden onay bekliyor.": "The customer is waiting for your approval for the electrical installation job in Şişli.",
  "Günün Motivasyonu": "Motivation of the Day",
  "Ustalık, bir işi sadece bitirmek değil, o işe imzanı atmaktır. Her detayda kaliteni göster.": "Mastery is not just finishing a job, it's putting your signature on it. Show your quality in every detail.",
  "Tarihin En Büyük Ustası": "The Greatest Master in History",
  "Sana Uygun İşler": "Jobs Suitable for You",
  "Bölgendeki 5 yeni ilanı incele": "Review 5 new ads in your region",
  "Ustabaşı TV": "Ustabaşı TV",
  "Yeni eğitim videoları eklendi": "New training videos added",

  // Jobs
  "İş İlanları": "Job Postings",
  "Sana en uygun fırsatları keşfet": "Discover the most suitable opportunities for you",
  "İlan Ver": "Post Job",
  "Filtrele": "Filter",
  "Filtreler": "Filters",
  "Kategori": "Category",
  "Şehir / İlçe": "City / District",
  "Konum ara...": "Search location...",
  "Bütçe Aralığı": "Budget Range",
  "Kriterlere uygun ilan bulunamadı": "No job ads found matching the criteria",
  "Teklif Ver": "Bid",
  "Yakınınızda": "Near You",
  "Bütçe": "Budget",

  // Settings
  "Ayarlar": "Settings",
  "Hesap Bilgileri": "Account Info",
  "Bildirimler": "Notifications",
  "Gizlilik ve Güvenlik": "Privacy and Security",
  "Görünüm ve Dil Ayarları": "Appearance and Language",
  "Ödeme ve Fatura": "Billing and Invoicing",
  "Fotoğrafı Değiştir": "Change Photo",
  "Maksimum 2MB, JPG veya PNG.": "Maximum 2MB, JPG or PNG.",
  "Ad Soyad": "Full Name",
  "E-posta": "Email",
  "Telefon": "Phone",
  "Konum": "Location",
  "Değişiklikleri Kaydet": "Save Changes",
  "Bildirim Tercihleri": "Notification Preferences",
  "Yeni İş İlanları": "New Job Ads",
  "Bölgemde ve yeteneklerime uygun yeni iş ilanları açıldığında.": "When new job ads suitable for my skills open in my region.",
  "Mesaj ve Teklifler": "Messages and Bids",
  "Birisi bana mesaj gönderdiğinde veya teklifime yanıt verdiğinde.": "When someone sends me a message or replies to my bid.",
  "Pazarlama ve Kampanyalar": "Marketing and Campaigns",
  "USTABAŞI indirimleri ve kampanya haberleri.": "USTABAŞI discounts and campaign news.",
  "Ezan ve Takvim Hatırlatmaları": "Adhan and Calendar Reminders",
  "Namaz vakitleri ve dini gün bildirimleri.": "Prayer times and religious day notifications.",
  "Uygulama Dili (Language)": "App Language",
  "Platformun arayüz dilini değiştirin.": "Change the interface language of the platform.",
  "Türkçe": "Turkish",
  "English": "English",
  "Karanlık Mod (Dark Mode)": "Dark Mode",
  "Göz yorgunluğunu azaltmak için karanlık temayı kullanın.": "Use dark theme to reduce eye strain.",
  "Tema Vurgu Rengi": "Theme Accent Color",
  "Butonlar ve aktif öğeler için renk seçin.": "Select a color for buttons and active items.",
  "Şifre Değiştir": "Change Password",
  "Hesap güvenliğiniz için şifrenizi güncelleyin.": "Update your password for account security.",
  "Hesabı Sil": "Delete Account",
  "Bu işlem geri alınamaz. Tüm verileriniz kalıcı olarak silinir.": "This action cannot be undone. All your data will be permanently deleted.",
  "Mevcut Plan": "Current Plan",
  "Standart Üyelik": "Standard Membership",
  "Plus'a Yükselt": "Upgrade to Plus",
  "Henüz kayıtlı bir ödeme yönteminiz bulunmuyor.": "You do not have a registered payment method yet.",

  // Common
  "Tümü": "All",
  "Elektrik": "Electrical",
  "Tesisat": "Plumbing",
  "Kaba İnşaat": "Rough Construction",
  "Boya & Badana": "Painting",
  "Mobilya": "Furniture",
  "İklimlendirme": "HVAC",
  "Otomotiv": "Automotive",
  "Akıllı Ev": "Smart Home",
  "Acil": "Urgent",
  "Malzemeli": "With Materials",
  "Proje": "Project",
  "Taşeron": "Subcontractor",
  "Günlük": "Daily",
  "Hızlı": "Fast",
  "Usta": "Master",
};

const trNavKeys: Record<string, string> = {
  'nav.home': 'Ana Sayfa',
  'nav.explore': 'Keşfet',
  'nav.jobs': 'İlanlar',
  'nav.map': 'Harita',
  'nav.ustagram': 'Ustagram',
  'nav.profile': 'Profil',
  'nav.wallet': 'Cüzdan',
  'nav.ai': 'AI Asistan',
  'nav.settings': 'Ayarlar',
  'nav.logout': 'Çıkış Yap',
  'nav.login': 'Giriş Yap',
  'nav.register': 'Kayıt Ol',
  'footer.about': 'Hakkımızda',
  'footer.support': 'Destek',
  'footer.legal': 'Yasal',
  'footer.contact': 'İletişim',
  'footer.desc': "Türkiye'nin en büyük ustalık ve hizmet ekosistemi. Güvenle iş bul, yeteneğini sergile.",
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('ustabasi_lang');
    if (saved === 'tr' || saved === 'en') return saved;
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('tr')) return 'tr';
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('ustabasi_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: string): string => {
    if (lang === 'en') {
      return enTranslations[key] || key;
    }
    if (lang === 'tr') {
      return trNavKeys[key] || key;
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
