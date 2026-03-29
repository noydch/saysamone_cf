import { useState, useEffect } from 'react';
import { Link, Unlink, Save, AlertCircle } from 'lucide-react';
import useStore from '../store';
import { initFacebookSdk, loginFacebook, getPages, getLoginStatus } from '../services/facebook';

const FacebookIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  </svg>
);

const Settings = () => {
  const { activePage, setActivePage } = useStore();
  const [isConnecting, setIsConnecting] = useState(false);
  const [availablePages, setAvailablePages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initialize FB SDK
    initFacebookSdk().then(() => {
        // Check if already logged in and fetch pages if so
        getLoginStatus().then(response => {
           if(response.status === 'connected') {
              loadPages();
           }
        });
    });
  }, []);

  const loadPages = async () => {
     try {
       const pages = await getPages();
       setAvailablePages(pages);
     } catch (err) {
       console.error("Failed to load FB pages", err);
       setError("Failed to fetch your Facebook pages. Please check your App ID configuration.");
     }
  };

  const handleConnectFB = async () => {
    setIsConnecting(true);
    setError(null);
    try {
      await loginFacebook();
      const pages = await getPages();
      setAvailablePages(pages);
      if (pages.length > 0) {
        // Default to first page for now but user selects below
        // setActivePage(pages[0]); 
      }
    } catch (err) {
      console.error("Facebook Login failed", err);
      setError(typeof err === 'string' ? err : "Connection failed. Please ensure you have a valid FB App ID.");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleSelectPage = (page) => {
    setActivePage({
      id: page.id,
      name: page.name,
      accessToken: page.access_token, // Page access token is critical for webhooks
      isConnected: true
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 lg:space-y-8">
      <div>
         <h1 className="text-2xl font-bold text-slate-800">System Settings</h1>
         <p className="text-sm text-slate-500">Configure Facebook integration and system preferences.</p>
      </div>

      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-600 p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
           <AlertCircle size={20} />
           <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
           <div className="flex items-center gap-3 mb-1">
             <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
               <FacebookIcon className="w-6 h-6" />
             </div>
             <div>
               <h2 className="text-lg font-bold text-slate-800">Facebook Connection</h2>
               <p className="text-sm text-slate-500">Link your Facebook page to automatically pull live comments.</p>
             </div>
           </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Status block */}
          <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50">
             <div>
               <p className="text-sm font-semibold text-slate-700">Connection Status</p>
               <div className="flex items-center gap-2 mt-1">
                 {activePage ? (
                   <>
                     <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                     <span className="text-sm text-emerald-600 font-bold">Connected: {activePage.name}</span>
                   </>
                 ) : (
                   <>
                     <span className="w-2.5 h-2.5 bg-rose-500 rounded-full shadow-[0_0_8px_rgba(244,63,94,0.5)]"></span>
                     <span className="text-sm text-rose-600 font-bold">Disconnected</span>
                   </>
                 )}
               </div>
             </div>
             
             {!availablePages.length && !activePage ? (
               <button 
                 onClick={handleConnectFB} 
                 disabled={isConnecting}
                 className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm focus:ring-4 focus:ring-blue-600/20 disabled:opacity-50"
               >
                 {isConnecting ? 'Linking...' : <><Link size={18}/> Link Facebook</>}
               </button>
             ) : (
               <button 
                 onClick={() => {
                   setActivePage(null);
                   setAvailablePages([]);
                 }} 
                 className="flex items-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
               >
                 <Unlink size={18}/> Disconnect Account
               </button>
             )}
          </div>

          {/* Select Page */}
          {availablePages.length > 0 && (
            <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
              <label className="block text-sm font-bold text-slate-700">Select Active Page to Monitor</label>
              <div className="grid gap-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {availablePages.map(page => (
                  <label 
                    key={page.id} 
                    className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${activePage?.id === page.id ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-600/10' : 'border-slate-200 hover:bg-slate-50'}`}
                    onClick={() => handleSelectPage(page)}
                  >
                    <input 
                      type="radio" 
                      name="fb_page" 
                      className="w-5 h-5 text-blue-600 focus:ring-blue-500/50" 
                      checked={activePage?.id === page.id} 
                      onChange={() => {}} // Controlled via onClick
                    />
                    <div className="ml-4 flex-1">
                      <span className="block font-bold text-slate-800 text-sm">{page.name}</span>
                      <span className="block text-xs text-slate-500">ID: {page.id}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm focus:ring-4 focus:ring-slate-900/20">
            <Save size={18} /> Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
