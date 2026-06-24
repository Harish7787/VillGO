// import React, { useState, useEffect } from 'react';
// import AdminSidebar from '../components/admin/AdminSidebar';  
// import MetricCard from '../components/common/MetricCard';
// import AdminIcons  from '../components/admin/AdminIcons';

// // ============================================================================
// // CLEAN ORCHESTRATION HUB FOR THE ENTIRE SUPER ADMIN SPACE
// // ============================================================================
// export default function Dashboard() {
//   const [theme, setTheme] = useState('light');
//   const [resolvedTheme, setResolvedTheme] = useState('light');
//   const [activeTab, setActiveTab] = useState('overview');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [settingsOpen, setSettingsOpen] = useState(true);

//   // Floating notifications
//   const [toasts, setToasts] = useState([]);

//   // Mock states with complete dataset (Matched to paper requirements)
//   const [users, setUsers] = useState([
//     { id: 1, name: "Ambika Bulk Traders", mobile: "8888888888", role: "Wholesaler", is_approved: true, status: "Active" },
//     { id: 2, name: "Harish Provision Store", mobile: "9999999999", role: "Retailer", is_approved: true, status: "Active" },
//     { id: 3, name: "Maruti Distributors", mobile: "9876543210", role: "Wholesaler", is_approved: false, status: "Active" },
//     { id: 4, name: "Gujarat Cargo Express", mobile: "7777777777", role: "Transfer", is_approved: true, status: "Active" },
//     { id: 5, name: "Ketan Kirana Mart", mobile: "9123456789", role: "Retailer", is_approved: true, status: "Blocked" }
//   ]);

//   const [products, setProducts] = useState([
//     { id: 101, name: "Premium Basmati Rice", category: "Grain", price: 85, moq: 50, stock: 500, wholesaler: "Ambika Bulk Traders" },
//     { id: 102, name: "Refined Cottonseed Oil 15L", category: "Oil", price: 1650, moq: 10, stock: 120, wholesaler: "Ambika Bulk Traders" },
//     { id: 103, name: "Whole Wheat Atta 10kg", category: "Flour", price: 380, moq: 20, stock: 350, wholesaler: "Maruti Distributors" }
//   ]);

//   const [orders, setOrders] = useState([
//     { id: "ORD-9981", retailer: "Harish Provision Store", total: 42500, status: "Pending", transporter: "Gujarat Cargo Express", deliveryNote: "Deliver before Friday" },
//     { id: "ORD-9982", retailer: "Ketan Kirana Mart", total: 16500, status: "In Transit", transporter: "Gujarat Cargo Express", deliveryNote: "Urgent shipment" },
//     { id: "ORD-9983", retailer: "Harish Provision Store", total: 8200, status: "Completed", transporter: "Gujarat Cargo Express", deliveryNote: "Handed over safely" },
//     { id: "ORD-9984", retailer: "Ketan Kirana Mart", total: 4500, status: "Cancelled", transporter: "None", deliveryNote: "Address incorrect" }
//   ]);

//   const [broadcasts, setBroadcasts] = useState([
//     { id: 201, category: "Offers", title: "Monsoon Super Sale", message: "Flat 5% extra discount on bulk flour and grains purchase!", date: "2026-06-01" },
//     { id: 202, category: "Updates", title: "GST Terms Updated", message: "Check out the revised billing system under settings panel.", date: "2026-05-28" }
//   ]);

//   const [complaints, setComplaints] = useState([
//     { id: 301, retailer: "Harish Provision Store", title: "Damaged Oil Cans Received", description: "Two tin cans of cottonseed oil were leaking upon delivery.", date: "2026-06-02", status: "Pending" }
//   ]);

//   const [platformSettings, setPlatformSettings] = useState({
//     siteName: "Villgo Core",
//     supportContact: "+91 9999900000",
//     taxRate: 5,
//     autoApproveRetailer: true
//   });

//   const [adminProfile, setAdminProfile] = useState({
//     name: "Harish",
//     company: "SHWebCreatives",
//     mobile: "9999900000",
//     email: "harish@shwebcreatives.com",
//     role: "Super Admin"
//   });

//   // Modal setup
//   const [modalMode, setModalMode] = useState(null);
//   const [modalTarget, setModalTarget] = useState(null);
//   const [formData, setFormData] = useState({});

//   // Theme observer
//   useEffect(() => {
//     if (theme === 'dark') {
//       setResolvedTheme('dark');
//     } else if (theme === 'light') {
//       setResolvedTheme('light');
//     } else {
//       const match = window.matchMedia('(prefers-color-scheme: dark)').matches;
//       setResolvedTheme(match ? 'dark' : 'light');
//     }
//   }, [theme]);

//   const showToast = (message, type = 'success') => {
//     const id = Date.now();
//     setToasts((prev) => [...prev, { id, message, type }]);
//     setTimeout(() => {
//       setToasts((prev) => prev.filter(t => t.id !== id));
//     }, 3500);
//   };

//   const themeClasses = resolvedTheme === 'dark' 
//     ? {
//         bg: 'bg-[#0f172a] text-slate-100',
//         panel: 'bg-slate-900 border-slate-800 text-slate-100',
//         border: 'border-slate-800',
//         textMuted: 'text-slate-400',
//         input: 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:ring-sky-500 focus:border-sky-500',
//         sidebar: 'bg-slate-900 border-r border-slate-850 text-slate-100',
//         sidebarHover: 'hover:bg-slate-850 hover:text-white',
//         sidebarActive: 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/10',
//         tableRowHover: 'hover:bg-slate-850/40',
//         tableHeader: 'bg-slate-800 text-slate-300',
//         card: 'bg-slate-900 border border-slate-800 shadow-sm'
//       } 
//     : {
//         bg: 'bg-sky-50/50 text-slate-800',
//         panel: 'bg-white border-sky-100 text-slate-800',
//         border: 'border-sky-100',
//         textMuted: 'text-slate-500',
//         input: 'bg-white border-sky-200 text-slate-900 placeholder-slate-400 focus:ring-sky-500 focus:border-sky-500',
//         sidebar: 'bg-sky-100 border-r border-sky-200 text-slate-800',
//         sidebarHover: 'hover:bg-sky-200 hover:text-sky-950',
//         sidebarActive: 'bg-sky-500 text-white shadow-lg shadow-sky-500/25',
//         tableRowHover: 'hover:bg-sky-50/25',
//         tableHeader: 'bg-sky-200/50 text-slate-700',
//         card: 'bg-white border border-sky-100 shadow-sm'
//       };

//   const totalOrders = orders.length;
//   const pendingOrders = orders.filter(o => o.status === 'Pending').length;
//   const cancelledOrders = orders.filter(o => o.status === 'Cancelled').length;
//   const activeWholesalers = users.filter(u => u.role === 'Wholesaler' && u.is_approved).length;
//   const pendingWholesalers = users.filter(u => u.role === 'Wholesaler' && !u.is_approved).length;

//   const handleOpenModal = (target, mode, item = {}) => {
//     setModalTarget(target);
//     setModalMode(mode);
//     setFormData(item);
//   };

