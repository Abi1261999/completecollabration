import {
  ArrowDown,
  ArrowUp,
  Cake,
  CalendarDays,
  ChevronDown,
  Download,
  Mail,
  MapPin,
  MoreHorizontal,
  Phone,
  UserPlus,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const overviewStats = [
  { label: 'Total Visitors', value: '20.500', change: '4.85%', icon: ArrowUp, positive: true, tone: 'green' },
  { label: 'Total Followers', value: '21.800', change: '5.25%', icon: ArrowDown, positive: false, tone: 'teal' },
  { label: 'Total Likes', value: '30.400', change: '3.55%', icon: ArrowUp, positive: true, tone: 'green' },
  { label: 'Total Comments', value: '14.800', change: '10.30%', icon: ArrowDown, positive: false, tone: 'teal' },
]

const visits = [
  { day: 'Mon', visitors: 2000 },
  { day: 'Tue', visitors: 1400 },
  { day: 'Wed', visitors: 3100 },
  { day: 'Thu', visitors: 1500 },
  { day: 'Fri', visitors: 2000 },
  { day: 'Sat', visitors: 7800 },
  { day: 'Sun', visitors: 2100 },
]

const followersGrowth = [
  { day: 'Mon', current: 2400, previous: 1600 },
  { day: 'Tue', current: 4300, previous: 2600 },
  { day: 'Wed', current: 3900, previous: 3100 },
  { day: 'Thu', current: 6200, previous: 4600 },
  { day: 'Fri', current: 8100, previous: 5800 },
  { day: 'Sat', current: 7300, previous: 6400 },
  { day: 'Sun', current: 9200, previous: 7000 },
]

const socialChannels = [
  { name: 'Facebook', value: '3.5k', amount: 3.5, color: '#43C9B8', dot: 'bg-brand-teal' },
  { name: 'Twitter', value: '7.8k', amount: 7.8, color: '#F8C93D', dot: 'bg-yellow-400' },
  { name: 'Instagram', value: '5.8k', amount: 5.8, color: '#1E9B45', dot: 'bg-brand-dark' },
  { name: 'YouTube', value: '4.7k', amount: 4.7, color: '#FF7067', dot: 'bg-red-400' },
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

function DateRangePill() {
  return (
    <button className="flex items-center gap-2 text-sm text-ink-500 bg-white border border-ink-100 rounded-xl px-4 py-2 shadow-card hover:bg-ink-50">
      <CalendarDays size={15} />
      19 Aug - 25 Aug
      <ChevronDown size={14} />
    </button>
  )
}

function Panel({ title, right, children, className = '' }) {
  return (
    <section className={`bg-white rounded-xl2 border border-ink-100 shadow-card p-5 ${className}`}>
      <div className="flex items-center justify-between gap-3 mb-4">
        <h2 className="font-medium text-ink-900">{title}</h2>
        {right}
      </div>
      {children}
    </section>
  )
}

function InitialsAvatar({ name, className = '' }) {
  return (
    <div
      className={`rounded-full bg-gradient-to-br from-brand-teal to-brand-green flex items-center justify-center text-white font-medium ${className}`}
    >
      {name
        .split(' ')
        .map((part) => part[0])
        .join('')}
    </div>
  )
}

function OverviewStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-0 overflow-hidden rounded-xl2 border border-ink-100 bg-white shadow-card">
      {overviewStats.map(({ label, value, change, icon: Icon, positive, tone }) => (
        <div
          key={label}
          className="flex items-center gap-4 border-b border-ink-100 p-5 last:border-b-0 sm:odd:border-r xl:border-b-0 xl:border-r xl:last:border-r-0"
        >
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              tone === 'green' ? 'bg-brand-green/15 text-brand-dark' : 'bg-brand-teal/15 text-brand-teal'
            }`}
          >
            <Icon size={18} />
          </div>
          <div className="min-w-0">
            <p className="text-sm text-ink-400">{label}</p>
            <div className="flex items-end gap-1.5">
              <span className="text-2xl font-semibold leading-none text-ink-900">{value}</span>
              <span
                className={`flex items-center text-xs font-medium leading-none ${
                  positive ? 'text-brand-green' : 'text-danger'
                }`}
              >
                {positive ? <ArrowUp size={11} /> : <ArrowDown size={11} />}
                {change}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function VisitsPanel() {
  return (
    <Panel title="Visits" right={<DateRangePill />} className="min-w-0">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
        <Metric icon={ArrowDown} tone="teal" label="Min. Visits" value="1.400" />
        <Metric icon={MinusIcon} tone="greenSoft" label="Avg. Visits" value="3.100" />
        <Metric icon={ArrowUp} tone="green" label="Max. Visits" value="9.500" />
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={visits} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
            <defs>
              <linearGradient id="visitsFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#16A34A" stopOpacity={0.16} />
                <stop offset="95%" stopColor="#16A34A" stopOpacity={0.08} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#EEF2F1" />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#9CA3AF', fontSize: 12 }}
              dy={8}
            />
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
      <div className="relative mx-auto mb-6 h-44 w-44">
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

      <div className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-ink-100 pt-5">
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

function VisitsTooltip({ active, payload }) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="rounded-xl bg-white px-5 py-3 text-center shadow-lg border border-ink-100">
      <p className="text-sm font-medium text-ink-900">Visitors: 3.100</p>
      <p className="text-xs text-ink-400">21 August, 2019</p>
    </div>
  )
}

export default function ArtTemplate() {
  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-ink-900">Overview</h1>
        <div className="flex items-center gap-3">
          <button
            className="w-10 h-10 rounded-xl bg-white border border-ink-100 shadow-card flex items-center justify-center text-ink-500 hover:bg-ink-50"
            aria-label="Download overview"
          >
            <Download size={17} />
          </button>
          <button className="flex items-center gap-2 text-sm text-ink-500 bg-white border border-ink-100 rounded-xl px-4 py-2 shadow-card hover:bg-ink-50">
            Last 7 days
            <ChevronDown size={14} />
          </button>
        </div>
      </div>

      <OverviewStats />

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-6">
        <VisitsPanel />
        <FollowersPanel />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-5">
        <div className="space-y-5">
          <Panel
            title="Profile"
            right={<button className="text-sm font-medium text-brand-dark hover:text-brand-green">Edit profile</button>}
          >
            <div className="flex flex-col items-center text-center">
              <InitialsAvatar name="Felecia Brown" className="w-24 h-24 text-2xl mb-4" />
              <h2 className="text-xl font-semibold text-ink-900">Felecia Brown</h2>
              <p className="text-sm text-ink-500">Project Manager</p>
            </div>

            <div className="mt-6 pt-5 border-t border-ink-100 space-y-4">
              <InfoRow icon={Mail} label="Email" value="example@mail.com" />
              <InfoRow icon={Phone} label="Phone" value="+123-4567-8800" />
              <InfoRow icon={Cake} label="Birthday" value="17 March, 1995" />
              <InfoRow icon={MapPin} label="Location" value="New York, NY" />
            </div>
          </Panel>

          <Panel title="Favorites" right={<button className="text-ink-400"><MoreHorizontal size={18} /></button>}>
            <PeopleList people={favorites} />
          </Panel>
        </div>

        <div className="space-y-5">
          <Panel title="Followers Growth" right={<DateRangePill />}>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={followersGrowth}>
                  <defs>
                    <linearGradient id="currentFollowers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16A34A" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="previousFollowers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2DD4BF" stopOpacity={0.22} />
                      <stop offset="95%" stopColor="#2DD4BF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="#F0F0F0" />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                  <YAxis
                    tickFormatter={(value) => `${value / 1000}K`}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="previous"
                    stroke="#2DD4BF"
                    fill="url(#previousFollowers)"
                    strokeWidth={2}
                    name="Last Week"
                  />
                  <Area
                    type="monotone"
                    dataKey="current"
                    stroke="#16A34A"
                    fill="url(#currentFollowers)"
                    strokeWidth={2}
                    name="Current Week"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap items-center gap-5 mt-4 text-sm">
              <LegendDot label="Current Week" value="21.800" color="bg-brand-dark" />
              <LegendDot label="Last Week" value="19.400" color="bg-brand-teal" />
              <div className="ml-auto text-right">
                <p className="text-2xl font-semibold text-ink-900">2150</p>
                <p className="text-xs text-ink-400">New Followers</p>
              </div>
            </div>
          </Panel>

          <Panel title="New Followers" right={<DateRangePill />}>
            <PeopleList people={newFollowers} showAction />
          </Panel>
        </div>
      </div>
    </div>
  )
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-lg bg-ink-50 flex items-center justify-center text-ink-400">
        <Icon size={17} />
      </div>
      <div>
        <p className="text-xs text-ink-400">{label}</p>
        <p className="text-sm font-medium text-ink-900">{value}</p>
      </div>
    </div>
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
      <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${toneClass}`}>
        <Icon size={16} />
      </div>
      <div>
        <p className="text-xl font-semibold leading-none text-ink-900">{value}</p>
        <p className="text-xs text-ink-400 mt-1">{label}</p>
      </div>
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

function PeopleList({ people, showAction = false }) {
  return (
    <ul className="space-y-4">
      {people.map((person) => (
        <li key={person.name} className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <InitialsAvatar name={person.name} className="w-10 h-10 text-xs shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-ink-900 truncate">{person.name}</p>
              <p className="text-xs text-ink-400 truncate">{person.role}</p>
            </div>
          </div>
          {showAction ? (
            <button className="shrink-0 flex items-center gap-1 rounded-lg bg-brand-green/15 px-3 py-1.5 text-xs font-medium text-brand-dark hover:bg-brand-green/20">
              <UserPlus size={13} />
              Follow
            </button>
          ) : null}
        </li>
      ))}
    </ul>
  )
}

function LegendDot({ label, value, color }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-2 h-2 rounded-full ${color}`} />
      <div>
        <p className="font-medium text-ink-900">{value}</p>
        <p className="text-xs text-ink-400">{label}</p>
      </div>
    </div>
  )
}
