import React from 'react';
import { Link } from 'react-router-dom';

const CategoryBento = ({ categories }) => {
  if (!categories || categories.length === 0) return null;

  return (
    <section className="py-10 bg-white">
      <div className="max-w-350 mx-auto px-4 md:px-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.link}
              className="group relative overflow-hidden rounded-xl bg-gray-100 hover:shadow-xl transition-all duration-300"
              style={{ aspectRatio: category.featured ? '1/1' : '1/1' }}
            >
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                alt={category.alt}
                src={category.image}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                <div>
                  <h3 className="text-white font-bold text-base md:text-lg">{category.name}</h3>
                  <span className="text-xs text-white/80 font-medium flex items-center gap-1 mt-0.5">
                    {category.linkText} <span className="text-secondary">→</span>
                  </span>
                </div>
              </div>
              {/* Sale badge */}
              <div className="absolute top-3 right-3 bg-[tertiary] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                SALE
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryBento;
