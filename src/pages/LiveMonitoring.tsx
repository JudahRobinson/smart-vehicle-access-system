import { useEffect, useState } from "react";
import { Wifi, WifiOff, User } from "lucide-react";
import { PageHeader } from "../components/layout/PageHeader";

export function LiveMonitoring() {
  const [status, setStatus] = useState("OFF");
  const [lastUser, setLastUser] = useState("No Active User");
  const [lastUid, setLastUid] = useState("---");
  const [lastScan, setLastScan] = useState("-");
  const [online, setOnline] = useState(true);

  useEffect(() => {
    fetchLiveData();
    const timer = setInterval(fetchLiveData, 3000);
    return () => clearInterval(timer);
  }, []);

  const fetchLiveData = async () => {
    try {
      const statusRes = await fetch("http://localhost:5000/vehicle-status");
      const statusData = await statusRes.json();
      setStatus(statusData.status || "OFF");

      const logsRes = await fetch("http://localhost:5000/view-logs");
      const logsData = await logsRes.json();

      const rows = Object.values(logsData || {});
      if (rows.length > 0) {
        const latest: any = rows[rows.length - 1];
        setLastUser(latest.user || "Unknown");
        setLastUid(latest.uid || "---");
        setLastScan(latest.time || "-");
      }

      setOnline(true);
    } catch (error) {
      setOnline(false);
    }
  };

  return (
    <div className="p-8 lg:p-10">
      <PageHeader
        title="Live Vehicle Monitoring"
        subtitle="Real-time status of smart vehicle"
        right={
          <div
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
              online
                ? "border border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                : "border border-rose-500/40 bg-rose-500/10 text-rose-400"
            }`}
          >
            {online ? "Live" : "Offline"}
          </div>
        }
      />

      <div className="max-w-2xl rounded-2xl border border-white/5 bg-[#1e293b] p-6 shadow-lg">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <p className="text-xl font-bold text-white">Vehicle EV-001</p>

            <div className="mt-1 flex items-center gap-1.5 text-xs">
              {online ? (
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
              status === "ON"
                ? "bg-emerald-500/20 text-emerald-400"
                : "bg-slate-700 text-slate-400"
            }`}
          >
            {status}
          </span>
        </div>

        <div className="mb-4 rounded-xl bg-[#0f172a]/80 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
              <User className="h-5 w-5" />
            </div>

            <div>
              <p className="font-medium text-white">{lastUser}</p>
              <p className="font-mono text-xs text-sky-400">{lastUid}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between text-sm text-sky-400">
          <span>Last Scan</span>
          <span>{lastScan}</span>
        </div>
      </div>
    </div>
  );
}