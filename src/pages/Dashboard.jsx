import { DollarSign, BarChart3, Users, Download, ChevronDown, MoreHorizontal } from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  AreaChart, Area, RadialBarChart, RadialBar, PolarAngleAxis,
} from 'recharts'
import StatCard from '../components/StatCard'

const weekly = [
  { day: 'Mon', income: 280, expense: 190 },
  { day: 'Tue', income: 210, expense: 150 },
  { day: 'Wed', income: 330, expense: 230 },
  { day: 'Thu', income: 240, expense: 170 },
  { day: 'Fri', income: 340, expense: 240 },
  { day: 'Sat', income: 300, expense: 220 },
  { day: 'Sun', income: 260, expense: 190 },
]

const analytics = [
  { day: 'Mon', a: 0, b: 400 },
  { day: 'Tue', a: 220, b: 480 },
  { day: 'Wed', a: 180, b: 560 },
  { day: 'Thu', a: 380, b: 620 },
  { day: 'Fri', a: 250, b: 700 },
  { day: 'Sat', a: 380, b: 780 },
  { day: 'Sun', a: 480, b: 900 },
]

const diverging = [
  { level: 25, income: 260, expense: -180 },
  { level: 24, income: 340, expense: -110 },
  { level: 23, income: 300, expense: -260 },
  { level: 22, income: 380, expense: -320 },
  { level: 21, income: 220, expense: -240 },
  { level: 20, income: 200, expense: -180 },
  { level: 19, income: 160, expense: -90 },
]

const orders = [
  { name: 'Regina Cooper', order: '#790841', amount: '$2.500', type: 'Credit Card', date: '12.09.2019' },
  { name: 'Robert Edwards', order: '#799894', amount: '$1.500', type: 'PayPal', date: '12.09.2019' },
  { name: 'Gloria Mckinney', order: '#790857', amount: '$5.600', type: 'Credit Card', date: '12.09.2019' },
  { name: 'Randall Fisher', order: '#790687', amount: '$2.850', type: 'PayPal', date: '12.09.2019' },
]

const transactions = [
  { name: 'Devon Williamson', time: '08:00 AM — 19 August', amount: '+$1.400', type: 'Payment', positive: true },
  { name: 'Debra Wilson', time: '09:45 AM — 19 August', amount: '-$850', type: 'Refund', positive: false },
  { name: 'Judith Black', time: '10:15 AM — 20 August', amount: '+$2.050', type: 'Payment', positive: true },
  { name: 'Philip Henry', time: '10:50 AM — 23 August', amount: '+$650', type: 'Payment', positive: true },
  { name: 'Mitchell Cooper', time: '12:45 AM — 25 August', amount: '+$900', type: 'Payment', positive: true },
]

function DateRangePill() {
  return (
    <button className="flex items-center gap-2 text-sm text-ink-500 border border-ink-100 rounded-lg px-3 py-1.5 hover:bg-ink-50">
      19 Aug – 25 Aug
      <ChevronDown size={14} />
    </button>
  )
}

function Panel({ title, right, children }) {
  return (
    <div className="bg-white rounded-xl2 border border-ink-100 shadow-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-ink-900">{title}</h3>
        {right}
      </div>
      {children}
    </div>
  )
}

