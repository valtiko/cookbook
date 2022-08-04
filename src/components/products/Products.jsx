import React, { useEffect, useState } from 'react';
import FormField from '../molecules/FormField/FormField';
import './Products.scss';

export const Products = () => {
  const [productList, setProductList] = useState([]);
  const [addProduct, setAddProduct] = useState('');
  const [editProduct, setEditProduct] = useState({ name: '', id: 0 });
  const [deleteProduct, setDeleteProduct] = useState({ name: '', id: 0 });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch(
      'https://cookbook-docs.herokuapp.com/api/v1/products'
    );
    const data = await response.json();

    setProductList(data.products);
  };

  const handleAddInputChange = (e) => {
    setAddProduct(e.target.value);
  };

  const handleAddFormSubmit = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: addProduct }),
    };

    try {
      const response = await fetch(
        `https://cookbook-docs.herokuapp.com/api/v1/products`,
        requestOptions
      );

      if (!response.ok) {
        // eslint-disable-next-line no-new
        new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();

      console.log(result);
    } catch (err) {
      console.log(err);
    } finally {
      fetchProducts();
    }
    setAddProduct('');
  };

  const handleEditSelectChange = (e) => {
    const findIndex = productList.findIndex(
      (product) => product.name === e.target.value
    );
    const findIdOfProduct = productList[findIndex].id;

    setEditProduct({
      id: findIdOfProduct,
      name: e.target.value,
    });
  };

  const handleFormEditSubmit = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editProduct.name }),
    };

    try {
      const response = await fetch(
        `https://cookbook-docs.herokuapp.com/api/v1/products/${editProduct.id}`,
        requestOptions
      );

      if (!response.ok) {
        // eslint-disable-next-line no-new
        new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();

      console.log(result);
    } catch (err) {
      console.log(err);
    } finally {
      fetchProducts();
    }

    setEditProduct({ id: editProduct.id, name: '' });
  };

  const handleInputEditChange = (e) => {
    setEditProduct({ id: editProduct.id, name: e.target.value });
  };

  const handleDeleteSelectSubmit = (e) => {
    e.preventDefault();

    const findIndex = productList.findIndex(
      (product) => product.name === e.target.value
    );
    const findIdOfProduct = productList[findIndex].id;

    setDeleteProduct({
      id: findIdOfProduct,
      name: e.target.value,
    });
  };

  const handleFormDeleteSubmit = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      const response = await fetch(
        `https://cookbook-docs.herokuapp.com/api/v1/products/${deleteProduct.id}`,
        requestOptions
      );

      if (!response.ok) {
        // eslint-disable-next-line no-new
        new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();

      console.log(result);
    } catch (err) {
      console.log(err);
    } finally {
      fetchProducts();
    }
  };

  return (
    <div>
      <div id="product-list">
        <h3>Lists of products</h3>
        <ul>
          {productList.map((product, i) => (
            <li key={i}>{product.name}</li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleAddFormSubmit}>
        <h3>Add product</h3>
        <FormField
          name="name"
          id="name"
          value={addProduct}
          handleInputChange={handleAddInputChange}
        />
        <button type="submit">Add</button>
      </form>
      <form onSubmit={handleFormEditSubmit}>
        <h3>Edit product</h3>
        <label htmlFor="products">Choose product to edit</label>
        <select
          defaultValue={'default'}
          name="products"
          id="products"
          onChange={handleEditSelectChange}>
          <option value="default" disabled hidden>
            Choose here
          </option>
          {productList.map((product) => (
            <option key={product.id} value={product.name}>
              {product.name}
            </option>
          ))}
        </select>
        <FormField
          name="edit"
          id="edit"
          value={editProduct.name}
          handleInputChange={handleInputEditChange}
        />
        <button type="submit">Change product</button>
      </form>
      <form onSubmit={handleFormDeleteSubmit}>
        <h3>Delete product</h3>
        <label htmlFor="products">Choose product to delete</label>
        <select
          name="products"
          id="products"
          defaultValue={'default'}
          onChange={handleDeleteSelectSubmit}>
          <option value="default" disabled hidden>
            Choose here
          </option>
          {productList.map((product) => (
            <option key={product.id} value={product.name}>
              {product.name}
            </option>
          ))}
        </select>
        <button type="submit">Delete product</button>
      </form>
    </div>
  );
};

Products.propTypes = {};
