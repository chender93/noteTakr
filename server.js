const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
// const fs = require('fs');
const path = require('path');

const { notes } = require('./Develop/db/db.json');

const htmlRoutes = require('./routes/htmlRoutes/');
const apiRoutes = require('./routes/apiRoutes/notesRoutes');

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

app.use(express.static('./Develop/public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/Develop/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/Develop/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    return res.json(notes);
});

// Listener
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
})