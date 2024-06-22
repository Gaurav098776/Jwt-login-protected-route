import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React,{useState} from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Login = () => {


  const[data,setData] =  useState({
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
    const url = 'http://localhost:7070/userlogin';
    try {
      const res = await axios.post(url, {user_name:data.name,pass:data.pass});
      console.log(res);
      if (res.status === 200){
        console.log('data submitted', data);
        // navigate('/dashboard')
        console.log(res.data.data.role);
        if(res.data.data.role==='user'){
          navigate('/dashboard')
        }
      }
    } catch (error) {
      console.log('Error submit data', error);
    }
  }





  return (
    
    <div className='d-flex justify-content-md-center loginPage'
    style={{position:'absolute', top:'50%',left:'50%', transform: 'translate(-50%, -50%)'}}>
    <div className='p-3 rounded w-120 border loginForm'>
      <h2>Login page</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>User id</Form.Label>
          <Form.Control type="text" placeholder="Enter id" name='name' value={data.name} onChange={handleInput}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name='pass' value={data.pass} onChange={handleInput}/>
        </Form.Group>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </div>
  </div>

  )
}

export default Login