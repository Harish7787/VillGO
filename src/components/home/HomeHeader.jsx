// import React, { useState } from 'react';
// import Navbar from '../common/Navbar';
// import HomeHeader from './HomeHeader';

// export const Header = ({ text, onRedirect, resolvedTheme, onScrollToSection }) => (
//   <header className={`px-6 py-4 sticky top-0 z-40 backdrop-blur-md transition-colors ${
//     resolvedTheme === 'dark' ? 'bg-[#0b1120]/90 border-b border-slate-800' : 'bg-white/90 border-b border-slate-100'
//   }`}>
//     <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      
//       {/* Brand Logo & Tagline */}
//       <div onClick={() => onScrollToSection('hero-section')} className="flex items-center gap-3 cursor-pointer group">
//         <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 shadow-lg shadow-sky-500/20 text-white group-hover:scale-105 transition-all">
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 011-1v-4h3m4 3.05V13a1 1 0 00-.3-.7l-2.7-2.7a1 1 0 00-.7-.3H16v4.05m0 3.95h.01" />
//           </svg>
//           <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0b1120] animate-ping"></span>
//         </div>
//         <div>
//           <span className="text-xl font-black tracking-tight">{text.brand}</span>
//           <p className="text-[9px] tracking-wider font-bold text-sky-500 uppercase leading-none mt-0.5">{text.tagline}</p>
//         </div>
//       </div>

//       {/* --- SCROLLING NAVIGATION LINKS --- */}
//       <nav className="flex items-center gap-5 sm:gap-8 text-xs font-bold tracking-wide">
//         <button
//           onClick={() => onScrollToSection('hero-section')}
//           className="text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-all focus:outline-none"
//         >
//           {text.navHome}
//         </button>
//         <button
//           onClick={() => onScrollToSection('estimator-section')}
//           className="text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-all focus:outline-none"
//         >
//           {text.navEstimator}
//         </button>
//         <button
//           onClick={() => onScrollToSection('tracker-section')}
//           className="text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-all focus:outline-none"
//         >
//           {text.navTracker}
//         </button>
//         <button
//           onClick={() => onScrollToSection('roles-section')}
//           className="text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-all focus:outline-none"
//         >
//           {text.navRoles}
//         </button>
//       </nav>

//       {/* Authentication Gateway Redirect Simulators */}
//       <div className="flex items-center gap-2">
//         <button
//           onClick={() => onRedirect('/login', text.signIn)}
//           className={`px-4 py-2 text-xs font-bold rounded-xl transition-all border ${
//             resolvedTheme === 'dark' ? 'hover:bg-slate-850 border-slate-700 text-slate-100' : 'hover:bg-slate-100 border-slate-200 text-slate-700'
//           }`}
//         >
//           {text.signIn}
//         </button>
//         <button
//           onClick={() => onRedirect('/register', text.signUp)}
//           className="px-4 py-2 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all transform active:scale-95"
//         >
//           {text.signUp}
//         </button>
//       </div>

//     </div>
//   </header>
// );

// export default Header;

import React from 'react';

// ============================================================================
// NAVBAR / HEADER COMPONENT (With Navigation Scroll Links & Redirect Simulators)
// Local File Path: src/components/common/Header.jsx
// ============================================================================

export default function Header({ text, onRedirect, resolvedTheme, onScrollToSection }) {
  return (
    <header className={`px-6 py-4 sticky top-0 z-40 backdrop-blur-md transition-colors ${
      resolvedTheme === 'dark' ? 'bg-[#0b1120]/90 border-b border-slate-800' : 'bg-white/90 border-b border-slate-100'
    }`}>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Brand Logo & Tagline */}
        <div onClick={() => onScrollToSection('hero-section')} className="flex items-center gap-3 cursor-pointer group">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 shadow-lg shadow-sky-500/20 text-white group-hover:scale-105 transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 011-1v-4h3m4 3.05V13a1 1 0 00-.3-.7l-2.7-2.7a1 1 0 00-.7-.3H16v4.05m0 3.95h.01" />
            </svg>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0b1120] animate-ping"></span>
          </div>
          <div>
            <span className="text-xl font-black tracking-tight">{text.brand}</span>
            <p className="text-[9px] tracking-wider font-bold text-sky-500 uppercase leading-none mt-0.5">{text.tagline}</p>
          </div>
        </div>

        {/* --- SCROLLING NAVIGATION LINKS --- */}
        <nav className="flex items-center gap-5 sm:gap-8 text-xs font-bold tracking-wide">
          <button
            onClick={() => onScrollToSection('hero-section')}
            className="text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-all focus:outline-none"
          >
            {text.navHome}
          </button>
          <button
            onClick={() => onScrollToSection('estimator-section')}
            className="text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-all focus:outline-none"
          >
            {text.navEstimator}
          </button>
          <button
            onClick={() => onScrollToSection('tracker-section')}
            className="text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-all focus:outline-none"
          >
            {text.navTracker}
          </button>
          <button
            onClick={() => onScrollToSection('roles-section')}
            className="text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-all focus:outline-none"
          >
            {text.navRoles}
          </button>
        </nav>

        {/* Authentication Gateway Redirect Simulators */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onRedirect('/login', text.signIn)}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all border ${
              resolvedTheme === 'dark' ? 'hover:bg-slate-850 border-slate-700 text-slate-100' : 'hover:bg-slate-100 border-slate-200 text-slate-700'
            }`}
          >
            {text.signIn}
          </button>
          <button
            onClick={() => onRedirect('/register', text.signUp)}
            className="px-4 py-2 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-all transform active:scale-95"
          >
            {text.signUp}
          </button>
        </div>

      </div>
    </header>
  );
}