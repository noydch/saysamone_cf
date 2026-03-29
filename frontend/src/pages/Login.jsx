import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useStore from '../store';
import { useNavigate } from 'react-router-dom';
import { initFacebookSdk, loginFacebook } from '../services/facebook';

const FacebookIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M12 2.04c-5.5 0-10 4.48-10 10.02 0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.54-4.5-10.02-10-10.02z" clipRule="evenodd" />
  </svg>
);

const Login = () => {
  const { t, i18n } = useTranslation();
  const setUser = useStore(state => state.setUser);
  const navigate = useNavigate();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    initFacebookSdk();
  }, []);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    // Use Passport.js OAuth flow (Server side)
    window.location.href = `http://localhost:5000/api/auth/facebook`;
  };

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'th' ? 'lo' : 'th';
    i18n.changeLanguage(nextLang);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-900 via-slate-900 to-slate-900 relative overflow-hidden font-sans">
      
      {/* Decorative Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Language Switcher */}
      <div className="absolute top-6 right-6 z-20">
        <button 
          onClick={toggleLanguage}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 rounded-xl shadow-lg text-sm font-semibold text-slate-200 transition-all duration-300 hover:scale-105"
        >
          {i18n.language === 'th' ? '🇱🇦 ລາວ' : '🇹🇭 ไทย'}
        </button>
      </div>

      <div className="max-w-md w-full space-y-10 p-12 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] z-10 relative">
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/50 transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <FacebookIcon className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white mb-2 tracking-tight">
            {t('app_name')}
          </h2>
          <p className="mt-2 text-sm text-blue-200/70 font-medium">
            Connect your Facebook account to start managing your live sales.
          </p>
        </div>
        
        <button
          onClick={handleLogin}
          disabled={isLoggingIn}
          className="group relative w-full flex justify-center items-center py-4 px-4 border border-white/10 text-base font-bold rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:-translate-y-1 disabled:opacity-50"
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-4">
            <FacebookIcon className="h-6 w-6 text-white/80 group-hover:text-white transition-colors" aria-hidden="true" />
          </span>
          {isLoggingIn ? 'Connecting...' : t('login')}
        </button>
      </div>
    </div>
  );
};

export default Login;
