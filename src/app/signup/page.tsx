'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useRouter } from 'next/navigation'

const Signup = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    const { error } = await supabase.auth.signUp({ email, password })
    if (error) {
      setError('No se pudo registrar. Intenta con otro correo.')
    } else {
      router.push('/login')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-cream text-gray-600">
      <div className="p-6 bg-white rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center text-mint">
          Regístrate
        </h1>
        <form onSubmit={handleSignup}>
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
            <label className="block">Correo</label>
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
            <label className="block">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-peach"
              placeholder="********"
              autoComplete="off"
            />
          </div>
          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-peach py-2 rounded hover:bg-opacity-80 focus:outline-none"
          >
            Regístrate
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          ¿Ya tienes cuenta?{' '}
          <a
            href="/login"
            className="text-mint font-bold hover:underline focus:outline-none"
          >
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  )
}

export default Signup