//   const handleCloseModal = () => {
//     setModalMode(null);
//     setModalTarget(null);
//     setFormData({});
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();

//     if (modalTarget === 'user') {
//       if (modalMode === 'create') {
//         setUsers([...users, { id: Date.now(), name: formData.name, mobile: formData.mobile, role: formData.role || 'Retailer', is_approved: formData.role !== 'Wholesaler', status: 'Active' }]);
//         showToast("User profile successfully created");
//       } else {
//         setUsers(users.map(u => u.id === formData.id ? { ...u, ...formData } : u));
//         showToast("User modifications applied successfully");
//       }
//     }

//     if (modalTarget === 'product') {
//       if (modalMode === 'create') {
//         setProducts([...products, { id: Date.now(), name: formData.name, category: formData.category, price: Number(formData.price), moq: Number(formData.moq), stock: Number(formData.stock), wholesaler: formData.wholesaler || 'Ambika Bulk Traders' }]);
//         showToast("Product listing published globally");
//       } else {
//         setProducts(products.map(p => p.id === formData.id ? { ...p, ...formData } : p));
//         showToast("Product entry modified successfully");
//       }
//     }

//     if (modalTarget === 'order') {
//       if (modalMode === 'create') {
//         setOrders([{ id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`, retailer: formData.retailer, total: Number(formData.total), status: formData.status || 'Pending', transporter: formData.transporter || 'None', deliveryNote: formData.deliveryNote }, ...orders]);
//         showToast("New order simulated successfully");
//       } else {
//         setOrders(orders.map(o => o.id === formData.id ? { ...o, ...formData } : o));
//         showToast("Order properties updated");
//       }
//     }

//     if (modalTarget === 'broadcast') {
//       if (modalMode === 'create') {
//         setBroadcasts([{ id: Date.now(), category: formData.category || 'Offers', title: formData.title, message: formData.message, date: new Date().toISOString().split('T')[0] }, ...broadcasts]);
//         showToast("Broadcast message published instantly");
//       } else {
//         setBroadcasts(broadcasts.map(b => b.id === formData.id ? { ...b, ...formData } : b));
//         showToast("Broadcast modified successfully");
//       }
//     }

//     if (modalTarget === 'complaint') {
//       if (modalMode === 'create') {
//         setComplaints([{ id: Date.now(), retailer: formData.retailer || 'Harish Provision Store', title: formData.title, description: formData.description, date: new Date().toISOString().split('T')[0], status: 'Pending' }, ...complaints]);
//         showToast("Grievance ticket created successfully");
//       } else {
//         setComplaints(complaints.map(c => c.id === formData.id ? { ...c, ...formData } : c));
//         showToast("Complaint parameters updated");
//       }
//     }

//     handleCloseModal();
//   };

//   const handleDeleteItem = (target, id) => {
//     if (target === 'user') setUsers(users.filter(u => u.id !== id));
//     if (target === 'product') setProducts(products.filter(p => p.id !== id));
//     if (target === 'order') setOrders(orders.filter(o => o.id !== id));
//     if (target === 'broadcast') setBroadcasts(broadcasts.filter(b => b.id !== id));
//     if (target === 'complaint') setComplaints(complaints.filter(c => c.id !== id));
//     showToast(`${target.toUpperCase()} successfully removed`, 'warning');
//   };

//   const toggleUserApproval = (userId) => {
//     setUsers(users.map(u => u.id === userId ? { ...u, is_approved: !u.is_approved } : u));
//     showToast("Authorization state modified");
//   };

//   const toggleUserStatus = (userId) => {
//     setUsers(users.map(u => u.id === userId ? { ...u, status: u.status === 'Active' ? 'Blocked' : 'Active' } : u));
//     showToast("Operational access state adjusted");
//   };

//   const toggleComplaintResolve = (complaintId) => {
//     setComplaints(complaints.map(c => c.id === complaintId ? { ...c, status: c.status === 'Pending' ? 'Resolved' : 'Pending' } : c));
//     showToast("Grievance status changed");
//   };

//   return (
//     <div className={`min-h-screen font-sans transition-all duration-300 ${themeClasses.bg} flex flex-col md:flex-row`}>

//       {/* Toast Alert Feed */}
//       <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full">
//         {toasts.map(t => (
//           <div key={t.id} className={`p-4 rounded-xl shadow-lg border text-xs font-bold flex items-center justify-between gap-3 animate-slide-in ${t.type === 'success' ? 'bg-emerald-500 text-white border-emerald-400' : 'bg-amber-500 text-slate-950 border-amber-400'}`}>
//             <span>{t.message}</span>
//             <button onClick={() => setToasts(toasts.filter(toast => toast.id !== t.id))} className="opacity-70 hover:opacity-100">✕</button>
//           </div>
//         ))}
//       </div>

//       {/* Dynamic Sidebar Component */}
//       <AdminSidebar
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         pendingWholesalers={pendingWholesalers}
//         pendingOrders={pendingOrders}
//         unresolvedComplaints={complaints.filter(c => c.status === 'Pending').length}
//         settingsOpen={settingsOpen}
//         setSettingsOpen={setSettingsOpen}
//         theme={theme}
//         setTheme={setTheme}
//         themeClasses={themeClasses}
//         onLogout={() => showToast("Admin Logging out...", "warning")}
//         setSidebarOpen={setSidebarOpen}
//       />

//       {/* Main Panel Content */}
//       <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
//         <header className={`hidden md:flex items-center justify-between px-8 py-5 border-b ${themeClasses.border} ${themeClasses.panel}`}>
//           <h2 className="text-lg font-black capitalize tracking-tight">{activeTab} Panel</h2>
//           <div className="flex items-center gap-6">
//             <div className="relative w-64">
//               <input 
//                 type="text" 
//                 placeholder="Search indexes..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className={`w-full pl-10 pr-4 py-2 rounded-xl text-xs border ${themeClasses.input}`}
//               />
//               <span className="absolute left-3.5 top-2.5 text-slate-400"><AdminIcons.Search /></span>
//             </div>
//             <div className="h-6 w-px bg-sky-200 dark:bg-slate-800" />
//             <div className="flex items-center gap-2.5">
//               <div className="w-8 h-8 rounded-full bg-sky-500 text-slate-950 flex items-center justify-center font-bold">H</div>
//               <div className="text-left">
//                 <p className="text-xs font-black">{adminProfile.name}</p>
//                 <p className="text-[9px] text-slate-400 tracking-wide font-medium">{adminProfile.role}</p>
//               </div>
//             </div>
//           </div>
//         </header>

//         <div className="p-4 md:p-8 space-y-6">

