// import React from 'react';
// import { Icons } from './RetailerIcons';
// import { RetailerFilters } from './RetailerFilters';
// // ============================================================================
// // FLIPKART STYLE TOP HEADER NAV BAR & CATEGORY BAR
// // ============================================================================
// export const RetailerNavbar = ({
//   themeClasses,
//   profile,
//   cartLength,
//   searchQuery,
//   setSearchQuery,
//   selectedCategory,
//   setSelectedCategory,
//   setActivePage,
//   mobileMenuOpen,
//   setMobileMenuOpen,
//   showToast
// }) => {
//   return (
//     <header className={`sticky top-0 z-40 ${themeClasses.header}`}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16 gap-4">
          
//           {/* Logo and Brand */}
//           <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setActivePage('bazaar'); setMobileMenuOpen(false); }}>
//             <div className="bg-white text-sky-600 p-2 rounded-xl shadow-inner font-black text-lg tracking-wider flex items-center gap-1.5">
//               <Icons.Truck />
//               <span>Villgo</span>
//             </div>
//             <span className="hidden sm:inline-block text-[10px] bg-yellow-400 text-sky-950 font-black px-2 py-0.5 rounded-sm uppercase italic tracking-widest shadow-xs">B2B Plus</span>
//           </div>

//           {/* Flipkart Interactive Main Search Bar */}
//           <div className="flex-1 max-w-xl hidden md:block">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Anya Grains, Flour ke GIDC Wholesalers search karo..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full text-xs font-bold text-slate-800 bg-white placeholder-slate-400 pl-4 pr-12 py-2.5 rounded-sm border-none shadow-xs focus:outline-none focus:ring-2 focus:ring-yellow-400"
//               />
//               <button className="absolute right-0 top-0 bottom-0 px-4 bg-yellow-400 hover:bg-yellow-500 text-sky-950 rounded-r-sm transition-all focus:outline-none flex items-center justify-center">
//                 <Icons.Search />
//               </button>
//             </div>
//           </div>

//           {/* Action Tools */}
//           <div className="flex items-center gap-6 text-xs font-bold">
            
//             {/* Dynamic User Profile Indicator */}
//             <div className="relative group cursor-pointer hidden sm:flex items-center gap-1.5 py-2">
//               <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-black">
//                 {profile.ownerName.charAt(0)}
//               </div>
//               <div className="text-left">
//                 <p className="text-[10px] opacity-80 font-semibold">Namaste,</p>
//                 <p className="font-bold tracking-tight text-white">{profile.ownerName.split(" ")[0]}</p>
//               </div>
//               <Icons.ArrowDown />

//               {/* Dropdown Menu */}
//               <div className="absolute right-0 top-full pt-2 w-48 hidden group-hover:block z-50">
//                 <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-lg shadow-xl py-2 text-slate-800 dark:text-slate-100">
//                   <button onClick={() => setActivePage('profile')} className="w-full text-left px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold">🏪 Store Profile</button>
//                   <button onClick={() => setActivePage('complaints')} className="w-full text-left px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold">🚨 Complaints Desk</button>
//                   <div className="border-t border-slate-100 dark:border-slate-850 my-1"></div>
//                   <button onClick={() => { setActivePage('bazaar'); showToast("Portal reset thayu!"); }} className="w-full text-left px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-red-500">Reset Portal</button>
//                 </div>
//               </div>
//             </div>

//             {/* Placed Orders Tracker Link */}
//             <button 
//               onClick={() => setActivePage('orders')}
//               className="py-2 px-3 rounded-lg flex items-center gap-2 hover:bg-white/5 text-slate-100 transition-all"
//             >
//               <Icons.Box />
//               <span>My Orders</span>
//             </button>

//             {/* Flipkart Premium Cart Action */}
//             <button
//               onClick={() => setActivePage('cart')}
//               className="relative py-2.5 px-4 bg-yellow-400 hover:bg-yellow-500 text-sky-950 font-black rounded-sm shadow-xs transition-all flex items-center gap-2 focus:outline-none"
//             >
//               <Icons.Cart />
//               <span className="hidden sm:inline">Cart</span>
//               {cartLength > 0 && (
//                 <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center animate-bounce-short shadow-md">
//                   {cartLength}
//                 </span>
//               )}
//             </button>

//             {/* Hamburger Mobile Menu Trigger */}
//             <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white p-1">
//               {mobileMenuOpen ? <Icons.X /> : <Icons.Menu />}
//             </button>

//           </div>
//         </div>
//       </div>

