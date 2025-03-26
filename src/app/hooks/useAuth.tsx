'use client'

import { useState, useEffect } from 'react'
import { getSupabaseClient } from '../lib/supabaseClient'
import { useAuthContext } from '../context/authContext'
import { useRouter } from '../../i18n/navigation'
import toast from 'react-hot-toast'

const useAuth = () => {
  const { state, dispatch } = useAuthContext()
  const [supabase, setSupabase] = useState<ReturnType<
    typeof getSupabaseClient
  > | null>(null)
  const router = useRouter()

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
        if (data.session?.user) {
          dispatch({ type: 'SET_USER', payload: data.session.user })
        } else {
          dispatch({ type: 'CLEAR_USER' })
        }
      } catch (error) {
        console.error('Supabase error:', error)
      }
    }
    fetchUser()

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        dispatch({ type: 'SET_USER', payload: session.user })
      } else {
        dispatch({ type: 'CLEAR_USER' })
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, dispatch])

  const logout = async () => {
    const { error } = await supabase!.auth.signOut()
    if (error) {
      console.error('Error al cerrar sesión:', error.message)
    } else {
      document.cookie = `is_logged_in=false; path=/; SameSite=Lax`
      dispatch({ type: 'CLEAR_USER' })
    }
  }

  const login = async (email: string, password: string) => {
    if (!supabase) throw new Error('Supabase client not available')
    const { data, error } = await supabase?.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error
    if (data.session?.user) {
      dispatch({ type: 'SET_USER', payload: data.session.user })
      document.cookie = `is_logged_in=true; path=/; SameSite=Lax; max-age=3600`
      router.replace('/')
    }
  }

  const signup = async (email: string, password: string) => {
    if (!supabase) throw new Error('Supabase client not available')
    const { data, error } = await supabase?.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
      }
    })

    if (error) throw error
    if (data.user && !data.session) {
      toast.success('Revisa tu correo para confirmar tu cuenta', {
        duration: 8000
      })
    }
  }

  return { user: state.user, logout, login, signup }
}

export default useAuth
