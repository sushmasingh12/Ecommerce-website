import React, { useState } from 'react';

const UpdateStatusModal = ({ isOpen, onClose, orderId }) => {
  const [selectedStatus, setSelectedStatus] = useState('Shipped');
  const [notifyCustomer, setNotifyCustomer] = useState(true);

  if (!isOpen) return null;

  const statuses = [
    { id: 'Packed', label: 'Packed', sublabel: 'Ready for pickup', icon: 'inventory_2' },
    { id: 'Shipped', label: 'Shipped', sublabel: 'In transit to buyer', icon: 'local_shipping' },
    { id: 'Out for Delivery', label: 'Out for Delivery', sublabel: 'Near destination', icon: 'directions_run' },
    { id: 'Delivered', label: 'Delivered', sublabel: 'Success completion', icon: 'task_alt' },
    { id: 'Cancelled', label: 'Cancelled', sublabel: 'Order voided', icon: 'cancel', error: true },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-on-surface/10 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
      {/* Modal Container */}
      <div className="glass-modal w-full max-w-2xl rounded-2xl ambient-shadow overflow-hidden flex flex-col border border-outline-variant/15 animate-in zoom-in-95 duration-300">
        {/* Modal Header */}
        <div className="px-8 pt-8 pb-6 flex justify-between items-start border-b border-surface-container">
          <div>
            <h1 className="text-2xl font-black tracking-tighter text-on-surface">Update Order Status</h1>
            <p className="text-on-surface-variant font-medium tracking-tight">Order #{orderId || 'ORD-94210'}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-on-surface-variant">close</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="px-8 py-6 space-y-8 overflow-y-auto max-h-[70vh] no-scrollbar">
          {/* Progress Stepper */}
          <div className="relative py-4">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-surface-container-highest -translate-y-1/2 z-0"></div>
            {/* Active Progress Line */}
            <div className="absolute top-1/2 left-0 w-1/4 h-0.5 bg-primary -translate-y-1/2 z-0"></div>
            <div className="relative z-10 flex justify-between">
              {[
                { label: 'Paid', icon: 'check', completed: true },
                { label: 'Processing', current: true },
                { label: 'Shipped', icon: 'local_shipping' },
                { label: 'Delivered', icon: 'package_2' }
              ].map((step, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-sm ${
                    step.completed ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' :
                    step.current ? 'bg-white border-4 border-primary text-primary' :
                    'bg-surface-container-highest text-on-surface-variant'
                  }`}>
                    {step.completed ? (
                      <span className="material-symbols-outlined text-sm fill-current">check</span>
                    ) : step.current ? (
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    ) : (
                      <span className="material-symbols-outlined text-sm">{step.icon}</span>
                    )}
                  </div>
                  <span className={`mt-2 text-[10px] font-bold tracking-widest uppercase ${
                    step.completed || step.current ? 'text-primary' : 'text-on-secondary-container'
                  }`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Status Selection */}
          <section className="space-y-4">
            <label className="text-xs font-bold tracking-widest uppercase text-on-secondary-container">Select New Status</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {statuses.map((status) => (
                <button
                  key={status.id}
                  onClick={() => setSelectedStatus(status.id)}
                  className={`flex items-center gap-3 p-4 rounded-xl transition-all text-left group border-2 ${
                    selectedStatus === status.id 
                      ? 'bg-white border-primary shadow-md' 
                      : 'bg-surface-container-low border-transparent hover:border-outline-variant/30'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    selectedStatus === status.id
                      ? 'bg-primary/10 text-primary'
                      : `bg-surface-container-high text-on-surface-variant ${status.error ? 'group-hover:bg-error/10 group-hover:text-error' : 'group-hover:bg-primary/10 group-hover:text-primary'}`
                  }`}>
                    <span className={`material-symbols-outlined ${selectedStatus === status.id ? 'fill-current' : ''}`}>{status.icon}</span>
                  </div>
                  <div className="flex-1">
                    <span className="block font-bold text-sm text-on-surface">{status.label}</span>
                    <span className="text-[11px] text-on-surface-variant">{status.sublabel}</span>
                  </div>
                  {selectedStatus === status.id && (
                    <div className="absolute top-2 right-2">
                      <span className="material-symbols-outlined text-primary text-lg fill-current">check_circle</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* Conditional Shipped Fields */}
          {selectedStatus === 'Shipped' && (
            <div className="p-6 rounded-xl bg-surface-container-low space-y-6 border border-outline-variant/10 animate-in slide-in-from-top-2 duration-300">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                <h3 className="text-sm font-bold text-on-surface tracking-tight">Shipping Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold tracking-widest uppercase text-on-secondary-container">Carrier</label>
                  <div className="relative">
                    <select className="w-full bg-surface-container-lowest border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/10 appearance-none outline-none">
                      <option>DHL Express</option>
                      <option>FedEx Priority</option>
                      <option>UPS Global</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-lg">expand_more</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold tracking-widest uppercase text-on-secondary-container">Tracking Number</label>
                  <input 
                    className="w-full bg-surface-container-lowest border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/10 placeholder:text-outline-variant outline-none" 
                    placeholder="e.g. DHL9823410293" 
                    type="text"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Additional Options */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold tracking-widest uppercase text-on-secondary-container">Internal Note (Optional)</label>
              <textarea 
                className="w-full bg-surface-container-low border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary/10 placeholder:text-outline-variant resize-none outline-none" 
                placeholder="Add a reason for the status change or internal notes for staff..." 
                rows="3"
              ></textarea>
            </div>
            <label className="flex items-center gap-4 cursor-pointer group p-4 rounded-xl border border-transparent hover:bg-surface-container-low transition-all">
              <div className="relative flex items-center">
                <input 
                  type="checkbox"
                  checked={notifyCustomer}
                  onChange={(e) => setNotifyCustomer(e.target.checked)}
                  className="peer h-5 w-5 rounded border-outline-variant text-primary focus:ring-primary/20 transition-all cursor-pointer" 
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">Notify customer via email</span>
                <span className="text-[11px] text-on-surface-variant">Sends an automated update with tracking details to customer@email.com</span>
              </div>
            </label>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-6 bg-surface-container-low/50 border-t border-outline-variant/10">
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex-1 py-4 px-6 rounded-xl primary-gradient text-on-primary font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2">
              Update Status
              <span className="material-symbols-outlined text-lg">sync_alt</span>
            </button>
            <button 
              onClick={onClose}
              className="py-4 px-8 rounded-xl bg-surface-container-high text-on-surface font-bold text-sm hover:bg-surface-container-highest transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* AI Insight Chip */}
        <div className="px-8 py-3 bg-secondary-container/30 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-on-secondary-container">AI Recommendation: Order is prioritized for next-day air based on premium tier.</span>
        </div>
      </div>
    </div>
  );
};

export default UpdateStatusModal;
