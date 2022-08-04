import React, { useEffect, useState } from 'react';

const DetailedRecipe = ({ hide, fetchRecipes, recipeId }) => {
  const [recipe, setRecipe] = useState({});
  const [productsInRecipe, setProductsInRecipe] = useState([]);

  useEffect(() => {
    fetchRecipe();
  }, []);

  const fetchRecipe = async () => {
    const response = await fetch(
      `https://cookbook-docs.herokuapp.com/api/v1/recipes/${recipeId}`
    );
    const data = await response.json();

    let array = [];

    data.ingredients?.forEach((item) => {
      const index = array.findIndex((x) => x.product_id === item.product_id);
      if (index === -1) {
        array.push(item);
      } else {
        array[index].quantity += item.quantity;
      }
    });

    setProductsInRecipe(array);

    setRecipe(data);
  };

  const closeModal = () => {
    fetchRecipes().then(hide);
  };

  return (
    <div className="container">
      <div id={'map'}>
        <div id={'name'}>name:</div>
        <div id={'value'}>{recipe.name}</div>
      </div>
      <div id={'map'}>
        <div id={'name'}>content:</div>
        <div id={'value'}>{recipe.content}</div>
      </div>
      <div id={'map'}>
        <div id={'name'}>level:</div>
        <div id={'value'}>{recipe.level}</div>
      </div>
      <div id={'map'}>
        <div id={'name'}>video_link:</div>
        <div id={'value'}>{recipe.video_link}</div>
      </div>
      <div id={'map'}>
        <div id={'name'}>cooking_time:</div>
        <div id={'value'}>{recipe.cooking_time}</div>
      </div>
      <div id={'map'}>
        <div id={'name'}>price:</div>
        <div id={'value'}>{recipe.price}</div>
      </div>
      <div id={'map'}>
        <div id={'name'}>photo_url:</div>
        <div id={'value'}>{recipe.photo_url}</div>
      </div>
      <div id={'map'}>
        <div id={'name'}>avg_rate:</div>
        <div id={'value'}>{recipe.avg_rate}</div>
      </div>
      <div id={'map'}>
        <div id={'name'}>rates_count:</div>
        <div id={'value'}>{recipe.rates_count}</div>
      </div>
      <div id={'map'}>
        <div id={'name'}>thumbnail_url:</div>
        <div id={'value'}>{recipe.thumbnail_url}</div>
      </div>
      <div id={'map'}>
        <div id={'name'}>ingredients:</div>
        <div id={'objectValue'}>
          {productsInRecipe?.map((item, i) => (
            <div id={'value'} key={i}>
              {item.name} - {item.quantity}
            </div>
          ))}
        </div>
      </div>
      <div id={'map'}>
        <div id={'name'}>comments:</div>
        <div id={'objectValue'}>
          {recipe.comments?.map((item) => (
            <div id={'value'} key={item.id}>
              author: {item.author}
              body: {item.body}
            </div>
          ))}
        </div>
      </div>
      <button onClick={closeModal}>Back to recipe list</button>
    </div>
  );
};

DetailedRecipe.propTypes = {};

export default DetailedRecipe;
