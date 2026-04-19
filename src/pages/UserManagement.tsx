import { useEffect, useState } from "react";
import { User } from "lucide-react";
import { PageHeader } from "../components/layout/PageHeader";

export function UserManagement() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/users");
      const data = await res.json();

      const rows = Object.entries(data || {}).map(
        ([id, value]: any) => ({
          id,
          ...value,
        })
      );

      setUsers(rows);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-8 lg:p-10">
      <PageHeader
        title="User Management"
        subtitle="Manage users, roles, and RFID assignments"
      />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {users.map((u) => (
          <div
            key={u.id}
            className="relative overflow-hidden rounded-2xl border border-white/5 bg-[#161b22]/95 p-5 shadow-lg ring-1 ring-white/5"
          >
            <div className="mb-4 flex items-start gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 text-white">
                <User className="h-6 w-6" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-semibold text-white">
                  {u.name || "Unknown"}
                </p>
                <p className="truncate text-sm text-sky-400/70">
                  {u.email || "No Email"}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Row label="Phone" value={u.phone || "-"} />
              <Row label="RFID Card" value={u.rfid || "-"} mono />
              <Row label="Role" value={u.role || "USER"} />
              <Row label="Status" value="ACTIVE" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-[#0d1117] px-3 py-2.5">
      <span className="text-sm text-slate-300">{label}</span>
      <span
        className={`text-sm text-white ${
          mono ? "font-mono text-xs" : ""
        }`}
      >
        {value}
      </span>
    </div>
  );
}