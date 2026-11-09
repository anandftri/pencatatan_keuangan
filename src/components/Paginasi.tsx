import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginasiProps {
  halaman: number;
  totalHalaman: number;
  perHalaman: number;
  dari: number;
  sampai: number;
  total: number;
  onHalaman: (halaman: number) => void;
  onPerHalaman: (jumlah: number) => void;
}

const opsiPerHalaman: number[] = [5, 10, 20];

// Contoh hasil: [1, "...", 4, 5, 6, "...", 12]
const buatNomor = (aktif: number, total: number): (number | "...")[] => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const hasil: (number | "...")[] = [1];
  const kiri = Math.max(2, aktif - 1);
  const kanan = Math.min(total - 1, aktif + 1);

  if (kiri > 2) hasil.push("...");
  for (let i = kiri; i <= kanan; i++) hasil.push(i);
  if (kanan < total - 1) hasil.push("...");
  hasil.push(total);

  return hasil;
};

const kelasTombol =
  "flex h-9 min-w-9 items-center justify-center rounded-lg border px-2 text-sm font-medium transition-colors";

export default function Paginasi({
  halaman,
  totalHalaman,
  perHalaman,
  dari,
  sampai,
  total,
  onHalaman,
  onPerHalaman,
}: PaginasiProps) {
  return (
    <div className="mt-4 flex flex-col items-center justify-between gap-4 lg:flex-row">
      <p className="text-sm text-slate-600">
        Menampilkan {dari}–{sampai} dari {total} user
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <select
          value={perHalaman}
          onChange={(e) => onPerHalaman(Number(e.target.value))}
          aria-label="Jumlah user per halaman"
          className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-600 outline-none focus:border-[#6d4fd6]"
        >
          {opsiPerHalaman.map((n) => (
            <option key={n} value={n}>
              {n} per halaman
            </option>
          ))}
        </select>

        <nav aria-label="Halaman" className="flex items-center gap-1.5">
          <button
            onClick={() => onHalaman(halaman - 1)}
            disabled={halaman <= 1}
            aria-label="Halaman sebelumnya"
            className={`${kelasTombol} border-slate-200 text-slate-600 hover:bg-violet-50 disabled:cursor-not-allowed disabled:opacity-40`}
          >
            <ChevronLeft size={16} />
          </button>

          {buatNomor(halaman, totalHalaman).map((n, i) =>
            n === "..." ? (
              <span key={`titik-${i}`} className="px-1 text-slate-400">
                …
              </span>
            ) : (
              <button
                key={n}
                onClick={() => onHalaman(n)}
                aria-current={n === halaman ? "page" : undefined}
                className={`${kelasTombol} ${
                  n === halaman
                    ? "border-[#6d4fd6] bg-[#6d4fd6] text-white"
                    : "border-transparent text-slate-600 hover:bg-violet-50"
                }`}
              >
                {n}
              </button>
            ),
          )}

          <button
            onClick={() => onHalaman(halaman + 1)}
            disabled={halaman >= totalHalaman}
            aria-label="Halaman berikutnya"
            className={`${kelasTombol} border-slate-200 text-slate-600 hover:bg-violet-50 disabled:cursor-not-allowed disabled:opacity-40`}
          >
            <ChevronRight size={16} />
          </button>
        </nav>
      </div>
    </div>
  );
}
