'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useRouter } from 'next/navigation'

const Login = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) {
      setError('Correo o contraseña incorrectos.')
    } else {
      router.push('/')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-cream text-gray-600">
      <div className="p-6 bg-white rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center text-mint">
          Iniciar Sesión
        </h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="hidden-email"
            autoComplete="off"
            style={{ display: 'none' }}
          />
          <input
            type="password"
            name="hidden-password"
            autoComplete="off"
            style={{ display: 'none' }}
          />
          <div className="mb-4">
            <label className="block text-gray-700">Correo</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-peach"
              placeholder="correo@ejemplo.com"
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-peach"
              placeholder="********"
              autoComplete="off"
            />
          </div>
          {error && <p className="text-red-300 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-peach py-2 rounded hover:bg-opacity-80 focus:outline-none"
          >
            Iniciar Sesión
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          ¿No tienes cuenta?{' '}
          <a
            href="/signup"
            className="text-mint font bold hover:underline focus:outline-none"
          >
            Regístrate
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login
