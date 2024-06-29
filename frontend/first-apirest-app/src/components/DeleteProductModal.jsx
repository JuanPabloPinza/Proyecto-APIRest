import React from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

const DeleteProductModal = ({ product, onUpdate, onClose }) => {
  const API = 'http://localhost:5000/firstapirest/us-central1/app';

  const handleDelete = async () => {
    try {
      await axios.delete(`${API}/api/products/${product.id}`);
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>¿Estás seguro de que quieres eliminar el producto {product.data.name}?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteProductModal;
