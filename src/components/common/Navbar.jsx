import React from 'react';
import { Truck, Sun, Moon, Monitor, Menu, X } from 'lucide-react';

export default function Navbar({ theme, setTheme, isScrolled, isMobileMenuOpen, setIsMobileMenuOpen, onRedirect }) {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md border-b border-sky-100/40 dark:border-slate-800/40 py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-gradient-to-tr from-sky-500 to-sky-600 rounded-xl shadow-lg shadow-sky-500/20 text-white transform hover:rotate-6 transition-transform">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white flex items-center">
                Villgo<span className="text-sky-500 font-extrabold ml-1">.</span>
              </span>
              <p className="text-[9px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold -mt-1">
                by SHWebCreatives
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="font-semibold text-sm hover:text-sky-500 transition-colors text-slate-600 dark:text-slate-300">How It Works</a>
            <a href="#gujarat-network" className="font-semibold text-sm hover:text-sky-500 transition-colors text-slate-600 dark:text-slate-300">Logistics Hubs</a>
            <a href="#fleet" className="font-semibold text-sm hover:text-sky-500 transition-colors text-slate-600 dark:text-slate-300">Fleet Index</a>
            <a href="#fare-estimator" className="font-semibold text-sm hover:text-sky-500 transition-colors text-slate-600 dark:text-slate-300">Fare Estimator</a>
            <a href="#tracker" className="font-semibold text-sm hover:text-sky-500 transition-colors text-slate-600 dark:text-slate-300">Live Tracker</a>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-full">
              <button onClick={() => setTheme('light')} className={`p-1.5 rounded-full ${theme === 'light' ? 'bg-white text-sky-500 shadow-sm' : 'text-slate-400'}`}><Sun className="h-4 w-4" /></button>
              <button onClick={() => setTheme('dark')} className={`p-1.5 rounded-full ${theme === 'dark' ? 'bg-slate-950 text-sky-400' : 'text-slate-400'}`}><Moon className="h-4 w-4" /></button>
              <button onClick={() => setTheme('system')} className={`p-1.5 rounded-full ${theme === 'system' ? 'bg-sky-500 text-white' : 'text-slate-400'}`}><Monitor className="h-4 w-4" /></button>
            </div>

            <button onClick={() => onRedirect('retailer.villgo.com', 'Secure Retailer Catalog Booking Gateway')} className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-sky-500 dark:text-slate-300 dark:hover:text-white transition-colors">
              Retailer Login
            </button>
            <button onClick={() => onRedirect('admin.villgo.com', 'Villgo Multi-Role Master Admin Command Console')} className="px-5 py-2.5 text-sm font-semibold text-white bg-slate-900 dark:bg-sky-500 dark:text-slate-950 rounded-xl hover:opacity-90 transition-all shadow-md">
              Portal Gateway
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <div className="flex md:hidden items-center space-x-3">
            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="p-2 text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-lg">
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-lg">
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}
