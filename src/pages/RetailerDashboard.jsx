// import React, { useState } from 'react';
// import { RetailerNavbar } from '../components/Retailer/RetailerNavbar';
// import { RetailerFilters } from '../components/Retailer/RetailerFilters';
// import Toast from '../components/common/Toast';
// // ============================================================================
// // SELF-CONTAINED INLINE SVG ICONS (Removes relative import dependencies)
// // ============================================================================
// const Icons = {
//   Cart: () => (
//     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//       <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//     </svg>
//   ),
//   Plus: () => (
//     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
//       <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
//     </svg>
//   ),
//   Minus: () => (
//     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
//       <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
//     </svg>
//   ),
//   Check: () => (
//     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
//       <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//     </svg>
//   )
// };

// // ============================================================================
// // FLIPKART STYLE PRODUCT CARD SUB-COMPONENT (100% Standalone & Error-Free)
// // ============================================================================
// export const RetailerProductCard = ({
//   product,
//   cartItem,
//   themeClasses,
//   toggleWishlist,
//   isWishlisted,
//   setQuickViewProduct,
//   handleAddToCart,
//   setActivePage
// }) => {
//   const [qty, setQty] = useState(product.moq);

//   return (
//     <div className={`rounded-xl overflow-hidden transition-all duration-300 flex flex-col justify-between p-4 relative ${themeClasses.card}`}>
      
//       {/* Wishlist Heart Icon */}
//       <button 
//         onClick={() => toggleWishlist(product.id)}
//         className="absolute top-4 right-4 p-2 bg-white/80 dark:bg-slate-850/80 rounded-full text-red-500 hover:scale-110 transition-transform focus:outline-none z-10 shadow-xs"
//       >
//         <svg className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
//           <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//         </svg>
//       </button>

//       {/* Top Emoji Illustration Container */}
//       <div 
//         className="bg-slate-100 dark:bg-slate-950 h-40 rounded-lg flex items-center justify-center text-4xl mb-4 relative cursor-pointer"
//         onClick={() => setQuickViewProduct(product)}
//       >
//         <span>{product.img}</span>
//         <span className="absolute bottom-2.5 left-2.5 text-[9px] bg-sky-500 text-white font-extrabold px-1.5 py-0.5 rounded-sm">Quick View</span>
//       </div>

//       {/* Specs Information */}
//       <div className="space-y-1">
//         <p className="text-[10px] font-black uppercase text-slate-400">{product.category}</p>
//         <h4 
//           className="text-sm font-black text-slate-800 dark:text-white hover:text-sky-500 cursor-pointer truncate"
//           onClick={() => setQuickViewProduct(product)}
//         >
//           {product.name}
//         </h4>
//         <p className="text-[11px] font-bold text-slate-400">Seller: {product.wholesaler}</p>
        
//         {/* Rating stars */}
//         <div className="flex items-center gap-1">
//           <span className="bg-emerald-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-sm flex items-center gap-0.5">
//             {product.rating} ★
//           </span>
//           <span className="text-[10px] text-slate-400 font-bold">({product.reviews} reviews)</span>
//         </div>

//         {/* Price Blocks */}
//         <div className="flex items-baseline gap-2 pt-1.5">
//           <span className="text-lg font-black text-slate-800 dark:text-white">₹{product.price}</span>
//           <span className="text-xs text-slate-400 line-through">₹{product.originalPrice}</span>
//           <span className="text-xs text-emerald-500 font-black">{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off</span>
//         </div>

//         <div className="text-[10.5px] font-extrabold text-red-500 pt-1">
//           MOQ: {product.moq} {product.unit}s required
//         </div>
//       </div>

