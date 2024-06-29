import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';

const App = () => {
  const [updateTrigger, setUpdateTrigger] = useState(false);

  const handleUpdate = () => {
    setUpdateTrigger(prev => !prev);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Administrar Productos</h1>
      <AddProduct onAdd={handleUpdate} />
      <ProductList onUpdate={handleUpdate} />
    </div>
  );
};

export default App;
