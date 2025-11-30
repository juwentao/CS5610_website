import { Link } from 'react-router-dom'

function Register() {
  const handleSubmit = (e) => {
    e.preventDefault()
    // Mock functionality - does nothing
  }

  return (
    <main>
      <header className="page-header flow">
        <div className="tag">Create your profile</div>
        <h1 className="section-title">Join the ZenGrid community</h1>
        <p>Save your favorite themes, track streaks, and sync your progress across devices. Complete the form to reserve your mock account.</p>
      </header>

      <section className="auth-grid">
        <form className="form-grid" aria-label="Register form" onSubmit={handleSubmit}>
          <label htmlFor="reg-username">Username</label>
          <input id="reg-username" name="username" type="text" placeholder="Choose a username" required />

          <label htmlFor="reg-email">Email</label>
          <input id="reg-email" name="email" type="email" placeholder="you@example.com" required />

          <label htmlFor="reg-password">Password</label>
          <input id="reg-password" name="password" type="password" placeholder="Create a password" required />

          <label htmlFor="reg-confirm">Verify password</label>
          <input id="reg-confirm" name="confirm" type="password" placeholder="Re-enter password" required />

          <button className="button" type="submit">Create account (mock)</button>
        </form>

        <aside className="benefits flow">
          <h2>Why join?</h2>
          <ul>
            <li>Daily mindful puzzle prompts delivered to your inbox.</li>
            <li>Alternate color palettes for low-light solving.</li>
            <li>Early access to tournament-grade grids.</li>
          </ul>
          <p style={{ marginTop: '1rem' }}>Already have an account? <Link to="/login">Sign in here</Link>.</p>
        </aside>
      </section>
    </main>
  )
}

export default Register
