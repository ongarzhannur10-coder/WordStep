const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true
  },
  meaning: {
    type: String,
    required: true
  },
  pronunciation: {
    type: String,
    default: null
  },
  partOfSpeech: {
    type: String,
    enum: ['noun', 'verb', 'adjective', 'adverb', 'preposition', 'conjunction'],
    default: 'noun'
  },
  example: {
    type: String,
    default: null
  },
  imageUrl: {
    type: String,
    default: null
  },
  audioUrl: {
    type: String,
    default: null
  },
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
    required: true
  },
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

module.exports = mongoose.model('Word', wordSchema);
