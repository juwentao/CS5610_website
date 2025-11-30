import { Link } from 'react-router-dom'

function Home() {
  return (
    <main>
      <header className="hero">
        <div className="hero__copy flow">
          <div className="tag">Discover Your Puzzle Flow</div>
          <h1>Sharpen your mind with beautifully crafted Sudoku.</h1>
          <p>Dive into handcrafted puzzles, guided strategies, and progress tracking designed for both curious beginners and seasoned solvers.</p>
          <div className="hero__cta">
            <Link className="button" to="/games">Browse puzzles</Link>
            <Link className="button button--alt" to="/rules">Learn the basics</Link>
          </div>
        </div>
        <div className="hero__visual" aria-hidden="true">
          <img src="https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=680&q=80" alt="Sudoku puzzle in progress on a table" />
        </div>
      </header>

      <section className="feature-section">
        <h2 className="section-title">Why ZenGrid?</h2>
        <div className="feature-grid">
          <article className="feature-card flow">
            <h3>Mindful experience</h3>
            <p>Enjoy a calm, distraction-free layout that keeps every number within reach. Subtle animations guide your attention without overwhelming.</p>
          </article>
          <article className="feature-card flow">
            <h3>Progressive challenges</h3>
            <p>Select from handcrafted puzzle sets curated for each difficulty. Track your progress and explore strategies as you climb.</p>
          </article>
          <article className="feature-card flow">
            <h3>Mobile friendly</h3>
            <p>Solve on any device. The adaptive layout keeps the grid crisp, inputs large enough to tap, and navigation exactly where you need it.</p>
          </article>
        </div>
      </section>

      <section aria-labelledby="toolkit-heading" className="grid-gallery">
        <h2 id="toolkit-heading" className="sr-only">Sudoku toolkit</h2>
        <span>Strategy notes</span>
        <span>Timer tracking</span>
        <span>Theme switch</span>
        <span>Player stats</span>
        <span>Daily streaks</span>
        <span>Community tips</span>
      </section>
    </main>
  )
}

export default Home
