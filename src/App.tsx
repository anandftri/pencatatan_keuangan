import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Beranda from "./pages/Beranda";
import Dashboard from "./pages/Dashboard";
import Transaksi from "./pages/Transaksi";
import Laporan from "./pages/Laporan";
import Kategori from "./pages/Kategori";
import Users from "./pages/Users";
import Pengaturan from "./pages/Pengaturan";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Beranda />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transaksi" element={<Transaksi />} />
        <Route path="/laporan" element={<Laporan />} />
        <Route path="/kategori" element={<Kategori />} />
        <Route path="/users" element={<Users />} />
        <Route path="/pengaturan" element={<Pengaturan />} />
      </Route>
    </Routes>
  );
}
