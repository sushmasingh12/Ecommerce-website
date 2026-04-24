import React from 'react';
import { useSelector } from 'react-redux';
import { selectOrders } from '../store/orderSlice';

const OrderHistory = () => {
  const orders = useSelector(selectOrders);

  return (
    <main className="pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-[1920px] mx-auto w-full flex-grow min-h-screen">
      {/* Breadcrumb */}
      <nav className="flex mb-12 text-[10px] uppercase tracking-[0.2em] font-label text-gray-400">
        <a className="hover:text-black transition-colors" href="/">Home</a>
        <span className="mx-3">/</span>
        <a className="hover:text-black transition-colors" href="/account">Account</a>
        <span className="mx-3">/</span>
        <span className="text-secondary font-bold">Order History</span>
      </nav>

      {/* Header Section */}
      <div className="mb-20">
        <h1 className="text-5xl md:text-6xl font-serif text-black tracking-tight mb-4">Order History</h1>
        <p className="text-gray-600 font-body max-w-lg leading-relaxed">
          Review your curated acquisitions and track current shipments from our atelier to your door.
        </p>
      </div>

      {/* Order List */}
      <div className="space-y-12">
        {orders.map((order) => (
          <div key={order.id} className="group bg-white p-8 md:p-10 transition-all duration-500 hover:bg-gray-50 border border-gray-100/50">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              {/* Metadata Column */}
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <span className="font-serif text-2xl text-black">#{order.id}</span>
                  <span className={`px-3 py-1 text-[9px] uppercase tracking-widest font-bold ${
                    order.status === 'Delivered' 
                      ? 'bg-secondary/10 text-secondary' 
                      : 'bg-gray-100 text-gray-500'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-[11px] uppercase tracking-wider text-gray-400 font-label">Ordered {order.date}</p>
              </div>

              {/* Item Previews */}
              <div className="flex items-center space-x-4">
                {order.items.map((item) => (
                  <div key={item.id} className="w-20 h-24 bg-gray-50 overflow-hidden">
                    <img 
                      className="w-full h-full object-cover grayscale-[0.2] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700" 
                      src={item.image} 
                      alt={item.name} 
                    />
                  </div>
                ))}
                {order.moreItemsCount > 0 && (
                  <div className="flex items-center justify-center w-20 h-24 border border-gray-100 bg-white text-[10px] uppercase font-label tracking-widest text-gray-400">
                    +{order.moreItemsCount} More
                  </div>
                )}
              </div>

              {/* Financial & Actions */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-8 lg:gap-16">
                <div className="text-right lg:min-w-[120px]">
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-label mb-1">Total</p>
                  <p className="text-xl font-serif text-black">${order.total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                </div>
                <div className="flex items-center gap-6">
                  <button className="bg-black text-white px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-label hover:bg-secondary transition-colors duration-300">
                    View Details
                  </button>
                  <button className="text-gray-400 text-[10px] uppercase tracking-[0.2em] font-label hover:text-black transition-colors duration-300 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">refresh</span>
                    Reorder
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Support Section */}
      <div className="mt-32 pt-24 border-t border-gray-100 flex flex-col items-center text-center">
        <h3 className="font-serif text-3xl mb-6">Need assistance?</h3>
        <p className="text-gray-600 font-body max-w-md mb-10 leading-relaxed text-sm">
          Our concierge is available to discuss your orders, returns, or styling needs.
        </p>
        <a className="border-b border-black pb-1 text-[10px] uppercase tracking-[0.3em] font-bold text-black hover:text-secondary hover:border-secondary transition-all" href="/contact">
          Contact Atelier Support
        </a>
      </div>
    </main>
  );
};

export default OrderHistory;
