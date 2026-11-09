import { useState } from "react";
import { Trash2, Inbox } from "lucide-react";
import { useTransaksi } from "../context/TransaksiContext";
import { cariKategori } from "../data/kategoriTransaksi";
import { formatRupiah } from "../utils/format";
import type { TipeTransaksi } from "../types";

type Filter = "semua" | TipeTransaksi;

const tab: { label: string; nilai: Filter }[] = [
  { label: "Semua", nilai: "semua" },
  { label: "Pengeluaran", nilai: "pengeluaran" },
  { label: "Pemasukan", nilai: "pemasukan" },
];

const formatTanggal = (iso: string): string =>
  new Date(iso + "T00:00:00").toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default function RiwayatTransaksi() {
  const { daftar, hapus } = useTransaksi();
  const [filter, setFilter] = useState<Filter>("semua");

  // Urut dari tanggal terbaru; tanggal sama tetap urut input terakhir di atas
  const tampil = [...daftar]
    .filter((t) => filter === "semua" || t.tipe === filter)
    .sort((a, b) => b.tanggal.localeCompare(a.tanggal));

  return (
    <section className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-[#241552]">Riwayat Transaksi</h2>
        <div className="flex gap-1.5 rounded-full bg-slate-50 p-1">
          {tab.map((t) => (
            <button
              key={t.nilai}
              onClick={() => setFilter(t.nilai)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                filter === t.nilai
                  ? "bg-[#6d4fd6] text-white"
                  : "text-slate-600 hover:bg-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {tampil.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-12 text-center text-slate-500">
          <Inbox size={40} />
          <p className="font-medium">Belum ada transaksi</p>
          <p className="text-sm">
            Isi formulir di samping untuk mencatat transaksi pertamamu.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {tampil.map((t) => {
            const { ikon: Ikon, warna } = cariKategori(t.tipe, t.kategori);
            const masuk = t.tipe === "pemasukan";
            return (
              <li key={t.id} className="flex items-center gap-4">
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${warna}`}
                >
                  <Ikon size={22} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-[#241552]">{t.kategori}</p>
                  <p className="truncate text-sm text-slate-500">
                    {formatTanggal(t.tanggal)}
                    {t.catatan && ` • ${t.catatan}`}
                  </p>
                </div>
                <p
                  className={`font-semibold ${masuk ? "text-emerald-600" : "text-rose-500"}`}
                >
                  {masuk ? "+" : "-"} {formatRupiah(t.nominal)}
                </p>
                <button
                  onClick={() => {
                    if (window.confirm("Hapus transaksi ini?")) hapus(t.id);
                  }}
                  aria-label={`Hapus transaksi ${t.kategori}`}
                  className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-500"
                >
                  <Trash2 size={18} />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
