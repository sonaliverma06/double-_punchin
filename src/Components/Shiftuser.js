import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Shiftuser() {
    const [shiftuse,setshiftuse]= useState([]);
        let use = localStorage.getItem("userdata");



 
 const getuserData=()=>{
    axios.get("http://localhost:4800/shiftuser").then(function (response) {
    //   console.log("response", response);
    let a = response.data.data.filter((item)=>{
      // {console.log("item",item)}
    })
      setshiftuse(response.data.data)
     

    });
}

 useEffect(() => {
  getuserData();
}, []);
    
  return (
    <div>
   
    
        <table class="table">
          <thead>
           <tr>
              <th scope="col">ID</th>
              <th scope="col">User Name</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {shiftuse.map((item)=>{
             return (
               <tr>
                 <th scope="row">{item.id}</th>
                 <td>{item.Name}</td>
                 <td>{item.email}</td>
                 <td>
                   <Link to={`/viewuser/${item.id}`}>
                     <button>Assign Shift</button>
                   </Link>
                 </td>
               </tr>
             ); })}
          </tbody>
        </table>

    </div>
  );
}
