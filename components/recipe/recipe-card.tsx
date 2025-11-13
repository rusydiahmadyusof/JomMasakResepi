"use client";

import Image from "next/image";
import Link from "next/link";
import { Recipe } from "@/types/recipe";
import { cn } from "@/lib/utils/cn";

interface RecipeCardProps {
  recipe: Recipe;
  className?: string;
}

export function RecipeCard({ recipe, className }: RecipeCardProps) {
  return (
    <Link
      href={`/resepi/${recipe.id}`}
      className={cn(
        "group relative block rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow",
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-200">
        {recipe.imageUrl ? (
          <Image
            src={recipe.imageUrl}
            alt={recipe.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400 text-sm">Tiada Imej</span>
          </div>
        )}
        <div
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md opacity-60"
          aria-label="Simpan resepi (akan datang)"
          title="Fungsi simpan akan datang"
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {recipe.title}
        </h3>
        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{recipe.prepTime} Minit</span>
          </div>
          <div className="flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <span>{recipe.category}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

