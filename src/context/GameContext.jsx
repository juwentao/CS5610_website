import { createContext, useContext, useReducer, useEffect, useRef } from 'react'

// Create context
const GameContext = createContext(null)

// LocalStorage key
const STORAGE_KEY = 'zengrid_sudoku_state'

// Action types
const ACTIONS = {
  SET_BOARD: 'SET_BOARD',
  SET_INITIAL_BOARD: 'SET_INITIAL_BOARD',
  SET_SOLUTION: 'SET_SOLUTION',
  UPDATE_CELL: 'UPDATE_CELL',
  SET_SELECTED_CELL: 'SET_SELECTED_CELL',
  SET_TIMER: 'SET_TIMER',
  SET_GAME_WON: 'SET_GAME_WON',
  SET_GAME_MODE: 'SET_GAME_MODE',
  RESET_GAME: 'RESET_GAME',
  INCREMENT_TIMER: 'INCREMENT_TIMER',
  LOAD_FROM_STORAGE: 'LOAD_FROM_STORAGE',
  CLEAR_GAME: 'CLEAR_GAME',
  SET_HINT_CELL: 'SET_HINT_CELL'
}

// Initial state
const initialState = {
  board: [],
  initialBoard: [],
  solution: [],
  selectedCell: null,
  timer: 0,
  isGameWon: false,
  gameMode: null, // 'easy' or 'normal'
  errors: [], // Array of {row, col} for cells with errors
  hintCell: null // {row, col} for the hint cell
}

// LocalStorage helper functions - ONLY accessed through Context
const storage = {
  save: (state) => {
    try {
      // Only save game-relevant state (not selectedCell as it's UI state)
      const dataToSave = {
        board: state.board,
        initialBoard: state.initialBoard,
        solution: state.solution,
        timer: state.timer,
        isGameWon: state.isGameWon,
        gameMode: state.gameMode,
        errors: state.errors
      }
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
    } catch (e) {
      console.error('Failed to save to localStorage:', e)
    }
  },
  load: () => {
    try {
      const data = window.localStorage.getItem(STORAGE_KEY)
      if (data) {
        return JSON.parse(data)
      }
    } catch (e) {
      console.error('Failed to load from localStorage:', e)
    }
    return null
  },
  clear: () => {
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch (e) {
      console.error('Failed to clear localStorage:', e)
    }
  }
}

// Reducer function
function gameReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_BOARD:
      return { ...state, board: action.payload }
    case ACTIONS.SET_INITIAL_BOARD:
      return { ...state, initialBoard: action.payload }
    case ACTIONS.SET_SOLUTION:
      return { ...state, solution: action.payload }
    case ACTIONS.UPDATE_CELL: {
      const { row, col, value } = action.payload
      const newBoard = state.board.map((r, i) => 
        i === row ? r.map((c, j) => j === col ? value : c) : r
      )
      // Check for errors
      const errors = findErrors(newBoard, state.gameMode === 'easy' ? 6 : 9)
      // Check if game is won
      const isGameWon = checkWin(newBoard, state.solution, errors)
      // Clear hint when user makes a move
      return { ...state, board: newBoard, errors, isGameWon, hintCell: null }
    }
    case ACTIONS.SET_HINT_CELL:
      return { ...state, hintCell: action.payload }
    case ACTIONS.SET_SELECTED_CELL:
      return { ...state, selectedCell: action.payload }
    case ACTIONS.SET_TIMER:
      return { ...state, timer: action.payload }
    case ACTIONS.INCREMENT_TIMER:
      return { ...state, timer: state.timer + 1 }
    case ACTIONS.SET_GAME_WON:
      return { ...state, isGameWon: action.payload }
    case ACTIONS.SET_GAME_MODE:
      return { ...state, gameMode: action.payload }
    case ACTIONS.RESET_GAME:
      return {
        ...state,
        board: state.initialBoard.map(row => [...row]),
        timer: 0,
        isGameWon: false,
        selectedCell: null,
        errors: [],
        hintCell: null
      }
    case ACTIONS.LOAD_FROM_STORAGE:
      return {
        ...state,
        ...action.payload,
        selectedCell: null, // Reset UI state
        hintCell: null
      }
    case ACTIONS.CLEAR_GAME:
      return { ...initialState }
    default:
      return state
  }
}

