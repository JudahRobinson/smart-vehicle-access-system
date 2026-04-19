import { useMemo, useState } from 'react'
import { Search, Download, CheckCircle2, XCircle } from 'lucide-react'
import { PageHeader } from '../components/layout/PageHeader'
import { rfidLogs } from '../data/mockData'

type Filter = 'all' | 'allowed' | 'denied'

export function RFIDLogs() {
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState<Filter>('all')

  const rows = useMemo(() => {
    return rfidLogs.filter((row) => {
      const match =
        !q.trim() ||
        row.user.toLowerCase().includes(q.toLowerCase()) ||
        row.rfid.toLowerCase().includes(q.toLowerCase()) ||
        row.vehicle.toLowerCase().includes(q.toLowerCase())
      const f =
        filter === 'all' ||
        (filter === 'allowed' && row.allowed) ||
        (filter === 'denied' && !row.allowed)
      return match && f
    })
  }, [q, filter])

  return (
    <div className="p-8 lg:p-10">
      <PageHeader
        title="RFID Access Logs"
        subtitle="Complete history of all RFID scans and access attempts"
      />

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name, RFID, or vehicle..."
            className="w-full rounded-2xl border border-white/10 bg-[#1b203d] py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-slate-500 outline-none focus:border-blue-500/50"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {(['all', 'allowed', 'denied'] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-xl px-4 py-2.5 text-sm font-medium capitalize transition ${
                filter === f
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                  : 'border border-white/10 bg-[#1b203d] text-slate-300 hover:bg-white/5'
              }`}
            >
              {f === 'all' ? 'All' : f === 'allowed' ? 'Allowed' : 'Denied'}
            </button>
          ))}
          <button
            type="button"
            className="ml-auto flex items-center gap-2 rounded-xl border border-white/10 bg-[#1b203d] px-4 py-2.5 text-sm font-medium text-white hover:bg-white/5 lg:ml-0"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/5 bg-[#1a1f2b] shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/5 text-slate-400">
                <th className="px-6 py-4 font-medium">User</th>
                <th className="px-6 py-4 font-medium">RFID UID</th>
                <th className="px-6 py-4 font-medium">Vehicle</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Time</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={`${row.rfid}-${row.time}`}
                  className={`border-b border-white/5 ${
                    i % 2 === 0 ? 'bg-[#151a26]' : 'bg-[#1a1f2b]'
                  }`}
                >
                  <td className="px-6 py-4 font-medium text-white">{row.user}</td>
                  <td className="px-6 py-4 font-mono text-slate-300">{row.rfid}</td>
                  <td className="px-6 py-4 text-slate-300">{row.vehicle}</td>
                  <td className="px-6 py-4 text-slate-400">{row.date}</td>
                  <td className="px-6 py-4 text-slate-400">{row.time}</td>
                  <td className="px-6 py-4">
                    {row.allowed ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/50 bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-400">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Allowed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/50 bg-rose-500/15 px-3 py-1 text-xs font-medium text-rose-400">
                        <XCircle className="h-3.5 w-3.5" />
                        Denied
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
