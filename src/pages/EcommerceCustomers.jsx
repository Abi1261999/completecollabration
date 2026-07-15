import { useEffect, useMemo, useState } from 'react'
import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Download,
  MoreVertical,
  Plus,
  Search,
  SlidersHorizontal,
} from 'lucide-react'
import CustomerFormModal from '../components/CustomerFormModal'

const seedCustomers = [
  { id: 1, name: 'Regina Cooper', email: 'cooper@example.com', location: 'Sochi, Russia', phone: '+1 (070) 123-4567', date: '12.09.20', status: 'Active' },
  { id: 2, name: 'Judith Black', email: 'black@example.com', location: 'France, Paris', phone: '+1 (070) 123-8459', date: '12.09.20', status: 'Active' },
  { id: 3, name: 'Ronald Robertson', email: 'robe@example.com', location: 'Sydney, Australia', phone: '+1 (070) 123-9221', date: '12.09.20', status: 'Blocked' },
  { id: 4, name: 'Dustin Williamson', email: 'williams@example.com', location: 'Germany, Berlin', phone: '+1 (070) 123-0507', date: '12.09.20', status: 'Active' },
  { id: 5, name: 'Calvin Flores', email: 'flores@example.com', location: 'New York, USA', phone: '+1 (070) 123-3791', date: '12.09.20', status: 'Active' },
  { id: 6, name: 'Robert Edwards', email: 'edwards@example.com', location: 'Shanghai, China', phone: '+1 (070) 123-1147', date: '12.09.20', status: 'Active' },
  { id: 7, name: 'Colleen Warren', email: 'warren@example.com', location: 'Canada, Ottawa', phone: '+1 (070) 123-9127', date: '12.09.20', status: 'Active' },
  { id: 8, name: 'Nathan Fox', email: 'fox@example.com', location: 'London, UK', phone: '+1 (070) 123-5073', date: '12.09.20', status: 'Active' },
]

const names = [
  'Eleanor Pena',
  'Cameron Williamson',
  'Devon Lane',
  'Courtney Henry',
  'Marvin McKinney',
  'Kristin Watson',
  'Albert Flores',
  'Brooklyn Simmons',
  'Leslie Alexander',
  'Jenny Wilson',
  'Floyd Miles',
  'Bessie Cooper',
]

const locations = [
  'Tokyo, Japan',
  'Madrid, Spain',
  'Rome, Italy',
  'Dubai, UAE',
  'Seoul, South Korea',
  'Amsterdam, Netherlands',
  'Stockholm, Sweden',
  'Mexico City, Mexico',
  'Sao Paulo, Brazil',
  'Cape Town, South Africa',
]

const dates = ['12.09.20', '11.09.20', '10.09.20', '09.09.20', '08.09.20', '07.09.20']

const customers = [
  ...seedCustomers,
  ...Array.from({ length: 92 }, (_, index) => {
    const id = index + 9
    const name = names[id % names.length]
    const emailSlug = name.toLowerCase().replace(/\s+/g, '.').split('.')[0]

    return {
      id,
      name,
      email: `${emailSlug}${id}@example.com`,
      location: locations[id % locations.length],
      phone: `+1 (070) 123-${String(1000 + ((id * 137) % 9000)).slice(-4)}`,
      date: dates[id % dates.length],
      status: id % 17 === 0 ? 'Blocked' : 'Active',
    }
  }),
]

const customerTabs = [
  { label: 'All', value: 'All' },
  { label: 'Active', value: 'Active' },
  { label: 'Blocked', value: 'Blocked' },
]

const tableHeaders = [
  { key: 'name', label: 'Customer Name' },
  { key: 'location', label: 'Location' },
  { key: 'phone', label: 'Phone' },
  { key: 'date', label: 'Date' },
  { key: 'status', label: 'Status' },
]

const pageSizeOptions = [10, 25, 50]

