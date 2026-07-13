import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  Bell,
  ChevronDown,
  ClipboardList,
  Lock,
  LogOut,
  Mail,
  Menu,
  Search,
  Settings,
  User,
  X,
} from 'lucide-react'

const notifications = [
  { name: 'Regina Cooper', time: '1 min ago', online: true },
  { name: 'Judith Black', time: '5 min ago', active: true },
  { name: 'Ronald Robertson', time: '3 hour ago', online: true },
  { name: 'Dustin Williamson', time: '15 hour ago' },
  { name: 'Calvin Flores', time: 'Yesterday', online: true },
  { name: 'Robert Edwards', time: 'Yesterday', online: true },
]

const userMenuItems = [
  { label: 'My Profile', icon: User },
  { label: 'My Messages', icon: Mail },
  { label: 'My Tasks', icon: ClipboardList },
]

const accountMenuItems = [
  { label: 'Settings', icon: Settings, active: true },
  { label: 'Lock Screen', icon: Lock },
  { label: 'Logout', icon: LogOut, separated: true },
]

export default function Topbar() {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

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
            onClick={() => {
              setNotificationsOpen((open) => !open)
              setUserMenuOpen(false)
            }}
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
        <div className="relative">
          <button
            className={`flex items-center gap-2 pl-2 pr-2 py-1.5 border-l border-ink-200 rounded-lg transition-colors ${
              userMenuOpen ? 'bg-white shadow-card text-ink-900' : 'text-ink-900 hover:bg-ink-100'
            }`}
            onClick={() => {
              setUserMenuOpen((open) => !open)
              setNotificationsOpen(false)
            }}
            aria-expanded={userMenuOpen}
            aria-label="Open user menu"
          >
            <Avatar name="ArtTemplate" size="sm" />
            <span className="hidden sm:block text-sm font-medium">ArtTemplate</span>
            <ChevronDown size={14} className="hidden sm:block text-ink-500" />
          </button>
          {userMenuOpen ? (
            <UserMenuPopover />
          ) : null}
        </div>
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

function UserMenuPopover() {
  return (
    <div className="fixed right-4 top-[7px] z-30 h-[min(463px,calc(100vh-14px))] w-[calc(100vw-2rem)] max-w-[290px] overflow-hidden rounded-none bg-white shadow-2xl ring-1 ring-ink-100 md:right-4">
      <div className="border-b border-ink-100 px-5 py-5">
        <NavLink to="/arttemplate" className="flex items-center gap-4 rounded-xl p-2 hover:bg-ink-50">
          <Avatar name="ArtTemplate" size="lg" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="truncate text-sm font-semibold text-ink-900">ArtTemplate</p>
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-danger px-1.5 text-[10px] font-semibold text-white">
                8
              </span>
            </div>
            <p className="text-xs text-ink-400">Manager</p>
          </div>
        </NavLink>
      </div>

      <div className="space-y-1 px-4 py-4">
        {userMenuItems.map(({ label, icon: Icon }) => (
          <button
            key={label}
            className="flex w-full items-center gap-4 rounded-xl px-3 py-2.5 text-sm text-ink-500 hover:bg-ink-50 hover:text-ink-900"
          >
            <Icon size={17} />
            {label}
          </button>
        ))}
      </div>

      <div className="border-t border-ink-100 px-4 py-4">
        {accountMenuItems.map(({ label, icon: Icon, active, separated }) => (
          <button
            key={label}
            className={`flex w-full items-center gap-4 rounded-xl px-3 py-2.5 text-sm ${
              separated ? 'mt-4 border-t border-ink-100 pt-4' : ''
            } ${active ? 'bg-ink-50 text-ink-700' : 'text-ink-500 hover:bg-ink-50 hover:text-ink-900'}`}
          >
            <Icon size={17} />
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

function Avatar({ name, size = 'md' }) {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-11 w-11',
  }

  return (
    <div className={`flex ${sizes[size]} items-center justify-center rounded-full bg-gradient-to-br from-[#E98B70] to-[#C65E43] text-xs font-semibold text-white`}>
      {name
        .split(' ')
        .map((part) => part[0])
        .join('')}
    </div>
  )
}
