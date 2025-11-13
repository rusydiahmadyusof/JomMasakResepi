export interface Recipe {
  id: string;
  title: string;
  description: string;
  category: string;
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  difficulty: "Mudah" | "Sederhana" | "Sukar";
  ingredients: Ingredient[];
  directions: Direction[];
  nutrition: Nutrition;
  imageUrl: string;
  createdAt: Date;
  author?: string;
}

export interface Ingredient {
  id: string;
  name: string;
  amount: string;
  group?: string; // For grouping (e.g., "Untuk hidangan utama", "Untuk sos")
}

export interface Direction {
  id: string;
  step: number;
  instruction: string;
  imageUrl?: string;
}

export interface Nutrition {
  calories: number;
  totalFat: number;
  protein: number;
  carbohydrate: number;
  cholesterol: number;
}

export type RecipeCategory =
  | "Sarapan"
  | "Vegan"
  | "Daging"
  | "Pencuci Mulut"
  | "Makan Tengah Hari"
  | "Coklat";

