const express = require('express');
const router = express.Router();
const Topic = require('../models/Topic');

// Get all topics by level
router.get('/:level', async (req, res) => {
  try {
    const { level } = req.params;
    
    if (!['A1', 'A2', 'B1'].includes(level)) {
      return res.status(400).json({ error: 'Invalid level' });
    }

    const topics = await Topic.find({ level });
    res.json(topics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single topic
router.get('/detail/:id', async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) {
      return res.status(404).json({ error: 'Topic not found' });
    }
    res.json(topic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create topic (admin)
router.post('/', async (req, res) => {
  try {
    const { name, description, level } = req.body;
    
    const topic = new Topic({
      name,
      description,
      level
    });

    await topic.save();
    res.status(201).json(topic);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
