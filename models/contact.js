const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Using the Schema constructor, create a new Schema object

const contactSchema = new Schema({
    firstName: String,
    lastName: String,
    company: String,
    streetAddress: String,
    city: String,
    state: String,
    zip: Number,
    country: String,
    email: String,
    phone: String,
    interest: String,
    notes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Note"
        }
    ]
    ],
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;