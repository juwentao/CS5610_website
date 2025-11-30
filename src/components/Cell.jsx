import { useGame } from '../context/GameContext'

function Cell({ row, col, value, isInitial, isSelected, hasError, isHint, size }) {
  const { selectCell, updateCell, isGameWon } = useGame()
  
  const handleClick = () => {
    if (!isGameWon && !isInitial) {
      selectCell(row, col)
    }
  }
  
  const handleKeyDown = (e) => {
    if (isGameWon || isInitial) return
    
    const maxValue = size
    const key = e.key
    
    // Handle number input
    if (/^[1-9]$/.test(key)) {
      const num = parseInt(key)
      if (num <= maxValue) {
        updateCell(row, col, num)
      }
    }
    
    // Handle delete/backspace
    if (key === 'Backspace' || key === 'Delete' || key === '0') {
      updateCell(row, col, 0)
    }
    
    // Handle arrow keys for navigation
    if (key === 'ArrowUp' && row > 0) {
      selectCell(row - 1, col)
    }
    if (key === 'ArrowDown' && row < size - 1) {
      selectCell(row + 1, col)
    }
    if (key === 'ArrowLeft' && col > 0) {
      selectCell(row, col - 1)
    }
    if (key === 'ArrowRight' && col < size - 1) {
      selectCell(row, col + 1)
    }
  }
  
  const cellClasses = [
    'cell',
    isInitial && 'cell--initial',
    isSelected && 'cell--selected',
    hasError && 'cell--error',
    isHint && 'cell--hint',
    isGameWon && 'cell--locked'
  ].filter(Boolean).join(' ')
  
  return (
    <div
      className={cellClasses}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={isInitial || isGameWon ? -1 : 0}
      role="gridcell"
      aria-label={`Row ${row + 1}, Column ${col + 1}${value ? `, value ${value}` : ', empty'}${isHint ? ', hint available' : ''}`}
      aria-readonly={isInitial || isGameWon}
    >
      {value !== 0 ? value : ''}
    </div>
  )
}

export default Cell
