const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
    email: String,
    purchaseParkingPass: Boolean,
});

module.exports = mongoose.model('User', UserSchema);
