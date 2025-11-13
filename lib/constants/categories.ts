import { RecipeCategory } from "@/types/recipe";

export const CATEGORIES: { name: RecipeCategory; slug: string; icon: string }[] = [
  { name: "Sarapan", slug: "sarapan", icon: "🍳" },
  { name: "Vegan", slug: "vegan", icon: "🥗" },
  { name: "Daging", slug: "daging", icon: "🥩" },
  { name: "Pencuci Mulut", slug: "pencuci-mulut", icon: "🍰" },
  { name: "Makan Tengah Hari", slug: "makan-tengah-hari", icon: "🥪" },
  { name: "Coklat", slug: "coklat", icon: "🍫" },
];

export const CATEGORY_MAP: Record<string, RecipeCategory> = {
  sarapan: "Sarapan",
  vegan: "Vegan",
  daging: "Daging",
  "pencuci-mulut": "Pencuci Mulut",
  "makan-tengah-hari": "Makan Tengah Hari",
  coklat: "Coklat",
};

