import { useCallback, useEffect, useState } from "react";
import {
  ambilDaftarPengguna,
  buatPengguna,
  hapusPengguna as hapusPenggunaApi,
  ubahPengguna as ubahPenggunaApi,
} from "../services/penggunaApi";
import type { DataPengguna, Pengguna, RegistrasiPengguna } from "../types";

const pesanDari = (error: unknown): string =>
  error instanceof Error
    ? error.message
    : "Terjadi kesalahan saat menghubungi backend.";

export function usePengguna() {
  const [daftar, setDaftar] = useState<Pengguna[]>([]);
  const [halaman, setHalaman] = useState(1);
  const [perHalaman, setPerHalaman] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalHalaman, setTotalHalaman] = useState(0);
  const [loading, setLoading] = useState(true);
  const [menyimpan, setMenyimpan] = useState(false);
  const [error, setError] = useState("");

  const muat = useCallback(async (halamanMuat: number, batas: number) => {
    setLoading(true);
    setError("");
    try {
      const hasil = await ambilDaftarPengguna(halamanMuat, batas);
      setDaftar(hasil.daftar);
      setTotal(hasil.total);
      setTotalHalaman(hasil.totalHalaman);
    } catch (galat: unknown) {
      setError(pesanDari(galat));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void muat(halaman, perHalaman);
  }, [halaman, muat, perHalaman]);

  const tambah = async (data: RegistrasiPengguna): Promise<boolean> => {
    setMenyimpan(true);
    setError("");
    try {
      await buatPengguna(data);
      setHalaman(1);
      if (halaman === 1) void muat(1, perHalaman);
      return true;
    } catch (galat: unknown) {
      setError(pesanDari(galat));
      return false;
    } finally {
      setMenyimpan(false);
    }
  };

  const ubah = async (id: string, data: DataPengguna): Promise<boolean> => {
    setMenyimpan(true);
    setError("");
    try {
      await ubahPenggunaApi(id, data);
      void muat(halaman, perHalaman);
      return true;
    } catch (galat: unknown) {
      setError(pesanDari(galat));
      return false;
    } finally {
      setMenyimpan(false);
    }
  };

  const hapus = async (pengguna: Pengguna): Promise<boolean> => {
    setMenyimpan(true);
    setError("");
    try {
      await hapusPenggunaApi(pengguna.id);
      const halamanBerikutnya =
        daftar.length === 1 && halaman > 1 ? halaman - 1 : halaman;
      if (halamanBerikutnya !== halaman) {
        setHalaman(halamanBerikutnya);
      } else {
        void muat(halamanBerikutnya, perHalaman);
      }
      return true;
    } catch (galat: unknown) {
      setError(pesanDari(galat));
      return false;
    } finally {
      setMenyimpan(false);
    }
  };

  const aturPerHalaman = (jumlah: number) => {
    setPerHalaman(jumlah);
    setHalaman(1);
  };

  return {
    daftar,
    halaman,
    perHalaman,
    total,
    totalHalaman,
    loading,
    menyimpan,
    error,
    aturHalaman: setHalaman,
    aturPerHalaman,
    tambah,
    ubah,
    hapus,
  };
}
