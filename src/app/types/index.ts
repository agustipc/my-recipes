import { User } from '@supabase/supabase-js'

export interface RawRecipe {
  id: string
  user_id: string
  image_url: string
  created_at: string
  recipe_translations: RecipeTranslation[]
  recipe_steps: Step[]
  recipe_ingredients: {
    quantity: string
    ingredient: Ingredient
  }[]
  recipe_tags: {
    tag: Tag
  }[]
  recipe_categories: {
    category: Category & { category_translations: Translation[] }
  }[]
  difficulty: {
    id: string
    name: string
    translations: Translation[]
  }
}

export interface Translation {
  locale: string
  name: string
}

export interface TagTranslation extends Translation {
  color: string
}

export interface Ingredient {
  id: string
  name: string
  ingredient_translations: Translation[]
}

export interface Tag {
  id: string
  name: string
  tag_translations: TagTranslation[]
}

export interface Category {
  id: string
  name: string
  category_translations: Translation[]
}

export interface Difficulty {
  id: string
  name: string
  difficulty_translations: Translation[]
}

export interface Step {
  step_number: number
  instruction: string
}

export interface RecipeTranslation {
  locale: string
  title: string
  description: string
  notes: string
}
export interface Recipe {
  id: string
  user_id: string
  image_url: string
  created_at: string
  recipe_translations: RecipeTranslation[]
  recipe_steps: Step[]
  recipe_ingredients: {
    quantity: string
    ingredient: Ingredient
  }[]
  recipe_tags: Tag[]
  recipe_categories: Category[]
  difficulty: Difficulty
}

export type RecipesState = { recipes: Recipe[] }
export type RecipesAction =
  | { type: 'SET_RECIPES'; payload: Recipe[] }
  | { type: 'ADD_RECIPE'; payload: Recipe }

export type AuthState = { user: User | null }
export type AuthAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'CLEAR_USER' }
