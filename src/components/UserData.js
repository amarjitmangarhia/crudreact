import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "./Table";
import "../App.css";

const UserData = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api");
        setUsers(response.data.fetchUser);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "20px 0px",
        }}
      >
        List Of Users
      </h1>
      <Table
        reload={() => {
          window.location.reload();
        }}
        users={users}
      />
    </div>
  );
};

export default UserData;
