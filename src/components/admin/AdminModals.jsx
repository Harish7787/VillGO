import React from 'react';

// ============================================================================
// SYSTEM MODALS ORCHESTRATOR FOR SAFE PLATFORM CRUD OPERATIONS
// ============================================================================
export default function AdminModals({
  modalMode,
  modalTarget,
  formData,
  setFormData,
  onClose,
  onSubmit,
  users,
  themeClasses
}) {
  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className={`${themeClasses.panel} border rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-zoom-in`}>
        
        {/* Header */}
        <div className={`p-6 border-b ${themeClasses.border} flex justify-between items-center bg-slate-100/30 dark:bg-slate-800/30`}>
          <h4 className="font-black text-sm capitalize">{modalMode} {modalTarget} Fields</h4>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-650 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
            <AdminIcons.X />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={onSubmit} className="p-6 space-y-4 text-xs">
          
          {/* USER CRUD MODAL */}
          {modalTarget === 'user' && (
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Company / Retailer Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full border p-3 rounded-xl ${themeClasses.input}`}
                  placeholder="e.g. Radhe Trading Facility"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Mobile Contact Phone</label>
                <input 
                  type="text" 
                  required
                  value={formData.mobile || ''}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className={`w-full border p-3 rounded-xl ${themeClasses.input}`}
                  placeholder="e.g. 9876543210"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Role Allocation</label>
                  <select 
                    value={formData.role || 'Retailer'}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className={`w-full border p-3 rounded-xl font-bold ${themeClasses.input}`}
                  >
                    <option value="Retailer">Retailer (દુકાનદાર)</option>
                    <option value="Wholesaler">Wholesaler (વેપારી)</option>
                    <option value="Transfer">Transfer / Transport (ટ્રાન્સપોર્ટ)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Status Clearance</label>
                  <select 
                    value={formData.status || 'Active'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className={`w-full border p-3 rounded-xl font-bold ${themeClasses.input}`}
                  >
                    <option value="Active">Active</option>
                    <option value="Blocked">Blocked</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* PRODUCT CRUD MODAL */}
          {modalTarget === 'product' && (
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Product Title</label>
                <input 
                  type="text" 
                  required
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full border p-3 rounded-xl ${themeClasses.input}`}
                  placeholder="e.g. Premium Wheat"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Classification Category</label>
                  <input 
                    type="text" 
                    required
                    value={formData.category || ''}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className={`w-full border p-3 rounded-xl ${themeClasses.input}`}
                    placeholder="Flour, Grain, Oil"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Wholesale Pricing (INR)</label>
                  <input 
                    type="number" 
                    required
                    value={formData.price || ''}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className={`w-full border p-3 rounded-xl ${themeClasses.input}`}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Min Order Qty (MOQ)</label>
                  <input 
                    type="number" 
                    required
                    value={formData.moq || ''}
                    onChange={(e) => setFormData({ ...formData, moq: e.target.value })}
                    className={`w-full border p-3 rounded-xl ${themeClasses.input}`}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Warehouse stock reserve</label>
                  <input 
                    type="number" 
                    required
                    value={formData.stock || ''}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className={`w-full border p-3 rounded-xl ${themeClasses.input}`}
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Assigned Supplier Wholesaler</label>
                <select 
                  value={formData.wholesaler || 'Ambika Bulk Traders'}
                  onChange={(e) => setFormData({ ...formData, wholesaler: e.target.value })}
                  className={`w-full border p-3 rounded-xl font-bold ${themeClasses.input}`}
                >
                  {users.filter(u => u.role === 'Wholesaler').map(wholesaler => (
                    <option key={wholesaler.id} value={wholesaler.name}>{wholesaler.name}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* ORDER CRUD MODAL */}
          {modalTarget === 'order' && (
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Retailer Client</label>
                <select 
                  value={formData.retailer || 'Harish Provision Store'}
                  onChange={(e) => setFormData({ ...formData, retailer: e.target.value })}
                  className={`w-full border p-3 rounded-xl font-bold ${themeClasses.input}`}
                >
                  {users.filter(u => u.role === 'Retailer').map(ret => (
                    <option key={ret.id} value={ret.name}>{ret.name}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Trade Evaluation Value (₹)</label>
                  <input 
                    type="number" 
                    required
                    value={formData.total || ''}
                    onChange={(e) => setFormData({ ...formData, total: e.target.value })}
                    className={`w-full border p-3 rounded-xl ${themeClasses.input}`}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Fulfillment tracking status</label>
                  <select 
                    value={formData.status || 'Pending'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className={`w-full border p-3 rounded-xl font-bold ${themeClasses.input}`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Carrier Transporter</label>
                <select 
                  value={formData.transporter || 'None'}
                  onChange={(e) => setFormData({ ...formData, transporter: e.target.value })}
                  className={`w-full border p-3 rounded-xl font-bold ${themeClasses.input}`}
                >
                  <option value="None">None</option>
                  {users.filter(u => u.role === 'Transfer').map(transfer => (
                    <option key={transfer.id} value={transfer.name}>{transfer.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Delivery Instruction Notes</label>
                <input 
                  type="text" 
                  value={formData.deliveryNote || ''}
                  onChange={(e) => setFormData({ ...formData, deliveryNote: e.target.value })}
                  className={`w-full border p-3 rounded-xl ${themeClasses.input}`}
                  placeholder="e.g. Deliver before Friday evening"
                />
              </div>
            </div>
          )}

          {/* BROADCAST CRUD MODAL */}
          {modalTarget === 'broadcast' && (
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Notice Headline Title</label>
                <input 
                  type="text" 
                  required
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={`w-full border p-3 rounded-xl ${themeClasses.input}`}
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Message Detail Body</label>
                <textarea 
                  rows={4}
                  required
                  value={formData.message || ''}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full border p-3 rounded-xl ${themeClasses.input}`}
                />
              </div>
            </div>
          )}

          {/* COMPLAINT CRUD MODAL */}
          {modalTarget === 'complaint' && (
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Notice Grievance Title</label>
                <input 
                  type="text" 
                  required
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={`w-full border p-3 rounded-xl ${themeClasses.input}`}
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Damage Description Details</label>
                <textarea 
                  rows={4}
                  required
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={`w-full border p-3 rounded-xl ${themeClasses.input}`}
                />
              </div>
            </div>
          )}

          {/* Submit */}
          <button 
            type="submit" 
            className="w-full bg-sky-500 hover:bg-sky-600 text-slate-950 font-black text-xs py-3.5 rounded-xl transition-all shadow-md mt-4"
          >
            Commit Configuration Changes
          </button>
        </form>
      </div>
    </div>
  );
}