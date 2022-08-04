import { useEffect, useState } from 'react';
import FormField from '../molecules/FormField/FormField';
import './create.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { Form } from 'react-bootstrap';

const initialErrors = {
  name: '',
  content: '',
  video_link: '',
  cooking_time: '',
  thumbnail_url: '',
  price: '',
  level: '',
};

export const Create = () => {
  const [products, setProducts] = useState([{ id: 0, name: '', quantity: 0 }]);
  const [recipe, setRecipe] = useState({});
  const [errors, setErrors] = useState(initialErrors);
  const [productsInRecipe, setProductsInRecipe] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const isAuthenticated = localStorage.getItem('Email');

  // const validation = () => {
  //   let array = initialErrors;
  //
  //   recipe.name.length === 0
  //     ? (array = { ...array, name: "Can't be blank" })
  //     : (array = { ...array, name: '' });
  //   recipe.content.length === 0
  //     ? (array = { ...array, content: "Can't be blank" })
  //     : (array = { ...array, content: '' });
  //   (recipe.cooking_time <= 1 || recipe.cooking_time >= 200) &&
  //   recipe.cooking_time.length > 0
  //     ? (array = {
  //         ...array,
  //         cooking_time: 'must be greater than 1',
  //       })
  //     : (array = { ...array, cooking_time: '' });
  //   recipe.price <= 0
  //     ? (array = { ...array, price: 'must be greater than 0' })
  //     : (array = { ...array, price: '' });
  //   recipe.level <= 0
  //     ? (array = { ...array, level: 'must be greater than or equal to 1' })
  //     : (array = { ...array, level: '' });
  //   setErrors(array);
  //
  //   return JSON.stringify(array) === JSON.stringify(initialErrors);
  // };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    recipe.ingredients_attributes?.forEach((object) => {
      object.product_id = object.id;
      delete object.name;
      delete object.id;
    });

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipe),
    };

    try {
      let URL = `https://cookbook-docs.herokuapp.com/api/v1/recipes/`;
      if (id) {
        URL = `https://cookbook-docs.herokuapp.com/api/v1/recipes/${id}`;
        requestOptions.method = 'PUT';
      }
      const response = await fetch(URL, requestOptions);

      if (!response.ok) {
        Error(response.statusText);
      }

      const result = await response.json();

      if (result.errors) {
        setErrors(result.errors);
      } else {
        if (id !== undefined) {
          navigate(-1);
        } else {
          navigate('/recipes');
        }
      }
    } catch (error) {
      setErrors(error);
    }
  };

  const fetchRecipe = async (idRecipe) => {
    const response = await fetch(
      `https://cookbook-docs.herokuapp.com/api/v1/recipes/${idRecipe}`
    );
    const data = await response.json();

    const array = [];

    data.ingredients?.forEach((item) => {
      const index = array.findIndex((x) => x.product_id === item.product_id);
      if (index === -1) {
        array.push(item);
      } else {
        array[index].quantity += item.quantity;
      }
    });

    await setRecipe(data);
    await setProductsInRecipe(array);

    if (data.video_link === 'unknown') {
      setRecipe({ ...recipe, video_link: '' });
    }
  };

  const fetchProducts = async () => {
    const response = await fetch(
      'https://cookbook-docs.herokuapp.com/api/v1/products'
    );
    const data = await response.json();

    let array = [];
    data.products?.map((product) => {
      return (array = [
        ...array,
        { id: product.id, name: product.name, quantity: 0 },
      ]);
    });

    setProducts(array);
  };

  useEffect(() => {
    fetchProducts();
    if (id) {
      fetchRecipe(id);
    }
  }, []);

  const handleInputChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleProductInputChange = (e) => {
    let array = [];

    array = products.map((product) =>
      product.name === e.target.name
        ? { ...product, quantity: e.target.valueAsNumber }
        : product
    );

    setProducts(array);

    array = array.filter((obj) => obj.quantity > 0);

    setRecipe({ ...recipe, ingredients_attributes: array });
  };

  return (
    <>
      {isAuthenticated !== null ? (
        <Form onSubmit={handleFormSubmit}>
          <h1>Add new recipe</h1>
          <FormField
            id="name"
            name="name"
            value={recipe.name}
            handleInputChange={handleInputChange}
          />
          {errors.name ? <p>{errors.name}</p> : null}
          <FormField
            id="content"
            name="content"
            value={recipe.content}
            handleInputChange={handleInputChange}
          />
          {errors.content ? <p>{errors.content}</p> : null}
          <FormField
            id="video_link"
            name="video_link"
            value={recipe.video_link || ''}
            isRequired={false}
            handleInputChange={handleInputChange}
          />
          {errors.video_link ? <p>{errors.video_link}</p> : null}
          <FormField
            id="thumbnail_url"
            name="thumbnail_url"
            value={recipe.thumbnail_url || ''}
            handleInputChange={handleInputChange}
            isRequired={false}
          />
          {errors.thumbnail_url ? <p>{errors.thumbnail_url}</p> : null}
          <FormField
            id="cooking_time"
            name="cooking_time"
            value={recipe.cooking_time}
            min="0"
            type="number"
            isRequired={false}
            handleInputChange={handleInputChange}
          />
          {errors.cooking_time ? <p>{errors.cooking_time}</p> : null}
          <FormField
            id="price"
            name="price"
            value={recipe.price}
            min="0"
            type="float"
            handleInputChange={handleInputChange}
          />
          {errors.price ? <p>{errors.price}</p> : null}
          <FormField
            id="level"
            name="level"
            value={recipe.level}
            min="0"
            max="5"
            type="number"
            placeholder={'test'}
            handleInputChange={handleInputChange}
          />
          {errors.level ? <p>{errors.level}</p> : null}

          <br />
          <div>Necessary ingredients</div>
          <ul>
            {productsInRecipe?.map((product, i) => (
              <li key={i}>
                {product.name} - {product.quantity}
              </li>
            ))}
          </ul>

          <br />
          <div>Add ingredients</div>
          {products.map((product) => (
            <div key={product.id}>
              <input
                type="number"
                min="0"
                max="20"
                id={product.name}
                name={product.name}
                value={product.quantity}
                onChange={handleProductInputChange}
              />
              <label htmlFor={product.name}>{product.name}</label>
            </div>
          ))}
          <button type="submit">Add recipe</button>
        </Form>
      ) : (
        <div className="container">
          <h3>You must be logged in to create recipe</h3>{' '}
          <button onClick={() => navigate('/login')}>Login</button>
          <button onClick={() => navigate('/registration')}>Register</button>
          <button onClick={() => navigate('/recipes')}>
            Back to recipe list
          </button>
        </div>
      )}
    </>
  );
};
