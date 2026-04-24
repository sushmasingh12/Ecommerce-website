import React from 'react';
import { Link } from 'react-router-dom';

const FEATURES = [
  { icon: 'local_shipping', title: 'Free Delivery', desc: 'On all orders above ₹499', color: '#FF9F00' },
  { icon: 'verified', title: 'Genuine Products', desc: '100% authentic brands', color: '#00D4AA' },
  { icon: 'replay', title: '30-Day Returns', desc: 'Easy hassle-free returns', color: 'tertiary' },
  { icon: 'lock', title: 'Secure Payments', desc: 'UPI, Cards, Wallets accepted', color: '#A78BFA' },
  { icon: 'support_agent', title: '24/7 Support', desc: 'Always here to help you', color: '#34D399' },
];

const BrandPhilosophy = () => {
  return (
    <section className="py-12 bg-primary">
      <div className="max-w-350 mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex flex-col items-center text-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
              <span className="material-symbols-outlined text-3xl mb-2" style={{ color: f.color }}>
                {f.icon}
              </span>
              <h4 className="text-white text-sm font-semibold mb-1">{f.title}</h4>
              <p className="text-white/50 text-[11px]">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandPhilosophy;