// Helper function to find errors in the board
function findErrors(board, size) {
  const errors = []
  const subgridRows = size === 6 ? 2 : 3
  const subgridCols = size === 6 ? 3 : 3
  
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const value = board[row][col]
      if (value === 0) continue
      
      // Check row
      for (let c = 0; c < size; c++) {
        if (c !== col && board[row][c] === value) {
          errors.push({ row, col })
          break
        }
      }
      
      // Check column
      let hasColError = false
      for (let r = 0; r < size; r++) {
        if (r !== row && board[r][col] === value) {
          if (!errors.find(e => e.row === row && e.col === col)) {
            errors.push({ row, col })
          }
          hasColError = true
          break
        }
      }
      
      // Check subgrid
      if (!hasColError) {
        const startRow = Math.floor(row / subgridRows) * subgridRows
        const startCol = Math.floor(col / subgridCols) * subgridCols
        
        for (let r = startRow; r < startRow + subgridRows; r++) {
          for (let c = startCol; c < startCol + subgridCols; c++) {
            if ((r !== row || c !== col) && board[r][c] === value) {
              if (!errors.find(e => e.row === row && e.col === col)) {
                errors.push({ row, col })
              }
              break
            }
          }
        }
      }
    }
  }
  
  return errors
}

// Helper function to check if the game is won
function checkWin(board, solution, errors) {
  if (errors.length > 0) return false
  
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === 0 || board[i][j] !== solution[i][j]) {
        return false
      }
    }
  }
  return true
}

// Find a cell that has only one valid candidate
function findHintCell(board, size) {
  const subgridRows = size === 6 ? 2 : 3
  const subgridCols = size === 6 ? 3 : 3
  
  // Helper to check if a number is valid at a position
  function isValidPlacement(row, col, num) {
    // Check row
    for (let c = 0; c < size; c++) {
      if (board[row][c] === num) return false
    }
    
    // Check column
    for (let r = 0; r < size; r++) {
      if (board[r][col] === num) return false
    }
    
    // Check subgrid
    const startRow = Math.floor(row / subgridRows) * subgridRows
    const startCol = Math.floor(col / subgridCols) * subgridCols
    
    for (let r = startRow; r < startRow + subgridRows; r++) {
      for (let c = startCol; c < startCol + subgridCols; c++) {
        if (board[r][c] === num) return false
      }
    }
    
    return true
  }
  
  // Find all empty cells with their candidates
  const cellsWithCandidates = []
  
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (board[row][col] === 0) {
        // Find all valid candidates for this cell
        const candidates = []
        for (let num = 1; num <= size; num++) {
          if (isValidPlacement(row, col, num)) {
            candidates.push(num)
          }
        }
        
        if (candidates.length === 1) {
          // This cell has only one valid candidate - perfect for a hint!
          cellsWithCandidates.push({ row, col, candidates })
        }
      }
    }
  }
  
  // Return a random cell from those with single candidates
  if (cellsWithCandidates.length > 0) {
    const randomIndex = Math.floor(Math.random() * cellsWithCandidates.length)
    const hint = cellsWithCandidates[randomIndex]
    return { row: hint.row, col: hint.col }
  }
  
  // No cell with single candidate found
  return null
}

