getBackgroundImage();

(async () => {
  const userName = localStorage.getItem('userName');
  if (userName) {
    console.log("user known")
    document.querySelector('#playerName').textContent = userName;
    setDisplay('loginControls', 'none');
    setDisplay('playControls', 'block');
  } else {
    console.log("user not known")
    setDisplay('loginControls', 'block');
    setDisplay('playControls', 'none');
  }
})();

function login() {
  const nameEl = document.querySelector("#username");
  localStorage.setItem("userName", nameEl.value);
  window.location.href = "play.html";
  
}

function play() {
  window.location.href = 'play.html';
}

function logout() {
  localStorage.removeItem('userName');
  fetch(`/api/auth/logout`, {
    method: 'delete',
  }).then(() => (window.location.href = '/'));
}

function getPlayerName() {
  return localStorage.getItem('userName') ?? false;
}
let playerNameEl = document.querySelector("#playername");
if (getPlayerName()){
  
  playerNameEl.innerHTML = getPlayerName();
  document.querySelector('#playerName').textContent = getPlayerName();
}
else{
  playerNameEl.outerHTML = `<p class="nav" style="font-size: large; color: gray" id="playername">Not Logged In</p>`
}

async function getBackgroundImage() {
  const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=QIIdnp5naW0OmbkboNDBRyog0TyAUj4fB6vqj7Ch', );
  let data = await response.json()
  document.querySelector('main').style.backgroundImage = `url('${data.url}')`;
}

function setDisplay(controlId, display) {
  const playControlEl = document.querySelector(`#${controlId}`);
  if (playControlEl) {
    playControlEl.style.display = display;
  }
}