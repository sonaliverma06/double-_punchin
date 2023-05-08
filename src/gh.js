// import axios from "axios";
// import React, { useEffect } from "react";
// import { useState } from "react";
// import { Modal } from "react-bootstrap";
// import Table from "react-bootstrap/Table";
// export default function Attendance() {
//   let use = localStorage.getItem("user");
//   const handleClose = () => setShow(false);
//   const [show, setShow] = useState(false);
//   const [active, setActive] = useState(false);
//   const [ctime, setTime] = useState(time);
//   const [punchtime, setpunchtime] = useState([]);
//   const [getuser1, setgetuser1] = useState({});
//   // console.log("getuser",getuser1);

//   var today = new Date(),
//     time =
//       today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//   const UpdateTime = () => {
//     time = new Date().toLocaleTimeString();
//     setTime(time);
//   };
//   setInterval(UpdateTime);

//   const [punchintime, setpunchintime] = useState({
//     // punchin: punchtime,
//     punchin: [new Date().toLocaleTimeString()],
//     signup_user_id: use,
//     date: new Date().toLocaleDateString(),
//   });

//   const punchin = () => {
//     // let punchinformet = new Date().toLocaleTimeString();
//     // let punchti = [...punchtime, punchinformet];
//     // punchintime.punchin = punchti;
//     setActive(!active);

//     axios
//       .post("http://localhost:4800/punchatten", { punchintime })
//       .then(function (response) {
//         // console.log("response", response.data);
//         setpunchintime(response.data);
//         // getpunchindata();
//       })
//       .catch((err) => {
//         console.log("ERROR---", err);
//         if (err.message) {
//           alert(err.message);
//         }
//       });
//   };

//   const getpunchindata = () => {
//     axios.get(`http://localhost:4800/user/${use}`).then(function (response) {
//       console.log("response", response);
//       let a = response.data.data.map((item, index) =>
//         item.attendance.split(",")
//       );

//       setpunchtime(response.data.data);
//       //  let datapunch = JSON.parse(response.data.data[0].punchin);
//       //    setpunchtime(datapunch || []);
//     });
//   };

//   useEffect(() => {
//     getpunchindata();
//   }, []);

//   const handleShow = (item) => {
//     setShow(true);
//     setgetuser1(item);
//   };

//   return (
//     <div>
//       <div>{ctime}</div>
//       <button onClick={punchin}>{active ? "Punch Out" : "Punch In"}</button>

//       <Table striped bordered hover variant="dark">
//         <thead>
//           <tr>
//             <th>date </th>
//             <th>Effective Hours</th>
//             <th>Log</th>
//           </tr>
//         </thead>
//         <tbody>
//           {punchtime.map((item) => {
//             return (
//               <tr>
//                 <td>{item.date}</td>
//                 <td>{}</td>
//                 <td>
//                   <button
//                     className="bg bg-info"
//                     onClick={() => {
//                       handleShow(item);
//                     }}
//                   >
//                     View Details
//                   </button>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//         <Modal show={show} onHide={() => handleClose()} animation={false}>
//           <Modal.Body>
//             <ul>
//               {/* {(index)%2===0 &&( */}
//               {getuser1.attendance.map((item) => {
//                 item.attendance;
//               })}
//               {console.log("item", item)}
//               {getuser1.attendance % 2 === 0 ? (
//                 <li>{getuser1.attendance}</li>
//               ) : (
//                 <li>{getuser1.attendance}</li>
//               )}
//             </ul>
//           </Modal.Body>
//           <Modal.Footer>
//             <button variant="secondary" onClick={handleClose}>
//               Close
//             </button>
//           </Modal.Footer>
//         </Modal>
//       </Table>
//     </div>
//   );
// }
