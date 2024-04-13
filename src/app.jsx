import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { useEffect } from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Scores } from './scores/scores';
import { Play } from './play/play';
import { AuthState } from './login/authState';

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

export default function App() {

  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  async function getBackgroundImage() {
    const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=QIIdnp5naW0OmbkboNDBRyog0TyAUj4fB6vqj7Ch', );
    let data = await response.json()
    return `url('${data.url}')`;
  }

  useEffect(() => {
    (async () => {
      const backgroundImage = await getBackgroundImage();
      document.querySelector('main').style.backgroundImage = backgroundImage;
      const userName = localStorage.getItem('username');
    })();
  }, []);
  return <BrowserRouter>
  <div className="bg-dark text-light app">
  <header className="container-fluid">
      <nav className="navbar navbar-dark">
          <p className="navbar-brand">GalagaOnline</p>
      <menu className="navbar-nav">
              <li className="nav-item"><NavLink className="nav-link active" to="">Welcome</NavLink></li>
              {authState === AuthState.Authenticated && (
                <li className='nav-item'>
                  <NavLink className='nav-link' to='play'>
                    Play
                  </NavLink>
                </li>
              )}
              {authState === AuthState.Authenticated && (
                <li className='nav-item'>
                  <NavLink className='nav-link' to='scores'>
                    Scores
                  </NavLink>
                </li>
              )}
      </menu>
      {authState === AuthState.Authenticated && (
        <p className="nav" id="playername">{userName}</p>
      )}
  </nav>
  </header>

  <Routes>
  <Route path='/' element={<Login userName={userName}
                authState={authState}
                onAuthChange={(userName, authState) => {
                  setAuthState(authState);
                  setUserName(userName);
                }}/>} exact />
  <Route path='/play' element={<Play userName={userName}/>} />
  <Route path='/scores' element={<Scores />} />
  <Route path='*' element={<NotFound />} />
</Routes>

<footer>
  <span>Creator: Eli Barton</span>
  <a href="https://github.com/EliBarton/startup">Eli Barton's GitHub</a>
</footer>

</div>
</BrowserRouter>;
}
