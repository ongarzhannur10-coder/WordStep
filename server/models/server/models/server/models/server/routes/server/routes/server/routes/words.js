const express = require('express');
const router = express.Router();
const Word = require('../models/Word');

// Get all words for a topic
router.get('/topic/:topicId', async (req, res) => {
  try {
    const words = await Word.find({ topicId: req.params.topicId });
    res.json(words);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get word by ID
router.get('/:id', async (req, res) => {
  try {
    const word = await Word.findById(req.params.id);
    if (!word) {
      return res.status(404).json({ error: 'Word not found' });
    }
    res.json(word);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create word (admin)
router.post('/', async (req, res) => {
  try {
    const { word, meaning, pronunciation, partOfSpeech, example, topicId, level } = req.body;
    
    const newWord = new Word({
      word,
      meaning,
      pronunciation,
      partOfSpeech,
      example,
      topicId,
      level
    });

    await newWord.save();
    res.status(201).json(newWord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
