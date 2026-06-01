import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import MiniAIAssistant from './components/MiniAIAssistant';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import { LanguageProvider } from './contexts/LanguageContext';
import { handleGoogleRedirect } from './lib/googleAuth';

handleGoogleRedirect();

const Home = lazy(() => import('./pages/Home'));
const Explore = lazy(() => import('./pages/Explore'));
const Professions = lazy(() => import('./pages/Professions'));
const Jobs = lazy(() => import('./pages/Jobs'));
const CreateJob = lazy(() => import('./pages/CreateJob'));
const MapView = lazy(() => import('./pages/Map'));
const Ustagram = lazy(() => import('./pages/Ustagram'));
const Showcase = lazy(() => import('./pages/Showcase'));
const Academy = lazy(() => import('./pages/Academy'));
const Profile = lazy(() => import('./pages/Profile'));
const Messages = lazy(() => import('./pages/Messages'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const FAQ = lazy(() => import('./pages/FAQ'));
const AIAssistant = lazy(() => import('./pages/AIAssistant'));
const CompanyDashboard = lazy(() => import('./pages/CompanyDashboard'));
const Wallet = lazy(() => import('./pages/Wallet'));
const Community = lazy(() => import('./pages/Community'));
const Leaderboard = lazy(() => import('./pages/Leaderboard'));
const UstabasiTV = lazy(() => import('./pages/UstabasiTV'));
const Events = lazy(() => import('./pages/Events'));
const Settings = lazy(() => import('./pages/Settings'));
const GlobalMarket = lazy(() => import('./pages/GlobalMarket'));
const Marketplace = lazy(() => import('./pages/Marketplace'));
const PlusSubscription = lazy(() => import('./pages/PlusSubscription'));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="explore" element={<Explore />} />
                <Route path="professions" element={<Professions />} />
                <Route path="jobs" element={<Jobs />} />
                <Route path="create-job" element={<ProtectedRoute><CreateJob /></ProtectedRoute>} />
                <Route path="map" element={<MapView />} />
                <Route path="ustagram" element={<Ustagram />} />
                <Route path="showcase" element={<Showcase />} />
                <Route path="academy" element={<Academy />} />
                <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
                <Route path="ai" element={<AIAssistant />} />
                <Route path="company" element={<CompanyDashboard />} />
                <Route path="wallet" element={<ProtectedRoute><Wallet /></ProtectedRoute>} />
                <Route path="community" element={<Community />} />
                <Route path="leaderboard" element={<Leaderboard />} />
                <Route path="tv" element={<UstabasiTV />} />
                <Route path="events" element={<Events />} />
                <Route path="settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                <Route path="global" element={<GlobalMarket />} />
                <Route path="marketplace" element={<Marketplace />} />
                <Route path="plus" element={<PlusSubscription />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="faq" element={<FAQ />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
            </Suspense>
            <MiniAIAssistant />
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;