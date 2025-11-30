import { useGame } from '../context/GameContext'

function GameControls() {
  const { newGame, resetGame, getHint, isGameWon } = useGame()
  
  const handleHint = () => {
    const hint = getHint()
    if (!hint) {
      alert('No hint available! There are no cells with only one valid option right now.')
    }
  }
  
  return (
    <div className="board-actions">
      <button className="button" type="button" onClick={newGame}>
        New Game
      </button>
      <button className="button button--alt" type="button" onClick={resetGame} disabled={isGameWon}>
        Reset
      </button>
      <button className="button button--hint" type="button" onClick={handleHint} disabled={isGameWon}>
        Hint
      </button>
    </div>
  )
}

export default GameControls
