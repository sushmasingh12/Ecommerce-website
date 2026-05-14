import { useNavigate } from "react-router-dom";

const ProductsHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 min-w-0">
      <div className="min-w-0">
        {/* Bazario brand accent bar */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-block w-1 h-5 bg-secondary rounded-full" />
          <span className="text-[10px] font-bold tracking-widest uppercase text-on-secondary-container">
            Bazario Admin
          </span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-on-surface mb-2">
          Products
        </h2>
        <p className="text-on-surface-variant text-sm">
          Manage inventory, prices, and stock across all Bazario categories.
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <button className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-high text-on-surface font-semibold rounded-lg hover:bg-surface-dim transition-all text-sm">
          <span className="material-symbols-outlined text-sm">ios_share</span>
          Export
        </button>
        <button
          onClick={() => navigate("/products/add")}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary text-on-primary font-semibold rounded-lg shadow-lg shadow-primary/20 hover:bg-primary-container transition-all text-sm"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          Add Product
        </button>
      </div>
    </div>
  );
};

export default ProductsHeader;
