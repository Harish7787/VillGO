import React from 'react'
import { useState } from 'react';
import T from '../../localization/strings';
const ThemeSwitcher = () => {
  return (
    <div> {/* Theme switcher mode */}
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block">{text.themeLabel}</label>
              
              <div className="grid grid-cols-3 gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
                {/* Light */}
                <button
                  onClick={() => setTheme('light')}
                  className={`p-1.5 rounded-lg flex justify-center text-xs transition-all ${
                    theme === 'light' ? 'bg-white dark:bg-slate-800 text-sky-500 shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                  }`}
                  title={text.lightTheme}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                </button>

                {/* Dark */}
                <button
                  onClick={() => setTheme('dark')}
                  className={`p-1.5 rounded-lg flex justify-center text-xs transition-all ${
                    theme === 'dark' ? 'bg-white dark:bg-slate-800 text-indigo-500 shadow-sm' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                  }`}
                  title={text.darkTheme}
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                </button>

                {/* System */}
                <button
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


export default ThemeSwitcher