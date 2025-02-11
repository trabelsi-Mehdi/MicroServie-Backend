const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    text: String,
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
});

module.exports = mongoose.model('Comment', CommentSchema);
