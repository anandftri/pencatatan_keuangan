import { PieChart, Pie, Cell } from "recharts";
import { cariKategori } from "../data/kategoriTransaksi";
import { warnaKategoriGrafik, type ItemRincian } from "../utils/laporan";
import { formatRupiah } from "../utils/format";

interface RincianKategoriProps {
  rincian: ItemRincian[];
  total: number;
}

export default function RincianKategori({
  rincian,
  total,
}: RincianKategoriProps) {
  return (
    <section className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-[#241552]">Rincian Pengeluaran</h2>
      <p className="mb-4 text-sm text-slate-500">
        Persentase pengeluaran per kategori
      </p>

      {rincian.length === 0 ? (
        <p className="py-12 text-center text-slate-500">
          Belum ada pengeluaran di bulan ini.
        </p>
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-6">
          <div className="relative h-[190px] w-[190px]">
            <PieChart width={190} height={190}>
              <Pie
                data={rincian}
                dataKey="total"
                nameKey="nama"
                innerRadius={60}
                outerRadius={92}
                startAngle={90}
                endAngle={-270}
                stroke="none"
              >
                {rincian.map((item) => (
                  <Cell key={item.nama} fill={warnaKategoriGrafik(item.nama)} />
                ))}
              </Pie>
            </PieChart>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-xs text-slate-500">Total</span>
              <span className="text-sm font-bold text-[#241552]">
                {formatRupiah(total)}
              </span>
            </div>
          </div>

          <ul className="flex min-w-[220px] flex-1 flex-col gap-3">
            {rincian.map((item) => {
              const { ikon: Ikon, warna } = cariKategori(
                "pengeluaran",
                item.nama,
              );
              return (
                <li key={item.nama} className="flex items-center gap-3">
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${warna}`}
                  >
                    <Ikon size={18} />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#241552]">
                      {item.nama}
                    </p>
                    <p className="text-xs text-slate-500">
                      {formatRupiah(item.total)}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-slate-600">
                    {item.persen}%
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
}
