import { create } from 'zustand';

const useStore = create((set) => ({
  user: null,    // User logged in via FB
  activePage: null, // Selected FB Page
  orders: [],
  comments: [],
  liveProducts: [
    { id: '1', name: 'Premium Leather Jacket', code: 'CF1', price: 64.00 },
    { id: '2', name: 'Knitted Beanie Hat', code: 'CF2', price: 96.00 }
  ],
  
  setUser: (user) => set({ user }),
  setActivePage: (page) => set({ activePage: page }),
  
  setOrders: (orders) => set({ orders }),
  addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
  
  setComments: (comments) => set({ comments }),
  addComment: (comment) => set((state) => ({ 
      comments: [comment, ...state.comments].slice(0, 50) // keep latest 50
  })),

  setLiveProducts: (products) => set({ liveProducts: products }),
  addLiveProduct: (product) => set((state) => ({ liveProducts: [...state.liveProducts, product] })),
  removeLiveProduct: (productId) => set((state) => ({ 
    liveProducts: state.liveProducts.filter(p => p.id !== productId) 
  })),
}));

export default useStore;
