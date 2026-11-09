# Pencatatan Keuangan

## Menjalankan aplikasi

1. Jalankan backend `DAY-7` dan pastikan PostgreSQL serta migrasi databasenya sudah aktif.
2. Salin `.env.example` menjadi `.env` dan sesuaikan `VITE_API_URL` jika backend berjalan di alamat lain.
3. Jalankan `npm install`, lalu `npm run dev`.

Halaman Pengguna memakai endpoint `/api/v1/users` pada backend. Backend harus aktif
di `http://localhost:3000` secara default.

## Teknologi

React, TypeScript, Vite, dan Tailwind CSS.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
