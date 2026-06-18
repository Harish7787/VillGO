import React from "react";

export default function Footer({ text, resolvedTheme }) {
  const isDark = resolvedTheme === "dark";

  return (
    <footer
      className={`px-6 py-12 border-t transition-colors duration-300 ${
        isDark 
          ? "bg-[#090d18] border-slate-800/80 text-slate-300" 
          : "bg-white border-slate-100 text-slate-600"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-left">
          
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              {/* Truck Logo Icon */}
              <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow-sm">
                <svg
                  className="w-5 h-5"
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
                    d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 011-1v-4h3"
                  />
                </svg>
              </div>
              <div>
                <span className={`text-lg font-black tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
                  {text?.brand || "Villgo"}
                </span>
                <span className="text-[9px] uppercase font-bold text-sky-500 block -mt-1 tracking-wider">
                  {text?.tagline || "B2B Logistics"}
                </span>
              </div>
            </div>
            
            <p className="text-xs leading-relaxed max-w-sm text-slate-400">
              {text?.footerText || "Connecting Gujarat GIDC hubs with premium, automated logistics, real-time fare predictions, and active container shipping terminals."}
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-3">
            <h4 className={`text-xs font-black uppercase tracking-wider ${isDark ? "text-slate-200" : "text-slate-800"}`}>
              Platform Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#hero-section" className="hover:text-sky-500 transition-colors duration-150">
                  {text?.navHome || "Home Hub"}
                </a>
              </li>
              <li>
                <a href="#estimator-section" className="hover:text-sky-500 transition-colors duration-150">
                  {text?.navEstimator || "Freight Estimator"}
                </a>
              </li>
              <li>
                <a href="#tracker-section" className="hover:text-sky-500 transition-colors duration-150">
                  {text?.navTracker || "Shipment Tracker"}
                </a>
              </li>
              <li>
                <a href="#roles-section" className="hover:text-sky-500 transition-colors duration-150">
                  {text?.navRoles || "Partner Roles"}
                </a>
              </li>
            </ul>
          </div>

          {/* Support Desk */}
          <div className="space-y-3">
            <h4 className={`text-xs font-black uppercase tracking-wider ${isDark ? "text-slate-200" : "text-slate-800"}`}>
              Support Desk
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Gujarat Industrial Development Corporation (GIDC) Regional Assistance
            </p>
            <div className="pt-1">
              <span className={`text-xs font-bold block ${isDark ? "text-slate-200" : "text-slate-700"}`}>
                ✉️ support@villgo.com
              </span>
              <span className={`text-xs font-bold block ${isDark ? "text-slate-200" : "text-slate-700"}`}>
                📞 +91 99999 00000
              </span>
            </div>
          </div>

        </div>

        {/* Divider Line */}
        <hr className={`my-6 ${isDark ? "border-slate-800/60" : "border-slate-100"}`} />

        {/* Bottom Bar with SHWebCreatives Branding */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="text-[11px] text-slate-400">
            © 2026 Villgo Logistics Inc. {text?.rightsReserved || "All rights reserved."}
          </div>
          
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Crafted with care by</span>
            <a 
              href="https://shwebcreatives.com" 
              target="_blank" 
              rel="noreferrer" 
              className="text-xs font-black px-2.5 py-1 rounded bg-sky-100 dark:bg-slate-800 text-sky-600 dark:text-sky-400 hover:scale-105 transition-transform duration-200"
            >
              SHWebCreatives
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}