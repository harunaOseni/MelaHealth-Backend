const express = require('express');
const OpenAI = require('openai');

const router = express.Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

let conversationHistory = [];

router.post('/check-symptoms', async (req, res) => {
  const { symptoms, history } = req.body;
  
  if (history) {
    conversationHistory = history;
  }

  conversationHistory.push({ role: 'user', content: symptoms });

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are an AI assistant trained as a doctor specializing in healthcare for culturally underrepresented groups. Provide diagnoses based on symptoms, considering cultural and socioeconomic factors that may affect health. Offer tailored advice and treatment suggestions.' },
        ...conversationHistory
      ],
      max_tokens: 300,
    });

    const aiResponse = response.choices[0].message.content.trim();
    conversationHistory.push({ role: 'assistant', content: aiResponse });

    res.json({ guidance: aiResponse, history: conversationHistory });
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    res.status(500).json({ error: 'Error generating guidance' });
  }
});

module.exports = router;