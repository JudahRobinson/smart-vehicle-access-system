import { useEffect, useState } from "react";
import {
  Car,
  Activity,
  ShieldAlert,
  Radio,
  TrendingUp,
} from "lucide-react";
import { PageHeader } from "../components/layout/PageHeader";

const iconMap = {
  car: Car,
  pulse: Activity,
  shield: ShieldAlert,
  signal: Radio,
};

const accentMap = {
  blue: "bg-blue-500",
  green: "bg-emerald-500",
  red: "bg-rose-500",
  purple: "bg-purple-500",
};

export function Dashboard() {
  const [vehicleStatus, setVehicleStatus] = useState("OFF");
  const [usersCount, setUsersCount] = useState(0);
  const [logsCount, setLogsCount] = useState(0);
  const [unauthorizedCount, setUnauthorizedCount] = useState(0);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const usersRes = await fetch("http://localhost:5000/users");
      const usersData = await usersRes.json();
      setUsersCount(Object.keys(usersData || {}).length);

      const logsRes = await fetch("http://localhost:5000/view-logs");
      const logsData = await logsRes.json();

      const logsArray = Object.values(logsData || {});
      setLogsCount(logsArray.length);

      const denied = logsArray.filter(
        (item: any) =>
          item.result === "DENIED" ||
          item.status === "DENIED"
      ).length;

      setUnauthorizedCount(denied);

      const vehicleRes = await fetch("http://localhost:5000/vehicle-status");
      const vehicleData = await vehicleRes.json();

      setVehicleStatus(vehicleData.status || "OFF");
    } catch (error) {
      console.log(error);
    }
  };

  const dashboardMetrics = [
    {
      label: "Total Users",
      value: usersCount,
      icon: "car",
      accent: "blue",
      trend: "+2",
    },
    {
      label: "Vehicle Status",
      value: vehicleStatus,
      icon: "pulse",
      accent: "green",
      trend: "+Live",
    },
    {
      label: "Unauthorized Attempts",
      value: unauthorizedCount,
      icon: "shield",
      accent: "red",
      trend: "+1",
    },
    {
      label: "RFID Scans Today",
      value: logsCount,
      icon: "signal",
      accent: "purple",
      trend: "+Live",
    },
  ];

  return (
    <div className="p-8 lg:p-10">
      <PageHeader
        title="Dashboard Overview"
        subtitle="Real-time monitoring of your EV fleet."
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((m) => {
          const Icon = iconMap[m.icon as keyof typeof iconMap];
          const accent = accentMap[m.accent as keyof typeof accentMap];

          return (
            <div
              key={m.label}
              className="relative rounded-2xl border border-white/5 bg-[#1b203d] p-5 shadow-lg shadow-black/20"
            >
              <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium bg-emerald-500/20 text-emerald-400">
                <TrendingUp className="h-3 w-3" />
                {m.trend}
              </div>

              <div className={`mb-4 inline-flex rounded-xl ${accent} p-2.5 text-white`}>
                <Icon className="h-5 w-5" />
              </div>

              <p className="text-3xl font-bold text-white">{m.value}</p>
              <p className="mt-1 text-sm text-slate-400">{m.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}