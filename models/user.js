const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object

const UserSchema = new Schema({
    userId: Number,
    username: String,
    password: String,
    contacts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Contact"
        }
    ]
});

// This creates our model from the above schema, using mongoose's model method
const User = mongoose.model("User", UserSchema);

// Export the Note model
module.exports = User;