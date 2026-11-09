import { ArrowUp } from "lucide-react";
import { formatRupiah } from "../utils/format";
import type { Stat, WarnaStat } from "../types";

const tema: Record<WarnaStat, { kartu: string; ikon: string }> = {
  ungu: {
    kartu: "bg-violet-100 border-violet-200",
    ikon: "bg-violet-300 text-[#2a1b66]",
  },
  hijau: {
    kartu: "bg-emerald-50 border-emerald-100",
    ikon: "bg-emerald-200 text-emerald-600",
  },
  merah: {
    kartu: "bg-rose-100 border-rose-200",
    ikon: "bg-rose-300 text-rose-900",
  },
};

export default function StatCard({
  judul,
  nilai,
  catatan,
  keterangan,
  warna,
  ikon: Ikon,
}: Stat) {
  const t = tema[warna];
  const naikBagus = warna !== "merah";
  const warnaCatatan = naikBagus ? "text-emerald-600" : "text-rose-500";

  return (
    <div
      className={`flex items-center gap-5 rounded-2xl border p-6 ${t.kartu}`}
    >
      <div
        className={`flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full ${t.ikon}`}
      >
        <Ikon size={32} strokeWidth={2.5} />
      </div>
      <div>
        <p className="font-medium text-slate-700">{judul}</p>
        <p className="text-3xl font-extrabold text-[#241552]">
          {formatRupiah(nilai)}
        </p>
        <p className="mt-1 flex items-center gap-1 text-sm">
          <ArrowUp size={14} className={warnaCatatan} />
          <span className={`font-semibold ${warnaCatatan}`}>{catatan}</span>
          {keterangan && <span className="text-slate-600">{keterangan}</span>}
        </p>
      </div>
    </div>
  );
}
