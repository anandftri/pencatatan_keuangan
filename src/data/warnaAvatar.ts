export interface OpsiWarnaAvatar {
  nama: string;
  kelas: string; // kelas Tailwind untuk latar dan huruf
}

export const warnaAvatar: OpsiWarnaAvatar[] = [
  { nama: "Ungu", kelas: "bg-violet-200 text-[#3d2c7a]" },
  { nama: "Pink", kelas: "bg-rose-200 text-rose-800" },
  { nama: "Hijau", kelas: "bg-emerald-200 text-emerald-800" },
  { nama: "Biru", kelas: "bg-sky-200 text-sky-800" },
  { nama: "Kuning", kelas: "bg-amber-200 text-amber-800" },
  { nama: "Abu-abu", kelas: "bg-slate-300 text-slate-800" },
];

export const cariWarnaAvatar = (nama: string): string =>
  (warnaAvatar.find((w) => w.nama === nama) ?? warnaAvatar[0]).kelas;
