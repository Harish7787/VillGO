// import React from "react";

// const ControlPanel = ({
//   lang,
//   setLang,
//   theme,
//   setTheme,
// }) => {
//   return (
//     <section className="py-6 px-4">
//       <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md p-6 border">
//         <h2 className="text-xl font-bold mb-4">
//           Control Panel
//         </h2>

//         <div className="flex flex-wrap gap-4">
//           {/* Language */}
//           <div>
//             <label className="block text-sm font-medium mb-2">
//               Language
//             </label>

//             <select
//               value={lang}
//               onChange={(e) => setLang(e.target.value)}
//               className="border rounded-lg px-3 py-2"
//             >
//               <option value="en">English</option>
//               <option value="gu">Gujarati</option>
//             </select>
//           </div>

//           {/* Theme */}
//           <div>
//             <label className="block text-sm font-medium mb-2">
//               Theme
//             </label>

//             <select
//               value={theme}
//               onChange={(e) => setTheme(e.target.value)}
//               className="border rounded-lg px-3 py-2"
//             >
//               <option value="light">Light</option>
//               <option value="dark">Dark</option>
//             </select>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ControlPanel;

import React from 'react';

// ============================================================================
// PERSISTENT FLOATING PREFERENCES PANEL
// Local File Path: src/components/common/ControlPanel.jsx
// ============================================================================

export default function ControlPanel({ text, lang, setLang, theme, setTheme, resolvedTheme, isSettingsOpen, setIsSettingsOpen }) {
  return (
    <div className="fixed bottom-6 left-6 z-50">
      
      {/* Configuration Action Circle Trigger Button */}
      <button
        onClick={() => setIsSettingsOpen(!isSettingsOpen)}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow-2xl hover:scale-105 active:scale-95 transition-all outline-none"
        title="Preferences Dock"
      >
        <svg className={`w-5.5 h-5.5 transition-transform duration-500 ${isSettingsOpen ? 'rotate-90 text-amber-300' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      {/* Preferences overlay panel */}
      {isSettingsOpen && (
        <div className={`absolute bottom-14 left-0 w-64 p-4 rounded-2xl border shadow-2xl animate-fade-in ${
          resolvedTheme === 'dark' ? 'bg-[#0f172a] border-slate-850 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
        }`}>
          <h3 className="font-extrabold text-[10px] tracking-wider uppercase text-slate-400 mb-3.5 flex items-center gap-1.5">
            ⚙️ {text.settingsHeader}
          </h3>

          {/* Language dropdown selectors */}
          <div className="space-y-1 mb-3.5">
            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block">{text.langLabel}</label>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className={`w-full text-xs font-semibold p-2 rounded-xl outline-none border transition-all ${
                resolvedTheme === 'dark' ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              <option value="en">English (US)</option>
              <option value="gu">ગુજરાતી (Gujarati)</option>
              <option value="hi">हिन्दी (Hindi)</option>
            </select>
          </div>

          {/* Interface Visual Theme Selection */}
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block">{text.themeLabel}</label>
            
            <div className="grid grid-cols-3 gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
              {/* Light Theme trigger */}
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`p-1.5 rounded-lg flex justify-center text-xs transition-all ${
                  theme === 'light' ? 'bg-white dark:bg-slate-800 text-sky-500 shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                }`}
                title={text.lightTheme}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              </button>

              {/* Dark Theme trigger */}
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`p-1.5 rounded-lg flex justify-center text-xs transition-all ${
                  theme === 'dark' ? 'bg-white dark:bg-slate-800 text-indigo-500 shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                }`}
                title={text.darkTheme}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              </button>

              {/* System Adaptive trigger */}
              <button
                type="button"
                onClick={() => setTheme('system')}
                className={`p-1.5 rounded-lg flex justify-center text-xs transition-all ${
                  theme === 'system' ? 'bg-white dark:bg-slate-800 text-emerald-500 shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                }`}
                title={text.sysTheme}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}