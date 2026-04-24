import React from 'react';
import { categoryHeroData } from '../data/categoryHeroData';

const CategoryHero = ({ category = 'women' }) => {
  const slide = (categoryHeroData[category] || categoryHeroData['women'])[0];

  return (
    <section className="relative h-[70vh] md:h-[800px] w-full mb-12 md:mb-20 overflow-hidden bg-surface-container-highest">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-white">
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-contain"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-black/10"></div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-10">
        <div className="absolute left-6 md:left-12 lg:left-24 bottom-12 md:bottom-20 lg:bottom-24 max-w-[280px] md:max-w-[420px] text-white">
          <span className="block uppercase tracking-[0.35em] text-[10px] md:text-xs mb-4 text-white/80">
            {slide.subtitle}
          </span>

          <h1 className="font-serif italic text-4xl md:text-6xl lg:text-7xl leading-[1] mb-5">
            {slide.title}
          </h1>

          <p className="text-sm md:text-lg leading-relaxed text-white/90 mb-6 max-w-[340px]">
            {slide.description}
          </p>

          <button className="border border-white text-white px-6 md:px-8 py-2.5 md:py-3 text-xs md:text-sm font-medium hover:bg-white hover:text-black transition-all duration-300">
            {slide.cta}
          </button>
        </div>
      </div>

      <div className="absolute top-0 right-12 md:right-24 h-full w-[1px] bg-white/10 hidden md:block"></div>
    </section>
  );
};

export default CategoryHero;