import { useState } from 'react'
import {
  ArrowDown,
  ArrowUp,
  Bell,
  Camera,
  CalendarDays,
  ChevronDown,
  Download,
  Paperclip,
  Mail,
  MapPin,
  Menu,
  MoreHorizontal,
  MoreVertical,
  Phone,
  Search,
  Send,
  Settings,
  Smile,
  Star,
  UserPlus,
  X,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const tabs = ['Settings', 'Activity', 'Users']

const overviewStats = [
  { label: 'Total Visitors', value: '20.500', change: '4.85%', icon: ArrowUp, positive: true, tone: 'green' },
  { label: 'Total Followers', value: '21.800', change: '5.25%', icon: ArrowDown, positive: false, tone: 'teal' },
  { label: 'Total Likes', value: '30.400', change: '3.55%', icon: ArrowUp, positive: true, tone: 'green' },
  { label: 'Total Comments', value: '14.800', change: '10.30%', icon: ArrowDown, positive: false, tone: 'teal' },
]

const visits = [
  { day: 'Mon', visitors: 2000 },
  { day: 'Tue', visitors: 1300 },
  { day: 'Wed', visitors: 3100 },
  { day: 'Thu', visitors: 1400 },
  { day: 'Fri', visitors: 2000 },
  { day: 'Sat', visitors: 7600 },
  { day: 'Sun', visitors: 2000 },
]

const socialChannels = [
  { name: 'Facebook', value: '3.5k', amount: 3.5, color: '#43C9B8', dot: 'bg-brand-teal' },
  { name: 'Twitter', value: '7.8k', amount: 7.8, color: '#F8C93D', dot: 'bg-yellow-400' },
  { name: 'Instagram', value: '5.8k', amount: 5.8, color: '#1E9B45', dot: 'bg-brand-dark' },
  { name: 'YouTube', value: '4.7k', amount: 4.7, color: '#FF7067', dot: 'bg-red-400' },
]

const growth = [
  { day: 'Mon', current: 4200, previous: 0 },
  { day: 'Tue', current: 0, previous: 1100 },
  { day: 'Wed', current: 3600, previous: 0 },
  { day: 'Thu', current: 0, previous: 2100 },
  { day: 'Fri', current: 3000, previous: 0 },
  { day: 'Sat', current: 5600, previous: 0 },
  { day: 'Sun', current: 0, previous: 1600 },
]

const favorites = [
  { name: 'Ronald Robertson', role: 'Product Designer' },
  { name: 'Regina Cooper', role: 'Project Manager' },
  { name: 'Judith Black', role: 'Business Analyst' },
  { name: 'Dustin Williamson', role: 'Web Developer' },
  { name: 'Calvin Flores', role: 'Senior Vice President' },
]

const newFollowers = [
  { name: 'Devon Williamson', role: 'Product Designer, Apple Inc' },
  { name: 'Debra Wilson', role: 'Project Manager, Facebook Inc' },
  { name: 'Judith Black', role: 'Business Analyst, Google Inc' },
  { name: 'Philip Henry', role: 'Web Developer, Google Inc' },
  { name: 'Mitchell Cooper', role: 'Senior Vice President, Amazon Inc' },
]

const chatContacts = [
  { name: 'Felecia Brown' },
  { name: 'Regina Cooper', badge: 8 },
  { name: 'Ronald Robertson', active: true },
  { name: 'Judith Black' },
  { name: 'Debra Wilson' },
  { name: 'Philip Henry' },
  { name: 'Dustin Williamson', badge: 4 },
  { name: 'Mitchell Cooper' },
  { name: 'Calvin Flores' },
]

const chatMessages = [
  { text: 'Lorem ipsum dolor sit ame?', time: '09:45am', side: 'right' },
  { text: 'Consectetur adipiscing elit. Turpis risus commodo sed viverra. :)', time: '09:47am', side: 'left', green: true },
  { text: 'Sollicitudin don posuere pharetra.', time: '09:48am', side: 'right' },
  { text: 'Laoreet in elementum nisl, ultrices.', time: '09:47am', side: 'left', green: true },
  { day: 'Monday' },
  { text: 'Posuere scelerisque elit duis in. Sapien proin lectus tincidunt.', time: '09:45am', side: 'right' },
  { text: 'Eget cursus bibendum amet donec.', time: '09:47am', side: 'left', green: true },
  { text: 'Tellus accumsan, est arcu purus lacus amet. :o', time: '09:48am', side: 'right' },
  { text: 'Quam consectetur est suspendisse facilisis in viverra laoreet...', time: '09:47am', side: 'left', green: true },
]

export default function ArtTemplate() {
  const [activeTab, setActiveTab] = useState('Settings')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <div className="min-h-screen bg-ink-50 text-ink-900">
      <button
        className="fixed left-4 top-4 z-40 rounded-xl bg-white p-2 text-ink-700 shadow-card border border-ink-100 lg:hidden"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open ArtTemplate profile panel"
      >
        <Menu size={20} />
      </button>

      {sidebarOpen ? (
        <button
          className="fixed inset-0 z-30 bg-ink-900/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close ArtTemplate profile overlay"
        />
      ) : null}

      <ProfileSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <ChatLauncher onOpen={() => setChatOpen(true)} />
      <ChatDrawer open={chatOpen} onClose={() => setChatOpen(false)} />

      <div className="min-h-screen lg:pl-[270px]">
        <ArtTemplateHeader activeTab={activeTab} onTabChange={setActiveTab} />

        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-7 flex items-center justify-between gap-4">
            <h1 className="text-2xl font-semibold text-ink-900">Overview</h1>
            <div className="flex items-center gap-3">
              <IconButton label="Download overview">
                <Download size={17} />
              </IconButton>
              <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm text-ink-500 shadow-card border border-ink-100 hover:bg-ink-50">
                Last 7 days
                <ChevronDown size={14} />
              </button>
            </div>
          </div>

          <OverviewStats />

          <div className="mt-7 grid grid-cols-1 gap-7 xl:grid-cols-[minmax(0,1fr)_320px]">
            <VisitsPanel />
            <FollowersPanel />
          </div>

          <div className="mt-7 grid grid-cols-1 gap-7 xl:grid-cols-[540px_minmax(0,1fr)]">
            <FollowersGrowthPanel />
            <NewFollowersPanel />
          </div>
        </main>
      </div>
    </div>
  )
}

