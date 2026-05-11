import React from 'react';

const ProductSelection = () => {
  const selectedItems = [
    {
      id: 1,
      name: 'Series 7 Quantum Watch',
      sku: 'SW-7721-NV',
      price: 599.00,
      discount: 50.00,
      total: 549.00,
      quantity: 1,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSAppmO4mYoZTtChl8CIQwzi7tVJOCqDlgg8vqwO7BVOLzpdVKtyehqVJzNkQy3XxdAIP1ardxb-H-YXz63ijyJxJyvwwZClvqxsd-KNUOcJOo-enn1uh9QoQ6v4AIVxJ6H6Hq8ht8BeXHrrrbyu41gpFynS3LHl23VGZVMi2bV5G17fbPwdZeGEKLO-Jf_iwb1_Ao2pHG6k8r7mFfOsb27teJJB-OO9zNKD6HKfERDRLnmoNAH4SmY8hpK6e5RT9DDmOkiODH8aMe'
    },
    {
      id: 2,
      name: 'Acoustic Pro Headphones',
      sku: 'AP-2011-BK',
      price: 299.00,
      discount: 0,
      total: 598.00,
      quantity: 2,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBArj569WN_IchFY8lDCt6FuDghN5nP1tHXnHKQJin837u8btSOpLb2_IkrXtFNQ07MvuidaajP5BPbjVC-A_MZDVYE8PVCo6Ry9xhnQXCFfWLwlBU7_7Ty7B5ywo1Ajy0IdyEiNLXceXMqa1Lbn_oX84i7Xpdb3D_oqJBrlpa-U9CA-8fr2Lq5ZztU5m-kX-B-nwBNredFOZNcrpdmPJXwYR0OYy9A2CzJ7CUb14QpLBav43wgZXx_nrUQaYPlV9IVP8PtQyoYdCd7'
    }
  ];

  return (
    <section className="bg-surface-container-lowest rounded-lg p-8 shadow-sm border border-outline-variant/10">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">inventory_2</span>
          <h2 className="text-xl font-bold tracking-tight text-on-surface">Product Selection</h2>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-secondary-container rounded-full">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="text-[10px] font-bold text-primary tracking-widest uppercase">AI Suggestion Active</span>
        </div>
      </div>
      
      <div className="relative mb-8">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
        <input 
          className="w-full bg-surface-container-high border-none rounded-md pl-12 pr-4 py-4 text-on-surface focus:ring-2 focus:ring-primary/10 transition-all outline-none" 
          placeholder="Search products by name, SKU or category..." 
          type="text"
        />
      </div>

      <div className="flex flex-col gap-4">
        {selectedItems.map((item) => (
          <div key={item.id} className="group flex items-center gap-6 p-4 rounded-md hover:bg-surface-container-low transition-colors duration-300 border border-transparent hover:border-outline-variant/10">
            <img 
              alt={item.name} 
              className="w-16 h-16 rounded-md object-cover bg-slate-100 shadow-sm" 
              src={item.image} 
            />
            <div className="flex-grow">
              <h4 className="font-bold text-on-surface">{item.name}</h4>
              <p className="text-xs text-on-surface-variant font-medium tracking-wide">SKU: {item.sku}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <label className="text-[10px] uppercase font-bold text-outline tracking-wider">Quantity</label>
              <input 
                className="w-16 bg-surface-container-lowest border border-outline-variant/30 rounded px-2 py-1 text-center text-sm font-bold outline-none" 
                type="number" 
                defaultValue={item.quantity} 
              />
            </div>
            <div className="w-32 text-right">
              <p className="text-sm font-semibold text-on-surface">${item.price.toFixed(2)}</p>
              {item.discount > 0 ? (
                <p className="text-xs text-tertiary font-medium">-${item.discount.toFixed(2)} Disc.</p>
              ) : (
                <p className="text-xs text-on-surface-variant font-medium">No Discount</p>
              )}
            </div>
            <div className="w-24 text-right">
              <p className="font-bold text-on-surface">${item.total.toFixed(2)}</p>
            </div>
            <button className="material-symbols-outlined text-outline/30 hover:text-error transition-colors p-2">delete</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductSelection;
