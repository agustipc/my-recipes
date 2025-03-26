import { User } from '@supabase/supabase-js'

export interface Ingredient {
  name: string
  quantity: string
}

export interface Tag {
  text: string
  color: string
}

export interface Recipe {
  id: string
  title: string
  description: string
  image_url?: string
  ingredients: Ingredient[]
  steps: string[]
  tags: Tag[]
  bgColor?: string
}

export type AuthState = { user: User | null }
export type AuthAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'CLEAR_USER' }

export type RecipesState = { recipes: Recipe[] }
export type RecipesAction =
  | { type: 'SET_RECIPES'; payload: Recipe[] }
  | { type: 'ADD_RECIPE'; payload: Recipe }
