import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, TrashIcon, EditIcon } from "evergreen-ui";

const EditUser = () => {
  const navigate = useNavigate();

  const deleteHandler = async (id) => {
    const confrim = window.confirm("Are you sure to delete a user ?");
    try {
      if (confrim) {
        await axios.delete(`/deleteuser/${id}`);

        navigate("/");
      } else {
        navigate(`edituser/${id}`);
      }
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const dateOfBirthRef = useRef();
  const address1Ref = useRef();
  const address2Ref = useRef();
  const cityRef = useRef();
  const postalCodeRef = useRef();
  const countryRef = useRef();
  const phoneNumberRef = useRef();
  const emailRef = useRef();
  const userNotesRef = useRef();

  const param = useParams();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    address1: "",
    address2: "",
    city: "",
    postalCode: "",
    country: "",
    phoneNumber: "",
    email: "",
    userNotes: "",
  });

  useEffect(() => {
    const editUser = async () => {
      try {
        const response = await axios.get(`/edituser/${param.id}`);
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user:", error.message);
      }
    };

    editUser();
  }, [param.id]);

  const handleChange = (ref, field) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: ref.current.value,
    }));
  };

  const dateString = user.dateOfBirth;
  const convertedDate = new Date(dateString);
  const day = String(convertedDate.getUTCDate()).padStart(2, "0");
  const month = String(convertedDate.getUTCMonth() + 1).padStart(2, "0");
  const year = convertedDate.getUTCFullYear();
  const formattedDate = `${year}-${month}-${day}`;

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log("Submitted Data:", user);

    try {
      const response = await axios.put(`/edituser/${user._id}`, user);
      console.log("Update Response:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Error updating user:", error.message);
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">User Information Form</h2>

      <form action="/addUser" method="post">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>

              <input
                type="text"
                id="firstName"
                name="firstName"
                className="form-control"
                required
                ref={firstNameRef}
                value={user.firstName}
                onChange={() => handleChange(firstNameRef, "firstName")}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="form-control"
                required
                ref={lastNameRef}
                value={user.lastName}
                onChange={() => handleChange(lastNameRef, "lastName")}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth:</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                className="form-control"
                required
                ref={dateOfBirthRef}
                value={formattedDate}
                onChange={() => handleChange(dateOfBirthRef, "dateOfBirth")}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                className="form-control"
                required
                ref={phoneNumberRef}
                value={user.phoneNumber}
                onChange={() => handleChange(phoneNumberRef, "phoneNumber")}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="address1">Address 1:</label>
              <input
                type="text"
                id="address1"
                name="address1"
                className="form-control"
                required
                ref={address1Ref}
                value={user.address1}
                onChange={() => handleChange(address1Ref, "address1")}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="address2">Address 2:</label>
              <input
                type="text"
                id="address2"
                name="address2"
                className="form-control"
                ref={address2Ref}
                value={user.address2}
                onChange={() => handleChange(address2Ref, "address2")}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="city">City:</label>
              <input
                type="text"
                id="city"
                name="city"
                className="form-control"
                required
                ref={cityRef}
                value={user.city}
                onChange={() => handleChange(cityRef, "city")}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="postalCode">Postal Code:</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                className="form-control"
                required
                ref={postalCodeRef}
                value={user.postalCode}
                onChange={() => handleChange(postalCodeRef, "postalCode")}
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="country">Country:</label>
              <input
                type="text"
                id="country"
                name="country"
                className="form-control"
                required
                ref={countryRef}
                value={user.country}
                onChange={() => handleChange(countryRef, "country")}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                required
                ref={emailRef}
                value={user.email}
                onChange={() => handleChange(emailRef, "email")}
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="userNotes">User Notes:</label>
          <textarea
            id="userNotes"
            name="userNotes"
            className="form-control"
            required
            rows="4"
            cols="50"
            ref={userNotesRef}
            value={user.userNotes}
            onChange={() => handleChange(userNotesRef, "userNotes")}
          />
        </div>

        <Button
          onClick={onSubmitHandler}
          marginY={8}
          marginRight={12}
          iconBefore={EditIcon}
        >
          Update
        </Button>

        <Button
          onClick={(event) => {
            event.preventDefault();
            deleteHandler(user._id);
          }}
          marginY={8}
          marginRight={12}
          iconBefore={TrashIcon}
          intent="danger"
        >
          Delete
        </Button>
      </form>
    </div>
  );
};

export default EditUser;
