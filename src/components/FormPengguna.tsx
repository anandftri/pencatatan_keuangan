import { useState } from "react";
import type { FormEvent } from "react";
import { Save } from "lucide-react";
import ModalDasar from "./ModalDasar";
import { emailValid } from "../utils/pengguna";
import type { DataPengguna, Pengguna, RegistrasiPengguna } from "../types";

const kelasInput =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-[#6d4fd6]";

interface FormPenggunaProps {
  awal?: Pengguna;
  error?: string;
  menyimpan?: boolean;
  onSimpan: (data: DataPengguna | RegistrasiPengguna) => void;
  onTutup: () => void;
}

export default function FormPengguna({
  awal,
  error,
  menyimpan = false,
  onSimpan,
  onTutup,
}: FormPenggunaProps) {
  const [nama, setNama] = useState<string>(awal?.nama ?? "");
  const [email, setEmail] = useState<string>(awal?.email ?? "");
  const [password, setPassword] = useState<string>("");
  const [galat, setGalat] = useState<string>("");

  const kirim = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const namaBersih = nama.trim();
    const emailBersih = email.trim().toLowerCase();

    if (!namaBersih) {
      setGalat("Nama tidak boleh kosong.");
      return;
    }
    if (!emailValid(emailBersih)) {
      setGalat("Format email tidak valid.");
      return;
    }
    if (!awal && password.length < 8) {
      setGalat("Password minimal 8 karakter.");
      return;
    }

    if (awal) {
      onSimpan({ nama: namaBersih, email: emailBersih });
    } else {
      onSimpan({ nama: namaBersih, email: emailBersih, password });
    }
  };

  return (
    <ModalDasar
      judul={awal ? "Ubah Pengguna" : "Tambah Pengguna"}
      onTutup={onTutup}
    >
      <form onSubmit={kirim} noValidate className="space-y-4">
        <div>
          <label
            htmlFor="nama-pengguna"
            className="mb-1.5 block text-sm font-semibold text-[#241552]"
          >
            Nama
          </label>
          <input
            id="nama-pengguna"
            autoFocus
            maxLength={40}
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Nama lengkap"
            className={kelasInput}
          />
        </div>

        <div>
          <label
            htmlFor="email-pengguna"
            className="mb-1.5 block text-sm font-semibold text-[#241552]"
          >
            Email
          </label>
          <input
            id="email-pengguna"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nama@unusia.ac.id"
            className={kelasInput}
          />
        </div>

        {!awal && (
          <div>
            <label
              htmlFor="password-pengguna"
              className="mb-1.5 block text-sm font-semibold text-[#241552]"
            >
              Password
            </label>
            <input
              id="password-pengguna"
              type="password"
              autoComplete="new-password"
              minLength={8}
              maxLength={72}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimal 8 karakter"
              className={kelasInput}
            />
          </div>
        )}

        {(galat || error) && (
          <p
            role="alert"
            className="rounded-lg bg-rose-50 px-3 py-2 text-sm font-medium text-rose-600"
          >
            {galat || error}
          </p>
        )}

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onTutup}
            className="flex-1 rounded-xl bg-slate-100 py-2.5 font-semibold text-slate-600 transition-colors hover:bg-slate-200"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={menyimpan}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#6d4fd6] py-2.5 font-semibold text-white transition-colors hover:bg-[#5b3fc4]"
          >
            <Save size={18} />
            {menyimpan ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </ModalDasar>
  );
}
