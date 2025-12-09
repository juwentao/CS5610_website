import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

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
            Games
          </NavLink>
          <NavLink to="/scores" className={({ isActive }) => isActive ? 'active' : ''}>
            High Scores
          </NavLink>
          <NavLink to="/rules" className={({ isActive }) => isActive ? 'active' : ''}>
            Rules
          </NavLink>
          
          {isAuthenticated ? (
            <>
              <span className="nav-user">
                <span className="user-icon">👤</span>
                {user.username}
              </span>
              <button className="nav-button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>
                Login
              </NavLink>
              <NavLink to="/register" className={({ isActive }) => isActive ? 'active' : ''}>
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
