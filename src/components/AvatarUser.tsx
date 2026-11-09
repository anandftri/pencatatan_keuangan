import { cariWarnaAvatar } from "../data/warnaAvatar";
import { inisial, warnaDariNama } from "../utils/pengguna";

interface AvatarUserProps {
  nama: string;
  ukuran?: number; // dalam piksel
}

export default function AvatarUser({ nama, ukuran = 44 }: AvatarUserProps) {
  return (
    <span
      style={{ width: ukuran, height: ukuran, fontSize: ukuran * 0.36 }}
      className={`flex shrink-0 items-center justify-center rounded-full font-bold ${cariWarnaAvatar(
        warnaDariNama(nama),
      )}`}
    >
      {inisial(nama)}
    </span>
  );
}
