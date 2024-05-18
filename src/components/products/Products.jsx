import React, {memo} from 'react'
import "./Products.scss"
import axios from '../../api'

import Card from 'react-bootstrap/Card';

const Products = ({data, isAdmin, setReload}) => {
    const handleDelete = id => {
        axios
            .delete(`/product/${id}`)
            .then(res =>{
                setReload(prev => !prev)
                console.log(res)})
            .catch(res => console.log(res))
            
    }
 

    let productItems = data?.map((el)=>(
        <div key={el.id}>
            <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={el.img} />
                    <Card.Body>
                        <Card.Title>{el.nomi}</Card.Title>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                        </Card.Text>
                    </Card.Body>
                    <h3>{el.narxi}</h3>
                    <Card.Body>
                        {
                                isAdmin ? 
                                <>
                                    <Card.Link href="#">Edit</Card.Link>
                                    <Card.Link onClick={()=> handleDelete(el.id)} >Delete</Card.Link>
                                </>
                                :
                                <></>
                            }
                        
                        
                    </Card.Body>
    </Card>
            
        </div>
    ))
  return (
    <div>
        <h2>Products</h2>
        <div className="wrapper">
            {productItems}
        </div>
        
    </div>
  )
}

export default memo(Products)