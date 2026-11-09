import { useState } from "react";
import { CircleCheck } from "lucide-react";
import FormTransaksi from "../components/FormTransaksi";
import RiwayatTransaksi from "../components/RiwayatTransaksi";
import { useTransaksi } from "../context/TransaksiContext";
import { formatRupiah } from "../utils/format";
import type { TransaksiTersimpan } from "../types";

const formatSaldo = (angka: number): string =>
  (angka < 0 ? "-" : "") + formatRupiah(angka);

export default function Transaksi() {
  const { saldo, totalPemasukan, totalPengeluaran } = useTransaksi();
  const [terakhir, setTerakhir] = useState<TransaksiTersimpan | null>(null);

  const ringkasan = [
    {
      label: "Saldo",
      nilai: formatSaldo(saldo),
      kelas: "bg-violet-100 border-violet-200",
    },
    {
      label: "Total Pemasukan",
      nilai: formatRupiah(totalPemasukan),
      kelas: "bg-emerald-50 border-emerald-100",
    },
    {
      label: "Total Pengeluaran",
      nilai: formatRupiah(totalPengeluaran),
      kelas: "bg-rose-100 border-rose-200",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-[#2a1b66]">Transaksi</h1>
        <p className="mt-1 text-slate-500">
          Catat dan lihat riwayat keuanganmu.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {ringkasan.map((r) => (
          <div key={r.label} className={`rounded-2xl border p-4 ${r.kelas}`}>
            <p className="text-sm font-medium text-slate-700">{r.label}</p>
            <p className="text-xl font-extrabold text-[#241552]">{r.nilai}</p>
          </div>
        ))}
      </div>

      <div className="grid items-start gap-5 xl:grid-cols-[1fr_1.2fr]">
        <FormTransaksi onBerhasil={setTerakhir} />
        <RiwayatTransaksi />
      </div>

      {/* Pesan "Transaksi Berhasil!" */}
      {terakhir && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="judul-berhasil"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
        >
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 text-center shadow-xl">
            <CircleCheck size={64} className="mx-auto text-emerald-500" />
            <h2
              id="judul-berhasil"
              className="mt-3 text-2xl font-extrabold text-[#241552]"
            >
              Transaksi Berhasil!
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {terakhir.tipe === "pengeluaran" ? "Pengeluaran" : "Pemasukan"}{" "}
              kamu telah dicatat dengan sukses.
            </p>

            <div className="mt-5 space-y-2 rounded-2xl bg-slate-50 p-4 text-left text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Kategori</span>
                <span className="font-semibold">{terakhir.kategori}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Jenis</span>
                <span className="font-semibold capitalize">
                  {terakhir.tipe}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Nominal</span>
                <span
                  className={`font-bold ${
                    terakhir.tipe === "pemasukan"
                      ? "text-emerald-600"
                      : "text-rose-500"
                  }`}
                >
                  {terakhir.tipe === "pemasukan" ? "+" : "-"}{" "}
                  {formatRupiah(terakhir.nominal)}
                </span>
              </div>
              {terakhir.catatan && (
                <div className="flex justify-between gap-4">
                  <span className="text-slate-500">Catatan</span>
                  <span className="text-right font-semibold">
                    {terakhir.catatan}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-3 rounded-2xl bg-violet-100 p-4 text-left">
              <p className="text-sm text-slate-600">Saldo kamu sekarang</p>
              <p className="text-xl font-extrabold text-[#241552]">
                {formatSaldo(saldo)}
              </p>
            </div>

            <button
              onClick={() => setTerakhir(null)}
              className="mt-5 w-full rounded-xl bg-[#6d4fd6] py-3 font-semibold text-white hover:bg-[#5b3fc4]"
            >
              Selesai
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
