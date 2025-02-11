const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

router.get("/all", async (req, res) => {
    try {
        const comments = await Comment.find(); 
        res.json(comments); 
    } catch (err) {
        res.status(400).json({ error: err.message }); 
    }
});
router.post('/', async (req, res) => {
    try {
        const comment = new Comment(req.body);
        await comment.save();
        res.status(201).json(comment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});



router.get("/:postId", async (req, res) => {
    try {
        // Validate postId format (must be a valid MongoDB ObjectId)
        if (!req.params.postId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "Invalid post ID format" });
        }

        const comments = await Comment.find({ postId: req.params.postId });

        res.json(comments);
    } catch (err) {
        console.error("Error fetching comments:", err.message);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
