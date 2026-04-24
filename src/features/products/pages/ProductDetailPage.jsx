import React from 'react';
import { useParams } from 'react-router-dom';
import useProductDetail from '../hooks/useProductDetail';
import ProductGallery from '../components/productDetails/ProductGallery';
import ProductInfo from '../components/productDetails/ProductInfo';
import ProductAccordions from '../components/productDetails/ProductAccordions';
import AIReviewSummary from '../components/productDetails/AIReviewSummary';
import CuratorVoice from '../components/productDetails/CuratorVoice';
import RelatedProducts from '../components/productDetails/RelatedProducts';
import { Helmet } from 'react-helmet-async';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { 
    product, 
    isLoading, 
    error, 
    selectedColor, 
    selectedSize, 
    handleColorChange, 
    handleSizeChange 
  } = useProductDetail(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <p className="text-xl text-secondary">{error || 'Product not found'}</p>
        <button 
          onClick={() => window.history.back()}
          className="px-6 py-2 border border-primary text-primary hover:bg-primary hover:text-white transition-all"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <main className="pt-10 pb-24 bg-surface text-on-surface">
      <Helmet>
        <title>{`${product.name} | Bazario`}</title>
        <meta name="description" content={product.subdesc || `Buy ${product.name} at Bazario. Premium quality fashion and accessories.`} />
      </Helmet>
      <section className="max-w-[1920px] mx-auto px-4 sm:px-8 md:px-12 grid lg:grid-cols-12 gap-8 md:gap-16 relative">
        {/* Gallery */}
        <ProductGallery images={product.images} />
        
        {/* Product Info & Actions */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-40 space-y-10">
            <ProductInfo 
              product={product}
              selectedColor={selectedColor}
              selectedSize={selectedSize}
              onColorChange={handleColorChange}
              onSizeChange={handleSizeChange}
            />
            {/* Accordion placed below action buttons in layout */}
            <ProductAccordions product={product} />
          </div>
        </div>
      </section>

      {/* AI Review Summary */}
      <AIReviewSummary summary={product.reviewSummary} />

      {/* Complete the Wardrobe & Related Silhouettes */}
      <RelatedProducts
        wardrobe={product.wardrobe}
        related={product.related}
        currentProductId={product.id}
      />

      {/* Customer Reviews */}
      <CuratorVoice reviews={product.customerReviews} />
    </main>
  );
};

export default ProductDetailPage;
