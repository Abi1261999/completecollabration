import { useEffect, useMemo, useState } from 'react'
import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreVertical,
  Search,
  SlidersHorizontal,
} from 'lucide-react'
import ExportDropdown from '../components/ExportDropdown'
import OrderDetailModal from '../components/OrderDetailModal'

const seedOrders = [
  { id: 1, orderNo: '#790841', customer: 'Claire Warren', date: '12.09.20', total: 145.85, payment: 'PayPal', status: 'Shipped' },
  { id: 2, orderNo: '#790842', customer: 'Theresa Robertson', date: '12.09.20', total: 225.15, payment: 'Credit Card', status: 'Shipped' },
  { id: 3, orderNo: '#790843', customer: 'Nathan Hawkins', date: '12.09.20', total: 45.55, payment: 'PayPal', status: 'Shipped' },
  { id: 4, orderNo: '#790844', customer: 'Lily Williamson', date: '12.09.20', total: 305.25, payment: 'Credit Card', status: 'Processing' },
  { id: 5, orderNo: '#790845', customer: 'Brooklyn Steward', date: '12.09.20', total: 483.8, payment: 'Credit Card', status: 'Shipped' },
  { id: 6, orderNo: '#790846', customer: 'Norma Flores', date: '12.09.20', total: 128.79, payment: 'Payoneer', status: 'Processing' },
  { id: 7, orderNo: '#790847', customer: 'Leslie Mckinney', date: '12.09.20', total: 105.05, payment: 'Credit Card', status: 'Cancelled' },
  { id: 8, orderNo: '#790848', customer: 'Gregory Black', date: '12.09.20', total: 1028.15, payment: 'PayPal', status: 'Shipped' },
]

const customers = [
  'Claire Warren',
  'Theresa Robertson',
  'Nathan Hawkins',
  'Lily Williamson',
  'Brooklyn Steward',
  'Norma Flores',
  'Leslie Mckinney',
  'Gregory Black',
  'Eleanor Pena',
  'Cameron Williamson',
  'Devon Lane',
  'Courtney Henry',
  'Marvin McKinney',
  'Kristin Watson',
  'Albert Flores',
]

const payments = ['PayPal', 'Credit Card', 'Payoneer']
const statuses = ['Shipped', 'Processing', 'Cancelled', 'Pending', 'Refunded']
const dates = ['12.09.20', '11.09.20', '10.09.20', '09.09.20', '08.09.20', '07.09.20']

const orders = [
  ...seedOrders,
  ...Array.from({ length: 92 }, (_, index) => {
    const id = index + 9
    const status = statuses[id % statuses.length]

    return {
      id,
      orderNo: `#${790840 + id}`,
      customer: customers[id % customers.length],
      date: dates[id % dates.length],
      total: Number((35 + ((id * 47) % 990) + (id % 7) * 12.35).toFixed(2)),
      payment: payments[id % payments.length],
      status,
    }
  }),
]

