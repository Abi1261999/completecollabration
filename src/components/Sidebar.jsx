import { NavLink } from 'react-router-dom'
import { Search, Flower2 } from 'lucide-react'
import { navItems } from '../navConfig'

export default function Sidebar() {
  return (
    <aside className="hidden md:flex md:flex-col w-64 shrink-0 bg-white border-r border-ink-100 h-screen sticky top-0">
      <div className="flex items-center gap-2 px-6 h-16 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-teal to-brand-green flex items-center justify-center">
          <Flower2 size={18} className="text-white" />
        </div>
        <span className="font-semibold tracking-wide text-ink-900">FLOWER</span>
      </div>

      <div className="px-4 mb-2">
        <div className="flex items-center gap-2 bg-ink-50 rounded-lg px-3 py-2">
          <Search size={16} className="text-ink-400" />
          <input
            placeholder="Search anything"
            className="bg-transparent outline-none text-sm text-ink-700 placeholder:text-ink-400 w-full"
          />
        </div>
      </div>

      <div className="px-6 py-2">
        <p className="text-xs font-medium tracking-wider text-ink-400">MAIN MENU</p>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-6">
        <ul className="space-y-1">
          {navItems.map(({ label, path, icon: Icon, badge }) => (
            <li key={path}>
              <NavLink
                to={path}
                end={path === '/'}
                className={({ isActive }) =>
                  `flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    isActive
                      ? 'bg-brand-green/15 text-brand-dark font-medium'
                      : 'text-ink-500 hover:bg-ink-50 hover:text-ink-900'
                  }`
                }
              >
                <span className="flex items-center gap-3">
                  <Icon size={18} />
                  {label}
                </span>
                {badge ? (
                  <span className="bg-danger text-white text-[11px] leading-none rounded-full w-5 h-5 flex items-center justify-center">
                    {badge}
                  </span>
                ) : null}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
