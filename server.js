//'use strict';
const { response } = require('express');
const express = require('express'); // tells node we are creating an "express" server
const app = express();
const PORT = process.env.PORT || 3000
app.use(express.static('public'));

//routes for notes and returns both files
app.get('/notes.html', handleNotes);
app.get('*', handleIndex);

//added this path
app.get('/', function(request, response){
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
//starts the server and listend on port 3000 unless unavailble 
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});