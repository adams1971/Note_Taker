
// const { response } = require('express');
const express = require('express'); // tells node we are creating an "express" server
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json')

const app = express();
const PORT = process.env.PORT || 3000;

// var bodyParser = require('body-parser');//added bodyParser to recognize incoming requests

//middleware
app.use(express.static(path.join(__dirname, 'public')));  //lets discuss use
app.use(express.urlencoded({ extended: true }));  //lets discuss use
app.use(express.json()); //lets discuss use
// app.use(bodyParser.urlencoded({ extended: true }));

//routes for notes and returns both files
app.get('/notes.html', handleNotes);
app.get('*', handleIndex);

//added this path
app.get('/notes.html', function(request, response){
  response.json(path.join(__dirname, 'public/index.html'));
});

//routes for api reads db.json and handles 'get'requests
app.get('/api/notes', (request, response) => {
    response.json('./db/db.json')
})

//handles 'post' request
app.post('/api/notes', (request, response) => {
    console.log(request.body);
    response.json('./db/db.json') 
})
function handleNotes(request, response){
    response.status(200).sendFile('./public/notes.html', { root: __dirname});
}
function handleIndex(request, response){
    response.status(200).sendFile('./public/index.html', { root: __dirname});
}
 
// app.listen(3000, () =>
    // console.log("listening on PORT 3000"));

//starts the server and listend on port 3000 locally or when deployed at the whismy of Heroku 
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});





//activity notes
//3.14 removed app.use(express.static('public'));
//3.14 added in its place var bodyParser = require('body-parser');
//3.14 these two lines broke the app- reverted back to origonal app.use(express.static('public'));