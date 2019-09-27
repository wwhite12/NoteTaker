import axios from "axios";

export default {
    // Gets all contacts
    getContacts: function () {
        return axios.get("/api/contacts");
    },
    // Gets the contacts with the given id
    getContact: function (id) {
        return axios.get("/api/contacts/" + id);
    },
    // Deletes the contacts with the given id
    deleteContact: function (id) {
        return axios.delete("/api/contacts/" + id);
    },
    // Saves a contacts to the database
    saveContact: function (contactData) {
        return axios.post("/api/contacts", contactData);
    },
    // Updates a contact to the database
    updateContact: function (id, contactData) {
        return axios.put("/api/contacts/" + id, contactData);
    },
    // Updates a contact to the database
    updateContactAddNote: function (id, notes) {
        return axios.put("/api/contacts/" + id, { notes: notes });
    },
    updateContactDeleteNote: function (id, noteId) {
        console.log('** updateContactDelete', noteId)
        return axios.delete("/api/contacts/" + id + "/notes/" + noteId);
    },
    // Gets all notes
    getNotes: function () {
        return axios.get("/api/notes");
    },
    getNote: function (id) {
        return axios.get("/api/notes/" + id);
    },
    // Deletes the contacts with the given id
    deleteNote: function (id) {
        return axios.delete("/api/notes/" + id);
    },
    // Saves a contacts to the database
    saveNote: function (noteData) {
        return axios.post("/api/notes", noteData);
    },
    // Updates a contact to the database
    updateNote: function (id, noteData) {
        return axios.put("/api/notes/" + id, noteData);
    },
    // Updates a contact to the database
    updateUser: function (id, userData) {
        return axios.put("/api/users/" + id, userData);
    },
    updateUserFromContacts: function (id, contacts) {
        return axios.put("/api/users/" + id, { contacts: contacts });
    },
    getUserByUsername: function (username) {
        return axios.get("/api/username/" + username);
    },
    getUser: function (id) {
        return axios.get("/api/users/" + id);
    },
    saveUser: function (userData) {
        return axios.post("/api/users", userData);
    }

};
