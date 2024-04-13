import React from 'react';

import { useEffect } from 'react';
import { PreLogin } from './prelogin';
import { PostLogin } from './postlogin';
import { AuthState } from './authState';

export function Login({ userName, authState, onAuthChange }) {

  return (
    <main className='container-fluid bg-secondary text-center' >
      {authState !== AuthState.Unknown && <p className="Welcome">Welcome to GalagaOnline!</p>}
       <p style={{ fontSize: 'x-large', textAlign: 'center', margin: '6px' }}>Login</p>
       <div style={{ width: '250px', border: 'solid grey thick', padding: '10px' }}>

        {authState === AuthState.Authenticated && (
          <PostLogin userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
        )}
        {authState === AuthState.Unauthenticated && (
          <PreLogin
            userName={userName}
            onLogin={(loginUserName) => {
              onAuthChange(loginUserName, AuthState.Authenticated);
            }}
          />
        )}
      </div>
    </main>
  )
}



function oldCode(){
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');

function handleUsernameChange(event) {
  setUsername(event.target.value);
}

function handlePasswordChange(event) {
  setPassword(event.target.value);
}

(async () => {
  
})();

async function loginUser() {
  loginOrCreate(`/api/auth/login`);
}

async function createUser() {
  loginOrCreate(`/api/auth/create`);
}

async function loginOrCreate(endpoint) {
  const response = await fetch(endpoint, {
    method: 'post',
    body: JSON.stringify({ name: username, password: password }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  if (response.ok) {
    localStorage.setItem('userName', username);
  } else {
    const body = await response.json();
    displayUnauthMsg();
  }
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
  return localStorage.getItem('username') ?? false;
}
if (getPlayerName()){
  
  setUsername(getPlayerName())
}
else{
  setUsername(`<p class="nav" style="font-size: large; color: gray" id="playername">Not Logged In</p>`)
}

async function getBackgroundImage() {
  const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=QIIdnp5naW0OmbkboNDBRyog0TyAUj4fB6vqj7Ch', );
  let data = await response.json()
  return `url('${data.url}')`;
}

function setDisplay(controlId, display) {
  const playControlEl = document.querySelectorAll(`#${controlId}`);
  playControlEl.forEach(element => {
    element.style.display = display;
  });
}

async function displayUnauthMsg() {
  const chatText = document.querySelector('.alert-container');
chatText.innerHTML =
  `<div class="alert" style="background-color: red !important;">Incorrect username or password<span class="closebtn" onclick="this.parentElement.style.display='none';">
  &times;</span></div>` + chatText.innerHTML;
 
}


  return (
    <main className='container-fluid bg-secondary text-center' style={{ backgroundImage: `${getBackgroundImage()}` }}>
        <div className="alert-container"></div>
            <p className="Welcome">Welcome to GalagOnline!
        </p>
        <p style="font-size: x-large; text-align: center; margin: 6px;">Login</p>
        <div style="width: 250px; border: solid grey thick; padding: 10px;">
        <div id="loginControls">
            <div className="form-group">
            <label>Username</label>
            <input type="text" id="username" placeholder="Enter username" value={username} onChange={handleUsernameChange} />
            </div>
            <div className="form-group">
            <label>Password</label>
            <input type="password" id="password" placeholder="Your password here" value={password} onChange={handlePasswordChange} />
            </div>
            <button type="submit" className="btn btn-success" onClick={loginUser}>Login</button>
            <button type="submit" className="btn btn-success" onClick={createUser}>Create</button>
        </div>
        <div id="playControls">
            <div id="playerName"></div>
            <button type="button" className="btn btn-primary" onClick={play}>Play</button>
            <button type="button" className="btn btn-secondary" onClick={logout}>Logout</button>
          </div>
        </div>
    </main>
  );
}

