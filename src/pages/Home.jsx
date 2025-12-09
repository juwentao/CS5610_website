import { Link } from 'react-router-dom'

function Home() {
  return (
    <main className="home-page">
      <header className="hero hero--centered">
        <div className="hero__copy flow">
          <h1 className="hero-title">ZenGrid Sudoku</h1>
          <p className="hero-subtitle">Sharpen your mind with beautifully crafted puzzles</p>
          <div className="hero__cta">
            <Link className="button button--large" to="/games">Play Game</Link>
            <Link className="button button--alt button--large" to="/rules">Learn the Rules</Link>
          </div>
        </div>
      </header>
    </main>
  )
}

export default Home
