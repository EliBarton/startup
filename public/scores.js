let localScore = 0;
updateLocalScore(0);
updateScoreEl();
getLocalScore();

let interval = setInterval(getLocalScore, 3000);


function getLocalScore(){
    let openDB = indexedDB.open("/userfs", 21);
    openDB.onsuccess = function(event) {
    let db = openDB.result;
    let transaction = db.transaction("FILE_DATA", "readonly");
    let objectStore = transaction.objectStore("FILE_DATA");

    let request = objectStore.get("/userfs/bestscorejjlasers.data");
    
    request.onsuccess = function(event) {
        localScore = new Int32Array(request.result.contents.buffer)[2];
        updateLocalScore(localScore)
    };

    };
}

function scoreButtonClicked(){
    let enteredScore = document.querySelector("#newhighscore").value
    saveScore(enteredScore);
}

async function saveScore(score) {
    const userName = this.getPlayerName();
    const newScore = {name: userName, score: score};

    try {
        const response = await fetch('/api/score', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(newScore),
        });

        // Store what the service gave us as the high scores
        const scores = await response.json();
        // Save the scores in case we go offline in the future
        let players = [];
        scores.forEach(player => {
            players.push([player.name, player.score])
        });
        localStorage.setItem('scores', JSON.stringify(players));
        // Set the high score element to the new high score
        let scoreEl = document.querySelector("#highscore");
        scoreEl.innerHTML = getGlobalScore();
        console.log(getGlobalScore);
    } catch {
        // If there was an error then just track scores locally
        this.updateLocalScore(newScore);
    }
  }

function updateLocalScore(score){
    let scoreEl = document.querySelector("#highscore");
    if (score > 0){
        localStorage.setItem("LocalScore", score);
    }
    if (localStorage.getItem('LocalScore') ?? false){
        scoreEl.innerHTML = localStorage.getItem('LocalScore');
    }
    else{
        scoreEl.innerHTML = 0
    }
}

function updateScoreEl(score){
    let scoreEl = document.querySelector("#highscore");
    if (getGlobalScore()){
        scoreEl.innerHTML = getGlobalScore();
    }
    else{
        scoreEl.innerHTML = 0
    }
}

function getGlobalScore(score){
    // Extremely simply gets the score for the local player.
    return JSON.parse(localStorage.getItem('scores'))[JSON.parse(localStorage.getItem('scores')).findIndex(score => score.includes(getPlayerName()))][1] ?? false;
}

function getLocalScore() {
    localStorage.getItem('LocalScore') ?? false
}

function getPlayerName() {
    return localStorage.getItem('userName') ?? false;
  }