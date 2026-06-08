import React from 'react';

// ============================================================================
// 3. COMPLETE CRUD MODALS DISPATCH ENGINE (Products, Orders, Broadcasts)
// ============================================================================
export default function WholesalerModals({
  modalTarget,
  modalMode,
  formData,
  setFormData,
  handleCloseModal,
  handleFormSubmit,
  transporters,
  themeClasses
}) {
  if (!modalTarget || !modalMode) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className={`w-full max-w-lg rounded-2xl shadow-2xl p-6 border transition-all animate-scale-up ${themeClasses.panel}`}>
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-500/10">
          <h3 className="font-extrabold text-lg">
            {modalMode === 'add' ? 'Naveen Record Joda' : modalMode === 'edit' ? 'Record Details Badala' : 'Live Action Prompt'}
          </h3>
          <button onClick={handleCloseModal} className="p-1 rounded hover:bg-slate-500/10">
            ✕
          </button>
        </div>

        {/* 3.1 PRODUCT FORM CRUD VIEW */}
        {modalTarget === 'product' && (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Product Title</label>
                <input 
                  type="text" required 
                  value={formData.name || ''} 
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-3 py-2 text-sm rounded-lg border outline-none ${themeClasses.input}`} 
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Category</label>
                <select 
                  value={formData.category || 'Grains'} 
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className={`w-full px-3 py-2 text-sm rounded-lg border outline-none ${themeClasses.input}`}
                >
                  <option value="Grains">Grains</option>
                  <option value="Oil">Oil</option>
                  <option value="Flour">Flour</option>
                  <option value="Spices">Spices</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Unit Type (Bag/Tin)</label>
                <input 
                  type="text" required placeholder="e.g. Bag (25kg)"
                  value={formData.unit || ''} 
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  className={`w-full px-3 py-2 text-sm rounded-lg border outline-none ${themeClasses.input}`} 
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Wholesale price (₹)</label>
                <input 
                  type="number" required 
                  value={formData.price || ''} 
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  className={`w-full px-3 py-2 text-sm rounded-lg border outline-none ${themeClasses.input}`} 
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Initial Reserve Stock</label>
                <input 
                  type="number" required 
                  value={formData.stock || ''} 
                  onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                  className={`w-full px-3 py-2 text-sm rounded-lg border outline-none ${themeClasses.input}`} 
                />
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Minimum Order (MOQ)</label>
                <input 
                  type="number" required 
                  value={formData.moq || ''} 
                  onChange={(e) => setFormData({ ...formData, moq: parseInt(e.target.value) })}
                  className={`w-full px-3 py-2 text-sm rounded-lg border outline-none ${themeClasses.input}`} 
                />
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Description (Tapshil)</label>
                <textarea 
                  required rows="3"
                  value={formData.description || ''} 
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={`w-full px-3 py-2 text-sm rounded-lg border outline-none ${themeClasses.input}`} 
                ></textarea>
              </div>
            </div>

            <div className="pt-4 flex justify-end space-x-3 border-t border-slate-500/10">
              <button type="button" onClick={handleCloseModal} className="py-2 px-4 rounded-xl text-sm border hover:bg-slate-500/5 text-slate-400">Radd Kara</button>
              <button type="submit" className="py-2 px-4 rounded-xl text-sm font-bold bg-sky-500 hover:bg-sky-600 text-white shadow">Save Changes</button>
            </div>
          </form>
        )}

        {/* 3.2 TRANSPORTER ASSIGNMENT / DESPATCH FORM */}
        {modalTarget === 'order' && modalMode === 'assign' && (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-500/5 text-sm">
              <p className="text-xs font-bold uppercase text-slate-400">Order Ref</p>
              <h4 className="font-extrabold text-lg text-sky-500">{formData.orderId}</h4>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Available Transporters</label>
              <select 
                required
                onChange={(e) => setFormData({ ...formData, transporterName: e.target.value })}
                className={`w-full px-3 py-2 text-sm rounded-lg border outline-none ${themeClasses.input}`}
              >
                <option value="">-- Partner Select Kara --</option>
                {transporters.map((t) => (
                  <option key={t.id} value={t.name}>{t.name} ({t.vehicle})</option>
                ))}
              </select>
            </div>

            <div className="pt-4 flex justify-end space-x-3 border-t border-slate-500/10">
              <button type="button" onClick={handleCloseModal} className="py-2 px-4 rounded-xl text-sm border hover:bg-slate-500/5 text-slate-400">Radd Kara</button>
              <button type="submit" className="py-2 px-4 rounded-xl text-sm font-bold bg-sky-500 hover:bg-sky-600 text-white shadow">Confirm Dispatch</button>
            </div>
          </form>
        )}

        {/* 3.3 BROADCAST FORM */}
        {modalTarget === 'broadcast' && (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Campaign Title</label>
              <input 
                type="text" required 
                value={formData.title || ''} 
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={`w-full px-3 py-2 text-sm rounded-lg border outline-none ${themeClasses.input}`} 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Alert Type</label>
                <select 
                  value={formData.type || 'Offer'} 
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className={`w-full px-3 py-2 text-sm rounded-lg border outline-none ${themeClasses.input}`}
                >
                  <option value="Offer">Offer / Discount</option>
                  <option value="Update">Inventory Update</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Status</label>
                <select 
                  value={formData.status || 'Active'} 
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className={`w-full px-3 py-2 text-sm rounded-lg border outline-none ${themeClasses.input}`}
                >
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Broadcast Message</label>
              <textarea 
                required rows="3"
                value={formData.message || ''} 
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`w-full px-3 py-2 text-sm rounded-lg border outline-none ${themeClasses.input}`} 
              ></textarea>
            </div>

            <div className="pt-4 flex justify-end space-x-3 border-t border-slate-500/10">
              <button type="button" onClick={handleCloseModal} className="py-2 px-4 rounded-xl text-sm border hover:bg-slate-500/5 text-slate-400">Radd Kara</button>
              <button type="submit" className="py-2 px-4 rounded-xl text-sm font-bold bg-sky-500 hover:bg-sky-600 text-white shadow">Publish</button>
            </div>
          </form>
        )}

        {/* 3.4 MESSAGE COMPLAINT REPLY FORM */}
        {modalTarget === 'message' && modalMode === 'reply' && (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Your response message (Maza Uttar)</label>
              <textarea 
                required rows="4" placeholder="Write reply here..."
                value={formData.replyText || ''} 
                onChange={(e) => setFormData({ ...formData, replyText: e.target.value })}
                className={`w-full px-3 py-2 text-sm rounded-lg border outline-none ${themeClasses.input}`} 
              ></textarea>
            </div>

            <div className="pt-4 flex justify-end space-x-3 border-t border-slate-500/10">
              <button type="button" onClick={handleCloseModal} className="py-2 px-4 rounded-xl text-sm border hover:bg-slate-500/5 text-slate-400">Radd Kara</button>
              <button type="submit" className="py-2 px-4 rounded-xl text-sm font-bold bg-sky-500 hover:bg-sky-600 text-white shadow">Uttar Pathawa</button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}