import {
  Car,
  Activity,
  ShieldAlert,
  Radio,
  TrendingUp,
  TrendingDown,
} from 'lucide-react'
import { PageHeader } from '../components/layout/PageHeader'
import { dashboardMetrics, recentActivity } from '../data/mockData'

const iconMap = {
  car: Car,
  pulse: Activity,
  shield: ShieldAlert,
  signal: Radio,
}

const accentMap = {
  blue: 'bg-blue-500',
  green: 'bg-emerald-500',
  red: 'bg-rose-500',
  purple: 'bg-purple-500',
}

export function Dashboard() {
  return (
    <div className="p-8 lg:p-10">
      <PageHeader
        title="Dashboard Overview"
        subtitle="Real-time monitoring of your EV fleet."
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((m) => {
          const Icon = iconMap[m.icon]
          const accent = accentMap[m.accent]
          return (
            <div
              key={m.label}
              className="relative rounded-2xl border border-white/5 bg-[#1b203d] p-5 shadow-lg shadow-black/20"
            >
              <div
                className={`absolute right-4 top-4 flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium ${
                  m.trendUp
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-rose-500/20 text-rose-400'
                }`}
              >
                {m.trendUp ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {m.trend}
              </div>
              <div className={`mb-4 inline-flex rounded-xl ${accent} p-2.5 text-white shadow-inner`}>
                <Icon className="h-5 w-5" strokeWidth={2} />
              </div>
              <p className="text-3xl font-bold text-white">{m.value}</p>
              <p className="mt-1 text-sm text-slate-400">{m.label}</p>
            </div>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/5 bg-[#1b203d] p-6 shadow-lg">
          <h2 className="mb-4 text-lg font-semibold text-white">Recent Activity</h2>
          <ul className="space-y-3">
            {recentActivity.map((a) => (
              <li
                key={`${a.name}-${a.time}`}
                className="flex items-center justify-between gap-4 rounded-xl bg-[#141a33]/80 px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                      a.ok ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                  />
                  <div>
                    <p className="text-sm font-medium text-white">{a.name}</p>
                    <p className="text-xs text-slate-500">{a.vehicle}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`text-sm font-medium ${
                      a.status === 'Denied' ? 'text-rose-400' : 'text-emerald-400'
                    }`}
                  >
                    {a.status}
                  </p>
                  <p className="text-xs text-slate-500">{a.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-white/5 bg-[#1b203d] p-6 shadow-lg">
          <h2 className="mb-4 text-lg font-semibold text-white">System Status</h2>
          <div className="space-y-5">
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-400">Firebase Connection</span>
                <span className="text-emerald-400">Connected</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full w-full rounded-full bg-emerald-500" />
              </div>
            </div>
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-400">Active ESP32 Devices</span>
                <span className="text-white">22/24</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                  style={{ width: '92%' }}
                />
              </div>
            </div>
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-slate-400">System Health</span>
                <span className="text-emerald-400">Excellent</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                <div className="h-full rounded-full bg-emerald-500" style={{ width: '95%' }} />
              </div>
            </div>
          </div>
          <div className="mt-6 rounded-xl border border-sky-500/30 px-4 py-3 text-center text-xs text-sky-300/90">
            Last Sync: 2 seconds ago
          </div>
        </div>
      </div>
    </div>
  )
}
