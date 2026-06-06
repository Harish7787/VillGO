// export const ShipmentTracker = ({ text, resolvedTheme, trackId, setTrackId, trackerError, activeShipment, onTrack }) => (
//   <div className={`p-6 rounded-3xl border shadow-lg ${
//     resolvedTheme === 'dark' ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'
//   }`}>
//     <h2 className="text-lg font-extrabold flex items-center gap-2 mb-4">
//       <svg className="w-5 h-5 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//       </svg>
//       {text.trackerTitle}
//     </h2>

//     <form onSubmit={onTrack} className="flex gap-2">
//       <input
//         type="text"
//         value={trackId}
//         onChange={(e) => setTrackId(e.target.value)}
//         placeholder={text.trackerPlaceholder}
//         className={`flex-grow text-xs font-semibold p-3 rounded-xl outline-none focus:ring-2 focus:ring-sky-500/20 ${
//           resolvedTheme === 'dark' ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-slate-100 border-slate-200 text-slate-800'
//         }`}
//         required
//       />
//       <button
//         type="submit"
//         className="px-4 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-sky-500 dark:hover:bg-sky-600 text-white font-bold text-xs rounded-xl transition-all shrink-0"
//       >
//         {text.trackBtn}
//       </button>
//     </form>

//     {trackerError && (
//       <p className="text-xs text-rose-500 font-semibold mt-3 bg-rose-50 dark:bg-rose-950/20 p-2.5 rounded-lg border border-rose-100 dark:border-rose-950">
//         ⚠️ {text.invalidTrack}
//       </p>
//     )}

//     {activeShipment && (
//       <div className="mt-5 space-y-4 animate-fade-in">
//         <div className={`p-3.5 rounded-2xl text-xs font-medium border ${
//           resolvedTheme === 'dark' ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'
//         }`}>
//           <p className="font-bold text-sky-500">Route: <span className="text-slate-400 dark:text-slate-300 font-medium">{activeShipment.origin} ➔ {activeShipment.destination}</span></p>
//           <p className="mt-1 font-bold">Cargo: <span className="text-slate-500 font-medium">{activeShipment.cargo}</span></p>
//           <p className="mt-1 font-bold">Driver: <span className="text-slate-500 font-medium">{activeShipment.carrier}</span></p>
//         </div>

//         <div className="relative flex justify-between items-center max-w-sm mx-auto pt-4">
//           <div className="absolute top-[26px] left-[15%] right-[15%] h-1 bg-slate-200 dark:bg-slate-700 -z-10">
//             <div
//               className="h-full bg-emerald-400 transition-all duration-500"
//               style={{ width: `${(activeShipment.status / 3) * 100}%` }}
//             ></div>
//           </div>

//           {[0, 1, 2, 3].map((step) => {
//             const titles = [text.statusOrdered, text.statusAccepted, text.statusTransit, text.statusDelivered];
//             const isCompleted = activeShipment.status >= step;
//             return (
//               <div key={step} className="flex flex-col items-center flex-1">
//                 <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 text-[10px] font-bold ${
//                   isCompleted
//                     ? 'bg-emerald-400 border-emerald-400 text-white'
//                     : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-400'
//                 }`}>
//                   {isCompleted ? '✓' : step + 1}
//                 </div>
//                 <span className="text-[8px] font-bold text-center mt-2 max-w-[60px] truncate leading-tight block">
//                   {titles[step]}
//                 </span>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     )}
//   </div>
// );

// export default ShipmentTracker;

import React from 'react';

// ============================================================================
// SHIPMENT TRACKER COMPONENT
// Local File Path: src/components/common/ShipmentTracker.jsx
// ============================================================================

export default function ShipmentTracker({ text, resolvedTheme, trackId, setTrackId, trackerError, activeShipment, onTrack }) {
  return (
    <div className={`p-6 rounded-3xl border shadow-lg ${
      resolvedTheme === 'dark' ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'
    }`}>
      <h2 className="text-lg font-extrabold flex items-center gap-2 mb-4">
        <svg className="w-5 h-5 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {text.trackerTitle}
      </h2>

      <form onSubmit={onTrack} className="flex gap-2">
        <input
          type="text"
          value={trackId}
          onChange={(e) => setTrackId(e.target.value)}
          placeholder={text.trackerPlaceholder}
          className={`flex-grow text-xs font-semibold p-3 rounded-xl outline-none focus:ring-2 focus:ring-sky-500/20 ${
            resolvedTheme === 'dark' ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-slate-100 border-slate-200 text-slate-800'
          }`}
          required
        />
        <button
          type="submit"
          className="px-4 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-sky-500 dark:hover:bg-sky-600 text-white font-bold text-xs rounded-xl transition-all shrink-0"
        >
          {text.trackBtn}
        </button>
      </form>

      {trackerError && (
        <p className="text-xs text-rose-500 font-semibold mt-3 bg-rose-50 dark:bg-rose-950/20 p-2.5 rounded-lg border border-rose-100 dark:border-rose-950">
          ⚠️ {text.invalidTrack}
        </p>
      )}

      {activeShipment && (
        <div className="mt-5 space-y-4 animate-fade-in">
          <div className={`p-3.5 rounded-2xl text-xs font-medium border ${
            resolvedTheme === 'dark' ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-50 border-slate-200'
          }`}>
            <p className="font-bold text-sky-500">Route: <span className="text-slate-400 dark:text-slate-300 font-medium">{activeShipment.origin} ➔ {activeShipment.destination}</span></p>
            <p className="mt-1 font-bold">Cargo: <span className="text-slate-500 font-medium">{activeShipment.cargo}</span></p>
            <p className="mt-1 font-bold">Driver: <span className="text-slate-500 font-medium">{activeShipment.carrier}</span></p>
          </div>

          <div className="relative flex justify-between items-center max-w-sm mx-auto pt-4">
            <div className="absolute top-[26px] left-[15%] right-[15%] h-1 bg-slate-200 dark:bg-slate-700 -z-10">
              <div
                className="h-full bg-emerald-400 transition-all duration-500"
                style={{ width: `${(activeShipment.status / 3) * 100}%` }}
              ></div>
            </div>

            {[0, 1, 2, 3].map((step) => {
              const titles = [text.statusOrdered, text.statusAccepted, text.statusTransit, text.statusDelivered];
              const isCompleted = activeShipment.status >= step;
              return (
                <div key={step} className="flex flex-col items-center flex-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 text-[10px] font-bold ${
                    isCompleted
                      ? 'bg-emerald-400 border-emerald-400 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-400'
                  }`}>
                    {isCompleted ? '✓' : step + 1}
                  </div>
                  <span className="text-[8px] font-bold text-center mt-2 max-w-[60px] truncate leading-tight block">
                    {titles[step]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}