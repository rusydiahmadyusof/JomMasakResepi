import Link from "next/link";
import { CATEGORIES } from "@/lib/constants/categories";

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {CATEGORIES.map((category) => (
        <Link
          key={category.slug}
          href={`/resepi?kategori=${category.slug}`}
          className="flex flex-col items-center justify-center p-6 bg-white rounded-lg border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all group"
        >
          <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">
            {category.icon}
          </span>
          <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
            {category.name}
          </span>
        </Link>
      ))}
    </div>
  );
}

