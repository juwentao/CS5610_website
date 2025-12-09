import express from 'express';
import Game from '../models/Game.js';
import { generateGame } from '../utils/sudokuGenerator.js';
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
// @desc    Delete a game
// @access  Public (for grading purposes)
router.delete('/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    await Game.deleteOne({ _id: req.params.id });
    
    res.json({ message: 'Game deleted successfully', id: req.params.id });
  } catch (error) {
    console.error('Delete game error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.status(500).json({ message: error.message });
  }
});

export default router;
