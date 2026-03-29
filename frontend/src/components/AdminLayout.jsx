import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, ShoppingCart, Video, Package, Settings, LogOut, Menu, X, Globe, BarChart3, Receipt } from 'lucide-react';
import useStore from '../store';
import { logout as backendLogout } from '../services/api';

const AdminLayout = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { user, setUser } = useStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Menus
  const NAVIGATION = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Orders', path: '/orders', icon: ShoppingCart },
    { name: 'Live Studio', path: '/live-campaigns', icon: Video },
    { name: 'Inventory', path: '/inventory', icon: Package },
    { name: 'Billing', path: '/billing', icon: Receipt },
    { name: 'Reports', path: '/reports', icon: BarChart3 },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    try {
      await backendLogout();
    } catch (err) {
      console.error("Logout error", err);
    }
    setUser(null);
    navigate('/login');
  };

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'th' ? 'lo' : 'th');
  };

  return (
    <div className="h-screen w-full bg-slate-50 flex font-sans overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-slate-900 text-white z-50 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:w-64 flex flex-col ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-white/10 shrink-0">
           <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
             <div className="w-3 h-3 border-2 border-white rounded-sm"></div>
           </div>
           <span className="font-bold text-xl tracking-tight text-white">CF Admin</span>
           <button className="ml-auto md:hidden text-slate-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
             <X size={20} />
           </button>
        </div>

        {/* User Badge */}
        <div className="px-6 py-6 border-b border-white/10 shrink-0">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 overflow-hidden flex-shrink-0">
                 {user?.profilePic ? <img src={user.profilePic} alt=""/> : <div className="w-full h-full flex items-center justify-center font-bold text-slate-400">JD</div>}
              </div>
              <div className="overflow-hidden">
                <p className="font-bold text-sm truncate">{user?.name || 'Admin User'}</p>
                <p className="text-xs text-emerald-400 truncate flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 block"></span> Connected</p>
              </div>
           </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
          {NAVIGATION.map((item) => {
             const Icon = item.icon;
             return (
               <NavLink
                 key={item.name}
                 to={item.path}
                 className={({ isActive }) => 
                   `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium
                   ${isActive 
                     ? 'bg-blue-600/10 text-blue-500 border border-blue-600/20' 
                     : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`
                 }
               >
                 {({ isActive }) => (
                   <>
                     <Icon size={18} className={isActive ? 'text-blue-500' : 'text-slate-500'} />
                     {item.name}
                   </>
                 )}
               </NavLink>
             );
          })}
        </nav>

        {/* Footer actions */}
        <div className="p-4 border-t border-white/10 shrink-0 space-y-2">
            <button onClick={toggleLang} className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-slate-400 hover:bg-slate-800 hover:text-slate-200 text-sm font-medium transition-colors">
               <Globe size={18} className="text-slate-500"/>
               {i18n.language === 'th' ? 'Switch to Lao (LA)' : 'Switch to Thai (TH)'}
            </button>
            <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 text-sm font-medium transition-colors">
               <LogOut size={18} className="text-rose-500"/>
               Logout
            </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Mobile Header (only visible on md <) */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:hidden shrink-0">
           <button onClick={() => setSidebarOpen(true)} className="text-slate-600 p-2 -ml-2 rounded-lg hover:bg-slate-100">
             <Menu size={24} />
           </button>
           <span className="font-bold text-lg">CF Admin</span>
           <div className="w-8"></div>
        </header>

        {/* Page Content Holder */}
        <div className="flex-1 overflow-auto bg-[#F4F5F7] p-4 md:p-8">
           <Outlet />
        </div>
      </div>

    </div>
  );
};

export default AdminLayout;
