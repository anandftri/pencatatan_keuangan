import { ChartPie } from "lucide-react";
import { PieChart, Pie, Cell } from "recharts";
import { kategori } from "../data/mockData";

interface CategoryDonutProps {
  total?: string;
}

export default function CategoryDonut({
  total = "Rp 1.250.000",
}: CategoryDonutProps) {
  return (
    <section className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm">
      <h2 className="mb-4 flex items-center gap-3 text-lg font-bold text-[#241552]">
        <ChartPie size={22} /> Kategori Pengeluaran
      </h2>

      <div className="flex flex-wrap items-center justify-center gap-6">
        <div className="relative h-[190px] w-[190px]">
          <PieChart width={190} height={190}>
            <Pie
              data={kategori}
              dataKey="persen"
              innerRadius={60}
              outerRadius={92}
              startAngle={90}
              endAngle={-270}
              stroke="none"
            >
              {kategori.map((k) => (
                <Cell key={k.nama} fill={k.warna} />
              ))}
            </Pie>
          </PieChart>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-sm font-semibold">{total}</span>
            <span className="text-xs text-slate-500">Total</span>
          </div>
        </div>

        <ul className="flex min-w-[190px] flex-1 flex-col gap-3.5 text-sm">
          {kategori.map((k) => (
            <li key={k.nama} className="flex items-center gap-3">
              <i
                className="h-3.5 w-3.5 rounded-full"
                style={{ backgroundColor: k.warna }}
              />
              <span className="flex-1">{k.nama}</span>
              <span className="text-slate-600">{k.persen}%</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
