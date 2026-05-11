import React from 'react';

import CustomerInfo from '../components/CustomerInfo';
import ProductSelection from '../components/ProductSelection';
import ShippingAddress from '../components/ShippingAddress';
import OrderLogistics from '../components/OrderLogistics';
import OrderSummary from '../components/OrderSummary';

const CreateOrderPage = () => {
  return (
    <main className="min-h-screen flex flex-col bg-background">
    
      {/* Canvas Body */}
      <div className="p-12 max-w-7xl mx-auto w-full flex-grow">
        
     
        <h1 className="text-2xl font-bold tracking-tight text-on-surface mb-10">
          Add New Order
        </h1>
      
        <div className="grid grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Primary Forms */}
          <div className="col-span-8 flex flex-col gap-8">
            <CustomerInfo />
            <ProductSelection />
            <ShippingAddress />
            <OrderLogistics />
          </div>

          {/* Right Column: Order Summary */}
          <OrderSummary />
          
        </div>
      </div>
    </main>
  );
};

export default CreateOrderPage;
