import { useEffect, useState } from "react";

const KUNCI_PENYIMPANAN = "pocketpal-anggaran";

// Contoh isi: { Makanan: 500000, Transportasi: 200000 }
type PetaAnggaran = Record<string, number>;

const muatDataAwal = (): PetaAnggaran => {
  try {
    const mentah = localStorage.getItem(KUNCI_PENYIMPANAN);
    return mentah ? (JSON.parse(mentah) as PetaAnggaran) : {};
  } catch {
    return {};
  }
};

export function useAnggaran() {
  const [anggaran, setAnggaran] = useState<PetaAnggaran>(muatDataAwal);

  useEffect(() => {
    localStorage.setItem(KUNCI_PENYIMPANAN, JSON.stringify(anggaran));
  }, [anggaran]);

  // nilai null atau 0 berarti batas dihapus
  const atur = (nama: string, nilai: number | null) => {
    setAnggaran((sebelumnya) => {
      const baru = { ...sebelumnya };
      if (nilai === null || nilai <= 0) delete baru[nama];
      else baru[nama] = nilai;
      return baru;
    });
  };

  return { anggaran, atur };
}
