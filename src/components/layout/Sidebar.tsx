import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Radio,
  FileText,
  Power,
  Users,
  BarChart3,
  Settings,
  LogOut,
} from 'lucide-react'
import { BrandLogo } from '../BrandLogo'

const items = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/dashboard/live', label: 'Live Monitoring', icon: Radio },
  { to: '/dashboard/logs', label: 'RFID Logs', icon: FileText },
  { to: '/dashboard/vehicles', label: 'Vehicle Control', icon: Power },
  { to: '/dashboard/users', label: 'User Management', icon: Users },
  { to: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/dashboard/settings', label: 'Settings', icon: Settings },
]

type Props = {
  roleLabel?: string
}

export function Sidebar({ roleLabel = 'Admin' }: Props) {
  const navigate = useNavigate()

  return (
    <aside className="flex h-screen w-[260px] shrink-0 flex-col border-r border-white/5 bg-[#0a0e1a] px-4 py-6">
      <div className="mb-8 flex items-center gap-3 px-2">
        <BrandLogo />
        <div className="text-left">
          <p className="text-sm font-semibold text-white">EV Control</p>
          <p className="text-xs text-sky-400/90">{roleLabel}</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/dashboard'}
            className={({ isActive }) =>
              [
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
                isActive
                  ? 'border border-white/20 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md shadow-purple-900/40'
                  : 'text-slate-400 hover:bg-white/5 hover:text-slate-200',
              ].join(' ')
            }
          >
            <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
            {label}
          </NavLink>
        ))}
      </nav>

      <button
        type="button"
        onClick={() => navigate('/')}
        className="mt-auto flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-rose-400/90 transition hover:bg-rose-500/10"
      >
        <LogOut className="h-4 w-4" strokeWidth={1.75} />
        Logout
      </button>
    </aside>
  )
}
