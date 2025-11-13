import { notFound } from "next/navigation";
import { getRecipeById, getRelatedRecipes } from "@/lib/firebase/firestore";
import { RecipeDetail } from "@/components/recipe/recipe-detail";
import type { Metadata } from "next";
import { Suspense } from "react";

interface RecipePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: RecipePageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const recipe = await getRecipeById(id);

    if (!recipe) {
      return {
        title: "Resepi Tidak Ditemui - JomMasakResepi",
      };
    }

    return {
      title: `${recipe.title} - JomMasakResepi`,
      description: recipe.description,
    };
  } catch (error) {
    return {
      title: "Resepi - JomMasakResepi",
    };
  }
}

export default async function RecipePage({ params }: RecipePageProps) {
  try {
    const { id } = await params;
    const recipe = await getRecipeById(id);

    if (!recipe) {
      notFound();
    }

    const relatedRecipes = await getRelatedRecipes(recipe.category, recipe.id, 3);

    return (
      <Suspense
        fallback={
          <div className="container mx-auto px-4 py-12">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <p className="mt-4 text-gray-600">Memuatkan resepi...</p>
            </div>
          </div>
        }
      >
        <RecipeDetail recipe={recipe} relatedRecipes={relatedRecipes} />
      </Suspense>
    );
  } catch (error) {
    console.error("Error loading recipe page:", error);
    notFound();
  }
}

