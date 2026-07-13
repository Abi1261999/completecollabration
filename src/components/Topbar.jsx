import { Menu, Search, Bell } from 'lucide-react'

export default function Topbar() {
  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-8 bg-ink-50/60 sticky top-0 z-10 backdrop-blur">
      <button className="md:hidden p-2 rounded-lg hover:bg-ink-100 text-ink-700">
        <Menu size={20} />
      </button>
      <div className="hidden md:block" />
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-lg hover:bg-ink-100 text-ink-500">
          <Search size={18} />
        </button>
        <button className="relative p-2 rounded-lg hover:bg-ink-100 text-ink-500">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger" />
        </button>
        <div className="flex items-center gap-2 pl-2 border-l border-ink-200">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-teal to-brand-green flex items-center justify-center text-white text-xs font-medium">
            AT
          </div>
          <span className="hidden sm:block text-sm font-medium text-ink-900">ArtTemplate</span>
        </div>
      </div>
    </header>
  )
}
