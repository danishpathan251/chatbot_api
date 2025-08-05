const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { detectIntent } = require('./intentService');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.post('/api/chat', (req, res) => {
  const { message } = JSON.parse(JSON.stringify(req.body));
  const { intent, message: reply } = detectIntent(message);

  return res.json({
    sender:'Danish',
    text: `${reply}`,
    // intent,
  });
});

app.listen(PORT, () => {
  console.log(`✅ Aisha ChatBot API is running at http://localhost:${PORT}`);
});
