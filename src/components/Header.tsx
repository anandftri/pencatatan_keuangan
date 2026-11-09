import { CalendarDays, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { useProfil } from "../context/ProfilContext";

export default function Header() {
  const { profil } = useProfil();

  const tanggal = new Date().toLocaleDateString("id-ID", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <header className="flex items-start justify-between">
      <div>
        <h1 className="text-3xl font-extrabold text-[#2a1b66]">
          Halo, {profil.nama}! 👋
        </h1>
        <p className="mt-1 text-slate-500">Yuk, pantau keuanganmu hari ini!</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-3 rounded-full bg-white px-5 py-2.5 text-sm font-medium shadow-sm">
          <CalendarDays size={20} />
          {tanggal}
        </div>
        <Link
          to="/pengaturan"
          aria-label="Buka pengaturan profil"
          className="flex items-center gap-1.5"
        >
          <Avatar
            nama={profil.nama}
            warna={profil.warna}
            foto={profil.foto}
            ukuran={44}
          />
          <ChevronDown size={16} />
        </Link>
      </div>
    </header>
  );
}
