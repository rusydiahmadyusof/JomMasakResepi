/**
 * Script to seed Firestore with sample recipes
 * Run with: npx tsx scripts/seed-firestore.ts
 * 
 * Make sure to set up your Firebase config in .env.local first
 */

import { config } from "dotenv";
import { resolve } from "path";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";
import { sampleRecipes } from "../data/sample-recipes";

// Load .env.local file
config({ path: resolve(process.cwd(), ".env.local") });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

async function seedFirestore() {
  try {
    // Validate config
    if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
      throw new Error(
        "Missing Firebase configuration. Please check your .env.local file."
      );
    }

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    console.log("Starting to seed Firestore...");
    console.log(`Project: ${firebaseConfig.projectId}`);

    let successCount = 0;
    let errorCount = 0;

    for (const recipe of sampleRecipes) {
      try {
        const docRef = await addDoc(collection(db, "recipes"), {
          ...recipe,
          createdAt: Timestamp.now(),
        });
        console.log(`✅ Added recipe: ${recipe.title} with ID: ${docRef.id}`);
        successCount++;
      } catch (error: any) {
        console.error(`❌ Error adding recipe "${recipe.title}":`, error.message);
        errorCount++;
      }
    }

    console.log("\n📊 Summary:");
    console.log(`✅ Successfully added: ${successCount} recipes`);
    if (errorCount > 0) {
      console.log(`❌ Errors: ${errorCount} recipes`);
    }
    console.log("✅ Seeding completed!");
    process.exit(0);
  } catch (error: any) {
    console.error("❌ Error seeding Firestore:", error.message);
    if (error.message.includes("Missing Firebase")) {
      console.error("\n💡 Tip: Make sure .env.local exists in the project root with all Firebase config values.");
    }
    process.exit(1);
  }
}

seedFirestore();

