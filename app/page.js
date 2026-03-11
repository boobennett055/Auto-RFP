'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const TEAM_PASSWORD = 'medcraft2026'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === TEAM_PASSWORD) {
      // Store auth in sessionStorage
      sessionStorage.setItem('rfp_authed', 'true')
      router.push('/dashboard')
    } else {
      setError('Incorrect password. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0f2744 0%, #1a3a5c 60%, #0f2744 100%)' }}>
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      <div className="relative z-10 w-full max-w-sm mx-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5 shadow-2xl" style={{ background: '#c49a2a' }}>
            <span className="text-white text-2xl font-bold serif">R</span>
          </div>
          <h1 className="text-3xl font-bold text-white serif mb-2">RFP Studio</h1>
          <p className="text-slate-400 text-sm">Healthcare Real Estate · AI-Powered Responses</p>
        </div>
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <h2 className="font-semibold text-slate-800 text-lg mb-1 serif">Team Access</h2>
          <p className="text-slate-400 text-sm mb-6">Enter the team password to access RFP Studio.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wide">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter team password"
                required
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-slate-50"
              />
            </div>
            {error && <p className="text-red-500 text-xs bg-red-50 rounded-xl px-3 py-2">{error}</p>}
            <button
              type="submit"
              disabled={!password}
              className="w-full text-white py-3 rounded-xl text-sm font-semibold disabled:opacity-40"
              style={{ background: '#0f2744' }}
            >
              Sign In →
            </button>
          </form>
        </div>
        <p className="text-center text-slate-600 text-xs mt-6 opacity-60">© {new Date().getFullYear()} RFP Studio · Internal team tool</p>
      </div>
    </div>
  )
}
