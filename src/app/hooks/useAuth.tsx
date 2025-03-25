'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { User } from '@supabase/supabase-js'

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (!supabase) return console.warn('Supabase is not active')

    const fetchUser = async () => {
      try {
        const { data } = await supabase!.auth.getSession()
        setUser(data.session?.user || null)
      } catch (error) {
        console.warn('Supabase error:', error)
      }
    }
    fetchUser()

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const logout = async () => {
    const { error } = await supabase!.auth.signOut()
    if (error) {
      console.error('Error al cerrar sesión:', error.message)
    } else {
      setUser(null)
    }
  }

  return { user, logout }
}

export default useAuth
