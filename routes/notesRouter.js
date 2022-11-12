const notes = require("express").Router();
const { v4: uuidv4 } = require('uuid');

const fs = require('fs');
const util = require('util');
const { readFromFile, readAndAppend } = require("./../helpers/fsUtils");


//GET Route for Pulling Notes
notes.get("/", (req, res) => {

    console.info(`${req.method} request received for notes`);
  
    readFromFile("./db/db.json")
      .then((data) => 
        res.json(JSON.parse(data))
      );
  
});

// GET Route for a specific Note
notes.get("/:note_id", (req, res) => {
  
  const noteId = req.params.note_id;

  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.note_id === noteId);
      return result.length > 0
        ? res.json(result)
        : res.json('No note with that ID');
    });
});
  
  
//POST Route for Pushing Notes
notes.post("/", (req, res) => {

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

module.exports = notes;
  