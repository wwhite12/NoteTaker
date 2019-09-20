const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object

const userSchema = new Schema({
    userId: Number,
    username: String,
    password: String
});

// This creates our model from the above schema, using mongoose's model method
const User = mongoose.model("User", userSchema);

// Export the Note model
module.exports = User;