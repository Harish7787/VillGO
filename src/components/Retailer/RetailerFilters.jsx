// import React from 'react';
// import { Icons } from './RetailerIcons.jsx';
   

// // ============================================================================
// // LEFT SIDEBAR FILTERS (SLIDER BG SPREADS ACCORDING TO COLOR PREFERENCES)
// // ============================================================================
// export const RetailerFilters = ({
//   themeClasses,
//   theme,
//   setTheme,
//   maxPrice,
//   setMaxPrice,
//   selectedWholesaler,
//   setSelectedWholesaler,
//   wholesalersList,
//   profile,
//   setSelectedCategory,
//   showToast
// }) => {
//   return (
//     <aside className={`lg:w-72 rounded-2xl p-6 h-fit shrink-0 shadow-sm ${themeClasses.sidebar} hidden lg:block transition-all duration-350`}>
//       <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 mb-5">
//         <h3 className="text-sm font-black uppercase text-slate-800 dark:text-white flex items-center gap-2">
//           <Icons.Filter />
//           <span>Filters Panel</span>
//         </h3>
//         <button 
//           onClick={() => { setSelectedCategory('All'); setMaxPrice(2000); setSelectedWholesaler('All'); }}
//           className="text-[10px] text-sky-500 hover:underline font-extrabold"
//         >
//           CLEAR ALL
//         </button>
//       </div>

//       {/* Price Slider */}
//       <div className="space-y-3 mb-6">
//         <label className="text-xs font-black text-slate-500 dark:text-slate-400 block">MAX PRICE BUDGET</label>
//         <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-300">
//           <span>₹0</span>
//           <span className="text-sky-500 font-extrabold">₹{maxPrice}</span>
//           <span>₹2,000</span>
//         </div>
//         <input
//           type="range"
//           min="50"
//           max="2000"
//           step="50"
//           value={maxPrice}
//           onChange={(e) => setMaxPrice(Number(e.target.value))}
//           className="w-full accent-sky-500 bg-slate-200 dark:bg-slate-800 h-1.5 rounded-lg cursor-pointer"
//         />
//       </div>

//       {/* Wholesaler Dropdown */}
//       <div className="space-y-3 mb-6">
//         <label className="text-xs font-black text-slate-500 dark:text-slate-400 block">CHOOSE WHOLESALER</label>
//         <select
//           value={selectedWholesaler}
//           onChange={(e) => setSelectedWholesaler(e.target.value)}
//           className={`w-full text-xs font-bold p-2.5 rounded-lg border outline-none ${themeClasses.input}`}
//         >
//           {wholesalersList.map(wh => (
//             <option key={wh} value={wh}>{wh}</option>
//           ))}
//         </select>
//       </div>

//       {/* Preferences Dock (Theme Switching Widget) */}
//       <div className="border-t border-slate-200 dark:border-slate-800 pt-5 mt-5 space-y-4">
//         <div>
//           <h4 className="text-xs font-black text-slate-500 dark:text-slate-400 mb-2 uppercase">Preferences Menu</h4>
//           <div className="grid grid-cols-3 gap-1 bg-white dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-850">
//             <button
//               onClick={() => setTheme('light')}
//               className={`py-2 rounded-lg flex justify-center text-xs transition-all ${theme === 'light' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400'}`}
//               title="Light Mode"
//             >
//               <Icons.Sun />
//             </button>
//             <button
//               onClick={() => setTheme('dark')}
//               className={`py-2 rounded-lg flex justify-center text-xs transition-all ${theme === 'dark' ? 'bg-slate-800 text-indigo-400 shadow-md' : 'text-slate-400'}`}
//               title="Dark Mode"
//             >
//               <Icons.Moon />
//             </button>
//             <button
//               onClick={() => setTheme('system')}
//               className={`py-2 rounded-lg flex justify-center text-xs transition-all ${theme === 'system' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400'}`}
//               title="System Theme"
//             >
//               <Icons.System />
//             </button>
//           </div>
//         </div>

