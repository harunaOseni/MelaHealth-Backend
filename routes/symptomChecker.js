import express from 'express';
import OpenAI from "openai";

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
        { role: 'user', content: `Provide health guidance based on the following symptoms: ${symptoms}` }
      ],
      max_tokens: 150,
    });
    res.json({ guidance: response.choices[0].message.content.trim() });
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    res.status(500).json({ error: 'Error generating guidance' });
  }
});

export default router;