// src/features/orders/components/OrderDetailPanel.jsx

// ─── Skeleton ─────────────────────────────────────────────────────────────────
const DetailSkeleton = () => (
  <div className="animate-pulse p-6 space-y-8">
    <div className="space-y-3">
      <div className="h-3 w-24 bg-surface-container-high rounded" />
      {[1, 2].map((i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-surface-container-high flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-3/4 bg-surface-container-high rounded" />
            <div className="h-2.5 w-1/2 bg-surface-container-high rounded" />
          </div>
          <div className="h-3 w-14 bg-surface-container-high rounded" />
        </div>
      ))}
    </div>
    <div className="space-y-3">
      <div className="h-3 w-20 bg-surface-container-high rounded" />
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-3">
          <div className="w-4 h-4 rounded-full bg-surface-container-high mt-0.5" />
          <div className="space-y-2 flex-1">
            <div className="h-3 w-1/2 bg-surface-container-high rounded" />
            <div className="h-2 w-2/3 bg-surface-container-high rounded" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ─── Order Detail Panel ───────────────────────────────────────────────────────
const OrderDetailPanel = ({ orderId, orderDetail, isLoading }) => {
  return (
    <div className="xl:col-span-4 space-y-6">
      <div className="bg-surface-container-lowest rounded-2xl shadow-xl border border-primary/10 overflow-hidden sticky top-24">
        {/* Header */}
        <div className="bg-primary/5 p-6 border-b border-outline-variant/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-on-surface">Order Details</h2>
            <span className="text-primary font-bold">#{orderId}</span>
          </div>
          {isLoading ? (
            <div className="flex gap-4 animate-pulse">
              <div className="h-6 w-28 bg-surface-container-high rounded-lg" />
              <div className="h-6 w-20 bg-surface-container-high rounded-lg" />
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-[10px] font-bold uppercase">
                {orderDetail?.paymentStatus || "Payment Verified"}
              </div>
              <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-[10px] font-bold uppercase">
                {orderDetail?.fulfillmentStatus || "In Transit"}
              </div>
            </div>
          )}
        </div>

        {/* Scrollable Body */}
        <div className="p-6 space-y-8 custom-scrollbar max-h-[calc(100vh-250px)] overflow-y-auto">
          {isLoading ? (
            <DetailSkeleton />
          ) : orderDetail ? (
            <>
              {/* Items Summary */}
              <section>
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-on-secondary-container mb-4">
                  Summary
                </h3>
                <div className="space-y-4">
                  {orderDetail.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-surface-container-high rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          alt={item.name}
                          className="w-full h-full object-cover"
                          src={item.image}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-on-surface">
                          {item.name}
                        </p>
                        <p className="text-[10px] text-on-surface-variant">
                          {item.variant}
                        </p>
                      </div>
                      <p className="text-xs font-bold text-on-surface">
                        ${item.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Delivery Tracking */}
              <section>
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-on-secondary-container mb-4">
                  Tracking
                </h3>
                <div className="relative pl-6 space-y-6">
                  <div className="absolute left-[3px] top-1.5 bottom-1.5 w-0.5 bg-outline-variant/30" />
                  {orderDetail.tracking.map((step, index) => (
                    <div className="relative" key={index}>
                      <div
                        className={`absolute -left-[27px] top-0.5 w-4 h-4 rounded-full border-4 border-white shadow-sm ${
                          step.active ? "bg-primary" : "bg-slate-300"
                        }`}
                      />
                      <div>
                        <p
                          className={`text-xs font-bold ${
                            step.active ? "text-on-surface" : "text-slate-500"
                          }`}
                        >
                          {step.status}
                        </p>
                        <p
                          className={`text-[10px] ${
                            step.active
                              ? "text-on-surface-variant"
                              : "text-slate-400"
                          }`}
                        >
                          {step.location} • {step.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Invoice Preview */}
              <section>
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-on-secondary-container mb-4">
                  Invoice Preview
                </h3>
                <div className="bg-surface p-4 rounded-xl border-2 border-dashed border-outline-variant/30 relative group cursor-pointer hover:border-primary/30 transition-all">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-6 h-6 bg-primary/20 rounded-md" />
                    <div className="text-[8px] font-mono text-right text-slate-400">
                      {orderDetail.invoiceId}
                      <br />
                      DATE: {orderDetail.invoiceDate}
                    </div>
                  </div>
                  <div className="space-y-1 mb-4">
                    <div className="h-1.5 w-3/4 bg-slate-200 rounded" />
                    <div className="h-1.5 w-1/2 bg-slate-200 rounded" />
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                    <span className="text-[10px] font-bold">TOTAL</span>
                    <span className="text-[10px] font-bold text-primary">
                      ${orderDetail.total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-white/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button className="px-4 py-2 bg-white shadow-lg border border-outline-variant/20 rounded-lg text-[10px] font-bold flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">
                        download
                      </span>
                      Download PDF
                    </button>
                  </div>
                </div>
              </section>
            </>
          ) : null}
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-surface-container-low border-t border-outline-variant/10 flex gap-3">
          <button className="flex-1 py-3 bg-white border border-outline-variant/30 text-on-surface font-bold text-xs rounded-xl hover:bg-surface-bright transition-all">
            Edit Order
          </button>
          <button className="flex-1 py-3 bg-primary text-white font-bold text-xs rounded-xl shadow-md hover:bg-primary-container transition-all">
            Message Customer
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPanel;