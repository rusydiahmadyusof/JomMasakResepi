import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "./config";
import { Recipe, RecipeCategory } from "@/types/recipe";
import { logger } from "@/lib/utils/logger";

/**
 * Firestore timestamp type union
 */
type FirestoreTimestamp = Timestamp | Date | { toDate: () => Date } | undefined;

/**
 * Convert Firestore timestamp to Date
 */
function convertTimestamp(timestamp: FirestoreTimestamp): Date {
  if (!timestamp) {
    return new Date();
  }
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate();
  }
  if (typeof timestamp === "object" && "toDate" in timestamp && typeof timestamp.toDate === "function") {
    return timestamp.toDate();
  }
  if (timestamp instanceof Date) {
    return timestamp;
  }
  return new Date();
}

/**
 * Firestore document data type
 */
interface FirestoreRecipeData {
  title?: string;
  description?: string;
  category?: string;
  prepTime?: number;
  cookTime?: number;
  difficulty?: "Mudah" | "Sederhana" | "Sukar";
  ingredients?: Array<{ id: string; name: string; amount: string; group?: string }>;
  directions?: Array<{ id: string; step: number; instruction: string; imageUrl?: string }>;
  nutrition?: {
    calories?: number;
    totalFat?: number;
    protein?: number;
    carbohydrate?: number;
    cholesterol?: number;
  };
  imageUrl?: string;
  createdAt?: FirestoreTimestamp;
  author?: string;
}

/**
 * Convert Firestore document to Recipe
 */
function docToRecipe(docData: DocumentData | FirestoreRecipeData, id: string): Recipe {
  const data = docData as FirestoreRecipeData;
  return {
    id,
    title: data.title || "",
    description: data.description || "",
    category: data.category || "",
    prepTime: data.prepTime || 0,
    cookTime: data.cookTime || 0,
    difficulty: data.difficulty || "Mudah",
    ingredients: data.ingredients || [],
    directions: data.directions || [],
    nutrition: data.nutrition
      ? {
          calories: data.nutrition.calories || 0,
          totalFat: data.nutrition.totalFat || 0,
          protein: data.nutrition.protein || 0,
          carbohydrate: data.nutrition.carbohydrate || 0,
          cholesterol: data.nutrition.cholesterol || 0,
        }
      : {
          calories: 0,
          totalFat: 0,
          protein: 0,
          carbohydrate: 0,
          cholesterol: 0,
        },
    imageUrl: data.imageUrl || "",
    createdAt: convertTimestamp(data.createdAt),
    author: data.author || "JomMasakResepi",
  };
}

/**
 * Get all recipes
 */
export async function getRecipes(): Promise<Recipe[]> {
  try {
    // Check if db is initialized
    if (!db) {
      logger.error("Firestore database not initialized");
      return [];
    }

    const recipesRef = collection(db, "recipes");
    
    // Try with orderBy first, fallback to simple query if index doesn't exist
    let querySnapshot;
    try {
      const q = query(recipesRef, orderBy("createdAt", "desc"));
      querySnapshot = await getDocs(q);
    } catch (error) {
      const firestoreError = error as { code?: string; message?: string; stack?: string };
      // If index error, try without orderBy
      if (firestoreError.code === "failed-precondition" || firestoreError.message?.includes("index")) {
        logger.warn("Firestore index not found, fetching without orderBy. Creating index recommended.");
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
      logger.error("Firestore query error", {
        code: firestoreError.code,
        message: firestoreError.message,
        stack: firestoreError.stack,
      });
      throw error;
    }
    
    return querySnapshot.docs.map((doc) => docToRecipe(doc.data(), doc.id));
  } catch (error) {
    const firestoreError = error as { message?: string; code?: string; name?: string };
    logger.error("Error fetching recipes", {
      error: firestoreError.message,
      code: firestoreError.code,
      name: firestoreError.name,
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
      logger.error("Firestore database not initialized");
      return null;
    }
    const recipeRef = doc(db, "recipes", id);
    const recipeSnap = await getDoc(recipeRef);
    
    if (!recipeSnap.exists()) {
      return null;
    }
    
    return docToRecipe(recipeSnap.data(), recipeSnap.id);
  } catch (error) {
    logger.error("Error fetching recipe", error instanceof Error ? error : new Error(String(error)));
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
      logger.error("Firestore database not initialized");
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
    } catch (error) {
      const firestoreError = error as { code?: string; message?: string };
      // If index error, try without orderBy
      if (firestoreError.code === "failed-precondition" || firestoreError.message?.includes("index")) {
        logger.warn("Firestore index not found, fetching without orderBy. Creating index recommended.");
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
    logger.error("Error fetching recipes by category", error instanceof Error ? error : new Error(String(error)));
    return [];
  }
}

/**
 * Get featured recipe (first recipe by createdAt desc)
 * Optimized to fetch only 1 recipe instead of all
 */
export async function getFeaturedRecipe(): Promise<Recipe | null> {
  try {
    // Check if db is initialized
    if (!db) {
      logger.error("Firestore database not initialized");
      return null;
    }

    const recipesRef = collection(db, "recipes");
    
    // Try with orderBy and limit to fetch only 1 recipe
    try {
      const q = query(recipesRef, orderBy("createdAt", "desc"), limit(1));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return null;
      }
      
      return docToRecipe(querySnapshot.docs[0].data(), querySnapshot.docs[0].id);
    } catch (error) {
      const firestoreError = error as { code?: string; message?: string };
      // If index error, fallback to fetching all and taking first
      if (firestoreError.code === "failed-precondition" || firestoreError.message?.includes("index")) {
        logger.warn("Firestore index not found, falling back to fetching all recipes for featured recipe.");
        const recipes = await getRecipes();
        return recipes.length > 0 ? recipes[0] : null;
      }
      throw error;
    }
  } catch (error) {
    logger.error("Error fetching featured recipe", error instanceof Error ? error : new Error(String(error)));
    return null;
  }
}

/**
 * Get related recipes (same category, excluding current recipe)
 */
export async function getRelatedRecipes(
  category: string,
  excludeId: string,
  limitCount: number = 4
): Promise<Recipe[]> {
  try {
    const recipes = await getRecipesByCategory(category as RecipeCategory);
    return recipes.filter((r) => r.id !== excludeId).slice(0, limitCount);
  } catch (error) {
    logger.error("Error fetching related recipes", error instanceof Error ? error : new Error(String(error)));
    return [];
  }
}

