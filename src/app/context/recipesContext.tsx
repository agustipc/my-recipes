'use client'

import { createContext, useReducer, useContext, useEffect } from 'react'
import type { RecipesAction, RecipesState } from '../types'
import useRecipes from '../hooks/useRecipes'

const RecipesContext = createContext<{
  state: RecipesState
  dispatch: React.Dispatch<RecipesAction>
} | null>(null)

const recipesReducer = (
  state: RecipesState,
  action: RecipesAction
): RecipesState => {
  switch (action.type) {
    case 'SET_RECIPES':
      return { recipes: action.payload }
    case 'ADD_RECIPE':
      return { recipes: [...state.recipes, action.payload] }
    default:
      return state
  }
}

export const RecipesProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [state, dispatch] = useReducer(recipesReducer, { recipes: [] })
  const { fetchRecipes } = useRecipes()

  useEffect(() => {
    const load = async () => {
      const recipes = await fetchRecipes()
      dispatch({ type: 'SET_RECIPES', payload: recipes })
    }
    load()
  }, [])

  return (
    <RecipesContext.Provider value={{ state, dispatch }}>
      {children}
    </RecipesContext.Provider>
  )
}

export const useRecipesContext = () => {
  const context = useContext(RecipesContext)
  if (!context)
    throw new Error('useRecipesContext must be used within a RecipesProvider')
  return context
}
