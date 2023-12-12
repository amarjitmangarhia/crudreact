// Name: Amarjit Singh
// C-NUMBER: C0865920

const express = require("express");
const cors = require("cors");
const path = require("path");
const Model = require("./Model");
const db = require("./database");

const app = express();
app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 3000;

db.on("error", (error) => {
  console.log("error connecting database");
});

db.once("connected", () => {
  console.log("Database Connected!");
});

app.get("/api", async (req, res) => {
  try {
    const fetchUser = await Model.find();
    res.json({ fetchUser: fetchUser });
  } catch (err) {
    console.error("Error Fetching User", err);
    res
      .status(500)
      .json({ error: "Error Fetching Users", details: err.message });
  }
});

app.post("/adduser", async (req, res) => {
  console.log("reched backedn");
  console.log(req.body);
  const user = new Model({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dateOfBirth: req.body.dateOfBirth,
    address1: req.body.address1,
    address2: req.body.address2 ? req.body.address2 : "not given",
    city: req.body.city,
    postalCode: req.body.postalCode,
    country: req.body.country,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    userNotes: req.body.userNotes,
  });
  try {
    const tryToSaveUser = await user.save();
    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/edituser/:id", async (req, res) => {
  const id = req.params.id;
  const findById = await Model.findById(id);

  res.status(200).json({ user: findById });
});

app.put("/edituser/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const findById = await Model.findByIdAndUpdate(
      id,
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          dateOfBirth: req.body.dateOfBirth,
          address1: req.body.address1,
          address2: req.body.address2,
          city: req.body.city,
          postalCode: req.body.postalCode,
          country: req.body.country,
          phoneNumber: req.body.phoneNumber,
          email: req.body.email,
          userNotes: req.body.userNotes,
        },
      },
      { new: true }
    );
    if (!findById) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ Success: "Successfully Updated!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//delete user from database

app.delete("/deleteuser/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deletedUser = await Model.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(`User with ID ${id} deleted successfully`);
    res.status(200).json({ Message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Serve the static files from the React app
app.use(express.static(path.resolve(__dirname, "../build")));

// Handle all other routes
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
