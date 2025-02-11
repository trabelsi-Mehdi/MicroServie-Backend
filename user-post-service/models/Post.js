const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    text: { type: String, required: true }, 
    comments: [{ userId: mongoose.Schema.Types.ObjectId, text: String }] 
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
