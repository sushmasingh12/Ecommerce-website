import React from 'react';
import { Link } from 'react-router-dom';

const DEALS = [
  { label: 'Fashion Deals', discount: 'Up to 60% Off', link: '/women', img: 'https://images.pexels.com/photos/5886041/pexels-photo-5886041.jpeg?auto=compress&cs=tinysrgb&w=400', color: 'tertiary' },
  { label: "Men's Style", discount: 'Min 40% Off', link: '/men', img: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400', color: '#60A5FA' },
  { label: 'Footwear', discount: 'Flat 50% Off', link: '/footwear', img: 'https://images.unsplash.com/photo-1539185441755-769473a23570?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', color: '#34D399' },
  { label: 'Accessories', discount: 'Starting ₹299', link: '/accessories', img: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400', color: '#FF9F00' },
];

const TrendingShowcase = () => {
  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>
            🔥 Top Deals Today
          </h2>
          <Link to="/new-arrivals" className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {DEALS.map((deal) => (
            <Link key={deal.label} to={deal.link}
              className="group relative overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
              <img src={deal.img} alt={deal.label} className="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                <span className="text-white font-bold text-sm md:text-base">{deal.label}</span>
                <span className="text-xs font-semibold mt-1 px-2 py-0.5 rounded-full w-fit" style={{ backgroundColor: deal.color, color: '#131921' }}>
                  {deal.discount}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingShowcase;
