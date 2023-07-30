import React, { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import axios from 'axios'
import Category from '../components/Category'




function Home() {
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState([])
  const [selectedCategory, setSelectedCategoty] = useState("burger");

  const getCategorys = () => {
    axios.get('https://pos-app-csk0.onrender.com/api/category').then((res) => {
      setCategory(res.data)
    }).catch((error) => {
      console.log(error)
    })
  }

  const getProducts = () => {
    axios.get('https://pos-app-csk0.onrender.com/api/products').then((res) => {
      setProducts(res.data)
    }).catch((error) => {
      console.log(error)
    })
  }

  useEffect(() => {
    getProducts()
    getCategorys()
  }, [])

  return (
    // <div>
    //   <Navbar bg="" expand="lg">
    //     {category.map((category) => {
    //       return <Nav className="mr-auto"
    //       onClick={()=>setSelectedCategoty(category.name)}
    //       >
    //         <a className='categories'>{category.name}</a>
    //       </Nav>
    //     })}
    //   </Navbar>
    //   <Row>
    //     {products.filter((c)=>c.category.name === selectedCategory ).map((product) => (
    //       <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
    //         <Product product={product} />
    //       </Col>
    //     ))}
    //   </Row>
    // </div>
    <div>
     <div className='all-menu'>
       <h4>Choose Category</h4>
     </div>
      <Row>
        {category.map((category) => {
          return <Col sm={12} md={6} lg={4} xl={1}
            onClick={() => setSelectedCategoty(category.name)}
          >
            <Category category={category} />
          </Col>
        })}
      </Row>
     <div className='all-menu'>
      <h4>Products</h4>
     </div>
      <Row>
        {products.filter((c) => c.category.name === selectedCategory).map((product) => (
          <Col key={product.id} sm={12} md={6} lg={4} xl={2}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </div>

  )
}

export default Home
