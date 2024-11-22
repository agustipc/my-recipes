'use client'

import useAuth from '../hooks/useAuth'

const HomePage = () => {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-6 bg-white shadow-md">
        <h1 className="text-xl font-bold text-mint">My Recipes</h1>
        <div>
          {user && (
            <>
              <span className="mr-4 text-gray-600">Hola, {user.email}</span>
              <button
                onClick={logout}
                className="px-4 py-2 text-white bg-red-400 rounded hover:bg-opacity-80 focus:outline-none"
              >
                Cerrar Sesión
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-grow p-8">
        <div className="p-6 bg-white rounded shadow-md w-full max-w-lg text-center">
          <h2 className="text-2xl font-semibold text-mint mb-4">
            Bienvenido a My Recipes
          </h2>
          <p className="text-gray-600 mb-4">
            Aquí puedes explorar recetas deliciosas y compartir tus favoritas.
          </p>
          {user ? (
            <p className="text-gray-600">
              Disfruta personalizando tu experiencia y creando tus propias
              recetas.
            </p>
          ) : (
            <p className="text-gray-600">
              Inicia sesión para guardar tus recetas favoritas y más.
            </p>
          )}
        </div>
      </main>
    </div>
  )
}

export default HomePage
