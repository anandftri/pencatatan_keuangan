import { CalendarDays, Mail, Pencil } from "lucide-react";
import ModalDasar from "./ModalDasar";
import AvatarUser from "./AvatarUser";
import { formatTanggalPendek } from "../utils/pengguna";
import type { Pengguna } from "../types";

interface DetailPenggunaProps {
  pengguna: Pengguna;
  onTutup: () => void;
  onUbah: () => void;
}

export default function DetailPengguna({
  pengguna,
  onTutup,
  onUbah,
}: DetailPenggunaProps) {
  return (
    <ModalDasar judul="Detail User" onTutup={onTutup}>
      <div className="flex flex-col items-center gap-2 text-center">
        <AvatarUser nama={pengguna.nama} ukuran={80} />
        <p className="text-xl font-extrabold text-[#241552]">{pengguna.nama}</p>
      </div>

      <div className="mt-5 space-y-3 rounded-2xl bg-slate-50 p-4 text-sm">
        <div className="flex items-center gap-3">
          <Mail size={18} className="shrink-0 text-slate-400" />
          <span className="break-all font-medium">{pengguna.email}</span>
        </div>
        <div className="flex items-center gap-3">
          <CalendarDays size={18} className="shrink-0 text-slate-400" />
          <span className="font-medium">
            Dibuat {formatTanggalPendek(pengguna.dibuat)}
          </span>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={onTutup}
          className="flex-1 rounded-xl bg-slate-100 py-2.5 font-semibold text-slate-600 transition-colors hover:bg-slate-200"
        >
          Tutup
        </button>
        <button
          onClick={onUbah}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#6d4fd6] py-2.5 font-semibold text-white transition-colors hover:bg-[#5b3fc4]"
        >
          <Pencil size={16} />
          Ubah
        </button>
      </div>
    </ModalDasar>
  );
}
