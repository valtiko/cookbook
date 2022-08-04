import React, { useEffect, useState } from 'react';

const UpdateRecipe = ({ hide, recipeId, fetchRecipes }) => {
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    fetchRecipe();
  }, []);

  const fetchRecipe = async () => {
    const response = await fetch(
      `https://cookbook-docs.herokuapp.com/api/v1/recipes/${recipeId}`
    );
    const data = await response.json();

    setRecipe(data);
  };

  function handleFormSubmit() {}

  const handleInputChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      {/*<h1>Add new recipe</h1>*/}
      {/*<FormField*/}
      {/*  id="name"*/}
      {/*  name="name"*/}
      {/*  value={recipe.name}*/}
      {/*  handleInputChange={handleInputChange}*/}
      {/*/>*/}
      {/*{errors.name ? <p>{errors.name}</p> : null}*/}
      {/*<FormField*/}
      {/*  id="content"*/}
      {/*  name="content"*/}
      {/*  value={recipe.content}*/}
      {/*  handleInputChange={handleInputChange}*/}
      {/*/>*/}
      {/*{errors.content ? <p>{errors.content}</p> : null}*/}
      {/*<FormField*/}
      {/*  id="video_link"*/}
      {/*  name="video_link"*/}
      {/*  value={recipe.video_link}*/}
      {/*  handleInputChange={handleInputChange}*/}
      {/*/>*/}
      {/*{errors.video_link ? <p>{errors.video_link}</p> : null}*/}
      {/*<FormField*/}
      {/*  id="cooking_time"*/}
      {/*  name="cooking_time"*/}
      {/*  value={recipe.cooking_time}*/}
      {/*  min="0"*/}
      {/*  type="number"*/}
      {/*  handleInputChange={handleInputChange}*/}
      {/*  isRequired={false}*/}
      {/*/>*/}
      {/*{errors.cooking_time ? <p>{errors.cooking_time}</p> : null}*/}
      {/*<FormField*/}
      {/*  id="price"*/}
      {/*  name="price"*/}
      {/*  value={recipe.price}*/}
      {/*  min="0"*/}
      {/*  type="number"*/}
      {/*  handleInputChange={handleInputChange}*/}
      {/*/>*/}
      {/*{errors.price ? <p>{errors.price}</p> : null}*/}
      {/*<FormField*/}
      {/*  id="level"*/}
      {/*  name="level"*/}
      {/*  value={recipe.level}*/}
      {/*  min="0"*/}
      {/*  type="number"*/}
      {/*  placeholder={"test"}*/}
      {/*  handleInputChange={handleInputChange}*/}
      {/*/>*/}
      {/*{errors.level ? <p>{errors.level}</p> : null}*/}

      {/*<br />*/}
      {/*<div>Necessary ingredients</div>*/}
      {/*{products.map((product) => (*/}
      {/*  <div key={product.id}>*/}
      {/*    <input*/}
      {/*      type="number"*/}
      {/*      min="0"*/}
      {/*      max="20"*/}
      {/*      id={product.name}*/}
      {/*      name={product.name}*/}
      {/*      value={product.quantity}*/}
      {/*      onChange={handleProductInputChange}*/}
      {/*    />*/}
      {/*    <label htmlFor={product.name}>{product.name}</label>*/}
      {/*  </div>*/}
      {/*))}*/}
      {/*<button type="submit">Add recipe</button>*/}
    </form>
  );
};

UpdateRecipe.propTypes = {};

export default UpdateRecipe;
