function HighScores() {
  const leaderboardData = [
    { rank: 1, username: 'GridGlyph', completed: 148, streak: '24 days' },
    { rank: 2, username: 'LogicLyra', completed: 136, streak: '19 days' },
    { rank: 3, username: 'NixNumbers', completed: 121, streak: '12 days' },
    { rank: 4, username: 'ZenScribe', completed: 98, streak: '8 days' },
    { rank: 5, username: 'PuzzlePiper', completed: 74, streak: '5 days' },
    { rank: 6, username: 'SudokuSage', completed: 67, streak: '4 days' },
    { rank: 7, username: 'NumberNinja', completed: 55, streak: '3 days' },
    { rank: 8, username: 'GridMaster', completed: 42, streak: '2 days' }
  ]

  return (
    <main>
      <header className="page-header flow">
        <div className="tag">Hall of fame</div>
        <h1 className="section-title">Top mock solvers</h1>
        <p>These dedicated puzzlers have completed the most handcrafted challenges across easy and normal modes. Cheer them on and aim even higher!</p>
      </header>

      <section className="leaderboard">
        <table className="table" aria-describedby="leaderboard-caption">
          <caption id="leaderboard-caption">Mock leaderboard reset weekly every Monday at 06:00 UTC.</caption>
          <thead>
            <tr>
              <th scope="col">Rank</th>
              <th scope="col">Username</th>
              <th scope="col">Completed</th>
              <th scope="col">Streak</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map(player => (
              <tr key={player.rank}>
                <td>{player.rank}</td>
                <td>{player.username}</td>
                <td>{player.completed}</td>
                <td>{player.streak}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="callout flow">
        <h2>Submit your score</h2>
        <p>Ready to see your name glow in the leaderboard? Log in, complete a puzzle, and we'll auto-update your stats during our next sprint. This is mock data for demonstration purposes.</p>
      </section>
    </main>
  )
}

export default HighScores
