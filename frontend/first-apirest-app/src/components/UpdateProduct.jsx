import React, { useState } from 'react';
import axios from 'axios';

const UpdateProduct = ({ product, onUpdate }) => {
  const [name, setName] = useState(product.data.name);
  const [price, setPrice] = useState(product.data.price);
  const [details, setDetails] = useState(product.data.details);
  const API = 'http://localhost:5000/firstapirest/us-central1/app';

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${API}/api/products/${product.id}`, { name, price, details });
      onUpdate();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h2 className="card-title">Actualizar Producto</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre</label>
            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Precio</label>
            <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Detalles</label>
            <textarea className="form-control" value={details} onChange={(e) => setDetails(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-success">Actualizar Producto</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
