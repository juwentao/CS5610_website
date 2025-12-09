import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { gameApi } from '../services/api'

function Selection() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  // Fetch all games
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await gameApi.getAll()
        setGames(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }
    fetchGames()
  }, [])

  // Create new game
  const handleCreateGame = async (difficulty) => {
    try {
      setCreating(true)
      const game = await gameApi.create(difficulty)
      navigate(`/game/${game._id}`)
    } catch (err) {
      setError(err.message)
      setCreating(false)
    }
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return date.toLocaleDateString('en-US', options)
  }

  return (
    <main>
      <header className="page-header flow">
        <div className="tag">Game Library</div>
        <h1 className="section-title">Choose your next challenge</h1>
        <p>Create a new game or select from existing puzzles created by the community.</p>
      </header>

      <section className="create-game-section">
        <h2>Create New Game</h2>
        <div className="create-buttons">
          <button 
            className="button button--primary" 
            onClick={() => handleCreateGame('NORMAL')}
            disabled={creating}
          >
            {creating ? 'Creating...' : 'Create Normal Game (9×9)'}
          </button>
          <button 
            className="button button--secondary" 
            onClick={() => handleCreateGame('EASY')}
            disabled={creating}
          >
            {creating ? 'Creating...' : 'Create Easy Game (6×6)'}
          </button>
        </div>
      </section>

      {error && (
        <div className="error-banner" role="alert">
          <p>{error}</p>
        </div>
      )}

      <section className="game-list-section" aria-labelledby="games-heading">
        <h2 id="games-heading">Existing Games</h2>
        
        {loading ? (
          <div className="loading-container">
            <p>Loading games...</p>
          </div>
        ) : games.length === 0 ? (
          <div className="empty-state">
            <p>No games yet. Create one to get started!</p>
          </div>
        ) : (
          <div className="games-table-container">
            <table className="games-table">
              <thead>
                <tr>
                  <th>Game Name</th>
                  <th>Difficulty</th>
                  <th>Created By</th>
                  <th>Date Created</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {games.map(game => (
                  <tr key={game._id}>
                    <td className="game-name">{game.name}</td>
                    <td>
                      <span className={`difficulty-badge difficulty-badge--${game.difficulty.toLowerCase()}`}>
                        {game.difficulty === 'EASY' ? '6×6 Easy' : '9×9 Normal'}
                      </span>
                    </td>
                    <td>{game.creatorUsername}</td>
                    <td>{formatDate(game.createdAt)}</td>
                    <td>
                      <span className={`status-badge ${game.isCompleted ? 'status-badge--completed' : 'status-badge--active'}`}>
                        {game.isCompleted ? 'Completed' : 'In Progress'}
                      </span>
                    </td>
                    <td>
                      <Link className="button button--small" to={`/game/${game._id}`}>
                        {game.isCompleted ? 'View' : 'Play'}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  )
}

export default Selection
