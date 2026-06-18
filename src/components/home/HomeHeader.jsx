import React, { useState } from "react";

export default function Header({
  text,
  onRedirect,
  resolvedTheme,
  onScrollToSection,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Common Theme classes
  const isDark = resolvedTheme === "dark";

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-lg transition-all duration-300 border-b ${
        isDark
          ? "bg-[#0b1120]/80 border-slate-800/80 shadow-lg shadow-slate-950/20"
          : "bg-white/80 border-slate-200/50 shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* LOGO AREA - Dynamic redirection on click */}
          <div
            onClick={() => onScrollToSection("hero-section")}
            className="flex items-center gap-3 cursor-pointer group focus:outline-none"
            tabIndex="0"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onScrollToSection("hero-section");
            }}
          >
            {/* Professional Icon Box with premium gradient */}
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-400 via-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform duration-300">
              <svg
                className="w-6 h-6 animate-pulse-slow"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 011-1v-4h3m-3-1h4l1.5 3H14v-3z"
                />
              </svg>
              {/* Small glowing pulse behind logo */}
              <span className="absolute -inset-0.5 bg-sky-400 rounded-2xl blur-xs opacity-30 group-hover:opacity-50 transition-opacity duration-300 -z-10"></span>
            </div>

            <div className="flex flex-col">
              <h2 className="text-xl font-black tracking-tight leading-none">
                {text?.brand || "Villgo"}
              </h2>
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-sky-500 mt-0.5">
                {text?.tagline || "B2B Logistics"}
              </span>
            </div>
          </div>

          {/* DESKTOP NAVIGATION & ACTIONS */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-6">
              {[
                { id: "hero-section", label: text?.navHome || "Home" },
                { id: "estimator-section", label: text?.navEstimator || "Estimator" },
                { id: "tracker-section", label: text?.navTracker || "Tracker" },
                { id: "roles-section", label: text?.navRoles || "Partners" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => onScrollToSection(item.id)}
                  className={`relative py-2 text-sm font-bold transition-colors duration-200 focus:outline-none after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-sky-500 hover:after:w-full after:transition-all after:duration-300 ${
                    isDark ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-950"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Split boundary */}
            <span className={`h-5 w-px ${isDark ? "bg-slate-800" : "bg-slate-200"}`} />

            {/* Premium CTA Button Group */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => onRedirect("/login")}
                className={`px-4.5 py-2 text-xs font-black rounded-xl transition-all duration-200 border focus:outline-none active:scale-95 ${
                  isDark
                    ? "border-slate-800 text-slate-300 hover:bg-slate-900 hover:text-white"
                    : "border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-950 shadow-xs"
                }`}
              >
                {text?.signIn || "Sign In"}
              </button>

              <button
                onClick={() => onRedirect("/register")}
                className="px-5 py-2 text-xs font-black rounded-xl text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 shadow-md shadow-sky-500/10 hover:shadow-sky-500/25 active:scale-95 transition-all duration-200 focus:outline-none"
              >
                {text?.signUp || "Sign Up"}
              </button>
            </div>
          </div>

          {/* MOBILE HAMBURGER TOGGLE BUTTON */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`p-2.5 rounded-xl border focus:outline-none transition-colors duration-200 ${
                isDark
                  ? "bg-slate-900/50 border-slate-800 text-slate-300 active:bg-slate-900"
                  : "bg-slate-100/50 border-slate-200 text-slate-700 active:bg-slate-100"
              }`}
              aria-label="Toggle Menu"
            >
              {menuOpen ? (
                <svg
                  className="w-5 h-5 transition-transform duration-250 rotate-90"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 transition-transform duration-250"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE EXPANDABLE DRAWER */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t ${
          menuOpen ? "max-h-96 opacity-100 visible py-4" : "max-h-0 opacity-0 invisible"
        } ${isDark ? "bg-[#0b1120] border-slate-800/80" : "bg-white border-slate-200/50"}`}
      >
        <div className="px-4 space-y-2">
          {[
            { id: "hero-section", label: text?.navHome || "Home" },
            { id: "estimator-section", label: text?.navEstimator || "Estimator" },
            { id: "tracker-section", label: text?.navTracker || "Tracker" },
            { id: "roles-section", label: text?.navRoles || "Partners" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onScrollToSection(item.id);
                setMenuOpen(false);
              }}
              className={`block w-full text-left px-4 py-3 text-sm font-bold rounded-xl transition-colors duration-150 ${
                isDark
                  ? "text-slate-300 hover:bg-slate-900 hover:text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
              }`}
            >
              {item.label}
            </button>
          ))}

          {/* Mobile Actions Container */}
          <div className={`pt-3 mt-3 border-t flex flex-col gap-2 ${isDark ? "border-slate-800" : "border-slate-100"}`}>
            <button
              onClick={() => {
                onRedirect("/login");
                setMenuOpen(false);
              }}
              className={`w-full py-3 text-sm font-black rounded-xl border text-center transition-all ${
                isDark
                  ? "border-slate-800 text-slate-300 bg-slate-900/50 hover:bg-slate-900"
                  : "border-slate-200 text-slate-700 bg-slate-50/50 hover:bg-slate-100"
              }`}
            >
              {text?.signIn || "Sign In"}
            </button>

            <button
              onClick={() => {
                onRedirect("/register");
                setMenuOpen(false);
              }}
              className="w-full py-3 text-sm font-black rounded-xl text-center text-white bg-gradient-to-r from-sky-500 to-indigo-600 shadow-md shadow-sky-500/10 hover:from-sky-600 hover:to-indigo-700"
            >
              {text?.signUp || "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

// export default Header;
// import React, { useState } from "react";

// export default function Header({
//   text,
//   onRedirect,
//   resolvedTheme,
//   onScrollToSection,
// }) {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <header
//       className={`sticky top-0 z-50 backdrop-blur-md border-b ${
//         resolvedTheme === "dark"
//           ? "bg-[#0b1120]/90 border-slate-800"
//           : "bg-white/90 border-slate-100"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
//         {/* Top Row */}
//         <div className="flex items-center justify-between">
//           {/* Logo */}
//           <div
//             onClick={() => onScrollToSection("hero-section")}
//             className="flex items-center gap-3 cursor-pointer"
//           >
//             <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow-lg">
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
//                 />
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 011-1v-4h3"
//                 />
//               </svg>
//             </div>

//             <div>
//               <h2 className="text-xl font-black">{text.brand}</h2>
//               <p className="text-[10px] uppercase font-bold text-sky-500">
//                 {text.tagline}
//               </p>
//             </div>
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center gap-8">
//             <nav className="flex items-center gap-6 text-sm font-bold">
//               <button onClick={() => onScrollToSection("hero-section")}>
//                 {text.navHome}
//               </button>

//               <button onClick={() => onScrollToSection("estimator-section")}>
//                 {text.navEstimator}
//               </button>

//               <button onClick={() => onScrollToSection("tracker-section")}>
//                 {text.navTracker}
//               </button>

//               <button onClick={() => onScrollToSection("roles-section")}>
//                 {text.navRoles}
//               </button>
//             </nav>

//             <div className="flex gap-2">
//               <button
//                 onClick={() => onRedirect("/login")}
//                 className="px-4 py-2 border rounded-xl font-bold"
//               >
//                 {text.signIn}
//               </button>

//               <button
//                 onClick={() => onRedirect("/register")}
//                 className="px-4 py-2 rounded-xl text-white bg-gradient-to-r from-sky-500 to-indigo-600"
//               >
//                 {text.signUp}
//               </button>
//             </div>
//           </div>

//           {/* Mobile Button */}
//           <button
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="md:hidden p-3 rounded-xl bg-slate-100"
//           >
//             {menuOpen ? (
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             ) : (
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               </svg>
//             )}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {menuOpen && (
//           <div className="md:hidden mt-4 border-t pt-4 space-y-3">
//             <button
//               className="block w-full text-left"
//               onClick={() => {
//                 onScrollToSection("hero-section");
//                 setMenuOpen(false);
//               }}
//             >
//               {text.navHome}
//             </button>

//             <button
//               className="block w-full text-left"
//               onClick={() => {
//                 onScrollToSection("estimator-section");
//                 setMenuOpen(false);
//               }}
//             >
//               {text.navEstimator}
//             </button>

//             <button
//               className="block w-full text-left"
//               onClick={() => {
//                 onScrollToSection("tracker-section");
//                 setMenuOpen(false);
//               }}
//             >
//               {text.navTracker}
//             </button>

//             <button
//               className="block w-full text-left"
//               onClick={() => {
//                 onScrollToSection("roles-section");
//                 setMenuOpen(false);
//               }}
//             >
//               {text.navRoles}
//             </button>

//             <div className="pt-2 space-y-2">
//               <button
//                 onClick={() => {
//                   onRedirect("/login");
//                   setMenuOpen(false);
//                 }}
//                 className="w-full py-2 border rounded-xl"
//               >
//                 {text.signIn}
//               </button>

//               <button
//                 onClick={() => {
//                   onRedirect("/register");
//                   setMenuOpen(false);
//                 }}
//                 className="w-full py-2 rounded-xl text-white bg-gradient-to-r from-sky-500 to-indigo-600"
//               >
//                 {text.signUp}
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }