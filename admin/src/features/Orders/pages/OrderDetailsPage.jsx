import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UpdateStatusModal from '../components/UpdateStatusModal';

const OrderDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isUpdateStatusModalOpen, setIsUpdateStatusModalOpen] = useState(false);

  // Mock data - in a real app, you'd fetch this using the id
  const orderData = {
    id: id || "ORD-94210",
    date: "Oct 24, 2024 at 2:45 PM",
    itemsCount: 3,
    total: 682.40,
    subtotal: 645.00,
    shipping: 12.50,
    tax: 48.37,
    discount: 23.47,
    status: "Processing",
    paymentMethod: "VISA",
    authCode: "9142",
    customer: {
      name: "Jordan Smith",
      email: "j.smith@corporate.com",
      phone: "+1 (415) 555-0198",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkpo_rL3zgwpChuPaq0jeVIkdbyjRiInoQhdwTW50Yhnlths0SNRHEkM-p4AErVJy6Ku-GSFU9rnM3UVQ3CLRv2adisgMu1KCvEeMZ96qvDdfeAmZ-5e1QvWyoP1uGqNxT-xasIbMiLzzcoaphLForxpK8cFnuYeewFlRxM18-gTsTWN9TOm6JWpLjKlFg8NwZ3lQ2VrjtGvAEkZwrlqt75QubroA_52jGpKi2dmn1CzfqD6bnbD9BZCVI4Jd9Lr5dvsVtymMjAwZp",
      address: "421 Market Street, Apt 12B\nSan Francisco, CA 94105\nUnited States",
      isVIP: true
    },
    items: [
      {
        id: 1,
        name: "Precision Run Elite",
        variant: "Crimson Red / Size 10",
        sku: "PRE-RD-10",
        price: 180.00,
        qty: 1,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBfLp8jxrTn_1w7_VIC4hvzLlUhpof5RRTgnNF6kDGoCC6LEMVT6lDA-8o0YrvQZ1Vc-S_OJAeEKzMMMf4Em5XFT75YknnGmdLerUEolrOeO3CsBlaaLOx7Vr4O4_HSTJz8J8hOvdf6gUOej5mG8GGtgrybalKu8sCXnzFHnADwdmv_xaz1YqEUMEYotc1xtqUi2yagVPLB0N4zgsfRJB12jUTNDWnI7zDg2YgE3qxsnE0-U4h6HZ8IxYcXXgUjpJ9i5OaWXdXXcxnR"
      },
      {
        id: 2,
        name: "Minimalist Series Chrono",
        variant: "Arctic White / Silver",
        sku: "MSC-WT-SL",
        price: 320.00,
        qty: 1,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBggxFP5iWmZzdQkasMpN08QhcEDFP9Cpm_oK5xJz7zXGSLHl7rcqEElrtS6NJs2tvhlwLmWR5jmtLuqt-QmJRAgv3B1Qfd_QK-0RYI2OKWR8EUubBM3_KsEt0c14Qrb9RrQKtxwIR1qMwT1dHrqNAq7OsPPv7JJt7CMnLcpbdxDcfj9phPc2jb9baDinOeIrghYvMXioUEFh2ST16Xx2Zj3frnf5elEZG_Zp1dC9xXjMBPU9OmegVvXg5PL626Iam4Lbu1TvS1Cu_"
      },
      {
        id: 3,
        name: "Urban Commuter Pack",
        variant: "Obsidian Black",
        sku: "UCP-BK-OS",
        price: 145.00,
        qty: 1,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9Ss0lq2l5AwMg4fKqFO1MHc4XvDN1ER5x5u_s8nox3vpnXBiniJlJvX4YFdx3cktMqsS6o44qZwnlEfjaCoE5SN7Mar8dkhZowOn_MrjdG5GONLYuddMVltXrXf2tL2RNPjxBHyrnkX-yjDXsCwt5_yaeE2qMg6Gbo0L7r8GIPW8B11NHJvPU_OldXY5mlIUvyc5BCFsLNoC9ExyaPtPoPpvunKv1NgCxcnVlT4bWXsJDH0S51XlO1HeI5KyK73mCyN0DzWZMPQVd"
      }
    ],
    shippingInfo: {
      carrier: "FedEx Ground",
      estDelivery: "Oct 28, 2024",
      trackingNumber: "FDX-9002-1182-4421",
      progress: 45,
      currentLocation: "Oakland Sort Facility"
    },
    timeline: [
      {
        id: 1,
        type: 'status',
        icon: 'inventory',
        color: 'blue',
        title: 'Order moved to processing',
        time: 'Today, 10:24 AM',
        actor: 'Automated System'
      },
      {
        id: 2,
        type: 'note',
        icon: 'note',
        color: 'orange',
        title: 'Internal Note',
        content: '"Customer requested discreet packaging for this order. Already flagged for warehouse team."',
        time: 'Oct 24, 3:15 PM',
        actor: 'Sarah Mitchell, Support Lead'
      },
      {
        id: 3,
        type: 'status',
        icon: 'check_circle',
        color: 'green',
        title: 'Payment confirmed successfully',
        time: 'Oct 24, 2:48 PM',
        actor: 'Stripe Gateway'
      },
      {
        id: 4,
        type: 'status',
        icon: 'shopping_basket',
        color: 'slate',
        title: 'Order placed by Jordan Smith',
        time: 'Oct 24, 2:45 PM',
        actor: 'Web Checkout',
        dimmed: true
      }
    ]
  };

  return (
    <div className="p-8 lg:p-12 max-w-7xl mx-auto w-full min-h-screen bg-surface-bright/20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl lg:text-4xl font-noto font-bold text-on-surface">Order Details</h1>
            <span className="px-3 py-1 bg-secondary-container text-on-secondary-container text-xs font-bold tracking-wider rounded-full">#{orderData.id}</span>
          </div>
          <div className="flex items-center gap-4 text-on-surface-variant text-sm">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">calendar_today</span>
              {orderData.date}
            </span>
            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
              {orderData.itemsCount} Items Ordered
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">

          <button
            onClick={() => setIsUpdateStatusModalOpen(true)}
            className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg shadow-lg hover:bg-primary-container transition-all flex items-center gap-2"
          >
            Update Status <span className="material-symbols-outlined text-[20px]">edit_note</span>
          </button>
        </div>
      </div>

      <UpdateStatusModal
        isOpen={isUpdateStatusModalOpen}
        onClose={() => setIsUpdateStatusModalOpen(false)}
        orderId={orderData.id}
      />

      {/* Order Tracker */}
      <div className="mb-12 relative">
        <div className="absolute top-5 left-0 w-full h-0.5 bg-slate-100 -z-10"></div>
        <div className="flex justify-between relative z-10">
          {[
            { label: 'Placed', icon: 'check', completed: true },
            { label: 'Confirmed', icon: 'check', completed: true },
            { label: 'Processing', icon: 'inventory_2', current: true },
            { label: 'Packed', icon: 'package_2', pending: true },
            { label: 'Shipped', icon: 'local_shipping', pending: true },
            { label: 'Out for Delivery', icon: 'distance', pending: true },
            { label: 'Delivered', icon: 'home_pin', pending: true }
          ].map((step, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ring-4 ring-white shadow-sm ${step.completed ? 'bg-primary text-white' :
                  step.current ? 'bg-white text-primary ring-4 ring-primary/20 shadow-md border-2 border-primary' :
                    'bg-slate-100 text-slate-400'
                }`}>
                <span className="material-symbols-outlined text-lg">{step.icon}</span>
              </div>
              <span className={`text-[11px] font-bold uppercase tracking-wider ${step.completed || step.current ? 'text-primary' : 'text-slate-400'
                }`}>{step.label}</span>
            </div>
          ))}
        </div>
        <div className="absolute top-5 left-0 h-0.5 bg-primary -z-10" style={{ width: '33.33%' }}></div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-8 space-y-8">
          {/* Ordered Products */}
          <section className="bg-surface-container-lowest rounded-xl ambient-shadow overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-50 flex items-center justify-between">
              <h3 className="text-lg font-noto font-bold">Ordered Products</h3>
              <span className="text-xs font-bold uppercase tracking-wider text-on-secondary-container">{orderData.itemsCount} Items</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-container-low">
                    <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-on-secondary-container">Product</th>
                    <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-on-secondary-container">SKU</th>
                    <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-on-secondary-container">Price</th>
                    <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-on-secondary-container">Qty</th>
                    <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-on-secondary-container text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {orderData.items.map((item) => (
                    <tr key={item.id} className="hover:bg-surface-bright transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-surface-container rounded-lg overflow-hidden flex-shrink-0">
                            <img alt={item.name} src={item.image} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="font-semibold text-on-surface">{item.name}</p>
                            <p className="text-xs text-on-surface-variant">Variant: {item.variant}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-mono text-on-surface-variant">{item.sku}</td>
                      <td className="px-6 py-4 text-sm font-medium">${item.price.toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm">{item.qty}</td>
                      <td className="px-6 py-4 text-sm font-bold text-right">${(item.price * item.qty).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Shipping & Delivery */}
          <section className="bg-surface-container-lowest rounded-xl ambient-shadow overflow-hidden p-6">
            <h3 className="text-lg font-noto font-bold mb-6">Shipping & Delivery</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary">local_shipping</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-on-secondary-container mb-1">Carrier Partner</p>
                    <p className="font-bold text-on-surface text-lg">{orderData.shippingInfo.carrier}</p>
                    <p className="text-sm text-on-surface-variant">Est. Delivery: {orderData.shippingInfo.estDelivery}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-on-secondary-container mb-2">Tracking Number</p>
                  <div className="flex items-center justify-between p-3 bg-surface-container rounded-lg">
                    <span className="font-mono font-medium">{orderData.shippingInfo.trackingNumber}</span>
                    <button className="text-primary text-sm font-bold">Track</button>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-on-secondary-container mb-2">
                    <span>Progress</span>
                    <span>{orderData.shippingInfo.progress}% Complete</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${orderData.shippingInfo.progress}%` }}></div>
                  </div>
                </div>
              </div>
              <div className="relative h-48 md:h-full min-h-[200px] rounded-xl overflow-hidden bg-slate-100 group">
                <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=San+Francisco&zoom=13&size=600x400&sensor=false')] bg-cover bg-center grayscale opacity-70 group-hover:grayscale-0 transition-all duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-8 h-8 bg-primary rounded-full border-4 border-white shadow-xl animate-pulse"></div>
                </div>
                <div className="absolute bottom-3 left-3 glass-panel px-3 py-1.5 rounded-lg border border-white/50 text-[10px] font-bold uppercase tracking-wider">
                  En Route: {orderData.shippingInfo.currentLocation}
                </div>
              </div>
            </div>
          </section>

          {/* Timeline & Activity */}
          <section className="bg-surface-container-lowest rounded-xl ambient-shadow p-6">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-noto font-bold">Timeline & Activity</h3>
              <button className="text-primary text-sm font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px]">add</span> Add Note
              </button>
            </div>
            <div className="space-y-8 relative">
              <div className="absolute top-0 left-4 w-px h-full bg-slate-100 -z-10"></div>
              {orderData.timeline.map((event) => (
                <div key={event.id} className={`flex gap-6 relative ${event.dimmed ? 'opacity-60' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ring-4 ring-white ${event.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                      event.color === 'orange' ? 'bg-orange-100 text-orange-600' :
                        event.color === 'green' ? 'bg-green-100 text-green-600' :
                          'bg-slate-100 text-slate-400'
                    }`}>
                    <span className={`material-symbols-outlined text-sm ${event.type === 'note' ? 'fill-current' : ''}`}>{event.icon}</span>
                  </div>
                  <div className={event.type === 'note' ? 'flex-1 p-4 bg-surface-container-low rounded-lg border-l-4 border-orange-400' : ''}>
                    <p className={`font-bold text-on-surface ${event.type === 'note' ? 'text-sm mb-1' : ''}`}>{event.title}</p>
                    {event.content && <p className="text-sm text-on-surface-variant italic">{event.content}</p>}
                    <p className={`text-xs text-on-surface-variant ${event.type === 'note' ? 'text-[10px] font-bold uppercase tracking-wider text-on-secondary-container mt-2' : ''}`}>
                      {event.type === 'note' ? `— ${event.actor}` : `${event.time} • ${event.actor}`}
                    </p>
                    {event.type === 'note' && <p className="text-[10px] text-on-surface-variant mt-0.5">{event.time}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN (Sidebar) */}
        <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
          {/* Order Summary */}
          <section className="bg-surface-container-lowest rounded-xl ambient-shadow overflow-hidden">
            <div className="bg-gradient-to-br from-primary to-primary-container p-6 text-white">
              <h3 className="text-xs font-bold uppercase tracking-widest opacity-80 mb-4">Final Total</h3>
              <p className="text-4xl font-noto font-bold">${orderData.total.toFixed(2)}</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-on-surface-variant">Subtotal</span>
                <span className="font-semibold text-on-surface">${orderData.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-on-surface-variant">Shipping ({orderData.shippingInfo.carrier})</span>
                <span className="font-semibold text-on-surface">${orderData.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-on-surface-variant">Estimated Tax (7.5%)</span>
                <span className="font-semibold text-on-surface">${orderData.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-green-600 font-medium">
                <span>Discount (FALL24)</span>
                <span>-${orderData.discount.toFixed(2)}</span>
              </div>
              <div className="pt-4 border-t border-slate-50">
                <div className="flex items-center gap-2 p-3 bg-secondary-container/30 rounded-lg">
                  <span className="material-symbols-outlined text-primary text-sm fill-current">verified</span>
                  <span className="text-xs font-bold text-primary uppercase">PAID VIA {orderData.paymentMethod} • AUTH CODE: {orderData.authCode}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Customer Profile */}
          <section className="bg-surface-container-lowest rounded-xl ambient-shadow p-6">
            <div className="flex items-start justify-between mb-6">
              <h3 className="text-lg font-noto font-bold">Customer</h3>
              {orderData.customer.isVIP && (
                <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-md">VIP Member</span>
              )}
            </div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-full bg-slate-100 overflow-hidden ring-2 ring-primary/10">
                <img alt={orderData.customer.name} src={orderData.customer.avatar} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-bold text-lg text-on-surface leading-tight">{orderData.customer.name}</p>
                <p className="text-sm text-on-surface-variant">{orderData.customer.email}</p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-on-secondary-container mb-2">Shipping Address</p>
                <p className="text-sm text-on-surface leading-relaxed whitespace-pre-line">
                  {orderData.customer.address}
                </p>
              </div>
              <div className="pt-4 border-t border-slate-50">
                <p className="text-[10px] font-bold uppercase tracking-widest text-on-secondary-container mb-2">Contact Details</p>
                <p className="text-sm text-on-surface">{orderData.customer.phone}</p>
              </div>
            </div>
          </section>

          {/* AI Insights */}
          <section className="glass-panel border border-white rounded-xl ambient-shadow p-6 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 blur-3xl rounded-full"></div>
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-primary animate-pulse">auto_awesome</span>
              <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface">AI Insights</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-green-600 text-sm">gpp_good</span>
                  <span className="text-xs font-semibold">Fraud Risk</span>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-green-600 bg-green-50 px-2 py-0.5 rounded">Low</span>
              </div>
              <div className="p-3 bg-white/50 rounded-lg">
                <p className="text-xs font-semibold mb-1">Customer Trend</p>
                <p className="text-[11px] text-on-surface-variant">Repeat customer (5 orders). 15% higher LTV than segment average.</p>
              </div>
              <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                <p className="text-xs font-bold text-primary mb-1">High-Value Alert</p>
                <p className="text-[11px] text-primary/80">This order is in the top 5% of monthly transactions. Priority packing recommended.</p>
              </div>
            </div>
          </section>

          {/* Admin Actions */}
          <section className="space-y-3">
            <button className="w-full py-3 bg-surface-container-highest text-on-surface text-sm font-bold rounded-xl hover:bg-surface-variant transition-all flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[20px]">mail</span> Contact Customer
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button className="py-3 bg-red-50 text-red-600 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-red-100 transition-all">
                Cancel Order
              </button>
              <button className="py-3 bg-surface-container text-on-surface text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-slate-200 transition-all">
                Refund
              </button>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
