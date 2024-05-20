import { useState } from 'react'
import Products from '../../../components/products/Products'
import useFetch from '../../../hooks/useFetch'

import { Container } from 'react-bootstrap'


const ManageProducts = () => {
  const [reload, setReload] = useState(true)
  let {data, loading,error} = useFetch("/products", reload)

  return (
    <div>
        <h2 className='m-3'>ManageProducts</h2>
      <Container className=''>
        <Products   setReload={setReload} isAdmin={true} data={data}/>
      </Container>

    </div>
  )
}

export default ManageProducts