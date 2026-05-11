import { useRef } from "react";

const MediaCard = ({ images, onAdd, onRemove }) => {
  const inputRef = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    onAdd(e.dataTransfer.files);
  };

  return (
    <section className="bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-outline-variant/10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">photo_library</span>
          </div>
          <h2 className="text-xl font-semibold tracking-tight text-on-surface">
            Product Media
          </h2>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-on-secondary-container">
          {images.length}/10 Images
        </span>
      </div>

      {/* Dropzone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-outline-variant/30 rounded-xl p-12 bg-surface-container-low/30 hover:bg-primary/5 hover:border-primary/30 transition-all group flex flex-col items-center justify-center text-center cursor-pointer mb-8"
      >
        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
          <span className="material-symbols-outlined text-primary text-3xl">
            cloud_upload
          </span>
        </div>
        <p className="text-sm font-semibold text-on-surface">
          Drop files here to upload
        </p>
        <p className="text-xs text-on-secondary-container mt-1">
          or click to browse (JPG, PNG up to 10MB)
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => onAdd(e.target.files)}
        />
      </div>

      {/* Gallery */}
      <div className="grid grid-cols-4 gap-4">
        {images.map((img) => (
          <div
            key={img.id}
            className="aspect-square rounded-lg overflow-hidden bg-surface-container relative group"
          >
            <img
              src={img.url}
              alt="Product"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(img.id);
                }}
                className="p-2 bg-white rounded-full text-error"
              >
                <span className="material-symbols-outlined text-sm">
                  delete
                </span>
              </button>
            </div>
          </div>
        ))}

        {/* Add More slot */}
        {images.length < 10 && (
          <div
            onClick={() => inputRef.current?.click()}
            className="aspect-square rounded-lg border-2 border-dashed border-outline-variant/20 flex flex-col items-center justify-center gap-1 hover:border-primary/30 hover:bg-primary/5 cursor-pointer transition-all"
          >
            <span className="material-symbols-outlined text-outline-variant text-xl">
              add
            </span>
            <span className="text-[10px] font-bold uppercase tracking-tight text-on-secondary-container">
              Add More
            </span>
          </div>
        )}
      </div>
    </section>
  );
};
export default MediaCard;
