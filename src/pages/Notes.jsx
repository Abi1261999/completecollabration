import { useMemo, useState } from 'react'
import {
  AlignLeft,
  CalendarDays,
  MoreHorizontal,
  Pencil,
  Pin,
  Plus,
  SlidersHorizontal,
  Trash2,
  X,
} from 'lucide-react'

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'

const seedNotes = [
  { id: 'note-1', title: 'The title of a note', description: lorem, date: '12 June, 2020', pinned: false },
  { id: 'note-2', title: 'The title of a note', description: lorem, date: '12 June, 2020', pinned: true },
  { id: 'note-3', title: 'The title of a note', description: lorem, date: '12 June, 2020', pinned: false },
  { id: 'note-4', title: 'The title of a note', description: lorem, date: '12 June, 2020', pinned: false },
  { id: 'note-5', title: 'The title of a note', description: lorem, date: '12 June, 2020', pinned: false },
  { id: 'note-6', title: 'The title of a note', description: lorem, date: '12 June, 2020', pinned: false },
  { id: 'note-7', title: 'The title of a note', description: lorem, date: '12 June, 2020', pinned: false },
  { id: 'note-8', title: 'The title of a note', description: lorem, date: '12 June, 2020', pinned: false },
  { id: 'note-9', title: 'The title of a note', description: lorem, date: '12 June, 2020', pinned: false },
]

