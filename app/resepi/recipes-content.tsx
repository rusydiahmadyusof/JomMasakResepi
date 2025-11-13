"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Recipe } from "@/types/recipe";
import { RecipeGrid } from "@/components/recipe/recipe-grid";
import { RecipeCategory } from "@/types/recipe";
import { CATEGORIES, CATEGORY_MAP } from "@/lib/constants/categories";
import { logger } from "@/lib/utils/logger";

interface RecipesContentProps {
  initialRecipes?: Recipe[];
}

export function RecipesContent({ initialRecipes = [] }: RecipesContentProps) {
  const searchParams = useSearchParams();
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(initialRecipes);
  const [selectedCategory, setSelectedCategory] = useState<RecipeCategory | "Semua">("Semua");
  const [isLoading, setIsLoading] = useState(initialRecipes.length === 0);

  // Initialize category from URL query parameter
  useEffect(() => {
    const kategoriParam = searchParams.get("kategori");
    if (kategoriParam && CATEGORY_MAP[kategoriParam]) {
      setSelectedCategory(CATEGORY_MAP[kategoriParam]);
    }
  }, [searchParams]);

  useEffect(() => {
    // Only fetch if we don't have initial recipes (server-side data)
    if (initialRecipes.length > 0) {
      return;
    }

    async function fetchRecipes() {
      try {
        setIsLoading(true);
        // Import dynamically to avoid SSR issues
        const { getRecipes } = await import("@/lib/firebase/firestore");
        const allRecipes = await getRecipes();
        setRecipes(allRecipes);
        setFilteredRecipes(allRecipes);
      } catch (error) {
        logger.error("Error fetching recipes", error instanceof Error ? error : new Error(String(error)));
      } finally {
        setIsLoading(false);
      }
    }
    fetchRecipes();
  }, [initialRecipes.length]);

  // Memoize filtered recipes to avoid unnecessary recalculations
  const filteredRecipesMemo = useMemo(() => {
    if (selectedCategory === "Semua") {
      return recipes;
    }
    return recipes.filter((recipe) => recipe.category === selectedCategory);
  }, [selectedCategory, recipes]);

  useEffect(() => {
    setFilteredRecipes(filteredRecipesMemo);
  }, [filteredRecipesMemo]);

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Semua Resepi
        </h1>
        <p className="text-gray-600 max-w-2xl">
          Pilih kategori untuk menapis resepi. Atau lihat semua resepi yang tersedia.
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedCategory("Semua")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === "Semua"
                ? "bg-black text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            Semua Resepi
          </button>
          {CATEGORIES.map((category) => (
            <button
              key={category.slug}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                selectedCategory === category.name
                  ? "bg-black text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          {isLoading ? (
            "Memuatkan resepi..."
          ) : (
            <>
              Menunjukkan <span className="font-semibold text-gray-900">{filteredRecipes.length}</span>{" "}
              {filteredRecipes.length === 1 ? "resepi" : "resepi"}
              {selectedCategory !== "Semua" && (
                <>
                  {" "}dalam kategori <span className="font-semibold text-gray-900">{selectedCategory}</span>
                </>
              )}
            </>
          )}
        </p>
      </div>

      {/* Recipes Grid */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="mt-4 text-gray-600">Memuatkan resepi...</p>
        </div>
      ) : (
        <RecipeGrid recipes={filteredRecipes} columns={3} />
      )}
    </>
  );
}

