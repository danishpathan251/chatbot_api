// intentService.js

const { correctSentence } = require("./spellCorrectSentence");

const intents = {
  login: {
    keywords: ['login', 'sign in', 'log in', 'access account'],
    message: 'To login, go to https://your-site.com/login and enter your credentials.',
  },
  signup: {
    keywords: ['signup', 'sign up', 'create account', 'register', 'create my account'],
    message: 'To create an account, please visit https://your-site.com/signup.',
  },
  support: {
    keywords: ['help', 'support', 'customer service'],
    message: 'For help, please visit our support page at https://your-site.com/support or contact support@your-site.com.',
  },
  software: {
    keywords: [
      'about software', 
      'about alpha-ms', 
      'related to alpha-ms', 
      'what is alpha-ms', 
      'alpha-ms information', 
      'software details',
      'what is alpha ms'
    ],
    message: 'Alpha-MS is our powerful software solution designed to help manage your operations efficiently. For more details, visit https://your-site.com/alpha-ms.'
  },
    freeTrial: {
    keywords: ['free trial', 'trial', 'start trial', 'get trial', 'try for free'],
    message: `You can take the free trial by following these steps:

• Download the app from the official store  
• Sign up as an Admin user  
• Choose your preferred plan  
• You'll automatically get a **7-day free trial**  
• Start using all features during the trial period

👉 Get started here: https://your-site.com/free-trial`,
  },
};


function detectIntent(text) {
  const corrected = correctSentence(text);

  for (const [intent, { keywords, message }] of Object.entries(intents)) {
    if (keywords.some((kw) => corrected.includes(kw))) {
      return { intent, message };
    }
  }

  return { intent: 'unknown', message: 'Sorry, I can’t help with that.' };
}


module.exports = { detectIntent };
