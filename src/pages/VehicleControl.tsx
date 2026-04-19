import { Lock, Unlock, AlertTriangle, Power } from 'lucide-react'
import { PageHeader } from '../components/layout/PageHeader'
import { vehicleControlFleet } from '../data/mockData'

function barColor(pct: number) {
  if (pct > 75) return 'bg-emerald-500'
  return 'bg-orange-500'
}

export function VehicleControl() {
  return (
    <div className="p-8 lg:p-10">
      <PageHeader
        title="Vehicle Control Panel"
        subtitle="Remote control and management of all vehicles"
      />

      <div className="grid gap-5 md:grid-cols-2">
        {vehicleControlFleet.map((v) => (
          <div
            key={v.id}
            className="rounded-2xl border border-white/5 bg-[#1c253d] p-5 shadow-lg"
          >
            <div className="mb-4 flex items-start justify-between">
              <div>
                <p className="text-lg font-bold text-white">{v.id}</p>
                <p className="text-sm text-slate-400">{v.model}</p>
              </div>
              <span
                className={`mt-1 h-3 w-3 rounded-full ${
                  v.online ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]' : 'bg-slate-600'
                }`}
              />
            </div>

            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="text-slate-400">Status</span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  v.on
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-slate-700 text-slate-400'
                }`}
              >
                {v.on ? 'ON' : 'OFF'}
              </span>
            </div>

            <div className="mb-4 flex items-center justify-between text-sm">
              <span className="text-slate-400">Lock Status</span>
              <span
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium ${
                  v.locked
                    ? 'bg-rose-500/15 text-rose-400'
                    : 'bg-blue-500/15 text-blue-400'
                }`}
              >
                {v.locked ? (
                  <>
                    <Lock className="h-3.5 w-3.5" /> Locked
                  </>
                ) : (
                  <>
                    <Unlock className="h-3.5 w-3.5" /> Unlocked
                  </>
                )}
              </span>
            </div>

            <div className="mb-2 flex justify-between text-xs">
              <span className="text-slate-400">Battery</span>
              <span className="text-white">{v.battery}%</span>
            </div>
            <div className="mb-5 h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className={`h-full rounded-full ${barColor(v.battery)}`}
                style={{ width: `${v.battery}%` }}
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                className={`flex flex-col items-center justify-center gap-1 rounded-xl py-3 text-xs font-semibold text-white ${
                  v.on ? 'bg-rose-600 hover:bg-rose-500' : 'bg-emerald-600 hover:bg-emerald-500'
                }`}
              >
                <Power className="h-4 w-4" />
                {v.on ? 'Stop' : 'Start'}
              </button>
              <button
                type="button"
                className="flex flex-col items-center justify-center gap-1 rounded-xl bg-blue-600 py-3 text-xs font-semibold text-white hover:bg-blue-500"
              >
                {v.locked ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                {v.locked ? 'Unlock' : 'Lock'}
              </button>
              <button
                type="button"
                className="flex flex-col items-center justify-center gap-1 rounded-xl bg-amber-700/90 py-3 text-xs font-semibold text-white hover:bg-amber-600"
              >
                <AlertTriangle className="h-4 w-4" />
                SOS
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
