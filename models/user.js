const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Save a reference to the Schema constructor
// const Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object

const UserSchema = new mongoose.Schema({
  userId: Number,
  username: {
    type: String,
    index: {
      unique: true
    }
  },
  password: String
});

UserSchema.methods.comparePassword = function(inputPass) {
  return bcrypt.compareSync(inputPass, this.password);
};

UserSchema.pre("save", function(next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hashSync(this.password, 10);
  return next();
});

// Export the Note model
module.exports = mongoose.model("User", UserSchema);
