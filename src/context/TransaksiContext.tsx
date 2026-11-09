import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { TransaksiTersimpan } from "../types";

const KUNCI_PENYIMPANAN = "pocketpal-transaksi";

interface TransaksiContextValue {
  daftar: TransaksiTersimpan[];
  tambah: (data: Omit<TransaksiTersimpan, "id">) => TransaksiTersimpan;
  hapus: (id: string) => void;
  totalPemasukan: number;
  totalPengeluaran: number;
  saldo: number;
}

const TransaksiContext = createContext<TransaksiContextValue | null>(null);

const muatDataAwal = (): TransaksiTersimpan[] => {
  try {
    const mentah = localStorage.getItem(KUNCI_PENYIMPANAN);
    return mentah ? (JSON.parse(mentah) as TransaksiTersimpan[]) : [];
  } catch {
    return [];
  }
};

export function TransaksiProvider({ children }: { children: ReactNode }) {
  const [daftar, setDaftar] = useState<TransaksiTersimpan[]>(muatDataAwal);

  useEffect(() => {
    localStorage.setItem(KUNCI_PENYIMPANAN, JSON.stringify(daftar));
  }, [daftar]);

  const tambah = (data: Omit<TransaksiTersimpan, "id">): TransaksiTersimpan => {
    const baru: TransaksiTersimpan = { ...data, id: crypto.randomUUID() };
    setDaftar((sebelumnya) => [baru, ...sebelumnya]);
    return baru;
  };

  const hapus = (id: string) => {
    setDaftar((sebelumnya) => sebelumnya.filter((t) => t.id !== id));
  };

  const { totalPemasukan, totalPengeluaran } = useMemo(() => {
    let masuk = 0;
    let keluar = 0;
    for (const t of daftar) {
      if (t.tipe === "pemasukan") masuk += t.nominal;
      else keluar += t.nominal;
    }
    return { totalPemasukan: masuk, totalPengeluaran: keluar };
  }, [daftar]);

  const nilai: TransaksiContextValue = {
    daftar,
    tambah,
    hapus,
    totalPemasukan,
    totalPengeluaran,
    saldo: totalPemasukan - totalPengeluaran,
  };

  return (
    <TransaksiContext.Provider value={nilai}>
      {children}
    </TransaksiContext.Provider>
  );
}

export function useTransaksi(): TransaksiContextValue {
  const ctx = useContext(TransaksiContext);
  if (!ctx) {
    throw new Error("useTransaksi harus dipakai di dalam <TransaksiProvider>");
  }
  return ctx;
}
