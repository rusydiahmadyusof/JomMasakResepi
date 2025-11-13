import Link from "next/link";

const navigation = [
  { name: "Resepi", href: "/resepi" },
  { name: "Hubungi", href: "/hubungi" },
  { name: "Tentang Kami", href: "/tentang-kami" },
];

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="text-2xl font-bold text-black">
              JomMasakResepi
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Koleksi resepi masakan Malaysia yang mudah dan sedap untuk semua.
              Dapatkan inspirasi masakan harian anda di sini.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Pautan Pantas
            </h3>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Maklumat
            </h3>
            <p className="text-sm text-gray-600">
              © 2024 JomMasakResepi. Hak cipta terpelihara.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

