'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Recipe } from '../types'

const RecipeCard = ({
  id,
  title,
  description,
  image_url,
  tags,
  bgColor
}: Pick<
  Recipe,
  'id' | 'title' | 'description' | 'image_url' | 'tags' | 'bgColor'
>) => {
  const router = useRouter()

  const handleCardClick = () => {
    router.push(`/recipe/${id}`)
  }

  return (
    <div
      onClick={handleCardClick}
      className={`cursor-pointer rounded shadow-md overflow-hidden transition-transform transform hover:scale-105`}
      style={{ backgroundColor: bgColor }}
    >
      {/* Imagen */}
      <div className="relative w-full aspect-video">
        <Image
          src={image_url || 'https://via.placeholder.com/300'}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Contenido */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <p className="text-gray-600 line-clamp-2">{description}</p>
        <div className="mt-2 flex gap-2 flex-wrap">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-sm text-white rounded"
              style={{ backgroundColor: tag.color }}
            >
              {tag.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RecipeCard