function formatNoteDate(date = new Date()) {
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function Notes() {
  const [notes, setNotes] = useState(seedNotes)
  const [selectedNoteId, setSelectedNoteId] = useState(null)
  const [addNoteOpen, setAddNoteOpen] = useState(false)
  const [editNoteId, setEditNoteId] = useState(null)
  const [filterOpen, setFilterOpen] = useState(false)
  const [showPinnedOnly, setShowPinnedOnly] = useState(false)

  const selectedNote = notes.find((note) => note.id === selectedNoteId) || null
  const editingNote = notes.find((note) => note.id === editNoteId) || null

  const visibleNotes = useMemo(() => {
    const sorted = [...notes].sort((a, b) => Number(b.pinned) - Number(a.pinned))
    if (!showPinnedOnly) return sorted
    return sorted.filter((note) => note.pinned)
  }, [notes, showPinnedOnly])

  const openDetail = (noteId) => {
    setSelectedNoteId(noteId)
    setAddNoteOpen(false)
    setEditNoteId(null)
  }

  const closeDetail = () => {
    setSelectedNoteId(null)
  }

  const openAddNote = () => {
    setAddNoteOpen(true)
    setSelectedNoteId(null)
    setEditNoteId(null)
  }

  const openEditNote = (noteId) => {
    setEditNoteId(noteId)
    setSelectedNoteId(null)
    setAddNoteOpen(false)
  }

  const togglePin = (noteId) => {
    setNotes((current) =>
      current.map((note) => (note.id === noteId ? { ...note, pinned: !note.pinned } : note)),
    )
  }

  const deleteNote = (noteId) => {
    setNotes((current) => current.filter((note) => note.id !== noteId))
    setSelectedNoteId(null)
    setEditNoteId(null)
  }

  const createNote = ({ title, description }) => {
    const id = `note-${Date.now()}`
    const newNote = {
      id,
      title,
      description,
      date: formatNoteDate(),
      pinned: false,
    }
    setNotes((current) => [newNote, ...current])
    setAddNoteOpen(false)
    setSelectedNoteId(id)
  }

  const updateNote = ({ title, description }) => {
    if (!editNoteId) return
    setNotes((current) =>
      current.map((note) => (note.id === editNoteId ? { ...note, title, description } : note)),
    )
    setEditNoteId(null)
    setSelectedNoteId(editNoteId)
  }

  return (
    <div className="min-h-full bg-ink-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-[1400px]">
        <header className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-semibold text-ink-900 md:text-3xl">Notes</h1>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                type="button"
                className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-colors ${
                  filterOpen || showPinnedOnly
                    ? 'border-brand-dark bg-white text-brand-dark shadow-card'
                    : 'border-ink-100 bg-white text-ink-500 hover:bg-ink-50 hover:text-ink-700'
                }`}
                onClick={() => setFilterOpen((open) => !open)}
                aria-label="Filter notes"
              >
                <SlidersHorizontal size={18} />
              </button>
              {filterOpen ? (
                <div className="absolute right-0 top-12 z-20 min-w-[180px] rounded-xl border border-ink-100 bg-white p-2 shadow-xl">
                  <button
                    type="button"
                    className={`flex w-full rounded-lg px-3 py-2.5 text-left text-sm ${
                      showPinnedOnly ? 'bg-brand-green/10 font-medium text-brand-dark' : 'text-ink-600 hover:bg-ink-50'
                    }`}
                    onClick={() => {
                      setShowPinnedOnly((value) => !value)
                      setFilterOpen(false)
                    }}
                  >
                    Pinned notes only
                  </button>
                </div>
              ) : null}
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-dark px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-green md:px-5"
              onClick={openAddNote}
            >
              <Plus size={16} />
              Add Note
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {visibleNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onOpen={() => openDetail(note.id)}
              onTogglePin={() => togglePin(note.id)}
            />
          ))}
        </div>
      </div>

      {selectedNote ? (
        <NoteDetailModal
          note={selectedNote}
          onClose={closeDetail}
          onEdit={() => openEditNote(selectedNote.id)}
          onDelete={() => deleteNote(selectedNote.id)}
        />
      ) : null}

      {addNoteOpen ? <AddNoteModal mode="create" onClose={() => setAddNoteOpen(false)} onSave={createNote} /> : null}

      {editingNote ? (
        <AddNoteModal
          mode="edit"
          initialTitle={editingNote.title}
          initialDescription={editingNote.description}
          onClose={() => setEditNoteId(null)}
          onSave={updateNote}
        />
      ) : null}
    </div>
  )
}

function NoteCard({ note, onOpen, onTogglePin }) {
  return (
    <article className="group relative overflow-hidden rounded-xl2 bg-white shadow-card transition-shadow hover:shadow-md">
      <span className="pointer-events-none absolute left-0 top-0 h-0 w-0 border-r-[28px] border-t-[28px] border-r-transparent border-t-yellow-400" />

      <div className="p-5 pt-6 md:p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-ink-400">
            <CalendarDays size={14} className="shrink-0" />
            <span>{note.date}</span>
          </div>
          <button
            type="button"
            className={`rounded-lg p-1.5 transition-colors ${
              note.pinned ? 'text-brand-dark' : 'text-ink-300 hover:bg-ink-50 hover:text-ink-500'
            }`}
            onClick={(event) => {
              event.stopPropagation()
              onTogglePin()
            }}
            aria-label={note.pinned ? 'Unpin note' : 'Pin note'}
          >
            <Pin size={15} className={note.pinned ? 'fill-current' : ''} />
          </button>
        </div>

        <div className="mb-4 border-b border-dashed border-ink-200" />

        <button type="button" className="w-full text-left" onClick={onOpen}>
          <h2 className="mb-3 text-base font-semibold text-ink-900">{note.title}</h2>
          <p className="line-clamp-5 text-sm leading-relaxed text-ink-500">{note.description}</p>
        </button>
      </div>
    </article>
  )
}

function NoteDetailModal({ note, onClose, onEdit, onDelete }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
      <button type="button" className="absolute inset-0 bg-ink-900/40" aria-label="Close note details" onClick={onClose} />
      <div className="relative z-10 max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl">
        <div className="flex items-center justify-end gap-1 border-b border-ink-100 px-4 py-3 sm:px-5">
          <ToolbarIconButton icon={Pencil} label="Edit note" onClick={onEdit} />
          <ToolbarIconButton icon={Trash2} label="Delete note" onClick={onDelete} />
          <ToolbarIconButton icon={MoreHorizontal} label="More options" />
          <button
            type="button"
            className="ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-ink-50 text-ink-500 hover:bg-ink-100 hover:text-ink-700"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-6 px-5 py-6 sm:px-8 sm:py-8">
          <div className="flex items-start gap-4">
            <span className="mt-1 h-4 w-4 shrink-0 rounded-sm bg-yellow-400" />
            <h2 className="text-xl font-semibold leading-snug text-ink-900 sm:text-2xl">{note.title}</h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink-50 text-ink-400">
              <CalendarDays size={18} />
            </div>
            <p className="text-sm text-ink-500">{note.date}</p>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink-50 text-ink-400">
              <AlignLeft size={18} />
            </div>
            <p className="text-sm leading-relaxed text-ink-500">{note.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function AddNoteModal({ mode, initialTitle = '', initialDescription = '', onClose, onSave }) {
  const [title, setTitle] = useState(initialTitle)
  const [description, setDescription] = useState(initialDescription)
  const [error, setError] = useState('')
  const isEdit = mode === 'edit'

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmedTitle = title.trim()
    const trimmedDescription = description.trim()

    if (!trimmedTitle) {
      setError('Please enter a title.')
      return
    }

    onSave({ title: trimmedTitle, description: trimmedDescription || lorem })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
      <button type="button" className="absolute inset-0 bg-ink-900/40" aria-label="Close dialog" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl">
        <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4 sm:px-6 sm:py-5">
          <h2 className="text-lg font-semibold text-ink-900 sm:text-xl">{isEdit ? 'Edit Note' : 'Add Note'}</h2>
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
          <label className="mb-2 block text-sm text-ink-500" htmlFor="note-title">
            Title
          </label>
          <input
            id="note-title"
            type="text"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value)
              if (error) setError('')
            }}
            placeholder="The title of a note"
            autoFocus
            className="mb-5 h-12 w-full rounded-xl border border-ink-100 px-4 text-sm text-ink-800 outline-none placeholder:text-ink-400 focus:border-brand-dark focus:ring-2 focus:ring-brand-dark/15"
          />

          <label className="mb-2 block text-sm text-ink-500" htmlFor="note-description">
            Description
          </label>
          <textarea
            id="note-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Type something"
            rows={6}
            className="w-full resize-y rounded-xl border border-ink-100 px-4 py-3 text-sm text-ink-800 outline-none placeholder:text-ink-400 focus:border-brand-dark focus:ring-2 focus:ring-brand-dark/15"
          />
          {error ? <p className="mt-2 text-xs text-red-500">{error}</p> : null}

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="h-11 rounded-xl bg-brand-dark px-6 text-sm font-medium text-white hover:bg-brand-green"
            >
              {isEdit ? 'Save' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function ToolbarIconButton({ icon: Icon, label, onClick }) {
  return (
    <button
      type="button"
      className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-400 hover:bg-ink-50 hover:text-ink-700"
      onClick={onClick}
      aria-label={label}
    >
      <Icon size={17} />
    </button>
  )
}
