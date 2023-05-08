
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
    let use = localStorage.getItem("userdata");
    
  
  const navigate = useNavigate(); 
    const logout = () => {
        localStorage.clear();
       navigate("/")
     };
   

  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page">
                  Pages
                </a>
              </li>
              
              <li class="nav-item">
                <a class="nav-link active">Contact</a>
              </li>
            </ul>
            <ul class="navbar-nav">
              <Link to={"/print"}>
                <li class="nav-item">
                  <a class="nav-link active">Download & Print PDF</a>
                </li>
              </Link>
            </ul>
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link to={"/addproduct"}>
                  <a class="nav-link active">Add Product</a>
                </Link>
              </li>
            </ul>

            <ul class="navbar-nav">
              <li class="nav-item">
                <Link to={"/drag"}>
                  {" "}
                  <a class="nav-link active">Drag & Drop items</a>
                </Link>
              </li>
            </ul>

            <ul class="navbar-nav">
              <li class="nav-item">
                <Link to={"/attendance"}>
                  <a class="nav-link active" aria-current="page">
                    Attendance Management
                  </a>
                </Link>
              </li>
            </ul>
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" onClick={logout}>
                  Logout
                </a>
              </li>
            </ul>
            
              <ul class="navbar-nav">
               
                <li class="nav-item">
                  <Link to={"/user"}>
                    {use==="admin"?
                       <a class="nav-link active" aria-current="page">
                      Assign Shift
                    </a> :null}
                  </Link>
                </li>
              </ul>
           {/* : null} */}
            
      
          </div>
        </div>
      </nav>
    </>
  );
}
