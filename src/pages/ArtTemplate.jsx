import {
  Cake,
  ChevronDown,
  Eye,
  Heart,
  Mail,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Phone,
  UserPlus,
  Users,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const visitStats = [
  { label: 'Total Visitors', value: '20.500', change: '4.85%', icon: Eye, positive: true },
  { label: 'Total Followers', value: '21.800', change: '5.25%', icon: Users, positive: true },
  { label: 'Total Likes', value: '30.400', change: '3.55%', icon: Heart, positive: true },
  { label: 'Total Comments', value: '14.800', change: '10.30%', icon: MessageCircle, positive: false },
]

const visits = [
  { day: 'Mon', visitors: 1400 },
  { day: 'Tue', visitors: 3100 },
  { day: 'Wed', visitors: 2300 },
  { day: 'Thu', visitors: 5200 },
  { day: 'Fri', visitors: 9500 },
  { day: 'Sat', visitors: 7800 },
  { day: 'Sun', visitors: 6900 },
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
  { name: 'Facebook', value: '3.5k', color: 'bg-blue-500' },
  { name: 'Instagram', value: '5.8k', color: 'bg-pink-500' },
  { name: 'Twitter', value: '7.8k', color: 'bg-sky-500' },
  { name: 'YouTube', value: '4.7k', color: 'bg-red-500' },
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

const tabs = ['Settings', 'Activity', 'Users', 'ArtTemplate']

function DateRangePill() {
  return (
    <button className="flex items-center gap-2 text-sm text-ink-500 border border-ink-100 rounded-lg px-3 py-1.5 hover:bg-ink-50">
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

export default function ArtTemplate() {
  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  tab === 'ArtTemplate'
                    ? 'bg-brand-green/15 text-brand-dark'
                    : 'text-ink-500 hover:bg-white hover:text-ink-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <h1 className="text-2xl font-semibold text-ink-900">Overview</h1>
          <p className="text-sm text-ink-500 mt-1">Last 7 days</p>
        </div>
        <DateRangePill />
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
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {visitStats.map(({ label, value, change, icon: Icon, positive }) => (
              <div key={label} className="bg-white rounded-xl2 border border-ink-100 shadow-card p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-ink-500 mb-2">{label}</p>
                    <p className="text-2xl font-semibold text-ink-900">{value}</p>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-brand-green/15 flex items-center justify-center text-brand-dark">
                    <Icon size={21} />
                  </div>
                </div>
                <p className={`mt-4 text-xs font-medium ${positive ? 'text-brand-dark' : 'text-danger'}`}>
                  {change}
                </p>
              </div>
            ))}
          </div>

          <Panel title="Visits" right={<DateRangePill />}>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_180px] gap-5">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={visits} barSize={24}>
                    <CartesianGrid vertical={false} stroke="#F0F0F0" />
                    <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                    <YAxis
                      tickFormatter={(value) => `${value / 1000}K`}
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: '#9CA3AF', fontSize: 12 }}
                    />
                    <Tooltip
                      cursor={{ fill: 'rgba(34, 197, 94, 0.08)' }}
                      formatter={(value) => [`${Number(value).toLocaleString()} visitors`, 'Visitors']}
                    />
                    <Bar dataKey="visitors" fill="#16A34A" radius={[8, 8, 8, 8]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-3 lg:grid-cols-1 gap-3">
                <Metric label="Min. Visits" value="1.400" />
                <Metric label="Avg. Visits" value="3.100" />
                <Metric label="Max. Visits" value="9.500" />
              </div>
            </div>
          </Panel>

          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-5">
            <Panel title="Followers">
              <div className="space-y-4">
                {socialChannels.map((channel) => (
                  <div key={channel.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-sm text-ink-500">
                      <span className={`w-2.5 h-2.5 rounded-full ${channel.color}`} />
                      {channel.name}
                    </div>
                    <span className="font-medium text-ink-900">{channel.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-5 border-t border-ink-100 flex items-center justify-between">
                <span className="text-sm text-ink-500">Total</span>
                <span className="text-2xl font-semibold text-ink-900">21.800</span>
              </div>
            </Panel>

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
          </div>

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

function Metric({ label, value }) {
  return (
    <div className="rounded-xl bg-ink-50 p-4">
      <p className="text-xl font-semibold text-ink-900">{value}</p>
      <p className="text-xs text-ink-400 mt-1">{label}</p>
    </div>
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
