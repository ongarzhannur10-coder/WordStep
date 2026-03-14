const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    required: true
  },
  questions: [{
    question: String,
    type: {
      type: String,
      enum: ['multiple-choice', 'short-answer', 'fill-blank'],
      default: 'multiple-choice'
    },
    options: [String],
    correctAnswer: String,
    explanation: String
  }],
  level: {
    type: String,
    enum: ['A1', 'A2', 'B1'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Quiz', quizSchema);
