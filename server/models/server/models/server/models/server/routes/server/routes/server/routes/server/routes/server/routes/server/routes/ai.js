const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// AI Assistant endpoint
router.post('/ask', async (req, res) => {
  try {
    const { question, context } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Please provide a question' });
    }

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an English teacher helping students learn vocabulary and grammar. Provide clear, concise explanations suitable for language learners.'
        },
        {
          role: 'user',
          content: context ? `Context: ${context}\n\nQuestion: ${question}` : question
        }
      ],
      max_tokens: 500,
      temperature: 0.7
    });

    res.json({
      answer: response.data.choices[0].message.content
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
