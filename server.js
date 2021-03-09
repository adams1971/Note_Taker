'use strict';
const { response } = require('express');
//const { response } = require('express');
const express = require('express');
const app = express();
app.use(express.static('public'));
app.get('/notes.html', handleNotes);
app.get('*', handleIndex);

//GET /api/notes
app.get('/api/notes', (request, response) => {
    response.json('./db/db.json')
})
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

app.listen(3000, () =>
    console.log("listening on PORT 3000"));