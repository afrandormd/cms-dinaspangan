# Cara menjalankan projek

- ubah nama file .env.example menjadi .env
- jalankan migrasi prisma dengan cara:
  ```bash
  npx prisma migrate dev --name init
  ```
- jalankan prisma generate
  ```bash
  npx prisma generate
  ```


## Cara menjalankan program
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Buka Browser lalu ketik
- http://localhost:3000

**Untuk masuk ke halaman CMS**
- http://localhost:3000/get-panel
