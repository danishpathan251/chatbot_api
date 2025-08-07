// intentService.js

const { correctSentence } = require("./spellCorrectSentence");

const intents = {
  hello: {
    keywords: ['hello', 'hii', 'hi'],
    message: (name) => name ? null : `Hello! 👋`
  },
  greet: {
    keywords: ['hello my name is', 'hello i am','i am','my name is'],
    message: (name) => name ? `Hello <strong>${name}</strong>! Nice to meet you. How can I help you today? 👋` : null
  },
  login: {
    keywords: ['login', 'sign in', 'log in', 'access account'],
    message: () => 'To <strong>login</strong>, go to <a href="https://alpha-ms.xyz/login" target="_blank">alpha-ms.xyz/login</a> and enter your credentials.'
  },
  signup: {
    keywords: ['signup', 'sign up', 'create account', 'register', 'create my account'],
    message: () => 'To <strong>create an account</strong>, please visit <a href="https://alpha-ms.xyz/signup" target="_blank">alpha-ms.xyz/signup</a>.'
  },
  support: {
    keywords: ['support', 'customer service', 'please help me'],
    message: () => 'For <strong>help or support</strong>, visit <a href="https://alpha-ms.xyz/support" target="_blank">alpha-ms.xyz/support</a> or contact <strong>support@alpha-ms.xyz</strong>.'
  },
  use: {
    keywords: ['how to use', 'how can i use'],
    message: () => `
      It's very simple to use <strong>Alpha-MS</strong>!<br/><br/>
      Here’s how you can get started:<br/><br/>
      1. <strong>Sign up</strong> as an Admin at <a href="https://alpha-ms.xyz" target="_blank">alpha-ms.xyz</a><br/>
      2. <strong>Login</strong> to your dashboard<br/>
      3. <strong>Add employees</strong>, departments, and shifts<br/>
      4. Employees can then <strong>punch in/out</strong> using the mobile app<br/>
      5. You can <strong>track attendance</strong>, manage leaves, and generate reports<br/><br/>
      If you need help, contact <strong>support@alpha-ms.xyz</strong>`
  },
  software: {
    keywords: [
      'and alpha ms', 'is alpha ms', 'about software', 'about this software',
      'about alpha-ms', 'about alpha ms', 'related to alpha-ms',
      'what is alpha-ms', 'alpha-ms information', 'software details',
      'what is alpha ms', 'describe alpha ms', 'alpha ms use case', 'alpha ms overview'
    ],
    message: () => `
      <strong>Alpha-MS</strong> is a powerful cloud-based <strong>Attendance Management System</strong> designed to streamline employee tracking, shift scheduling, and real-time punch-in/out monitoring.<br/>
      <u>Key features include:</u><br/>
      • Real-time <strong>attendance tracking</strong>
      • Mobile <strong>punch-in/out</strong> with location data<br/>
      • <strong>Leave and holiday management</strong><br/>
      • Automated <strong>shift scheduling</strong><br/>
      • Detailed <strong>reports and analytics</strong><br/>
      • Admin dashboard with full control<br/><br/>
      <strong>Alpha-MS</strong> boosts workforce productivity, reduces manual errors, and ensures compliance.<br/><br/>
      👉 Learn more at: <a href="https://alpha-ms.xyz" target="_blank">alpha-ms.xyz</a>`
  },
  freeTrial: {
    keywords: ['free trial', 'trial', 'start trial', 'get trial', 'try for free'],
    message: () => `
      You can start your <strong>7-day free trial</strong> like this:<br/><br/>
      • Download the app from the official store<br/>
      • <strong>Sign up</strong> as an Admin user<br/>
      • Choose a plan (no payment needed for trial)<br/>
      • Enjoy all features for 7 days<br/><br/>
      👉 Start now: <a href="https://alpha-ms.xyz/Trail" target="_blank">alpha-ms.xyz/Trail</a>`
  }
};

// Extract name from input text
function extractName(text) {
  const match = text.match(/\b(?:i am|my name is)\s+([A-Z][a-z]+)/i);
  return match ? match[1] : null;
}

function detectIntent(text) {
  const corrected = correctSentence(text).toLowerCase();
  const name = extractName(text);
  const responses = new Set();

  for (const [intent, { keywords, message }] of Object.entries(intents)) {
    if (keywords.some((kw) => corrected.includes(kw.toLowerCase()))) {
      const response = typeof message === "function" ? message(name) : message;
      if (response) responses.add(response);
    }
  }

  if (responses.size === 0) {
    return {
      intent: 'unknown',
      message: 'Hmm, I didn’t quite get that. Could you please rephrase your question so I can assist you better?'
    };
  }

  return {
    intent: 'multi',
    message: Array.from(responses).join('<br/><br/>')
  };
}

module.exports = { detectIntent };
