import axios from "axios";
import moment from "moment";
import React, { useEffect } from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import Table from "react-bootstrap/Table";
// import { Link } from "react-router-dom";


export default function Attendance() {
  let use = localStorage.getItem("user");
const user_id = parseInt(use);
  const handleClose = () => setShow(false);
  const [show, setShow] = useState(false);
  const [punchtime, setpunchtime] = useState([]);
  const [getuser1, setgetuser1] = useState([]);
  const [holi, setholi] = useState([]);
  const [active, setActive] = useState(false);
  const [getshift, setgetshift] = useState(true);
  const getpunchindata = () => {
    axios.get(`http://localhost:4800/user/${use}`).then(function (response) {
      console.log("response",response.data);
      setpunchtime(response.data.data);
    });
  };

  useEffect(() => {
    getpunchindata();
  }, []);


  const getholidayData = () => {
    axios.get("http://localhost:4800/holidays").then(function (response) {
      // console.log("response", response.data.data)
      const holidaylist = response.data.data.map((i) => {
        i.date = new Date(i.date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })
        return i
      })
      setholi(holidaylist)
    });
  };

  useEffect(() => {
    getholidayData()

  }, [])

  const handleShow = (item) => {
    setShow(true);
    setgetuser1(
      item?.attendance
        ?.replaceAll(/[/[","]|]/g, " ")
        .trim()
        .split("   ")
    );
  };



  const setPunchIn = (item) => {
    setActive(!active);
    console.log("item",item);
    const a = JSON.parse(item.attendance)
     
    a.push(new Date().toLocaleTimeString())
    console.log("aaaaa",a)

    axios.post(`http://localhost:4800/punchatten/${use}/${item.id}`,{punchin:a}).then((res) => {
      console.log("hello");
      getpunchindata()
    })
  }




  const getshiftuser = () => {
    axios.get(`http://localhost:4800/assishiftuser/${user_id}`).then(function (response) {
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
    
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>date </th>
            <th>Effective Hours</th>
            {/* <th>Gross Hours</th> */}
            <th>Total Break</th>
            <th>Log</th>
            <th>punch</th>
          </tr>
        </thead>
        <tbody>
          {punchtime &&
            punchtime.map((item) => {
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

              const holidaySection = holi.map((i) => {
                const allholidaydate = new Date(i.date).getDate()
                const allholidayMonth = new Date(i.date).getMonth()
                const allholidayYear = new Date(i.date).getFullYear()
                const currentholidaydate = new Date(item.date).getDate()
                const currentholidayMonth = new Date(item.date).getMonth()
                const currentholidayYear = new Date(item.date).getFullYear()
                const allholiday = `${allholidaydate}/${allholidayMonth}/${allholidayYear}`
                const currentholiday = `${currentholidaydate}/${currentholidayMonth}/${currentholidayYear}`
                if (allholiday === currentholiday) {
                  return true
                } else {
                  return false
                }
              })
              const filterDataHoli = holidaySection.filter((i) => i === true)
              console.log("item.date",item.date);
              const previousdate = new Date(item.date).getDate()
              console.log("bc",previousdate);
              const currentd = new Date().getDate()
              console.log("mc",currentd); 
              console.log("condition", currentd=== previousdate);

              return (
                <tr>
                  {filterDataHoli[0] ? <td colSpan={5}>Holiday</td>
                    :
                    <>
                      <td>{item.date}</td>
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
                      <td>
                        
                        <button className="bg bg-info" onClick={() => setPunchIn(item)} 
                         disabled={
                          ( currentd === previousdate? false :true )|| 
                           getshift 
                          }>
                          {active ? "Punch Out" : "Punch In"}</button>
         
                        </td>
                    </>
                    }
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
                    <div className="index">{index % 2 == 0 ? "Punch In -" : "Punch Out -"}</div>
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

      {/* <Link to={"/dat"}>Attendance</Link> */}

    </div>
  );
}
