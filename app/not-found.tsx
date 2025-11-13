import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Halaman Tidak Ditemui</h2>
      <p className="text-gray-600 mb-8">
        Maaf, halaman yang anda cari tidak wujud atau telah dipindahkan.
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
      >
        Kembali ke Laman Utama
      </Link>
    </div>
  );
}

