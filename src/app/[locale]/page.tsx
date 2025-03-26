'use client'

import Image from 'next/image'
import useAuth from '../hooks/useAuth'
import { exampleRecipes } from '../data/mockRecipes'
import RecipeCard from '../components/RecipeCard'
import { useRouter } from '../../i18n/navigation'

const HomePage = () => {
  const { user, logout } = useAuth()
  const router = useRouter()
  return (
    <div className="font-sans min-h-screen bg-cream flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-6 bg-white shadow-md">
        <div className="flex flex-row gap-4 items-center">
          <Image
            className="rounded-md"
            src="/images/sa_nostra_cuina_logo_squared.png"
            alt="Logo sa nostra cuina"
            height={64}
            width={64}
          />
          <h1 className="text-2xl font-bold text-oliveGreen">
            Sa nostra cuina
          </h1>
        </div>
        <div>
          {user ? (
            <>
              <span className="mr-4 text-gray-600">Hola, {user.email}</span>
              <button
                onClick={logout}
                className="px-4 py-2 text-white bg-red-400 rounded hover:bg-opacity-80 focus:outline-none"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <button
              onClick={() => router.push('/auth')}
              className="px-4 py-2 text-white bg-oliveGreen rounded hover:bg-opacity-80 focus:outline-none"
            >
              Iniciar Sesión
            </button>
          )}
        </div>
      </nav>

      {/* Bienvenida */}
      <header className="flex flex-col items-center justify-center bg-oliveGreen text-gray-600 shadow-md rounded mx-6 my-4 p-8 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Bienvenido a Sa nostra cuina
        </h2>
        <p className="text-lg mb-4">
          Encuentra y comparte recetas deliciosas para toda la familia.
        </p>
        <input
          type="text"
          placeholder="Busca una receta..."
          className="w-full max-w-md px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-peach"
        />
      </header>

      {/* Grid de recetas */}
      <main className="grid gap-6 p-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
        {exampleRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} {...recipe} />
        ))}
      </main>

      {/* Footer */}
      <footer className="mt-12 text-center py-4 bg-gray-200">
        <p className="text-gray-600 text-sm">© 2024 Sa nostra cuina.</p>
      </footer>
    </div>
  )
}

export default HomePage
