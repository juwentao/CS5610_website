import { useEffect } from 'react'
import { useGame } from '../context/GameContext'
import Board from '../components/Board'
import Timer from '../components/Timer'
import GameControls from '../components/GameControls'
import WinMessage from '../components/WinMessage'

function GameEasy() {
  const { initializeGame, board, isGameWon, timer, gameMode } = useGame()
  
  useEffect(() => {
    // Always reinitialize when entering this page
    initializeGame('easy')
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  
  const filledCells = board.flat ? board.flat().filter(v => v !== 0).length : 0
  const totalCells = 36
  
  return (
    <main>
      <header className="page-header flow">
        <div className="tag">Relaxed Flow • 6×6</div>
        <h1 className="section-title">Easy Mode Puzzle</h1>
        <p>Gentle breezes and generous starters make this a perfect warm-up grid. Focus on patterns and take your time.</p>
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
          <Board size={6} />
          <GameControls />
        </article>

        <aside className="notes">
          <h2>How to Play</h2>
          <ol>
            <li><strong>Click</strong> on any empty cell to select it.</li>
            <li><strong>Type a number</strong> (1-6) to fill the cell.</li>
            <li><strong>Press Delete or Backspace</strong> to clear a cell.</li>
            <li><strong>Use arrow keys</strong> to navigate between cells.</li>
            <li><strong>Red borders</strong> indicate rule violations.</li>
          </ol>
          <h2 style={{ marginTop: '1rem' }}>Rules</h2>
          <ul>
            <li>Each row must contain numbers 1-6 exactly once.</li>
            <li>Each column must contain numbers 1-6 exactly once.</li>
            <li>Each 2×3 box must contain numbers 1-6 exactly once.</li>
          </ul>
        </aside>
      </section>
    </main>
  )
}

export default GameEasy