//       {/* Order Trigger Buttons */}
//       <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-850">
//         {cartItem ? (
//           <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-2.5 text-center text-xs font-black text-emerald-500 flex items-center justify-center gap-2">
//             <Icons.Check />
//             <span>Cart ma Add chhe ({cartItem.qty})</span>
//           </div>
//         ) : (
//           <div className="space-y-2.5">
//             {/* Direct selector prior to adding */}
//             <div className="flex items-center justify-between text-xs font-bold">
//               <span className="text-slate-400">Jatho:</span>
//               <div className="flex items-center bg-slate-100 dark:bg-slate-850 rounded-lg p-1 border dark:border-slate-700">
//                 <button
//                   onClick={() => setQty(Math.max(product.moq, qty - 1))}
//                   className="p-1 text-slate-500 hover:text-slate-700 focus:outline-none"
//                 >
//                   <Icons.Minus />
//                 </button>
//                 <span className="px-2 font-black text-slate-800 dark:text-white min-w-[28px] text-center">{qty}</span>
//                 <button
//                   onClick={() => setQty(qty + 1)}
//                   className="p-1 text-slate-500 hover:text-slate-700 focus:outline-none"
//                 >
//                   <Icons.Plus />
//                 </button>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-2">
//               <button 
//                 onClick={() => handleAddToCart(product, qty)}
//                 className="py-2.5 bg-yellow-400 hover:bg-yellow-500 text-sky-950 font-black text-xs rounded-sm transition-all flex items-center justify-center gap-1.5 focus:outline-none"
//               >
//                 <Icons.Cart />
//                 <span>Cart</span>
//               </button>
//               <button 
//                 onClick={() => { handleAddToCart(product, qty); setActivePage('cart'); }}
//                 className="py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-black text-xs rounded-sm transition-all focus:outline-none"
//               >
//                 ⚡ Buy Now
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//     </div>
//   );
// };

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const INITIAL_PRODUCTS = [
  { id: 301, name: "Premium Basmati Rice (Sharbati)", category: "Anaj (Grains)", price: 78, originalPrice: 95, moq: 50, stock: 450, unit: "kg", wholesaler: "Ambika Bulk Traders", rating: 4.8, reviews: 142, img: "🌾", description: "Vibrant long grains, direct from GIDC Mehsana Depot. Soft texture after cooking and premium aroma." },
  { id: 302, name: "Refined Cottonseed Oil (15L Tin)", category: "Teel (Oil)", price: 1580, originalPrice: 1800, moq: 5, stock: 80, unit: "Tin", wholesaler: "Maruti Oil Depot", rating: 4.9, reviews: 218, img: "🛢️", description: "Top grade cottonseed oil for commercial use. Double filtered, non-sticky and zero cholesterol." },
  { id: 303, name: "Whole Wheat Atta Lokwan (50kg)", category: "Lot (Flour)", price: 1650, originalPrice: 1950, moq: 10, stock: 300, unit: "Kothlo", wholesaler: "Ambika Bulk Traders", rating: 4.6, reviews: 88, img: "🍞", description: "Pure Lokwan wheat flour with zero maida mixing. High moisture retention for soft rotis." },
  { id: 304, name: "Premium Kolam Rice Special", category: "Anaj (Grains)", price: 58, originalPrice: 70, moq: 100, stock: 800, unit: "kg", wholesaler: "Jay Bharat Trading", rating: 4.5, reviews: 94, img: "🌾", description: "Daily use Kolam rice grains. Sourced from south-Gujarat regional farms." },
  { id: 305, name: "Pure Mustard Oil (1L Bottle)", category: "Teel (Oil)", price: 165, originalPrice: 195, moq: 24, stock: 150, unit: "bottle", wholesaler: "Maruti Oil Depot", rating: 4.7, reviews: 105, img: "🍾", description: "Saras mustard seeds cold pressed extraction oil. Traditional strong aroma." },
  { id: 306, name: "Chana Dal Bold Premium", category: "Anaj (Grains)", price: 72, originalPrice: 85, moq: 40, stock: 500, unit: "kg", wholesaler: "Jay Bharat Trading", rating: 4.4, reviews: 63, img: "🥣", description: "Polished and sorted yellow chana dal. High protein and delicious taste." },
  { id: 307, name: "Turmeric Powder Masala (Selam)", category: "Masala", price: 180, originalPrice: 220, moq: 10, stock: 200, unit: "kg", wholesaler: "Gujarat Spices Corp", rating: 4.9, reviews: 310, img: "🌶️", description: "High curcumin yellow Selam Haldi powder. Naturally dried without artificial colors." },
  { id: 308, name: "Resham Patto Red Chilli Powder", category: "Masala", price: 295, originalPrice: 350, moq: 10, stock: 180, unit: "kg", wholesaler: "Gujarat Spices Corp", rating: 4.8, reviews: 175, img: "🌶️", description: "Medium hot, high coloration Resham Patto red chillies powdered at GIDC Gondal." }
];

