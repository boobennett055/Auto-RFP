'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../lib/supabase'

export default function LoadingPage() {
  const router = useRouter()
  const [status, setStatus] = useState('Signing you in...')
  const supabase = createClient()

  useEffect(() => {
    const handleAuth = async () => {
      try {
        // Check for code in URL (PKCE flow)
        const params = new URLSearchParams(window.location.search)
        const code = params.get('code')

        if (code) {
          setStatus('Verifying your link...')
          const { error } = await supabase.auth.exchangeCodeForSession(code)
          if (error) {
            setStatus('Link expired — redirecting...')
            setTimeout(() => router.push('/'), 2000)
            return
          }
          setStatus('Success! Loading your dashboard...')
          setTimeout(() => router.push('/dashboard'), 500)
          return
        }

        // Check for hash-based token (implicit flow)
        const hash = window.location.hash
        if (hash && hash.includes('access_token')) {
          setStatus('Processing...')
          await new Promise(r => setTimeout(r, 1500))
          const { data: { session } } = await supabase.auth.getSession()
          if (session) {
            setStatus('Success! Loading your dashboard...')
            setTimeout(() => router.push('/dashboard'), 500)
            return
          }
        }

        // Check if already logged in
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          router.push('/dashboard')
          return
        }

        // Nothing worked
        setStatus('Could not sign in — redirecting...')
        setTimeout(() => router.push('/'), 2000)

      } catch (err) {
        setStatus('Something went wrong — redirecting...')
        setTimeout(() => router.push('/'), 2000)
      }
    }

    handleAuth()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0f2744' }}>
      <div className="text-center">
        <div style={{ fontSize: '3rem', marginBottom: '1.5rem', display: 'inline-block', animation: 'spin 1s linear infinite' }}>⟳</div>
        <div style={{ color: 'white', fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>{status}</div>
        <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Please wait</div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  )
}
