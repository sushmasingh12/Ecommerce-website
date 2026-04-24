import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectOrders } from '../../orders/store/orderSlice';
import AccountLayout from './Accountlayout';

const STATUS_STYLES = {
  Delivered:  { bg: 'bg-green-50',  text: 'text-green-700',  dot: 'bg-green-500',  icon: 'check_circle' },
  Shipped:    { bg: 'bg-blue-50',   text: 'text-blue-700',   dot: 'bg-blue-500',   icon: 'local_shipping' },
  Processing: { bg: 'bg-yellow-50', text: 'text-yellow-700', dot: 'bg-yellow-500', icon: 'hourglass_top' },
  Cancelled:  { bg: 'bg-red-50',    text: 'text-red-600',    dot: 'bg-red-400',    icon: 'cancel' },
};

const FILTERS = ['All', 'Delivered', 'Shipped', 'Processing', 'Cancelled'];

const OrderHistory = () => {
  const orders = useSelector(selectOrders);
  const [filter, setFilter] = useState('All');
  const [expanded, setExpanded] = useState(null);

  const visible = filter === 'All' ? orders : orders.filter(o => o.status === filter);

  return (
    <AccountLayout>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-4">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary">shopping_bag</span>
          <h2 className="font-bold text-gray-900">My Orders</h2>
          <span className="ml-auto text-xs bg-gray-100 text-gray-600 font-semibold px-2.5 py-1 rounded-full">{orders.length} orders</span>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 px-5 py-3 overflow-x-auto no-scrollbar border-b border-gray-100">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                filter === f ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}>
              {f}
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <div className="py-16 text-center">
            <span className="material-symbols-outlined text-5xl text-gray-200">shopping_bag</span>
            <p className="text-gray-500 mt-3 font-medium">No orders found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {visible.map(order => {
              const s = STATUS_STYLES[order.status] || STATUS_STYLES.Processing;
              const open = expanded === order.id;
              return (
                <div key={order.id}>
                  {/* Order header */}
                  <div className="px-5 py-4">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-gray-900">Order #{order.id}</span>
                          <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${s.bg} ${s.text}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`}></span>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400">Placed on {order.date}
                          {order.deliveredOn && <> · Delivered on {order.deliveredOn}</>}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-base font-bold text-gray-900">₹{order.total.toLocaleString('en-IN')}</p>
                        <p className="text-xs text-gray-400">{order.paymentMethod}</p>
                      </div>
                    </div>

                    {/* Item previews */}
                    <div className="flex gap-3 mb-3">
                      {order.items.slice(0, 3).map(item => (
                        <div key={item.id} className="relative">
                          <img src={item.image} alt={item.name}
                            className="w-16 h-16 rounded-lg object-cover border border-gray-100" />
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                          +{order.items.length - 3}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => setExpanded(open ? null : order.id)}
                        className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-0.5">
                        {open ? 'Hide Details' : 'View Details'}
                        <span className="material-symbols-outlined text-sm">{open ? 'expand_less' : 'expand_more'}</span>
                      </button>
                      {order.status === 'Delivered' && (
                        <>
                          <span className="text-gray-200">|</span>
                          <button className="text-xs font-semibold text-gray-600 hover:text-gray-900">Rate & Review</button>
                          <span className="text-gray-200">|</span>
                          <button className="text-xs font-semibold text-gray-600 hover:text-gray-900">Return/Exchange</button>
                          <span className="text-gray-200">|</span>
                          <button className="text-xs font-semibold text-secondary hover:underline">Buy Again</button>
                        </>
                      )}
                      {(order.status === 'Shipped' || order.status === 'Processing') && (
                        <>
                          <span className="text-gray-200">|</span>
                          <button className="text-xs font-semibold text-blue-600 hover:underline">Track Order</button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Expanded detail */}
                  {open && (
                    <div className="bg-gray-50 px-5 py-4 border-t border-gray-100">
                      <div className="space-y-3 mb-4">
                        {order.items.map(item => (
                          <div key={item.id} className="flex gap-3 items-center">
                            <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover border border-gray-100 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-800 line-clamp-2">{item.name}</p>
                              <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                            </div>
                            <p className="text-sm font-bold text-gray-900 flex-shrink-0">₹{item.price.toLocaleString('en-IN')}</p>
                          </div>
                        ))}
                      </div>
                      <div className="pt-3 border-t border-gray-200 text-xs text-gray-500">
                        <p className="mb-1"><span className="font-semibold">Delivery address:</span> {order.address}</p>
                        <p><span className="font-semibold">Payment:</span> {order.paymentMethod}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AccountLayout>
  );
};

export default OrderHistory;