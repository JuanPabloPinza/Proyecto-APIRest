import React, { useState } from 'react';
import axios from 'axios';
const API = 'http://localhost:5000/firstapirest/us-central1/app';

const AddProduct = ({ onAdd }) => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    details: ''
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/api/products`, product);
      alert('Producto añadido con éxito');
      setProduct({
        name: '',
        price: '',
        details: ''
      });
      onAdd();
    } catch (error) {
      console.error('Error añadiendo producto:', error);
      alert('Error añadiendo producto');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="form-group">
        <label>Nombre del Producto:</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label>Precio del Producto:</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label>Detalles del Producto:</label>
        <textarea
          name="details"
          value={product.details}
          onChange={handleChange}
          className="form-control"
          required
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">Añadir Producto</button>
    </form>
  );
};

export default AddProduct;
