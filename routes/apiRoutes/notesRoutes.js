const router = require('express').Router();
const { notes } = require('../../Develop/db/db.json');
const fs = require('fs');
const path = require('path');

const { v4: uuidv4 } = require('uuid');

// Shows notes from db.json
router.get('/notes', (req, res) => {
    res.json(notes);
});

// Specifies notes by ID
router.get('/notes/:id', (res, req) => {
    const selectedNote = req.params.id;

    // For loop checking the notes by their id
    for (let i = 0; i < notes.length; i++) {
        if (selectedNote === notes[i].id) {
            return res.json(notes[i])
        }
    }
    return res.send('Sorry! This note does not exist')
})

// Function to POST notes
router.post('/notes', (req, res) => {
    const newNote = req.body;

    // Adds a new id for the new notes | toString can be utilized as well
    newNote.id = uuidv4();

    // Notifies the user that their note was created
    console.log('Your new note was created!');

    // Add the new note to the JSON object
    notes.push(newNote);

    // Writes the new JSON object with the new note added
    fs.writeFileSync(
        path.join(__dirname, '../../Develop/db/db.json'),
        JSON.stringify({ notes }, null, 2)
    );

    // Return the new note back to the user
    res.json(newNote);
});

// Function to delete note
router.delete('/notes/:id', (req, res) => {
    const noteToBeDeleted = req.params.id;

    // Deletes the desired note
    for (let i = 0; i < notes.length; i++) {
        if (noteToBeDeleted === notes[i].id) {
            let noteIndex = notes.indexOf(notes[i]);
            notes.splice(noteIndex, 1);
        }
    }

    // Over writes the object so the note no longer exists
    fs.writeFileSync(
        path.join(__dirname, '../../Develop/db/db.json'),
        JSON.stringify({ notes }, null, 2)
    );

    res.send({ notes });
    console.log('\n Note Deleted!');
})

module.exports = router;