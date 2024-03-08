getBackgroundImage()

function login() {
  const nameEl = document.querySelector("#username");
  localStorage.setItem("userName", nameEl.value);
  window.location.href = "play.html";
}

function getPlayerName() {
  return localStorage.getItem('userName') ?? false;
}
let playerNameEl = document.querySelector("#playername");
if (getPlayerName()){
  
  playerNameEl.innerHTML = getPlayerName();
}
else{
  playerNameEl.outerHTML = `<p class="nav" style="font-size: large; color: gray" id="playername">Not Logged In</p>`
}

async function getBackgroundImage() {
  const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=QIIdnp5naW0OmbkboNDBRyog0TyAUj4fB6vqj7Ch', );
  let data = await response.json()
  console.log(data);
  document.querySelector('main').style.backgroundImage = `url('${data.url}')`;
}