// Generate a valid Sudoku solution using backtracking
function generateSolution(size) {
  const board = Array(size).fill(null).map(() => Array(size).fill(0))
  const subgridRows = size === 6 ? 2 : 3
  const subgridCols = size === 6 ? 3 : 3
  
  function isValid(board, row, col, num) {
    // Check row
    for (let c = 0; c < size; c++) {
      if (board[row][c] === num) return false
    }
    
    // Check column
    for (let r = 0; r < size; r++) {
      if (board[r][col] === num) return false
    }
    
    // Check subgrid
    const startRow = Math.floor(row / subgridRows) * subgridRows
    const startCol = Math.floor(col / subgridCols) * subgridCols
    
    for (let r = startRow; r < startRow + subgridRows; r++) {
      for (let c = startCol; c < startCol + subgridCols; c++) {
        if (board[r][c] === num) return false
      }
    }
    
    return true
  }
  
  function solve(board) {
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (board[row][col] === 0) {
          const numbers = shuffle([...Array(size)].map((_, i) => i + 1))
          for (const num of numbers) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num
              if (solve(board)) return true
              board[row][col] = 0
            }
          }
          return false
        }
      }
    }
    return true
  }
  
  solve(board)
  return board
}

// Shuffle array helper
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

// Count the number of solutions for a puzzle using backtracking
// Returns 0, 1, or 2 (2 means "more than one")
function countSolutions(puzzle, size) {
  const board = puzzle.map(row => [...row])
  const subgridRows = size === 6 ? 2 : 3
  const subgridCols = size === 6 ? 3 : 3
  let count = 0
  
  function isValid(board, row, col, num) {
    // Check row
    for (let c = 0; c < size; c++) {
      if (board[row][c] === num) return false
    }
    
    // Check column
    for (let r = 0; r < size; r++) {
      if (board[r][col] === num) return false
    }
    
    // Check subgrid
    const startRow = Math.floor(row / subgridRows) * subgridRows
    const startCol = Math.floor(col / subgridCols) * subgridCols
    
    for (let r = startRow; r < startRow + subgridRows; r++) {
      for (let c = startCol; c < startCol + subgridCols; c++) {
        if (board[r][c] === num) return false
      }
    }
    
    return true
  }
  
  function solve() {
    // Find next empty cell
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (board[row][col] === 0) {
          for (let num = 1; num <= size; num++) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num
              solve()
              // Early exit if we found more than one solution
              if (count > 1) return
              board[row][col] = 0
            }
          }
          return // No valid number found, backtrack
        }
      }
    }
    // No empty cells found, we have a solution
    count++
  }
  
  solve()
  return count
}

// Create puzzle by removing numbers from solution using backtracking
// Ensures the puzzle has exactly one unique solution
function createPuzzle(solution, cellsToKeep) {
  const size = solution.length
  const puzzle = solution.map(row => [...row])
  const totalCells = size * size
  const cellsToRemove = totalCells - cellsToKeep
  
  // Create list of all positions
  const positions = []
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      positions.push({ row: i, col: j })
    }
  }
  
  // Shuffle positions for randomness
  const shuffledPositions = shuffle(positions)
  
  let removed = 0
  
  // Try to remove cells one by one, checking for unique solution
  for (const { row, col } of shuffledPositions) {
    if (removed >= cellsToRemove) break
    
    const backup = puzzle[row][col]
    puzzle[row][col] = 0
    
    // Check if puzzle still has unique solution
    const solutions = countSolutions(puzzle, size)
    
    if (solutions === 1) {
      // Safe to remove this cell
      removed++
    } else {
      // Removing this cell creates multiple solutions, restore it
      puzzle[row][col] = backup
    }
  }
  
  // If we couldn't remove enough cells while maintaining uniqueness,
  // that's okay - we'll have a slightly easier puzzle
  
  return puzzle
}

