import { useEffect, useState } from "react";
import { Power } from "lucide-react";
import { PageHeader } from "../components/layout/PageHeader";

export function VehicleControl() {
  const [status, setStatus] = useState("OFF");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getStatus();
  }, []);

  const getStatus = async () => {
    try {
      const res = await fetch("http://localhost:5000/vehicle-status");
      const data = await res.json();
      setStatus(data.status || "OFF");
    } catch (error) {
      console.log(error);
    }
  };

  const startVehicle = async () => {
    setLoading(true);
    await fetch("http://localhost:5000/start-vehicle", {
      method: "POST",
    });
    setStatus("ON");
    setLoading(false);
  };

  const stopVehicle = async () => {
    setLoading(true);
    await fetch("http://localhost:5000/stop-vehicle", {
      method: "POST",
    });
    setStatus("OFF");
    setLoading(false);
  };

  return (
    <div className="p-8 lg:p-10">
      <PageHeader
        title="Vehicle Control Panel"
        subtitle="Remote start and stop vehicle"
      />

      <div className="max-w-xl rounded-2xl border border-white/5 bg-[#1c253d] p-8 shadow-lg">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Vehicle Status</h2>

          <span
            className={`rounded-full px-4 py-2 text-sm font-bold ${
              status === "ON"
                ? "bg-emerald-500/20 text-emerald-400"
                : "bg-slate-700 text-slate-300"
            }`}
          >
            {status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={startVehicle}
            disabled={loading}
            className="rounded-xl bg-emerald-600 py-4 font-semibold text-white hover:bg-emerald-500"
          >
            <div className="flex items-center justify-center gap-2">
              <Power className="h-4 w-4" />
              Start Vehicle
            </div>
          </button>

          <button
            onClick={stopVehicle}
            disabled={loading}
            className="rounded-xl bg-rose-600 py-4 font-semibold text-white hover:bg-rose-500"
          >
            <div className="flex items-center justify-center gap-2">
              <Power className="h-4 w-4" />
              Stop Vehicle
            </div>
          </button>
        </div>

        {loading && (
          <p className="mt-4 text-sm text-slate-400">Updating vehicle...</p>
        )}
      </div>
    </div>
  );
}