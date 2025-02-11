const express = require('express');
const router = express.Router();
const axios = require('axios'); 
const Post = require('../models/Post');


const COMMENT_SERVICE_URL = "http://localhost:5001/api/comments"; 

router.get('/all', async (req, res) => {
    try {
        const posts = await Post.find();

        if (posts.length === 0) {
            return res.status(404).json({ error: "No posts found" });
        }

        const postsWithComments = await Promise.all(posts.map(async (post) => {
            try {
                const response = await axios.get(`${COMMENT_SERVICE_URL}/${post._id}`);

                return { ...post.toObject(), comments: response.data };
            } catch (error) {
                return { ...post.toObject(), comments: [] };
            }
        }));

        res.json(postsWithComments);
    } catch (err) {
        console.error("Error fetching posts:", err.message);
        res.status(500).json({ error: err.message });
    }
});
router.post('/', async (req, res) => {
    try {
        const post = new Post(req.body);
        await post.save();
        res.status(201).json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.json(post);
    } catch (err) {
        res.status(404).json({ error: 'Post not found' });
    }
});



router.put('/:id/validate', async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, { validate: true }, { new: true });
        res.json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
