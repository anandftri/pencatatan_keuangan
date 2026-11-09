import { useState } from "react";
import type { FormEvent } from "react";
import { Check, CalendarDays, Save, Plus, Minus } from "lucide-react";
import { useTransaksi } from "../context/TransaksiContext";
import { daftarKategori } from "../data/kategoriTransaksi";
import type { TipeTransaksi, TransaksiTersimpan } from "../types";

const MAKS_CATATAN = 100;

const hariIni = (): string => {
  const d = new Date();
  const bulan = String(d.getMonth() + 1).padStart(2, "0");
  const tgl = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${bulan}-${tgl}`;
};

interface FormTransaksiProps {
  onBerhasil: (transaksi: TransaksiTersimpan) => void;
}

export default function FormTransaksi({ onBerhasil }: FormTransaksiProps) {
  const { tambah } = useTransaksi();

  const [tipe, setTipe] = useState<TipeTransaksi>("pengeluaran");
  const [nominal, setNominal] = useState<string>("");
  const [kategori, setKategori] = useState<string>(
    daftarKategori("pengeluaran")[0].nama,
  );
  const [catatan, setCatatan] = useState<string>("");
  const [tanggal, setTanggal] = useState<string>(hariIni());
  const [galat, setGalat] = useState<string>("");

  const pilihTipe = (t: TipeTransaksi) => {
    setTipe(t);
    setKategori(daftarKategori(t)[0].nama);
    setGalat("");
  };

  // Hanya angka yang diterima, maksimal 12 digit
  const ubahNominal = (nilai: string) => {
    setNominal(nilai.replace(/\D/g, "").slice(0, 12));
  };

  const tampilNominal =
    nominal === "" ? "" : Number(nominal).toLocaleString("id-ID");

  const kirim = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const angka = Number(nominal);

    if (!angka || angka <= 0) {
      setGalat("Nominal harus lebih dari 0.");
      return;
    }
    if (!tanggal) {
      setGalat("Tanggal belum dipilih.");
      return;
    }

    const baru = tambah({
      tipe,
      nominal: angka,
      kategori,
      catatan: catatan.trim(),
      tanggal,
    });
    onBerhasil(baru);

    setNominal("");
    setCatatan("");
    setTanggal(hariIni());
    setGalat("");
    setKategori(daftarKategori(tipe)[0].nama);
  };

  const tombolTipe = (t: TipeTransaksi, label: string, Ikon: typeof Plus) => (
    <button
      type="button"
      onClick={() => pilihTipe(t)}
      className={`flex flex-1 items-center justify-center gap-2 rounded-full py-2.5 text-sm font-semibold transition-colors ${
        tipe === t ? "bg-[#6d4fd6] text-white" : "text-slate-600 hover:bg-white"
      }`}
    >
      <Ikon size={16} />
      {label}
    </button>
  );

  return (
    <form
      onSubmit={kirim}
      className="space-y-5 rounded-2xl border border-violet-100 bg-white p-6 shadow-sm"
    >
      <div>
        <h2 className="text-lg font-bold text-[#241552]">Tambah Transaksi</h2>
        <p className="text-sm text-slate-500">
          Catat pemasukan atau pengeluaranmu dengan mudah
        </p>
      </div>

      {/* Pilihan tipe */}
      <div className="flex gap-1.5 rounded-full bg-slate-100 p-1">
        {tombolTipe("pengeluaran", "Pengeluaran", Minus)}
        {tombolTipe("pemasukan", "Pemasukan", Plus)}
      </div>

      {/* Nominal */}
      <div>
        <label
          htmlFor="nominal"
          className="mb-1.5 block text-sm font-semibold text-[#241552]"
        >
          Nominal
        </label>
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus-within:border-[#6d4fd6]">
          <span className="rounded-md bg-violet-100 px-2 py-1 text-sm font-bold text-[#5b3fc4]">
            Rp
          </span>
          <input
            id="nominal"
            inputMode="numeric"
            placeholder="Masukkan nominal"
            value={tampilNominal}
            onChange={(e) => ubahNominal(e.target.value)}
            className="w-full bg-transparent text-base outline-none"
          />
        </div>
      </div>

      {/* Kategori */}
      <div>
        <p className="mb-1.5 text-sm font-semibold text-[#241552]">Kategori</p>
        <div className="grid grid-cols-4 gap-2.5">
          {daftarKategori(tipe).map(({ nama, ikon: Ikon, warna }) => {
            const aktif = kategori === nama;
            return (
              <button
                key={nama}
                type="button"
                onClick={() => setKategori(nama)}
                className={`relative flex flex-col items-center gap-1.5 rounded-xl border px-1 py-3 text-xs font-medium transition-colors ${
                  aktif
                    ? "border-[#6d4fd6] bg-violet-50"
                    : "border-transparent bg-slate-50 hover:bg-slate-100"
                }`}
              >
                {aktif && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#6d4fd6] text-white">
                    <Check size={12} strokeWidth={3} />
                  </span>
                )}
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${warna}`}
                >
                  <Ikon size={20} />
                </span>
                {nama}
              </button>
            );
          })}
        </div>
      </div>

      {/* Catatan */}
      <div>
        <label
          htmlFor="catatan"
          className="mb-1.5 block text-sm font-semibold text-[#241552]"
        >
          Catatan <span className="font-normal text-slate-500">(opsional)</span>
        </label>
        <textarea
          id="catatan"
          rows={3}
          maxLength={MAKS_CATATAN}
          placeholder={
            tipe === "pengeluaran"
              ? "Contoh: Makan siang di kantin"
              : "Tambahkan catatan jika perlu..."
          }
          value={catatan}
          onChange={(e) => setCatatan(e.target.value)}
          className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none focus:border-[#6d4fd6]"
        />
        <p className="text-right text-xs text-slate-500">
          {catatan.length}/{MAKS_CATATAN}
        </p>
      </div>

      {/* Tanggal */}
      <div>
        <label
          htmlFor="tanggal"
          className="mb-1.5 block text-sm font-semibold text-[#241552]"
        >
          Tanggal
        </label>
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 focus-within:border-[#6d4fd6]">
          <CalendarDays size={20} className="text-slate-500" />
          <input
            id="tanggal"
            type="date"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      {galat && (
        <p
          role="alert"
          className="rounded-lg bg-rose-50 px-3 py-2 text-sm font-medium text-rose-600"
        >
          {galat}
        </p>
      )}

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#6d4fd6] py-3 font-semibold text-white transition-colors hover:bg-[#5b3fc4]"
      >
        <Save size={18} />
        Simpan
      </button>
    </form>
  );
}
