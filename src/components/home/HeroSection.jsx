// import React from "react";
// import { Truck } from "lucide-react";

// const HeroSection = () => {
//   return (
//     <section className="min-h-screen flex items-center justify-center">
//       <div className="text-center">
//         <h1 className="text-6xl font-bold">
//           Rural & Urban B2B Connectivity
//         </h1>

//         <p className="mt-4 text-gray-500">
//           Villgo Logistics Platform
//         </p>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

import React from 'react';

// ============================================================================
// HERO COPY CONTAINER COMPONENT
// Local File Path: src/components/common/HeroSection.jsx
// ============================================================================

export default function HeroSection({ text, resolvedTheme, children }) {
  return (
    <div className="lg:col-span-7 space-y-6">
      <span className="inline-block px-3.5 py-1.5 text-xs font-bold bg-sky-100 text-sky-800 dark:bg-sky-950/50 dark:text-sky-300 rounded-full tracking-wider uppercase">
        Gujarat's Premium Supply & Transport Hub
      </span>
      <h1 className="text-3.5xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-indigo-500 to-indigo-600">
        {text.heroTitle}
      </h1>
      <p className={`text-base sm:text-lg max-w-2xl leading-relaxed ${
        resolvedTheme === 'dark' ? 'text-slate-400' : 'text-slate-600'
      }`}>
        {text.heroSubtitle}
      </p>

      {/* KPI Cards wrapper */}
      {children}
    </div>
  );
}