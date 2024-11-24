'use client'

import Image from 'next/image'
import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useRouter } from 'next/navigation'

const AuthPage = () => {
  const router = useRouter()
  const [isLoginTab, setIsLoginTab] = useState(true)

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [signupError, setSignupError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword
    })
    if (error) {
      setLoginError('Correo o contraseña incorrectos.')
    } else {
      router.push('/')
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setSignupError('')
    const { error } = await supabase.auth.signUp({
      email: signupEmail,
      password: signupPassword
    })
    if (error) {
      setSignupError('No se pudo registrar. Intenta con otro correo.')
    } else {
      router.push('/')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cream text-gray-600">
      <h1 className="text-3xl font-bold text-mint ">SA NOSTRA CUINA</h1>
      <Image
        src="/images/logo_sa_nostra_cuina.png"
        alt="Descripción de la imagen"
        className="pb-20 pt-4"
        height={100}
        width={100}
      />
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 mb-36">
        {/* Tabs */}
        <div className="flex justify-between mb-6">
          <button
            onClick={() => setIsLoginTab(true)}
            className={`w-1/2 py-2 text-center font-bold ${
              isLoginTab
                ? 'text-mint border-b-2 border-mint'
                : 'text-gray-400 border-b'
            }`}
          >
            Iniciar Sesión
          </button>
          <button
            onClick={() => setIsLoginTab(false)}
            className={`w-1/2 py-2 text-center font-bold ${
              !isLoginTab
                ? 'text-mint border-b-2 border-mint'
                : 'text-gray-400 border-b'
            }`}
          >
            Registrarse
          </button>
        </div>

        {/* Contenido dinámico */}
        {isLoginTab ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700">Correo</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-peach"
                placeholder="correo@ejemplo.com"
                autoComplete="off"
              />
            </div>
            <div>
              <label className="block text-gray-700">Contraseña</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-peach"
                placeholder="********"
                autoComplete="off"
              />
            </div>
            {loginError && <p className="text-red-400 text-sm">{loginError}</p>}
            <button
              type="submit"
              disabled={!loginEmail || !loginPassword}
              className={`w-full py-2 rounded ${
                loginEmail && loginPassword
                  ? 'bg-peach text-white hover:bg-opacity-80'
                  : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              }`}
            >
              Iniciar Sesión
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-gray-700">Correo</label>
              <input
                type="email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-peach"
                placeholder="correo@ejemplo.com"
                autoComplete="off"
              />
            </div>
            <div>
              <label className="block text-gray-700">Contraseña</label>
              <input
                type="password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-peach"
                placeholder="********"
                autoComplete="off"
              />
            </div>
            {signupError && (
              <p className="text-red-400 text-sm">{signupError}</p>
            )}
            <button
              type="submit"
              disabled={!signupEmail || !signupPassword}
              className={`w-full py-2 rounded ${
                signupEmail && signupPassword
                  ? 'bg-peach text-white hover:bg-opacity-80'
                  : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              }`}
            >
              Registrarse
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default AuthPage
