import {
  LayoutDashboard,
  ListChecks,
  ShoppingCart,
  CalendarDays,
  Mail,
  MessageSquare,
  FolderKanban,
  FolderOpen,
  StickyNote,
  Contact,
} from 'lucide-react'

export const navItems = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { label: 'Task', path: '/task', icon: ListChecks },
  { label: 'E-Commerce', path: '/ecommerce', icon: ShoppingCart },
  { label: 'Calendar', path: '/calendar', icon: CalendarDays },
  { label: 'Mail', path: '/mail', icon: Mail, badge: 8 },
  { label: 'Chat', path: '/chat', icon: MessageSquare },
  { label: 'Projects', path: '/projects', icon: FolderKanban },
  { label: 'File Manager', path: '/file-manager', icon: FolderOpen },
  { label: 'Notes', path: '/notes', icon: StickyNote },
  { label: 'Contacts', path: '/contacts', icon: Contact },
]
