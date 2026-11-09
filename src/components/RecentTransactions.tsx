import { Menu, ArrowRight } from "lucide-react";
import { transaksi } from "../data/mockData";
import { formatRupiah } from "../utils/format";

export default function RecentTransactions() {
  return (
    <section className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="flex items-center gap-3 text-lg font-bold text-[#241552]">
          <Menu size={22} /> Transaksi Terbaru
        </h2>
        <a
          href="#"
          className="flex items-center gap-1.5 text-sm font-medium text-[#5b3fc4] hover:underline"
        >
          Lihat Semua <ArrowRight size={16} />
        </a>
      </div>

      <ul className="flex flex-col gap-3">
        {transaksi.map(
          ({ id, judul, tanggal, kategori, jumlah, ikon: Ikon, warna }) => {
            const masuk = jumlah > 0;
            return (
              <li key={id} className="flex items-center gap-4">
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${warna}`}
                >
                  <Ikon size={22} />
                </span>
                <div className="flex-1">
                  <p className="font-semibold text-[#241552]">{judul}</p>
                  <p className="text-sm text-slate-500">
                    {tanggal} • {kategori}
                  </p>
                </div>
                <p
                  className={`font-semibold ${masuk ? "text-emerald-600" : "text-rose-500"}`}
                >
                  {masuk ? "+" : "-"} {formatRupiah(jumlah)}
                </p>
              </li>
            );
          },
        )}
      </ul>
    </section>
  );
}
