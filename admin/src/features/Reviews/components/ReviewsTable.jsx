import ReviewRow from "./ReviewRow";



const ReviewsTable = ({
  reviews,
  pagination,
  currentPage,
  onApprove,
  onReject,
  onFlagSpam,
  onDelete,
  onReply,
  onView,
  onPageChange,
}) => {
  const totalPages = pagination ? pagination.total : 1;

  return (
    <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/10 overflow-hidden">
      <div className="overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        <table className="w-full text-left border-collapse">
          <thead className="bg-surface-container-low border-b border-outline-variant/10">
            <tr>
              {["Product", "Customer", "Rating & Review", "Media", "Actions"].map((col) => (
                <th
                  key={col}
                  className={`px-6 py-4 text-on-secondary-container tracking-widest font-bold uppercase text-[10px] ${col === "Actions" ? "text-right" : ""}`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <ReviewRow
                  key={review.id}
                  review={review}
                  onApprove={onApprove}
                  onReject={onReject}
                  onFlagSpam={onFlagSpam}
                  onDelete={onDelete}
                  onReply={onReply}
                  onView={onView}
                />
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-sm text-on-surface-variant">
                  No reviews found for this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-8 py-4 bg-surface-container-low flex items-center justify-between border-t border-outline-variant/10">
        <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">
          {pagination
            ? `Showing ${pagination.showing} of ${pagination.totalCount} pending`
            : "No results"}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            className="p-2 bg-surface-container-lowest border border-outline-variant/10 rounded-lg text-on-surface-variant hover:text-primary transition-all"
          >
            <span className="material-symbols-outlined text-sm">chevron_left</span>
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                currentPage === p
                  ? "bg-primary text-white"
                  : "bg-surface-container-lowest border border-outline-variant/10 text-on-surface-variant hover:bg-surface-container"
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            className="p-2 bg-surface-container-lowest border border-outline-variant/10 rounded-lg text-on-surface-variant hover:text-primary transition-all"
          >
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewsTable;