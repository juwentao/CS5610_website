import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    // Validate password length
    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      await register(username, email, password)
      navigate('/games')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <header className="page-header flow">
        <div className="tag">Create your profile</div>
        <h1 className="section-title">Join the ZenGrid community</h1>
        <p>Track your progress, appear on the leaderboard, and compete with other players.</p>
      </header>

      <section className="auth-grid">
        <form className="form-grid" aria-label="Register form" onSubmit={handleSubmit}>
          {error && (
            <div className="form-error" role="alert">
              {error}
            </div>
          )}

          <label htmlFor="reg-username">Username</label>
          <input 
            id="reg-username" 
            name="username" 
            type="text" 
            placeholder="Choose a username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required 
            disabled={loading}
            minLength={3}
            maxLength={30}
          />

          <label htmlFor="reg-email">Email</label>
          <input 
            id="reg-email" 
            name="email" 
            type="email" 
            placeholder="you@example.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            disabled={loading}
          />

          <label htmlFor="reg-password">Password</label>
          <input 
            id="reg-password" 
            name="password" 
            type="password" 
            placeholder="Create a password (min 6 characters)" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            disabled={loading}
            minLength={6}
          />

          <label htmlFor="reg-confirm">Verify password</label>
          <input 
            id="reg-confirm" 
            name="confirm" 
            type="password" 
            placeholder="Re-enter password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required 
            disabled={loading}
          />

          <button className="button" type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <aside className="benefits flow">
          <h2>Why join?</h2>
          <ul>
            <li>Track your puzzle completion times.</li>
            <li>Appear on the global leaderboard.</li>
            <li>Your username shows when you create games.</li>
          </ul>
          <p style={{ marginTop: '1rem' }}>Already have an account? <Link to="/login">Sign in here</Link>.</p>
        </aside>
      </section>
    </main>
  )
}

export default Register
