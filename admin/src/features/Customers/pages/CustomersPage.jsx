import AddCustomerModal from "../components/AddCustomerModal";
import { useCustomers } from "../hooks/useCustomers";

const CustomersPage = () => {
  const {
    customers,
    total,
    matches,
    isListLoading,
    customerDetail,
    isDetailLoading,
    filters,
    selectedCustomerIds,
    allSelected,
    activeCustomerId,
    currentPage,
    totalPages,
    isAddModalOpen,
    handleSearch,
    handleActivityFilter,
    handleSpentFilter,
    handleOrdersFilter,
    handleSelectCustomer,
    handleToggleCheck,
    handleToggleSelectAll,
    handlePageChange,
    handleClearFilters,
    handleSetIsAddModalOpen,
    handleAddCustomer,
  } = useCustomers();

  return (
    <div className="flex-1 flex flex-col h-full bg-surface">
      {/* Existing Header (Kept as requested) */}
      <div className="px-12 pt-12 pb-6 flex items-end justify-between border-b border-outline-variant/10">
        <div>
          <h2 className="text-4xl font-black tracking-tight text-on-surface mb-2">
            Customers
          </h2>
          <p className="text-on-surface-variant">
            Managing {total.toLocaleString()} high-value commercial relationships.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-2.5 bg-surface-container-high text-on-surface text-sm font-bold rounded-xl hover:bg-surface-container-highest transition-all">
            <span className="material-symbols-outlined text-[20px]">file_download</span>
            Export CSV
          </button>
          <button 
            onClick={() => handleSetIsAddModalOpen(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">person_add</span>
            Add Customer
          </button>
        </div>
      </div>

      <AddCustomerModal 
        isOpen={isAddModalOpen}
        onClose={() => handleSetIsAddModalOpen(false)}
        onAdd={handleAddCustomer}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* List & Filter Section */}
        <section className="flex-1 flex flex-col p-12 overflow-y-auto">
          {/* Filter Bar */}
          <div className="flex items-center gap-3 mb-8 flex-wrap">
            <div className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-lg border border-outline-variant/10 text-sm font-medium cursor-pointer hover:bg-surface-container-high transition-colors">
              <span className="text-on-secondary-container">Activity:</span>
              <span className="text-on-surface">{filters.activityFilter}</span>
              <span className="material-symbols-outlined text-[16px]">expand_more</span>
            </div>
            <div className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-lg border border-outline-variant/10 text-sm font-medium cursor-pointer hover:bg-surface-container-high transition-colors">
              <span className="text-on-secondary-container">Spent:</span>
              <span className="text-on-surface">{filters.spentFilter || "Any"}</span>
              <span className="material-symbols-outlined text-[16px]">expand_more</span>
            </div>
            <div className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-lg border border-outline-variant/10 text-sm font-medium cursor-pointer hover:bg-surface-container-high transition-colors">
              <span className="text-on-secondary-container">Orders:</span>
              <span className="text-on-surface">{filters.ordersFilter || "Any"}</span>
              <span className="material-symbols-outlined text-[16px]">expand_more</span>
            </div>
            <button 
              onClick={handleClearFilters}
              className="ml-auto text-primary font-bold text-sm flex items-center gap-1 hover:opacity-80 transition-opacity"
            >
              <span className="material-symbols-outlined text-[18px]">tune</span>
              More Filters
            </button>
          </div>

          {/* Customers Table */}
          <div className="bg-surface-container-lowest rounded-2xl ambient-shadow border border-outline-variant/10 overflow-hidden relative">
            {isListLoading && (
              <div className="absolute inset-0 bg-surface-container-lowest/50 backdrop-blur-[2px] flex items-center justify-center z-10">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            
            {customers.length === 0 && !isListLoading ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-20 h-20 bg-surface-container-high rounded-full flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-4xl text-on-surface-variant">person_search</span>
                </div>
                <h3 className="text-xl font-bold mb-2">No customers found</h3>
                <p className="text-on-surface-variant max-w-sm mx-auto">We couldn't find any customers matching your current filters. Try adjusting your search or filtering criteria.</p>
                <button onClick={handleClearFilters} className="mt-6 text-primary font-bold">Clear all filters</button>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low border-b border-outline-variant/15">
                    <th className="px-6 py-4 w-12">
                      <input 
                        className="rounded border-outline-variant text-primary focus:ring-primary" 
                        type="checkbox"
                        checked={allSelected}
                        onChange={handleToggleSelectAll}
                      />
                    </th>
                    <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-on-secondary-container">Customer</th>
                    <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-on-secondary-container">Orders</th>
                    <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-on-secondary-container">Total Spent</th>
                    <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-on-secondary-container">Segments</th>
                    <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-on-secondary-container">Last Active</th>
                    <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-on-secondary-container">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {customers.map((customer) => (
                    <tr 
                      key={customer.id}
                      onClick={() => handleSelectCustomer(customer.id)}
                      className={`hover:bg-surface-bright transition-all cursor-pointer group ${activeCustomerId === customer.id ? 'bg-secondary-container/5' : ''}`}
                    >
                      <td className="px-6 py-5" onClick={(e) => e.stopPropagation()}>
                        <input 
                          className="rounded border-outline-variant text-primary focus:ring-primary" 
                          type="checkbox"
                          checked={selectedCustomerIds.includes(customer.id)}
                          onChange={() => handleToggleCheck(customer.id)}
                        />
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-10 h-10 rounded-full bg-cover bg-center" 
                            style={{ backgroundImage: `url('${customer.avatar}')` }}
                          ></div>
                          <div>
                            <p className="text-sm font-bold text-on-surface">{customer.name}</p>
                            <p className="text-xs text-on-surface-variant">{customer.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm font-medium">{customer.orders}</td>
                      <td className="px-6 py-5 text-sm font-bold">${customer.totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                      <td className="px-6 py-5">
                        <div className="flex gap-2">
                          {customer.segments?.map((segment, i) => (
                            <span 
                              key={i}
                              className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${
                                segment === 'VIP' ? 'bg-tertiary/10 text-tertiary' : 
                                segment === 'Loyal' ? 'bg-primary/10 text-primary' : 
                                'bg-secondary/10 text-secondary'
                              }`}
                            >
                              {segment}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm text-on-surface-variant">{customer.lastActive}</td>
                      <td className="px-6 py-5">
                        <div className={`flex items-center gap-1.5 text-xs font-bold ${customer.status === 'Active' ? 'text-emerald-600' : 'text-on-surface-variant'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${customer.status === 'Active' ? 'bg-emerald-600' : 'bg-on-surface-variant'}`}></span>
                          {customer.status}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            
            {/* Pagination */}
            <div className="p-6 bg-surface-container-low flex items-center justify-between border-t border-outline-variant/15">
              <p className="text-xs text-on-surface-variant font-medium uppercase tracking-wider">
                Showing {((currentPage - 1) * 24) + 1} to {Math.min(currentPage * 24, total)} of {total.toLocaleString()} customers
              </p>
              <div className="flex items-center gap-2">
                <button 
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-high transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                </button>
                {[...Array(Math.min(3, totalPages))].map((_, i) => (
                  <button 
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-all ${currentPage === i + 1 ? 'bg-primary text-white' : 'hover:bg-surface-container-high'}`}
                  >
                    {i + 1}
                  </button>
                ))}
                {totalPages > 3 && (
                  <>
                    <span className="text-xs text-on-surface-variant px-1">...</span>
                    <button 
                      onClick={() => handlePageChange(totalPages)}
                      className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-all ${currentPage === totalPages ? 'bg-primary text-white' : 'hover:bg-surface-container-high'}`}
                    >
                      {totalPages}
                    </button>
                  </>
                )}
                <button 
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface-container-high transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Profile Preview Panel */}
        <aside className="w-[400px] border-l border-outline-variant/15 bg-surface-container-low flex flex-col overflow-y-auto">
          {isDetailLoading ? (
             <div className="flex-1 flex items-center justify-center">
                <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
             </div>
          ) : customerDetail ? (
            <>
              {/* Preview Cover */}
              <div className="h-32 bg-primary-gradient relative shrink-0">
                <div className="absolute -bottom-10 left-8">
                  <div 
                    className="w-20 h-20 rounded-2xl border-4 border-surface-container-low bg-cover bg-center shadow-lg" 
                    style={{ backgroundImage: `url('${customerDetail.avatar}')` }}
                  ></div>
                </div>
                <button className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 p-2 rounded-lg backdrop-blur-md transition-all text-white">
                  <span className="material-symbols-outlined text-[20px]">edit</span>
                </button>
              </div>
              
              {/* Profile Info */}
              <div className="pt-14 px-8 pb-8 flex flex-col gap-8">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-2xl font-black tracking-tight">{customerDetail.name}</h3>
                    <span className="material-symbols-outlined text-primary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  </div>
                  <p className="text-on-surface-variant text-sm font-medium">Customer since {customerDetail.customerSince}</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-surface-container-lowest p-4 rounded-xl ambient-shadow">
                    <p className="text-[10px] font-black uppercase tracking-widest text-on-secondary-container mb-1">Lifetime Value</p>
                    <p className="text-lg font-black text-primary">${customerDetail.lifetimeValue?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                  </div>
                  <div className="bg-surface-container-lowest p-4 rounded-xl ambient-shadow">
                    <p className="text-[10px] font-black uppercase tracking-widest text-on-secondary-container mb-1">Avg. Order</p>
                    <p className="text-lg font-black text-on-surface">${customerDetail.avgOrder?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="flex flex-col gap-4">
                  <h4 className="text-xs font-black uppercase tracking-widest text-on-secondary-container">Contact & Shipping</h4>
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-on-surface-variant">mail</span>
                    <div>
                      <p className="text-sm font-bold">Email Address</p>
                      <p className="text-sm text-on-surface-variant">{customerDetail.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-on-surface-variant">phone</span>
                    <div>
                      <p className="text-sm font-bold">Phone Number</p>
                      <p className="text-sm text-on-surface-variant">{customerDetail.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-on-surface-variant">location_on</span>
                    <div>
                      <p className="text-sm font-bold">Primary Address</p>
                      <p className="text-sm text-on-surface-variant">{customerDetail.address}</p>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black uppercase tracking-widest text-on-secondary-container">Recent Orders</h4>
                    <button className="text-primary text-xs font-bold hover:underline">View All</button>
                  </div>
                  <div className="flex flex-col gap-3">
                    {customerDetail.recentOrders?.map((order) => (
                      <div key={order.id} className="flex items-center justify-between bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/10">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-surface-container-high flex items-center justify-center">
                            <span className="material-symbols-outlined text-on-surface-variant text-[18px]">package_2</span>
                          </div>
                          <div>
                            <p className="text-xs font-bold">#{order.id}</p>
                            <p className="text-[10px] text-on-surface-variant">{order.date}</p>
                          </div>
                        </div>
                        <p className="text-xs font-bold text-on-surface">${order.amount?.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Insight Chip */}
                <div className="bg-secondary-container/30 border border-primary/10 p-4 rounded-xl flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-[20px] shrink-0">bolt</span>
                  <div>
                    <p className="text-xs font-bold text-on-secondary-container mb-1">AI Prediction</p>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      {customerDetail.aiPrediction}
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-4">account_circle</span>
              <p className="text-sm text-on-surface-variant">Select a customer to view details</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default CustomersPage;