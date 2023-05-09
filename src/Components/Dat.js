import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Dat() {
  const navigate = useNavigate();
  let use = localStorage.getItem("user");
  const user_id = parseInt(use);
  const [punchin, setpunchintime] = useState([]);
  const [date, setDate] = useState([]);
  const [data, setData] = useState([]);
  // console.log("punchin",punchin);
  const [holid, setholid] = useState([]);
  const [ctime, setTime] = useState(time);
  const [getshift, setgetshift] = useState(true);
    // const {id} = data.id;
    // console.log("id",id);
  var today = new Date(),
  time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const UpdateTime = () => {
  time = new Date().toLocaleTimeString();
   setTime(time);
  };
  setInterval(UpdateTime);
  function getCurrentDateString() {
  const time = new Date().toLocaleTimeString();
  setDate(new Date().toLocaleDateString());
    return time;
  }

  const handleSubmit = async (e) => {
    console.log("hello");

    // e.preventDefault();
    // await axios
    //   .post(`http://localhost:4800/punchatten/${user_id}`, {
    //     punchin,
    //     date,
    //     user_id,
    //   })
    //   .then(function (response) {
    //     // console.log("response", response.data);
    //     setData(response.data.data);
    //     navigate("/attendance");
    //   })
    //   .catch((err) => {
    //     console.log("ERROR---", err);
    //     if (err.message) {
    //       alert(err.message);
    //     }
    //   });
  };

  let todays = new Date();
  let dates = todays.getFullYear() + "-" + (todays.getMonth() + 1 < 10 ? "0" : "") +(todays.getMonth() + 1) + "-" + (todays.getDate() < 10 ? "0" : "") +todays.getDate();
  
  const getholidayData = () => {
    axios.get("http://localhost:4800/holidays").then(function (response) {
      //  console.log("response", response.data);
      setholid(response.data.data);
    });
  };
 



  useEffect(() => {
    getholidayData();
  }, []);

  const getshiftuser = () => {
    axios.get(`http://localhost:4800/assishiftuser/${user_id}`).then(function (response) {
      // console.log("response890", response.data);
      let timedata = new Date().toLocaleTimeString();
     if (
        timedata >= response.data.data[0].starttime &&
        timedata <= response.data.data[0].endtime
      ) {
        setgetshift(false);
      }
    });
  };

  useEffect(() => {
    getshiftuser();
  }, []);

return (
    <div>
      <div>{ctime}</div>
      <form onSubmit={handleSubmit}>
        <button
          id="punchIn"
          onClick={() => setpunchintime([getCurrentDateString()])}
          disabled={
            holid.map((e) => e.date).find((e) => e === dates) || getshift
          }>
          Punch
        </button>
      </form>
      <Link to={"/attendance"}>Back</Link>
    </div>
  );
}
