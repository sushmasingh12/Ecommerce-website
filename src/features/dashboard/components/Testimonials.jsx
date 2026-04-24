import React from 'react';

const REVIEWS = [
  { name: 'Priya S.', city: 'Mumbai', rating: 5, text: 'Super fast delivery! Got my order in just 2 days. Quality is exactly as shown.' },
  { name: 'Rahul K.', city: 'Delhi', rating: 5, text: 'Amazing deals and genuine products. Have been shopping here for 6 months now.' },
  { name: 'Anjali M.', city: 'Bengaluru', rating: 4, text: 'Easy returns process. Exchanged my shoes in one day. Great customer support!' },
  { name: 'Vikram P.', city: 'Hyderabad', rating: 5, text: 'Best prices compared to other platforms. Saved so much during the sale!' },
];

const Testimonials = () => (
  <section className="py-12 bg-gray-50">
    <div className="max-w-[1400px] mx-auto px-4 md:px-8">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-center" style={{ fontFamily: 'Sora, sans-serif' }}>
        ⭐ What Our Customers Say
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {REVIEWS.map((r) => (
          <div key={r.name} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: r.rating }).map((_, i) => (
                <span key={i} className="text-[#FF9F00] text-sm">★</span>
              ))}
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">"{r.text}"</p>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#131921] flex items-center justify-center text-white text-xs font-bold">
                {r.name[0]}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{r.name}</p>
                <p className="text-[10px] text-gray-400">{r.city}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
