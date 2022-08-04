import React, { useEffect, useState } from 'react';
import './recipes.scss';
import 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

interface Recipe {
  id: number;
  name: String;
  content: String;
}

export const Recipes = () => {
  const { sort, order } = useParams();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [sortBy, setSortBy] = useState<string>('name');
  const [orderBy, setOrderBy] = useState<string>('asc');
  const [inputText, setInputText] = useState('');
  const navigation = useNavigate();

  const fetchRecipes = async () => {
    const response = await fetch(
      `https://cookbook-docs.herokuapp.com/api/v1/recipes?sort_by=${sort}&sort_order=${order}`
    );
    const data = await response.json();
    setRecipes(data.data);
    setFilteredRecipes(data.data);
  };

  useEffect(() => {
    fetchRecipes();
    if (sort !== undefined) {
      // @ts-ignore
      document.getElementById('recipeSortBy').value = sort;
      // @ts-ignore
      document.getElementById('recipeOrderBy').value = order;
    }
  }, [sort, order]);

  const SortRecipes = async () => {
    navigation(`/recipes/${sortBy}/${orderBy}`);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleOpenRecipe = (id: number) => {
    navigation(`/recipe/${id}`);
  };

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setInputText(searchWord);
    const newFilter = filteredRecipes.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === '') {
      setRecipes(filteredRecipes);
    } else {
      setRecipes(newFilter);
    }
  };

  return (
    <>
      <div>
        <div className="search">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                Search recipe:
              </span>
            </div>
            <input
              onChange={handleFilter}
              value={inputText}
              type="text"
              className="form-control"
              placeholder="Recipe"
              aria-label="Recipe"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
        <br />
        <label id="SortSelect">Sort by:</label>
        <select
          onClick={SortRecipes}
          className="custom-select"
          onChange={(event) => setSortBy(event.target.value)}
          name="SortBy"
          id="recipeSortBy">
          <option hidden value="">
            Please choose sort option
          </option>
          <option value="name">Name</option>
          <option value="cooking_time">Cooking time</option>
          <option value="level">Level</option>
          <option value="rating">Rating</option>
          <option value="price">Price</option>
          <option value="average_rate">Average rate</option>
          <option value="video_link">Video link</option>
        </select>

        <select
          onClick={SortRecipes}
          className="custom-select"
          onChange={(event) => setOrderBy(event.target.value)}
          name="OrderBy"
          id="recipeOrderBy">
          <option hidden value="">
            Please choose sort order
          </option>
          <option value="asc">ascending</option>
          <option value="desc">descending</option>
        </select>
      </div>

      <br />
      <ul className="list-group">
        {recipes.map((recipe) => (
          <li className="list-group-item" key={recipe.id}>
            <div id={'styledLi'}>
              <div
                id={'recipeName'}
                onClick={() => handleOpenRecipe(recipe.id)}>
                Name: {recipe.name}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};
