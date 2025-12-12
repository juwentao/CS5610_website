import express from 'express';
import Game from '../models/Game.js';
import HighScore from '../models/HighScore.js';
import { generateGame, countSolutions } from '../utils/sudokuGenerator.js';
import { generateGameName } from '../config/words.js';
import { optionalAuth, protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/sudoku
// @desc    Get all games
// @access  Public
router.get('/', async (req, res) => {
  try {
    const games = await Game.find()
      .select('name difficulty creatorUsername createdAt isCompleted')
      .sort({ createdAt: -1 });
    
    res.json(games);
  } catch (error) {
    console.error('Get games error:', error);
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/sudoku
// @desc    Create a new game
// @access  Public (but records user if authenticated)
router.post('/', optionalAuth, async (req, res) => {
  try {
    const { difficulty } = req.body;

    if (!difficulty || !['EASY', 'NORMAL'].includes(difficulty.toUpperCase())) {
      return res.status(400).json({ message: 'Difficulty must be EASY or NORMAL' });
    }

    // Generate unique game name
    let gameName;
    let isUnique = false;
    let attempts = 0;
    
    while (!isUnique && attempts < 10) {
      gameName = generateGameName();
      const existingGame = await Game.findOne({ name: gameName });
      if (!existingGame) {
        isUnique = true;
      }
      attempts++;
    }

    if (!isUnique) {
      // Add timestamp to ensure uniqueness
      gameName = `${generateGameName()} ${Date.now()}`;
    }

    // Generate game boards
    const { board, initialBoard, solution } = generateGame(difficulty.toUpperCase());

    // Create game
    const game = await Game.create({
      name: gameName,
      difficulty: difficulty.toUpperCase(),
      board,
      initialBoard,
      solution,
      createdBy: req.user ? req.user._id : null,
      creatorUsername: req.user ? req.user.username : 'Anonymous',
    });

    res.status(201).json({
      _id: game._id,
      name: game.name,
      difficulty: game.difficulty,
      creatorUsername: game.creatorUsername,
      createdAt: game.createdAt,
      formattedDate: game.formattedDate,
    });
  } catch (error) {
    console.error('Create game error:', error);
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/sudoku/:id
// @desc    Get a single game by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    res.json(game);
  } catch (error) {
    console.error('Get game error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/sudoku/:id
// @desc    Update a game
// @access  Public
router.put('/:id', optionalAuth, async (req, res) => {
  try {
    const { board, isCompleted, completionTime } = req.body;
    
    const game = await Game.findById(req.params.id);
    
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    // Update fields
    if (board) {
      game.board = board;
    }
    
    if (isCompleted !== undefined) {
      game.isCompleted = isCompleted;
      if (isCompleted) {
        game.completedAt = new Date();
        game.completedBy = req.user ? req.user._id : null;
        if (completionTime) {
          game.completionTime = completionTime;
        }
      }
    }

    const updatedGame = await game.save();
    
    res.json(updatedGame);
  } catch (error) {
    console.error('Update game error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.status(500).json({ message: error.message });
  }
});

// @route   DELETE /api/sudoku/:id
// @desc    Delete a game (only by creator)
// @access  Protected
router.delete('/:id', optionalAuth, async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    // Check if user is the creator (if game has a creator)
    if (game.createdBy) {
      if (!req.user || game.createdBy.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to delete this game' });
      }
    }

    // Delete all high scores associated with this game
    const deletedScores = await HighScore.deleteMany({ gameId: req.params.id });
    console.log(`Deleted ${deletedScores.deletedCount} high scores for game ${req.params.id}`);

    await Game.deleteOne({ _id: req.params.id });
    
    res.json({ 
      message: 'Game deleted successfully', 
      id: req.params.id,
      deletedHighScores: deletedScores.deletedCount 
    });
  } catch (error) {
    console.error('Delete game error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/sudoku/custom
// @desc    Create a custom game with user-defined puzzle
// @access  Public (but records user if authenticated)
router.post('/custom', optionalAuth, async (req, res) => {
  try {
    const { board } = req.body;

    // Validate board is 9x9
    if (!board || !Array.isArray(board) || board.length !== 9) {
      return res.status(400).json({ message: 'Board must be a 9x9 array' });
    }

    for (let i = 0; i < 9; i++) {
      if (!Array.isArray(board[i]) || board[i].length !== 9) {
        return res.status(400).json({ message: 'Board must be a 9x9 array' });
      }
    }

    // Validate all values are 0-9
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const val = board[row][col];
        if (typeof val !== 'number' || val < 0 || val > 9 || !Number.isInteger(val)) {
          return res.status(400).json({ message: 'Board values must be integers 0-9' });
        }
      }
    }

    // Check if the puzzle has at least some empty cells
    const emptyCells = board.flat().filter(v => v === 0).length;
    if (emptyCells === 0) {
      return res.status(400).json({ message: 'Puzzle must have at least one empty cell' });
    }
    if (emptyCells > 70) {
      return res.status(400).json({ message: 'Puzzle must have at least 11 filled cells' });
    }

    // Validate that the puzzle is uniquely solvable
    const solutions = countSolutions(board, 9);
    
    if (solutions === 0) {
      return res.status(400).json({ 
        message: 'This puzzle has no valid solution. Please check for rule violations.',
        solvable: false 
      });
    }
    
    if (solutions > 1) {
      return res.status(400).json({ 
        message: 'This puzzle has multiple solutions. A valid Sudoku puzzle must have exactly one unique solution.',
        solvable: true,
        unique: false 
      });
    }

    // Find the unique solution
    const solution = findSolution(board);

    // Generate unique game name
    let gameName;
    let isUnique = false;
    let attempts = 0;
    
    while (!isUnique && attempts < 10) {
      gameName = generateGameName();
      const existingGame = await Game.findOne({ name: gameName });
      if (!existingGame) {
        isUnique = true;
      }
      attempts++;
    }

    if (!isUnique) {
      gameName = `${generateGameName()} ${Date.now()}`;
    }

    // Create game
    const game = await Game.create({
      name: gameName,
      difficulty: 'NORMAL', // Custom games are always 9x9
      board: board.map(row => [...row]),
      initialBoard: board.map(row => [...row]),
      solution,
      createdBy: req.user ? req.user._id : null,
      creatorUsername: req.user ? req.user.username : 'Anonymous',
      isCustom: true
    });

    res.status(201).json({
      _id: game._id,
      name: game.name,
      difficulty: game.difficulty,
      creatorUsername: game.creatorUsername,
      createdAt: game.createdAt,
      message: 'Custom game created successfully!'
    });
  } catch (error) {
    console.error('Create custom game error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Helper function to find the solution for a valid puzzle
function findSolution(puzzle) {
  const board = puzzle.map(row => [...row]);
  
  function isValid(board, row, col, num) {
    for (let c = 0; c < 9; c++) {
      if (board[row][c] === num) return false;
    }
    for (let r = 0; r < 9; r++) {
      if (board[r][col] === num) return false;
    }
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let r = startRow; r < startRow + 3; r++) {
      for (let c = startCol; c < startCol + 3; c++) {
        if (board[r][c] === num) return false;
      }
    }
    return true;
  }
  
  function solve() {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num;
              if (solve()) return true;
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }
  
  solve();
  return board;
}

export default router;
