import axios from 'axios'
import React, { useEffect , useState } from 'react'
import {  useParams } from 'react-router-dom'

function Try() {
  const params = useParams()
  const[name , setName]=useState('')
  const[price , setPrice]=useState('')
  const[category , setCategory]=useState('')
  const[image , setImage]=useState('')
  
 

  useEffect(()=>{

      axios.get('/api/products/' , {postid : params._id}).then(res=>{

          console.log(res.data[0])
          const postdata = res.data[0]
          setName(postdata.name)
          setPrice(postdata.price)
          setCategory(postdata.category.name)
          setImage(postdata.image)

       

         

      }).catch(err=>{
          console.log(err)
      })

  },[])

  // function editpost()
  // {

  //     const updatedpost ={
  //         title : title ,
  //         imageurl : imageurl ,
  //         description : description ,
  //         postid : params.postid
  //     }

  //     axios.post('/api/post/updatepost' , updatedpost).then(res=>{
  //         console.log(res)
  //         alert(res.data)
  //         history.push('/')
  //     }).catch(err=>{
  //         console.log(err)
  //     })

  // }

  return (
    <div className='row justify-content-center'>
           <div className='col-md-6'>
                <h1 className='m-3'>Edit The Post</h1>
                <div>
                     
                     <input type="text" placeholder='name' className='form-control' 
                     value={name} onChange={(e)=>{setName(e.target.value)}}
                     />
                     <input type="text" placeholder='price' className='form-control'
                     value={price} onChange={(e)=>{setPrice(e.target.value)}}
                     />
                     <input type="text" placeholder='category' className='form-control'
                     value={category} onChange={(e)=>{setCategory(e.target.value)}}
                     />
                     <input type="text" placeholder='image' className='form-control'
                     value={image} onChange={(e)=>{setImage(e.target.value)}}
                     />

                     <button  className='btn btn-success float-left'>Edit Post</button>

                </div>

            </div>
        </div>
  )
}

export default Try