const db = require("../models");

// Defining methods for the UsersController
module.exports = {
    findAll: function (req, res) {
        db.User
            .find(req.query)
            .populate("contacts")
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findById: function (req, res) {
        db.User
            .findById(req.params.id)
            .populate("contacts")
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findByUsername: function (req, res) {
        db.User
            .find({ username: req.params.username })
            .populate("contacts")
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        db.User
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        console.log(req.body)
        db.User
            .findOneAndUpdate({ _id: req.params.id },
                req.body.contacts
                    ? {
                        $push: {
                            contacts: {
                                $each: [req.body.contacts],
                                $position: 0
                            }
                        }
                    }
                    : req.body)
            .populate("contacts")
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        db.User
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};
