import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, Compass, Briefcase, Map, Image as ImageIcon, User, Menu, Moon, Sun, X, Bell, MessageCircle, LogOut, Bot, Wallet, Users, Trophy, Building, PlayCircle, Calendar, Settings as SettingsIcon, Globe, ShoppingBag, Crown, ChevronDown } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import supabase from '../lib/supabase';

export default function Layout() {
  const { theme, toggleTheme } = useTheme();
  const { user, profile } = useAuth();
  const { t, lang, setLang } = useLanguage();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { path: '/', label: t('nav.home'), icon: Home },
    { path: '/explore', label: t('nav.explore'), icon: Compass },
    { path: '/jobs', label: t('nav.jobs'), icon: Briefcase },
    { path: '/map', label: t('nav.map'), icon: Map },
    { path: '/ustagram', label: t('nav.ustagram'), icon: ImageIcon },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0">
      <header className="sticky top-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2">
                <img src="/uploads/upload_1.png" alt="Ustabaşı" className="h-10 w-auto object-contain rounded-lg" onError={(e) => { e.currentTarget.style.display = 'none' }} />
                <span className="font-bold text-xl hidden sm:block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">USTABAŞI</span>
              </Link>
            </div>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${isActive ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <button onClick={toggleTheme} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              {user ? (
                <div className="hidden md:flex items-center gap-2 ml-2">
                  <Link to="/messages" className="p-2 relative text-slate-600 hover:text-blue-600 transition-colors" title="Mesajlar">
                    <MessageCircle size={20} />
                  </Link>
                  <button className="p-2 relative text-slate-600 hover:text-blue-600 transition-colors mr-2" title="Bildirimler">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                  
                  {/* Compact User Menu Dropdown */}
                  <div className="relative" ref={userMenuRef}>
                    <button 
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center gap-2 px-2 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-transparent hover:border-slate-300 dark:hover:border-slate-600"
                    >
                      <img src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${profile?.full_name || 'User'}&background=random`} alt="Avatar" className="w-7 h-7 rounded-full object-cover" />
                      <span className="text-sm font-medium hidden lg:block">{profile?.full_name?.split(' ')[0] || 'Profil'}</span>
                      <ChevronDown size={14} className="text-slate-500" />
                    </button>

                    <AnimatePresence>
                      {isUserMenuOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 top-full mt-2 w-56 glass rounded-2xl p-2 shadow-2xl border border-slate-200 dark:border-slate-700/50 flex flex-col gap-1 z-50"
                        >
                          <div className="px-3 py-2 border-b border-slate-200 dark:border-slate-700/50 mb-1">
                            <p className="font-bold text-sm truncate">{profile?.full_name}</p>
                            <p className="text-xs text-slate-500 capitalize">{profile?.role}</p>
                          </div>
                          <Link to="/profile" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                            <User size={16} className="text-blue-500" /> {t('nav.profile')}
                          </Link>
                          <Link to="/wallet" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                            <Wallet size={16} className="text-green-500" /> {t('nav.wallet')}
                          </Link>
                          <Link to="/ai" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                            <Bot size={16} className="text-purple-500" /> {t('nav.ai')}
                          </Link>
                          <Link to="/settings" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                            <SettingsIcon size={16} className="text-slate-500" /> {t('nav.settings')}
                          </Link>
                          <div className="h-px bg-slate-200 dark:bg-slate-700 my-1"></div>
                          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left w-full">
                            <LogOut size={16} /> {t('nav.logout')}
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                <div className="hidden md:block">
                  <Link to="/login" className="px-4 py-2 text-sm font-medium hover:text-blue-600 transition-colors">{t('nav.login')}</Link>
                  <Link to="/register" className="glass-button text-sm py-2 px-4">{t('nav.register')}</Link>
                </div>
              )}

              {/* Language Switcher */}
              <button 
                onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')} 
                className="hidden md:block ml-2 px-2 py-1 text-xs font-bold bg-slate-100 dark:bg-slate-800 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors uppercase"
              >
                {lang}
              </button>

              <button 
                className="md:hidden p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 glass pb-safe z-40 border-t border-white/20 dark:border-slate-700/50">
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}
              >
                <Icon size={isActive ? 24 : 22} strokeWidth={isActive ? 2.5 : 2} className="transition-all" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
          {user ? (
            <Link to="/profile" className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${location.pathname === '/profile' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}>
              <User size={location.pathname === '/profile' ? 24 : 22} strokeWidth={location.pathname === '/profile' ? 2.5 : 2} />
              <span className="text-[10px] font-medium">Profil</span>
            </Link>
          ) : (
            <Link to="/login" className="flex flex-col items-center justify-center w-full h-full space-y-1 text-slate-500 dark:text-slate-400">
              <User size={22} />
              <span className="text-[10px] font-medium">Giriş</span>
            </Link>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-64 glass z-50 md:hidden flex flex-col shadow-2xl"
            >
              <div className="p-4 flex justify-between items-center border-b border-slate-200 dark:border-slate-700">
                <span className="font-bold">Menü</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700">
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                {user && (
                  <>
                    <Link to="/ai" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-3 text-purple-600">
                      <Bot size={18} /> AI Asistan
                    </Link>
                    <Link to="/wallet" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-3 text-green-600">
                      <Wallet size={18} /> Cüzdan & Ödeme
                    </Link>
                    <Link to="/messages" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-3">
                      <MessageCircle size={18} /> Mesajlar
                    </Link>
                    {profile?.role === 'firma' && (
                      <Link to="/company" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-3 text-blue-600">
                        <Building size={18} /> Firma Merkezi
                      </Link>
                    )}
                  </>
                )}
                <div className="h-px bg-slate-200 dark:bg-slate-700 my-2"></div>
                {user && (
                  <Link to="/settings" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-3"><SettingsIcon size={18}/> Ayarlar</Link>
                )}
                <Link to="/global" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-3"><Globe size={18}/> Global Pazar</Link>
                <Link to="/marketplace" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-3"><ShoppingBag size={18}/> Marketplace</Link>
                <Link to="/community" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-3"><Users size={18}/> Topluluk</Link>
                <Link to="/leaderboard" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-3"><Trophy size={18}/> Liderlik Tablosu</Link>
                <Link to="/tv" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-3"><PlayCircle size={18}/> Ustabaşı TV</Link>
                <Link to="/events" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-3"><Calendar size={18}/> Etkinlikler</Link>
                <Link to="/academy" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Akademi</Link>
                <Link to="/professions" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Meslekler</Link>
                <div className="h-px bg-slate-200 dark:bg-slate-700 my-2"></div>
                <Link to="/plus" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 rounded-xl bg-gradient-to-r from-yellow-400/20 to-amber-600/20 text-amber-700 dark:text-amber-400 font-bold hover:from-yellow-400/30 hover:to-amber-600/30 transition-colors flex items-center gap-3"><Crown size={18}/> Plus'a Geç</Link>
              </div>
              <div className="p-4 border-t border-slate-200 dark:border-slate-700 space-y-3">
                {user ? (
                  <button onClick={handleLogout} className="block w-full text-center glass-button bg-red-500 hover:bg-red-600">Çıkış Yap</button>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center py-2 glass-panel font-medium">Giriş Yap</Link>
                    <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center glass-button">Kayıt Ol</Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* Mega Footer */}
      <footer className="glass mt-auto border-t border-slate-200 dark:border-slate-800/50 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            <div className="lg:col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <img src="/uploads/upload_1.png" alt="Ustabaşı" className="h-12 w-auto object-contain rounded-xl shadow-sm" onError={(e) => { e.currentTarget.style.display = 'none' }} />
                <span className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">USTABAŞI</span>
              </Link>
              <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm mb-6 leading-relaxed">
                {t('footer.desc')}
              </p>
              <div className="flex gap-4">
                {/* Social Icons Placeholders */}
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-blue-500 hover:bg-blue-50 transition-all cursor-pointer"><Globe size={18} /></div>
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-blue-400 hover:bg-blue-50 transition-all cursor-pointer"><MessageCircle size={18} /></div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-slate-800 dark:text-slate-200">Platform</h4>
              <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                <li><Link to="/explore" className="hover:text-blue-600 transition-colors">{t('nav.explore')}</Link></li>
                <li><Link to="/jobs" className="hover:text-blue-600 transition-colors">{t('nav.jobs')}</Link></li>
                <li><Link to="/professions" className="hover:text-blue-600 transition-colors">Meslekler</Link></li>
                <li><Link to="/academy" className="hover:text-blue-600 transition-colors">Akademi</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-slate-800 dark:text-slate-200">{t('footer.support')}</h4>
              <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                <li><Link to="/faq" className="hover:text-blue-600 transition-colors">S.S.S.</Link></li>
                <li><Link to="/contact" className="hover:text-blue-600 transition-colors">{t('footer.contact')}</Link></li>
                <li><Link to="/community" className="hover:text-blue-600 transition-colors">Topluluk</Link></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Kullanım Kılavuzu</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-slate-800 dark:text-slate-200">{t('footer.legal')}</h4>
              <ul className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
                <li><Link to="/about" className="hover:text-blue-600 transition-colors">{t('footer.about')}</Link></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Kullanım Koşulları</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Gizlilik Politikası</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">KVKK Aydınlatma Metni</a></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-200 dark:border-slate-800/50 text-xs text-slate-400">
            <p>&copy; {new Date().getFullYear()} USTABAŞI Ekosistemi. Tüm hakları saklıdır.</p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <span className="flex items-center gap-1"><Globe size={14} /> Türkçe / English</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}