import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { Recipes } from '../recipes';

export const Login = () => {
  const [emaillog, setEmaillog] = useState(' ');
  const [passwordlog, setPasswordlog] = useState(' ');
  const [flag, setFlag] = useState(false);
  const [home, setHome] = useState(true);

  function handleLogin(e: any) {
    e.preventDefault();
    const mail = localStorage.getItem('Email')?.replace(/"/g, '');
    const pass = localStorage.getItem('Password')?.replace(/"/g, '');

    if (!emaillog || !passwordlog) {
      setFlag(true);
      console.log('EMPTY');
    } else if (passwordlog !== pass || emaillog !== mail) {
      setFlag(true);
    } else {
      setHome(!home);
      setFlag(false);
    }
  }

  return (
    <div>
      {home ? (
        <form onSubmit={handleLogin}>
          <h3>Login</h3>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(event) => setEmaillog(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(event) => setPasswordlog(event.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-dark btn-lg btn-block">
            Login
          </button>
          {flag && (
            <Alert color="primary" variant="warning">
              Fill correct Info else keep trying.
            </Alert>
          )}
        </form>
      ) : (
        <Recipes />
      )}
    </div>
  );
};

export default Login;
