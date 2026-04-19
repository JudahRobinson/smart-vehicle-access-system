import { useState } from 'react'
import { Database, Bell, Shield, Palette, Save } from 'lucide-react'
import { PageHeader } from '../components/layout/PageHeader'

function Toggle({
  on,
  onChange,
}: {
  on: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className={`relative h-7 w-12 rounded-full transition ${
        on ? 'bg-emerald-500' : 'bg-slate-600'
      }`}
    >
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
          on ? 'left-6' : 'left-1'
        }`}
      />
    </button>
  )
}

export function Settings() {
  const [notif, setNotif] = useState(true)
  const [sound, setSound] = useState(true)
  const [email, setEmail] = useState(false)
  const [unauth, setUnauth] = useState(true)

  return (
    <div className="p-8 lg:p-10">
      <PageHeader
        title="Settings"
        subtitle="Configure system preferences and integrations"
        right={
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-900/30 hover:brightness-110"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-white/5 bg-[#1e293b] p-6 shadow-lg">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400">
              <Database className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-white">Firebase Configuration</h2>
          </div>
          <div className="space-y-4">
            <Field label="Firebase URL" defaultValue="https://ev-control-demo.firebaseio.com" />
            <Field label="API Key" defaultValue="••••••••••••••••" type="password" />
            <Field label="Project ID" defaultValue="ev-control-demo" />
            <button
              type="button"
              className="w-full rounded-xl border border-sky-500/50 bg-slate-900/80 py-3 text-sm font-medium text-sky-300 transition hover:bg-slate-800"
            >
              Test Connection
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-white/5 bg-[#1e293b] p-6 shadow-lg">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-fuchsia-500/20 text-fuchsia-400">
              <Bell className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-white">Notifications</h2>
          </div>
          <div className="space-y-4">
            <NotifRow
              title="Enable Notifications"
              desc="Receive real-time alerts"
              on={notif}
              onChange={setNotif}
            />
            <NotifRow
              title="Sound Alerts"
              desc="Play sound on events"
              on={sound}
              onChange={setSound}
            />
            <NotifRow
              title="Email Alerts"
              desc="Send email notifications"
              on={email}
              onChange={setEmail}
            />
            <NotifRow
              title="Unauthorized Access Alerts"
              desc="Alert on denied attempts"
              on={unauth}
              onChange={setUnauth}
            />
          </div>
        </section>

        <section className="rounded-2xl border border-white/5 bg-[#1e293b] p-6 shadow-lg">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
              <Shield className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-white">Security</h2>
          </div>
          <div className="space-y-4">
            <Field label="Auto-Lock Timeout (minutes)" defaultValue="30" />
            <Field label="Max Failed Attempts" defaultValue="3" />
            <Field label="Session Timeout (minutes)" defaultValue="60" />
          </div>
        </section>

        <section className="rounded-2xl border border-white/5 bg-[#1e293b] p-6 shadow-lg">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/20 text-orange-400">
              <Palette className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-white">Appearance & Preferences</h2>
          </div>
          <div className="space-y-4">
            <Select label="Theme" defaultValue="Dark" options={['Dark', 'Light', 'System']} />
            <Select label="Language" defaultValue="English" options={['English', 'Spanish']} />
            <Select label="Timezone" defaultValue="UTC" options={['UTC', 'America/New_York']} />
          </div>
        </section>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-lg"
        >
          Save All Settings
        </button>
        <button
          type="button"
          className="rounded-xl border border-sky-500/40 bg-slate-900/50 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Reset to Defaults
        </button>
      </div>
    </div>
  )
}

function Field({
  label,
  defaultValue,
  type = 'text',
}: {
  label: string
  defaultValue: string
  type?: string
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-slate-400">{label}</span>
      <input
        type={type}
        defaultValue={defaultValue}
        className="w-full rounded-xl border border-white/10 bg-[#0f172a] px-4 py-3 text-sm text-white outline-none focus:border-blue-500/50"
      />
    </label>
  )
}

function NotifRow({
  title,
  desc,
  on,
  onChange,
}: {
  title: string
  desc: string
  on: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-[#0f172a]/80 px-4 py-3">
      <div>
        <p className="text-sm font-medium text-white">{title}</p>
        <p className="text-xs text-slate-500">{desc}</p>
      </div>
      <Toggle on={on} onChange={onChange} />
    </div>
  )
}

function Select({
  label,
  defaultValue,
  options,
}: {
  label: string
  defaultValue: string
  options: string[]
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-slate-400">{label}</span>
      <select
        defaultValue={defaultValue}
        className="w-full appearance-none rounded-xl border border-white/10 bg-[#0f172a] px-4 py-3 text-sm text-white outline-none focus:border-blue-500/50"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  )
}
