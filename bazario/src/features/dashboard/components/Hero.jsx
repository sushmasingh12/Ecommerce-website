import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SLIDES = [
  {
    bg: 'from-primary to-primary-fixed',
    badge: '🔥 Mega Sale Live',
    headline: 'Up to 70% Off',
    sub: 'Electronics, Fashion & More',
    cta: 'Shop Now',
    ctaLink: '/new-arrivals',
    accent: ' #FF9F00',
    img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tag: 'Limited Time Deal',
  },
  {
    bg: 'from-[#1a1a2e] to-[#16213e]',
    badge: '⚡ New Arrivals',
    headline: 'Trending Fashion',
    sub: 'Men · Women · Kids — Latest Styles',
    cta: 'Explore Fashion',
    ctaLink: '/women',
    accent: ' #FF9F00',
    img: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tag: 'Fresh Drops',
  },
  {
    bg: 'from-primary to-primary-fixed',
    badge: '🎁 Free Delivery',
    headline: 'On Orders ₹499+',
    sub: 'Pan India Shipping · Easy Returns',
    cta: 'Start Shopping',
    ctaLink: '/collections',
    accent: ' #FF9F00',
    img: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    tag: 'Best Sellers',
  },
];

const Hero = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % SLIDES.length), 4500);
    return () => clearInterval(t);
  }, []);

  const slide = SLIDES[active];

  return (
    <section className={`relative w-full bg-linear-to-r ${slide.bg} transition-all duration-700 overflow-hidden`}>
      <div className="bg-secondary text-primary text-center py-1.5 text-xs font-semibold tracking-wide">
        🎉 FREE DELIVERY on orders above ₹499 · Easy 30-day returns · Secure payments
      </div>
      <div className="max-w-350 mx-auto px-4 md:px-12 py-10 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="text-white order-2 md:order-1">
          <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4"
            style={{ backgroundColor: slide.accent, color: '#131921' }}>
            {slide.badge}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            {slide.headline}
          </h1>
          <p className="text-lg text-white/70 mb-8 font-light">{slide.sub}</p>
          <div className="flex flex-wrap gap-3 mb-10">
            <Link to={slide.ctaLink}
              className="px-8 py-3.5 rounded-full font-bold text-sm transition-all duration-200 hover:scale-105 shadow-lg"
              style={{ backgroundColor: slide.accent, color: '#131921' }}>
              {slide.cta} →
            </Link>
            <Link to="/collections"
              className="px-8 py-3.5 rounded-full font-semibold text-sm bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-200">
              Browse All
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {[['Men', '/men'], ['Women', '/women'], ['Footwear', '/footwear'], ['Accessories', '/accessories']].map(([label, path]) => (
              <Link key={label} to={path}
                className="text-xs px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 transition-all border border-white/10">
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div className="relative order-1 md:order-2 flex justify-center md:justify-end">
          <div className="relative">
            <div className="absolute -inset-4 rounded-2xl opacity-30 blur-xl" style={{ backgroundColor: slide.accent }}></div>
            <img key={active} src={slide.img} alt={slide.headline}
              className="relative w-72 h-72 sm:w-96 sm:h-96 object-cover rounded-2xl shadow-2xl"
              style={{ animation: 'fadeSlide 0.6s ease-out' }} />
            <div className="absolute top-4 left-4 bg-white text-primary text-[10px] font-bold uppercase px-2.5 py-1 rounded-full shadow">
              {slide.tag}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-2 pb-6">
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => setActive(i)}
            className="h-2 rounded-full transition-all duration-300"
            style={{ width: i === active ? '24px' : '8px', backgroundColor: i === active ? slide.accent : 'rgba(255,255,255,0.3)' }} />
        ))}
      </div>
      <style>{`@keyframes fadeSlide { from { opacity:0; transform: translateX(20px) scale(0.97); } to { opacity:1; transform: translateX(0) scale(1); } }`}</style>
    </section>
  );
};

export default Hero;
