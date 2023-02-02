import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { DeleteOutlined, EditOutlined, } from '@ant-design/icons';
import { Button, Modal, message, Form, } from 'antd';
import { Table, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';



function Products() {
  const [products, setProducts] = useState([])
  const [categorys, setCategorys] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);


  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("")


  const send = event => {
    const data = new FormData();
    data.append("name", name);
    data.append("price", price);
    data.append("category", category);
    data.append("image", image);

    axios.post("/api/products", data)
      .then(res => {
        message.success('products added Successfully')
        setIsModalOpen(false)
        getProducts()
      })
      .catch((error) => {
        message.error('something error')
        console.log(error)
      })
  };


  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const getProducts = () => {
    axios.get('/api/products').then((res) => {
      setProducts(res.data)
    }).catch((error) => {
      console.log(error)
    })
  }
  const getCategory = () => {
    axios.get('/api/category').then((res) => {
      setCategorys(res.data)

    }).catch((error) => {
      console.log(error)
    })
  }



  const deletePost = (id) => {
    console.log(id);
    axios
      .delete(`/api/products/${id}`)
      .then((result) => {
        message.success('products deleted Successfully')
        getProducts();
      })
      .catch(() => {
        alert('Error in the Code');
      });


  };


  useEffect(() => {
    getProducts()
    getCategory()






  }, [])




  return (
    <div>
      <div className='d-flex justify-content-between'>
        <h4>Products</h4>
        <Button type='primary' onClick={showModal}>Add Products</Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>

            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            products && products.map((item) => (
              <tr key={item.id}>

                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.category.name}</td>
                <td>
                  <Image src={item.image} width={40} />
                </td>
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

                    <Link to={`/product/edit/${item._id}`}><EditOutlined className='mx-2' /></Link>

                  </div>
                  <div>

                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>


      {/* {isModalOpen && (
        <Modal  open={isModalOpen} onOk={handleOk} onCancel={()=> {
          setEdit(null)
          handleCancel()
        }} 
        title={`${edit !==null ? 'Edit Item' : 'Add new Item'}`}
        footer={false}

        >

          <Form initialValues={edit} onFinish={send} action="#">
            <div className="flex">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                onChange={event => {
                  const { value } = event.target;
                  setName(value);
                }}
              />
            </div>
            <div className="flex">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                id="price"
                onChange={event => {
                  const { value } = event.target;
                  setPrice(value);
                }}
              />
            </div>
            <div className="flex">
              <label className='text-secondary'>
                Category
              </label>
              <select
                className='custom-select mr-sm-2'
                name='category'
                onChange={event => {
                  const { value } = event.target;
                  setCategory(value);
                }}
              >
                <option value=''>
                  Choose one...
                </option>
                {categorys &&
                  categorys.map(c => (
                    <option
                      key={c._id}
                      value={c._id}
                    >
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex">
              <label htmlFor="file">File</label>
              <input
                type="file"
                id="image"
                accept=".jpg"
                onChange={event => {
                  const file = event.target.files[0];
                  setImage(file);
                }}
              />
            </div>
            <button className='save' >Save</button>
          </Form>

        </Modal>
      )} */}
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
        title='Add new Item'
        footer={false}>

        <Form onFinish={send} action="#">
          <div className="flex">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              onChange={event => {
                const { value } = event.target;
                setName(value);
              }}
            />
          </div>
          <div className="flex">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              id="price"
              onChange={event => {
                const { value } = event.target;
                setPrice(value);
              }}
            />
          </div>
          <div className="flex">
            <label className='text-secondary'>
              Category
            </label>
            <select
              className='custom-select mr-sm-2'
              name='category'
              onChange={event => {
                const { value } = event.target;
                setCategory(value);
              }}
            >
              <option value=''>
                Choose one...
              </option>
              {categorys &&
                categorys.map(c => (
                  <option
                    key={c._id}
                    value={c._id}
                  >
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex">
            <label htmlFor="file">File</label>
            <input
              type="file"
              id="image"
              accept=".jpg"
              onChange={event => {
                const file = event.target.files[0];
                setImage(file);
              }}
            />
          </div>
          <button className='save' >Save</button>
        </Form>

      </Modal>
    </div>
  )
}

export default Products