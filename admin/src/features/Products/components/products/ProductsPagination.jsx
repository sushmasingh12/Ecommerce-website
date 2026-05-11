const ProductsPagination =({ page, totalPages, total, onPage }) => {
  const pages = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1, 2, 3, "...", totalPages);
  }

  return (
    <div className="bg-surface-container-low px-6 py-4 flex items-center justify-between mt-0">
      <span className="text-sm font-medium text-secondary">
        Showing 1 to 10 of {total.toLocaleString()} products
      </span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPage(Math.max(1, page - 1))}
          disabled={page === 1}
          className="p-2 hover:bg-surface-container-high rounded-lg text-secondary transition-colors disabled:opacity-40"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>

        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`ellipsis-${i}`} className="px-2 text-secondary">...</span>
          ) : (
            <button
              key={p}
              onClick={() => onPage(p)}
              className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold text-sm transition-colors ${
                p === page
                  ? "bg-primary text-on-primary"
                  : "hover:bg-surface-container-high text-secondary"
              }`}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => onPage(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="p-2 hover:bg-surface-container-high rounded-lg text-secondary transition-colors disabled:opacity-40"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </div>
  );
}

export default ProductsPagination