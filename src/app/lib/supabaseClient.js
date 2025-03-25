import { createClient } from '@supabase/supabase-js'

const isSupabaseActive = process.env.NEXT_PUBLIC_SUPABASE_ACTIVE === 'true'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = isSupabaseActive
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null
