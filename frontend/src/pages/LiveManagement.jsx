import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Video, Plus, Calendar, PlayCircle, Settings, X } from 'lucide-react';
import useStore from '../store';

const LiveManagement = () => {
  const navigate = useNavigate();
  const { activePage } = useStore();
  const [showModal, setShowModal] = useState(false);
  
  // Form State
  const [liveTitle, setLiveTitle] = useState('');
  const [selectedProducts, setSelectedProducts] = useState(['1', '4']); // default selected
  
  // Quick Add Product State
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdCode, setNewProdCode] = useState('');

  const [inventoryMock, setInventoryMock] = useState([
    { id: '1',  name: 'Premium Leather Jacket', code: 'CF1', stock: 45 },
    { id: '2',  name: 'Breathable Training Sneakers', code: 'CF2', stock: 120 },
    { id: '3',  name: 'Fleet - Water Bottle', code: 'CF3', stock: 0 },
    { id: '4',  name: 'Knitted Beanie Hat', code: 'CF4', stock: 200 },
  ]);

  const previousLives = [
    { id: '1', title: 'Mid-Year Sale Live', date: 'Jul 15, 2024', status: 'Ended', orders: 120 },
    { id: '2', title: 'Clearance Clothes', date: 'Jul 10, 2024', status: 'Ended', orders: 84 },
    { id: '3', title: 'Grand Opening CF', date: 'Jul 1, 2024', status: 'Ended', orders: 350 },
  ];

  const handleStartLive = (e) => {
    e.preventDefault();
    if (!liveTitle) return;
    // Mock save
    console.log("Starting Live with products: ", selectedProducts);
    navigate('/live-studio/active');
  };

  const toggleProduct = (id) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter(p => p !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  const handleQuickAddProduct = (e) => {
    e.preventDefault();
    if (!newProdName || !newProdCode) return;
    const newId = Date.now().toString();
    const newProduct = {
      id: newId,
      name: newProdName,
      code: newProdCode,
      stock: 100 // mock default
    };
    setInventoryMock([newProduct, ...inventoryMock]);
    setSelectedProducts([...selectedProducts, newId]);
    setNewProdName('');
    setNewProdCode('');
    setShowQuickAdd(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 relative">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-slate-800">Live Campaigns</h1>
           <p className="text-sm text-slate-500">Manage your past lives and spin up new streaming sessions.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-sm focus:ring-4 focus:ring-blue-600/20"
        >
          <Plus size={18} /> Create New Live
        </button>
      </div>

      {/* Empty / Zero state if NO previous lives, but we have mocks */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
           <h2 className="font-bold text-slate-800 flex items-center gap-2"><Calendar size={18} className="text-blue-500"/> Past Live Sessions</h2>
        </div>
        
        <div className="divide-y divide-slate-100">
          {previousLives.map(live => (
            <div key={live.id} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-xl flex items-center justify-center">
                  <Video size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{live.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{live.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-center hidden sm:block">
                  <span className="block font-bold text-slate-800">{live.orders}</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Orders</span>
                </div>
                <span className="px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-100 text-slate-600">
                  {live.status}
                </span>
                <button className="text-blue-600 font-bold text-sm hover:text-blue-800">View Log</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Live Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                <PlayCircle size={20} className="text-blue-600" /> Start Live Stream
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleStartLive} className="p-6 space-y-5">
              
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700">Live Title / Campaign Name</label>
                <input 
                  type="text" 
                  value={liveTitle}
                  onChange={e => setLiveTitle(e.target.value)}
                  placeholder="e.g. Flash Sale July 2024!" 
                  autoFocus
                  required
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-800"
                />
              </div>

              {/* Product Selection */}
              <div className="space-y-2">
                 <div className="flex justify-between items-center mb-1">
                    <label className="text-sm font-bold text-slate-700">
                       Select Products <span className="text-xs font-normal text-slate-500 ml-1">({selectedProducts.length} Selected)</span>
                    </label>
                    <button 
                       type="button" 
                       onClick={() => setShowQuickAdd(!showQuickAdd)}
                       className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 transition-colors"
                    >
                       <Plus size={14} /> New Product
                    </button>
                 </div>
                 
                 {/* Quick Add Form Overlay */}
                 {showQuickAdd && (
                   <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-xl mb-2 flex gap-2 items-center">
                      <input 
                        type="text" 
                        placeholder="Name (e.g. Red Skirt)" 
                        value={newProdName}
                        onChange={e => setNewProdName(e.target.value)}
                        className="flex-1 px-3 py-1.5 text-xs border border-white rounded shadow-sm focus:ring-2 focus:ring-blue-500/20"
                      />
                      <input 
                        type="text" 
                        placeholder="Code (e.g. A1)" 
                        value={newProdCode}
                        onChange={e => setNewProdCode(e.target.value)}
                        className="w-24 px-3 py-1.5 text-xs border border-white rounded shadow-sm font-bold focus:ring-2 focus:ring-blue-500/20"
                      />
                      <button 
                        type="button" 
                        onClick={handleQuickAddProduct}
                        className="bg-blue-600 text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-blue-700 whitespace-nowrap"
                      >
                        Add
                      </button>
                   </div>
                 )}

                 <div className="border border-slate-200 rounded-xl max-h-40 overflow-y-auto bg-slate-50 p-2 space-y-1 custom-scrollbar">
                    {inventoryMock.map(item => (
                       <label key={item.id} className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer transition-colors ${selectedProducts.includes(item.id) ? 'bg-blue-50/50 border-blue-200' : 'bg-white border-transparent hover:bg-slate-100 hover:border-slate-200'} ${item.stock === 0 ? 'opacity-50' : ''}`}>
                          <div className="flex items-center gap-3">
                             <input 
                               type="checkbox"
                               checked={selectedProducts.includes(item.id)}
                               disabled={item.stock === 0}
                               onChange={() => toggleProduct(item.id)}
                               className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                             />
                             <div>
                                <p className="text-sm font-bold text-slate-800 leading-none">{item.name}</p>
                                <p className="text-[11px] text-slate-500 mt-1">Code: <span className="font-bold text-slate-700">{item.code}</span> • Stock: {item.stock}</p>
                             </div>
                          </div>
                          {item.stock === 0 && <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-2 py-1 rounded">Out of Stock</span>}
                       </label>
                    ))}
                 </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex justify-between">
                  Broadcast Page 
                  <span 
                    className="text-blue-600 font-normal cursor-pointer hover:underline text-xs flex items-center gap-1"
                    onClick={() => {setShowModal(false); navigate('/settings')}}
                  ><Settings size={12}/> Change in Settings</span>
                </label>
                <div className={`p-4 border rounded-xl flex items-center gap-3 ${activePage ? 'border-emerald-200 bg-emerald-50/50' : 'border-rose-200 bg-rose-50/50'}`}>
                  {activePage ? (
                    <>
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">Connected to {activePage.name}</p>
                        <p className="text-xs text-emerald-600 font-medium">Ready to pull comments</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">No Facebook Page Linked</p>
                        <p className="text-xs text-rose-600 font-medium">Comments will not sync automatically</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={!liveTitle}
                  className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-all shadow-sm flex items-center justify-center gap-2 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400/0 via-white/20 to-blue-400/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                  Launch Studio <PlayCircle size={18} />
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveManagement;
