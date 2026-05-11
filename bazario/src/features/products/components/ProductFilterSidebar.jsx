import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { 
  toggleFilter, 
  setPriceRange, 
  setAvailability, 
  resetFilters 
} from '../store/productsSlice';
import { NAV_DATA } from '../../../shared/data/navigationData';

const ProductFilterSidebar = ({ category: propCategory }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.products);
  const { category: paramCategory, sub: currentSubSlug } = useParams();
  const currentCategorySlug = propCategory || paramCategory;

  const handleToggle = (type, value) => {
    dispatch(toggleFilter({ type, value }));
  };

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    dispatch(setPriceRange([0, value]));
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  // Find subcategories for current category
  const categoryData = NAV_DATA.find(cat => 
    cat.path === `/${currentCategorySlug}` || cat.path.endsWith(`/${currentCategorySlug}`)
  );
  const subcategories = categoryData?.subcategories || [];

  // Dynamic sizes based on category
  const getSizesByCategory = (cat) => {
    switch (cat) {
      case 'footwear':
        return ['39', '40', '41', '42', '43', '44'];
      case 'accessories':
        return ['One Size'];
      case 'men':
      case 'women':
      default:
        return ['S', 'M', 'L', 'XL'];
    }
  };
  
  const sizes = getSizesByCategory(currentCategorySlug);
  
  // Materials used in products
  const materials = [
    'Premium Cotton', 
    'Silk Crepe', 
    'Virgin Wool', 
    'Fine Merino', 
    'Organic Linen', 
    'Cotton Blend', 
    'Nappa Leather', 
    'Italian Calfskin', 
    'Leather', 
    'Canvas',
    'Brass Hardware',
    'Textured Cotton',
    'Cotton Twill',
    'Fleece Lining',
    'Vegan Leather',
    'Suede'
  ];
  const occasions = ['Casual', 'Work', 'Evening', 'Formal', 'Streetwear', 'Party'];
  const ratings = [5, 4, 3];
  
  const palette = [
    { name: 'Bone Ivory', class: 'bg-[#E5E2DC]', value: 'Bone Ivory' },
    { name: 'Charcoal', class: 'bg-[#363636]', value: 'Charcoal' },
    { name: 'Navy Blue', class: 'bg-[#000080]', value: 'Navy Blue' },
    { name: 'Maroon', class: 'bg-[#800000]', value: 'Maroon' },
    { name: 'White', class: 'bg-white', value: 'White' },
    { name: 'Black', class: 'bg-black', value: 'Black' }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <aside className="w-full md:w-64 shrink-0">
      <div className="flex items-center justify-between py-4 md:pt-0 mb-4 border-b border-outline-variant/30 md:border-none">
        <h2 className="hidden md:block font-serif text-xl font-light tracking-wide">Collection</h2>
        <button 
           onClick={handleReset}
           className="text-[10px] uppercase tracking-widest text-secondary hover:underline ml-auto"
        >
          Reset All
        </button>
      </div>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden w-full flex items-center justify-between py-4 border-b border-outline-variant/30 mb-8"
      >
        <span className="font-label text-[11px] uppercase tracking-widest font-medium">Filters & Sorting</span>
        <span className="material-symbols-outlined text-sm transition-transform duration-300" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}>
          expand_more
        </span>
      </button>

      <div className={`${isOpen ? 'block' : 'hidden'} md:block sticky top-32 space-y-10 pb-12 md:pb-0 h-[calc(100vh-160px)] overflow-y-auto no-scrollbar pr-2`}>
        {/* Collections */}
        {subcategories.length > 0 && (
          <section>
            <h3 className="font-label text-[11px] uppercase tracking-[0.2em] text-on-surface-variant/70 mb-4 font-bold">Collections</h3>
            <ul className="space-y-3 font-body text-sm tracking-wide">
              {subcategories.map((sub) => {
                const isSubActive = currentSubSlug === sub.path.split('/').pop();
                return (
                  <li key={sub.name}>
                    <Link 
                      to={sub.path}
                      className={`flex justify-between items-center group transition-all ${isSubActive ? 'text-secondary font-medium pl-2' : 'text-on-surface/70 hover:text-secondary'}`}
                    >
                      <span className="group-hover:translate-x-1 transition-transform">{sub.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {/* Filter: Price Range */}
        <section>
          <div className="flex justify-between items-center mb-6">
             <h3 className="font-label text-[11px] uppercase tracking-[0.2em] text-on-surface-variant/70">Price</h3>
             <span className="text-[10px] font-medium text-secondary">{formatPrice(filters.priceRange[1])}</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="5000" 
            step="100"
            value={filters.priceRange[1]}
            onChange={handlePriceChange}
            className="w-full accent-primary h-2 border border-secondary-container bg-outline-variant/30 rounded-lg appearance-none cursor-pointer mb-4"
          />
          <div className="flex justify-between text-[9px] text-on-surface-variant/50 uppercase tracking-tighter">
             <span>₹0</span>
             <span>₹5,000</span>
          </div>
        </section>

        {/* Filter: Size */}
        <section>
          <h3 className="font-label text-[11px] uppercase tracking-[0.2em] text-on-surface-variant/70 mb-5">Size</h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => {
              const isSelected = filters.sizes.includes(size);
              return (
                <button
                  key={size}
                  onClick={() => handleToggle('sizes', size)}
                  className={`h-7 min-w-8 px-2 border flex items-center justify-center text-[10px] transition-all duration-300 ${
                    isSelected 
                      ? 'border-primary bg-primary text-surface' 
                      : 'border-outline-variant/30 hover:border-primary text-on-surface'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </section>

        {/* Filter: Palette */}
        <section>
          <h3 className="font-label text-[11px] uppercase tracking-[0.2em] text-on-surface-variant/70 mb-5">Palette</h3>
          <div className="flex flex-wrap gap-3">
            {palette.map((color) => {
              const isSelected = filters.colors.includes(color.value);
              return (
                <button
                  key={color.name}
                  onClick={() => handleToggle('colors', color.value)}
                  className={`w-5 h-5 rounded-full border border-outline-variant/30 transition-all ${color.class} ${
                    isSelected ? 'ring-1 ring-offset-2 ring-primary ring-offset-surface' : 'hover:scale-110'
                  }`}
                  title={color.name}
                />
              );
            })}
          </div>
        </section>

        {/* Filter: Occasion */}
        <section>
          <h3 className="font-label text-[11px] uppercase tracking-[0.2em] text-on-surface-variant/70 mb-5">Occasion</h3>
          <div className="space-y-3">
            {occasions.map((occ) => {
              const isSelected = filters.occasions.includes(occ);
              return (
                <label 
                  key={occ} 
                  className="flex items-center gap-3 cursor-pointer group"
                  onClick={() => handleToggle('occasions', occ)}
                >
                  <div className={`w-3.5 h-3.5 border rounded-none flex items-center justify-center transition-colors ${
                    isSelected ? 'border-primary bg-primary' : 'border-outline-variant'
                  }`}>
                    {isSelected && <span className="material-symbols-outlined text-[10px] text-surface">check</span>}
                  </div>
                  <span className={`text-xs tracking-wide ${isSelected ? 'font-medium text-on-surface' : 'font-light text-on-surface/70 hover:text-on-surface'}`}>
                    {occ}
                  </span>
                </label>
              );
            })}
          </div>
        </section>

        {/* Filter: Rating */}
        <section>
          <h3 className="font-label text-[11px] uppercase tracking-[0.2em] text-on-surface-variant/70 mb-5">Customer Rating</h3>
          <div className="space-y-3">
            {ratings.map((rating) => {
              const isSelected = filters.ratings.includes(rating);
              return (
                <label 
                  key={rating} 
                  className="flex items-center gap-3 cursor-pointer group"
                  onClick={() => handleToggle('ratings', rating)}
                >
                  <div className={`w-3.5 h-3.5 border rounded-none flex items-center justify-center transition-colors ${
                    isSelected ? 'border-primary bg-primary' : 'border-outline-variant'
                  }`}>
                    {isSelected && <span className="material-symbols-outlined text-[10px] text-surface">check</span>}
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className={`material-symbols-outlined text-xs ${i < rating ? 'text-primary' : 'text-outline-variant'}`}
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    ))}
                    <span className="text-[10px] ml-1 text-on-surface/60">& up</span>
                  </div>
                </label>
              );
            })}
          </div>
        </section>

        {/* Filter: Availability */}
        <section>
          <h3 className="font-label text-[11px] uppercase tracking-[0.2em] text-on-surface-variant/70 mb-5">Availability</h3>
          <label 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => dispatch(setAvailability(filters.availability === 'inStock' ? 'all' : 'inStock'))}
          >
            <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${
              filters.availability === 'inStock' ? 'bg-primary' : 'bg-outline-variant/30'
            }`}>
              <div className={`w-3 h-3 rounded-full bg-surface transition-transform duration-300 ${
                filters.availability === 'inStock' ? 'translate-x-4' : 'translate-x-0'
              }`}></div>
            </div>
            <span className="text-xs tracking-wide text-on-surface/70">In Stock only</span>
          </label>
        </section>

        {/* Filter: Material */}
        <section>
          <h3 className="font-label text-[11px] uppercase tracking-[0.2em] text-on-surface-variant/70 mb-5">Material</h3>
          <div className="space-y-3">
            {materials.map((material) => {
              const isSelected = filters.materials.includes(material);
              return (
                <label 
                  key={material} 
                  className="flex items-center gap-3 cursor-pointer group"
                  onClick={() => handleToggle('materials', material)}
                >
                  <div className={`w-3.5 h-3.5 border rounded-none flex items-center justify-center transition-colors ${
                    isSelected ? 'border-primary bg-primary' : 'border-outline-variant'
                  }`}>
                    {isSelected && <span className="material-symbols-outlined text-[10px] text-surface">check</span>}
                  </div>
                  <span className={`text-xs tracking-wide ${isSelected ? 'font-medium text-on-surface' : 'font-light text-on-surface/70 hover:text-on-surface'}`}>
                    {material}
                  </span>
                </label>
              );
            })}
          </div>
        </section>
      </div>
    </aside>
  );
};

export default ProductFilterSidebar;
