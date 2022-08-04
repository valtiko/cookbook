import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../recipes/DetailedRecipe.scss';

const Logout = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('Email');

  useEffect(() => {
    if (isAuthenticated !== null) {
      localStorage.clear();
    }
    navigate(-1);
  }, []);

  return (
    <div className="container">
      <h3>Logout...</h3>
    </div>
  );
};

Logout.propTypes = {};

export default Logout;
