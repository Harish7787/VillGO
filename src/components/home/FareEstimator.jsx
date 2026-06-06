// // import React from 'react';
// // import { Activity, DollarSign, Layers } from 'lucide-react';

// // export default function FareEstimator({
// //   calcFrom, setCalcFrom,
// //   calcTo, setCalcTo,
// //   calcWeight, setCalcWeight,
// //   calcVehicle, setCalcVehicle,
// //   calculatedFare, onCalculate
// // }) {
// //   return (
// //     <section id="fare-estimator" className="py-24 bg-sky-50/10 dark:bg-slate-950/20 border-t border-sky-100/30 dark:border-slate-800/30">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="grid md:grid-cols-12 gap-12 items-center">
          
// //           <div className="md:col-span-5 space-y-6">
// //             <span className="text-xs uppercase font-extrabold text-sky-500">Freight Quotes</span>
// //             <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight">
// //               Simulate Transport Pricing Live
// //             </h3>
// //             <p className="text-slate-600 dark:text-slate-400">
// //               Planning bulk trading is easier with fair logistics pricing. Use our live interactive estimator tool to get an instant quote on your parcel weight, transport distance, and vehicle requirements.
// //             </p>
// //             <div className="space-y-4 text-sm font-semibold">
// //               <div className="flex items-start space-x-3">
// //                 <div className="p-2 bg-sky-100 dark:bg-slate-800 text-sky-500 rounded-lg">
// //                   <DollarSign className="h-5 w-5" />
// //                 </div>
// //                 <div>
// //                   <h4 className="font-extrabold text-slate-900 dark:text-white">Fair Price Guarantee</h4>
// //                   <p className="text-xs text-slate-500 dark:text-slate-400">Transparent rates per kilometer across all Gujarat hubs without middleman fees.</p>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="md:col-span-7">
// //             <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-sky-100/50 dark:border-slate-800 shadow-xl">
// //               <h4 className="text-lg font-black text-slate-900 dark:text-white mb-6 flex items-center space-x-2">
// //                 <Activity className="h-5 w-5 text-sky-500" />
// //                 <span>Interactive Freight Calculator</span>
// //               </h4>

// //               <div className="grid sm:grid-cols-2 gap-4 mb-6">
// //                 <div>
// //                   <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Origin City</label>
// //                   <select value={calcFrom} onChange={(e) => setCalcFrom(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-sky-100/50 text-sm font-semibold focus:outline-none focus:ring-2">
// //                     <option value="Ahmedabad">Ahmedabad</option>
// //                     <option value="Surat">Surat</option>
// //                     <option value="Vadodara">Vadodara</option>
// //                     <option value="Rajkot">Rajkot</option>
// //                   </select>
// //                 </div>
// //                 <div>
// //                   <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Destination City</label>
// //                   <select value={calcTo} onChange={(e) => setCalcTo(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-sky-100/50 text-sm font-semibold focus:outline-none focus:ring-2">
// //                     <option value="Surat">Surat</option>
// //                     <option value="Ahmedabad">Ahmedabad</option>
// //                     <option value="Vadodara">Vadodara</option>
// //                     <option value="Rajkot">Rajkot</option>
// //                   </select>
// //                 </div>
// //                 <div>
// //                   <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Weight Range (KG)</label>
// //                   <input type="number" value={calcWeight} onChange={(e) => setCalcWeight(Number(e.target.value))} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-sky-100/50 text-sm font-semibold focus:outline-none" />
// //                 </div>
// //                 <div>
// //                   <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Vehicle Type</label>
// //                   <select value={calcVehicle} onChange={(e) => setCalcVehicle(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-sky-100/50 text-sm font-semibold">
// //                     <option value="chhota-hathi">Tata Ace / Chhota Hathi</option>
// //                     <option value="bolero">Bolero Pickup</option>
// //                     <option value="truck-7t">7 Ton Eicher Truck</option>
// //                   </select>
// //                 </div>
// //               </div>

// //               <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-sky-100/30 gap-4">
// //                 <button onClick={onCalculate} className="w-full sm:w-auto px-6 py-3 bg-slate-900 dark:bg-sky-500 dark:text-slate-950 text-white font-bold rounded-xl text-sm hover:opacity-95">
// //                   Calculate Fare
// //                 </button>
// //                 {calculatedFare && (
// //                   <div className="text-right w-full sm:w-auto">
// //                     <p className="text-xs text-slate-400">Estimated Total Cost</p>
// //                     <p className="text-3xl font-black text-green-500">₹{calculatedFare.fare}</p>
// //                     <p className="text-xs text-slate-500">
// //                       Dist: {calculatedFare.distance} KM | Transit: {calculatedFare.time}
// //                     </p>
// //                   </div>
// //                 )}
// //               </div>

// //             </div>
// //           </div>

// //         </div>
// //       </div>
// //     </section>
// //   );

// // }


// export const FareEstimator = ({ text, resolvedTheme, source, setSource, destination, setDestination, weight, setWeight, vehicle, setVehicle, calculatedFare, onCalculate }) => (
//   <div className={`p-6 rounded-3xl border shadow-xl ${
//     resolvedTheme === 'dark' ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'
//   }`}>
//     <h2 className="text-lg font-extrabold flex items-center gap-2 mb-4">
//       <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//       </svg>
//       {text.estimatorTitle}
//     </h2>

//     <form onSubmit={onCalculate} className="space-y-4">
//       <div className="grid grid-cols-2 gap-3">
//         <div className="space-y-1.5">
//           <label className="text-[10px] font-bold text-slate-400 uppercase">{text.sourceGidc}</label>
//           <select
//             value={source}
//             onChange={(e) => setSource(e.target.value)}
//             className={`w-full text-xs font-semibold p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-sky-500/20 ${
//               resolvedTheme === 'dark' ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-slate-100 border-slate-200 text-slate-800'
//             }`}
//           >
//             <option value="Ahmedabad GIDC">Ahmedabad GIDC</option>
//             <option value="Surat GIDC">Surat GIDC</option>
//             <option value="Vadodara GIDC">Vadodara GIDC</option>
//             <option value="Rajkot GIDC">Rajkot GIDC</option>
//           </select>
//         </div>

//         <div className="space-y-1.5">
//           <label className="text-[10px] font-bold text-slate-400 uppercase">{text.destGidc}</label>
//           <select
//             value={destination}
//             onChange={(e) => setDestination(e.target.value)}
//             className={`w-full text-xs font-semibold p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-sky-500/20 ${
//               resolvedTheme === 'dark' ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-slate-100 border-slate-200 text-slate-800'
//             }`}
//           >
//             <option value="Surat GIDC">Surat GIDC</option>
//             <option value="Ahmedabad GIDC">Ahmedabad GIDC</option>
//             <option value="Vadodara GIDC">Vadodara GIDC</option>
//             <option value="Rajkot GIDC">Rajkot GIDC</option>
//           </select>
//         </div>
//       </div>

//       <div className="space-y-1.5">
//         <label className="text-[10px] font-bold text-slate-400 uppercase">{text.weightLabel}</label>
//         <input
//           type="number"
//           value={weight}
//           onChange={(e) => setWeight(e.target.value)}
//           placeholder="e.g. 500 KGs"
//           className={`w-full text-xs font-semibold p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-sky-500/20 ${
//             resolvedTheme === 'dark' ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-slate-100 border-slate-200 text-slate-800'
//           }`}
//           required
//         />
//       </div>

//       <div className="space-y-1.5">
//         <label className="text-[10px] font-bold text-slate-400 uppercase">{text.vehicleLabel}</label>
//         <div className="grid grid-cols-3 gap-2">
//           {[
//             { id: 'chota_hathi', label: 'Chota Hathi' },
//             { id: 'pickup', label: 'Bolero Pickup' },
//             { id: 'eicher_truck', label: 'Heavy Truck' }
//           ].map((v) => (
//             <button
//               key={v.id}
//               type="button"
//               onClick={() => setVehicle(v.id)}
//               className={`py-2 px-1 rounded-xl text-[10px] font-bold border transition-all ${
//                 vehicle === v.id
//                   ? 'bg-sky-500 text-white border-sky-500'
//                   : resolvedTheme === 'dark'
//                     ? 'bg-slate-850 border-slate-700 text-slate-300 hover:bg-slate-800'
//                     : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
//               }`}
//             >
//               {v.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       <button
//         type="submit"
//         className="w-full py-3 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-500/10 transition-all transform active:scale-[0.98]"
//       >
//         {text.calculateBtn}
//       </button>
//     </form>

