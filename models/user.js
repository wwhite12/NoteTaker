const mongoose = require("mongoose");

// This creates our model from the above schema, using mongoose's model method
const Schema = mongoose.Schema;

const bcrypt = require("bcryptjs");

// This creates our model from the above schema, using mongoose's model method

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    index: {
      unique: true
    }
  },
  password: String,
  contacts: []


});

UserSchema.methods.comparePassword = function (inputPass) {
  return bcrypt.compareSync(inputPass, this.password);
};

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hashSync(this.password, 10);
  return next();
});

// Export the Note model
const User = mongoose.model("User", UserSchema);
module.exports = User;
