import {
  Utensils,
  Bus,
  GraduationCap,
  ShoppingBag,
  Gamepad2,
  House,
  HeartPulse,
  Ellipsis,
  Wallet,
  Briefcase,
  Gift,
} from "lucide-react";
import type { OpsiKategori, TipeTransaksi } from "../types";

export const kategoriPengeluaran: OpsiKategori[] = [
  { nama: "Makanan", ikon: Utensils, warna: "bg-orange-100 text-orange-500" },
  { nama: "Transportasi", ikon: Bus, warna: "bg-blue-100 text-blue-600" },
  {
    nama: "Pendidikan",
    ikon: GraduationCap,
    warna: "bg-violet-100 text-violet-600",
  },
  { nama: "Belanja", ikon: ShoppingBag, warna: "bg-rose-100 text-rose-500" },
  { nama: "Hiburan", ikon: Gamepad2, warna: "bg-amber-100 text-amber-600" },
  { nama: "Kebutuhan", ikon: House, warna: "bg-teal-100 text-teal-600" },
  { nama: "Kesehatan", ikon: HeartPulse, warna: "bg-red-100 text-red-500" },
  { nama: "Lainnya", ikon: Ellipsis, warna: "bg-slate-100 text-slate-500" },
];

export const kategoriPemasukan: OpsiKategori[] = [
  { nama: "Uang Saku", ikon: Wallet, warna: "bg-emerald-100 text-emerald-600" },
  { nama: "Beasiswa", ikon: GraduationCap, warna: "bg-blue-100 text-blue-600" },
  { nama: "Gaji", ikon: Briefcase, warna: "bg-violet-100 text-violet-600" },
  { nama: "Hadiah", ikon: Gift, warna: "bg-rose-100 text-rose-500" },
  { nama: "Lainnya", ikon: Ellipsis, warna: "bg-slate-100 text-slate-500" },
];

export const daftarKategori = (tipe: TipeTransaksi): OpsiKategori[] =>
  tipe === "pengeluaran" ? kategoriPengeluaran : kategoriPemasukan;

// Mencari ikon dan warna dari nama kategori (dipakai di riwayat).
export const cariKategori = (
  tipe: TipeTransaksi,
  nama: string,
): OpsiKategori => {
  const daftar = daftarKategori(tipe);
  return daftar.find((k) => k.nama === nama) ?? daftar[daftar.length - 1];
};
