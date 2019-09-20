const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object

const NoteSchema = new Schema({
    noteId: Number,
    // contactId: Number,
    noteTitle: String,
    noteBody: String
});

// This creates our model from the above schema, using mongoose's model method
const Note = mongoose.model("Salesman", NoteSchema);

// Export the Note model
module.exports = Note;
