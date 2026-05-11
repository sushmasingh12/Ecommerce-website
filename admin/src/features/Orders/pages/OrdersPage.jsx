import { Link } from "react-router-dom";
import OrderDetailPanel from "../components/orderPage/OrderDetailPanel";
import OrdersFilters from "../components/orderPage/OrdersFilters";
import OrdersTable from "../components/orderPage/OrdersTable";
import { useOrders } from "../hooks/useOrders";

const OrdersPage = () => {
  const {
    orders,
    total,
    isListLoading,
    orderDetail,
    activeOrderId,
    isDetailLoading,
    filters,
    selectedOrderIds,
    allSelected,
    currentPage,
    pageSize,
    handleSearch,
    handlePaymentFilter,
    handleFulfillmentFilter,
    handleSelectOrder,
    handleToggleCheck,
    handleToggleSelectAll,
    handlePageChange,
    handleDeleteOrder
  } = useOrders();

  return (
    <div className="p-8 space-y-8 max-w-400 w-full mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-on-surface mb-2">
            Orders
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-on-surface-variant font-normal">
              {total.toLocaleString()} total orders across all channels
            </span>
            <div className="flex items-center gap-1 px-2 py-0.5 bg-secondary-container text-primary text-[10px] font-bold rounded-full uppercase tracking-tighter">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              AI Optimized
            </div>
          </div>
        </div>
        <Link to="/orders/create" className="px-4 py-2 bg-linear-to-br from-primary to-primary-container text-on-primary font-md rounded-xl shadow-lg hover:shadow-primary/20 transition-all transform active:scale-95 flex items-center gap-3">
          <span className="material-symbols-outlined">add_shopping_cart</span>
          Create Order
        </Link>
      </div>

      {/* Filters */}
      <OrdersFilters
        filters={filters}
        onFulfillmentFilter={handleFulfillmentFilter}
        onPaymentFilter={handlePaymentFilter}
        onSearch={handleSearch}
      />

      {/* Bento Layout */}
      <div className="grid grid-cols-1  gap-8 items-start">
        <OrdersTable
          orders={orders}
          isLoading={isListLoading}
          activeOrderId={activeOrderId}
          selectedOrderIds={selectedOrderIds}
          allSelected={allSelected}
          total={total}
          currentPage={currentPage}
          pageSize={pageSize}
          onSelectOrder={handleSelectOrder}
          onToggleCheck={handleToggleCheck}
          onToggleSelectAll={handleToggleSelectAll}
          onPageChange={handlePageChange}
          onDeleteOrder={handleDeleteOrder}
        />

        
      </div>
      <OrderDetailPanel
          isLoading={isDetailLoading}
          orderId={activeOrderId}
          orderDetail={orderDetail}
        />
    </div>
  );
};

export default OrdersPage;
