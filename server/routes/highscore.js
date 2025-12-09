import express from 'express';
import HighScore from '../models/HighScore.js';
import Game from '../models/Game.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/highscore
// @desc    Get all high scores sorted by time
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { difficulty, limit = 50 } = req.query;
    
    let query = {};
    if (difficulty && ['EASY', 'NORMAL'].includes(difficulty.toUpperCase())) {
      query.difficulty = difficulty.toUpperCase();
    }

    const highScores = await HighScore.find(query)
      .sort({ time: 1 })
      .limit(parseInt(limit))
      .select('gameName username time difficulty completedAt formattedTime');
    
    res.json(highScores);
  } catch (error) {
    console.error('Get high scores error:', error);
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/highscore
// @desc    Create a new high score
// @access  Public (but records user if authenticated)
router.post('/', optionalAuth, async (req, res) => {
  try {
    const { gameId, time } = req.body;

    if (!gameId || time === undefined) {
      return res.status(400).json({ message: 'gameId and time are required' });
    }

    // Get game info
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    // Create high score entry
    const highScore = await HighScore.create({
      gameId,
      gameName: game.name,
      userId: req.user ? req.user._id : null,
      username: req.user ? req.user.username : 'Anonymous',
      time,
      difficulty: game.difficulty,
    });

    // Also update the game as completed
    game.isCompleted = true;
    game.completedAt = new Date();
    game.completionTime = time;
    game.completedBy = req.user ? req.user._id : null;
    await game.save();

    res.status(201).json(highScore);
  } catch (error) {
    console.error('Create high score error:', error);
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/highscore/:gameId
// @desc    Get high score for a specific game
// @access  Public
router.get('/:gameId', async (req, res) => {
  try {
    const highScores = await HighScore.find({ gameId: req.params.gameId })
      .sort({ time: 1 })
      .limit(10);
    
    res.json(highScores);
  } catch (error) {
    console.error('Get game high score error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/highscore/user/:userId
// @desc    Get high scores for a specific user
// @access  Public
router.get('/user/:userId', async (req, res) => {
  try {
    const highScores = await HighScore.find({ userId: req.params.userId })
      .sort({ completedAt: -1 })
      .limit(50);
    
    res.json(highScores);
  } catch (error) {
    console.error('Get user high scores error:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
