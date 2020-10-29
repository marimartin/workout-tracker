// DEPENDENCIES
const express = require("express");
const logger = require("morgan");
const path = require("path");
const mongoose = require("mongoose");
const Workout = require("./models/workout")

// PORT
const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", { useNewUrlParser: true });

// HTML ROUTES
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
});

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/exercise.html"))
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/stats.html"))
});

// API ROUTES
app.get("/api/workouts", (req, res) => {
    Workout.find()
        .then(data => {
            res.json(data);
        })
});

app.post("/api/workouts", (req, res) => {
    Workout.create(req.body)
        .then(data => {
            res.json(data);
        })
});

// LISTENER
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});