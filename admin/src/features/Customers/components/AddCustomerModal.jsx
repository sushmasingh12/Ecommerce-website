import React, { useState } from 'react';

const AddCustomerModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    sendInvite: true,
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
    tags: ['VIP', 'Wholesale'],
    notes: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-12">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      
      {/* Modal Container */}
      <div className="relative bg-surface-container-lowest w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="px-8 py-6 flex items-start justify-between border-b border-outline-variant/10">
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-on-surface">Add New Customer</h3>
            <p className="text-on-surface-variant text-sm mt-1">Enter customer details to create a new profile</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-surface-container-low rounded-full transition-colors text-on-surface-variant"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto px-8 py-8 space-y-10">
          {/* Basic Information */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-on-secondary-container bg-secondary-container px-2 py-0.5 rounded">Section 01</span>
              <h4 className="text-sm font-bold text-on-surface">Basic Information</h4>
            </div>
            <div className="flex gap-8 items-start">
              <div className="flex-shrink-0 group relative">
                <div className="w-24 h-24 rounded-full bg-surface-container-high flex items-center justify-center border-4 border-white shadow-md overflow-hidden transition-transform group-hover:scale-105">
                  <span className="material-symbols-outlined text-3xl text-outline">person</span>
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full border-2 border-white flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-sm">add_a_photo</span>
                </button>
              </div>
              <div className="flex-1 grid grid-cols-1 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-on-secondary-container">Full Name</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">badge</span>
                    <input 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low rounded-xl border-none focus:ring-2 focus:ring-primary/10 transition-all text-sm font-medium" 
                      placeholder="John Doe" 
                      type="text"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-on-secondary-container">Email Address</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">mail</span>
                      <input 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low rounded-xl border-none focus:ring-2 focus:ring-primary/10 transition-all text-sm font-medium" 
                        placeholder="john@example.com" 
                        type="email"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-widest text-on-secondary-container">Phone Number</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">call</span>
                      <input 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low rounded-xl border-none focus:ring-2 focus:ring-primary/10 transition-all text-sm font-medium" 
                        placeholder="+1 (555) 000-0000" 
                        type="tel"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Account Details */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-on-secondary-container bg-secondary-container px-2 py-0.5 rounded">Section 02</span>
              <h4 className="text-sm font-bold text-on-surface">Account Details</h4>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-widest text-on-secondary-container">Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">lock</span>
                  <input 
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low rounded-xl border-none focus:ring-2 focus:ring-primary/10 transition-all text-sm font-medium" 
                    placeholder="••••••••" 
                    type="password"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-widest text-on-secondary-container">Confirm Password</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg">verified_user</span>
                  <input 
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low rounded-xl border-none focus:ring-2 focus:ring-primary/10 transition-all text-sm font-medium" 
                    placeholder="••••••••" 
                    type="password"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl border border-outline-variant/10">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">forward_to_inbox</span>
                <div>
                  <p className="text-sm font-semibold text-on-surface">Send account invite email</p>
                  <p className="text-xs text-on-surface-variant">Customer will receive an email to set up their portal access.</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  name="sendInvite"
                  checked={formData.sendInvite}
                  onChange={handleChange}
                  className="sr-only peer" 
                  type="checkbox"
                />
                <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </section>

          {/* Address Information */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-on-secondary-container bg-secondary-container px-2 py-0.5 rounded">Section 03</span>
              <h4 className="text-sm font-bold text-on-surface">Address Information</h4>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-widest text-on-secondary-container">Street Address</label>
                <input 
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-none focus:ring-2 focus:ring-primary/10 transition-all text-sm font-medium" 
                  placeholder="123 Luxury Way" 
                  type="text"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-on-secondary-container">City</label>
                  <input 
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-none focus:ring-2 focus:ring-primary/10 transition-all text-sm font-medium" 
                    placeholder="San Francisco" 
                    type="text"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-on-secondary-container">State</label>
                  <input 
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-none focus:ring-2 focus:ring-primary/10 transition-all text-sm font-medium" 
                    placeholder="CA" 
                    type="text"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-on-secondary-container">Postal Code</label>
                  <input 
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-none focus:ring-2 focus:ring-primary/10 transition-all text-sm font-medium" 
                    placeholder="94103" 
                    type="text"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-widest text-on-secondary-container">Country</label>
                <div className="relative">
                  <select 
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full appearance-none px-4 py-2.5 bg-surface-container-low rounded-xl border-none focus:ring-2 focus:ring-primary/10 transition-all text-sm font-medium pr-10"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                    <option>Germany</option>
                    <option>France</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline">expand_more</span>
                </div>
              </div>
            </div>
          </section>

          {/* Tags & Notes */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-on-secondary-container bg-secondary-container px-2 py-0.5 rounded">Section 04</span>
              <h4 className="text-sm font-bold text-on-surface">Tags & Notes</h4>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-widest text-on-secondary-container">Customer Tags</label>
              <div className="flex flex-wrap gap-2 p-3 bg-surface-container-low rounded-xl border-none focus-within:ring-2 focus-within:ring-primary/10 transition-all">
                {formData.tags.map((tag, idx) => (
                  <div key={idx} className="bg-primary-container text-on-primary-container px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5">
                    {tag}
                    <span 
                      className="material-symbols-outlined text-[14px] cursor-pointer"
                      onClick={() => setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }))}
                    >
                      close
                    </span>
                  </div>
                ))}
                <input 
                  className="bg-transparent border-none outline-none text-xs flex-1 min-w-[100px] focus:ring-0" 
                  placeholder="Add tag..." 
                  type="text"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.target.value) {
                      setFormData(prev => ({ ...prev, tags: [...prev.tags, e.target.value] }));
                      e.target.value = '';
                    }
                  }}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-widest text-on-secondary-container">Admin Notes</label>
              <textarea 
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-surface-container-low rounded-xl border-none focus:ring-2 focus:ring-primary/10 transition-all text-sm font-medium resize-none" 
                placeholder="Enter private internal notes about this customer profile..." 
                rows="3"
              ></textarea>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-surface-container-lowest border-t border-outline-variant/10 flex items-center justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-bold text-on-surface hover:bg-surface-container-high rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            className="px-8 py-2.5 text-sm font-bold bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Add Customer
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCustomerModal;
