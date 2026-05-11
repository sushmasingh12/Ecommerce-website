
import AIFloatingButton from "../components/AIFloatingButton";
import InsightsPanel from "../components/InsightsPanel";
import ReviewsFilters from "../components/ReviewsFilters";
import ReviewsTable from "../components/ReviewsTable";
import { useReviews } from "../hooks/useReviews";

const ReviewsPage = () => {
  const {
    insights,
    filteredReviews,
    pagination,
    activeFilter,
    activeRating,
    currentPage,
    status,
    handleFilterChange,
    handleRatingChange,
    handlePageChange,
    handleApprove,
    handleReject,
    handleFlagSpam,
    handleDelete,
    handleReply = (id) => console.log("Reply to review:", id),
    handleView = (id) => console.log("View review details:", id),
  } = useReviews();

  if (status === "loading" || status === "idle") {
    return (
      <div className="p-8">
        <div className="text-on-surface-variant text-sm">Loading reviews...</div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold tracking-tight text-on-surface">
          Reviews Management
        </h2>
        <p className="text-on-surface-variant font-normal">
          Moderate customer feedback and leverage AI sentiment analysis.
        </p>
      </div>

      {/* Insights Bento */}
      <InsightsPanel insights={insights} />

      {/* Filters */}
      <ReviewsFilters
        activeFilter={activeFilter}
        activeRating={activeRating}
        onFilterChange={handleFilterChange}
        onRatingChange={handleRatingChange}
      />

      {/* Reviews Table */}
      <ReviewsTable
        reviews={filteredReviews}
        pagination={pagination}
        currentPage={currentPage}
        onApprove={handleApprove}
        onReject={handleReject}
        onFlagSpam={handleFlagSpam}
        onDelete={handleDelete}
        onReply={handleReply}
        onView={handleView}
        onPageChange={handlePageChange}
      />

      {/* Floating AI Button */}
      <AIFloatingButton />
    </div>
  );
};

export default ReviewsPage;