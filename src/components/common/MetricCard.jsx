import React from 'react';

const MetricCard = ({ title, value, icon, badgeText, badgeColor }) => (
  <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
    <div className="space-y-1">
      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{title}</p>
      <p className="text-2xl font-black text-slate-800">{value}</p>
      {badgeText && (
        <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded ${badgeColor}`}>
          {badgeText}
        </span>
      )}
    </div>
    <div className="p-3 bg-slate-50 rounded-xl text-slate-400">
      {icon}
    </div>
  </div>
);
export default MetricCard;