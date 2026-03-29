import { TrendingUp, Users, ShoppingBag, DollarSign } from 'lucide-react';

const Reports = () => {
  const stats = [
    { title: 'Total Revenue', value: '$12,540', gain: '+15%', icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { title: 'Orders CF\'d', value: '450', gain: '+2%', icon: ShoppingBag, color: 'text-blue-500', bg: 'bg-blue-50' },
    { title: 'Active Customers', value: '128', gain: '+11%', icon: Users, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { title: 'Conversion Rate', value: '8.4%', gain: '+5%', icon: TrendingUp, color: 'text-orange-500', bg: 'bg-orange-50' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-slate-800">Analytics & Reports</h1>
           <p className="text-sm text-slate-500">Track your live sales performance.</p>
        </div>
        <select className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-slate-100">
           <option>This Month</option>
           <option>Last Month</option>
           <option>This Year</option>
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                 <div className="flex justify-between items-start mb-4">
                    <div className={`w-12 h-12 rounded-xl ${s.bg} ${s.color} flex items-center justify-center`}>
                       <Icon size={24} />
                    </div>
                    <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-1 rounded-md">
                      {s.gain}
                    </span>
                 </div>
                 <p className="text-sm text-slate-500 font-medium mb-1">{s.title}</p>
                 <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">{s.value}</h2>
              </div>
            )
         })}
      </div>

      {/* Mock Chart Area */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 mt-6 h-[400px] flex flex-col items-center justify-center text-center">
         <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
            <BarChartIcon className="w-8 h-8 text-slate-400" />
         </div>
         <h3 className="font-bold text-lg text-slate-800">Sales Overview Chart</h3>
         <p className="text-sm text-slate-500">A line chart visualization of your CF orders over time would appear here.</p>
         <p className="text-xs text-slate-400 mt-2">(Use a library like Recharts or Chart.js to render actual data points)</p>
      </div>
    </div>
  );
};

// Dumb icon for mockup
const BarChartIcon = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
)

export default Reports;
