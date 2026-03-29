import { ArrowDownToLine, CheckCircle2, Search, XCircle, ChevronDown } from 'lucide-react';
import useStore from '../store';

const OrdersList = () => {
  const { orders } = useStore();

  const formatDate = (iso) => new Date(iso).toLocaleDateString();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-slate-800">Orders Management</h1>
           <p className="text-sm text-slate-500">View and manage all customer CF orders.</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-xl font-bold text-sm transition-colors shadow-sm focus:ring-4 focus:ring-slate-100">
          <ArrowDownToLine size={18} /> Export CSV
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-4">
           <div className="relative w-full max-w-sm">
             <Search size={18} className="absolute left-3 top-2.5 text-slate-400" />
             <input type="text" placeholder="Search order ID or customer..." className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
           </div>
           
           <div className="relative">
              <select className="appearance-none px-4 pr-10 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none cursor-pointer">
                <option>All Status</option>
                <option>Pending</option>
                <option>Confirmed</option>
                <option>Canceled</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-3 text-slate-400 pointer-events-none" />
           </div>
           
           <div className="relative">
              <select className="appearance-none px-4 pr-10 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none cursor-pointer">
                <option>Last 30 Days</option>
                <option>Today</option>
                <option>This Week</option>
                <option>This Month</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-3 text-slate-400 pointer-events-none" />
           </div>
        </div>

        <div className="overflow-x-auto">
          {orders.length === 0 ? (
             <div className="py-20 text-center text-slate-400 flex flex-col items-center">
                <span className="text-4xl opacity-50 mb-3 block">🧾</span>
                No orders found.
             </div>
          ) : (
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100 uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Item CF'd</th>
                  <th className="px-6 py-4 text-center">Qty</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                 {orders.map(o => (
                   <tr key={o._id} className="hover:bg-slate-50/50 transition-colors">
                     <td className="px-6 py-4">
                        <span className="font-bold text-slate-800">#{o._id.substring(o._id.length - 7).toUpperCase()}</span>
                     </td>
                     <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={o.customerId?.profilePic} className="w-8 h-8 rounded-full border border-slate-200"/>
                          <div>
                            <span className="font-bold text-slate-800 block leading-tight">{o.customerId?.name}</span>
                          </div>
                        </div>
                     </td>
                     <td className="px-6 py-4 text-slate-700 font-medium">
                        {o.productName}
                     </td>
                     <td className="px-6 py-4 text-center font-bold text-slate-800">
                        {o.quantity}
                     </td>
                     <td className="px-6 py-4 text-slate-500 font-medium">
                        {formatDate(o.createdAt)}
                     </td>
                     <td className="px-6 py-4 text-center">
                       {o.status === 'confirmed' ? (
                          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-md text-xs font-bold border border-emerald-100">
                             <CheckCircle2 size={14}/> Confirmed
                          </div>
                       ) : o.status === 'canceled' ? (
                          <div className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-600 px-2.5 py-1 rounded-md text-xs font-bold border border-rose-100">
                             <XCircle size={14}/> Canceled
                          </div>
                       ) : (
                          <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 px-2.5 py-1 rounded-md text-xs font-bold border border-blue-100">
                             Pending
                          </div>
                       )}
                     </td>
                     <td className="px-6 py-4 text-right">
                       <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm">View Details</button>
                     </td>
                   </tr>
                 ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersList;