//           {/* TAB 1: OVERVIEW HUB (Graphs and Stats) */}
//           {activeTab === 'overview' && (
//             <div className="space-y-6 animate-fade-in">
//               <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//                 <div className={`p-5 rounded-2xl ${themeClasses.card}`}>
//                   <span className={`text-[10px] font-black tracking-widest uppercase ${themeClasses.textMuted}`}>Trade Logs</span>
//                   <div className="mt-4 flex justify-between items-end">
//                     <span className="text-3xl font-black">{totalOrders}</span>
//                     <AdminIcons.TrendUp />
//                   </div>
//                 </div>
//                 <div className={`p-5 rounded-2xl ${themeClasses.card}`}>
//                   <span className={`text-[10px] font-black tracking-widest uppercase ${themeClasses.textMuted}`}>Pending Validation</span>
//                   <div className="mt-4">
//                     <span className="text-3xl font-black text-amber-500">{pendingOrders}</span>
//                   </div>
//                 </div>
//                 <div className={`p-5 rounded-2xl ${themeClasses.card}`}>
//                   <span className={`text-[10px] font-black tracking-widest uppercase ${themeClasses.textMuted}`}>Active Wholesalers</span>
//                   <div className="mt-4">
//                     <span className="text-3xl font-black text-violet-500">{activeWholesalers}</span>
//                   </div>
//                 </div>
//                 <div className={`p-5 rounded-2xl ${themeClasses.card}`}>
//                   <span className={`text-[10px] font-black tracking-widest uppercase ${themeClasses.textMuted}`}>Complaints Desk</span>
//                   <div className="mt-4">
//                     <span className="text-3xl font-black text-rose-500">{complaints.filter(c => c.status === 'Pending').length}</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Graphical Analysis */}
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 <div className={`${themeClasses.panel} border rounded-2xl p-5 shadow-sm`}>
//                   <h4 className="text-xs font-black uppercase text-sky-500">Shipping Volume Logistics</h4>
//                   <div className="relative h-48 w-full mt-4">
//                     <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
//                       <line x1="0" y1="50" x2="500" y2="50" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="4,4" opacity="0.25" />
//                       <line x1="0" y1="100" x2="500" y2="100" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="4,4" opacity="0.25" />
//                       <line x1="0" y1="150" x2="500" y2="150" stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="4,4" opacity="0.25" />
//                       <path d="M 10 180 Q 120 70, 240 130 T 400 30 T 490 100" fill="none" stroke="#0ea5e9" strokeWidth="3.5" />
//                     </svg>
//                   </div>
//                 </div>

//                 <div className={`${themeClasses.panel} border rounded-2xl p-5 shadow-sm`}>
//                   <h4 className="text-xs font-black uppercase text-sky-500">Logistics Lifecycle Distribution</h4>
//                   <div className="flex items-end justify-between h-48 px-4 mt-4">
//                     <div className="w-12 bg-sky-500 rounded-t-lg" style={{ height: '70%' }} />
//                     <div className="w-12 bg-amber-400 rounded-t-lg" style={{ height: '40%' }} />
//                     <div className="w-12 bg-indigo-500 rounded-t-lg" style={{ height: '55%' }} />
//                     <div className="w-12 bg-emerald-500 rounded-t-lg" style={{ height: '90%' }} />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* TAB 2: MANAGE USERS CRUD */}
//           {activeTab === 'users' && (
//             <div className={`${themeClasses.panel} border rounded-2xl overflow-hidden animate-fade-in`}>
//               <div className="p-5 border-b flex justify-between items-center">
//                 <h3 className="text-sm font-black">Platform User Profiles</h3>
//                 <button onClick={() => handleOpenModal('user', 'create')} className="bg-sky-500 hover:bg-sky-600 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl flex items-center gap-2"><AdminIcons.Plus /> Create User</button>
//               </div>
//               <div className="overflow-x-auto">
//                 <table className="w-full text-left">
//                   <thead>
//                     <tr className={`text-[10px] uppercase font-black tracking-wider ${themeClasses.tableHeader}`}>
//                       <th className="p-4">Merchant Identity</th>
//                       <th className="p-4">System Role</th>
//                       <th className="p-4">App Clearance</th>
//                       <th className="p-4 text-right">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y text-xs">
//                     {users.map(u => (
//                       <tr key={u.id} className={themeClasses.tableRowHover}>
//                         <td className="p-4 font-bold">{u.name}<p className="text-[10px] text-slate-400">{u.mobile}</p></td>
//                         <td className="p-4">{u.role}</td>
//                         <td className="p-4">
//                           <button onClick={() => toggleUserStatus(u.id)} className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 font-bold">{u.status}</button>
//                         </td>
//                         <td className="p-4 text-right flex justify-end gap-2">
//                           <button onClick={() => handleOpenModal('user', 'edit', u)} className="p-1.5 text-sky-500 hover:bg-sky-100 rounded-lg"><AdminIcons.Edit /></button>
//                           <button onClick={() => handleDeleteItem('user', u.id)} className="p-1.5 text-rose-500 hover:bg-rose-100 rounded-lg"><AdminIcons.Trash /></button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}

//           {/* TAB 3: PRODUCTS CRUD */}
//           {activeTab === 'products' && (
//             <div className={`${themeClasses.panel} border rounded-2xl overflow-hidden animate-fade-in`}>
//               <div className="p-5 border-b flex justify-between items-center">
//                 <h3 className="text-sm font-black">Master Catalog Products</h3>
//                 <button onClick={() => handleOpenModal('product', 'create')} className="bg-sky-500 hover:bg-sky-600 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl flex items-center gap-2"><AdminIcons.Plus /> Publish Product</button>
//               </div>
//               <div className="overflow-x-auto">
//                 <table className="w-full text-left">
//                   <thead>
//                     <tr className={`text-[10px] uppercase font-black tracking-wider ${themeClasses.tableHeader}`}>
//                       <th className="p-4">Product</th>
//                       <th className="p-4">Category</th>
//                       <th className="p-4">Price (INR)</th>
//                       <th className="p-4">Stock</th>
//                       <th className="p-4 text-right">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y text-xs">
//                     {products.map(p => (
//                       <tr key={p.id} className={themeClasses.tableRowHover}>
//                         <td className="p-4 font-bold">{p.name}</td>
//                         <td className="p-4">{p.category}</td>
//                         <td className="p-4 font-mono font-bold">₹{p.price}</td>
//                         <td className="p-4">{p.stock} Units</td>
//                         <td className="p-4 text-right flex justify-end gap-2">
//                           <button onClick={() => handleOpenModal('product', 'edit', p)} className="p-1.5 text-sky-500 hover:bg-sky-100 rounded-lg"><AdminIcons.Edit /></button>
//                           <button onClick={() => handleDeleteItem('product', p.id)} className="p-1.5 text-rose-500 hover:bg-rose-100 rounded-lg"><AdminIcons.Trash /></button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}

