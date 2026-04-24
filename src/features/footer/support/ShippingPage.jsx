import React from "react";

const ShippingPage = () => {
  return (
    <main className="min-h-screen bg-surface pt-32 pb-24">
      <header className="mx-auto mb-24 max-w-screen-xl px-8 text-center">
        <span className="mb-4 block font-label text-[10px] font-bold uppercase tracking-[0.3em] text-secondary">
          Customer Care
        </span>
        <h1 className="font-headline text-5xl tracking-tighter text-primary md:text-7xl">
          Shipping & Delivery
        </h1>
      </header>

      <section className="mx-auto max-w-screen-md px-8">
        <div className="space-y-16">
          <div className="space-y-6">
            <h2 className="font-headline text-3xl text-primary">Domestic Shipping</h2>
            <p className="font-body text-sm leading-loose text-on-surface-variant">
              We offer complimentary standard shipping on all orders within the continental Europe. 
              Orders are typically processed within 1-2 business days.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left font-body text-sm">
                <thead>
                  <tr className="border-b border-outline-variant">
                    <th className="py-4 font-bold uppercase tracking-widest text-[10px]">Method</th>
                    <th className="py-4 font-bold uppercase tracking-widest text-[10px]">Timeframe</th>
                    <th className="py-4 font-bold uppercase tracking-widest text-[10px]">Cost</th>
                  </tr>
                </thead>
                <tbody className="text-on-surface-variant">
                  <tr className="border-b border-outline-variant/30">
                    <td className="py-4">Standard</td>
                    <td className="py-4">3-5 Business Days</td>
                    <td className="py-4">Complimentary</td>
                  </tr>
                  <tr className="border-b border-outline-variant/30">
                    <td className="py-4">Express</td>
                    <td className="py-4">1-2 Business Days</td>
                    <td className="py-4">€25.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="font-headline text-3xl text-primary">International Shipping</h2>
            <p className="font-body text-sm leading-loose text-on-surface-variant">
              THE CURATOR ships globally to over 50 countries. International shipping rates and 
              delivery times vary by destination. Please note that duties and taxes may be 
              applied by your local customs office.
            </p>
          </div>

          <div className="space-y-6 border-t border-outline-variant/30 pt-16">
            <h2 className="font-headline text-3xl text-primary">Tracking Your Order</h2>
            <p className="font-body text-sm leading-loose text-on-surface-variant">
              Once your order has been dispatched, you will receive a confirmation email 
              containing your tracking number and a link to monitor your shipment's progress.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ShippingPage;
