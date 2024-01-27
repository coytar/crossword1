// Requiring module
const express = require("express");
const cors = require("cors");
const db = require("./db");

// Creating express app
const app = express();
app.use(express.json());
// enabling CORS for any unknown origin(https://xyz.example.com)
app.use(cors());

app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');

  next();
});

// sample api routes for testing
app.get("/", (req, res) => {
  res.json("Welcome to the Crossword Puzzle server");
});

app.post("/getPuzzle", (req, res) => {
  if (!req || !req.body) {
    res.status(400).send({ message: "Invalid request" });
    return;
  }
  const puzzleIndex = parseInt(req.body.puzzleIndex);
  if (isNaN(puzzleIndex)) {
    res.status(400).send({ message: "Invalid puzzle id" });
    return;
  }
  var data = db.crosswordPuzzles[puzzleIndex];
  res.json({ data: JSON.stringify(data) });
});

// Port Number
const port = 3001;

// Server setup
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}.`);
});
