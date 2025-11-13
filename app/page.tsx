import { getFeaturedRecipe, getRecipes } from "@/lib/firebase/firestore";
import { RecipeHero } from "@/components/recipe/recipe-hero";
import { RecipeGrid } from "@/components/recipe/recipe-grid";
import { CategoryGrid } from "@/components/category/category-grid";
import Link from "next/link";

export default async function Home() {
  const featuredRecipe = await getFeaturedRecipe();
  const allRecipes = await getRecipes();
  const simpleRecipes = allRecipes.slice(0, 9);
  const moreRecipes = allRecipes.slice(9, 17);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      {featuredRecipe && <RecipeHero recipe={featuredRecipe} />}

      {/* Categories Section */}
      <section className="my-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Kategori</h2>
          <Link
            href="/resepi"
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            Lihat Semua Resepi
          </Link>
        </div>
        <CategoryGrid />
      </section>

      {/* Simple and Tasty Recipes */}
      <section className="my-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Resepi Mudah dan Sedap
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Koleksi resepi masakan Malaysia yang mudah disediakan dan pasti sedap. Sempurna untuk
            pemula dan chef berpengalaman.
          </p>
        </div>
        <RecipeGrid recipes={simpleRecipes} columns={3} />
      </section>

      {/* Promotional Section */}
      <section className="my-12 bg-blue-50 rounded-2xl p-8 md:p-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Semua orang boleh jadi chef di dapur sendiri
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Dengan resepi yang mudah diikuti dan bahan-bahan yang mudah didapati, sesiapa sahaja
              boleh menyediakan hidangan yang sedap untuk keluarga. Mulakan perjalanan masakan anda
              hari ini!
            </p>
            <Link
              href="/resepi"
              className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Ketahui Lebih Lanjut
            </Link>
          </div>
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-blue-300 flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4">👨‍🍳</div>
                <p className="text-gray-700 font-medium">Chef di Dapur Anda</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Recipes Section */}
      <section className="my-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Cuba resepi sedap ini untuk hari anda
            </h2>
            <p className="text-gray-600">
              Lebih banyak resepi untuk dicuba dan dinikmati bersama keluarga
            </p>
          </div>
        </div>
        <RecipeGrid recipes={moreRecipes} columns={4} />
      </section>
    </div>
  );
}
