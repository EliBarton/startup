import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export function PostLogin(props){
    const navigate = useNavigate();

    function logout() {
        fetch(`/api/auth/logout`, {
          method: 'delete',
        }).catch(console.error("Error logging out")).finally(() => {
            props.onLogout()
            localStorage.removeItem('userName');
        });
        
      }

    function play(){
        navigate( '/play' );
    }

      return (
        <div id="playControls">
            <div id="playerName">{props.userName}</div>
            <Button type="button" className="btn btn-primary" onClick={play}>Play</Button>
            <Button type="button" className="btn btn-secondary" onClick={logout}>Logout</Button>
        </div>
      );
    
}