import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Camera, Check, Save, Trash2 } from "lucide-react";
import Avatar from "../components/Avatar";
import { useProfil } from "../context/ProfilContext";
import { warnaAvatar } from "../data/warnaAvatar";

const MAKS_NAMA = 30;
const MAKS_UKURAN_FOTO = 5 * 1024 * 1024; // 5 MB
const SISI_FOTO = 256; // foto dikecilkan jadi 256 x 256 piksel

export default function Pengaturan() {
  const { profil, simpan } = useProfil();

  const [nama, setNama] = useState<string>(profil.nama);
  const [warna, setWarna] = useState<string>(profil.warna);
  const [foto, setFoto] = useState<string | null>(profil.foto);
  const [galat, setGalat] = useState<string>("");
  const [berhasil, setBerhasil] = useState<boolean>(false);
  const inputFoto = useRef<HTMLInputElement>(null);

  const berubah =
    nama.trim() !== profil.nama ||
    warna !== profil.warna ||
    foto !== profil.foto;

  const tandaiBerubah = () => {
    setBerhasil(false);
    setGalat("");
  };

  const pilihFoto = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // supaya file yang sama bisa dipilih lagi
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setGalat("File harus berupa gambar.");
      return;
    }
    if (file.size > MAKS_UKURAN_FOTO) {
      setGalat("Ukuran foto maksimal 5 MB.");
      return;
    }

    const alamat = URL.createObjectURL(file);
    const gambar = new Image();

    gambar.onload = () => {
      const kanvas = document.createElement("canvas");
      kanvas.width = SISI_FOTO;
      kanvas.height = SISI_FOTO;
      const ctx = kanvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(alamat);
        setGalat("Foto tidak bisa diproses di browser ini.");
        return;
      }
      // Potong bagian tengah menjadi persegi
      const sisi = Math.min(gambar.width, gambar.height);
      const sx = (gambar.width - sisi) / 2;
      const sy = (gambar.height - sisi) / 2;
      ctx.drawImage(gambar, sx, sy, sisi, sisi, 0, 0, SISI_FOTO, SISI_FOTO);

      setFoto(kanvas.toDataURL("image/jpeg", 0.85));
      URL.revokeObjectURL(alamat);
      tandaiBerubah();
    };

    gambar.onerror = () => {
      URL.revokeObjectURL(alamat);
      setGalat("Foto tidak bisa dibaca. Coba file lain.");
    };

    gambar.src = alamat;
  };

  const kirim = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const bersih = nama.trim();
    if (!bersih) {
      setGalat("Nama tidak boleh kosong.");
      return;
    }
    simpan({ nama: bersih, warna, foto });
    setNama(bersih);
    setGalat("");
    setBerhasil(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-[#2a1b66]">Pengaturan</h1>
        <p className="mt-1 text-slate-500">Ubah nama dan tampilan profilmu.</p>
      </div>

      <form
        onSubmit={kirim}
        className="max-w-2xl space-y-6 rounded-2xl border border-violet-100 bg-white p-6 shadow-sm"
      >
        <h2 className="text-lg font-bold text-[#241552]">Profil</h2>

        {/* Foto */}
        <div className="flex flex-wrap items-center gap-5">
          <Avatar nama={nama} warna={warna} foto={foto} ukuran={96} />
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => inputFoto.current?.click()}
                className="flex items-center gap-2 rounded-xl bg-violet-100 px-4 py-2 text-sm font-semibold text-[#5b3fc4] transition-colors hover:bg-violet-200"
              >
                <Camera size={16} />
                {foto ? "Ganti foto" : "Unggah foto"}
              </button>
              {foto && (
                <button
                  type="button"
                  onClick={() => {
                    setFoto(null);
                    tandaiBerubah();
                  }}
                  className="flex items-center gap-2 rounded-xl bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-600 transition-colors hover:bg-rose-100"
                >
                  <Trash2 size={16} />
                  Hapus foto
                </button>
              )}
            </div>
            <p className="text-xs text-slate-500">
              JPG, PNG, atau WebP. Maksimal 5 MB.
            </p>
            <input
              ref={inputFoto}
              type="file"
              accept="image/*"
              onChange={pilihFoto}
              className="hidden"
            />
          </div>
        </div>

        {/* Nama */}
        <div>
          <label
            htmlFor="nama"
            className="mb-1.5 block text-sm font-semibold text-[#241552]"
          >
            Nama
          </label>
          <input
            id="nama"
            type="text"
            maxLength={MAKS_NAMA}
            value={nama}
            onChange={(e) => {
              setNama(e.target.value);
              tandaiBerubah();
            }}
            placeholder="Masukkan namamu"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 outline-none focus:border-[#6d4fd6]"
          />
          <p className="mt-1 text-right text-xs text-slate-500">
            {nama.length}/{MAKS_NAMA}
          </p>
        </div>

        {/* Warna avatar */}
        <div>
          <p className="mb-1.5 text-sm font-semibold text-[#241552]">
            Warna avatar
          </p>
          <div className="flex flex-wrap gap-3">
            {warnaAvatar.map((w) => {
              const aktif = warna === w.nama;
              return (
                <button
                  key={w.nama}
                  type="button"
                  aria-label={`Warna ${w.nama}`}
                  aria-pressed={aktif}
                  onClick={() => {
                    setWarna(w.nama);
                    tandaiBerubah();
                  }}
                  className={`flex h-10 w-10 items-center justify-center rounded-full transition-transform hover:scale-105 ${w.kelas} ${
                    aktif ? "ring-2 ring-[#6d4fd6] ring-offset-2" : ""
                  }`}
                >
                  {aktif && <Check size={18} strokeWidth={3} />}
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Warna dipakai kalau kamu tidak memasang foto.
          </p>
        </div>

        {galat && (
          <p
            role="alert"
            className="rounded-lg bg-rose-50 px-3 py-2 text-sm font-medium text-rose-600"
          >
            {galat}
          </p>
        )}
        {berhasil && (
          <p
            role="status"
            className="rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700"
          >
            Profil berhasil disimpan.
          </p>
        )}

        <button
          type="submit"
          disabled={!berubah}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#6d4fd6] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#5b3fc4] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Save size={18} />
          Simpan perubahan
        </button>
      </form>
    </div>
  );
}
