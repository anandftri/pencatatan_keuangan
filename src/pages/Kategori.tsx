import { useMemo, useState } from "react";
import PilihBulan from "../components/PilihBulan";
import KartuKategori from "../components/KartuKategori";
import { useTransaksi } from "../context/TransaksiContext";
import { useAnggaran } from "../hooks/useAnggaran";
import { daftarKategori } from "../data/kategoriTransaksi";
import { filterBulan, kunciBulanSekarang } from "../utils/laporan";
import { formatRupiah } from "../utils/format";
import type { TipeTransaksi } from "../types";

const tab: { label: string; nilai: TipeTransaksi }[] = [
  { label: "Pengeluaran", nilai: "pengeluaran" },
  { label: "Pemasukan", nilai: "pemasukan" },
];

interface StatistikKategori {
  total: number;
  jumlah: number;
}

export default function Kategori() {
  const { daftar } = useTransaksi();
  const { anggaran, atur } = useAnggaran();
  const [bulan, setBulan] = useState<string>(kunciBulanSekarang());
  const [tipe, setTipe] = useState<TipeTransaksi>("pengeluaran");

  const { peta, totalSemua, terbesar } = useMemo(() => {
    const hasil = new Map<string, StatistikKategori>();
    let jumlahSemua = 0;

    for (const t of filterBulan(daftar, bulan)) {
      if (t.tipe !== tipe) continue;
      const lama = hasil.get(t.kategori) ?? { total: 0, jumlah: 0 };
      hasil.set(t.kategori, {
        total: lama.total + t.nominal,
        jumlah: lama.jumlah + 1,
      });
      jumlahSemua += t.nominal;
    }

    let namaTerbesar = "";
    let nilaiTerbesar = 0;
    for (const [nama, stat] of hasil) {
      if (stat.total > nilaiTerbesar) {
        nilaiTerbesar = stat.total;
        namaTerbesar = nama;
      }
    }

    return {
      peta: hasil,
      totalSemua: jumlahSemua,
      terbesar: namaTerbesar
        ? { nama: namaTerbesar, total: nilaiTerbesar }
        : null,
    };
  }, [daftar, bulan, tipe]);

  const judulTotal =
    tipe === "pengeluaran" ? "Total Pengeluaran" : "Total Pemasukan";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-[#2a1b66]">Kategori</h1>
        <p className="mt-1 text-slate-500">
          Lihat ke mana uangmu pergi dan atur batas pengeluaran tiap kategori.
        </p>
      </div>

      <PilihBulan bulan={bulan} onUbah={setBulan} />

      {/* Tab jenis */}
      <div className="flex w-fit gap-1.5 rounded-full bg-white p-1 shadow-sm">
        {tab.map((t) => (
          <button
            key={t.nilai}
            onClick={() => setTipe(t.nilai)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              tipe === t.nilai
                ? "bg-[#6d4fd6] text-white"
                : "text-slate-600 hover:bg-violet-50"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Ringkasan */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-violet-200 bg-violet-100 p-5">
          <p className="text-sm font-medium text-slate-700">{judulTotal}</p>
          <p className="text-2xl font-extrabold text-[#241552]">
            {formatRupiah(totalSemua)}
          </p>
        </div>
        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5">
          <p className="text-sm font-medium text-slate-700">
            {tipe === "pengeluaran"
              ? "Pengeluaran Terbesar"
              : "Pemasukan Terbesar"}
          </p>
          {terbesar ? (
            <p className="text-2xl font-extrabold text-[#241552]">
              {terbesar.nama}
              <span className="ml-2 text-base font-semibold text-slate-600">
                {formatRupiah(terbesar.total)}
              </span>
            </p>
          ) : (
            <p className="text-lg font-semibold text-slate-500">
              Belum ada data bulan ini
            </p>
          )}
        </div>
      </div>

      {/* Kartu kategori */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {daftarKategori(tipe).map((k) => {
          const stat = peta.get(k.nama);
          const total = stat?.total ?? 0;
          return (
            <KartuKategori
              key={`${tipe}-${k.nama}`}
              kategori={k}
              total={total}
              jumlahTransaksi={stat?.jumlah ?? 0}
              persen={
                totalSemua > 0 ? Math.round((total / totalSemua) * 100) : 0
              }
              batas={anggaran[k.nama]}
              bisaAturBatas={tipe === "pengeluaran"}
              onSimpanBatas={(nilai) => atur(k.nama, nilai)}
            />
          );
        })}
      </div>
    </div>
  );
}
