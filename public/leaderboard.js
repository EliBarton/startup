getBackgroundImage()
let players = 
[]

loadScores();
let leaderboardInterval = setInterval(updateLeaderboard, 5000);

async function loadScores() {
let scores = [];
players = [];
    try {
        // Get the latest high scores from the service
        const response = await fetch('/api/scores');
        scores = await response.json();
        // Add the scores to the array of players for easy access
        scores.forEach(player => {
            players.push([player.name, player.score])
        });
        // Save the scores in case we go offline in the future
        localStorage.setItem('scores', JSON.stringify(players));
    } catch {
        // If there was an error then just use the last saved scores
        console.log("Error getting scores");
        const scoresText = localStorage.getItem('scores');
        if (scoresText) {
            scoresText.forEach(player => {
                players.push([player.name, player.score])
            });
        }
    }

    updateLeaderboard();
}



async function updateLeaderboard(){
    if (players.length === 0){
        return;
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

function getGlobalScore() {
    // Extremely simply gets the score for the local player.
    return JSON.parse(localStorage.getItem('scores'))[JSON.parse(localStorage.getItem('scores')).findIndex(score => score.includes(getPlayerName()))][1] ?? false;
}

async function getBackgroundImage() {
    const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=QIIdnp5naW0OmbkboNDBRyog0TyAUj4fB6vqj7Ch', );
    let data = await response.json()
    document.querySelector('main').style.backgroundImage = `url('${data.url}')`;
}