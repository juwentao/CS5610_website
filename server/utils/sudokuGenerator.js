// Sudoku generation utilities for backend

// Shuffle array helper
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Generate a valid Sudoku solution using backtracking
export function generateSolution(size) {
  const board = Array(size).fill(null).map(() => Array(size).fill(0));
  const subgridRows = size === 6 ? 2 : 3;
  const subgridCols = size === 6 ? 3 : 3;
  
  function isValid(board, row, col, num) {
    // Check row
    for (let c = 0; c < size; c++) {
      if (board[row][c] === num) return false;
    }
    
    // Check column
    for (let r = 0; r < size; r++) {
      if (board[r][col] === num) return false;
    }
    
    // Check subgrid
    const startRow = Math.floor(row / subgridRows) * subgridRows;
    const startCol = Math.floor(col / subgridCols) * subgridCols;
    
    for (let r = startRow; r < startRow + subgridRows; r++) {
      for (let c = startCol; c < startCol + subgridCols; c++) {
        if (board[r][c] === num) return false;
      }
    }
    
    return true;
  }
  
  function solve(board) {
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (board[row][col] === 0) {
          const numbers = shuffle([...Array(size)].map((_, i) => i + 1));
          for (const num of numbers) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num;
              if (solve(board)) return true;
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }
  
  solve(board);
  return board;
}

// Count the number of solutions for a puzzle using backtracking
function countSolutions(puzzle, size) {
  const board = puzzle.map(row => [...row]);
  const subgridRows = size === 6 ? 2 : 3;
  const subgridCols = size === 6 ? 3 : 3;
  let count = 0;
  
  function isValid(board, row, col, num) {
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
  }
  
  function solve() {
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (board[row][col] === 0) {
          for (let num = 1; num <= size; num++) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num;
              solve();
              if (count > 1) return;
              board[row][col] = 0;
            }
          }
          return;
        }
      }
    }
    count++;
  }
  
  solve();
  return count;
}

// Create puzzle by removing numbers from solution
export function createPuzzle(solution, cellsToKeep) {
  const size = solution.length;
  const puzzle = solution.map(row => [...row]);
  const totalCells = size * size;
  const cellsToRemove = totalCells - cellsToKeep;
  
  const positions = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      positions.push({ row: i, col: j });
    }
  }
  
  const shuffledPositions = shuffle(positions);
  let removed = 0;
  
  for (const { row, col } of shuffledPositions) {
    if (removed >= cellsToRemove) break;
    
    const backup = puzzle[row][col];
    puzzle[row][col] = 0;
    
    const solutions = countSolutions(puzzle, size);
    
    if (solutions === 1) {
      removed++;
    } else {
      puzzle[row][col] = backup;
    }
  }
  
  return puzzle;
}

// Generate a complete game with board, initialBoard, and solution
export function generateGame(difficulty) {
  const size = difficulty === 'EASY' ? 6 : 9;
  const cellsToKeep = difficulty === 'EASY' ? 18 : 29;
  
  const solution = generateSolution(size);
  const puzzle = createPuzzle(solution, cellsToKeep);
  
  return {
    board: puzzle.map(row => [...row]),
    initialBoard: puzzle.map(row => [...row]),
    solution: solution
  };
}

export default { generateSolution, createPuzzle, generateGame };
