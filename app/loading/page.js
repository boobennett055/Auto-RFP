'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../lib/supabase'

export default function LoadingPage() {
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Give Supabase time to process the session from the URL hash
    const checkSession = async () => {
      // Wait for Supabase to pick up the session from the magic link
      await new Promise(r => setTimeout(r, 2000))
      
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session) {
        router.push('/dashboard')
      } else {
        // Try once more after another second
        await new Promise(r => setTimeout(r, 1000))
        const { data: { session: session2 } } = await supabase.auth.getSession()
        if (session2) {
          router.push('/dashboard')
        } else {
          router.push('/')
        }
      }
    }
    
    checkSession()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0f2744' }}>
      <div className="text-center">
        <div className="text-white text-5xl mb-6">⟳</div>
        <div className="text-white text-lg font-semibold mb-2">Signing you in...</div>
        <div className="text-slate-400 text-sm">Just a moment</div>
      </div>
    </div>
  )
}
