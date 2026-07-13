import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Users,
  Shield,
  UserCheck,
  UserX,
  Plus,
  Search,
  Edit2,
  Trash2,
  RotateCcw,
  X,
  CheckCircle,
  AlertCircle,
  Loader,
  Mail,
  RefreshCw,
  Phone,
  Filter,
  Lock,
  ChevronDown,
  Info,
  Copy,
  Check
} from "lucide-react";

// ==========================================
// AXIOS API CONFIGURATION (Direct Mapping)
// ==========================================
const API = "http://localhost:8080/api/auth";

const authHeader = () => {
  const token = localStorage.getItem("token") || "demo_token_villgo";
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
  };
};

const apiService = {
  getActiveUsers: () => axios.get(`${API}/admin/active`, authHeader()),
  getDeletedUsers: () => axios.get(`${API}/admin/deleted`, authHeader()),
  getUser: (id) => axios.get(`${API}/get-one-admin/${id}`, authHeader()),
  createUser: (data) => axios.post(`${API}/admin/create-admin`, data, authHeader()),
  updateUser: (id, data) => axios.put(`${API}/admin/update/${id}`, data, authHeader()),
  deleteUser: (id) => axios.put(`${API}/admin/soft-delete/${id}`, {}, authHeader()),
  restoreUser: (id) => axios.put(`${API}/restore-admin/${id}`, {}, authHeader())
};

// Static fallback dataset for seamless sandboxed simulation
const OFFLINE_DEMO_DATA = [
  { id: 101, name: "Harish Vaistra", email: "harish@villgo.com", role: "SUPER_ADMIN", mobile: "+91 98765 43210", status: "ACTIVE" },
  { id: 102, name: "Rajesh Kumar", email: "rajesh.wholesaler@gmail.com", role: "USER", mobile: "+91 90123 45678", status: "ACTIVE" },
  { id: 103, name: "Amit Patel", email: "amit.transporter@villgo.com", role: "ADMIN", mobile: "+91 91234 56789", status: "ACTIVE" },
  { id: 104, name: "Vijay Solanki", email: "vijay.retailer@yahoo.com", role: "USER", mobile: "+91 92345 67890", status: "ACTIVE" },
  { id: 105, name: "Suresh Meena", email: "suresh.deleted@villgo.com", role: "ADMIN", mobile: "+91 93456 78901", status: "DELETED" }
];

