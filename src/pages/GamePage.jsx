import { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gameApi, highScoreApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Board from '../components/Board';
import Timer from '../components/Timer';
import GameControls from '../components/GameControls';
import WinMessage from '../components/WinMessage';

function GamePage() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [game, setGame] = useState(null);
  const [board, setBoard] = useState([]);
  const [initialBoard, setInitialBoard] = useState([]);
  const [solution, setSolution] = useState([]);
  const [selectedCell, setSelectedCell] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isGameWon, setIsGameWon] = useState(false);
  const [errors, setErrors] = useState([]);
  const [hintCell, setHintCell] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scoreSaved, setScoreSaved] = useState(false);
  
  const timerRef = useRef(null);

  // Load game data
  useEffect(() => {
    const fetchGame = async () => {
      try {
        setLoading(true);
        const gameData = await gameApi.getById(gameId);
        setGame(gameData);
        setBoard(gameData.board.map(row => [...row]));
        setInitialBoard(gameData.initialBoard.map(row => [...row]));
        setSolution(gameData.solution.map(row => [...row]));
        setIsGameWon(gameData.isCompleted);
        if (gameData.completionTime) {
          setTimer(gameData.completionTime);
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (gameId) {
      fetchGame();
    }
  }, [gameId]);

  // Timer effect
  useEffect(() => {
    if (game && !isGameWon && !loading) {
      timerRef.current = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [game, isGameWon, loading]);

  // Stop timer when game is won
  useEffect(() => {
    if (isGameWon && timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, [isGameWon]);

  // Find errors in the board
  const findErrors = useCallback((currentBoard, size) => {
    const newErrors = [];
    const subgridRows = size === 6 ? 2 : 3;
    const subgridCols = size === 6 ? 3 : 3;

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        const value = currentBoard[row][col];
        if (value === 0) continue;

        // Check row
        for (let c = 0; c < size; c++) {
          if (c !== col && currentBoard[row][c] === value) {
            newErrors.push({ row, col });
            break;
          }
        }

        // Check column
        let hasColError = false;
        for (let r = 0; r < size; r++) {
          if (r !== row && currentBoard[r][col] === value) {
            if (!newErrors.find(e => e.row === row && e.col === col)) {
              newErrors.push({ row, col });
            }
            hasColError = true;
            break;
          }
        }

        // Check subgrid
        if (!hasColError) {
          const startRow = Math.floor(row / subgridRows) * subgridRows;
          const startCol = Math.floor(col / subgridCols) * subgridCols;

          for (let r = startRow; r < startRow + subgridRows; r++) {
            for (let c = startCol; c < startCol + subgridCols; c++) {
              if ((r !== row || c !== col) && currentBoard[r][c] === value) {
                if (!newErrors.find(e => e.row === row && e.col === col)) {
                  newErrors.push({ row, col });
                }
                break;
              }
            }
          }
        }
      }
    }

    return newErrors;
  }, []);

  // Check if game is won
  const checkWin = useCallback((currentBoard, currentSolution, currentErrors) => {
    if (currentErrors.length > 0) return false;

    for (let i = 0; i < currentBoard.length; i++) {
      for (let j = 0; j < currentBoard[i].length; j++) {
        if (currentBoard[i][j] === 0 || currentBoard[i][j] !== currentSolution[i][j]) {
          return false;
        }
      }
    }
    return true;
  }, []);

  // Save high score when game is won
  useEffect(() => {
    const saveScore = async () => {
      if (isGameWon && !scoreSaved && game && !game.isCompleted) {
        try {
          await highScoreApi.create(gameId, timer);
          await gameApi.update(gameId, { 
            board, 
            isCompleted: true, 
            completionTime: timer 
          });
          setScoreSaved(true);
        } catch (err) {
          console.error('Failed to save score:', err);
        }
      }
    };

    saveScore();
  }, [isGameWon, scoreSaved, game, gameId, timer, board]);

  // Update cell
  const updateCell = (row, col, value) => {
    if (initialBoard[row][col] !== 0) return;

    const newBoard = board.map((r, i) =>
      i === row ? r.map((c, j) => (j === col ? value : c)) : r
    );
    setBoard(newBoard);

    const size = game.difficulty === 'EASY' ? 6 : 9;
    const newErrors = findErrors(newBoard, size);
    setErrors(newErrors);

    const won = checkWin(newBoard, solution, newErrors);
    if (won) {
      setIsGameWon(true);
    }

    setHintCell(null);
  };

  // Select cell
  const selectCell = (row, col) => {
    setSelectedCell({ row, col });
  };

  // Reset game
  const resetGame = async () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    setBoard(initialBoard.map(row => [...row]));
    setTimer(0);
    setIsGameWon(false);
    setSelectedCell(null);
    setErrors([]);
    setHintCell(null);
    setScoreSaved(false);

    // Update game on server
    try {
      await gameApi.update(gameId, { 
        board: initialBoard.map(row => [...row]),
        isCompleted: false 
      });
    } catch (err) {
      console.error('Failed to reset game on server:', err);
    }

    // Restart timer
    timerRef.current = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
  };

  // Get hint
  const getHint = () => {
    if (isGameWon || !board.length) return;

    const size = game.difficulty === 'EASY' ? 6 : 9;
    const subgridRows = size === 6 ? 2 : 3;
    const subgridCols = size === 6 ? 3 : 3;

    const isValidPlacement = (row, col, num) => {
      for (let c = 0; c < size; c++) {
        if (board[row][c] === num) return false;
      }
      for (let r = 0; r < size; r++) {
        if (board[r][col] === num) return false;
      }
      const startRow = Math.floor(row / subgridRows) * subgridRows;
      const startCol = Math.floor(col / subgridCols) * subgridCols;
      for (let r = startRow; r < startRow + subgridRows; r++) {
        for (let c = startCol; c < startCol + subgridCols; c++) {
          if (board[r][c] === num) return false;
        }
      }
      return true;
    };

    const cellsWithCandidates = [];
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (board[row][col] === 0) {
          const candidates = [];
          for (let num = 1; num <= size; num++) {
            if (isValidPlacement(row, col, num)) {
              candidates.push(num);
            }
          }
          if (candidates.length === 1) {
            cellsWithCandidates.push({ row, col });
          }
        }
      }
    }

    if (cellsWithCandidates.length > 0) {
      const randomIndex = Math.floor(Math.random() * cellsWithCandidates.length);
      const hint = cellsWithCandidates[randomIndex];
      setHintCell(hint);
      setSelectedCell(hint);
    }
  };

  // Create game context value for Board and GameControls
  const gameContextValue = {
    board,
    initialBoard,
    selectedCell,
    errors,
    hintCell,
    timer,
    isGameWon,
    gameMode: game?.difficulty?.toLowerCase() || 'normal',
    updateCell,
    selectCell,
    resetGame,
    getHint,
    newGame: () => navigate('/games'),
  };

  if (loading) {
    return (
      <main>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading game...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <div className="error-container">
          <h2>Error</h2>
          <p>{error}</p>
          <button className="button" onClick={() => navigate('/games')}>
            Back to Games
          </button>
        </div>
      </main>
    );
  }

  if (!game) {
    return (
      <main>
        <div className="error-container">
          <h2>Game Not Found</h2>
          <p>The game you're looking for doesn't exist.</p>
          <button className="button" onClick={() => navigate('/games')}>
            Back to Games
          </button>
        </div>
      </main>
    );
  }

  const size = game.difficulty === 'EASY' ? 6 : 9;
  const filledCells = board.flat().filter(v => v !== 0).length;
  const totalCells = size * size;

  return (
    <main>
      <header className="page-header flow">
        <div className="tag">
          {game.difficulty === 'EASY' ? 'Relaxed Flow • 6×6' : 'Classic Challenge • 9×9'}
        </div>
        <h1 className="section-title">{game.name}</h1>
        <p>
          Created by <strong>{game.creatorUsername}</strong> on {game.formattedDate}
        </p>
      </header>

      {isGameWon && <WinMessage timer={timer} />}

      <section className="board-layout">
        <article className="board-card">
          <div className="board-header">
            <div className="timer">
              <span className="timer-label">Time:</span>
              <span className="timer-value">
                {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
              </span>
            </div>
            <div className="progress">
              <span>
                Cells filled: <strong>{filledCells} / {totalCells}</strong>
              </span>
            </div>
          </div>
          
          <BoardWrapper 
            size={size} 
            gameContext={gameContextValue} 
          />
          
          <div className="game-controls">
            <button 
              className="button" 
              onClick={getHint}
              disabled={isGameWon}
            >
              Get Hint
            </button>
            <button 
              className="button button--alt" 
              onClick={resetGame}
            >
              Reset Game
            </button>
          </div>
        </article>

        <aside className="notes">
          <h2>How to Play</h2>
          <ol>
            <li><strong>Click</strong> on any empty cell to select it.</li>
            <li><strong>Type a number</strong> (1-{size}) to fill the cell.</li>
            <li><strong>Press Delete or Backspace</strong> to clear a cell.</li>
            <li><strong>Use arrow keys</strong> to navigate between cells.</li>
            <li><strong>Red borders</strong> indicate rule violations.</li>
          </ol>
          <h2 style={{ marginTop: '1rem' }}>Rules</h2>
          <ul>
            <li>Each row must contain numbers 1-{size} exactly once.</li>
            <li>Each column must contain numbers 1-{size} exactly once.</li>
            <li>Each {size === 6 ? '2×3' : '3×3'} box must contain numbers 1-{size} exactly once.</li>
          </ul>
        </aside>
      </section>
    </main>
  );
}

// Board wrapper component with local state
function BoardWrapper({ size, gameContext }) {
  const { 
    board, 
    initialBoard, 
    selectedCell, 
    errors, 
    hintCell,
    updateCell,
    selectCell 
  } = gameContext;

  const isSelected = (row, col) => {
    return selectedCell && selectedCell.row === row && selectedCell.col === col;
  };

  const hasError = (row, col) => {
    return errors.some(e => e.row === row && e.col === col);
  };

  const isInitialCell = (row, col) => {
    return initialBoard[row][col] !== 0;
  };

  const isHintCellFn = (row, col) => {
    return hintCell && hintCell.row === row && hintCell.col === col;
  };

  const handleCellClick = (row, col) => {
    selectCell(row, col);
  };

  const handleKeyDown = (e, row, col) => {
    const num = parseInt(e.key);
    if (num >= 1 && num <= size) {
      updateCell(row, col, num);
    } else if (e.key === 'Backspace' || e.key === 'Delete') {
      updateCell(row, col, 0);
    } else if (e.key === 'ArrowUp' && row > 0) {
      selectCell(row - 1, col);
    } else if (e.key === 'ArrowDown' && row < size - 1) {
      selectCell(row + 1, col);
    } else if (e.key === 'ArrowLeft' && col > 0) {
      selectCell(row, col - 1);
    } else if (e.key === 'ArrowRight' && col < size - 1) {
      selectCell(row, col + 1);
    }
  };

  const gridClass = size === 6 ? 'board board--easy' : 'board board--normal';

  return (
    <div className={gridClass} role="grid" aria-label={`${size}x${size} Sudoku puzzle`}>
      {board.map((row, rowIndex) =>
        row.map((cellValue, colIndex) => {
          const cellClasses = [
            'cell',
            isInitialCell(rowIndex, colIndex) ? 'cell--initial' : 'cell--editable',
            isSelected(rowIndex, colIndex) ? 'cell--selected' : '',
            hasError(rowIndex, colIndex) ? 'cell--error' : '',
            isHintCellFn(rowIndex, colIndex) ? 'cell--hint' : '',
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
  );
}

export default GamePage;
