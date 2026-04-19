import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { PageHeader } from '../components/layout/PageHeader'
import { peakHours, weeklyUsage } from '../data/mockData'

const donut = [
  { name: 'Active', value: 18, fill: '#14b8a6' },
  { name: 'Idle', value: 6, fill: '#64748b' },
]

export function Analytics() {
  return (
    <div className="p-8 lg:p-10">
      <PageHeader
        title="Analytics & Reports"
        subtitle="Comprehensive insights and usage statistics"
      />

      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/5 bg-[#1e293b] p-5 shadow-lg">
          <h2 className="mb-4 text-base font-semibold text-white">Weekly Usage Trends</h2>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyUsage} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} domain={[0, 80]} />
                <Tooltip
                  contentStyle={{
                    background: '#0f172a',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 12,
                  }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
                <Legend />
                <Bar dataKey="success" name="Successful Scans" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="denied" name="Denied Attempts" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-white/5 bg-[#1e293b] p-5 shadow-lg">
          <h2 className="mb-4 text-base font-semibold text-white">Peak Usage Hours</h2>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={peakHours} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                <XAxis dataKey="t" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} domain={[0, 60]} />
                <Tooltip
                  contentStyle={{
                    background: '#0f172a',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 12,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="v"
                  name="Scans"
                  stroke="#a855f7"
                  strokeWidth={2}
                  dot={{ fill: '#a855f7', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/5 bg-[#1e293b] p-5 shadow-lg">
          <h2 className="mb-2 text-base font-semibold text-white">Vehicle Status Distribution</h2>
          <div>
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donut}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={2}
                >
                  {donut.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: '#0f172a',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 12,
                  }}
                />
              </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-8 pb-2 pt-2 text-sm text-slate-400">
              <span className="inline-flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-teal-500" />
                Active: 18
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-500" />
                Idle: 6
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/5 bg-[#1e293b] p-5 shadow-lg">
          <h2 className="mb-4 text-base font-semibold text-white">Quick Statistics</h2>
          <div className="grid gap-3">
            <StatCard
              label="Total Scans This Month"
              value="1,247"
              tint="bg-blue-950/50 border-blue-500/20"
              labelColor="text-sky-400"
            />
            <StatCard
              label="Success Rate"
              value="98.4%"
              tint="bg-teal-950/50 border-teal-500/20"
              labelColor="text-emerald-400"
            />
            <StatCard
              label="Average Daily Usage"
              value="42 scans"
              tint="bg-amber-950/40 border-amber-500/20"
              labelColor="text-amber-400"
            />
            <StatCard
              label="Most Active Vehicle"
              value="EV-007"
              tint="bg-purple-950/50 border-purple-500/20"
              labelColor="text-purple-300"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({
  label,
  value,
  tint,
  labelColor,
}: {
  label: string
  value: string
  tint: string
  labelColor: string
}) {
  return (
    <div className={`rounded-xl border px-4 py-4 ${tint}`}>
      <p className={`text-xs font-medium ${labelColor}`}>{label}</p>
      <p className="mt-1 text-2xl font-bold text-white">{value}</p>
    </div>
  )
}
