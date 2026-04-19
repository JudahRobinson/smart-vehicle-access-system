import { useEffect, useState } from "react";
import { PageHeader } from "../components/layout/PageHeader";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

export function Analytics() {
  const [users, setUsers] = useState(0);
  const [logs, setLogs] = useState(0);
  const [allowed, setAllowed] = useState(0);
  const [denied, setDenied] = useState(0);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const usersRes = await fetch("http://localhost:5000/users");
      const usersData = await usersRes.json();
      setUsers(Object.keys(usersData || {}).length);

      const logsRes = await fetch("http://localhost:5000/view-logs");
      const logsData = await logsRes.json();

      const rows: any[] = Object.values(logsData || {});
      setLogs(rows.length);

      const allowCount = rows.filter(
        (r) =>
          r.result === "AUTHORIZED" ||
          r.status === "AUTHORIZED"
      ).length;

      setAllowed(allowCount);
      setDenied(rows.length - allowCount);
    } catch (error) {
      console.log(error);
    }
  };

  const barData = [
    { name: "Users", value: users },
    { name: "Scans", value: logs },
    { name: "Allowed", value: allowed },
    { name: "Denied", value: denied },
  ];

  const pieData = [
    { name: "Allowed", value: allowed },
    { name: "Denied", value: denied },
  ];

  const COLORS = ["#10b981", "#f43f5e"];

  return (
    <div className="p-8 lg:p-10">
      <PageHeader
        title="Analytics"
        subtitle="Live analytics of RFID system activity"
      />

      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <Card title="Total Users" value={users} />
        <Card title="RFID Scans" value={logs} />
        <Card title="Allowed" value={allowed} />
        <Card title="Denied" value={denied} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-[#1b203d] p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">
            System Overview
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl bg-[#1b203d] p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">
            Allowed vs Denied
          </h2>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                outerRadius={110}
                dataKey="value"
                label
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function Card({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl bg-[#1b203d] p-5 shadow-lg">
      <p className="text-sm text-slate-400">{title}</p>
      <p className="mt-2 text-3xl font-bold text-white">{value}</p>
    </div>
  );
}