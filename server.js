
// const { response } = require('express');
const express = require('express'); // tells node we are creating an "express" server
const path = require('path');
const fs = require('fs');
const id = require('uniqid');
const db = require('./db/db.json');
const { response } = require('express');

const app = express();
const PORT = process.env.PORT || 3000;


//middleware
app.use(express.static(path.join(__dirname, 'public')));  //lets discuss use
app.use(express.urlencoded({ extended: true }));  //lets discuss use
app.use(express.json()); //lets discuss use



//get api notes
app.get("/api/notes", function(req, res) {
    // res.sendFile(path.join(__dirname, "/db/db.json"));
    console.log("mmmmm")
    res.json(getNoteList()); //removed stringify
    //res.json();
});

//post api notes
app.post("/api/notes", function(req, res) {
    var newNote = req.body;
    var newID = id(); 
    newNote.id = newID;
    console.log("new note ", newNote); 
    // push to db.json added 3.16
    var currentNote = getNoteList()
    currentNote.push(newNote);
    //overwrites with new note array
    updateDB(currentNote);
    res.json(currentNote);
});

function updateDB(currentNote) {
    fs.writeFileSync(path.join(__dirname, "./db/db.json" ), JSON.stringify(currentNote))
};


//get note from body (post) added 3.16
function getNoteList() {
    return JSON.parse(fs.readFileSync(path.join(__dirname, "./db/db.json" )))
};
//console.log(getNoteList());




// app.get(newNote, "/db/db.json" (req, res) {

// })

//routes for notes and returns both files
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//starts the server and listend on port 3000 locally or when deployed at the whismy of Heroku 
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});

//for the delete hints
//request.params 