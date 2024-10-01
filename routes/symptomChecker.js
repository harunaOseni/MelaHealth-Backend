const express = require('express');
const OpenAI = require('openai');

const router = express.Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/check-symptoms', async (req, res) => {
  const { symptoms } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are an AI assistant trained as a doctor specializing in healthcare for culturally underrepresented groups. Provide diagnoses based on symptoms, considering cultural and socioeconomic factors that may affect health. Offer tailored advice and treatment suggestions. Present all information in a single, cohesive paragraph without using lists.' },
        { role: 'user', content: `Given these symptoms and considering potential cultural or socioeconomic factors, what are the likely diagnoses, and what specific advice or treatment would you recommend? Please provide your response as a single paragraph without using lists. Symptoms: ${symptoms}` }
      ],
      max_tokens: 300,
    });
    res.json({ guidance: response.choices[0].message.content.trim() });
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    res.status(500).json({ error: 'Error generating guidance' });
  }
});

module.exports = router;