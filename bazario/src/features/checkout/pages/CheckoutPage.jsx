import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useCart } from '../../cart/hooks/useCart';

const CheckoutPage = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      postalCode: '',
      deliveryMethod: 'standard',
      includePackaging: false,
      giftMessage: '',
      paymentMethod: 'card',
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    }
  });

  const deliveryMethod = watch('deliveryMethod');
  const paymentMethod = watch('paymentMethod');

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Calculations
  const subtotal = total;
  const shippingCost = deliveryMethod === 'express' ? 3000 : 0;
  const tax = subtotal * 0.18; // GST 18%
  const finalTotal = subtotal + shippingCost + tax;

  const onSubmit = (data) => {
    // Mock order placement
    console.log('Order Placed:', {
      items,
      ...data,
      finalTotal
    });
    alert('Thank you for your order! Your acquisition is being prepared.');
    clearCart();
    navigate('/account/orders');
  };

  return (
    <main className="pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-480 mx-auto min-h-screen text-on-surface">
      <div className="mb-16">
        <h1 className="font-headline text-5xl md:text-6xl tracking-tight leading-tight">Checkout</h1>
        <p className="font-label text-xs tracking-widest uppercase mt-4 text-on-surface-variant/60">
          Secure Transaction ·
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        {/* Left Column: Flow */}
        <div className="lg:col-span-7 space-y-20">
          
          {/* 01 Shipping Information */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <span className="font-label text-xs font-bold px-2 py-1 bg-primary text-surface">01</span>
              <h2 className="font-headline text-2xl">Shipping Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
              <div className="flex flex-col gap-2">
                <label className="font-label text-[10px] tracking-widest uppercase text-on-surface-variant/60 font-bold">First Name</label>
                <input 
                  className={`bg-transparent border-b py-2 font-body text-sm placeholder:text-outline-variant focus:border-primary outline-none transition-colors ${errors.firstName ? 'border-red-500' : 'border-outline-variant/30'}`} 
                  placeholder="Aarav" 
                  type="text"
                  {...register('firstName', { required: true })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label text-[10px] tracking-widest uppercase text-on-surface-variant/60 font-bold">Last Name</label>
                <input 
                  className={`bg-transparent border-b py-2 font-body text-sm placeholder:text-outline-variant focus:border-primary outline-none transition-colors ${errors.lastName ? 'border-red-500' : 'border-outline-variant/30'}`} 
                  placeholder="Sharma" 
                  type="text"
                  {...register('lastName', { required: true })}
                />
              </div>
              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="font-label text-[10px] tracking-widest uppercase text-on-surface-variant/60 font-bold">Street Address</label>
                <input 
                  className={`bg-transparent border-b py-2 font-body text-sm placeholder:text-outline-variant focus:border-primary outline-none transition-colors ${errors.address ? 'border-red-500' : 'border-outline-variant/30'}`} 
                  placeholder="12, Lodhi Road, Diplomatic Enclave" 
                  type="text"
                  {...register('address', { required: true })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label text-[10px] tracking-widest uppercase text-on-surface-variant/60 font-bold">City</label>
                <input 
                  className={`bg-transparent border-b py-2 font-body text-sm placeholder:text-outline-variant focus:border-primary outline-none transition-colors ${errors.city ? 'border-red-500' : 'border-outline-variant/30'}`} 
                  placeholder="New Delhi" 
                  type="text"
                  {...register('city', { required: true })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label text-[10px] tracking-widest uppercase text-on-surface-variant/60 font-bold">Postal Code</label>
                <input 
                  className={`bg-transparent border-b py-2 font-body text-sm placeholder:text-outline-variant focus:border-primary outline-none transition-colors ${errors.postalCode ? 'border-red-500' : 'border-outline-variant/30'}`} 
                  placeholder="110003" 
                  type="text"
                  {...register('postalCode', { required: true })}
                />
              </div>
            </div>
          </section>

          {/* 02 Delivery Method */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <span className="font-label text-xs font-bold px-2 py-1 bg-primary text-surface">02</span>
              <h2 className="font-headline text-2xl">Delivery Method</h2>
            </div>
            <div className="space-y-4">
              {[
                { id: 'standard', name: 'Standard Shipping', time: '3-5 Business Days', price: 'Complimentary' },
                { id: 'express', name: 'Express Delivery', time: 'Next Business Day', price: formatPrice(3000) },
                { id: 'pickup', name: 'Boutique Pickup', time: 'Available within 2 hours', price: 'Complimentary' }
              ].map((method) => (
                <label 
                  key={method.id}
                  className={`group flex items-center justify-between p-6 cursor-pointer transition-all duration-300 border ${
                    deliveryMethod === method.id ? 'bg-primary/5 border-primary' : 'border-outline-variant/30 hover:bg-surface-container'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <input 
                      type="radio"
                      value={method.id}
                      {...register('deliveryMethod')}
                      className="text-primary focus:ring-0 w-4 h-4 accent-primary"
                    />
                    <div className="flex flex-col">
                      <span className="font-label text-sm font-semibold tracking-wide">{method.name}</span>
                      <span className="font-body text-xs text-on-surface-variant/60">{method.time}</span>
                    </div>
                  </div>
                  <span className={`font-label text-sm uppercase tracking-wider ${method.price === 'Complimentary' ? 'text-emerald-600' : ''}`}>{method.price}</span>
                </label>
              ))}
            </div>
          </section>

          {/* 03 Gift Services */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <span className="font-label text-xs font-bold px-2 py-1 bg-primary text-surface">03</span>
              <h2 className="font-headline text-2xl">Gift Services</h2>
            </div>
            <div className="bg-surface-container-low p-8 space-y-6 rounded-none">
              <div className="flex items-start gap-4">
                <input 
                  id="gift_wrap" 
                  type="checkbox"
                  {...register('includePackaging')}
                  className="mt-1 text-primary focus:ring-0 accent-primary" 
                />
                <div>
                  <label className="font-label text-sm font-semibold cursor-pointer" htmlFor="gift_wrap">
                    Include Signature Packaging
                  </label>
                  <p className="font-body text-xs text-on-surface-variant/60 mt-1">Our items are presented in a signature box tied with a silk ribbon.</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label text-[10px] tracking-widest uppercase text-on-surface-variant/60 font-bold">Personalized Message</label>
                <textarea 
                  className="bg-transparent border-b border-outline-variant/30 py-2 font-body text-sm resize-none placeholder:text-outline-variant outline-none focus:border-primary transition-colors" 
                  placeholder="Enter your gift message here..." 
                  rows="3"
                  {...register('giftMessage')}
                ></textarea>
              </div>
            </div>
          </section>

          {/* 04 Payment Details */}
          <section>
            <div className="flex items-center gap-4 mb-8">
              <span className="font-label text-xs font-bold px-2 py-1 bg-primary text-surface">04</span>
              <h2 className="font-headline text-2xl">Payment Details</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              <button 
                type="button"
                onClick={() => setValue('paymentMethod', 'card')}
                className={`flex items-center justify-center gap-2 p-4 transition-all duration-300 ${
                  paymentMethod === 'card' ? 'bg-primary text-surface' : 'border border-outline-variant/30 hover:bg-surface-container'
                }`}
              >
                <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>credit_card</span>
                <span className="font-label text-xs uppercase tracking-widest">Credit/Debit Card</span>
              </button>
              <button 
                type="button"
                onClick={() => setValue('paymentMethod', 'upi')}
                className={`flex items-center justify-center gap-2 p-4 transition-all duration-300 ${
                  paymentMethod === 'upi' ? 'bg-primary text-surface' : 'border border-outline-variant/30 hover:bg-surface-container'
                }`}
              >
                <span className="material-symbols-outlined">payments</span>
                <span className="font-label text-xs uppercase tracking-widest">UPI Payment</span>
              </button>
            </div>
            
            {paymentMethod === 'card' && (
              <div className="space-y-8 animate-fade-in">
                <div className="flex flex-col gap-2">
                  <label className="font-label text-[10px] tracking-widest uppercase text-on-surface-variant/60 font-bold">Card Number</label>
                  <div className="relative">
                    <input 
                      className="w-full bg-transparent border-b border-outline-variant/30 py-2 font-body text-sm tracking-[0.2em] outline-none focus:border-primary" 
                      placeholder="**** **** **** 4421" 
                      type="text"
                      {...register('cardNumber')}
                    />
                    <span className="absolute right-0 bottom-2 material-symbols-outlined text-outline-variant">lock</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="font-label text-[10px] tracking-widest uppercase text-on-surface-variant/60 font-bold">Expiry Date</label>
                    <input 
                      className="bg-transparent border-b border-outline-variant/30 py-2 font-body text-sm outline-none focus:border-primary" 
                      placeholder="MM / YY" 
                      type="text"
                      {...register('expiryDate')}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-label text-[10px] tracking-widest uppercase text-on-surface-variant/60 font-bold">CVV</label>
                    <input 
                      className="bg-transparent border-b border-outline-variant/30 py-2 font-body text-sm outline-none focus:border-primary" 
                      placeholder="000" 
                      type="password"
                      {...register('cvv')}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Trust/Security */}
            <div className="mt-12 flex items-center justify-center gap-8 border-t border-outline-variant/10 pt-12">
              <div className="flex flex-col items-center gap-2">
                <span className="material-symbols-outlined text-outline-variant/40 text-xl">verified_user</span>
                <span className="font-label text-[9px] tracking-widest uppercase text-on-surface-variant/50">Secure PIN</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="material-symbols-outlined text-outline-variant/40 text-xl">rebase_edit</span>
                <span className="font-label text-[9px] tracking-widest uppercase text-on-surface-variant/50">256-bit AES</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="material-symbols-outlined text-outline-variant/40 text-xl">history</span>
                <span className="font-label text-[9px] tracking-widest uppercase text-on-surface-variant/50">Authentic Only</span>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Summary */}
        <div className="lg:col-span-5">
          <div className="sticky top-32 space-y-10">
            <div className="bg-surface-container-low p-8 md:p-12">
              <h3 className="font-headline text-xl mb-10 tracking-tight">Acquisition Details</h3>
              
              {/* Item List */}
              <div className="space-y-8 mb-12 max-h-100 overflow-y-auto pr-4 scrollbar-hide">
                {items.map((item) => (
                  <div key={`${item.id}-${item.variant}`} className="flex gap-6">
                    <div className="w-24 h-32 bg-surface-container shrink-0 overflow-hidden">
                      <img alt={item.name} className="w-full h-full object-cover" src={item.image} />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h4 className="font-label text-sm font-semibold uppercase tracking-tight line-clamp-2">{item.name}</h4>
                        <p className="font-body text-[10px] uppercase tracking-widest text-on-surface-variant/60 mt-1">{item.variant}</p>
                      </div>
                      <div className="flex justify-between items-end">
                        <span className="text-[10px] font-bold text-on-surface-variant/40">Qty {item.quantity}</span>
                        <span className="font-body text-sm font-medium">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Promo Code */}
              <div className="mb-12">
                <label className="font-label text-[10px] tracking-widest uppercase text-on-surface-variant/60 block mb-2 font-bold">Promo Code</label>
                <div className="flex border-b border-outline-variant/30">
                  <input className="grow bg-transparent py-2 font-body text-sm border-none focus:ring-0 outline-none" placeholder="QWERSD12" type="text"/>
                  <button type="button" className="font-label text-[10px] tracking-widest uppercase px-4 hover:text-secondary transition-colors font-bold">Apply</button>
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-4 pt-8 border-t border-outline-variant/10">
                <div className="flex justify-between font-body text-sm">
                  <span className="text-on-surface-variant/60 uppercase tracking-tighter text-[11px]">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-on-surface-variant/60 uppercase tracking-tighter text-[11px]">Shipping</span>
                  <span className={`uppercase tracking-widest text-[10px] ${shippingCost === 0 ? 'text-emerald-600 font-bold' : 'font-medium'}`}>{shippingCost === 0 ? 'Complimentary' : formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-on-surface-variant/60 uppercase tracking-tighter text-[11px]">Tax (GST 18%)</span>
                  <span className="font-medium">{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between pt-6 border-t border-outline-variant/30">
                  <span className="font-headline text-2xl tracking-tight">Grand Total</span>
                  <span className="font-headline text-2xl font-bold tracking-tighter">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              <button 
                type="submit"
                disabled={items.length === 0}
                className={`w-full mt-12 py-6 font-label text-xs tracking-[0.3em] uppercase font-bold transition-all duration-500 shadow-xl active:scale-[0.98] ${
                  items.length > 0 ? 'bg-primary text-surface hover:opacity-90' : 'bg-outline-variant/10 text-on-surface-variant/30 cursor-not-allowed shadow-none'
                }`}
              >
                Place Order
              </button>
            </div>
            <div className="px-8 text-center text-on-surface-variant/40 mt-8">
              <p className="font-body text-[10px] leading-relaxed tracking-tight">
                By placing this order, you agree to Bazario House's <Link className="underline hover:text-primary" to="#">General Terms of Sale</Link> and <Link className="underline hover:text-primary" to="#">Privacy Policy</Link>.
              </p>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
};

export default CheckoutPage;
