import React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, TrashIcon, EditIcon } from "evergreen-ui";

const Table = (props) => {
  const navigate = useNavigate();

  const editHandler = (id) => {
    navigate(`/edituser/${id}`);
  };

  const deleteHandler = async (id) => {
    console.log("delete user");
    try {
      const confrim = window.confirm("Are you sure to delete a user ?");
      if (confrim) {
        // Use axios.delete with the correct URL to delete the user
        const response = await axios.delete(`/deleteuser/${id}`);

        // Add logic to handle successful deletion, e.g., show a success message

        // Refresh the page
        // window.location.reload();
        props.reload();

        // navigate("/sucess");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error deleting user:", error.message);
      // Add logic to handle errors, e.g., show an error message
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date Of Birth</th>
            <th>Address1</th>
            <th>Address2</th>
            <th>City</th>
            <th>Postal</th>
            <th>Country</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {props.users.length > 0 &&
            props.users.map((user) => {
              const dateString = user.dateOfBirth;
              const convertedDate = new Date(dateString);
              const day = String(convertedDate.getUTCDate()).padStart(2, "0");
              const month = String(convertedDate.getUTCMonth() + 1).padStart(
                2,
                "0"
              );
              const year = convertedDate.getUTCFullYear();
              const formattedDate = `${year}-${month}-${day}`;

              return (
                <tr>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{formattedDate}</td>
                  <td>{user.address1}</td>
                  <td>{user.address2}</td>
                  <td>{user.city}</td>
                  <td>{user.postalCode}</td>
                  <td>{user.country}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.email}</td>
                  <td>{user.userNotes}</td>

                  <td>
                    <Button
                      onClick={() => editHandler(user._id)}
                      marginY={8}
                      marginRight={12}
                      iconBefore={EditIcon}
                    >
                      edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      onClick={() => deleteHandler(user._id)}
                      marginY={8}
                      marginRight={12}
                      iconBefore={TrashIcon}
                      intent="danger"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
