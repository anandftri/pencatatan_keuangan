import { cariWarnaAvatar } from "../data/warnaAvatar";

interface AvatarProps {
  nama: string;
  warna: string;
  foto: string | null;
  ukuran?: number; // dalam piksel
}

export default function Avatar({
  nama,
  warna,
  foto,
  ukuran = 44,
}: AvatarProps) {
  const gaya = { width: ukuran, height: ukuran };

  if (foto) {
    return (
      <img
        src={foto}
        alt={`Foto profil ${nama}`}
        style={gaya}
        className="shrink-0 rounded-full object-cover"
      />
    );
  }

  return (
    <span
      style={{ ...gaya, fontSize: ukuran * 0.4 }}
      className={`flex shrink-0 items-center justify-center rounded-full font-bold ${cariWarnaAvatar(warna)}`}
    >
      {nama.trim().charAt(0).toUpperCase() || "?"}
    </span>
  );
}
