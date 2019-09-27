const db = require("../models");

// Defining methods for the ContactsController
module.exports = {
    findAll: function (req, res) {
        db.Contact
            .find(req.query)
            .populate("notes")
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findById: function (req, res) {
        db.Contact
            .findById(req.params.id)
            .populate("notes")
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        db.Contact
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        db.Contact
            .findOneAndUpdate({ _id: req.params.id },
                req.body.notes
                    ? {
                        $push: {
                            notes: {
                                $each: [req.body.notes],
                                $position: 0
                            }
                        }
                    }
                    : req.body)
            .populate("notes")
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    updateNoteArray: function (req, res) {
        console.log('*****', req.params)
        db.Contact
            .findOneAndUpdate({ _id: req.params.id },
                {
                    $pull: {
                        notes: req.params.noteId
                    }
                })
            .populate("notes")
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        db.Contact
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};