export default function EcommerceCustomers() {
  const [activeTab, setActiveTab] = useState('All')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [selectedIds, setSelectedIds] = useState([])
  const [sort, setSort] = useState({ key: 'name', direction: 'asc' })
  const [appliedFilters, setAppliedFilters] = useState({
    status: 'All',
    location: 'All',
    startDate: '',
    endDate: '',
  })
  const [customerModalOpen, setCustomerModalOpen] = useState(false)

  const tabCounts = useMemo(() => {
    return {
      All: customers.length,
      Active: customers.filter((customer) => customer.status === 'Active').length,
      Blocked: customers.filter((customer) => customer.status === 'Blocked').length,
    }
  }, [])

  const locationOptions = useMemo(() => {
    return ['All', ...new Set(customers.map((customer) => customer.location))]
  }, [])

  const filteredCustomers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return customers
      .filter((customer) => {
        const matchesTab = activeTab === 'All' || customer.status === activeTab
        const matchesQuery =
          !normalizedQuery ||
          customer.name.toLowerCase().includes(normalizedQuery) ||
          customer.email.toLowerCase().includes(normalizedQuery) ||
          customer.location.toLowerCase().includes(normalizedQuery) ||
          customer.phone.toLowerCase().includes(normalizedQuery) ||
          customer.status.toLowerCase().includes(normalizedQuery)

        const matchesStatus = appliedFilters.status === 'All' || customer.status === appliedFilters.status
        const matchesLocation = appliedFilters.location === 'All' || customer.location === appliedFilters.location
        const matchesStartDate = !appliedFilters.startDate || parseDate(customer.date) >= parseDate(appliedFilters.startDate)
        const matchesEndDate = !appliedFilters.endDate || parseDate(customer.date) <= parseDate(appliedFilters.endDate)

        return matchesTab && matchesQuery && matchesStatus && matchesLocation && matchesStartDate && matchesEndDate
      })
      .sort((left, right) => compareCustomers(left, right, sort))
  }, [activeTab, appliedFilters, query, sort])

  const totalPages = Math.max(1, Math.ceil(filteredCustomers.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const pageStart = filteredCustomers.length === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const pageEnd = Math.min(currentPage * pageSize, filteredCustomers.length)
  const paginatedCustomers = filteredCustomers.slice((currentPage - 1) * pageSize, currentPage * pageSize)

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
          <h1 className="text-page-title text-ink-900 md:text-[1.875rem]">Customers</h1>
          <CustomerTabs activeTab={activeTab} tabCounts={tabCounts} onTabChange={handleTabChange} />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-ink-100 bg-white px-4 py-2 text-body text-ink-500 shadow-card hover:bg-ink-50">
            <Download size={16} />
            Export
            <ChevronDown size={14} />
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-dark text-white shadow-card hover:bg-brand-green"
            aria-label="Add customer"
            onClick={() => setCustomerModalOpen(true)}
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      <CustomersTable
        customers={paginatedCustomers}
        filteredCount={filteredCustomers.length}
        selectedIds={selectedIds}
        query={query}
        page={currentPage}
        pageSize={pageSize}
        pageStart={pageStart}
        pageEnd={pageEnd}
        totalPages={totalPages}
        sort={sort}
        appliedFilters={appliedFilters}
        locationOptions={locationOptions}
        onQueryChange={setQuery}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onSelectionChange={setSelectedIds}
        onSort={handleSort}
        onApplyFilters={setAppliedFilters}
      />

      {customerModalOpen ? (
        <CustomerFormModal onClose={() => setCustomerModalOpen(false)} onSubmit={() => setCustomerModalOpen(false)} />
      ) : null}
    </div>
  )
}

function CustomerTabs({ activeTab, tabCounts, onTabChange }) {
  return (
    <div className="mt-6 flex h-auto w-full flex-wrap items-center gap-7 border-b border-ink-100 text-body md:h-10">
      {customerTabs.map((tab) => (
        <button
          key={tab.value}
          className={`relative flex items-center gap-2 pb-3 font-medium ${
            activeTab === tab.value ? 'text-ink-900' : 'text-ink-400 hover:text-ink-700'
          }`}
          onClick={() => onTabChange(tab.value)}
        >
          {tab.label}
          <span className="rounded-md bg-ink-100 px-1.5 py-0.5 text-caption font-medium text-ink-500">{tabCounts[tab.value]}</span>
          {activeTab === tab.value ? <span className="absolute bottom-[-1px] left-0 h-0.5 w-full rounded-full bg-brand-dark" /> : null}
        </button>
      ))}
    </div>
  )
}