const orderTabs = [
  { label: 'All', value: 'All' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Processing', value: 'Processing' },
  { label: 'Refunded', value: 'Refunded' },
]

const tableHeaders = [
  { key: 'orderNo', label: 'Order No.' },
  { key: 'customer', label: 'Customer' },
  { key: 'date', label: 'Date' },
  { key: 'total', label: 'Total' },
  { key: 'payment', label: 'Payment' },
  { key: 'status', label: 'Status' },
]

const pageSizeOptions = [10, 25, 50]

export default function EcommerceOrders() {
  const [activeTab, setActiveTab] = useState('All')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [selectedIds, setSelectedIds] = useState([])
  const [sort, setSort] = useState({ key: 'orderNo', direction: 'asc' })
  const [appliedFilters, setAppliedFilters] = useState({
    status: 'All',
    payment: 'All',
    startDate: '',
    endDate: '',
    minTotal: 0,
    maxTotal: 1200,
  })
  const [selectedOrder, setSelectedOrder] = useState(null)

  const tabCounts = useMemo(() => {
    return {
      All: orders.length,
      Pending: orders.filter((order) => order.status === 'Pending').length,
      Processing: orders.filter((order) => order.status === 'Processing').length,
      Refunded: orders.filter((order) => order.status === 'Refunded').length,
    }
  }, [])

  const filteredOrders = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return orders
      .filter((order) => {
        const matchesTab = activeTab === 'All' || order.status === activeTab
        const matchesQuery =
          !normalizedQuery ||
          order.orderNo.toLowerCase().includes(normalizedQuery) ||
          order.customer.toLowerCase().includes(normalizedQuery) ||
          order.payment.toLowerCase().includes(normalizedQuery) ||
          order.status.toLowerCase().includes(normalizedQuery) ||
          formatTotal(order.total).toLowerCase().includes(normalizedQuery)

        const matchesStatus = appliedFilters.status === 'All' || order.status === appliedFilters.status
        const matchesPayment = appliedFilters.payment === 'All' || order.payment === appliedFilters.payment
        const matchesMinTotal = order.total >= appliedFilters.minTotal
        const matchesMaxTotal = order.total <= appliedFilters.maxTotal
        const matchesStartDate = !appliedFilters.startDate || parseDate(order.date) >= parseDate(appliedFilters.startDate)
        const matchesEndDate = !appliedFilters.endDate || parseDate(order.date) <= parseDate(appliedFilters.endDate)

        return (
          matchesTab &&
          matchesQuery &&
          matchesStatus &&
          matchesPayment &&
          matchesMinTotal &&
          matchesMaxTotal &&
          matchesStartDate &&
          matchesEndDate
        )
      })
      .sort((left, right) => compareOrders(left, right, sort))
  }, [activeTab, appliedFilters, query, sort])

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const pageStart = filteredOrders.length === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const pageEnd = Math.min(currentPage * pageSize, filteredOrders.length)
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  useEffect(() => {
    setPage(1)
  }, [activeTab, query, pageSize, appliedFilters])

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages)
    }
  }, [page, totalPages])

  const handleTabChange = (value) => {
    setActiveTab(value)
    setSelectedIds([])
  }

  const handleSort = (key) => {
    setSort((currentSort) => {
      if (currentSort.key === key) {
        return { key, direction: currentSort.direction === 'asc' ? 'desc' : 'asc' }
      }

      return { key, direction: 'asc' }
    })
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-ink-900">Orders</h1>
          <OrderTabs activeTab={activeTab} tabCounts={tabCounts} onTabChange={handleTabChange} />
        </div>

        <ExportDropdown />
      </div>

      <OrdersTable
        orders={paginatedOrders}
        filteredCount={filteredOrders.length}
        selectedIds={selectedIds}
        query={query}
        page={currentPage}
        pageSize={pageSize}
        pageStart={pageStart}
        pageEnd={pageEnd}
        totalPages={totalPages}
        sort={sort}
        appliedFilters={appliedFilters}
        onQueryChange={setQuery}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSelectionChange={setSelectedIds}
        onSort={handleSort}
        onApplyFilters={setAppliedFilters}
        onOrderClick={setSelectedOrder}
      />

      {selectedOrder ? <OrderDetailModal order={selectedOrder} onClose={() => setSelectedOrder(null)} /> : null}
    </div>
  )
}

function OrderTabs({ activeTab, tabCounts, onTabChange }) {
  return (
    <div className="mt-7 flex h-auto w-full flex-wrap items-center gap-7 border-b border-ink-100 text-sm md:h-10">
      {orderTabs.map((tab) => (
        <button
          key={tab.value}
          className={`relative flex items-center gap-2 pb-3 font-medium ${
            activeTab === tab.value ? 'text-ink-900' : 'text-ink-400 hover:text-ink-700'
          }`}
          onClick={() => onTabChange(tab.value)}
        >
          {tab.label}
          <span className="rounded-md bg-ink-100 px-1.5 py-0.5 text-[10px] text-ink-400">{tabCounts[tab.value]}</span>
          {activeTab === tab.value ? <span className="absolute bottom-[-1px] left-0 h-0.5 w-full rounded-full bg-brand-dark" /> : null}
        </button>
      ))}
    </div>
  )
}

