import React, { useState } from 'react';
import { Alert, Form } from 'react-bootstrap';
import Login from './Login';

export const Registration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [profession, setProfession] = useState('');

  const [flag, setFlag] = useState(false);
  const [login, setLogin] = useState(true);

  function handleFormSubmit(e: any) {
    e.preventDefault();

    if (!name || !email || !password || !phone || !profession) {
      setFlag(true);
    } else {
      setFlag(false);
      localStorage.setItem('Email', JSON.stringify(email));
      localStorage.setItem('Password', JSON.stringify(password));
      localStorage.setItem('Expiry', JSON.stringify('12312'));
      localStorage.setItem('Client', JSON.stringify('asdi12iohj'));
      localStorage.setItem('Uid', JSON.stringify('ashjdgahsgdj'));
      localStorage.setItem(
        'Access-Token',
        JSON.stringify('yydatuysdtuyastdyu')
      );
      console.log('Saved in Local Storage');

      setLogin(!login);
    }
  }

  function handleClick() {
    setLogin(!login);
  }

  return (
    <>
      <div>
        {' '}
        {login ? (
          <Form onSubmit={handleFormSubmit}>
            <h3>Register</h3>

            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Full Name"
                name="name"
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Phone No.</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter contact no"
                onChange={(event) => setPhone(event.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Choose your Profession</label>
              <Form.Control
                as="select"
                onChange={(event) => setProfession(event.target.value)}>
                <option>Select</option>
                <option>Artist</option>
                <option>Photographer</option>
                <option>Team Player</option>
                <option>Full Stack</option>
              </Form.Control>
            </div>

            <button type="submit" className="btn btn-dark btn-lg btn-block">
              Register
            </button>
            <p onClick={handleClick} className="forgot-password text-right">
              Already registered log in?
            </p>
            {flag && (
              <Alert color="primary" variant="danger">
                I got it you are in hurry! But every Field is important!
              </Alert>
            )}
          </Form>
        ) : (
          <Login />
        )}
      </div>
    </>
  );
};

export default Registration;