function ArtTemplateHeader({ activeTab, onTabChange }) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-ink-100 bg-white/95 px-4 pl-16 shadow-card backdrop-blur sm:px-6 lg:pl-8">
      <nav className="flex items-center gap-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => onTabChange(tab)}
            className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab
                ? 'bg-brand-green/15 text-brand-dark'
                : 'text-ink-500 hover:bg-ink-50 hover:text-ink-900'
            }`}
          >
            {tab === 'Settings' ? <Settings size={14} className="mr-1.5 inline" /> : null}
            {tab}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-2 sm:gap-4">
        <IconButton label="Search">
          <Search size={18} />
        </IconButton>
        <IconButton label="Notifications">
          <Bell size={18} />
        </IconButton>
        <div className="hidden h-9 border-l border-ink-100 sm:block" />
        <button className="flex items-center gap-2 rounded-xl py-1 pl-1 pr-2 text-sm font-medium text-ink-900 hover:bg-ink-50">
          <Avatar name="Felecia Brown" size="sm" />
          <span className="hidden sm:inline">ArtTemplate</span>
          <ChevronDown size={14} className="hidden sm:block text-ink-500" />
        </button>
      </div>
    </header>
  )
}

function ProfileSidebar({ open, onClose }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex w-[270px] flex-col overflow-y-auto border-r border-ink-100 bg-white transition-transform duration-200 lg:bottom-auto lg:h-[1173px] lg:translate-x-0 ${
        open ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <button
        className="absolute right-3 top-3 rounded-lg p-1 text-ink-500 hover:bg-ink-50 lg:hidden"
        onClick={onClose}
        aria-label="Close ArtTemplate profile panel"
      >
        <X size={18} />
      </button>

      <div className="px-8 pb-7 pt-16 text-center">
        <Avatar name="Felecia Brown" size="xl" className="mx-auto mb-4" />
        <h2 className="text-sm font-medium text-ink-900">Felecia Brown</h2>
        <p className="mt-3 text-sm text-ink-400">Project Manager</p>
        <button className="mt-5 rounded-lg bg-brand-dark px-7 py-2.5 text-sm font-medium text-white shadow-card hover:bg-brand-green">
          Edit profile
        </button>
      </div>

      <div className="mx-8 border-t border-ink-100 py-6">
        <h3 className="mb-5 text-xs font-semibold uppercase tracking-wide text-ink-700">Info</h3>
        <div className="space-y-4">
          <InfoRow icon={Mail} label="Email" value="example@mail.com" />
          <InfoRow icon={Phone} label="Phone" value="+123-4567-8800" />
          <InfoRow label="Birthday" value="17 March, 1995" />
          <InfoRow icon={MapPin} label="Location" value="New York, NY" />
        </div>
      </div>

      <div className="mx-8 flex-1 overflow-y-auto border-t border-ink-100 py-6">
        <h3 className="mb-5 text-xs font-semibold uppercase tracking-wide text-ink-700">Favorites</h3>
        <ul className="space-y-4">
          {favorites.map((person) => (
            <li key={person.name} className="flex items-center gap-3">
              <Avatar name={person.name} size="xs" />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink-700">{person.name}</p>
                <p className="truncate text-xs text-ink-400">{person.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}

function ChatLauncher({ onOpen }) {
  return (
    <>
      <button
        type="button"
        onClick={onOpen}
        className="fixed bottom-5 right-5 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-brand-dark text-white shadow-lg hover:bg-brand-green lg:hidden"
        aria-label="Open chat"
      >
        <Send size={18} fill="currentColor" />
      </button>
      <aside className="fixed right-3 top-20 z-30 hidden w-12 flex-col items-center gap-5 lg:flex">
        {chatContacts.map((contact) => (
          <button
            key={contact.name}
            type="button"
            onClick={onOpen}
            className={`relative rounded-full transition-transform hover:scale-105 ${
              contact.active ? 'ring-4 ring-white drop-shadow-lg' : ''
            }`}
            aria-label={`Open chat with ${contact.name}`}
          >
            <Avatar name={contact.name} size="sm" />
            {contact.badge ? (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-semibold text-white">
                {contact.badge}
              </span>
            ) : null}
          </button>
        ))}
        <button
          type="button"
          onClick={onOpen}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-dashed border-brand-dark bg-brand-green/10 text-xl leading-none text-brand-dark hover:bg-brand-green/20"
          aria-label="Start new chat"
        >
          +
        </button>
      </aside>
    </>
  )
}

function ChatDrawer({ open, onClose }) {
  return (
    <aside
      className={`fixed right-0 top-0 z-50 flex h-screen w-full max-w-[492px] flex-col bg-white shadow-2xl transition-transform duration-300 lg:h-[1173px] ${
        open ? 'translate-x-0' : 'translate-x-full'
      }`}
      aria-hidden={!open}
    >
      <div className="flex h-16 items-center justify-between border-b border-ink-100 px-6">
        <button className="text-ink-400 hover:text-ink-700" aria-label="Chat options">
          <MoreHorizontal size={18} />
        </button>
        <button className="text-ink-400 hover:text-ink-700" aria-label="Add image to chat">
          <Camera size={17} />
        </button>
        <button
          type="button"
          onClick={onClose}
          className="ml-2 rounded-full bg-ink-50 p-2 text-ink-400 hover:bg-ink-100 hover:text-ink-700"
          aria-label="Close chat"
        >
          <X size={16} />
        </button>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_64px]">
        <div className="flex min-w-0 flex-col">
          <div className="flex-1 overflow-y-auto px-6 py-7">
            <div className="space-y-6">
              {chatMessages.map((message, index) =>
                message.day ? (
                  <div key={message.day} className="flex items-center gap-4 py-2">
                    <span className="h-px flex-1 bg-ink-100" />
                    <span className="text-xs font-semibold uppercase text-ink-400">{message.day}</span>
                    <span className="h-px flex-1 bg-ink-100" />
                  </div>
                ) : (
                  <ChatMessage key={`${message.time}-${index}`} message={message} />
                ),
              )}
            </div>
            <div className="mt-7 text-center text-sm font-medium text-ink-400">
              Regina Cooper is typing <span className="tracking-widest text-ink-700">...</span>
            </div>
          </div>

          <form
            className="flex items-center gap-3 border-t border-ink-100 px-5 py-4"
            onSubmit={(event) => event.preventDefault()}
          >
            <button type="button" className="text-ink-400 hover:text-ink-700" aria-label="Attach file">
              <Paperclip size={18} />
            </button>
            <input
              className="min-w-0 flex-1 bg-transparent text-sm text-ink-700 outline-none placeholder:text-ink-400"
              placeholder="Type a message"
            />
            <button type="button" className="text-ink-400 hover:text-ink-700" aria-label="Add emoji">
              <Smile size={18} />
            </button>
            <button
              type="submit"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-dark text-white hover:bg-brand-green"
              aria-label="Send message"
            >
              <Send size={17} fill="currentColor" />
            </button>
          </form>
        </div>

        <div className="flex flex-col items-center gap-5 border-l border-ink-100 bg-ink-50/70 py-8">
          {chatContacts.map((contact) => (
            <button
              key={contact.name}
              type="button"
              className={`relative rounded-full ${contact.active ? 'ring-4 ring-white drop-shadow-lg' : ''}`}
              aria-label={`Select ${contact.name}`}
            >
              <Avatar name={contact.name} size="sm" />
              {contact.badge ? (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-semibold text-white">
                  {contact.badge}
                </span>
              ) : null}
            </button>
          ))}
          <button className="mt-auto flex h-10 w-10 items-center justify-center rounded-full border border-dashed border-brand-dark bg-brand-green/10 text-xl leading-none text-brand-dark">
            +
          </button>
        </div>
      </div>
    </aside>
  )
}

function ChatMessage({ message }) {
  const isRight = message.side === 'right'

  return (
    <div className={`flex items-end gap-3 ${isRight ? 'justify-end' : 'justify-start'}`}>
      {!isRight ? <Avatar name="Regina Cooper" size="xs" /> : null}
      <div className={`max-w-[78%] ${isRight ? 'text-right' : 'text-left'}`}>
        <div
          className={`inline-block rounded-2xl px-5 py-3 text-sm leading-relaxed shadow-card ${
            message.green
              ? 'bg-brand-dark text-white'
              : 'bg-ink-50 text-ink-500'
          }`}
        >
          {message.text}
        </div>
        <p className="mt-1 text-xs text-ink-400">{message.time}</p>
      </div>
      {isRight ? <Avatar name="Felecia Brown" size="xs" /> : null}
    </div>
  )
}

function OverviewStats() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {overviewStats.map(({ label, value, change, icon: Icon, positive, tone }) => (
        <section key={label} className="rounded-xl2 border border-ink-100 bg-white p-5 shadow-card">
          <div className="flex items-center gap-4">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                tone === 'green' ? 'bg-brand-green/15 text-brand-dark' : 'bg-brand-teal/15 text-brand-teal'
              }`}
            >
              <Icon size={18} />
            </div>
            <div className="min-w-0">
              <p className="text-sm text-ink-400">{label}</p>
              <div className="flex items-end gap-1.5">
                <span className="text-2xl font-semibold leading-none text-ink-900">{value}</span>
                <span className={`flex items-center text-xs font-medium ${positive ? 'text-brand-green' : 'text-danger'}`}>
                  {positive ? <ArrowUp size={11} /> : <ArrowDown size={11} />}
                  {change}
                </span>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}