//       {/* Mobile Sidebar Dropdown */}
//       {mobileMenuOpen && (
//         <div className="md:hidden border-t border-white/10 bg-sky-700 dark:bg-slate-950 p-4 space-y-3.5 text-xs font-bold animate-fade-in">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Product, wholesalers search karo..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full text-xs font-bold text-slate-800 bg-white placeholder-slate-400 pl-4 pr-10 py-2.5 rounded-sm border-none shadow-inner"
//             />
//             <span className="absolute right-3 top-2.5 text-slate-400"><Icons.Search /></span>
//           </div>

//           <div className="grid grid-cols-2 gap-2">
//             <button onClick={() => { setActivePage('bazaar'); setMobileMenuOpen(false); }} className="p-3 bg-sky-800/50 rounded-xl text-center text-white font-black">🛍️ Shop Bazaar</button>
//             <button onClick={() => { setActivePage('orders'); setMobileMenuOpen(false); }} className="p-3 bg-sky-800/50 rounded-xl text-center text-white font-black">📦 My Orders</button>
//             <button onClick={() => { setActivePage('profile'); setMobileMenuOpen(false); }} className="p-3 bg-sky-800/50 rounded-xl text-center text-white font-black">🏪 Store Profile</button>
//             <button onClick={() => { setActivePage('complaints'); setMobileMenuOpen(false); }} className="p-3 bg-sky-800/50 rounded-xl text-center text-white font-black">🚨 Help Support</button>
//           </div>
//         </div>
//       )}

//       {/* Sub-Header Category Row Slider */}
//       <div className={`py-3.5 transition-colors duration-300 ${themeClasses.subBar} overflow-x-auto`}>
//         <div className="max-w-7xl mx-auto px-4 flex items-center justify-between sm:justify-center gap-6 sm:gap-16 whitespace-nowrap scrollbar-none">
//           {[
//             { id: 'All', name: 'All Categories', emoji: '🏬' },
//             { id: 'Anaj (Grains)', name: 'Anaj (Grains)', emoji: '🌾' },
//             { id: 'Teel (Oil)', name: 'Teel (Oil)', emoji: '🛢️' },
//             { id: 'Lot (Flour)', name: 'Lot (Flour)', emoji: '🍞' },
//             { id: 'Masala', name: 'Masala Spices', emoji: '🌶️' }
//           ].map(cat => (
//             <button
//               key={cat.id}
//               onClick={() => { setSelectedCategory(cat.id); setActivePage('bazaar'); }}
//               className="flex flex-col items-center gap-1 group focus:outline-none transition-all"
//             >
//               <span className="text-xl sm:text-2xl group-hover:scale-110 transition-transform duration-200">{cat.emoji}</span>
//               <span className={`text-[11px] font-extrabold ${
//                 selectedCategory === cat.id ? 'text-sky-500 underline decoration-2' : 'text-slate-600 dark:text-slate-300 group-hover:text-sky-500'
//               }`}>{cat.name}</span>
//             </button>
//           ))}
//         </div>
//       </div>
//     </header>
//   );
// };

