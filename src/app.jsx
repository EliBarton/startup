import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter } from 'react-router-dom';

export default function App() {
  return <BrowserRouter>
  <div className="bg-dark text-light">
  <header className="container-fluid">
      <nav className="navbar navbar-dark">
          <p className="navbar-brand">GalagaOnline</p>
      <menu className="navbar-nav ">
              <li className="nav-item"><a className="nav-link active" href="index.html">Welcome</a></li>
              <li className="nav-item" id="playControls"><a className="nav-link" href="play.html">Play</a></li>
              <li className="nav-item" id="playControls"><a className="nav-link" href="scores.html">Scores</a></li>
      </menu>
      <p className="nav" style="font-size: large;" id="playername">Username</p>
  </nav>
  </header>
  <main className="container-fluid text-center">
      App components go here!
  </main>

<footer>
  <span>Creator: Eli Barton</span>
  <a href="https://github.com/EliBarton/startup">Eli Barton's GitHub</a>
</footer>
<p style="display:none">
  Wow look at this cool hidden text! You are cool if you see this.
</p>
</div>
</BrowserRouter>;
}
