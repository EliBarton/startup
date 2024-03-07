
let players = 
[["Mr. Shoot", 1000], 
["Mr. Guns", 900],  
["Mr. Space", 800],  
["Mr. Moon", 700],  
["Mr. Man", 600],  
["Mr. Canada", 500],  
["Mr. David", 400],  
["Mr. Clone", 300],  
["Mr. James", 200],  
["Mr. Placeholder", 1]]

loadScores();
let leaderboardInterval = setInterval(updateLeaderboard, 5000);

async function loadScores() {
let scores = [];
    try {
        // Get the latest high scores from the service
        const response = await fetch('/api/scores');
        scores = await response.json();

        // Save the scores in case we go offline in the future
        localStorage.setItem('scores', JSON.stringify(scores));
    } catch {
        // If there was an error then just use the last saved scores
        const scoresText = localStorage.getItem('scores');
        if (scoresText) {
        scores = JSON.parse(scoresText);
        }
    }

    updateLeaderboard();
}



async function updateLeaderboard(){
    
    if (playersContains(getPlayerName()) == false){
        players.push([getPlayerName(), getLocalScore()]);
    }

    let randomPlayer = players[randomInt(0, players.length - 1)];
    let randomScore = randomInt(0, 1500);
    if (randomPlayer[1] < randomScore && randomPlayer[0] != getPlayerName()){
        randomPlayer[1] = randomScore;
    }
    players.sort((a, b) => -1 * (a[1] - b[1]));

    let leaderboardEL = document.querySelector(".Leaderboard")

    let leaderboardHTML = `<h1 style="text-align: center;">Leaderboard</h1>
<ol>`;

players.forEach((player, index) => {
    if (index < 10){
    leaderboardHTML += `
    <li>
        <span class="player-name">${index + 1}. ${player[0]}</span>
        <span class="score">${player[1]}</span>
    </li>`;
    }
});

leaderboardHTML += `</ol>`;

    leaderboardEL.innerHTML = leaderboardHTML;

}

function randomInt(min, max){
    return Math.floor(Math.random() * (max - min) ) + min;
}

function playersContains(item){
    for (i = 0; i < players.length; i++){
        if (players[i][0] === item){
            return true;
        }

    }
    return false;
}

function getPlayerName() {
    return localStorage.getItem('userName') ?? false;
  }

function getLocalScore() {
    return localStorage.getItem('LocalScore') ?? false;
}