import axios from "axios";
import React, { useState } from "react";

export default function Addproduct() {
    const [pro,setpro] =useState({
      category:"",
      price:"",
      quantity:"",
      uploadedfile:"",
      size: "",
    });



 


const handleChange =(event)=>{

  console.log("name",event.target.name);
  console.log("value",event.target.value);
    setpro({...pro,[event.target.name]:event.target.value});
}

const handlesubmit =(event)=>{
    event.preventDefault();
    // const config = {
    //     headers: {
    //       "content-type": "multipart/form-data",
    //     },
    //   };
    axios
    .post("http://localhost:4800/addproduct", {pro})
    .then(function (response) {
        console.log("response",response.data)
   }).catch(err => {
      console.log("ERROR---",err);
      if (err.message) {
        alert(err.message);
      }
    });
 }


 function handleFileData(e) {
    var file = e.target.files[0];
    var reader = new FileReader();
      reader.onload = function(event) {
      pro.uploadedfile =event.target.result
};
      reader.readAsDataURL(file)
}

  return (
    <>




      <form className="form-horizontal"   onSubmit={handlesubmit}>
        <legend>PRODUCTS</legend>

        <div className="form-group">
          <label className="col-md-4 control-label" >
            PRODUCT CATEGORY
          </label>
          <div className="col-md-4">
          <input
             name="category"
              className="form-control"
              value={pro.category}
              onChange={handleChange}
            ></input>
          </div>
        </div>


       


      <div className="form-group">
          <label className="col-md-4 control-label" >
            PRODUCT SIZE
          </label>
          <div className="">
            <select 
            name="size" 
            className="size"
            onChange={handleChange}
              
              >
                <option>select</option>
              <option value="S"> S</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option> 
            </select>
          </div>
        </div> 

        <div className="form-group">
          <label className="col-md-4 control-label">
            AVAILABLE QUANTITY
          </label>
          <div className="col-md-4">
            <input
             
              name="quantity"
              placeholder="AVAILABLE QUANTITY"
              className="form-control input-md"
              required=""
              type="text"
              value={pro.quantity}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="col-md-4 control-label" >
            PRICE
          </label>
          <div className="col-md-4">
            <input
              
              name="price"
              placeholder="PRICE"
              className="form-control input-md"
              required=""
              type="text"
              value={pro.price}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="col-md-4 control-label">
            PRODUCT IMAGE
          </label>
          <div className="col-md-4">
            <input
             id="uploadedfile"
            onChange={(e) => handleFileData(e)}
             type="file" 
            accept=".jpg,.jpeg,.png,.bmp"
            
             />
          </div>
        </div>
      <div className="form-group">
          <div className="col-md-4">
            <button
              className="btn btn-primary">
              Add Product
            </button>
          </div>
        </div>
      </form>
    </>
  );
}








