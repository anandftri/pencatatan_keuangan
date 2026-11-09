import { warnaAvatar } from "../data/warnaAvatar";

export const hariIniIso = (): string => {
  const d = new Date();
  const bulan = String(d.getMonth() + 1).padStart(2, "0");
  const tgl = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${bulan}-${tgl}`;
};

export const formatTanggalPendek = (iso: string): string =>
  new Date(iso + "T00:00:00").toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

// Dua huruf awal nama, misalnya "John Doe" menjadi "JD"
export const inisial = (nama: string): string => {
  const kata = nama.trim().split(/\s+/).filter(Boolean);
  if (kata.length === 0) return "?";
  if (kata.length === 1) return kata[0].charAt(0).toUpperCase();
  return (kata[0].charAt(0) + kata[kata.length - 1].charAt(0)).toUpperCase();
};

// Warna avatar dipilih dari nama, jadi tiap orang selalu mendapat warna yang sama
export const warnaDariNama = (nama: string): string => {
  let hash = 0;
  for (const huruf of nama) hash = (hash * 31 + huruf.charCodeAt(0)) % 1000;
  return warnaAvatar[hash % warnaAvatar.length].nama;
};

export const emailValid = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
