import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Viewshift() {
  const [usershift, setusershift] = useState([]);
  const { id } = useParams();
  console.log("id",id);
  const [values, setvalues] = useState([]);
  const [assig, setassign] = useState({
    shiftid: "",
    user:id,
    
  });


  const handleChange = (event) => {
    console.log("event",event.target.value);
    setassign({ ...assig, shiftid: event.target.value });
   
  };

  const passdata = (event) => {
    // console.log("asssssssss",assig);
    event.preventDefault();
    axios
      .post(`http://localhost:4800/assishift/${id}`, {assig})
      .then((response) => {
        console.log("response", response.data.data);
        setassign(response.data);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:4800/shiftuser/" + id)
      .then(function (response) {
        // console.log("response1234", response.data.data);
        setvalues(response.data.data[0]);
      });
  }, []);

  const getshiftlist = () => {
    axios.get("http://localhost:4800/getshift").then(function (response) {
      setusershift(response.data.data);
    });
  };

  useEffect(() => {
    getshiftlist();
  }, []);

  return (
    <div>
      <form>
        <label>User Name</label>
        <input name="Name" onChange={handleChange} value={values.Name}></input>
        <div>
          <label>Shift Time</label>
          <select onChange={handleChange} name="shiftid">
            <option value="" disabled>
              Select Time
            </option>
            {usershift.map((item) => (
               <option key={item.value} value={item.id} >
              {/* // <option key={item.value} value={item.shifttime}> */}
                {item.shifttime}
              </option>
            ))}
          </select>
        </div>
        <br></br>
        <button className="btn btn-success" onClick={passdata}>
          Assign
        </button>
      </form>
    </div>
  );
}
 