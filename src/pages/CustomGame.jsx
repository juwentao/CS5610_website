import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gameApi } from '../services/api';

function CustomGame() {
  const navigate = useNavigate();
  const [board, setBoard] = useState(
    Array(9).fill(null).map(() => Array(9).fill(0))
  );
  const [selectedCell, setSelectedCell] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);

  // Check for validation errors in the board
  const findErrors = (currentBoard) => {
    const errors = [];
    
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const value = currentBoard[row][col];
        if (value === 0) continue;

        // Check row
        for (let c = 0; c < 9; c++) {
          if (c !== col && currentBoard[row][c] === value) {
            errors.push({ row, col });
            break;
          }
        }

        // Check column
        let hasColError = false;
        for (let r = 0; r < 9; r++) {
          if (r !== row && currentBoard[r][col] === value) {
            if (!errors.find(e => e.row === row && e.col === col)) {
              errors.push({ row, col });
            }
            hasColError = true;
            break;
          }
        }

        // Check 3x3 subgrid
        if (!hasColError) {
          const startRow = Math.floor(row / 3) * 3;
          const startCol = Math.floor(col / 3) * 3;

          for (let r = startRow; r < startRow + 3; r++) {
            for (let c = startCol; c < startCol + 3; c++) {
              if ((r !== row || c !== col) && currentBoard[r][c] === value) {
                if (!errors.find(e => e.row === row && e.col === col)) {
                  errors.push({ row, col });
                }
                break;
              }
            }
          }
        }
      }
    }

    return errors;
  };

  // Update a cell value
  const updateCell = (row, col, value) => {
    const newBoard = board.map((r, i) =>
      i === row ? r.map((c, j) => (j === col ? value : c)) : r
    );
    setBoard(newBoard);
    setValidationErrors(findErrors(newBoard));
    setError(null);
  };

  // Handle cell click
  const handleCellClick = (row, col) => {
    setSelectedCell({ row, col });
  };

  // Handle keyboard input
  const handleKeyDown = (e, row, col) => {
    const num = parseInt(e.key);
    if (num >= 1 && num <= 9) {
      updateCell(row, col, num);
    } else if (e.key === 'Backspace' || e.key === 'Delete' || e.key === '0') {
      updateCell(row, col, 0);
    } else if (e.key === 'ArrowUp' && row > 0) {
      setSelectedCell({ row: row - 1, col });
    } else if (e.key === 'ArrowDown' && row < 8) {
      setSelectedCell({ row: row + 1, col });
    } else if (e.key === 'ArrowLeft' && col > 0) {
      setSelectedCell({ row, col: col - 1 });
    } else if (e.key === 'ArrowRight' && col < 8) {
      setSelectedCell({ row, col: col + 1 });
    }
  };

  // Clear the board
  const clearBoard = () => {
    setBoard(Array(9).fill(null).map(() => Array(9).fill(0)));
    setValidationErrors([]);
    setError(null);
    setSelectedCell(null);
  };

  // Submit the custom puzzle
  const handleSubmit = async () => {
    // Check for validation errors first
    const errors = findErrors(board);
    if (errors.length > 0) {
      setError('Please fix the rule violations (highlighted in red) before submitting.');
      return;
    }

    // Check if there are at least some filled cells
    const filledCells = board.flat().filter(v => v !== 0).length;
    if (filledCells < 11) {
      setError('Please fill at least 11 cells to create a valid puzzle.');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      
      const result = await gameApi.createCustom(board);
      navigate(`/game/${result._id}`);
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  };

  // Check if a cell has an error
  const hasError = (row, col) => {
    return validationErrors.some(e => e.row === row && e.col === col);
  };

  // Check if a cell is selected
  const isSelected = (row, col) => {
    return selectedCell && selectedCell.row === row && selectedCell.col === col;
  };

  const filledCells = board.flat().filter(v => v !== 0).length;

  return (
    <main>
      <header className="page-header flow">
        <div className="tag">Puzzle Creator</div>
        <h1 className="section-title">Create Custom Game</h1>
        <p>Design your own Sudoku puzzle! Fill in the cells to create a starting position.</p>
      </header>

      {error && (
        <div className="error-banner" role="alert">
          <p>{error}</p>
        </div>
      )}

      <section className="board-layout">
        <article className="board-card">
          <div className="board-header">
            <div className="progress">
              <span>
                Cells filled: <strong>{filledCells} / 81</strong>
              </span>
            </div>
          </div>
          
          <div className="board board--normal" role="grid" aria-label="Custom 9x9 Sudoku puzzle creator">
            {board.map((row, rowIndex) =>
              row.map((cellValue, colIndex) => {
                const cellClasses = [
                  'cell',
                  'cell--editable',
                  isSelected(rowIndex, colIndex) ? 'cell--selected' : '',
                  hasError(rowIndex, colIndex) ? 'cell--error' : '',
                  cellValue !== 0 ? 'cell--filled' : '',
                ].filter(Boolean).join(' ');

                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={cellClasses}
                    role="gridcell"
                    tabIndex={0}
                    onClick={() => handleCellClick(rowIndex, colIndex)}
                    onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                  >
                    {cellValue !== 0 ? cellValue : ''}
                  </div>
                );
              })
            )}
          </div>
          
          <div className="game-controls">
            <button 
              className="button button--primary" 
              onClick={handleSubmit}
              disabled={submitting || validationErrors.length > 0}
            >
              {submitting ? 'Validating...' : 'Submit'}
            </button>
            <button 
              className="button button--alt" 
              onClick={clearBoard}
              disabled={submitting}
            >
              Clear Board
            </button>
            <button 
              className="button" 
              onClick={() => navigate('/games')}
              disabled={submitting}
            >
              Cancel
            </button>
          </div>
        </article>

        <aside className="notes">
          <h2>How to Create a Puzzle</h2>
          <ol>
            <li><strong>Click</strong> on any cell to select it.</li>
            <li><strong>Type a number</strong> (1-9) to fill the cell.</li>
            <li><strong>Press Delete or 0</strong> to clear a cell.</li>
            <li><strong>Use arrow keys</strong> to navigate between cells.</li>
            <li><strong>Red borders</strong> indicate rule violations.</li>
          </ol>
          
          <h2 style={{ marginTop: '1rem' }}>Puzzle Requirements</h2>
          <ul>
            <li>Must follow standard Sudoku rules.</li>
            <li>Must have at least 11 filled cells.</li>
            <li>Must have <strong>exactly one</strong> unique solution.</li>
            <li>The server will validate your puzzle.</li>
          </ul>

          <h2 style={{ marginTop: '1rem' }}>Tips</h2>
          <ul>
            <li>Harder puzzles have fewer starting numbers.</li>
            <li>A good puzzle typically has 17-30 clues.</li>
            <li>Symmetrical patterns look nice!</li>
          </ul>
        </aside>
      </section>
    </main>
  );
}

export default CustomGame;
