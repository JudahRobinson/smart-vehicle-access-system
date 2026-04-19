import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Lock, CheckCircle2 } from 'lucide-react'
import { BrandLogo } from '../components/BrandLogo'

export function Login() {
  const navigate = useNavigate()
  const [role, setRole] = useState<'admin' | 'operator'>('admin')

  function goDashboard() {
    navigate('/dashboard')
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    goDashboard()
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#1a0033] px-4 py-10">
      {/* Top glow — vertical purple-blue fade */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#2d1b4e]/90 via-[#1a0033]/40 to-[#1a0033]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[min(50vh,420px)] w-[min(100%,720px)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_rgba(77,121,255,0.22),_transparent_65%)]"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-md flex-col justify-center">
        <div className="w-full rounded-[28px] border border-purple-500/15 bg-gradient-to-b from-[#2a1545]/85 to-[#1a0f2e]/75 px-8 py-10 shadow-2xl shadow-black/40 backdrop-blur-md sm:px-10">
          <div className="mb-8 flex flex-col items-center text-center">
            <BrandLogo className="mb-5" />
            <h1 className="text-2xl font-bold tracking-tight text-white">
              EV Access Control
            </h1>
            <p className="mt-1.5 text-sm text-purple-300/65">RFID Monitoring System</p>
          </div>

          <div className="mb-6 flex rounded-full bg-black/35 p-1 ring-1 ring-purple-500/20">
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`flex-1 rounded-full py-2.5 text-sm font-medium transition ${
                role === 'admin'
                  ? 'bg-gradient-to-r from-[#4d79ff] to-[#a855f7] text-white shadow-md shadow-purple-900/50'
                  : 'bg-transparent text-purple-200/55 hover:text-purple-100/90'
              }`}
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => setRole('operator')}
              className={`flex-1 rounded-full py-2.5 text-sm font-medium transition ${
                role === 'operator'
                  ? 'bg-gradient-to-r from-[#4d79ff] to-[#a855f7] text-white shadow-md shadow-purple-900/50'
                  : 'bg-transparent text-purple-200/55 hover:text-purple-100/90'
              }`}
            >
              Operator
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="sr-only">Email</span>
              <div className="flex items-center gap-3 rounded-xl border border-purple-400/35 bg-black/30 px-4 py-3.5">
                <User className="h-5 w-5 shrink-0 text-purple-200/70" strokeWidth={1.75} />
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  className="w-full bg-transparent text-sm text-white placeholder:text-purple-200/40 outline-none"
                />
              </div>
            </label>
            <label className="block">
              <span className="sr-only">Password</span>
              <div className="flex items-center gap-3 rounded-xl border border-purple-400/35 bg-black/30 px-4 py-3.5">
                <Lock className="h-5 w-5 shrink-0 text-purple-200/70" strokeWidth={1.75} />
                <input
                  type="password"
                  required
                  placeholder="Password"
                  className="w-full bg-transparent text-sm text-white placeholder:text-purple-200/40 outline-none"
                />
              </div>
            </label>

            <button
              type="submit"
              className="mt-1 w-full rounded-2xl bg-gradient-to-r from-[#4d79ff] to-[#a855f7] py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-900/45 transition hover:brightness-110 active:scale-[0.99]"
            >
              Sign In
            </button>
          </form>

          {/* Quick Demo Login */}
          <div className="my-8 flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-400/35 to-purple-400/25" />
            <span className="shrink-0 rounded-full border border-purple-500/25 bg-[#1f0d33]/90 px-4 py-1.5 text-xs font-medium text-purple-200/70">
              Quick Demo Login
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-purple-400/35 to-purple-400/25" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={goDashboard}
              className="rounded-xl border border-purple-500/55 bg-[#2d1650]/90 py-3 text-center text-xs font-semibold text-white shadow-inner transition hover:bg-[#361863] hover:border-purple-400/70 sm:text-sm"
            >
              Login as Admin
            </button>
            <button
              type="button"
              onClick={goDashboard}
              className="rounded-xl border border-blue-500/45 bg-[#1e2a3d]/95 py-3 text-center text-xs font-semibold text-white shadow-inner transition hover:bg-[#243548] hover:border-blue-400/60 sm:text-sm"
            >
              Login as Operator
            </button>
          </div>

          <button
            type="button"
            onClick={goDashboard}
            className="mt-5 w-full rounded-2xl border-2 border-emerald-500/80 bg-[#142c24]/90 py-3.5 text-sm font-semibold text-emerald-100 shadow-[0_0_24px_rgba(16,185,129,0.12)] transition hover:bg-[#18352b] hover:border-emerald-400"
          >
            <span className="inline-flex items-center justify-center gap-2">
              <span className="text-lg" aria-hidden>
                🚀
              </span>
              Guest Access — Enter Dashboard
            </span>
          </button>

          <div className="mt-6 rounded-xl border border-blue-500/45 bg-[#12182a]/60 px-4 py-4">
            <div className="flex gap-3">
              <CheckCircle2
                className="mt-0.5 h-5 w-5 shrink-0 text-sky-400/90"
                strokeWidth={2}
              />
              <div className="text-left">
                <p className="text-sm font-semibold text-white">
                  Public Demo — No Registration Required
                </p>
                <p className="mt-1 text-xs leading-relaxed text-purple-200/55">
                  Use quick login or any email/password combination.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
