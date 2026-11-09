import type {
  DataPengguna,
  Pengguna,
  RegistrasiPengguna,
} from "../types";

const API_BASE_URL = (
  import.meta.env.VITE_API_URL ?? "http://localhost:3000/api/v1"
).replace(/\/+$/, "");

interface DaftarPenggunaApi {
  daftar: Pengguna[];
  total: number;
  totalHalaman: number;
}

const sebagaiObjek = (nilai: unknown): Record<string, unknown> | null =>
  typeof nilai === "object" && nilai !== null
    ? (nilai as Record<string, unknown>)
    : null;

const pesanGalat = (nilai: unknown): string => {
  const objek = sebagaiObjek(nilai);
  return typeof objek?.message === "string"
    ? objek.message
    : "Permintaan ke backend gagal.";
};

const bacaRespons = async (respons: Response): Promise<Record<string, unknown>> => {
  let isi: unknown;
  try {
    isi = await respons.json();
  } catch {
    throw new Error("Backend mengirim respons yang tidak valid.");
  }

  const objek = sebagaiObjek(isi);
  if (!respons.ok) {
    throw new Error(pesanGalat(isi));
  }
  if (!objek || objek.success !== true) {
    throw new Error(pesanGalat(isi));
  }
  return objek;
};

const ambilPengguna = (nilai: unknown): Pengguna => {
  const pengguna = sebagaiObjek(nilai);
  if (
    !pengguna ||
    typeof pengguna.id !== "string" ||
    typeof pengguna.name !== "string" ||
    typeof pengguna.email !== "string" ||
    typeof pengguna.createdAt !== "string"
  ) {
    throw new Error("Format data pengguna dari backend tidak valid.");
  }

  return {
    id: pengguna.id,
    nama: pengguna.name,
    email: pengguna.email,
    dibuat: pengguna.createdAt.slice(0, 10),
  };
};

const kirim = async (
  path: string,
  opsi: RequestInit = {},
): Promise<Record<string, unknown>> => {
  const respons = await fetch(`${API_BASE_URL}${path}`, {
    ...opsi,
    headers: {
      "Content-Type": "application/json",
      ...opsi.headers,
    },
  });
  return bacaRespons(respons);
};

export async function ambilDaftarPengguna(
  halaman: number,
  perHalaman: number,
): Promise<DaftarPenggunaApi> {
  const query = new URLSearchParams({
    page: String(halaman),
    limit: String(perHalaman),
  });
  const respons = await kirim(`/users?${query}`);
  const data = respons.data;
  const pagination = sebagaiObjek(respons.pagination);

  if (
    !Array.isArray(data) ||
    !pagination ||
    typeof pagination.totalItems !== "number" ||
    typeof pagination.totalPages !== "number"
  ) {
    throw new Error("Format daftar pengguna dari backend tidak valid.");
  }

  return {
    daftar: data.map(ambilPengguna),
    total: pagination.totalItems,
    totalHalaman: pagination.totalPages,
  };
}

export async function buatPengguna(
  data: RegistrasiPengguna,
): Promise<Pengguna> {
  const respons = await kirim("/users/register", {
    method: "POST",
    body: JSON.stringify({
      name: data.nama,
      email: data.email,
      password: data.password,
    }),
  });
  return ambilPengguna(respons.data);
}

export async function ubahPengguna(
  id: string,
  data: DataPengguna,
): Promise<Pengguna> {
  const respons = await kirim(`/users/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify({ name: data.nama, email: data.email }),
  });
  return ambilPengguna(respons.data);
}

export async function hapusPengguna(id: string): Promise<void> {
  await kirim(`/users/${encodeURIComponent(id)}`, { method: "DELETE" });
}
