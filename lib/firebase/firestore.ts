import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  orderBy,
  QueryConstraint,
} from "firebase/firestore";
import { db } from "./config";
import { Recipe, RecipeCategory } from "@/types/recipe";

/**
 * Convert Firestore timestamp to Date
 */
function convertTimestamp(timestamp: any): Date {
  if (timestamp?.toDate) {
    return timestamp.toDate();
  }
  if (timestamp instanceof Date) {
    return timestamp;
  }
  return new Date();
}

/**
 * Convert Firestore document to Recipe
 */
function docToRecipe(docData: any, id: string): Recipe {
  return {
    id,
    title: docData.title || "",
    description: docData.description || "",
    category: docData.category || "",
    prepTime: docData.prepTime || 0,
    cookTime: docData.cookTime || 0,
    difficulty: docData.difficulty || "Mudah",
    ingredients: docData.ingredients || [],
    directions: docData.directions || [],
    nutrition: docData.nutrition || {
      calories: 0,
      totalFat: 0,
      protein: 0,
      carbohydrate: 0,
      cholesterol: 0,
    },
    imageUrl: docData.imageUrl || "",
    createdAt: convertTimestamp(docData.createdAt),
    author: docData.author || "JomMasakResepi",
  };
}

/**
 * Get all recipes
 */
export async function getRecipes(): Promise<Recipe[]> {
  try {
    // Check if db is initialized
    if (!db) {
      console.error("Firestore database not initialized");
      return [];
    }

    const recipesRef = collection(db, "recipes");
    
    // Try with orderBy first, fallback to simple query if index doesn't exist
    let querySnapshot;
    try {
      const q = query(recipesRef, orderBy("createdAt", "desc"));
      querySnapshot = await getDocs(q);
    } catch (error: any) {
      // If index error, try without orderBy
      if (error.code === "failed-precondition" || error.message?.includes("index")) {
        console.warn("Firestore index not found, fetching without orderBy. Creating index recommended.");
        querySnapshot = await getDocs(recipesRef);
        // Sort manually
        const docs = querySnapshot.docs.map((doc) => ({
          doc,
          data: docToRecipe(doc.data(), doc.id),
        }));
        docs.sort((a, b) => {
          const dateA = a.data.createdAt.getTime();
          const dateB = b.data.createdAt.getTime();
          return dateB - dateA; // Descending
        });
        return docs.map((item) => item.data);
      }
      // Log the actual error for debugging
      console.error("Firestore query error:", {
        code: error.code,
        message: error.message,
        stack: error.stack,
      });
      throw error;
    }
    
    return querySnapshot.docs.map((doc) => docToRecipe(doc.data(), doc.id));
  } catch (error: any) {
    console.error("Error fetching recipes:", {
      error: error.message,
      code: error.code,
      name: error.name,
    });
    
    // Return empty array to prevent app crash
    return [];
  }
}

/**
 * Get a single recipe by ID
 */
export async function getRecipeById(id: string): Promise<Recipe | null> {
  try {
    // Check if db is initialized
    if (!db) {
      console.error("Firestore database not initialized");
      return null;
    }
    const recipeRef = doc(db, "recipes", id);
    const recipeSnap = await getDoc(recipeRef);
    
    if (!recipeSnap.exists()) {
      return null;
    }
    
    return docToRecipe(recipeSnap.data(), recipeSnap.id);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return null;
  }
}

/**
 * Get recipes by category
 */
export async function getRecipesByCategory(
  category: RecipeCategory
): Promise<Recipe[]> {
  try {
    // Check if db is initialized
    if (!db) {
      console.error("Firestore database not initialized");
      return [];
    }
    const recipesRef = collection(db, "recipes");
    
    // Try with orderBy first, fallback to simple query if index doesn't exist
    let querySnapshot;
    try {
      const q = query(
        recipesRef,
        where("category", "==", category),
        orderBy("createdAt", "desc")
      );
      querySnapshot = await getDocs(q);
    } catch (error: any) {
      // If index error, try without orderBy
      if (error.code === "failed-precondition" || error.message?.includes("index")) {
        console.warn("Firestore index not found, fetching without orderBy. Creating index recommended.");
        const q = query(recipesRef, where("category", "==", category));
        querySnapshot = await getDocs(q);
        // Sort manually
        const docs = querySnapshot.docs.map((doc) => ({
          doc,
          data: docToRecipe(doc.data(), doc.id),
        }));
        docs.sort((a, b) => {
          const dateA = a.data.createdAt.getTime();
          const dateB = b.data.createdAt.getTime();
          return dateB - dateA; // Descending
        });
        return docs.map((item) => item.data);
      }
      throw error;
    }
    
    return querySnapshot.docs.map((doc) => docToRecipe(doc.data(), doc.id));
  } catch (error) {
    console.error("Error fetching recipes by category:", error);
    return [];
  }
}

/**
 * Get featured recipe (first recipe or by featured flag)
 */
export async function getFeaturedRecipe(): Promise<Recipe | null> {
  try {
    const recipes = await getRecipes();
    return recipes.length > 0 ? recipes[0] : null;
  } catch (error) {
    console.error("Error fetching featured recipe:", error);
    return null;
  }
}

/**
 * Get related recipes (same category, excluding current recipe)
 */
export async function getRelatedRecipes(
  category: string,
  excludeId: string,
  limit: number = 4
): Promise<Recipe[]> {
  try {
    const recipes = await getRecipesByCategory(category as RecipeCategory);
    return recipes.filter((r) => r.id !== excludeId).slice(0, limit);
  } catch (error) {
    console.error("Error fetching related recipes:", error);
    return [];
  }
}

