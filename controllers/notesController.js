const db = require("../models");
const fs = require("fs");
const path = require("path");

// Defining methods for the NotesController
module.exports = {
    findAll: function (req, res) {
        db.Note
            .find(req.query)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findById: function (req, res) {
        db.Note
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        console.log(req)
        if (req.body.image !== "") {
            const { image, ...newNote } = req.body;
            const [, ext, imageData] = image.match(/data:image\/(jpeg|png);base64,(.+)/);
            db.Note
                .create(newNote)
                .then(dbNote => {
                    const imagesDirName = "notesImages";
                    const imagesDirPath = path.join(__dirname, `../${imagesDirName}`);
                    if (!fs.existsSync(imagesDirPath)) {
                        fs.mkdirSync(imagesDirPath);
                    }
                    const noteImagePath = `${dbNote._id}.${ext}`;
                    fs.writeFile(`${imagesDirPath}/${noteImagePath}`, imageData, "base64", function (err, data) {
                        if (err) throw new Error("Problem with saving file.");
                        dbNote.image = `/${imagesDirName}/${noteImagePath}`;
                        dbNote.save().then(() => res.json(dbNote));
                    })
                })
                .catch(err => res.status(422).json(err));
        } else {
            db.Note
                .create(req.body)
                .then(dbNote => res.json(dbNote))
                .catch(err => res.status(422).json(err));
        }
    },
    update: function (req, res) {
        db.Note
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        db.Note
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};
