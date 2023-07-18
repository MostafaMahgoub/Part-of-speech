const express = require('express');
const testData = require('./TestData.json');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Endpoint that returns a list of 10 random words
app.get('/words', (req, res) => {
  const wordList = testData.wordList.slice(); // create a copy of the wordList array
  const randomWords = [];

  // Select one random word for each part of speech
  ['adjective', 'adverb', 'noun', 'verb'].forEach(pos => {
    const words = wordList.filter(word => word.pos === pos);
    const randomWord = words[Math.floor(Math.random() * words.length)];
    randomWords.push(randomWord);
    wordList.splice(wordList.indexOf(randomWord), 1); // remove the selected word from the wordList array
  });

  // Select six additional random words
  for (let i = 0; i < 6; i++) {
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    randomWords.push(randomWord);
    wordList.splice(wordList.indexOf(randomWord), 1); // remove the selected word from the wordList array
  }

  res.json(randomWords);
});

// Endpoint that returns the rank of a given score
app.post('/rank', (req, res) => {
  const { finalScore } = req.body;

  const scores = testData.scoresList;
  const scoresBelowFinalScore = scores.filter(score => score < finalScore).length;
  const rank = (scoresBelowFinalScore / scores.length) * 100;

  res.json({ rank: Math.round(rank * 100) / 100 });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});