const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const api = require("./routes/index")


const PORT = process.env.port || 3003;

const app = express();


//Middleware for parsing JSON and urlencoded from data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

//GET Route for Home Page

app.get("*", (req, res) => 
    res.sendFile(path.join(__dirname, "/public/pages/index.html"))
);


// GET / notes should return the notes.html file
app.get("/", (req, res) => 
    res.sendFile(path.join(__dirname, "/public/pages/notes.html"))
);


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
