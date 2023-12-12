import axios from "axios";
import { Button } from "evergreen-ui";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
const AddUser = () => {
  const navigate = useNavigate();
  const formRef = useRef();

  const [formData, setFormData] = useState({
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

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const formElements = Array.from(formRef.current);

    const isFieldEmpty = formElements.map((element) => ({
      name: element.name,
      value: element.value.trim(),
      required: element.required,
    }));

    if (isFieldEmpty.some((field) => field.required && field.value === "")) {
      alert("Fill All Required Fields!");
    }

    setFormData({
      firstName: formRef.current[0].value,
      lastName: formRef.current[1].value,
      dateOfBirth: formRef.current[2].value,
      phoneNumber: formRef.current[3].value,
      address1: formRef.current[4].value,
      address2: formRef.current[5].value,
      city: formRef.current[6].value,
      postalCode: formRef.current[7].value,
      country: formRef.current[9].value,
      email: formRef.current[9].value,
      userNotes: formRef.current[10].value,
    });
  };

  useEffect(() => {
    const postData = async () => {
      try {
        await axios.post("/adduser", formData);

        navigate("/");
      } catch (error) {
        console.error("Error In POST Request:", error.message);
      }
    };

    if (Object.values(formData).some((value) => value !== "")) {
      postData();
    }
  }, [formData]);

  return (
    <div className="container">
      <h2 className="my-4">User Information Form</h2>

      <form action="/addUser" method="post" ref={formRef}>
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
          />
        </div>

        <Button
          marginRight={16}
          appearance="primary"
          intent="success"
          type="submit"
          onClick={onSubmitHandler}
          className="btn btn-primary mt-3"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddUser;
