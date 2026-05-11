import AIInsightBanner from "../components/products/AIInsightBanner";
import ProductsFilters from "../components/products/ProductsFilters";
import ProductsHeader from "../components/products/ProductsHeader";
import ProductsPagination from "../components/products/ProductsPagination";
import ProductsTable from "../components/products/ProductsTable";
import QuickStatsCard from "../components/products/QuickStatsCard";
import { useProducts } from "../hooks/useProducts";

const Products = () => {
  const {
    products,
    total,
    totalPages,
    filters,
    selectedIds,
    quickStats,
    aiInsight,
    loading,
    isAllSelected,
    selectedCount,
    handleSearch,
    handleCategory,
    handleStatus,
    handlePage,
    handleDelete,
    handleToggleSelect,
    handleToggleSelectAll,
    handleClearSelection,
  } = useProducts();

  return (
    <div className="px-8 py-8 pb-12 max-w-7xl mx-auto w-full min-w-0">
      {/* Header */}
      <ProductsHeader />

      {/* Filters */}
      <ProductsFilters
        filters={filters}
        onSearch={handleSearch}
        onCategory={handleCategory}
        onStatus={handleStatus}
      />

      {/* Table + Pagination */}
      <ProductsTable
        products={products}
        loading={loading.products}
        selectedIds={selectedIds}
        isAllSelected={isAllSelected}
        selectedCount={selectedCount}
        onToggleSelect={handleToggleSelect}
        onToggleSelectAll={handleToggleSelectAll}
        onDelete={handleDelete}
        onClearFilters={handleClearSelection}
      />

      <ProductsPagination
        page={filters.page}
        totalPages={totalPages}
        total={total}
        onPage={handlePage}
      />

      {/* AI Insight + Quick Stats */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <AIInsightBanner insight={aiInsight} loading={loading.aiInsight} />
        <QuickStatsCard stats={quickStats} loading={loading.quickStats} />
      </div>
    </div>
  );
}

export default  Products