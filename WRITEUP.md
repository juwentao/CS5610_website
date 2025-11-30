# ZenGrid Sudoku - Project Write-Up

## Challenges Faced

One of the most significant challenges I encountered while developing this Sudoku application was implementing the puzzle generation algorithm that ensures each puzzle has exactly one unique solution. I had to implement a backtracking algorithm that tests each cell removal to verify the puzzle remains uniquely solvable, which significantly increased the computational complexity. Another challenge was managing the game state effectively across different components while ensuring that the Context API remained the single source of truth. Handling the timer synchronization with game state changes (pause on win, reset on new game) and ensuring localStorage persistence didn't interfere with React's rendering cycle required careful consideration of useEffect dependencies and cleanup functions.

## Future Improvements

Given more time, I would implement several additional features to enhance the user experience. First, I would add a difficulty rating system that analyzes each generated puzzle based on the solving techniques required (naked singles, hidden pairs, etc.) rather than just the number of pre-filled cells. I would also implement a "pencil marks" or "notes" feature that allows players to annotate cells with candidate numbers, which is essential for solving harder puzzles. A step-by-step solution replay feature would be valuable for educational purposes, showing users how the puzzle can be solved logically. Additionally, I would add user authentication to make the high scores functional, allowing players to compete on a real leaderboard, and implement a daily challenge system where all players solve the same puzzle. From a design perspective, I would add theme customization options (dark mode, color schemes) and improve mobile touch interactions with a number pad overlay instead of relying on keyboard input.

## Assumptions Made

While working on this assignment, I made several assumptions about the expected behavior and user experience. I assumed that users would primarily interact with the game using a keyboard for number input, though the application also supports click-to-select for mobile users. I assumed that the "half filled" requirement for easy mode (6×6 grid) meant exactly 18 pre-filled cells out of 36, and that "28-30 cells" for normal mode meant approximately 29 cells as a target, though the backtracking algorithm may keep more cells if removing them would create multiple solutions. I also assumed that the localStorage persistence should only apply to active games, not completed ones, so winning or resetting clears the saved state. For the hint system, I interpreted "single valid answer" to mean cells where only one number can legally be placed according to Sudoku rules (naked singles), rather than cells that have only one correct answer in the final solution.

## Time to Complete

This assignment took approximately 25 hours to complete, including the implementation of all core features, the three improvements (Local Storage, Backtracking, Hint System), styling, and testing across different browsers.

## Improvement Implementations

### 1. Local Storage Persistence

I implemented localStorage persistence to save the game state after every action, allowing users to continue their game even after closing the browser. The implementation is centralized within the [GameContext.jsx](src/context/GameContext.jsx) file, ensuring that localStorage is only accessed through the Context API as required.

**Key Implementation Details:**

```javascript
// Storage helper object - only accessed through Context (lines 37-62)
const storage = {
  save: (state) => {
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
  },
  load: () => { /* retrieves and parses saved state */ },
  clear: () => { /* removes saved state */ }
}
```

The state is automatically loaded on app initialization via a useEffect hook, saved after each state change, and cleared when the game is won or reset. This ensures seamless continuity while respecting the game lifecycle.

### 2. Backtracking Algorithm for Unique Solutions

To ensure each generated puzzle has exactly one solution, I implemented a backtracking-based puzzle generator in [GameContext.jsx](src/context/GameContext.jsx). The algorithm works in two phases: first generating a complete valid solution, then strategically removing cells while verifying uniqueness.

**Key Implementation Details:**

```javascript
// Count solutions using backtracking (lines 185-230)
function countSolutions(puzzle, size) {
  let count = 0
  
  function solve() {
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (board[row][col] === 0) {
          for (let num = 1; num <= size; num++) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num
              solve()
              if (count > 1) return // Early exit optimization
              board[row][col] = 0
            }
          }
          return
        }
      }
    }
    count++
  }
  
  solve()
  return count
}
```

The `createPuzzle` function (lines 234-270) iterates through randomly shuffled cell positions, tentatively removes each cell, and uses `countSolutions` to verify the puzzle still has exactly one solution. If removing a cell creates multiple solutions, it's restored. This guarantees every generated puzzle is uniquely solvable.

### 3. Hint System

The hint system identifies and highlights cells that have only one valid candidate number, helping players when they're stuck. The implementation spans multiple files for proper separation of concerns.

**Key Implementation Details:**

In [GameContext.jsx](src/context/GameContext.jsx), the `findHintCell` function (lines 127-180) analyzes the current board state:

```javascript
function findHintCell(board, size) {
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (board[row][col] === 0) {
        const candidates = []
        for (let num = 1; num <= size; num++) {
          if (isValidPlacement(row, col, num)) {
            candidates.push(num)
          }
        }
        if (candidates.length === 1) {
          cellsWithCandidates.push({ row, col, candidates })
        }
      }
    }
  }
  // Return random cell from single-candidate cells
  return cellsWithCandidates.length > 0 
    ? cellsWithCandidates[Math.floor(Math.random() * cellsWithCandidates.length)]
    : null
}
```

The `hintCell` state is stored in Context and passed to the [Board.jsx](src/components/Board.jsx) and [Cell.jsx](src/components/Cell.jsx) components. The [GameControls.jsx](src/components/GameControls.jsx) component provides the "Hint" button that triggers the hint search. Visual feedback is provided through CSS animations in [index.css](src/styles/index.css):

```css
.cell--hint {
  background: rgba(56, 161, 105, 0.25);
  border-color: var(--success-color);
  animation: hint-pulse 1.5s ease-in-out infinite;
}
```

The hint automatically clears when the user makes any move, ensuring it doesn't persist unnecessarily.