function CustomersTable({
  customers: visibleCustomers,
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
  locationOptions,
  onQueryChange,
  onPageChange,
  onPageSizeChange,
  onSelectionChange,
  onSort,
  onApplyFilters,
}) {
  const [filterOpen, setFilterOpen] = useState(false)
  const [draftFilters, setDraftFilters] = useState(appliedFilters)
  const visibleIds = visibleCustomers.map((customer) => customer.id)
  const allVisibleSelected = visibleIds.length > 0 && visibleIds.every((id) => selectedIds.includes(id))

  const toggleCustomer = (customerId) => {
    onSelectionChange((currentIds) =>
      currentIds.includes(customerId) ? currentIds.filter((id) => id !== customerId) : [...currentIds, customerId],
    )
  }

  const toggleVisibleCustomers = () => {
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
      location: 'All',
      startDate: '',
      endDate: '',
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
            className="min-w-0 flex-1 bg-transparent text-body text-ink-700 outline-none placeholder:text-ink-400"
            placeholder="Search customer..."
          />
          <button
            className={`rounded-lg p-1.5 ${filterOpen ? 'bg-ink-50 text-ink-700' : 'text-ink-400 hover:text-ink-700'}`}
            onClick={() => {
              setDraftFilters(appliedFilters)
              setFilterOpen((open) => !open)
            }}
            aria-expanded={filterOpen}
            aria-label="Filter customers"
          >
            <SlidersHorizontal size={17} />
          </button>
          {filterOpen ? (
            <FilterPopover
              filters={draftFilters}
              locationOptions={locationOptions}
              onFilterChange={setDraftFilters}
              onSave={handleSaveFilters}
              onReset={handleResetFilters}
            />
          ) : null}
        </div>

        <button className="flex h-11 items-center justify-center gap-2 rounded-xl border border-ink-100 px-5 text-body text-ink-500 hover:bg-ink-50">
          Actions
          <ChevronDown size={14} />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-auto rounded-lg">
        <table className="h-full w-full min-w-[960px] table-fixed text-body">
          <colgroup>
            <col className="w-12" />
            <col className="w-[28%]" />
            <col className="w-[18%]" />
            <col className="w-[16%]" />
            <col className="w-[12%]" />
            <col className="w-[12%]" />
            <col className="w-10" />
          </colgroup>
          <thead>
            <tr className="border-y border-ink-100 text-left text-section-title uppercase text-ink-500">
              <th className="w-12 px-2 py-4">
                <Checkbox checked={allVisibleSelected} onChange={toggleVisibleCustomers} label="Select all customers on this page" />
              </th>
              {tableHeaders.map((header) => (
                <th key={header.key} className="px-3 py-4 font-semibold">
                  {header.key === 'status' ? (
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
            {visibleCustomers.length > 0 ? (
              visibleCustomers.map((customer) => (
                <tr key={customer.id} className="border-b border-ink-100 text-ink-500 last:border-b-0">
                  <td className="px-2 py-4">
                    <Checkbox
                      checked={selectedIds.includes(customer.id)}
                      onChange={() => toggleCustomer(customer.id)}
                      label={`Select ${customer.name}`}
                    />
                  </td>
                  <td className="px-3 py-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <Avatar name={customer.name} />
                      <div className="min-w-0">
                        <p className="truncate font-medium text-ink-700">{customer.name}</p>
                        <p className="truncate text-caption text-ink-500">{customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="truncate px-3 py-4 text-ink-700">{customer.location}</td>
                  <td className="truncate px-3 py-4 text-ink-700">{customer.phone}</td>
                  <td className="px-3 py-4 text-ink-400">{customer.date}</td>
                  <td className="px-3 py-4">
                    <StatusBadge status={customer.status} />
                  </td>
                  <td className="px-2 py-4 text-right text-ink-400">
                    <button className="hover:text-ink-700" aria-label={`More actions for ${customer.name}`}>
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-3 py-16 text-center text-ink-400">
                  No customers match your search or filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex shrink-0 flex-col gap-4 border-t border-ink-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-4">
          <PageSizeSelect value={pageSize} onChange={onPageSizeChange} />
          <p className="text-body text-ink-400">
            {filteredCount === 0 ? 'Showing 0 of 0' : `Showing ${pageStart} - ${pageEnd} of ${filteredCount}`}
          </p>
        </div>

        <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
      </div>
    </section>
  )
}

function Avatar({ name }) {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#E98B70] to-[#C65E43] text-xs font-semibold text-white">
      {name
        .split(' ')
        .map((part) => part[0])
        .join('')}
    </div>
  )
}

function PageSizeSelect({ value, onChange }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 rounded-xl border border-ink-100 px-4 py-2 text-body text-ink-500 hover:bg-ink-50"
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
              className={`block w-full px-4 py-2 text-left text-body hover:bg-ink-50 ${
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

function FilterPopover({ filters, locationOptions, onFilterChange, onSave, onReset }) {
  const updateFilter = (key, value) => {
    onFilterChange((currentFilters) => ({ ...currentFilters, [key]: value }))
  }

  return (
    <div className="absolute right-0 top-14 z-30 w-[calc(100vw-4rem)] max-w-[460px] rounded-xl2 bg-white p-8 shadow-2xl ring-1 ring-ink-100 md:w-[460px]">
      <h2 className="mb-8 text-3xl font-semibold text-ink-700">Filter</h2>

      <div className="space-y-6">
        <FilterField label="Status">
          <SelectLike value={filters.status} onChange={(value) => updateFilter('status', value)} options={['All', 'Active', 'Blocked']} />
        </FilterField>

        <FilterField label="Location">
          <SelectLike value={filters.location} onChange={(value) => updateFilter('location', value)} options={locationOptions} />
        </FilterField>

        <FilterField label="Date">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <DateInput value={filters.startDate} placeholder="Start" onChange={(value) => updateFilter('startDate', value)} />
            <span className="text-ink-100">-</span>
            <DateInput value={filters.endDate} placeholder="End" onChange={(value) => updateFilter('endDate', value)} />
          </div>
        </FilterField>
      </div>

      <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          className="h-12 rounded-xl border border-ink-100 px-5 text-body font-semibold text-ink-500 hover:bg-ink-50"
          onClick={onReset}
        >
          Reset
        </button>
        <button
          className="h-12 rounded-xl bg-brand-dark px-8 text-body font-semibold text-white shadow-card hover:bg-brand-green"
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
      <span className="mb-3 block text-sm font-medium text-ink-500">{label}</span>
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
        className="h-12 w-full rounded-xl border border-ink-100 bg-white px-11 pr-8 text-body font-semibold text-ink-500 outline-none placeholder:text-ink-300 hover:bg-ink-50"
      />
      <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-400" />
    </div>
  )
}

function StatusBadge({ status }) {
  const isActive = status === 'Active'

  return (
    <span
      className={`inline-flex rounded-lg px-3 py-1 text-caption font-medium ${
        isActive ? 'bg-brand-green/10 text-brand-dark' : 'bg-orange-100 text-orange-600'
      }`}
    >
      {status}
    </span>
  )
}

function Pagination({ page, totalPages, onPageChange }) {
  const pages = buildPageNumbers(page, totalPages)

  return (
    <div className="flex flex-wrap items-center gap-2 text-body">
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

function parseDate(value) {
  const [day, month, year] = value.split('.').map(Number)
  return new Date(2000 + year, month - 1, day).getTime()
}

function compareCustomers(left, right, sort) {
  const direction = sort.direction === 'asc' ? 1 : -1

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
