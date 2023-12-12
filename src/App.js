// Name: Amarjit Singh
// C-NUMBER: C0865920

import axios from "axios";
import "./App.css";
import { useEffect } from "react";
import UserData from "./components/UserData";
import { Routes, Route } from "react-router-dom";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import Success from "./components/Success";
import NavMenu from "./components/NavMenu";
function App() {
  useEffect(() => {
    const getAxiosData = async () => {
      axios.get("/");
    };

    getAxiosData();
  }, []);
  return (
    <div className="App">
      <NavMenu />
      <Routes>
        <Route path="/" element={<UserData />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/edituser/:id" element={<EditUser />} />
        <Route path="/sucess" element={<Success />} />
      </Routes>
    </div>
  );
}

export default App;
