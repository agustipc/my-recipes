'use client'

import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { exampleRecipes } from '@/data/mockRecipes'
import { Recipe } from '@/types'

const RecipeDetail = () => {
  const { recipeId } = useParams()
  const router = useRouter()
  const [recipe, setRecipe] = useState<Recipe | null>(null)

  useEffect(() => {
    const foundRecipe = exampleRecipes.find((recipe) => recipe.id === recipeId)

    if (!foundRecipe) {
      router.push('/')
      return
    }

    setRecipe(foundRecipe)
  }, [recipeId, router])

  if (!recipe) {
    return (
      <p className="flex flex-col justify-center items-center text-center text-gray-600 bg-cream h-screen">
        Cargando...
      </p>
    )
  }

  return (
    <div className="min-h-screen bg-cream p-4 md:p-8">
      {/* Barra decorativa superior */}
      <div
        className="w-16 h-2 mx-auto mb-6 rounded-full"
        style={{ backgroundColor: recipe.bgColor }}
      ></div>

      <button
        onClick={() => router.push('/')}
        className="mb-4 text-mint font-bold hover:underline"
      >
        ← Volver
      </button>

      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-md p-4 md:p-8 flex flex-col md:flex-row">
        {/* Imagen */}
        <div className="relative w-full h-64 md:h-auto md:w-1/2 rounded-md overflow-hidden">
          <Image
            src={recipe.image_url || 'https://via.placeholder.com/600'}
            alt={recipe.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Contenido */}
        <div className="flex-1 mt-4 md:mt-0 md:ml-8">
          <h1 className="flex items-center text-3xl font-bold text-gray-900 mb-4">
            {recipe.title}
            <span
              className="ml-4 w-4 h-4 rounded-full"
              style={{ backgroundColor: recipe.bgColor }}
            ></span>
          </h1>
          <p className="text-gray-600 mb-6">{recipe.description}</p>

          {/* Ingredientes */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Ingredientes
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.name} - {ingredient.quantity}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mt-8 mx-auto bg-white shadow-md rounded-md p-4 md:p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Pasos</h2>
        <ol className="list-decimal list-inside text-gray-600 space-y-2">
          {recipe.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default RecipeDetail
