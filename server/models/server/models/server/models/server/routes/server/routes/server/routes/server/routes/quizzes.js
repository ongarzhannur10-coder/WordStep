const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const Progress = require('../models/Progress');

// Get quiz for a topic
router.get('/topic/:topicId', async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ topicId: req.params.topicId });
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Submit quiz answers
router.post('/submit', async (req, res) => {
  try {
    const { userId, quizId, answers } = req.body;
    
    const quiz = await Quiz.findById(quizId);
    let score = 0;

    answers.forEach((answer, index) => {
      if (quiz.questions[index].correctAnswer === answer) {
        score++;
      }
    });

    const percentage = (score / quiz.questions.length) * 100;

    res.json({
      score,
      totalQuestions: quiz.questions.length,
      percentage: percentage.toFixed(2),
      passed: percentage >= 70
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
