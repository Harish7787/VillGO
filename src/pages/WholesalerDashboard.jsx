import React, { useState, useEffect } from 'react';
import WholesalerSidebar from '../components/wholesaler/WholesalerSidebar';
import WholesalerModals from '../components/wholesaler/WholesalerModals';
import { WholesalerIcons } from '../components/wholesaler/WholesalerIcons';

// ============================================================================
// 4. MAIN ORCHESTRATOR HOME COMPONENT (Responsive layouts & live CRUD states)
// ============================================================================
const INITIAL_PRODUCTS = [
  { id: 101, name: "Premium Basmati Rice", category: "Grains", price: 1200, stock: 180, moq: 10, unit: "Bag (25kg)", description: "Lambya danyacha sugandhi basmati tandul, retail sathi uttam." },
  { id: 102, name: "Organic Cottonseed Oil", category: "Oil", price: 1650, stock: 95, moq: 5, unit: "Tin (15L)", description: "Double filtered uttam cottonseed oil." },
  { id: 103, name: "Pure Wheat Flour (Atta)", category: "Flour", price: 450, stock: 240, moq: 20, unit: "Bag (10kg)", description: "Chakki fresh ghavache pith, fiber yukta built." },
  { id: 104, name: "Spicy Red Chilli Powder", category: "Spices", price: 280, stock: 110, moq: 8, unit: "Packet (1kg)", description: "Guntur mirchi powder, tikhat ani premium rangatdar." }
];

const INITIAL_ORDERS = [
  { id: "ORD-9951", retailer: "Jay Ambe Provision Store", date: "2026-06-05", total: 18500, status: "Pending", items: "Basmati Rice x10, Cottonseed Oil x5", deliveryNote: "Shukrawar sandhyakaladhi pahucheva.", transporter: "" },
  { id: "ORD-9952", retailer: "Krishna General Mart", date: "2026-06-04", total: 9000, status: "Processing", items: "Wheat Flour x20", deliveryNote: "Kajiwas vahatuk kara, olava rahu deu naka.", transporter: "Raju Roadways" },
  { id: "ORD-9953", retailer: "Maruti Kirana", date: "2026-06-02", total: 14200, status: "Shipped", items: "Chilli Powder x15, Wheat Flour x10", deliveryNote: "Aalyanantar phone kara.", transporter: "Express Cargo" },
  { id: "ORD-9954", retailer: "Balaji Traders", date: "2026-05-28", total: 33000, status: "Delivered", items: "Basmati Rice x20, Cottonseed Oil x10", deliveryNote: "Direct warehouse loading and dispatch.", transporter: "Raju Roadways" }
];

const INITIAL_TRANSPORTERS = [
  { id: 1, name: "Raju Roadways", vehicle: "Tata Ace (Mini Truck)", contact: "+91 98765 43210", activeRoute: "Ahmedabad - Surat", rating: 4.8 },
  { id: 2, name: "Express Cargo", vehicle: "Bolero Pickup", contact: "+91 99887 76655", activeRoute: "Rajkot - Vadodara", rating: 4.5 },
  { id: 3, name: "Maruti Logistics", vehicle: "Eicher Pro 2049", contact: "+91 91223 34455", activeRoute: "Mehsana - Palanpur", rating: 4.9 }
];

const INITIAL_BROADCASTS = [
  { id: 201, title: "Monsoon Festive Dhamaka", message: "Basmati Rice chya bulk order var extra 5% discount!", type: "Offer", status: "Active" },
  { id: 202, title: "Price Drop Alert", message: "Wheat flour chya kimmatit ya aathawadyat 20 rupaye kami.", type: "Update", status: "Active" }
];

const INITIAL_MESSAGES = [
  { id: 301, retailer: "Jay Ambe Provision Store", subject: "Stock Query", message: "Basmati rice 50kg bag cha stock uplabdha aahe ka?", date: "2026-06-08", reply: "" },
  { id: 302, retailer: "Maruti Kirana", subject: "Damaged Package", message: "Ghavachya pithache ek packet phatlele aale.", date: "2026-06-06", reply: "Amhi tumhala credit note dilit aahe." }
];

