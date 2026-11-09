import { useState } from "react";
import { Pencil, Check, X, Trash2, Plus } from "lucide-react";
import type { OpsiKategori } from "../types";
import { formatRupiah } from "../utils/format";

interface KartuKategoriProps {
  kategori: OpsiKategori;
  total: number;
  jumlahTransaksi: number;
  persen: number; // porsi dari total semua kategori di tab ini
  batas?: number;
  bisaAturBatas: boolean; // hanya untuk pengeluaran
  onSimpanBatas: (nilai: number | null) => void;
}

export default function KartuKategori({
  kategori,
  total,
  jumlahTransaksi,
  persen,
  batas,
  bisaAturBatas,
  onSimpanBatas,
}: KartuKategoriProps) {
  const { nama, ikon: Ikon, warna } = kategori;
  const [mengubah, setMengubah] = useState<boolean>(false);
  const [isian, setIsian] = useState<string>("");

  const mulaiUbah = () => {
    setIsian(batas ? String(batas) : "");
    setMengubah(true);
  };

  const simpan = () => {
    const angka = Number(isian);
    onSimpanBatas(angka > 0 ? angka : null);
    setMengubah(false);
  };

  const rasio = batas ? total / batas : 0;
  const warnaBar =
    rasio > 1
      ? "bg-rose-500"
      : rasio >= 0.8
        ? "bg-amber-500"
        : "bg-emerald-500";
  const lebarBar = Math.min(rasio, 1) * 100;

  const tampilIsian = isian === "" ? "" : Number(isian).toLocaleString("id-ID");

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-violet-100 bg-white p-5 shadow-sm">
      {/* Kepala kartu */}
      <div className="flex items-center gap-3">
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${warna}`}
        >
          <Ikon size={22} />
        </span>
        <div className="flex-1">
          <p className="font-semibold text-[#241552]">{nama}</p>
          <p className="text-sm text-slate-500">{jumlahTransaksi} transaksi</p>
        </div>
      </div>

      <p className="text-2xl font-extrabold text-[#241552]">
        {formatRupiah(total)}
      </p>

      {/* Bagian bawah kartu */}
      {!bisaAturBatas ? (
        <div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-[#6d4fd6]"
              style={{ width: `${persen}%` }}
            />
          </div>
          <p className="mt-1.5 text-xs text-slate-500">
            {persen}% dari total pemasukan
          </p>
        </div>
      ) : mengubah ? (
        <div className="space-y-2">
          <label
            htmlFor={`batas-${nama}`}
            className="text-xs font-medium text-slate-600"
          >
            Batas bulanan
          </label>
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 focus-within:border-[#6d4fd6]">
            <span className="text-sm font-bold text-[#5b3fc4]">Rp</span>
            <input
              id={`batas-${nama}`}
              autoFocus
              inputMode="numeric"
              placeholder="Contoh: 500.000"
              value={tampilIsian}
              onChange={(e) =>
                setIsian(e.target.value.replace(/\D/g, "").slice(0, 12))
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") simpan();
                if (e.key === "Escape") setMengubah(false);
              }}
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={simpan}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#6d4fd6] py-2 text-sm font-semibold text-white hover:bg-[#5b3fc4]"
            >
              <Check size={16} /> Simpan
            </button>
            <button
              onClick={() => setMengubah(false)}
              className="flex items-center justify-center gap-1.5 rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200"
            >
              <X size={16} /> Batal
            </button>
          </div>
        </div>
      ) : batas ? (
        <div>
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="text-slate-500">Batas {formatRupiah(batas)}</span>
            <span className="font-medium text-slate-600">
              {Math.round(rasio * 100)}%
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full ${warnaBar}`}
              style={{ width: `${lebarBar}%` }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between">
            <p
              className={`text-sm font-medium ${rasio > 1 ? "text-rose-600" : "text-slate-600"}`}
            >
              {rasio > 1
                ? `Melebihi ${formatRupiah(total - batas)}`
                : `Sisa ${formatRupiah(batas - total)}`}
            </p>
            <div className="flex gap-1">
              <button
                onClick={mulaiUbah}
                aria-label={`Ubah batas ${nama}`}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-violet-50 hover:text-[#5b3fc4]"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={() => onSimpanBatas(null)}
                aria-label={`Hapus batas ${nama}`}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-500"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={mulaiUbah}
          className="flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-violet-200 py-2.5 text-sm font-medium text-[#5b3fc4] hover:bg-violet-50"
        >
          <Plus size={16} /> Atur batas bulanan
        </button>
      )}
    </div>
  );
}
