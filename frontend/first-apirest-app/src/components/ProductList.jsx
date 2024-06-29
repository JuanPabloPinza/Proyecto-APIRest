import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateProductModal from './UpdateProductModal';
import ProductItem from './ProductItem';
import DeleteProductModal from './DeleteProductModal';

const ProductList = ({ onUpdate }) => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const API = 'http://localhost:5000/firstapirest/us-central1/app';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API}/api/products`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [onUpdate]);

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleDelete = (product) => {
    setDeletingProduct(product);
  };

  return (
    <div>
      <h2 className="text-center">Lista de Productos</h2>
      <ul className="list-group mb-4">
        {products.map(product => (
          <li key={product.id} className="list-group-item">
            <ProductItem 
              product={product} 
              onEdit={() => handleEdit(product)} 
              onDelete={() => handleDelete(product)} 
            />
          </li>
        ))}
      </ul>
      {editingProduct && (
        <UpdateProductModal 
          product={editingProduct} 
          onUpdate={() => { onUpdate(); setEditingProduct(null); }} 
          onClose={() => setEditingProduct(null)}
        />
      )}
      {deletingProduct && (
        <DeleteProductModal 
          product={deletingProduct} 
          onUpdate={() => { onUpdate(); setDeletingProduct(null); }} 
          onClose={() => setDeletingProduct(null)}
        />
      )}
    </div>
  );
};

export default ProductList;
