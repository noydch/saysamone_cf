import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, PackagePlus, ShoppingCart, ArrowLeft, Send, Trash2 } from 'lucide-react';
import useStore from '../store';
import socket from '../services/socket';
import { getOrders, getComments, triggerMockWebhook } from '../services/api';

const LiveStudio = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { 
    orders, setOrders, addOrder, 
    comments, setComments, addComment,
    liveProducts, addLiveProduct, removeLiveProduct 
  } = useStore();
  
  const [newProductName, setNewProductName] = useState('');
  const [newProductCode, setNewProductCode] = useState('');

  useEffect(() => {
    // Initial data load if we refreshed the page
    if (orders.length === 0 || comments.length === 0) {
      Promise.all([getOrders(), getComments()]).then(([oRes, cRes]) => {
        setOrders(oRes.data);
        setComments(cRes.data);
      });
    }

    socket.connect();
    socket.on('new_comment', addComment);
    socket.on('new_order', addOrder);

    return () => {
      socket.off('new_comment');
      socket.off('new_order');
    };
  }, []);

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProductName || !newProductCode) return;
    const newProd = {
      id: Date.now().toString(),
      name: newProductName,
      code: newProductCode.toUpperCase(),
      price: Math.floor(Math.random() * 100) + 10 // mock price
    };
    addLiveProduct(newProd);
    setNewProductName('');
    setNewProductCode('');
  };

  const handleTestMock = async () => {
    try {
      // Pick a random product code from our list for the mock 
      const randomProd = liveProducts[Math.floor(Math.random() * liveProducts.length)];
      const code = randomProd ? randomProd.code : 'CF1';
      await triggerMockWebhook(code);
    } catch (err) {
      console.error("Mock failed", err);
    }
  };

  const formatTime = (iso) => new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col font-sans -m-4 md:-m-8">
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shrink-0 shadow-sm z-10 relative">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">Live Studio <span className="text-slate-400 font-normal text-sm ml-2">Currently Streaming</span></h1>
        </div>
        <button onClick={handleTestMock} className="flex items-center bg-orange-100 hover:bg-orange-200 text-orange-600 px-4 py-2 rounded-xl text-sm font-bold transition-colors">
          <Send size={16} className="mr-2" /> Simulate CF
        </button>
      </header>

      {/* Main 3-Column Layout */}
      <main className="flex-1 flex overflow-hidden max-w-[1600px] w-full mx-auto p-4 gap-4">
        
        {/* Column 1: Product Management */}
        <section className="flex flex-col w-1/3 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
            <PackagePlus size={18} className="text-blue-500" />
            <h2 className="font-bold text-slate-800">Added Products</h2>
          </div>
          
          <div className="p-4 border-b border-slate-100">
            <form onSubmit={handleAddProduct} className="flex flex-col gap-3">
              <input 
                type="text" 
                placeholder="Product Name (e.g. Leather Jacket)" 
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                value={newProductName}
                onChange={e => setNewProductName(e.target.value)}
              />
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="CF Code (e.g. CF1)" 
                  className="w-1/2 px-3 py-2 border border-slate-200 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  value={newProductCode}
                  onChange={e => setNewProductCode(e.target.value)}
                />
                <button type="submit" className="w-1/2 bg-slate-900 text-white font-bold rounded-lg text-sm hover:bg-slate-800 transition-colors">
                  Add Item
                </button>
              </div>
            </form>
          </div>

          <div className="flex-1 overflow-y-auto p-2">
            {liveProducts.map(p => (
              <div key={p.id} className="group p-3 mb-2 bg-slate-50 hover:bg-slate-100 border border-slate-100 rounded-xl flex justify-between items-center transition-all">
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">{p.name}</h3>
                  <p className="text-xs font-semibold text-blue-600 bg-blue-100 inline-block px-2 py-0.5 rounded mt-1">Code: {p.code}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="font-bold text-slate-600 text-sm">${p.price}.00</div>
                  <button 
                    onClick={() => removeLiveProduct(p.id)}
                    className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-500 transition-all p-1"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Column 2: Order Stream (Auto-generated) */}
        <section className="flex flex-col w-1/3 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart size={18} className="text-emerald-500" />
              <h2 className="font-bold text-slate-800">Auto Orders</h2>
            </div>
            <span className="text-xs font-bold bg-emerald-100 text-emerald-600 px-2 py-1 rounded-full">{orders.length}</span>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
             {orders.length === 0 ? (
               <div className="m-auto text-slate-400 text-sm text-center">No orders generated yet.</div>
             ) : (
                orders.map(order => (
                  <div key={order._id} className="border border-emerald-100 bg-emerald-50/30 p-3 rounded-xl flex gap-3 animate-in slide-in-from-top-2">
                    <img src={order.customerId?.profilePic} alt="" className="w-10 h-10 rounded-full border border-emerald-200" />
                    <div className="flex-1">
                      <div className="flex justify-between">
                         <span className="font-bold text-sm text-slate-800">{order.customerId?.name}</span>
                         <span className="text-xs text-slate-400">{formatTime(order.createdAt)}</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5"><span className="font-bold text-emerald-600">CF'd</span> {order.productName}</p>
                      <p className="text-xs font-semibold mt-1 bg-white inline-block px-1.5 py-0.5 rounded border border-emerald-100">Qty: {order.quantity}</p>
                    </div>
                  </div>
                ))
             )}
          </div>
        </section>

        {/* Column 3: Live Comments Feed */}
        <section className="flex flex-col w-1/3 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden relative">
          <div className="p-4 border-b border-slate-100 bg-slate-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare size={18} className="text-white" />
              <h2 className="font-bold text-white">Live Comments</h2>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-slate-50/50 custom-scrollbar">
             {comments.length === 0 ? (
                <div className="m-auto text-slate-400 text-sm text-center">Waiting for comments...</div>
             ) : (
                comments.map(comment => {
                   const isCF = comment.message?.toLowerCase().includes('cf') || comment.message?.includes('เอา');
                   return (
                      <div key={comment._id} className={`p-3 rounded-xl shadow-sm border ${isCF ? 'bg-blue-50 border-blue-200' : 'bg-white border-slate-200'}`}>
                        <div className="flex justify-between items-start mb-1">
                           <span className="font-bold text-sm text-slate-800">{comment.fromUser?.name}</span>
                           <span className="text-[10px] text-slate-400">{formatTime(comment.createdAt)}</span>
                        </div>
                        <p className={`text-sm ${isCF ? 'font-bold text-blue-700' : 'text-slate-600'}`}>{comment.message}</p>
                      </div>
                   )
                })
             )}
          </div>
          
          {/* Faded overlay at bottom to look like stream */}
          <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-slate-50 to-transparent pointer-events-none"></div>
        </section>

      </main>
    </div>
  );
};

export default LiveStudio;
