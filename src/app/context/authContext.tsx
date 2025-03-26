'use client'

import { createContext, ReactNode, useReducer, useContext } from 'react'
import type { AuthAction, AuthState } from '../types'

const AuthContext = createContext<{
  state: AuthState
  dispatch: React.Dispatch<AuthAction>
} | null>(null)

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_USER':
      return { user: action.payload }
    case 'CLEAR_USER':
      return { user: null }
    default:
      return state
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null })

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context)
    throw new Error('useAuthContext must be used within an AuthProvider')
  return context
}
