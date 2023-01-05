import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotFoundPage } from './Components/404';
import { AddProducts } from './Components/AddProduct/AddProducts';
import { CartPage } from './Components/Cart/Cart';
import { Home } from './Components/Home';
import { LoginPage } from './Components/Credential/Login';
import { SignUpPage } from './Components/Credential/SignUp';
import useProviderState, { StateProvider } from './context/StateContext';


export function App() {


  const { user } = useProviderState();





  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='*' element={<NotFoundPage />} />
        <Route path='/add-product' element={<AddProducts />} />
        <Route path='/cart' element={<CartPage />} />
      </Routes>
    </BrowserRouter>


  );
}

export default App;






