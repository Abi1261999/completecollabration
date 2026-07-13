import { useMemo, useState } from 'react'
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
  Grid2X2,
  List,
  MoreVertical,
  Plus,
  Search,
  SlidersHorizontal,
} from 'lucide-react'

const products = [
  { id: 1, name: 'MacBook Pro 15 Retina Touch Bar MV902', number: '#790841', category: 'Notebook', date: '12.09.20', price: '$2.500', status: 'Available' },
  { id: 2, name: 'Apple Watch Series 5 Edition GPS + Cellular', number: '#790841', category: 'Watch', date: '12.09.20', price: '', status: 'Available' },
  { id: 3, name: 'Apple iPhone 11 Pro Max 256GB Space Gray', number: '#790841', category: 'Phone', date: '12.09.20', price: '$2.500', status: 'Available' },
  { id: 4, name: 'Apple Watch Series 5 Edition GPS + Cellular', number: '#790841', category: 'Watch', date: '12.09.20', price: '', status: 'Available' },
  { id: 5, name: 'MacBook Pro 15 Retina Touch Bar MV902', number: '#790841', category: 'Notebook', date: '12.09.20', price: '$2.500', status: 'Disabled' },
  { id: 6, name: 'Apple iPhone 11 Pro Max 64GB Midnight Green', number: '#790841', category: 'Phone', date: '12.09.20', price: '$2.500', status: 'Disabled' },
  { id: 7, name: 'MacBook Pro 15 Retina Touch Bar MV902', number: '#790841', category: 'Notebook', date: '12.09.20', price: '$2.500', status: 'Available' },
  { id: 8, name: 'Apple Watch Series 5 Edition GPS + Cellular', number: '#790841', category: 'Watch', date: '12.09.20', price: '', status: 'Available' },
  { id: 9, name: 'Apple iPhone 11 Pro Max 256GB Space Gray', number: '#790841', category: 'Phone', date: '12.09.20', price: '$2.500', status: 'Available' },
  { id: 10, name: 'MacBook Pro 15 Retina Touch Bar MV902', number: '#790841', category: 'Notebook', date: '12.09.20', price: '$2.500', status: 'Available' },
]

const productTabs = [
  { label: 'All', count: 283, value: 'All' },
  { label: 'Available', count: 268, value: 'Available' },
  { label: 'Disabled', count: 15, value: 'Disabled' },
]

const tableHeaders = ['Product Name', 'Product No.', 'Category', 'Date', 'Price', 'Status']

export default function EcommerceProducts() {
  const [activeTab, setActiveTab] = useState('All')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [selectedIds, setSelectedIds] = useState([])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesTab = activeTab === 'All' || product.status === activeTab
      const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase())

      return matchesTab && matchesQuery
    })
  }, [activeTab, query])

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-ink-900">Products</h1>
          <ProductTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-ink-100 bg-white px-4 py-2 text-sm text-ink-500 shadow-card hover:bg-ink-50">
            <Download size={16} />
            Export
            <ChevronDown size={14} />
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-dark text-white shadow-card hover:bg-brand-green" aria-label="Add product">
            <Plus size={18} />
          </button>
          <div className="ml-0 flex items-center gap-3 text-ink-400 lg:ml-8">
            <button className="text-brand-dark" aria-label="List view">
              <List size={18} />
            </button>
            <button className="hover:text-ink-700" aria-label="Grid view">
              <Grid2X2 size={17} />
            </button>
          </div>
        </div>
      </div>

      <ProductsTable
        products={filteredProducts}
        selectedIds={selectedIds}
        query={query}
        page={page}
        onQueryChange={setQuery}
        onPageChange={setPage}
        onSelectionChange={setSelectedIds}
      />
    </div>
  )
}

function ProductTabs({ activeTab, onTabChange }) {
  return (
    <div className="mt-7 flex h-auto w-full flex-wrap items-center gap-7 border-b border-ink-100 text-sm md:h-10">
      {productTabs.map((tab) => (
        <button
          key={tab.value}
          className={`relative flex items-center gap-2 pb-3 font-medium ${
            activeTab === tab.value ? 'text-ink-900' : 'text-ink-400 hover:text-ink-700'
          }`}
          onClick={() => onTabChange(tab.value)}
        >
          {tab.label}
          <span className="rounded-md bg-ink-100 px-1.5 py-0.5 text-[10px] text-ink-400">{tab.count}</span>
          {activeTab === tab.value ? <span className="absolute bottom-[-1px] left-0 h-0.5 w-full rounded-full bg-brand-dark" /> : null}
        </button>
      ))}
    </div>
  )
}

