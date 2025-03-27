'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Recipe } from '../types'

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const router = useRouter()

  const handleCardClick = () => {
    router.push(`/recipe/${recipe.id}`)
  }

  return (
    <div
      onClick={handleCardClick}
      className={`cursor-pointer rounded shadow-md overflow-hidden transition-transform transform hover:scale-105 bg-slate-200`}
    >
      {/* Imagen */}
      <div className="relative w-full aspect-video">
        <Image
          src={recipe.image_url || 'https://via.placeholder.com/300'}
          alt={recipe.recipe_translations[0].title}
          fill
          className="object-cover"
        />
      </div>

      {/* Contenido */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">
          {recipe.recipe_translations[0].title}
        </h3>
        <p className="text-gray-600 line-clamp-2">
          {recipe.recipe_translations[0].description}
        </p>
        <div className="mt-2 flex gap-2 flex-wrap">
          {recipe.recipe_tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-sm text-white rounded bg-red-200"
            >
              {tag.tag_translations[0].name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RecipeCard
