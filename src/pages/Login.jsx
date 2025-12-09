import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(username, password)
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
        <div className="tag">Welcome back</div>
        <h1 className="section-title">Sign in to continue</h1>
        <p>Access your puzzle history and compete on the leaderboard with your username.</p>
      </header>

      <section className="auth-grid">
        <form className="form-grid" aria-label="Login form" onSubmit={handleSubmit}>
          {error && (
            <div className="form-error" role="alert">
              {error}
            </div>
          )}

          <label htmlFor="username">Username</label>
          <input 
            id="username" 
            name="username" 
            type="text" 
            placeholder="Enter username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required 
            disabled={loading}
          />

          <label htmlFor="password">Password</label>
          <input 
            id="password" 
            name="password" 
            type="password" 
            placeholder="Enter password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            disabled={loading}
          />

          <button className="button" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="auth-note flow">
          <h2>Need an account?</h2>
          <p>Registration is quick. Create a profile to start tracking your puzzle history and appear on the leaderboard.</p>
          <Link className="button button--alt" to="/register">Go to register</Link>
        </div>
      </section>
    </main>
  )
}

export default Login
