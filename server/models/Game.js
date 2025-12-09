import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['EASY', 'NORMAL'],
    uppercase: true
  },
  board: {
    type: [[Number]],
    required: true
  },
  initialBoard: {
    type: [[Number]],
    required: true
  },
  solution: {
    type: [[Number]],
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Allow anonymous game creation
  },
  creatorUsername: {
    type: String,
    default: 'Anonymous'
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  completedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  completedAt: {
    type: Date,
    default: null
  },
  completionTime: {
    type: Number, // Time in seconds
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Virtual for formatted date
gameSchema.virtual('formattedDate').get(function() {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return this.createdAt.toLocaleDateString('en-US', options);
});

// Include virtuals when converting to JSON
gameSchema.set('toJSON', { virtuals: true });
gameSchema.set('toObject', { virtuals: true });

const Game = mongoose.model('Game', gameSchema);

export default Game;
