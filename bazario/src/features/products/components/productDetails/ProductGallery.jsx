import React from 'react';

const ProductGallery = ({ images }) => {
  if (!images) return null;

  // Handle both flat array (from new backend) and object structure
  const isArray = Array.isArray(images);
  const gallery = isArray ? images.map(img => img.url) : (images.gallery || []);
  const hero = isArray ? images[0]?.url : images.hero;

  return (
    <div className="lg:col-span-7 space-y-12">
      {/* Gallery Images */}
      <div className="grid grid-cols-2 gap-8">
        {gallery.length > 0 ? (
          gallery.map((img, index) => (
            <div key={index} className="aspect-[3/4] overflow-hidden bg-surface-container-low group">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1500ms]"
                alt={`Product Detail ${index + 1}`}
                src={img}
              />
            </div>
          ))
        ) : (
          <div className="col-span-2 aspect-[16/9] overflow-hidden bg-surface-container-low">
             {hero && (
                <img
                  className="w-full h-full object-cover"
                  alt="Product Hero"
                  src={hero}
                />
             )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGallery;
