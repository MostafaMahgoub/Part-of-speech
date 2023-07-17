const express = require('express');
const testData = require('./TestData.json');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Endpoint that returns a list of 10 random words
app.get('/words', (req, res) => {
  const wordList = testData.wordList;

  const adjectives = wordList.filter(word => word.pos === 'adjective');
  const adverbs = wordList.filter(word => word.pos === 'adverb');
  const nouns = wordList.filter(word => word.pos === 'noun');
  const verbs = wordList.filter(word => word.pos === 'verb');

  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomAdverb = adverbs[Math.floor(Math.random() * adverbs.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomVerb = verbs[Math.floor(Math.random() * verbs.length)];

  const randomWords = [
    { id: randomAdjective.id, word: randomAdjective.word, pos: randomAdjective.pos },
    { id: randomAdverb.id, word: randomAdverb.word, pos: randomAdverb.pos },
    { id: randomNoun.id, word: randomNoun.word, pos: randomNoun.pos },
    { id: randomVerb.id, word: randomVerb.word, pos: randomVerb.pos },
  ];

  for (let i = 0; i < 6; i++) {
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    randomWords.push({ id: randomWord.id, word: randomWord.word, pos: randomWord.pos });
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