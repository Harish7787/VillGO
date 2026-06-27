import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import { useNavigate } from "react-router-dom";


export default function AdminLayout() {
  const [theme, setTheme] = useState("light");
  const [resolvedTheme, setResolvedTheme] = useState("light");
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(true);

  const [complaints, setComplaints] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const themeClasses =
    theme === "dark"
      ? {
        sidebar: "bg-slate-900 text-slate-100",
        border: "border-slate-800",
        sidebarActive: "bg-sky-500 text-slate-950",
        sidebarHover: "hover:bg-slate-800 hover:text-white",
        textMuted: "text-slate-400",
      }
      : {
        sidebar: "bg-white text-slate-800",
        border: "border-slate-200",
        sidebarActive: "bg-sky-500 text-white",
        sidebarHover: "hover:bg-sky-100 hover:text-sky-700",
        textMuted: "text-slate-500",
      };
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const pendingOrders = orders.filter(o => o.status === "Pending").length;

  const pendingWholesalers =
    users.filter(u => u.role === "Wholesaler" && !u.is_approved).length;

  const unresolvedComplaints =
    complaints.filter(c => c.status === "Pending").length;

  return (
    <div className="flex min-h-screen bg-slate-100">


      <AdminSidebar

        pendingWholesalers={pendingWholesalers}
        pendingOrders={pendingOrders}
        unresolvedComplaints={unresolvedComplaints}
        settingsOpen={settingsOpen}
        setSettingsOpen={setSettingsOpen}
        theme={theme}
        setTheme={setTheme}
        themeClasses={themeClasses}
        onLogout={onLogout}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <main className="flex-1">
 <div className={`md:hidden flex items-center justify-between p-4 border-b shrink-0 ${themeClasses.border} ${themeClasses.panel} sticky top-0 z-30 shadow-sm`}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-400 flex items-center justify-center font-black text-slate-950 shadow-md">
              VL
            </div>
            <div>
              <span className="text-base font-black tracking-wider text-sky-500 font-mono block leading-none">VL Villgo</span>
              <span className="text-[8px] text-slate-400 tracking-widest block uppercase font-black mt-1">Admin Panel</span>
            </div>
          </div>

          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2.5 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 active:scale-95 transition-all focus:outline-none"
            aria-label="Open Navigation Sidebar"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
       

        <Outlet />

      </main>
      {/* <div className="md:hidden flex items-center p-4 border-b">

      </div>
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main> */}

    </div>
  );
}