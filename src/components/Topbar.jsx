import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, Search, Bell, X } from 'lucide-react'

const notifications = [
  { name: 'Regina Cooper', time: '1 min ago', online: true },
  { name: 'Judith Black', time: '5 min ago', active: true },
  { name: 'Ronald Robertson', time: '3 hour ago', online: true },
  { name: 'Dustin Williamson', time: '15 hour ago' },
  { name: 'Calvin Flores', time: 'Yesterday', online: true },
  { name: 'Robert Edwards', time: 'Yesterday', online: true },
]

export default function Topbar() {
  const [notificationsOpen, setNotificationsOpen] = useState(false)

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
        <div className="relative">
          <button
            className={`relative p-2 rounded-lg text-ink-500 ${
              notificationsOpen ? 'bg-white shadow-card' : 'hover:bg-ink-100'
            }`}
            onClick={() => setNotificationsOpen((open) => !open)}
            aria-expanded={notificationsOpen}
            aria-label="Open notifications"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-danger" />
          </button>
          {notificationsOpen ? (
            <NotificationsPopover onClose={() => setNotificationsOpen(false)} />
          ) : null}
        </div>
        <NavLink
          to="/arttemplate"
          className={({ isActive }) =>
            `flex items-center gap-2 pl-2 pr-2 py-1.5 border-l border-ink-200 rounded-lg transition-colors ${
              isActive
                ? 'bg-brand-green/15 text-brand-dark'
                : 'text-ink-900 hover:bg-ink-100'
            }`
          }
          aria-label="Open ArtTemplate profile dashboard"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-teal to-brand-green flex items-center justify-center text-white text-xs font-medium">
            AT
          </div>
          <span className="hidden sm:block text-sm font-medium">ArtTemplate</span>
        </NavLink>
      </div>
    </header>
  )
}

function NotificationsPopover({ onClose }) {
  return (
    <div className="fixed right-4 top-[15px] z-30 h-[min(478px,calc(100vh-30px))] w-[calc(100vw-2rem)] max-w-[340px] rounded-xl2 bg-white shadow-2xl ring-1 ring-ink-100 md:right-[190px]">
      <div className="flex items-center justify-between border-b border-ink-100 px-6 py-5">
        <h2 className="text-lg font-semibold text-ink-700">Notifications</h2>
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-danger px-1.5 text-xs font-semibold text-white">
          8
        </span>
      </div>

      <ul className="space-y-1 p-4">
        {notifications.map((notification) => (
          <li
            key={notification.name}
            className={`flex items-center gap-4 rounded-xl p-3 ${
              notification.active ? 'bg-ink-50' : 'hover:bg-ink-50'
            }`}
          >
            <div className="relative">
              <Avatar name={notification.name} />
              {notification.online ? (
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-brand-green" />
              ) : null}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink-700">{notification.name}</p>
              <p className="text-xs text-ink-400">{notification.time}</p>
            </div>
            {notification.active ? (
              <button
                type="button"
                className="flex h-6 w-6 items-center justify-center rounded-full text-ink-400 hover:bg-white hover:text-ink-700"
                onClick={onClose}
                aria-label="Close notifications"
              >
                <X size={13} />
              </button>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  )
}

function Avatar({ name }) {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#E98B70] to-[#C65E43] text-xs font-semibold text-white">
      {name
        .split(' ')
        .map((part) => part[0])
        .join('')}
    </div>
  )
}
