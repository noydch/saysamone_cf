import { FileText, Printer, CheckCircle } from 'lucide-react';

const Billing = () => {
  const invoices = [
    { id: 'INV-001', customer: 'Noy DC', amount: 128.00, status: 'Paid', date: 'Jul 9, 2024' },
    { id: 'INV-002', customer: 'Sarah Jane', amount: 64.00, status: 'Unpaid', date: 'Jul 10, 2024' },
    { id: 'INV-003', customer: 'Somchai K.', amount: 250.00, status: 'Paid', date: 'Jul 11, 2024' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-slate-800">Billing & Invoices</h1>
           <p className="text-sm text-slate-500">Manage customer payments and print slips.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="col-span-1 lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50">
               <h2 className="font-bold text-slate-800">Recent Invoices</h2>
            </div>
            
            <div className="divide-y divide-slate-100">
               {invoices.map(inv => (
                  <div key={inv.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-indigo-50 text-indigo-500 rounded-lg flex items-center justify-center">
                           <FileText size={20} />
                        </div>
                        <div>
                           <p className="font-bold text-slate-800 text-sm">{inv.id}</p>
                           <p className="text-xs text-slate-500">{inv.customer} • {inv.date}</p>
                        </div>
                     </div>
                     
                     <div className="flex items-center gap-6">
                        <span className="font-bold text-slate-800">${inv.amount.toFixed(2)}</span>
                        <span className={`px-2.5 py-1 text-xs font-bold rounded-md ${inv.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-orange-100 text-orange-700'}`}>
                           {inv.status}
                        </span>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         <div className="col-span-1 border border-slate-200 rounded-2xl shadow-sm bg-white p-6 flex flex-col items-center justify-center text-center">
             <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4">
               <Printer size={32} />
             </div>
             <h3 className="font-bold text-lg text-slate-800 mb-2">Print Shipping Labels</h3>
             <p className="text-sm text-slate-500 mb-6">Select paid invoices to generate bulk shipping labels for your courier.</p>
             <button className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-colors">
                Generate Labels
             </button>
         </div>
      </div>
    </div>
  );
};

export default Billing;
