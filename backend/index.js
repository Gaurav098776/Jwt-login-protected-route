const express = require('express')
const authenticationRoute = require('./Routes/authenticationRoutes');
const cors = require('cors')
const cookieParse =  require('cookie-parser')


let app = express()
app.use(express.json());
app.use(cors(
  {
    credentials: true,
    origin: ['http://localhost:5173'],
    // methods: ['GET','POST']
  }
))
app.use(cookieParse())

app.use('/',authenticationRoute);



let port =  7070;
app.listen(port,()=>{
  console.log(`running on port${port}`)
 })