import { ArrowUp, ArrowDown } from 'lucide-react'

export default function StatCard({ label, value, delta, positive, icon: Icon }) {
  return (
    <div className="bg-white rounded-xl2 border border-ink-100 shadow-card p-5 flex items-center justify-between">
      <div>
        <p className="text-sm text-ink-500 mb-2">{label}</p>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-semibold text-ink-900">{value}</span>
          <span
            className={`flex items-center text-xs font-medium ${
              positive ? 'text-brand-dark' : 'text-danger'
            }`}
          >
            {positive ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
            {delta}
          </span>
        </div>
      </div>
      <div className="w-12 h-12 rounded-xl bg-brand-green/15 flex items-center justify-center text-brand-dark">
        <Icon size={22} />
      </div>
    </div>
  )
}
