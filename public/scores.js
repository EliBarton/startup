let localScore = 0;
updateLocalScore(0);
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
    updateLocalScore(enteredScore)
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
