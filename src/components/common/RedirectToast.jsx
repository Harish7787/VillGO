import React from 'react';
import { Sparkles, Database, X } from 'lucide-react';

export default function RedirectToast({ simulatedRedirect, onClose }) {
  if (!simulatedRedirect) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm p-4 bg-white dark:bg-slate-900 border border-sky-200 dark:border-slate-800 rounded-2xl shadow-2xl animate-bounce">
      <div className="flex items-start space-x-3">
        <div className="p-2 bg-sky-100 dark:bg-sky-950/50 rounded-lg text-sky-500">
          <Sparkles className="h-5 w-5 animate-spin" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-mono text-sky-600 dark:text-sky-400">https://{simulatedRedirect.subdomain}</span>
            <span className="text-[9px] bg-sky-100 dark:bg-sky-900 font-extrabold px-1.5 py-0.5 rounded text-sky-800 dark:text-sky-200">B2B SECURE</span>
          </div>
          <p className="text-sm font-black text-slate-900 dark:text-white mt-1">Connecting Portal Module</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{simulatedRedirect.description}</p>
          <div className="mt-3 flex items-center space-x-2 bg-slate-50 dark:bg-slate-950 p-2 rounded-lg text-[10px] text-slate-400 font-medium">
            <Database className="h-3.5 w-3.5 text-indigo-400" />
            <span>Redirecting to SHWebCreatives secure environment...</span>
          </div>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}