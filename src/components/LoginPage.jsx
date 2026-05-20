import { useState } from 'react'

export default function LoginPage({ onLogin }) {
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }))
    setError('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (mode === 'signup' && !form.name.trim()) return setError('Please enter your name.')
    if (!form.email.trim()) return setError('Please enter your email.')
    if (form.password.length < 6) return setError('Password must be at least 6 characters.')
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onLogin({ name: mode === 'signup' ? form.name.trim() : form.email.split('@')[0], email: form.email })
    }, 800)
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-brand-center">
          <div className="login-logo-text">Nexus</div>
          <p className="login-tagline">Share moments. Feel connected.</p>
        </div>

        <div className="login-tabs">
          <div className={`login-tab ${mode === 'login' ? 'active' : ''}`} onClick={() => { setMode('login'); setError('') }}>
            Log in
          </div>
          <div className={`login-tab ${mode === 'signup' ? 'active' : ''}`} onClick={() => { setMode('signup'); setError('') }}>
            Sign up
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <input
              className="login-input"
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={e => set('name', e.target.value)}
              autoFocus={mode === 'signup'}
            />
          )}
          <input
            className="login-input"
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={e => set('email', e.target.value)}
            autoFocus={mode === 'login'}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={e => set('password', e.target.value)}
          />

          {error && <div className="login-error">{error}</div>}

          {mode === 'signup' && (
            <p className="signup-terms">
              By signing up you agree to our <span>Terms</span> and <span>Privacy Policy</span>.
            </p>
          )}

          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? <span className="login-spinner" /> : mode === 'login' ? 'Log in' : 'Create account'}
          </button>

          {mode === 'login' && (
            <div className="login-forgot">Forgot password?</div>
          )}
        </form>
      </div>
    </div>
  )
}
