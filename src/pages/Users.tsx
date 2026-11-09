import { useState } from "react";
import { Plus, Users as UsersIcon } from "lucide-react";
import DetailPengguna from "../components/DetailPengguna";
import FormPengguna from "../components/FormPengguna";
import Paginasi from "../components/Paginasi";
import TabelPengguna from "../components/TabelPengguna";
import { usePengguna } from "../hooks/usePengguna";
import type { DataPengguna, Pengguna, RegistrasiPengguna } from "../types";

export default function Users() {
  const {
    daftar,
    halaman,
    perHalaman,
    total,
    totalHalaman,
    loading,
    menyimpan,
    error,
    aturHalaman,
    aturPerHalaman,
    tambah,
    ubah,
    hapus,
  } = usePengguna();
  const [formTerbuka, setFormTerbuka] = useState(false);
  const [pilihan, setPilihan] = useState<Pengguna | null>(null);
  const [detail, setDetail] = useState<Pengguna | null>(null);

  const simpan = async (data: DataPengguna | RegistrasiPengguna) => {
    const berhasil = pilihan
      ? await ubah(pilihan.id, data)
      : "password" in data
        ? await tambah(data)
        : false;
    if (berhasil) {
      setFormTerbuka(false);
      setPilihan(null);
    }
  };

  const hapusDariDaftar = async (pengguna: Pengguna) => {
    if (window.confirm(`Hapus pengguna ${pengguna.nama}?`)) {
      await hapus(pengguna);
    }
  };

  const mulaiUbah = (pengguna: Pengguna) => {
    setDetail(null);
    setPilihan(pengguna);
    setFormTerbuka(true);
  };

  const nomorAwal = (halaman - 1) * perHalaman;
  const dari = total === 0 ? 0 : nomorAwal + 1;
  const sampai = Math.min(nomorAwal + daftar.length, total);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-[#2a1b66]">Pengguna</h1>
          <p className="mt-1 text-slate-500">
            Kelola akun pengguna yang tersimpan di backend.
          </p>
        </div>
        <button
          onClick={() => {
            setPilihan(null);
            setFormTerbuka(true);
          }}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#6d4fd6] px-4 py-2.5 font-semibold text-white transition-colors hover:bg-[#5b3fc4]"
        >
          <Plus size={18} />
          Tambah Pengguna
        </button>
      </div>

      {error && !formTerbuka && (
        <p
          role="alert"
          className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600"
        >
          {error}
        </p>
      )}

      <section className="rounded-2xl border border-violet-100 bg-white p-4 shadow-sm sm:p-6">
        {loading && daftar.length === 0 ? (
          <p className="py-10 text-center text-slate-500">
            Memuat data pengguna...
          </p>
        ) : daftar.length > 0 ? (
          <>
            <TabelPengguna
              data={daftar}
              nomorAwal={nomorAwal}
              onLihat={setDetail}
              onUbah={mulaiUbah}
              onHapus={hapusDariDaftar}
            />
            <Paginasi
              halaman={halaman}
              totalHalaman={Math.max(totalHalaman, 1)}
              perHalaman={perHalaman}
              dari={dari}
              sampai={sampai}
              total={total}
              onHalaman={aturHalaman}
              onPerHalaman={aturPerHalaman}
            />
          </>
        ) : loading ? (
          <p className="py-10 text-center text-slate-500">
            Memuat data pengguna...
          </p>
        ) : error ? (
          <div className="py-10 text-center">
            <p className="font-semibold text-slate-700">
              Data pengguna tidak dapat dimuat.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-3 text-sm font-semibold text-[#5b3fc4] underline"
            >
              Muat ulang halaman
            </button>
          </div>
        ) : (
          <div className="py-10 text-center">
            <UsersIcon className="mx-auto text-slate-300" size={40} />
            <p className="mt-3 font-semibold text-slate-700">
              Belum ada pengguna
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Tambahkan pengguna untuk mulai mengelola akun.
            </p>
          </div>
        )}
      </section>

      {formTerbuka && (
        <FormPengguna
          awal={pilihan ?? undefined}
          error={error}
          menyimpan={menyimpan}
          onSimpan={simpan}
          onTutup={() => {
            setFormTerbuka(false);
            setPilihan(null);
          }}
        />
      )}

      {detail && (
        <DetailPengguna
          pengguna={detail}
          onTutup={() => setDetail(null)}
          onUbah={() => mulaiUbah(detail)}
        />
      )}
    </div>
  );
}
