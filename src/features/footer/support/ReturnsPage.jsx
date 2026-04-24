import React from "react";

const ReturnsPage = () => {
  return (
    <main className="min-h-screen bg-surface pt-32 pb-24">
      <header className="mx-auto mb-24 max-w-screen-xl px-8 text-center">
        <span className="mb-4 block font-label text-[10px] font-bold uppercase tracking-[0.3em] text-secondary">
          Customer Care
        </span>
        <h1 className="font-headline text-5xl tracking-tighter text-primary md:text-7xl">
          Returns & Exchanges
        </h1>
      </header>

      <section className="mx-auto max-w-screen-md px-8">
        <div className="space-y-16">
          <div className="space-y-6">
            <h2 className="font-headline text-3xl text-primary">Return Policy</h2>
            <p className="font-body text-sm leading-loose text-on-surface-variant">
              We accept returns of unworn, unwashed, and undamaged items with original tags 
              attached within 14 days of delivery. All footwear must be returned in its 
              original, undamaged box.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="font-headline text-3xl text-primary">The Process</h2>
            <ol className="list-decimal space-y-6 pl-4 font-body text-sm leading-loose text-on-surface-variant">
              <li>
                <strong>Request a Return:</strong> Visit our online returns portal or contact 
                our concierge to initiate your request.
              </li>
              <li>
                <strong>Prepare Your Package:</strong> Securely pack the items in their 
                original packaging.
              </li>
              <li>
                <strong>Ship:</strong> Affix the provided pre-paid shipping label and drop 
                off at any authorized collection point.
              </li>
            </ol>
          </div>

          <div className="space-y-6 border-t border-outline-variant/30 pt-16">
            <h2 className="font-headline text-3xl text-primary">Refunds</h2>
            <p className="font-body text-sm leading-loose text-on-surface-variant">
              Once your return is received and inspected, we will process your refund 
              to the original payment method. Please allow 5-10 business days for the 
              credit to appear on your statement.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ReturnsPage;
