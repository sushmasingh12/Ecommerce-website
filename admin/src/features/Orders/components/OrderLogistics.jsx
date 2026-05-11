import React from 'react';

const OrderLogistics = () => {
  return (
    <section className="bg-surface-container-lowest rounded-lg p-8 shadow-sm border border-outline-variant/10">
      <div className="flex items-center gap-3 mb-6">
        <span className="material-symbols-outlined text-primary">analytics</span>
        <h2 className="text-xl font-bold tracking-tight text-on-surface">Order Logistics</h2>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-sans font-medium text-[11px] uppercase tracking-wider text-on-secondary-container">Payment Status</label>
            <select className="bg-surface-container-low border-none rounded-md px-4 py-3 text-on-surface font-semibold focus:ring-2 focus:ring-primary/10 appearance-none outline-none">
              <option className="text-tertiary" value="pending">Pending Payment</option>
              <option className="text-primary" value="paid">Paid In Full</option>
              <option className="text-error" value="failed">Transaction Failed</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-sans font-medium text-[11px] uppercase tracking-wider text-on-secondary-container">Fulfillment Status</label>
            <select className="bg-surface-container-low border-none rounded-md px-4 py-3 text-on-surface font-semibold focus:ring-2 focus:ring-primary/10 outline-none">
              <option className="text-secondary" value="processing">Processing</option>
              <option className="text-on-primary-fixed-variant" value="shipped">Shipped</option>
              <option className="text-primary" value="delivered">Delivered</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-sans font-medium text-[11px] uppercase tracking-wider text-on-secondary-container">Order Notes</label>
          <textarea 
            className="bg-surface-container-low border-none rounded-md px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/10 resize-none h-full placeholder:text-outline/50 outline-none" 
            placeholder="Add internal notes or customer requests..." 
            rows="5"
          ></textarea>
        </div>
      </div>
    </section>
  );
};

export default OrderLogistics;
