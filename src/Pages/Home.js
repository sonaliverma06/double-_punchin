import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import Cart from '../Components/Cart'

import Footer from '../Components/Footer'
import Header from '../Components/Header'
import Hero from '../Components/Hero'
import Product_slider from '../Components/Product_slider'

import Login from './Login'


export default function Home() {
  
 
  // const [token, setToken] = useState();
  // if(!token){
  //     {return <Navigate replace to="/" />;}
  // }else{ 
  //     {
  //       return <Navigate replace to="/home" />;
  //     }
  // }

//   return <Navigate replace to="/login" />;
  return (
    <div>
      <div className="MainDiv">
        <Header />
        <div class="cart-bg-overlay"></div>
        <Cart />
        <Hero />
        <Product_slider />
        <Footer />
      </div>
    </div>
  );
}
