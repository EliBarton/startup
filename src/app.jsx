import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Scores } from './scores/scores';
import { Play } from './play/play';

export default function App() {
  return <BrowserRouter>
  <div className="bg-dark text-light app">
  <header className="container-fluid">
      <nav className="navbar navbar-dark">
          <p className="navbar-brand">GalagaOnline</p>
      <menu className="navbar-nav">
              <li className="nav-item"><NavLink className="nav-link active" to="index">Welcome</NavLink></li>
              <li className="nav-item" id="playControls"><NavLink className="nav-link" to="play">Play</NavLink></li>
              <li className="nav-item" id="playControls"><NavLink className="nav-link" to="scores">Scores</NavLink></li>
      </menu>
      <p className="nav" id="playername">Username</p>
  </nav>
  </header>

  <Routes>
  <Route path='/' element={<Login />} exact />
  <Route path='/play' element={<Play />} />
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
