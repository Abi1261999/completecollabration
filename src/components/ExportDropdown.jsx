import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Download, Printer } from 'lucide-react'

const exportOptions = [
  { id: 'print', label: 'Print', icon: 'print' },
  { id: 'excel', label: 'Excel', icon: 'xls' },
  { id: 'pdf', label: 'PDF', icon: 'pdf' },
  { id: 'csv', label: 'CSV', icon: 'csv' },
]

export default function ExportDropdown({ className = '' }) {
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState('excel')
  const containerRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const handleClick = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  const handleSelect = (id) => {
    setActiveId(id)
    setOpen(false)
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        className={`flex items-center gap-2 rounded-full border border-ink-100 bg-white px-4 py-2.5 text-sm text-ink-600 shadow-card transition-colors hover:bg-ink-50 ${
          open ? 'ring-2 ring-brand-dark/10' : ''
        }`}
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <Download size={16} className="text-ink-500" />
        Export
        <ChevronDown size={14} className={`text-ink-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+0.5rem)] z-30 min-w-[180px] overflow-hidden rounded-xl border border-ink-100 bg-white py-2 shadow-xl sm:min-w-[200px]"
        >
          {exportOptions.map((option) => {
            const isActive = activeId === option.id
            return (
              <button
                key={option.id}
                type="button"
                role="menuitem"
                className={`mx-2 flex w-[calc(100%-1rem)] items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-ink-700 transition-colors ${
                  isActive ? 'bg-ink-50' : 'hover:bg-ink-50'
                }`}
                onMouseEnter={() => setActiveId(option.id)}
                onClick={() => handleSelect(option.id)}
              >
                {option.icon === 'print' ? (
                  <span className="flex h-8 w-8 items-center justify-center text-ink-500">
                    <Printer size={18} strokeWidth={1.75} />
                  </span>
                ) : (
                  <ExportFileIcon type={option.icon} />
                )}
                {option.label}
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

function ExportFileIcon({ type }) {
  const styles = {
    xls: 'bg-emerald-600 text-white',
    pdf: 'bg-red-500 text-white',
    csv: 'bg-sky-500 text-white',
  }
  const labels = { xls: 'XLS', pdf: 'PDF', csv: 'CSV' }

  return (
    <span className={`flex h-8 w-8 items-center justify-center rounded-md text-[9px] font-bold tracking-wide ${styles[type]}`}>
      {labels[type]}
    </span>
  )
}
