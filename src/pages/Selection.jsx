import { Link } from 'react-router-dom'

function Selection() {
  const games = [
    {
      id: 1,
      title: 'Chromatic Pulse',
      author: 'Mira Caldwell',
      description: 'Pulse through a neon metropolis where every region glows with purpose. Balanced difficulty with symmetrical reveals.',
      mode: 'normal'
    },
    {
      id: 2,
      title: 'Whispering Canopy',
      author: 'Lian Ortega',
      description: 'A gentle forest of six unique species. Perfect for easing into pattern-spotting with guided candidates.',
      mode: 'easy'
    },
    {
      id: 3,
      title: 'Galactic Triangulum',
      author: 'Farah Aziz',
      description: 'Navigate constellations and gravitational pulls with a bold 9x9 puzzle that rewards deduction and patience.',
      mode: 'normal'
    },
    {
      id: 4,
      title: 'Sunset Harbour',
      author: 'Theo Martins',
      description: 'Soft gradients and generous starting clues welcome you to a breezy coastal solve at 6x6 scale.',
      mode: 'easy'
    },
    {
      id: 5,
      title: 'Midnight Express',
      author: 'Alex Chen',
      description: 'A challenging night-time journey through interconnected stations. Master the 9x9 grid to reach your destination.',
      mode: 'normal'
    },
    {
      id: 6,
      title: 'Garden Path',
      author: 'Sofia Rodriguez',
      description: 'Wander through a peaceful garden with this beginner-friendly 6x6 puzzle perfect for newcomers.',
      mode: 'easy'
    }
  ]

  return (
    <main>
      <header className="page-header flow">
        <div className="tag">Game Library</div>
        <h1 className="section-title">Choose your next challenge</h1>
        <p>Explore our curated set of handcrafted Sudoku adventures. Every puzzle includes a narrative and an author to inspire your next solve.</p>
      </header>

      <section className="info-banner" role="status">
        <span>Featured rotation</span>
        <p>This week's spotlight celebrates imagination-heavy themes like neon skylines, rainforest whispers, and cosmic coordinates.</p>
      </section>

      <section className="game-shelf" aria-labelledby="collection-heading">
        <h2 id="collection-heading" className="sr-only">Available games</h2>
        <ul className="game-list" role="list">
          {games.map(game => (
            <li key={game.id} className="game-card">
              <div className="game-card__meta">
                <h3>{game.title}</h3>
                <span>by {game.author}</span>
              </div>
              <p>{game.description}</p>
              <Link 
                className="button" 
                to={game.mode === 'easy' ? '/games/easy' : '/games/normal'}
              >
                Play {game.mode === 'easy' ? '6×6' : '9×9'} puzzle
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default Selection
