import React from 'react';

const ProductGallery = ({ images }) => {
  if (!images) return null;

  return (
    <div className="lg:col-span-7 space-y-12">

      {/* Gallery Images */}
      <div className="grid grid-cols-2 gap-8">
        {images?.gallery?.length > 0 ? (
          images.gallery.map((img, index) => (
            <div key={index} className="aspect-3/4 overflow-hidden bg-surface-container-low">
              <img
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1500"
                alt={`Product Detail ${index + 1}`}
                src={img}
              />
            </div>
          ))
        ) : (
          <div className="col-span-2 aspect-video overflow-hidden bg-surface-container-low">
            
             {images?.hero && (
                <img
                  className="w-full h-full object-cover"
                  alt="Product Hero"
                  src={images.hero}
                />
             )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGallery;
