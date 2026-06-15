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
import React, { useState } from "react";

export default function Header({
  text,
  onRedirect,
  resolvedTheme,
  onScrollToSection,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-md border-b ${
        resolvedTheme === "dark"
          ? "bg-[#0b1120]/90 border-slate-800"
          : "bg-white/90 border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
        {/* Top Row */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => onScrollToSection("hero-section")}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow-lg">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 011-1v-4h3"
                />
              </svg>
            </div>

            <div>
              <h2 className="text-xl font-black">{text.brand}</h2>
              <p className="text-[10px] uppercase font-bold text-sky-500">
                {text.tagline}
              </p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-6 text-sm font-bold">
              <button onClick={() => onScrollToSection("hero-section")}>
                {text.navHome}
              </button>

              <button onClick={() => onScrollToSection("estimator-section")}>
                {text.navEstimator}
              </button>

              <button onClick={() => onScrollToSection("tracker-section")}>
                {text.navTracker}
              </button>

              <button onClick={() => onScrollToSection("roles-section")}>
                {text.navRoles}
              </button>
            </nav>

            <div className="flex gap-2">
              <button
                onClick={() => onRedirect("/login")}
                className="px-4 py-2 border rounded-xl font-bold"
              >
                {text.signIn}
              </button>

              <button
                onClick={() => onRedirect("/register")}
                className="px-4 py-2 rounded-xl text-white bg-gradient-to-r from-sky-500 to-indigo-600"
              >
                {text.signUp}
              </button>
            </div>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-3 rounded-xl bg-slate-100"
          >
            {menuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 border-t pt-4 space-y-3">
            <button
              className="block w-full text-left"
              onClick={() => {
                onScrollToSection("hero-section");
                setMenuOpen(false);
              }}
            >
              {text.navHome}
            </button>

            <button
              className="block w-full text-left"
              onClick={() => {
                onScrollToSection("estimator-section");
                setMenuOpen(false);
              }}
            >
              {text.navEstimator}
            </button>

            <button
              className="block w-full text-left"
              onClick={() => {
                onScrollToSection("tracker-section");
                setMenuOpen(false);
              }}
            >
              {text.navTracker}
            </button>

            <button
              className="block w-full text-left"
              onClick={() => {
                onScrollToSection("roles-section");
                setMenuOpen(false);
              }}
            >
              {text.navRoles}
            </button>

            <div className="pt-2 space-y-2">
              <button
                onClick={() => {
                  onRedirect("/login");
                  setMenuOpen(false);
                }}
                className="w-full py-2 border rounded-xl"
              >
                {text.signIn}
              </button>

              <button
                onClick={() => {
                  onRedirect("/register");
                  setMenuOpen(false);
                }}
                className="w-full py-2 rounded-xl text-white bg-gradient-to-r from-sky-500 to-indigo-600"
              >
                {text.signUp}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}