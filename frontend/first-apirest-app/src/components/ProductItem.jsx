import React from 'react';

const ProductItem = ({ product, onEdit, onDelete }) => {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <div>
        <h4>{product.data.name}</h4>
        <p>Precio: ${product.data.price}</p>
        <p>Detalles: {product.data.details}</p>
      </div>
      <div>
        <button onClick={onEdit} className="btn btn-warning mr-2">Editar</button>
        <button onClick={onDelete} className="btn btn-danger">Eliminar</button>
      </div>
    </div>
  );
};

export default ProductItem;
