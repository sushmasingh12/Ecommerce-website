const stockStyles = {
  "IN STOCK":   { dot: "bg-emerald-500", badge: "bg-emerald-100 text-emerald-700" },
  "LOW STOCK":  { dot: "bg-amber-500",   badge: "bg-amber-100 text-amber-700" },
  "OUT OF STOCK": { dot: "bg-red-500",   badge: "bg-red-100 text-red-700" },
};

const statusStyles = {
  Active:   "bg-primary/10 text-primary",
  Draft:    "bg-secondary-container text-secondary",
  Archived: "bg-surface-container-high text-on-surface-variant",
};



const ProductTableRow =({
  product,
  isSelected,
  onToggleSelect,
  onDelete,
}) => {
  const stock  = stockStyles[product.stockStatus] ?? stockStyles["IN STOCK"];
  const status = statusStyles[product.status]     ?? statusStyles["Draft"];

  return (
    <tr className="group hover:bg-surface-bright transition-colors">
      {/* Checkbox */}
      <td className="py-4 px-6 border-b border-transparent group-hover:border-outline-variant/10">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggleSelect(product.id)}
          className="rounded border-outline-variant text-primary focus:ring-primary/20"
        />
      </td>

      {/* Product */}
      <td className="py-4 px-4">
        <div className="flex items-center gap-4">
          
          
            <div className="font-bold text-on-surface tracking-tight">{product.name}</div>
          </div>
        
      </td>

      {/* Category */}
      <td className="py-4 px-4">
        <span className="text-sm font-medium text-secondary">{product.category}</span>
      </td>

      {/* Price */}
      <td className="py-4 px-4 text-right">
        <span className="font-medium text-on-surface">{product.price}</span>
      </td>

      {/* Stock */}
      <td className="py-4 px-4">
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${stock.dot}`} />
          <span className="text-sm font-semibold text-on-surface">{product.stock}</span>
          <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${stock.badge}`}>
            {product.stockStatus}
          </span>
        </div>
      </td>



      
     

      {/* Status */}
      <td className="py-4 px-4">
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${status}`}>
          {product.status}
        </span>
      </td>

      <td className="py-4 px-4">
        <div className="w-12 h-12 rounded-lg bg-surface-container-low overflow-hidden flex-shrink-0 flex items-center justify-center text-on-surface-variant font-bold text-xs">
            {product.image ? (
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <span className="material-symbols-outlined text-xl text-outline">inventory_2</span>
            )}
          </div>

      </td>
       
      
      

      {/* Actions */}
      <td className="py-4 px-6 text-right">
        <div className="flex items-center justify-end gap-1 ">
          <button className="p-2 hover:bg-surface-container-high rounded-lg text-secondary transition-colors">
            <span className="material-symbols-outlined text-lg">edit</span>
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="p-2 hover:bg-error-container hover:text-error rounded-lg text-secondary transition-colors"
          >
            <span className="material-symbols-outlined text-lg">delete</span>
          </button>
          <button className="p-2 hover:bg-surface-container-high rounded-lg text-secondary transition-colors">
            <span className="material-symbols-outlined text-lg">more_vert</span>
          </button>
        </div>
      </td>
    </tr>
  );
}

export default ProductTableRow