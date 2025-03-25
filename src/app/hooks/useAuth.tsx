'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { User } from '@supabase/supabase-js'
import { useRouter, usePathname } from 'next/navigation'

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getSession()
      setUser(data.session?.user || null)

      if (!data.session?.user && pathname !== '/auth') {
        router.replace('/auth')
      }
    }
    fetchUser()

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)

      if (!session?.user && pathname !== '/auth') {
        router.replace('/auth')
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [pathname, router])

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error al cerrar sesión:', error.message)
    } else {
      setUser(null)
      router.replace('/auth')
    }
  }

  return { user, logout }
}

export default useAuth
