// import React from 'react';
// import { AdminIcons } from './AdminIcons';

// // ============================================================================
// // DYNAMIC SIDEBAR SYSTEM (Color updates instantly with Light/Dark Themes)
// // ============================================================================
// export default function AdminSidebar({
//   activeTab,
//   setActiveTab,
//   pendingWholesalers,
//   pendingOrders,
//   unresolvedComplaints,
//   settingsOpen,
//   setSettingsOpen,
//   theme,
//   setTheme,
//   themeClasses,
//   onLogout,
//   setSidebarOpen
// }) {
//   return (
//     <aside className={`
//       fixed inset-y-0 left-0 transform -translate-x-full md:translate-x-0
//       md:relative z-50 w-64 transition-all duration-300 ease-in-out
//       flex flex-col justify-between shadow-xl md:shadow-none shrink-0
//       ${themeClasses.sidebar}
//     `}>
//       <div className="flex-1 flex flex-col overflow-y-auto">
//         {/* Brand Header */}
//         <div className={`p-6 border-b ${themeClasses.border} flex items-center justify-between shrink-0`}>
//           <div className="flex items-center gap-3">
//             <div className="w-9 h-9 rounded-lg bg-sky-400 flex items-center justify-center font-black text-slate-950 shadow-md">
//               VL
//             </div>
//             <div>
//               <span className="text-xl font-black tracking-wide text-sky-500 block font-mono">Villgo</span>
//               <span className="text-[9px] text-slate-400 tracking-widest block uppercase font-black">SHWebCreatives</span>
//             </div>
//           </div>
//           <button onClick={() => setSidebarOpen(false)} className="md:hidden p-1 text-slate-400 hover:text-sky-500">
//             <AdminIcons.X />
//           </button>
//         </div>

//         {/* Navigation Tabs */}
//         <nav className="p-4 space-y-1">
//           <button 
//             onClick={() => { setActiveTab('overview'); setSidebarOpen(false); }} 
//             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${activeTab === 'overview' ? themeClasses.sidebarActive : `${themeClasses.sidebarHover} text-slate-400`}`}
//           >
//             <AdminIcons.Overview />
//             <span>Overview Summary</span>
//           </button>

//           <button 
//             onClick={() => { setActiveTab('users'); setSidebarOpen(false); }} 
//             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${activeTab === 'users' ? themeClasses.sidebarActive : `${themeClasses.sidebarHover} text-slate-400`}`}
//           >
//             <AdminIcons.Users />
//             <span className="flex-1 text-left font-bold">Manage Users</span>
//             {pendingWholesalers > 0 && (
//               <span className="bg-amber-400 text-slate-950 text-[10px] px-2 py-0.5 rounded-full font-black animate-pulse">{pendingWholesalers}</span>
//             )}
//           </button>

//           <button 
//             onClick={() => { setActiveTab('products'); setSidebarOpen(false); }} 
//             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${activeTab === 'products' ? themeClasses.sidebarActive : `${themeClasses.sidebarHover} text-slate-400`}`}
//           >
//             <AdminIcons.Products />
//             <span>Master Products</span>
//           </button>

//           <button 
//             onClick={() => { setActiveTab('orders'); setSidebarOpen(false); }} 
//             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${activeTab === 'orders' ? themeClasses.sidebarActive : `${themeClasses.sidebarHover} text-slate-400`}`}
//           >
//             <AdminIcons.Orders />
//             <span className="flex-1 text-left font-bold">Orders Hub</span>
//             {pendingOrders > 0 && (
//               <span className="bg-sky-400 text-slate-950 text-[10px] px-1.5 py-0.5 rounded-full font-black">{pendingOrders}</span>
//             )}
//           </button>

//           <button 
//             onClick={() => { setActiveTab('broadcasts'); setSidebarOpen(false); }} 
//             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${activeTab === 'broadcasts' ? themeClasses.sidebarActive : `${themeClasses.sidebarHover} text-slate-400`}`}
//           >
//             <AdminIcons.Alerts />
//             <span>Broadcast Alerts</span>
//           </button>

//           <button 
//             onClick={() => { setActiveTab('complaints'); setSidebarOpen(false); }} 
//             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${activeTab === 'complaints' ? themeClasses.sidebarActive : `${themeClasses.sidebarHover} text-slate-400`}`}
//           >
//             <AdminIcons.Complaints />
//             <span className="flex-1 text-left font-bold">Complaints Desk</span>
//             {unresolvedComplaints > 0 && (
//               <span className="bg-rose-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-black">{unresolvedComplaints}</span>
//             )}
//           </button>

