import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

const UpdateProductModal = ({ product, onUpdate, onClose }) => {
  const [name, setName] = useState(product.data.name);
  const [price, setPrice] = useState(product.data.price);
  const [details, setDetails] = useState(product.data.details);
  const API = 'http://localhost:5000/firstapirest/us-central1/app';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API}/api/products/${product.id}`, { name, price, details });
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <Modal show onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Actualizar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Precio</Form.Label>
            <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Detalles</Form.Label>
            <Form.Control as="textarea" value={details} onChange={(e) => setDetails(e.target.value)} required />
          </Form.Group>
          <Button type="submit" variant="success">Actualizar Producto</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateProductModal;
