import { useEffect } from "react"
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Protected = ({children}) => {
  const navigate = useNavigate()

 console.log('protected');
  useEffect(()=>{
    getProfile()
   //  getallUser()
   },[])
   
  const getProfile = async()=>{
    try{
     const response = await axios.get('http://localhost:7070/me')
       
       console.log(response.data);
       if(response.data.name === "JsonWebTokenError"){
        navigate('/')
       }

    }catch(err){
       
    }
  }
  return children
    
  
}

export default Protected