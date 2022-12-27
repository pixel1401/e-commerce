import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { NotFoundPage } from './Components/404';
import { Home } from './Components/Home';
import { LoginPage } from './Components/Login';
import { SignUpPage } from './Components/SignUp';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='*' element={<NotFoundPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
