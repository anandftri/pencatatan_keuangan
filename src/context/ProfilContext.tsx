import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

const KUNCI_PENYIMPANAN = "pocketpal-profil";

export interface Profil {
  nama: string;
  warna: string; // nama warna avatar, misalnya "Ungu"
  foto: string | null; // data URL foto, atau null kalau tidak memakai foto
}

const profilAwal: Profil = { nama: "Nanda", warna: "Ungu", foto: null };

interface ProfilContextValue {
  profil: Profil;
  simpan: (data: Profil) => void;
}

const ProfilContext = createContext<ProfilContextValue | null>(null);

const muatDataAwal = (): Profil => {
  try {
    const mentah = localStorage.getItem(KUNCI_PENYIMPANAN);
    if (!mentah) return profilAwal;
    const data = JSON.parse(mentah) as Partial<Profil>;
    return {
      nama:
        typeof data.nama === "string" && data.nama.trim()
          ? data.nama
          : profilAwal.nama,
      warna: typeof data.warna === "string" ? data.warna : profilAwal.warna,
      foto: typeof data.foto === "string" ? data.foto : null,
    };
  } catch {
    return profilAwal;
  }
};

export function ProfilProvider({ children }: { children: ReactNode }) {
  const [profil, setProfil] = useState<Profil>(muatDataAwal);

  useEffect(() => {
    try {
      localStorage.setItem(KUNCI_PENYIMPANAN, JSON.stringify(profil));
    } catch {
      // penyimpanan browser penuh atau dinonaktifkan, abaikan
    }
  }, [profil]);

  const simpan = (data: Profil) => setProfil(data);

  return (
    <ProfilContext.Provider value={{ profil, simpan }}>
      {children}
    </ProfilContext.Provider>
  );
}

// Dipakai di komponen lain: const { profil, simpan } = useProfil();
export function useProfil(): ProfilContextValue {
  const ctx = useContext(ProfilContext);
  if (!ctx) {
    throw new Error("useProfil harus dipakai di dalam <ProfilProvider>");
  }
  return ctx;
}
