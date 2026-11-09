export const formatRupiah = (angka: number): string =>
  "Rp " + Math.abs(angka).toLocaleString("id-ID");
