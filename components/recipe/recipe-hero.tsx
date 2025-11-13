import Image from "next/image";
import Link from "next/link";
import { Recipe } from "@/types/recipe";

interface RecipeHeroProps {
  recipe: Recipe;
}

export function RecipeHero({ recipe }: RecipeHeroProps) {
  return (
    <section className="bg-blue-50 rounded-2xl overflow-hidden my-8">
      <div className="grid md:grid-cols-2 gap-0">
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-full mb-4 w-fit">
            Resepi Panas
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {recipe.title}
          </h1>
          <p className="text-gray-600 mb-6 line-clamp-3">{recipe.description}</p>
          <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-xs">JS</span>
              </div>
              <span>{recipe.author || "JomMasakResepi"}</span>
            </div>
            <span>•</span>
            <span>{new Date(recipe.createdAt).toLocaleDateString("ms-MY")}</span>
          </div>
          <Link
            href={`/resepi/${recipe.id}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors w-fit"
          >
            <span>Lihat Resepi Penuh</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </Link>
        </div>
        <div className="relative aspect-square md:aspect-auto md:h-full min-h-[300px] bg-gray-200">
          {recipe.imageUrl ? (
            <Image
              src={recipe.imageUrl}
              alt={recipe.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-gray-400 text-sm">Tiada Imej</span>
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center opacity-60"
              aria-label="Tonton video (akan datang)"
              title="Fungsi video akan datang"
            >
              <svg
                className="w-8 h-8 text-gray-900"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

