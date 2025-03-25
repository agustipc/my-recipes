'use client'

import { useState, useEffect } from 'react'
import { getSupabaseClient } from '../lib/supabaseClient'
import { User } from '@supabase/supabase-js'

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [supabase, setSupabase] = useState<ReturnType<
    typeof getSupabaseClient
  > | null>(null)

  useEffect(() => {
    const checkSupabase = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/?apikey=${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
        )
        if (!response.ok) throw new Error('Supabase not available')
        setSupabase(getSupabaseClient())
      } catch (error) {
        console.warn('Supabase error:', error)
        setSupabase(null)
      }
    }

    checkSupabase()
  }, [])

  useEffect(() => {
    if (!supabase) return

    const fetchUser = async () => {
      try {
        const { data } = await supabase.auth.getSession()
        setUser(data.session?.user || null)
      } catch (error) {
        console.error('Supabase error:', error)
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
  }, [supabase])

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
