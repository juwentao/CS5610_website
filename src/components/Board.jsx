import { useGame } from '../context/GameContext'
import Cell from './Cell'

function Board({ size }) {
  const { board, initialBoard, selectedCell, errors, hintCell } = useGame()
  
  if (!board || board.length === 0) {
    return <div className="board-loading">Loading...</div>
  }
  
  const isSelected = (row, col) => {
    return selectedCell && selectedCell.row === row && selectedCell.col === col
  }
  
  const hasError = (row, col) => {
    return errors.some(e => e.row === row && e.col === col)
  }
  
  const isInitialCell = (row, col) => {
    return initialBoard[row][col] !== 0
  }
  
  const isHintCell = (row, col) => {
    return hintCell && hintCell.row === row && hintCell.col === col
  }
  
  const gridClass = size === 6 ? 'board board--easy' : 'board board--normal'
  
  return (
    <div className={gridClass} role="grid" aria-label={`${size}x${size} Sudoku puzzle`}>
      {board.map((row, rowIndex) => 
        row.map((cellValue, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            row={rowIndex}
            col={colIndex}
            value={cellValue}
            isInitial={isInitialCell(rowIndex, colIndex)}
            isSelected={isSelected(rowIndex, colIndex)}
            hasError={hasError(rowIndex, colIndex)}
            isHint={isHintCell(rowIndex, colIndex)}
            size={size}
          />
        ))
      )}
    </div>
  )
}

export default Board
