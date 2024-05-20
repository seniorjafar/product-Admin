import React, { memo, useState, useEffect } from 'react';
import "./Products.scss";
import axios from '../../api';
import Card from 'react-bootstrap/Card';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const Products = ({ data, isAdmin, setReload }) => {
  const [show, setShow] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [editProductName, setEditProductName] = useState('');
  const [editProductPrice, setEditProductPrice] = useState('');
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    setProductData(data);
  }, [data]);

  const handleClose = () => {
    setShow(false);
    setEditProductId(null);
    setEditProductName('');
    setEditProductPrice('');
  };

  const handleShow = (id, name, price) => {
    setShow(true);
    setEditProductId(id);
    setEditProductName(name);
    setEditProductPrice(price);
  };

  const handleDelete = id => {
    axios
      .delete(`/products/${id}`)
      .then(res => {
        setReload(prev => !prev);
        console.log(res.data);
        setProductData(productData.filter(item => item.id !== id));
      })
      .catch(error => {
        console.log(error);
      });
  };

const handleSaveChanges = () => {
  axios
    .put(`/products/${editProductId}`, {
      name: editProductName,
      price: editProductPrice,
    })
    .then(res => {
      setReload(prev => !prev);
      console.log(res.data);
      const updatedData = productData.map(item => {
        if (item.id === editProductId) {
          return {
            ...item,
            nomi: editProductName,
            narxi: editProductPrice,
          };
        }
        return item;
      });
      setProductData(updatedData);
      handleClose();
      // window.location.href = `/createProduct/${editProductId || ''}`;
    })
    .catch(error => {
      console.log(error);
    });
};

  const handleProductNameChange = e => {
    setEditProductName(e.target.value);
  };

  const handleProductPriceChange = e => {
    setEditProductPrice(e.target.value);
  };

  let productItems = productData?.map(el => (
    <div key={el.id}>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={el.img} />
        <Card.Body>
          <Card.Title>{editProductId === el.id ? editProductName : el.nomi}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </Card.Text>
        </Card.Body>
        <h3>${editProductId === el.id ? editProductPrice : el.narxi}</h3>
        <Card.Body>
          {isAdmin ? (
            <>
              <span className='d-flex flex-wrap mx-auto gap-3'>
                <Link onClick={() => handleShow(el.id, el.nomi, el.narxi)} className='btn btn-info'>Edit</Link>
                <button type='danger' className='btn btn-danger' onClick={() => handleDelete(el.id)}>Delete</button>
              </span>
            </>
          ) : (
            <></>
          )}
        </Card.Body>
      </Card>
    </div>
  ));

  return (
    <div>
      <Container>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Product</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Product Name"
                  autoFocus
                  value={editProductName}
                  onChange={handleProductNameChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Product Price"
                  value={editProductPrice}
                  onChange={handleProductPriceChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Example textarea</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="wrapper">{productItems}</div>
      </Container>
    </div>
  );
};

export default memo(Products);