import {
  Wallet,
  ArrowDown,
  ArrowUp,
  Utensils,
  Bus,
  ShoppingBag,
} from "lucide-react";
import type { Stat, TitikGrafik, Kategori, Transaksi } from "../types";

export const stats: Stat[] = [
  {
    id: "saldo",
    judul: "Saldo Saat Ini",
    nilai: 2750000,
    catatan: "+Rp250.000",
    keterangan: "dari bulan lalu",
    warna: "ungu",
    ikon: Wallet,
  },
  {
    id: "pemasukan",
    judul: "Total Pemasukan",
    nilai: 4000000,
    catatan: "+12%",
    warna: "hijau",
    ikon: ArrowDown,
  },
  {
    id: "pengeluaran",
    judul: "Total Pengeluaran",
    nilai: 1250000,
    catatan: "+5%",
    warna: "merah",
    ikon: ArrowUp,
  },
];

// Data grafik contoh (nanti ganti dengan data dari API / database)
export const buatDataGrafik = (hari: number): TitikGrafik[] => {
  const titik = hari === 7 ? 7 : hari === 30 ? 30 : 13;
  return Array.from({ length: titik }, (_, i) => {
    const t = i / (titik - 1);
    return {
      label:
        hari === 90
          ? `Minggu ${i + 1}`
          : `${Math.round(1 + t * (hari - 1))} Nov`,
      pemasukan: 1700000 + t * 1800000 + Math.sin(i * 1.3) * 350000,
      pengeluaran: 600000 + t * 900000 + Math.sin(i * 1.7) * 200000,
    };
  });
};

export const kategori: Kategori[] = [
  { nama: "Makan & Minum", persen: 35, warna: "#f8789a" },
  { nama: "Transportasi", persen: 25, warna: "#fdb05c" },
  { nama: "Belanja", persen: 20, warna: "#7fc4fb" },
  { nama: "Lainnya", persen: 20, warna: "#a98af0" },
];

export const transaksi: Transaksi[] = [
  {
    id: 1,
    judul: "Makan siang di cafe",
    tanggal: "10 Nov 2025",
    kategori: "Makan & Minum",
    jumlah: -45000,
    ikon: Utensils,
    warna: "bg-orange-100 text-orange-500",
  },
  {
    id: 2,
    judul: "Top up e-money",
    tanggal: "10 Nov 2025",
    kategori: "Transportasi",
    jumlah: -100000,
    ikon: Bus,
    warna: "bg-blue-100 text-blue-600",
  },
  {
    id: 3,
    judul: "Belanja kebutuhan",
    tanggal: "9 Nov 2025",
    kategori: "Belanja",
    jumlah: -75000,
    ikon: ShoppingBag,
    warna: "bg-orange-100 text-orange-500",
  },
  {
    id: 4,
    judul: "Uang saku",
    tanggal: "8 Nov 2025",
    kategori: "Pemasukan",
    jumlah: 500000,
    ikon: Wallet,
    warna: "bg-emerald-100 text-emerald-600",
  },
];