export const RetailerNavbar = ({
  themeClasses,
  profile,
  cartLength,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  setActivePage,
  mobileMenuOpen,
  setMobileMenuOpen,
  showToast
}) => {
  const navigate = useNavigate();
  return (
    <header className={`sticky top-0 z-40 ${themeClasses.header}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo and Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setActivePage('bazaar'); setMobileMenuOpen(false); }}>
            <div className="bg-white text-sky-600 p-2 rounded-xl shadow-inner font-black text-lg tracking-wider flex items-center gap-1.5">
              <Icons.Truck />
              <span>Villgo</span>
            </div>
            <span className="hidden sm:inline-block text-[10px] bg-yellow-400 text-sky-950 font-black px-2 py-0.5 rounded-sm uppercase italic tracking-widest shadow-xs">B2B Plus</span>
          </div>

          {/* Flipkart Interactive Main Search Bar */}
          <div className="flex-1 max-w-xl hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Anya Grains, Flour ke GIDC Wholesalers search karo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs font-bold text-slate-800 bg-white placeholder-slate-400 pl-4 pr-12 py-2.5 rounded-sm border-none shadow-xs focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button className="absolute right-0 top-0 bottom-0 px-4 bg-yellow-400 hover:bg-yellow-500 text-sky-950 rounded-r-sm transition-all focus:outline-none flex items-center justify-center">
                <Icons.Search />
              </button>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-6 text-xs font-bold">
            
            {/* Dynamic User Profile Indicator */}
            <div className="relative group cursor-pointer hidden sm:flex items-center gap-1.5 py-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-black">
                {profile?.ownerName?.charAt(0) || 'H'}
              </div>
              <div className="text-left">
                <p className="text-[10px] opacity-80 font-semibold">Namaste,</p>
                <p className="font-bold tracking-tight text-white">{profile?.ownerName?.split(" ")[0] || "Harish"}</p>
              </div>
              <Icons.ArrowDown />

              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full pt-2 w-48 hidden group-hover:block z-50">
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-lg shadow-xl py-2 text-slate-800 dark:text-slate-100">
                  <button onClick={() => setActivePage('profile')} className="w-full text-left px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold">🏪 Store Profile</button>
                  <button onClick={() => setActivePage('complaints')} className="w-full text-left px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold">🚨 Complaints Desk</button>
                  <div className="border-t border-slate-100 dark:border-slate-850 my-1"></div>
                  <button onClick={() => navigate('/login')} className="w-full text-left px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-red-500">Reset Portal</button>
                </div>
              </div>
            </div>

            {/* Placed Orders Tracker Link */}
            <button 
              onClick={() => setActivePage('orders')}
              className="py-2 px-3 rounded-lg flex items-center gap-2 hover:bg-white/5 text-slate-100 transition-all"
            >
              <Icons.Box />
              <span>My Orders</span>
            </button>

            {/* Flipkart Premium Cart Action */}
            <button
              onClick={() => setActivePage('cart')}
              className="relative py-2.5 px-4 bg-yellow-400 hover:bg-yellow-500 text-sky-950 font-black rounded-sm shadow-xs transition-all flex items-center gap-2 focus:outline-none"
            >
              <Icons.Cart />
              <span className="hidden sm:inline">Cart</span>
              {cartLength > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center animate-bounce-short shadow-md">
                  {cartLength}
                </span>
              )}
            </button>

            {/* Hamburger Mobile Menu Trigger */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white p-1">
              {mobileMenuOpen ? <Icons.X /> : <Icons.Menu />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Sidebar Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-sky-700 dark:bg-slate-950 p-4 space-y-3.5 text-xs font-bold animate-fade-in">
          <div className="relative">
            <input
              type="text"
              placeholder="Product, wholesalers search karo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs font-bold text-slate-800 bg-white placeholder-slate-400 pl-4 pr-10 py-2.5 rounded-sm border-none shadow-inner"
            />
            <span className="absolute right-3 top-2.5 text-slate-400"><Icons.Search /></span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => { setActivePage('bazaar'); setMobileMenuOpen(false); }} className="p-3 bg-sky-800/50 rounded-xl text-center text-white font-black">🛍️ Shop Bazaar</button>
            <button onClick={() => { setActivePage('orders'); setMobileMenuOpen(false); }} className="p-3 bg-sky-800/50 rounded-xl text-center text-white font-black">📦 My Orders</button>
            <button onClick={() => { setActivePage('profile'); setMobileMenuOpen(false); }} className="p-3 bg-sky-800/50 rounded-xl text-center text-white font-black">🏪 Store Profile</button>
            <button onClick={() => { setActivePage('complaints'); setMobileMenuOpen(false); }} className="p-3 bg-sky-800/50 rounded-xl text-center text-white font-black">🚨 Help Support</button>
          </div>
        </div>
      )}

      {/* Sub-Header Category Row Slider */}
      <div className={`py-3.5 transition-colors duration-300 ${themeClasses.subBar} overflow-x-auto`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between sm:justify-center gap-6 sm:gap-16 whitespace-nowrap scrollbar-none">
          {[
            { id: 'All', name: 'All Categories', emoji: '🏬' },
            { id: 'Anaj (Grains)', name: 'Anaj (Grains)', emoji: '🌾' },
            { id: 'Teel (Oil)', name: 'Teel (Oil)', emoji: '🛢️' },
            { id: 'Lot (Flour)', name: 'Lot (Flour)', emoji: '🍞' },
            { id: 'Masala', name: 'Masala Spices', emoji: '🌶️' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => { setSelectedCategory(cat.id); setActivePage('bazaar'); }}
              className="flex flex-col items-center gap-1 group focus:outline-none transition-all"
            >
              <span className="text-xl sm:text-2xl group-hover:scale-110 transition-transform duration-200">{cat.emoji}</span>
              <span className={`text-[11px] font-extrabold ${
                selectedCategory === cat.id ? 'text-sky-500 underline decoration-2' : 'text-slate-600 dark:text-slate-300 group-hover:text-sky-500'
              }`}>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
