const jwt = require('jsonwebtoken');
const connection = require('../Model/dbconnect');
  
  
  const isLogin  = async (req,res,next)=>{
    try{
      const token = req.cookies.Gautam
      if(!token){
        res.status(400).json({message:'cookiee is not found '})
        return
    }
       var decoded = jwt.verify(token, 'nfwNNWNnwnnnneueweewe');
       console.log('hdhgg');
       console.log(decoded.id);
       const sql = 'select * from users where id = ? '
       connection.query(sql,[decoded.id],(err,result)=>{
        if(err){
          res.json({err})
        }else{
          // console.log(result[0].id);
          req.user_id = result[0].id
          // res.json({result})
          next()
        }
       })
       
    }catch(err){
       res.json({err})
    }
 
}

module.exports = {isLogin}