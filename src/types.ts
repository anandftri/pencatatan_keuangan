import type { LucideIcon } from "lucide-react";

export type WarnaStat = "ungu" | "hijau" | "merah";

export interface Stat {
  id: string;
  judul: string;
  nilai: number;
  catatan: string;
  keterangan?: string;
  warna: WarnaStat;
  ikon: LucideIcon;
}

export interface TitikGrafik {
  label: string;
  pemasukan: number;
  pengeluaran: number;
}

export interface Kategori {
  nama: string;
  persen: number;
  warna: string;
}

export interface Transaksi {
  id: number;
  judul: string;
  tanggal: string;
  kategori: string;
  jumlah: number; // negatif = pengeluaran, positif = pemasukan
  ikon: LucideIcon;
  warna: string;
}

export type TipeTransaksi = "pengeluaran" | "pemasukan";

export interface TransaksiTersimpan {
  id: string;
  tipe: TipeTransaksi;
  nominal: number;
  kategori: string; // nama kategori, misalnya "Makanan"
  catatan: string;
  tanggal: string; // format "YYYY-MM-DD"
}

export interface OpsiKategori {
  nama: string;
  ikon: LucideIcon;
  warna: string; // kelas Tailwind untuk warna ikon
}

export interface Pengguna {
  id: string;
  nama: string;
  email: string;
  dibuat: string; // format "YYYY-MM-DD"
}

export type DataPengguna = Pick<Pengguna, "nama" | "email">;
export interface RegistrasiPengguna extends DataPengguna {
  password: string;
}
