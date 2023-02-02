import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from "react-router-dom";


function UpdatePost(props) {
  const [categorys, setCategorys] = useState([])
  const [user, setUser] = useState({
    name: "",
    price: "",
    category: "",
    image: "",

  })


  const { name, price, category, image } = user;

  const onInputChange = name => e => {
    const value = name === 'image' ? e.target.files[0] : e.target.value;
    
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const { id } = useParams();
  let history = useHistory();




  const getCategory = () => {
    axios.get('/api/category').then((res) => {
      setCategorys(res.data)

    }).catch((error) => {
      console.log(error)
    })
  }


  const updateEmployee = async e => {
    e.preventDefault();
    await axios.put(`/api/products/${id}`, user);
    history.push("/products");
  };


  useEffect(() => {
    axios
      .get(`/api/products/${id}`)

      .then(response => {
        // const { name, price, category, image } = response.data;
        // console.log(result.data);
        const { name, price, category, image } = response.data;
        setUser({ ...user, name, price, category, image })


      })
      .catch(error => alert('Error loading single post'));

    getCategory()

  }, []);








  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-sm-5 col-offset-3 mx-auto shadow p-5">
          <h4 className="text-center mb-4">Edit A Products</h4>


          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="name"
              name="name"
              value={name}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Price"
              name="price"
              value={price}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group mb-3 flex">
            <select
              className='custom-select mr-sm-2'
              name='category'
              onChange={e => onInputChange(e)}
            >
              <option value={category.name}>
                {category.name}
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
          <div className="form-group mb-3">

            <label htmlFor="file">File</label>
            <input onChange={onInputChange('image')} type="file" name="image" accept="image/*" />

          </div>


          <button onClick={updateEmployee} className="btn btn-secondary btn-block">Update Employee</button>

        </div>
      </div>
    </div>
  )
}

export default UpdatePost