export default function Dashboard() {
  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-ink-900">Overview</h1>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-lg border border-ink-100 text-ink-500 hover:bg-ink-50">
            <Download size={16} />
          </button>
          <DateRangePill />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard label="Total Income" value="$8.500" delta="50.8%" positive icon={DollarSign} />
        <StatCard label="Total Sales" value="3.500K" delta="10.5%" icon={BarChart3} />
        <StatCard label="New Clients" value="2.500K" delta="24.9%" positive icon={Users} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Panel title="Statistics" right={<DateRangePill />}>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weekly} barGap={4}>
                <CartesianGrid vertical={false} stroke="#F0F0F0" />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                <Tooltip cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
                <Bar dataKey="income" fill="#16A34A" radius={[4, 4, 4, 4]} maxBarSize={10} />
                <Bar dataKey="expense" fill="#5EEAD4" radius={[4, 4, 4, 4]} maxBarSize={10} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-4 mt-2 text-xs text-ink-500">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-brand-dark inline-block" /> Income</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-brand-teal inline-block" /> Expense</span>
          </div>
        </Panel>

        <Panel title="Analytics" right={<DateRangePill />}>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-brand-green/15 text-brand-dark text-sm font-medium rounded-lg px-3 py-1.5">$5.850</div>
            <div className="bg-ink-50 text-ink-500 text-sm font-medium rounded-lg px-3 py-1.5">$1.750</div>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics}>
                <defs>
                  <linearGradient id="colorA" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16A34A" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorB" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5EEAD4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#5EEAD4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                <Tooltip />
                <Area type="monotone" dataKey="b" stroke="#5EEAD4" fill="url(#colorB)" strokeWidth={2} />
                <Area type="monotone" dataKey="a" stroke="#16A34A" fill="url(#colorA)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-5">
        <Panel title="Sales" right={<button className="text-ink-400"><MoreHorizontal size={18} /></button>}>
          <div className="h-44 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                innerRadius="70%"
                outerRadius="100%"
                data={[{ value: 71 }]}
                startAngle={90}
                endAngle={-270}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                <RadialBar dataKey="value" cornerRadius={20} fill="#16A34A" background={{ fill: '#F3F4F6' }} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-semibold text-ink-900">3.500</span>
              <span className="text-xs text-ink-400">Total</span>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-ink-500"><span className="w-2 h-2 rounded-full bg-brand-dark inline-block" /> Current Week</span>
              <span className="text-ink-900 font-medium">2.500</span>
              <span className="text-brand-dark text-xs font-medium flex items-center gap-1"><ArrowUpMini /> 8.8%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-ink-500"><span className="w-2 h-2 rounded-full bg-brand-teal inline-block" /> Last Week</span>
              <span className="text-ink-900 font-medium">1.000</span>
              <span className="text-danger text-xs font-medium flex items-center gap-1"><ArrowDownMini /> 5.8%</span>
            </div>
          </div>
        </Panel>

        <Panel
          title="Statistics"
          right={
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-xs text-ink-500"><span className="w-2 h-2 rounded-full bg-brand-dark inline-block" /> Income</span>
              <span className="flex items-center gap-1 text-xs text-ink-500"><span className="w-2 h-2 rounded-full bg-brand-teal inline-block" /> Expense</span>
              <DateRangePill />
            </div>
          }
        >
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={diverging} layout="vertical" stackOffset="sign">
                <CartesianGrid horizontal={false} stroke="#F0F0F0" />
                <XAxis type="number" tickLine={false} axisLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                <YAxis dataKey="level" type="category" tickLine={false} axisLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="income" fill="#16A34A" radius={[4, 4, 4, 4]} barSize={14} />
                <Bar dataKey="expense" fill="#5EEAD4" radius={[4, 4, 4, 4]} barSize={14} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5">
        <Panel title="Last Orders" right={<DateRangePill />}>
          <div className="overflow-x-auto -mx-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-ink-400 border-b border-ink-100">
                  <th className="font-normal py-2 px-5">Customer Name</th>
                  <th className="font-normal py-2 px-5">Order No.</th>
                  <th className="font-normal py-2 px-5">Amount</th>
                  <th className="font-normal py-2 px-5">Payment Type</th>
                  <th className="font-normal py-2 px-5">Date</th>
                  <th className="font-normal py-2 px-5" />
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.order} className="border-b border-ink-100 last:border-0">
                    <td className="py-3 px-5 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-ink-100 flex items-center justify-center text-xs font-medium text-ink-500">
                        {o.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      {o.name}
                    </td>
                    <td className="py-3 px-5 text-ink-500">{o.order}</td>
                    <td className="py-3 px-5 text-ink-900 font-medium">{o.amount}</td>
                    <td className="py-3 px-5 text-ink-500">{o.type}</td>
                    <td className="py-3 px-5 text-ink-500">{o.date}</td>
                    <td className="py-3 px-5 text-ink-400"><MoreHorizontal size={16} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="Transactions" right={<button className="text-ink-400"><MoreHorizontal size={18} /></button>}>
          <ul className="space-y-4">
            {transactions.map((t) => (
              <li key={t.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-ink-100 flex items-center justify-center text-xs font-medium text-ink-500">
                    {t.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ink-900">{t.name}</p>
                    <p className="text-xs text-ink-400">{t.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${t.positive ? 'text-brand-dark' : 'text-danger'}`}>{t.amount}</p>
                  <p className="text-xs text-ink-400">{t.type}</p>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  )
}

function ArrowUpMini() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  )
}
function ArrowDownMini() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M12 5v14M19 12l-7 7-7-7" />
    </svg>
  )
}
