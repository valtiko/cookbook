import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './DetailedRecipe.scss';
import Modal from '../Modal/Modal';
import useModal from '../Modal/useModal';

const initialCommentShape = {
  author: '',
  body: '',
};

const DetailedRecipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [productsInRecipe, setProductsInRecipe] = useState([]);
  const { isShowing, toggle } = useModal();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formattedYTLink, setFormattedYTLink] = useState('');
  const [comment, setComment] = useState(initialCommentShape);
  const refTextarea = useRef(null);
  const isAuthenticated = localStorage.getItem('Email');

  useEffect(() => {
    fetchRecipe();
  }, []);

  const formatYouTubeLink = (videoLink) => {
    const videoURL = videoLink;
    let variable;

    if (videoURL.indexOf('youtube') > -1) {
      if (videoURL.indexOf('embed') > -1) {
        variable = videoURL.split('/')[4];
      } else {
        // youtube video
        variable = videoURL.split('/')[3].split('=')[1].split('&')[0];
      }
      const src = `https://www.youtube.com/embed/${variable}?controls=0&autoplay=1`;
      setFormattedYTLink(src + '?autoplay=0');
    }
  };

  const fetchRecipe = async () => {
    try {
      const response = await fetch(
        `https://cookbook-docs.herokuapp.com/api/v1/recipes/${id}`
      );

      if (!response.ok) {
        setErrors({ status: response.status });
      }

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

      formatYouTubeLink(data.video_link);

      setProductsInRecipe(array);

      setRecipe(data);
    } catch (error) {}
  };

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

  const handleDeleteRecipe = (id) => {
    if (confirm('Do you want delete recipe?') === true) {
      deleteRecipe(id);
    }
  };

  const handleAddRate = async (e) => {
    const rate = { value: e.target.value };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rate),
    };

    try {
      const URL = `https://cookbook-docs.herokuapp.com/api/v1/recipes/${id}/rates`;
      const response = await fetch(URL, requestOptions);

      if (!response.ok) {
        Error(response.statusText);
      }

      const result = await response.json();

      if (result.errors) {
        setErrors(result.errors);
      }
    } catch (error) {
      setErrors(error);
    } finally {
      fetchRecipe();
    }
  };

  const handleCommentEdit = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const handleAddComment = async () => {
    const textAreaValue = refTextarea.current.value;
    if (textAreaValue.length < 10) {
      setErrors({ ...errors, textarea: 'error' });
    } else {
      setErrors({ ...errors, textarea: '' });

      const Uid = localStorage.getItem('Uid');
      const Expiry = localStorage.getItem('Expiry');
      const AccessToken = localStorage.getItem('Access-Token');
      const Client = localStorage.getItem('Client');

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Uid,
          Expiry,
          Client,
          AccessToken,
        },
        body: JSON.stringify(comment),
      };

      try {
        const URL = `https://cookbook-docs.herokuapp.com/api/v1/recipes/${id}/comments`;
        const response = await fetch(URL, requestOptions);

        if (!response.ok) {
          Error(response.statusText);
        }

        const result = await response.json();

        if (result.errors) {
          setErrors(result.errors);
        }
      } catch (error) {
        setErrors(error);
      } finally {
        fetchRecipe();
      }
    }
    setComment(initialCommentShape);
  };

  return (
    <>
      {errors.status !== 404 ? (
        <div className="container">
          {isAuthenticated ? (
            <>
              <button onClick={() => navigate(`/recipe/update/${id}`)}>
                Edit recipe
              </button>
              <button onClick={() => handleDeleteRecipe(recipe.id)}>
                Delete recipe
              </button>
            </>
          ) : null}

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
            <div id={'value'}>
              {formattedYTLink !== '' ? (
                <iframe
                  width="420"
                  height="320"
                  src={formattedYTLink}
                  allowFullScreen
                  title="video"
                />
              ) : (
                <>{recipe.video_link}</>
              )}
            </div>
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
            <div id={'value'}>
              {recipe.thumbnail_url?.indexOf('.jpg') > -1 ? (
                <img width="420" height="360" src={recipe.thumbnail_url} />
              ) : (
                <a href={recipe.thumbnail_url} target="_blank" rel="noreferrer">
                  {recipe.thumbnail_url}
                </a>
              )}
            </div>
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
                  <br />
                  {item.body}
                  <br />
                  <br />
                </div>
              ))}
            </div>
          </div>
          {isAuthenticated !== null ? (
            <div id="comment">
              <div id={'map'}>
                <div id={'name'}>Type comment:</div>
                <div id={'value'}>
                  Author:
                  <br />
                  <input
                    value={comment.author}
                    type="text"
                    name="author"
                    onChange={handleCommentEdit}
                  />
                  <br />
                  Body:
                  <br />
                  <textarea
                    ref={refTextarea}
                    value={comment.body}
                    name="body"
                    onChange={handleCommentEdit}
                  />
                  {errors.textarea ? (
                    <div>Comment body has to have at least 10 characters.</div>
                  ) : null}
                  <button onClick={handleAddComment}>Add comment</button>
                </div>
              </div>
            </div>
          ) : null}

          {isAuthenticated !== null ? (
            <>
              <div id={'map'}>
                <div id={'name'}>Rate this recipe:</div>
                <div id={'value'}>
                  <button onClick={handleAddRate} value={1}>
                    1
                  </button>
                  <button onClick={handleAddRate} value={2}>
                    2
                  </button>
                  <button onClick={handleAddRate} value={3}>
                    3
                  </button>
                  <button onClick={handleAddRate} value={4}>
                    4
                  </button>
                  <button onClick={handleAddRate} value={5}>
                    5
                  </button>
                </div>
              </div>
              {errors.user_id ? errors.user_id : null}
            </>
          ) : null}
          <button onClick={() => navigate(-1)}>Back to recipe list</button>
        </div>
      ) : (
        <div className="container">
          <h3>There is no recipe with this id</h3>{' '}
          <button onClick={() => navigate('/recipes')}>
            Back to recipe list
          </button>
        </div>
      )}

      <Modal isShowing={isShowing} hide={toggle} recipeId={id} />
    </>
  );
};

DetailedRecipe.propTypes = {};

export default DetailedRecipe;
