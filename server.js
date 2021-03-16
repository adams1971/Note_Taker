
// const { response } = require('express');
const express = require('express'); // tells node we are creating an "express" server
const path = require('path');
const fs = require('fs');
const id = require('uniqid');
const db = require('./db/db.json')

const app = express();
const PORT = process.env.PORT || 3000;


//middleware
app.use(express.static(path.join(__dirname, 'public')));  //lets discuss use
app.use(express.urlencoded({ extended: true }));  //lets discuss use
app.use(express.json()); //lets discuss use

//routes for notes and returns both files
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//get api notes
app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

//post api notes
app.post("/api/notes", function(req, res) {
    var newNote = req.body; //removed var
    var newID = id(); //removed var
    newNote.id = newID;
    console.log("new note ", newNote);
});

//get note from body

// push to db.json

// app.get(newNote, "/db/db.json" (req, res) {

// })

//starts the server and listend on port 3000 locally or when deployed at the whismy of Heroku 
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});





//activity notes
//3.14 removed app.use(express.static('public'));
//3.14 added in its place var bodyParser = require('body-parser');
//3.14 these two lines broke the app- reverted back to origonal app.use(express.static('public'));