
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
["Mr. Placeholder", 100]]

let leaderboardInterval = setInterval(updateLeaderboard, 5000);

function updateLeaderboard(){
    let randomPlayer = players[randomInt(0, players.length - 1)]
    let randomScore = randomInt(0, 1500);
    randomPlayer[randomPlayer][1] = randomScore;

    players.sort((a, b) => a[1] - b[1]);

    leaderboardEL = document.querySelector(".Leaderboard")

    console.log(leaderboardEL)
    console.log(players);
}

function randomInt(min, max){
    return Math.floor(Math.random() * (max - min) ) + min;
}