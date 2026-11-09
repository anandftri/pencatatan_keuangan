import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatRupiah } from "../utils/format";
import type { DataMingguan } from "../utils/laporan";

interface PerbandinganMingguanProps {
  data: DataMingguan[];
}

const singkat = (v: number): string => {
  if (v >= 1000000) return `${+(v / 1000000).toFixed(1)}jt`;
  if (v >= 1000) return `${+(v / 1000).toFixed(0)}rb`;
  return String(v);
};

export default function PerbandinganMingguan({
  data,
}: PerbandinganMingguanProps) {
  return (
    <section className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-[#241552]">
        Perbandingan Pemasukan dan Pengeluaran
      </h2>

      <div className="mb-2 mt-2 flex gap-6 text-sm text-slate-600">
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
          <BarChart
            data={data}
            margin={{ top: 10, right: 8, left: -10, bottom: 0 }}
          >
            <CartesianGrid stroke="#eee9fb" vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              tickFormatter={(v: number) => singkat(v)}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12 }}
              allowDecimals={false}
            />
            <Tooltip
              formatter={(nilai) => formatRupiah(Number(nilai))}
              cursor={{ fill: "#f5f3ff" }}
            />
            <Bar
              dataKey="pemasukan"
              name="Pemasukan"
              fill="#6d4fd6"
              radius={[6, 6, 0, 0]}
            />
            <Bar
              dataKey="pengeluaran"
              name="Pengeluaran"
              fill="#f77b9b"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
