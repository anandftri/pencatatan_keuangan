import { useMemo, useState } from "react";
import { ChartColumn } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { buatDataGrafik } from "../data/mockData";

interface Rentang {
  label: string;
  hari: number;
}

const rentang: Rentang[] = [
  { label: "7D", hari: 7 },
  { label: "30D", hari: 30 },
  { label: "90D", hari: 90 },
];

export default function FinanceChart() {
  const [hari, setHari] = useState<number>(30);
  const data = useMemo(() => buatDataGrafik(hari), [hari]);

  return (
    <section className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-3 text-lg font-bold text-[#241552]">
          <ChartColumn size={22} /> Ringkasan Keuangan
        </h2>
        <div className="flex gap-1.5 rounded-full bg-slate-50 p-1">
          {rentang.map((r) => (
            <button
              key={r.label}
              onClick={() => setHari(r.hari)}
              className={`rounded-full px-5 py-1.5 text-sm font-medium transition-colors ${
                hari === r.hari
                  ? "bg-[#6d4fd6] text-white"
                  : "text-slate-600 hover:bg-white"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mb-2 flex justify-center gap-6 text-sm text-slate-600">
        <span className="flex items-center gap-2">
          <i className="h-2.5 w-2.5 rounded-full bg-[#6d4fd6]" />
          Pemasukan
        </span>
        <span className="flex items-center gap-2">
          <i className="h-2.5 w-2.5 rounded-full bg-[#f77b9b]" />
          Pengeluaran
        </span>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 12, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="gUngu" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6d4fd6" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#6d4fd6" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="gPink" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f77b9b" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#f77b9b" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#eee9fb" vertical />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={[0, 4000000]}
              ticks={[0, 1000000, 2000000, 3000000, 4000000]}
              tickFormatter={(v: number) =>
                v === 0 ? "0" : `${v / 1000000}jt`
              }
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
            />
            <Area
              type="monotone"
              dataKey="pemasukan"
              stroke="#6d4fd6"
              strokeWidth={2.5}
              fill="url(#gUngu)"
            />
            <Area
              type="monotone"
              dataKey="pengeluaran"
              stroke="#f77b9b"
              strokeWidth={2.5}
              fill="url(#gPink)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
