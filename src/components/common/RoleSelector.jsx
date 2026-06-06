import React from 'react';
const RoleSelector = ({ selectedRole, onChange }) => {
  const roles = [
    {
      id: 'retailer',
      title: 'Retailer',
      subtitle: 'Shop owner',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )
    },
    {
      id: 'wholesaler',
      title: 'Wholesaler',
      subtitle: 'Merchant',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    },
    {
      id: 'transfer',
      title: 'Transfer',
      subtitle: 'Transport',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      )
    }
  ];

  return (
    <div className="space-y-1.5">
      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Your Role in System</label>
      <div className="grid grid-cols-3 gap-2">
        {roles.map((r) => (
          <label
            key={r.id}
            className={`cursor-pointer border-2 rounded-2xl p-3 flex flex-col items-center justify-center gap-1.5 text-center transition-all ${
              selectedRole === r.id
                ? 'border-sky-500 bg-sky-50/40 text-sky-700'
                : 'border-slate-200 bg-slate-50/30 text-slate-500 hover:bg-slate-50'
            }`}
          >
            <input
              type="radio"
              name="regRole"
              value={r.id}
              checked={selectedRole === r.id}
              onChange={() => onChange(r.id)}
              className="sr-only"
            />
            {r.icon}
            <span className="text-xs font-bold block">{r.title}</span>
            <span className="text-[9px] text-slate-400 font-medium leading-tight">{r.subtitle}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RoleSelector;
