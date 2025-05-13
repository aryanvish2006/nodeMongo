const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userModel = require("./usermodel");
const app = express();

app.use(cors());

app.use(express.json());

// ✅ MongoDB Cloud direct connect (simple way)
mongoose.connect("mongodb+srv://aryanvishproject:pGxmMdYKzvBJ69FJ@testdb.gij3x6d.mongodb.net/?retryWrites=true&w=majority&appName=testDB")
.then(() => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});

app.get("/", (req, res) => res.send("hello from backend"));

app.post("/create", async (req, res) => {
    let user = await userModel.create({ name: req.body.name, age: req.body.age });
    res.send(user);
});

app.get("/users", async (req, res) => {
    let users = await userModel.find();
    res.send(users);
});

app.post("/update", async (req, res) => {
    let updatedUser = await userModel.findOneAndUpdate(
        { name: req.body.name },
        { age: req.body.age },
        { new: true }
    );
    res.send(updatedUser);
});

app.post("/delete", async (req, res) => {
    let deletedUser = await userModel.findOneAndDelete({ name: req.body.name });
    res.send(deletedUser);
});

app.listen(3000, () => console.log("Running on port 3000"));
