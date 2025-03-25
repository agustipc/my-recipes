import { Recipe } from '../types'

export const exampleRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Tarta de Manzana',
    description: 'Una deliciosa tarta de manzana con un toque de canela.',
    image_url:
      'https://www.hola.com/horizon/landscape/3f40d4998fc3-tarta-manzan-arguinano-t.jpg?im=Resize=(960),type=downsize',
    ingredients: [
      { name: 'Manzanas', quantity: '4 unidades' },
      { name: 'Harina', quantity: '200g' },
      { name: 'Azúcar', quantity: '100g' },
      { name: 'Canela', quantity: '1 cucharadita' }
    ],
    steps: [
      'Pelar y cortar las manzanas.',
      'Mezclar harina, azúcar y canela.',
      'Hornear a 180°C durante 40 minutos.'
    ],
    tags: [
      { text: 'Dulce', color: '#f8c9b9' },
      { text: 'Fácil', color: '#94d2bd' }
    ],
    bgColor: '#fde8df'
  },
  {
    id: '2',
    title: 'Pasta al Pesto',
    description: 'La clásica receta italiana de pesto casero.',
    image_url:
      'https://www.lavanguardia.com/files/og_thumbnail/uploads/2020/05/29/5ed11fb61d750.jpeg',
    ingredients: [
      { name: 'Pasta', quantity: '250g' },
      { name: 'Albahaca', quantity: '50g' },
      { name: 'Aceite de oliva', quantity: '50ml' },
      { name: 'Queso parmesano', quantity: '50g' }
    ],
    steps: [
      'Cocer la pasta.',
      'Preparar el pesto mezclando albahaca, aceite y parmesano.',
      'Servir la pasta con la salsa de pesto.'
    ],
    tags: [
      { text: 'Salado', color: '#94d2bd' },
      { text: 'Rápido', color: '#f8c9b9' }
    ],
    bgColor: '#eaf4e1'
  },
  {
    id: '3',
    title: 'Sopa de Calabaza',
    description: 'Una reconfortante sopa de calabaza ideal para el otoño.',
    image_url:
      'https://www.allrecipes.com/thmb/EMwKXIsHlFxRoaXCjb01Mp4MDNw=/0x512/filters:no_upscale():max_bytes(150000):strip_icc()/9191-PumpkinSoup-ddmfs-4X3-0150-0628bffddba64c2285d554ea97608f66.jpg',
    ingredients: [
      { name: 'Calabaza', quantity: '500g' },
      { name: 'Cebolla', quantity: '1 unidad' },
      { name: 'Ajo', quantity: '2 dientes' },
      { name: 'Caldo de verduras', quantity: '1 litro' }
    ],
    steps: [
      'Sofreír la cebolla y el ajo picados.',
      'Añadir la calabaza troceada y cocinar durante 5 minutos.',
      'Incorporar el caldo y cocinar a fuego lento durante 20 minutos.',
      'Triturar hasta obtener una textura cremosa.'
    ],
    tags: [
      { text: 'Saludable', color: '#f8c9b9' },
      { text: 'Vegano', color: '#94d2bd' }
    ],
    bgColor: '#e3f2fd'
  },
  {
    id: '4',
    title: 'Brownies de Chocolate',
    description: 'Unos brownies húmedos y llenos de sabor a chocolate.',
    image_url:
      'https://images.squarespace-cdn.com/content/v1/60ff20587f00f42b9b296006/1628887681392-0FBJG82YWE86031J2CPQ/brownie.JPG?format=500w',
    ingredients: [
      { name: 'Chocolate negro', quantity: '200g' },
      { name: 'Mantequilla', quantity: '100g' },
      { name: 'Azúcar', quantity: '150g' },
      { name: 'Huevos', quantity: '2 unidades' },
      { name: 'Harina', quantity: '50g' }
    ],
    steps: [
      'Fundir el chocolate con la mantequilla.',
      'Añadir el azúcar y mezclar bien.',
      'Incorporar los huevos uno a uno.',
      'Agregar la harina tamizada y mezclar suavemente.',
      'Hornear a 180°C durante 25 minutos.'
    ],
    tags: [
      { text: 'Dulce', color: '#94d2bd' },
      { text: 'Fácil', color: '#94d2bd' }
    ],
    bgColor: '#e8f5f1'
  }
]