//           {/* TAB 4: ORDERS CRUD */}
//           {activeTab === 'orders' && (
//             <div className={`${themeClasses.panel} border rounded-2xl overflow-hidden animate-fade-in`}>
//               <div className="p-5 border-b flex justify-between items-center">
//                 <h3 className="text-sm font-black">Trade Operations Queue</h3>
//                 <button onClick={() => handleOpenModal('order', 'create')} className="bg-sky-500 hover:bg-sky-600 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl flex items-center gap-2"><AdminIcons.Plus /> Simulate Order</button>
//               </div>
//               <div className="overflow-x-auto">
//                 <table className="w-full text-left">
//                   <thead>
//                     <tr className={`text-[10px] uppercase font-black tracking-wider ${themeClasses.tableHeader}`}>
//                       <th className="p-4">Order ID</th>
//                       <th className="p-4">Retailer</th>
//                       <th className="p-4">Total</th>
//                       <th className="p-4">Carrier</th>
//                       <th className="p-4 text-right">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y text-xs">
//                     {orders.map(o => (
//                       <tr key={o.id} className={themeClasses.tableRowHover}>
//                         <td className="p-4 font-mono font-bold">{o.id}</td>
//                         <td className="p-4">{o.retailer}</td>
//                         <td className="p-4 font-mono font-bold text-emerald-600">₹{o.total}</td>
//                         <td className="p-4">{o.transporter}</td>
//                         <td className="p-4 text-right flex justify-end gap-2">
//                           <button onClick={() => handleOpenModal('order', 'edit', o)} className="p-1.5 text-sky-500 hover:bg-sky-100 rounded-lg"><AdminIcons.Edit /></button>
//                           <button onClick={() => handleDeleteItem('order', o.id)} className="p-1.5 text-rose-500 hover:bg-rose-100 rounded-lg"><AdminIcons.Trash /></button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}

//           {/* TAB 5: BROADCASTS CRUD */}
//           {activeTab === 'broadcasts' && (
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
//               <div className={`${themeClasses.panel} border rounded-2xl p-6 h-fit`}>
//                 <h3 className="text-sm font-black mb-1">Publish Alert Broadcast</h3>
//                 <form onSubmit={(e) => {
//                   e.preventDefault();
//                   setBroadcasts([{ id: Date.now(), category: e.target.category.value, title: e.target.title.value, message: e.target.message.value, date: "2026-06-08" }, ...broadcasts]);
//                   showToast("Notice Broadcasted!");
//                   e.target.reset();
//                 }} className="space-y-4 mt-4 text-xs">
//                   <select name="category" className={`w-full border p-3 rounded-xl ${themeClasses.input}`}>
//                     <option value="Offers">Offers</option>
//                     <option value="Updates">Updates</option>
//                   </select>
//                   <input type="text" name="title" placeholder="Title" required className={`w-full border p-3 rounded-xl ${themeClasses.input}`} />
//                   <textarea name="message" placeholder="Message body" required rows={3} className={`w-full border p-3 rounded-xl ${themeClasses.input}`} />
//                   <button type="submit" className="w-full bg-sky-500 text-slate-950 font-black py-3 rounded-xl">Publish Broadcast</button>
//                 </form>
//               </div>
//               <div className={`${themeClasses.panel} border rounded-2xl p-6 lg:col-span-2 space-y-4`}>
//                 <h3 className="text-sm font-black">History of Platform Alerts</h3>
//                 <div className="space-y-3">
//                   {broadcasts.map(b => (
//                     <div key={b.id} className="p-4 border rounded-xl flex justify-between items-start gap-4">
//                       <div>
//                         <span className="text-[9px] bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full font-bold uppercase">{b.category}</span>
//                         <h4 className="font-bold text-sm mt-1">{b.title}</h4>
//                         <p className="text-slate-500 mt-1">{b.message}</p>
//                       </div>
//                       <button onClick={() => handleDeleteItem('broadcast', b.id)} className="text-rose-500 p-1 hover:bg-rose-50 rounded-lg"><AdminIcons.Trash /></button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* TAB 6: COMPLAINTS CRUD */}
//           {activeTab === 'complaints' && (
//             <div className={`${themeClasses.panel} border rounded-2xl overflow-hidden animate-fade-in`}>
//               <div className="p-5 border-b flex justify-between items-center">
//                 <h3 className="text-sm font-black">Grievance Desk</h3>
//                 <button onClick={() => handleOpenModal('complaint', 'create')} className="bg-sky-500 hover:bg-sky-600 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl flex items-center gap-2"><AdminIcons.Plus /> Report Issue</button>
//               </div>
//               <div className="divide-y">
//                 {complaints.map(c => (
//                   <div key={c.id} className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
//                     <div>
//                       <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold uppercase">{c.status}</span>
//                       <h4 className="font-bold text-sm mt-2">{c.title}</h4>
//                       <p className="text-slate-500">{c.description}</p>
//                     </div>
//                     <div className="flex gap-2">
//                       <button onClick={() => toggleComplaintResolve(c.id)} className="bg-emerald-500 text-slate-950 px-3 py-1.5 rounded font-bold">Toggle Status</button>
//                       <button onClick={() => handleDeleteItem('complaint', c.id)} className="p-2 text-rose-500 border rounded-lg hover:bg-rose-50"><AdminIcons.Trash /></button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//         </div>
//       </main>

//       {/* CRUD Modals System Overlay */}
//       {modalMode && (
//         <AdminModals
//           modalMode={modalMode}
//           modalTarget={modalTarget}
//           formData={formData}
//           setFormData={setFormData}
//           onClose={handleCloseModal}
//           onSubmit={handleFormSubmit}
//           users={users}
//           themeClasses={themeClasses}
//         />
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import MetricCard from '../components/common/MetricCard';
import AdminIcons from '../components/admin/AdminIcons';
import { useNavigate } from "react-router-dom";
import AdminModals from '../components/admin/AdminModals';
import ProductTable from '../components/admin/ProductTable';

