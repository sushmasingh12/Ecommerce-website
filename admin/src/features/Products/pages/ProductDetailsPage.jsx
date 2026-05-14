import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/productsSlice';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { items, isLoading } = useSelector((state) => state.products);
  
  const product = items.find((p) => p.id === id);

  useEffect(() => {
    if (!product) {
      dispatch(fetchProducts());
    }
  }, [dispatch, product]);

  if (isLoading) return <div className="p-12 text-center text-on-surface-variant font-bold">Loading product details...</div>;
  if (!product) return <div className="p-12 text-center text-error font-bold">Product not found.</div>;

  return (
    <div className="p-8 lg:p-12 max-w-6xl mx-auto space-y-12">
      {/* Header / Breadcrumbs */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/products" className="p-2 hover:bg-surface-container rounded-full transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight text-on-surface">Product Details</h1>
        </div>
        <Link 
          to={`/product/edit/${id}`}
          className="px-6 py-2.5 bg-primary text-on-primary font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">edit</span>
          Edit Product
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Images Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="aspect-square rounded-3xl bg-surface-container-lowest border border-outline-variant/10 overflow-hidden shadow-sm">
            {(product.images?.[0]?.url || product.image) ? (
              <img 
                src={product.images?.[0]?.url || product.image} 
                alt={product.name || product.title} 
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-outline">
                <span className="material-symbols-outlined text-6xl">inventory_2</span>
              </div>
            )}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images?.slice(1).map((img, i) => (
              <div key={i} className="aspect-square rounded-xl bg-surface-container-lowest border border-outline-variant/10 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                <img src={img.url} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Info Column */}
        <div className="lg:col-span-7 space-y-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-widest">
                {product.category}
              </span>
              {product.subcategory && (
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">
                  {product.subcategory}
                </span>
              )}
            </div>
            <h2 className="text-4xl font-bold text-on-surface mt-4">{product.title}</h2>
            {product.subdesc && <p className="text-lg font-medium text-primary mt-1 italic">{product.subdesc}</p>}
            <p className="text-on-surface-variant mt-4 leading-relaxed">{product.description}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-outline-variant/10">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant block mb-1">Price</label>
              <p className="text-2xl font-bold text-on-surface">{product.currency || 'INR'} {product.basePrice || product.price}</p>
              {product.discount > 0 && (
                <span className="text-xs font-bold text-emerald-500">-{product.discount}% OFF</span>
              )}
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant block mb-1">In Stock</label>
              <div className="flex items-center gap-2">
                 <span className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-emerald-500' : product.stock > 0 ? 'bg-amber-500' : 'bg-error'}`}></span>
                 <p className="text-2xl font-bold text-on-surface">{product.stock}</p>
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant block mb-1">Brand</label>
              <p className="text-lg font-bold text-on-surface">{product.brand || 'N/A'}</p>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant block mb-1">Gender</label>
              <p className="text-lg font-bold text-on-surface">{product.gender || 'Unisex'}</p>
            </div>
          </div>

          <div className="space-y-10">
            {/* Highlights */}
            {product.highlights?.length > 0 && (
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant block mb-3">Highlights</label>
                <ul className="grid grid-cols-2 gap-x-8 gap-y-2 list-disc pl-4 text-sm text-on-surface-variant">
                  {product.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specifications & Composition */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant block border-b border-outline-variant/10 pb-2">Specifications</label>
                <div className="space-y-3">
                  {Object.entries(product.specifications || {}).map(([key, val]) => (
                    val && (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-on-surface-variant uppercase tracking-tighter text-[10px] font-bold">{key}</span>
                        <span className="text-on-surface font-medium">{val}</span>
                      </div>
                    )
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant block border-b border-outline-variant/10 pb-2">Composition & Care</label>
                <div className="space-y-3">
                  {Object.entries(product.composition || {}).map(([key, val]) => (
                    val && (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-on-surface-variant uppercase tracking-tighter text-[10px] font-bold">{key}</span>
                        <span className="text-on-surface font-medium">{val}</span>
                      </div>
                    )
                  ))}
                </div>
              </div>
            </div>

            {/* Shipping & Artisan Note */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant block border-b border-outline-variant/10 pb-2">Shipping Details</label>
                <div className="space-y-3 text-sm">
                  {Object.entries(product.shippingDetails || {}).map(([key, val]) => (
                    val && (
                      <div key={key} className="space-y-1">
                        <p className="text-on-surface-variant uppercase tracking-tighter text-[9px] font-bold">{key}</p>
                        <p className="text-on-surface font-medium">{val}</p>
                      </div>
                    )
                  ))}
                </div>
              </div>
              {product.artisanNote && (
                <div className="space-y-4">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant block border-b border-outline-variant/10 pb-2">Artisan's Note</label>
                  <p className="text-sm text-on-surface-variant italic leading-relaxed">
                    "{product.artisanNote}"
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant block mb-3">Attributes</label>
              <div className="flex flex-wrap gap-3">
                {product.colors?.map(c => (
                  <span key={c} className="px-4 py-2 bg-surface-container rounded-xl text-sm font-medium border border-outline-variant/10">{c}</span>
                ))}
                {product.sizes?.map(s => (
                  <span key={s} className="px-4 py-2 bg-surface-container rounded-xl text-sm font-medium border border-outline-variant/10">{s}</span>
                ))}
                {product.materials?.map(m => (
                  <span key={m} className="px-4 py-2 bg-surface-container rounded-xl text-sm font-medium border border-outline-variant/10">{m}</span>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant block mb-3">Tags</label>
              <div className="flex flex-wrap gap-2">
                {product.tags?.map(t => (
                  <span key={t} className="px-3 py-1 bg-surface-container-high text-on-surface-variant rounded-lg text-xs font-bold">{t}</span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/10">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1 block">SKU</label>
                <p className="font-mono text-sm font-bold text-on-surface">{product.sku}</p>
              </div>
              <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/10">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1 block">Created On</label>
                <p className="text-sm font-medium text-on-surface">{new Date(product.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            {(product.seoTitle || product.seoDescription) && (
              <div className="p-6 rounded-2xl bg-surface-container-low/50 border border-outline-variant/10 space-y-4">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest block">SEO Preview</label>
                <div>
                  <p className="text-primary text-lg font-medium leading-tight hover:underline cursor-pointer">
                    {product.seoTitle || product.title}
                  </p>
                  <p className="text-emerald-700 text-xs mt-1">
                    bazario.com/products/{product.seoUrl || product.sku}
                  </p>
                  <p className="text-on-surface-variant text-sm mt-1 line-clamp-2">
                    {product.seoDescription || product.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