const INITIAL_ORDERS = [
  {
    id: "VLG-ORD-9021",
    wholesaler: "Ambika Bulk Traders",
    date: "2026-06-08",
    total: 21500,
    status: "Completed",
    transporter: "Maruti Cargo Services",
    deliveryNote: "Amdavad GIDC Depot No. 4 delivery",
    items: [
      { name: "Premium Basmati Rice (Sharbati)", qty: 200, price: 78 },
      { name: "Whole Wheat Atta Lokwan (50kg)", qty: 5, price: 1650 }
    ]
  },
  {
    id: "VLG-ORD-9022",
    wholesaler: "Maruti Oil Depot",
    date: "2026-06-10",
    total: 18960,
    status: "In Transit",
    transporter: "Gujarat Speed Logistics",
    deliveryNote: "Keep away from wet surfaces. Deliver at GIDC Sanand.",
    items: [
      { name: "Refined Cottonseed Oil (15L Tin)", qty: 12, price: 1580 }
    ]
  }
];

const INITIAL_COMPLAINTS = [
  { id: "TKT-5501", orderId: "VLG-ORD-9021", title: "Dal na Kothla Fatela hata", detail: "Chana dal na 2 kothla side mathi fatela hata, thodo loss chhe.", date: "2026-06-09", status: "Resolved", reply: "Refund of ₹500 credited to your wallet balance." }
];