function ProductsTable({ products: visibleProducts, selectedIds, query, page, onQueryChange, onPageChange, onSelectionChange }) {
  const visibleIds = visibleProducts.map((product) => product.id)
  const allVisibleSelected = visibleIds.length > 0 && visibleIds.every((id) => selectedIds.includes(id))

  const toggleProduct = (productId) => {
    onSelectionChange((currentIds) =>
      currentIds.includes(productId)
        ? currentIds.filter((id) => id !== productId)
        : [...currentIds, productId],
    )
  }

  const toggleVisibleProducts = () => {
    onSelectionChange((currentIds) => {
      if (allVisibleSelected) {
        return currentIds.filter((id) => !visibleIds.includes(id))
      }

      return [...new Set([...currentIds, ...visibleIds])]
    })
  }

  return (
    <section className="flex w-full flex-col rounded-xl2 border border-ink-100 bg-white p-5 shadow-card xl:h-[729px]">
      <div className="mb-5 flex shrink-0 flex-col gap-4 lg:flex-row lg:items-center">
        <div className="flex h-11 min-w-0 flex-1 items-center gap-3 rounded-xl border border-ink-100 px-4">
          <Search size={17} className="text-ink-400" />
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            className="min-w-0 flex-1 bg-transparent text-sm text-ink-700 outline-none placeholder:text-ink-400"
            placeholder="Search products..."
          />
          <button className="text-ink-400 hover:text-ink-700" aria-label="Filter products">
            <SlidersHorizontal size={17} />
          </button>
        </div>

        <button className="flex h-11 items-center justify-center gap-2 rounded-xl border border-ink-100 px-5 text-sm text-ink-500 hover:bg-ink-50">
          Actions
          <ChevronDown size={14} />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-auto rounded-lg">
        <table className="h-full w-full min-w-[980px] table-fixed text-sm">
          <colgroup>
            <col className="w-12" />
            <col className="w-[38%]" />
            <col className="w-[14%]" />
            <col className="w-[14%]" />
            <col className="w-[11%]" />
            <col className="w-[11%]" />
            <col className="w-[10%]" />
            <col className="w-10" />
          </colgroup>
          <thead>
            <tr className="border-y border-ink-100 text-left text-xs uppercase tracking-wide text-ink-400">
              <th className="w-12 px-2 py-4">
                <Checkbox checked={allVisibleSelected} onChange={toggleVisibleProducts} label="Select all products" />
              </th>
              {tableHeaders.map((header) => (
                <th key={header} className="px-3 py-4 font-semibold">
                  <button className="flex items-center gap-1">
                    {header}
                    <ChevronDown size={12} />
                  </button>
                </th>
              ))}
              <th className="w-10 px-2 py-4" />
            </tr>
          </thead>
          <tbody>
            {visibleProducts.map((product) => (
              <tr key={product.id} className="border-b border-ink-100 text-ink-500 last:border-b-0">
                <td className="px-2 py-4">
                  <Checkbox
                    checked={selectedIds.includes(product.id)}
                    onChange={() => toggleProduct(product.id)}
                    label={`Select ${product.name}`}
                  />
                </td>
                <td className="truncate px-3 py-4 font-medium text-ink-700">{product.name}</td>
                <td className="px-3 py-4 font-medium text-ink-400">{product.number}</td>
                <td className="px-3 py-4 font-medium text-ink-700">{product.category}</td>
                <td className="px-3 py-4 text-ink-400">{product.date}</td>
                <td className="px-3 py-4 font-medium text-ink-700">{product.price}</td>
                <td className="px-3 py-4">
                  <StatusBadge status={product.status} />
                </td>
                <td className="px-2 py-4 text-right text-ink-400">
                  <button className="hover:text-ink-700" aria-label={`More actions for ${product.name}`}>
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex shrink-0 flex-col gap-4 border-t border-ink-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 rounded-xl border border-ink-100 px-4 py-2 text-sm text-ink-500 hover:bg-ink-50">
            10
            <ChevronDown size={14} />
          </button>
          <p className="text-sm text-ink-400">Showing 1 - 10 of 100</p>
        </div>

        <Pagination page={page} onPageChange={onPageChange} />
      </div>
    </section>
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

function StatusBadge({ status }) {
  const isAvailable = status === 'Available'

  return (
    <span
      className={`inline-flex rounded-lg px-3 py-1 text-xs font-medium ${
        isAvailable ? 'bg-brand-green/10 text-brand-dark' : 'bg-brand-teal/10 text-orange-500'
      }`}
    >
      {status}
    </span>
  )
}

function Pagination({ page, onPageChange }) {
  const pages = [1, 2, 3]

  return (
    <div className="flex items-center gap-2 text-sm">
      <PageButton disabled icon={ChevronsLeft} label="First page" />
      <PageButton disabled icon={ChevronLeft} label="Previous page" />
      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-3 font-medium ${
            page === pageNumber ? 'bg-brand-dark text-white' : 'text-ink-500 hover:bg-ink-50'
          }`}
        >
          {pageNumber}
        </button>
      ))}
      <span className="px-2 text-ink-400">...</span>
      <button
        onClick={() => onPageChange(5)}
        className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-3 font-medium ${
          page === 5 ? 'bg-brand-dark text-white' : 'text-ink-500 hover:bg-ink-50'
        }`}
      >
        5
      </button>
      <PageButton icon={ChevronRight} label="Next page" onClick={() => onPageChange(Math.min(page + 1, 5))} />
      <PageButton icon={ChevronsRight} label="Last page" onClick={() => onPageChange(5)} />
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
