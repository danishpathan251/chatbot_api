// intentService.js

const { correctSentence } = require("./spellCorrectSentence");

const intents = {
  hello: {
    keywords: ['hello', 'hii', 'hi'],
    message: (name) => `Hello${name ? ' ' + name : ''}! 👋`
  },
greet: {
  keywords: ['Hello my name is', 'Hello i am','i am','my name is'],
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
    keywords: ['support', 'customer service','Please help me'],
    message: () => 'For help or support, please visit our support page at https://alpha-ms.xyz/support or contact support@alpha-ms.xyz.'
  },
use: {
  keywords: ['how to use', 'how can i use'],
  message: () =>
    `It's very simple to use Alpha-MS!  
Here’s how you can get started:

1. **Sign up** as an Admin at [alpha-ms.xyz](https://alpha-ms.xyz)  
2. **Login** to your dashboard  
3. **Add employees**, departments, and shifts  
4. Employees can then **punch in/out** using the mobile app  
5. You can **track attendance, manage leaves, and generate reports**

If you need help at any step, feel free to reach out to our support: **support@alpha-ms.xyz**`
},
 software: {
  keywords: [
    'and alpha ms',
    'is alpha ms',
    'about software',
    'about this software',
    'about alpha-ms',
    'about alpha ms',
    'related to alpha-ms',
    'what is alpha-ms',
    'alpha-ms information',
    'software details',
    'what is alpha ms',
    'describe alpha ms',
    'alpha ms use case',
    'alpha ms overview'
  ],
  message: () =>
    `Alpha-MS is a powerful cloud-based **Attendance Management System** designed to streamline employee tracking, shift scheduling, and real-time punch-in/out monitoring.  
      
Key features include:  
• Real-time attendance tracking  
• Mobile punch-in/out with location data  
• Leave and holiday management  
• Automated shift scheduling  
• Detailed reports and analytics  
• Admin dashboard with complete control

Alpha-MS helps businesses improve workforce productivity, reduce manual errors, and ensure better compliance.

👉 Learn more at: https://alpha-ms.xyz`
}
,
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