export default function WholesalerDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [theme, setTheme] = useState('light');
  const [resolvedTheme, setResolvedTheme] = useState('light');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Live datasets
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [transporters] = useState(INITIAL_TRANSPORTERS);
  const [broadcasts, setBroadcasts] = useState(INITIAL_BROADCASTS);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);

  // Modals management
  const [modalMode, setModalMode] = useState(null);
  const [modalTarget, setModalTarget] = useState(null);
  const [formData, setFormData] = useState({});
  const [toasts, setToasts] = useState([]);

  // Sync System Preference Themes
  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setResolvedTheme(mediaQuery.matches ? 'dark' : 'light');
      const handler = (e) => setResolvedTheme(e.matches ? 'dark' : 'light');
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else {
      setResolvedTheme(theme);
    }
  }, [theme]);

  // Global class trigger for system styling
  useEffect(() => {
    if (resolvedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [resolvedTheme]);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter(t => t.id !== id));
    }, 3500);
  };

  // Cohesive layout design templates (Matches image_a37172.png & login specs)
  const themeClasses = resolvedTheme === 'dark' ? {
    bg: 'bg-slate-950 text-slate-100',
    panel: 'bg-slate-900 border-slate-800 text-slate-100',
    panelHeader: 'bg-slate-900/50 border-slate-850',
    border: 'border-slate-800',
    textMuted: 'text-slate-400',
    textHeading: 'text-white',
    input: 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:ring-sky-500 focus:border-sky-500',
    sidebar: 'bg-slate-900 border-r border-slate-850 text-slate-100',
    sidebarHover: 'hover:bg-slate-800 hover:text-white',
    sidebarActive: 'bg-sky-500 text-slate-950',
    tableRowHover: 'hover:bg-slate-800/40',
    tableHeader: 'bg-slate-800/60 text-slate-300',
    card: 'bg-slate-900 border border-slate-800 shadow-sm'
  } : {
    bg: 'bg-sky-50/50 text-slate-800',
    panel: 'bg-white border-sky-100 text-slate-800',
    panelHeader: 'bg-white border-b border-sky-100',
    border: 'border-sky-100',
    textMuted: 'text-slate-500',
    textHeading: 'text-slate-900',
    input: 'bg-white border-sky-200 text-slate-900 placeholder-slate-400 focus:ring-sky-500 focus:border-sky-500',
    sidebar: 'bg-sky-100 border-r border-sky-200 text-slate-800',
    sidebarHover: 'hover:bg-sky-200 hover:text-sky-950',
    sidebarActive: 'bg-sky-500 text-white shadow-lg shadow-sky-500/25',
    tableRowHover: 'hover:bg-sky-50/25',
    tableHeader: 'bg-sky-200/50 text-slate-700',
    card: 'bg-white border border-sky-100 shadow-sm'
  };

  // KPIs
  const totalRevenue = orders.reduce((sum, o) => o.status !== 'Cancelled' ? sum + o.total : sum, 0);
  const pendingOrdersCount = orders.filter(o => o.status === 'Pending').length;
  const activeProductsCount = products.length;

  // CRUD Modals State Handler
  const handleOpenModal = (target, mode, data = {}) => {
    setModalTarget(target);
    setModalMode(mode);
    setFormData({ ...data });
  };

  const handleCloseModal = () => {
    setModalTarget(null);
    setModalMode(null);
    setFormData({});
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const target = modalTarget;
    const mode = modalMode;

    if (target === 'product') {
      if (mode === 'add') {
        const newProd = { id: Date.now(), ...formData };
        setProducts([...products, newProd]);
        showToast(`Product "${formData.name}" yashasvi jodhle!`);
      } else if (mode === 'edit') {
        setProducts(products.map(p => p.id === formData.id ? { ...formData } : p));
        showToast(`Product "${formData.name}" badalle aahe!`);
      }
    }

    if (target === 'broadcast') {
      if (mode === 'add') {
        const newBroad = { id: Date.now(), ...formData };
        setBroadcasts([...broadcasts, newBroad]);
        showToast("Naveen alert alert prasiddha kela!");
      } else if (mode === 'edit') {
        setBroadcasts(broadcasts.map(b => b.id === formData.id ? { ...formData } : b));
        showToast("Campaign alert badalle aahe!");
      }
    }

    if (target === 'order' && mode === 'assign') {
      const { orderId, transporterName } = formData;
      setOrders(orders.map(o => o.id === orderId ? { ...o, transporter: transporterName, status: 'Processing' } : o));
      showToast(`Order ${orderId} transport kade route thai.`);
    }

    if (target === 'message' && mode === 'reply') {
      const { id, replyText } = formData;
      setMessages(messages.map(m => m.id === id ? { ...m, reply: replyText } : m));
      showToast("Grahak ticket resolve jhale!");
    }

    handleCloseModal();
  };

  const handleDeleteItem = (target, id) => {
    if (target === 'product') {
      setProducts(products.filter(p => p.id !== id));
      showToast("Product successfully deleted", "warning");
    } else if (target === 'broadcast') {
      setBroadcasts(broadcasts.filter(b => b.id !== id));
      showToast("Broadcast message successfully removed", "warning");
    } else if (target === 'order') {
      setOrders(orders.filter(o => o.id !== id));
      showToast("Order entry cleared", "warning");
    }
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    showToast(`Order status updated to "${newStatus}"!`);
  };

  return (
    <div className={`h-screen overflow-hidden ${themeClasses.bg} font-sans flex flex-col`}>
      
      {/* Dynamic Toasts Feed */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((t) => (
          <div key={t.id} className="flex items-center p-4 rounded-xl shadow-2xl bg-emerald-500 text-white border border-emerald-600 transition-all animate-bounce">
            <span className="font-semibold text-sm mr-2">📌 Notification:</span>
            <span className="text-sm">{t.message}</span>
          </div>
        ))}
      </div>

      <div className="flex-1 flex flex-row overflow-hidden relative">

        {/* Modular Sidebar Component */}
        <WholesalerSidebar 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          theme={theme}
          setTheme={setTheme}
          resolvedTheme={resolvedTheme}
          setIsLoggedIn={setIsLoggedIn}
          themeClasses={themeClasses}
        />

        {/* Workspace Display Area */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          
          {/* Header Bar matching image_a3d366.png and specs */}
          <header className={`flex items-center justify-between px-6 py-4 border-b transition-colors duration-300 ${
            resolvedTheme === 'dark' ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-100'
          }`}>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-sky-500 text-slate-950 font-bold rounded-xl flex items-center justify-center text-sm shadow">
                VL
              </div>
              <div>
                <h1 className="text-lg font-black tracking-tight flex items-center">
                  <span>Villgo</span>
                  <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400">WHOLESALER</span>
                </h1>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Storage & Cargo Management Portal</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="hidden sm:inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500">
                ⚡ Connected
              </span>

              {/* Responsive Hamburger Toggle */}
              <button 
                onClick={() => setSidebarOpen(true)}
                className="md:hidden p-2 rounded-lg border border-sky-100 bg-sky-50 text-slate-850 focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </header>

          {/* Core Panel Content Switches */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">

            {/* TAB: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-fade-in">
                
                {/* Metric Grid Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className={`p-6 rounded-2xl ${themeClasses.card}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ekund Vikri Utpanna</span>
                      <span className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg text-xs font-bold">₹</span>
                    </div>
                    <h3 className="text-3xl font-extrabold text-emerald-500">₹{totalRevenue.toLocaleString()}</h3>
                    <p className="text-xs text-emerald-500 font-medium mt-1">▲ +14% monthly sales up</p>
                  </div>

                  <div className={`p-6 rounded-2xl ${themeClasses.card}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pratiksha Adesh (Pending)</span>
                      <span className="p-2 bg-amber-500/10 text-amber-500 rounded-lg text-xs">📦</span>
                    </div>
                    <h3 className="text-3xl font-extrabold text-amber-500">{pendingOrdersCount} Orders</h3>
                    <p className="text-xs text-slate-400 mt-1">Schedule transporter trucks below</p>
                  </div>

                  <div className={`p-6 rounded-2xl ${themeClasses.card}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Stock Catalog</span>
                      <span className="p-2 bg-sky-500/10 text-sky-500 rounded-lg text-xs">🌾</span>
                    </div>
                    <h3 className="text-3xl font-extrabold text-sky-500">{activeProductsCount} Items</h3>
                    <button onClick={() => setActiveTab('products')} className="text-xs text-sky-500 font-bold mt-1 hover:underline text-left">
                      Manage product catalog →
                    </button>
                  </div>
                </div>

                {/* SVG Live Render Graphs */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className={`p-6 rounded-2xl ${themeClasses.card}`}>
                    <div className="mb-4">
                      <h4 className="font-extrabold text-base">Weekly Trade Sales Volume</h4>
                      <p className="text-xs text-slate-400">Live SVG tracking models (June 2026)</p>
                    </div>

                    <div className="w-full h-48 relative">
                      <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
                        <line x1="0" y1="50" x2="500" y2="50" stroke="currentColor" strokeWidth="0.5" className="text-slate-500/10" strokeDasharray="5,5" />
                        <line x1="0" y1="100" x2="500" y2="100" stroke="currentColor" strokeWidth="0.5" className="text-slate-500/10" strokeDasharray="5,5" />
                        <line x1="0" y1="150" x2="500" y2="150" stroke="currentColor" strokeWidth="0.5" className="text-slate-500/10" strokeDasharray="5,5" />
                        
                        <path d="M 0,200 L 0,160 Q 100,100 200,130 T 400,70 L 500,90 L 500,200 Z" fill="rgba(14, 165, 233, 0.2)" />
                        <path d="M 0,160 Q 100,100 200,130 T 400,70 L 500,90" fill="none" stroke="#0ea5e9" strokeWidth="4" strokeLinecap="round" />
                        
                        <circle cx="100" cy="115" r="5" fill="#0ea5e9" />
                        <circle cx="280" cy="110" r="5" fill="#0ea5e9" />
                        <circle cx="400" cy="70" r="5" fill="#0ea5e9" />
                      </svg>
                      <div className="flex justify-between text-[10px] text-slate-400 px-1 mt-2">
                        <span>Som</span><span>Man</span><span>Budh</span><span>Guru</span><span>Shukra</span><span>Shani</span><span>Ravi</span>
                      </div>
                    </div>
                  </div>

                  <div className={`p-6 rounded-2xl ${themeClasses.card}`}>
                    <div className="mb-4">
                      <h4 className="font-extrabold text-base">Inventory reserves units</h4>
                      <p className="text-xs text-slate-400">Current stock availability vs baseline MOQ</p>
                    </div>

                    <div className="space-y-4 pt-2">
                      {products.map((p) => {
                        const percent = Math.min(100, (p.stock / 300) * 100);
                        return (
                          <div key={p.id} className="space-y-1">
                            <div className="flex justify-between text-xs font-semibold">
                              <span>{p.name}</span>
                              <span className={p.stock < 120 ? "text-amber-500 font-extrabold" : "opacity-80"}>
                                {p.stock} units ({p.unit})
                              </span>
                            </div>
                            <div className="w-full h-3 rounded-full bg-slate-500/15 overflow-hidden">
                              <div 
                                className={`h-full rounded-full transition-all duration-1000 ${
                                  p.stock < 120 ? 'bg-amber-500' : 'bg-sky-500'
                                }`}
                                style={{ width: `${percent}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* TAB: PRODUCTS GRID */}
            {activeTab === 'products' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-black">Storage & Stock Catalog</h2>
                    <p className="text-xs text-slate-400">Products joda, badala, stock reserves check kara.</p>
                  </div>

                  <button
                    onClick={() => handleOpenModal('product', 'add', { name: '', category: 'Grains', price: '', stock: '', moq: '', unit: '', description: '' })}
                    className="px-4 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-sky-500/25 flex items-center justify-center space-x-2"
                  >
                    <WholesalerIcons.Plus />
                    <span>Naveen Product Joda</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {products.map((p) => (
                    <div key={p.id} className={`p-5 rounded-2xl ${themeClasses.card} flex flex-col justify-between`}>
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400">{p.category}</span>
                          <span className="text-xs font-bold text-slate-400">ID: {p.id}</span>
                        </div>
                        
                        <h3 className="font-extrabold text-lg leading-tight mb-1">{p.name}</h3>
                        <p className="text-xs text-slate-450 line-clamp-2 mb-4">{p.description}</p>
                        
                        <div className="space-y-2 mb-6 text-sm">
                          <div className="flex justify-between text-xs">
                            <span className="opacity-70">Price:</span>
                            <span className="font-extrabold text-emerald-500">₹{p.price} / {p.unit}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="opacity-70">Stock:</span>
                            <span className={`font-bold ${p.stock < 120 ? 'text-amber-500' : ''}`}>{p.stock} units</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="opacity-70">Kiman Order (MOQ):</span>
                            <span className="font-bold">{p.moq} units</span>
                          </div>
                        </div>
                      </div>

                      {/* Product CRUD Triggers */}
                      <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-500/10">
                        <button
                          onClick={() => handleOpenModal('product', 'edit', p)}
                          className="py-2 px-3 text-xs font-bold rounded-lg border border-sky-500/30 text-sky-500 hover:bg-sky-500/5 transition-all flex items-center justify-center space-x-1"
                        >
                          <WholesalerIcons.Edit />
                          <span>Badala</span>
                        </button>
                        
                        <button
                          onClick={() => handleDeleteItem('product', p.id)}
                          className="py-2 px-3 text-xs font-bold rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/5 transition-all flex items-center justify-center space-x-1"
                        >
                          <WholesalerIcons.Trash />
                          <span>Kadhun Taka</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: INCOMING ORDERS */}
            {activeTab === 'orders' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="text-2xl font-black">Incoming Retailer Orders</h2>
                  <p className="text-xs text-slate-400">Order confirm kara, transporter select kara ani pathava.</p>
                </div>

                <div className={`rounded-2xl border overflow-hidden ${themeClasses.panel}`}>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className={`border-b ${themeClasses.border} text-xs uppercase tracking-wider text-slate-400 bg-slate-500/5`}>
                          <th className="p-4 font-bold">Order ID</th>
                          <th className="p-4 font-bold">Grahak (Retailer)</th>
                          <th className="p-4 font-bold">Vastu Details</th>
                          <th className="p-4 font-bold">Total Bill</th>
                          <th className="p-4 font-bold">Vahatukdar</th>
                          <th className="p-4 font-bold">Sthiti (Status)</th>
                          <th className="p-4 font-bold text-center">Manage Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-500/10 text-sm">
                        {orders.map((o) => (
                          <tr key={o.id} className="hover:bg-slate-500/5 transition-all">
                            <td className="p-4 font-bold text-sky-500">{o.id}</td>
                            <td className="p-4">
                              <span className="font-bold block">{o.retailer}</span>
                              <span className="text-xs text-slate-400">{o.date}</span>
                            </td>
                            <td className="p-4 max-w-xs truncate">{o.items}</td>
                            <td className="p-4 font-extrabold">₹{o.total.toLocaleString()}</td>
                            <td className="p-4">
                              {o.transporter ? (
                                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-400">
                                  🚚 {o.transporter}
                                </span>
                              ) : (
                                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-slate-500/10 text-slate-400">
                                  Not Assigned
                                </span>
                              )}
                            </td>
                            <td className="p-4">
                              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                                o.status === 'Pending' ? 'bg-amber-500/10 text-amber-500' :
                                o.status === 'Processing' ? 'bg-indigo-500/10 text-indigo-400' :
                                o.status === 'Shipped' ? 'bg-sky-500/10 text-sky-500' :
                                o.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-500' :
                                'bg-red-500/10 text-red-500'
                              }`}>{o.status}</span>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center justify-center space-x-2">
                                {o.status === 'Pending' && (
                                  <button
                                    onClick={() => handleOpenModal('order', 'assign', { orderId: o.id })}
                                    className="py-1 px-3 text-xs font-bold rounded-lg bg-sky-500 hover:bg-sky-600 text-white shadow animate-pulse"
                                  >
                                    Accept
                                  </button>
                                )}

                                {o.status === 'Processing' && (
                                  <button
                                    onClick={() => handleUpdateOrderStatus(o.id, 'Shipped')}
                                    className="py-1 px-3 text-xs font-bold rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white shadow"
                                  >
                                    Pathva (Ship)
                                  </button>
                                )}

                                {o.status === 'Shipped' && (
                                  <button
                                    onClick={() => handleUpdateOrderStatus(o.id, 'Delivered')}
                                    className="py-1 px-3 text-xs font-bold rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white shadow"
                                  >
                                    Pahuchle (Deliver)
                                  </button>
                                )}

                                <button
                                  onClick={() => handleDeleteItem('order', o.id)}
                                  className="p-1.5 rounded-lg border border-slate-500/20 text-slate-400 hover:bg-red-500/5 hover:text-red-500"
                                >
                                  <WholesalerIcons.Trash />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: TRANSPORTERS DIRECTORY */}
            {activeTab === 'transporters' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="text-2xl font-black">Transport Partners (Vahatukdar)</h2>
                  <p className="text-xs text-slate-400">Available verified carrier trucks for dispatching goods.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {transporters.map((t) => (
                    <div key={t.id} className={`p-6 rounded-2xl ${themeClasses.card} flex flex-col justify-between`}>
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-xl text-xl">
                            🚚
                          </div>
                          <span className="text-xs font-black px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-500">★ {t.rating}</span>
                        </div>
                        
                        <h3 className="font-extrabold text-lg">{t.name}</h3>
                        <p className="text-xs text-slate-400 mt-1">Gadi Type: {t.vehicle}</p>
                        
                        <div className="space-y-2 my-4 pt-4 border-t border-slate-500/10 text-xs">
                          <div className="flex justify-between">
                            <span className="opacity-70">Active Route:</span>
                            <span className="font-bold">{t.activeRoute}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="opacity-70">Contact:</span>
                            <span className="font-bold text-sky-500">{t.contact}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: BROADCASTS */}
            {activeTab === 'broadcasts' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-black">Broadcast Promotions & Offers</h2>
                    <p className="text-xs text-slate-400">Retailers sathi special discounted offers ane alerts jahir kara.</p>
                  </div>

                  <button
                    onClick={() => handleOpenModal('broadcast', 'add', { title: '', message: '', type: 'Offer', status: 'Active' })}
                    className="px-4 py-2.5 bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-sky-500/25 flex items-center justify-center space-x-2"
                  >
                    <WholesalerIcons.Plus />
                    <span>Naveen Alert Tayar Kara</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {broadcasts.map((b) => (
                    <div key={b.id} className={`p-6 rounded-2xl ${themeClasses.card} flex flex-col justify-between`}>
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                            b.type === 'Offer' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-indigo-500/10 text-indigo-400'
                          }`}>{b.type}</span>
                          <span className="text-xs font-semibold text-emerald-500">{b.status}</span>
                        </div>

                        <h3 className="font-extrabold text-lg mb-2">{b.title}</h3>
                        <p className="text-sm opacity-85 leading-relaxed">{b.message}</p>
                      </div>

                      <div className="flex items-center justify-end space-x-3 mt-6 pt-4 border-t border-slate-500/10">
                        <button
                          onClick={() => handleOpenModal('broadcast', 'edit', b)}
                          className="text-xs font-bold text-sky-500 hover:underline"
                        >
                          Badala (Edit)
                        </button>
                        <button
                          onClick={() => handleDeleteItem('broadcast', b.id)}
                          className="text-xs font-bold text-red-500 hover:underline"
                        >
                          Kadhun Taka (Delete)
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: SUPPORT DESK */}
            {activeTab === 'messages' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="text-2xl font-black">Support & Complaints Desk</h2>
                  <p className="text-xs text-slate-400">Retailers chya takrari check kara ani uttar pathava.</p>
                </div>

                <div className="space-y-4">
                  {messages.map((m) => (
                    <div key={m.id} className={`p-6 rounded-2xl ${themeClasses.card}`}>
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <span className="text-xs font-bold opacity-60">Retailer Grahak:</span>
                          <h4 className="font-extrabold text-base">{m.retailer}</h4>
                        </div>
                        <span className="text-xs opacity-60">{m.date}</span>
                      </div>

                      <div className="mb-4">
                        <p className="text-xs font-bold text-sky-500 mb-1">Subject: {m.subject}</p>
                        <p className="text-sm leading-relaxed p-3.5 bg-slate-500/5 rounded-xl">{m.message}</p>
                      </div>

                      {m.reply ? (
                        <div className="pl-4 border-l-2 border-emerald-500 mb-4 bg-emerald-500/5 p-3 rounded-r-xl">
                          <span className="text-[10px] uppercase font-bold text-emerald-500 block mb-1">Maza Response:</span>
                          <p className="text-xs text-slate-500 dark:text-slate-400 italic">"{m.reply}"</p>
                        </div>
                      ) : (
                        <div className="text-xs text-amber-500 font-semibold mb-4 flex items-center">
                          <span className="mr-1.5">⚠️</span> Uttarachi pratiksha aahe
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t border-slate-500/10">
                        <button
                          onClick={() => handleOpenModal('message', 'reply', { id: m.id, replyText: m.reply })}
                          className="py-1.5 px-4 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow"
                        >
                          {m.reply ? "Response Badala" : "Reply Pathva"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </main>

      </div>

      {/* Modular Modals Engine */}
      <WholesalerModals 
        modalTarget={modalTarget}
        modalMode={modalMode}
        formData={formData}
        setFormData={setFormData}
        handleCloseModal={handleCloseModal}
        handleFormSubmit={handleFormSubmit}
        transporters={transporters}
        themeClasses={themeClasses}
      />

    </div>
  );
}