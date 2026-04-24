import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <section className="py-12 bg-primary">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <span className="text-secondary text-sm font-bold uppercase tracking-widest">Exclusive Offers</span>
        <h2 className="text-2xl md:text-3xl font-bold text-white mt-2 mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
          Get ₹200 Off Your First Order
        </h2>
        <p className="text-white/50 text-sm mb-6">Subscribe for deals, new arrivals & special coupons</p>
        {sent ? (
          <div className="bg-[#00D4AA]/20 border border-[#00D4AA]/30 rounded-full px-6 py-3 text-[#00D4AA] font-semibold text-sm inline-block">
            ✓ You're subscribed! Coupon sent to your email.
          </div>
        ) : (
          <div className="flex gap-2 max-w-md mx-auto">
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-full text-sm bg-white/10 text-white placeholder:text-white/30 border border-white/10 focus:outline-none focus:border-secondary"
            />
            <button
              onClick={() => email && setSent(true)}
              className="bg-secondary hover:bg-secondary-container text-primary font-bold px-6 py-3 rounded-full text-sm transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
