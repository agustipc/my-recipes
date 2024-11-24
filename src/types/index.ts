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
