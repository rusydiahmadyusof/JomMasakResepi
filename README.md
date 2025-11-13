# JomMasakResepi

Platform resepi masakan Malaysia yang mudah dan sedap. Dibina dengan Next.js 14, Firebase, dan Tailwind CSS.

## Ciri-ciri

- 🍳 Koleksi resepi masakan Malaysia
- 📱 Reka bentuk responsif (mobile-first)
- 🔍 Penapisan mengikut kategori
- 📊 Maklumat nutrisi untuk setiap resepi
- 🌐 Semua kandungan dalam Bahasa Malaysia
- 💰 Kos sifar (Firebase Spark Plan + Vercel Free Tier)
- 📧 Borang hubungi dengan email integration (Resend)

## Teknologi

- **Framework**: Next.js 14+ (App Router)
- **Bahasa**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Firebase Firestore
- **Images**: External URLs (Unsplash)
- **Deployment**: Vercel
- **Validation**: Zod
- **Email**: Resend (for contact form)

## Persediaan

### 1. Prerequisites

- Node.js 18+ 
- npm/yarn/pnpm
- Akaun Firebase
- Akaun Vercel (untuk deployment)
- Akaun Resend (untuk contact form - percuma)

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Firebase

1. Pergi ke [Firebase Console](https://console.firebase.google.com)
2. Buat projek baru (atau gunakan yang sedia ada)
3. Aktifkan **Firestore Database**:
   - Pergi ke Firestore Database
   - Klik "Create database"
   - Pilih "Start in test mode" (untuk MVP)
   - Pilih lokasi (contoh: `asia-southeast1` untuk Singapore)
4. Dapatkan config values:
   - Pergi ke Project Settings (gear icon)
   - Scroll ke "Your apps"
   - Klik pada Web icon (`</>`) atau tambah web app baru
   - Salin nilai config
5. Buat `.env.local` file di root directory:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Resend API Key (for contact form)
RESEND_API_KEY=re_xxxxxxxxxxxxx
CONTACT_EMAIL=your-email@example.com
```

**Nota**: 
- Projek ini menggunakan external image URLs (Unsplash) dan tidak memerlukan Firebase Storage
- Untuk Resend, daftar di [resend.com](https://resend.com) (percuma - 3,000 emails/bulan)

### 4. Setup Firestore Security Rules

**PENTING**: Anda perlu membenarkan writes sementara untuk seed database, kemudian tukar kembali kepada read-only.

#### Langkah 1: Benarkan Writes (Untuk Seeding)

Pergi ke Firestore Database > Rules tab, paste:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /recipes/{document=**} {
      allow read: if true;
      allow write: if true;  // SEMENTARA - untuk seeding
    }
  }
}
```

Klik "Publish"

#### Langkah 2: Selepas Seeding - Tukar kepada Read-Only

Selepas menjalankan seed script, update rules kepada read-only:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /recipes/{document=**} {
      allow read: if true;
      allow write: if false;  // Read-only untuk production
    }
  }
}
```

Klik "Publish"

**Nota**: Untuk setup terperinci, lihat `firestore.rules` file.

### 5. Seed Database (Optional)

Untuk menambah sample recipes ke Firestore:

```bash
# tsx sudah termasuk dalam devDependencies
# Run seed script
npx tsx scripts/seed-firestore.ts
```

Ini akan menambah 9 sample resepi masakan Malaysia ke Firestore anda.

**Nota**: Pastikan `.env.local` sudah disetup sebelum menjalankan script ini.

### 6. Run Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) untuk melihat aplikasi.

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Scripts Tersedia

```bash
# Seed database dengan sample recipes
npx tsx scripts/seed-firestore.ts

# Delete semua recipes dari Firestore
npx tsx scripts/delete-all-recipes.ts

# Trigger Firestore index creation (jika diperlukan)
npx tsx scripts/create-indexes.ts
```

## Deployment

### Vercel

1. Push code ke GitHub/GitLab/Bitbucket
2. Import project di [Vercel](https://vercel.com)
3. Tambah environment variables dari `.env.local`:
   - Semua `NEXT_PUBLIC_FIREBASE_*` variables
   - `RESEND_API_KEY`
   - `CONTACT_EMAIL`
4. Deploy!

Vercel akan automatically deploy setiap kali anda push ke branch utama.

## Struktur Projek

```
JomMasakResepi/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── resepi/            # Recipe pages
│   │   ├── page.tsx      # Recipe listing with filters
│   │   ├── [id]/         # Dynamic recipe detail page
│   │   └── recipes-content.tsx  # Client component for filtering
│   ├── hubungi/           # Contact page
│   └── tentang-kami/      # About page
├── components/            # React components
│   ├── layout/           # Header, Footer
│   ├── recipe/           # Recipe components
│   └── category/         # Category components
├── lib/                  # Utilities
│   ├── firebase/         # Firebase config & helpers
│   ├── utils/            # Utility functions
│   └── validations/      # Zod schemas
├── types/                # TypeScript types
├── data/                 # Sample data
├── scripts/              # Utility scripts
│   ├── seed-firestore.ts
│   ├── delete-all-recipes.ts
│   └── create-indexes.ts
└── public/               # Static assets
```

## Firebase Free Tier Limits

- **Firestore**: 50K reads/day, 20K writes/day, 1GB storage
- **Hosting**: Tidak digunakan (kami guna Vercel)
- **Storage**: Tidak digunakan (kami guna external image URLs)

Untuk MVP, limit ini lebih daripada cukup!

## Troubleshooting

### "Firebase: Error (auth/configuration-not-found)"

- Pastikan `.env.local` wujud dan ada semua required variables
- Restart dev server selepas tambah `.env.local`

### "Permission denied" when reading recipes

- Check Firestore Security Rules sudah published
- Pastikan rules allow `read: if true`

### "Permission denied" when seeding

- Pastikan Firestore rules allow `write: if true` (sementara untuk seeding)
- Selepas seeding, tukar kembali kepada `write: if false`

### Images not loading

- Check `next.config.js` ada correct image domains
- Untuk Unsplash images, mereka sepatutnya berfungsi terus
- Semua images guna external URLs (Unsplash) - tidak perlu Firebase Storage

### ChunkLoadError: Loading chunk failed

- Clear `.next` cache: `Remove-Item -Recurse -Force .next` (PowerShell) atau `rm -rf .next` (Mac/Linux)
- Restart dev server
- Hard refresh browser: `Ctrl + Shift + R` (Windows) atau `Cmd + Shift + R` (Mac)

### Contact form tidak menghantar email

- Pastikan `RESEND_API_KEY` dan `CONTACT_EMAIL` sudah disetup dalam `.env.local`
- Check Resend dashboard untuk melihat status emails
- Pastikan API key valid dan tidak expired

## Catatan Penting

- **Zero Cost**: Projek ini direka untuk menggunakan Firebase Spark Plan (percuma) dan Vercel Free Tier
- **Read-Only**: MVP ini adalah read-only - tiada authentication atau user features
- **Images**: Menggunakan external image URLs dari Unsplash (tidak memerlukan Firebase Storage)
- **Content**: Semua kandungan dalam Bahasa Malaysia
- **Email**: Contact form menggunakan Resend (percuma - 3,000 emails/bulan)

## License

MIT
