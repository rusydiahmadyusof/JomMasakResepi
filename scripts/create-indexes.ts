/**
 * Script to trigger Firestore index creation
 * This script makes queries that require indexes, which will prompt
 * Firebase to show you the index creation links in the console
 * 
 * Run with: npx tsx scripts/create-indexes.ts
 */

import { config } from "dotenv";
import { resolve } from "path";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";

// Load .env.local file
config({ path: resolve(process.cwd(), ".env.local") });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

async function triggerIndexCreation() {
  try {
    // Validate config
    if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
      throw new Error(
        "Missing Firebase configuration. Please check your .env.local file."
      );
    }

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    console.log("🔍 Triggering index creation queries...");
    console.log(`Project: ${firebaseConfig.projectId}\n`);

    // Query 1: Order by createdAt (will trigger index creation if missing)
    console.log("1. Testing query: orderBy('createdAt', 'desc')");
    try {
      const recipesRef = collection(db, "recipes");
      const q1 = query(recipesRef, orderBy("createdAt", "desc"));
      await getDocs(q1);
      console.log("   ✅ Index exists or query succeeded\n");
    } catch (error: any) {
      if (error.code === "failed-precondition") {
        console.log("   ⚠️  Index missing! Check the error message below:");
        console.log(`   ${error.message}`);
        console.log("   💡 Look for a link in the error message to create the index\n");
      } else {
        console.log(`   ❌ Error: ${error.message}\n`);
      }
    }

    // Query 2: Where category + orderBy createdAt (will trigger index creation if missing)
    console.log("2. Testing query: where('category') + orderBy('createdAt', 'desc')");
    try {
      const recipesRef = collection(db, "recipes");
      const q2 = query(
        recipesRef,
        where("category", "==", "Daging"),
        orderBy("createdAt", "desc")
      );
      await getDocs(q2);
      console.log("   ✅ Index exists or query succeeded\n");
    } catch (error: any) {
      if (error.code === "failed-precondition") {
        console.log("   ⚠️  Index missing! Check the error message below:");
        console.log(`   ${error.message}`);
        console.log("   💡 Look for a link in the error message to create the index\n");
      } else {
        console.log(`   ❌ Error: ${error.message}\n`);
      }
    }

    console.log("✅ Index check completed!");
    console.log("\n📝 Next steps:");
    console.log("   1. If you saw index errors, click the links provided to create indexes");
    console.log("   2. Or use Firebase CLI: firebase deploy --only firestore:indexes");
    console.log("   3. Or create manually in Firebase Console > Firestore > Indexes");
    console.log("\nSee CREATE_INDEXES.md for detailed instructions.");
  } catch (error: any) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

triggerIndexCreation();