//           <button 
//             onClick={() => { setActiveTab('profile'); setSidebarOpen(false); }} 
//             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${activeTab === 'profile' ? themeClasses.sidebarActive : `${themeClasses.sidebarHover} text-slate-400`}`}
//           >
//             <AdminIcons.Profile />
//             <span>Admin Profile</span>
//           </button>
//         </nav>
//       </div>

//       {/* ============================================================================
//          BOTTOM-LEFT SETTINGS TRIGGER AND PREFERENCES DOCK
//          ============================================================================ */}
//       <div className={`p-4 border-t ${themeClasses.border} bg-slate-100/30 dark:bg-slate-950/40 space-y-3`}>
        
//         {/* Toggle Preferences Button */}
//         <button 
//           onClick={() => setSettingsOpen(!settingsOpen)}
//           className="w-full flex items-center justify-between p-3 rounded-xl bg-sky-500 text-slate-950 font-black hover:bg-sky-400 shadow-md transition-all text-xs"
//         >
//           <div className="flex items-center gap-2.5">
//             <AdminIcons.Settings />
//             <span>Preferences Menu</span>
//           </div>
//           {settingsOpen ? <AdminIcons.ChevronDown /> : <AdminIcons.ChevronUp />}
//         </button>

//         {/* Collapsible Panel */}
//         {settingsOpen && (
//           <div className="pt-3 border-t border-sky-200/50 dark:border-slate-800 space-y-4 animate-fade-in">
//             {/* Theme Selectors with Icons */}
//             <div>
//               <p className={`text-[10px] uppercase font-black tracking-wider ${themeClasses.textMuted} mb-2 text-center`}>Theme Interface</p>
//               <div className="bg-white/70 dark:bg-slate-800 border border-sky-100 dark:border-slate-700 rounded-xl p-1 grid grid-cols-3 gap-1">
//                 <button 
//                   onClick={() => setTheme('light')}
//                   className={`flex flex-col items-center justify-center py-2 px-0.5 rounded-lg transition-all ${theme === 'light' ? 'bg-sky-500 text-slate-950' : 'text-slate-400 hover:text-sky-500'}`}
//                   title="Light Mode"
//                 >
//                   <AdminIcons.Sun />
//                   <span className="text-[8px] mt-1 font-black">Light</span>
//                 </button>
//                 <button 
//                   onClick={() => setTheme('dark')}
//                   className={`flex flex-col items-center justify-center py-2 px-0.5 rounded-lg transition-all ${theme === 'dark' ? 'bg-sky-500 text-slate-950' : 'text-slate-400 hover:text-sky-500'}`}
//                   title="Dark Mode"
//                 >
//                   <AdminIcons.Moon />
//                   <span className="text-[8px] mt-1 font-black">Dark</span>
//                 </button>
//                 <button 
//                   onClick={() => setTheme('system')}
//                   className={`flex flex-col items-center justify-center py-2 px-0.5 rounded-lg transition-all ${theme === 'system' ? 'bg-sky-500 text-slate-950' : 'text-slate-400 hover:text-sky-500'}`}
//                   title="System Default"
//                 >
//                   <AdminIcons.System />
//                   <span className="text-[8px] mt-1 font-black">System</span>
//                 </button>
//               </div>
//             </div>

//             {/* Actions list */}
//             <div className="space-y-1">
//               <button 
//                 onClick={() => { setActiveTab('settings'); setSidebarOpen(true); }}
//                 className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'settings' ? 'bg-sky-500/20 text-sky-500 font-black' : 'text-slate-500 hover:bg-sky-500/10 hover:text-sky-500'}`}
//               >
//                 <AdminIcons.Settings />
//                 <span>Configure Platform</span>
//               </button>

//               <button 
//                 onClick={onLogout}
//                 className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-rose-500 hover:bg-rose-500/10 transition-all"
//               >
//                 <AdminIcons.Logout />
//                 <span>Exit & Logout</span>
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </aside>
//   );
// }

import React from 'react';
import AdminIcons from './AdminIcons';


