import React, { useState } from 'react';

// ============================================================================
// 1. INLINED WHOLESALER ICONS (Prevents Import Resolution Errors)
// ============================================================================
const WholesalerIcons = {
  Overview: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
    </svg>
  ),
  Products: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  Orders: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  ),
  Transporters: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
    </svg>
  ),
  Alerts: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
    </svg>
  ),
  Complaints: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  Settings: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Logout: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
    </svg>
  ),
  ChevronDown: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  ),
  Sun: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
    </svg>
  ),
  Moon: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  ),
  System: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
};

// ============================================================================
// 2. MOBILE RESPONSIVE SIDEBAR COMPONENT (Cohesive Theme Color Switches)
// ============================================================================
export default function WholesalerSidebar({
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
  theme,
  setTheme,
  resolvedTheme,
  setIsLoggedIn,
  themeClasses
}) {
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  // Custom Navigation Menu array matching English UI
  const menuItems = [
    { id: 'overview', label: 'Dashboard Kendra', icon: WholesalerIcons.Overview },
    { id: 'products', label: 'Maze Products', icon: WholesalerIcons.Products },
    { id: 'orders', label: 'Aaleli Orders', icon: WholesalerIcons.Orders },
    { id: 'transporters', label: 'Vahatukdar Marg', icon: WholesalerIcons.Transporters },
    { id: 'broadcasts', label: 'Offers & Alerts', icon: WholesalerIcons.Alerts },
    { id: 'messages', label: 'Support Desk', icon: WholesalerIcons.Complaints }
  ];

  return (
    <>
      {/* 2.1 Side Overlay background for mobile tap outs */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm md:hidden transition-all duration-300"
        />
      )}

      {/* 2.2 Navigation Slider Shell */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 transform border-r transition-all duration-300 ease-in-out md:translate-x-0 md:static flex flex-col justify-between
        ${themeClasses.sidebar}
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        
        <div>
          {/* Brand header */}
          <div className="p-5 flex items-center justify-between border-b border-slate-500/10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-sky-500 text-slate-950 font-black rounded-xl flex items-center justify-center text-lg shadow-md">
                VL
              </div>
              <div>
                <h2 className="font-extrabold text-lg tracking-tight leading-none text-sky-600 dark:text-sky-400">Villgo</h2>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">SHWebCreatives</span>
              </div>
            </div>

            {/* Mobile close trigger */}
            <button 
              onClick={() => setSidebarOpen(false)}
              className="md:hidden p-1.5 rounded-lg hover:bg-slate-500/10 text-slate-500"
            >
              ✕
            </button>
          </div>

          {/* User Profile Card */}
          <div className="p-4 mx-3 my-4 rounded-xl flex items-center space-x-3 bg-white/30 dark:bg-slate-950/40 border border-slate-500/10">
            <div className="w-10 h-10 rounded-full bg-sky-500 text-slate-950 font-extrabold flex items-center justify-center text-sm shadow">
              HV
            </div>
            <div>
              <h4 className="font-bold text-sm">Harishbhai</h4>
              <span className="text-[11px] opacity-70">Thok Vyapari</span>
            </div>
          </div>

          {/* List links */}
          <nav className="px-3 space-y-1">
            {menuItems.map((item) => {
              const TabIcon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive 
                      ? themeClasses.sidebarActive
                      : `${themeClasses.sidebarHover} opacity-85`
                  }`}
                >
                  <TabIcon />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* 2.3 Preferences control dock inside bottom settings */}
        <div className="p-4 border-t border-slate-500/10">
          <button
            onClick={() => setPreferencesOpen(!preferencesOpen)}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-sky-500 text-white shadow-lg shadow-sky-500/25 text-sm font-bold transition-all hover:bg-sky-600"
          >
            <span className="flex items-center space-x-2">
              <WholesalerIcons.Settings />
              <span>Preferences Menu</span>
            </span>
            <WholesalerIcons.ChevronDown />
          </button>

          {preferencesOpen && (
            <div className="mt-3 p-3 space-y-3 rounded-xl bg-white/80 dark:bg-slate-950/80 border border-slate-500/10 shadow-xl">
              
              {/* Theme Interface switchers */}
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Theme Mode</span>
                <div className="grid grid-cols-3 gap-1 p-1 bg-slate-500/10 rounded-lg">
                  {[
                    { mode: 'light', label: 'Light', icon: WholesalerIcons.Sun },
                    { mode: 'dark', label: 'Dark', icon: WholesalerIcons.Moon },
                    { mode: 'system', label: 'System', icon: WholesalerIcons.System }
                  ].map((item) => {
                    const ThemeIcon = item.icon;
                    const isSelected = theme === item.mode;
                    return (
                      <button
                        key={item.mode}
                        onClick={() => setTheme(item.mode)}
                        className={`py-1.5 px-1 rounded text-[10px] font-bold flex flex-col items-center justify-center transition-all ${
                          isSelected 
                            ? 'bg-sky-500 text-white shadow' 
                            : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        <ThemeIcon />
                        <span className="mt-1">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Logout Action */}
              <button
                onClick={() => setIsLoggedIn(false)}
                className="w-full flex items-center space-x-2 text-xs font-bold text-red-500 hover:text-red-600 border-t border-slate-500/10 pt-2"
              >
                <WholesalerIcons.Logout />
                <span>Exit & Logout</span>
              </button>
            </div>
          )}
        </div>

      </aside>
    </>
  );
}