import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, MessageSquare, Bell, Package, ChevronRight } from 'lucide-react';
import useStore from '../store';
import socket from '../services/socket';
import { getOrders, getComments, updateOrderStatus, triggerMockWebhook, deleteOrder } from '../services/api';

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const { user, setUser, orders, setOrders, updateOrder, addOrder, removeOrder, comments, setComments, addComment } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, commentsRes] = await Promise.all([getOrders(), getComments()]);
        setOrders(ordersRes.data);
        setComments(commentsRes.data);
      } catch (err) {
        console.error('Failed to load data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [setOrders, setComments]);

  useEffect(() => {
    socket.connect();
    socket.on('new_comment', addComment);
    socket.on('new_order', addOrder);
    socket.on('order_updated', updateOrder);
    socket.on('order_deleted', (o) => removeOrder(o._id));

    return () => {
      socket.off('new_comment');
      socket.off('new_order');
      socket.off('order_updated');
      socket.off('order_deleted');
      socket.disconnect();
    };
  }, [addComment, addOrder, updateOrder, removeOrder]);

  const handleStatusChange = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
    } catch (err) {
      console.error(err);
    }
  };

  const handleTestMock = async () => {
    try {
      await triggerMockWebhook();
    } catch (err) {
      console.error("Mock failed", err);
    }
  };

  const formatArrivalDate = (isoString) => {
    const date = new Date(isoString);
    date.setDate(date.getDate() + 3); // mock arrival
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  // Mock item names from the image to use based on index or just use the random ones
  const MOCK_ITEMS = [
    { title: 'Premium Leather Jacket', price: '64.00', attr: 'Size: M', img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=100&h=100&fit=crop' },
    { title: 'Breathable Training Sneakers', price: '124.00', attr: 'Size: 28', img: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=100&h=100&fit=crop' },
    { title: 'Fleet - Water Bottle', price: '61.00', attr: 'Capacity: 1 litter', img: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=100&h=100&fit=crop' },
    { title: 'Knitted Beanie Hat', price: '96.00', attr: 'Size: M', img: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=100&h=100&fit=crop' }
  ];

  const getMockDetails = (order, index) => {
    // If CF product name is real, use it, otherwise use mock based on index
    const mock = MOCK_ITEMS[index % MOCK_ITEMS.length];
    return {
      ...mock,
      title: order.productName.includes('Mock') ? mock.title : order.productName
    };
  };

  return (
    <div className="font-sans text-slate-800 pb-12">
      
      {/* Main Grid Content */}
      <main className="max-w-[1400px] mx-auto">
        <div className="mb-6 flex justify-between items-center">
            <div>
               <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
               <p className="text-sm text-slate-500">Overview of recent orders and mock simulations.</p>
            </div>
            <button onClick={handleTestMock} className="text-sm bg-blue-600 text-white px-4 py-2 rounded-xl font-bold shadow-sm hover:bg-blue-700 transition-colors" title="Simulate CF Comment">
               Mock Test Order
            </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 text-slate-400">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 bg-white rounded-2xl border border-slate-100">
            <Package size={48} className="mb-4 opacity-20" />
            <p>No orders yet. Press 'Mock CF' to simulate one.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">

            {orders.map((order, idx) => {
              const mockData = getMockDetails(order, idx);
              const statusColor = order.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600 font-semibold' :
                order.status === 'canceled' ? 'bg-rose-50 text-rose-600 font-semibold' :
                  'bg-slate-100 text-slate-500 font-medium';
              const statusText = order.status === 'confirmed' ? 'On The Way' :
                order.status === 'canceled' ? 'Canceled' : 'On Deliver';

              return (
                <div key={order._id} className="bg-white rounded-3xl p-6 shadow-[0px_2px_15px_-4px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col justify-between">

                  {/* Card Header: Order ID & Status */}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-xs text-slate-400 font-medium mb-1">Order ID</p>
                      <h3 className="text-xl font-bold text-slate-900">#{order._id.substring(order._id.length - 7).toUpperCase()}</h3>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-[12px] text-slate-400 font-medium">Arrival {formatArrivalDate(order.createdAt)}</span>
                      <div className={`px-3 py-1.5 rounded-lg text-xs ${statusColor} hover:opacity-80 transition cursor-pointer`}
                        onClick={() => handleStatusChange(order._id, order.status === 'confirmed' ? 'pending' : 'confirmed')}
                        title="Click to toggle status">
                        {statusText}
                      </div>
                    </div>
                  </div>

                  {/* Card Body: Route */}
                  <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-6 bg-slate-50/50 p-2 rounded-xl">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center"><Package size={12} /></div>
                      <span className="truncate max-w-[100px]">{order.customerId?.name || 'Customer'}'s Home, BKK</span>
                    </div>
                    <div className="flex-1 px-3 text-slate-300 flex items-center justify-center">
                      <span className="tracking-[2px]">•••••</span>
                      <ChevronRight size={14} />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 border border-slate-200 rounded-full flex items-center justify-center"><div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div></div>
                      <span className="truncate max-w-[100px]">Store Warehouse, TH</span>
                    </div>
                  </div>

                  {/* Sub Card: Item details */}
                  <div className="bg-[#F8F9FA] rounded-2xl p-4 flex gap-4 mb-6">
                    <div className="w-20 h-20 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden flex-shrink-0">
                      <img src={mockData.img} alt="Product" className="w-full h-full object-cover p-1 rounded-xl" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="font-bold text-[15px] text-slate-900 leading-snug mb-1">{mockData.title}</h4>
                      <p className="text-sm font-semibold text-slate-900 mb-1">Doller {mockData.price}</p>
                      <p className="text-xs text-slate-500 font-medium">{mockData.attr}</p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-[14px] font-bold text-slate-800">{order.quantity} Items</span>
                    <button className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm font-bold text-slate-800 transition-colors">
                      Details
                    </button>
                  </div>

                </div>
              );
            })}

          </div>
        )}
      </main>

    </div>
  );
};

export default Dashboard;
