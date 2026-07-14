import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Grid2X2,
  List,
  MoreVertical,
  Pencil,
  Plus,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react'
import {
  avatarGradients,
  contactBirthday,
  contactName,
  createInitialContacts,
  days,
  defaultContactForm,
  favoriteContacts,
  formFromContact,
  months,
  roleBadgeStyles,
  years,
} from './contactsData'

const pageSizeOptions = [10, 25, 50]

export default function Contacts() {
  const [contacts, setContacts] = useState(createInitialContacts)
  const [viewMode, setViewMode] = useState('list')
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState(1)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [selectedIds, setSelectedIds] = useState([])
  const [formOpen, setFormOpen] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [actionsOpen, setActionsOpen] = useState(false)
  const [cardMenuId, setCardMenuId] = useState(null)
  const actionsRef = useRef(null)
  const cardMenuRef = useRef(null)

  const filteredContacts = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return contacts

    return contacts.filter((contact) => {
      const fullName = contactName(contact).toLowerCase()
      return (
        fullName.includes(normalized) ||
        contact.email.toLowerCase().includes(normalized) ||
        contact.address.toLowerCase().includes(normalized) ||
        contact.phone.toLowerCase().includes(normalized) ||
        contact.jobTitle.toLowerCase().includes(normalized)
      )
    })
  }, [contacts, query])

  const totalPages = Math.max(1, Math.ceil(filteredContacts.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const pageStart = filteredContacts.length === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const pageEnd = Math.min(currentPage * pageSize, filteredContacts.length)
  const paginatedContacts = filteredContacts.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const selectedContact =
    filteredContacts.find((contact) => contact.id === selectedId) || filteredContacts[0] || null
  const editingContact = contacts.find((contact) => contact.id === editingId) || null

  useEffect(() => {
    setPage(1)
  }, [query, pageSize, viewMode])

  useEffect(() => {
    if (!selectedContact && filteredContacts[0]) {
      setSelectedId(filteredContacts[0].id)
    }
  }, [filteredContacts, selectedContact])

  useEffect(() => {
    if (!actionsOpen && !cardMenuId) return undefined
    const handleClick = (event) => {
      if (actionsRef.current?.contains(event.target)) return
      if (cardMenuRef.current?.contains(event.target)) return
      setActionsOpen(false)
      setCardMenuId(null)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [actionsOpen, cardMenuId])

  const openAddContact = () => {
    setFormOpen('create')
    setEditingId(null)
  }

  const openEditContact = (contactId) => {
    setEditingId(contactId)
    setFormOpen('edit')
    setCardMenuId(null)
  }

  const closeForm = () => {
    setFormOpen(null)
    setEditingId(null)
  }

  const saveContact = (form) => {
    if (formOpen === 'edit' && editingId) {
      setContacts((current) =>
        current.map((contact) => (contact.id === editingId ? { ...contact, ...form } : contact)),
      )
      setSelectedId(editingId)
    } else {
      const nextId = contacts.reduce((max, contact) => Math.max(max, contact.id), 0) + 1
      const newContact = { id: nextId, online: true, ...form }
      setContacts((current) => [newContact, ...current])
      setSelectedId(nextId)
    }
    closeForm()
  }

  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedContacts.length) {
      setSelectedIds([])
      return
    }
    setSelectedIds(paginatedContacts.map((contact) => contact.id))
  }

  const toggleSelect = (contactId) => {
    setSelectedIds((current) =>
      current.includes(contactId) ? current.filter((id) => id !== contactId) : [...current, contactId],
    )
  }

  return (
    <div className="min-h-full bg-ink-50">
      <div className="flex min-h-full flex-col xl:flex-row">
        <div className="min-w-0 flex-1 p-4 md:p-6 lg:p-8">
          <header className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <h1 className="text-2xl font-semibold text-ink-900 md:text-3xl">Contacts</h1>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-brand-dark px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-green lg:self-auto"
              onClick={openAddContact}
            >
              <Plus size={16} />
              Add Contact
            </button>
          </header>

          <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex flex-1 items-center gap-3 rounded-xl border border-ink-100 bg-white px-4 py-3">
              <Search size={17} className="shrink-0 text-ink-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search contact..."
                className="w-full bg-transparent text-sm text-ink-700 outline-none placeholder:text-ink-400"
              />
              <button type="button" className="text-ink-400 hover:text-ink-600" aria-label="Filter contacts">
                <SlidersHorizontal size={17} />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 rounded-xl border border-ink-100 bg-white p-1">
                <button
                  type="button"
                  className={`rounded-lg p-2 ${viewMode === 'list' ? 'bg-ink-50 text-brand-dark' : 'text-ink-400 hover:text-ink-700'}`}
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                >
                  <List size={16} />
                </button>
                <button
                  type="button"
                  className={`rounded-lg p-2 ${viewMode === 'grid' ? 'bg-ink-50 text-brand-dark' : 'text-ink-400 hover:text-ink-700'}`}
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                >
                  <Grid2X2 size={16} />
                </button>
              </div>

              {viewMode === 'list' ? (
                <div className="relative" ref={actionsRef}>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-xl border border-ink-100 bg-white px-4 py-2.5 text-sm text-ink-600 hover:bg-ink-50"
                    onClick={() => setActionsOpen((open) => !open)}
                  >
                    Actions
                    <ChevronDown size={14} />
                  </button>
                  {actionsOpen ? (
                    <div className="absolute right-0 top-12 z-20 min-w-[160px] rounded-xl border border-ink-100 bg-white py-1 shadow-xl">
                      <button type="button" className="block w-full px-4 py-2.5 text-left text-sm text-ink-600 hover:bg-ink-50">
                        Export selected
                      </button>
                      <button type="button" className="block w-full px-4 py-2.5 text-left text-sm text-red-500 hover:bg-ink-50">
                        Delete selected
                      </button>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {filteredContacts.map((contact) => (
                <ContactCard
                  key={contact.id}
                  contact={contact}
                  menuOpen={cardMenuId === contact.id}
                  menuRef={cardMenuRef}
                  onMenuToggle={() => setCardMenuId((current) => (current === contact.id ? null : contact.id))}
                  onEdit={() => openEditContact(contact.id)}
                  onSelect={() => {
                    setSelectedId(contact.id)
                    setViewMode('list')
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl2 border border-ink-100 bg-white shadow-card">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-sm">
                  <thead>
                    <tr className="border-b border-ink-100 text-left text-xs uppercase tracking-wide text-ink-400">
                      <th className="w-12 px-4 py-4">
                        <input
                          type="checkbox"
                          checked={paginatedContacts.length > 0 && selectedIds.length === paginatedContacts.length}
                          onChange={toggleSelectAll}
                          className="h-4 w-4 rounded border-ink-200 text-brand-dark accent-brand-dark"
                        />
                      </th>
                      <th className="px-4 py-4 font-semibold">Name</th>
                      <th className="px-4 py-4 font-semibold">Email</th>
                      <th className="px-4 py-4 font-semibold">Location</th>
                      <th className="px-4 py-4 font-semibold">Phone</th>
                      <th className="w-12 px-4 py-4" />
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedContacts.map((contact) => {
                      const isSelected = selectedId === contact.id
                      return (
                        <tr
                          key={contact.id}
                          className={`cursor-pointer border-b border-ink-100 transition-colors hover:bg-ink-50/70 ${
                            isSelected ? 'bg-brand-green/5' : ''
                          }`}
                          onClick={() => setSelectedId(contact.id)}
                        >
                          <td className="px-4 py-4" onClick={(event) => event.stopPropagation()}>
                            <input
                              type="checkbox"
                              checked={selectedIds.includes(contact.id)}
                              onChange={() => toggleSelect(contact.id)}
                              className="h-4 w-4 rounded border-ink-200 text-brand-dark accent-brand-dark"
                            />
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <ContactAvatar contact={contact} size="sm" />
                              <div>
                                <p className="font-medium text-ink-900">{contactName(contact)}</p>
                                <p className="text-xs text-ink-400">{contact.jobTitle}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-ink-600">{contact.email}</td>
                          <td className="px-4 py-4 text-ink-600">{contact.address}</td>
                          <td className="px-4 py-4 text-ink-600">{contact.phone}</td>
                          <td className="px-4 py-4" onClick={(event) => event.stopPropagation()}>
                            <button
                              type="button"
                              className="rounded p-1 text-ink-400 hover:bg-ink-100"
                              onClick={() => openEditContact(contact.id)}
                              aria-label={`Edit ${contactName(contact)}`}
                            >
                              <MoreVertical size={16} />
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-col gap-4 border-t border-ink-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3 text-sm text-ink-500">
                  <select
                    value={pageSize}
                    onChange={(event) => setPageSize(Number(event.target.value))}
                    className="rounded-lg border border-ink-100 bg-white px-2 py-1.5 text-sm outline-none"
                  >
                    {pageSizeOptions.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                  <span>
                    Showing {pageStart} – {pageEnd} of {filteredContacts.length}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <PaginationButton onClick={() => setPage(1)} disabled={currentPage === 1} aria-label="First page">
                    <ChevronsLeft size={16} />
                  </PaginationButton>
                  <PaginationButton onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={currentPage === 1} aria-label="Previous page">
                    <ChevronLeft size={16} />
                  </PaginationButton>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
                    const pageNumber = index + 1
                    return (
                      <button
                        key={pageNumber}
                        type="button"
                        className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-3 text-sm ${
                          currentPage === pageNumber ? 'bg-brand-dark text-white' : 'text-ink-500 hover:bg-ink-50'
                        }`}
                        onClick={() => setPage(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    )
                  })}
                  <PaginationButton
                    onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
                    disabled={currentPage === totalPages}
                    aria-label="Next page"
                  >
                    <ChevronRight size={16} />
                  </PaginationButton>
                  <PaginationButton onClick={() => setPage(totalPages)} disabled={currentPage === totalPages} aria-label="Last page">
                    <ChevronsRight size={16} />
                  </PaginationButton>
                </div>
              </div>
            </div>
          )}
        </div>

        {viewMode === 'list' && selectedContact ? (
          <aside className="w-full shrink-0 border-t border-ink-100 bg-white xl:w-80 xl:border-l xl:border-t-0 2xl:w-96">
            <ContactDetailPanel contact={selectedContact} onEdit={() => openEditContact(selectedContact.id)} />
          </aside>
        ) : null}
      </div>

      {formOpen ? (
        <ContactFormModal
          mode={formOpen}
          initialForm={formOpen === 'edit' && editingContact ? formFromContact(editingContact) : defaultContactForm}
          contact={editingContact}
          onClose={closeForm}
          onSave={saveContact}
        />
      ) : null}
    </div>
  )
}

function ContactCard({ contact, menuOpen, menuRef, onMenuToggle, onEdit, onSelect }) {
  return (
    <article className="relative rounded-xl2 border border-ink-100 bg-white p-5 shadow-card transition-shadow hover:shadow-md">
      <div className="mb-4 flex justify-end">
        <div className="relative" ref={menuOpen ? menuRef : null}>
          <button
            type="button"
            className="rounded-lg p-1.5 text-ink-400 hover:bg-ink-50 hover:text-ink-600"
            onClick={onMenuToggle}
            aria-label="Contact options"
          >
            <MoreVertical size={16} />
          </button>
          {menuOpen ? (
            <div className="absolute right-0 top-9 z-20 min-w-[140px] rounded-xl border border-ink-100 bg-white py-1 shadow-xl">
              <button type="button" className="block w-full px-4 py-2.5 text-left text-sm text-ink-600 hover:bg-ink-50" onClick={onSelect}>
                View details
              </button>
              <button type="button" className="block w-full px-4 py-2.5 text-left text-sm text-ink-600 hover:bg-ink-50" onClick={onEdit}>
                Edit contact
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <button type="button" className="w-full text-center" onClick={onSelect}>
        <ContactAvatar contact={contact} size="lg" className="mx-auto" />
        <h2 className="mt-4 text-lg font-semibold text-ink-900">{contactName(contact)}</h2>
        <span
          className={`mt-2 inline-flex rounded-md px-2.5 py-1 text-xs font-medium ${
            roleBadgeStyles[contact.jobTitle] || 'bg-ink-100 text-ink-600'
          }`}
        >
          {contact.jobTitle}
        </span>

        <div className="mt-5 space-y-2 border-t border-ink-100 pt-4 text-left text-sm">
          <InfoLine label="Location" value={contact.address} />
          <InfoLine label="Email" value={contact.email} />
          <InfoLine label="Phone" value={contact.phone} />
        </div>
      </button>
    </article>
  )
}

function ContactDetailPanel({ contact, onEdit }) {
  return (
    <div className="p-6">
      <div className="text-center">
        <div className="relative mx-auto w-fit">
          <ContactAvatar contact={contact} size="xl" />
          {contact.online ? (
            <span className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-brand-green" />
          ) : null}
        </div>
        <h2 className="mt-4 text-xl font-semibold text-ink-900">{contactName(contact)}</h2>
        <p className="mt-1 text-sm text-ink-500">{contact.jobTitle}</p>
        <button
          type="button"
          className="mt-4 inline-flex items-center gap-2 rounded-xl border border-ink-100 px-4 py-2 text-sm text-ink-600 hover:bg-ink-50"
          onClick={onEdit}
        >
          <Pencil size={14} />
          Edit Contact
        </button>
      </div>

      <section className="mt-8">
        <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-ink-400">Info</h3>
        <dl className="space-y-4 text-sm">
          <DetailRow label="Email" value={contact.email} />
          <DetailRow label="Phone" value={contact.phone} />
          <DetailRow label="Birthday" value={contactBirthday(contact)} />
          <DetailRow label="Location" value={contact.address} />
        </dl>
      </section>

      <section className="mt-8">
        <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-ink-400">Favorites</h3>
        <ul className="space-y-3">
          {favoriteContacts.map((favorite) => (
            <li key={favorite.name} className="flex items-center gap-3">
              <ContactAvatar
                contact={{ firstName: favorite.name.split(' ')[0], lastName: favorite.name.split(' ')[1] || '', id: favorite.name }}
                size="xs"
              />
              <div>
                <p className="text-sm font-medium text-ink-800">{favorite.name}</p>
                <p className="text-xs text-ink-400">{favorite.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

function ContactFormModal({ mode, initialForm, contact, onClose, onSave }) {
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')
  const isEdit = mode === 'edit'

  const updateForm = (patch) => {
    setForm((current) => ({ ...current, ...patch }))
    if (error) setError('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.firstName.trim() || !form.lastName.trim()) {
      setError('Please enter first and last name.')
      return
    }
    onSave({
      ...form,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      address: form.address.trim(),
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
      <button type="button" className="absolute inset-0 bg-ink-900/40" aria-label="Close dialog" onClick={onClose} />
      <div className="relative z-10 max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl">
        <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4 sm:px-6 sm:py-5">
          <h2 className="text-lg font-semibold text-ink-900 sm:text-xl">{isEdit ? 'Edit Contact' : 'New Contact'}</h2>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-ink-50 text-ink-500 hover:bg-ink-100 hover:text-ink-700"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-5 py-6 sm:px-6">
          <div className="mb-6 flex justify-center">
            {isEdit && contact ? (
              <div className="relative flex h-28 w-28 items-center justify-center rounded-2xl border-2 border-dashed border-ink-200 bg-ink-50">
                <ContactAvatar contact={contact} size="lg" />
                <button
                  type="button"
                  className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full border border-ink-100 bg-white text-ink-500 shadow-card hover:bg-ink-50"
                  aria-label="Change photo"
                >
                  <Pencil size={14} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="flex h-28 w-28 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-ink-200 bg-ink-50 text-ink-400 hover:border-ink-300 hover:text-ink-500"
                aria-label="Upload contact photo"
              >
                <Plus size={28} strokeWidth={1.5} />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField label="First Name">
              <input
                value={form.firstName}
                onChange={(event) => updateForm({ firstName: event.target.value })}
                placeholder="Ronald"
                className={inputClass}
              />
            </FormField>
            <FormField label="Last Name">
              <input
                value={form.lastName}
                onChange={(event) => updateForm({ lastName: event.target.value })}
                placeholder="Robertson"
                className={inputClass}
              />
            </FormField>
          </div>

          <FormField label="Email" className="mt-4">
            <input
              type="email"
              value={form.email}
              onChange={(event) => updateForm({ email: event.target.value })}
              placeholder="robe@example.com"
              className={inputClass}
            />
          </FormField>

          <FormField label="Phone" className="mt-4">
            <div className="flex gap-3">
              <div className="flex h-12 w-24 shrink-0 items-center justify-center gap-2 rounded-xl border border-ink-100 bg-ink-50 text-sm text-ink-600">
                <span>🇺🇸</span>
                <span>+1</span>
              </div>
              <input
                value={form.phone}
                onChange={(event) => updateForm({ phone: event.target.value })}
                placeholder="+1 (070) 123-9221"
                className={inputClass}
              />
            </div>
          </FormField>

          <FormField label="Job Title" className="mt-4">
            <input
              value={form.jobTitle}
              onChange={(event) => updateForm({ jobTitle: event.target.value })}
              placeholder="Manager"
              className={inputClass}
            />
          </FormField>

          <FormField label="Address" className="mt-4">
            <input
              value={form.address}
              onChange={(event) => updateForm({ address: event.target.value })}
              placeholder="Paris, France"
              className={inputClass}
            />
          </FormField>

          <FormField label="Date of Birth" className="mt-4">
            <div className="grid grid-cols-3 gap-3">
              <select value={form.birthDay} onChange={(event) => updateForm({ birthDay: event.target.value })} className={inputClass}>
                {days.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
              <select value={form.birthMonth} onChange={(event) => updateForm({ birthMonth: event.target.value })} className={inputClass}>
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <select value={form.birthYear} onChange={(event) => updateForm({ birthYear: event.target.value })} className={inputClass}>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </FormField>

          <FormField label="Notes" className="mt-4">
            <textarea
              value={form.notes}
              onChange={(event) => updateForm({ notes: event.target.value })}
              placeholder="Type something"
              rows={5}
              className={`${inputClass} resize-y py-3`}
            />
          </FormField>

          {error ? <p className="mt-3 text-xs text-red-500">{error}</p> : null}

          <div className="mt-6 flex justify-end">
            <button type="submit" className="h-11 rounded-xl bg-brand-dark px-6 text-sm font-medium text-white hover:bg-brand-green">
              Add Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function ContactAvatar({ contact, size = 'md', className = '' }) {
  const sizes = {
    xs: 'h-8 w-8 text-[10px] rounded-lg',
    sm: 'h-10 w-10 text-xs rounded-xl',
    md: 'h-16 w-16 text-sm rounded-2xl',
    lg: 'h-24 w-24 text-2xl rounded-2xl',
    xl: 'h-28 w-28 text-3xl rounded-full',
  }
  const gradient = avatarGradients[(contact.id || 0) % avatarGradients.length]

  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br font-semibold text-white ${sizes[size]} ${gradient} ${className}`}
    >
      {contact.firstName?.[0]}
      {contact.lastName?.[0]}
    </div>
  )
}

function InfoLine({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-ink-400">{label}</span>
      <span className="truncate text-right text-ink-700">{value}</span>
    </div>
  )
}

function DetailRow({ label, value }) {
  return (
    <div>
      <dt className="text-[11px] font-semibold uppercase tracking-wider text-ink-400">{label}</dt>
      <dd className="mt-1 font-medium text-ink-800">{value}</dd>
    </div>
  )
}

function FormField({ label, children, className = '' }) {
  return (
    <div className={className}>
      <label className="mb-2 block text-sm text-ink-500">{label}</label>
      {children}
    </div>
  )
}

function PaginationButton({ children, onClick, disabled, ...props }) {
  return (
    <button
      type="button"
      className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-500 hover:bg-ink-50 disabled:cursor-not-allowed disabled:opacity-40"
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

const inputClass =
  'h-12 w-full rounded-xl border border-ink-100 px-4 text-sm text-ink-800 outline-none placeholder:text-ink-400 focus:border-brand-dark focus:ring-2 focus:ring-brand-dark/15'
