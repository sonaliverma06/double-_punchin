import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signp from "./Pages/Signp";
import Forgotpassword from "./Pages/Forgotpassword";
import Map from "./Components/Map";
import Printpdf from "./Components/Printpdf";
import Addproduct from "./Components/Addproduct";
import Drag from "./Components/Drag";
import Attendance from "./Components/Attendance";
import Dat from "./Components/Dat";
import Shiftuser from "./Components/Shiftuser";
import Viewshift from "./Components/Viewshift";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/" element={<Login />}></Route>
          <Route path="/signup" element={<Signp />}></Route>
          <Route path="/forgot" element={<Forgotpassword />}></Route>
          <Route path="/map" element={<Map />}></Route>
          <Route path="/print" element={<Printpdf />}></Route>
          <Route path="/addproduct" element={<Addproduct />}></Route>
          <Route path="/drag" element={<Drag />}></Route>
          <Route path="/attendance" element={<Attendance />}></Route>
          <Route path="/dat" element={<Dat />}></Route>
          <Route path="/user" element={<Shiftuser />}></Route>
          <Route path="/viewuser/:id" element={<Viewshift />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
