const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    email: String,
    password: String,
    isAdmin: Boolean,
    isLocked: Boolean,
    pictureURL: String,
    lastLogin: Date
});

var UserDAO = mongoose.model('Users',UserSchema);
module.exports = UserDAO;