import { Recipe } from "@/types/recipe";
import { RecipeCard } from "./recipe-card";

interface RecipeGridProps {
  recipes: Recipe[];
  columns?: 2 | 3 | 4;
}

export function RecipeGrid({ recipes, columns = 3 }: RecipeGridProps) {
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
  };

  if (recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Tiada resepi ditemui.</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 gap-6 ${gridCols[columns]}`}>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}

