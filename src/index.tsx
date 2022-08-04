import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { App } from './components/app';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Recipes } from './components/recipes';
import { Create } from './components/recipes/Create';
import { Products } from './components/products/Products';
import { Registration } from './components/registration/Registration';
import { Login } from './components/registration/Login';
import DetailedRecipe from './components/recipes/DetailedRecipe';
import Logout from './components/registration/Logout';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="recipes" element={<Recipes />}></Route>
          <Route path="recipes/:sort/:order" element={<Recipes />}></Route>
          <Route path="recipe/create" element={<Create />}></Route>
          <Route path="recipe/update/:id" element={<Create />}></Route>
          <Route path="recipe/:id" element={<DetailedRecipe />}></Route>
          <Route path="products" element={<Products />}></Route>
          <Route path="registration" element={<Registration />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="logout" element={<Logout />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
