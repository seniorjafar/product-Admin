import React, { useState } from 'react'
import axios from '../../../api/index'
import { toast } from 'react-toastify'

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
        <h2>CreateProduct</h2>
        <form onSubmit={handleCreate} action="">
          <input 
            value={newProduct.nomi} 
            onChange={e => setNewProduct(prev => ({...prev, nomi: e.target.value}))} 
            type="text" 
            placeholder='nomi' />
          <input 
            value={newProduct.narxi} 
            onChange={e => setNewProduct(prev => ({...prev, narxi: +e.target.value}))} 
            type="number" 
            placeholder='narxi' />
          <button>Create</button>
        </form>
    </div>
  )
}

export default CreateProduct