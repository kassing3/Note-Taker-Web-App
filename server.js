const express = require("express");
const path = require("path");

const fs = require('fs');
const util = require('util');
const { readFromFile, readAndAppend } = require("./helpers/fsUtils");

const { v4: uuidv4 } = require('uuid');

const PORT = 3001;


const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// GET Route for Homepage
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/pages/index.html"))
});

// GET Route for Notes Page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/pages/notes.html"))
});

//GET Route for Pulling Notes
app.get("/api/notes", (req, res) => {

  console.info(`${req.method} request received for notes`);

  readFromFile("./db/db.json")
    .then((data) => 
      res.json(JSON.parse(data))
    );

});


//POST Route for Pushing Notes
app.post("/api/notes", (req, res) => {

  console.info(`${req.method} request received for not`);

  console.log(req.body);

  const {title, text} = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      note_id: uuidv4(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json("Note added successfully 🚀");
    console.log(newNote);
  } else {
    res.error("Error in adding note");
  }
});


app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`)
});