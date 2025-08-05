// intentService.js

const { correctSentence } = require("./spellCorrectSentence");

const intents = {
  hello: {
    keywords: ['hello', 'hii', 'hi'],
    message: (name) => `Hello${name ? ' ' + name : ''}! 👋`
  },
greet: {
  keywords: ['my name is', 'i am'],
  message: (name) => `Hello${name ? ' ' + name : ''}! Nice to meet you. How can I help you today? 👋`
},
  login: {
    keywords: ['login', 'sign in', 'log in', 'access account'],
    message: () => 'To login, go to https://alpha-ms.xyz/login and enter your credentials.'
  },
  signup: {
    keywords: ['signup', 'sign up', 'create account', 'register', 'create my account'],
    message: () => 'To create an account, please visit https://alpha-ms.xyz/signup.'
  },
  support: {
    keywords: ['support', 'customer service'],
    message: () => 'For help or support, please visit our support page at https://alpha-ms.xyz/support or contact support@alpha-ms.xyz.'
  },
  software: {
    keywords: [
        'and alpha ms',
      'is alpha ms',
      'about software',
      'about this software',
      'about alpha-ms',
      'related to alpha-ms',
      'what is alpha-ms',
      'alpha-ms information',
      'software details',
      'what is alpha ms'
    ],
    message: () => 'Alpha-MS is our powerful software solution designed to help manage your operations efficiently. For more details, visit https://alpha-ms.xyz.'
  },
  freeTrial: {
    keywords: ['free trial', 'trial', 'start trial', 'get trial', 'try for free'],
    message: () => `You can take the free trial by following these steps:

• Download the app from the official store  
• Sign up as an Admin user  
• Choose your preferred plan  
• You'll automatically get a **7-day free trial**  
• Start using all features during the trial period

👉 Get started here: https://alpha-ms.xyz/Trail`
  }
};

// Extract name from text like "I am Danish" or "My name is Danish"
function extractName(text) {
  const match = text.match(/\b(?:i am|my name is)\s+([A-Z][a-z]+)/i);
  return match ? match[1] : null;
}

// Detect multiple intents and combine responses
function detectIntent(text) {
  const corrected = correctSentence(text).toLowerCase();
  const name = extractName(text);

  const responses = [];

  for (const [intent, { keywords, message }] of Object.entries(intents)) {
    if (keywords.some((kw) => corrected.includes(kw.toLowerCase()))) {
      responses.push(typeof message === "function" ? message(name) : message);
    }
  }

  if (responses.length === 0) {
    return { intent: 'unknown', message: 'Hmm, I didn’t quite get that. Could you please try rephrasing your question so I can assist you better?' };
  }

  return { intent: 'multi', message: responses.join('\n\n') };
}

module.exports = { detectIntent };
