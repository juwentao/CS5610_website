import { Link } from 'react-router-dom'

function Login() {
  const handleSubmit = (e) => {
    e.preventDefault()
    // Mock functionality - does nothing
  }

  return (
    <main>
      <header className="page-header flow">
        <div className="tag">Welcome back</div>
        <h1 className="section-title">Sign in to continue</h1>
        <p>Access your puzzle drafts, streak progress, and personalized themes. This mock form showcases our upcoming authentication flow.</p>
      </header>

      <section className="auth-grid">
        <form className="form-grid" aria-label="Login form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input id="username" name="username" type="text" placeholder="Enter username" required />

          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" placeholder="Enter password" required />

          <button className="button" type="submit">Sign in (mock)</button>
        </form>

        <div className="auth-note flow">
          <h2>Need an account?</h2>
          <p>Registration is quick. Create a profile to start saving your puzzle history and unlock streak reminders.</p>
          <Link className="button button--alt" to="/register">Go to register</Link>
        </div>
      </section>
    </main>
  )
}

export default Login
