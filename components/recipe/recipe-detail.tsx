"use client";

import Image from "next/image";
import { Recipe } from "@/types/recipe";
import { RecipeCard } from "./recipe-card";

interface RecipeDetailProps {
  recipe: Recipe;
  relatedRecipes?: Recipe[];
}

export function RecipeDetail({ recipe, relatedRecipes = [] }: RecipeDetailProps) {
  const groupedIngredients = recipe.ingredients.reduce(
    (acc, ingredient) => {
      const group = ingredient.group || "Lain-lain";
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(ingredient);
      return acc;
    },
    {} as Record<string, typeof recipe.ingredients>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {recipe.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xs">JS</span>
                </div>
                <span>{recipe.author || "JomMasakResepi"}</span>
              </div>
              <span>•</span>
              <span>{new Date(recipe.createdAt).toLocaleDateString("ms-MY")}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Masa Penyediaan: {recipe.prepTime} Minit</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Masa Memasak: {recipe.cookTime} Minit</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span>{recipe.category}</span>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => window.print()}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                <span>CETAK</span>
              </button>
              <button
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: recipe.title,
                      text: recipe.description,
                      url: window.location.href,
                    });
                  }
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                <span>KONGSI</span>
              </button>
            </div>
          </div>

          {/* Main Image */}
          <div className="relative aspect-video rounded-lg overflow-hidden mb-8 bg-gray-200">
            {recipe.imageUrl ? (
              <Image
                src={recipe.imageUrl}
                alt={recipe.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 66vw"
                priority
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-lg">
                <span className="text-gray-400 text-sm">Tiada Imej</span>
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center opacity-60"
                aria-label="Tonton video (akan datang)"
                title="Fungsi video akan datang"
              >
                <svg className="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <p className="text-gray-700 leading-relaxed">{recipe.description}</p>
          </div>

          {/* Ingredients */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Bahan-bahan</h2>
            {Object.entries(groupedIngredients).map(([group, ingredients]) => (
              <div key={group} className="mb-6">
                {group !== "Lain-lain" && (
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">{group}</h3>
                )}
                <ul className="space-y-2">
                  {ingredients.map((ingredient) => (
                    <li key={ingredient.id} className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        className="mt-1 w-5 h-5 rounded border-gray-300"
                        id={`ingredient-${ingredient.id}`}
                      />
                      <label
                        htmlFor={`ingredient-${ingredient.id}`}
                        className="text-gray-700 cursor-pointer"
                      >
                        <span className="font-medium">{ingredient.name}</span> - {ingredient.amount}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Directions */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cara-cara</h2>
            <ol className="space-y-6">
              {recipe.directions.map((direction) => (
                <li key={direction.id} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold">
                    {direction.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Langkah {direction.step}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{direction.instruction}</p>
                    {direction.imageUrl && (
                      <div className="relative aspect-video rounded-lg overflow-hidden mt-4">
                        <Image
                          src={direction.imageUrl}
                          alt={`Langkah ${direction.step}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 66vw"
                        />
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Nutrition Info */}
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Maklumat Nutrisi</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-700">Kalori</span>
                <span className="font-semibold">{recipe.nutrition.calories} kcal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Jumlah Lemak</span>
                <span className="font-semibold">{recipe.nutrition.totalFat} g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Protein</span>
                <span className="font-semibold">{recipe.nutrition.protein} g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Karbohidrat</span>
                <span className="font-semibold">{recipe.nutrition.carbohydrate} g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Kolesterol</span>
                <span className="font-semibold">{recipe.nutrition.cholesterol} mg</span>
              </div>
            </div>
          </div>

          {/* Related Recipes */}
          {relatedRecipes.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Resepi Lain</h3>
              <div className="space-y-4">
                {relatedRecipes.map((relatedRecipe) => (
                  <RecipeCard key={relatedRecipe.id} recipe={relatedRecipe} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