//     {calculatedFare !== null && (
//       <div className={`mt-4 p-4 rounded-2xl border text-center animate-fade-in ${
//         resolvedTheme === 'dark' ? 'bg-slate-800/50 border-sky-950 text-slate-100' : 'bg-sky-50/50 border-sky-100 text-slate-800'
//       }`}>
//         <p className="text-xs font-bold text-slate-400 uppercase">{text.estCost}</p>
//         <p className="text-3xl font-black text-sky-500 mt-1">₹ {calculatedFare.toLocaleString('en-IN')}</p>
//         <p className="text-[9px] text-slate-400 mt-1.5">🛡️ {text.inclusiveTax}</p>
//       </div>
//     )}
//   </div>
// );

// export default FareEstimator;

import React from 'react';

// ============================================================================
// FREIGHT & FARE ESTIMATOR COMPONENT
// Local File Path: src/components/common/FareEstimator.jsx
// ============================================================================

export default function FareEstimator({ text, resolvedTheme, source, setSource, destination, setDestination, weight, setWeight, vehicle, setVehicle, calculatedFare, onCalculate }) {
  return (
    <div className={`p-6 rounded-3xl border shadow-xl ${
      resolvedTheme === 'dark' ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'
    }`}>
      <h2 className="text-lg font-extrabold flex items-center gap-2 mb-4">
        <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {text.estimatorTitle}
      </h2>

      <form onSubmit={onCalculate} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase">{text.sourceGidc}</label>
            <select
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className={`w-full text-xs font-semibold p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-sky-500/20 ${
                resolvedTheme === 'dark' ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-slate-100 border-slate-200 text-slate-800'
              }`}
            >
              <option value="Ahmedabad GIDC">Ahmedabad GIDC</option>
              <option value="Surat GIDC">Surat GIDC</option>
              <option value="Vadodara GIDC">Vadodara GIDC</option>
              <option value="Rajkot GIDC">Rajkot GIDC</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase">{text.destGidc}</label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className={`w-full text-xs font-semibold p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-sky-500/20 ${
                resolvedTheme === 'dark' ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-slate-100 border-slate-200 text-slate-800'
              }`}
            >
              <option value="Surat GIDC">Surat GIDC</option>
              <option value="Ahmedabad GIDC">Ahmedabad GIDC</option>
              <option value="Vadodara GIDC">Vadodara GIDC</option>
              <option value="Rajkot GIDC">Rajkot GIDC</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase">{text.weightLabel}</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="e.g. 500 KGs"
            className={`w-full text-xs font-semibold p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-sky-500/20 ${
              resolvedTheme === 'dark' ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-slate-100 border-slate-200 text-slate-800'
            }`}
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-slate-400 uppercase">{text.vehicleLabel}</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'chota_hathi', label: 'Chota Hathi' },
              { id: 'pickup', label: 'Bolero Pickup' },
              { id: 'eicher_truck', label: 'Heavy Truck' }
            ].map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setVehicle(v.id)}
                className={`py-2 px-1 rounded-xl text-[10px] font-bold border transition-all ${
                  vehicle === v.id
                    ? 'bg-sky-500 text-white border-sky-500'
                    : resolvedTheme === 'dark'
                      ? 'bg-slate-850 border-slate-700 text-slate-300 hover:bg-slate-800'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-500/10 transition-all transform active:scale-[0.98]"
        >
          {text.calculateBtn}
        </button>
      </form>

      {calculatedFare !== null && (
        <div className={`mt-4 p-4 rounded-2xl border text-center animate-fade-in ${
          resolvedTheme === 'dark' ? 'bg-slate-800/50 border-sky-950 text-slate-100' : 'bg-sky-50/50 border-sky-100 text-slate-800'
        }`}>
          <p className="text-xs font-bold text-slate-400 uppercase">{text.estCost}</p>
          <p className="text-3xl font-black text-sky-500 mt-1">₹ {calculatedFare.toLocaleString('en-IN')}</p>
          <p className="text-[9px] text-slate-400 mt-1.5">🛡️ {text.inclusiveTax}</p>
        </div>
      )}
    </div>
  );
}