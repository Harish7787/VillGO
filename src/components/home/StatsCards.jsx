//     import React from "react";

// const StatsCards = () => {
//   return (
//     <section className="py-10">
//       <div className="max-w-6xl mx-auto grid grid-cols-3 gap-4">
//         <div className="p-6 bg-white rounded-xl shadow">
//           <h3 className="text-3xl font-bold">500+</h3>
//           <p>Transporters</p>
//         </div>

//         <div className="p-6 bg-white rounded-xl shadow">
//           <h3 className="text-3xl font-bold">2000+</h3>
//           <p>Retailers</p>
//         </div>

//         <div className="p-6 bg-white rounded-xl shadow">
//           <h3 className="text-3xl font-bold">100+</h3>
//           <p>Wholesalers</p>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default StatsCards;

import React from 'react';

// ============================================================================
// STATS CARDS COMPONENT
// Local File Path: src/components/common/StatsCards.jsx
// ============================================================================

export default function StatsCards({ text, resolvedTheme }) {
  return (
    <div className="grid grid-cols-3 gap-4 pt-6 max-w-xl">
      <div className={`p-4 rounded-2xl border ${resolvedTheme === 'dark' ? 'bg-[#121c33]/50 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
        <p className="text-2xl sm:text-3xl font-black text-sky-500">10k+</p>
        <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase mt-1">{text.merchants}</p>
      </div>
      <div className={`p-4 rounded-2xl border ${resolvedTheme === 'dark' ? 'bg-[#121c33]/50 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
        <p className="text-2xl sm:text-3xl font-black text-indigo-500">114k+</p>
        <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase mt-1">{text.deliveries}</p>
      </div>
      <div className={`p-4 rounded-2xl border ${resolvedTheme === 'dark' ? 'bg-[#121c33]/50 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
        <p className="text-2xl sm:text-3xl font-black text-emerald-500">120+</p>
        <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase mt-1">{text.routes}</p>
      </div>
    </div>
  );
}