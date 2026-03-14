const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    required: true
  },
  quizScore: {
    type: Number,
    default: 0
  },
  attemptCount: {
    type: Number,
    default: 0
  },
  completedAt: {
    type: Date,
    default: null
  },
  wordsLearned: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Word',
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Progress', progressSchema);
