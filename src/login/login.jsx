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

