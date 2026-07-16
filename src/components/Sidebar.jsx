import { NavLink, useLocation } from 'react-router-dom'
import { Search, ChevronRight } from 'lucide-react'
import FlowerLogo from './FlowerLogo'
import { navItems } from '../navConfig'

export default function Sidebar() {
  const { pathname } = useLocation()

  return (
    <aside className="hidden md:flex md:flex-col w-64 shrink-0 bg-white border-r border-ink-100 h-screen sticky top-0">
      <div className="flex h-16 shrink-0 items-center gap-2.5 px-6">
        <FlowerLogo />
        <span className="text-card-title tracking-tight text-ink-900">FLOWER</span>
      </div>

      <div className="px-4 mb-2">
        <div className="flex items-center gap-2 bg-ink-50 rounded-lg px-3 py-2">
          <Search size={16} className="text-ink-400" />
          <input
            placeholder="Search anything"
            className="w-full bg-transparent text-body text-ink-700 outline-none placeholder:text-ink-400"
          />
        </div>
      </div>

      <div className="px-6 py-2">
        <p className="text-section-title uppercase text-ink-500">MAIN MENU</p>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-6">
        <ul className="space-y-1">
          {navItems.map(({ label, path, icon: Icon, badge, children }) => {
            const isSectionActive = children?.some((child) => pathname === child.path)

            return (
              <li key={path}>
                <NavLink
                  to={path}
                  end={path === '/'}
                  className={({ isActive }) =>
                    `flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-body transition-colors ${
                      isActive || isSectionActive
                        ? 'bg-brand-green/15 text-brand-dark font-medium'
                        : 'text-ink-500 hover:bg-ink-50 hover:text-ink-900'
                    }`
                  }
                >
                  <span className="flex items-center gap-3">
                    <Icon size={18} />
                    {label}
                  </span>
                  {children ? (
                    <ChevronRight
                      size={14}
                      className={`transition-transform ${isSectionActive ? 'rotate-90' : ''}`}
                    />
                  ) : badge ? (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-danger text-caption font-semibold leading-none text-white">
                      {badge}
                    </span>
                  ) : null}
                </NavLink>

                {children && isSectionActive ? (
                  <ul className="mt-1 space-y-1 pl-6">
                    {children.map((child) => (
                      <li key={child.path}>
                        <NavLink
                          to={child.path}
                          className={({ isActive }) =>
                            `flex items-center gap-3 rounded-lg px-3 py-2 text-body transition-colors before:h-1.5 before:w-1.5 before:rounded-full ${
                              isActive
                                ? 'bg-brand-green/15 text-ink-900 font-medium before:bg-ink-900'
                                : 'text-ink-500 hover:bg-ink-50 hover:text-ink-900 before:bg-ink-400'
                            }`
                          }
                        >
                          {child.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
