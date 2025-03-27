'use client'

import { useEffect, useState } from 'react'
import { useRecipesContext } from '../context/recipesContext'
import type { Recipe, RawRecipe } from '../types'
import { getSupabaseClient } from '../lib/supabaseClient'

const useRecipes = () => {
  const { dispatch } = useRecipesContext()
  const [supabase, setSupabase] = useState<ReturnType<
    typeof getSupabaseClient
  > | null>(null)

  useEffect(() => {
    setSupabase(getSupabaseClient())
  }, [])

  useEffect(() => {
    if (!supabase) return

    const fetchRecipes = async () => {
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
        return
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

      dispatch({ type: 'SET_RECIPES', payload: formatted })
    }

    fetchRecipes()
  }, [supabase, dispatch])

  const addRecipe = (recipe: Recipe) => {
    dispatch({ type: 'ADD_RECIPE', payload: recipe })
  }

  return { addRecipe }
}

export default useRecipes
