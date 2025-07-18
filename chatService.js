// chatService.js
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const getChatResponse = async (intent, userPrompt) => {
  try {
    const systemMessage = `You are Aisha, a helpful AI assistant.
Answer ONLY questions about login, signup, or support.
Intent is: ${intent}.
If it's not related, say: "Sorry, this is not related to our website."`;

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistralai/mixtral-8x7b-instruct', // you can change this
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: userPrompt },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('🔴 OpenRouter Error:', error.response?.data || error.message);
    return '⚠️ Something went wrong while getting a response.';
  }
};

module.exports = { getChatResponse };
