const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
    const {email, password} = req.body;

    const userExists = await User.findOne({email});
    if (userExists) return res.status(400).json({msg: "User already exists"});

    const user = new User({
        email,
        password,
    });

    await user.save();

    const token = jwt.sign({id: user._id}, 'your_secret_key', {expiresIn: '1h'});
    res.json({token});
});

// Login route
router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if (!user) return res.status(400).json({msg: "User doesn't exist"});

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({msg: "Invalid credentials"});

    const token = jwt.sign({id: user._id}, 'your_secret_key', {expiresIn: '1h'});
    res.json({token});
});

module.exports = router;
