import { Outlet } from 'react-router-dom';
import './app.scss';

export const App = () => {
  const isAuthenticated = localStorage.getItem('Email');

  return (
    <div>
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <a className="nav-link active" href="/recipes">
            Recipe list
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href="/products">
            Products
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" href="/recipes">
            Recipe list
          </a>
        </li>
        {isAuthenticated ? (
          <>
            <li className="nav-item">
              <a className="nav-link active" href="/recipe/create">
                Create recipe
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="/logout">
                Logout
              </a>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <a className="nav-link active" href="/login">
                Login
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="/registration">
                Register
              </a>
            </li>
          </>
        )}
      </ul>
      <main className="App"></main>
      <Outlet />
    </div>
  );
};
