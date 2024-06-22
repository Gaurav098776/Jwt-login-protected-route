import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const[data,setData] =  useState([]);

  const[user,setUser] =  useState([]);
  const navigate = useNavigate()
  console.log(data);
  console.log(user);

  useEffect(()=>{
   getProfile()
  //  getallUser()
  },[])
  useEffect(()=>{
    
    getallUser()
   },[])

   
  const getProfile = async()=>{
    try{
     const response = await axios.get('http://localhost:7070/me')
       setData(response.data)
       console.log(response.data);
       if(response.data.name === "JsonWebTokenError"){
        navigate('/')
       }

    }catch(err){
       
    }
  }


  const getallUser = async()=>{
    try{
     const response = await axios.get('http://localhost:7070/allUser')
       setUser(response.data)

       
    }catch(err){
       console.log(err);
    }
  }

  return (
    <div>
     <h1> dashboard</h1>
     {user?.result?.map((item)=>{
      return(
        <p key={item.id}>{item.name}</p>
      )
     })}

    </div>
  )
}

export default Dashboard