import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import LiveManagement from './pages/LiveManagement';
import LiveStudio from './pages/LiveStudio';
import Inventory from './pages/Inventory';
import OrdersList from './pages/OrdersList';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Billing from './pages/Billing';
import AdminLayout from './components/AdminLayout';
import useStore from './store';
import { getCurrentUser } from './services/api';

function App() {
  const { user, setUser } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user session exists on backend
    getCurrentUser()
      .then(res => {
         setUser(res.data);
      })
      .catch(() => {
         // Not logged in or session expired
         setUser(null);
      })
      .finally(() => {
         setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-900">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" replace />} />
        
        <Route element={user ? <AdminLayout /> : <Navigate to="/login" replace />}>
           <Route path="/dashboard" element={<Dashboard />} />
           <Route path="/live-campaigns" element={<LiveManagement />} />
           <Route path="/live-studio/active" element={<LiveStudio />} />
           <Route path="/orders" element={<OrdersList />} />
           <Route path="/inventory" element={<Inventory />} />
           <Route path="/billing" element={<Billing />} />
           <Route path="/reports" element={<Reports />} />
           <Route path="/settings" element={<Settings />} />
           <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
