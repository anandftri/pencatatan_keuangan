import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { Zap, Plus, FileText, Tag, Settings } from "lucide-react";

interface Aksi {
  nama: string;
  tujuan: string; // alamat halaman yang dibuka
  ikon: LucideIcon;
  kartu: string;
  ikonWarna: string;
  fokusForm?: boolean; // true = kursor langsung masuk ke formulir
}

const aksi: Aksi[] = [
  {
    nama: "Tambah Transaksi",
    tujuan: "/transaksi",
    ikon: Plus,
    kartu: "bg-violet-100 hover:bg-violet-200/70",
    ikonWarna: "text-white bg-[#6d4fd6] rounded-full p-0.5",
    fokusForm: true,
  },
  {
    nama: "Lihat Laporan",
    tujuan: "/laporan",
    ikon: FileText,
    kartu: "bg-blue-100 hover:bg-blue-200/70",
    ikonWarna: "text-blue-600",
  },
  {
    nama: "Kelola Kategori",
    tujuan: "/kategori",
    ikon: Tag,
    kartu: "bg-emerald-100 hover:bg-emerald-200/70",
    ikonWarna: "text-emerald-600",
  },
  {
    nama: "Pengaturan",
    tujuan: "/pengaturan",
    ikon: Settings,
    kartu: "bg-orange-100 hover:bg-orange-200/70",
    ikonWarna: "text-orange-500",
  },
];

export default function QuickActions() {
  return (
    <section className="rounded-2xl border border-violet-100 bg-white p-4 shadow-sm sm:p-6">
      <h2 className="mb-4 flex items-center gap-3 text-lg font-bold text-[#241552]">
        <Zap size={22} /> Aksi Cepat
      </h2>

      {/* HP: 2 kolom, tablet/laptop kecil: 4 sejajar, layar lebar (kolom sempit): 2 kolom */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-2">
        {aksi.map(
          ({ nama, tujuan, ikon: Ikon, kartu, ikonWarna, fokusForm }) => (
            <Link
              key={nama}
              to={tujuan}
              state={fokusForm ? { fokusForm: true } : undefined}
              className={`flex min-h-[96px] flex-col items-center justify-center gap-2 rounded-xl px-2 py-4 text-center text-sm font-medium leading-tight text-[#241552] transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6d4fd6] sm:min-h-[104px] ${kartu}`}
            >
              <Ikon size={26} className={ikonWarna} />
              {nama}
            </Link>
          ),
        )}
      </div>
    </section>
  );
}
