import React from 'react';

export function Scores() {
  const [scores, setScores] = React.useState([]);

  React.useEffect(() => {
    fetch('/api/scores')
      .then((response) => response.json())
      .then((scores) => {
        setScores(scores);
        localStorage.setItem('scores', JSON.stringify(scores));
      })
      .catch(() => {
        const scoresText = localStorage.getItem('scores');
        if (scoresText) {
          setScores(JSON.parse(scoresText));
        }
      });
  }, []);
  var players = [];
  var playerList = []
  if (scores.length){

    for (const [i, score] of scores.entries()) {
      playerList.push({name: score.name, score: score.score})
    }
    playerList.sort((a, b) => -1 * (a.score - b.score));
    playerList.forEach((score, i) => {
      players.push(
        <li key={i}>
          <span className="player-name">{i + 1}. {score.name}</span>
          <span className="score">{score.score}</span>
        </li>
      );
    });
    
  }else{
    players.push(
      <li>
          <span className="player-name">Nobody has scored yet!</span>
          <span className="score">Be the first!</span>
      </li>
    )
    console.log(players)
  }


  return (
      <main>
        <div className="Leaderboard">
        <h1 style={{ textAlign: 'center' }}>Leaderboard</h1>
            <ol>
                {players}
            </ol>
        </div>

    </main>
  );
}