export default function UserTable({ isDark = false }) {
  // Core application state
  const [users, setUsers] = useState([]);
  const [simulatedData, setSimulatedData] = useState(OFFLINE_DEMO_DATA);
  const [isDemoMode, setIsDemoMode] = useState(true); 
  const [activeTab, setActiveTab] = useState("active"); // 'active' or 'deleted'
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // Modals state
  const [modalType, setModalType] = useState(null); // 'add' | 'edit' | 'delete_confirm' | 'restore_confirm'
  const [selectedUser, setSelectedUser] = useState(null);

  // Form Fields State
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    mobile: "",
    role: "ADMIN",
    password: ""
  });

  // Display clean, professional auto-expiring toast alert
  const triggerToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Clipboard copy function for IDs & emails
  const copyToClipboard = (text, id) => {
    try {
      const el = document.createElement('textarea');
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopiedId(id);
      triggerToast("Copied to clipboard!", "success");
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  // ----------------------------------------------------
  // FETCH CONTROLLER ACTIONS
  // ----------------------------------------------------
  
  const fetchActiveList = async () => {
    setLoading(true);
    if (isDemoMode) {
      const active = simulatedData.filter(u => u.status === "ACTIVE");
      setUsers(active);
      setLoading(false);
      return;
    }

    try {
      const response = await apiService.getActiveUsers();
      const list = response.data?.data || response.data?.body || response.data;
      setUsers(Array.isArray(list) ? list : []);
      triggerToast("Active accounts list synced successfully!", "success");
    } catch (error) {
      console.error(error);
      triggerToast("Backend server connection failed. Switching to Simulation Mode.", "error");
      setUsers(simulatedData.filter(u => u.status === "ACTIVE"));
    } finally {
      setLoading(false);
    }
  };

  const fetchDeletedList = async () => {
    setLoading(true);
    if (isDemoMode) {
      const deleted = simulatedData.filter(u => u.status === "DELETED");
      setUsers(deleted);
      setLoading(false);
      return;
    }

    try {
      const response = await apiService.getDeletedUsers();
      const list = response.data?.data || response.data?.body || response.data;
      setUsers(Array.isArray(list) ? list : []);
      triggerToast("Recycle bin database synchronized!", "success");
    } catch (error) {
      console.error(error);
      triggerToast("Failed to fetch deleted records. Please check authorization token.", "error");
      setUsers(simulatedData.filter(u => u.status === "DELETED"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "active") {
      fetchActiveList();
    } else {
      fetchDeletedList();
    }
  }, [activeTab, isDemoMode, simulatedData]);

  // Create Submit Action
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      triggerToast("Please fill in all mandatory (*) fields", "error");
      return;
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      password: formData.password,
      role: formData.role
    };

    if (isDemoMode) {
      const newId = Math.max(...simulatedData.map(u => u.id)) + 1;
      const newUser = { id: newId, ...payload, status: "ACTIVE" };
      setSimulatedData([newUser, ...simulatedData]);
      triggerToast(`Account created for ${formData.name}!`, "success");
      setModalType(null);
      resetForm();
      return;
    }

    setLoading(true);
    try {
      const response = await apiService.createUser(payload);
      triggerToast(response.data?.message || "Administrator registered successfully!", "success");
      setModalType(null);
      resetForm();
      fetchActiveList();
    } catch (error) {
      triggerToast(error.response?.data?.message || "Could not complete administrator creation.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Update Submit Action
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      triggerToast("Name and email address are required fields", "error");
      return;
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      role: formData.role
    };

    if (isDemoMode) {
      const updated = simulatedData.map(u => u.id === selectedUser.id ? { ...u, ...payload } : u);
      setSimulatedData(updated);
      triggerToast(`Profile changes saved for ${formData.name}!`, "success");
      setModalType(null);
      resetForm();
      return;
    }

    setLoading(true);
    try {
      const response = await apiService.updateUser(selectedUser.id, payload);
      triggerToast(response.data?.message || "Profile parameters updated successfully!", "success");
      setModalType(null);
      resetForm();
      activeTab === "active" ? fetchActiveList() : fetchDeletedList();
    } catch (error) {
      triggerToast(error.response?.data?.message || "Server rejected profile modifications.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Soft Delete Action
  const handleSoftDelete = async () => {
    if (!selectedUser) return;

    if (isDemoMode) {
      const updated = simulatedData.map(u => u.id === selectedUser.id ? { ...u, status: "DELETED" } : u);
      setSimulatedData(updated);
      triggerToast(`${selectedUser.name} has been moved to the Recycle Bin.`, "success");
      setModalType(null);
      return;
    }

    setLoading(true);
    try {
      const response = await apiService.deleteUser(selectedUser.id);
      triggerToast(response.data?.message || `${selectedUser.name} deleted successfully!`, "success");
      setModalType(null);
      fetchActiveList();
    } catch (error) {
      triggerToast("Soft delete API mapping failed.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Restore Deleted User Action
  const handleRestore = async () => {
    if (!selectedUser) return;

    if (isDemoMode) {
      const updated = simulatedData.map(u => u.id === selectedUser.id ? { ...u, status: "ACTIVE" } : u);
      setSimulatedData(updated);
      triggerToast(`Restored ${selectedUser.name} back to the active console!`, "success");
      setModalType(null);
      return;
    }

    setLoading(true);
    try {
      const response = await apiService.restoreUser(selectedUser.id);
      triggerToast(response.data?.message || "Account restored to active directory!", "success");
      setModalType(null);
      fetchDeletedList();
    } catch (error) {
      triggerToast("Restoration request rejected.", "error");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ id: "", name: "", email: "", mobile: "", role: "ADMIN", password: "" });
    setSelectedUser(null);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setFormData({
      id: user.id || "",
      name: user.name || "",
      email: user.email || "",
      mobile: user.mobile || "",
      role: user.role || "ADMIN",
      password: ""
    });
    setModalType("edit");
  };

  const filteredUsers = users.filter(u => {
    const term = searchQuery.toLowerCase();
    const matchesSearch = 
      (u.name || "").toLowerCase().includes(term) ||
      (u.email || "").toLowerCase().includes(term) ||
      (u.mobile || "").toLowerCase().includes(term) ||
      (u.id || "").toString().includes(term);

    const matchesRole = roleFilter === "ALL" || (u.role || "").toUpperCase() === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className={`p-4 transition-all duration-300 rounded-3xl ${
      isDark ? "bg-[#0b1329] text-white" : "bg-slate-50 text-slate-800"
    }`}>
      
      {/* Dynamic Status & Environment Config Panel */}
      <div className={`mb-6 p-5 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-4 transition-all ${
        isDark ? "bg-[#112140] border-slate-800" : "bg-white border-slate-200/80 shadow-sm"
      }`}>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex items-center justify-center">
            <div className={`p-3 rounded-2xl ${isDemoMode ? "bg-amber-500/10 text-amber-500" : "bg-sky-500/10 text-sky-500"}`}>
              <Users className="w-5 h-5" />
            </div>
            <div className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                isDemoMode ? "bg-amber-400" : "bg-sky-400"
              }`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 ${
                isDemoMode ? "bg-amber-500" : "bg-sky-500"
              }`}></span>
            </div>
          </div>
          <div>
            <h3 className="font-extrabold text-sm tracking-tight">System Environment</h3>
            <p className="text-[11px] text-slate-400">Directly communicating with backend security controller mappings.</p>
          </div>
        </div>

        {/* Demo switcher & action controls */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          <div className="flex items-center bg-slate-900/40 p-1 rounded-xl border border-slate-700/20">
            <button
              onClick={() => setIsDemoMode(true)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                isDemoMode 
                  ? "bg-amber-500 text-slate-950 font-black shadow-md" 
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Demo Sandbox
            </button>
            <button
              onClick={() => setIsDemoMode(false)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                !isDemoMode 
                  ? "bg-sky-500 text-white font-black shadow-md" 
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Live API Mode
            </button>
          </div>
          
          <button
            onClick={() => activeTab === "active" ? fetchActiveList() : fetchDeletedList()}
            className={`p-2.5 rounded-xl transition-all border ${
              isDark ? "bg-slate-800 border-slate-700 hover:bg-slate-700 text-white" : "bg-white hover:bg-slate-100 border-slate-200 shadow-sm"
            }`}
            title="Refresh Account Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-sky-500" : "text-slate-400"}`} />
          </button>
        </div>
      </div>

      {/* Main Table Interface Box */}
      <div className={`rounded-3xl border overflow-hidden ${
        isDark ? "bg-[#101e3a] border-slate-800/80 shadow-2xl" : "bg-white border-slate-200 shadow-md"
      }`}>
        
        {/* Responsive Filter & Tools Header Toolbar */}
        <div className={`p-5 border-b flex flex-col lg:flex-row items-center justify-between gap-4 ${
          isDark ? "border-slate-800 bg-[#0d1629]" : "border-slate-100 bg-slate-50/50"
        }`}>
          
          {/* Active tab selectors */}
          <div className="flex bg-slate-950/20 dark:bg-slate-950/40 p-1 rounded-2xl border border-slate-700/20 w-full lg:w-auto">
            <button
              onClick={() => { setActiveTab("active"); setRoleFilter("ALL"); }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all w-full lg:w-auto justify-center ${
                activeTab === "active" 
                  ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/15" 
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <UserCheck className="w-4 h-4" />
              Active Directory
            </button>
            <button
              onClick={() => { setActiveTab("deleted"); setRoleFilter("ALL"); }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all w-full lg:w-auto justify-center ${
                activeTab === "deleted" 
                  ? "bg-rose-600 text-white shadow-lg" 
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <UserX className="w-4 h-4" />
              Recycle Bin
            </button>
          </div>

          {/* Filtering toolset */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            
            {/* Search inputs */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search name, email, phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs outline-none transition-all ${
                  isDark 
                    ? "bg-slate-800 border border-slate-700 focus:border-sky-500 text-white focus:ring-1 focus:ring-sky-500" 
                    : "bg-white border border-slate-200 focus:border-sky-500 focus:ring-1 focus:ring-sky-400"
                }`}
              />
            </div>

            {/* Dropdown filters */}
            <div className="relative w-full sm:w-44">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className={`w-full px-3 py-2.5 rounded-xl text-xs outline-none appearance-none cursor-pointer ${
                  isDark ? "bg-slate-800 border border-slate-700 text-white" : "bg-white border border-slate-200 shadow-sm"
                }`}
              >
                <option value="ALL">All Roles</option>
                <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                <option value="ADMIN">ADMIN</option>
                <option value="USER">USER</option>
              </select>
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>

            {/* Add administrator button */}
            <button
              onClick={() => { resetForm(); setModalType("add"); }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black tracking-wide text-slate-950 bg-sky-400 hover:bg-sky-500 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md shadow-sky-400/20"
            >
              <Plus className="w-4 h-4 stroke-[3px]" />
              New Admin
            </button>
          </div>
        </div>

        {/* Loading status wrapper */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader className="w-9 h-9 animate-spin text-sky-500" />
            <p className="text-xs font-bold text-sky-500 tracking-wider font-mono">Synchronizing directories with local Spring Boot server...</p>
          </div>
        ) : (
          <>
            {/* Desktop Table - Hidden on Mobile viewports */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className={`text-[11px] font-extrabold uppercase tracking-wider border-b transition-all ${
                    isDark ? "bg-[#0b1222]/80 border-slate-800 text-slate-400" : "bg-slate-50 text-slate-500 border-slate-100"
                  }`}>
                    <th className="p-4 pl-6">ID & Full Name</th>
                    <th className="p-4">Secure Email Address</th>
                    <th className="p-4">Contact Phone</th>
                    <th className="p-4 text-center">Designated Role</th>
                    <th className="p-4 text-right pr-6">Administrative Actions</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? "divide-slate-800/60" : "divide-slate-100"}`}>
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="p-16 text-center text-slate-400">
                        <div className="flex flex-col items-center justify-center gap-3">
                          <Users className="w-10 h-10 text-slate-500" />
                          <p className="text-sm font-extrabold text-slate-300">No Matching Users Found</p>
                          <p className="text-xs text-slate-500 max-w-sm">There are no records matching your current filter settings.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr 
                        key={user.id} 
                        className={`text-xs transition-colors duration-200 ${
                          isDark ? "hover:bg-slate-800/30" : "hover:bg-slate-50/50"
                        }`}
                      >
                        {/* Name & ID */}
                        <td className="p-4 pl-6">
                          <div className="flex items-center gap-3.5">
                            <div className={`w-9.5 h-9.5 rounded-xl font-black flex items-center justify-center uppercase border ${
                              user.role === "SUPER_ADMIN" 
                                ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" 
                                : user.role === "ADMIN" 
                                ? "bg-sky-500/10 text-sky-400 border-sky-500/20" 
                                : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            }`}>
                              {user.name ? user.name.slice(0, 2) : "US"}
                            </div>
                            <div>
                              <p className="font-extrabold text-sm text-slate-200 dark:text-slate-100">{user.name}</p>
                              <div className="flex items-center gap-1 mt-0.5">
                                <span className="text-[10px] text-slate-400 font-mono">UID: #{user.id}</span>
                                <button 
                                  onClick={() => copyToClipboard(user.id.toString(), `uid-${user.id}`)}
                                  className="text-slate-500 hover:text-sky-500 transition-colors"
                                  title="Copy UID"
                                >
                                  {copiedId === `uid-${user.id}` ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                                </button>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Email Address */}
                        <td className="p-4">
                          <div className="flex items-center gap-1.5 text-slate-300 dark:text-slate-300 font-semibold font-mono">
                            <Mail className="w-3.5 h-3.5 text-slate-500" />
                            <span>{user.email}</span>
                          </div>
                        </td>

                        {/* Contact */}
                        <td className="p-4 font-mono text-slate-300 dark:text-slate-400">
                          <div className="flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-slate-500" />
                            <span>{user.mobile || "Not Provided"}</span>
                          </div>
                        </td>

                        {/* Role representation badges */}
                        <td className="p-4 text-center">
                          <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-black tracking-wide uppercase border ${
                            user.role === "SUPER_ADMIN" 
                              ? "bg-indigo-500/15 text-indigo-400 border-indigo-500/25" 
                              : user.role === "ADMIN" 
                              ? "bg-sky-500/15 text-sky-400 border-sky-500/25" 
                              : "bg-emerald-500/15 text-emerald-400 border-emerald-500/25"
                          }`}>
                            {user.role}
                          </span>
                        </td>

                        {/* Action buttons list */}
                        <td className="p-4 text-right pr-6">
                          <div className="flex items-center justify-end gap-2">
                            {activeTab === "active" ? (
                              <>
                                <button
                                  onClick={() => openEditModal(user)}
                                  className={`p-2 rounded-xl border transition-all ${
                                    isDark 
                                      ? "bg-slate-800 border-slate-700 hover:bg-slate-700 text-sky-400" 
                                      : "bg-sky-50 border-sky-100 hover:bg-sky-100 text-sky-600 shadow-sm"
                                  }`}
                                  title="Edit user profile"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => { setSelectedUser(user); setModalType("delete_confirm"); }}
                                  className={`p-2 rounded-xl border transition-all ${
                                    isDark 
                                      ? "bg-slate-800 border-slate-700 hover:bg-slate-700 text-rose-400 hover:border-rose-500/50" 
                                      : "bg-rose-50 border-rose-100 hover:bg-rose-100 text-rose-600 shadow-sm"
                                  }`}
                                  title="Soft Delete Account"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => { setSelectedUser(user); setModalType("restore_confirm"); }}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-black tracking-wide border transition-all ${
                                  isDark 
                                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20" 
                                    : "bg-emerald-50 border-emerald-100 hover:bg-emerald-100 text-emerald-600 shadow-sm"
                                }`}
                              >
                                <RotateCcw className="w-3.5 h-3.5" />
                                Restore
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile View - Sleek Card Grid layout for optimal responsive viewing */}
            <div className="block md:hidden p-4 space-y-4">
              {filteredUsers.length === 0 ? (
                <div className="text-center py-10 text-slate-400">
                  <Users className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                  <p className="text-sm font-bold">No Matching Records</p>
                </div>
              ) : (
                filteredUsers.map((user) => (
                  <div 
                    key={user.id} 
                    className={`p-4 rounded-2xl border transition-all ${
                      isDark ? "bg-[#132240] border-slate-800" : "bg-slate-50/50 border-slate-100 shadow-sm"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-9.5 h-9.5 rounded-xl font-black flex items-center justify-center uppercase border ${
                          user.role === "SUPER_ADMIN" 
                            ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" 
                            : user.role === "ADMIN" 
                            ? "bg-sky-500/10 text-sky-400 border-sky-500/20" 
                            : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        }`}>
                          {user.name ? user.name.slice(0, 2) : "US"}
                        </div>
                        <div>
                          <p className="font-extrabold text-sm text-slate-200 dark:text-slate-100">{user.name}</p>
                          <span className="text-[10px] text-slate-400 font-mono">UID: #{user.id}</span>
                        </div>
                      </div>

                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-black tracking-wide uppercase border ${
                        user.role === "SUPER_ADMIN" 
                          ? "bg-indigo-500/15 text-indigo-400 border-indigo-500/25" 
                          : user.role === "ADMIN" 
                          ? "bg-sky-500/15 text-sky-400 border-sky-500/25" 
                          : "bg-emerald-500/15 text-emerald-400 border-emerald-500/25"
                      }`}>
                        {user.role}
                      </span>
                    </div>

                    <div className="space-y-2 border-t border-b py-3 my-3 border-slate-700/10 dark:border-slate-800/40 text-xs">
                      <div className="flex items-center gap-2 text-slate-300">
                        <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="truncate">{user.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span>{user.mobile || "Not Provided"}</span>
                      </div>
                    </div>

                    {/* Action buttons with high tap targets */}
                    <div className="flex items-center justify-end gap-2 pt-1">
                      {activeTab === "active" ? (
                        <>
                          <button
                            onClick={() => openEditModal(user)}
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border-sky-500/20 w-1/2 justify-center"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            Edit Profile
                          </button>
                          <button
                            onClick={() => { setSelectedUser(user); setModalType("delete_confirm"); }}
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border-rose-500/20 w-1/2 justify-center"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => { setSelectedUser(user); setModalType("restore_confirm"); }}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black tracking-wide border transition-all bg-emerald-500/10 border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-400 w-full justify-center"
                        >
                          <RotateCcw className="w-4 h-4" />
                          Restore Account
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {/* Database parameters footer */}
        <div className={`p-4 text-center text-xs border-t transition-colors duration-300 ${
          isDark ? "border-slate-800 bg-[#0d1629] text-slate-400" : "bg-slate-50 text-slate-500 border-slate-100"
        }`}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
            <span className="font-semibold text-slate-500 dark:text-slate-400">Endpoint Mapping:</span>
            <span className="font-mono bg-slate-900/40 text-sky-400 px-2 py-0.5 rounded border border-slate-700/40 text-[10px]">
              {isDemoMode ? "IN_MEMORY_PREVIEW" : `${API}/admin/*`}
            </span>
          </div>
        </div>
      </div>

      {/* ==========================================
          MODALS DESIGN SYSTEM FOR LIVE ACTIONS
          ========================================== */}

      {/* 1. Modal: Create Admin / User */}
      {modalType === "add" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fadeIn">
          <div className={`w-full max-w-lg rounded-3xl border overflow-hidden p-6 shadow-2xl transition-all ${
            isDark ? "bg-[#0f172a] border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800"
          }`}>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/60">
              <div className="flex items-center gap-2.5">
                <Plus className="w-5 h-5 text-sky-400" />
                <h3 className="text-base font-extrabold tracking-tight">Create Admin Account</h3>
              </div>
              <button onClick={() => setModalType(null)} className="p-1.5 hover:bg-slate-800 rounded-xl transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Enter administrator full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full p-3 rounded-xl text-xs outline-none transition-all ${
                    isDark ? "bg-slate-900 border border-slate-800 text-white focus:border-sky-500" : "bg-slate-50 border text-slate-950 focus:border-sky-500"
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. name@villgo.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full p-3 rounded-xl text-xs outline-none transition-all ${
                      isDark ? "bg-slate-900 border border-slate-800 text-white focus:border-sky-500" : "bg-slate-50 border text-slate-950 focus:border-sky-500"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Mobile Number</label>
                  <input
                    type="text"
                    placeholder="Enter phone mobile"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className={`w-full p-3 rounded-xl text-xs outline-none transition-all ${
                      isDark ? "bg-slate-900 border border-slate-800 text-white focus:border-sky-500" : "bg-slate-50 border text-slate-950 focus:border-sky-500"
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Secure Password *</label>
                <input
                  type="password"
                  required
                  placeholder="Create a strong account password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`w-full p-3 rounded-xl text-xs outline-none transition-all ${
                    isDark ? "bg-slate-900 border border-slate-800 text-white focus:border-sky-500" : "bg-slate-50 border text-slate-950 focus:border-sky-500"
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Assigned System Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className={`w-full p-3 rounded-xl text-xs outline-none transition-all ${
                    isDark ? "bg-slate-900 border border-slate-800 text-white" : "bg-slate-50 border"
                  }`}
                >
                  <option value="ADMIN">ADMIN</option>
                  <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                  <option value="USER">USER</option>
                </select>
                <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/25 p-3 rounded-xl mt-3">
                  <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-amber-500 font-bold leading-relaxed">
                    Security Note: Only SUPER_ADMIN is authorized to register other administrators on the backend database.
                  </p>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800/60">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-extrabold text-slate-950 bg-sky-400 hover:bg-sky-500 shadow-lg shadow-sky-400/20"
                >
                  Save Administrator
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Modal: Edit User details */}
      {modalType === "edit" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fadeIn">
          <div className={`w-full max-w-lg rounded-3xl border overflow-hidden p-6 shadow-2xl transition-all ${
            isDark ? "bg-[#0f172a] border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800"
          }`}>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/60">
              <div className="flex items-center gap-2.5">
                <Edit2 className="w-5 h-5 text-sky-400" />
                <h3 className="text-base font-extrabold tracking-tight">Update User Credentials</h3>
              </div>
              <button onClick={() => setModalType(null)} className="p-1.5 hover:bg-slate-800 rounded-xl transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full p-3 rounded-xl text-xs outline-none transition-all ${
                    isDark ? "bg-slate-900 border border-slate-800 text-white focus:border-sky-500" : "bg-slate-50 border text-slate-950 focus:border-sky-500"
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full p-3 rounded-xl text-xs outline-none transition-all ${
                      isDark ? "bg-slate-900 border border-slate-800 text-white focus:border-sky-500" : "bg-slate-50 border text-slate-950 focus:border-sky-500"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Contact Number</label>
                  <input
                    type="text"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className={`w-full p-3 rounded-xl text-xs outline-none transition-all ${
                      isDark ? "bg-slate-900 border border-slate-800 text-white focus:border-sky-500" : "bg-slate-50 border text-slate-950 focus:border-sky-500"
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Designated System Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className={`w-full p-3 rounded-xl text-xs outline-none transition-all ${
                    isDark ? "bg-slate-900 border border-slate-800 text-white" : "bg-slate-50 border"
                  }`}
                >
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                </select>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800/60">
                <button
                  type="button"
                  onClick={() => setModalType(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-extrabold text-slate-950 bg-sky-400 hover:bg-sky-500 shadow-lg shadow-sky-400/20"
                >
                  Update User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Modal: Delete Confirm Modal */}
      {modalType === "delete_confirm" && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fadeIn">
          <div className={`w-full max-w-md rounded-3xl border overflow-hidden p-6 shadow-2xl transition-all ${
            isDark ? "bg-[#0f172a] border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800"
          }`}>
            <div className="flex flex-col items-center text-center p-2">
              <div className="w-14 h-14 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-4 border border-rose-500/20">
                <Trash2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-black tracking-tight">Delete Account?</h3>
              <p className="text-xs text-slate-400 mt-2">
                Are you sure you want to move <span className="font-bold text-sky-400">"{selectedUser.name}"</span> to the Recycle Bin directory?
              </p>
              <p className="text-[10px] text-slate-500 mt-2 font-mono bg-slate-900/40 px-3 py-1 rounded-lg border border-slate-800/50">
                Spring Mapping: PUT /admin/soft-delete/{selectedUser.id}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setModalType(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 w-1/2"
              >
                No, Keep Account
              </button>
              <button
                type="button"
                onClick={handleSoftDelete}
                className="px-4 py-2.5 rounded-xl text-xs font-extrabold text-white bg-rose-600 hover:bg-rose-500 shadow-lg shadow-rose-600/20 w-1/2"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Modal: Restore Deleted Confirm Modal */}
      {modalType === "restore_confirm" && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fadeIn">
          <div className={`w-full max-w-md rounded-3xl border overflow-hidden p-6 shadow-2xl transition-all ${
            isDark ? "bg-[#0f172a] border-slate-800 text-white" : "bg-white border-slate-200 text-slate-800"
          }`}>
            <div className="flex flex-col items-center text-center p-2">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4 border border-emerald-500/20">
                <RotateCcw className="w-7 h-7 animate-spin-reverse" />
              </div>
              <h3 className="text-lg font-black tracking-tight">Restore User Account</h3>
              <p className="text-xs text-slate-400 mt-2">
                Are you sure you want to restore <span className="font-bold text-sky-400">"{selectedUser.name}"</span> back to the active tracking panel?
              </p>
              <p className="text-[10px] text-slate-500 mt-2 font-mono bg-slate-900/40 px-3 py-1 rounded-lg border border-slate-800/50">
                Spring Mapping: PUT /restore-admin/{selectedUser.id}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setModalType(null)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 w-1/2"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleRestore}
                className="px-4 py-2.5 rounded-xl text-xs font-extrabold text-slate-950 bg-emerald-400 hover:bg-emerald-400 shadow-lg shadow-emerald-400/20 w-1/2"
              >
                Restore Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Toast System */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-slideUp">
          <div className={`p-4 rounded-2xl border shadow-xl flex items-start gap-3 text-xs font-bold transition-all duration-300 ${
            toast.type === "error"
              ? "bg-rose-500/10 border-rose-500/25 text-rose-400"
              : "bg-emerald-500/10 border-emerald-500/25 text-emerald-400"
          }`}>
            <div className="mt-0.5">
              {toast.type === "error" ? <AlertCircle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
            </div>
            <div className="flex-1">
              <p className="font-black">Villgo Service Alerts</p>
              <p className="text-slate-300 font-medium text-[11px] mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
            <button onClick={() => setToast(null)} className="text-slate-400 hover:text-slate-200">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}