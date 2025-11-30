import { useEffect } from 'react'
import { useGame } from '../context/GameContext'
import Board from '../components/Board'
import Timer from '../components/Timer'
import GameControls from '../components/GameControls'
import WinMessage from '../components/WinMessage'

function GameNormal() {
  const { initializeGame, board, isGameWon, timer, gameMode } = useGame()
  
  useEffect(() => {
    // Always reinitialize when entering this page
    initializeGame('normal')
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  
  const filledCells = board.flat ? board.flat().filter(v => v !== 0).length : 0
  const totalCells = 81
  
  return (
    <main>
      <header className="page-header flow">
        <div className="tag">Standard Grid • 9×9</div>
        <h1 className="section-title">Normal Mode Puzzle</h1>
        <p>Track the cascading clues and logic that power this classic Sudoku experience. Pencil marks and strategy will guide you.</p>
      </header>

      {isGameWon && <WinMessage timer={timer} />}

      <section className="board-layout">
        <article className="board-card">
          <div className="board-header">
            <Timer />
            <div className="progress">
              <span>Cells filled: <strong>{filledCells} / {totalCells}</strong></span>
            </div>
          </div>
          <Board size={9} />
          <GameControls />
        </article>

        <aside className="notes">
          <h2>How to Play</h2>
          <ol>
            <li><strong>Click</strong> on any empty cell to select it.</li>
            <li><strong>Type a number</strong> (1-9) to fill the cell.</li>
            <li><strong>Press Delete or Backspace</strong> to clear a cell.</li>
            <li><strong>Use arrow keys</strong> to navigate between cells.</li>
            <li><strong>Red borders</strong> indicate rule violations.</li>
          </ol>
          <h2 style={{ marginTop: '1rem' }}>Strategy Tips</h2>
          <ul>
            <li><strong>Naked Singles:</strong> Find cells with only one possibility.</li>
            <li><strong>Hidden Singles:</strong> Find numbers that can only go in one cell within a region.</li>
            <li><strong>Pointing Pairs:</strong> Use constraints from boxes to eliminate candidates in rows/columns.</li>
          </ul>
        </aside>
      </section>
    </main>
  )
}

export default GameNormal
