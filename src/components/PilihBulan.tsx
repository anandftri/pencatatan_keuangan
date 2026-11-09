import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { geserBulan, kunciBulanSekarang, namaBulan } from "../utils/laporan";

interface PilihBulanProps {
  bulan: string; // format "YYYY-MM", misalnya "2026-11"
  onUbah: (bulanBaru: string) => void;
}

export default function PilihBulan({ bulan, onUbah }: PilihBulanProps) {
  const bulanIni = kunciBulanSekarang();

  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-1 items-center justify-between rounded-2xl border border-violet-100 bg-white px-2 py-2 shadow-sm sm:max-w-md">
        <button
          onClick={() => onUbah(geserBulan(bulan, -1))}
          aria-label="Bulan sebelumnya"
          className="rounded-xl p-2 text-slate-600 transition-colors hover:bg-violet-50"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex items-center gap-2 font-semibold text-[#241552]">
          <CalendarDays size={18} />
          <span className="capitalize">{namaBulan(bulan)}</span>
        </div>

        <button
          onClick={() => onUbah(geserBulan(bulan, 1))}
          aria-label="Bulan berikutnya"
          className="rounded-xl p-2 text-slate-600 transition-colors hover:bg-violet-50"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {bulan !== bulanIni && (
        <button
          onClick={() => onUbah(bulanIni)}
          className="rounded-full bg-[#6d4fd6] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#5b3fc4]"
        >
          Bulan ini
        </button>
      )}
    </div>
  );
}
