import axios from "axios";
import moment from "moment";
import React, { useEffect } from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";


export default function Attendance() {
  let use = localStorage.getItem("user");
  const handleClose = () => setShow(false);
  const [show, setShow] = useState(false);
  const [punchtime, setpunchtime] = useState([]);
  const [getuser1, setgetuser1] = useState([]);
  const [holi,setholi] =useState([]);
  // console.log("holi",holi);

  const getpunchindata = () => {
    axios.get(`http://localhost:4800/user/${use}`).then(function (response) {
      // console.log("response", response);
      setpunchtime(response.data.data);
    });
  };

  useEffect(() => {
    getpunchindata();
  }, []);

const getholidayData = ()=>{
  axios.get("http://localhost:4800/holidays").then(function (response) {
    // console.log("response", response);
    // const a = moment(new Date()).format('YYYY-MM-DD')
  
    // const b = response.data.data.filter((item)=>item.date === a )
    // return(
    //   setholi(b)
    // )
    // console.log("item",item);
    setholi(response.data.data)

  });
};

  useEffect (()=>{
    getholidayData()

  },[])

  const handleShow = (item) => {
    // console.log(item);
    setShow(true);
    setgetuser1(
      item?.attendance
        ?.replaceAll(/[/[","]|]/g, " ")
        .trim()
        .split("   ")
    );
  };
  // let date = moment(new Date()).format('YYYY-MM-DD')
  // console.log("date",date);

  return (
    <div>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>date </th>
            <th>Effective Hours</th>
            {/* <th>Gross Hours</th> */}
            <th>Total Break</th>
            <th>Log</th>

            {/* <th>holiday</th> */}
          </tr>
        </thead>
        <tbody>
         {punchtime &&
            punchtime.map((item) => {
              console.log("item",item);
              let item1 = item?.attendance
                .replaceAll(/[/[","]|]/g, " ")
                .trim()
                .split("   ");

              var totalbreakStartTime = moment(
                item1[1] ? item1[1] : item1[0],
                "hh:mm:ss"
              );

              var totalbreakEndTime = moment(
                item1[4]
                  ? item1[4]
                  : item1[2]
                  ? item1[2]
                  : item1[1]
                  ? item1[1]
                  : item1[0],
                "hh:mm:ss"
              );

              var effectivehrs = moment
                .utc(totalbreakEndTime.diff(totalbreakStartTime))
                .format("HH");
              var effectivemin = moment
                .utc(totalbreakEndTime.diff(totalbreakStartTime))
                .format("mm");
              var effectivesec = moment
                .utc(totalbreakEndTime.diff(totalbreakStartTime))
                .format("ss");

              const totalBreak = [
                effectivehrs,
                effectivemin,
                effectivesec,
              ].join(":");
              // console.log("brak", totalBreak);
              var grossStartTime = moment(item1[0], "hh:mm:ss");
              var grossEndTime = moment(
                item1[5]
                  ? item1[5]
                  : item1[3]
                  ? item1[3]
                  : item1[1]
                  ? item1[1]
                  : item1[0],
                "hh:mm:ss"
              );

              var grosshrs = moment
                .utc(grossEndTime.diff(grossStartTime))
                .format("HH");
              var grossmin = moment
                .utc(grossEndTime.diff(grossStartTime))
                .format("mm");
              var grosssec = moment
                .utc(grossEndTime.diff(grossStartTime))
                .format("ss");
              const grossHours = [grosshrs, grossmin, grosssec].join(":");

              var time1 = moment(totalBreak, "HH:mm:ss");

              var time2 = moment(grossHours, "HH:mm:ss");

              const effectiveHours = moment
                .utc(moment(time2, "HH:mm:ss").diff(moment(time1, "HH:mm:ss")))
                .format("HH:mm:ss");

              return (
                <tr>
                  {}
                 <td>{item.date }</td>
                 
                 {/* <td>{effectiveHours}</td> */}
                  <td>{grossHours}</td>
                  <td>{totalBreak}</td>
                  <td>
                    <button
                      className="bg bg-info"
                      onClick={() => {
                        handleShow(item);
                      }}
                    >
                      View Details
                    </button>
                  </td>
                  {/* <td> 
                  {holi.map((e) => e.date).find((e) => e === moment(new Date()).format('YYYY-MM-DD'))}
                 </td> */}
                </tr>
              );
            })}
             
        </tbody>
        <Modal show={show} onHide={() => handleClose()} animation={false}>
          <Modal.Body>
            <div className="mbody"> 
            {getuser1 &&
              getuser1.map((item, index) => (
                <div className="tab">
                 <div className="index">{index % 2 == 0 ? "Punch In -": "Punch Out -"}</div>
                  <div className="item">{item}</div>
                </div>
              ))}
              </div>
          </Modal.Body>
          <Modal.Footer>
            <button variant="secondary" onClick={handleClose}>
              Close
            </button>
          </Modal.Footer>
        </Modal>
      </Table>
     
      <Link to={"/dat"}>Attendance</Link>;
  
    </div>
  );
}