function OrdersTable({
  orders: visibleOrders,
  filteredCount,
  selectedIds,
  query,
  page,
  pageSize,
  pageStart,
  pageEnd,
  totalPages,
  sort,
  appliedFilters,
  onQueryChange,
  onPageChange,
  onPageSizeChange,
  onSelectionChange,
  onSort,
  onApplyFilters,
  onOrderClick,
}) {
  const [filterOpen, setFilterOpen] = useState(false)
  const [draftFilters, setDraftFilters] = useState(appliedFilters)
  const visibleIds = visibleOrders.map((order) => order.id)
  const allVisibleSelected = visibleIds.length > 0 && visibleIds.every((id) => selectedIds.includes(id))

  const toggleOrder = (orderId) => {
    onSelectionChange((currentIds) =>
      currentIds.includes(orderId) ? currentIds.filter((id) => id !== orderId) : [...currentIds, orderId],
    )
  }

  const toggleVisibleOrders = () => {
    onSelectionChange((currentIds) => {
      if (allVisibleSelected) {
        return currentIds.filter((id) => !visibleIds.includes(id))
      }

      return [...new Set([...currentIds, ...visibleIds])]
    })
  }

  const handleSaveFilters = () => {
    onApplyFilters(draftFilters)
    setFilterOpen(false)
  }

  const handleResetFilters = () => {
    const resetFilters = {
      status: 'All',
      payment: 'All',
      startDate: '',
      endDate: '',
      minTotal: 0,
      maxTotal: 1200,
    }

    setDraftFilters(resetFilters)
    onApplyFilters(resetFilters)
    setFilterOpen(false)
  }

  return (
    <section className="flex w-full flex-col rounded-xl2 border border-ink-100 bg-white p-5 shadow-card xl:min-h-[729px]">
      <div className="mb-5 flex shrink-0 flex-col gap-4 lg:flex-row lg:items-center">
        <div className="relative flex h-11 min-w-0 flex-1 items-center gap-3 rounded-xl border border-ink-100 px-4">
          <Search size={17} className="text-ink-400" />
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            className="min-w-0 flex-1 bg-transparent text-sm text-ink-700 outline-none placeholder:text-ink-400"
            placeholder="Search order..."
          />
          <button
            className={`rounded-lg p-1.5 ${filterOpen ? 'bg-ink-50 text-ink-700' : 'text-ink-400 hover:text-ink-700'}`}
            onClick={() => {
              setDraftFilters(appliedFilters)
              setFilterOpen((open) => !open)
            }}
            aria-expanded={filterOpen}
            aria-label="Filter orders"
          >
            <SlidersHorizontal size={17} />
          </button>
          {filterOpen ? (
            <FilterPopover
              filters={draftFilters}
              onFilterChange={setDraftFilters}
              onSave={handleSaveFilters}
              onReset={handleResetFilters}
            />
          ) : null}
        </div>

        <button className="flex h-11 items-center justify-center gap-2 rounded-xl border border-ink-100 px-5 text-sm text-ink-500 hover:bg-ink-50">
          Actions
          <ChevronDown size={14} />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-auto rounded-lg">
        <table className="h-full w-full min-w-[900px] table-fixed text-sm">
          <colgroup>
            <col className="w-12" />
            <col className="w-[14%]" />
            <col className="w-[20%]" />
            <col className="w-[12%]" />
            <col className="w-[12%]" />
            <col className="w-[14%]" />
            <col className="w-[14%]" />
            <col className="w-10" />
          </colgroup>
          <thead>
            <tr className="border-y border-ink-100 text-left text-xs uppercase tracking-wide text-ink-400">
              <th className="w-12 px-2 py-4">
                <Checkbox checked={allVisibleSelected} onChange={toggleVisibleOrders} label="Select all orders on this page" />
              </th>
              {tableHeaders.map((header) => (
                <th key={header.key} className="px-3 py-4 font-semibold">
                  {header.key === 'total' || header.key === 'payment' || header.key === 'status' ? (
                    <span>{header.label}</span>
                  ) : (
                    <button className="flex items-center gap-1 hover:text-ink-700" onClick={() => onSort(header.key)}>
                      {header.label}
                      <ChevronDown
                        size={12}
                        className={`transition-transform ${
                          sort.key === header.key ? 'text-brand-dark' : 'text-ink-300'
                        } ${sort.key === header.key && sort.direction === 'desc' ? 'rotate-180' : ''}`}
                      />
                    </button>
                  )}
                </th>
              ))}
              <th className="w-10 px-2 py-4" />
            </tr>
          </thead>
          <tbody>
            {visibleOrders.length > 0 ? (
              visibleOrders.map((order) => (
                <tr
                  key={order.id}
                  className="cursor-pointer border-b border-ink-100 text-ink-500 last:border-b-0 hover:bg-ink-50/60"
                  onClick={() => onOrderClick(order)}
                >
                  <td className="px-2 py-4" onClick={(event) => event.stopPropagation()}>
                    <Checkbox
                      checked={selectedIds.includes(order.id)}
                      onChange={() => toggleOrder(order.id)}
                      label={`Select order ${order.orderNo}`}
                    />
                  </td>
                  <td className="px-3 py-4 font-medium text-ink-700">{order.orderNo}</td>
                  <td className="truncate px-3 py-4 font-medium text-ink-700">{order.customer}</td>
                  <td className="px-3 py-4 text-ink-400">{order.date}</td>
                  <td className="px-3 py-4 font-medium text-ink-700">{formatTotal(order.total)}</td>
                  <td className="px-3 py-4 text-ink-700">{order.payment}</td>
                  <td className="px-3 py-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-2 py-4 text-right text-ink-400" onClick={(event) => event.stopPropagation()}>
                    <button className="hover:text-ink-700" aria-label={`More actions for ${order.orderNo}`}>
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-3 py-16 text-center text-ink-400">
                  No orders match your search or filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex shrink-0 flex-col gap-4 border-t border-ink-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-4">
          <PageSizeSelect value={pageSize} onChange={onPageSizeChange} />
          <p className="text-sm text-ink-400">
            {filteredCount === 0 ? 'Showing 0 of 0' : `Showing ${pageStart} - ${pageEnd} of ${filteredCount}`}
          </p>
        </div>

        <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
      </div>
    </section>
  )
}

function PageSizeSelect({ value, onChange }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 rounded-xl border border-ink-100 px-4 py-2 text-sm text-ink-500 hover:bg-ink-50"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-label="Rows per page"
      >
        {value}
        <ChevronDown size={14} />
      </button>
      {open ? (
        <div className="absolute bottom-full left-0 z-20 mb-2 min-w-[88px] overflow-hidden rounded-xl border border-ink-100 bg-white py-1 shadow-card">
          {pageSizeOptions.map((option) => (
            <button
              key={option}
              className={`block w-full px-4 py-2 text-left text-sm hover:bg-ink-50 ${
                option === value ? 'font-medium text-brand-dark' : 'text-ink-500'
              }`}
              onClick={() => {
                onChange(option)
                setOpen(false)
              }}
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

function Checkbox({ checked = false, onChange, label = 'Select row' }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`flex h-4 w-4 items-center justify-center rounded border ${
        checked ? 'border-brand-dark bg-brand-dark text-white' : 'border-ink-100 bg-ink-50'
      }`}
      aria-pressed={checked}
      aria-label={label}
    >
      {checked ? (
        <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
          <path d="M1 4l2.6 2.6L10 1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : null}
    </button>
  )
}

function FilterPopover({ filters, onFilterChange, onSave, onReset }) {
  const minLimit = 0
  const maxLimit = 1200

  const updateFilter = (key, value) => {
    onFilterChange((currentFilters) => ({ ...currentFilters, [key]: value }))
  }

  const updateMinTotal = (value) => {
    const nextValue = Math.min(Number(value), filters.maxTotal - 10)
    updateFilter('minTotal', nextValue)
  }

  const updateMaxTotal = (value) => {
    const nextValue = Math.max(Number(value), filters.minTotal + 10)
    updateFilter('maxTotal', nextValue)
  }

  const minPercent = ((filters.minTotal - minLimit) / (maxLimit - minLimit)) * 100
  const maxPercent = ((filters.maxTotal - minLimit) / (maxLimit - minLimit)) * 100

  return (
    <div className="absolute right-0 top-14 z-30 w-[calc(100vw-4rem)] max-w-[460px] rounded-xl2 bg-white p-8 shadow-2xl ring-1 ring-ink-100 md:w-[460px]">
      <h2 className="mb-8 text-3xl font-semibold text-ink-700">Filter</h2>

      <div className="space-y-6">
        <FilterField label="Status">
          <SelectLike value={filters.status} onChange={(value) => updateFilter('status', value)} options={['All', ...statuses]} />
        </FilterField>

        <FilterField label="Payment">
          <SelectLike value={filters.payment} onChange={(value) => updateFilter('payment', value)} options={['All', ...payments]} />
        </FilterField>

        <FilterField label="Date">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <DateInput value={filters.startDate} placeholder="Start" onChange={(value) => updateFilter('startDate', value)} />
            <span className="text-ink-100">-</span>
            <DateInput value={filters.endDate} placeholder="End" onChange={(value) => updateFilter('endDate', value)} />
          </div>
        </FilterField>

        <FilterField label="Total">
          <div>
            <div className="relative h-8">
              <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-ink-100" />
              <div
                className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-brand-dark"
                style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
              />
              <input
                type="range"
                min={minLimit}
                max={maxLimit}
                step="10"
                value={filters.minTotal}
                onChange={(event) => updateMinTotal(event.target.value)}
                className="range-thumb pointer-events-none absolute inset-x-0 top-0 h-8 w-full appearance-none bg-transparent"
                aria-label="Minimum total"
              />
              <input
                type="range"
                min={minLimit}
                max={maxLimit}
                step="10"
                value={filters.maxTotal}
                onChange={(event) => updateMaxTotal(event.target.value)}
                className="range-thumb pointer-events-none absolute inset-x-0 top-0 h-8 w-full appearance-none bg-transparent"
                aria-label="Maximum total"
              />
            </div>
            <div className="mt-1 flex items-center justify-between text-base font-semibold text-ink-500">
              <span>{formatTotal(filters.minTotal)}</span>
              <span>{formatTotal(filters.maxTotal)}</span>
            </div>
          </div>
        </FilterField>
      </div>

      <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          className="h-12 rounded-xl border border-ink-100 px-5 text-sm font-semibold text-ink-500 hover:bg-ink-50"
          onClick={onReset}
        >
          Reset
        </button>
        <button
          className="h-12 rounded-xl bg-brand-dark px-8 text-sm font-semibold text-white shadow-card hover:bg-brand-green"
          onClick={onSave}
        >
          Save
        </button>
      </div>
    </div>
  )
}

function FilterField({ label, children }) {
  return (
    <label className="block">
      <span className="mb-3 block text-base font-semibold text-ink-400">{label}</span>
      {children}
    </label>
  )
}

function SelectLike({ value, options, onChange }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full appearance-none rounded-xl border border-ink-100 bg-white px-5 pr-10 text-base font-semibold text-ink-500 outline-none hover:bg-ink-50"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-400" />
    </div>
  )
}

function DateInput({ value, onChange, placeholder }) {
  return (
    <div className="relative">
      <CalendarDays size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
      <input
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-xl border border-ink-100 bg-white px-11 pr-8 text-sm font-semibold text-ink-500 outline-none placeholder:text-ink-300 hover:bg-ink-50"
      />
      <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-400" />
    </div>
  )
}

function StatusBadge({ status }) {
  const styles = {
    Shipped: 'bg-brand-green/10 text-brand-dark',
    Processing: 'bg-orange-100 text-orange-600',
    Cancelled: 'bg-red-100 text-red-600',
    Pending: 'bg-amber-100 text-amber-700',
    Refunded: 'bg-brand-teal/10 text-brand-teal',
  }

  return (
    <span className={`inline-flex rounded-lg px-3 py-1 text-xs font-medium ${styles[status] || 'bg-ink-100 text-ink-500'}`}>
      {status}
    </span>
  )
}

function Pagination({ page, totalPages, onPageChange }) {
  const pages = buildPageNumbers(page, totalPages)

  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      <PageButton disabled={page === 1} icon={ChevronsLeft} label="First page" onClick={() => onPageChange(1)} />
      <PageButton disabled={page === 1} icon={ChevronLeft} label="Previous page" onClick={() => onPageChange(page - 1)} />
      {pages.map((pageNumber, index) =>
        pageNumber === 'ellipsis' ? (
          <span key={`ellipsis-${index}`} className="px-2 text-ink-400">
            ...
          </span>
        ) : (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-3 font-medium ${
              page === pageNumber ? 'bg-brand-dark text-white' : 'text-ink-500 hover:bg-ink-50'
            }`}
          >
            {pageNumber}
          </button>
        ),
      )}
      <PageButton
        disabled={page === totalPages}
        icon={ChevronRight}
        label="Next page"
        onClick={() => onPageChange(page + 1)}
      />
      <PageButton
        disabled={page === totalPages}
        icon={ChevronsRight}
        label="Last page"
        onClick={() => onPageChange(totalPages)}
      />
    </div>
  )
}

function PageButton({ icon: Icon, label, disabled = false, onClick }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`flex h-9 w-9 items-center justify-center rounded-lg ${
        disabled ? 'bg-ink-50 text-ink-200' : 'bg-brand-green/10 text-brand-dark hover:bg-brand-green/20'
      }`}
      aria-label={label}
    >
      <Icon size={16} />
    </button>
  )
}

function formatTotal(value) {
  return `$${Number(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function parseDate(value) {
  const [day, month, year] = value.split('.').map(Number)
  return new Date(2000 + year, month - 1, day).getTime()
}

function compareOrders(left, right, sort) {
  const direction = sort.direction === 'asc' ? 1 : -1

  if (sort.key === 'total') {
    return (left.total - right.total) * direction
  }

  if (sort.key === 'date') {
    return (parseDate(left.date) - parseDate(right.date)) * direction
  }

  return String(left[sort.key]).localeCompare(String(right[sort.key]), undefined, { numeric: true }) * direction
}

function buildPageNumbers(currentPage, totalPages) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 'ellipsis', totalPages]
  }

  if (currentPage >= totalPages - 2) {
    return [1, 'ellipsis', totalPages - 2, totalPages - 1, totalPages]
  }

  return [1, 'ellipsis', currentPage, 'ellipsis', totalPages]
}
