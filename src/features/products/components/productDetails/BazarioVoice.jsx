import React from 'react';

const MOCK_REVIEWS = [
  { id: 1, author: 'Priya R.', rating: 5, content: 'The fabric quality is unlike anything I\'ve ordered online. It arrived exactly as described — the drape is luxurious and the stitching is immaculate.', date: 'March 2025', tags: ['Quality', 'Packaging'] },
  { id: 2, author: 'Arjun K.', rating: 4, content: 'Delivery was swift and well-packaged. Sizing runs slightly large — go a size down. Still, the material is exceptional.', date: 'February 2025', tags: ['Fit', 'Delivery'] },
  { id: 3, author: 'Sneha M.', rating: 5, content: 'I\'ve been shopping here for a year — every piece has held its colour through multiple washes. This is my go-to for everything.', date: 'January 2025', tags: ['Durability', 'Value'] },
  { id: 4, author: 'Rahul V.', rating: 5, content: 'Customer support resolved my exchange within 24 hours. Replacement came in three days. This is how ecommerce should feel.', date: 'December 2024', tags: ['Support', 'Returns'] },
];

const RATING_BARS = [
  { star: 5, pct: 82 }, { star: 4, pct: 11 },
  { star: 3, pct: 5 }, { star: 2, pct: 1 }, { star: 1, pct: 1 },
];

const StarRow = ({ rating, size = 'text-[12px]' }) => (
  <div className="flex gap-[2px] mt-1">
    {[1, 2, 3, 4, 5].map((i) => (
      <span
        key={i}
        className={`material-symbols-outlined ${size} text-on-surface`}
        style={{ fontVariationSettings: `'FILL' ${i <= rating ? 1 : 0}` }}
      >
        star
      </span>
    ))}
  </div>
);

const Avatar = ({ name }) => {
  const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div className="w-9 h-9 rounded-full border border-outline-variant/30 flex items-center justify-center text-[11px] font-semibold tracking-wider flex-shrink-0 bg-surface-variant text-on-surface">
      {initials}
    </div>
  );
};

const ReviewCard = ({ review }) => (
  <div className="p-8 border-b border-outline-variant/20 odd:border-r odd:border-r-outline-variant/20">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <Avatar name={review.author} />
        <div>
          <p className="text-[10px] uppercase tracking-[0.15em] font-semibold text-on-surface">
            {review.author}
          </p>
          <p className="text-[10px] text-on-surface/50 flex items-center gap-1 mt-0.5">
            <span className="material-symbols-outlined text-[11px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified
            </span>
            Verified purchase
          </p>
          <StarRow rating={review.rating} />
        </div>
      </div>
    </div>

    <p className="font-serif text-[15px]  leading-relaxed text-on-surface mb-3 mt-4">
      <span className="font-serif text-[40px] leading-none text-outline-variant/40 mr-1 align-bottom">"</span>
      {review.content || review.comment}
    </p>

    {review.photo && (
      <img
        src={review.photo}
        alt="Customer review photo"
        className="w-14 h-[72px] object-cover grayscale hover:grayscale-0 transition-all cursor-zoom-in mt-3"
        loading="lazy"
      />
    )}

    <div className="flex flex-wrap gap-1.5 mt-3">
      {review.tags?.map((tag) => (
        <span key={tag} className="text-[9px] uppercase tracking-[0.12em] border border-outline-variant/30 text-on-surface/50 px-2 py-1">
          {tag}
        </span>
      ))}
    </div>
    {review.date && (
      <p className="text-[10px] text-on-surface/40 tracking-wide mt-3">{review.date}</p>
    )}
  </div>
);

const RatingSummary = ({ reviews, totalCount }) => {
  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
  return (
    <div className="flex gap-8 justify-center items-center mb-12 pb-8 border-b border-outline-variant/20">
      <p className="font-sans text-[52px] font-bold leading-none text-on-surface">{avg}</p>
      <div className="flex flex-col gap-1.5">
        <StarRow rating={Math.round(avg)} size="text-[14px]" />
        <p className="text-[10px] text-on-surface/50 tracking-wide">Based on {totalCount} reviews</p>
      </div>
      <div className="flex flex-col gap-1">
        {RATING_BARS.map(({ star, pct }) => (
          <div key={star} className="flex items-center gap-2 text-[10px] text-on-surface/50">
            {star}
            <div className="w-24 h-[2px] bg-outline-variant/20 rounded-full">
              <div className="h-full bg-on-surface rounded-full" style={{ width: `${pct}%` }} />
            </div>
            {pct}%
          </div>
        ))}
      </div>
    </div>
  );
};

const BazarioVoice = ({ reviews = MOCK_REVIEWS, totalCount = 492 }) => {
  if (!reviews?.length) return null;
  return (
    <section className="mt-32 px-8 max-w-7xl mx-auto">
      <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-center text-on-surface/50 mb-2">
        Customer voices
      </p>
      <h2 className="font-serif text-3xl tracking-tight text-center  text-on-surface mb-2">
        What they're saying
      </h2>
      <div className="w-10 h-px bg-outline-variant mx-auto mb-10" />

      <RatingSummary reviews={reviews} totalCount={totalCount} />

      <div className="grid md:grid-cols-2">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      <div className="text-center py-10">
        <button className="text-[10px] uppercase tracking-[0.2em] font-semibold border-b border-on-surface pb-1 text-on-surface hover:opacity-50 transition-opacity">
          View all {totalCount} reviews
        </button>
      </div>
    </section>
  );
};

export default BazarioVoice;