// ============================================================================
// MOBILE READY SUPER ADMIN WORKSPACE WITH AUTO SIDEBAR TOGGLE
// ============================================================================
export default function Dashboard() {
  const [theme, setTheme] = useState('light');
  const [resolvedTheme, setResolvedTheme] = useState('light');
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(true);
  const navigate = useNavigate();
  // Floating notifications
  const [toasts, setToasts] = useState([]);

  // Mock states with complete dataset (Matched to paper requirements)
  const [users, setUsers] = useState([
    { id: 1, name: "Ambika Bulk Traders", mobile: "8888888888", role: "Wholesaler", is_approved: true, status: "Active" },
    { id: 2, name: "Harish Provision Store", mobile: "9999999999", role: "Retailer", is_approved: true, status: "Active" },
    { id: 3, name: "Maruti Distributors", mobile: "9876543210", role: "Wholesaler", is_approved: false, status: "Active" },
    { id: 4, name: "Gujarat Cargo Express", mobile: "7777777777", role: "Transfer", is_approved: true, status: "Active" },
    { id: 5, name: "Ketan Kirana Mart", mobile: "9123456789", role: "Retailer", is_approved: true, status: "Blocked" }
  ]);

  // const [products, setProducts] = useState([
  //   { id: 101, name: "Premium Basmati Rice", category: "Grain", price: 85, moq: 50, stock: 500, wholesaler: "Ambika Bulk Traders" },
  //   { id: 102, name: "Refined Cottonseed Oil 15L", category: "Oil", price: 1650, moq: 10, stock: 120, wholesaler: "Ambika Bulk Traders" },
  //   { id: 103, name: "Whole Wheat Atta 10kg", category: "Flour", price: 380, moq: 20, stock: 350, wholesaler: "Maruti Distributors" }
  // ]);

  const [orders, setOrders] = useState([
    { id: "ORD-9981", retailer: "Harish Provision Store", total: 42500, status: "Pending", transporter: "Gujarat Cargo Express", deliveryNote: "Deliver before Friday" },
    { id: "ORD-9982", retailer: "Ketan Kirana Mart", total: 16500, status: "In Transit", transporter: "Gujarat Cargo Express", deliveryNote: "Urgent shipment" },
    { id: "ORD-9983", retailer: "Harish Provision Store", total: 8200, status: "Completed", transporter: "Gujarat Cargo Express", deliveryNote: "Handed over safely" },
    { id: "ORD-9984", retailer: "Ketan Kirana Mart", total: 4500, status: "Cancelled", transporter: "None", deliveryNote: "Address incorrect" }
  ]);

  const [broadcasts, setBroadcasts] = useState([
    { id: 201, category: "Offers", title: "Monsoon Super Sale", message: "Flat 5% extra discount on bulk flour and grains purchase!", date: "2026-06-01" },
    { id: 202, category: "Updates", title: "GST Terms Updated", message: "Check out the revised billing system under settings panel.", date: "2026-05-28" }
  ]);

  const [complaints, setComplaints] = useState([
    { id: 301, retailer: "Harish Provision Store", title: "Damaged Oil Cans Received", description: "Two tin cans of cottonseed oil were leaking upon delivery.", date: "2026-06-02", status: "Pending" }
  ]);

  const [platformSettings, setPlatformSettings] = useState({
    siteName: "Villgo Core",
    supportContact: "+91 9999900000",
    taxRate: 5,
    autoApproveRetailer: true
  });

  const [adminProfile, setAdminProfile] = useState({
    name: "Harish",
    company: "SHWebCreatives",
    mobile: "9999900000",
    email: "harish@shwebcreatives.com",
    role: "Super Admin"
  });


  // Modal setup
  const [modalMode, setModalMode] = useState(null);
  const [modalTarget, setModalTarget] = useState(null);
  const [formData, setFormData] = useState({});

  // Theme observer with Document Element Class support for safe dark mode transitions
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      setResolvedTheme('dark');
      root.classList.add('dark');
    } else if (theme === 'light') {
      setResolvedTheme('light');
      root.classList.remove('dark');
    } else {
      const match = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setResolvedTheme(match ? 'dark' : 'light');
      if (match) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }, [theme]);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const themeClasses = resolvedTheme === 'dark'
    ? {
      bg: 'bg-[#0f172a] text-slate-100',
      panel: 'bg-slate-900 border-slate-800 text-slate-100',
      border: 'border-slate-850',
      textMuted: 'text-slate-400',
      input: 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:ring-sky-500 focus:border-sky-500',
      sidebar: 'bg-slate-900 border-r border-slate-850 text-slate-100',
      sidebarHover: 'hover:bg-slate-850 hover:text-white',
      sidebarActive: 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/10',
      tableRowHover: 'hover:bg-slate-850/40',
      tableHeader: 'bg-slate-800 text-slate-300',
      card: 'bg-slate-900 border border-slate-800 shadow-sm'
    }
    : {
      bg: 'bg-sky-50/50 text-slate-800',
      panel: 'bg-white border-sky-100 text-slate-800',
      border: 'border-sky-100',
      textMuted: 'text-slate-500',
      input: 'bg-white border-sky-200 text-slate-900 placeholder-slate-400 focus:ring-sky-500 focus:border-sky-500',
      sidebar: 'bg-sky-100 border-r border-sky-200 text-slate-800',
      sidebarHover: 'hover:bg-sky-200 hover:text-sky-950',
      sidebarActive: 'bg-sky-500 text-white shadow-lg shadow-sky-500/25',
      tableRowHover: 'hover:bg-sky-200/25',
      tableHeader: 'bg-sky-200/50 text-slate-700',
      card: 'bg-white border border-sky-100 shadow-sm'
    };

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  const cancelledOrders = orders.filter(o => o.status === 'Cancelled').length;
  const activeWholesalers = users.filter(u => u.role === 'Wholesaler' && u.is_approved).length;
  const pendingWholesalers = users.filter(u => u.role === 'Wholesaler' && !u.is_approved).length;

  const handleOpenModal = (target, mode, item = {}) => {
    setModalTarget(target);
    setModalMode(mode);
    setFormData(item);
  };

  const handleCloseModal = () => {
    setModalMode(null);
    setModalTarget(null);
    setFormData({});
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (modalTarget === 'user') {
      if (modalMode === 'create') {
        setUsers([...users, { id: Date.now(), name: formData.name, mobile: formData.mobile, role: formData.role || 'Retailer', is_approved: formData.role !== 'Wholesaler', status: 'Active' }]);
        showToast("User profile successfully created");
      } else {
        setUsers(users.map(u => u.id === formData.id ? { ...u, ...formData } : u));
        showToast("User modifications applied successfully");
      }
    }

    if (modalTarget === 'product') {
      if (modalMode === 'create') {
        setProducts([...products, { id: Date.now(), name: formData.name, category: formData.category, price: Number(formData.price), moq: Number(formData.moq), stock: Number(formData.stock), wholesaler: formData.wholesaler || 'Ambika Bulk Traders' }]);
        showToast("Product listing published globally");
      } else {
        setProducts(products.map(p => p.id === formData.id ? { ...p, ...formData } : p));
        showToast("Product entry modified successfully");
      }
    }

    if (modalTarget === 'order') {
      if (modalMode === 'create') {
        setOrders([{ id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`, retailer: formData.retailer, total: Number(formData.total), status: formData.status || 'Pending', transporter: formData.transporter || 'None', deliveryNote: formData.deliveryNote }, ...orders]);
        showToast("New order simulated successfully");
      } else {
        setOrders(orders.map(o => o.id === formData.id ? { ...o, ...formData } : o));
        showToast("Order properties updated");
      }
    }

    if (modalTarget === 'broadcast') {
      if (modalMode === 'create') {
        setBroadcasts([{ id: Date.now(), category: formData.category || 'Offers', title: formData.title, message: formData.message, date: new Date().toISOString().split('T')[0] }, ...broadcasts]);
        showToast("Broadcast message published instantly");
      } else {
        setBroadcasts(broadcasts.map(b => b.id === formData.id ? { ...b, ...formData } : b));
        showToast("Broadcast modified successfully");
      }
    }

    if (modalTarget === 'complaint') {
      if (modalMode === 'create') {
        setComplaints([{ id: Date.now(), retailer: formData.retailer || 'Harish Provision Store', title: formData.title, description: formData.description, date: new Date().toISOString().split('T')[0], status: 'Pending' }, ...complaints]);
        showToast("Grievance ticket created successfully");
      } else {
        setComplaints(complaints.map(c => c.id === formData.id ? { ...c, ...formData } : c));
        showToast("Complaint parameters updated");
      }
    }

    handleCloseModal();
  };

  const handleDeleteItem = (target, id) => {
    if (target === 'user') setUsers(users.filter(u => u.id !== id));
    if (target === 'product') setProducts(products.filter(p => p.id !== id));
    if (target === 'order') setOrders(orders.filter(o => o.id !== id));
    if (target === 'broadcast') setBroadcasts(broadcasts.filter(b => b.id !== id));
    if (target === 'complaint') setComplaints(complaints.filter(c => c.id !== id));
    showToast(`${target.toUpperCase()} successfully removed`, 'warning');
  };

  const toggleUserApproval = (userId) => {
    setUsers(users.map(u => u.id === userId ? { ...u, is_approved: !u.is_approved } : u));
    showToast("Authorization state modified");
  };

  const toggleUserStatus = (userId) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: u.status === 'Active' ? 'Blocked' : 'Active' } : u));
    showToast("Operational access state adjusted");
  };

  const toggleComplaintResolve = (complaintId) => {
    setComplaints(complaints.map(c => c.id === complaintId ? { ...c, status: c.status === 'Pending' ? 'Resolved' : 'Pending' } : c));
    showToast("Grievance status changed");
  };
  //-------------

  const handleAddProduct = async () => {
    const formData = new FormData();

    formData.append("productName", productName);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("image", imageFile);

    try {
      await addProduct(formData);

      showToast("Product Added");

      loadProducts();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateProduct = async (id) => {
    const formData = new FormData();

    formData.append("productName", productName);
    formData.append("price", price);
    formData.append("stock", stock);

    try {
      await updateProduct(id, formData);

      showToast("Product Updated");

      loadProducts();
    } catch (err) {
      console.log(err);
    }
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);


  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);

      showToast("Product Deleted");

      loadProducts();
    } catch (err) {
      console.log(err);
    }
  };
  const handleRestoreProduct = async (id) => {
    try {
      await restoreProduct(id);

      showToast("Product Restored");

      loadProducts();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const res = await getActiveProducts();
    setProducts(res.data.data);
  };

  const handleEdit = (product) => {
    console.log("Edit Product:", product);

    setSelectedProduct(product);
    setShowEditModal(true);
  };


  return (
    <div className={`h-screen overflow-hidden font-sans transition-all duration-300 ${themeClasses.bg} flex flex-col md:flex-row`}>

      {/* Toast Alert Feed - ONLY rendered when active to prevent click blocking overlay */}
      {toasts.length > 0 && (
        <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full p-4 md:p-0">
          {toasts.map(t => (
            <div key={t.id} className={`p-4 rounded-xl shadow-lg border text-xs font-bold flex items-center justify-between gap-3 animate-slide-in ${t.type === 'success' ? 'bg-emerald-500 text-white border-emerald-400' : 'bg-amber-500 text-slate-950 border-amber-400'}`}>
              <span>{t.message}</span>
              <button onClick={() => setToasts(toasts.filter(toast => toast.id !== t.id))} className="opacity-70 hover:opacity-100 text-base leading-none focus:outline-none">✕</button>
            </div>
          ))}
        </div>
      )}

      {/* Dynamic Sidebar Component */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pendingWholesalers={pendingWholesalers}
        pendingOrders={pendingOrders}
        unresolvedComplaints={complaints.filter(c => c.status === 'Pending').length}
        settingsOpen={settingsOpen}
        setSettingsOpen={setSettingsOpen}
        theme={theme}
        setTheme={setTheme}
        themeClasses={themeClasses}
        onLogout={() => {
          localStorage.clear();
          window.location.href = "/login";

          showToast("Logged Out Successfully", "success");

          setTimeout(() => {
            navigate("/login");
          }, 1000);
        }}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Panel Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">

        {/* ============================================================================
           MOBILE TOP BAR HEADER (Allows mobile users to easily open the sidebar!)
           ============================================================================ */}
        <div className={`md:hidden flex items-center justify-between p-4 border-b shrink-0 ${themeClasses.border} ${themeClasses.panel} sticky top-0 z-30 shadow-sm`}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-400 flex items-center justify-center font-black text-slate-950 shadow-md">
              VL
            </div>
            <div>
              <span className="text-base font-black tracking-wider text-sky-500 font-mono block leading-none">VL Villgo</span>
              <span className="text-[8px] text-slate-400 tracking-widest block uppercase font-black mt-1">Admin Panel</span>
            </div>
          </div>

          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2.5 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 active:scale-95 transition-all focus:outline-none"
            aria-label="Open Navigation Sidebar"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Desktop Header */}
        <header className={`hidden md:flex items-center justify-between px-8 py-5 border-b ${themeClasses.border} ${themeClasses.panel}`}>
          <h2 className="text-lg font-black capitalize tracking-tight">{activeTab} Panel</h2>
          <div className="flex items-center gap-6">
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search indexes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-xl text-xs border ${themeClasses.input}`}
              />
              <span className="absolute left-3.5 top-2.5 text-slate-400"><AdminIcons.Search /></span>
            </div>
            <div className="h-6 w-px bg-sky-200 dark:bg-slate-800" />
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-sky-500 text-slate-950 flex items-center justify-center font-bold">H</div>
              <div className="text-left">
                <p className="text-xs font-black">{adminProfile.name}</p>
                <p className="text-[9px] text-slate-400 tracking-wide font-medium">{adminProfile.role}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-8 space-y-6">

          {/* TAB 1: OVERVIEW HUB (Graphs and Stats) */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className={`p-5 rounded-2xl ${themeClasses.card}`}>
                  <span className={`text-[10px] font-black tracking-widest uppercase ${themeClasses.textMuted}`}>Trade Logs</span>
                  <div className="mt-4 flex justify-between items-end">
                    <span className="text-3xl font-black">{totalOrders}</span>
                    <AdminIcons.TrendUp />
                  </div>
                </div>
                <div className={`p-5 rounded-2xl ${themeClasses.card}`}>
                  <span className={`text-[10px] font-black tracking-widest uppercase ${themeClasses.textMuted}`}>Pending Validation</span>
                  <div className="mt-4">
                    <span className="text-3xl font-black text-amber-500">{pendingOrders}</span>
                  </div>
                </div>
                <div className={`p-5 rounded-2xl ${themeClasses.card}`}>
                  <span className={`text-[10px] font-black tracking-widest uppercase ${themeClasses.textMuted}`}>Active Wholesalers</span>
                  <div className="mt-4">
                    <span className="text-3xl font-black text-violet-500">{activeWholesalers}</span>
                  </div>
                </div>
                <div className={`p-5 rounded-2xl ${themeClasses.card}`}>
                  <span className={`text-[10px] font-black tracking-widest uppercase ${themeClasses.textMuted}`}>Complaints Desk</span>
                  <div className="mt-4">
                    <span className="text-3xl font-black text-rose-500">{complaints.filter(c => c.status === 'Pending').length}</span>
                  </div>
                </div>
              </div>

              {/* Graphical Analysis */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className={`${themeClasses.panel} border rounded-2xl p-5 shadow-sm`}>
                  <h4 className="text-xs font-black uppercase text-sky-500">Shipping Volume Logistics</h4>
                  <div className="relative h-48 w-full mt-4">
                    <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
                      <line x1="0" y1="50" x2="500" y2="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4,4" opacity="0.15" />
                      <line x1="0" y1="100" x2="500" y2="100" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4,4" opacity="0.15" />
                      <line x1="0" y1="150" x2="500" y2="150" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4,4" opacity="0.15" />
                      <path d="M 10 180 Q 120 70, 240 130 T 400 30 T 490 100" fill="none" stroke="#0ea5e9" strokeWidth="3.5" />
                    </svg>
                  </div>
                </div>

                <div className={`${themeClasses.panel} border rounded-2xl p-5 shadow-sm`}>
                  <h4 className="text-xs font-black uppercase text-sky-500">Logistics Lifecycle Distribution</h4>
                  <div className="flex items-end justify-between h-48 px-4 mt-4">
                    <div className="w-10 sm:w-12 bg-sky-500 rounded-t-lg shadow" style={{ height: '70%' }} />
                    <div className="w-10 sm:w-12 bg-amber-400 rounded-t-lg shadow" style={{ height: '40%' }} />
                    <div className="w-10 sm:w-12 bg-indigo-500 rounded-t-lg shadow" style={{ height: '55%' }} />
                    <div className="w-10 sm:w-12 bg-emerald-500 rounded-t-lg shadow" style={{ height: '90%' }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MANAGE USERS CRUD */}
          {activeTab === 'users' && (
            <div className={`${themeClasses.panel} border rounded-2xl overflow-hidden animate-fade-in`}>
              <div className="p-5 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h3 className="text-sm font-black">Platform User Profiles</h3>
                <button onClick={() => handleOpenModal('user', 'create')} className="w-full sm:w-auto bg-sky-500 hover:bg-sky-600 text-slate-950 font-black text-xs px-4 py-3 sm:py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all"><AdminIcons.Plus /> Create User</button>
              </div>
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left min-w-[600px]">
                  <thead>
                    <tr className={`text-[10px] uppercase font-black tracking-wider ${themeClasses.tableHeader}`}>
                      <th className="p-4">Merchant Identity</th>
                      <th className="p-4">System Role</th>
                      <th className="p-4">App Clearance</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-xs">
                    {users.map(u => (
                      <tr key={u.id} className={themeClasses.tableRowHover}>
                        <td className="p-4 font-bold">{u.name}<p className="text-[10px] text-slate-400">{u.mobile}</p></td>
                        <td className="p-4">{u.role}</td>
                        <td className="p-4">
                          <button onClick={() => toggleUserStatus(u.id)} className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 font-bold hover:bg-sky-500 hover:text-slate-950 transition-colors focus:outline-none">{u.status}</button>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button onClick={() => handleOpenModal('user', 'edit', u)} className="p-2 text-sky-500 hover:bg-sky-100 rounded-lg transition-colors"><AdminIcons.Edit /></button>
                            <button onClick={() => handleDeleteItem('user', u.id)} className="p-2 text-rose-500 hover:bg-rose-100 rounded-lg transition-colors"><AdminIcons.Trash /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: PRODUCTS CRUD */}
          {activeTab === 'products' && (
            // <div className={`${themeClasses.panel} border rounded-2xl overflow-hidden animate-fade-in`}>
            //   <div className="p-5 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            //     <h3 className="text-sm font-black">Master Catalog Products</h3>
            //     <button onClick={() => handleOpenModal('product', 'create')} className="w-full sm:w-auto bg-sky-500 hover:bg-sky-600 text-slate-950 font-black text-xs px-4 py-3 sm:py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all"><AdminIcons.Plus /> Publish Product</button>
            //   </div>
            //   <div className="overflow-x-auto w-full">
            //     <table className="w-full text-left min-w-[600px]">
            //       <thead>
            //         <tr className={`text-[10px] uppercase font-black tracking-wider ${themeClasses.tableHeader}`}>
            //           <th className="p-4">Product</th>
            //           <th className="p-4">Category</th>
            //           <th className="p-4">Price (INR)</th>
            //           <th className="p-4">Stock</th>
            //           <th className="p-4 text-right">Actions</th>
            //         </tr>
            //       </thead>
            //       <tbody className="divide-y text-xs">
            //         {products.map(p => (
            //           <tr key={p.id} className={themeClasses.tableRowHover}>
            //             <td className="p-4 font-bold">{p.name}</td>
            //             <td className="p-4">{p.category}</td>
            //             <td className="p-4 font-mono font-bold">₹{p.price}</td>
            //             <td className="p-4">{p.stock} Units</td>
            //             <td className="p-4 text-right">
            //               <div className="flex justify-end gap-2">
            //                 <button onClick={() => handleOpenModal('product', 'edit', p)} className="p-2 text-sky-500 hover:bg-sky-100 rounded-lg transition-colors"><AdminIcons.Edit /></button>
            //                 <button
            //                   onClick={() => handleDeleteProduct(p.id)}
            //                 >
            //                   Delete
            //                 </button>
            //               </div>
            //             </td>
            //           </tr>
            //         ))}
            //       </tbody>
            //     </table>
            //   </div>
            // </div>
                 <ProductTable
            products={products}
            onDelete={handleDeleteItem}
            onRestore={handleRestoreProduct}
            onEdit={handleEdit}
            onBack={() => setActivePage("dashboard")}
            onAddProduct={() => setActivePage("addProduct")}
          />
          )}

     
          {/* TAB 4: ORDERS CRUD */}
          {activeTab === 'orders' && (
            <div className={`${themeClasses.panel} border rounded-2xl overflow-hidden animate-fade-in`}>
              <div className="p-5 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h3 className="text-sm font-black">Trade Operations Queue</h3>
                <button onClick={() => handleOpenModal('order', 'create')} className="w-full sm:w-auto bg-sky-500 hover:bg-sky-600 text-slate-950 font-black text-xs px-4 py-3 sm:py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all"><AdminIcons.Plus /> Simulate Order</button>
              </div>
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left min-w-[700px]">
                  <thead>
                    <tr className={`text-[10px] uppercase font-black tracking-wider ${themeClasses.tableHeader}`}>
                      <th className="p-4">Order ID</th>
                      <th className="p-4">Retailer</th>
                      <th className="p-4">Total</th>
                      <th className="p-4">Carrier</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-xs">
                    {orders.map(o => (
                      <tr key={o.id} className={themeClasses.tableRowHover}>
                        <td className="p-4 font-mono font-bold">{o.id}</td>
                        <td className="p-4">{o.retailer}</td>
                        <td className="p-4 font-mono font-bold text-emerald-600">₹{o.total}</td>
                        <td className="p-4">{o.transporter}</td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button onClick={() => handleOpenModal('order', 'edit', o)} className="p-2 text-sky-500 hover:bg-sky-100 rounded-lg transition-colors"><AdminIcons.Edit /></button>
                            <button onClick={() => handleDeleteItem('order', o.id)} className="p-2 text-rose-500 hover:bg-rose-100 rounded-lg transition-colors"><AdminIcons.Trash /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: BROADCAST NOTIFICATIONS CRUD */}
          {activeTab === 'broadcasts' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
              <div className={`${themeClasses.panel} border rounded-2xl p-6 h-fit`}>
                <h3 className="text-sm font-black mb-1">Publish Alert Broadcast</h3>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  setBroadcasts([{ id: Date.now(), category: e.target.category.value, title: e.target.title.value, message: e.target.message.value, date: "2026-06-08" }, ...broadcasts]);
                  showToast("Notice Broadcasted!");
                  e.target.reset();
                }} className="space-y-4 mt-4 text-xs">
                  <select name="category" className={`w-full border p-3 rounded-xl ${themeClasses.input} focus:outline-none`}>
                    <option value="Offers">Offers</option>
                    <option value="Updates">Updates</option>
                  </select>
                  <input type="text" name="title" placeholder="Title" required className={`w-full border p-3 rounded-xl ${themeClasses.input} focus:outline-none`} />
                  <textarea name="message" placeholder="Message body" required rows={3} className={`w-full border p-3 rounded-xl ${themeClasses.input} focus:outline-none`} />
                  <button type="submit" className="w-full bg-sky-500 hover:bg-sky-600 text-slate-950 font-black py-3 rounded-xl transition-all focus:outline-none">Publish Broadcast</button>
                </form>
              </div>
              <div className={`${themeClasses.panel} border rounded-2xl p-6 lg:col-span-2 space-y-4`}>
                <h3 className="text-sm font-black">History of Platform Alerts</h3>
                <div className="space-y-3">
                  {broadcasts.map(b => (
                    <div key={b.id} className="p-4 border border-sky-100 dark:border-slate-800 rounded-xl flex justify-between items-start gap-4">
                      <div>
                        <span className="text-[9px] bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 px-2 py-0.5 rounded-full font-bold uppercase">{b.category}</span>
                        <h4 className="font-bold text-sm mt-1">{b.title}</h4>
                        <p className="text-slate-500 mt-1">{b.message}</p>
                      </div>
                      <button onClick={() => handleDeleteItem('broadcast', b.id)} className="text-rose-500 p-2 hover:bg-rose-50 dark:hover:bg-slate-800 rounded-lg transition-colors focus:outline-none"><AdminIcons.Trash /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: COMPLAINTS DESK CRUD */}
          {activeTab === 'complaints' && (
            <div className={`${themeClasses.panel} border rounded-2xl overflow-hidden animate-fade-in`}>
              <div className="p-5 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h3 className="text-sm font-black">Grievance Desk</h3>
                <button onClick={() => handleOpenModal('complaint', 'create')} className="w-full sm:w-auto bg-sky-500 hover:bg-sky-600 text-slate-950 font-black text-xs px-4 py-3 sm:py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all"><AdminIcons.Plus /> Report Issue</button>
              </div>
              <div className="divide-y divide-sky-100 dark:divide-slate-800">
                {complaints.map(c => (
                  <div key={c.id} className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
                    <div className="space-y-2">
                      <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold uppercase">{c.status}</span>
                      <h4 className="font-bold text-sm">{c.title}</h4>
                      <p className="text-slate-500">{c.description}</p>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto justify-end sm:justify-start">
                      <button onClick={() => toggleComplaintResolve(c.id)} className="bg-emerald-500 text-slate-950 px-3 py-1.5 rounded-lg font-bold hover:bg-emerald-600 transition-colors focus:outline-none">Toggle Status</button>
                      <button onClick={() => handleDeleteItem('complaint', c.id)} className="p-2 text-rose-500 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-rose-50 dark:hover:bg-slate-800 focus:outline-none"><AdminIcons.Trash /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: ADMIN PROFILE DETAILS */}
          {activeTab === 'profile' && (
            <div className={`${themeClasses.panel} border rounded-2xl p-6 max-w-2xl animate-fade-in`}>
              <div className="border-b border-sky-100 dark:border-slate-800 pb-4 mb-6">
                <h3 className="text-sm font-black">Super Admin Profile Information</h3>
                <p className={`text-xs ${themeClasses.textMuted}`}>Modify administrative contact information and brand profile</p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); showToast("Admin profile updated successfully!"); }} className="space-y-4 text-xs">
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-16 h-16 rounded-full bg-sky-500 text-slate-950 flex items-center justify-center font-black text-2xl shadow-md uppercase">
                    H
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base">{adminProfile.name}</h4>
                    <p className={`text-xs ${themeClasses.textMuted}`}>Platform {adminProfile.role}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Admin Username</label>
                    <input
                      type="text"
                      value={adminProfile.name}
                      required
                      onChange={(e) => setAdminProfile({ ...adminProfile, name: e.target.value })}
                      className={`w-full border p-3 rounded-xl ${themeClasses.input} focus:outline-none`}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Associated Business Name</label>
                    <input
                      type="text"
                      value={adminProfile.company}
                      required
                      onChange={(e) => setAdminProfile({ ...adminProfile, company: e.target.value })}
                      className={`w-full border p-3 rounded-xl ${themeClasses.input} focus:outline-none`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Mobile Contact No.</label>
                    <input
                      type="text"
                      value={adminProfile.mobile}
                      required
                      onChange={(e) => setAdminProfile({ ...adminProfile, mobile: e.target.value })}
                      className={`w-full border p-3 rounded-xl ${themeClasses.input} focus:outline-none`}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Email Coordinates</label>
                    <input
                      type="email"
                      value={adminProfile.email}
                      required
                      onChange={(e) => setAdminProfile({ ...adminProfile, email: e.target.value })}
                      className={`w-full border p-3 rounded-xl ${themeClasses.input} focus:outline-none`}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-sky-500 text-slate-950 font-black px-6 py-3.5 rounded-xl hover:bg-sky-600 transition-all shadow-md mt-4 focus:outline-none"
                >
                  Save Profile Parameters
                </button>
              </form>
            </div>
          )}

          {/* TAB 8: CENTRAL PLATFORM VARIABLES */}
          {activeTab === 'settings' && (
            <div className={`${themeClasses.panel} border rounded-2xl p-6 max-w-2xl animate-fade-in`}>
              <div className="border-b border-sky-100 dark:border-slate-800 pb-4 mb-6">
                <h3 className="text-sm font-black">Global Configurations Desk</h3>
                <p className={`text-xs ${themeClasses.textMuted}`}>Adjust shipping rates, platforms names, and auto-verifications</p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); showToast("General platform settings updated!"); }} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Platform Brand Name</label>
                    <input
                      type="text"
                      value={platformSettings.siteName}
                      onChange={(e) => setPlatformSettings({ ...platformSettings, siteName: e.target.value })}
                      className={`w-full border p-3 rounded-xl ${themeClasses.input} focus:outline-none`}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Central Helpdesk Helpline</label>
                    <input
                      type="text"
                      value={platformSettings.supportContact}
                      onChange={(e) => setPlatformSettings({ ...platformSettings, supportContact: e.target.value })}
                      className={`w-full border p-3 rounded-xl ${themeClasses.input} focus:outline-none`}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-slate-900 dark:bg-sky-500 dark:text-slate-950 text-white font-black px-6 py-3.5 rounded-xl hover:bg-opacity-90 transition-all mt-4 focus:outline-none"
                >
                  Save Central Variables
                </button>
              </form>
            </div>
          )}

        </div>
      </main>

      {/* CRUD Modals System Overlay */}
      {modalMode && (
        <AdminModals
          modalMode={modalMode}
          modalTarget={modalTarget}
          formData={formData}
          setFormData={setFormData}
          onClose={handleCloseModal}
          onSubmit={handleFormSubmit}
          users={users}
          themeClasses={themeClasses}
        />
      )}
    </div>
  );
}