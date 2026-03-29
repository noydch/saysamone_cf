import { useState } from 'react';
import useStore from '../store';
import { PackageOpen, Plus } from 'lucide-react';

const Inventory = () => {
  const [products, setProducts] = useState([
    { id: '1',  name: 'Premium Leather Jacket', code: 'CF1', stock: 45, price: 64.00, status: 'Active' },
    { id: '2',  name: 'Breathable Training Sneakers', code: 'CF2', stock: 120, price: 124.00, status: 'Active' },
    { id: '3',  name: 'Fleet - Water Bottle', code: 'CF3', stock: 0, price: 61.00, status: 'Out of Stock' },
    { id: '4',  name: 'Knitted Beanie Hat', code: 'CF4', stock: 200, price: 96.00, status: 'Active' },
  ]);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-slate-800">Inventory & Products</h1>
           <p className="text-sm text-slate-500">Manage your stock, SKUs, and CF codes.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-bold text-sm transition-colors shadow-sm focus:ring-4 focus:ring-blue-600/20">
          <Plus size={18} /> Add Product
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center gap-4">
           <input type="text" placeholder="Search products by name or code..." className="w-full max-w-sm px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
           <select className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none">
             <option>All Status</option>
             <option>Active</option>
             <option>Out of Stock</option>
           </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100 uppercase text-[11px] tracking-wider">
              <tr>
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">CF Code</th>
                <th className="px-6 py-4 text-center">In Stock</th>
                <th className="px-6 py-4 text-right">Price</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
               {products.map(p => (
                 <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                   <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-blue-50 transition-colors">
                          <PackageOpen size={20} />
                        </div>
                        <span className="font-bold text-slate-800">{p.name}</span>
                      </div>
                   </td>
                   <td className="px-6 py-4">
                     <span className="bg-slate-100 text-slate-700 font-bold px-2.5 py-1 rounded-md text-xs">{p.code}</span>
                   </td>
                   <td className="px-6 py-4 text-center">
                     <span className={`font-bold ${p.stock < 10 && p.stock > 0 ? 'text-orange-500' : p.stock === 0 ? 'text-rose-500' : 'text-slate-800'}`}>{p.stock}</span>
                   </td>
                   <td className="px-6 py-4 text-right font-bold text-slate-800">${p.price.toFixed(2)}</td>
                   <td className="px-6 py-4 text-center">
                     <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${p.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                       {p.status}
                     </span>
                   </td>
                   <td className="px-6 py-4 text-right">
                     <button className="text-blue-600 hover:text-blue-800 font-semibold text-sm">Edit</button>
                   </td>
                 </tr>
               ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
