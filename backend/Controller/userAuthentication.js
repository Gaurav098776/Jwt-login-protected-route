
const { response } = require('express')
const connection = require('../Model/dbconnect')
const jwt = require('jsonwebtoken')
const bcrypt =  require('bcrypt');
;

const userSignup = async (req,res)=> {
  const {id,name,pass,role} = req.body;
  const query =  'SELECT * FROM users WHERE id = ?';
  const query1 = 'INSERT INTO users SET ?';  //get se post krna 
  const salt = await bcrypt.genSalt(10);   // password generate hoga (bcrypt method)
  const password = await bcrypt.hash(pass,salt);
  const data = {
   id,
   name,
   pass : password ,
   role  //password store ho rha hai
  }
  connection.query(query, id , (error,result)=>{  // select query ke liye  1. parameter is error 2.  result
    if(result.length){
      return res.send({message : 'user id alredy exit'})
    }
    connection.query(query1,data,(err,result)=>{
      if(err){
        return res.send({Error: err.sqlMessage})
      }
      return res.send({status:200,Response:result})
    })
  })
}

const loginUser = async (req,res)=>{
  const sql =  'SELECT * FROM users WHERE name = ?'
  connection.query(sql,[req.body.user_name],(err,data)=>{
    if (err) return res.json({Error: 'Login error in server'});
    if(data.length > 0){
      bcrypt.compare(req.body.pass.toString(),data[0].pass,(err,response)=>{
        if (err) return res.json({Error: 'Password compare error'});
        if (response){
          const id = data[0].id;
          const name = data[0].name;
          // const token =  jwt.sign({id,name},'jwt-secret-key',{expiresIn: '1d'});
          // res.cookie('token',token)
          
          const token =  jwt.sign({
            id,name
          }, 'nfwNNWNnwnnnneueweewe', { expiresIn: '1d' });
          
          // var decoded = jwt.verify(token, 'nfwNNWNnwnnnneueweewe');
          const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: false,
            samesite:'none',
            path:'/'
          };

          return   res.cookie('Gautam',token,options).json({Status: 'Sucsess',token,data:data[0]})
        }else{
          return res.json({Error: 'Password not matched'})
        }
      })
    }else{
      return res.json({Error: "no user id exit"})
    }
  })
}

const verifyUser = async (req,res)=>{
  try{
    const token = req.cookies.Gautam;
    var decoded = jwt.verify(token, 'nfwNNWNnwnnnneueweewe');
    

    res.status(200).json({ decoded });
  }catch(err){
    console.log('error',err)
     res.json(err);
     
  }

}


const allUser = async(req,res)=>{
   try{
      const user_id = req.user_id;
      console.log('user_id',user_id);
      const sqlQuery = 'select * from users'
      connection.query(sqlQuery,(err,result)=>{
        if(err){
          res.json({err});
        }else{
          res.json({result});
        }
      })
   }catch(err){

   }
}

const isLogout = async(req,res)=>{
  try {
    return res.status(200).clearCookie("Gautam").json({
      data: null,
      message: "Logout successful",
      status: true,
    });
  } catch (error) {
    res.json({error});
  }
}

module.exports =  {userSignup,loginUser,verifyUser,allUser,isLogout}