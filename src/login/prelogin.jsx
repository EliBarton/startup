
import React from 'react';
import Button from 'react-bootstrap/Button';

export function PreLogin(props){
    const [userName, setUserName] = React.useState(props.userName);
    const [password, setPassword] = React.useState('');
    const [displayError, setDisplayError] = React.useState(null);

      async function loginUser() {
        loginOrCreate(`/api/auth/login`);
      }
      
      async function createUser() {
        loginOrCreate(`/api/auth/create`);
      }
      
      async function loginOrCreate(endpoint) {
        const response = await fetch(endpoint, {
          method: 'post',
          body: JSON.stringify({ name: userName, password: password }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
      
        if (response.ok) {
          localStorage.setItem('userName', username);
          props.onLogin(userName)
        } else {
          const body = await response.json();
          setDisplayError(`"Error: " ${body.msg}`)
        } 
      }

      function handleUsernameChange(event) {
        setUserName(event.target.value);
      }
      
      function handlePasswordChange(event) {
        setPassword(event.target.value);
      }

      return (
        <div id="loginControls">
            <div className="form-group">
            <label>Username</label>
            <input type="text" id="username" placeholder="Enter username" value={userName} onChange={handleUsernameChange} />
            </div>
            <div className="form-group">
            <label>Password</label>
            <input type="password" id="password" placeholder="Your password here" value={password} onChange={handlePasswordChange} />
            </div>
            <Button variant='primary' className="btn btn-success" onClick={loginUser}>Login</Button>
            <Button variant='secondary' className="btn btn-success" onClick={createUser}>Create</Button>

        </div>
      )

}