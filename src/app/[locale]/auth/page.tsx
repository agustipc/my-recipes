'use client'

import Image from 'next/image'
import { useState } from 'react'
import useAuth from '@/app/hooks/useAuth'
import { Toaster } from 'react-hot-toast'

const AuthPage = () => {
  const [isLoginTab, setIsLoginTab] = useState(true)

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [signupError, setSignupError] = useState('')

  const { login, signup } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')

    try {
      await login(loginEmail, loginPassword)
    } catch (error) {
      console.error(error)
      setLoginError('Credenciales incorrectas')
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setSignupError('')

    try {
      await signup(signupEmail, signupPassword)
      setSignupEmail('')
      setSignupPassword('')
      setIsLoginTab(true)
    } catch (error) {
      console.error(error)
      setSignupError('Error al registrar usuario')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cream text-gray-600">
      <Toaster />
      <h1 className="text-3xl font-bold text-mint ">SA NOSTRA CUINA</h1>
      <Image
        src="/images/logo_sa_nostra_cuina.png"
        alt="Logo sa nostra cuina"
        className="pb-20 pt-2"
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
            <input
              type="email"
              name="hidden-email"
              autoComplete="username"
              style={{ display: 'none' }}
            />
            <input
              type="password"
              name="hidden-password"
              autoComplete="new-password"
              style={{ display: 'none' }}
            />
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
                  ? 'bg-peach text-gray-700 hover:bg-opacity-80'
                  : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              }`}
            >
              Iniciar Sesión
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="space-y-4">
            <input
              type="email"
              name="hidden-signup-email"
              autoComplete="username"
              style={{ display: 'none' }}
            />
            <input
              type="password"
              name="hidden-signup-password"
              autoComplete="new-password"
              style={{ display: 'none' }}
            />
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
                  ? 'bg-peach text-gray-700 hover:bg-opacity-80'
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
