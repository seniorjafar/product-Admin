import { useState } from 'react'
import Products from '../../../components/products/Products'
import useFetch from '../../../hooks/useFetch'

const ManageProducts = () => {
  const [reload, setReload] = useState(true)
  let {data, loading,error} = useFetch("/products", reload)

  return (
    <div>
      <h2>ManageProducts</h2>
      <Products setReload={setReload} isAdmin={true} data={data}/>

    </div>
  )
}

export default ManageProducts