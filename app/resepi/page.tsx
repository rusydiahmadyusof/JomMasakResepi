import { Suspense } from "react";
import { RecipesContent } from "./recipes-content";

export default function RecipesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense
        fallback={
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <p className="mt-4 text-gray-600">Memuatkan...</p>
          </div>
        }
      >
        <RecipesContent />
      </Suspense>
    </div>
  );
}
