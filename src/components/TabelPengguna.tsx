import { CalendarDays, Eye, Mail, Pencil, Trash2 } from "lucide-react";
import AvatarUser from "./AvatarUser";
import { formatTanggalPendek } from "../utils/pengguna";
import type { Pengguna } from "../types";

interface TabelPenggunaProps {
  data: Pengguna[];
  nomorAwal: number; // nomor urut baris pertama di halaman ini
  onLihat: (pengguna: Pengguna) => void;
  onUbah: (pengguna: Pengguna) => void;
  onHapus: (pengguna: Pengguna) => void;
}

export default function TabelPengguna({
  data,
  nomorAwal,
  onLihat,
  onUbah,
  onHapus,
}: TabelPenggunaProps) {
  return (
    <div className="overflow-x-auto rounded-xl">
      <table className="w-full text-left text-sm">
        <thead className="bg-violet-50 text-slate-600">
          <tr>
            <th className="hidden px-4 py-3 font-semibold sm:table-cell">
              No.
            </th>
            <th className="px-4 py-3 font-semibold">User</th>
            <th className="hidden px-4 py-3 font-semibold md:table-cell">
              Email
            </th>
            <th className="hidden px-4 py-3 font-semibold lg:table-cell">
              Dibuat
            </th>
            <th className="px-4 py-3 text-right font-semibold">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((p, i) => (
            <tr key={p.id} className="border-t border-slate-100">
              <td className="hidden px-4 py-3 text-slate-600 sm:table-cell">
                {nomorAwal + i + 1}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <AvatarUser nama={p.nama} />
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-[#241552]">
                      {p.nama}
                    </p>
                    <p className="truncate text-xs text-slate-500 md:hidden">
                      {p.email}
                    </p>
                  </div>
                </div>
              </td>
              <td className="hidden px-4 py-3 md:table-cell">
                <span className="flex items-center gap-2 text-slate-700">
                  <Mail size={16} className="shrink-0 text-slate-400" />
                  {p.email}
                </span>
              </td>
              <td className="hidden px-4 py-3 lg:table-cell">
                <span className="flex items-center gap-2 whitespace-nowrap text-slate-700">
                  <CalendarDays size={16} className="shrink-0 text-slate-400" />
                  {formatTanggalPendek(p.dibuat)}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onLihat(p)}
                    aria-label={`Lihat ${p.nama}`}
                    className="rounded-lg bg-sky-50 p-2 text-sky-600 transition-colors hover:bg-sky-100"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => onUbah(p)}
                    aria-label={`Ubah ${p.nama}`}
                    className="rounded-lg bg-violet-50 p-2 text-[#5b3fc4] transition-colors hover:bg-violet-100"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => onHapus(p)}
                    aria-label={`Hapus ${p.nama}`}
                    className="rounded-lg bg-rose-50 p-2 text-rose-500 transition-colors hover:bg-rose-100"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
