import React from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

function Product({ product }) {
  const dispatch = useDispatch()
  function addProduct(){
   dispatch({type: 'addToCart', payload: {...product , quantity: 1}})
  }
  return (
    <div className='product'>
      <h4 className='name'>{product.name}</h4>
      <img className='imageItem' src={product.image} alt="" height='100' width='100' />
      <h4 className='price'><b>Price : </b>{product.price} $/-</h4>
      <div className="d-flex justify-content-end">
        <Button onClick={()=> addProduct()}>Add To Cart</Button>
      </div>
    </div>
  )
}

export default Product