function VisitsPanel() {
  return (
    <Panel title="Visits" right={<DateRangePill />}>
      <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <Metric icon={ArrowDown} tone="teal" label="Min. Visits" value="1.400" />
        <Metric icon={MinusIcon} tone="greenSoft" label="Avg. Visits" value="3.100" />
        <Metric icon={ArrowUp} tone="green" label="Max. Visits" value="9.500" />
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={visits} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
            <defs>
              <linearGradient id="visitsFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#16A34A" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#16A34A" stopOpacity={0.08} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#EEF2F1" />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dy={8} />
            <YAxis
              domain={[0, 10000]}
              ticks={[0, 1000, 2000, 5000, 10000]}
              tickFormatter={(value) => (value === 0 ? '0' : `${value / 1000}K`)}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
            />
            <Tooltip content={<VisitsTooltip />} cursor={{ stroke: '#E5E7EB', strokeDasharray: '3 3' }} />
            <Area
              type="linear"
              dataKey="visitors"
              stroke="#16A34A"
              fill="url(#visitsFill)"
              strokeWidth={2}
              dot={{ r: 3, strokeWidth: 2, stroke: '#16A34A', fill: '#FFFFFF' }}
              activeDot={{ r: 4, strokeWidth: 2, stroke: '#16A34A', fill: '#FFFFFF' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  )
}

function FollowersPanel() {
  return (
    <Panel title="Followers" right={<button className="text-ink-400"><MoreHorizontal size={18} /></button>}>
      <div className="relative mx-auto mb-7 h-44 w-44">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={socialChannels}
              dataKey="amount"
              innerRadius={58}
              outerRadius={72}
              paddingAngle={3}
              cornerRadius={12}
              startAngle={90}
              endAngle={-270}
              stroke="none"
            >
              {socialChannels.map((channel) => (
                <Cell key={channel.name} fill={channel.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-2xl font-semibold text-ink-900">21.800</p>
          <p className="text-sm text-ink-400">Total</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-ink-100 pt-5">
        {socialChannels.map((channel) => (
          <div key={channel.name} className="flex items-center gap-2 text-sm text-ink-400">
            <span className={`h-2 w-2 rounded-full ${channel.dot}`} />
            <span>{channel.name}</span>
            <span className="font-medium text-ink-500">{channel.value}</span>
          </div>
        ))}
      </div>
    </Panel>
  )
}

function FollowersGrowthPanel() {
  return (
    <Panel title="Followers Growth" right={<DateRangePill />} className="xl:h-[402px] xl:w-[540px]">
      <div className="mb-5 flex flex-wrap items-center gap-8">
        <Metric icon={ArrowUp} tone="green" label="Current Week" value="21.800" />
        <Metric icon={ArrowDown} tone="teal" label="Last Week" value="19.400" />
      </div>
      <div className="relative h-64 xl:h-[255px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={growth} margin={{ top: 8, right: 8, left: -18, bottom: 0 }} barGap={-16}>
            <CartesianGrid vertical={false} stroke="#EEF2F1" />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dy={8} />
            <YAxis
              domain={[0, 10000]}
              ticks={[0, 1000, 2000, 5000, 10000]}
              tickFormatter={(value) => (value === 0 ? '0' : `${value / 1000}K`)}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
            />
            <Tooltip cursor={{ fill: 'rgba(34, 197, 94, 0.06)' }} />
            <Bar dataKey="previous" fill="#DDF4E5" radius={[12, 12, 12, 12]} barSize={18} name="Last Week" />
            <Bar dataKey="current" fill="#1E9B45" radius={[12, 12, 12, 12]} barSize={18} name="Current Week" />
          </BarChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute left-[63%] top-[32%] hidden -translate-x-1/2 rounded-xl bg-white px-3 py-1.5 text-xs font-medium text-ink-500 shadow-lg sm:block">
          2150
        </div>
        <div className="pointer-events-none absolute left-[72%] top-[26%] hidden h-6 w-6 items-center justify-center rounded-full bg-brand-dark text-white shadow-lg sm:flex">
          <Star size={13} fill="currentColor" />
        </div>
      </div>
    </Panel>
  )
}

function NewFollowersPanel() {
  return (
    <Panel title="New Followers" right={<DateRangePill />}>
      <ul className="space-y-4">
        {newFollowers.map((person) => (
          <li key={person.name} className="flex items-center gap-4">
            <Avatar name={person.name} size="xs" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink-700">{person.name}</p>
              <p className="truncate text-xs text-ink-400">{person.role}</p>
            </div>
            <button className="rounded-lg bg-brand-green/15 px-5 py-1.5 text-xs font-medium text-brand-dark hover:bg-brand-green/20">
              Follow
            </button>
            <button className="text-ink-400 hover:text-ink-700" aria-label={`More actions for ${person.name}`}>
              <MoreVertical size={17} />
            </button>
          </li>
        ))}
      </ul>
    </Panel>
  )
}

function Panel({ title, right, children, className = '' }) {
  return (
    <section className={`min-w-0 rounded-xl2 border border-ink-100 bg-white p-5 shadow-card ${className}`}>
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-ink-700">{title}</h2>
        {right}
      </div>
      {children}
    </section>
  )
}

function DateRangePill() {
  return (
    <button className="flex items-center gap-2 rounded-xl border border-ink-100 bg-white px-3 py-2 text-sm text-ink-500 shadow-card hover:bg-ink-50">
      <CalendarDays size={15} />
      19 Aug - 25 Aug
      <ChevronDown size={14} />
    </button>
  )
}

function Metric({ icon: Icon, label, value, tone = 'green' }) {
  const toneClass = {
    green: 'bg-brand-green/15 text-brand-dark',
    greenSoft: 'bg-brand-green/15 text-brand-dark',
    teal: 'bg-brand-teal/15 text-brand-teal',
  }[tone]

  return (
    <div className="flex items-center gap-3">
      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${toneClass}`}>
        <Icon size={16} />
      </div>
      <div>
        <p className="text-lg font-semibold leading-none text-ink-900">{value}</p>
        <p className="mt-1 text-xs text-ink-400">{label}</p>
      </div>
    </div>
  )
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div>
      <p className="mb-1 text-[11px] font-medium uppercase text-ink-400">{label}</p>
      <div className="flex items-center gap-2 text-sm text-ink-700">
        {Icon ? <Icon size={14} className="text-ink-400" /> : null}
        <span>{value}</span>
      </div>
    </div>
  )
}

function Avatar({ name, size = 'md', className = '' }) {
  const sizes = {
    xs: 'h-9 w-9 text-xs',
    sm: 'h-9 w-9 text-xs',
    md: 'h-12 w-12 text-sm',
    xl: 'h-28 w-28 text-2xl',
  }

  return (
    <div
      className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#E98B70] to-[#C65E43] font-semibold text-white ${sizes[size]} ${className}`}
    >
      {name
        .split(' ')
        .map((part) => part[0])
        .join('')}
    </div>
  )
}

function IconButton({ label, children }) {
  return (
    <button
      className="flex h-10 w-10 items-center justify-center rounded-xl text-ink-500 hover:bg-ink-50"
      aria-label={label}
    >
      {children}
    </button>
  )
}

function VisitsTooltip({ active }) {
  if (!active) {
    return null
  }

  return (
    <div className="rounded-xl border border-ink-100 bg-white px-5 py-3 text-center shadow-lg">
      <p className="text-sm font-medium text-ink-900">Visitors: 3.100</p>
      <p className="text-xs text-ink-400">21 August, 2019</p>
    </div>
  )
}

function MinusIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" {...props}>
      <path d="M6 12h12" />
    </svg>
  )
}
