// import { Button } from 'bootstrap'
import React, { useState } from 'react'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
const SignUp = () => {

  const[data,setData] =  useState({
    id:'',
    name:'',
    pass:''
  })

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value })
  }

  const navigate = useNavigate()
  const handleSubmit = async(e) => {
    e.preventDefault(); // This should be at the beginning
    const url = 'http://localhost:7070/userRegister';
    try {
      const res = await axios.post(url, data);
      console.log(res);
      if (res.status === 200){
        console.log('data submitted', data);
        navigate('/login')
      }
    } catch (error) {
      console.log('Error submit data', error);
    }
  }



  
  return (
    <>
   
    <div  className='d-flex justify-content-md-center  loginPage p-3 rounded w-120 border loginForm'
    style={{position:'absolute', top:'50%',left:'50%',
    transform: 'translate(-50%, -50%)',}}>
       
      <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>User id</Form.Label>
              <Form.Control type="text" placeholder="Enter user id" name='id' value={data.id} onChange={handleInput} />
              <Form.Text className="text-muted">
                We'll never share your id with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="name" name='name' value={data.name} onChange={handleInput}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="password"name='pass' value={data.pass} onChange={handleInput} />
            </Form.Group>
            <Button variant="primary" type='submit'>
              Submit
            </Button>
            <Button variant="secondary"  onClick={() => navigate('/login')}>Login</Button>
          </Form>
    </div>
    </>
    
  )
}

export default SignUp