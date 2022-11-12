const notes = require("express").Router();
const { v4: uuidv4 } = require('uuid');

const fs = require('fs');
const util = require('util');
const { readFromFile, writeToFile, readAndAppend } = require("./../helpers/fsUtils");


//GET Route for Pulling Notes
notes.get("/", (req, res) => {

    console.info(`${req.method} request received for notes`);
  
    readFromFile("./db/db.json")
      .then((data) => 
        res.json(JSON.parse(data))
      );
  
});

// DELETE Route for a specific note
notes.delete("/:id", (req, res) => {
  const noteId = req.params.id;

  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      
      const result = json.filter((note) => note.id !== noteId);

      // Save that array to the filesystem
      writeToFile("./db/db.json", result);

      // Respond to the DELETE request
      res.json(`Item ${noteId} has been deleted 🗑️`);
    });
});
  
  
//POST Route for Pushing Notes
notes.post("/", (req, res) => {

console.info(`${req.method} request received for note`);

console.log(req.body);

const {title, text} = req.body;

if (req.body) {
    const newNote = {
    title,
    text,
    id: uuidv4(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json("Note added successfully 🚀");
    console.log(newNote);
} else {
    res.error("Error in adding note");
}
});

module.exports = notes;
  