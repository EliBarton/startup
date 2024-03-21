const config = require('./dbConfig.json');
const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`

const { MongoClient } = require('mongodb');
const client = new MongoClient(url);
const db = client.db('galagaonline');
const scoreCollection = db.collection('score');

(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

async function updateScore(score) {
  //if user already has a score, update it if new score if higher
  const currentScore = await scoreCollection.findOne({name: score.name})
  if (currentScore && currentScore.score < score.score){
    await scoreCollection.findOneAndReplace({name: score.name}, score)
  }else if (currentScore == null){
    //if score never entered for user, add a new record
    await scoreCollection.insertOne(score);
  }
}

function getHighScores() {
  const query = { score: { $gt: 0, $lt: 900 } };
  const options = {
    sort: { score: -1 },
    limit: 10,
  };
  const cursor = scoreCollection.find(query, options);
  return cursor.toArray();
}

function getAllScores() {
  const query = { score: { $gt: 0, $lt: 9000 } };
  const options = {
    sort: { score: -1 },
  };
  const cursor = scoreCollection.find(query, options);
  return cursor.toArray();
}




module.exports = { updateScore, getHighScores, getAllScores };