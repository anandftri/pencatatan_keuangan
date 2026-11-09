import { NavLink } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  Wallet,
  House,
  LayoutDashboard,
  ListChecks,
  ChartColumn,
  Tag,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

interface ItemMenu {
  nama: string;
  ikon: LucideIcon;
  path: string;
}

const menu: ItemMenu[] = [
  { nama: "Beranda", ikon: House, path: "/" },
  { nama: "Dashboard", ikon: LayoutDashboard, path: "/dashboard" },
  { nama: "Transaksi", ikon: ListChecks, path: "/transaksi" },
  { nama: "Laporan", ikon: ChartColumn, path: "/laporan" },
  { nama: "Kategori", ikon: Tag, path: "/kategori" },
  { nama: "Users", ikon: Users, path: "/users" },
  { nama: "Pengaturan", ikon: Settings, path: "/pengaturan" },
];

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex w-60 shrink-0 flex-col rounded-r-[28px] bg-gradient-to-b from-[#3d2c7a] to-[#54409b] px-3.5 py-8 text-white">
      {/* Logo */}
      <div className="mb-10 flex flex-col items-center">
        <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-300/90 text-[#3d2c7a]">
          <Wallet size={30} />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">FinTrack</h1>
        <p className="text-sm text-violet-200">Catat. Atur. Kelola.</p>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-1.5">
        {menu.map(({ nama, ikon: Ikon, path }) => (
          <NavLink
            key={nama}
            to={path}
            end={path === "/"}
            className={({ isActive }) =>
              `flex items-center gap-4 rounded-xl px-4 py-3 text-[15px] font-medium transition-colors ${
                isActive
                  ? "bg-violet-400/40"
                  : "text-violet-100 hover:bg-white/10"
              }`
            }
          >
            <Ikon size={22} />
            {nama}
          </NavLink>
        ))}
      </nav>

      <hr className="mx-4 my-8 border-white/15" />

      <button className="flex items-center gap-4 rounded-xl px-4 py-3 text-[15px] font-medium text-violet-100 hover:bg-white/10">
        <LogOut size={22} />
        Keluar
      </button>
    </aside>
  );
}
