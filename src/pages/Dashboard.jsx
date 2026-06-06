import React from 'react';
import MetricCard from '../components/common/MetricCard';

const Dashboard = ({ user, onLogout }) => {
  return (
    <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl shadow-slate-100/70 border border-slate-100 overflow-hidden">
      {/* Top Bar with User Info */}
      <div className="bg-gradient-to-r from-sky-500 to-indigo-600 p-6 sm:p-8 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-[10px] font-bold tracking-widest uppercase block w-max">
            {user.role} Dashboard
          </span>
          <h2 className="text-2xl font-bold">{user.businessName}</h2>
          <p className="text-sky-100 text-sm">Welcome back, {user.name} | Mobile: {user.mobile}</p>
        </div>
        <button
          onClick={onLogout}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition-all border border-white/20 self-start sm:self-center focus:outline-none"
        >
          Sign Out
        </button>
      </div>

      {/* Simulated Content Area */}
      <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50/50">
        
        {/* Left Column: Quick Actions Component Block */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <h3 className="font-bold text-sm tracking-wide text-slate-800 uppercase border-b pb-2 border-slate-100">Quick Actions</h3>
          
          {user.role === 'retailer' && (
            <div className="space-y-2">
              <button className="w-full py-2.5 px-4 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-sm focus:outline-none">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Find New Wholesalers
              </button>
              <button className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold rounded-xl text-xs transition-all focus:outline-none">
                View My Orders
              </button>
            </div>
          )}

          {user.role === 'wholesaler' && (
            <div className="space-y-2">
              <button className="w-full py-2.5 px-4 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-sm focus:outline-none">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Add New Product
              </button>
              <button className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold rounded-xl text-xs transition-all focus:outline-none">
                Process Pending Orders (3)
              </button>
            </div>
          )}

          {user.role === 'transfer' && (
            <div className="space-y-2">
              <button className="w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-sm focus:outline-none">
                Active Transports
              </button>
              <button className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold rounded-xl text-xs transition-all focus:outline-none">
                Find New Leads
              </button>
            </div>
          )}

          <div className="p-3 bg-sky-50 rounded-xl border border-sky-100 text-[11px] text-sky-800 leading-relaxed font-medium">
            📢 <b>SHWebCreatives Alert:</b> This dashboard is dynamically adapted for the role <b>{user.role}</b>. Reusable layout blocks are partitioned inside single JSX structures.
          </div>
        </div>

        {/* Right Columns: Main content */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Statistics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard
              title="Active Shipments"
              value="14"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1" />
                </svg>
              }
            />
            <MetricCard
              title="Completed Routes"
              value="112"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              }
            />
            <MetricCard
              title="Account Status"
              value="Verified"
              badgeText="Active Partner"
              badgeColor="text-emerald-700 bg-emerald-100"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              }
            />
          </div>

          {/* Notifications Panel */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
            <h3 className="font-bold text-xs tracking-wide text-slate-400 uppercase">Updates from Villgo Admin</h3>
            
            <div className="space-y-3">
              <div className="flex gap-3 items-start border-b pb-3 border-slate-50">
                <span className="w-2 h-2 rounded-full bg-sky-500 mt-1.5 shrink-0"></span>
                <div>
                  <h4 className="text-xs font-bold text-slate-700">Festival Sales Alert - High Freight Demand Expected!</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Prepare warehouse inventory. Freight rates might rise by 10% during Diwali week.</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                <div>
                  <h4 className="text-xs font-bold text-slate-700">Important System Upgrade on Sunday night</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">The Villgo payment settlement and tracking APIs will be under maintenance.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
export default Dashboard;