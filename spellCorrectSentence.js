const natural = require('natural');

const dictionary = [
  'login', 'sign in', 'log in', 'access account',
  'signup', 'sign up', 'create account', 'register',
  'help', 'support', 'customer service',
  'free trial', 'trial', 'create', 'account', 'how', 'to', 'get', 'a', 'and'
];

// Correct each word using Jaro-Winkler
function correctWord(input) {
  let bestMatch = { word: input, score: 0 };

  for (const word of dictionary) {
    const score = natural.JaroWinklerDistance(input, word);
    if (score > bestMatch.score) {
      bestMatch = { word, score };
    }
  }

  return bestMatch.score > 0.85 ? bestMatch.word : input;
}

// Correct the whole sentence
function correctSentence(input) {
  return input
    .toLowerCase()
    .split(/\s+/)
    .map(correctWord)
    .join(' ');
}

module.exports = { correctSentence };
