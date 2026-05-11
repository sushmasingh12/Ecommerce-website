// src/features/Promotions/components/StorefrontBanners.jsx

const StorefrontBanners = ({ banners }) => {
  if (!banners) return null;
  const { preview, activeBannerCount } = banners;

  return (
    <div
      className="bg-surface-container-lowest rounded-xl p-6"
      style={{ boxShadow: "0 4px 6px -1px rgba(25,28,29,0.04), 0 10px 15px -3px rgba(25,28,29,0.08)" }}
    >
      <h4 className="text-sm font-bold mb-4 flex items-center gap-2">
        <span className="material-symbols-outlined text-primary text-lg">aspect_ratio</span>
        Storefront Banners
      </h4>

      <div className="relative rounded-lg overflow-hidden h-40 mb-4 group cursor-pointer">
        <img
          src={preview.image}
          alt="Hero Banner"
          className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
          <span className="text-[10px] font-bold text-primary-fixed uppercase tracking-wider">
            {preview.label}
          </span>
          <h5 className="text-white font-bold leading-tight">{preview.title}</h5>
        </div>
      </div>

      <div className="flex justify-between items-center text-xs">
        <span className="text-on-surface-variant">{activeBannerCount} Active Banners</span>
        <button className="text-primary font-bold">Edit Assets</button>
      </div>
    </div>
  );
};

export default StorefrontBanners;