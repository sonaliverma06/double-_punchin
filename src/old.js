// import axios from "axios";

// import React, { useEffect, useRef, useState } from "react";
// import Table from "react-bootstrap/Table";
// import moment from "moment";
// import { Link } from "react-router-dom";
// import { Modal } from "react-bootstrap";

// export default function Attendance() {
//   let use = localStorage.getItem("user");

//   // console.log("user",user);
//   const [getuser, setgetuser] = useState([]);
//   const [getuser1, setgetuser1] = useState({});

//   const buttonRef = useRef(null);
//   var today = new Date(),
//     time =
//       today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//   let punch = new Date().toLocaleTimeString();
//   // const date = new Date().getDate();
//   const [ctime, setTime] = useState(time);
//   const [stime, setStime] = useState("");
//   const UpdateTime = () => {
//     time = new Date().toLocaleTimeString();
//     setTime(time);
//   };
//   setInterval(UpdateTime);

//   const [log, setlog] = useState({
//     punchin: punch,
//     punchout: "",
//     date: new Date().toLocaleDateString(),
//     signup_user_id: use,
//   });

//   const [out, setout] = useState({
//     punchin: "",
//     punchout: new Date().toLocaleTimeString(),
//     signup_user_id: use,
//     date: new Date().toLocaleDateString(),
//   });

//   let punchin = (event) => {
//     event.preventDefault();
//     buttonRef.current.disabled = true;
//     const a = {
//       punchin: new Date(),
//       punchout: "",
//       signup_user_id: use,
//       date: new Date().toLocaleDateString(),
//     };
//     axios
//       .post("http://localhost:4800/punchatten", { a })
//       .then(function (response) {
//         console.log("punch in", response.data);
//       })
//       .catch((err) => {
//         console.log("ERROR---", err);
//         if (err.message) {
//           alert(err.message);
//         }
//       });
//   };

//   let punchout = (i) => {
//     buttonRef.current.disabled = false;
//     const c = {
//       punchin: "",
//       punchout: new Date(),
//       signup_user_id: use,
//       date: new Date().toLocaleDateString(),
//     };
//     axios
//       .post(`http://localhost:4800/outatten/${i.id}`, { c })
//       .then(function (response) {
//         console.log("punchout", response.data);
//       })
//       .catch((err) => {
//         console.log("ERROR---", err);
//         if (err.message) {
//           alert(err.message);
//         }
//       });
//   };

//   useEffect(() => {
//     axios.get("http://localhost:4800/user").then(function (response) {
//       //  console.log("response", response.data.data);
//       let fill;
//       fill = response.data.data.filter((item) => item.signup_user_id == use);
//       if (use === response.data.data) {
//         return fill;
//       }

//       setgetuser(fill);
//       var end = response.data.data;
//       end.map((i) => {
//         const ab = `${new Date(i.punchin).getHours()}:${new Date(
//           i.punchin
//         ).getMinutes()}:${new Date(i.punchin).getSeconds()}`;
//         const cd = `${new Date(i.punchout).getHours()}:${new Date(
//           i.punchout
//         ).getMinutes()}:${new Date(i.punchout).getSeconds()}`;

//         if (ab !== "NaN:NaN:NaN" && cd !== "NaN:NaN:NaN") {
//           const start = moment(ab, "HH:mm:ss");
//           const end = moment(cd, "HH:mm:ss");
//           const dif = moment.duration(end.diff(start));
//           // console.log("dif", dif._data);
//           const formattedDiff = `${dif._data.hours}:${dif._data.minutes}:${dif._data.seconds}`;
//           //  console.log("formattedDiff", formattedDiff);
//           i.formattedDiff = formattedDiff;
//         }
//         i.punchin = ab;
//         i.punchout = cd;
//         return i;
//       });
//       //  setgetuser(end);
//       //  console.log("end", end);
//     });
//   }, [getuser]);

//   const handleClose = () => setShow(false);
//   const handleShow = (item) => {
//     setShow(true);
//     setgetuser1(item);
//   };

//   const [show, setShow] = useState(false);

//   return (
//     <div>
//       <h1>{ctime}</h1>

//       <button className="bg bg-info" onClick={punchin} ref={buttonRef}>
//         punch in
//       </button>

//       <Table striped bordered hover variant="dark">
//         <thead>
//           <tr>
//             <th>date </th>
//             <th>Effective Hours</th>
//             <th>Log</th>
//             <th>punchin</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {getuser.map((item) => {
//             return (
//               <tr>
//                 <td>{item.date}</td>
//                 <td>
//                   {Object.prototype.hasOwnProperty.call(item, "formattedDiff")
//                     ? item.formattedDiff
//                     : null}
//                 </td>
//                 <td>
//                   {" "}
//                   <button
//                     className="bg bg-info"
//                     onClick={() => {
//                       handleShow(item);
//                     }}
//                   >
//                     View Details
//                   </button>
//                 </td>
//                 <td>{item.punchin}</td>
//                 <td>
//                   <button className="bg bg-info" onClick={() => punchout(item)}>
//                     {" "}
//                     Punch Out
//                   </button>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//         <Modal show={show} onHide={() => handleClose()} animation={false}>
//           <Modal.Body>
//             <ul>
//               <li>Punch In: {getuser1.punchin}</li>
//               {getuser1.punchout === "NaN:NaN:NaN" ? (
//                 <li>Punch Out: Missing</li>
//               ) : (
//                 <li>Punch Out: {getuser1.punchout}</li>
//               )}
//             </ul>
//           </Modal.Body>
//           <Modal.Footer>
//             <button variant="secondary" onClick={handleClose}>
//               Close
//             </button>
//           </Modal.Footer>
//         </Modal>
//         ;
//       </Table>
//     </div>
//   );
// }
