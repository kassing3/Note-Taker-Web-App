const notes = require("express").Router();
const { v4: uuidv4 } = require('uuid');
const { 
    readFromFile, 
    readAndAppend,
    writeToFile,
} = require('../helpers/fsUtils');




//GET Route for pulling Notes
notes.get("/", (req, res) => {
    readFromFile("../db/db.json")
        .then(data => res.json(JSON.parse(data)))
});


//GET Route for a Specific Note
notes.get("/:note_id", (req, res) => {
    const noteId = req.params.note_id;

    readFromFile("../db/db.json")
        .then(data => JSON.parse(data))
        .then(json => {
            const result = json.filter( note => note.note_id === noteId);

            return result.length > 0 ? res.json(result) : res.json("No Note with that ID");
        })
});

//DELETE Route for a specific Note
notes.delete("/:note_id", (req, res) => {
    const noteId = req.params.note_id;

    readFromFile("../db/db.json")
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter ( note => note.note_id !== noteId);

            writeToFile("../db/db.json", result);

            res.json(`Note ${noteId} has been deleted`)
        })
});

//POST Route for Pushing Notes

notes.post("/", (req, res) => {

    const {noteTitle, noteDescription} = req.body;

    if (req.body) {
        
        const newNote = {
            noteTitle,
            noteDescription,
            note_id: uuidv4(),
        };

        readAndAppend(newNote, "../db/db.json");

        res.json("Note added successfully!")
    } else {
        res.errored("Error in adding note")
    };

    
});

module.export = notes;