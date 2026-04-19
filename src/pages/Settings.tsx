import { useState } from "react";
import { PageHeader } from "../components/layout/PageHeader";

export function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);

  return (
    <div className="p-8 lg:p-10">
      <PageHeader
        title="System Settings"
        subtitle="Manage backend, notifications, and device preferences"
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* System Status */}
        <div className="rounded-2xl bg-[#1b203d] p-6 shadow-lg">
          <h2 className="mb-5 text-lg font-semibold text-white">
            System Status
          </h2>

          <Row label="Firebase" value="Connected" green />
          <Row label="Backend API" value="Online" green />
          <Row label="ESP32 Device" value="Ready" green />
          <Row label="Version" value="v1.0.0" />
        </div>

        {/* Preferences */}
        <div className="rounded-2xl bg-[#1b203d] p-6 shadow-lg">
          <h2 className="mb-5 text-lg font-semibold text-white">
            Preferences
          </h2>

          <ToggleRow
            label="Enable Notifications"
            enabled={notifications}
            onClick={() => setNotifications(!notifications)}
          />

          <ToggleRow
            label="Auto Refresh Dashboard"
            enabled={autoRefresh}
            onClick={() => setAutoRefresh(!autoRefresh)}
          />
        </div>

        {/* Security */}
        <div className="rounded-2xl bg-[#1b203d] p-6 shadow-lg">
          <h2 className="mb-5 text-lg font-semibold text-white">
            Security
          </h2>

          <Row label="Admin Role Access" value="Enabled" green />
          <Row label="RFID Validation" value="Active" green />
          <Row label="Unauthorized Alerts" value="Enabled" green />
        </div>

        {/* Danger Zone */}
        <div className="rounded-2xl bg-[#1b203d] p-6 shadow-lg">
          <h2 className="mb-5 text-lg font-semibold text-white">
            Danger Zone
          </h2>

          <button className="w-full rounded-xl bg-rose-600 py-3 font-semibold text-white hover:bg-rose-500">
            Reset Logs
          </button>

          <button className="mt-3 w-full rounded-xl bg-amber-600 py-3 font-semibold text-white hover:bg-amber-500">
            Restart System
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  green,
}: {
  label: string;
  value: string;
  green?: boolean;
}) {
  return (
    <div className="mb-3 flex items-center justify-between rounded-xl bg-[#111827] px-4 py-3">
      <span className="text-slate-300">{label}</span>
      <span
        className={`font-medium ${
          green ? "text-emerald-400" : "text-white"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function ToggleRow({
  label,
  enabled,
  onClick,
}: {
  label: string;
  enabled: boolean;
  onClick: () => void;
}) {
  return (
    <div className="mb-4 flex items-center justify-between rounded-xl bg-[#111827] px-4 py-3">
      <span className="text-slate-300">{label}</span>

      <button
        onClick={onClick}
        className={`rounded-full px-4 py-1 text-sm font-semibold ${
          enabled
            ? "bg-emerald-600 text-white"
            : "bg-slate-700 text-slate-300"
        }`}
      >
        {enabled ? "ON" : "OFF"}
      </button>
    </div>
  );
}