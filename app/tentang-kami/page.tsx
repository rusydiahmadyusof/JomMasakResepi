export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
          Tentang Kami
        </h1>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed mb-6">
            JomMasakResepi adalah platform yang didedikasikan untuk berkongsi resepi masakan
            Malaysia yang mudah, sedap dan berkhasiat. Kami percaya bahawa memasak seharusnya
            menjadi aktiviti yang menyeronokkan dan mudah diakses oleh semua orang.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Misi kami adalah untuk menyediakan koleksi resepi yang lengkap dengan arahan yang
            jelas, bahan-bahan yang mudah didapati, dan maklumat nutrisi yang berguna. Setiap
            resepi telah diuji dan disesuaikan untuk memastikan hasil yang terbaik.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Visi Kami</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Menjadi sumber utama untuk resepi masakan Malaysia yang dipercayai dan digunakan oleh
            berjuta-juta orang di seluruh negara.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Hubungi Kami</h2>
          <p className="text-gray-700 leading-relaxed">
            Jika anda mempunyai sebarang pertanyaan atau cadangan, jangan ragu untuk{" "}
            <a href="/hubungi" className="text-blue-600 hover:underline">
              menghubungi kami
            </a>
            . Kami sentiasa bersedia untuk membantu!
          </p>
        </div>
      </div>
    </div>
  );
}

