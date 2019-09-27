const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    index: {
      unique: true
    }
  },
  password: String,
  contacts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Contact"
    }
  ]


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
