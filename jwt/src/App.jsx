import React from 'react'
import Login from './Login'
import SignUp from './SignUp'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './Dashboard';
import About from './About';
import Protected from './Protected';



const App = () => {
  return (
    <>
    <BrowserRouter>
        <Routes>
           <Route path='/' element={<SignUp/>} />
           <Route path='/login' element={<Login/>} />
           <Route path='/dashboard' element={<Dashboard/>} />
           <Route path='/about' element={<Protected><About/></Protected>} />
        </Routes>
     </BrowserRouter>
    </>
  )
}

export default App