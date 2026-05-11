import { useNavigate } from "react-router-dom";

const ProductsHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 min-w-0">
      <div className="min-w-0">
        <h2 className="text-2xl font-bold tracking-tight text-on-surface mb-2">Products</h2>
        <p className="text-on-surface-variant text-md">
          Manage inventory, prices, and stock across all channels.
        </p>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <button className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-high text-on-surface font-semibold rounded-lg hover:bg-surface-dim transition-all">
          <span className="material-symbols-outlined text-sm">ios_share</span>
          Export
        </button>
        <button
          onClick={() => navigate("/products/addrpoduct")}
          className="flex items-center gap-2 px-6 py-2.5 bg-linear-to-br from-primary to-primary-container text-on-primary font-semibold rounded-lg shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          Add Product
        </button>
      </div>
    </div>
  );
};

export default ProductsHeader;