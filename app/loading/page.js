'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../lib/supabase'

export default function LoadingPage() {
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const handleAuth = async () => {
      // Get the hash from the URL - Supabase puts the token here
      const hash = window.location.hash
      
      if (hash && hash.includes('access_token')) {
        // Let Supabase process the hash automatically
        await new Promise(r => setTimeout(r, 2000))
      }

      // Keep checking for up to 8 seconds
      for (let i = 0; i < 8; i++) {
        await new Promise(r => setTimeout(r, 1000))
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          router.push('/dashboard')
          return
        }
      }
      
      // Timed out - go back to login
      router.push('/')
    }

    handleAuth()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0f2744' }}>
      <div className="text-center">
        <div className="text-white text-5xl mb-6" style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⟳</div>
        <div className="text-white text-lg font-semibold mb-2">Signing you in...</div>
        <div className="text-slate-400 text-sm">Just a moment</div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  )
}
