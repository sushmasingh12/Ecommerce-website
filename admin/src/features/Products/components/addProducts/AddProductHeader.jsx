const AddProductHeader =({
  onPublish,
  onSaveDraft,
  onCancel,
  submitting,
}) =>{
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
      <div>
        <nav className="flex items-center gap-2 mb-4">
          <span className="text-xs font-semibold tracking-wider uppercase text-on-secondary-container">
            Catalog
          </span>
          <span className="material-symbols-outlined text-[10px] text-outline-variant">
            chevron_right
          </span>
          <span className="text-xs font-semibold tracking-wider uppercase text-on-secondary-container">
            Products
          </span>
          <span className="material-symbols-outlined text-[10px] text-outline-variant">
            chevron_right
          </span>
          <span className="text-xs font-semibold tracking-wider uppercase text-primary">
            Add Product
          </span>
        </nav>
        <h1 className="text-2xl font-bold tracking-tight text-on-surface">
          Add New Product
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onCancel}
          disabled={submitting}
          className="px-5 py-2.5 text-sm font-medium text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-xl disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={onSaveDraft}
          disabled={submitting}
          className="px-5 py-2.5 text-sm font-medium bg-surface-container-lowest text-on-surface hover:bg-surface-container-high transition-all rounded-xl border border-outline-variant/10 shadow-sm disabled:opacity-50"
        >
          {submitting ? "Saving..." : "Save Draft"}
        </button>
        <button
          onClick={onPublish}
          disabled={submitting}
          className="px-8 py-2.5 text-sm font-bold text-on-primary bg-gradient-to-br from-primary to-primary-container rounded-xl hover:opacity-90 transition-all shadow-sm disabled:opacity-60 flex items-center gap-2"
        >
          {submitting && (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          )}
          {submitting ? "Publishing..." : "Publish"}
        </button>
      </div>
    </div>
  );
} 
export default AddProductHeader