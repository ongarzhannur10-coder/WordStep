const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');
const User = require('../models/User');

// Get user progress
router.get('/user/:userId', async (req, res) => {
  try {
    const progress = await Progress.find({ userId: req.params.userId })
      .populate('topicId')
      .populate('wordsLearned');
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update progress
router.post('/update', async (req, res) => {
  try {
    const { userId, topicId, quizScore } = req.body;

    let progress = await Progress.findOne({ userId, topicId });
    
    if (progress) {
      progress.quizScore = Math.max(progress.quizScore, quizScore);
      progress.attemptCount += 1;
      progress.updatedAt = new Date();
    } else {
      progress = new Progress({
        userId,
        topicId,
        quizScore,
        attemptCount: 1
      });
    }

    await progress.save();

    // Update user points
    await User.findByIdAndUpdate(userId, {
      $inc: { points: quizScore * 10 }
    });

    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
