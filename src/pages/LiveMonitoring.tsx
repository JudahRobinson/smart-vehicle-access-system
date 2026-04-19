import { Wifi, WifiOff, User } from 'lucide-react'
import { PageHeader } from '../components/layout/PageHeader'
import { liveVehicles } from '../data/mockData'

function batteryColor(pct: number) {
  if (pct > 80) return 'bg-emerald-500'
  return 'bg-orange-500'
}

export function LiveMonitoring() {
  return (
    <div className="p-8 lg:p-10">
      <PageHeader
        title="Live Vehicle Monitoring"
        subtitle="Real-time status of all vehicles"
        right={
          <div className="flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Live
          </div>
        }
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-2">
        {liveVehicles.map((v) => (
          <div
            key={v.id}
            className="rounded-2xl border border-white/5 bg-[#1e293b] p-5 shadow-lg"
          >
            <div className="mb-4 flex items-start justify-between">
              <div>
                <p className="text-lg font-bold text-white">{v.id}</p>
                <div className="mt-1 flex items-center gap-1.5 text-xs">
                  {v.online ? (
                    <>
                      <Wifi className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Online</span>
                    </>
                  ) : (
                    <>
                      <WifiOff className="h-3.5 w-3.5 text-rose-400" />
                      <span className="text-rose-400">Offline</span>
                    </>
                  )}
                </div>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  v.on
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-slate-700/80 text-slate-400'
                }`}
              >
                {v.on ? 'ON' : 'OFF'}
              </span>
            </div>

            <div className="mb-4 rounded-xl bg-[#0f172a]/80 px-4 py-4">
              {v.user ? (
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{v.user.name}</p>
                    <p className="font-mono text-xs text-sky-400/90">{v.user.uid}</p>
                  </div>
                </div>
              ) : (
                <p className="text-center text-sm text-sky-400/70">No active user</p>
              )}
            </div>

            <div className="mb-3 flex justify-between text-xs">
              <span className="text-slate-400">Battery</span>
              <span className="text-white">{v.battery}%</span>
            </div>
            <div className="mb-4 h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className={`h-full rounded-full ${batteryColor(v.battery)}`}
                style={{ width: `${v.battery}%` }}
              />
            </div>

            <div className="flex justify-between text-xs text-sky-400/80">
              <span>Last scan</span>
              <span>{v.lastScan}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
