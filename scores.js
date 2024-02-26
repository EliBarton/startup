
let interval = setInterval(getLocalScore, 5000)

let localScore = 0

function getLocalScore(){
    console.log("function called")
    let openDB = indexedDB.open("/userfs", 21);
    openDB.onsuccess = function(event) {
    let db = openDB.result;
    let transaction = db.transaction("FILE_DATA", "readonly");
    let objectStore = transaction.objectStore("FILE_DATA");

    let request = objectStore.get("/userfs/bestscorejjlasers.data");
    
    request.onsuccess = function(event) {
        //console.log(new Int32Array(request.result.contents.buffer)[2]);
        localScore = new Int32Array(request.result.contents.buffer)[2];
        updateLocalScore(localScore)
    };
    };
}

function updateLocalScore(score){
    //const scoreEl = document.querySelector("#username");
    localStorage.setItem("LocalScore", score);
    if (localStorage.getItem('LocalScore') ?? false){
        
    }
}