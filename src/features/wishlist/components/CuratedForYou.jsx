import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CuratedForYou = () => {
  const { curatedRecommendations } = useSelector((state) => state.wishlist);

  if (!curatedRecommendations || curatedRecommendations.length === 0)
    return null;

  return (
    <section className="bg-surface-container-low py-16 md:py-32">
      <div className="px-4 sm:px-8 md:px-12 mb-10 md:mb-16">
        <span className="font-label text-[10px] tracking-[0.4em] uppercase text-secondary block mb-4">
          Personal Selection
        </span>
       
      </div>

      <div className="flex overflow-x-auto gap-5 md:gap-8 px-4 sm:px-8 md:px-12 pb-8 md:pb-12 no-scrollbar scroll-smooth">
  {curatedRecommendations.map((rec) => (
    <div
      key={rec.id}
      className="w-[210px] sm:w-[260px] md:w-[340px] flex-shrink-0 group"
    >
      <div className="w-full h-[280px] sm:h-[340px] md:h-[430px] mb-5 md:mb-6 relative overflow-hidden bg-surface-container">
        <img
          className="w-full h-full object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-700"
          src={rec.image}
          alt={rec.alt}
        />
      </div>

      <div className="space-y-2">
        <p className="font-label text-[10px] tracking-[0.2em] uppercase text-on-surface-variant">
          {rec.edit}
        </p>

        <h4 className="font-serif text-lg md:text-xl italic">
          {rec.name}
        </h4>

        <Link
          to={`/product/${rec.productId || rec.id}`}
          className="inline-block mt-4 border-b border-primary pb-1 font-label text-[10px] tracking-[0.2em] uppercase text-primary hover:text-secondary hover:border-secondary transition-all"
        >
          View Detail
        </Link>
      </div>
    </div>
  ))}
</div>
    </section>
  );
};

export default CuratedForYou;
