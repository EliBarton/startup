
getLocalScore();
getBackgroundImage();
let players = []
loadScores(players);
updateScoreEl();

let interval = setInterval(getLocalScore, 3000);
const socket = configureWebSocket();

async function loadScores(players) {
let scores = [];
    try {
        // Get the latest high scores from the service
        const response = await fetch('/api/scores');
        scores = await response.json();
        // Add the scores to the array of players for easy access
        scores.forEach(player => {
            players.push(player)
        });
        // Save the scores in case we go offline in the future
        localStorage.setItem('scores', JSON.stringify(players));
    } catch {
        // If there was an error then just use the last saved scores
        console.log("Error getting scores");
        const scoresText = localStorage.getItem('scores');
        if (scoresText) {
            scoresText.forEach(player => {
                players.push(player)
            });
        }
    }
}

async function getLocalScore(){

    try {
    let openDB = indexedDB.open("/userfs", 21);
    openDB.onsuccess = function(event) {
    let db = event.target.result;
    let transaction = db.transaction("FILE_DATA", "readonly");
    let objectStore = transaction.objectStore("FILE_DATA");
    

    let request = objectStore.get("/userfs/godot/app_userdata/GalagaOnline/savescore.save");
    request.onsuccess = function(event) {
        localScore = new Int32Array(request.result.contents.buffer)[2];
        if (localScore > getGlobalScore()) {
            saveScore(localScore)
            updateLocalScore(localScore)
        }
    };

    };
}
    catch{
        console.log("Error accessing database")
    }
}

function scoreButtonClicked(){
    let enteredScore = document.querySelector("#newhighscore").value
    if (enteredScore > getGlobalScore()) {
        saveScore(enteredScore);
        updateLocalScore(enteredScore);
    }
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
            players.push(player)
        });
        localStorage.setItem('scores', JSON.stringify(players));
        // Set the high score element to the new high score
        let scoreEl = document.querySelector("#highscore");
        scoreEl.innerHTML = getGlobalScore();
        broadcastEvent(userName, "newScore", score)
    } catch {
        // If there was an error then just track scores locally
        this.updateLocalScore(newScore.score);
    }
  }

function updateLocalScore(score){
    let scoreEl = document.querySelector("#highscore");
    const scoreObj = {name: getPlayerName(), score: score,}
    
    if (score > 0){
        localStorage.setItem("LocalScore", JSON.stringify(scoreObj));
    }
    if (localStorage.getItem('LocalScore') ?? false){
        scoreEl.innerHTML = JSON.parse(localStorage.getItem('LocalScore')).score;
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
        scoreEl.innerHTML = 0;
    }
}

function getGlobalScore(){
    // Extremely simply gets the score for the local player.
    if (localStorage.getItem('scores')){
        var scoresList = JSON.parse(localStorage.getItem('scores'))
        if (scoresList.some(score => score.name == getPlayerName())){
            var scoreIndex = scoresList.findIndex(score => score.name == getPlayerName())
            return scoresList[scoreIndex].score;
        }
    }
    return null;
    }


function getPlayerName() {
    return localStorage.getItem('userName') ?? false;
  }

async function getBackgroundImage() {
    const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=QIIdnp5naW0OmbkboNDBRyog0TyAUj4fB6vqj7Ch', );
    let data = await response.json()
    document.querySelector('main').style.backgroundImage = `url('${data.url}')`;
}


function configureWebSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    let socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

    socket.onopen = (event) => {
      displayMsg('system', 'game', 'connected');
    };

    socket.onclose = (event) => {
      displayMsg('system', 'game', 'disconnected');
    };

    socket.onmessage = async (event) => {
      const msg = JSON.parse(await event.data.text());
      if (msg.type === "newScore") {
        displayMsg('player', msg.from, `scored ${msg.value}`);
      } else if (msg.type === "arrived") {
        displayMsg('player', msg.from, `just arrived`);
      }
    };

    return socket;
  }

  async function displayMsg(cls, from, msg) {
    const chatText = document.querySelector('.alert-container');
  chatText.innerHTML =
    `<div class="alert">${from} ${msg}<span class="closebtn" onclick="this.parentElement.style.display='none';">
    &times;</span></div>` + chatText.innerHTML;
   
  }

  function broadcastEvent(from, type, value) {
    const event = {
      from: from,
      type: type,
      value: value,
    };
    socket.send(JSON.stringify(event));
  }

  