//         {/* Secure Wallet & Exit Widget */}
//         <div className="pt-2">
//           <div className="p-3 bg-white/40 dark:bg-slate-950/40 rounded-xl border border-slate-200 dark:border-slate-850 flex items-center justify-between">
//             <div>
//               <p className="text-[10px] text-slate-400 font-bold">Harish Store Wallet</p>
//               <p className="text-xs font-black text-emerald-500">₹{profile.walletBalance.toLocaleString('en-IN')}</p>
//             </div>
//             <button 
//               onClick={() => showToast("Portal mathi safety log-out thai rahya chho...")}
//               className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all"
//               title="Exit & Logout"
//             >
//               <Icons.X />
//             </button>
//           </div>
//         </div>
//       </div>
//     </aside>
//   );
// };
import React from 'react';
import { Icons } from './RetailerIcons.jsx';

export const RetailerFilters = ({
  themeClasses,
  theme,
  setTheme,
  maxPrice,
  setMaxPrice,
  selectedWholesaler,
  setSelectedWholesaler,
  wholesalersList = [],
  profile,
  setSelectedCategory,
  showToast
}) => {
  return (
    <aside className={`lg:w-72 rounded-2xl p-6 h-fit shrink-0 shadow-sm ${themeClasses.sidebar} hidden lg:block transition-all duration-350`}>
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 mb-5">
        <h3 className="text-sm font-black uppercase text-slate-800 dark:text-white flex items-center gap-2">
          <Icons.Filter />
          <span>Filters Panel</span>
        </h3>
        <button 
          onClick={() => { setSelectedCategory('All'); setMaxPrice(2000); setSelectedWholesaler('All'); }}
          className="text-[10px] text-sky-500 hover:underline font-extrabold"
        >
          CLEAR ALL
        </button>
      </div>

      {/* Price Slider */}
      <div className="space-y-3 mb-6">
        <label className="text-xs font-black text-slate-500 dark:text-slate-400 block">MAX PRICE BUDGET</label>
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-300">
          <span>₹0</span>
          <span className="text-sky-500 font-extrabold">₹{maxPrice}</span>
          <span>₹2,000</span>
        </div>
        <input
          type="range"
          min="50"
          max="2000"
          step="50"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-sky-500 bg-slate-200 dark:bg-slate-850 h-1.5 rounded-lg cursor-pointer"
        />
      </div>

      {/* Wholesaler Dropdown */}
      <div className="space-y-3 mb-6">
        <label className="text-xs font-black text-slate-500 dark:text-slate-400 block">CHOOSE WHOLESALER</label>
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

      {/* Preferences Dock (Theme Switching Widget) */}
      <div className="border-t border-slate-200 dark:border-slate-800 pt-5 mt-5 space-y-4">
        <div>
          <h4 className="text-xs font-black text-slate-500 dark:text-slate-400 mb-2 uppercase">Preferences Menu</h4>
          <div className="grid grid-cols-3 gap-1 bg-white dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-850">
            <button
              onClick={() => setTheme('light')}
              className={`py-2 rounded-lg flex justify-center text-xs transition-all ${theme === 'light' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400'}`}
              title="Light Mode"
            >
              <Icons.Sun />
            </button>
            <button
              onClick={() => setTheme('dark')}
              className={`py-2 rounded-lg flex justify-center text-xs transition-all ${theme === 'dark' ? 'bg-slate-800 text-indigo-400 shadow-md' : 'text-slate-400'}`}
              title="Dark Mode"
            >
              <Icons.Moon />
            </button>
            <button
              onClick={() => setTheme('system')}
              className={`py-2 rounded-lg flex justify-center text-xs transition-all ${theme === 'system' ? 'bg-sky-500 text-white shadow-md' : 'text-slate-400'}`}
              title="System Theme"
            >
              <Icons.System />
            </button>
          </div>
        </div>

        {/* Secure Wallet & Exit Widget */}
        <div className="pt-2">
          <div className="p-3 bg-white/40 dark:bg-slate-950/40 rounded-xl border border-slate-200 dark:border-slate-850 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-slate-400 font-bold">Harish Store Wallet</p>
              <p className="text-xs font-black text-emerald-500">₹{profile?.walletBalance?.toLocaleString('en-IN') || 0}</p>
            </div>
            <button 
              onClick={() => showToast("Portal mathi safety log-out thai rahya chho...")}
              className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all"
              title="Exit & Logout"
            >
              <Icons.X />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};