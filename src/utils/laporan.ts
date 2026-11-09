import type { TransaksiTersimpan } from "../types";

export interface RingkasanBulan {
  pemasukan: number;
  pengeluaran: number;
  saldo: number;
}

export interface ItemRincian {
  nama: string;
  total: number;
  persen: number;
}

export interface DataMingguan {
  label: string;
  pemasukan: number;
  pengeluaran: number;
}

// Kunci bulan berformat "YYYY-MM", misalnya "2026-11"
const buatKunci = (tahun: number, bulanIndeks: number): string => {
  const d = new Date(tahun, bulanIndeks, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
};

export const kunciBulanSekarang = (): string => {
  const d = new Date();
  return buatKunci(d.getFullYear(), d.getMonth());
};

export const geserBulan = (kunci: string, selisih: number): string => {
  const [tahun, bulan] = kunci.split("-").map(Number);
  return buatKunci(tahun, bulan - 1 + selisih);
};

export const namaBulan = (kunci: string): string => {
  const [tahun, bulan] = kunci.split("-").map(Number);
  return new Date(tahun, bulan - 1, 1).toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
  });
};

export const filterBulan = (
  daftar: TransaksiTersimpan[],
  kunci: string,
): TransaksiTersimpan[] =>
  daftar.filter((t) => t.tanggal.slice(0, 7) === kunci);

export const hitungRingkasan = (
  daftar: TransaksiTersimpan[],
): RingkasanBulan => {
  let pemasukan = 0;
  let pengeluaran = 0;
  for (const t of daftar) {
    if (t.tipe === "pemasukan") pemasukan += t.nominal;
    else pengeluaran += t.nominal;
  }
  return { pemasukan, pengeluaran, saldo: pemasukan - pengeluaran };
};

// Rincian pengeluaran per kategori, diurutkan dari yang terbesar
export const hitungRincianKategori = (
  daftar: TransaksiTersimpan[],
): ItemRincian[] => {
  const peta = new Map<string, number>();
  let total = 0;

  for (const t of daftar) {
    if (t.tipe !== "pengeluaran") continue;
    peta.set(t.kategori, (peta.get(t.kategori) ?? 0) + t.nominal);
    total += t.nominal;
  }

  return Array.from(peta.entries())
    .map(([nama, jumlah]) => ({
      nama,
      total: jumlah,
      persen: total > 0 ? Math.round((jumlah / total) * 100) : 0,
    }))
    .sort((a, b) => b.total - a.total);
};

// Minggu 1 = tanggal 1-7, Minggu 2 = 8-14, Minggu 3 = 15-21, Minggu 4 = 22 sampai akhir bulan
export const hitungMingguan = (
  daftar: TransaksiTersimpan[],
): DataMingguan[] => {
  const minggu: DataMingguan[] = [1, 2, 3, 4].map((n) => ({
    label: `Minggu ${n}`,
    pemasukan: 0,
    pengeluaran: 0,
  }));

  for (const t of daftar) {
    const hari = Number(t.tanggal.slice(8, 10));
    const indeks = Math.min(Math.floor((hari - 1) / 7), 3);
    if (t.tipe === "pemasukan") minggu[indeks].pemasukan += t.nominal;
    else minggu[indeks].pengeluaran += t.nominal;
  }

  return minggu;
};

// Warna grafik (kode hex) untuk tiap kategori pengeluaran
const warnaGrafik: Record<string, string> = {
  Makanan: "#f97316",
  Transportasi: "#3b82f6",
  Pendidikan: "#8b5cf6",
  Belanja: "#f43f5e",
  Hiburan: "#f59e0b",
  Kebutuhan: "#14b8a6",
  Kesehatan: "#ef4444",
  Lainnya: "#94a3b8",
};

export const warnaKategoriGrafik = (nama: string): string =>
  warnaGrafik[nama] ?? "#94a3b8";
