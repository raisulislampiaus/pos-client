import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { DeleteOutlined, EditOutlined, } from '@ant-design/icons';
import { message, Button } from 'antd';
import { Table, Modal} from 'react-bootstrap';


function Category() {
  const [products, setProducts] = useState([])
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getProducts = () => {
    axios.get('/api/category').then((res) => {
      setProducts(res.data)
    }).catch((error) => {
      console.log(error)
    })
  }
  const deletePost = (id) => {
    console.log(id);
    axios
      .delete(`/api/category/${id}`)
      .then((result) => {
        message.success('category deleted Successfully')
        getProducts();
      })
      .catch(() => {
        alert('Error in the Code');
      });


  };

  useEffect(() => {
    getProducts()
  }, [])







  return (
    <div>
      <div className='d-flex justify-content-between'>
        <h4>Products</h4>
        <Button type='primary' onClick={handleShow}>Add Category</Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>

            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            products && products.map((item) => (
              <tr key={item.id}>

                <td>{item.name}</td>

                <td>
                  <div className='d-flex'>
                    <a>
                      <DeleteOutlined className='mx-2'

                        onClick={() => {
                          const confirmBox = window.confirm(
                            "Do you really want to delete " + item.name
                          )
                          if (confirmBox === true) {
                            deletePost(item._id)
                          }
                        }}

                      />
                    </a>


                  </div>
                  <div>

                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>

      </Modal>
    </div>
  )
}

export default Category