import { useRecipesContext } from '../context/recipesContext'
import { Recipe } from '../types'

const useRecipes = () => {
  const { dispatch } = useRecipesContext()

  const loadRecipes = (recipes: Recipe[]) => {
    dispatch({ type: 'SET_RECIPES', payload: recipes })
  }

  const addRecipe = (recipe: Recipe) => {
    dispatch({ type: 'ADD_RECIPE', payload: recipe })
  }

  return { loadRecipes, addRecipe }
}

export default useRecipes
