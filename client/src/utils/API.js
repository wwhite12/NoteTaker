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
    // Gets all notes
    getNotes: function () {
        return axios.get("/api/notes");
    },
    getNote: function (id) {
        return axios.get("/api/notes" + id);
    }
};
