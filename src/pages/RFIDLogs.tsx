import { useEffect, useMemo, useState } from "react";
import { Search, Download, CheckCircle2, XCircle } from "lucide-react";
import { PageHeader } from "../components/layout/PageHeader";

type Filter = "all" | "allowed" | "denied";

export function RFIDLogs() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await fetch("http://localhost:5000/view-logs");
      const data = await res.json();

      const rows = Object.values(data || {}).map((item: any) => {
        const full = item.time || "";
        const parts = full.split(",");

        return {
          user: item.user || "Unknown",
          rfid: item.uid || "---",
          vehicle: item.vehicle || "EV-001",
          date: parts[0] || "-",
          time: parts[1]?.trim() || "-",
          allowed:
            item.result === "AUTHORIZED" ||
            item.status === "AUTHORIZED",
        };
      });

      setLogs(rows.reverse());
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const rows = useMemo(() => {
    return logs.filter((row) => {
      const match =
        !q.trim() ||
        row.user.toLowerCase().includes(q.toLowerCase()) ||
        row.rfid.toLowerCase().includes(q.toLowerCase()) ||
        row.vehicle.toLowerCase().includes(q.toLowerCase());

      const f =
        filter === "all" ||
        (filter === "allowed" && row.allowed) ||
        (filter === "denied" && !row.allowed);

      return match && f;
    });
  }, [q, filter, logs]);

  if (loading) {
    return <div className="p-8 text-white">Loading Logs...</div>;
  }

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
            className="w-full rounded-2xl border border-white/10 bg-[#1b203d] py-3.5 pl-11 pr-4 text-sm text-white"
          />
        </div>

        <div className="flex gap-2">
          {(["all", "allowed", "denied"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-xl px-4 py-2 text-sm ${
                filter === f
                  ? "bg-blue-600 text-white"
                  : "bg-[#1b203d] text-slate-300"
              }`}
            >
              {f}
            </button>
          ))}

          <button className="flex items-center gap-2 rounded-xl bg-[#1b203d] px-4 py-2 text-white">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl bg-[#1a1f2b]">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-slate-400 border-b border-slate-700">
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">RFID UID</th>
              <th className="px-6 py-4">Vehicle</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Time</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className="border-b border-slate-800 text-white"
              >
                <td className="px-6 py-4">{row.user}</td>
                <td className="px-6 py-4">{row.rfid}</td>
                <td className="px-6 py-4">{row.vehicle}</td>
                <td className="px-6 py-4">{row.date}</td>
                <td className="px-6 py-4">{row.time}</td>
                <td className="px-6 py-4">
                  {row.allowed ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4" />
                      Allowed
                    </span>
                  ) : (
                    <span className="text-rose-400 flex items-center gap-1">
                      <XCircle className="h-4 w-4" />
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
  );
}