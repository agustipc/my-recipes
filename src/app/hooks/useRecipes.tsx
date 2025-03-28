'use client'

import type { RawRecipe, Recipe } from '../types'
import { supabase } from '../lib/supabaseClient'

const useRecipes = () => {
  const fetchRecipes = async (): Promise<Recipe[]> => {
    if (!supabase) return []

    const { data, error } = await supabase.from('recipes').select(`
      id,
      user_id,
      image_url,
      created_at,
      category:category_id (id, name, category_translations(locale, name)),
      difficulty:difficulty_id (id, name, difficulty_translations(locale, name)),
      recipe_translations(locale, title, description, notes),
      recipe_steps(step_number, instruction),
      recipe_ingredients(quantity, ingredient:ingredient_id(id, name, ingredient_translations(locale, name))),
      recipe_tags(tag:tag_id(id, name, tag_translations(locale, name, color))),
      recipe_categories(category:category_id(id, name, category_translations(locale, name)))
    `)

    if (error) {
      console.error('Error fetching recipes:', error)
      console.error('Error details:', error.details)
      console.error('Error hint:', error.hint)
      return []
    }

    const typedData = data as unknown as RawRecipe[]

    const formatted: Recipe[] = typedData.map((recipe) => ({
      id: recipe.id,
      user_id: recipe.user_id,
      image_url: recipe.image_url,
      created_at: recipe.created_at,
      recipe_translations: recipe.recipe_translations,
      recipe_steps: recipe.recipe_steps,
      recipe_ingredients: recipe.recipe_ingredients.map((ri) => ({
        quantity: ri.quantity,
        ingredient: {
          id: ri.ingredient.id,
          name: ri.ingredient.name,
          ingredient_translations: ri.ingredient.ingredient_translations
        }
      })),
      recipe_tags: recipe.recipe_tags.map((rt) => ({
        id: rt.tag.id,
        name: rt.tag.name,
        tag_translations: rt.tag.tag_translations
      })),
      recipe_categories: recipe.recipe_categories.map((rc) => ({
        id: rc.category.id,
        name: rc.category.name,
        category_translations: rc.category.category_translations
      })),
      difficulty: {
        id: recipe.difficulty.id,
        name: recipe.difficulty.name,
        difficulty_translations: recipe.difficulty.translations
      }
    }))

    return formatted
  }

  const addRecipe = (recipe: Recipe) => {
    return []
  }

  return { addRecipe, fetchRecipes }
}

export default useRecipes
