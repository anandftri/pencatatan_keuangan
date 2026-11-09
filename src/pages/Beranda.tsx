import {
  ArrowDownLeft,
  ArrowRight,
  ArrowUpRight,
  ChartNoAxesColumnIncreasing,
  CircleDollarSign,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";

const keunggulan = [
  {
    ikon: Wallet,
    judul: "Catat dengan mudah",
    deskripsi:
      "Simpan pemasukan dan pengeluaran dalam beberapa langkah sederhana.",
    warna: "bg-violet-100 text-[#6849d1]",
  },
  {
    ikon: ChartNoAxesColumnIncreasing,
    judul: "Pahami kebiasaanmu",
    deskripsi:
      "Lihat ringkasan dan laporan agar keputusan finansial terasa lebih jelas.",
    warna: "bg-emerald-100 text-emerald-600",
  },
  {
    ikon: ShieldCheck,
    judul: "Tetap terorganisir",
    deskripsi:
      "Kelompokkan transaksi dan kelola data keuanganmu di satu tempat.",
    warna: "bg-amber-100 text-amber-600",
  },
];

function IlustrasiKeuangan() {
  return (
    <div
      role="img"
      aria-label="Ilustrasi dompet, kartu, dan ringkasan keuangan"
      className="relative mx-auto aspect-square w-full max-w-[500px]"
    >
      <div className="absolute inset-[8%] rounded-full bg-[#e8e1ff]" />
      <div className="absolute inset-[17%] rounded-full border border-dashed border-violet-300/80" />

      <div className="finance-float absolute left-[4%] top-[25%] z-10 rounded-2xl bg-white p-4 shadow-xl shadow-violet-900/10 sm:left-[2%]">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
            <ArrowDownLeft size={20} />
          </span>
          <div>
            <p className="text-xs text-slate-500">Pemasukan</p>
            <p className="font-bold text-[#241552]">+ Rp2.500.000</p>
          </div>
        </div>
      </div>

      <div className="finance-float-delayed absolute right-[1%] top-[14%] z-10 rounded-2xl bg-white p-4 shadow-xl shadow-violet-900/10 sm:right-0">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-rose-500">
            <ArrowUpRight size={20} />
          </span>
          <div>
            <p className="text-xs text-slate-500">Pengeluaran</p>
            <p className="font-bold text-[#241552]">− Rp850.000</p>
          </div>
        </div>
      </div>

      <div className="finance-illustration-shadow absolute left-1/2 top-1/2 flex h-[53%] w-[67%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[34px] bg-gradient-to-br from-[#7860df] via-[#6045ca] to-[#422e9b] shadow-2xl shadow-violet-900/30">
        <div className="absolute inset-[5%] rounded-[28px] border border-white/20" />
        <div className="absolute left-[8%] top-[12%] flex h-[19%] w-[27%] items-center justify-center rounded-xl bg-white/15 text-violet-100">
          <Wallet size={29} strokeWidth={1.8} />
        </div>
        <div className="absolute right-[8%] top-[15%] flex items-center gap-1.5 rounded-full bg-emerald-300/20 px-3 py-1.5 text-xs font-semibold text-emerald-100">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
          Keuangan sehat
        </div>

        <div className="absolute left-[9%] top-[42%] text-violet-200/80">
          <p className="text-xs">Saldo terkumpul</p>
          <p className="mt-1 text-[clamp(1.05rem,3vw,1.8rem)] font-extrabold tracking-tight text-white">
            Rp 8.420.000
          </p>
        </div>

        <div className="absolute bottom-[13%] left-[9%] right-[9%] flex h-[27%] items-end justify-between gap-2">
          {[34, 54, 43, 74, 58, 92, 68, 100, 79, 91].map((tinggi, index) => (
            <span
              key={index}
              className="finance-bar flex-1 rounded-t-md bg-gradient-to-t from-violet-200/45 to-white/90"
              style={{
                height: `${tinggi}%`,
                animationDelay: `${index * 70}ms`,
              }}
            />
          ))}
        </div>

        <div className="absolute -bottom-[11%] right-[8%] flex h-[28%] w-[29%] items-center justify-center rounded-[22px] border border-violet-100 bg-white text-[#6849d1] shadow-xl">
          <CircleDollarSign size={42} strokeWidth={1.5} />
        </div>
      </div>

      <div className="finance-orbit absolute bottom-[13%] left-[9%] flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 shadow-lg shadow-amber-900/10">
        <CircleDollarSign size={29} />
      </div>
      <span className="absolute right-[12%] top-[45%] h-3 w-3 rounded-full bg-[#9c85f5]" />
      <span className="absolute bottom-[20%] right-[14%] h-2.5 w-2.5 rounded-full bg-amber-400" />
    </div>
  );
}

export default function Beranda() {
  return (
    <div className="mx-auto max-w-7xl space-y-20 pb-10">
      <section className="relative isolate overflow-hidden rounded-[32px] bg-gradient-to-br from-[#f7f4ff] via-white to-[#eee9ff] px-6 py-10 sm:px-10 lg:px-14 lg:py-12">
        <div className="pointer-events-none absolute -right-20 -top-32 -z-10 h-80 w-80 rounded-full bg-violet-200/40 blur-3xl" />
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.95fr] lg:gap-4">
          <div className="max-w-xl py-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-3.5 py-1.5 text-sm font-semibold text-[#6045ca] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Keuangan lebih tertata, mulai dari sini
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.13] tracking-tight text-[#241552] sm:text-5xl xl:text-[3.6rem]">
              Kebiasaan baik,
              <br />
              <span className="bg-gradient-to-r from-[#6849d1] to-[#927cf0] bg-clip-text text-transparent">
                masa depan tenang.
              </span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
              Catat setiap pemasukan dan pengeluaran, pahami ke mana uangmu
              pergi, lalu capai tujuan finansialmu satu langkah demi satu.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl bg-[#6849d1] px-5 py-3 font-semibold text-white shadow-lg shadow-violet-700/20 transition hover:-translate-y-0.5 hover:bg-[#5639bd]"
              >
                Mulai kelola keuangan
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/transaksi"
                className="inline-flex items-center rounded-xl border border-violet-200 bg-white px-5 py-3 font-semibold text-[#5139a8] transition hover:bg-violet-50"
              >
                Catat transaksi
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-3 text-sm text-slate-500">
              <span className="flex -space-x-2">
                {["A", "R", "S"].map((inisial, index) => (
                  <span
                    key={inisial}
                    className={`flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white ${
                      index === 0
                        ? "bg-[#7c64dc]"
                        : index === 1
                          ? "bg-emerald-500"
                          : "bg-amber-500"
                    }`}
                  >
                    {inisial}
                  </span>
                ))}
              </span>
              <span>Satu tempat untuk rencana keuangan yang lebih baik</span>
            </div>
          </div>
          <IlustrasiKeuangan />
        </div>
      </section>

      <section>
        <div className="mx-auto mb-8 max-w-xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#765bd7]">
            Semua jadi lebih sederhana
          </p>
          <h2 className="mt-2 text-2xl font-extrabold text-[#241552] sm:text-3xl">
            Mulai dari catatan kecil
          </h2>
          <p className="mt-3 leading-7 text-slate-500">
            Kenali kondisi keuanganmu hari ini untuk mengambil langkah yang
            lebih yakin esok hari.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {keunggulan.map(({ ikon: Ikon, judul, deskripsi, warna }) => (
            <article
              key={judul}
              className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${warna}`}
              >
                <Ikon size={23} />
              </span>
              <h3 className="mt-4 text-lg font-bold text-[#241552]">{judul}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {deskripsi}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-start justify-between gap-5 rounded-3xl bg-[#30216f] px-6 py-8 text-white sm:flex-row sm:items-center sm:px-10">
        <div>
          <h2 className="text-2xl font-extrabold">
            Siap melihat keuangan lebih jelas?
          </h2>
          <p className="mt-2 text-sm text-violet-200">
            Mulai catat dan pantau semuanya dari satu dashboard.
          </p>
        </div>
        <Link
          to="/dashboard"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-[#5139a8] transition hover:bg-violet-50"
        >
          Buka dashboard
          <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  );
}
