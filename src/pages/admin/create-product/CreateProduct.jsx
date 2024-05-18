import React, { useState } from 'react'
import axios from '../../../api/index'
import { toast } from 'react-toastify'


import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';

let initialState = {
  nomi:"",
  narxi: "",
}

const CreateProduct = () => {
  const [newProduct, setNewProduct] = useState(initialState)
  const handleCreate = e =>{
    e.preventDefault()
    axios
      .post("/products", newProduct )
      .then(res => {
        setNewProduct(initialState)
        toast.success("Qo'shildi product")
        console.log(res)
      })
      .catch(res => console.log(res))
  }
  return (
    <div>
      <Container>
        <h2>CreateProduct</h2>
        <form onSubmit={handleCreate} action="">
          <InputGroup className="mb-3">
            <Form.Control
              value={newProduct.nomi} 
              onChange={e => setNewProduct(prev => ({...prev, nomi: e.target.value}))} 
              placeholder="Product"
              aria-label="Username"
              aria-describedby="basic-addon1"
              
            />
            <Form.Control
              value={newProduct.narxi} 
              onChange={e => setNewProduct(prev => ({...prev, narxi: +e.target.value}))} 
              placeholder="Price"
              aria-label="Username"
              type='number'
              />
          </InputGroup>
          <button type='success' className='btn btn-success'>Create</button>
        </form>
      </Container>
        
    </div>
  )
}

export default CreateProduct