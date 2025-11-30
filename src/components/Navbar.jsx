import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="site-nav" aria-label="Primary">
      <div className="site-nav__inner">
        <NavLink className="nav-brand" to="/">
          <span>Σ</span>
          ZenGrid
        </NavLink>
        <div className="nav-links">
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''} end>
            Home
          </NavLink>
          <NavLink to="/games" className={({ isActive }) => isActive ? 'active' : ''}>
            Game Library
          </NavLink>
          <NavLink to="/games/normal" className={({ isActive }) => isActive ? 'active' : ''}>
            Normal Game
          </NavLink>
          <NavLink to="/games/easy" className={({ isActive }) => isActive ? 'active' : ''}>
            Easy Game
          </NavLink>
          <NavLink to="/rules" className={({ isActive }) => isActive ? 'active' : ''}>
            Rules
          </NavLink>
          <NavLink to="/scores" className={({ isActive }) => isActive ? 'active' : ''}>
            High Scores
          </NavLink>
          <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>
            Login
          </NavLink>
          <NavLink to="/register" className={({ isActive }) => isActive ? 'active' : ''}>
            Register
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