// ============================================================================
// PREMIUM MOBILE-FIRST & TOUCH-FRIENDLY SIDEBAR SYSTEM
// ============================================================================
export default function AdminSidebar({
  activeTab,
  setActiveTab,
  pendingWholesalers,
  pendingOrders,
  unresolvedComplaints,
  settingsOpen,
  setSettingsOpen,
  theme,
  setTheme,
  themeClasses,
  onLogout,
  sidebarOpen,
  setSidebarOpen
}) {
  return (
    <>
      {/* 1. MAIN ASIDE CONTAINER (Supports slide-out draw on mobile with full viewport coverage) */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 md:w-64 transition-all duration-300 ease-in-out transform
        ${sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
        md:translate-x-0 md:relative md:z-10 flex flex-col justify-between shrink-0 h-full
        ${themeClasses.sidebar}
      `}>
        
        {/* UPPER WRAPPER (Brand & Navigation) */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          
          {/* Brand Header with mobile close action */}
          <div className={`p-5 md:p-6 border-b ${themeClasses.border} flex items-center justify-between shrink-0`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-400 flex items-center justify-center font-black text-slate-950 shadow-md">
                VL
              </div>
              <div>
                <span className="text-lg md:text-xl font-black tracking-wide text-sky-500 block font-mono">Villgo</span>
                <span className="text-[9px] text-slate-400 tracking-widest block uppercase font-black">SHWebCreatives</span>
              </div>
            </div>
            
            {/* Elegant Close Button visible ONLY on mobile for quick dismiss */}
            <button 
              onClick={() => setSidebarOpen(false)} 
              className="md:hidden p-2 rounded-xl bg-sky-500/10 dark:bg-slate-800 text-sky-600 dark:text-sky-400 hover:scale-95 active:scale-90 transition-all focus:outline-none"
              aria-label="Close Sidebar"
            >
              <AdminIcons.X />
            </button>
          </div>

          {/* Navigation Tabs (Enhanced padding and touch target sizes for touch screens) */}
          <nav className="p-4 space-y-1.5 flex-1">
            
            {/* Overview Summary Link */}
            <button 
              onClick={() => { setActiveTab('overview'); setSidebarOpen(false); }} 
              className={`w-full min-h-[46px] flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-bold transition-all transform active:scale-[0.98] ${activeTab === 'overview' ? themeClasses.sidebarActive : `${themeClasses.sidebarHover} text-slate-400`}`}
            >
              <div className="shrink-0"><AdminIcons.Overview /></div>
              <span className="tracking-wide">Overview Summary</span>
            </button>

            {/* Manage Users Link */}
            <button 
              onClick={() => { setActiveTab('users'); setSidebarOpen(false); }} 
              className={`w-full min-h-[46px] flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-bold transition-all transform active:scale-[0.98] ${activeTab === 'users' ? themeClasses.sidebarActive : `${themeClasses.sidebarHover} text-slate-400`}`}
            >
              <div className="shrink-0"><AdminIcons.Users /></div>
              <span className="flex-1 text-left font-bold tracking-wide">Manage Users</span>
              {pendingWholesalers > 0 && (
                <span className="bg-amber-400 text-slate-950 text-[10px] px-2.5 py-0.5 rounded-full font-black animate-pulse shadow-sm">
                  {pendingWholesalers}
                </span>
              )}
            </button>

            {/* Master Products Link */}
            <button 
              onClick={() => { setActiveTab('products'); setSidebarOpen(false); }} 
              className={`w-full min-h-[46px] flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-bold transition-all transform active:scale-[0.98] ${activeTab === 'products' ? themeClasses.sidebarActive : `${themeClasses.sidebarHover} text-slate-400`}`}
            >
              <div className="shrink-0"><AdminIcons.Products /></div>
              <span className="tracking-wide">Master Products</span>
            </button>

            {/* Orders Hub Link */}
            <button 
              onClick={() => { setActiveTab('orders'); setSidebarOpen(false); }} 
              className={`w-full min-h-[46px] flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-bold transition-all transform active:scale-[0.98] ${activeTab === 'orders' ? themeClasses.sidebarActive : `${themeClasses.sidebarHover} text-slate-400`}`}
            >
              <div className="shrink-0"><AdminIcons.Orders /></div>
              <span className="flex-1 text-left font-bold tracking-wide">Orders Hub</span>
              {pendingOrders > 0 && (
                <span className="bg-sky-400 text-slate-950 text-[10px] px-2 py-0.5 rounded-full font-black shadow-sm">
                  {pendingOrders}
                </span>
              )}
            </button>

            {/* Broadcast Alerts Link */}
            <button 
              onClick={() => { setActiveTab('broadcasts'); setSidebarOpen(false); }} 
              className={`w-full min-h-[46px] flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-bold transition-all transform active:scale-[0.98] ${activeTab === 'broadcasts' ? themeClasses.sidebarActive : `${themeClasses.sidebarHover} text-slate-400`}`}
            >
              <div className="shrink-0"><AdminIcons.Alerts /></div>
              <span className="tracking-wide">Broadcast Alerts</span>
            </button>

            {/* Complaints Desk Link */}
            <button 
              onClick={() => { setActiveTab('complaints'); setSidebarOpen(false); }} 
              className={`w-full min-h-[46px] flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-bold transition-all transform active:scale-[0.98] ${activeTab === 'complaints' ? themeClasses.sidebarActive : `${themeClasses.sidebarHover} text-slate-400`}`}
            >
              <div className="shrink-0"><AdminIcons.Complaints /></div>
              <span className="flex-1 text-left font-bold tracking-wide">Complaints Desk</span>
              {unresolvedComplaints > 0 && (
                <span className="bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full font-black shadow-sm">
                  {unresolvedComplaints}
                </span>
              )}
            </button>

            {/* Admin Profile Link */}
            <button 
              onClick={() => { setActiveTab('profile'); setSidebarOpen(false); }} 
              className={`w-full min-h-[46px] flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-bold transition-all transform active:scale-[0.98] ${activeTab === 'profile' ? themeClasses.sidebarActive : `${themeClasses.sidebarHover} text-slate-400`}`}
            >
              <div className="shrink-0"><AdminIcons.Profile /></div>
              <span className="tracking-wide">Admin Profile</span>
            </button>
          </nav>
        </div>

        {/* 2. LOWER PREFERENCES & TOOLS DOCK (Includes collapsible panel + theme modes + logout) */}
        <div className={`p-4 border-t ${themeClasses.border} bg-slate-100/40 dark:bg-slate-950/50 space-y-3 shrink-0`}>
          
          {/* Preferences Toggle Gear Button (Minimum touch height of 48px on mobile) */}
          <button 
            onClick={() => setSettingsOpen(!settingsOpen)}
            className="w-full min-h-[48px] flex items-center justify-between p-3.5 rounded-xl bg-sky-500 text-slate-950 font-black hover:bg-sky-400 hover:shadow-lg transition-all text-xs focus:outline-none shadow-md"
            aria-expanded={settingsOpen}
          >
            <div className="flex items-center gap-2.5">
              <AdminIcons.Settings />
              <span className="tracking-wide font-black">Preferences Menu</span>
            </div>
            <div className="transition-transform duration-200">
              {settingsOpen ? <AdminIcons.ChevronDown /> : <AdminIcons.ChevronUp />}
            </div>
          </button>

          {/* Expanded Tools Drawer */}
          {settingsOpen && (
            <div className="pt-3 border-t border-sky-200/50 dark:border-slate-800 space-y-4 animate-fade-in">
              
              {/* Responsive Interface Themes Selector */}
              <div>
                <p className={`text-[10px] uppercase font-black tracking-wider ${themeClasses.textMuted} mb-2.5 text-center`}>Theme Interface</p>
                <div className="bg-white/90 dark:bg-slate-800 border border-sky-100 dark:border-slate-700 rounded-xl p-1.5 grid grid-cols-3 gap-1 shadow-sm">
                  
                  {/* Light Mode Selector */}
                  <button 
                    onClick={() => setTheme('light')}
                    className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-lg transition-all ${theme === 'light' ? 'bg-sky-500 text-slate-950 shadow-sm font-bold' : 'text-slate-400 hover:text-sky-500'}`}
                    title="Light Mode"
                  >
                    <AdminIcons.Sun />
                    <span className="text-[9px] mt-1 font-bold">Light</span>
                  </button>

                  {/* Dark Mode Selector */}
                  <button 
                    onClick={() => setTheme('dark')}
                    className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-lg transition-all ${theme === 'dark' ? 'bg-sky-500 text-slate-950 shadow-sm font-bold' : 'text-slate-400 hover:text-sky-500'}`}
                    title="Dark Mode"
                  >
                    <AdminIcons.Moon />
                    <span className="text-[9px] mt-1 font-bold">Dark</span>
                  </button>

                  {/* System Auto Mode Selector */}
                  <button 
                    onClick={() => setTheme('system')}
                    className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-lg transition-all ${theme === 'system' ? 'bg-sky-500 text-slate-950 shadow-sm font-bold' : 'text-slate-400 hover:text-sky-500'}`}
                    title="System Default"
                  >
                    <AdminIcons.System />
                    <span className="text-[9px] mt-1 font-bold">System</span>
                  </button>
                </div>
              </div>

              {/* Configure & Logout Action list */}
              <div className="space-y-1.5">
                <button 
                  onClick={() => { setActiveTab('settings'); setSidebarOpen(false); }}
                  className={`w-full min-h-[42px] flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'settings' ? 'bg-sky-500/20 text-sky-500 font-black' : 'text-slate-500 hover:bg-sky-500/10 hover:text-sky-500'}`}
                >
                  <AdminIcons.Settings />
                  <span>Configure Platform</span>
                </button>

                <button 
                  onClick={onLogout}
                  className="w-full min-h-[42px] flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-500 hover:bg-rose-500/10 transition-all focus:outline-none"
                >
                  <AdminIcons.Logout />
                  <span>Exit & Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* 3. MOBILE BACKDROP OVERLAY (Smoothly darkens and blurs background context when drawer is open) */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 md:hidden transition-all duration-300 ease-in-out opacity-100"
          title="Dismiss Sidebar"
        />
      )}
    </>
  );
}