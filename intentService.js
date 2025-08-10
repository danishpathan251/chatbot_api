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
      It's very simple to use <strong>Alpha-MS</strong>!<br/>
      Here’s how you can get started:<br/>
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
      <u>Key features include:</u>
      • Real-time <strong>attendance tracking</strong>
      • Mobile <strong>punch-in/out</strong> with location data
      • <strong>Leave and holiday management</strong>
      • Automated <strong>shift scheduling</strong>
      • Detailed <strong>reports and analytics</strong>
      • Admin dashboard with full control<br/>
      <strong>Alpha-MS</strong> boosts workforce productivity, reduces manual errors, and ensures compliance.<br/>
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
  },
  planDetails: {
  keywords: ['plan details', 'pricing', 'plans', 'subscription', 'pricing details', 'package', 'cost', 'rates'],
  message: () => `
    Here are our subscription plans:<br/><br/>
    <strong>1️⃣ Basic Plan – ₹249/month</strong><br/>
    • 1 Store<br/>
    • Up to 10 Employees<br/><br/>
    
    <strong>2️⃣ Pro Plan – ₹349/month</strong><br/>
    • 2 Stores<br/>
    • Up to 15 Employees per store<br/><br/>
    
    <strong>3️⃣ Enterprise Plan – ₹499/month</strong><br/>
    • 5 Stores<br/>
    • Unlimited Employees per store<br/><br/>
    
    👉 Learn more or subscribe: <a href="https://alpha-ms.xyz/plans" target="_blank">alpha-ms.xyz/plans</a>
  `
},
  basicPlanDetails: {
  keywords: ['basic plan', 'basic plan details', 'basic plan price', 'basic plan cost', 'basic plan features'],
  message: () => `
    <strong>Basic Plan – ₹249/month</strong><br/>
    • 1 Store<br/>
    • Up to 10 Employees<br/>
    • Perfect for small businesses starting out<br/>
    👉 Subscribe now: <a href="https://alpha-ms.xyz/plans#basic" target="_blank">alpha-ms.xyz/plans#basic</a>
  `
},

proPlanDetails: {
  keywords: ['pro plan', 'pro plan details', 'pro plan price', 'pro plan cost', 'pro plan features'],
  message: () => `
    <strong>Pro Plan – ₹349/month</strong><br/>
    • 2 Stores<br/>
    • Up to 15 Employees per store<br/>
    • Ideal for growing businesses<br/>
    👉 Subscribe now: <a href="https://alpha-ms.xyz/plans#pro" target="_blank">alpha-ms.xyz/plans#pro</a>
  `
},

enterprisePlanDetails: {
  keywords: ['enterprise plan', 'enterprise plan details', 'enterprise plan price', 'enterprise plan cost', 'enterprise plan features'],
  message: () => `
    <strong>Enterprise Plan – ₹499/month</strong><br/>
    • 5 Stores<br/>
    • Unlimited Employees per store<br/>
    • Best for large-scale operations<br/>
    👉 Subscribe now: <a href="https://alpha-ms.xyz/plans#enterprise" target="_blank">alpha-ms.xyz/plans#enterprise</a>
  `
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
