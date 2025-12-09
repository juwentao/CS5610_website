import { useState, useEffect } from 'react'
import { highScoreApi } from '../services/api'

function HighScores() {
  const [highScores, setHighScores] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('ALL')

  useEffect(() => {
    const fetchHighScores = async () => {
      try {
        setLoading(true)
        const difficulty = filter === 'ALL' ? null : filter
        const data = await highScoreApi.getAll(difficulty, 50)
        setHighScores(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }
    fetchHighScores()
  }, [filter])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return date.toLocaleDateString('en-US', options)
  }

  return (
    <main>
      <header className="page-header flow">
        <div className="tag">Hall of Fame</div>
        <h1 className="section-title">High Scores</h1>
        <p>The fastest puzzle solvers in the ZenGrid community. Can you make it to the top?</p>
      </header>

      <section className="filter-section">
        <label htmlFor="difficulty-filter">Filter by difficulty:</label>
        <select 
          id="difficulty-filter" 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="ALL">All Difficulties</option>
          <option value="EASY">Easy (6×6)</option>
          <option value="NORMAL">Normal (9×9)</option>
        </select>
      </section>

      {error && (
        <div className="error-banner" role="alert">
          <p>{error}</p>
        </div>
      )}

      <section className="leaderboard">
        {loading ? (
          <div className="loading-container">
            <p>Loading high scores...</p>
          </div>
        ) : highScores.length === 0 ? (
          <div className="empty-state">
            <p>No high scores yet. Be the first to complete a puzzle!</p>
          </div>
        ) : (
          <table className="table" aria-describedby="leaderboard-caption">
            <caption id="leaderboard-caption">Top puzzle solvers ranked by completion time</caption>
            <thead>
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">Player</th>
                <th scope="col">Game</th>
                <th scope="col">Difficulty</th>
                <th scope="col">Time</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {highScores.map((score, index) => (
                <tr key={score._id}>
                  <td className="rank-cell">
                    {index === 0 && '🥇'}
                    {index === 1 && '🥈'}
                    {index === 2 && '🥉'}
                    {index > 2 && (index + 1)}
                  </td>
                  <td className="player-cell">{score.username}</td>
                  <td className="game-cell">{score.gameName}</td>
                  <td>
                    <span className={`difficulty-badge difficulty-badge--${score.difficulty.toLowerCase()}`}>
                      {score.difficulty === 'EASY' ? '6×6' : '9×9'}
                    </span>
                  </td>
                  <td className="time-cell">{formatTime(score.time)}</td>
                  <td>{formatDate(score.completedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="callout flow">
        <h2>How to Get on the Leaderboard</h2>
        <p>Complete any Sudoku puzzle to have your time recorded. The faster you solve, the higher you rank! Log in to have your username displayed instead of "Anonymous".</p>
      </section>
    </main>
  )
}

export default HighScores
