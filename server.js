//'use strict';
const { response } = require('express');
//const { response } = require('express');

const express = require('express');
    // tells node we are creating an "express" server

const app = express();

const PORT = process.env.PORT || 3000

app.use(express.static('public'));
app.get('/notes.html', handleNotes);
app.get('*', handleIndex);

//api
app.get('/api/notes', (request, response) => {
    response.json('./db/db.json')
})

//routes
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

//GET /notes should return the notes.html file.
//GET * should return the index.html file.

 
// app.listen(3000, () =>
    // console.log("listening on PORT 3000"));
//starts the server and listend on port 3000 unless unavailble 
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});