const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// This creates our model from the above schema, using mongoose's model method
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    index: {
      unique: true
    }
  },
  password: String


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
module.exports = mongoose.model("User", UserSchema);
