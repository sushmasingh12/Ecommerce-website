import React from 'react';

const CustomerInfo = () => {
  return (
    <section className="bg-surface-container-lowest rounded-lg p-8 shadow-sm border border-outline-variant/10">
      <div className="flex items-center gap-3 mb-6">
        <span className="material-symbols-outlined text-primary">person_add</span>
        <h2 className="text-xl font-bold tracking-tight text-on-surface">Customer Information</h2>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="font-sans font-medium text-[11px] uppercase tracking-wider text-on-secondary-container">Full Name</label>
          <input 
            className="bg-surface-container-low border-none rounded-md px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-outline/50 outline-none" 
            placeholder="e.g. Julianne Moore" 
            type="text"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-sans font-medium text-[11px] uppercase tracking-wider text-on-secondary-container">Email Address</label>
          <input 
            className="bg-surface-container-low border-none rounded-md px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-outline/50 outline-none" 
            placeholder="julianne@example.com" 
            type="email"
          />
        </div>
        <div className="flex flex-col gap-2 col-span-2">
          <label className="font-sans font-medium text-[11px] uppercase tracking-wider text-on-secondary-container">Phone Number</label>
          <div className="flex gap-2">
            <span className="bg-surface-container-high rounded-md px-3 flex items-center text-sm font-semibold text-on-surface-variant">+1</span>
            <input 
              className="flex-grow bg-surface-container-low border-none rounded-md px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/10 transition-all placeholder:text-outline/50 outline-none" 
              placeholder="(555) 000-0000" 
              type="tel"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerInfo;
