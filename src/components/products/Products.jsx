import React, { memo } from 'react';
import "./Products.scss";
import axios from '../../api';
import Card from 'react-bootstrap/Card';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Products = ({ data, isAdmin, setReload }) => {

  const handleDelete = id => {
    axios
      .delete(`/products/${id}`)
      .then(res => {
        setReload(prev => !prev);
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };



  let productItems = data?.map(el => (
    <div key={el.id}>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={el.img} />
        <Card.Body>
          <Card.Title>{el.nomi}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </Card.Text>
        </Card.Body>
        <h3>${el.narxi}</h3>
        <Card.Body>
          {isAdmin ? (
            <>
              <span className='d-flex flex-wrap mx-auto gap-3'>
                <Link to={`/create-product/${el.id}`} className='btn btn-info'>Edit</Link>
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
        <div className="wrapper">{productItems}</div>
      </Container>
    </div>
  );
};

export default memo(Products);