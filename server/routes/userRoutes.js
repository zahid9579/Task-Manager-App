const express = require('express');
const User = require('../models/userModel');
const router = express.Router(); 

//  Register Route
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, mobile_no } = req.body;

        if (!name || !email || !password || !mobile_no) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        //  Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const user = new User({ name, email, password, mobile_no });

        const response = await user.save();

        res.status(201).json({ msg: "Registration successful", response });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Something went wrong!" });
    }
});

//  Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: "Email and password are required" });
        }

        const user = await User.findOne({ email }); 
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.status(200).json({ msg: "Login successful", user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Something went wrong" });
    }
});

//  Profile Route
router.get('/profile', async (req, res) => {
    try {
        const users = await User.find(); 
        res.status(200).json({ msg: "User information", data: users });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Something went wrong!" });
    }
});

module.exports = router;
