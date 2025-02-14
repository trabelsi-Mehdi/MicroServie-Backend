const express = require('express');
const router = express.Router();
const User = require('../models/User'); 


router.get("/all", async (req, res) => {
    try {
        const users = await User.find(); 
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: "Server error: Unable to fetch users" });
    }
});

router.post("/", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ message: "User created successfully", user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});



router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id); 
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: "Invalid user ID" });
    }
});


module.exports = router;
