import React from 'react';

const REVIEWS = [
  { name: 'Priya S.', city: 'Mumbai', rating: 5, text: 'Super fast delivery! Got my order in just 2 days. Quality is exactly as shown.' },
  { name: 'Rahul K.', city: 'Delhi', rating: 5, text: 'Amazing deals and genuine products. Have been shopping here for 6 months now.' },
  { name: 'Anjali M.', city: 'Bengaluru', rating: 4, text: 'Easy returns process. Exchanged my shoes in one day. Great customer support!' },
  { name: 'Vikram P.', city: 'Hyderabad', rating: 5, text: 'Best prices compared to other platforms. Saved so much during the sale!' },
];

const Testimonials = () => (
  <section className="py-12 bg-surface-variant">
    <div className="max-w-350 mx-auto px-4 md:px-8">
      <h2 className="font-headline text-xl md:text-2xl font-bold text-on-surface mb-6 text-center">
        ⭐ What Our Customers Say
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {REVIEWS.map((r) => (
          <div key={r.name} className="bg-surface rounded-xl p-5 shadow-sm border border-outline hover:shadow-md transition-all">
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: r.rating }).map((_, i) => (
                <span key={i} className="text-secondary text-sm">★</span>
              ))}
            </div>
            <p className="font-body text-on-surface-variant text-sm leading-relaxed mb-4">"{r.text}"</p>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary text-xs font-bold">
                {r.name[0]}
              </div>
              <div>
                <p className="font-label text-sm font-semibold text-on-surface">{r.name}</p>
                <p className="font-label text-[10px] text-on-surface-variant">{r.city}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
