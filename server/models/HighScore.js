import mongoose from 'mongoose';

const highScoreSchema = new mongoose.Schema({
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    required: true
  },
  gameName: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  username: {
    type: String,
    required: true,
    default: 'Anonymous'
  },
  time: {
    type: Number, // Time in seconds
    required: true
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['EASY', 'NORMAL']
  },
  completedAt: {
    type: Date,
    default: Date.now
  }
});

// Index for sorting by time
highScoreSchema.index({ time: 1 });
highScoreSchema.index({ gameId: 1 });
highScoreSchema.index({ difficulty: 1, time: 1 });

// Virtual for formatted time
highScoreSchema.virtual('formattedTime').get(function() {
  const minutes = Math.floor(this.time / 60);
  const seconds = this.time % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
});

// Include virtuals when converting to JSON
highScoreSchema.set('toJSON', { virtuals: true });
highScoreSchema.set('toObject', { virtuals: true });

const HighScore = mongoose.model('HighScore', highScoreSchema);

export default HighScore;