// Provider component
export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState)
  const timerRef = useRef(null)
  const isInitializedRef = useRef(false)
  
  // Load from localStorage on initial mount
  useEffect(() => {
    if (!isInitializedRef.current) {
      const savedState = storage.load()
      if (savedState && savedState.gameMode && savedState.board && savedState.board.length > 0) {
        dispatch({ type: ACTIONS.LOAD_FROM_STORAGE, payload: savedState })
      }
      isInitializedRef.current = true
    }
  }, [])
  
  // Save to localStorage after each state change (except initial load)
  useEffect(() => {
    if (isInitializedRef.current && state.gameMode && state.board.length > 0) {
      // Clear storage if game is won
      if (state.isGameWon) {
        storage.clear()
      } else {
        storage.save(state)
      }
    }
  }, [state])
  
  // Timer effect
  useEffect(() => {
    if (state.gameMode && !state.isGameWon) {
      timerRef.current = setInterval(() => {
        dispatch({ type: ACTIONS.INCREMENT_TIMER })
      }, 1000)
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [state.gameMode, state.isGameWon])
  
  // Stop timer when game is won
  useEffect(() => {
    if (state.isGameWon && timerRef.current) {
      clearInterval(timerRef.current)
    }
  }, [state.isGameWon])
  
  // Actions
  const initializeGame = (mode, forceNew = false) => {
    // Check if we have a saved game for this mode
    const savedState = storage.load()
    if (!forceNew && savedState && savedState.gameMode === mode && !savedState.isGameWon) {
      // Restore saved game
      dispatch({ type: ACTIONS.LOAD_FROM_STORAGE, payload: savedState })
      return
    }
    
    // Clear any existing saved state when starting a new game
    storage.clear()
    
    const size = mode === 'easy' ? 6 : 9
    const cellsToKeep = mode === 'easy' ? 18 : 29 // Half of 36 for easy, ~29 for normal
    
    const solution = generateSolution(size)
    const puzzle = createPuzzle(solution, cellsToKeep)
    
    dispatch({ type: ACTIONS.SET_GAME_MODE, payload: mode })
    dispatch({ type: ACTIONS.SET_SOLUTION, payload: solution })
    dispatch({ type: ACTIONS.SET_INITIAL_BOARD, payload: puzzle.map(row => [...row]) })
    dispatch({ type: ACTIONS.SET_BOARD, payload: puzzle })
    dispatch({ type: ACTIONS.SET_TIMER, payload: 0 })
    dispatch({ type: ACTIONS.SET_GAME_WON, payload: false })
    dispatch({ type: ACTIONS.SET_SELECTED_CELL, payload: null })
  }
  
  const updateCell = (row, col, value) => {
    // Only update if cell is not initial
    if (state.initialBoard[row][col] === 0) {
      dispatch({ type: ACTIONS.UPDATE_CELL, payload: { row, col, value } })
    }
  }
  
  const selectCell = (row, col) => {
    dispatch({ type: ACTIONS.SET_SELECTED_CELL, payload: { row, col } })
  }
  
  const resetGame = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    // Clear localStorage on reset
    storage.clear()
    dispatch({ type: ACTIONS.RESET_GAME })
    // Restart timer
    timerRef.current = setInterval(() => {
      dispatch({ type: ACTIONS.INCREMENT_TIMER })
    }, 1000)
  }
  
  const newGame = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    // Force new game creation
    initializeGame(state.gameMode, true)
  }
  
  const getHint = () => {
    if (state.isGameWon || !state.board.length) return
    
    const size = state.gameMode === 'easy' ? 6 : 9
    const hintCell = findHintCell(state.board, size)
    
    if (hintCell) {
      dispatch({ type: ACTIONS.SET_HINT_CELL, payload: hintCell })
      // Also select the hint cell for convenience
      dispatch({ type: ACTIONS.SET_SELECTED_CELL, payload: hintCell })
    } else {
      // No single-candidate cell found, clear any existing hint
      dispatch({ type: ACTIONS.SET_HINT_CELL, payload: null })
    }
    
    return hintCell
  }
  
  const value = {
    ...state,
    initializeGame,
    updateCell,
    selectCell,
    resetGame,
    newGame,
    getHint
  }
  
  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
}

// Custom hook to use game context
export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}

export default GameContext
