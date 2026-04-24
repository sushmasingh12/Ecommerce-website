import React from 'react';

const ReviewItem = ({ review }) => (
  <div className="space-y-8 pb-12 border-b border-outline-variant/20">
    <div className="flex items-center justify-between">
      <span className="text-[10px] uppercase tracking-widest font-bold">{review.author}</span>
      <div className="flex gap-1">
        {[...Array(review.rating)].map((_, i) => (
          <span key={i} className="material-symbols-outlined text-[10px] text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
            star
          </span>
        ))}
      </div>
    </div>
    <p className="text-lg font-serif italic leading-relaxed text-on-surface">
      {review.content || review.comment}
    </p>
    {review.photo && (
      <div className="flex gap-4 h-24">
        <img 
          className="w-16 object-cover grayscale hover:grayscale-0 transition-all cursor-zoom-in" 
          alt="Customer review photo" 
          src={review.photo} 
        />
      </div>
    )}
  </div>
);

const CuratorVoice = ({ reviews }) => {
  if (!reviews) return null;

  return (
    <section className="mt-32 px-12 max-w-7xl mx-auto">
      <h2 className="text-3xl font-serif tracking-tight mb-16 text-center italic">The Curator Voice</h2>
      <div className="grid md:grid-cols-2 gap-24">
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </div>
      <div className="mt-12 text-center">
        <button className="text-[10px] uppercase tracking-widest font-bold border-b border-primary py-2 hover:opacity-70 transition-opacity">
          View All {reviews.length + 46} Reviews
        </button>
      </div>
    </section>
  );
};

export default CuratorVoice;
