import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import supabase from '../lib/supabase';
import { signInWithGoogle } from '../lib/googleAuth';
import { useLanguage } from '../contexts/LanguageContext';

export default function Register() {
  const { t } = useLanguage();
  const [role, setRole] = useState('usta');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error: authError } = await supabase.auth.signUp({ email, password });
      if (authError) throw authError;

      if (data.user) {
        // Create user profile in database
        const res = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: data.user.id,
            email,
            role,
            full_name: fullName
          })
        });
        
        if (!res.ok) throw new Error('Profil oluşturulamadı');
        navigate('/profile');
      }
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden py-12">
      <div className="absolute top-4 left-4 z-10">
        <Link to="/" className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">
          <ArrowLeft size={20} /> {t('Ana Sayfaya Dön')}
        </Link>
      </div>
      
      <div className="w-full max-w-md glass p-8 rounded-3xl z-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">{t('Aramıza Katılın')}</h1>
          <p className="text-slate-500 mt-2">{t('Yeni bir hesap oluşturun')}</p>
        </div>
        
        <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mb-6">
          <button onClick={() => setRole('usta')} type="button" className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${role === 'usta' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600' : 'text-slate-500'}`}>{t('Usta Olarak')}</button>
          <button onClick={() => setRole('musteri')} type="button" className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${role === 'musteri' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600' : 'text-slate-500'}`}>{t('Müşteri Olarak')}</button>
          <button onClick={() => setRole('firma')} type="button" className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${role === 'firma' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600' : 'text-slate-500'}`}>{t('Firma Olarak')}</button>
        </div>
        
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-xl text-sm">{error}</div>}

        <form className="space-y-4" onSubmit={handleRegister}>
          <div>
            <label className="block text-sm font-medium mb-1 ml-1">{t('Ad Soyad')}</label>
            <input type="text" required value={fullName} onChange={e => setFullName(e.target.value)} placeholder={t("Adınız Soyadınız")} className="glass-input" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 ml-1">{t('E-posta')}</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="ornek@email.com" className="glass-input" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 ml-1">{t('Şifre')}</label>
            <input type="password" required minLength={6} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="glass-input" />
          </div>
          
          <button type="submit" disabled={loading} className="glass-button w-full mt-6 disabled:opacity-50">
            {loading ? t('Kayıt Olunuyor...') : t('Kayıt Ol')}
          </button>
        </form>

        <div className="mt-6 flex items-center gap-4">
          <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1"></div>
          <span className="text-xs text-slate-400 font-medium uppercase">{t('VEYA')}</span>
          <div className="h-px bg-slate-200 dark:bg-slate-700 flex-1"></div>
        </div>
        
        <button onClick={() => signInWithGoogle('USTABAŞI')} className="w-full mt-6 flex items-center justify-center gap-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 py-3 rounded-xl font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.67 15.63 16.71 16.79 15.54 17.57V20.31H19.1C21.01 18.55 22.56 15.65 22.56 12.25Z" fill="#4285F4"/>
            <path d="M12 23C14.97 23 17.46 22.02 19.1 20.31L15.54 17.57C14.65 18.17 13.43 18.55 12 18.55C9.24 18.55 6.9 16.68 6.03 14.18H2.36V17.03C4.14 20.56 7.78 23 12 23Z" fill="#34A853"/>
            <path d="M6.03 14.18C5.81 13.52 5.68 12.78 5.68 12C5.68 11.22 5.81 10.48 6.03 9.82V6.97H2.36C1.63 8.43 1.2 10.15 1.2 12C1.2 13.85 1.63 15.57 2.36 17.03L6.03 14.18Z" fill="#FBBC05"/>
            <path d="M12 5.45C13.62 5.45 15.06 6.01 16.2 7.08L19.18 4.1C17.46 2.47 14.97 1 12 1C7.78 1 4.14 3.44 2.36 6.97L6.03 9.82C6.9 7.32 9.24 5.45 12 5.45Z" fill="#EA4335"/>
          </svg>
          {t('Google ile Kayıt Ol')}
        </button>
        
        <div className="mt-6 text-center text-sm text-slate-500">
          {t('Zaten hesabınız var mı?')} <Link to="/login" className="text-blue-600 font-medium hover:underline">{t('Giriş Yapın')}</Link>
        </div>
      </div>
    </div>
  );
}