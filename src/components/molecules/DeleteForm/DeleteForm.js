import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const DeleteForm = ({ recipeId, hide }) => {
  const navigate = useNavigate();
  const deleteRecipe = async (id) => {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      const response = await fetch(
        `https://cookbook-docs.herokuapp.com/api/v1/recipes/${id}`,
        requestOptions
      );

      if (!response.ok) {
        Error(`Error! status: ${response.status}`);
      }
    } catch (err) {
      console.log(err);
    } finally {
      navigate('/recipes');
    }
  };

  return (
    <div>
      <h3>Do you want to remove the recipe?</h3>
      <button onClick={() => deleteRecipe(recipeId)}>yes</button>
      <button onClick={hide}>no</button>
    </div>
  );
};

DeleteForm.propTypes = {
  recipeId: PropTypes.string,
  hide: PropTypes.func,
};

export default DeleteForm;
