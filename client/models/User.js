const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// define the User model schema

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
      password: {
        type: String,
        required: true
      }
});

UserSchema.methods.comparePassword = function (inputPass) {
    return bcrypt.compareSync(inputPass, this.password);
}

UserSchema.pre("save", function (next) {
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hashSync(this.password, 10);
    return next();
});

module.exports = mongoose.model('User', UserSchema);
