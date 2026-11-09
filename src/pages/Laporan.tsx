import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Wallet } from "lucide-react";
import PilihBulan from "../components/PilihBulan";
import RincianKategori from "../components/RincianKategori";
import PerbandinganMingguan from "../components/PerbandinganMingguan";
import { useTransaksi } from "../context/TransaksiContext";
import {
  filterBulan,
  hitungMingguan,
  hitungRincianKategori,
  hitungRingkasan,
  kunciBulanSekarang,
} from "../utils/laporan";
import { formatRupiah } from "../utils/format";

const formatSaldo = (angka: number): string =>
  (angka < 0 ? "-" : "") + formatRupiah(angka);

export default function Laporan() {
  const { daftar } = useTransaksi();
  const [bulan, setBulan] = useState<string>(kunciBulanSekarang());

  const dataBulan = useMemo(() => filterBulan(daftar, bulan), [daftar, bulan]);
  const ringkasan = useMemo(() => hitungRingkasan(dataBulan), [dataBulan]);
  const rincian = useMemo(() => hitungRincianKategori(dataBulan), [dataBulan]);
  const mingguan = useMemo(() => hitungMingguan(dataBulan), [dataBulan]);

  const kartu = [
    {
      label: "Total Pemasukan",
      nilai: formatRupiah(ringkasan.pemasukan),
      Ikon: ArrowDown,
      kelas: "bg-emerald-50 border-emerald-100",
      ikonKelas: "bg-emerald-200 text-emerald-600",
    },
    {
      label: "Total Pengeluaran",
      nilai: formatRupiah(ringkasan.pengeluaran),
      Ikon: ArrowUp,
      kelas: "bg-rose-100 border-rose-200",
      ikonKelas: "bg-rose-300 text-rose-900",
    },
    {
      label: "Saldo Bulan Ini",
      nilai: formatSaldo(ringkasan.saldo),
      Ikon: Wallet,
      kelas: "bg-violet-100 border-violet-200",
      ikonKelas: "bg-violet-300 text-[#2a1b66]",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-[#2a1b66]">Laporan</h1>
        <p className="mt-1 text-slate-500">
          Lihat ringkasan pemasukan dan pengeluaranmu setiap bulan.
        </p>
      </div>

      <PilihBulan bulan={bulan} onUbah={setBulan} />

      <div className="grid gap-4 md:grid-cols-3">
        {kartu.map(({ label, nilai, Ikon, kelas, ikonKelas }) => (
          <div
            key={label}
            className={`flex items-center gap-4 rounded-2xl border p-5 ${kelas}`}
          >
            <span
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${ikonKelas}`}
            >
              <Ikon size={22} strokeWidth={2.5} />
            </span>
            <div>
              <p className="text-sm font-medium text-slate-700">{label}</p>
              <p className="text-xl font-extrabold text-[#241552]">{nilai}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid items-start gap-5 xl:grid-cols-[1fr_1.1fr]">
        <RincianKategori rincian={rincian} total={ringkasan.pengeluaran} />
        <PerbandinganMingguan data={mingguan} />
      </div>
    </div>
  );
}
