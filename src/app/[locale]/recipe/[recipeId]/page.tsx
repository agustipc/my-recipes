'use client'

import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Recipe } from '@/app/types'
import { useRecipesContext } from '@/app/context/recipesContext'

const RecipeDetail = () => {
  const { recipeId } = useParams()
  const router = useRouter()
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const { state } = useRecipesContext()

  useEffect(() => {
    const found = state.recipes.find((r) => r.id === recipeId)

    if (!found) {
      router.push('/')
      return
    }

    setRecipe(found)
  }, [recipeId, router, state.recipes])

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
      <div className="w-16 h-2 mx-auto mb-6 rounded-full bg-slate-400"></div>

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
            alt={recipe.recipe_translations[0].title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Contenido */}
        <div className="flex-1 mt-4 md:mt-0 md:ml-8">
          <h1 className="flex items-center text-3xl font-bold text-gray-900 mb-4">
            {recipe.recipe_translations[0].title}
            <span className="ml-4 w-4 h-4 rounded-full bg-slate-700"></span>
          </h1>
          <p className="text-gray-600 mb-6">
            {recipe.recipe_translations[0].description}
          </p>

          {/* Ingredientes */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Ingredientes
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              {recipe.recipe_ingredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.ingredient.ingredient_translations[0].name} -{' '}
                  {ingredient.quantity}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mt-8 mx-auto bg-white shadow-md rounded-md p-4 md:p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Pasos</h2>
        <ol className="list-decimal list-inside text-gray-600 space-y-2">
          {recipe.recipe_steps.map((step, index) => (
            <li key={index}>{step.instruction}</li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default RecipeDetail