export const RetailerDashboard = () => {
  const [theme, setTheme] = useState('light');
  const [resolvedTheme, setResolvedTheme] = useState('light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [activePage, setActivePage] = useState('bazaar');

  const [products] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [complaints, setComplaints] = useState(INITIAL_COMPLAINTS);
  const [wishlist, setWishlist] = useState([301, 303]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(2000);
  const [selectedWholesaler, setSelectedWholesaler] = useState('All');

  const [trackingOrder, setTrackingOrder] = useState(INITIAL_ORDERS[1]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toasts, setToasts] = useState([]);

  const [profile, setProfile] = useState({
    storeName: "Harish Provision Store",
    ownerName: "Harishbhai Vaistra",
    mobile: "9999999999",
    email: "harish.store@gmail.com",
    address: "Plot No. 44/B, Opposite GIDC Admin Block, Sanand GIDC",
    city: "Ahmedabad",
    gstin: "24AAAFV8802R1Z2",
    walletBalance: 8400
  });

  useEffect(() => {
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setResolvedTheme(mediaQuery.matches ? 'dark' : 'light');
    } else {
      setResolvedTheme(theme);
    }
  }, [theme]);

  // Sync Tailwind document base element class
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
    }, 3000);
  };

  const handleAddToCart = (product, quantity) => {
    const existIndex = cart.findIndex(c => c.id === product.id);
    if (existIndex > -1) {
      const updated = [...cart];
      updated[existIndex].qty += quantity;
      setCart(updated);
    } else {
      setCart([...cart, { ...product, qty: quantity }]);
    }
    showToast(`${product.name} Cart ma safalta purvak umerey gael chhe!`);
  };

  const updateCartQty = (productId, newQty) => {
    setCart(cart.map(c => c.id === productId ? { ...c, qty: newQty } : c));
    showToast("Cart ma jatho badlai gayo!");
  };

  const removeCartItem = (productId) => {
    setCart(cart.filter(c => c.id !== productId));
    showToast("Item ne cart mathi kadhi nakhi!", "warning");
  };

  const handleCheckout = (deliveryNote) => {
    const wholesalers = [...new Set(cart.map(item => item.wholesaler))];
    const newPlacedOrders = wholesalers.map(wh => {
      const whItems = cart.filter(item => item.wholesaler === wh);
      const totalAmt = whItems.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);
      const orderId = `VLG-ORD-${Math.floor(1000 + Math.random() * 9000)}`;

      return {
        id: orderId,
        wholesaler: wh,
        date: new Date().toISOString().split('T')[0],
        total: totalAmt,
        status: "Pending",
        transporter: "GIDC Cargo Speedline",
        deliveryNote: deliveryNote || "Deliver safely at Sanand warehouse",
        items: whItems.map(wi => ({ name: wi.name, qty: wi.qty, price: wi.price }))
      };
    });

    setOrders([...newPlacedOrders, ...orders]);
    setCart([]);
    setTrackingOrder(newPlacedOrders[0]);
    setActivePage('orders');
    showToast("Jai Ho! Flipkart Style checkout thailyu chhe. Navo Order placed!", "success");
  };

  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
      showToast("Item wish list mathi dur kari!", "warning");
    } else {
      setWishlist([...wishlist, productId]);
      showToast("Item wish list ma add thai!");
    }
  };

  const raiseComplaint = (orderId, title, detail) => {
    if (!orderId || !title || !detail) {
      showToast("Badhi mahiti bharvi jaruri chhe!", "error");
      return;
    }
    const newTkt = {
      id: `TKT-${Math.floor(5000 + Math.random() * 1000)}`,
      orderId,
      title,
      detail,
      date: new Date().toISOString().split('T')[0],
      status: "Pending",
      reply: null
    };
    setComplaints([newTkt, ...complaints]);
    showToast("Fariyaad master server par nodhai gayi chhe!");
  };

  const themeClasses = resolvedTheme === 'dark' ? {
    bg: 'bg-slate-950 text-slate-100',
    header: 'bg-slate-900 border-slate-800 text-white',
    panel: 'bg-slate-900 border-slate-800 text-slate-100',
    sidebar: 'bg-slate-900 border border-slate-800 text-slate-100',
    border: 'border-slate-800',
    input: 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:ring-sky-400',
    card: 'bg-slate-900 border border-slate-800 text-white hover:shadow-slate-950/50',
    subBar: 'bg-slate-950 border-b border-slate-800',
    badge: 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
  } : {
    bg: 'bg-slate-50 text-slate-800',
    header: 'bg-sky-600 border-sky-700 text-white shadow-md',
    panel: 'bg-white border-slate-200 text-slate-800',
    sidebar: 'bg-[#F1F5F9] border border-slate-200 text-slate-800',
    border: 'border-slate-200',
    input: 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-sky-500',
    card: 'bg-white border border-slate-100 text-slate-800 hover:shadow-xl hover:shadow-slate-100',
    subBar: 'bg-white border-b border-slate-200 shadow-xs',
    badge: 'bg-sky-50 text-sky-600 border border-sky-200'
  };

  const cartTotalVal = cart.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);
  const wholesalersList = ['All', ...new Set(products.map(p => p.wholesaler))];

  return (
    <div className={`min-h-screen font-sans flex flex-col transition-colors duration-300 ${themeClasses.bg}`}>
      
      {/* Toast Alert Portal */}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        {toasts.map(t => (
          <div key={t.id} className={`p-4 rounded-xl shadow-2xl border text-sm font-semibold flex items-center justify-between pointer-events-auto transition-all ${
            t.type === 'error' ? 'bg-red-500 text-white border-red-600' :
            t.type === 'warning' ? 'bg-amber-500 text-white border-amber-600' :
            'bg-emerald-500 text-white border-emerald-600'
          }`}>
            <span>{t.message}</span>
            <button onClick={() => setToasts(toasts.filter(x => x.id !== t.id))} className="ml-3 hover:opacity-80 focus:outline-none">
              <Icons.X />
            </button>
          </div>
        ))}
      </div>

      {/* Flipkart Header Component */}
      <RetailerNavbar
        themeClasses={themeClasses}
        profile={profile}
        cartLength={cart.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setActivePage={setActivePage}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        showToast={showToast}
      />

      {/* Responsive Workspace Grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* TAB 1: BAZAAR MARKETPLACE CATALOG */}
        {activePage === 'bazaar' && (
          <div className="flex flex-col lg:flex-row gap-8 animate-fade-in">
            
            {/* Sidebar Filter Menu */}
            <RetailerFilters
              themeClasses={themeClasses}
              theme={theme}
              setTheme={setTheme}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              selectedWholesaler={selectedWholesaler}
              setSelectedWholesaler={setSelectedWholesaler}
              wholesalersList={wholesalersList}
              profile={profile}
              setSelectedCategory={setSelectedCategory}
              showToast={showToast}
            />

            {/* Catalog Grid View */}
            <div className="flex-1 space-y-6">
              
              {/* Marketing Promotion Panel */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white relative overflow-hidden shadow-lg">
                <span className="bg-yellow-400 text-sky-950 text-[10px] font-black px-2.5 py-1 rounded-sm uppercase tracking-wider">Maha Bachat Offer</span>
                <h3 className="text-xl sm:text-3xl font-black mt-3">GIDC Wholesale Monsoon Bazaar!</h3>
                <p className="text-xs sm:text-sm text-sky-100 mt-1.5 max-w-lg font-semibold">Direct wholesellers thi sanand gidc depots na bhav par sasto mal mangavo. 2% GIDC cargo discount active.</p>
              </div>

              {/* Mobile Filter Button */}
              <div className="lg:hidden flex items-center justify-between p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 shadow-sm">
                <span className="text-xs font-bold text-slate-400">Total {products.length} Products Available</span>
                <button 
                  onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-500 text-white text-xs font-bold rounded-lg"
                >
                  <Icons.Filter />
                  <span>Choose Filters</span>
                </button>
              </div>

              {/* Mobile Filter Drawer */}
              {mobileFiltersOpen && (
                <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex justify-end">
                  <div className="w-80 h-full bg-white dark:bg-slate-900 p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
                        <h4 className="text-sm font-black text-slate-900 dark:text-white">Adjust Filter Panel</h4>
                        <button onClick={() => setMobileFiltersOpen(false)}><Icons.X /></button>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400">MAX PRICE: ₹{maxPrice}</label>
                        <input
                          type="range"
                          min="50"
                          max="2000"
                          step="50"
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(Number(e.target.value))}
                          className="w-full accent-sky-500 h-1.5 rounded-lg"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400">WHOLESALER</label>
                        <select
                          value={selectedWholesaler}
                          onChange={(e) => setSelectedWholesaler(e.target.value)}
                          className={`w-full text-xs font-bold p-2.5 rounded-lg border outline-none ${themeClasses.input}`}
                        >
                          {wholesalersList.map(wh => (
                            <option key={wh} value={wh}>{wh}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <button 
                      onClick={() => setMobileFiltersOpen(false)}
                      className="w-full py-2.5 bg-sky-500 text-white font-black text-xs rounded-xl"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              )}

              {/* Flipkart Style Product Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products
                  .filter(p => selectedCategory === 'All' || p.category === selectedCategory)
                  .filter(p => p.price <= maxPrice)
                  .filter(p => selectedWholesaler === 'All' || p.wholesaler === selectedWholesaler)
                  .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.wholesaler.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map(product => {
                    const cartItem = cart.find(c => c.id === product.id);
                    const isWishlisted = wishlist.includes(product.id);
                    return (
                      <RetailerProductCard
                        key={product.id}
                        product={product}
                        cartItem={cartItem}
                        themeClasses={themeClasses}
                        isWishlisted={isWishlisted}
                        toggleWishlist={toggleWishlist}
                        setQuickViewProduct={setQuickViewProduct}
                        handleAddToCart={handleAddToCart}
                        setActivePage={setActivePage}
                      />
                    );
                  })
                }
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE SHOPPING CART */}
        {activePage === 'cart' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
            
            {/* Left Items Details List */}
            <div className="lg:col-span-2 space-y-4">
              <div className={`p-6 rounded-2xl ${themeClasses.panel} border shadow-sm`}>
                <h3 className="text-base font-black text-slate-900 dark:text-white border-b pb-4 mb-4 flex items-center justify-between">
                  <span>Mari Flipkart Cart ({cart.length} Items)</span>
                  <span className="text-xs text-sky-500 font-bold bg-sky-500/10 px-2.5 py-1 rounded-full">Secure Sanand Gateway</span>
                </h3>

                {cart.length === 0 ? (
                  <div className="text-center py-20 space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                      <Icons.Cart />
                    </div>
                    <h4 className="text-base font-black text-slate-800 dark:text-slate-200">Tamari Cart Khali Chhe!</h4>
                    <p className="text-xs text-slate-400 font-semibold">GIDC Wholesale commodities mathi bulk jatho select karo.</p>
                    <button onClick={() => setActivePage('bazaar')} className="text-xs font-black bg-sky-500 text-white py-2.5 px-5 rounded-lg hover:bg-sky-600 transition-all">
                      Go to Products Bazaar
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100 dark:divide-slate-850">
                    {cart.map(item => (
                      <div key={item.id} className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-sky-500/10 rounded-lg flex items-center justify-center text-2xl">
                            {item.img}
                          </div>
                          <div>
                            <h4 className="text-sm font-black text-slate-800 dark:text-white">{item.name}</h4>
                            <p className="text-[11px] font-bold text-slate-400">Seller: {item.wholesaler}</p>
                            <p className="text-xs font-black text-sky-500 mt-1">₹{item.price} / {item.unit}</p>
                          </div>
                        </div>

                        {/* Interactive quantities modifier controls */}
                        <div className="flex items-center justify-between sm:justify-end gap-6">
                          <div className="flex items-center bg-slate-100 dark:bg-slate-850 p-1.5 rounded-lg border dark:border-slate-800">
                            <button onClick={() => updateCartQty(item.id, item.qty - 1)} className="p-1 rounded-md text-slate-500 hover:bg-slate-200 focus:outline-none"><Icons.Minus /></button>
                            <span className="text-xs font-black px-3 text-slate-800 dark:text-white min-w-[28px] text-center">{item.qty}</span>
                            <button onClick={() => updateCartQty(item.id, item.qty + 1)} className="p-1 rounded-md text-slate-500 hover:bg-slate-200 focus:outline-none"><Icons.Plus /></button>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-black text-slate-800 dark:text-white">₹{(item.price * item.qty).toLocaleString('en-IN')}</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase">Sub Total</p>
                          </div>
                          <button onClick={() => removeCartItem(item.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-all"><Icons.Trash /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Summary column */}
            <div className="space-y-6">
              <div className={`p-6 rounded-2xl ${themeClasses.panel} border shadow-sm`}>
                <h3 className="text-sm font-black uppercase text-slate-400 mb-4 tracking-wider">PRICE DETAILS</h3>
                <div className="space-y-3.5 text-xs font-bold text-slate-600 dark:text-slate-400 border-b pb-4">
                  <div className="flex items-center justify-between">
                    <span>Price ({cart.length} Items):</span>
                    <span className="text-slate-800 dark:text-white font-extrabold">₹{cartTotalVal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex items-center justify-between text-emerald-500">
                    <span>GIDC Freight Discount:</span>
                    <span>-₹{(cartTotalVal * 0.02).toFixed(0)} (2%)</span>
                  </div>
                </div>
                <div className="flex items-center justify-between py-4 text-sm font-black text-slate-800 dark:text-white">
                  <span>Final Billable Amount:</span>
                  <span className="text-lg text-sky-500">₹{Math.round(cartTotalVal - (cartTotalVal * 0.02)).toLocaleString('en-IN')}</span>
                </div>

                {/* Delivery details notes block */}
                <div className="space-y-4 pt-2 border-t">
                  <label className="text-[10px] font-black text-slate-400 block mb-1">SPECIFY GIDC DELIVERY INSTRUCTIONS</label>
                  <textarea id="cartDeliveryNote" placeholder="Ex: Call before reaching shop, Sanand GIDC" rows="3" className={`w-full text-xs font-bold p-3 rounded-lg border outline-none ${themeClasses.input}`}></textarea>
                  <button onClick={() => handleCheckout(document.getElementById("cartDeliveryNote")?.value)} disabled={cart.length === 0} className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-black text-xs uppercase tracking-wider rounded-sm shadow-md transition-all">
                    ⚡ Place Bulk Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PLACED ORDERS & SHIPMENT LIVE STEPPER */}
        {activePage === 'orders' && (
          <div className="space-y-6 animate-fade-in">
            {trackingOrder && (
              <div className={`p-6 rounded-2xl ${themeClasses.panel} border shadow-sm`}>
                <span className="text-xs font-black text-sky-500 block uppercase tracking-widest">FLIPKART STYLE LIVE TRACKING</span>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mt-1">Order Ref: {trackingOrder.id}</h3>
                
                {/* Stepper display logic */}
                <div className="grid grid-cols-4 gap-2 relative py-4 max-w-4xl mx-auto mt-6">
                  {[
                    { step: 1, name: "Ordered", icon: "✓" },
                    { step: 2, name: "Approved", icon: "✓" },
                    { step: 3, name: "In Transit", icon: "🚚" },
                    { step: 4, name: "Delivered", icon: "🏠" }
                  ].map((st) => {
                    const activeLvl = trackingOrder.status === 'Cancelled' ? 0 : trackingOrder.status === 'Pending' ? 2 : trackingOrder.status === 'In Transit' ? 3 : 4;
                    const isActive = st.step <= activeLvl;
                    return (
                      <div key={st.step} className="text-center space-y-2">
                        <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center text-sm font-black transition-all ${
                          isActive ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25' : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                        }`}>{st.icon}</div>
                        <p className={`text-xs font-black ${isActive ? 'text-sky-500' : 'text-slate-400'}`}>{st.name}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Placed orders list table */}
            <div className={`p-6 rounded-2xl ${themeClasses.panel} border shadow-sm`}>
              <h3 className="text-base font-black text-slate-900 dark:text-white mb-4">Mara Placed Orders Ni Summary</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b text-[10px] font-black uppercase text-slate-400">
                      <th className="py-3 px-4">Order ID</th>
                      <th className="py-3 px-4">Wholesaler Name</th>
                      <th className="py-3 px-4">Order Date</th>
                      <th className="py-3 px-4">Total Amount</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-xs font-bold text-slate-700 dark:text-slate-300">
                    {orders.map(order => (
                      <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/20 transition-all">
                        <td className="py-4 px-4 font-black text-sky-600">{order.id}</td>
                        <td className="py-4 px-4 font-black text-slate-800 dark:text-white">{order.wholesaler}</td>
                        <td className="py-4 px-4 text-slate-400">{order.date}</td>
                        <td className="py-4 px-4 font-black">₹{order.total.toLocaleString('en-IN')}</td>
                        <td className="py-4 px-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${
                            order.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                            order.status === 'In Transit' ? 'bg-sky-500/10 text-sky-500 border-sky-500/20' :
                            'bg-amber-500/10 text-amber-500 border-amber-500/20'
                          }`}>{order.status}</span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button onClick={() => setTrackingOrder(order)} className="px-3 py-1.5 rounded-lg bg-sky-500/15 text-sky-500 hover:bg-sky-500 hover:text-white transition-all">
                            Track Item
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: STORE PROFILE CONFIGURATION */}
        {activePage === 'profile' && (
          <div className={`p-6 rounded-2xl ${themeClasses.panel} border shadow-sm max-w-3xl mx-auto animate-fade-in`}>
            <h3 className="text-base font-black text-slate-900 dark:text-white mb-1">Dukan Ni Master Profile</h3>
            <p className="text-xs text-slate-400 font-bold mb-6">Security and business registry details for tax invoices.</p>

            <form onSubmit={(e) => {
              e.preventDefault();
              setProfile({
                ...profile,
                storeName: e.target.storeName.value,
                ownerName: e.target.ownerName.value,
                email: e.target.email.value,
                address: e.target.address.value,
                gstin: e.target.gstin.value
              });
              showToast("Proflie data safaltapurvak update thayo!");
            }} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" name="storeName" defaultValue={profile.storeName} className={`w-full text-xs font-bold p-3 rounded-lg border outline-none ${themeClasses.input}`} />
                <input type="text" name="ownerName" defaultValue={profile.ownerName} className={`w-full text-xs font-bold p-3 rounded-lg border outline-none ${themeClasses.input}`} />
              </div>
              <textarea name="address" rows="3" defaultValue={profile.address} className={`w-full text-xs font-bold p-3 rounded-lg border outline-none ${themeClasses.input}`}></textarea>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" name="gstin" defaultValue={profile.gstin} className={`w-full text-xs font-bold p-3 rounded-lg border outline-none ${themeClasses.input}`} />
                <input type="text" disabled value={`${profile.city} GIDC Logistics Hub`} className="w-full text-xs font-bold p-3 rounded-lg border bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed" />
              </div>
              <div className="text-right pt-4 border-t">
                <button type="submit" className="px-6 py-2.5 bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold rounded-lg transition-all shadow-md">
                  Save Store Details
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 5: COMPLAINTS DESK */}
        {activePage === 'complaints' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
            <div className={`p-6 rounded-2xl ${themeClasses.panel} border shadow-sm h-fit`}>
              <h3 className="text-base font-black text-slate-900 dark:text-white mb-1">Fariyaad Desk</h3>
              <p className="text-xs text-slate-400 font-bold mb-5">Product damage or delivery routing issues can be raised below.</p>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                raiseComplaint(e.target.orderId.value, e.target.title.value, e.target.detail.value);
                e.target.reset();
              }} className="space-y-4">
                <select name="orderId" className={`w-full text-xs font-bold p-3 rounded-lg border outline-none ${themeClasses.input}`}>
                  {orders.map(o => (
                    <option key={o.id} value={o.id}>{o.id} ({o.wholesaler})</option>
                  ))}
                </select>
                <input type="text" name="title" placeholder="Ex: Bag moisture issue, weight leakage" className={`w-full text-xs font-bold p-3 rounded-lg border outline-none ${themeClasses.input}`} />
                <textarea name="detail" placeholder="Briefly explain the issue..." rows="4" className={`w-full text-xs font-bold p-3 rounded-lg border outline-none ${themeClasses.input}`}></textarea>
                <button type="submit" className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-black text-xs rounded-lg shadow-md transition-all">
                  Raise Support Ticket
                </button>
              </form>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <div className={`p-6 rounded-2xl ${themeClasses.panel} border shadow-sm`}>
                <h3 className="text-base font-black text-slate-900 dark:text-white mb-4">Mari Registered Tickets</h3>
                {complaints.length === 0 ? (
                  <p className="text-center text-xs text-slate-400">Koi fariyaad register nathi kari.</p>
                ) : (
                  <div className="space-y-4">
                    {complaints.map(t => (
                      <div key={t.id} className="p-4 rounded-xl border space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black text-red-500 bg-red-500/10 px-2 py-0.5 rounded-full">{t.id}</span>
                          <span className={`px-2 py-0.5 text-[9px] font-black uppercase ${t.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>{t.status}</span>
                        </div>
                        <h4 className="text-sm font-black text-slate-800 dark:text-white">{t.title}</h4>
                        <p className="text-xs text-slate-400">{t.detail}</p>
                        {t.reply && <div className="p-3 rounded bg-emerald-500/5 text-xs border border-emerald-500/10">Response: {t.reply}</div>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* QUICK VIEW PRODUCT DETAILED MODAL */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 border">
            <button onClick={() => setQuickViewProduct(null)} className="absolute top-4 right-4 p-2 bg-slate-100 dark:bg-slate-800 rounded-full"><Icons.X /></button>
            <div className="bg-slate-50 dark:bg-slate-950 rounded-xl h-56 flex items-center justify-center text-6xl">{quickViewProduct.img}</div>
            <div className="space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black text-sky-500 uppercase">{quickViewProduct.category}</span>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mt-1">{quickViewProduct.name}</h3>
                <p className="text-xs text-slate-400 mt-2">{quickViewProduct.description}</p>
              </div>
              <button onClick={() => { handleAddToCart(quickViewProduct, quickViewProduct.moq); setQuickViewProduct(null); }} className="w-full py-2.5 bg-yellow-400 hover:bg-yellow-500 text-sky-950 font-black text-xs uppercase tracking-wider rounded-sm shadow-md transition-all">
                Add to Flipkart Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Branding credits */}
      <footer className="py-6 mt-12 border-t text-center text-[11px] font-black text-slate-400 tracking-wider bg-white dark:bg-slate-950">
        <span>VILLGO B2B WEB MARKETPLACE BY <a href="https://shwebcreatives.com" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">SHWEBCREATIVES</a></span>
      </footer>

    </div>
  );
};


export default RetailerDashboard;